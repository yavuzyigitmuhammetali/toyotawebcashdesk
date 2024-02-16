import App from "../App";
import MainScreen from "../pages/MainScreen";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SalesDashboard from "../pages/SalesDashboard";
import PaymentDashboard from "../pages/PaymentDashboard";
import ResponsiveReceipt from "../pages/ResponsiveReceipt";
import RefundDashboard from "../pages/RefundDashboard";
import PurchaseReceipts from "../pages/PurchaseReceipts";

export default createBrowserRouter(
    [
        {
            path: "/",
            Component: MainScreen,
        },
        {
            path: "/login",
            Component: LoginPage,
        },
        {
            path: "/receipt/:receiptNumber",
            Component: ResponsiveReceipt,
        },
        {
            path: "/",
            Component: App,
            children: [
                {
                    path: "/order/create",
                    Component: SalesDashboard,
                },
                {
                    path: "/order/payment",
                    Component: PaymentDashboard,
                },
                {
                    path: "/refund/create",
                    Component: RefundDashboard,
                },
                {
                    path: "/purchase/list",
                    Component: PurchaseReceipts,
                },
            ]
        },
        {
            path: "*",
            Component: MainScreen,
        }
    ])