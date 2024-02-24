import MainScreen from "../pages/MainScreen";
import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SalesDashboard from "../pages/SalesDashboard";
import PaymentDashboard from "../pages/PaymentDashboard";
import ResponsiveReceipt from "../pages/ResponsiveReceipt";
import RefundDashboard from "../pages/RefundDashboard";
import PurchaseReceipts from "../pages/PurchaseReceipts";
import MainContainer from "../shared/components/MainContainer/MainContainer";
import ProductsDashboard from "../pages/ProductsDashboard";
import ProductEditor from "../pages/ProductsDashboard/components/ProductEditor/ProductEditor";
import ProductEntryPanel from "../pages/ProductEntryPanel";
import RequireAuth from "../shared/state/RequireAuth";


export default createBrowserRouter(
    [
        {
            path: "/",
            Component: RequireAuth,
            children:
                [
                    {
                        path: "/login",
                        Component: LoginPage,
                    },
                    {
                        path: "/",
                        Component: MainScreen,
                    },


                    {
                        path: "/",
                        Component: MainContainer,
                        children: [
                            {
                                path: "order/create",
                                Component: SalesDashboard,
                            },
                            {
                                path: "order/payment",
                                Component: PaymentDashboard,
                            },
                            {
                                path: "refund/create",
                                Component: RefundDashboard,
                            },
                            {
                                path: "purchase/list",
                                Component: PurchaseReceipts,
                            },
                            {
                                path: "products/list",
                                Component: ProductsDashboard,
                                children: [
                                    {
                                        path: ":productId",
                                        Component: ProductEditor,
                                    },
                                ]
                            },
                            {
                                path: "product/add",
                                Component: ProductEntryPanel,
                            },
                            {
                                path: "/receipt/:receiptNumber",
                                Component: ResponsiveReceipt,
                            },
                        ]
                    },
                    {
                        path: "*",
                        Component: MainScreen,
                    },
                ]
        },
    ])