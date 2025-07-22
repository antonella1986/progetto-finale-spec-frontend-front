import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "../components/SearchBar";

export default function ProductList() {
    const { filteredProducts, categories, selectedCategory, setSelectedCategory } = useContext(GlobalContext);

    return (
        <>
            <div className="container mt-3">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <SearchBar />
                    </div>
                    <div className="col-md-6">
                        <select 
                            className="form-select" 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Tutte le categorie</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <h1 className="text-center mb-4">I nostri prodotti</h1>
            <div className="container">
                <div className="row">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-3">
                            <div className="card">
{/*                                 <img 
                                    src={product.imageUrl} 
                                    className="card-img-top" 
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                /> */}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <strong>{product.title}</strong>
                                    </h5>
                                    <p className="card-text">Categoria: {product.category}</p>
                                    <div>
                                        <Link 
                                            to={`/products/${product.id}`} 
                                            className="btn btn-primary"
                                        >
                                            Dettagli
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}