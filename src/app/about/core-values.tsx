import { FiCheckCircle } from "react-icons/fi";

const coreValues = [
  { title: "Innovation", description: "We constantly seek new and better ways to solve problems and create value." },
  {
    title: "Integrity",
    description: "We uphold the highest standards of honesty and ethical behavior in all our actions.",
  },
  { title: "Collaboration", description: "We believe in the power of teamwork and fostering strong partnerships." },
  {
    title: "Excellence",
    description: "We strive for the highest quality in everything we do, always aiming to exceed expectations.",
  },
]

export default function CoreValues() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coreValues.map((value) => (
          <div key={value.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
              </div>
              <p className="text-gray-600">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

