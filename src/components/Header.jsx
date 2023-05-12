import '../styles/header.css';
import { auth } from '../firebase/FirebaseConnection';
import { signOut } from 'firebase/auth';


export default function Header() {

    async function deslogar(){
        try{
            await signOut(auth);
            window.location.href = '/';
        } catch(error) {
            console.error('Erro ao deslogar!');
        }
    }
    return (
        <>
            <header className='header-app'>
                <nav className="navbar navbar-expand-lg bg navbar-light">
                    <div className="container-fluid">
                        <a id='navbrand' className="navbar-brand" href="/home">light BOOKSTORE</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a id='active-nav-item' className="nav-link active" aria-current="page" href="/home">Página inicial</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/meus-reservados">Meus reservados</a>
                                </li>
                                <li className="nav-item">
                                    <a role='button' onClick={deslogar} className="nav-link" >Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}