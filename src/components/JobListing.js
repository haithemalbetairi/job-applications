// src/components/JobListing.js
import React from 'react';

function JobListing({ items }) {
    return (
        <ul>
            {items.map((postings, index) => (
                <li key={index} className="job-listing">
                    <h2>{postings.title}</h2>
                    <p>{postings.description}</p>
                    <button id={postings.jobId} class="apply-button">Apply Now</button>
                </li>
            ))}
        </ul>
    );
}

export default JobListing;
