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
        removeFromFavourites,
        compareProducts,
        addToCompare,
        removeFromCompare
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
            removeFromFavourites,
            compareProducts,
            addToCompare,
            removeFromCompare
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };