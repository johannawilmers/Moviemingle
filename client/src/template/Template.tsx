import './template.css';

import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

/**
 * Template component for rendering the template of the application.
 * @component
 * template/Template
 */

export const Template: FC = () => {
  return (
    <>
      <main>
        <Navbar />
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};
