import '../styles/header.css';
import { auth } from '../firebase/FirebaseConnection';
import { signOut } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../firebase/FirebaseConnection';


export default function Header() {

    const [usuario, setUsuario] = useState(null);
    const [ehAdm, setEhAdm] = useState(false);

    const {idUsuario} = useParams();

    async function deslogar(){
        try{
            await signOut(auth);
            window.location.href = '/';
        } catch(error) {
            console.error('Erro ao deslogar!');
        }
    }
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        const buscarUsuario = async () =>{
            try {
                const usuarioRef = doc(collection(db, 'usuarios'), idUsuario);
                const usuarioDoc = await getDoc(usuarioRef);
    
                if (usuarioDoc.exists()){
                    const usuarioData = usuarioDoc.data();
                    setUsuario(usuarioData);
    
                    if (usuarioData.nome == 'Admin'){
                        setEhAdm(true);
                        console.log('Esse usuário é um administrador!')
                    } else {
                        console.log('Esse usuário não é um administrador!');
                    }
                } else {
                    console.log('Oxe, usuário não existe :(');
                }
            } catch (error) {
                console.log('Vish algo deu errado!', error);
            }
        };

        buscarUsuario();

    }, [idUsuario]);
    return (
        <>
            <header className='header-app'>
                <nav className="navbar navbar-expand-lg bg navbar-light">
                    <div className="container-fluid">
                        <a id='navbrand' className="navbar-brand" href={`/home/${idUsuario}`}>light BOOKSTORE</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a id='active-nav-item' className="nav-link active" aria-current="page" href={`/home/${idUsuario}`}>Página inicial</a>
                                </li>
                                {ehAdm == true &&
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href='/cadastro-livro'>Cadastrar livro</a>
                                        </li>
                                    </>
                                }
                                {ehAdm == false &&
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`/meus-reservados/${idUsuario}`}>Meus reservados</a>
                                        </li>
                                    </>
                                }
                                <li className="nav-item">
                                    <a role='button' href='#' onClick={deslogar} className="nav-link" >Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}