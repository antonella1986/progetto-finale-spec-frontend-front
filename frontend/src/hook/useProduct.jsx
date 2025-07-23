import { useState, useEffect, useMemo } from "react";

export function useProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("title-asc");
    const [favourites, setFavourites] = useState([]);

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

    useEffect(() => {
        //vado nel browser storage e cerco la chiave "favourites"
        //se esiste, restituisce la stringa salvata, altrimenti restituisce null. il risultato viene salvato dentro saved
        const saved = localStorage.getItem('favourites');
        //se saved esiste, converto la stringa nell'array, altrimenti è null
        const savedFavourites = saved ? JSON.parse(saved) : [];
        //imposto lo stato favourites con i dati recuperati dal localStorage
        setFavourites(savedFavourites)
    }, []);

    //FUNZIONE PER OTTENERE I PRODOTTI FILTRATI DALL'UTENTE
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    //FUNZIONE PER LA SELEZIONE DELLA CATEGORIA DALLA DROPDOWN
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        return uniqueCategories.sort();
    }, [products]);

    //FUNZIONE PER L'ORDINE ALFABETICO DEI PRODOTTI FILTRATI DALL'UTENTE
    const sortedProducts = useMemo (() => {
        if (sortOrder === "title-asc") {
            return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "title-desc") {
            return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        }
        //nel caso in cui sortOrder non sia né "title-asc" né "title-desc", restituisco i prodotti senza ordinamento, cioè filteredProducts
        return filteredProducts;
    }, [filteredProducts, sortOrder]);

    //USEMEMO CON
    const favouriteProducts = useMemo(() => {
        return favourites.map(id =>
            products.find(product => product.id === id)
        )
    }, [favourites, products])

    //FUNZIONE PER AGGIUNGERE I PRODOTTI DAI PREFERITI
    function addToFavourites(id) {
        if (favourites.includes(id)) {
            alert ('Questo prodotto è già nei tuoi preferiti!')
        } else {
            setFavourites([...favourites, id])
            alert ('Prodotto aggiunto ai preferiti!')
            localStorage.setItem('favourites', JSON.stringify([...favourites, id]));
        }
    }

    //FUNZIONE PER RIMUOVERE I PRODOTTI DAI PREFERITI
    function removeFromFavourites(id) {
        if (favourites.includes(id)) {
            const newFavourites = favourites.filter(favouriteId => favouriteId !== id);
            setFavourites(newFavourites);
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
            alert ('Prodotto rimosso dai preferiti!')
        } else {
            alert ('Questo prodotto non era nei tuoi preferiti!')
        }
    }

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
        setSortOrder,
        addToFavourites,
        favouriteProducts,
        removeFromFavourites
    };
}