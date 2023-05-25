import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase/FirebaseConnection";
import { query, where, getDocs } from "firebase/firestore";
import { collection, getDoc, doc, getFirestore, addDoc, deleteDoc} from "firebase/firestore";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import '../styles/detalhe.css';

export default function Detalhe() {
    useEffect(() => {
        document.title = 'Light | Detalhes do livro!'
    }, []);

    const {id, idUsuario} = useParams();
    const [livro, setLivro] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [devolucoes, setDevolucoes] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [ehAdm, setEhAdm] = useState(false);

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

    if (!livro) {
        return <div>Carregando...</div>;
    }

    const reservarLivro = async () => {

        try {
            const reserva = {
                idLivro: id,
                idUsuario: idUsuario,
            };
            
            const reservasCollection = collection(db, 'reservas');
            await addDoc(reservasCollection, reserva);
            setReservas([...reservas, reserva]);
            alert("Livro reservado com sucesso!");
        } catch (error) {
            console.log('Algo deu errado!' + error);
        };
    };
    const devolverLivro = async () => {
        try {
          const devolucao = {
            idLivro: id,
            idUsuario: idUsuario,
          };
    
          const devolucoesCollection = collection(db, "devolucoes");
          await addDoc(devolucoesCollection, devolucao);
          alert("Livro devolvido com sucesso!");

          try {
            const reservaRef = query(collection(db, "reservas"), where("idLivro", "==", id), where("idUsuario", "==", idUsuario));
            const reservaSnapshot = await getDocs(reservaRef);
        
            if (reservaSnapshot.empty) {
              console.log("Reserva não encontrada!");
              return;
            }
        
            const reservaDoc = reservaSnapshot.docs[0];
            await deleteDoc(reservaDoc.ref);
            
          } catch (error) {
            console.log("Erro ao excluir o livro da colecao reservas!", error);
          }
        }catch (error) {
            console.log("Erro ao devolver o livro!", error);
          }
      };


    const excluirLivro = async () => {
        try {
            const livroRef = doc(collection(db, 'livros'), id);

            await deleteDoc(livroRef);
            alert('Livro excluído com sucesso!');
            window.location.href = `/home/${idUsuario}`;
        } catch (error) {
            console.log('Algo deu errado ao excluir o livro!', error);
        }
    }

    return (
        <>
            <Header />
            <div className="detalhe">
                <div className='container detalhe-container'>
                    <div className='detalhe-body'>
                        <div className='detalhe-top-header'>
                            <h2 className='book-title'>{livro.nome}</h2>
                            {ehAdm === true &&
                               <>
                                    <div className='top-buttons'>
                                        <button className='btn excluirLivro' onClick={excluirLivro}>Excluir</button>
                                        <button className='btn atualizaLivro'><Link className='link' to={`/atualiza-livro/${id}/${idUsuario}`}>Atualizar</Link></button>
                                    </div>
                                </>
                            }
                        </div>
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
                                <button onClick={reservarLivro} className='btn actions-btn'><Link className='act-btn' to=''>Reservar!</Link></button>
                                <button onClick={devolverLivro} id='devolver-btn' className='btn actions-btn'><Link className='act-btn' to=''>Devolver!</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
