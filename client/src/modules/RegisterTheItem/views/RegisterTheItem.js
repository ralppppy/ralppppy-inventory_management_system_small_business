import { Typography } from "antd";
import React, { Suspense } from "react";
import { AddRegisterTheItem, RegisterTheItemTable } from "../components";
const { Title } = Typography;

function RegisterTheItem() {
  return (
    <div>
      <Title level={2}>Register item</Title>

      <Suspense fallback={<></>}>
        <AddRegisterTheItem />
        <RegisterTheItemTable />
      </Suspense>
    </div>
  );
}

export default RegisterTheItem;
