import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Server, FileCode2 } from 'lucide-react';

const CodePage = () => {
  const [activeTab, setActiveTab] = useState<'backend' | 'frontend'>('backend');
  const [copied, setCopied] = useState(false);

  const backendCode = `@app.post("/predict")
def predict_price(data: LaptopInput):
    # Load model and features
    columns = model.feature_names_in_
    df = pd.DataFrame(0.0, index=[0], columns=columns)
    
    # Input Processing
    df.at[0, 'Ram'] = float(data.ram)
    df.at[0, 'Weight'] = data.weight
    
    # One-Hot Encoding logic
    if f'Company_{data.company}' in columns: 
        df.at[0, f'Company_{data.company}'] = 1.0
        
    # Prediction
    prediction = model.predict(df)[0]
    return {"predicted_price": round(float(prediction), 2)}`;

  const frontendCode = `const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        const data = await response.json();
        setPredictedPrice(data.predicted_price);
    } else {
        toast.error('Prediction failed!');
    }
};`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'backend' ? backendCode : frontendCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 fade-in pb-12">
      
      {/* යාවත්කාලීන කළ Header කොටස 
        (හරියටම About.tsx හි පෙනුමට සමාන කර ඇත)
      */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
          Source Code
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Explore the key logic and architecture behind the intelligent laptop prediction system.
        </p>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6 border-b">
          <button
            onClick={() => setActiveTab('backend')}
            className={`pb-3 px-2 font-semibold flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'backend' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <Server size={18} />
            FastAPI Backend
          </button>
          <button
            onClick={() => setActiveTab('frontend')}
            className={`pb-3 px-2 font-semibold flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'frontend' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-blue-500'
            }`}
          >
            <FileCode2 size={18} />
            React Frontend
          </button>
        </div>

        {/* Code Display Area */}
        <div className="relative group">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-lg backdrop-blur-sm transition-all z-10"
            title="Copy to clipboard"
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
          </button>

          {/* Syntax Highlighter */}
          <div className="rounded-xl overflow-hidden shadow-inner bg-[#1e1e1e]">
            <SyntaxHighlighter 
              language={activeTab === 'backend' ? 'python' : 'typescript'} 
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.6',
                background: 'transparent'
              }}
              showLineNumbers={true}
            >
              {activeTab === 'backend' ? backendCode : frontendCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Want to see the full project?</h3>
          <p className="text-gray-600 mb-6">Explore the complete architecture and model training notebooks on GitHub.</p>
          <a 
            href="https://github.com/SachinKalhara/Laptop-Price-Predictor.git" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium px-8 py-3 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            View Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default CodePage;