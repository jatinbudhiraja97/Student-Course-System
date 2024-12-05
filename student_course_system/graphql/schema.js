const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const studentResolvers = require('./types/resolvers/studentResolvers');
const courseResolvers = require('./types/resolvers/courseResolvers');
const authResolvers = require('./types/resolvers/authResolvers');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...studentResolvers,
    ...courseResolvers
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...authResolvers,
    ...studentResolvers,
    ...courseResolvers
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
