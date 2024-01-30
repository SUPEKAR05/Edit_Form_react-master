// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormsList from './components/FormsList';
import EditForm from './components/EditForm';
import FormDetails from './components/FormDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormsList />} />
        <Route path="/editform/:formId" element={<EditForm />} />
        <Route path="/formdetails/:formId" element={<FormDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
