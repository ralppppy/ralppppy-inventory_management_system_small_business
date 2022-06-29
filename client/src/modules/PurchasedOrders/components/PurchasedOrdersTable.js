import { useLazyQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import PurchasedOrdersController from "../controllers/PurchasedOrdersController";
import { PURCHASE_ORDER } from "../requests/queries";

function PurchasedOrdersTable() {
  const purchaseOrders = useSelector(
    (store) => store.PurchasedOrders.purchaseOrders
  );
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPurchaseOrder] = useLazyQuery(PURCHASE_ORDER, {});
  const items = useSelector((store) => store.PurchasedOrders.items);
  const isFetchingData = useSelector(
    (store) => store.PurchasedOrders.isFetchingData
  );
  const totalDataSize = useSelector(
    (store) => store.PurchasedOrders.totalDataSize
  );
  const defaultPageSize = useSelector(
    (store) => store.PurchasedOrders.defaultPageSize
  );

  const { handleGetPurchaseOrder, handleOnChangePage } =
    PurchasedOrdersController({
      dispatch,
      getPurchaseOrder,
      navigate,
      searchParams,
      defaultPageSize,
      items,
    });

  useEffect(() => {
    handleGetPurchaseOrder(searchParams.get("page"), items);
  }, [searchParams.get("page"), items.length]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Item Name",
      dataIndex: "orderedItem",
      key: "orderedItem",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
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
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right",
      render: (value, row) => {
        return <>&#x20B1; {value.toLocaleString("en-US")}</>;
      },
    },
  ];

  console.log(purchaseOrders, "purchaseOrders");
  return (
    <div>
      <Table
        columns={columns}
        loading={isFetchingData}
        dataSource={purchaseOrders}
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

export default PurchasedOrdersTable;
