import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

function TablePage() {
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://127.0.0.1:5000/api/data', {
        headers: {
          Authorization: token || '',
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert('Unauthorized. Please login again.');
          navigate('/');
        }
      });
  }, [navigate]);

  const handleChange = (id: number, value: number) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box p={4} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Data Table</Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input</TableCell>
                <TableCell>Existing Value</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: {id: number, existing_value: number}) => {
                const input = inputValues[row.id] || 0;
                const percentage = row.existing_value
                  ? ((input / row.existing_value) * 100).toFixed(2)
                  : '0.00';

                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <TextField
                        type="number"
                        value={inputValues[row.id] || ''}
                        onChange={(e) =>
                          handleChange(row.id, parseFloat(e.target.value || '0'))
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.existing_value}</TableCell>
                    <TableCell>{percentage}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default TablePage;
