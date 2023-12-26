const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const serviceAccount = {
  "type": "service_account",
  "project_id": "job-posting-409011",
  "private_key_id": "9a70bd8640dca37978ca12d5e832001212e64f0e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCJJA5oqfhR8Ktc\nJGOqK0VmQQk5zO5GvifXAeG/fKlMjav8ZifMAUuwVebPifOtTXf1R7SJoeQ9ACV0\np/I/pVfOUeVEMxFmk+FuksqnOJG7/4IC/zCOVXwcr5Wxrp6s7p6igMdH6WHdHFr5\nglYrffvElg9ZF9kDEoJSapMKO1g/RZ9sA4Rzye6CG5JSOVByOT2qhrkuC5JuTR3+\n5dkKWvIznjgHSqWjKmvB48jJPIQnb8YaKk2BAvr+kesjVO424a0j0f6qZJUpkRMx\nO/W+ETeaEAa64iK8Vb9F7F7i2edd06IlTZASbF8AtdsAvfV+yJn+bg4qy6P2hbP8\nGVk/v5zxAgMBAAECggEAH/TqdKIyzqlFzRVfsg4eQFskUrc5yPtTnkr+d1gNvVx/\n+LM3T9b3c7I4tCDhyv7z1pCsdavnWv2XPM1L6l/Vi6rSwWcjBWOtUs5a8ceBUi0S\ndy9O+cPaxXZ26+4UZJjAF37psQyltNgALQcdnEnhqqgLEIg5lfkwrBLQi8BTan6v\n8Y07VLxal7zfA3xgeGDc/CX23VecBAl6Jpr57vejnm6kfbdWhiFMi9K/EZaLHEd/\ntRgp4W0SgLmWDLtjfkapar9wG1J9vpm4zarhj0PTp2gG1LDajKdQinVa9BIaJFCE\nBHiUtB9Eq89TXnfFTLIjRFO3vW0HeCj4nBNoG2OVCQKBgQDAl38F83X+/osz2jd9\nDiHZNP58PzAyZorSWcUm2izrq7iX7ZF9ZPRpEKhLPvX0YQ6FV3q697TN2WIj90co\nSvEv1EHViI1ScuHxI/KYG28kHa0w2a0RDb1sdexhnxL24Uus/qHP7ssAA6GO+tt2\nz6gJHUAlCg/E+UUEW8y3ZgBjZQKBgQC2Suezdx8q8k12cU/ics/zIYYkdBvD4M9G\nhcDPQbI4FPJs6GrChAhrfn5V7m0BO0j0cbizTpfGzxsYj4tzq4QAvHfQgkc4oynz\nWfEcn/yGCsMAlJidFciSwFhGQvaRkOEIL5qkBhgO7zMJq0s13XY+WKjgWZLT9tmh\nIjBqpxGInQKBgD1cx6MMxC6/yXh28bENnKlJIkBSHbghRd/prFBJuYBJUWJO1kk+\nrkT/gq+e2tzHQ8omajtCC0B/H67X7bsfzaLwnR09CdIYOncLfhMKwqmeLv1eja7e\nUtlI5UzhUziH5gWzh7jpm5Jglcwpj11WonJs+HAUuZuH1H6kBSD2Be+lAoGAIshu\nJ59OMiqjvzrlzEauCS1XZDNHbPvDcShqXuGhOPQ+QaujW1RIKwKq5oilAfwm8oWU\ngZo4ebXg7LHPIRYUDPPpRL7nChaQFaAO0rBwRb9d8AlqiWazq9TJwzZZx/LGDYLP\n1gZXptnbejfWFQQZ4NGX/5731jwe0JEufds9DD0CgYBbrwPJzTsvjEGgzS8YYCmr\n9FN9AY+RBO9QaG/lLtrfflX8++r5AvPSTB6Qcs7j6DTxSH3nMbbs2DJJ3pA3gKRk\njACUYjtSz0sTQVSoyfYQlxVmf6IR6gdJQLuOJ5sxtsqRFB5jwCuo07So2RwK72RR\nvq0jbrHNqIveKCUP8PYB6w==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-aqsy1@job-posting-409011.iam.gserviceaccount.com",
  "client_id": "103799200496797515965",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-aqsy1%40job-posting-409011.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const schema = buildSchema(`
  type Mutation {
    createUser(email: String!, password: String!): User
  }
  type User {
    userId: String
    email: String
    message: String
  }
`);

const root = {
  createUser: async ({ email, password }) => {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        emailVerified: false
      });

      await admin.firestore().collection('users').doc(email).set({
        name: "",
        skills: []
      });

      return {
        userId: userRecord.uid,
        email: userRecord.email,
        message: 'User created successfully'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

exports.graphqlApi = functions.https.onRequest(app);
