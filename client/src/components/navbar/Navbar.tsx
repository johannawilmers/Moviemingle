/**
 * Navbar component for rendering the application's navigation bar.
 * @module components/Navbar
 */

import './navbar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

/**
 * Functional component for rendering the navigation bar.
 * @returns {JSX.Element} The JSX representation of the Navbar component.
 */

function Navbar() {
  /**
   * Render the Navbar component.
   * @returns {JSX.Element} Navbar component.
   */

  return (
    <div className="navbarContainer">
      <AppBar position="static">
        <Box className="navbar">
          <Link href="/project2/" tabIndex={0}>
            <img aria-label="Logo Image" src="/project2/moviemingle.png" alt="Logo" />
          </Link>
          <Box>
            <Button tabIndex={-1}>
              <Link aria-label="Homepage link" id="movieMingle" href="/project2/">
                MovieMingle
              </Link>
            </Button>
            <Button tabIndex={-1}>
              <Link id="favorites" href="/project2/favorites">
                Favorites
              </Link>
            </Button>
          </Box>
        </Box>
      </AppBar>
    </div>
  );
}

export default Navbar;
