import { useRoutes } from "react-router-dom";
import { ProductPage } from "../pages/products";
import { createElement } from "react";
import { ActionPage } from "../pages/actions";
import { App } from "../App";
import { NotFoundPage } from "../pages/not-found";

export const AppRoutes = () => {
    return useRoutes([
        {
            element: createElement(App),
            children: [
                {
                    index: true,
                    element: createElement(ProductPage)
                },
                {
                    path: "product",
                    element: createElement(ProductPage)
                },
                {
                    path: "action",
                    children: [
                        {
                            path: ":type",
                            element: createElement(ActionPage)
                        }
                    ]
                },
                {
                    path: "*",
                    element: createElement(NotFoundPage)
                }
            ]
        }
    ]);
};
