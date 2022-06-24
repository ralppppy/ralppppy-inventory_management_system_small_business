import { Typography } from "antd";
import React, { Suspense } from "react";
import { AddPurchasedOrders, PurchasedOrdersTable } from "../components";

const { Title } = Typography;
function PurchasedOrders() {
  return (
    <div>
      <Title level={2}>Purchased Orders</Title>
      <Suspense fallback={<></>}>
        <AddPurchasedOrders />
        <PurchasedOrdersTable />
      </Suspense>
    </div>
  );
}

export default PurchasedOrders;
