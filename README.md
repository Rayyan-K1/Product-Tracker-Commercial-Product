# Product Tracker – Commercial Web App

The **Product Tracker** is a web/iOS/Android application for small to medium businesses to track their products and the processes around them.

It’s aimed at teams that need something more structured than spreadsheets, but lighter than a full ERP system.

---

## Overview

Typical use cases:

- Track the lifecycle of products (e.g. idea → in development → in production → discontinued)
- Keep a central record of key product details and owners
- Log process steps or status updates as work progresses
- Give managers a quick overview of which products are where in the pipeline

The focus of this project is:

- A **simple front-end** that’s easy to use for non-technical staff
- A **PHP-backed** flow for handling data operations
- Clean separation between HTML pages, CSS styling, JavaScript behaviour and PHP server logic

---

## Features

### 📦 Product management

- Create new product records
- Store key fields such as:
  - Product name
  - Description / notes
  - Category or type
  - Owner / responsible person
- View a list of all products

### 🔁 Process / status tracking

- Track the current status of each product (e.g. “Planned”, “In Progress”, “Completed”)
- Record process steps or updates as products move through stages
- Help teams see where things are stuck or blocked

### 🔍 Filtering and search

- Search for a product by name or ID
- Filter products by:
  - Status
  - Category
  - Other filters you’ve implemented

### 📝 Detail views

- Click into a product to see more detailed information
- Show key metadata and any logged updates / process notes

### 🖥️ Simple, business-friendly UI

- Navigation to move between pages (dashboard, product list, forms, etc.)
- Layout and styling designed to be readable on standard desktop/laptop screens
- Clear call-to-action buttons for key operations (e.g. “Add Product”)

---

## Tech Stack

- **HTML** (~42%) – page structure and templates
- **JavaScript** (~41%) – front-end behaviour, validation, dynamic UI
- **PHP** (~9%) – server-side logic and handling of data submissions
- **CSS** (~8%) – styling and layout
- **Vue.js** - dynamic data handling for a responsive design
- **Framework7** - layout and styling for mobile application versions
- **Bootstrap** -  styling and layout
- **Charts.js** - Charts for audit data for administrators
- **JQuery** - efficient ajax calls
- **uuidV4** - unique ID generator for labelling distinction

```text
Product-Tracker-Commercial-Product/
  css/             # Stylesheets for layout, colours, typography
  html/ pages/     # Additional HTML pages / views
  js/              # Front-end JavaScript (form logic, interactions)
  php/             # PHP scripts for server-side handling
  resources/       # Shared assets (images, icons, etc.)
  index.html       # Main entry point / landing page
  README.md
