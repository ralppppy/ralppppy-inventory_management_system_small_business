import { lazy } from "react";

const SalesOrderTable = lazy(() => import("./SalesOrderTable"));
const AddSalesOrder = lazy(() => import("./AddSalesOrder"));

export { SalesOrderTable, AddSalesOrder };
