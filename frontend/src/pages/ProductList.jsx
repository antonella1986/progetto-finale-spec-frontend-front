import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "../components/SearchBar";
import { useContext } from "react";

export default function ProductList() {
    const { filteredProducts } = useContext(GlobalContext);

    return (
        <>
            <SearchBar />
            <h1>ProductList</h1>
            <div>
                {filteredProducts.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <p>Categoria: {product.category}</p>
                    </div>
                ))}
            </div>
        </>
    );
}