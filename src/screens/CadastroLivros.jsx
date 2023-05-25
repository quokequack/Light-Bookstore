import { useEffect } from "react";
import Header from '../components/Header';
import '../styles/cadastroLivros.css';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/FirebaseConnection";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




export default function CadastroLivros() {

    useEffect(() => {
        document.title = 'Light Bookstore | Cadastre um livro!';
    }, []);

    const { idUsuario } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const nome = form["livro-nome"].value;
        const autor = form["livro-autor"].value;
        const genero = form["livro-genero"].value;
        const descricao = form["livro-descricao"].value;
        const capaLivro = form["livro-capa"].files[0];

        const storage = getStorage(firebaseApp);

        const storageRef = ref(storage, `livros/${capaLivro.name}`);


        await uploadBytes(storageRef, capaLivro);
        const capaUrl = await getDownloadURL(storageRef);


        const db = getFirestore(firebaseApp);
        const livroCollection = collection(db, "livros");

        await addDoc(livroCollection, {
            nome: nome,
            autor: autor,
            genero: genero,
            descricao: descricao,
            capaUrl: capaUrl,
        });

        form.reset();
        alert('Livro cadastrado com sucesso!');
        window.location.href = `/home/${idUsuario}`;
    };

    return (
        <>
            <Header />
            <div className='cadastroLivro'>
                <div className='container cadastraLivro-container'>
                    <div className='form-livro'>
                        <h2>Cadastre um livro!</h2>
                        <div className='col-md-6'>
                            <form method='post' onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor="livro-capa">Capa do livro</label>
                                    <input className="form-control" type="file" name="livro-capa" id="livro-capa"/>
                                    <label htmlFor='livro-nome'>Nome do livro</label>
                                    <input className='form-control' type='text' name='livro-nome' id='livro-nome' />

                                    <label htmlFor='livro-autor'>Autor</label>
                                    <input className='form-control' type='text' name='livro-autor' id='livro-autor' />

                                    <label htmlFor='livro-genero'>Gênero</label>
                                    <input className='form-control' type='text' name='livro-genero' id='livro-genero' />

                                    <label htmlFor='livro-descricao'>Descrição</label>
                                    <textarea className='form-control' name='livro-descricao' id='livro-descricao' />
                                    <br />
                                    <button type='submit' id='btn-cadastra' className='btn btn-cadastra '>Cadastrar livro!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}