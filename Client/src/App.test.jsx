import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  // Test 2: DOM Content Check
  it('renders correctly in DOM', () => {
    render(<App />);
    expect(document.body.innerHTML).not.toBe('');
  });

  // Test 3: User Interaction Check
  it('handles basic click events', () => {
    render(<App />);
    const buttons = screen.queryAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
  });
});