import { useEffect } from "react";
import Header from '../components/Header';
import '../styles/cadastroLivros.css';


export default function CadastroLivros() {

    useEffect(() => {
        document.title = 'Light Bookstore | Cadastre um livro!';
    }, []);

    return (
        <>
            <Header />
            <div className='cadastroLivro'>
                <div className='container cadastraLivro-container'>
                    <div className='form-livro'>
                        <h2>Cadastre um livro!</h2>
                        <div className='col-md-14'>
                            <form method='post'>
                                <div className='form-group'>
                                    <label htmlFor='livro-nome'> Nome do livro </label>
                                    <input className='form-control' type='text' name='livro-nome' id='livro-nome' />
                                    <label htmlFor='livro-autor'> Autor </label>
                                    <input className='form-control' type='text' name='livro-autor' id='livro-autor' />
                                    <label htmlFor='livro-genero'> Gênero </label>
                                    <input className='form-control' type='text' name='livro-genero' id='livro-genero' />
                                    <label htmlFor='livro-descricao'> Descrição </label>
                                    <input className='form-control' type='textarea' name='livro-nome' id='livro-descricao' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}