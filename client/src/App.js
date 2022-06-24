import "./App.less";
import { AdminLayout } from "./modules/Layout/views";
import { Home } from "./modules/Home/views";
import { Login } from "./modules/Login/views";
import { SalesOrder } from "./modules/SalesOrder/views";
import { PurchasedOrders } from "./modules/PurchasedOrders/views";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import { StocksControl } from "./modules/StocksControl/views";
import { RegisterTheItem } from "./modules/RegisterTheItem/views";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute Layout={AdminLayout} Component={SalesOrder} />
            }
          />
          <Route
            path="/sales-order"
            element={
              <PrivateRoute Layout={AdminLayout} Component={SalesOrder} />
            }
          />
          <Route
            path="/purchased-orders"
            element={
              <PrivateRoute Layout={AdminLayout} Component={PurchasedOrders} />
            }
          />
          <Route
            path="/stocks-control"
            element={
              <PrivateRoute Layout={AdminLayout} Component={StocksControl} />
            }
          />
          <Route
            path="/register-item"
            element={
              <PrivateRoute Layout={AdminLayout} Component={RegisterTheItem} />
            }
          />
          <Route path="/login" element={<PrivateRoute Component={Login} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
