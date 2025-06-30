import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useStateContext } from '../../context';

// Mock the context
jest.mock('../../context', () => ({
    useStateContext: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode, href: string }) => {
        return <a href={href}>{children}</a>
    }
});

describe('Header', () => {
    it('renders the header with logo and navigation links', () => {
        // Provide mock context values
        (useStateContext as jest.Mock).mockReturnValue({
            currentAccount: null,
            connectWallet: jest.fn(),
            userBlance: '',
        });

        render(<Header />);

        // Check for logo
        expect(screen.getByAltText('Encrypia Deeds3')).toBeInTheDocument();

        // Check for navigation links
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Roadmap')).toBeInTheDocument();
        expect(screen.getByText('Explore')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });
});
