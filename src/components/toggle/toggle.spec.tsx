import { fireEvent, render, screen } from 'test-utils';
import { describe, it, expect } from 'vitest';
import ToggleButton from './Toggle';

describe('ToggleButton.tsx', () => {
  it('Its turn off by default', async () => {
    render(<ToggleButton />);

    const btnTest = screen.getByTestId('button');
    const toggleSpanTest = screen.getByTestId('spanToggle');

    // Background Default
    expect(btnTest).toHaveClass('bg-gray-300');

    // Translate Default
    expect(toggleSpanTest).toHaveClass('translate-x-1');
  });

  it('Clicking Unrelated Element does not toggle a button', () => {
    render(<ToggleButton />);

    const divElement = document.createElement('div');
    divElement.textContent = 'Unrelated';
    document.body.appendChild(divElement);
    fireEvent.click(divElement);

    const buttonTest = screen.getByTestId('button');
    const spanTest = screen.getByTestId('spanToggle');

    expect(buttonTest).toHaveClass('bg-gray-300');
    expect(spanTest).toHaveClass('translate-x-1');
  });

  it('Toggle Become Visible when button is clicked', () => {
    render(<ToggleButton />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    const spanTest = screen.getByTestId('spanToggle');

    expect(button).toHaveClass('bg-green-500');
    expect(spanTest).toHaveClass('translate-x-8');
  });

  it('Toggle Back To Non-Visible when button is clicked twice', () => {
    render(<ToggleButton />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    fireEvent.click(button);

    const spanTest = screen.getByTestId('spanToggle');

    expect(button).toHaveClass('bg-gray-300');
    expect(spanTest).toHaveClass('translate-x-1');
  });
});
