import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Start.css';
import { storage } from './firebase';

const Start = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/campuses')
      .then(res => {
        setCampuses(res.data);
      })
      .catch(err => console.log('Error fetching campus data:', err));
  }, []);

  const goToNextCampus = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % campuses.length);
  };

  const goToPreviousCampus = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + campuses.length) % campuses.length);
  };

  const handleExploreClick = () => {
    const currentCampus = campuses[currentIndex];
    navigate(`/campus/${encodeURIComponent(currentCampus.name)}`);
  };

  if (campuses.length === 0) {
    return <div>Loading...</div>;
  }

  const currentCampus = campuses[currentIndex];

  return (
    <div className="start-container">
      <header className="header">
        <img src="https://via.placeholder.com/150x50?text=University+Guide" alt="University Guide Logo" className="logo" />
        <button className="profile-button">Profile</button>
      </header>
      <div className="header-content">
        <div className="header-text">
          <h1>Welcome to University Companion!</h1>
          <p>UC (University Companion) is the ultimate guide to your university! Explore curriculums, stay, eateries, campus life, and the best way to go to your dream campus and back!</p>
        </div>
      </div>
      <div className="carousel">
        <button className="carousel-button left" onClick={goToPreviousCampus}>◁</button>
        <div className="carousel-content">
          <div className="image-container">
            <img src={currentCampus.imageUrl} alt={currentCampus.name} className="campus-image" />
            <div className="campus-name">{currentCampus.name}</div>
          </div>
          <div className="campus-info">
            <button className="campus-button" onClick={handleExploreClick}>
              Explore {currentCampus.name}
            </button>
          </div>
        </div>
        <button className="carousel-button right" onClick={goToNextCampus}>▷</button>
      </div>
      <footer className="footer">
        <p>© 2024 University Companion</p>
      </footer>
    </div>
  );
};

export default Start;
