# Meditations 🍃

A thoughtful, personal blog platform designed for sharing reflections on everyday life, philosophy, pop culture, and media. Built with the **PERN stack** (PostgreSQL, Express, React, Node.js), this application features a public-facing reader interface and a secure, custom-built admin dashboard for content management.

![Project Preview](https://via.placeholder.com/800x400?text=Meditations+Homepage+Preview)
*(Replace this link with a screenshot of your actual homepage)*

## Features

### User / Public Interface
*   **Category Filtering:** Seamless navigation between topics like Philosophy, Video Games, Movies/TV, and Everyday Life.
*   **Responsive Design:** Fully mobile-friendly layout with a custom Navbar and sidebar behavior.
*   **Visuals:** Image support with custom styling, error handling, and placeholders.
*   **Aesthetic:** A "Gold & Brown" warm color theme using *Crimson Text* and *Inter* typography.

### Admin / Content Management
*   **Secure Authentication:** JWT-based login system for the site administrator.
*   **CRUD Operations:** Create, Read, Update, and Delete posts securely.
*   **Image Uploads:** File handling using **Multer** with instant image previews on the frontend.
*   **Smart UI:** Admin buttons (Edit/Delete/Create) are hidden from regular users and only appear after login.

## Tech Stack

**Frontend:**
*   React.js
*   React Bootstrap & Bootstrap 5
*   React Router v6
*   Axios
*   React Hot Toast (Notifications)

**Backend:**
*   Node.js & Express.js
*   PostgreSQL (Database)
*   Multer (File Uploads)
*   JSON Web Token (JWT Auth)
*   Dotenv

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
*   Node.js installed
*   PostgreSQL installed and running

### 1. Database Setup
Open your PostgreSQL tool (pgAdmin or terminal) and create a database. Then run the following SQL command to create the posts table:

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    header VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    img_source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 2. Backend Setup

3.  Create a `.env` file in the server root and add your configuration:
    ```env
    
    # Database Config
    DB_PASSWORD=<your_db_password>
    DB_PORT=<your_db_port>
    DB_NAME=<your_db_name>
    
    # Auth Config
    JWT_SECRET=<your_super_secret_random_string>
    ADMIN_PASSWORD=<your_secure_password>
    ADMIN_DB_ID=1
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### 3. Frontend Setup
1.  Navigate to the client folder (open a new terminal):
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React app:
    ```bash
    npm run dev
    ```

## Video

[![Youtube Video]()](https://www.youtube.com/watch?v=k8af1TWCG0E)

---

*“The happiness of your life depends upon the quality of your thoughts.” — Marcus Aurelius*

