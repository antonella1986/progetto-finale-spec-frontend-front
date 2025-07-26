import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container container-jumbo">
                    <h1 className="display-3"><strong>OrtoPuglia</strong></h1>
                    <p className="lead">I sapori di casa.</p>
                    <p className="lead">
                        <a className="btn btn-jumbo btn-lg" href="/products" role="button"><strong>Scopri i nostri prodotti</strong></a>
                    </p>
                </div>
            </div>
            <section className="container1">
                <div className="container-descr text-center">
                    <p>OrtoPuglia è un'idea nata in famiglia per valorizzare i prodotti ortofrutticoli tipici della Puglia. Un piccolo angolo digitale dove tradizione, genuinità e amore per la terra si incontrano. Qui puoi scoprire, confrontare e conoscere meglio frutta e verdura locali, coltivate con passione e legate alla cultura contadina del nostro territorio.
                    <br />
                    <br />
                    OrtoPuglia è un omaggio alle stagioni, ai sapori autentici e alle radici che ci legano alla nostra terra. <br /> Un progetto semplice, fatto con il cuore, per portare sulla tua tavola un pezzetto di Puglia.</p>
                </div>
                <div className="icons">
                    <div className="container-icons">
                        <img src="/img/genuino.svg" className="icon-home" alt="genuino" />
                        <span>Genuino come le nostre terre</span>
                    </div>
                    <div className="container-icons">
                        <img src="/img/familiare.svg" className="icon-home" alt="familiare" />
                        <span>Dalla tradizione della nostra famiglia</span>
                    </div>
                    <div className="container-icons">
                        <img src="/img/rispettoso.svg" className="icon-home" alt="sostenibile" />
                        <span>Sostenitore del nostro pianeta</span>
                    </div>
                </div>
            </section>
            <section className="container2">
                <h2><strong>I prodotti della stagione</strong></h2>
                <h3>Lasciati tentare dalla freschezza estiva di Puglia</h3>
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="4000">
                            <Link to="/products/2">
                                <img src="https://www.cuki.it/wp-content/uploads/come-conservare-zucchine.jpg" className="d-block w-100" alt="Zucchina Barese"/>
                            </Link>
                            <div className="carousel-caption d-none d-md-block">
                                <h4>Zucchina Barese</h4>
                                <p>Zucchina dolce e tenera, tipica del barese.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <Link to="/products/3">
                                <img src="https://www.carrefour.it/on/demandware.static/-/Sites-carrefour-master-catalog-IT/default/dwa2cf319a/large/CETRIOLIBARATTIERISF-2117743000000-1.jpg" className="d-block w-100" alt="Barattiere di Santeramo"/>
                            </Link>
                            <div className="carousel-caption d-none d-md-block">
                                <h4>Barattiere di Santeramo</h4>
                                <p>Frutto simile al cetriolo, ma più dolce e croccante.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <Link to="/products/9">
                                <img src="https://www.ortofruttacagranda.com/wp-content/uploads/2020/11/cipolla-di-acquaviva.jpg" className="d-block w-100" alt="Cipolla rossa di Acquaviva"/>
                            </Link>
                            <div className="carousel-caption d-none d-md-block">
                                <h4>Cipolla rossa di Acquaviva</h4>
                                <p>Dolce, croccante, ottima sia cruda che cotta.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            <section className='container2-5'>
                <div>
                    <a className="btn btn-jumbo btn-lg" href="/products" role="button"><strong>Scopri tutti i nostri prodotti</strong></a>
                </div>
            </section>
            </section>
            <section className='container3'>
                <img src="/img/family.jpg" className='img-family' alt="" srcset="" />
                <div className='descr-family'>
                    <h2><strong>Questa siamo noi.</strong></h2>
                    <p>Una famiglia unita dall'amore per la terra e i suoi frutti. Ogni raccolto è il risultato di giornate di lavoro, mani sporche di terra e passione che si tramanda da generazioni. <br /> <br />
                    Con OrtoPuglia vogliamo raccontare tutto questo: non solo offrendo prodotti ortofrutticoli tipici della nostra regione, ma anche aiutandoti a conoscerli davvero.
                    Grazie al nostro comparatore, puoi confrontare sapori, varietà, origini e scoprire le eccellenze pugliesi come non le hai mai viste. <br /> <br />
                    Perché scegliere con consapevolezza è il primo passo per gustare la qualità.</p>
                </div>
            </section>
        </>
    );
}