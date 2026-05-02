import React from "react";
import "./TripResultStyles.css";

const TripResult = ({ trip }) => {
  if (!trip) return null;

  // Handle backward compatibility if it's still a raw string block
  const isRawString = typeof trip.itinerary === "string";
  let itineraryData = null;

  if (!isRawString) {
    itineraryData = trip.itinerary;
  }

  // Fallback for old string itineraries
  if (isRawString) {
    return (
      <div className="trip-result-container">
        <h2 className="trip-result-title">Your Trip to {trip.destination}</h2>
        <div className="legacy-text-itinerary">
          {trip.itinerary.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  const {
    destination,
    daysCount,
    budgetLevel,
    selectedActivities,
    days,
    hotelIdea,
    transportIdea,
  } = itineraryData;

  const activityString = selectedActivities && selectedActivities.length > 0
    ? selectedActivities.join(" • ")
    : "Sightseeing • Relaxation • Exploration";

  return (
    <div className="trip-result-container" id="trip-result">
      {/* HEADER TILE */}
      <div className="trip-header-block">
        <div className="trip-date-pill">
          {daysCount} Days
        </div>
        <h1 className="trip-main-title">
          {daysCount} Days trip in {destination} 🌍
        </h1>
        <p className="trip-meta-row">
          {budgetLevel} &nbsp;&middot;&nbsp; {activityString}
        </p>

        <p className="trip-intro-desc">
          {destination} is a fantastic destination to explore! Based on your preferences, we've curated an exclusive plan focusing on {activityString.toLowerCase()}. 
          Recommended accommodation footprint: {hotelIdea}.
          Best way to get around: {transportIdea}.
        </p>
      </div>

      {/* DUMMY INFO GRID (Based on Mockups) */}
      <div className="info-grid-block">
        <div className="info-grid">
          <div className="info-item"><span>💵</span> Local Currency</div>
          <div className="info-item"><span>💱</span> Suggested: Wise</div>
          <div className="info-item"><span>💳</span> Digital Payments Accepted</div>
          <div className="info-item"><span>🔌</span> Standard Plug Type</div>
          <div className="info-item"><span>🌐</span> Varies Timezone</div>
          <div className="info-item"><span>🌤️</span> Pleasant Climate</div>
          <div className="info-item"><span>🗣️</span> Local / English</div>
          <div className="info-item"><span>🚌</span> {transportIdea.substring(0, 30)}...</div>
        </div>
      </div>

      {/* ITINERARY TIMELINE */}
      <div className="itinerary-wrapper">
        <div className="itinerary-header-row">
          <h2>Itinerary</h2>
          <button className="btn-deals">Best Deals</button>
        </div>

        {days && days.map((dayObj, dIdx) => (
          <div key={dIdx} className="day-accordion">
            <div className="day-accordion-header">
              <span className="accord-arrow">v</span> Day {dayObj.day}
              {dayObj.dayTheme && <span className="accord-theme"> - {dayObj.dayTheme}</span>}
              <span className="accord-date">{dayObj.displayDate}</span>
            </div>

            <div className="day-timeline">
              {dayObj.timeline.map((act, aIdx) => (
                <div key={aIdx} className="ref-card">
                  <div className="ref-card-time">{act.timeLabel || "10:00 AM"}</div>
                  
                  <div className="ref-card-body">
                    <div className="ref-card-left">
                      <div className="ref-title-row">
                        <span className="ref-icon">{act.isFood ? "🍽️" : "🚶"}</span>
                        <h4 className="ref-title">{act.title}</h4>
                      </div>
                      <p className="ref-desc">{act.description}</p>
                      
                      <button className="ref-book-btn">🎫 Book a Tour</button>
                    </div>

                    <div className="ref-card-right">
                      {/* Image securely packed in the right box like the screenshot using standard img tag */}
                      <img 
                        src={act.imageUrl}
                        alt={act.title}
                        className="ref-card-image" 
                      />
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>

            {/* Food Tip Block */}
            {dayObj.foodTip && (
              <div className="food-tip-card">
                <span className="food-tip-icon">🍽️</span>
                <p><strong>Food Tip:</strong> {dayObj.foodTip}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripResult;
