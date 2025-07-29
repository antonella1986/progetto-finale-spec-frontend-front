import { useState, useEffect, useMemo, useCallback } from "react";

export function useProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("title-asc");
    const [favourites, setFavourites] = useState([]);
    const [compareList, setCompareList] = useState([]);

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

    //FUNZIONE PER SALVARE I PRODOTTI NEL LOCAL STORAGE
    useEffect(() => {
        //vado nel browser storage e cerco la chiave "favourites"
        //se esiste, restituisce la stringa salvata, altrimenti restituisce null. il risultato viene salvato dentro saved
        const saved = localStorage.getItem('favourites');
        //se saved esiste, converto la stringa nell'array, altrimenti è null
        const savedFavourites = saved ? JSON.parse(saved) : [];
        //imposto lo stato favourites con i dati recuperati dal localStorage
        setFavourites(savedFavourites)
    }, []);

    //FUNZIONE PER CARICARE I PRODOTTI DEL COMPARATORE QUANDO L'UTENTE RIAPRE IL SITO
    useEffect(() => {
        //vado nel browser storage e cerco la chiave "compareList"
        //se esiste, restituisce la stringa salvata, altrimenti restituisce null. il risultato viene salvato dentro savedKey
        const savedKey = localStorage.getItem('compareList');
        //se savedKey esiste, converto la stringa nell'array, altrimenti è null
        const savedCompareList = savedKey ? JSON.parse(savedKey) : [];
        //imposto lo stato compareList con i dati recuperati dal localStorage
        setCompareList(savedCompareList)
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

    //FUNZIONE PER TRASFORMARE GLI ID DEI PRODOTTI IN OGGETTI PER LA PAGINA DEI PREFERITI
    const favouriteProducts = useMemo(() => {
        //aspetta che products si carichi
        if (products.length === 0) return [];
        return favourites.map(id =>
            products.find(product => product.id === id)
        //rimuove undefined    
        ).filter(Boolean);
    }, [favourites, products])

    //FUNZIONE PER AGGIUNGERE I PRODOTTI AI PREFERITI
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

    //FUNZIONE PER AGGIUNGERE I PRODOTTI ALLA COMPARAZIONE
    function addToCompare(id, navigate) {
        if(compareList.includes(id)) {
            alert ('Hai già aggiunto questo prodotto per il confronto!')
        } else if (compareList.length >= 2) {
            alert ('Non puoi inserire più di due prodotti!')
        } else {
            const newComparedList = [...compareList, id];
            setCompareList(newComparedList)
            alert ('Prodotto aggiunto al confronto!')
            localStorage.setItem('compareList', JSON.stringify([...compareList, id]))
            if (newComparedList.length >= 2) {
                navigate('/comparing')
            }
        }
    }

    //FUNZIONE PER TRASFORMARE GLI ID DEI PRODOTTI IN OGGETTI PER LA PAGINA DELLA COMPARAZIONE
    const compareProducts = useMemo(() => {
        //controlla se l'array products è vuoto (ancora in caricamento dal server). Se è vuoto, restituisce un array vuoto [] per evitare errori.
        if (products.length === 0) return [];
        //prende l'array compareList (che contiene solo ID) e, per ogni ID...
            return compareList.map(id =>
                //...cerca nell'array products il prodotto che ha quell'ID. find() restituisce l'oggetto prodotto completo o undefined se non lo trova
                products.find(product => product.id === id)
            //rimuove undefined (nel caso un ID non corrisponda a nessun prodotto). filter(Boolean) tiene solo i valori "veri"
            ).filter(Boolean);
    }, [compareList, products])

    //FUNZIONE PER RIMUOVERE I PRODOTTI DAL COMPARATORE
    function removeFromCompare(id, navigate = null) {
        if (compareList.includes(id)) {
            const newRemovedComparedList = compareList.filter(compareId => compareId !== id);
            setCompareList(newRemovedComparedList);
            localStorage.setItem('compareList', JSON.stringify(newRemovedComparedList));
            alert ('Prodotto rimosso dal comparatore!')
            
            // Solo se navigate esiste e non rimane nessun prodotto, naviga alla pagina products
            if (navigate && newRemovedComparedList.length === 0) {
                navigate('/products')
            }
        } else {
            alert ('Questo prodotto non era nel tuo comparatore!')
        }
    }

    //DEBOUNCE PER LA RICERCA
    //dichiarazione funzione debounce
    function debounce (callback, delay) {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(()=> {
                callback(...args)
            }, delay)
        }
    }

    //uso funzione debounce
    const debounceSearch = useCallback (
        debounce((value) => {
            setSearchQuery(value)
        }, 500),
    [])

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
        sortOrder,
        setSortOrder,
        addToFavourites,
        favouriteProducts,
        removeFromFavourites,
        addToCompare,
        compareProducts,
        removeFromCompare,
        debounceSearch
    };
}


/*
1.L’utente digita nella SearchBar → parte debounceSearch(value).
2. Dopo 500 ms di inattività → viene aggiornato searchQuery.
3. searchQuery è una dipendenza di useMemo(), quindi ogni volta che cambia...
4. ...React ricalcola filteredProducts filtrando i prodotti per:
    - Titolo (matchesSearch)
    - Categoria selezionata (matchesCategory)
5. Il risultato filtrato viene poi visualizzato nell’interfaccia, per esempio in una griglia o lista.
*/