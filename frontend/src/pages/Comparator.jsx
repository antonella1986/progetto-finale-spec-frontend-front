import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Comparator() {
    const { compareProducts, removeFromCompare } = useContext(GlobalContext);

    return (
        <>
            <h1 className="text-center mb-4">Confronta due prodotti</h1>
            <div className="container">
                {compareProducts.length >= 1 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
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
                                <td><strong>Immagine</strong></td>
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
                            <tr>
                                <td><strong>Prezzo</strong></td>
                                <td className="text-center">€ {compareProducts[0].price}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">€ {compareProducts[1].price}</td>
                                )}
                            </tr>
                            <tr>
                                <td><strong>Categoria</strong></td>
                                <td className="text-center">{compareProducts[0].category}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].category}</td>
                                )}
                            </tr>
                            <tr>
                                <td><strong>Descrizione</strong></td>
                                <td className="text-center">{compareProducts[0].description}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].description}</td>
                                )}
                            </tr>
                            <tr>
                                <td><strong>Marca</strong></td>
                                <td className="text-center">{compareProducts[0].brand}</td>
                                {compareProducts[1] && (
                                    <td className="text-center">{compareProducts[1].brand}</td>
                                )}
                            </tr>                                                 
                            <tr>
                                <td><strong>Azioni</strong></td>
                                <td className="text-center">
                                    <button onClick={() => removeFromCompare(compareProducts[0].id)} 
                                            className="btn btn-danger">Rimuovi</button>
                                </td>
                                {compareProducts[1] && (
                                    <td className="text-center">
                                        <button onClick={() => removeFromCompare(compareProducts[1].id)} 
                                                className="btn btn-danger">Rimuovi</button>
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