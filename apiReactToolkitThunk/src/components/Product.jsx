import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductById,
  clearSelected,
} from "../features/products/productsSlice";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, selectedStatus, selectedError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
    // unmount par purana product clear karo (flash of old data avoid hota hai)

    return () => {
      dispatch(clearSelected());
    };
  }, [id, dispatch]);

  if (
    selectedStatus === "loading" ||
    (!selected && selectedStatus === "idle")
  ) {
    return <p>Loading...</p>;
  }
  if (selectedStatus === "failed") {
    return <p style={{ color: "red" }}>Error: {selectedError}</p>;
  }
  if (!selected) return null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link to="/">← Back to products</Link>

      <div
        style={{ display: "flex", gap: 32, marginTop: 16, flexWrap: "wrap" }}
      >
        <img
          src={selected.image}
          alt={selected.title}
          style={{ width: 300, height: 300, objectFit: "contain" }}
        />

        <div style={{ flex: 1, minWidth: 260 }}>
          <h2>{selected.title}</h2>
          <small>{selected.category}</small>
          <p style={{ fontSize: 24, fontWeight: 700 }}>${selected.price}</p>
          <p>{selected.description}</p>
          {selected.rating && (
            <p>
              ⭐ {selected.rating.rate} ({selected.rating.count} reviews)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
