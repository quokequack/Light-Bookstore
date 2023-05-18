import { useEffect } from "react";
import Header from "../components/Header";


export default function AtualizaLivros() {

    useEffect(() => {
        document.title = 'Light Bookstore | Atualizar livro';
    }, []);

    return (
        <>
        <Header/>
        </>
    )
}