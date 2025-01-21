export default function CompanyHistory() {
    return (
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our History</h2>
          <div className="prose max-w-none">
            <p>
              Founded in 2010, our company began as a small startup with a big vision. We set out to revolutionize the way
              people interact with technology, focusing on creating intuitive and user-friendly solutions.
            </p>
            <p>
              Over the years, we've grown from a team of five passionate individuals to a global organization with offices
              in multiple countries. Our journey has been marked by innovation, perseverance, and a commitment to
              excellence.
            </p>
            <p>
              Today, we're proud to be at the forefront of technological advancements, continually pushing the boundaries
              of what's possible and striving to make a positive impact on the world.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">Founded: 2010</div>
            <div className="text-sm text-gray-600">Employees: 500+</div>
            <div className="text-sm text-gray-600">Global Offices: 5</div>
          </div>
        </div>
      </section>
    )
  }
  
  