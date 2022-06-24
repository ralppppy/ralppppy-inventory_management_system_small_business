import { gql } from "@apollo/client";

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $itemName: String!
    $costPrice: Float
    $retailPrice: Float
  ) {
    createItem(
      input: {
        itemName: $itemName
        costPrice: $costPrice
        retailPrice: $retailPrice
      }
    ) {
      id
      costPrice
      itemName
      retailPrice
    }
  }
`;
