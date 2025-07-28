import { createContext } from "react";
import { useProduct } from "../hook/useProduct";

const GlobalContext = createContext();

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