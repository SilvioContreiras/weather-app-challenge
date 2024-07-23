import React from 'react'
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import AddressForm from './'; 
import '@testing-library/jest-dom';

describe('AddressForm Component', () => {
  it('renders correctly', () => {
    render(<AddressForm onAddressSubmit={vi.fn()} onClear={vi.fn()} />);
    expect(screen.getByLabelText('Enter address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Weather' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<AddressForm onAddressSubmit={vi.fn()} onClear={vi.fn()} />);
    const input = screen.getByLabelText('Enter address');
    fireEvent.change(input, { target: { value: '123 Main St' } });
    expect(input).toHaveValue('123 Main St');
  });

  it('displays error on invalid address submission', async () => {
    render(<AddressForm onAddressSubmit={vi.fn()} onClear={vi.fn()} />);
    const input = screen.getByLabelText('Enter address');
    fireEvent.change(input, { target: { value: 'invalid address' } });
    fireEvent.click(screen.getByRole('button', { name: 'Get Weather' }));
    expect(await screen.findByText('Please provide a valid address with a structure number and street name.')).toBeVisible();
  });

  it('resets input on clear button click', () => {
    const mockClear = vi.fn();
    render(<AddressForm onAddressSubmit={vi.fn()} onClear={mockClear} />);
    const input = screen.getByLabelText('Enter address');
    fireEvent.change(input, { target: { value: '123 Main St' } });
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
    expect(screen.queryByText('Please provide a valid address with a structure number and street name.')).not.toBeInTheDocument();
    expect(mockClear).toHaveBeenCalled();
  });
});
