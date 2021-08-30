import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

// export const SEARCH_GOOGLE_BOOKS = gql `
// `;