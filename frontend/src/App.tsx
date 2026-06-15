import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer'; // අලුතින් Footer එක import කිරීම
import Home from './pages/Home';
import About from './pages/About';
import CodePage from './pages/CodePage';

function App() {
  return (
    <Router>
      {/* වෙබ් අඩවියේ සම්පූර්ණ උස ආවරණය කිරීමට min-h-screen සහ flex flex-col යොදා ඇත */}
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        
        <Toaster 
          position="bottom-right" 
          reverseOrder={false} 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <Navbar />
        
        {/* flex-grow යෙදීමෙන් පිටුවේ මැද කොටස අවශ්‍ය පරිදි දිග හැරේ, එවිට Footer එක නිතරම පහළින් පිහිටයි */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/code" element={<CodePage />} />
          </Routes>
        </main>

        {/* Footer එක මෙතැනට එක් කිරීම */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;