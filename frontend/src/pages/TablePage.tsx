import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: 20 }}>
      <h2>Data Table</h2>
      <button onClick={handleLogout}>Logout</button>
      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Input</th>
            <th>Existing Value</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: {id: number, existing_value: string}) => {
            const input = inputValues[row.id] || 0;
            const percentage = row.existing_value
              ? ((input / parseFloat(row.existing_value)) * 100).toFixed(2)
              : '0.00';
            return (
              <tr key={row.id}>
                <td>
                  <input
                    type="number"
                    value={inputValues[row.id] || ''}
                    onChange={(e) =>
                      handleChange(row.id, parseFloat(e.target.value || '0'))
                    }
                  />
                </td>
                <td>{row.existing_value}</td>
                <td>{percentage}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;
