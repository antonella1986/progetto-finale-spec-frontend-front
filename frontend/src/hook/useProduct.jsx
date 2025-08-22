import { useState, useEffect, useMemo, useCallback } from "react";

export function useProduct() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("title-asc");
    const [favourites, setFavourites] = useState([]);
    const [compareList, setCompareList] = useState([]);


    useEffect(() => {
        //fetchProducts() è asincrona perché deve attendere la risposta del server senza bloccare l'interfaccia utente. l'await garantisce che response.json() venga eseguito solo dopo aver ricevuto i dati dal server
        async function fetchProducts() {
            try {
                //prima ottengo la lista con solo alcuni campi
                const response = await fetch("http://localhost:3001/products");
                //ottengo i prodotti (oggetto JS) con solo id, title, category, createdAt e updatedAt
                const basicProducts = await response.json();
                
                //poi per ogni prodotto, prendo i dettagli completi
                //per ogni prodotto, il map esegue una funzione asincrona (che restituisce una promise per prodotto)
                //qualsiasi funzione async restituisce SEMPRE una Promise, anche se dentro faccio return di un valore normale
                //uso basicProduct come parametro perché mi serve dentro alla funzione per accedere all'id del prodotto (per la fetch dettagliata)
                const fullProductsPromises = basicProducts.map(async (basicProduct) => {
                    //dalla fetch ottengo una risposta grezza (oggetto di tipo Response [status, body, headers...])
                    const fullResponse = await fetch(`http://localhost:3001/products/${basicProduct.id}`);
                    //trasformo la risposta in oggetto JS
                    const fullData = await fullResponse.json();
                    //restituisco solo la parte product della risposta (altrimenti avrei ottenuto anche status: success e product sarebbe stato annidato)
                    //ora la promise viene risolta: il valore viene "affidato" all'esterno grazie al return, diventando il risultato della promise
                    return fullData.product;
                }); //in console qui vedrei [ Promise { <pending> }, Promise { <pending> }... ] perché la funzione async trasforma tutto in promise (i prodotti li ottengo con Promise.all)
                
                //aspetto che TUTTE le chiamate ai dettagli finiscano
                //ogni .map() restituisce una Promise, e uso Promise.all() per aspettare che tutte le fetch siano completate (partono insieme), ottenendo così la lista di tutti i prodotti con i dettagli completi
                const fullProducts = await Promise.all(fullProductsPromises);
                //salvo tutti i prodotti completi nello stato products. ora ho tutti i dati e posso mostrarli
                setProducts(fullProducts);
            } catch (error) {
                console.error("Errore nel caricamento dei prodotti:", error);
            }
        }
        fetchProducts();
    }, []);

    //FUNZIONE PER RECUPERARE I PREFERITI DAL LOCAL STORAGE
    useEffect(() => {
        //vado nel browser storage e cerco la chiave "favourites"
        //se esiste, restituisce la stringa salvata, altrimenti restituisce null. il risultato viene salvato dentro saved
        const saved = localStorage.getItem('favourites');
        //se saved esiste, converto la stringa in array di ID, altrimenti è null, perché localStorage salva stringhe, non oggetti o array
        const savedFavourites = saved ? JSON.parse(saved) : [];
        //aggiorno lo stato con i prodotti preferiti (salvati in savedFavourites)
        setFavourites(savedFavourites)
    }, []);

    //FUNZIONE PER RECUPERARE I PRODOTTI DEL COMPARATORE
    useEffect(() => {
        //vado nel browser storage e cerco la chiave "compareList"
        //se esiste, restituisce la stringa salvata, altrimenti restituisce null. il risultato viene salvato dentro savedKey
        const savedKey = localStorage.getItem('compareList');
        //se savedKey esiste, converto la stringa nell'array, altrimenti è null
        const savedCompareList = savedKey ? JSON.parse(savedKey) : [];
        //imposto lo stato compareList con i dati recuperati dal localStorage
        setCompareList(savedCompareList)
    }, []);

    //FUNZIONE PER LA SELEZIONE DELLA CATEGORIA DALLA DROPDOWN (fornisce la lista per popolare la select dell'interfaccia)
    const categories = useMemo(() => {
        //Set rimuove i duplicati, ma ciò che restituisce non è un array (è un oggetto Set: { "verdura", "frutta" }), quindi lo spread lo converte automaticamente in array)
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        //mi ritorna le categorie in ordine alfabetico
        return uniqueCategories.sort();
    }, [products]);

    //FUNZIONE PER OTTENERE I PRODOTTI FILTRATI DALL'UTENTE (PER TITOLO E PER CATEGORIA)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            //filtro i prodotti completi sia per titolo che per categoria
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            //mostra tutti i prodotti SE nessuna categoria è selezionata OPPURE mostra il prodotto SE il suddetto prodotto appartiene alla categoria selezionata
            const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
            //un prodotto viene mostrato se soddisfa entrambe le condizioni (se il titolo contiene il testo cercato E la categoria corrisponde a quella selezionata [o nessuna categoria è stata selezionata])
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    //FUNZIONE PER L'ORDINE ALFABETICO DEI PRODOTTI FILTRATI DALL'UTENTE
    const sortedProducts = useMemo (() => {
        //sortOrder contiene il tipo di ordinamento selezionato dall'utente
        if (sortOrder === "title-asc") {
            return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "title-desc") {
            return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        }
        //nel caso in cui sortOrder non sia né "title-asc" né "title-desc", restituisco i prodotti senza ordinamento, cioè filteredProducts
        return filteredProducts;
    }, [filteredProducts, sortOrder]);
    
    //FUNZIONE PER AGGIUNGERE I PRODOTTI AI PREFERITI
    function addToFavourites(id) {
        //se il prodotto è già nei preferiti, mostro un alert
        if (favourites.includes(id)) {
            alert ('Questo prodotto è già nei tuoi preferiti!')
        } else {
            //altrimenti, lo aggiungo (a quelli ch già ci sono, se ci sono) e lo salvo nella memoria del browser
            setFavourites([...favourites, id])
            alert ('Prodotto aggiunto ai preferiti!')
            localStorage.setItem('favourites', JSON.stringify([...favourites, id]));
        }
    }

    //FUNZIONE PER TRASFORMARE GLI ID DEI PRODOTTI IN OGGETTI PER LA PAGINA DEI PREFERITI
    const favouriteProducts = useMemo(() => {
        //se non ci sono prodotti, restituisco un array vuoto per evitare l'errore (undefined)
        if (products.length === 0) return [];
        //uso il map per prendere ogni ID dall'array favourites, e per ogni ID...
        return favourites.map(id =>
            //...cerco il prodotto con l'id corrispondente, mi viene restituito l'oggetto intero e lo assegna a favouriteProducts
            products.find(product => product.id === id)
        //rimuove tutti gli undefined    
        ).filter(Boolean);
       //viene ricalcolato ogni volta che cambiano favourites (aggiunta/rimozione preferiti) o products (quando arrivano dal server)
    }, [favourites, products])
    
    //FUNZIONE PER RIMUOVERE I PRODOTTI DAI PREFERITI
    function removeFromFavourites(id) {
        if (favourites.includes(id)) {
            //filtro l'array dei prodotti preferiti per cercare il prodotto con l'id corrispondente a quello che voglio rimuovere e lo rimuovo
            //salvo il risultato dentro newFavourites
            const newFavourites = favourites.filter(favouriteId => favouriteId !== id);
            //il risultato, con i preferiti senza quel determinato prodotto su cui ho cliccato, lo salvo dentro i preferiti attuali (tramite setFavourites)
            setFavourites(newFavourites);
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
            alert ('Prodotto rimosso dai preferiti!')
        } else {
            alert ('Questo prodotto non era nei tuoi preferiti!')
        }
    }

    //FUNZIONE PER AGGIUNGERE I PRODOTTI ALLA COMPARAZIONE
    function addToCompare(id, navigate) {
        //controllo duplicati
        if(compareList.includes(id)) {
            alert ('Hai già aggiunto questo prodotto per il confronto!')
          //controllo limite massimo
        } else if (compareList.length >= 2) {
            alert ('Non puoi inserire più di due prodotti!')
          //aggiunta effettiva
        } else {
            const newComparedList = [...compareList, id];
            setCompareList(newComparedList)
            alert ('Prodotto aggiunto al confronto!')
            localStorage.setItem('compareList', JSON.stringify([...compareList, id]))
            //redirect automatico
            if (newComparedList.length === 2) {
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
    //navigate = null -> redirect opzionale in base al caso (nei vari componenti)
    //opzionale nel senso che: non mi serve il redirect se nel comparatore elimino un solo prodotto e ne rimane un altro, e mi serve il redirect se nel comparatore elimino entrambi i prodotti, corretto?
    function removeFromCompare(id, navigate = null) {
        if (compareList.includes(id)) {
            //uso filter perché restituisce un nuovo array senza l'elemento che voglio rimuovere
            const newRemovedComparedList = compareList.filter(compareId => compareId !== id);
            setCompareList(newRemovedComparedList);
            localStorage.setItem('compareList', JSON.stringify(newRemovedComparedList));
            alert ('Prodotto rimosso dal comparatore!')
            
            //se viene rimosso l'ultimo prodotto dalla lista (che appunto rimane vuota), viene fatto il redirect
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
        //variabile che tiene traccia del timer attivo
        let timeout
        //args sono gli argomenti passati alla funzione (è un array)
        return (...args) => {
            //cancella il timer precedente
            clearTimeout(timeout)
            //crea un nuovo timer perché l'utente ha digitato
            timeout = setTimeout(()=> {
                //esegue la funzione originale (= setSearchQuery(value))
                callback(...args)
            }, delay)
        }
    }

    //uso funzione debounce
    //useCallback fa in modo di non ricreare la funzione debounceSearch se succede qualcosa dentro il componente (es. prima dello scadere dei 500ms usa il filtro o la select), ma la stessa, non cambia (cioè l'utente non sta usando la funzione di ricerca)
    const debounceSearch = useCallback (
        //value è il testo digitato
        //se passano almeno 500ms, searchQuery (lo stato della ricerca) viene aggiornato con il value tramite setSearchQuery (parte la funzione di ricerca)
        debounce((value) => {
            //setSearchQuery è il ponte tra l'input dell'utente e la funzione di filtro. Quando cambia searchQuery, automaticamente cambia anche filteredProducts grazie a useMemo
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
Ecco cosa succede, passo per passo:
Viene creato un timer (setTimeout) che aspetta 500 millisecondi prima di eseguire setSearchQuery("p").

Se l’utente nel frattempo digita ancora (es. "pe", "per", "pera"):

La funzione debounceSearch viene chiamata di nuovo.

Ogni volta che viene chiamata:

Cancella il timer precedente con clearTimeout(timeout). Questo serve a evitare che venga eseguito il setSearchQuery con un valore parziale.

Crea un nuovo timer da 500 millisecondi con setTimeout, ripartendo da zero.

Quando l’utente smette di digitare per almeno 500 millisecondi, il timer riesce finalmente ad arrivare alla fine:

E a quel punto esegue setSearchQuery("pera"), salvando il valore nello stato.

// Utente digita "p"
onChange → debounceSearch("p") → Timer di 500ms inizia

// Utente digita "po" (prima che scadano i 500ms)
onChange → debounceSearch("po") → Timer precedente cancellato, nuovo timer di 500ms inizia

// Utente digita "pom" (prima che scadano i 500ms)  
onChange → debounceSearch("pom") → Timer precedente cancellato, nuovo timer di 500ms inizia

// Utente smette di digitare per 500ms
→ Timer scade → setSearchQuery("pom") viene eseguito

// searchQuery cambia da "" a "pom"
→ filteredProducts si ricalcola automaticamente (grazie a useMemo)

// React si accorge che filteredProducts è cambiato
→ Componente si ri-renderizza → Mostra i risultati filtrati

ℹ️ Dettagli aggiuntivi
Il parametro ...args rappresenta gli argomenti passati alla funzione "debounced", ed è un array. Nel nostro caso, è come scrivere args = [value], dove value è il testo digitato.

Il callback(...args) serve a invocare la funzione originale passando gli stessi argomenti.
*/

/* useRef
"Con const searchInputRef = useRef(null) creo un riferimento che React collegherà all'elemento HTML input nel DOM quando verrà renderizzato (inizialmente in console vedrei {current: null}). Poi creo il collegamento vero e proprio con la proprietà ref, mettendoci searchInputRef, collegando così il riferimento all'elemento DOM reale. La proprietà current conterrà l'elemento DOM completo, non solo il valore. Stampando in console searchInputRef.current vedrò in console l'elemento HTML completo (es. <input type="text">), mentre aggiungendo .value (searchInputRef.current.value) vedrò in console il valore vero e proprio digitato dall'utente. Importante: questo funziona solo dopo che React ha renderizzato il componente, quindi va usato dentro useEffect o event handlers, non direttamente nel corpo del componente."
*/

/*
Grazie a navigate = null, la variabile navigate all'interno della funzione sarà impostata su null. La condizione if (navigate && ...) verrà valutata come falsa (false && ...) e il codice per la navigazione non verrà mai eseguito. La funzione farà solo la sua azione principale: rimuovere l'elemento
*/