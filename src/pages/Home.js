"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import AddStudentModal from "../components/AddStudentModal"
import { Search, Filter, Plus } from "lucide-react"

const Home = () => {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [timeSlotFilter, setTimeSlotFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [students, searchTerm, timeSlotFilter, paymentFilter])

  const fetchStudents = async () => {
    try {
      setIsLoading(true)
      // For demo purposes, we'll use mock data
      // In production, replace with your actual API call

      // Simulating API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockStudents = [
        {
          _id: "1",
          name: "John Doe",
          phoneNumber: "9876543210",
          timeSlot: "6hr",
          paymentAmount: 500,
          startDate: "2023-04-01",
          endDate: "2023-05-01",
          seatNumber: 5,
          email: "john@example.com",
          village: "Green Village",
          isPaid: true,
        },
        {
          _id: "2",
          name: "Jane Smith",
          phoneNumber: "8765432109",
          timeSlot: "12hr",
          paymentAmount: 800,
          startDate: "2023-04-05",
          endDate: "2023-05-05",
          seatNumber: 10,
          email: "jane@example.com",
          isPaid: true,
        },
        {
          _id: "3",
          name: "Raj Kumar",
          phoneNumber: "7654321098",
          timeSlot: "24hr",
          paymentAmount: 0,
          startDate: "2023-04-10",
          endDate: "2023-05-10",
          village: "Blue Village",
          isPaid: false,
        },
      ]

      setStudents(mockStudents)
      setFilteredStudents(mockStudents)
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterStudents = () => {
    let result = [...students]

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          student.phoneNumber.includes(searchTerm) ||
          (student.seatNumber && student.seatNumber.toString() === searchTerm) ||
          (student.village && student.village.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply time slot filter
    if (timeSlotFilter !== "all") {
      result = result.filter((student) => student.timeSlot === timeSlotFilter)
    }

    // Apply payment filter
    if (paymentFilter !== "all") {
      const isPaid = paymentFilter === "paid"
      result = result.filter((student) => student.isPaid === isPaid)
    }

    setFilteredStudents(result)
  }

  const calculateRemainingDays = (endDate) => {
    const end = new Date(endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const handleAddStudent = () => {
    setIsAddModalOpen(true)
  }

  const handleStudentAdded = () => {
    fetchStudents()
    setIsAddModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Student Management</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>

            <button
              onClick={handleAddStudent}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
            <input
              type="text"
              placeholder="Search by name, email, phone, seat number or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        {isFilterOpen && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Slot</label>
                <select
                  value={timeSlotFilter}
                  onChange={(e) => setTimeSlotFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Time Slots</option>
                  <option value="6hr">6 Hours</option>
                  <option value="12hr">12 Hours</option>
                  <option value="24hr">24 Hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Time Slot
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Amount Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Days Remaining
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Seat Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{student.timeSlot}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${student.isPaid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                          >
                            {student.isPaid ? `₹${student.paymentAmount}` : "Unpaid"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {calculateRemainingDays(student.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {student.seatNumber || "Not Assigned"}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <AddStudentModal onClose={() => setIsAddModalOpen(false)} onStudentAdded={handleStudentAdded} />
      )}
    </div>
  )
}

export default Home

