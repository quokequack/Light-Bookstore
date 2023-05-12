import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase/FirebaseConnection";
import { collection, getDoc, doc, getFirestore } from "firebase/firestore";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import '../styles/detalhe.css';

export default function Detalhe() {
    useEffect(() => {
        document.title = 'Light | Detalhes do livro!'
    }, []);

    const { id } = useParams();
    const [livro, setLivro] = useState(null);

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        const buscarDetalhesLivro = async () => {
            try {
                const livroRef = doc(collection(db, "livros"), id);
                const livroDoc = await getDoc(livroRef);

                if (livroDoc.exists()) {
                    const livroData = livroDoc.data();
                    setLivro(livroData);
                } else {
                    console.log("Livro não encontrado!");
                }
            } catch (error) {
                console.log("Erro ao buscar o livro!", error);
            }
        };

        buscarDetalhesLivro();
    }, [id]);

    if (!livro) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Header />
            <div className="detalhe">
                <div className='container detalhe-container'>
                    <div className='detalhe-body'>
                        <h2 className='book-title'>{livro.nome}</h2>
                        <div className='livro'>
                            <div className='desc'>
                                <h2 className='label'>Descrição: </h2>
                                <p className="detalhe-descricao">{livro.descricao}</p>
                            </div>
                            <div className='livro-footer'>
                                <div className='autor'>
                                    <h2 className='label'>Autor</h2>
                                    <p>{livro.autor}</p>
                                </div>
                                <div>
                                    <h2 className='label'>Gênero</h2>
                                    <p>{livro.genero}</p>
                                </div>
                            </div>
                            <div className='detalhes-buttons'>
                                <button className='btn actions-btn'><Link className='act-btn' to=''>Reservar!</Link></button>
                                <button id='devolver-btn' className='btn actions-btn'><Link className='act-btn' to=''>Devolver!</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
