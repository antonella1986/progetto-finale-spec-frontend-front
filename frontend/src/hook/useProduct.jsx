import { useState, useEffect, useMemo } from "react";

export function useProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    return { 
        products, 
        setProducts, 
        filteredProducts, 
        searchQuery, 
        setSearchQuery 
    };
}