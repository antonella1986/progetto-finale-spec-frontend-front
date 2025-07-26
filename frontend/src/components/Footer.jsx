import { Link } from 'react-router-dom';
import logo from '../../public/img/logo-exp-png.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                <Link className="text-decoration-none active" to={'/'}>
                    <img className="logo" src={logo} alt="Logo" style={{height: '80px'}} />
                </Link>
                <p className='pt-5 pb-3'>L'autenticità della Puglia direttamente sulla tua tavola. Genuinità, tradizione e passione per la terra.</p>
                    <div className="social-links pb-3">
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                
                <div className="footer-section">
                    <h4>Prodotti</h4>
                    <ul>
                        <li><Link to="/products">Tutti i prodotti</Link></li>
                        <li><Link to="/comparing">Confronta prodotti</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Azienda</h4>
                    <ul>
                        <li><Link to="/about">Chi siamo</Link></li>
                        <li><Link to="/story">La nostra storia</Link></li>
                        <li><Link to="/sustainability">Sostenibilità</Link></li>
                        <li><Link to="/contact">Contatti</Link></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contatti</h4>
                    <div className="contact-info">
                        <p><i className="fas fa-map-marker-alt"></i> Via dei Campi, 123<br />70100 Bari, Puglia</p>
                        <p><i className="fas fa-phone"></i> +39 080 123 4567</p>
                        <p><i className="fas fa-envelope"></i> info@ortopuglia.it</p>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className='rights'>&copy; 2025 OrtoPuglia. Tutti i diritti riservati.</p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Termini di utilizzo</Link>
                        <Link to="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}