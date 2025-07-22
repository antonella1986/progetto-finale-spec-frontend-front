import { createContext } from "react";
import { useProduct } from "../hook/useProduct";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const { 
        products, 
        setProducts, 
        filteredProducts, 
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories
    } = useProduct();

    return(
        <GlobalContext.Provider value={{ 
            products, 
            setProducts, 
            filteredProducts, 
            searchQuery, 
            setSearchQuery,
            selectedCategory,
            setSelectedCategory,
            categories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };