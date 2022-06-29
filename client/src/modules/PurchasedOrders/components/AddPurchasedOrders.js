import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import PurchasedOrdersController from "../controllers/PurchasedOrdersController";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ITEMS } from "../../RegisterTheItem/requests/queries";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PURCHASE_ORDER } from "../requests/mutations";
const { Search } = Input;

const { Option } = Select;

function AddPurchasedOrders() {
  const [form] = Form.useForm();
  const [getItems] = useLazyQuery(ITEMS, {});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createPurchaseOrder] = useMutation(CREATE_PURCHASE_ORDER);
  const items = useSelector((store) => store.PurchasedOrders.items);
  const dispatch = useDispatch();

  const { handleCancel, handleOk, handleGetItems, showModal, onFinish } =
    PurchasedOrdersController({
      setIsModalVisible,
      getItems,
      dispatch,
      createPurchaseOrder,
      items,
    });

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <div>
      <div className="d-flex  align-items-center justify-content-between">
        <div className="mb-3">
          <Button onClick={showModal} icon={<PlusOutlined />} type="primary">
            Add Purchased Orders
          </Button>
        </div>
        <div className="mb-3 w-25">
          <Search
            enterButton={<Button>Search</Button>}
            className="w-100"
            allowClear
            onSearch={(e) => {
              console.log(e, "df");
            }}
            placeholder="Search for customer name or Item name"
          />
        </div>
      </div>

      <Modal
        title="Sales Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          // onValuesChange={handleCalculateProfit}
        >
          <Form.Item label="Date" name="date">
            <DatePicker className="w-100" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Item name is a required field",
              },
            ]}
            label="Item name"
            name="orderedItem"
          >
            <Select
              placeholder="Select an item"
              showSearch
              filterOption={(inputValue, option) =>
                option.children.toLowerCase().includes(inputValue.toLowerCase())
              }
            >
              {items.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.itemName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity is a required field",
              },
            ]}
          >
            <InputNumber
              className="w-100"
              placeholder="Please enter quantity"
            />
          </Form.Item>

          <Form.Item>
            <Button key="back" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddPurchasedOrders;
