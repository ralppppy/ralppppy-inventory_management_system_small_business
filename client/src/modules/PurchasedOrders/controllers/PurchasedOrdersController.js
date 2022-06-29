import { message } from "antd";
import dayjs from "dayjs";
import {
  setIsFetchingData,
  setItems,
  setPurchaseOrder,
  setPurchaseOrders,
  setTotalDataSize,
} from "../models/PurchasedOrdersModel";

const PurchasedOrdersController = ({
  setIsModalVisible,
  dispatch,
  getItems,
  createPurchaseOrder,
  getPurchaseOrder,
  items,
  searchParams,
  navigate,
  setSearchParams,
  searchSalesOrder,
  defaultPageSize,
}) => {
  const handleOnChangePage = (page) => {
    navigate({
      pathname: "/purchased-orders",
      search: `?page=${page}`,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetPurchaseOrder = async (_, items) => {
    if (items.length <= 0) {
      dispatch(setIsFetchingData(false));
      return;
    }

    let currentPage = searchParams.get("page")
      ? isNaN(parseInt(searchParams.get("page")))
        ? 1
        : parseInt(searchParams.get("page"))
      : 1;

    dispatch(setIsFetchingData(true));

    let {
      data: {
        purchaseOrders: { rows, count },
      },
    } = await getPurchaseOrder({
      variables: { page: currentPage, pageSize: defaultPageSize },
    });

    let newSalesOrder = rows.map((purchaseOrder) => {
      return _formatPurchaseOrder(purchaseOrder);
    });

    dispatch(setPurchaseOrders(newSalesOrder));
    dispatch(setTotalDataSize(count));
    dispatch(setIsFetchingData(false));
  };

  const onFinish = async (values) => {
    console.log(values, "sdfsdfsdf");
    let {
      data: { createPurchaseOrder: purchaseOrder },
    } = await createPurchaseOrder({
      variables: {
        ...values,
        date: values.date ? dayjs(values.date).format("YYYY-MM-DD") : null,
      },
    });

    console.log(purchaseOrder, "purchaseOrder");
    let data = _formatPurchaseOrder(purchaseOrder);

    purchaseOrder = { ...purchaseOrder, key: purchaseOrder.id, ...data };
    dispatch(setPurchaseOrder(purchaseOrder));
    handleCancel();
    message.success({ content: "Succesfully created purchase order" });
  };

  const handleGetItems = async () => {
    let {
      data: { items },
    } = await getItems();

    dispatch(setItems(items.rows));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  function _formatPurchaseOrder(values) {
    let { quantity } = values;

    if (items.length > 0) {
      let item = items.find(
        (item) => parseInt(item.id) === parseInt(values.orderedItem)
      );
      const costPrice = item.costPrice;
      //   const retailPrice = item.retailPrice;
      //   const totalProfit = (item.retailPrice - item.costPrice) * quantity;
      const totalAmount = costPrice * quantity;

      let data = {
        ...values,
        orderedItem: item.itemName,
        costPrice,
        totalAmount,
      };

      return data;
    }
  }

  return {
    showModal,
    handleOk,
    handleCancel,
    handleGetItems,
    onFinish,
    handleGetPurchaseOrder,
    handleOnChangePage,
  };
};

export default PurchasedOrdersController;
