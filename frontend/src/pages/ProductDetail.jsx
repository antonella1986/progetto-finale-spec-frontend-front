import { useParams, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { products, addToFavourites } = useContext(GlobalContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
    }, [id, products]);

    if (!product) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p className="mt-2">Caricamento prodotto...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <NavLink to="/products" className="btn btn-outline-secondary">
                    ← Torna alla lista dei prodotti
                </NavLink>
            </div>
            
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3"><strong>{product.title}</strong></h1>
                    <div className="mb-3">
                        <span className="badge bg-secondary fs-6">{product.category}</span>
                        {product.isBio && <span className="badge bg-success ms-2 fs-6">BIO</span>}
                    </div>
                    
                    <p className="lead text-primary fs-3">€ {product.price}</p>
                    
                    <div className="mb-3">
                        <h5><strong>Descrizione</strong></h5>
                        <p>{product.description}</p>
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Peso:</strong> {product.weight}g
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <strong>Marca:</strong> {product.brand}
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <strong>Origine:</strong> {product.origin}
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex">
                        <button className="btn btn-primary btn-lg me-md-2">
                            Aggiungi al carrello
                        </button>
                        <button onClick={() => addToFavourites(product.id)} className="btn btn-outline-danger btn-lg">
                            ❤️ Aggiungi ai preferiti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}