import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface FormFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
	errorMessage?: string;
	errorStatus?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export const FormField: React.FC<FormFieldProps> = ({ label, type = 'text', errorMessage, errorStatus, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
  return (
    <TextField
      label={label}
			type={type === "password" ? (showPassword ? "text" : "password") : type} 
      variant="outlined"
      fullWidth
      error={Boolean(errorStatus)}
      helperText={errorMessage}
      sx={{
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'secondary.main',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: 'secondary.main',
        },
      }}
			InputProps={
				type === "password"
				? {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={togglePasswordVisibility}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}
				: undefined
			}
      {...props}
    />
  );
};