import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase/FirebaseConnection";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import '../styles/meusReservados.css';


export default function MeusReservados() {
    useEffect(() => {
        document.title = 'Light Bookstore | Meus reservados';
    }, []);

    const { idUsuario } = useParams();
    const [livrosReservados, setLivrosReservados] = useState([]);

    useEffect(() => {
        const fetchLivrosReservados = async () => {
            const db = getFirestore(firebaseApp);
            const reservasCollection = collection(db, 'reservas');
            const reservasQuery = query(reservasCollection, where('idUsuario', '==', idUsuario));
            const reservasSnapshot = await getDocs(reservasQuery);

            const livrosReservadosIds = reservasSnapshot.docs.map((doc) => doc.data().idLivro);
            const livrosReservadosPromises = livrosReservadosIds.map((livroId) => {
                const livroRef = doc(collection(db, 'livros'), livroId);
                return getDoc(livroRef);
            });
            const livrosReservadosSnapshot = await Promise.all(livrosReservadosPromises);
            const livrosReservados = livrosReservadosSnapshot.map((livroDoc) => ({
                id: livroDoc.id,
                ...livroDoc.data(),
            }));
            setLivrosReservados(livrosReservados);
        };

        fetchLivrosReservados();
    }, [idUsuario]);

    return (
        <>
            <Header />
            <div className='meus-reservados'>
                <div className='container reservados-container'>
                    <div className='reservados-body'>
                        <p className='saying'> "A leitura de um bom livro é um diálogo incessante: o livro fala e a alma responde." - André Maurois</p>
                        <h3 className='reservados-topic'> Esses são os livros que você reservou!</h3>
                        <div className='books'>
                            {livrosReservados.map(livro => {
                                return (
                                    <div id='card' className="card">
                                        <img src={livro.capaUrl} className="card-img-top" alt="Capa do livro!" />
                                        <div className="card-body">
                                            <h5 className="card-title">{livro.nome}</h5>
                                            <button id='btn-book-reserved' className="btn btn-book-reserved"><Link className='link-btn-book' to={`/detalhes/${livro.id}/${idUsuario}`}>Ver livro!</Link></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}