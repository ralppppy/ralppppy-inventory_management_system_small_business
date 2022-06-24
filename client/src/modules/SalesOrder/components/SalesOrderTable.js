import { Table } from "antd";
import React from "react";

function SalesOrderTable() {
  const dataSource = [
    {
      key: "1",
      date: "10/29/2021",
      customerName: "Mike",
      orderedItem: "Chicken - 1 kg",
      available: 23,
      quantity: 32,
      costPrice: 233,
      retailPrice: 12333,
      totalProfit: 23333,
      totalPrice: 2321312,
    },
    {
      key: "2",
      date: "10/29/2021",
      customerName: "John",
      orderedItem: "Chicken - 2 kg",
      available: 23,
      quantity: 1,
      costPrice: 233,
      retailPrice: 12333,
      totalProfit: 23333,
      totalPrice: 2321312,
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Ordered Item",
      dataIndex: "orderedItem",
      key: "orderedItem",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
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
      title: "Retail Price",
      dataIndex: "retailPrice",
      key: "retailPrice",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
    {
      title: "Total Profit",
      dataIndex: "totalProfit",
      key: "totalProfit",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
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

export default SalesOrderTable;
