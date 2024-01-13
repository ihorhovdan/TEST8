import { Navbar, Nav, Container } from "react-bootstrap";
import SearchCity from "./SearchCity";
import logo from "../img/logo.png"
import './Style.css'


const MyNavbar = () => {
    return (
        <>
            <Navbar className="bg-body-light">
                <Container className="d-flex justify-content-between">
                    <Navbar.Brand href="#home" className="d-flex justify-content-between">
                        <img style={{width: '50px', height: '50px'}}
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Meteo logo"
                        />
                        <h1 className="titolo">SORRIDI AL METEO</h1>
                    </Navbar.Brand>
                    <SearchCity />
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar;