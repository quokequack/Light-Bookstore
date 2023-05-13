import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Welcome from '../screens/Welcome';

test('renderiza corretamente a tela de boas-vindas', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Welcome />
    </MemoryRouter>
  );

  // Verifica se o título está sendo renderizado corretamente
  const titleElement = screen.getByText(/Light Bookstore/i);
  expect(titleElement).toBeInTheDocument();

  // Verifica se o subtítulo está sendo renderizado corretamente
  const subtitleElement = screen.getByText(/Reserve seus livros na biblioteca mais incrível da cidade!/i);
  expect(subtitleElement).toBeInTheDocument();

  // Verifica se os botões de cadastro e login estão sendo renderizados corretamente
  const cadastroButton = screen.getByRole('link', { name: /Cadastre-se!/i });
  expect(cadastroButton).toBeInTheDocument();

  const loginButton = screen.getByRole('link', { name: /Entre!/i });
  expect(loginButton).toBeInTheDocument();
});
