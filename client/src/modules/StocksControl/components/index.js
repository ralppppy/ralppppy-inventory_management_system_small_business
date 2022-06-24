import { lazy } from "react";

const AddStocksControl = lazy(() => import("./AddStocksControl"));
const StocksControlTable = lazy(() => import("./StocksControlTable"));

export { AddStocksControl, StocksControlTable };
