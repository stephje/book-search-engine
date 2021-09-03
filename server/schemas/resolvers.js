const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('books');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params);
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please make sure you have logged in!");
    },

  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUserData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          // new: true ensures that the modified document is returned
          { new: true }
        );
        return updatedUserData;
      }
      throw new AuthenticationError('Please log in first!');
    },
    deleteBook: async (parent, { bookID }, context) => {
      if (context.user) {
        return Book.findOneAndUpdate(
          { _id: bookID },
          {
            //$pull is used to remove something from an array
            $pull: {
              savedBooks: { bookID },
            },
          },
          // new: true ensures that the modified document is returned
          { new: true }
        );
      }
    }
  },

};

module.exports = resolvers;
