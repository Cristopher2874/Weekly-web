import { createBrowserRouter } from "react-router-dom";
import LayoutStore from "@/Layout/LayoutStore";
import ProductBase from "@/Elements/Store/ProductBase";
import ShoppingCart from "@/Elements/Store/ShoppingCart";
import SingleProduct from "@/Elements/Product/SingleProduct";
import './App.css'

const App = createBrowserRouter([
  {
    path: "/",
    element: <LayoutStore />,
    children: [
      {
        index:true,
        element: <ProductBase />
      },
      {
        path:"cart",
        element: <ShoppingCart />
      },
      {
        path:"product/:id",
        element: <SingleProduct />
      }
    ]
  }
])

export default App