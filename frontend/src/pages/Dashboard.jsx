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
  Cell
} from 'recharts'

function Dashboard() {

  const [file, setFile] = useState(null)

  const [records, setRecords] = useState([])

  const [search, setSearch] = useState('')

  const [showSuspicious, setShowSuspicious] =
    useState(false)

  const fetchRecords = async () => {

    const token = localStorage.getItem('access')

    const response = await fetch(
      'http://127.0.0.1:8000/api/records/',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await response.json()

    setRecords(data)
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleUpload = async () => {

    if (!file) {
      alert('Choose a CSV file')
      return
    }

    const token = localStorage.getItem('access')

    const formData = new FormData()

    formData.append('file', file)
    formData.append('source_type', 'SAP')

    await fetch(
      'http://127.0.0.1:8000/api/upload/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )

    alert('Upload successful')

    fetchRecords()
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
        backgroundColor: '#f3f4f6',
        minHeight: '100vh'
      }}
    >

      <Navbar />

      <div
        style={{
          maxWidth: '1400px',
          margin: 'auto',
          padding: '20px'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '60px',
            color: '#0f172a'
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
          />

          <button
            onClick={handleUpload}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Upload CSV
          </button>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px',
            marginBottom: '40px'
          }}
        >

          <div
            style={{
              backgroundColor: '#d9f99d',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center'
            }}
          >
            <h2>Total Records</h2>

            <h1>{records.length}</h1>
          </div>

          <div
            style={{
              backgroundColor: '#fecaca',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center'
            }}
          >
            <h2>Suspicious Records</h2>

            <h1>{suspiciousCount}</h1>
          </div>

          <div
            style={{
              backgroundColor: '#bfdbfe',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center'
            }}
          >
            <h2>Pending Records</h2>

            <h1>{pendingCount}</h1>
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
              padding: '12px',
              width: '300px',
              borderRadius: '10px',
              border: '1px solid #ccc'
            }}
          />

          <label
            style={{
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          >

            <input
              type="checkbox"
              checked={showSuspicious}
              onChange={() =>
                setShowSuspicious(!showSuspicious)
              }
            />

            Show Suspicious Only

          </label>

        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}
        >

          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '20px'
            }}
          >

            <h2
              style={{
                textAlign: 'center'
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
                  fill="#3b82f6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '20px'
            }}
          >

            <h2
              style={{
                textAlign: 'center'
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

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#0f172a'
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
              overflow: 'hidden'
            }}
          >

            <thead
              style={{
                backgroundColor: '#1e293b',
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
                      fontWeight: 'bold'
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