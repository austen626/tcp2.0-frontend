import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '!style-loader!css-loader!resolve-url-loader!sass-loader!../src/assets/css/index.scss';
import { theme } from '../src/theme';
import { ThemeProvider } from 'styled-components';
import React from 'react';

export const decorators = [
  (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}