import { useState, useEffect, useMemo } from "react";

export function useProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("title-asc");

    useEffect(() => {
        async function fetchProducts() {
            try {
                //prima ottengo la lista con solo alcuni campi
                const response = await fetch("http://localhost:3001/products");
                const basicProducts = await response.json();
                
                //poi per ogni prodotto, ottengo i dati completi
                const fullProductsPromises = basicProducts.map(async (basicProduct) => {
                    const fullResponse = await fetch(`http://localhost:3001/products/${basicProduct.id}`);
                    const fullData = await fullResponse.json();
                    return fullData.product;
                });
                
                const fullProducts = await Promise.all(fullProductsPromises);
                setProducts(fullProducts);
            } catch (error) {
                console.error("Errore nel caricamento dei prodotti:", error);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    //funzione per ottenere le categorie uniche per il dropdown
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        return uniqueCategories.sort();
    }, [products]);

    const sortedProducts = useMemo (() => {
        if (sortOrder === "title-asc") {
            return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "title-desc") {
            return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        }
        //nel caso in cui sortOrder non sia né "title-asc" né "title-desc", restituisco i prodotti senza ordinamento, cioè filteredProducts
        return filteredProducts;
    }, [filteredProducts, sortOrder]);

    return { 
        products, 
        setProducts, 
        filteredProducts, 
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        sortedProducts,
        setSortOrder
    };
}