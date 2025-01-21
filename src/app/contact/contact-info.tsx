import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function ContactInfo() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FiMapPin className="h-5 w-5 text-indigo-500" />
          <span className="text-gray-700">123 Chawkbazar, Chittagong, BANGLADESH 12345</span>
        </div>
        <div className="flex items-center space-x-3">
          <FiPhone className="h-5 w-5 text-indigo-500" />
          <span className="text-gray-700">(123) 456-7890</span>
        </div>
        <div className="flex items-center space-x-3">
          <FiMail className="h-5 w-5 text-indigo-500" />
          <span className="text-gray-700">easygrocery@example.com</span>
        </div>
      </div>
    </div>
  )
}

