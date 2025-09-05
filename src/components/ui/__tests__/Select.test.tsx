import React from 'react';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Select from '../Select';

describe('Select Component', () => {
  const defaultProps = {
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  };

  it('should render with default props', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('cursor-pointer', 'flex', 'h-10', 'w-full');
  });

  it('should render with custom className', () => {
    render(<Select {...defaultProps} className="custom-class" />);

    const wrapper = screen.getByRole('combobox').parentElement;
    expect(wrapper).toHaveClass('relative', 'custom-class');
  });

  it('should render with error state', () => {
    render(<Select {...defaultProps} error />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-destructive', 'focus-visible:ring-destructive');
  });

  it('should display options correctly', () => {
    render(<Select {...defaultProps} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Select {...defaultProps} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option2');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('option2');
  });

  it('should handle controlled value', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} value="option2" onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('should handle disabled state', () => {
    render(<Select {...defaultProps} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('should handle placeholder', () => {
    render(
      <Select {...defaultProps}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
      </Select>
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should render chevron down icon', () => {
    render(<Select {...defaultProps} />);

    const chevronIcon = screen.getByTestId('chevron-down-icon');
    expect(chevronIcon).toBeInTheDocument();
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toHaveClass('cursor-pointer', 'flex', 'h-10', 'w-full');
  });

  it('should handle focus events', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();

    render(<Select {...defaultProps} onFocus={handleFocus} />);

    const select = screen.getByRole('combobox');
    await user.click(select);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle blur events', async () => {
    const user = userEvent.setup();
    const handleBlur = jest.fn();

    render(<Select {...defaultProps} onBlur={handleBlur} />);

    const select = screen.getByRole('combobox');
    await user.click(select);
    await user.tab();

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should apply focus-visible styles', () => {
    render(<Select {...defaultProps} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring');
  });

  it('should handle multiple props correctly', () => {
    const handleChange = jest.fn();
    const handleFocus = jest.fn();

    render(
      <Select
        {...defaultProps}
        value="option1"
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={false}
        error={false}
        className="test-class"
        data-testid="custom-select"
      />
    );

    const select = screen.getByTestId('custom-select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('option1');
    expect(select).not.toBeDisabled();
  });
});
