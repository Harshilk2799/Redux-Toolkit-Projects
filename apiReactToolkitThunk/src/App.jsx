import ProductList from "./components/ProductList";
import Product from "./components/Product";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";

const appRoutesDefination = createRoutesFromElements(
  <Route>
    <Route path="/" element={<ProductList />} />
    <Route path="/product/:id" element={<Product />} />
  </Route>
);

const appRouter = createBrowserRouter(appRoutesDefination);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
