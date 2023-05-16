import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { firebaseApp } from '../firebase/FirebaseConnection';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "../components/Header";
import '../styles/home.css';

export default function Home() {

    useEffect(() => {
        document.title = 'Light | Página inicial';
    }, []);

    const [livros, setLivros] = useState([]);

    const db = getFirestore(firebaseApp);
    const livrosCollection = collection(db, 'livros');
    const { idUsuario } = useParams();

    useEffect(() => {
        const getLivros = async () => {
            const data = await getDocs(livrosCollection);
            setLivros(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getLivros();
    });

    return (
        <>
            <Header />
            <div className='homepage'>
                <div className='container homepage-container'>
                    <div className='home-body'>
                        <p className='saying'> "A leitura engradece a alma" - Voltaire</p>
                        <h3 className='topic'> Toooooodos os nossos livros! </h3>
                        <div className='books'>
                            {livros.map(livro => {
                                return (
                                    <div id='card' className="card">
                                        {/*<img src="../img/colecionador.jpg" className="card-img-top" alt="..." />*/}
                                        <div className="card-body">
                                            <h5 className="card-title">{livro.nome}</h5>
                                            <button id='btn-book' className="btn btn-book"><Link className='link-btn-book' to={`/detalhes/${livro.id}/${idUsuario}`}>Ver livro!</Link></button>
                                       </div>
                                   </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}