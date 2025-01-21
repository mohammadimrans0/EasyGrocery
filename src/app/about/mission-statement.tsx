import { FiTarget } from "react-icons/fi"

export default function MissionStatement() {
  return (
    <section className="bg-indigo-700 rounded-lg shadow-lg overflow-hidden text-white">
      <div className="p-8">
        <div className="flex items-center mb-4">
          <FiTarget className="h-8 w-8 mr-2" />
          <h2 className="text-3xl font-bold">Our Mission</h2>
        </div>
        <p className="text-xl leading-relaxed">
          To empower individuals and businesses through innovative technology solutions, fostering growth, efficiency,
          and positive change in the world.
        </p>
      </div>
    </section>
  )
}

