import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { Link } from "react-router";

function ProductList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed")
    return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        padding: 16,
      }}
    >
      {items.map((p) => (
        <Link
          key={p.id}
          to={`/product/${p.id}`}
          style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
        >
          <img
            src={p.image}
            alt={p.title}
            style={{ height: 140, objectFit: "contain", width: "100%" }}
          />
          <h4 style={{ fontSize: 14 }}>{p.title}</h4>
          <p style={{ fontWeight: 600 }}>${p.price}</p>
          <small>{p.category}</small>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
