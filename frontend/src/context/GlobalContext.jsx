import { createContext } from "react";
import { useProduct } from "../hook/useProduct";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const { 
        products, 
        setProducts, 
        sortedProducts, 
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        setSortOrder,
        addToFavourites,
        favouriteProducts,
        removeFromFavourites
    } = useProduct();

    return(
        <GlobalContext.Provider value={{ 
            products, 
            setProducts, 
            sortedProducts, 
            searchQuery, 
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            categories,
            setSortOrder,
            addToFavourites,
            favouriteProducts,
            removeFromFavourites
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };