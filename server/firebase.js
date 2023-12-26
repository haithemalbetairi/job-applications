import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0nP2NYmqe-3ZCurR74QL_JgWklFPOIVw",
  authDomain: "job-posting-409011.firebaseapp.com",
  projectId: "job-posting-409011",
  storageBucket: "job-posting-409011.appspot.com",
  messagingSenderId: "848172609833",
  appId: "1:848172609833:web:d50da1a1cd7e97346c8738",
  measurementId: "G-G7YJ0X7PRN"
});

// Fetch the Firestore
const db = getFirestore(firebaseApp);

const jobsCollection = collection(db, 'job-listings');

export async function createListing(jobTitle, jobDescription) {
  try {
    const newDoc = await addDoc(jobsCollection, {
      title: jobTitletitle,
      description: jobDescription
    });
  } catch (e) {
    console.error('Error creating job: ', e);
  }

}

// export async function applyToJob(jobId) {
//   const
// }
