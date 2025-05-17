
"""
pdf_utils.py

This serves the purpose of creating a pdf containing information about the seminar,
a table with the names of the participants and a field for each participant to put their signature.
"""
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from io import BytesIO
from typing import List
from schemas import ParticipantOut, SeminarOut

def generate_participants_list_pdf(seminar: SeminarOut, participants: List[ParticipantOut]) -> BytesIO:
    """
    Create a pdf with information about the seminar and a table with the names of the participants
    and a field for signatures.
    
    Args:
        seminar (SeminarOut): The seminar with location info.
        participants (List[ParticipantOut]): List of participants for the given seminar.
    
    Returns:
        BytesIO: Avoids saving the file to memory.
    """
    buffer = BytesIO()
    document = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)

    styles = getSampleStyleSheet()
    elements = []

    # Seminar title displayed on the top
    elements.append(Paragraph(f"<strong>{seminar.title}</strong>", styles["Title"]))
    elements.append(Spacer(1, 10))
    
    # Seminar description
    elements.append(Paragraph(f"<p>{seminar.description}</p>", styles["Normal"]))
    elements.append(Spacer(1, 8))
    
    # Other information about the seminar
    seminar_info = f"""
    <strong>Datum und Uhrzeit:</strong> {seminar.date.strftime('%d.%m.%Y')}, {seminar.time.strftime('%H:%M')} Uhr<br/>
    <strong>Ort:</strong> {seminar.location.name}, {seminar.location.street} {seminar.location.house_number}, 
    {seminar.location.zip_code} {seminar.location.city} {f", Anmerkungen: {seminar.location.remarks}" if seminar.location.remarks else ""}<br/>
    <strong>Preis:</strong> {'Kostenfrei' if seminar.price in [None, -1] else f"{seminar.price} €"}<br/>
    <strong>Max. Teilnehmer:</strong> {seminar.max_participants if seminar.max_participants else 'Keine Angabe'}<br/>
    """
    elements.append(Paragraph(seminar_info, styles["Normal"]))
    elements.append(Spacer(1, 20))

    # Table columns / Table header
    data = [["Name", "Unterschrift"]]

    # Participant rows
    for p in participants:
        full_name = f"{p.firstname} {p.lastname}"
        data.append([full_name, ""])

    # Create at least 10 rows
    while len(data) < 10:
        data.append(["", ""])

    # Table creation
    table = Table(data, colWidths=[240, 240,])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
        ("GRID", (0, 0), (-1, -1), 0.8, colors.grey),
    ]))

    elements.append(table)

    document.build(elements)
    buffer.seek(0)
    return buffer
