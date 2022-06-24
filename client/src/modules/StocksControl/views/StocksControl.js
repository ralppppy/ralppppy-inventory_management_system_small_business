import { Typography } from "antd";
import React, { Suspense } from "react";
import { AddStocksControl, StocksControlTable } from "../components";

const { Title } = Typography;

function StocksControl() {
  return (
    <div>
      <Title level={2}>Stocks Control</Title>
      <Suspense fallback={<></>}>
        <AddStocksControl />
        <StocksControlTable />
      </Suspense>
    </div>
  );
}

export default StocksControl;
