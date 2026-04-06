import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadCloud, Code, FileCode2, BookOpen, ScanLine } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          AI-Powered Code Analysis Engine
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Automatic Code <br />
          <span className="gradient-text">Plagiarism Detector</span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload two or more code files and detect similarity instantly using our advanced AI-based comparison algorithm.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/upload"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
          >
            <UploadCloud className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Upload Files
          </Link>
          <Link
            to="/results"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold shadow-lg border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
          >
            <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Try Sample Files
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 z-10 w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FileCode2 className="w-6 h-6 text-blue-500" />,
              title: "Multi-Language Support",
              desc: "Compare C++, Java, Python, and JavaScript code seamlessly.",
            },
            {
              icon: <ScanLine className="w-6 h-6 text-purple-500" />,
              title: "Deep Similarity Analysis",
              desc: "Get overall percentage match with highlighted code blocks.",
            },
            {
              icon: <BookOpen className="w-6 h-6 text-pink-500" />,
              title: "Detailed Reports",
              desc: "Download comprehensive plagiarism reports in a single click.",
            },
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-6 text-left hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
