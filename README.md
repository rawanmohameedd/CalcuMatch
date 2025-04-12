# React + Flask Data Visualization Application

This project is a full-stack web application built with React frontend and Flask backend that allows users to authenticate and view/manipulate data in a tabular format with percentage visualization.

## Project Overview

The application features:
- User authentication with JWT tokens
- Protected routes that require authentication
- An animated login page with visual feedback
- A data table page that calculates and displays percentages with progress bars
- Responsive design using Material UI components

## Technology Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API requests
- Material UI for component styling
- Animated backgrounds and interactive UI elements

### Backend
- Flask (Python)
- SQLAlchemy ORM for database operations
- JWT for authentication
- Flask-CORS for handling cross-origin requests
- Werkzeug for password security

## Project Structure

```
project/
├── frontend/
│   ├── public/
│   │   └── [avatar images for login states]
│   └── src/
│       ├── components/
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   └── TablePage.tsx
│       ├── styles/
│       │   ├── background.tsx
│       │   └── theme.ts
│       └── App.tsx
└── backend/
    ├── app.py
    ├── models.py
    └── .env
```

## Features

### Authentication System
- Login form with username and password
- JWT token-based authentication
- Token storage in local storage
- Visual feedback for login states (success/failure)
- Protection against unauthorized access

### Data Visualization
- Interactive table with existing values
- Input fields for user values
- Real-time percentage calculation
- Progress bar visualization for percentages
- Responsive layout for different screen sizes

## Setup and Installation

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install flask flask-cors sqlalchemy jwt python-dotenv werkzeug
```

3. Create a `.env` file with the following variables:
```
SECRET_KEY=your_secret_key_here
DB_URI=sqlite:///database.db  # or your database connection string
```

4. Initialize the database:
```bash
python -c "from models import Base, User, Data; from sqlalchemy import create_engine; import os; from dotenv import load_dotenv; from werkzeug.security import generate_password_hash; load_dotenv(); engine = create_engine(os.getenv('DB_URI')); Base.metadata.create_all(engine); from sqlalchemy.orm import sessionmaker; Session = sessionmaker(bind=engine); session = Session(); admin = User(username='admin', password_hash=generate_password_hash('password')); session.add(admin); for i in range(1, 6): session.add(Data(existing_value=i*10)); session.commit(); session.close()"
```

5. Run the Flask application:
```bash
python app.py
```

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/login`: Authenticates user and returns JWT token
  - Request: `{ "username": "user", "password": "pass" }`
  - Response: `{ "status": "success", "token": "jwt_token", "username": "user" }`

### Data
- `GET /api/data`: Returns all data entries (requires authentication)
  - Response: `[{ "id": 1, "existing_value": 10 }, ...]`

## User Flow

1. User navigates to the login page
2. Upon successful authentication, user is redirected to the data table page
3. User can view existing data and input values to see percentage calculations
4. User can log out to return to the login page

## Security Features

- Password hashing with Werkzeug
- JWT token authentication
- Protected routes requiring authorization
- Token expiration handling
