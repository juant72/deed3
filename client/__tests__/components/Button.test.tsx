import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/ui/button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="default">Default Button</Button>);
    let buttonElement = screen.getByRole('button', { name: /default button/i });
    
    // Check default variant has expected classes
    expect(buttonElement).toHaveClass('bg-primary');
    
    // Test another variant
    rerender(<Button variant="outline">Outline Button</Button>);
    buttonElement = screen.getByRole('button', { name: /outline button/i });
    expect(buttonElement).toHaveClass('border');
    expect(buttonElement).not.toHaveClass('bg-primary');
  });

  test('renders disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50');
  });

  test('applies custom class names', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom button/i });
    
    expect(buttonElement).toHaveClass('custom-class');
  });
});
