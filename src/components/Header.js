"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { Menu, X, User, LogOut, Moon, Sun } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            My Library
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/finance" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Finance
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <User className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={toggleTheme}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === "light" ? (
                    <div className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </div>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-2">
          <Link to="/" className="block py-2 text-gray-700 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/finance"
            className="block py-2 text-gray-700 dark:text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Finance
          </Link>
          <button onClick={toggleTheme} className="block w-full text-left py-2 text-gray-700 dark:text-gray-200">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button onClick={handleLogout} className="block w-full text-left py-2 text-gray-700 dark:text-gray-200">
            Logout
          </button>
        </div>
      )}
    </header>
  )
}

export default Header

