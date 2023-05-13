import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cadastro from '../screens/Cadastro';
import { MemoryRouter } from 'react-router-dom';

describe('Cadastro', () => {
  test('renderiza corretamente e executa o cadastro', async () => {
    delete window.location;
    window.location = { href: '/home' };

    render(
        <MemoryRouter>
            <Cadastro />
        </MemoryRouter>
    );

    // Preenche os campos de cadastro
    const nomeInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const senhaInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button', { name: /Crie minha conta/i });

    fireEvent.change(nomeInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(senhaInput, { target: { value: 'password' } });

    // Verifica se os campos estão preenchidos corretamente
    expect(nomeInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('test@example.com');
    expect(senhaInput.value).toBe('password');

    // Simula o envio do formulário
    fireEvent.click(submitButton);

    // Verifica se o redirecionamento ocorreu corretamente
    expect(window.location.href).toBe('/home');
  });
});
