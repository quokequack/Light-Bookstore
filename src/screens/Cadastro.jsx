import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { auth, firebaseApp } from '../firebase/FirebaseConnection';
import { Link } from 'react-router-dom';

import '../styles/cadastro.css';

export default function Cadastro() {
    useEffect(() => {
        document.title = 'Light | Cadastro';
    }, []);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorText, setErrorText] = useState("");
    const [showValue, setShowValue] = useState(false);

    const db = getFirestore(firebaseApp);

    async function cadastrar(event) {
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const usuario = userCredential.user;

            await setDoc(doc(collection(db, 'usuarios'), usuario.uid), {
                nome: nome,
                email: email,
                senha: senha
            });

            window.location.href = `/home/${usuario.uid}`;
            
        }catch(error){
            if(error.code === 'auth/weak-password'){
                setShowValue(true);
                setErrorText('Sua senha deve ser mais forte!')
                return;
            }else if(error.code === 'auth/invalid-email'){
                setShowValue(true);
                setErrorText('Email inválido!');
                return;
            }else{
                setShowValue(true);
                setErrorText('Algo deu errado, tente novamente!');
                return;
            }
        };
    }

    return (
        <div className='cadastro'>
            <div className='container cadastro-container'>
                <div className='cadastro-header'>
                    <div className='img'>
                        <img className='light' src='../img/luz.png' alt='luz' />
                    </div>
                    <div className='header-title'>
                        <h1>light BOOKSTORE</h1>
                    </div>
                </div>
                <div className='cadastro-body'>
                    <div className='pics'>
                        <div className='container pic-color'></div>
                        <div className='container pic'>
                            <img className='light-pic' src='../img/rory.jpg' alt='Rory de Gilmore Girls' />
                            <p>A Rory já teria criado a conta dela...</p>
                        </div>
                    </div>
                    <div className='form'>
                        <h2>Bem-vindo, novo leitor! Cadastre-se e reserve seus livros!</h2>
                        <form id='form' method='post' onSubmit={cadastrar}>
                            <div className='col-lg-8'>
                                <div className='form-group'>
                                    {showValue ? <p className='msg-error'>{errorText}</p> : null}
                                    <label htmlFor='nome'>Nome</label>
                                    <input name='nome' id='nome' className='form-control' onChange={(e) => setNome(e.target.value)} type='text' value={nome} />
                                    <label htmlFor='email'>Email</label>
                                    <input name='email' id='email' className='form-control' onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
                                    <label htmlFor='senha'>Senha</label>
                                    <input name='senha' id='senha' className='form-control' onChange={(e) => setSenha(e.target.value)} type='password' value={senha} />
                                    <div className='container cadastro-buttons'>
                                        <button type='submit' className='btn btn-submit'>Crie minha conta!</button>
                                        <p> Já tem uma conta? </p>
                                        <button id='btn-login' className='btn btn-login'><Link className='link-btn' to='/login'>Quero entrar!</Link></button>
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