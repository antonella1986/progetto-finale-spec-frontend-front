export default function HomePage() {
    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container container-jumbo">
                    <h1 className="display-3"><strong>OrtoPuglia</strong></h1>
                    <p className="lead">I sapori di casa.</p>
                    <p className="lead">
                        <a className="btn btn-jumbo btn-lg" href="Jumbo action link" role="button"><strong>Scopri i nostri prodotti</strong></a>
                    </p>
                </div>
            </div>
            <section>
                <p>OrtoPuglia nasce da un'idea durante una cena di famiglia, per portare sulla tua tavola il meglio della frutta e verdura tipica pugliese. <br />Prodotti genuini, tradizioni locali, sapori autentici.</p>
            </section>
            <section className="container2">
                <h2>I prodotti della stagione</h2>
                <div id="carouselExampleDark" class="carousel carousel-dark slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="5000">
                            <img src="https://www.cuki.it/wp-content/uploads/come-conservare-zucchine.jpg" class="d-block w-100" alt="Zucchina Barese"/>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>Zucchina Barese</h4>
                                <p>Zucchina dolce e tenera, tipica del barese.</p>
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="https://www.carrefour.it/on/demandware.static/-/Sites-carrefour-master-catalog-IT/default/dwa2cf319a/large/CETRIOLIBARATTIERISF-2117743000000-1.jpg" class="d-block w-100" alt="Barattiere di Santeramo"/>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>Barattiere di Santeramo</h4>
                                <p>Frutto simile al cetriolo, ma più dolce e croccante.</p>
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="https://www.ortofruttacagranda.com/wp-content/uploads/2020/11/cipolla-di-acquaviva.jpg" class="d-block w-100" alt="Cipolla rossa di Acquaviva"/>
                            <div class="carousel-caption d-none d-md-block">
                                <h4>Cipolla rossa di Acquaviva</h4>
                                <p>Dolce, croccante, ottima sia cruda che cotta.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            <section>
                <p>Contenuto3</p>
            </section>
        </>
    );
}