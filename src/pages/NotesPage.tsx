import Notes from '../features/notes/ui';
import { Navbar } from '../shared/components/Navbar';
import { Box, Container } from '@mui/material';


export const NotesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh">        
          <Notes />
        </Box>
      </Container>
    </>    
  );
};
