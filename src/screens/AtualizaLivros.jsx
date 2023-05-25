import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase/FirebaseConnection";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AtualizaLivros() {
    const { id } = useParams();
    const [livro, setLivro] = useState(null);

    useEffect(() => {
        document.title = "Light Bookstore | Atualize um livro!";
        carregarLivro();
    }, []);

    const { idUsuario } = useParams();
    const carregarLivro = async () => {
        const db = getFirestore(firebaseApp);
        const livroRef = doc(db, "livros", id);

        try {
            const livroSnapshot = await getDoc(livroRef);
            if (livroSnapshot.exists()) {
                const livroData = livroSnapshot.data();
                setLivro(livroData);
            } else {
                console.log("Livro não encontrado");
            }
        } catch (error) {
            console.log("Erro ao carregar o livro:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const nome = form["livro-nome"].value;
        const autor = form["livro-autor"].value;
        const genero = form["livro-genero"].value;
        const descricao = form["livro-descricao"].value;
        const capaLivro = form["livro-capa"].files[0];

        const storage = getStorage(firebaseApp);

        const storageRef = ref(storage, `livros/${capaLivro.name}`);

        await uploadBytes(storageRef, capaLivro);
        const capaUrl = await getDownloadURL(storageRef);

        const db = getFirestore(firebaseApp);
        const livroRef = doc(db, "livros", id);

        try {
            await updateDoc(livroRef, {
                nome: nome,
                autor: autor,
                genero: genero,
                descricao: descricao,
                capaUrl: capaUrl,
            });
            alert("Livro atualizado com sucesso!");
            window.location.href = `/home/${idUsuario}`;

        } catch (error) {
            console.log("Erro ao atualizar o livro:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="cadastroLivro">
                <div className="container cadastraLivro-container">
                    <div className="form-livro">
                        <h2>Atualize um livro!</h2>
                        {livro && (
                            <div className="col-md-6">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="form-group">

                                        <label htmlFor="livro-capa">Capa do livro</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="livro-capa"
                                            id="livro-capa"
                                        />

                                        <label htmlFor="livro-nome">Nome do livro</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="livro-nome"
                                            id="livro-nome"
                                            defaultValue={livro.nome}
                                        />

                                        <label htmlFor="livro-autor">Autor</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="livro-autor"
                                            id="livro-autor"
                                            defaultValue={livro.autor}
                                        />

                                        <label htmlFor="livro-genero">Gênero</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="livro-genero"
                                            id="livro-genero"
                                            defaultValue={livro.genero}
                                        />

                                        <label htmlFor="livro-descricao">Descrição</label>
                                        <textarea
                                            className="form-control"
                                            name="livro-descricao"
                                            id="livro-descricao"
                                            defaultValue={livro.descricao}
                                        />
                                        <br />
                                        <button type="submit" id='btn-cadastra' className="btn btn-cadastra">
                                            Atualizar livro
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
