📺 Netflix Clone - React + TMDB
A high-performance Netflix clone built with React, Tailwind CSS, and Firebase. This app features dynamic content filtering for Movies and TV Shows, a global trailer modal with YouTube integration, and a fully responsive UI.

🚀 Features
Dynamic Routing: Separate sections for Home, TV Shows, and Movies using a shared, intelligent Home.jsx component.

Global Trailer Modal: Watch trailers instantly using react-youtube and movie-trailer logic.

Authentication: Secure login and signup powered by Firebase Auth.

Watchlist: Add your favorite titles to "My List" (Persisted via Firebase/Context).

Live Search: Real-time search functionality that redirects as you type.

Responsive Design: Mobile-first approach using Tailwind CSS.

🛠️ Tech Stack
Frontend: React.js (Vite)

Styling: Tailwind CSS, Framer Motion (Animations)

Routing: React Router DOM v6

Backend/Database: Firebase (Authentication & Firestore)

API: TMDB (The Movie Database)

📦 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
Install dependencies:

Bash
npm install
Environment Variables:
Create a .env file in the root directory and add your TMDB API Key:

Code snippet
VITE_TMDB_KEY=your_tmdb_api_key_here
Run the App:

Bash
npm run dev
📂 Project Structure Highlights
App.jsx: The brain of the app. Handles the global modal state and manages routes for /, /tv-shows, and /movies.

Navbar.jsx: Features smart navigation using useNavigate to switch between content types.

Home.jsx: A reusable page component that accepts a type prop (movie or tv) to filter MovieRows and Banners dynamically.

requests.js: Centralized API endpoints for TMDB categories.

🎬 How the Filtering Works
The app uses a single Home component to handle multiple pages. By passing a type prop through the ProtectedRoute in App.jsx, the component knows exactly which API endpoints to hit:

JavaScript
// Example from App.jsx
<Route path="/tv-shows" element={<ProtectedRoute><Home type="tv" /></ProtectedRoute>} />
Inside Home.jsx, the banner and rows adjust based on whether type is movie, tv, or null (Home).
