import React, { useState } from 'react';
import {
  FULL_PYTHON_SCRIPT,
  PYTHON_CORE_EXPLANATIONS
} from '../pythonCode';
import {
  Code2,
  Copy,
  Check,
  Download,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PythonGuide: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanations' | 'sourceCode'>('explanations');
  const [expandedSection, setExpandedSection] = useState<string>('componentes');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(FULL_PYTHON_SCRIPT);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([FULL_PYTHON_SCRIPT], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora_igor_almeida.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#12151c] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-wide flex items-center gap-2">
              Aprenda a Programar em Python
              <span className="text-[10px] font-mono uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                Guia Completo
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Conceitos didáticos para quem está dando os primeiros passos no código
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setActiveTab('explanations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'explanations'
                ? 'bg-red-500 text-white shadow-sm shadow-red-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Explicações Didáticas
          </button>
          <button
            onClick={() => setActiveTab('sourceCode')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'sourceCode'
                ? 'bg-red-500 text-white shadow-sm shadow-red-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Código Python (.py)
          </button>
        </div>
      </div>

      {/* Content 1: Explanations (Answers to the 3 questions) */}
      {activeTab === 'explanations' && (
        <div className="mt-5 space-y-4">
          {PYTHON_CORE_EXPLANATIONS.map((section) => {
            const isExpanded = expandedSection === section.id;
            return (
              <div
                key={section.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden transition-all duration-200 hover:border-zinc-700"
              >
                <button
                  type="button"
                  onClick={() => setExpandedSection(isExpanded ? '' : section.id)}
                  className="w-full p-4 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition-transform" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-red-400 tracking-wider font-semibold block mb-0.5">
                        {section.badge}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-red-300 transition-colors">
                        {section.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-1 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-zinc-800/60 bg-zinc-950/40 space-y-3">
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-red-500/30 transition-all"
                      >
                        <h5 className="text-xs font-semibold text-red-400 font-mono flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {item.term}
                        </h5>
                        <p className="text-xs text-zinc-300 leading-relaxed pl-3">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Content 2: Python Code Viewer */}
      {activeTab === 'sourceCode' && (
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-mono text-zinc-300">
              <Code2 className="w-4 h-4 text-red-500" />
              calculadora.py
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:text-white transition-colors"
                title="Copiar código Python"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 font-medium">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors font-medium"
                title="Baixar arquivo calculadora.py"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar .py</span>
              </button>
            </div>
          </div>

          <pre className="rounded-2xl bg-[#090b0e] border border-zinc-800 p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[460px] leading-relaxed shadow-inner">
            <code>{FULL_PYTHON_SCRIPT}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
