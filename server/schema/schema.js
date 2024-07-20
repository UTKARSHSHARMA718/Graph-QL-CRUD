import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Project from "../models/Project.js";
import Client from "../models/Client.js";

/**
 * Client Type
 */
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
  }),
});

/**
 * Project Type
 */
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    client: {
      // for creating a relation between the client and the project type (similar to joins in sql)
      type: ClientType,
      resolve(parent, args) {
        return Client.find({
          id: args?.id,
        });
      },
    },
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Client.find({
          id: args?.id,
        });
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client?.find({});
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Project?.find({ id: args?.id });
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Project?.find({});
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const newClient = new Client({
          name: args?.name,
          email: args?.email,
          phone: args?.phone,
        });

        return newClient.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        return Client.deleteOne({
          _id: args?.id,
        });
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        description: {
          type: new GraphQLNonNull(GraphQLString),
        },
        status: {
          //Defining enum
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: {
                value: "Not Started",
              },
              progress: {
                value: "In progress",
              },
              completed: {
                value: "Completed",
              },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        const { name, description, clientId, status } = args;
        console.log({ name, description });
        const newProject = new Project({
          name,
          description,
          clientId,
          status,
        });

        return newProject.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        console.log({args})
        return Project?.deleteOne({
          _id: args?.id,
        });
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        status: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const updatedProject = Project?.updateOne(
          {
            id: args?.id,
          },
          {
            status: args?.status,
          }
        );
        return updatedProject;
      },
    },
  },
});

export const GQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
