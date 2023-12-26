const functions = require('@google-cloud/functions-framework');
const firebase = require('firebase-admin');

firebase.initializeApp();
const db = firebase.firestore();

functions.http('get-job-listings', async (req, res) => {
  try {
    const jobListingsSnapshot = await db.collection('job-listings').get();
    const jobListings = jobListingsSnapshot.docs.map(doc => {
      return {
        title: doc.data().title,
        description: doc.data().description,
        // requirements: doc.data().requirements,
        // deadline: doc.data().deadline,
        // recruiter_id: doc.data().recruiterId
      };
    });

    response.json({
      message: "Listings retrieved successfully.",
      data: jobListings
    });
  } catch (error) {
    console.error("Error fetching job listings:", error);
    response.status(500).send("Error fetching job listings");
  }
  res.send(`Hello ${req.query.name || req.body.name || 'World'}!`);
});

