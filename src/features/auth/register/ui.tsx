import { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { registerUser } from './model';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { isEmptyField, isValidEmail, isValidPassword } from '../../../shared/utils/validation';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { FormField } from '../../../shared/components/FormField';



export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error: registerError } = useAppSelector((state: RootState) => state.register);

  const handleRegister = async () => {
    if (isEmptyField(username) || isEmptyField(email) || isEmptyField(password) || isEmptyField(confirmPassword)) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null); 

    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      navigate("/notes");
    }catch (err) {
      console.error('Registration failed', err);
      setError(registerError || "Registration failed");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width={{ xs: "100%", sm: "60%", md: "40%" }}  mx="auto">

      {registerError && <Typography color="error">{registerError}</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <FormField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorStatus={!!email && !isValidEmail(email)}
        errorMessage={!!email && !isValidEmail(email) ? "Invalid email format" : ""}
      />
      <FormField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorStatus={!!password && !isValidPassword(password)}
        errorMessage={!!password && !isValidPassword(password) ? "Password must be at least 6 characters" : ""}
      />
      <FormField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        errorStatus={!!confirmPassword && password !== confirmPassword}
        errorMessage={!!confirmPassword && password !== confirmPassword ? "Passwords do not match" : ""}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Register"}
      </Button>
    </Box>
  );
};


