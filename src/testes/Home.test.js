import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import Home from '../screens/Home';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: jest.fn(),
}));

describe('Página Home', () => {
  

  it('deve redirecionar para a página de detalhes ao clicar no botão "Ver livro"', async () => {
    const livro = { id: '1', data: () => ({ nome: 'Livro 1' }) };
    getDocs.mockResolvedValue({ empty: false, docs: [livro] });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const verLivroButton = await screen.findByText('Ver livro!');
    fireEvent.click(verLivroButton);

    expect(container.innerHTML).toContain('/detalhes/1/');
  });

  it('deve exibir uma lista de livros', async () => {
    const livros = [
      { id: '1', data: () => ({ nome: 'Livro 1' }) },
      { id: '2', data: () => ({ nome: 'Livro 2' }) },
      { id: '3', data: () => ({ nome: 'Livro 3' }) },
    ];
    getDocs.mockResolvedValue({ empty: false, docs: livros });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const livro1 = await screen.findByText('Livro 1');
    const livro2 = await screen.findByText('Livro 2');
    const livro3 = await screen.findByText('Livro 3');

    expect(livro1).toBeInTheDocument();
    expect(livro2).toBeInTheDocument();
    expect(livro3).toBeInTheDocument();
  });
});
