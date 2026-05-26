import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    if (!username || !password) {
      alert('Please enter username and password')
      return
    }

    setLoading(true)

    try {

      const response = await fetch(
        'https://breathe-esg-platform-wzk1.onrender.com/api/token/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      if (response.ok) {

        localStorage.setItem(
          'access',
          data.access
        )

        localStorage.setItem(
          'refresh',
          data.refresh
        )

        alert('Login successful')

        navigate('/dashboard')

      } else {

        alert(
          data.detail || 'Invalid credentials'
        )
      }

    } catch (error) {

      console.log(error)

      alert('Server connection failed')
    }

    setLoading(false)
  }

  return (

    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(to right, #e0e7ff, #f8fafc)',
        padding: '20px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow:
            '0px 10px 30px rgba(0,0,0,0.1)'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '10px',
            color: '#0f172a',
            fontSize: '42px',
            fontWeight: 'bold'
          }}
        >
          ESG Login
        </h1>

        <p
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#64748b'
          }}
        >
          Secure ESG Dashboard Access
        </p>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '25px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading
              ? '#94a3b8'
              : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </div>

    </div>
  )
}

export default Login