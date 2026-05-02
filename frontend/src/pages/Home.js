import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomeStyles.css";

const Home = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("mytrips");

  return (
    <div className="home-container">
      {/* HERO SECTION — Jadoo Style (Image 5) */}
      <section className="jadoo-hero">
        <div className="jadoo-hero-content">
          <span className="jadoo-eyebrow">NEXT-GEN ITINERARIES POWERED BY AI</span>
          <h1 className="jadoo-title">
            Your perfect trip,<br/>
            <span className="jadoo-underline-swoosh">engineered by AI.</span>
          </h1>
          <p className="jadoo-desc">
            Stop spending hours scouring the web for recommendations. Our AI-driven engine 
            analyzes thousands of destinations to build a custom itinerary tailored exactly 
            to your budget, interests, and schedule.
          </p>
          <div className="jadoo-cta-group">
            <Link to={user ? "/dashboard" : "/register"} className="btn-jadoo-primary">
              Start Planning Now
            </Link>
            <button className="btn-jadoo-play">
              <div className="play-icon-circle">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              See AI in Action
            </button>
          </div>
        </div>
        
        <div className="jadoo-hero-image">
          <img 
            src="/shared_images/img7_jadoo_girl_isolated.png" 
            alt="Traveller" 
            className="jadoo-girl-img" 
          />
        </div>
      </section>

      {/* TOP DESTINATIONS */}
      <section className="top-destinations-section">
        <h2>Top Destinations</h2>
        <div className="destinations-grid">
          {[
            { id: "Las Vegas", img: "/destinations_images/dest_1.jpg" },
            { id: "Rome", img: "/destinations_images/dest_2.jpg" },
            { id: "Paris", img: "/destinations_images/dest_3.jpg" },
            { id: "London", img: "/destinations_images/dest_4.jpg" },
            { id: "New York City", img: "/destinations_images/dest_5.jpg" },
            { id: "Washington DC", img: "/destinations_images/dest_6.jpg" },
            { id: "Cancun", img: "/destinations_images/dest_7.jpg" },
            { id: "Florence", img: "/destinations_images/dest_8.jpg" },
            { id: "Barcelona", img: "/destinations_images/dest_9.jpg" },
            { id: "Oahu", img: "/destinations_images/dest_10.jpg" }
          ].map((dest) => (
            <Link 
              key={dest.id} 
              to="/dashboard" 
              state={{ destination: dest.id }}
              className="destination-card"
            >
              <div 
                className="destination-bg" 
                style={{ backgroundImage: `url(${dest.img})` }} 
              />
              <span className="destination-name">{dest.id}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOWCASE STRIP — Image 1: Adventure Laptop Mockup */}
      <section className="showcase-strip">
        <div className="showcase-strip-img-wrap">
          <img src="/shared_images/img1_adventure.png" alt="Adventure Awaits" className="showcase-strip-img" />
        </div>
        <div className="showcase-strip-text">
          <span className="showcase-strip-badge">✨ Smart Itineraries</span>
          <h2>Travel smarter,<br/>not harder</h2>
          <p>From weekend getaways to multi-city adventures — our AI builds the perfect plan around your style, budget, and pace.</p>
          <Link to={user ? "/dashboard" : "/register"} className="btn-get-started showcase-strip-cta">Plan My Trip →</Link>
        </div>
      </section>

      {/* MOUNTAIN CTA BANNER — Image 4: group summit achievement */}
      <section
        className="mountain-cta-banner"
        style={{ backgroundImage: "url(/shared_images/img4_mountain.png)" }}
      >
        <div className="mountain-cta-overlay" />
        <div className="mountain-cta-content">
          <h2>Everything you need<br/>for planning your trip</h2>
          <p>Powered by AI — personalized, precise, and ready in seconds.</p>
        </div>
      </section>

      {/* FEATURE 1: AI Control Center — Mumbai */}
      <section className="feature-block light-orange-bg feature-block-mumbai">

        {/* ── LEFT: AI Control Center ── */}
        <div className="ai-control-center">

          {/* AI badge */}
          <div className="ai-badge">
            <span className="ai-badge-dot" />
            AI Itinerary Optimization Active
          </div>

          <h2 className="control-center-title">
            Adjust your itinerary<br/>as needed
          </h2>

          {/* Mini Mumbai map SVG */}
          <div className="mumbai-map-wrap">
            <svg viewBox="0 0 260 160" className="mumbai-map-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Sea */}
              <rect width="260" height="160" fill="#dbeafe" rx="10"/>
              {/* South Mumbai landmass */}
              <path d="M60,10 C80,8 140,12 160,20 C180,28 190,50 185,80
                       C180,110 170,135 155,148 C140,158 120,158 105,145
                       C90,132 75,110 65,85 C55,60 50,30 60,10 Z"
                    fill="#e8e0d0" stroke="#c8b8a0" strokeWidth="1.2"/>
              {/* Roads */}
              <line x1="100" y1="20" x2="120" y2="140" stroke="#b0a090" strokeWidth="1.5" strokeDasharray="4,3"/>
              <line x1="75"  y1="70" x2="170" y2="85"  stroke="#b0a090" strokeWidth="1"   strokeDasharray="3,3"/>
              {/* Sea label */}
              <text x="205" y="85" fontSize="9" fill="#6b9ec0" fontWeight="600">Arabian</text>
              <text x="208" y="97" fontSize="9" fill="#6b9ec0" fontWeight="600">Sea</text>
              {/* Pin 1 – CSMT (north) */}
              <circle cx="112" cy="48" r="10" fill="#111827" opacity="0.9"/>
              <text x="112" y="52" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">1</text>
              {/* Pin 2 – Gateway (south) */}
              <circle cx="118" cy="112" r="10" fill="#f97316" opacity="0.9"/>
              <text x="118" y="116" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">2</text>
              {/* Dashed route line */}
              <line x1="112" y1="58" x2="118" y2="102" stroke="#111827" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
              {/* Place labels */}
              <text x="128" y="52"  fontSize="7.5" fill="#374151" fontWeight="600">CSMT</text>
              <text x="128" y="116" fontSize="7.5" fill="#374151" fontWeight="600">Gateway</text>
            </svg>
          </div>

          {/* Controls */}
          <div className="ctrl-panel">

            {/* View toggle */}
            <div className="ctrl-row">
              <span className="ctrl-label">View</span>
              <div className="view-toggle">
                <button className="vt-btn">List</button>
                <button className="vt-btn vt-active">Map</button>
              </div>
            </div>

            {/* Pacing slider */}
            <div className="ctrl-row ctrl-row-col">
              <span className="ctrl-label">Pacing</span>
              <div className="pacing-track">
                <span>Slow</span>
                <div className="pacing-slider-wrap">
                  <div className="pacing-bar"/>
                  <div className="pacing-thumb" style={{left:"50%"}}/>
                </div>
                <span>Fast</span>
              </div>
            </div>

            {/* Action buttons */}
            <button className="ctrl-btn ctrl-btn-primary">
              <span className="ctrl-btn-icon">⟳</span> Auto-Reorder for Efficiency
            </button>
            <button className="ctrl-btn ctrl-btn-secondary">
              <span className="ctrl-btn-icon">+</span> Add New Stop to Today
            </button>

          </div>
        </div>

        {/* ── RIGHT: Mumbai Itinerary Cards ── */}
        <div className="feature-graphics-right">
          <div className="mock-itinerary-card">
            <div className="mock-day-header">
              <span>Day 1 — Mumbai</span>
              <small>Tue, 28 Nov</small>
            </div>

            {/* Card 1 — CSMT */}
            <div className="mock-activity">
              <div className="mock-activity-num">1</div>
              <div className="mock-activity-text">
                <h4>Chhatrapati Shivaji Maharaj Terminus</h4>
                <p>Explore the UNESCO World Heritage Site's stunning Victorian Gothic architecture.</p>
                <small>🕒 90 min • Mumbai</small>
              </div>
              <div className="mock-activity-img" style={{ backgroundImage: `url(/mumbai/csmt.png)` }} />
            </div>

            {/* Card 2 — Gateway of India */}
            <div className="mock-activity">
              <div className="mock-activity-num mock-activity-num-orange">2</div>
              <div className="mock-activity-text">
                <h4>Gateway of India &amp; Taj Mahal Palace</h4>
                <p>Walk the promenade and soak in sweeping views of the Arabian Sea.</p>
                <small>🕒 120 min • Mumbai</small>
              </div>
              <div
                className="mock-activity-img"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
            </div>
          </div>
        </div>

      </section>

      {/* FEATURE 2: Everything in one space */}
      <section className="feature-block light-gray-bg">
        <div className="feature-text-left">
          <h2>Everything in one space</h2>
          <p>
            Whether it's your own personalized trip or a bookmarked plan, you'll find everything organized on a single page for your convenience.
          </p>
        </div>
        <div className="feature-graphics-right">
          <div className="mock-trips-grid">
            <h3 style={{marginBottom: "1rem"}}>Trips</h3>
            <div className="mock-tabs">
              <button
                id="tab-my-trips"
                className={activeTab === "mytrips" ? "active" : ""}
                onClick={() => setActiveTab("mytrips")}
              >My Trips</button>
              <button
                id="tab-collections"
                className={activeTab === "collections" ? "active" : ""}
                onClick={() => setActiveTab("collections")}
              >Collections</button>
            </div>

            {activeTab === "mytrips" && (
              <div className="grid-images">
                <img src="/trips/img1.jfif" alt="Trip 1" />
                <img src="/trips/img2.jfif" alt="Trip 2" />
                <img src="/trips/img3.jfif" alt="Trip 3" />
                <img src="/trips/img4.jfif" alt="Trip 4" />
                <img src="/trips/img5.jfif" alt="Trip 5" />
              </div>
            )}

            {activeTab === "collections" && (
              <div className="collections-grid">
                {[
                  { img: "/collections/col_1.png", title: "Wanderlust Bucket List", count: "12 places" },
                  { img: "/collections/col_2.png", title: "Foodie Adventures",       count: "8 places" },
                  { img: "/collections/col_3.png", title: "Relaxing Getaways",       count: "6 places" },
                  { img: "/collections/col_4.png", title: "Seasonal Favorites",      count: "9 places" },
                  { img: "/collections/col_5.png", title: "Adventure & Nature",      count: "11 places" },
                ].map((col, i) => (
                  <div key={i} className="collection-card">
                    <div
                      className="collection-card-bg"
                      style={{ backgroundImage: `url(${col.img})` }}
                    />
                    <div className="collection-card-overlay" />
                    <div className="collection-card-info">
                      <span className="collection-card-title">{col.title}</span>
                      <span className="collection-card-count">{col.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="blog-section">
        <h2 className="blog-section-title">Featured Posts</h2>
        <div className="blog-grid">
          
          <div className="blog-card">
            <div className="blog-image" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80)" }}></div>
            <div className="blog-content">
              <div className="blog-tags">
                <span className="blog-tag">Belize</span>
                <span className="blog-date">22 Sep, 2025</span>
              </div>
              <h3>Top 10 Picks for the Best Hotels in...</h3>
              <p>Our guide to the best hotels in Belize features 10 unforgettable spots—perfect for beach...</p>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80)" }}></div>
            <div className="blog-content">
              <div className="blog-tags">
                <span className="blog-tag">Serbia</span>
                <span className="blog-date">22 Sep, 2025</span>
              </div>
              <h3>The 10 Best Hotels in Belgrade: You...</h3>
              <p>Looking for the best hotels in Belgrade? These top 10 picks include river views, rooftop bars...</p>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80)" }}></div>
            <div className="blog-content">
              <div className="blog-tags">
                <span className="blog-tag">USA</span>
                <span className="blog-date">22 Sep, 2025</span>
              </div>
              <h3>The 7 Best Hotels in Bay Area: Top...</h3>
              <p>From city-center suites to coastal retreats, explore the best hotels in Bay Area with top...</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
