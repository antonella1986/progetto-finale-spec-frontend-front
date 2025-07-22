import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useContext(GlobalContext);

    return (
        <input
            type="text"
            placeholder="Cerca un prodotto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
}