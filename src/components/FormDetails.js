import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormDetails = () => {
  const [formData, setFormData] = useState(null);
  const formId = "5a52d8a34b83ecbe6e4af98"; // Replace with the actual form ID

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/apii/get_form/5a52d8a34b83ecbe6e4af98/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error.message);
        // Add additional error handling as needed
      }
    };

    fetchFormData();
  }, [formId]);

  return (
    <div>
      <h1>Form Details</h1>
      {formData ? (
        <div>
          <h2>{formData.form_title}</h2>
          <ul>
            {formData.questions.map((question, index) => (
              <li key={index}>
                <strong>Type:</strong> {question.type}<br />
                <strong>Title:</strong> {question.title}<br />
                <strong>Question:</strong> {question.question}<br />
                <strong>Answer:</strong> {question.answer}<br />
                {/* Add additional fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FormDetails;
