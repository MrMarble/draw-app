import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import Menu from './Menu';

describe('Menu Component', () => {
  const renderWithTheme = () => {
    const theme = {
      padding: 5,
      aside: {
        width: '45vw',
        paddingTop: '20',
        paddingLeft: '5',
      },
      media: '764px',
    };
    return render(
      <ThemeProvider theme={theme}>
        <Menu>
          <p>Test child</p>
        </Menu>
      </ThemeProvider>,
    );
  };
  test('Component should render', () => {
    const { getByTestId } = renderWithTheme();

    expect(getByTestId('aside')).not.toBeNull();
    expect(getByTestId('aside').nodeName).toBe('ASIDE');

    expect(getByTestId('toggle')).not.toBeNull();
    expect(getByTestId('toggle').nodeName).toBe('BUTTON');

    expect(getByTestId('background')).not.toBeNull();
    expect(getByTestId('background').nodeName).toBe('DIV');
  });
});
