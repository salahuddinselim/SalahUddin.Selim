export interface ProjectData {
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: "frontend" | "backend" | "fullstack"
  year: number
  featured: boolean
  githubUrl?: string
  liveUrl?: string
}

export const projectsData: ProjectData[] = [
  {
    title: "Multilevel Puzzle Solving Game",
    description:
      "Award-winning desktop application featuring 5 logic puzzle levels with real-time multiplayer chat. Built with JavaFX for rich 2D rendering and Socket Programming for multithreaded client-server communication. Implements MVC architecture with producer-consumer patterns for concurrent game state management. Includes a custom level editor, MySQL-backed persistent leaderboard, and collaborative level-unlocking mechanics. Awarded 6th Runner-Up at UIU Software Project Competition, Spring 2025.",
    longDescription:
      "Developed as a team-based semester project, this multilevel puzzle game separates game logic from UI using the MVC pattern. The server uses Java threading with synchronized locks to manage concurrent player sessions. Each puzzle level introduces a distinct mechanic — tile-matching, pathfinding, memory sequence, logic gates, and pattern completion. The real-time chat system operates over TCP sockets with JSON message framing. The MySQL database stores player scores, level progress, and chat history. The custom level editor serializes puzzle configurations as XML, enabling non-programmers to design new levels. The project was evaluated on code quality, architectural design, and gameplay polish.",
    technologies: ["Java", "JavaFX", "MySQL", "Socket Programming", "Multithreading", "MVC"],
    category: "fullstack",
    year: 2025,
    featured: true,
  },
  {
    title: "IoT Fish Pond Monitoring System",
    description:
      "Embedded telemetry system for real-time aquaculture water quality monitoring. Uses Arduino Uno with pH, temperature, turbidity, and water-level sensors transmitting data over WiFi to a Python Flask dashboard. The dashboard visualizes historical trends via Chart.js and sends SMS alerts through Twilio when parameters exceed thresholds. A secondary Streamlit module runs regression models to predict optimal feeding times from temperature-oxygen correlations. Achieved 97% sensor uptime over a 30-day field trial in a 0.5-acre pond.",
    longDescription:
      "The sensor array collects readings at 5-minute intervals and publishes them over MQTT to a Raspberry Pi gateway. The Flask application stores telemetry in SQLite and exposes a REST API consumed by both the web dashboard and a mobile view. Alert thresholds are configurable per species. The predictive feeding model was trained on 14 days of sensor history using scikit-learn linear regression, achieving an R² of 0.82 on holdout data. The system was deployed with solar power backup and LoRa fallback for connectivity loss scenarios.",
    technologies: ["Arduino", "C++", "Python", "Flask", "Streamlit", "IoT", "MQTT", "Twilio"],
    category: "fullstack",
    year: 2024,
    featured: true,
  },
  {
    title: "Tournament Management System",
    description:
      "Full-stack web platform for organizing multi-stage tournaments across multiple sports. PHP backend with MySQL handles bracket generation (single-elimination, double-elimination, round-robin), team registration, referee assignment, and automated seeding. Frontend uses vanilla JavaScript with Tailwind CSS for responsive match scheduling. Real-time score updates via AJAX polling with optimistic UI. Supports 128 concurrent teams across 4 simultaneous tournaments with PDF/CSV standings export.",
    longDescription:
      "The bracket engine implements three elimination algorithms as strategy classes, making it trivial to add new formats. Seeding uses a configurable weighted formula based on team rating and past performance. The match scheduler avoids time conflicts by detecting overlapping court/field assignments. The admin panel includes role-based access control with three tiers: super admin, tournament organizer, and referee. The system was load-tested with 128 simulated teams and 15 rounds, completing bracket generation in under 2 seconds.",
    technologies: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "AJAX", "Full-Stack Web"],
    category: "fullstack",
    year: 2024,
    featured: true,
  },
  {
    title: "AI Voice Assistant",
    description:
      "Python-based voice-controlled assistant with natural language command execution. Uses SpeechRecognition + Google Web Speech API for speech-to-text, pyttsx3 for text-to-speech, and the Gemini API for intent classification on complex queries. Plugin-based architecture lets capabilities (weather, email, timer, file ops) hot-load without modifying core logic. Includes Porcupine wake-word detection, context-aware conversation memory, and a Streamlit GUI fallback for non-voice interaction.",
    longDescription:
      "The assistant's plugin system defines a common interface — each plugin registers intents, sample phrases, and an execute handler. The intent router uses a two-stage classifier: regex patterns for simple commands, Gemini API for ambiguous or multi-intent queries. Conversation memory is implemented as a sliding window of the last 10 exchanges stored in JSON. The Streamlit GUI provides a chat interface for environments without microphone access. The system runs on both Windows and Linux and is designed for extension to home automation via MQTT.",
    technologies: ["Python", "Gemini API", "SpeechRecognition", "Streamlit", "NLP", "LLM"],
    category: "backend",
    year: 2024,
    featured: false,
  },
  {
    title: "Cricket Player Information System",
    description:
      "Data-driven web application for searching and analyzing cricket player statistics. C++ backend processes match scorecards to compute career aggregates, head-to-head comparisons, and form trends using a custom Elo-based ranking algorithm. PHP/MySQL web interface serves results with sub-50ms query times via materialized SQL views. Supports 10,000+ player records with fuzzy search, comparative analytics, and interactive trend charts rendered in vanilla JavaScript.",
    longDescription:
      "The C++ data engine parses structured match data from CSV exports, computing per-player statistics including batting average, strike rate, economy rate, and a composite performance score. The Elo ranking variant adjusts player ratings match-by-match with a K-factor scaled by match importance (international > domestic). Materialized views in MySQL pre-compute the most expensive aggregations, refreshed nightly. The frontend search uses Levenshtein distance for fuzzy matching on player names. The system was built to demonstrate full-stack data engineering — from raw data processing to interactive visualization.",
    technologies: ["C++", "PHP", "MySQL", "JavaScript", "Data Processing", "Algorithms"],
    category: "fullstack",
    year: 2023,
    featured: false,
  },
]
