import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Container, Avatar, InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {  ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { AnimatedBackground } from '../styles/background';



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', {
        username,
        password,
      });

      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        setOpenSnackbar(true);
        setLoginSuccess(true);
        setLoginFailed(false);
        // Navigate after showing success message
        setTimeout(() => {
          navigate('/table');
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setLoginFailed(true);
      setLoginSuccess(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <AnimatedBackground />
      <Container
        component="main"
        maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              width: '100%',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 100, height: 100 }}>
              {loginSuccess ? (
                <img
                  src="/33a93290-9caf-42ef-82d5-0ad32f9ac486.png"
                  alt="Success Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : loginFailed ? (
                <img
                  src="/a3559046-e1ad-4455-b838-e9ae13a50efb.png"
                  alt="Failed Login Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : isPasswordFocused ? (
                <img
                  src="/6675cb0b-3992-453b-a5ba-ed877dace1e6.png"
                  alt="Custom Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <img
                  src="/bc1e7ee0-9c19-4606-a091-a572c3689000.png"
                  alt="Custom Avatar"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              )}
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 3 }}>
              Sign In
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleLogin}
              sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)} // Set focus state
                onBlur={() => setIsPasswordFocused(false)} // Reset focus state
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color='secondary'
                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}>
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}>
          <Alert
            severity="success"
            sx={{ width: '100%' }}>
            Login successful! Redirecting...
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
