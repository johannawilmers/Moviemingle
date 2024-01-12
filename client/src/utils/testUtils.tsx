import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * HTTP link for Apollo Client to connect to a GraphQL server.
 */
const link = new HttpLink({
  uri: 'http://localhost:4000',
});

/**
 * Apollo Client instance configured with an in-memory cache and HTTP link.
 * @type {import('@apollo/client').ApolloClient<import('@apollo/client').NormalizedCacheObject>}
 */
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

/**
 * Renders a component with Apollo Client and BrowserRouter for testing page content.
 * @function
 * @param {JSX.Element} component - React component to render.
 * @returns {RenderResult} - Result of rendering with testing utilities.
 */
export const renderWithPageContent = (component: JSX.Element) =>
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>{component}</BrowserRouter>
    </ApolloProvider>,
  );

/**
 * Renders a component with Apollo MockedProvider for testing with mocked GraphQL data.
 * @function
 * @param {React.ReactNode} child - React component to render within the provider.
 * @param {any[]} mocks - Array of GraphQL query/mutation mocks.
 * @returns {RenderResult} - Result of rendering with testing utilities.
 */
export const renderWithMocks = (child: React.ReactNode, mocks: any[] = []) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>{child}</BrowserRouter>
    </MockedProvider>,
  );
};
