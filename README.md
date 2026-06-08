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
