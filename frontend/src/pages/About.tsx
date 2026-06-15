import { Link } from 'react-router-dom';
import { BrainCircuit, Database, Code2, Target, Activity, ArrowLeft } from 'lucide-react';

const About = () => {
  // TypeScript Best Practice: Data extraction for cleaner JSX
  const techStack = [
    { name: 'React 18', role: 'Frontend UI', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'TypeScript', role: 'Type Safety', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { name: 'Tailwind CSS', role: 'Styling', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { name: 'FastAPI', role: 'Backend API', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Scikit-learn', role: 'Machine Learning', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { name: 'Pandas', role: 'Data Processing', color: 'bg-purple-50 text-purple-700 border-purple-200' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 fade-in pb-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
          Behind the Predictor
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Discover the architecture, algorithms, and technology stack that power this intelligent laptop valuation system.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Machine Learning Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <BrainCircuit size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">The Algorithm</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Powered by a <strong>Random Forest Regressor</strong>, the system analyzes complex hardware combinations. It evaluates RAM, processing power, and brand value to estimate the base European market price, dynamically converting it to USD via real-time exchange APIs.
          </p>
        </div>

        {/* Dataset Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Database size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">The Dataset</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Trained on a robust dataset of over <strong>1,300 real-world laptop configurations</strong>. The data pipeline includes rigorous outlier removal and One-Hot Encoding, allowing the model to accurately process categorical variables like OS and GPU brands.
          </p>
        </div>
      </div>

      {/* Model Performance Highlight */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-blue-300 font-semibold tracking-wider uppercase text-sm">
              <Target size={18} />
              <span>Model Accuracy</span>
            </div>
            <h3 className="text-3xl font-bold">Predicting with Confidence</h3>
            <p className="text-blue-100 text-sm md:text-base opacity-90 leading-relaxed">
              The model achieves an impressive R² score, demonstrating high reliability in predicting hardware value despite the volatile nature of electronics markets.
            </p>
          </div>
          
          {/* Huge Stat Display */}
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 min-w-[200px]">
            <div className="flex items-start">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-emerald-300">84</span>
              <span className="text-2xl font-bold text-emerald-300 mt-1">%</span>
            </div>
            <span className="text-sm font-medium tracking-widest text-blue-200 mt-2 uppercase">R² Score</span>
          </div>
        </div>
        {/* Background Decorative Icon */}
        <Activity className="absolute -bottom-10 -right-10 text-white/5" size={250} />
      </div>

      {/* Tech Stack Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <Code2 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Technology Stack</h2>
        </div>
        
        {/* Dynamic Grid for Tech Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div key={tech.name} className={`p-4 rounded-xl border ${tech.color} bg-opacity-50 hover:bg-opacity-100 transition-all cursor-default`}>
              <h4 className="font-bold">{tech.name}</h4>
              <span className="text-xs font-medium uppercase tracking-wider opacity-80">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action (CTA) */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} />
          Try the Predictor
          
        </Link>
        <Link 
          to="/code" 
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-3.5 rounded-xl font-semibold transition-all w-full sm:w-auto justify-center"
        >
          <Code2 size={18} className="text-gray-500" />
          View Source Code
        </Link>
      </div>
    </div>
  );
};

export default About;