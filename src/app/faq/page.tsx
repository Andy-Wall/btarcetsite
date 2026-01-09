export default function FAQPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-center mb-8">
            Frequently Asked Questions
          </h1>

          <div className="space-y-8">
            {/* General Questions Section */}
            <section aria-labelledby="general-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="general-heading" className="text-2xl font-semibold mb-6">General Questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      What is BTARCET?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      BTARCET stands for Bosch Building Technologies Architecture Engineering Team. 
                      We are dedicated to advancing the architectural excellence of software, systems, 
                      solutions, and cloud services for commercial building technologies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      Who is part of BTARCET?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      BTARCET comprises architects, engineers, and technical leaders from across 
                      Bosch Building Technologies who specialize in software architecture, systems 
                      design, cloud services, and edge computing solutions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      What technologies does BTARCET work with?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We work across the full technology stack including cloud services, IoT device 
                      integration, edge computing platforms, building management systems, and 
                      microservices architectures. Our focus includes both cloud-based and on-premises 
                      solutions for commercial buildings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Board Sessions Section */}
            <section aria-labelledby="sessions-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="sessions-heading" className="text-2xl font-semibold mb-6">Board Sessions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      How often do board sessions occur?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      BTARCET conducts regular board sessions throughout the year, typically monthly, 
                      with approximately 12 sessions per year. Each session focuses on specific 
                      architectural topics, emerging technologies, or critical technical decisions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      What topics are covered in board sessions?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Board sessions cover a wide range of topics including API design patterns, 
                      microservices architecture, cloud-native development, security best practices, 
                      IoT integration strategies, edge computing solutions, and architectural decision 
                      records. Each session is designed to address current challenges and future 
                      technology directions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      Can I attend a board session?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Board sessions are typically open to members of the Bosch Building Technologies 
                      organization. If you&apos;re interested in attending or presenting at a session, 
                      please reach out to your team lead or the BTARCET team directly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      Are session recordings available?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Yes, recordings and materials from past sessions are typically made available 
                      to team members. You can find links to session resources on the individual 
                      session detail pages.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Collaboration Section */}
            <section aria-labelledby="collaboration-heading">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h2 id="collaboration-heading" className="text-2xl font-semibold mb-6">Collaboration &amp; Engagement</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      How can I propose a topic for discussion?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We welcome topic proposals from all team members. If you have an architectural 
                      challenge, emerging technology, or best practice you&apos;d like to discuss, please 
                      contact the BTARCET team with your proposal. We review all submissions and 
                      schedule topics based on priority and relevance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      How do I get architectural guidance for my project?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      BTARCET provides architectural guidance through board sessions, one-on-one 
                      consultations, and architecture reviews. Reach out to the team through your 
                      organization&apos;s standard channels to request support or schedule an architecture 
                      review for your project.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      Where can I find architectural standards and best practices?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Architectural standards, best practices, and decision records are documented 
                      and shared through board sessions and internal documentation repositories. 
                      Key standards are discussed and refined during board sessions, with recordings 
                      and materials available for reference.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
