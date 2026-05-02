# ✨ AI Powered Trip Planner

A premium, professional-grade travel planning platform that leverages AI to generate personalized, high-quality itineraries in seconds. Designed with a modern **Glassmorphic UI**, high-end micro-animations, and a conversational user experience.

![Project Preview](https://via.placeholder.com/1200x600?text=AI+Powered+Trip+Planner+Preview)

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

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for a better travel experience.
