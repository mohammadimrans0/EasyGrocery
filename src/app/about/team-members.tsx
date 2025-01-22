import Image from "next/image";

const teamMembers = [
  { name: "John Doe", role: "CEO & Founder", image: "/images/team-members/employee1.jpeg" },
  { name: "Jane Smith", role: "CTO", image: "/images/team-members/employee2.jpeg" },
  { name: "Mike Johnson", role: "Head of Design", image: "/images/team-members/employee3.jpeg" },
  { name: "Sarah Brown", role: "Head of Marketing", image: "/images/team-members/employee4.jpeg" },
];

export default function TeamMembers() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              width={300} // Replace with appropriate width
              height={500} // Replace with appropriate height
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
