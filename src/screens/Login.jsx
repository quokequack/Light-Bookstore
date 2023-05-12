import { auth } from "../firebase/FirebaseConnection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../styles/login.css';


export default function Login() {
    useEffect(() => {
        document.title = 'Light | Login!'
    }, []);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorText, setErrorText] = useState("");
    const [showValue, setShowValue] = useState(false);

    async function fazerLogin(event) {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const usuario = userCredential.user;
            window.location.href = '/home';
            console.log("Usuário logado:", usuario);
        } catch{
            setShowValue(true);
            setErrorText('Algo deu errado, tente novamente!');
            return;
        }
    }


    return (
        <div className='login'>
            <div className='container login-container'>
                <div className='login-header'>
                    <div className='img-luz-login'>
                        <img className='light' src='../img/luz.png' alt='luz' />
                    </div>
                    <div className='header-title'>
                        <h1>light BOOKSTORE</h1>
                    </div>
                </div>
                <div className='login-body'>
                    <div className='pics-login'>
                        <div className='container pic-color'></div>
                        <div className='container pic'>
                            <img className='light-pic' src='../img/heath.jpg' alt='Heath Ledger' />
                            <p>Seus livros estão com saudade...</p>
                        </div>
                    </div>
                    <div className='form'>
                        <h2>Bem-vindo de volta, leitor!</h2>
                        <form method='post' onSubmit={fazerLogin}>
                            <div className='col-lg-10'>
                                <div className='form-group'>
                                    {showValue ? <p>{errorText}</p> : null}
                                    <label>Email</label>
                                    <input className='form-control' onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
                                    <label>Senha</label>
                                    <input className='form-control' onChange={(e) => setSenha(e.target.value)} type='password' value={senha} />
                                    <div className='container login-buttons'>
                                        <button type='submit' className='btn btn-submit'>Entrar! sZ </button>
                                        <label> Ainda não tem uma conta?! </label>
                                        <button className='btn btn-cadastro'><Link className='link-btn' to='/cadastro'>Criar contaaaaaa!</Link></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}