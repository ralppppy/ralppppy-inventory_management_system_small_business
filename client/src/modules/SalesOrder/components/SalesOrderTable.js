import { Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SalesOrderController } from "../controllers";
import { SALES_ORDER } from "../requests/queries";
import { useLazyQuery } from "@apollo/client";

const { Text } = Typography;

function SalesOrderTable() {
  const salesOrders = useSelector((store) => store.SalesOrder.salesOrders);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getSalesOrder] = useLazyQuery(SALES_ORDER, {});
  const isFetchingData = useSelector(
    (store) => store.SalesOrder.isFetchingData
  );
  const items = useSelector((store) => store.SalesOrder.items);
  const totalDataSize = useSelector((store) => store.SalesOrder.totalDataSize);
  const defaultPageSize = useSelector(
    (store) => store.SalesOrder.defaultPageSize
  );

  const { handleGetSalesOrder, handleOnChangePage } = SalesOrderController({
    dispatch,
    getSalesOrder,
    navigate,
    searchParams,
    defaultPageSize,
    items,
  });

  useEffect(() => {
    handleGetSalesOrder(searchParams.get("page"), items);
  }, [searchParams.get("page"), items.length]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => {
        return <Text>{value && dayjs(value).format("YYYY-MM-DD")}</Text>;
      },
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
      align: "right",
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
      align: "right",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
    {
      title: "Retail Price",
      dataIndex: "retailPrice",
      key: "retailPrice",
      align: "right",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
    {
      title: "Total Profit",
      dataIndex: "totalProfit",
      key: "totalProfit",
      align: "right",
      render: (value, row) => {
        return (
          <Text type={value >= 0 ? "success" : "danger"}>
            &#x20B1; {value.toLocaleString("en-US")}
          </Text>
        );
      },
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "right",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
  ];
  return (
    <div>
      <Table
        size="small"
        loading={isFetchingData}
        dataSource={salesOrders}
        columns={columns}
        pagination={{
          total: totalDataSize,
          current: searchParams.get("page")
            ? isNaN(parseInt(searchParams.get("page")))
              ? 1
              : parseInt(searchParams.get("page"))
            : 1,
          defaultPageSize,
          onChange: handleOnChangePage,
        }}
      />
    </div>
  );
}

export default SalesOrderTable;
