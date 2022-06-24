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
} from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import RegisterTheItemController from "../controllers/RegisterTheItemController";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_ITEM } from "../requests/mutations";
import { SEARCH_ITEMS } from "../requests/queries";
import { useSearchParams } from "react-router-dom";

const { Search } = Input;
const { Title } = Typography;

function AddRegisterTheItem() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profit, setProfit] = useState({ profit: 0, profitPercent: 0 });
  const [createItem] = useMutation(CREATE_ITEM);
  const [searchItems] = useLazyQuery(SEARCH_ITEMS);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPageSize = useSelector(
    (store) => store.RegisterTheItem.defaultPageSize
  );
  const dispatch = useDispatch();

  const {
    showModal,
    handleOk,
    handleCancel,
    onFinish,
    handleCalculateProfit,
    handleItemsSearch,
  } = RegisterTheItemController({
    setIsModalVisible,
    form,
    setProfit,
    createItem,
    dispatch,
    searchItems,
    searchParams,
    defaultPageSize,
    setSearchParams,
  });

  return (
    <div>
      <div className="d-flex  align-items-center justify-content-between">
        <div className="mb-3">
          <Button onClick={showModal} icon={<PlusOutlined />} type="primary">
            Register an item
          </Button>
        </div>
        <div className="mb-3 w-25">
          <Search
            enterButton={<Button>Search</Button>}
            className="w-100"
            allowClear
            onSearch={handleItemsSearch}
            placeholder="Search for item name"
          />
        </div>
      </div>

      <Modal
        title="Register item"
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
          onValuesChange={handleCalculateProfit}
        >
          <Row gutter={[16, 16]}>
            <Col className="text-center" md={{ span: 12 }}>
              <Statistic
                title="Profit"
                valueStyle={{
                  color: profit.profit >= 0 ? "#3f8600" : "tomato",
                }}
                value={profit.profit.toLocaleString("en-us")}
                precision={2}
              />
            </Col>
            <Col className="text-center" md={{ span: 12 }}>
              <Statistic
                suffix="%"
                valueStyle={{
                  color: profit.profitPercent >= 0 ? "#3f8600" : "tomato",
                }}
                title="Profit Percentage"
                value={profit.profitPercent}
                precision={2}
              />
            </Col>
          </Row>
          <Divider />
          <Form.Item
            label="Item Name"
            name="itemName"
            rules={[
              {
                required: true,
                message: "Item name is a required field",
              },
            ]}
          >
            <Input placeholder="Please enter item name" />
          </Form.Item>
          <Form.Item
            label="Cost Price"
            name="costPrice"
            rules={[
              {
                required: true,
                message: "Cost price is a required field",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/(,*)/g, "")}
              className="w-100"
              placeholder="Please enter cost price"
            />
          </Form.Item>
          <Form.Item
            label="Retail Price"
            name="retailPrice"
            rules={[
              {
                required: true,
                message: "Retail price is a required field",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/(,*)/g, "")}
              className="w-100"
              placeholder="Please enter retail price"
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

export default AddRegisterTheItem;
