import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function SalesOrderTable() {
  const salesOrders = useSelector((store) => store.SalesOrder.salesOrders);

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
      <Table dataSource={salesOrders} columns={columns} />
    </div>
  );
}

export default SalesOrderTable;
