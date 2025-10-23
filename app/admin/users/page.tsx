"use client"

import { Mail, Phone, MapPin, MoreVertical, LogIn } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import type { User } from "@/lib/auth-context"

export default function AdminUsers() {
  const { getAllUsers } = useAuth()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const allUsers = getAllUsers()
    setUsers(allUsers)
  }, [getAllUsers])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-600 mt-2">Manage customer accounts and track sign-ins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Active Today</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {
              users.filter((u) => {
                if (!u.lastLogin) return false
                const lastLogin = new Date(u.lastLogin)
                const today = new Date()
                return lastLogin.toDateString() === today.toDateString()
              }).length
            }
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">New This Week</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {
              users.filter((u) => {
                const created = new Date(u.createdAt)
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                return created > weekAgo
              }).length
            }
          </p>
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4">
        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-slate-600">No users yet</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={16} />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={16} />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.address && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={16} />
                        <span>
                          {user.address}
                          {user.city && `, ${user.city}`}
                          {user.state && `, ${user.state}`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Joined</p>
                      <p className="text-slate-900 font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                    {user.lastLogin && (
                      <div>
                        <p className="text-slate-500 flex items-center gap-1">
                          <LogIn size={14} /> Last Login
                        </p>
                        <p className="text-slate-900 font-medium">{formatDate(user.lastLogin)}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
