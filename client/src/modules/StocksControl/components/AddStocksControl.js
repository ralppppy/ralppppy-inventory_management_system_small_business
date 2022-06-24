import { Button, Input } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
function AddStocksControl() {
  return (
    <div>
      <div className="d-flex  align-items-center justify-content-between">
        <div className="mb-3">
          {/* <Button icon={<PlusOutlined />} type="primary">
            Add sales order
          </Button> */}
        </div>
        <div className="mb-3 w-25">
          <Search
            enterButton={<Button>Search</Button>}
            className="w-100"
            allowClear
            onSearch={(e) => {
              console.log(e, "df");
            }}
            placeholder="Search for customer name or ordered item"
          />
        </div>
      </div>
    </div>
  );
}

export default AddStocksControl;
