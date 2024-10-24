# SecurePass

SecurePass is a web application aimed at enhancing password security through proactive notifications and logging of failed login attempts. The application features user registration and login functionalities, alerting users whenever there are incorrect password attempts on their accounts.

## Key Features

- **User Registration and Login**: Users can create accounts and log in using their credentials.
- **Security Notifications**: Users receive immediate alerts for any failed login attempts, detailing the username and attempted password.
- **Logging of Attempts**: The application records each failed login attempt in both JSON and CSV formats, allowing users to review their login history.
- **Profile Page**: A dedicated profile page displays all wrong login attempts associated with the user's account, providing insights into potential unauthorized access.

## Technology Stack

- **Next.js**: A React-based framework for server-side rendering and building user interfaces.
- **React**: A JavaScript library for crafting dynamic user experiences.
- **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development.
- **Node.js**: A runtime environment for executing server-side JavaScript.

## Usage

1. **User Registration**: Users can create an account by providing their email and password.
2. **Login**: Users can log in with their registered credentials.
3. **Security Alerts**: The application logs failed login attempts, helping users identify potential security risks.
4. **Profile Page**: Users can view their login attempt history on their profile page, promoting better password management practices.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SecurePass.git
   cd SecurePass
2. Install the dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev
  Open your browser and navigate to http://localhost:3000.
