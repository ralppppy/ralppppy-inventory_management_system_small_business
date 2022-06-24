import { lazy } from "react";

const PurchasedOrdersTable = lazy(() => import("./PurchasedOrdersTable"));
const AddPurchasedOrders = lazy(() => import("./AddPurchasedOrders"));

export { PurchasedOrdersTable, AddPurchasedOrders };
