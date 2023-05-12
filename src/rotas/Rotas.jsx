import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../screens/Welcome";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import Detalhe from "../screens/Detalhe";


export default function Rotas() {
    return (
        <div className="rotas">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/detalhes/:id' element={<Detalhe />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}