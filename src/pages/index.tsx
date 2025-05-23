import { useState, useEffect } from 'react'
import axios from 'axios'

interface Lead {
  _id: string
  name: string
  email: string
  status: string
  createdAt: string
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [newLead, setNewLead] = useState({ name: '', email: '', status: 'New' })

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/leads')
      setLeads(res.data)
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/leads', newLead)
      setNewLead({ name: '', email: '', status: 'New' })
      fetchLeads()
    } catch (error) {
      console.error('Error adding lead:', error)
    }
  }

  return (
    <div>
      <h1>Lead Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          required
        />
        <select
          value={newLead.status}
          onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
        >
          <option value="New">New</option>
          <option value="Engaged">Engaged</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed-Won">Closed-Won</option>
          <option value="Closed-Lost">Closed-Lost</option>
        </select>
        <button type="submit">Add Lead</button>
      </form>
      <h2>Leads</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            {lead.name} - {lead.email} - {lead.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
