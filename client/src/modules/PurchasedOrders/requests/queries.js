import { gql } from "@apollo/client";

export const PURCHASE_ORDER = gql`
  query PurchaseOrders($page: Int, $pageSize: Int) {
    purchaseOrders(input: { page: $page, pageSize: $pageSize }) {
      count
      rows {
        id
        date
        orderedItem
        quantity
      }
    }
  }
`;

export const SEARCH_SALES_ORDER = gql`
  # query SearchSalesOrder($itemName: String!, $page: Int, $pageSize: Int) {
  #   searchedItems(
  #     searchParams: { itemName: $itemName, page: $page, pageSize: $pageSize }
  #   ) {
  #     count
  #     rows {
  #       id
  #       itemName
  #       costPrice
  #       retailPrice
  #       itemName
  #     }
  #   }
  # }
  query SearchSalesOrder($pageSize: Int, $page: Int, $searchText: String) {
    searchedSalesOrder(
      searchText: $searchText
      pageSize: $pageSize
      page: $page
    ) {
      count
      rows {
        id
        customerName
        date
        orderedItem
        quantity
      }
    }
  }
`;
