/**
 * Smart Local Itinerary Generator
 * Generates realistic day-wise travel plans without any paid API.
 * Adapts content based on destination, days, and budget level.
 */

// ─── Activity Pools ──────────────────────────────────────────────────────────

const MORNING_ACTIVITIES = {
  low: [
    "Take a refreshing early morning walk through the old city streets and explore local neighbourhood vibes",
    "Visit a lively public market and watch vendors set up — great for street photography",
    "Head to a free public park or lakeside promenade for a peaceful morning stroll",
    "Join a free walking heritage tour starting at the city centre",
    "Explore the riverbank or waterfront area — totally free and incredibly scenic",
    "Visit a famous temple, mosque, or historic monument (free or minimal entry fee)",
    "Catch the sunrise from a popular viewpoint — carry a thermos of local chai",
    "Browse a local farmer's market and sample inexpensive seasonal produce",
  ],
  medium: [
    "Begin the day with breakfast at a well-rated local café, then head to the city's top museum",
    "Book a guided heritage walk through the historic district (₹250–₹400 per person)",
    "Visit the famous botanical garden or zoo in the morning when it's least crowded",
    "Take a comfortable cab ride to the most iconic landmark for photos and exploration",
    "Enjoy a sit-down breakfast at a popular restaurant, then visit a nearby art gallery",
    "Check out the city's cultural centre or craft bazaar — great for souvenirs",
    "Hire a local auto-rickshaw for a short sightseeing circuit around the main attractions",
    "Visit the regional history museum — budget ₹300–₹600 for entry and a snack",
  ],
  high: [
    "Start the morning with a gourmet breakfast at your luxury hotel's restaurant",
    "Book a private guided heritage tour of the old city with a licensed historian",
    "Enjoy a spa session before heading to a premium sunrise viewpoint by private car",
    "Take a private yacht or boat ride along the coastal/river route in the early morning",
    "Visit the city's top landmark via a private, skip-the-queue guided experience",
    "Enjoy a hot air balloon ride or helicopter tour over the city skyline at dawn",
    "Indulge in a luxury wellness morning — yoga session, followed by brunch at a rooftop café",
    "Hire a premium chauffeur-driven car for a curated morning city tour",
  ],
};

const AFTERNOON_ACTIVITIES = {
  low: [
    "Grab a hearty street-food lunch (thali / local dish) for under ₹150, then rest at a shaded park",
    "Spend the afternoon at a public beach or riverside ghats — completely free",
    "Explore local bazaars on foot — bargain for handicrafts and local snacks",
    "Visit a government-run museum or free art exhibition",
    "Take a shared public bus tour around the city's scenic outskirts",
    "Sit at a roadside tea stall and chat with locals — an authentic travel experience",
    "Walk through the old city alleys and capture architecture on your phone",
    "Find a community library or cultural space and learn about local traditions",
  ],
  medium: [
    "Have lunch at a rooftop restaurant with a city view, then visit the local craft market",
    "Explore the city's famous shopping street — budget ₹1,000–₹2,500 for keepsakes",
    "Take an afternoon boat cruise or sightseeing bus tour with commentary",
    "Visit a well-known cooking class and learn to make the local specialty dish",
    "Head to a popular café, then explore a nearby historical neighbourhood",
    "Enjoy a local food tour (group tour ₹600–₹1,200) around the city's best eateries",
    "Visit a renowned art museum or science park in the afternoon",
    "Stop at a popular viewpoint for photos, then enjoy high tea at a nearby café",
  ],
  high: [
    "Savor a multi-course lunch at a Michelin-recommended or award-winning restaurant",
    "Enjoy an exclusive private cooking masterclass with a celebrity chef",
    "Take a bespoke shopping tour — personal stylist guides you through boutique stores",
    "Relax at a luxury rooftop pool, then explore the upscale shopping district",
    "Take a helicopter or private boat trip to a nearby scenic island or viewpoint",
    "Visit an exclusive art gallery or private museum with a personal curator",
    "Enjoy a private wine/whisky tasting session at a top-rated venue",
    "Book a luxury spa afternoon — couple's massage, aromatherapy, jacuzzi",
  ],
};

const EVENING_ACTIVITIES = {
  low: [
    "Watch the beautiful sunset from a free public viewpoint, then have a cheap street-food dinner",
    "Join locals at the evening market — grab grilled corn, local snacks, and fresh juice",
    "Take a peaceful evening stroll along the riverside or beach promenade",
    "Attend a free cultural event, street performance, or local festival if available",
    "Have dinner at a dhaba or small local eatery — filling meal under ₹200",
    "Explore the night market for cheap eats and local handicraft souvenirs",
    "Sit by the temple/mosque area in the evening and soak in the spiritual atmosphere",
    "Watch a free outdoor screening or community gathering in a public square",
  ],
  medium: [
    "Enjoy dinner at a well-rated multi-cuisine restaurant with good ambiance",
    "Attend a live music show, cultural dance performance, or stand-up comedy night",
    "Take an evening walking food tour around the city's popular street food hubs",
    "Relax at a rooftop bar with city views over cocktails and light bites",
    "Visit an illuminated monument or light-and-sound show at a heritage site",
    "Explore the vibrant nightlife district — lane-side cafes, pubs, and live music",
    "Watch a local theatre production, movie, or traditional dance show",
    "After dinner, stroll through a beautifully lit marketplace or sea-facing boulevard",
  ],
  high: [
    "Enjoy a lavish candlelit dinner at a premium fine-dining restaurant with a skyline view",
    "Attend an exclusive opera, jazz night, or private concert at a heritage venue",
    "Take a private sunset cruise with butler service, champagne, and gourmet canapés",
    "Experience a themed rooftop dinner experience with stunning panoramic views",
    "Watch a luxury live performance (ballet, theatre, classical music) at a prestigious venue",
    "End the evening with premium cocktails at a sky lounge or exclusive members' bar",
    "Enjoy a private chef's table dinner — 7-course meal with wine pairing",
    "Take an after-dark VIP city tour in a luxury vehicle with exclusive access spots",
  ],
};

const FOOD_SUGGESTIONS = {
  low: [
    "Try local street-side thali (₹80–₹150) — filling, authentic, and delicious",
    "Visit a popular local dhaba for regional specialties (₹100–₹180 per meal)",
    "Grab fresh fruit, coconut water, and local snacks from roadside vendors",
    "Try the region's famous budget dish — ask your hotel staff for the best spot",
    "Visit a government canteen or college mess for the cheapest quality food in town",
  ],
  medium: [
    "Dine at a well-rated multi-cuisine restaurant (₹400–₹900 per person)",
    "Try the city's signature dish at a famous local restaurant recommended by TripAdvisor",
    "Visit a popular food street for a mix of regional cuisines under one roof",
    "Book a table at a rooftop café for a meal with views (₹600–₹1,500 per meal)",
    "Try a regional thali set at a mid-range restaurant for a true culinary experience",
  ],
  high: [
    "Reserve a table at the city's top fine-dining restaurant (₹3,000–₹8,000 per person)",
    "Experience a private chef's tasting menu with local seasonal ingredients",
    "Enjoy high tea at a heritage hotel followed by a gourmet dinner with wine pairing",
    "Book a sunset dinner cruise with gourmet seafood and premium beverages",
    "Dine at a Michelin-listed or award-winning restaurant for an unforgettable experience",
  ],
};

const TRANSPORT_TIPS = {
  low: [
    "Use local buses, auto-rickshaws, and shared cabs to get around cheaply",
    "Rent a bicycle (₹100–₹200/day) to explore the city at your own pace",
    "Walk whenever possible — the best way to discover hidden gems",
    "Use a metro card or bus pass for unlimited daily travel at low cost",
  ],
  medium: [
    "Use app-based cabs (Uber/Ola) for convenient and affordable point-to-point travel",
    "Hire a local taxi for the full day (₹1,200–₹2,000) to cover multiple spots comfortably",
    "Take a comfortable AC bus or tourist hopper bus between major attractions",
    "Book a day tour package from your hotel's travel desk for curated sightseeing",
  ],
  high: [
    "Book a premium chauffeur-driven SUV for the entire trip duration",
    "Use helicopter transfers between destinations for ultimate luxury and time-saving",
    "Arrange a private airport-to-hotel limousine or premium executive sedan",
    "Charter a private boat or seaplane for inter-city or island transfers",
  ],
};

const HOTEL_SUGGESTIONS = {
  low: "Budget guesthouse or hostel (₹400–₹900/night) — clean, safe, and centrally located",
  medium: "Comfortable 3-star hotel or boutique stay (₹1,800–₹4,500/night) with good amenities",
  high: "Luxury 5-star resort or heritage palace hotel (₹9,000–₹25,000+/night) with premium services",
};

const GENERAL_TIPS = {
  low: [
    "Book accommodation in advance to lock the cheapest rates",
    "Carry a reusable water bottle and refill it — save ₹30–₹50 per stop",
    "Negotiate politely with auto-drivers and local vendors",
    "Download offline maps on Google Maps before you travel",
    "Visit major attractions on days with free entry (many museums have free days)",
  ],
  medium: [
    "Book activities and restaurants online in advance to avoid peak-hour waiting",
    "Get a city tourist card if available — often covers transport + major attractions",
    "Keep a daily budget tracker to avoid overspending on impulse purchases",
    "Ask your hotel concierge for insider tips on the best local restaurants",
    "Travel during weekdays to avoid weekend tourist rush at popular spots",
  ],
  high: [
    "Pre-book all premium experiences, restaurants, and tours at least 2 weeks in advance",
    "Hire a personal local concierge or travel butler for an entirely seamless trip",
    "Use a premium travel credit card for complimentary airport lounge access and rewards",
    "Request early check-in and late check-out at your luxury hotel",
    "Always carry travel insurance when booking high-value tours and experiences",
  ],
};

// ─── Helper: random pick ──────────────────────────────────────────────────────

function pick(arr, index) {
  return arr[index % arr.length];
}

// ─── Main Generator Function ──────────────────────────────────────────────────

/**
 * @param {string} destination
 * @param {number} days
 * @param {"low" | "medium" | "high"} budget
 * @param {string} [startDate]
 * @param {string} [travelers]
 * @param {string[]} [activities]
 * @returns {Object} structured json itinerary payload
 */
async function generateItinerary(destination, days, budget, startDate, travelers, activities) {
  const dest = destination.trim();
  const budgetKey = ["low", "medium", "high"].includes(budget) ? budget : "medium";
  const numDays = Math.min(Math.max(Number(days) || 3, 1), 30);

  const hotel = HOTEL_SUGGESTIONS[budgetKey];
  const transport = pick(TRANSPORT_TIPS[budgetKey], numDays);
  const tips = GENERAL_TIPS[budgetKey];
  const food = FOOD_SUGGESTIONS[budgetKey];

  const budgetLabel =
    budgetKey === "low"
      ? "1000 USD and under"
      : budgetKey === "medium"
      ? "1000 - 2500 USD"
      : "2500+ USD";

  const itineraryData = {
    destination: dest,
    daysCount: numDays,
    budgetLevel: budgetLabel,
    hotelIdea: hotel,
    transportIdea: transport,
    startDate: startDate || "",
    travelers: travelers || "",
    selectedActivities: activities || [],
    days: [],
    tips: tips
  };

  // Setup starting date for display logic
  let baseDate = null;
  if (startDate) {
    baseDate = new Date(startDate);
  }

  // --- Bulletproof Image Collection Engine ---
  let cityImages = [];
  const searchQueries = [
    `tourist attractions in ${dest}`,
    `landmarks in ${dest}`,
    `heritage monuments in ${dest}`,
    `cultural places in ${dest}`
  ];

  try {
    // Perform parallel searches for maximum variety
    const searchPromises = searchQueries.map(q => 
      fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=5&prop=pageimages&format=json&pithumbsize=500`)
        .then(r => r.json())
        .catch(() => ({ query: { pages: {} } }))
    );

    const results = await Promise.all(searchPromises);
    
    results.forEach(data => {
      const pages = data.query?.pages || {};
      Object.values(pages).forEach(page => {
        if (page.thumbnail?.source && !cityImages.includes(page.thumbnail.source)) {
          cityImages.push(page.thumbnail.source);
        }
      });
    });

    console.log(`📸 Unique Wiki Images for ${dest}: ${cityImages.length}`);

    // If Wikipedia didn't give us at least 15 unique images, we supplement with high-quality thematic fallbacks
    // These are carefully chosen travel-style photos that look natural in an itinerary.
    const thematicFallbacks = [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=500&q=80", // Travel desk
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80", // Cafe
      "https://images.unsplash.com/photo-1516483638261-f40af5aa11ce?auto=format&fit=crop&w=500&q=80", // Street View
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80", // Nature
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=500&q=80", // Airplane View
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=500&q=80", // Architecture
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=500&q=80", // Market
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=500&q=80", // House
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=500&q=80", // City Night
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80", // Pure Mountains (Replaced Beach person)
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=500&q=80", // Tower
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80", // European style
      "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=500&q=80", // Road Trip
      "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=500&q=80", // Garden
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80"  // Temple/Old architecture
    ];

    // Merge and ensure overall uniqueness
    thematicFallbacks.forEach(url => {
      if (!cityImages.includes(url)) cityImages.push(url);
    });

  } catch (err) {
    console.error("Image collection failed:", err.message);
  }

  for (let day = 1; day <= numDays; day++) {
    const offset = day - 1;

    const morning = pick(MORNING_ACTIVITIES[budgetKey], offset + day);
    const afternoon = pick(AFTERNOON_ACTIVITIES[budgetKey], offset + day + 2);
    const evening = pick(EVENING_ACTIVITIES[budgetKey], offset + day + 4);
    const mealTip = pick(food, offset);

    let displayDate = "";
    if (baseDate) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + offset);
      displayDate = currentDate.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short"
      }); // e.g. "Mon, 27 Nov"
    }

    let dynamicMorning = morning.replace(/the city|the old city/g, dest);
    let dynamicAfternoon = afternoon.replace(/the city|the old city/g, dest);
    let dynamicEvening = evening.replace(/the city|the old city/g, dest);

    // Inject user specific activities if available
    if (activities && activities.length > 0) {
      if (day === 1) dynamicAfternoon = `Focus on ${activities[0].toLowerCase()}: ` + dynamicAfternoon;
      else if (day === 2 && activities.length > 1) dynamicMorning = `Focus on ${activities[1].toLowerCase()}: ` + dynamicMorning;
    }

    // Fictionalizing specific local spots dynamically based on the destination to mock real API data.
    const morningPlaces = [
      `Breakfast at ${dest} Central Cafe`,
      `Walk at ${dest} Promenade`,
      `Visit the Historic ${dest} Monument`,
      `${dest} Heritage Walk`,
      `${dest} Botanical Gardens`
    ];
    const afternoonPlaces = [
      `${dest} National Museum`,
      `Lunch at Downtown ${dest}`,
      `${dest} Art Gallery`,
      `${dest} Cultural Center`,
      `Shopping at ${dest} Square`
    ];
    const eveningPlaces = [
      `Sunset at ${dest} Viewpoint`,
      `Dinner at ${dest} Local Eatery`,
      `${dest} Night Market`,
      `Evening stroll at ${dest} Harbor`,
      `${dest} Light & Sound Show`
    ];

    let tM = morningPlaces[(day + offset) % morningPlaces.length];
    let tA = afternoonPlaces[(day + offset + 1) % afternoonPlaces.length];
    let tE = eveningPlaces[(day + offset + 2) % eveningPlaces.length];

    // Day theme
    const themes = ["Romance", "Spirit of", "Heritage Walk", "Cultural Deep Dive", "Adventure & Beyond"];
    const themeStr = themes[offset % themes.length];
    
    // Pass through local proxy to bypass strict network firewalls
    // Added a random seed to each URL to force-break browser cache and guarantee variety rendering
    // Pass through local proxy to bypass strict network firewalls
    // Added a random seed to each URL to force-break browser cache and guarantee variety rendering
    const wrapProxy = (url, salt) => `http://localhost:5001/api/proxy-image?url=${encodeURIComponent(url)}&salt=${salt || "default"}`;

    // Non-repeating distribution logic: 
    // We walk through the pool with a large stride to ensure Day 1 Morning and Day 1 Afternoon are vastly different images
    const finalMUrl = wrapProxy(cityImages[(offset * 3 + 0) % cityImages.length], offset + "m");
    const finalAUrl = wrapProxy(cityImages[(offset * 3 + 1) % cityImages.length], offset + "a");
    const finalEUrl = wrapProxy(cityImages[(offset * 3 + 2) % cityImages.length], offset + "e");

    // Day title logic added directly to dayObj
    const dayObj = {
      day: day,
      displayDate: displayDate,
      dayTheme: `${dest} ${themeStr}`,
      timeline: [
        {
          timeOfDay: "Morning",
          timeLabel: "8:00 AM",
          isFood: true,
          title: tM,
          description: dynamicMorning,
          duration: "120 min",
          locationName: dest,
          imageUrl: finalMUrl
        },
        {
          timeOfDay: "Afternoon",
          timeLabel: "1:00 PM",
          isFood: false,
          title: tA,
          description: dynamicAfternoon,
          duration: "180 min",
          locationName: dest,
          imageUrl: finalAUrl
        },
        {
          timeOfDay: "Evening",
          timeLabel: "6:00 PM",
          isFood: false,
          title: tE,
          description: dynamicEvening,
          duration: "150 min",
          locationName: dest,
          imageUrl: finalEUrl
        }
      ],
      foodTip: mealTip
    };

    itineraryData.days.push(dayObj);
  }

  return itineraryData;
}

module.exports = generateItinerary;
