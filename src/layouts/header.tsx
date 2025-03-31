import logo from './assets/logoimg.webp'

export default function Header() {
    return (
        <header className="d-flex">
            
            <div className="col-4 content-Logo">
                <img src={logo} />
            </div>

            <div className="col-8 content-NavHeader">
                
            </div>

        </header>
    )
};