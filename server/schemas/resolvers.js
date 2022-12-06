const { Matchup, Tech } = require('../models');

const resolvers = {
    Query: {
        techs: async () => {
            return await Tech.find({});
        },
        matchups: async () => {
            return await Matchup.find({});
        },
        matchup: async (parent, args) => {
            return await Matchup.findById(args.id);
        }
    },
    Mutation: {
        createMatchup: async (parent, args) => {
            return await Matchup.create({tech1: args.tech1, tech2: args.tech2});
        },
        createVote: async (parent, args) => {
            return await Matchup.findOneAndUpdate(
                { _id: args.id },
                { $inc: { [`tech${args.techNum}_votes`]: 1 } },
                { new: true }
            );
        }
    }
};

module.exports = resolvers;