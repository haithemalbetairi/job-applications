const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    jobPostings: [JobPosting]
    jobApplications(jobId: ID): [JobApplication!]
    jobsApplied(userId: ID): [JobPosting!]
    userProfile(userId: ID): UserProfile
  }

  type JobPosting {
    jobId: ID!
    recruiterId: ID!
    title: String!
    description: String!
    requirements: [String!]!
    deadline: String!
    applications: [JobApplication!]
  }
  
  type JobApplication {
    applicationId: ID!
    jobId: ID!
    userId: ID!
    resume: String!
    coverLetter: String
    userProfile: UserProfile
  }
  
  type UserAccount {
    userId: ID!
    username: String!
    password: String!
    userType: String!
    userProfile: UserProfile
    jobsApplied: [JobPosting!]
  }
  
  type UserProfile {
    userId: ID!
    fullName: String!
    email: String!
    skills: [String!]
  }

`);

let jobIdCounter = 1;

const jobPostingData = [
  {
    jobId: '' + jobIdCounter++,
    recruiterId: '12345',
    title: 'Software Engineer',
    description: 'Exciting...',
    requirement: ['B.S. degree in computer science', 'Experience with Java'],
    deadline: '2023-12-25',
  },
];

// The root provides a resolver function for each API endpoint
const root = {
  jobPostings: () => jobPostingData,
};

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: {
      defaultQuery: '{\n  hello\n}\n',
    },
  })
);

app.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000/')
);
