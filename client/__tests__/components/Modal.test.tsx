import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/ui/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const modalTitle = 'Test Modal';
  const modalContent = 'Modal Content';

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders modal when open is true', () => {
    render(
      <Modal open={true} onClose={mockOnClose} title={modalTitle}>
        {modalContent}
      </Modal>
    );
    
    expect(screen.getByText(modalTitle)).toBeInTheDocument();
    expect(screen.getByText(modalContent)).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={mockOnClose} title={modalTitle}>
        {modalContent}
      </Modal>
    );
    
    expect(container).toBeEmptyDOMElement();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Modal open={true} onClose={mockOnClose} title={modalTitle}>
        {modalContent}
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /cerrar modal/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when escape key is pressed', () => {
    render(
      <Modal open={true} onClose={mockOnClose} title={modalTitle}>
        {modalContent}
      </Modal>
    );
    
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('has proper accessibility attributes', () => {
    render(
      <Modal open={true} onClose={mockOnClose} title={modalTitle} ariaLabel="Custom Label">
        {modalContent}
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Custom Label');
  });
});
