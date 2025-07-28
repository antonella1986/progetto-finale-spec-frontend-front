import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function SearchBar() {
    const { searchQuery, debounceSearch } = useContext(GlobalContext);
    //per mostrare in tempo reale quello che l'utente sta scrivendo nell'input
    const [inputValue, setInputValue] = useState("");

    //ogni volta che cambia searchQuery, si aggiorna il testo che si vede nell'input
    //per tenere allineato il testo visibile nell'input (inpuValue) con la ricerca vera e propria, impostata col debounce (searchQuery)
    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    //questa funzione verrà eseguita ogni volta che l'utente scrive qualcosa nell'input
    //e = evento generato dalla digitazione (onChange)
    const handleInputChange = (e) => {
        //aggiorno lo stato locale inputValue, che viene usato per mostrare subito il testo nell’input sullo schermo (senza lag)
        setInputValue(e.target.value);
        debounceSearch(e.target.value);
    };

    return (
        <>
            <label htmlFor="search-input" className="form-label"><strong>Cerca un prodotto</strong></label>
            <input
                type="text"
                placeholder="Scrivi qui..."
                className="form-control"
                value={inputValue}
                onChange={handleInputChange}
            />
        </>
    );
}


/*
Tutti i componenti (SearchBar e ProductList) condividono lo stesso stato attraverso il GlobalContext, che a sua volta prende i dati da un'unica istanza di useProduct, garantendo che quando uno modifica qualcosa, tutti gli altri se ne accorgono immediatamente.
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│  SearchBar  │───▶│ GlobalContext│◀───│ ProductList  │
└─────────────┘    └──────────────┘    └──────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ useProduct() │
                   │  (UN SOLO    │
                   │   STATO)     │
                   └──────────────┘

*/