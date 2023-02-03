import { render, screen } from '@testing-library/react';
import { UserProvider } from './context/UserProvider';
import App from './App';
import { MemoryRouter } from 'react-router';

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </MemoryRouter>
  );
});
