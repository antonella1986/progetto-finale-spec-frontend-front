import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "../components/SearchBar";

export default function ProductList() {
    const { sortOrder, setSortOrder, sortedProducts, categories, selectedCategory, setSelectedCategory } = useContext(GlobalContext);

    return (
        <>           
            <h1 className="text-center mb-5 mt-5"><strong>I nostri prodotti</strong></h1>

            <div className="container container-products mt-5">
                <div className="row mb-5">
                    <div className="col-md-4">
                        <SearchBar />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="category-select" className="form-label"><strong>Cerca per categoria</strong></label>
                        <select 
                            className="form-select" 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Tutte le categorie</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {/* prendo la prima lettera (category.charAt(0), la transformo in maiuscolo (toUpperCase) e concateno con il resto del nome (+ category.slice(1)) */}
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="sort-select" className="form-label"><strong>Ordina per</strong></label>
                        <select 
                            className="form-select" 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="title-asc">Nome A-Z</option>
                            <option value="title-desc">Nome Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="col-md-4 mb-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <strong>{product.title}</strong>
                                    </h5>
                                    <p className="card-text">Categoria: {product.category}</p>
                                    <div>
                                        <Link 
                                            to={`/products/${product.id}`} 
                                            className="btn btn-products"
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