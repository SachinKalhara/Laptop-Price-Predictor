import { Link } from 'react-router-dom';
import { Laptop, Mail, Heart } from 'lucide-react'; 
import { FaGithub, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 mt-16 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-800 pb-8 items-start">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <Laptop size={24} className="text-blue-500" />
              <span className="text-xl font-bold tracking-tight">Laptop Predictor</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              An intelligent machine learning system designed to estimate the real-time market value of laptops based on global hardware trends.
            </p>
          </div>

          {/* 2. Quick Links Section */}
          <div className="space-y-4 md:pl-16 lg:pl-20">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm mt-1">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> About Project
                </Link>
              </li>
              <li>
                <Link to="/code" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Source Code
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Connect Section - නිවැරදි කළ පෙළගැස්ම */}
          {/* md:justify-self-end මඟින් මුළු කොටසම තිරයේ දකුණු පසට ගෙන යයි. නමුත් ඇතුළත අකුරු සාමාන්‍ය පරිදි වමට පෙළගැසේ. */}
          <div className="space-y-4 md:justify-self-end">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm mt-1">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/ඔබගේ-username" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/ඔබගේ-username" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:ඔබගේ@email.com" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {currentYear} Smart Laptop Predictor. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Built with <Heart size={14} className="text-red-500" /> by 
            <span className="text-gray-300 font-medium">Your Name</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;