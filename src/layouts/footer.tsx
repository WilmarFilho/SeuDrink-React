import logo from './assets/logoimg.webp';
import FooterIcon from './assets/FooterIcon.svg'

export default function Footer() {
    return (
        <footer>
            <section className="col-12 row topFooter">
                <div className="col-12 col-md-4 col-lg-4 d-flex">
                    <h4>Menu</h4>
                    <ul className='NavFooter'>
                        <li><a>Home</a></li>
                        <li><a>Pesquisar</a></li>
                        <li><a>Seja Colaborador</a></li>
                    </ul>
                </div>
                <div className="col-12 col-md-4 col-lg-4 d-flex content-sobre">
                    <h4>Sobre</h4>
                    <p>Web Service criado para ajudar amantes de drinks</p>
                </div>
                <div className="col-9 col-md-4 col-lg-4 d-flex content-Logo">
                    <img src={logo} />
                </div>
            </section>
            <section className="col-12 d-flex copy">

                <p>Copyright (c) 2025 Wilmar Filho - Todos os direitos reservados </p>

            </section>
        </footer>
    )
};