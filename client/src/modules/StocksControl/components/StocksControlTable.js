import { Table } from "antd";
import React from "react";

function StocksControlTable() {
  const dataSource = [
    {
      key: "1",

      itemName: "Chicken - 1 kg",
      purchase: 32,
      sales: 233,
      available: 2321312,
    },
    {
      key: "2",

      itemName: "Chicken - 2 kg",
      purchase: 1,
      sales: 233,
      available: 2321312,
    },
  ];

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },

    {
      title: "Purchase",
      dataIndex: "purchase",
      key: "purchase",
    },

    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      render: (value, row) => {
        return <>{value.toLocaleString("en-US")}</>;
      },
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (value, row) => {
        return <>{value.toLocaleString("en-US")}</>;
      },
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default StocksControlTable;
