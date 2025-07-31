import { createContext } from "react";
import { useProduct } from "../hook/useProduct";

//creo il contesto globale, che consente di condividere dati e funzioni tra i componenti
const GlobalContext = createContext();

//creo il componente provider che rende disponibili ai figli tutti i valori del contesto, che estrae dall’hook
const GlobalProvider = ({ children }) => {
    const {
        products, 
        setProducts, 
        sortedProducts, 
        sortOrder,
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        setSortOrder,
        addToFavourites,
        favouriteProducts,
        removeFromFavourites,
        compareProducts,
        addToCompare,
        removeFromCompare,
        debounceSearch
    } = useProduct();

    return(
        //creo il "megafono" che comunicherà ai figli che possono usare tutte le funzioni all'interno tramite useContext(GlobalContext)
        //value è un oggetto che contiene le varie funzioni
        <GlobalContext.Provider value={{ 
            products, 
            setProducts, 
            sortedProducts,
            sortOrder, 
            searchQuery, 
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            categories,
            setSortOrder,
            addToFavourites,
            favouriteProducts,
            removeFromFavourites,
            compareProducts,
            addToCompare,
            removeFromCompare,
            debounceSearch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };


//creo un componente provider che ha lo scopo di rendere disponibili a tutti i suoi componenti figli una serie di stati e funzioni condivise (come products, setSearchQuery, addToFavourites, ecc.).
//Queste funzioni e stati non vengono scritti direttamente dentro il GlobalProvider, ma vengono centralizzati in un hook personalizzato, chiamato useProduct.
//Il GlobalProvider richiama questo hook e estrae tutte le funzionalità di cui ha bisogno, per poi passarle al context tramite il valore del GlobalContext.Provider.
//In questo modo, qualsiasi componente figlio del provider può accedere a quei dati/funzioni semplicemente utilizzando useContext(GlobalContext).