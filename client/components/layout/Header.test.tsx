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

        // Check for navigation links (use getAllByText for potentially duplicated links)
        expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
        expect(screen.getAllByText('About')[0]).toBeInTheDocument();
        expect(screen.getByText('Roadmap')).toBeInTheDocument(); // This one is unique
        expect(screen.getAllByText('Explore')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
    });
});
function expect(arg0: any) {
    throw new Error('Function not implemented.');
}

