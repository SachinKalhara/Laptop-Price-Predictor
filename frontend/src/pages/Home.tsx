import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 

const Home = () => {
  const [formData, setFormData] = useState({
    ram: '',
    weight: '', // මෙය දැන් සාමාන්‍ය හිස් string එකක් ලෙස ක්‍රියා කරයි
    touchscreen: 0,
    ips: 0,
    company: '',
    typename: '',
    opsys: '',
    cpuname: '',
    gpuname: ''
  });

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formData.company === 'Apple') {
      setFormData((prev) => ({ ...prev, opsys: 'Mac' }));
    } else if (formData.company !== '' && formData.opsys === 'Mac') {
      setFormData((prev) => ({ ...prev, opsys: '' }));
    }
  }, [formData.company]);

  useEffect(() => {
    if (formData.cpuname === 'AMD' && formData.gpuname === 'Intel') {
      setFormData((prev) => ({ ...prev, gpuname: '' }));
    }
  }, [formData.cpuname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Submit කරන අවස්ථාවේදී Weight එක නිවැරදි දශමයක්දැයි පරීක්ෂා කිරීම
    const sanitizedWeight = formData.weight.replace(',', '.'); // කොමාව තිබුණොත් තිතක් බවට පත් කරයි
    const parsedWeight = parseFloat(sanitizedWeight);

    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      toast.error('Please enter a valid number for Weight (e.g. 1.5)');
      return; // දත්ත වැරදි නම් Backend එකට යාම මෙතැනින්ම නතර කරයි
    }

    setLoading(true);
    setPredictedPrice(null);

    try {
      const payload = {
        ...formData,
        ram: parseInt(formData.ram),
        weight: parsedWeight // පරීක්ෂා කළ නිවැරදි දශම අගය මෙතැනින් යවයි
      };

      const response = await fetch('https://sachinkalharalearns-laptop-price-api.hf.space/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('API connection failed!');
      }

      const data = await response.json();
      const priceInEuros = data.predicted_price;

      try {
        const currencyResponse = await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD');
        const currencyData = await currencyResponse.json();
        const exchangeRate = currencyData.rates.USD;
        
        const priceInUSD = priceInEuros * exchangeRate;
        setPredictedPrice(priceInUSD);
        toast.success('Price predicted successfully!');

      } catch (currencyErr) {
        console.warn("Currency API failed", currencyErr);
        setPredictedPrice(priceInEuros * 1.08); 
        toast.success('Price predicted (Using fallback exchange rate)');
      }

    } catch (err) {
      console.error(err);
      toast.error('Unable to connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const minPrice = predictedPrice ? Math.round(predictedPrice * 0.95) : 0;
  const maxPrice = predictedPrice ? Math.round(predictedPrice * 1.05) : 0;

  return (
    <div className="max-w-4xl mx-auto pb-12 fade-in">
      <div className="text-center py-12 px-4 mb-8 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-3xl shadow-xl text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Smart Laptop Price <span className="text-blue-300">Predictor</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto opacity-90">
          Enter the specifications of your dream laptop. Our Machine Learning (AI) model will estimate its current Global market value in USD ($).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* System Info */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <span className="text-2xl">💻</span>
            <h2 className="text-xl font-bold text-gray-800">System Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Company / Brand</label>
              <select name="company" required value={formData.company} onChange={handleChange} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option value="" disabled>Select Brand</option>
                <option value="Apple">Apple</option>
                <option value="Acer">Acer</option>
                <option value="Asus">Asus</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Lenovo">Lenovo</option>
                <option value="MSI">MSI</option>
                <option value="Toshiba">Toshiba</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Type Name</label>
              <select name="typename" required value={formData.typename} onChange={handleChange} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option value="" disabled>Select Type</option>
                <option value="2 in 1 Convertible">2 in 1 Convertible</option>
                <option value="Gaming">Gaming</option>
                <option value="Netbook">Netbook</option>
                <option value="Notebook">Notebook</option>
                <option value="Ultrabook">Ultrabook</option>
                <option value="Workstation">Workstation</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Operating System</label>
              <select 
                name="opsys" 
                required 
                value={formData.opsys} 
                onChange={handleChange} 
                disabled={formData.company === 'Apple'} 
                className={`px-4 py-2.5 border rounded-lg outline-none transition-all ${
                  formData.company === 'Apple' 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200' 
                    : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500'
                }`}
              >
                <option value="" disabled>Select OS</option>
                <option value="Windows">Windows</option>
                <option value="Mac" disabled={formData.company !== 'Apple' && formData.company !== ''}>Mac</option>
                <option value="Linux">Linux</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <span className="text-2xl">⚡</span>
            <h2 className="text-xl font-bold text-gray-800">Performance Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">CPU Brand</label>
              <select name="cpuname" required value={formData.cpuname} onChange={handleChange} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                <option value="" disabled>Select CPU</option>
                <option value="Intel Core i3">Intel Core i3</option>
                <option value="Intel Core i5">Intel Core i5</option>
                <option value="Intel Core i7">Intel Core i7</option>
                <option value="AMD">AMD</option>
                <option value="Other">Other</option>
              </select> 
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">RAM Capacity (GB)</label>
              <input type="number" name="ram" required min="2" max="64" placeholder="e.g. 8" value={formData.ram} onChange={handleChange} className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">GPU Brand</label>
              <select 
                name="gpuname" 
                required 
                value={formData.gpuname} 
                onChange={handleChange} 
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="" disabled>Select GPU</option>
                <option value="Intel" disabled={formData.cpuname === 'AMD'}>Intel</option>
                <option value="AMD">AMD</option>
                <option value="Nvidia" disabled={formData.company === 'Apple'}>Nvidia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display & Physical Properties */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <span className="text-2xl">🖥️</span>
            <h2 className="text-xl font-bold text-gray-800">Display & Physical Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Weight Input - දැන් කිසිදු අවහිරයකින් තොරව ටයිප් කළ හැක */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
              <input 
                type="text" 
                name="weight" 
                required 
                placeholder="e.g. 1.5" 
                value={formData.weight} 
                onChange={handleChange} 
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" name="touchscreen" onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all" />
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Touchscreen Display</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" name="ips" onChange={handleChange} className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all" />
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">IPS Panel</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button type="submit" disabled={loading} className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg shadow-blue-200 flex justify-center items-center gap-3 text-lg">
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Data...</span>
              </>
            ) : (
              'Predict Laptop Price (USD)'
            )}
          </button>
        </div>
      </form>

      {predictedPrice !== null && (
        <div className="mt-10 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-8 text-center shadow-lg transform transition-all hover:scale-105 duration-300">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold tracking-wide mb-4 uppercase">
            Prediction Successful
          </div>
          <h3 className="text-xl text-gray-700 font-semibold mb-2">Estimated Value of this Laptop</h3>
          
          <div className="flex justify-center items-baseline gap-2 mt-4">
            <span className="text-4xl md:text-5xl font-extrabold text-emerald-600">$ {minPrice}</span>
            <span className="text-2xl text-gray-500 font-medium">-</span>
            <span className="text-4xl md:text-5xl font-extrabold text-emerald-600">$ {maxPrice}</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Converted to USD using real-time exchange rates. Values may vary by approximately 5%.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;