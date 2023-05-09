import '../styles/cadastro.css';
import { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../App';

export default function Cadastro() {
    useEffect(() => {
        document.title = 'Light | Cadastro'
    }, []);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const db = getFirestore(firebaseApp);
    const usuariosCollection = collection(db, 'usuarios');

    async function cadastrar() {
        const usuario = await addDoc(usuariosCollection,  {
            nome, 
            email,
            senha
        });
    }

    useEffect(() => {
        const getUsuarios = async () => {
            const data = await getDocs(usuariosCollection);
            setUsuarios(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };
        getUsuarios();
    }, []);

    return (
        <div className='cadastro'>
            <div className='container cadastro-container'>
                <div className='cadastro-header'>
                    <div className='img'>
                        <img src='../img/luz.png' alt='luz'/>
                    </div>
                    <div className='header-title'>
                        <h1>Light Bookstore</h1>
                    </div>
                </div>
                <div className='cadastro-body'>
                    <div className='pics'>
                        <div className='container pic-color'></div>
                        <div className='container pic'>
                            <img src='../img/rory.jpg' alt='Rory de Gilmore Girls'/>
                        </div>
                    </div>
                    <div className='form'>
                        <h2>Bem-vindo, novo leitor! Cadastre-se e reserve seus livros!</h2>
                        <form method='post'>
                            <div className='col-lg-4'>
                                <div className='form-group'>
                                    <label>Nome</label>
                                    <input className='form-control' type='text' name='nome'/>
                                    <label>Email</label>
                                    <input className='form-control' type='email' name='email'/>
                                    <label>Senha</label>
                                    <input className='form-control' type='password' name='senha'/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}