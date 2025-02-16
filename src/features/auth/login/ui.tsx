import { useState } from 'react';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import { loginUser } from './model';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { FormField } from '../../../shared/components/FormField';


export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const { loading, error: loginError } = useAppSelector((state: RootState) => state.login);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
        navigate('/notes');
      } catch (err) {
        console.error('Invalid credentials', err);
        setError(loginError || 'Invalid credentials');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={{ xs: "100%", sm: "60%", md: "40%" }}  mx="auto">
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"      
      />
			{loginError && <Typography color="error">{loginError}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

