import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className='App'>
            <div className="content">
                <header>
                    <nav className="nav">
                        <img style={{width: '90px', borderRadius: '50%', margin: '10px'}}
                             src='https://img.freepik.com/vecteurs-premium/logo-popcorn_9845-76.jpg'
                             alt='logo'/>
                        <Link className='link' to="/movies">Catalogue des films</Link>
                    </nav>
                </header>
                <main className='main-content'>
                    <div className='intro'>
                        <h1>Accueil</h1>
                        <p>Bienvenue sur ce super site de cinéma. Ici vous serez capable de consulter un catalogue de
                            films. Vous serez également en mesure de rechercher un film en particulier, le modifier et
                            le supprimer</p>
                    </div>
                </main>
            </div>
            <div className="footer">

                <footer>
                    <a href="https://github.com/MonnPoup">Lucas Monnet-Poupon</a>
                </footer>
            </div>
        </div>
    )
}
