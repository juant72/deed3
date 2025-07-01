import { render, screen } from '@testing-library/react';
import Alert from '../../components/ui/alerts/Alert';

describe('Alert Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    test('renders with correct content', () => {
        const title = 'Success!';
        const message = 'Operation completed successfully';

        render(
            <Alert
                title={title}
                message={message}
                type="success"
            />
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('applies correct styles based on type', () => {
        const { rerender } = render(
            <Alert
                message="Success message"
                type="success"
            />
        );

        // Check success styling
        let alert = screen.getByRole('alert');
        expect(alert.querySelector('svg')).toBeInTheDocument();
        const alertContent = alert.querySelector('div');
        expect(alertContent).toHaveClass('border-l-4', { exact: false });
        expect(alertContent).toHaveClass('border-green-500', { exact: false });

        // Check error styling
        rerender(
            <Alert
                message="Error message"
                type="error"
            />
        );

        alert = screen.getByRole('alert');
        expect(alert).toHaveClass('border-red-500', { exact: false });

        // Check warning styling
        rerender(
            <Alert
                message="Warning message"
                type="warning"
            />
        );

        alert = screen.getByRole('alert');
        expect(alert).toHaveClass('border-amber-500', { exact: false });

        // Check info styling
        rerender(
            <Alert
                message="Info message"
                type="info"
            />
        );

        alert = screen.getByRole('alert');
        expect(alert).toHaveClass('border-blue-500', { exact: false });
    });

    test('calls onClose when close button is clicked', () => {
        jest.useFakeTimers();

        render(
            <Alert
                message="Test message"
                showCloseButton={true}
                onClose={mockOnClose}
            />
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        closeButton.click();

        // Need to advance timers since onClose is called after a timeout
        jest.advanceTimersByTime(300);

        expect(mockOnClose).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    test('hides close button when showCloseButton is false', () => {
        render(
            <Alert
                message="Test message"
                showCloseButton={false}
            />
        );

        const closeButton = screen.queryByRole('button');
        expect(closeButton).not.toBeInTheDocument();
    });

    test('has proper accessibility attributes', () => {
        render(
            <Alert
                message="Accessible alert"
                id="test-alert"
            />
        );

        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'assertive');
        expect(alert).toHaveAttribute('aria-atomic', 'true');
        expect(alert).toHaveAttribute('id', 'test-alert');
    });
});
