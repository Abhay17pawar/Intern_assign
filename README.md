
This is a  application built with React, nodejs and postgreSQL allowing users to log in, add users, view all users, and filter the data based on name and type.

🚀 Features

Login: Secure login using a token stored in localStorage.

Add Users: Authenticated users can add new users with a name and type (Child, Mother, Father, Teacher).

View All Users: Display a list of all users stored in the backend.

Search and Filter: Easily search users by name and filter them based on their type.

Logout: Users can log out, removing the token and redirecting them to the login page.


🛠 Technologies Used

Frontend: React

Backend: Node.js, Express

Database: postgreSQL

Authorization: JWT (JSON Web Tokens)

📋 Project Setup

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14+)

npm or yarn (package manager)

A running backend API

Installing Dependencies

Clone the repository:

bash
Copy
git clone https://github.com/yourusername/dashboard-app.git

Navigate to the project directory:

bash
Copy
cd dashboard-app
Install the dependencies:

bash
Copy
npm install
Running the Application
To run the project locally, follow these steps:

Start the backend API. (Make sure it’s running on http://localhost:5000 or the URL specified in your code).

Start the React development server:


npm start

Create .env File

Create a .env file in the root directory of your project and add the following environment variables:

PORT=

DATABASE_URL=

JWT_SECRET=

SECRET_KEY=



License
This project is licensed under the MIT License.
