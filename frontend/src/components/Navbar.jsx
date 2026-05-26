import { useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('access')
    localStorage.removeItem('refresh')

    navigate('/')
  }

  return (

    <div
      style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}
    >

      <h2>ESG Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar