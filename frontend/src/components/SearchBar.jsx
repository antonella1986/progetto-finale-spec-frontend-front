import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useContext(GlobalContext);

    return (
        <>
            <label htmlFor="search-input" className="form-label"><strong>Cerca un prodotto</strong></label>
            <input
                type="text"
                placeholder="Scrivi qui..."
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </>
    );
}