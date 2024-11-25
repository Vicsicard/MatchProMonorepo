const Placeholder = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Resume Tailoring
        </h1>
        <p className="text-gray-600 mb-6">
          Our Resume Tailoring feature is coming soon! We're building a smart tool that will help you optimize your resume for specific job postings using AI and industry best practices.
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-900 mb-2">Coming Features</h2>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• AI-powered keyword optimization</li>
              <li>• Job description analysis</li>
              <li>• ATS compatibility check</li>
              <li>• Industry-specific suggestions</li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
