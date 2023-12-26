const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Job {
    id: ID
    data: JobData
  }

  type JobData {
    title: String
    description: String
    deadline: String
    recruiterEmail: String
    requirements: [String]
    applications: [Application]
  }

  type Application {
    job: Job
    user: User
    resume: String
    coverLetter: String
  }

  type User {
    email: String
    data: UserData
  }

  type UserData {
    name: String
    jobsApplied: [Application]
    skills: [String]
    userType: String
  }

  type Query {
    jobPostings: [Job]
    jobApplications(jobId: ID): JobData
    jobsApplied(email: String): User
  }

  type Mutation {
    createJob(job: Job): ID
    addUser(user: User): String
    applyForJob(input: ApplicationInput): Application
  }

  input JobInput {
    title: String
    description: String
    deadline: String
    recruiterEmail: String
    requirements: [String]
  }

  input ApplicationInput {
    job: ID
    user: String
    resume: String
    coverLetter: String
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
  {
    jobId: '' + jobIdCounter++,
    recruiterId: '12345',
    title: 'Web Developer',
    description: 'Exciting...',
    requirement: ['B.S. degree in computer science', 'Experience with JavaScript'],
    deadline: '2023-12-25',
  }
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
