import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin size={24} className="text-primary" />
          <span className="text-gray-700">123 Chawkbazar, Chittagong, BANGLADESH 12345</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-gray-700">(123) 456-7890</span>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-gray-700">easygrocery@example.com</span>
        </div>
      </div>
    </div>
  )
}

