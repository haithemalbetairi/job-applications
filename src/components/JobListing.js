// src/components/JobListing.js
import React from 'react';
const fetchJobListings = async () => {
  try {
    const response = await fetch('URL_OF_EXPRESS_SERVER/api_endpoint');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data; // Assuming the listings are in the 'data' field
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return []; // Return an empty array in case of an error
  }
};

function JobListing({ items }) {
  // items = fetchJobListings;
  return (
    <ul>
      {items.map((postings, index) => (
        <li key={index} className="job-listing">
          <h2>{postings.title}</h2>
          <p>{postings.description}</p>
          <button id={postings.jobId} class="apply-button">
            Apply Now
          </button>
        </li>
      ))}
    </ul>
  );
}

export default JobListing;
