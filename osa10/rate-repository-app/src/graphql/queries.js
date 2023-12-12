import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          description
          fullName
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          id
        }
      }
    }
  }
`;
export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  {
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;

// other queries...
