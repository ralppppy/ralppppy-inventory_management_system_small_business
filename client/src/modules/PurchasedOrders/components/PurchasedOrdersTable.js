import { Table } from "antd";
import React from "react";

function PurchasedOrdersTable() {
  const dataSource = [
    {
      key: "1",
      date: "10/29/2021",
      itemName: "Mike",
      quantity: 32,
      costPrice: 233,
      totalAmount: 2321312,
    },
    {
      key: "2",
      date: "10/29/2021",
      itemName: "John",
      quantity: 1,
      costPrice: 233,
      totalAmount: 2321312,
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Cost Price",
      dataIndex: "costPrice",
      key: "costPrice",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default PurchasedOrdersTable;
