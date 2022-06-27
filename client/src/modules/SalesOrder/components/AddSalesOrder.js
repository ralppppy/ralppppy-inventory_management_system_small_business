import {
  Button,
  Input,
  Modal,
  Checkbox,
  Form,
  DatePicker,
  InputNumber,
  Col,
  Row,
  Typography,
  Statistic,
  Divider,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { SalesOrderController } from "../controllers";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ITEMS } from "../../RegisterTheItem/requests/queries";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_SALES_ORDER } from "../requests/mutations";

const { Search } = Input;

const { Option } = Select;

function AddSalesOrder() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createSalesOrder] = useMutation(CREATE_SALES_ORDER);
  const items = useSelector((store) => store.SalesOrder.items);

  const [form] = Form.useForm();
  const [getItems] = useLazyQuery(ITEMS, {});

  const dispatch = useDispatch();

  const { showModal, handleOk, handleCancel, handleGetItems, onFinish } =
    SalesOrderController({
      setIsModalVisible,
      getItems,
      dispatch,
      items,
      createSalesOrder,
    });

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <div>
      <div className="d-flex  align-items-center justify-content-between">
        <div className="mb-3">
          <Button onClick={showModal} icon={<PlusOutlined />} type="primary">
            Add sales order
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
            placeholder="Search for customer name or ordered item"
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

          <Form.Item label="Customer Name" name="customerName">
            <Input placeholder="Please enter customer name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Ordered Item is a required field",
              },
            ]}
            label="Ordered Item"
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

export default AddSalesOrder;
