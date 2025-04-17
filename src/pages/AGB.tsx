/**
 * AGB.tsx
 *
 * Displays the general terms and conditions for taking a seminar.
 */

import { Box, Stack } from "@mui/material";

const AGB = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        paddingY: 5,
      }}
    >
      <Stack gap={3} sx={{ maxWidth: "1000px", textAlign: "justify" }}>
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
        <h3>
          <strong>1. Geltungsbereich</strong>
        </h3>
        <div>
          Diese Allgemeinen Geschäftsbedingungen gelten für sämtliche Verträge,
          die mit Ursula Trahasch im Rahmen von Veranstaltungen geschlossen
          werden. Abweichende Vereinbarungen gelten nur, sofern sie schriftlich
          festgehalten wurden. Mit der Anmeldung zu einer Veranstaltung erkennt
          die teilnehmende Person diese Bedingungen verbindlich an.
        </div>
        <h3>
          <strong>2. Anmeldung und Vertragsschluss</strong>
        </h3>
        <div>
          Die Anmeldung erfolgt über das Anmeldeformular auf der Webseite
          (ursula-trahasch.de) oder alternativ per Telefon oder E-Mail (siehe
          Kontaktseite). Mit der Anmeldung gibt die teilnehmende Person ein
          verbindliches Vertragsangebot ab. Der Vertrag kommt zustande, sobald
          Ursula Trahasch die Teilnahme schriftlich oder elektronisch bestätigt.
        </div>
        <h3>
          <strong>3. Zahlungsbedingungen</strong>
        </h3>
        <div>
          Die Teilnahmegebühr ist nach Vertragsbestätigung fällig und kann per
          Überweisung oder in bar bezahlt werden. Andere Zahlungsmöglichkeiten
          bedürfen gesonderter Absprache.
        </div>

        <h3>
          <strong>4. Rücktritt und Stornierung</strong>
        </h3>
        <div>
          Eine kostenfreie Stornierung ist bis 3 Tage vor Veranstaltungsbeginn
          möglich. Der Rücktritt kann über den Abmelde-Link in der
          Bestätigungs-E-Mail, telefonisch, per E-Mail oder über das
          Kontaktformular erfolgen. Bei späterem Rücktritt oder Nichterscheinen
          wird die gesamte Teilnahmegebühr berechnet, es sei denn, es wird ein
          Ersatzteilnehmer gestellt oder ein geringerer Schaden nachgewiesen.
        </div>
        <h3>
          <strong>5. Absage oder Änderung von Veranstaltungen</strong>
        </h3>
        <div>
          Ursula Trahasch behält sich vor, Veranstaltungen aus besonders Gründen
          (z.B. bei unzureichender Teilnehmerzahl, Krankheit oder höherer
          Gewalt) abzusagen oder zu verschieben. Im Fall der Absage wird ein
          bereits bezahltes Teilnahmeentgelt zurückerstattet. Gleiches gilt für
          den Fall, dass die teilnehmende Person an einem Nachholtermin für die
          Veranstaltung nicht teilnehmen kann. Ein Anspruch auf Ersatz weiterer
          Kosten besteht nicht. Änderungen im Ablauf oder beim Einsatz von
          Dozenten sind vorbehalten und berechtigen nicht zum Vertragsrücktritt.
        </div>
        <h3>
          <strong>6. Ausschluss von der Teilnahme</strong>
        </h3>
        <div>
          Bei grober Störung des Veranstaltungsablaufs oder bei Zahlungsverzug
          kann Ursula Trahasch Teilnehmer:innen von der Veranstaltung
          ausschließen. Eine Rückerstattung der Teilnahmegebühr erfolgt in
          diesen Fällen nicht.
        </div>
        <h3>
          <strong>7. Haftung</strong>
        </h3>
        <div>
          Ursula Trahasch haftet nur bei Vorsatz oder grober Fahrlässigkeit. Bei
          Verletzungen von Leben, Körper oder Gesundheit besteht eine Haftung
          auch für leichte Fahrlässigkeit. Bei Verletzung wesentlicher
          Vertragspflichten (Kardinalpflichten) haftet sie in angemessenem
          Umfang.
        </div>
        <h3>
          <strong>8. Datenschutz</strong>
        </h3>
        <div>
          Personenbezogene Daten werden ausschließlich zur Abwicklung der
          Veranstaltung und gegebenenfalls zur Rechnungsstellung verarbeitet.
          Eine Weitergabe an Dritte erfolgt nicht. Weitere Informationen finden
          Sie in der Datenschutzerklärung.
        </div>
        <h3>
          <strong>9. Widerrufsrecht</strong>
        </h3>
        <div>
          Das Widerrufsrecht gilt ausschließlich für Verbraucher:innen im Sinne
          des § 13 BGB. Für Unternehmer:innen nach § 14 BGB besteht kein
          Widerrufsrecht.
        </div>
        <h3>
          <strong>Widerrufsbelehrung</strong>
        </h3>
        <div>
          <strong>Widerrufsrecht</strong>
        </div>
        <div>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen. Die Frist beginnt mit Vertragsabschluss.
        </div>
        <div>
          Um Ihr Widerrufsrecht auszuüben, senden Sie bitte eine eindeutige
          Erklärung an:
        </div>
        <div>
          Ursula Trahasch <br />
          An der Stadtmauer 12 <br />
          79346 Endingen am Kaiserstuhl <br />
          Telefon: 01523 – 420 43 44 <br />
          E-Mail: kontakt@ursula-trahasch.de
        </div>
        <div>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
          vor Fristablauf absenden.
        </div>

        <div>
          <strong>Folgen des Widerrufs</strong>
        </div>
        <div>
          Im Falle eines Widerrufs werden alle geleisteten Zahlungen innerhalb
          von vierzehn Tagen zurückerstattet. Die Rückzahlung erfolgt über
          dasselbe Zahlungsmittel wie die ursprüngliche Transaktion.
        </div>
        <div>
          Wurde verlangt, dass die Dienstleistung bereits innerhalb der
          Widerrufsfrist beginnt, ist ein angemessener anteiliger Betrag für die
          bereits erbrachte Leistung zu entrichten.
        </div>
        <h3>
          <strong>Muster-Widerrufsformular</strong>
        </h3>
        <div>
          (Bitte nur ausfüllen und zurücksenden, wenn Sie den Vertrag widerrufen
          möchten.)
        </div>
        <div>
          An:
          <br />
          Ursula Trahasch
          <br />
          An der Stadtmauer 12
          <br />
          79346 Endingen am Kaiserstuhl
          <br />
          kontakt@ursula-trahasch.de
        </div>
        <div>
          Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die
          Teilnahme an folgender Veranstaltung:
          <br />
          Veranstaltungstitel: ____________
          <br />
          Datum: ____________
        </div>
        <div>Name: ____________</div>
        <div>Anschrift: ____________</div>
        <div>Unterschrift (bei Mitteilung auf Papier): ____________</div>
        <div>Datum: ____________</div>
      </Stack>
    </Box>
  );
};

export default AGB;
