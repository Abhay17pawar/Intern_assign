import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('child');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || ''); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterType, setFilterType] = useState('');  
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken); 
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/all');  
        const result = await response.json();
        if (response.ok) {
          setData(result.users);
          setFilteredData(result.users); 
        } else {
          alert(result.message); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  const handleSearchAndFilter = () => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter(item => item.type === filterType);
    }

    setFilteredData(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      try {
        const response = await fetch('http://localhost:5000/api/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,  
          },
          body: JSON.stringify({ name, type }),
        });

        const result = await response.json();
        if (response.ok) {
          setData([...data, result.user]);
          setFilteredData([...filteredData, result.user]); 
          setName('');
          setType('child');
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Error adding user');
      }
    } else {
      alert('You must be logged in to add data!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <>
      <div className="App">
        <h1>Dashboard</h1>

        {!isLoggedIn ? (
          <div>
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const actualToken = localStorage.getItem('token'); 
                if (actualToken) {
                  setToken(actualToken);
                  setIsLoggedIn(true);
                } else {
                  alert('Please log in first!');
                }
              }}
            >
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <>
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
              <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="child">Child</option>
                <option value="mother">Mother</option>
                <option value="father">Father</option>
                <option value="teacher">Teacher</option>
              </select>
              <button type="submit">Add</button>
            </form>
          </>
        )}

        <div>
          <h2>Search and Filter</h2>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="child">Child</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="teacher">Teacher</option>
          </select>
          <button onClick={handleSearchAndFilter}>Filter</button>
        </div>

        <div>
          <h2>Data</h2>
          {filteredData.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ul>
              {filteredData.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className="btnlog" onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
