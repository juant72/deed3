
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    it('renders the footer with the correct description text', () => {
        render(<Footer />);

        const descriptionElement = screen.getByText(
            /Encrypia Deeds3: The institutional-grade platform for Web3 real estate tokenization and investment./i
        );

        expect(descriptionElement).toBeInTheDocument();
    });

    it('renders the subscription form', () => {
        render(<Footer />);

        const emailInput = screen.getByPlaceholderText('Your email');
        const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

        expect(emailInput).toBeInTheDocument();
        expect(subscribeButton).toBeInTheDocument();
    });
});
