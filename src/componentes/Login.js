
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'
import { useState } from 'react';


function Login({ hideNavBar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate authentication. Replace with your actual authentication logic.
    if (email === 'tombsiteapp@gmail.com' && password === '1805182001') {
      navigate('./Show');
    } else {
      alert('Usuario o contraseña erroneos');
    }
  };

  return (
    <div style={{ backgroundColor: '#7b5bf2', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center', padding: '30px', borderRadius: '10px' }}>
        <div style={{ width: '50%', marginRight: '20px'  }}>
          <img src={logo} alt='logo' className='logoapp' />
        </div>
        <div style={{ width: '70%', backgroundColor: '#edf2fa', padding: '80px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#7b5bf2', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Login</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href="#" style={{ color: '#7b5bf2' }}>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;