# Seminar Management Platform

This is a full-stack web project for managing and booking seminars.
This website was specifically designed for the business of a person I know, but it's **not online yet** as I am still working on smaller issues.  
It includes a public website for seminar participants, people who are interested in the business and a secure admin area to manage seminars, locations and participants.

---

## Overview

- **Frontend**: React + TypeScript, MUI (Material UI), Vite
- **Backend**: FastAPI, SQLAlchemy, JWT, ReportLab, PostgreSQL
- **Key Features**:
  - Seminar registration with form validation
  - Secure admin login (JWT)
  - Admin dashboard to manage seminars, locations and participants
  - Downloadable participant lists as PDF
  - Email notifications for registrations
  - Responsive design 
  - Rate limiting and security measures on API level
  - Environment variables for sensitive configurations
  - Clean and documented codebase

---

## Project Structure

```
/backend
├── crud.py              # Database actions
├── models.py            # SQLAlchemy models
├── schemas.py           # Pydantic schemas
├── main.py              # API routes and app setup
├── auth.py              # Authentication logic
├── email_functions.py   # Email handling
├── database.py          # Database connection setup
├── create_tables.py     # Set up the tables in the database
├── pdf_utils.py         # PDF creation

/frontend
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── pages/               # Pages like Profile, Offers, Contact, Events
├── api/axios.ts         # Axios instance for API calls
├── assets/              # Images and logos
```

---

## Main Features

### Public Website
- Browse and register for available seminars
- Detailed seminar information
- Information about specific offers
- Contact form
- Legal pages: Terms & Conditions, Privacy Policy, Imprint
- Paginated seminar listings
- Information about the business and business owner

### Admin Area
- Secure login using JWT authentication
- Dashboard for creating, editing, and deleting seminars
- View and manage participants
- Download participant lists as PDF to acknowledge attendance in the seminar
- Full CRUD functionality for seminars and locations

### Technical Stuff
- **FastAPI Backend**:
  - Fast and modular API
  - Dependency injection, error handling
  - 
- **React Frontend**:
  - Vite + TypeScript setup
  - Responsive UI using Material UI (MUI)
  - Form validation with React Hook Form and Zod
  - Dynamic loading and form success/error states
- **Security**:
  - HTTP-only (and strict) cookie sessions
  - Rate limiting with SlowAPI
  - Secure password handling (hashing + salting)
  - Environment variables for sensitive settings
- **PDF Generation**:
  - Simple PDF with seminar information and a participant list, downloadable with one click

---

## Notes
- Enabled HTTPS for production (I used mkcert)
- Set cookies to `SameSite=Strict` for additional protection before deployment
- Configure rate limits based on expected usage
- CORS configuration not safe at the moment

---

## Future Enhancements

- Payment integration
- Participant user accounts
- Improve rate limiting
- Admin reporting and statistics
- Email reminders for upcoming seminars

---
## Screenshots
### Contact Form
![Contact Form](https://github.com/user-attachments/assets/8eab995b-0079-4f84-8935-e8c7030eedc1)
### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/c7528168-ac95-4435-954e-28514d4a2389)
### Event page
![Event Page](https://github.com/user-attachments/assets/bb88328e-d3a3-4bab-a119-48b2816f3ea1)


