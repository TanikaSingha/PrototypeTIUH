import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const videoLinks = [
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658888/bgfvjzpklnz6cq1lv4pg.mp4",
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724659068/rpcvt0eejq8plxdayqi1.mp4",
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658770/jgmecb0bdmaz0hpe43lw.mp4",
];

const HomePage = () => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentVideoIndex(
          (prevIndex) => (prevIndex + 1) % videoLinks.length
        );
        setFade(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          src={videoLinks[currentVideoIndex]}
          type="video/mp4"
          autoPlay
          muted
        />
        <div className="relative z-20 text-center px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AquaSavvy
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Learn, Play, and Conserve Groundwater through Fun!
          </p>
          <Link to="/start">
            <button className="mt-8 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded shadow hover:bg-green-600 transition-transform transform hover:scale-105">
              Play Now
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 container mx-auto px-4 text-center relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-900 to-gray-900 opacity-75 rounded-lg shadow-lg"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Discover AquaSavvy's Unique Gameplay
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto text-lg">
            AquaSavvy isn’t just a game—it's a strategy experience where every
            move you make impacts the environment. Conserve groundwater as you
            navigate through various levels, each designed to challenge your
            decision-making skills. Protect your virtual world from droughts by
            implementing real-world water-saving techniques. The choices you
            make can either sustain the ecosystem or lead to a water crisis. Are
            you ready to be a water hero?
          </p>
        </div>
        {/* Icons for Visual Enhancement */}
        <div className="relative z-10 mt-8 flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.333-2.667 4-2.667 5.333 0 1.333 2.667-1.333 6-4 8-2.667-2-5.333-5.333-4-8z"
                />
              </svg>
            </div>
            <p className="text-gray-300">Water Sources</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.333 2.667-4 2.667-5.333 0-1.333-2.667 1.333-6 4-8 2.667 2 5.333 5.333 4 8z"
                />
              </svg>
            </div>
            <p className="text-gray-300">Challenges</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c1.333-2.667 4-2.667 5.333 0 1.333 2.667-1.333 6-4 8-2.667-2-5.333-5.333-4-8z"
                />
              </svg>
            </div>
            <p className="text-gray-300">Strategic Moves</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Collect Coins Feature */}
          <div className="p-6 bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Collect Coins</h3>
            <p className="text-gray-300">
              Earn coins by performing tasks such as fixing water leaks,
              planting trees, and implementing sustainable farming methods. Each
              coin represents a positive impact on groundwater conservation.
            </p>
          </div>

          {/* Earn Scores Feature */}
          <div className="p-6 bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Earn Scores</h3>
            <p className="text-gray-300">
              Track your progress with a dynamic scoring system. The more
              conservation tasks you complete, the higher your score and the
              healthier the virtual environment becomes.
            </p>
          </div>

          {/* Leaderboard Feature */}
          <div className="p-6 bg-gray-700 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
            <p className="text-gray-300">
              Compete with players worldwide! Check out the leaderboard to see
              how your conservation efforts stack up against others.
            </p>
            <Link
              to="/leaderboard"
              className="text-green-500 hover:underline mt-4 block"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Awards and Certificates Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Earn Awards and Certificates
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
          Showcase your achievements with awards and certificates. As you
          progress, you'll unlock recognition for your groundwater conservation
          skills, motivating you to continue making a difference.
        </p>
        <img
          src="https://via.placeholder.com/400x200"
          alt="Awards"
          className="mx-auto rounded shadow"
        />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AquaSavvy. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
