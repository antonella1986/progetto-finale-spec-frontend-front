import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Favourites() {
    const { favouriteProducts, removeFromFavourites } = useContext(GlobalContext);

    return (
        <>           
            <h1 className="text-center mb-5 mt-5"><strong>I tuoi prodotti preferiti</strong></h1>
            <div className="container">
                <div className="row">
                    {favouriteProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-5">
                            <div className="card">
                                <div className="card-body">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.title}
                                    className="img-fluid rounded mx-auto d-block mb-3"
                                    style={{ maxHeight: '250px', objectFit: 'cover', objectPosition: 'center' }}
                                />
                                    <h5 className="card-title">
                                        <strong>{product.title}</strong>
                                    </h5>
                                    <p className="card-text">Categoria: {product.category}</p>
                                        <Link 
                                            to={`/products/${product.id}`} 
                                            className="btn btn-products"
                                        >
                                            Dettagli
                                        </Link>
                                    <button onClick={() => removeFromFavourites(product.id)} className="btn btn-remove mx-3">
                                        Rimuovi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}