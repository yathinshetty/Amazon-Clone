"use client"

import { Mail, Phone, MapPin, MoreVertical } from "lucide-react"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    location: "New York, NY",
    joinDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-8901",
    location: "Los Angeles, CA",
    joinDate: "2024-01-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234-567-8902",
    location: "Chicago, IL",
    joinDate: "2024-01-03",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 234-567-8903",
    location: "Houston, TX",
    joinDate: "2024-01-04",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1 234-567-8904",
    location: "Phoenix, AZ",
    joinDate: "2024-01-05",
  },
]

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-600 mt-2">Manage customer accounts and information</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={16} />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-3">Joined: {user.joinDate}</p>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
