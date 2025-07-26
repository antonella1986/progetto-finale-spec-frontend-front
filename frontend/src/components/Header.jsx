import { Link } from 'react-router-dom';
import logo from '../../public/img/logo-exp-png.png';
import preferiti from '../../public/img/preferiti.svg';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="text-decoration-none active" to={'/'}>
                    <img className="logo" src={logo} alt="Logo" style={{height: '80px'}} />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-3">
                        <li className="nav-item">
                            <Link className="text-decoration-none products-link" to={'/products'}>Prodotti</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-decoration-none products-link" to={'/comparing'}>Comparatore</Link>
                        </li>
                    </ul>
                    <Link to="/favourites" className="text-decoration-none">
                        <img className="preferiti" src={preferiti} alt="preferiti" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}