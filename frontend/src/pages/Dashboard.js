import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import TripResult from "../components/TripResult";

const Dashboard = () => {
  const location = useLocation();
  const defaultDestination = location.state?.destination || "";

  const [formData, setFormData] = useState({
    destination: defaultDestination,
    startDate: "",
    days: 3,
    budget: "medium",
    travelers: "Couple",
    activities: [],
  });
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.destination.trim()) {
      setError("Please enter a destination to proceed.");
      return;
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setError("");
    setCurrentStep(currentStep - 1);
  };

  const handleIncrementDays = () => {
    if (formData.days < 30) setFormData({ ...formData, days: formData.days + 1 });
  };
  const handleDecrementDays = () => {
    if (formData.days > 1) setFormData({ ...formData, days: formData.days - 1 });
  };

  const handleSelectBudget = (budget) => {
    setFormData({ ...formData, budget });
  };

  const handleSelectTravelers = (travelers) => {
    setFormData({ ...formData, travelers });
  };

  const toggleActivity = (activity) => {
    const current = formData.activities;
    if (current.includes(activity)) {
      setFormData({ ...formData, activities: current.filter((a) => a !== activity) });
    } else {
      setFormData({ ...formData, activities: [...current, activity] });
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setTrip(null);

    if (!formData.destination.trim()) {
      setError("Please enter a destination to proceed.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/api/trip/generate", {
        destination: formData.destination.trim(),
        days: formData.days,
        budget: formData.budget,
        startDate: formData.startDate,
        travelers: formData.travelers,
        activities: formData.activities,
      });
      setTrip(res.data.trip);
      setTimeout(() => {
        document.getElementById("trip-result")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activitiesList = [
    { name: "Beaches", icon: "🏖️" },
    { name: "City sightseeing", icon: "🗼" },
    { name: "Outdoor adventures", icon: "🧗" },
    { name: "Festivals/events", icon: "🎭" },
    { name: "Food exploration", icon: "🍜" },
    { name: "Nightlife", icon: "🍸" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Spa wellness", icon: "💆" },
  ];

  return (
    <div className="dashboard-page">
      <div className="generator-card glassmorphic-card">
        {/* Progress Bar */}
        <div className="wizard-progress-bar">
          <div className="wizard-progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>

        <div className="wizard-header">
          <div className="ai-sparkle-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <path d="M21 3L14.5 21L10 14L3 9.5L21 3Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="wizard-title">Tell us your travel preferences</h2>
          <p className="wizard-subtitle">
            Let our AI engine build your perfect, personalized itinerary.
          </p>
        </div>

        {error && <div className="alert alert-error" id="generate-error">{error}</div>}

        <div className="generator-form-wrapper">
          {/* STEP 1: Destination & Dates */}
          {currentStep === 1 && (
            <div className="wizard-step step-1">
              <div className="question-block">
                <h3 className="question-title">Where are we going?</h3>
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    name="destination"
                    placeholder="e.g. Paris, Tokyo, Bali"
                    value={formData.destination}
                    onChange={handleChange}
                    className="form-input autocomplete-input"
                  />
                </div>
              </div>

              <div className="question-block">
                <h3 className="question-title">When is the trip?</h3>
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="question-block">
                <h3 className="question-title">How many days?</h3>
                <div className="counter-row">
                  <span className="counter-label">Days</span>
                  <div className="counter-controls glass-counter">
                    <button type="button" className="counter-btn" onClick={handleDecrementDays}>&minus;</button>
                    <span className="counter-value">{formData.days}</span>
                    <button type="button" className="counter-btn" onClick={handleIncrementDays}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Budget & Travelers */}
          {currentStep === 2 && (
            <div className="wizard-step step-2">
              <div className="question-block">
                <h3 className="question-title">What is your budget?</h3>
                <p className="selection-desc">Allocated for activities and dining.</p>
                <div className="selection-grid">
                  <div className={`selection-card glass-card ${formData.budget === "low" ? "selected" : ""}`} onClick={() => handleSelectBudget("low")}>
                    <div className="selection-icon-gradient">💸</div>
                    <div>
                      <h4 className="selection-title">Low</h4>
                      <p className="selection-desc">0 - 1000 USD</p>
                    </div>
                  </div>
                  <div className={`selection-card glass-card ${formData.budget === "medium" ? "selected" : ""}`} onClick={() => handleSelectBudget("medium")}>
                    <div className="selection-icon-gradient">💵</div>
                    <div>
                      <h4 className="selection-title">Medium</h4>
                      <p className="selection-desc">1000 - 2500 USD</p>
                    </div>
                  </div>
                  <div className={`selection-card glass-card ${formData.budget === "high" ? "selected" : ""}`} onClick={() => handleSelectBudget("high")}>
                    <div className="selection-icon-gradient">💳</div>
                    <div>
                      <h4 className="selection-title">High</h4>
                      <p className="selection-desc">2500+ USD</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="question-block">
                <h3 className="question-title">Who is traveling?</h3>
                <div className="selection-grid">
                  {['Solo', 'Couple', 'Family', 'Friends'].map(type => {
                    let icon = type === 'Solo' ? '🎒' : type === 'Couple' ? '🥂' : type === 'Family' ? '👨‍👩‍👧‍👦' : '🙌';
                    return (
                      <div key={type} className={`selection-card glass-card ${formData.travelers === type ? "selected" : ""}`} onClick={() => handleSelectTravelers(type)}>
                        <div className="selection-icon-gradient">{icon}</div>
                        <h4 className="selection-title">{type}</h4>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Activities & Generate */}
          {currentStep === 3 && (
            <div className="wizard-step step-3">
              <div className="question-block">
                <h3 className="question-title">Which activities interest you?</h3>
                <div className="selection-grid">
                  {activitiesList.map(act => (
                    <div 
                      key={act.name} 
                      className={`selection-card glass-card activity-card ${formData.activities.includes(act.name) ? "selected" : ""}`} 
                      onClick={() => toggleActivity(act.name)}
                    >
                      <div className="selection-icon-gradient">{act.icon}</div>
                      <h4 className="selection-title">{act.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="wizard-navigation">
            {currentStep > 1 && (
              <button type="button" className="btn-wizard-back" onClick={handleBack} disabled={loading}>
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button type="button" className="btn-wizard-next" onClick={handleNext}>
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn-wizard-generate shimmer-button"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="ai-scanning-icon"></span>
                    <span>Processing AI Itinerary...</span>
                  </>
                ) : (
                  "Generate My Trip"
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="loading-container">
          <div className="loading-card">
            <div className="plane-loader">✈️</div>
            <h3>Finalizing plans...</h3>
            <p>Our smart engine is organizing {formData.days} wonderful days in {formData.destination}</p>
            <div className="loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}

      {/* Trip Result */}
      {trip && !loading && <TripResult trip={trip} />}
    </div>
  );
};

export default Dashboard;
