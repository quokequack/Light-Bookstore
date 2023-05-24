import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CadastroLivros from '../screens/CadastroLivros';

describe('CadastroLivros', () => {
  test('renderiza corretamente e executa o cadastro', async () => {
    render(
      <MemoryRouter>
        <CadastroLivros />
      </MemoryRouter>
    );

    // Preenche os campos do formulário de cadastro
    const nomeInput = screen.getByLabelText(/Nome do livro/i);
    const autorInput = screen.getByLabelText(/Autor/i);
    const generoInput = screen.getByLabelText(/Gênero/i);
    const descricaoInput = screen.getByLabelText(/Descrição/i);
    const submitButton = screen.getByRole('button', { name: /Cadastrar livro S2/i });

    fireEvent.change(nomeInput, { target: { value: 'Nome do livro de teste' } });
    fireEvent.change(autorInput, { target: { value: 'Autor de teste' } });
    fireEvent.change(generoInput, { target: { value: 'Gênero de teste' } });
    fireEvent.change(descricaoInput, { target: { value: 'Descrição de teste' } });

    // Verifica se os campos estão preenchidos corretamente
    expect(nomeInput.value).toBe('Nome do livro de teste');
    expect(autorInput.value).toBe('Autor de teste');
    expect(generoInput.value).toBe('Gênero de teste');
    expect(descricaoInput.value).toBe('Descrição de teste');

    // Simula o envio do formulário
    fireEvent.click(submitButton);

    // Adicione asserções adicionais conforme necessário para verificar o comportamento após o envio do formulário
    // Por exemplo, você pode verificar se uma mensagem de sucesso é exibida ou se a página é redirecionada para outra rota
  });
});
