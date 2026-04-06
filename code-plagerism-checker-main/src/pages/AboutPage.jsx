import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Code2, Users, Building, Trophy, Briefcase } from 'lucide-react';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-white">
            About <span className="gradient-text">AutoDetect</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our mission is to maintain academic integrity and code originality through advanced AI-powered analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="glass-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white">What is it?</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              AutoDetect is an advanced Automatic Code Plagiarism Detector designed to identify similarities and potential copying between multiple source code files. It analyzes logic, structure, and syntax beyond mere text matching to find hidden plagiarism even when variable names or comments are changed.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                <Cpu className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white">How it works</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our system implements complex abstract syntax tree (AST) comparisons and AI-based sequence alignment algorithms. It normalizes code, removes noise like whitespace and comments, and structural changes to provide an accurate similarity percentage and line-by-line highlight.
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="glass-card p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10 rotate-12 flex mix-blend-overlay">
            <Code2 className="w-64 h-64 text-slate-900 dark:text-white" />
          </div>
          
          <h3 className="text-2xl font-bold dark:text-white mb-6 relative z-10">Supported Languages</h3>
          <div className="flex flex-wrap gap-4 relative z-10">
            {['C++', 'Java', 'Python', 'JavaScript'].map((lang) => (
              <span key={lang} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-slate-700 dark:text-slate-200 shadow-sm">
                {lang}
              </span>
            ))}
            <span className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg font-medium text-slate-500 dark:text-slate-400">
              More coming soon...
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold dark:text-white mb-6 text-center">Use Cases</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border-t-4 border-t-blue-500 hover:-translate-y-2 transition-transform cursor-pointer">
              <Building className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-lg dark:text-white mb-2">Universities</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Automate homework and assignment grading to ensure students submit their own original work.
              </p>
            </div>
            
            <div className="glass-card p-6 border-t-4 border-t-yellow-500 hover:-translate-y-2 transition-transform cursor-pointer">
              <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
              <h4 className="font-bold text-lg dark:text-white mb-2">Coding Contests</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Quickly screen hackathon and competitive programming submissions to maintain fair play.
              </p>
            </div>
            
            <div className="glass-card p-6 border-t-4 border-t-green-500 hover:-translate-y-2 transition-transform cursor-pointer">
              <Briefcase className="w-8 h-8 text-green-500 mb-4" />
              <h4 className="font-bold text-lg dark:text-white mb-2">Recruiters</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Verify the authenticity of take-home coding assessments from prospective hires.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
