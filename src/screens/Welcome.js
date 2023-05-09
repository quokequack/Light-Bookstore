import React from "react";
import '../styles/welcome.css';
import { useEffect } from "react";


export default function Welcome() {

    useEffect(() => {
        document.title = 'Bookstore | Bem-vindo!'
    }, []);

    return(
        <div className='welcome'>
            <div className='container welcome-container'>
                <div className='welcome-header'>
                    <div className='container img'>
                        <img className='light' src='..//img/luz.png' alt='light'/> 
                    </div>
                    <div className='title'>
                        <h2>LIGHT Bookstore</h2>
                    </div>
                    <div className='subtitle'>
                        <h5>Reserve seus livros na biblioteca mais incrível da cidade!</h5>
                    </div>
                </div>
                <div className='welcome-body'>
                    <div className='options'>
                        <button className='btn cadastro-btn'> Cadastre-se </button>
                        <button className='btn login-btn'>Faça login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}