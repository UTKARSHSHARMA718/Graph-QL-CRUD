import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $client: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $client
    ) {
      id
      name
      status
      description
      client {
        id
      }
    }
  }
`;

export const DELETE_PROJECTS = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
      client {
        id
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(id: $id, name: $name, description: $description, status: $status){
      id
      name
      description
      status
    }
  }
`;
