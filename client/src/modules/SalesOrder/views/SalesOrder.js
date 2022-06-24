import { Typography } from "antd";
import React, { Suspense } from "react";
import { AddSalesOrder, SalesOrderTable } from "../components";

const { Title } = Typography;

function SalesOrder() {
  return (
    <div>
      <Title level={2}>Sales Order</Title>

      <Suspense fallback={<></>}>
        <AddSalesOrder />
        <SalesOrderTable />
      </Suspense>
    </div>
  );
}

export default SalesOrder;
