
import { render, screen } from '@testing-library/react';
import Copyright from './Copyright';
import '@testing-library/jest-dom';

describe('Copyright Component', () => {
    it('renders the copyright notice', () => {
        render(<Copyright />);
        expect(screen.getByText(/©2024 Powered by Encrypia, Inc. All rights reserved./i)).toBeInTheDocument();
    });

    it('renders the terms and privacy policy links', () => {
        render(<Copyright />);
        expect(screen.getByText('Terms')).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('renders social media icons', () => {
        render(<Copyright />);
        expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
    });
});
