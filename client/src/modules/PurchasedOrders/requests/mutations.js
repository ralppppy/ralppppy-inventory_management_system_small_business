import { gql } from "@apollo/client";

export const CREATE_PURCHASE_ORDER = gql`
  mutation CreatePurchaseOrder(
    $date: String
    $orderedItem: String
    $quantity: Int
  ) {
    createPurchaseOrder(
      input: { date: $date, orderedItem: $orderedItem, quantity: $quantity }
    ) {
      id
      date
      orderedItem
      quantity
    }
  }
`;
