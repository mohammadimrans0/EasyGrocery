import CompanyHistory from "./company-history"
import MissionStatement from "./mission-statement"
import TeamMembers from "./team-members"
import CoreValues from "./core-values"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">About Our Company</h1>
        <div className="space-y-16">
          <CompanyHistory />
          <MissionStatement />
          <TeamMembers />
          <CoreValues />
        </div>
      </div>
    </div>
  )
}

