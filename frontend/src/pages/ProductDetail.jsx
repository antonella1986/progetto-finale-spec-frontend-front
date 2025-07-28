import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { products, addToFavourites, addToCompare } = useContext(GlobalContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
    }, [id, products]);

    if (!product) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Caricamento prodotto...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="mb-3">
                <NavLink to="/products" className="btn btn-back">
                    <i className="fa-solid fa-arrow-left me-2"></i> Torna alla lista dei prodotti
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
                        <span className="badge fs-6" style={{ backgroundColor: product.category === 'Verdura' ? 'var(--primary)' : 'var(--red)' }}>{product.category}</span>
                        {product.isBio && <span className="badge bg-success ms-2 fs-6">BIO</span>}
                    </div>
                    
                    <p className="fs-3 price"><strong>€ {product.price}</strong></p>
                    
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
                    
                    <div className="d-grid gap-2 d-md-flex mt-4">
                        <button className="btn btn-products btn-lg me-md-2 buttons">
                            <img src="../../public/img/carrello.svg" alt="Aggiungi al carrello" style={{ height: '20px' }} className="me-2" />
                            Aggiungi al carrello
                        </button>
                        <button onClick={() => addToFavourites(product.id)} className="btn btn-remove btn-lg me-md-2 buttons">
                            <img src="../../public/img/aggiungi.svg" alt="Aggiungi ai preferiti" style={{ height: '20px' }} /> Aggiungi ai preferiti
                        </button>
                        <button onClick={() => addToCompare(product.id, navigate)} className="btn btn-compare btn-lg buttons">
                            <img src="../../public/img/confronta.svg" alt="Confronta" style={{ height: '20px' }} className="me-2"/>
                            Confronta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}