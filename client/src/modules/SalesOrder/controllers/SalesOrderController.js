import { setItems, setSalesOrder } from "../models/SalesOrderModel";

const SalesOrderController = ({
  setIsModalVisible,
  getItems,
  dispatch,
  items,
}) => {
  const onFinish = (values) => {
    let { quantity } = values;

    let item = items.find(
      (item) => parseInt(item.id) === parseInt(values.orderedItem)
    );

    const costPrice = item.costPrice;
    const retailPrice = item.retailPrice;
    const totalProfit = (item.retailPrice - item.costPrice) * quantity;
    const totalPrice = item.retailPrice * quantity;

    let data = { ...values, costPrice, retailPrice, totalProfit, totalPrice };

    dispatch(setSalesOrder(data));
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return { showModal, handleOk, handleCancel, handleGetItems, onFinish };
};

export default SalesOrderController;
