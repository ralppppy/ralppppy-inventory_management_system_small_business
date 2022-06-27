import dayjs from "dayjs";
import {
  setItems,
  setSalesOrder,
  setSalesOrders,
  setIsFetchingData,
  setTotalDataSize,
} from "../models/SalesOrderModel";

const SalesOrderController = ({
  setIsModalVisible,
  getItems,
  dispatch,
  getSalesOrder,
  items,
  createSalesOrder,
  searchParams,
  navigate,

  defaultPageSize,
}) => {
  const handleOnChangePage = (page) => {
    navigate({
      pathname: "/sales-order",
      search: `?page=${page}`,
    });
  };

  const handleGetSalesOrder = async (_, items) => {
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
        salesOrders: { rows, count },
      },
    } = await getSalesOrder({
      variables: { page: currentPage, pageSize: defaultPageSize },
    });

    let newSalesOrder = rows.map((salesOrder) => {
      return _formatSalesOrder(salesOrder);
    });

    dispatch(setSalesOrders(newSalesOrder));
    dispatch(setTotalDataSize(count));
    dispatch(setIsFetchingData(false));
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    let {
      data: { createSalesOrder: salesOrder },
    } = await createSalesOrder({
      variables: {
        ...values,
        date: dayjs(values.date).format("YYYY-MM-DD"),
      },
    });
    let data = _formatSalesOrder(salesOrder);
    salesOrder = { ...salesOrder, key: salesOrder.id, ...data };
    handleCancel();
    dispatch(setSalesOrder(salesOrder));
  };

  const handleGetItems = async () => {
    let {
      data: { items },
    } = await getItems();

    dispatch(setItems(items.rows));
  };

  function _formatSalesOrder(values) {
    let { quantity } = values;

    if (items.length > 0) {
      let item = items.find(
        (item) => parseInt(item.id) === parseInt(values.orderedItem)
      );
      console.log({ items, item, values }, "costPrice");
      const costPrice = item.costPrice;
      const retailPrice = item.retailPrice;
      const totalProfit = (item.retailPrice - item.costPrice) * quantity;
      const totalPrice = item.retailPrice * quantity;

      let data = {
        ...values,
        orderedItem: item.itemName,
        costPrice,
        retailPrice,
        totalProfit,
        totalPrice,
      };

      return data;
    }
  }

  return {
    showModal,
    handleOk,
    handleCancel,
    handleGetSalesOrder,
    handleGetItems,
    onFinish,
    handleOnChangePage,
  };
};

export default SalesOrderController;
