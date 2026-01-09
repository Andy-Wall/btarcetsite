export default function AboutPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-center mb-8">
            About BTARCET
          </h1>

          <div className="space-y-8">
            {/* Purpose Section */}
            <section aria-labelledby="purpose-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="purpose-heading" className="mb-4">Our Purpose</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The Bosch Building Technologies Architecture Engineering Team (BTARCET) is dedicated to advancing 
                  the architectural excellence of software, systems, solutions, and cloud services for commercial 
                  building technologies.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  We drive innovation in building automation, IoT device integration, and edge computing solutions 
                  that make buildings smarter, more efficient, and more sustainable.
                </p>
              </div>
            </section>

            {/* Scope Section */}
            <section aria-labelledby="scope-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="scope-heading" className="mb-4">Our Scope</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  BTARCET focuses on the complete technology stack for Bosch Building Technologies, encompassing:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
                  <li>Software architecture for building management systems</li>
                  <li>Systems architecture for integrated building solutions</li>
                  <li>Solutions architecture for customer-facing applications</li>
                  <li>Cloud services and infrastructure design</li>
                  <li>On-premises edge compute layer for commercial buildings</li>
                  <li>IoT device integration and communication protocols</li>
                  <li>Security, scalability, and performance optimization</li>
                </ul>
              </div>
            </section>

            {/* Practices Section */}
            <section aria-labelledby="practices-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="practices-heading" className="mb-4">Our Practices</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We maintain architectural excellence through a structured approach to knowledge sharing and 
                  collaborative decision-making:
                </p>
                
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Architecture Board Sessions
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We conduct regular board sessions throughout the year, focusing on critical architectural topics, 
                  emerging technologies, and best practices. Each session brings together our architecture team to 
                  discuss, debate, and align on key technical decisions.
                </p>

                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Core Principles
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-gray-300">
                  <li><strong>Collaborative Design:</strong> We believe in bringing diverse perspectives together to create robust, well-considered solutions</li>
                  <li><strong>Continuous Learning:</strong> Technology evolves rapidly, and we stay ahead through ongoing education and knowledge sharing</li>
                  <li><strong>Standards &amp; Best Practices:</strong> We establish and maintain architectural standards that ensure consistency and quality across projects</li>
                  <li><strong>Security First:</strong> Security is built into every architectural decision from the ground up</li>
                  <li><strong>Sustainable Innovation:</strong> We prioritize solutions that are not only innovative but also maintainable and sustainable long-term</li>
                </ul>

                <h3 className="text-lg font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100">
                  Engagement Model
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The team operates through monthly architecture board sessions covering topics from API design and 
                  microservices to cloud-native patterns, security architecture, and emerging technologies. Session 
                  materials including slides, recordings, and decision records are made available to support ongoing 
                  reference and implementation.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
