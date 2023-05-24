import { useEffect } from "react";
import Header from '../components/Header';
import '../styles/cadastroLivros.css';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/FirebaseConnection";




export default function CadastroLivros() {

    useEffect(() => {
        document.title = 'Light Bookstore | Cadastre um livro!';
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.target;
        const nome = form["livro-nome"].value;
        const autor = form["livro-autor"].value;
        const genero = form["livro-genero"].value;
        const descricao = form["livro-descricao"].value;
    
        const db = getFirestore(firebaseApp);
        const livroCollection = collection(db, "livros");
    
        await addDoc(livroCollection, {
          nome: nome,
          autor: autor,
          genero: genero,
          descricao: descricao,
        });
    
        // Limpar os campos do formulário após o cadastro
        form.reset();
      };

    return (
        <>
            <Header />
            <div className='cadastroLivro'>
                <div className='container cadastraLivro-container'>
                    <div className='form-livro'>
                        <h2>Cadastre um livro!</h2>
                        <div className='col-md-14'>
                        <form method='post' onSubmit={handleSubmit}>
    <div className='form-group'>
        <label htmlFor='livro-nome'>Nome do livro</label>
        <input className='form-control' type='text' name='livro-nome' id='livro-nome' />

        <label htmlFor='livro-autor'>Autor</label>
        <input className='form-control' type='text' name='livro-autor' id='livro-autor' />

        <label htmlFor='livro-genero'>Gênero</label>
        <input className='form-control' type='text' name='livro-genero' id='livro-genero' />

        <label htmlFor='livro-descricao'>Descrição</label>
        <input className='form-control' type='textarea' name='livro-descricao' id='livro-descricao' />
        <br />
        <button type='submit' className='btn-cadastra '>Cadastrar livro S2</button>
    </div>

    
</form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}