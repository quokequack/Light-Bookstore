import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../screens/Welcome";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import Detalhe from "../screens/Detalhe";
import Login from "../screens/Login";
import MeusReservados from "../screens/MeusReservados";


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
                </Routes>
            </BrowserRouter>
        </div>
    )
}