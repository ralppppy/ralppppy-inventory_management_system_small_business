import { gql } from "@apollo/client";

export const ITEMS = gql`
  query Items($page: Int, $pageSize: Int, $searchParams: String) {
    items(
      input: { page: $page, pageSize: $pageSize, searchParams: $searchParams }
    ) {
      count
      rows {
        id
        costPrice
        retailPrice
        itemName
      }
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query SearchItems($itemName: String!, $page: Int, $pageSize: Int) {
    searchedItems(itemName: $itemName, page: $page, pageSize: $pageSize) {
      count
      rows {
        id
        itemName
        costPrice
        retailPrice
        itemName
      }
    }
  }
`;
