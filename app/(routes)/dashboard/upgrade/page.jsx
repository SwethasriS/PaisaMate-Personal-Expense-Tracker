import React from 'react';

const features = [
  {
    icon: '✅',
    title: 'Unlimited Budgets',
    description: 'Manage as many budgets as you need — no limits.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Visual charts and trends to track your expenses smarter.',
  },
  {
    icon: '⏰',
    title: 'Expense Reminders',
    description: 'Set reminders for bills, due dates, and recurring expenses.',
  },
  {
    icon: '☁️',
    title: 'Cloud Sync & Backup',
    description: 'Securely access your data across devices.',
  },
  {
    icon: '🎯',
    title: 'Custom Categories & Tags',
    description: 'Organize your expenses your way.',
  },
  {
    icon: '🧾',
    title: 'Export to PDF/Excel',
    description: 'Download monthly/yearly reports instantly.',
  },
];

function page() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <span role="img" aria-label="briefcase">💼</span> Unlock Pro Features – Take Full Control of Your Finances
        </h1>
        <p className="text-gray-600 text-lg">
          Upgrade to Pro and enjoy a smarter, faster, and more powerful expense tracking experience.
        </p>
      </header>

      {/* Features Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6">What you get with Pro:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ icon, title, description }) => (
            <div key={title} className="flex items-start space-x-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl">{icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-700">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-10 text-center">
        <p className="text-2xl font-bold bg-indigo-100 inline-block px-6 py-3 rounded-lg">
          All this for just ₹29/month
        </p>
        <p className="italic text-gray-500 mt-2">
          Start your free trial today — no card required!
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <button className="bg-indigo-600 text-white rounded-xl px-6 py-3 hover:bg-indigo-700 transition-colors">
          Upgrade to Pro
        </button>
      </section>

      {/* Optional Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        <a href="#" className="underline mr-4">Terms & Conditions</a>
        <a href="mailto:support@example.com" className="underline">Contact Support</a>
      </footer>
    </div>
  );
}

export default page;
