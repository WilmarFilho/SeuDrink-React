import logo from './assets/logoimg.webp'

export default function Header() {
    return (
        <header className="d-flex">
            
            <div className="col-4 content-Logo">
                <a href='https://seudrink.framer.website'><img alt='logo do site com a escrita SeuDrink e uma imagem ilustrativa de um drink' src={logo} /></a>
            </div>

            <div className="col-8 content-NavHeader">
                
            </div>

        </header>
    )
};