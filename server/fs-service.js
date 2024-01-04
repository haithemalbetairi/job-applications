const app = require('firebase/app');
const firestore = require('firebase/firestore');

// Web app's Firebase configuration
const firebaseApp = app.initializeApp({
  // your firebase API key
});

// Fetch the Firestore
const db = firestore.getFirestore(firebaseApp);

const applicationCollection = firestore.collection(db, 'Applications');
const jobsCollection = firestore.collection(db, 'Jobs');
const userCollection = firestore.collection(db, 'Jobs');
const jobDoc = (jobId) => firestore.doc(firestore.collection(db, 'Jobs', jobId));
const userDoc = (email) => firestore.doc(firestore.collection(db, 'users', email));

// get all jobs from Firestore
module.exports.jobs =  async function () {
  try {
    await firestore.getDocs(jobsCollection);
  } catch (e) {
    console.error('Error fetching jobs: ', e);
  }
}

// get a specific Job by it's ID
module.exports.jobApplications = async function (jobId) {

  // query the applications by
  const q = firestore.query(
    applicationCollection,
    firestore.where(firestore.documentId(), "in",
      [
        jobId
      ]
    )
  )
  try {
    await firestore.getDocs(q);
  } catch (e) {
    console.error('Error fetching job #',jobId,": ", e);
  }
}

// get the list of Jobs Applied
module.exports.jobsApplied = async function (email) {
  const q = firestore.query(
    userCollection,
    firestore.where(firestore.documentId(), "in",
      [
        email
      ]
    )
  )
  try {
    await firestore.getDocs(q);
  } catch (e) {
    console.error('Error fetching applications for ', email, ": ", e);
  }
}

// create a new job in Firestore
module.exports.createJob =  async function (jobTitle, jobDescription) {
  try {
    await firestore.addDoc(jobsCollection, {
      title: jobTitle,
      description: jobDescription
    });
  } catch (e) {
    console.error('Error creating job: ', e);
  }
}

module.exports.addFirestoreUser = async function (user) {
  try {
    await firestore.setDoc(userDoc(email), {
      name: user.data.name,
      skills: user.data.skills,
      userType: user.data.userType
    });
  } catch (e) {
    console.error('Error adding user ', user,'job: ', e);
  }
}

module.exports.applyForFirestoreJob = async function (input) {
  try {
    await firestore.addDoc(applicationCollection, {
      Job: jobDoc(input.jobId),
      user: userDoc(input.email),
      resume: input.resume,
      coverLetter: input.coverLetter
    });
  } catch (e) {
    console.error('Error applying to job: ', e);
  }
}