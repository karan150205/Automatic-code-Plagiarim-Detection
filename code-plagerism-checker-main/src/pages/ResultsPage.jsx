import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, UploadCloud, ChevronRight, Activity } from 'lucide-react';

const ResultsPage = () => {
  const [similarity, setSimilarity] = useState(0);
  
  // Dummy data representing plagiarism report
  const targetSimilarity = 78;
  const matchedLines = 120;
  const unmatchedLines = 34;
  
  const codeFile1 = `function calculateSum(a, b) {\n  let result = a + b;\n  return result;\n}\n\n// Added a loop\nfor(let i=0; i<10; i++) {\n  console.log(i);\n}\n\nlet x = 10;`.split('\n');
  
  const codeFile2 = `function getSum(x, y) {\n  let sum = x + y;\n  return sum;\n}\n\n// Loop added here\nfor(let j=0; j<10; j++) {\n  console.log(j);\n}\n\nlet z = 20;`.split('\n');

  // Hardcode matched indices for demonstration
  const matchedIndices1 = [0, 1, 2, 3, 5, 6, 7];
  const matchedIndices2 = [0, 1, 2, 3, 5, 6, 7];

  useEffect(() => {
    // Animate similarity meter
    const interval = setInterval(() => {
      setSimilarity(prev => {
        if (prev >= targetSimilarity) {
          clearInterval(interval);
          return targetSimilarity;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetSimilarity]);

  // Color logic for meter
  const meterColor = similarity > 70 ? 'text-red-500' : similarity > 40 ? 'text-yellow-500' : 'text-green-500';
  const barColor = similarity > 70 ? 'bg-red-500' : similarity > 40 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold dark:text-white flex items-center gap-3">
            <Activity className={`w-8 h-8 ${meterColor}`} /> Analysis Results
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Comparison between Main.js and App.js</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all">
            <Download className="w-5 h-5" /> Download Report
          </button>
          <Link to="/upload" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-indigo-600/30 shadow-lg transition-all">
            <UploadCloud className="w-5 h-5" /> New Analysis
          </Link>
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="lg:col-span-2 glass-card p-8 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-1">Overall Similarity</h3>
              <p className={`text-5xl font-black ${meterColor}`}>{similarity}%</p>
            </div>
            {similarity > 70 && (
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-full text-sm">
                High Risk
              </span>
            )}
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className={`h-4 rounded-full progress-bar-fill ${barColor}`} 
              style={{ width: `${similarity}%` }}
            ></div>
          </div>
        </motion.div>

        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Matched Lines</h3>
          <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{matchedLines}</p>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-center">
          <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-2">Unmatched Lines</h3>
          <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{unmatchedLines}</p>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="glass-card overflow-hidden">
        <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg dark:text-white">Side-by-side Comparison</h3>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="flex items-center gap-2 text-red-500 dark:text-red-400">
              <span className="w-3 h-3 bg-red-100 border border-red-300 dark:bg-red-900/40 dark:border-red-800 rounded-full inline-block"></span> Matched
            </span>
            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="w-3 h-3 bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 rounded-full inline-block"></span> Unique
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
            <h4 className="font-bold text-sm text-slate-500 dark:text-slate-400 mb-4 px-2 tracking-wider">FILE 1 (Main.js)</h4>
            <pre className="text-sm font-mono leading-relaxed">
              {codeFile1.map((line, i) => (
                <div 
                  key={i} 
                  className={`px-2 py-0.5 rounded transition-colors flex gap-4 ${
                    matchedIndices1.includes(i) 
                      ? 'bg-red-100/60 dark:bg-red-900/30' 
                      : 'bg-green-50/60 dark:bg-green-900/20'
                  }`}
                >
                  <span className="w-6 text-right text-slate-400 select-none opacity-50">{i + 1}</span>
                  <span className={matchedIndices1.includes(i) ? 'text-red-900 dark:text-red-200' : 'text-green-900 dark:text-green-300'}>{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto relative">
            <h4 className="font-bold text-sm text-slate-500 dark:text-slate-400 mb-4 px-2 tracking-wider">FILE 2 (App.js)</h4>
            <div className="absolute top-1/2 -left-3 hidden md:flex items-center justify-center w-6 h-6 bg-indigo-500 text-white rounded-full shadow-lg z-10">
              <ChevronRight className="w-4 h-4" />
            </div>
            <pre className="text-sm font-mono leading-relaxed">
              {codeFile2.map((line, i) => (
                <div 
                  key={i} 
                  className={`px-2 py-0.5 rounded transition-colors flex gap-4 ${
                    matchedIndices2.includes(i) 
                      ? 'bg-red-100/60 dark:bg-red-900/30' 
                      : 'bg-green-50/60 dark:bg-green-900/20'
                  }`}
                >
                  <span className="w-6 text-right text-slate-400 select-none opacity-50">{i + 1}</span>
                  <span className={matchedIndices2.includes(i) ? 'text-red-900 dark:text-red-200' : 'text-green-900 dark:text-green-300'}>{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
