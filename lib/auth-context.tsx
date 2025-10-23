"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  createdAt: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  getAllUsers: () => User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]")
    const existingUser = allUsers.find((u: User) => u.email === email)

    const newUser: User = existingUser || {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
    }

    newUser.lastLogin = new Date().toISOString()

    const userIndex = allUsers.findIndex((u: User) => u.email === email)
    if (userIndex >= 0) {
      allUsers[userIndex] = newUser
    } else {
      allUsers.push(newUser)
    }

    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]")

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    allUsers.push(newUser)
    localStorage.setItem("allUsers", JSON.stringify(allUsers))

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (data: Partial<User>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]")
      const userIndex = allUsers.findIndex((u: User) => u.email === user.email)
      if (userIndex >= 0) {
        allUsers[userIndex] = updatedUser
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
      }
    }
  }

  const getAllUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]")
    return allUsers
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
