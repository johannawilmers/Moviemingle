import { useMutation, useQuery } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Navigation } from './components/navbar/Navigation';
import { ADD_USER, GET_ALL_USERS } from './queries/Users';
import { theme } from './theme';

function App() {
  const [mutateFunctionUser] = useMutation(ADD_USER);
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');

    if (!storedUserID || (data?.getAllUsers && !data.getAllUsers.includes(storedUserID))) {
      const generatedUser = faker.person.fullName();
      localStorage.setItem('userID', generatedUser);

      mutateFunctionUser({
        variables: {
          userID: generatedUser,
        },
      });
    }
  }, [data, mutateFunctionUser]);

  if (loading) return;

  if (error) return;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header"></header>
        <main>
          <div>
            <RouterProvider router={Navigation} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
