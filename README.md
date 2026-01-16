# Enclave Welcome Web

## Overview
Enclave Welcome Web is a web application for managing academic information,
including teachers, students, courses, majors, and class schedules.

The core feature of the system is a **QR-code-based attendance mechanism**:
teachers generate a QR code for each class session, and students scan the QR
code to check in for attendance.

The application also includes camera-based features powered by MediaPipe
to support real-time image processing.

---

## Features
- Teacher, student, course, and major management
- Class schedule management
- QR code generation for class attendance
- Student attendance check-in via QR code scanning
- Camera-based features using MediaPipe
- Responsive and modern user interface

---

## Technologies
- **Language:** TypeScript
- **Frontend Framework:** Vue 3
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Camera & Vision:** MediaPipe
- **Build Tool:** Vite

---

## Prerequisites
- Node.js >= 18 (Node.js 22 recommended)
- npm >= 9
- A modern browser (Chrome, Edge, or Firefox) with camera access enabled

---

## Project Setup

Install dependencies:

```sh
npm install
```
```sh
npm run dev
```