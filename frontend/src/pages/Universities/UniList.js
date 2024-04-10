import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const UniList = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/universities');
        if (!response.ok) {
          throw new Error('Error fetching universities');
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  if (loading) {
    return <div className="form-container">Loading...</div>;
  }

  if (error) {
    return <div className="form-container error-message">Error: {error}</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Universities</h2>
      <ul>
        {universities.map(university => (
          <li key={university.university_id} className="form-section">
            <strong>Name:</strong> {university.name}<br />
          </li>
        ))}
      </ul>
      <Link to="/dashboard" className="button">Back to Dashboard</Link>
    </div>
  );
};

export default UniList;
