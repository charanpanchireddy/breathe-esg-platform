import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

function Dashboard() {

  const [file, setFile] = useState(null)

  const [records, setRecords] = useState([])

  const [search, setSearch] = useState('')

  const [showSuspicious, setShowSuspicious] =
    useState(false)

  const [loading, setLoading] = useState(false)

  const BASE_URL =
    'https://breathe-esg-platform-wzk1.onrender.com'

  const fetchRecords = async () => {

    try {

      const token = localStorage.getItem('access')

      const response = await fetch(
        `${BASE_URL}/api/records/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 401) {

        alert('Session expired. Login again.')

        localStorage.clear()

        window.location.href = '/'

        return
      }

      const data = await response.json()

      setRecords(data)

    } catch (error) {

      console.log(error)

      alert('Failed to fetch records')
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleUpload = async () => {

    if (!file) {

      alert('Choose a CSV file')

      return
    }

    try {

      setLoading(true)

      const token = localStorage.getItem('access')

      const formData = new FormData()

      formData.append('file', file)

      formData.append('source_type', 'SAP')

      const response = await fetch(
        `${BASE_URL}/api/upload/`,
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`
          },

          body: formData
        }
      )

      if (response.ok) {

        alert('Upload successful')

        fetchRecords()

      } else {

        alert('Upload failed')
      }

    } catch (error) {

      console.log(error)

      alert('Server error')

    } finally {

      setLoading(false)
    }
  }

  const filteredRecords = records.filter((record) => {

    const matchesSearch =
      record.activity
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesStatus =
      showSuspicious
        ? record.status === 'Suspicious'
        : true

    return matchesSearch && matchesStatus
  })

  const suspiciousCount = records.filter(
    (r) => r.status === 'Suspicious'
  ).length

  const pendingCount = records.filter(
    (r) => r.status === 'Pending'
  ).length

  const pieData = [
    {
      name: 'Pending',
      value: pendingCount
    },
    {
      name: 'Suspicious',
      value: suspiciousCount
    }
  ]

  return (

    <div
      style={{
        backgroundColor: '#f1f5f9',
        minHeight: '100vh'
      }}
    >

      <Navbar />

      <div
        style={{
          maxWidth: '1400px',
          margin: 'auto',
          padding: '30px'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            fontSize: '60px',
            marginBottom: '40px',
            color: '#0f172a',
            fontWeight: 'bold'
          }}
        >
          ESG Upload System
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}
        >

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            style={{
              padding: '10px'
            }}
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              padding: '14px 28px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {
              loading
                ? 'Uploading...'
                : 'Upload CSV'
            }
          </button>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}
        >

          <div
            style={{
              background:
                'linear-gradient(to right,#bef264,#d9f99d)',
              padding: '35px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h2>Total Records</h2>

            <h1
              style={{
                fontSize: '70px',
                margin: '10px'
              }}
            >
              {records.length}
            </h1>
          </div>

          <div
            style={{
              background:
                'linear-gradient(to right,#fecaca,#fca5a5)',
              padding: '35px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h2>Suspicious Records</h2>

            <h1
              style={{
                fontSize: '70px',
                margin: '10px'
              }}
            >
              {suspiciousCount}
            </h1>
          </div>

          <div
            style={{
              background:
                'linear-gradient(to right,#bfdbfe,#93c5fd)',
              padding: '35px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h2>Pending Records</h2>

            <h1
              style={{
                fontSize: '70px',
                margin: '10px'
              }}
            >
              {pendingCount}
            </h1>
          </div>

        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >

          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              padding: '14px',
              width: '320px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontSize: '16px'
            }}
          />

          <label
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#334155'
            }}
          >

            <input
              type="checkbox"
              checked={showSuspicious}
              onChange={() =>
                setShowSuspicious(!showSuspicious)
              }
              style={{
                marginRight: '10px'
              }}
            />

            Show Suspicious Only

          </label>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}
        >

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >

            <h2
              style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              Emission Overview
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={filteredRecords}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="activity" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="emissions"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '20px',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >

            <h2
              style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              Status Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  <Cell fill="#22c55e" />

                  <Cell fill="#ef4444" />

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#0f172a',
            fontSize: '45px'
          }}
        >
          Emission Records
        </h1>

        <div
          style={{
            overflowX: 'auto'
          }}
        >

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow:
                '0px 5px 20px rgba(0,0,0,0.08)'
            }}
          >

            <thead
              style={{
                backgroundColor: '#0f172a',
                color: 'white'
              }}
            >

              <tr>

                <th style={{ padding: '20px' }}>
                  Activity
                </th>

                <th style={{ padding: '20px' }}>
                  Quantity
                </th>

                <th style={{ padding: '20px' }}>
                  Unit
                </th>

                <th style={{ padding: '20px' }}>
                  Emissions
                </th>

                <th style={{ padding: '20px' }}>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRecords.map((record) => (

                <tr
                  key={record.id}
                  style={{
                    backgroundColor:
                      record.status === 'Suspicious'
                        ? '#fee2e2'
                        : '#dcfce7'
                  }}
                >

                  <td
                    style={{
                      padding: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {record.activity}
                  </td>

                  <td
                    style={{
                      padding: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {record.quantity}
                  </td>

                  <td
                    style={{
                      padding: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {record.unit}
                  </td>

                  <td
                    style={{
                      padding: '18px',
                      textAlign: 'center'
                    }}
                  >
                    {record.emissions}
                  </td>

                  <td
                    style={{
                      padding: '18px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color:
                        record.status === 'Suspicious'
                          ? '#dc2626'
                          : '#16a34a'
                    }}
                  >
                    {record.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default Dashboard