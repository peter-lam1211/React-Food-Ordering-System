# Food Delivery Management System

A comprehensive React-based Food Delivery Management System developed for tracking and managing food orders. The application serves three distinct user roles: Customers, Restaurants, and Delivery Riders.

## 🌟 Key Features

The system is separated into three main portals:

### 1. Customer Portal

- Browse restaurant menus and food items
- Manage shopping cart and food quantities
- Secure checkout process
- View order history and order statuses

### 2. Restaurant Portal

- Manage and view incoming orders
- Update menu items
- Dashboard with charts and statistics (powered by Chart.js)
- Update order statuses (e.g., Prepared, Cooking)

### 3. Delivery Portal

- Interactive chatbox for communication
- Track delivery progress
- View pickup order history

## 🛠️ Technology Stack

- **Frontend Framework:** React 18
- **Routing:** React Router v6
- **UI Component Library:** Material UI
- **Styling:** CSS & Emotion
- **Notifications:** React Toastify
- **Data Visualization:** Chart.js
- **Mock Database:** `db.json` (Used for simulating backend API responses)

## 📁 Project Structure

```text
src/
├── css/                  # Stylesheets organized by module
├── CustomerPage/         # Components specific to the Customer view (cart, checkout, etc.)
├── RestaurantPage/       # Components specific to the Restaurant view (menu, orders, etc.)
├── DeliveryPage/         # Components specific to the Delivery Rider view (progress, history)
├── LoginRegister/        # Authentication components used across all roles
├── App.js                # Main application routing and entry point
└── index.js              # React DOM render entry
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install project dependencies:

   ```bash
   npm install
   ```
2. Start the development server:

   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Mock Database (db.json)

The project includes a `db.json` file which acts as a mock database. If you use [JSON Server](https://github.com/typicode/json-server) to serve this data, you can run:

```bash
npx json-server --watch db.json --port 8000
```

## 🖼️ UI Showcase - Partial
### Login Page
<img width="1394" height="700" alt="image" src="https://github.com/user-attachments/assets/b612c899-3725-4c7e-8c73-aeecc8d3bf70" />

### Restaurant Portal 
<img width="1410" height="698" alt="image" src="https://github.com/user-attachments/assets/b0a2a287-1eb6-4b8e-b503-0b96b3f25990" />
<img width="1409" height="700" alt="image" src="https://github.com/user-attachments/assets/14b7fb1d-5d7e-4c8d-a7f3-835e80c7768d" />
<img width="1409" height="698" alt="image" src="https://github.com/user-attachments/assets/35535a6a-c428-494c-be1b-c7d30a07749f" />

### Delivery Portal
<img width="1409" height="702" alt="image" src="https://github.com/user-attachments/assets/e1fc34f9-58e5-48c2-943e-61cb15bb1bf5" />

