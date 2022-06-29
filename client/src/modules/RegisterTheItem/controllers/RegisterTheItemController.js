import { message } from "antd";
import {
  setIsFetchingData,
  setItem,
  setItems,
  setTotalDataSize,
} from "../models/RegisterTheItemSlice";

const RegisterTheItemController = ({
  setIsModalVisible,
  form,
  setProfit,
  createItem,
  dispatch,
  getItems,
  searchItems,
  navigate,
  searchParams,
  defaultPageSize,
  setSearchParams,
}) => {
  const handleOnChangePage = (page) => {
    let searchText = searchParams.get("search");
    let search = searchText
      ? `?page=${page}&search=${searchText}`
      : `?page=${page}`;
    navigate({
      pathname: "/register-item",
      search: search,
    });
  };
  const handleGetItems = async (p) => {
    let currentPage = searchParams.get("page")
      ? isNaN(parseInt(searchParams.get("page")))
        ? 1
        : parseInt(searchParams.get("page"))
      : 1;

    dispatch(setIsFetchingData(true));
    let {
      data: {
        items: { rows, count },
      },
    } = await getItems({
      variables: {
        page: currentPage,
        pageSize: defaultPageSize,
        searchParams: searchParams.get("search")
          ? searchParams.get("search")
          : "",
      },
    });

    let formatedItems = _formatItems(rows);

    dispatch(setItems(formatedItems));
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
    let { data } = await createItem({ variables: values });

    let profit = _calculateProfit(
      data.createItem.retailPrice,
      data.createItem.costPrice
    );
    let profitPercentage = _calculateProfitPercent(
      data.createItem.retailPrice,
      data.createItem.costPrice
    ).toFixed(2);

    let newItem = { ...data.createItem, profit, profitPercentage };

    dispatch(setItem(newItem));
    handleCancel();
    message.success({ content: "Succesfully registered item" });
  };

  const handleCalculateProfit = (values) => {
    const { retailPrice, costPrice } = form.getFieldsValue();

    let profit = 0;
    let profitPercent = 0;

    if (values.hasOwnProperty("costPrice")) {
      let retail = retailPrice || 0;
      let cost = values.costPrice;
      profit = _calculateProfit(retail, cost);
      profitPercent = _calculateProfitPercent(retail, cost);
    } else if (values.hasOwnProperty("retailPrice")) {
      let retail = values.retailPrice || 0;
      let cost = costPrice || 0;
      profit = _calculateProfit(retail, cost);
      profitPercent = _calculateProfitPercent(retail, cost).toFixed(2);
    }

    if (retailPrice && costPrice) {
      setProfit({ profit, profitPercent });
    }
  };

  const handleItemsSearch = async (searchText) => {
    const initialPage = 1;
    searchParams.set("page", initialPage);
    if (searchText) {
      searchParams.set("search", searchText);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);

    let {
      data: {
        searchedItems: { count, rows },
      },
    } = await searchItems({
      variables: {
        itemName: searchText,
        page: initialPage,
        pageSize: defaultPageSize,
      },
    });

    let formatedItems = _formatItems(rows);
    dispatch(setItems(formatedItems));
    dispatch(setTotalDataSize(count));
  };

  function _calculateProfit(retail, cost) {
    return retail - cost;
  }

  function _calculateProfitPercent(retail, cost) {
    return ((retail - cost) / cost) * 100;
  }

  function _formatItems(items) {
    let formatedItems = items.map((item) => {
      let profit = _calculateProfit(item.retailPrice, item.costPrice);
      let profitPercentage = _calculateProfitPercent(
        item.retailPrice,
        item.costPrice
      ).toFixed(2);

      return { ...item, profit, profitPercentage };
    });

    return formatedItems;
  }

  return {
    showModal,
    handleOk,
    handleCancel,
    onFinish,
    handleCalculateProfit,
    handleGetItems,
    handleItemsSearch,
    handleOnChangePage,
  };
};

export default RegisterTheItemController;
