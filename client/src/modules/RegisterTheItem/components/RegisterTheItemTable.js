import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RegisterTheItemController from "../controllers/RegisterTheItemController";
import { ITEMS } from "../requests/queries";

const { Text } = Typography;

function RegisterTheItemTable() {
  //const { loading, error, data, refetch } = useLazyQuery(Items, {});
  const [getItems] = useLazyQuery(ITEMS, {});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const items = useSelector((store) => store.RegisterTheItem.items);
  const isFetchingData = useSelector(
    (store) => store.RegisterTheItem.isFetchingData
  );
  const totalDataSize = useSelector(
    (store) => store.RegisterTheItem.totalDataSize
  );
  const defaultPageSize = useSelector(
    (store) => store.RegisterTheItem.defaultPageSize
  );

  const dispatch = useDispatch();

  const { handleGetItems, handleOnChangePage } = RegisterTheItemController({
    dispatch,
    getItems,
    navigate,
    searchParams,
    defaultPageSize,
  });

  useEffect(() => {
    handleGetItems(searchParams.get("page"));
  }, [searchParams.get("page")]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
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
      title: "Profit",
      dataIndex: "profit",
      align: "right",
      key: "profit",
      render: (value, row) => {
        return (
          <Text type={value >= 0 ? "success" : "danger"}>
            &#x20B1; {value.toLocaleString("en-US")}
          </Text>
        );
      },
    },
    {
      align: "center",
      title: "Profit Percentage",
      dataIndex: "profitPercentage",
      key: "profitPercentage",
      render: (value, row) => {
        return <Text type={value >= 0 ? "success" : "danger"}>{value}%</Text>;
      },
    },
  ];

  return (
    <div>
      <Table
        loading={isFetchingData}
        size="small"
        dataSource={items}
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

export default RegisterTheItemTable;
