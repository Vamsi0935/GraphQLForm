const { GraphQLScalarType, Kind } = require("graphql");
const User = require("../models/user.model");

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Custom Date scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      const date = new Date(value);
      return date.toISOString().split("T")[0];
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    users: async () => {
      try {
        const users = await User.find().sort({ createdAt: 1 });
        return users;
      } catch (error) {
        throw new Error("Error fetching users: " + error.message);
      }
    },

    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Error fetching user: " + error.message);
      }
    },
  },

  Mutation: {
    createUser: async (_, { userInput }) => {
      const {
        firstName,
        lastName,
        birthDate,
        gender,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        email,
        mobileNumber,
        comments,
      } = userInput;

      try {
        const newUser = new User({
          firstName,
          lastName,
          birthDate,
          gender,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          email,
          mobileNumber,
          comments,
          createdAt: new Date().toISOString(),
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error("Error creating user: " + error.message);
      }
    },
  },
};

module.exports = resolvers;
