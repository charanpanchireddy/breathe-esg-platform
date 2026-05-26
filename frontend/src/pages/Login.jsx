import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/api/token/',
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
  }

  return (

    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6'
      }}
    >

      <div
        style={{
          width: '400px',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#0f172a'
          }}
        >
          ESG Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login