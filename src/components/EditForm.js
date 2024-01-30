import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  TextField,
} from '@mui/material';

const EditForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState({
    form_id: '',
    form_title: '',
    questions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/apii/get_form/${formId}`);
        const data = response.data;

        console.log('Form Data:', data);

        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;

    setFormData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  };
  const handleSave = async () => {
    console.log('Form Data to be sent:', formData);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/apii/edit_form/${formId}`, formData);
      console.log('Form updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating form:', error);
    }
  };
  
  
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom style={{ color: '#1976D2', marginTop: '20px', marginBottom: '20px' }}>
        Edit Form
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', boxShadow: '0px 0px 10px 0px #888' }}>
        <TextField
          label="Form Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.form_title}
          onChange={(e) => setFormData({ ...formData, form_title: e.target.value })}
        />

        <Divider style={{ marginBottom: '20px' }} />

        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          formData.questions && (
            <>
              {formData.questions.map((question, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" style={{ color: '#555', fontWeight: 'bold' }}>
                    {`Question ${index + 1}`}
                  </Typography>
                  <TextField
                    label="Question Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                  />
                  <TextField
                    label="Question Text"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  />
                  <Divider />
                </div>
              ))}
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          )
        )}
      </Paper>
    </Container>
  );
};

export default EditForm;
