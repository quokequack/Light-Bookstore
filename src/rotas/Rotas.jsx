import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../screens/Welcome";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import Detalhe from "../screens/Detalhe";
import Login from "../screens/Login";
import MeusReservados from "../screens/MeusReservados";
import CadastroLivros from "../screens/CadastroLivros";
import AtualizaLivros from "../screens/AtualizaLivros";


export default function Rotas() {
    return (
        <div className="rotas">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/home/:idUsuario' element={<Home />} />
                    <Route path='/detalhes/:id/:idUsuario' element={<Detalhe />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/meus-reservados/:idUsuario'  element={<MeusReservados />}/>
                    <Route path='/cadastro-livro' element={<CadastroLivros />}/>
                    <Route path='/atualiza-livro/:id' element={<AtualizaLivros />}/>
                </Routes>
            </BrowserRouter>
        </div>c
    )
}