import { Container, Box, Typography, Button } from '@mui/material';
import { RegisterForm } from '../features/auth/register/ui';
import { useNavigate } from 'react-router-dom';


export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <h1>Note Taking App</h1>
        <p>Please register to continue</p>
        <RegisterForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Do have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/login")}>Login</Button>
        </Typography>
      </Box>
    </Container>
  );
};
