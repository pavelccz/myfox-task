import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export interface Customer {
  id: string;
  name?: string | null;
  surname?: string | null;
  phone?: string | null;
  email?: string | null;
  picture?: {
    secret: string;
  } | null;
}

export interface GetCustomerQuery {
  getCustomer: Customer | null;
}

export interface GetCustomerVariables {
  id: string;
}

export const GET_CUSTOMER: TypedDocumentNode<
  GetCustomerQuery,
  GetCustomerVariables
> = gql`
  query GetCustomer($id: String!) {
    getCustomer(where: { id: $id }) {
      id
      name
      surname
      phone
      email
      picture {
        secret
      }
    }
  }
`;

export interface UpdateCustomerMutation {
  updateCustomer: Customer;
}

export interface UpdateCustomerVariables {
  id: string;
  data: {
    name?: string | null;
    surname?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    locale?: string | null;
  };
}

export const UPDATE_CUSTOMER: TypedDocumentNode<
  UpdateCustomerMutation,
  UpdateCustomerVariables
> = gql`
  mutation UpdateCustomer($id: String!, $data: CustomerUpdateInput!) {
    updateCustomer(where: { id: $id }, data: $data) {
      id
      name
      surname
      phone
      email
      picture {
        secret
      }
    }
  }
`;
