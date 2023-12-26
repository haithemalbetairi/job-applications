import React, { useState } from 'react';

const JobPostingForm = ({ onJobPost }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //onJobPost({ title: jobTitle, description: jobDescription });
    setJobTitle('');
    setJobDescription('');
    //setIsClicked((prev) => !prev);
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
