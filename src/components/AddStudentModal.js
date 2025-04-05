"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const AddStudentModal = ({ onClose, onStudentAdded }) => {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [timeSlot, setTimeSlot] = useState("6hr")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [seatNumber, setSeatNumber] = useState("")
  const [email, setEmail] = useState("")
  const [village, setVillage] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [daysCount, setDaysCount] = useState(0)
  const [availableSeats, setAvailableSeats] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAvailableSeats()

    // Set default start date to today
    const today = new Date()
    setStartDate(today.toISOString().split("T")[0])
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysCount(diffDays > 0 ? diffDays : 0)
    }
  }, [startDate, endDate])

  const fetchAvailableSeats = async () => {
    try {
      // For demo purposes, we'll use mock data
      // In production, replace with your actual API call

      // Simulating API response delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock available seats (1-80, with some randomly occupied)
      const mockSeats = {}
      for (let i = 1; i <= 80; i++) {
        // Randomly mark some seats as unavailable (for demo)
        mockSeats[i] = Math.random() > 0.2 // 20% chance of being occupied
      }

      setAvailableSeats(mockSeats)
    } catch (error) {
      console.error("Error fetching available seats:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name || !phoneNumber || !timeSlot || !startDate || !endDate) {
      setError("Please fill in all required fields")
      return
    }

    const isPaid = paymentAmount !== ""

    try {
      setIsLoading(true)

      // For demo purposes, we'll simulate a successful API call
      // In production, replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful student addition
      onStudentAdded()
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Student</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div
            className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Slot <span className="text-red-500">*</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="6hr">6 Hours</option>
                <option value="12hr">12 Hours</option>
                <option value="24hr">24 Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Amount</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            {startDate && endDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Days Count</label>
                <div className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  {daysCount} days
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seat Number</label>
              <select
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="">Not Assigned</option>
                {Array.from({ length: 80 }, (_, i) => i + 1).map((seat) => (
                  <option key={seat} value={seat.toString()} disabled={availableSeats[seat] === false}>
                    {seat} {availableSeats[seat] === false ? "(Occupied)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Village</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Father's Name</label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudentModal

