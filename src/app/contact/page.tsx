import ContactForm from "./contact-form"
import ContactInfo from "./contact-info"
import Map from "./map"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ContactInfo />
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

