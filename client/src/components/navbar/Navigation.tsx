/**
 * Navigation module for setting up routes using react-router-dom.
 * @module navigation/Navigation
 */

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { FavoritePage } from '../../pages/FavoritePage';
import { HomePage } from '../../pages/HomePage';
import { SingleMoviePage } from '../../pages/SingleMoviePage';
import { Template } from '../../template/Template';

/**
 * Create and configure the navigation with routes.
 * @constant {Object} Navigation - Configured navigation object.
 */

export const Navigation = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Template />}>
      <Route index element={<HomePage />} />
      <Route path="/movie/:_id" element={<SingleMoviePage />} />
      <Route path="/favorites" element={<FavoritePage />} />
    </Route>,
  ),
  { basename: '/project2' },
);

export default Navigation;
