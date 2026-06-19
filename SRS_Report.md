# Software Requirements Specification (SRS)

## Chaitanya Multi Speciality Hospital Management System

---

| Document Info | Details |
|---|---|
| **Project Title** | Chaitanya Multi Speciality Hospital – Static Web-Based Management System |
| **Document Version** | 1.0 |
| **Prepared By** | Pranav (Intern) |
| **Organization** | Chaitanya Multi Speciality Hospital |
| **Date** | June 2026 |
| **Status** | Final |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features & Functional Requirements](#3-system-features--functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [External Interface Requirements](#5-external-interface-requirements)
6. [Use Case Descriptions](#6-use-case-descriptions)
7. [System Constraints & Assumptions](#7-system-constraints--assumptions)

---

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to describe the complete Software Requirements for the **Chaitanya Multi Speciality Hospital Management System** — a static web-based application. This SRS provides a detailed description of the system's features, functional requirements, non-functional requirements, and constraints, and is intended to guide the development, testing, and evaluation of the project.

### 1.2 Scope

The system is a **static front-end web application** developed using HTML5, CSS3, and Vanilla JavaScript. It consists of:

- A **Public-facing Hospital Website** (`index.html`) for patients and visitors.
- An **Admin Dashboard** (`dashboard.html`) for hospital administrators to manage internal operations.

The system does **not** include a backend server or persistent database. All data is managed in-memory using JavaScript arrays (mock data simulation), which makes it suitable for demonstration and internship evaluation purposes.

### 1.3 Definitions, Acronyms & Abbreviations

| Term | Definition |
|---|---|
| SRS | Software Requirements Specification |
| HMS | Hospital Management System |
| UI | User Interface |
| EAN-13 | European Article Number – 13 digit barcode standard for products |
| CSS | Cascading Style Sheets |
| JS | JavaScript |
| CRUD | Create, Read, Update, Delete |
| DOM | Document Object Model |
| CDN | Content Delivery Network |

### 1.4 References

- HTML5 Standard – W3C
- Font Awesome v6.4.0 – https://fontawesome.com
- Google Fonts (Poppins) – https://fonts.google.com
- html5-qrcode v2.3.8 – https://github.com/mebjas/html5-qrcode
- GitHub Repository – https://github.com/ITSPRANAV16/hms-internship-project

### 1.5 Overview

This document is organized as follows:
- **Section 2** describes the overall system context and product perspective.
- **Section 3** lists all functional requirements and system features.
- **Section 4** covers non-functional requirements such as performance and usability.
- **Section 5** describes external interface requirements.
- **Section 6** provides use case descriptions.
- **Section 7** documents system constraints and assumptions.

---

## 2. Overall Description

### 2.1 Product Perspective

The Chaitanya Multi Speciality Hospital Management System is an independent, self-contained static web application. It does not depend on any external server, database, or backend API. It is designed to run directly in a modern web browser by opening the HTML files, or by serving them through a local HTTP server for full camera functionality.

```
┌──────────────────────────────────────────────────┐
│              Web Browser (Client)                 │
│                                                   │
│   ┌─────────────────┐    ┌─────────────────────┐  │
│   │  index.html     │    │  dashboard.html     │  │
│   │  (Public Site)  │    │  (Admin Dashboard)  │  │
│   └────────┬────────┘    └──────────┬──────────┘  │
│            │                        │              │
│   ┌────────▼────────────────────────▼──────────┐  │
│   │           styles.css / dashboard.css        │  │
│   │           script.js / dashboard.js          │  │
│   └─────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
         ↑                         ↑
  Google Fonts CDN          Font Awesome CDN
  html5-qrcode CDN
```

### 2.2 Product Functions

The system provides the following high-level functions:

**Public Website (index.html):**
- Hospital information display
- Department/service listing
- Doctor directory with filtering
- Online appointment booking simulation

**Admin Dashboard (dashboard.html):**
- Overview with key statistics
- Patient & Bed Management (Add/View/Filter)
- Waste Management tracking (Add/View/Filter)
- Stock Management with low-stock alerts (Add/View/Filter)
- Barcode-based medicine scanning
- Staff Information directory (Add/View/Filter)

### 2.3 User Classes and Characteristics

| User Class | Description | Technical Level |
|---|---|---|
| **Patient / Visitor** | Accesses public website, views hospital info, books appointments | Non-technical |
| **Hospital Administrator** | Uses admin dashboard to manage patients, stock, waste, staff | Moderate |
| **Internship Evaluator** | Reviews the codebase and live demo | Technical |

### 2.4 Operating Environment

- **Platform:** Any modern web browser (Google Chrome, Firefox, Microsoft Edge)
- **Operating System:** Windows, macOS, Android, iOS
- **Internet Connection:** Required for loading CDN libraries (Font Awesome, Google Fonts, html5-qrcode)
- **Local Server:** Required for live camera barcode scanning (`python -m http.server 8000`)

### 2.5 Design and Implementation Constraints

- The system must be implemented using **only HTML5, CSS3, and Vanilla JavaScript** — no frameworks (React, Vue, Angular) are allowed.
- No backend server or database connectivity.
- All data is simulated using JavaScript arrays in memory.
- Data does **not persist** after page refresh.

---

## 3. System Features & Functional Requirements

### 3.1 Public Website

#### 3.1.1 Navigation Bar
- **FR-01:** The system shall display a fixed navigation bar at the top of the page.
- **FR-02:** The navbar shall include links to Home, About, Services, Doctors, and Contact sections.
- **FR-03:** The navbar shall include an "Admin Dashboard" button linking to `dashboard.html`.
- **FR-04:** On mobile screens (< 768px), the navbar shall collapse into a hamburger menu.

#### 3.1.2 Hero Section
- **FR-05:** The system shall display a hero banner with a hospital tagline and CTA button.
- **FR-06:** Clicking the CTA button shall scroll the page to the Contact/Booking section.

#### 3.1.3 Statistics Section
- **FR-07:** The system shall display hospital statistics (Total Beds, Doctors, Patients, Years of Service).

#### 3.1.4 About Section
- **FR-08:** The system shall display an "About Chaitanya Hospital" section with descriptive text.

#### 3.1.5 Services / Departments
- **FR-09:** The system shall display a grid of medical departments with relevant icons.
- **FR-10:** Departments displayed: Cardiology, Neurology, Pediatrics, Orthopedics, Ophthalmology, Dentistry.

#### 3.1.6 Doctor Directory
- **FR-11:** The system shall display a grid of doctors with their name and specialty.
- **FR-12:** The system shall provide filter buttons to filter doctors by specialty category.
- **FR-13:** Filtering shall update the displayed doctors dynamically without page reload.

#### 3.1.7 Appointment Booking Form
- **FR-14:** The system shall provide a contact and booking form with fields: Name, Email, Phone, Department, Date, Message.
- **FR-15:** Upon form submission, the submit button shall change to "Processing..." to simulate processing.
- **FR-16:** After 1 second, the system shall display a success alert confirming the booking.

#### 3.1.8 Scroll Animations
- **FR-17:** Sections shall animate into view (fade-in + slide-up) as the user scrolls using the IntersectionObserver API.

---

### 3.2 Admin Dashboard

#### 3.2.1 Sidebar Navigation
- **FR-18:** The dashboard shall have a fixed sidebar with navigation links for: Overview, Patient & Bed Management, Waste Management, Stock Management, Staff Info.
- **FR-19:** Clicking a navigation item shall switch the active content panel.
- **FR-20:** On mobile, the sidebar shall be collapsible via a hamburger menu button.

#### 3.2.2 Overview Module
- **FR-21:** The overview panel shall display summary cards: Total Beds, Available Beds, Stock Alerts, Total Staff.
- **FR-22:** The overview shall display a list of urgent stock alerts (items below minimum threshold).
- **FR-23:** The overview shall display a visual bar chart of today's waste breakdown by type.

#### 3.2.3 Patient & Bed Management
- **FR-24:** The system shall display a table of all patients with: Name, Age, Ward, Bed No., Admission Date, Doctor, Status.
- **FR-25:** The system shall allow filtering patients by ward name.
- **FR-26:** The system shall allow searching patients by name or bed number.
- **FR-27:** The system shall provide an "Add Patient" button that opens a modal form.
- **FR-28:** The Add Patient form shall collect: Patient Name, Age, Ward, Bed Number, Doctor, Status, Admission Date.
- **FR-29:** Upon saving, the new patient shall appear at the top of the patient table immediately.
- **FR-30:** Patient status badges shall be color-coded: Stable (Green), Critical (Red), Post-Op (Orange), Discharge (Blue).

#### 3.2.4 Waste Management
- **FR-31:** The system shall display a waste log table with: Date, Waste Type, Department, Weight (kg), Disposal Status.
- **FR-32:** Waste types shall be: Biomedical (Red), Sharps (Orange), General (Gray) — color-coded badges.
- **FR-33:** The system shall allow filtering the waste log by waste type.
- **FR-34:** The system shall provide an "Add Entry" button that opens a modal form.
- **FR-35:** The Add Waste form shall collect: Waste Type, Department, Weight (kg), Date, Disposal Status.
- **FR-36:** Upon saving, the new entry shall appear at the top of the waste log table immediately.

#### 3.2.5 Stock Management
- **FR-37:** The system shall display an inventory table with: Item Name, Category, Current Qty, Min. Threshold, Unit, Status.
- **FR-38:** Items where Current Quantity < Minimum Threshold shall be highlighted with a red row background.
- **FR-39:** Items below threshold shall show a "⚠ Restock Urgent" red badge in the Status column.
- **FR-40:** Summary cards shall display: Total Items, Low Stock Alerts count, Items OK count.
- **FR-41:** The system shall allow filtering inventory by category and searching by item name.
- **FR-42:** The system shall provide an "Add Item" button that opens a modal form.
- **FR-43:** The Add Stock form shall collect: Item Name, Category, Unit, Current Quantity, Minimum Threshold.

#### 3.2.6 Barcode Scanner (Stock)
- **FR-44:** The system shall provide a "Scan Barcode" button in the Stock Management tab.
- **FR-45:** The scanner modal shall offer three scanning methods: Live Camera, Photo Capture, Manual Entry.
- **FR-46:** Live Camera scanning shall use the device's back camera via the `getUserMedia` API.
- **FR-47:** The scanner shall support barcode formats: EAN-13, EAN-8, CODE-128, CODE-39, UPC-A, UPC-E.
- **FR-48:** Photo Capture shall allow the user to take a photo or upload an image of a barcode.
- **FR-49:** Manual Entry shall allow the user to type a barcode number and press Lookup.
- **FR-50:** Upon successful scan/lookup, the system shall display the medicine name and barcode number.
- **FR-51:** Clicking "Use This" shall auto-fill the Stock Add form with the scanned medicine's name, category, and unit.

#### 3.2.7 Staff Information
- **FR-52:** The system shall display a staff directory table with: Staff Name, Role, Department, Shift, Contact, Status.
- **FR-53:** Shift badges shall be color-coded: Morning (Blue), Evening (Orange), Night (Gray).
- **FR-54:** The system shall allow filtering staff by role and searching by name.
- **FR-55:** The system shall provide an "Add Staff" button that opens a modal form.
- **FR-56:** The Add Staff form shall collect: Full Name, Role, Department, Shift, Contact Number, Status.
- **FR-57:** Upon saving, the new staff member shall appear at the top of the staff table immediately.

#### 3.2.8 Toast Notifications
- **FR-58:** Upon successful form submission, the system shall display a green toast notification.
- **FR-59:** Toast notifications shall auto-dismiss after 3 seconds.
- **FR-60:** Error notifications (e.g., barcode not detected) shall appear as red toasts.

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement |
|---|---|
| NFR-01 | All pages shall load within 3 seconds on a standard broadband connection. |
| NFR-02 | JavaScript-driven table filtering shall respond within 100 milliseconds. |
| NFR-03 | Modal open/close animations shall complete within 300 milliseconds. |

### 4.2 Usability

| ID | Requirement |
|---|---|
| NFR-04 | The UI shall follow a consistent design language (Poppins font, Medical Blue color theme). |
| NFR-05 | All interactive buttons shall have visible hover states. |
| NFR-06 | The system shall be fully usable without a mouse, using keyboard navigation. |
| NFR-07 | Modal dialogs shall close when the user presses the ESC key or clicks outside the modal. |
| NFR-08 | All tables shall be horizontally scrollable on small screens. |

### 4.3 Responsiveness

| ID | Requirement |
|---|---|
| NFR-09 | The website shall be fully responsive and functional on screen widths from 320px to 2560px. |
| NFR-10 | On screens < 768px, the sidebar shall collapse and be accessible via a hamburger button. |
| NFR-11 | The services and doctor grids shall adapt from 3 columns to 1 column on mobile. |

### 4.4 Maintainability

| ID | Requirement |
|---|---|
| NFR-12 | Source code shall be organized into separate HTML, CSS, and JS files. |
| NFR-13 | CSS shall use variables (`:root`) for colors and fonts to enable easy theming. |
| NFR-14 | JavaScript data arrays (mock data) shall be clearly separated at the top of the JS file. |

### 4.5 Accessibility

| ID | Requirement |
|---|---|
| NFR-15 | All form inputs shall have associated labels. |
| NFR-16 | Color shall not be the sole means of conveying information (badges also include text labels). |
| NFR-17 | All images and icons shall have descriptive context via surrounding text or labels. |

### 4.6 Security (Static Scope)

| ID | Requirement |
|---|---|
| NFR-18 | No sensitive data shall be stored in the browser. |
| NFR-19 | The admin dashboard shall not expose any backend API endpoints. |

---

## 5. External Interface Requirements

### 5.1 User Interfaces

- The primary interface shall be a web browser.
- The application shall render correctly in Google Chrome 100+, Firefox 100+, and Microsoft Edge 100+.

### 5.2 Software Interfaces

| Library | Version | Purpose |
|---|---|---|
| Font Awesome | 6.4.0 | Medical and UI icons via CDN |
| Google Fonts (Poppins) | Latest | Premium typography via CDN |
| html5-qrcode | 2.3.8 | Barcode scanning (camera + file) via CDN |

### 5.3 Hardware Interfaces

- **Camera:** Required for live barcode scanning (smartphone or laptop webcam).
- **Display:** Minimum resolution of 320px width supported.
- **Input:** Mouse/trackpad and keyboard for desktop; Touch for mobile.

### 5.4 Communication Interfaces

- **HTTP/HTTPS:** CDN resources are loaded via HTTP/HTTPS.
- **Camera API (getUserMedia):** Requires HTTPS or `localhost` for live camera scanning.

---

## 6. Use Case Descriptions

### UC-01: Book Appointment (Patient)

| Field | Details |
|---|---|
| **Actor** | Patient / Website Visitor |
| **Precondition** | User is on the public website |
| **Main Flow** | 1. User navigates to Contact section → 2. Fills Name, Email, Phone, Department, Date → 3. Clicks "Confirm Booking" → 4. Button shows "Processing..." → 5. Success alert displayed |
| **Postcondition** | Booking confirmed (simulated) |

---

### UC-02: Add New Patient (Admin)

| Field | Details |
|---|---|
| **Actor** | Hospital Administrator |
| **Precondition** | Admin is on the Patient & Bed Management tab |
| **Main Flow** | 1. Clicks "+ Add Patient" → 2. Modal form opens → 3. Fills all required fields → 4. Clicks "Save Patient" → 5. New patient appears at top of table → 6. Toast notification shown |
| **Alternate Flow** | If required field is empty → browser validation error shown |
| **Postcondition** | New patient visible in the table |

---

### UC-03: Scan Medicine Barcode (Admin)

| Field | Details |
|---|---|
| **Actor** | Hospital Administrator |
| **Precondition** | Admin is on the Stock Management tab; site running on localhost |
| **Main Flow** | 1. Clicks "Scan Barcode" → 2. Scanner modal opens → 3. Clicks "Live Camera सुरू करा" → 4. Camera opens → 5. Holds medicine box barcode in front of camera → 6. Barcode detected → 7. Medicine name shown → 8. Clicks "Use This" → 9. Stock Add form opens pre-filled |
| **Alternate Flow A** | No camera → User takes photo and uploads → barcode decoded from image |
| **Alternate Flow B** | Manual → User types barcode number → Clicks Lookup |
| **Postcondition** | Stock form is pre-filled with scanned medicine details |

---

### UC-04: View Stock Alerts (Admin)

| Field | Details |
|---|---|
| **Actor** | Hospital Administrator |
| **Precondition** | Admin is on the dashboard |
| **Main Flow** | 1. Checks Overview panel → 2. Sees "Stock Alerts" count in orange card → 3. Views urgent items list → 4. Navigates to Stock Management tab → 5. Sees red-highlighted rows with "⚠ Restock Urgent" badge |
| **Postcondition** | Admin is aware of items requiring immediate reorder |

---

## 7. System Constraints & Assumptions

### 7.1 Constraints

1. The application is **static only** — no server-side processing is performed.
2. Data **does not persist** between page refreshes. All added records are lost on refresh.
3. Live camera barcode scanning requires the site to be accessed via **HTTPS** or **http://localhost**.
4. The barcode medicine lookup is limited to a **pre-defined set of 10 demo barcodes**. Unknown barcodes will return a generic item name.
5. The system is designed for **demonstration and evaluation purposes** — not for production hospital use.

### 7.2 Assumptions

1. The user's browser is modern and supports ES6+ JavaScript features.
2. An internet connection is available to load CDN resources.
3. For barcode scanning, the device has a functional camera (webcam or mobile camera).
4. Python 3.x or Node.js is installed on the machine for running the local server.
5. Hospital administrators have basic computer literacy to operate the dashboard.

---

## Appendix A — File Structure

```
HMS/
├── index.html          → Public hospital website
├── styles.css          → Styles for public website
├── script.js           → JavaScript for public website
├── dashboard.html      → Admin dashboard
├── dashboard.css       → Styles for admin dashboard
├── dashboard.js        → JavaScript for admin dashboard
├── start-server.bat    → Windows batch file to start local server
└── README.md           → Project report
```

## Appendix B — Technology Summary

| Category | Technology |
|---|---|
| Markup Language | HTML5 |
| Styling | CSS3, CSS Variables, Flexbox, Grid |
| Scripting | Vanilla JavaScript (ES6+) |
| Animations | CSS Transitions, IntersectionObserver API |
| Icons | Font Awesome 6.4.0 |
| Typography | Google Fonts – Poppins |
| Barcode Scanning | html5-qrcode v2.3.8 |
| Version Control | Git & GitHub |
| Deployment | GitHub Pages (optional) / Local HTTP Server |

---

*End of Software Requirements Specification Document*

*Prepared for internship evaluation at Chaitanya Multi Speciality Hospital | June 2026*
