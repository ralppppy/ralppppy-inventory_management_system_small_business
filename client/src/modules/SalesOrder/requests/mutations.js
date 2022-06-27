import { gql } from "@apollo/client";

export const CREATE_SALES_ORDER = gql`
  mutation CreateSalesOrder(
    $date: String
    $customerName: String
    $orderedItem: String
    $quantity: Int
  ) {
    createSalesOrder(
      input: {
        date: $date
        customerName: $customerName
        orderedItem: $orderedItem
        quantity: $quantity
      }
    ) {
      id
      date
      customerName
      orderedItem
      quantity
    }
  }
`;
