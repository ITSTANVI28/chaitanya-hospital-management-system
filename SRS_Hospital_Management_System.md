# Software Requirements Specification (SRS)

## Chaitanya Multi Speciality Hospital Management System

---

| Document Info | Details |
|---|---|
| **Project Title** | Chaitanya Multi Speciality Hospital – Static Web-Based Management System |
| **Document Version** | 1.0 |
| **Organization** | Chaitanya Multi Speciality Hospital |
| **Status** | Final / Evaluation |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions & Acronyms](#13-definitions--acronyms)
2. [Overall Description](#2-overall-description)
   - 2.1 [System Architecture](#21-system-architecture)
   - 2.2 [Operating Environment](#22-operating-environment)
   - 2.3 [Constraints & Assumptions](#23-constraints--assumptions)
3. [System Features & Functional Requirements](#3-system-features--functional-requirements)
4. [Technology Summary](#4-technology-summary)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Use Case Descriptions](#6-use-case-descriptions)

---

## 1. Introduction

### 1.1 Purpose
Specifies the software requirements for the **Chaitanya Multi Speciality Hospital Management System (HMS)** client-side web application.

### 1.2 Scope
* **Public Website (`index.html`):** Patient-facing portal, doctor directory search, and appointment booking simulation.
* **Admin Dashboard (`dashboard.html`):** Management panel for beds, patients, inventory stock, waste logs, and staff shifts.
* **Architecture Constraint:** Static frontend implementation with in-memory state simulation; no database backend required.

### 1.3 Definitions & Acronyms
* **HMS:** Hospital Management System.
* **CRUD:** Create, Read, Update, Delete.
* **CDN:** Content Delivery Network (Font Awesome, Google Fonts).

---

## 2. Overall Description

### 2.1 System Architecture
The application is a self-contained static client-side web application:

```
┌────────────────────────────────────────┐
│              Web Browser               │ (Client Side)
│                                        │
│  ┌──────────────┐    ┌──────────────┐  │
│  │  index.html  │    │dashboard.html│  │
│  │ (Public Site)│    │(Admin Panel) │  │
│  └──────┬───────┘    └──────┬───────┘  │
│         │                   │          │
│         ▼                   ▼          │
│  ┌──────────────────────────────────┐  │
│  │    styles.css / dashboard.css    │  │
│  │    script.js  / dashboard.js     │  │
│  └──────────────────────────────────┘  │
└───────────────────┬────────────────────┘
                    │
           (Fetch CDN Resources)
                    │
                    ▼
  ┌──────────────────────────────────┐
  │ Google Fonts (Poppins) /         │
  │ Font Awesome / html5-qrcode CDNs │
  └──────────────────────────────────┘
```

### 2.2 Operating Environment
* **Client:** Web browsers (Chrome, Edge, Safari, Firefox) on desktop or mobile.
* **Server:** Local HTTP Server (`python -m http.server 8000`) for testing camera-based barcode scanning.

### 2.3 Constraints & Assumptions
* Static data state resets on page reload.
* Requires internet access for loading external icons, fonts, and scripts from CDNs.
* Requires browser camera permissions for the barcode scanner.

---

## 3. System Features & Functional Requirements

* **3.1 Public Navigation & About:** Navbar with smooth scroll links and counts for beds, doctors, and patients.
* **3.2 Services Grid:** Dynamic view of departments (Cardiology, Neurology, Pediatrics, Orthopedics, Ophthalmology, Dentistry).
* **3.3 Doctor Directory:** Filterable search interface categorizing active doctors by department.
* **3.4 Appointment Booking:** Input form (Name, Email, Phone, Date, Department) with simulated submission loader and toast confirmation.
* **3.5 Admin Dashboard Panel:** Sidebar navigation with key analytics cards (Beds, Stock Alerts, Waste stats, Staff counts).
* **3.6 Patient & Bed Management:** Bed assignment matrix with visual status tracking, patient search, and admission modal form.
* **3.7 Waste Logger:** Biomedical (Red), Sharps (Orange), and General (Gray) waste logging with live updating charts.
* **3.8 Stock Inventory:** Medicine and supply catalog with automatic low-level highlights and restock triggers.
* **3.9 Barcode Scanner:** Integrated camera/image scanner using `html5-qrcode` to auto-fill stock intake and details.
* **3.10 Staff Directory:** Staff listing by shifts (Morning, Evening, Night) and operational roles.

---

## 4. Technology Summary

| Category | Technology |
|---|---|
| **Structure** | HTML5 |
| **Styling** | CSS3, CSS Variables, Flexbox, Grid |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Animations** | CSS Keyframes & Transitions, IntersectionObserver API |
| **CDNs Used** | Font Awesome v6.4.0, Google Fonts (Poppins), html5-qrcode v2.3.8 |

---

## 5. Non-Functional Requirements

* **Performance:** Page load under 3 seconds; search/filtering reaction in under 100ms.
* **Security:** Clean, static code with no hardcoded credentials; zero permanent user data retention.
* **Usability:** Premium modern design using Poppins typography, accessibility-friendly forms, and ESC-key modal closing.
* **Responsiveness:** Fluid grid layout supporting mobile view (collapsible sidebar) to wide desktop screens.

---

## 6. Use Case Descriptions

* **UC-01: Book Appointment:** Patient fills public form -> Clicks book -> Simulated loading state -> Toast success notification.
* **UC-02: Admit Patient:** Staff opens patient modal -> Fills details -> Submits -> Bed matrix updates and counts increment.
* **UC-03: Barcode Scan:** Staff scans medicine bar/QR code -> System matches item in lookup -> Auto-fills the inventory form.
* **UC-04: Monitor Stock:** Dashboard highlights low stock items in red, warning staff to initiate a restock process.

---

*End of Software Requirements Specification Document*
