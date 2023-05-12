import React from "react";
import '../styles/welcome.css';
import { useEffect } from "react";
import { Link } from 'react-router-dom';


export default function Welcome() {

    useEffect(() => {
        document.title = 'Light | Bem-vindo!'
    }, []);

    return(
        <div className='welcome'>
            <div className='container welcome-container'>
                <div className='welcome-header'>
                    <div className='container img'>
                        <img className='light' src='..//img/luz.png' alt='light'/> 
                    </div>
                    <div className='title'>
                        <h2>Light Bookstore</h2>
                    </div>
                    <div className='subtitle'>
                        <h5>Reserve seus livros na biblioteca mais incrível da cidade!</h5>
                    </div>
                </div>
                <div className='welcome-body'>
                    <div className='options'>
                        <button className='btn cadastro-btn'><Link className='link-btn' to='/cadastro'>Cadastre-se!</Link></button>
                        <button className='btn login-btn'><Link className='link-btn' to='/login'>Entre!</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}