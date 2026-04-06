import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <Navbar />
            
            <main className="px-4 pb-12">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
