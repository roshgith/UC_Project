import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CampusDetail.css'; // Import the CSS file for styling

const CampusDetail = () => {
  const { campusName } = useParams();
  const [campusDetail, setCampusDetail] = React.useState(null);

  React.useEffect(() => {
    // Fetch campus details from the server
    axios.get(`/campuses/${encodeURIComponent(campusName)}`)
      .then(response => setCampusDetail(response.data))
      .catch(error => console.error('Error fetching campus details:', error));
  }, [campusName]);

  if (!campusDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="campus-detail-container">
      <header className="campus-header">
        <img src="https://via.placeholder.com/150x50?text=University+Guide" alt="University Guide Logo" className="logo" />
      </header>
      <div className="campus-content">
        <h1>{campusName}</h1>
        <div className="box-container">
          <div className="info-box" id="eateries">
            <h2>Eateries</h2>
          </div>
          <div className="info-box" id="stay">
            <h2>Stay</h2>
          </div>
          <div className="info-box" id="courses">
            <h2>Courses</h2>
          </div>
          <div className="info-box" id="travel">
            <h2>Travel</h2>
          </div>
          <div className="info-box" id="gallery">
            
            <h2>Gallery</h2>
          </div>
        </div>
      </div>
      <footer className="campus-footer">
        <p>© 2024 University Companion</p>
      </footer>
    </div>
  );
};

export default CampusDetail;
