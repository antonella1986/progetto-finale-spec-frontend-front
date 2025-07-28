import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function Comparator() {
    const { compareProducts, removeFromCompare } = useContext(GlobalContext);

    return (
        <>
            <h1 className="text-center mb-5 mt-5"><strong>Confronta due prodotti</strong></h1>
            <div className="container">
                {compareProducts.length >= 1 ? (
                    <table className="table table-bordered mb-5">
                        <thead>
                            <tr className="table-row">
                                <th width="20%">PRODOTTO</th>
                                <th width="40%" className="text-center">
                                    {compareProducts[0].title}
                                </th>
                                {compareProducts[1] && (
                                    <th width="40%" className="text-center">
                                        {compareProducts[1].title}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>IMMAGINE</strong></td>
                                <td className="text-center">
                                    <img src={compareProducts[0].imageUrl} alt={compareProducts[0].title} 
                                        style={{maxHeight: '200px', objectFit: 'cover'}} />
                                </td>
                                {compareProducts[1] && (
                                    <td className="text-center">
                                        <img src={compareProducts[1].imageUrl} alt={compareProducts[1].title} 
                                            style={{maxHeight: '200px', objectFit: 'cover'}} />
                                    </td>
                                )}
                            </tr>
                            <tr className="table-row">
                                <td><strong>PREZZO</strong></td>
                                <td className="text-center">€ {compareProducts[0].price}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">€ {compareProducts[1].price}</td>
                                )}
                            </tr>
                            <tr>
                                <td><strong>CATEGORIA</strong></td>
                                <td className="text-center">{compareProducts[0].category}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].category}</td>
                                )}
                            </tr>
                            <tr className="table-row">
                                <td><strong>DESCRIZIONE</strong></td>
                                <td className="text-center">{compareProducts[0].description}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].description}</td>
                                )}
                            </tr>
                            <tr>
                                <td><strong>AZIENDA</strong></td>
                                <td className="text-center">{compareProducts[0].brand}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].brand}</td>
                                )}
                            </tr>                                                 
                            <tr className="table-row">
                                <td><strong>AZIONI</strong></td>
                                <td className="text-center">
                                    <Link 
                                        to={`/products/${compareProducts[0].id}`} 
                                        className="btn btn-products me-2"
                                    >
                                        Dettagli
                                    </Link>
                                    <button onClick={() => removeFromCompare(compareProducts[0].id)} 
                                            className="btn btn-remove me-2">Rimuovi</button>
                                </td>
                                {compareProducts[1] && (
                                    <td className="text-center">
                                        <Link 
                                            to={`/products/${compareProducts[1].id}`} 
                                            className="btn btn-products me-2"
                                        >
                                            Dettagli
                                        </Link>
                                        <button onClick={() => removeFromCompare(compareProducts[1].id)} 
                                                className="btn btn-remove me-2">Rimuovi</button>
                                    </td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">Aggiungi 2 prodotti per il confronto</p>
                )}
            </div>
        </>
    );
}