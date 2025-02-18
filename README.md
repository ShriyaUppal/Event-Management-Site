# EVENT MANAGEMENT PLATFORM

This project is a full-stack event management platform that allows users to create, manage, and attend events. It includes a user authentication system, event creation, real-time attendee updates, and more.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Links](#links)
6. [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-management-platform.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd event-management-platform/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file based on the `.env.example`:

   ```bash
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongo_connection_url
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

6. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
7. Navigate to the vite-project directory

   ```bash
    cd ../vite-project
   ```

8. Install frontend dependencies:

   ```bash
   npm install
   ```

9. Start the frontend server:
   ```bash
   npm run dev
   ```

Now, you can access the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Usage

1. Navigate to the frontend URL (e.g., `http://localhost:5173`).
2. Create an account by registering with your name, email, and password.
3. Once registered, you can log in using your credentials.
4. Use the event dashboard to create, view, and manage events.

## Features

- **User Authentication**: Register, log in, and log out with JWT-based authentication.
- **Event Management**: Create, update, and delete events.
- **Event Filtering**: Filter events by categories, dates, and tags.
- **Guest Login Limited Access**: Guest User can't update, create, or delete events.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Free Tier)
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt.js
- **Hosting**: Netlify (Frontend), Render (Backend)

## Links

- [Frontend Live URL](https://dreamy-caramel-fa0755.netlify.app/)
- [Backend Live URL](https://event-management-backend-mf6a.onrender.com/)

## License

This project is licensed under the MIT License.
