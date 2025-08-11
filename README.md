# InstaLite AI Captions

A MERN stack social media app integrated with AI that automatically generates creative captions for uploaded images, making your posts stand out effortlessly.

---

## Features

- User authentication with JWT
- Upload images and create posts
- AI-powered automatic caption generation using Gemini API
- Responsive and clean UI
- Secure session handling with cookies

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI API:** Gemini API for caption generation

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account or local MongoDB setup
- Gemini API key (or your preferred AI caption service)

### Installation

1. Clone the repo

```bash
git clone https://github.com/yourusername/insta-lite-ai-captions.git
cd insta-lite-ai-captions
Install dependencies for backend and frontend


# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Setup environment variables

Create a .env file inside the backend folder with the following keys (replace placeholders with your actual secrets):


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
Important: Never commit your .env file to GitHub.

Run the backend server


cd backend
npm start
Run the frontend client


cd frontend
npm start
Open your browser and go to http://localhost:3000
