import { gql } from "@apollo/client";

export const SALES_ORDER = gql`
  query SalesOrders($page: Int, $pageSize: Int) {
    salesOrders(input: { page: $page, pageSize: $pageSize }) {
      count
      rows {
        id
        date
        customerName
        orderedItem
        quantity
      }
    }
  }
`;
