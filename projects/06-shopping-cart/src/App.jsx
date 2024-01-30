import "./App.css";
import { Products } from "./componets/Products";
import { products as initialProducts } from "./mocks/products.json";
import { Header } from "./componets/Header";
import { useFilters } from "./hooks/useFilters";
import { Footer } from "./componets/Footer";
import { IS_DEVELOPMENT } from "./config";
import { Cart } from "./componets/Cart";
import { CartProvider } from "./context/cart";

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;
