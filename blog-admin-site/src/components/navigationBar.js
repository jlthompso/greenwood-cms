import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const pages = [
    { route: '/', title: 'Home' },
    { route: '/createpost', title: 'New Post' },
  ];

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '1rem' }}>
      <AppBar position='static'>
        <Toolbar>
          {pages.map(({route, title}) => 
            <Button
              key={route}
              component={Link}
              to={route}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {title}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}