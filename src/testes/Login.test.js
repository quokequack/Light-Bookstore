import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../screens/Login';

describe('Login Component', () => {
    it('should render without errors', () => {
      render(<Login />, { wrapper: MemoryRouter });
      expect(screen.getByText('Bem-vindo de volta, leitor!')).toBeInTheDocument();
    });
  
    it('should update email state when input value changes', () => {
      render(<Login />, { wrapper: MemoryRouter });
      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      expect(emailInput.value).toBe('test@example.com');
    });
  
    it('should update senha state when input value changes', () => {
      render(<Login />, { wrapper: MemoryRouter });
      const senhaInput = screen.getByLabelText('Senha');
      fireEvent.change(senhaInput, { target: { value: 'password123' } });
      expect(senhaInput.value).toBe('password123');
    });
    it('should display "Email" label', () => {
        render(<Login />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
      });
      
      it('should display "Senha" label', () => {
        render(<Login />, { wrapper: MemoryRouter });
        expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      });
  
    // Add more test cases to cover different scenarios and component behavior
  });