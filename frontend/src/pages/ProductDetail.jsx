import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { products, addToFavourites, addToCompare } = useContext(GlobalContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    //mi serve lo useEffect perché i dati arrivano in momenti diversi: prima arriva l'ID dall'URL e poi arriva la lista dei prodotti dal server. useEffect si attiva (quindi esegue la logica al suo interno) ogni volta che cambia id o products (cioè quando l'utente seleziona un determinato prodotto), così quando arrivano entrambi trova quello giusto. senza, il codice gira solo una volta all'inizio quando non ho ancora i prodotti, quindi non trova niente!
    useEffect(() => {
        //nell'array products, cerco il prodotto con l'id corrispondente
        const foundProduct = products.find(p => p.id === parseInt(id));
        //se il prodotto è stato trovato, lo imposto come prodotto corrente
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
                        srcSet={product.imageUrl} 
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

/*

🔄 Scenario completo:

Situazione 1 - Primo caricamento:
Utente clicca su "Pomodori" nella lista → URL diventa /products/3
useParams() estrae id = "3"
useEffect cerca il prodotto con ID 3 nell'array products
Pagina mostra i dettagli dei pomodori

Situazione 2 - Cambio prodotto:
Utente clicca su "Basilico" → URL diventa /products/7
useParams() ora restituisce id = "7"
useEffect si riattiva (perché id è cambiato!)
Cerca il prodotto con ID 7
Pagina si aggiorna e mostra i dettagli del basilico

*/