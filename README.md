# ✨ AI Powered Trip Planner

![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-Backend-black?style=for-the-badge&logo=express)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/NodeJS-Server-green?style=for-the-badge&logo=node.js)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens)

AI Powered Trip Planner is a full-stack MERN web application that generates personalized travel itineraries based on user preferences such as budget, travel duration and interests.

Users can create an account, generate trips and manage them from a dashboard.


## 🌟 Key Features

- **🧠 Intelligent Itinerary Engine**: Generate custom multi-day travel plans based on budget, interests, and duration.
- **💎 Glassmorphic Design**: A state-of-the-art UI utilizing backdrop blurs, vibrant mesh gradients, and elegant depth.
- **🪄 Conversational Wizard**: A multi-step preference collector that makes planning feel like a dialogue with a travel expert.
- **🔐 Secure Authentication**: Split-screen login and registration flow with floating labels, password toggles, and social login mockups.
- **📊 Interactive Dashboard**: Manage your generated trips in a clean, card-based interface with AI processing feedback.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile with a fluid layout.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vanilla CSS (Premium Glassmorphism), SVG Animations
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Custom Intelligent Logic for Itinerary Generation
- **Icons & Graphics**: Custom SVG Vector Illustrations

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or an Atlas URI)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/AI-POWERED-TRIP-PLANNER.git
   cd AI-POWERED-TRIP-PLANNER
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/tripDB
   JWT_SECRET=your_super_secret_key
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Start the React development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## 📂 Project Structure

```text
├── backend/
│   ├── controllers/    # Auth and Trip logic
│   ├── models/         # Mongoose schemas (User, Trip)
│   ├── routes/         # Express API routes
│   └── utils/          # AI Itinerary Generator logic
├── frontend/
│   ├── public/         # Static assets and images
│   └── src/
│       ├── components/ # Reusable UI components (Navbar, TripResult)
│       ├── context/    # Auth state management
│       └── pages/      # Main views (Home, Dashboard, Login, Register)
```

## 🎯 What This Project Demonstrates

- Building full-stack MERN applications from scratch  
- Designing and consuming REST APIs  
- Implementing JWT based authentication and protected routes  
- Managing application state and user sessions  
- Working with MongoDB and Mongoose schemas  
- Creating responsive and user-friendly UI  
- Structuring scalable frontend and backend architecture
  

## 🔮 Future Improvements
- Google Api & Maps integration  
- Hotel & flight suggestions  
- Cloud deployment
- Ai Assistant chatbot
