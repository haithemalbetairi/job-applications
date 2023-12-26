import React, { useState } from 'react';


const JobPostingForm = ({ onJobPost }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('YOUR_API_GATEWAY_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: jobTitle,
            description: jobDescription,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    setJobTitle('');
    setJobDescription('');
} catch (error) {
    console.error('Error posting job:', error);
    alert('Failed to post job');
  }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <div>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          placeholder="Job Title"
        />
      </div>
      <div>
        <input
          type="text"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          placeholder="Job Discription"
        />
      </div>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
