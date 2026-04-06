import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File as FileIcon, Trash2, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const supportedFormats = ['.cpp', '.java', '.py', '.js', '.txt'];

  const validateAndAddFiles = (newFiles) => {
    let validFiles = [];
    let invalidCount = 0;

    Array.from(newFiles).forEach(file => {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (supportedFormats.includes(ext) || file.type === 'text/plain') {
        validFiles.push(file);
      } else {
        invalidCount++;
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      showToast(`${validFiles.length} file(s) added successfully`, 'success');
    }
    
    if (invalidCount > 0) {
      showToast(`${invalidCount} invalid file(s) ignored`, 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsHovering(false);
    validateAndAddFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsHovering(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsHovering(false);
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCompare = () => {
    if (files.length < 2) {
      showToast('Please upload at least 2 files to compare', 'error');
      return;
    }
    // Simulate loading and redirect
    setToast({ message: 'Analyzing files...', type: 'success' });
    setTimeout(() => {
      navigate('/results');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100'
                : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upload Source Code</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Supported formats: {supportedFormats.join(', ')}
        </p>
      </div>

      <div 
        className={`glass-card p-10 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 ${
          isHovering 
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-slate-300 dark:border-slate-600'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-6">
          <UploadCloud className={`w-10 h-10 ${isHovering ? 'text-indigo-600 animate-bounce' : 'text-indigo-500'}`} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Drag & Drop files here</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Or click below to browse your computer</p>
        
        <label className="cursor-pointer bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-colors">
          Browse Files
          <input 
            type="file" 
            multiple 
            onChange={handleFileInput} 
            className="hidden"
            accept=".cpp,.java,.py,.js,.txt,text/plain"
          />
        </label>
      </div>

      {files.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold dark:text-white">Selected Files ({files.length})</h3>
            <button 
              onClick={handleCompare}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
            >
              <PlayCircle className="w-5 h-5"/> Compare Now
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {files.map((file, idx) => (
                <motion.div
                  key={idx + file.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">
                      <FileIcon className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm truncate dark:text-slate-200" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formatSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFile(idx)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadPage;
