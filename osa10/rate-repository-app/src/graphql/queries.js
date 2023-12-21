import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;
export const ME = gql`
  query ME($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            id
            rating
            text
            repository {
              ownerName
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_BY_ID = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ownerAvatarUrl
      description
      fullName
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      id
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

// other queries...
