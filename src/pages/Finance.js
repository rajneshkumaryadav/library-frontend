"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"

const Finance = () => {
  const [financeData, setFinanceData] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set default selected month to current month
    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
    setSelectedMonth(currentMonth)

    fetchFinanceData(currentMonth)
  }, [])

  const fetchFinanceData = async (month) => {
    try {
      setIsLoading(true)

      // For demo purposes, we'll use mock data
      // In production, replace with your actual API call

      // Simulating API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock finance data
      const mockFinanceData = {
        totalAmount: 25000,
        studentCount: 35,
        monthlyData: {
          [month]: {
            amount: 5000,
            count: 10,
          },
        },
      }

      setFinanceData(mockFinanceData)
    } catch (error) {
      console.error("Error fetching finance data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMonthChange = (e) => {
    const month = e.target.value
    setSelectedMonth(month)
    fetchFinanceData(month)
  }

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-")
    return `${new Date(Number.parseInt(year), Number.parseInt(month) - 1).toLocaleString("default", { month: "long" })} ${year}`
  }

  const getMonthlyData = () => {
    if (!financeData || !financeData.monthlyData || !selectedMonth) return null

    return financeData.monthlyData[selectedMonth] || { amount: 0, count: 0 }
  }

  const monthlyData = getMonthlyData()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Overview</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Month
            </label>
            <input
              type="month"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {selectedMonth ? formatMonth(selectedMonth) : "Monthly"} Report
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Revenue</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{monthlyData?.amount || 0}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Students</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{monthlyData?.count || 0}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Overall Statistics</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{financeData?.totalAmount || 0}
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {financeData?.studentCount || 0}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Finance

