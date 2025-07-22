import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from '../../public/img/logo.png';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="text-decoration-none active" to={'/'}>
                    <img className="logo" src={logo} alt="Logo" style={{height: '60px'}} />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-3">
                        <li className="nav-item">
                            <Link className="text-decoration-none px-3" to={'/products'}>Prodotti</Link>
                        </li>
                    </ul>
                    <SearchBar />
                    ❤️
                </div>
            </div>
        </nav>
    );
}