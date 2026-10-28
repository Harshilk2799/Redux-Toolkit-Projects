import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/slice/productsSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Products</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {list.map((p) => (
          <div className="col" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                className="card-img-top p-3"
                alt={p.title}
                style={{ height: "220px", objectFit: "contain" }}
              />

              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-secondary align-self-start mb-2">
                  {p.category}
                </span>

                <h6 className="card-title">{p.title}</h6>

                <p
                  className="card-text text-muted small"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>

                <div className="mt-auto">
                  <p className="mb-1 small">
                    ⭐ {p.rating?.rate}{" "}
                    <span className="text-muted">
                      ({p.rating?.count} reviews)
                    </span>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold text-success">
                      ${p.price}
                    </span>
                    <button className="btn btn-primary btn-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
