import React from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../features/auth/logout/api';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/"); 
  };

  return (
		<AppBar position="static">
			<Toolbar sx={{ backgroundColor: "black" }}>
				<Container>
					<Box display="flex" alignItems="center">
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Note Taking App
						</Typography>
						<Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>    
  );
};
