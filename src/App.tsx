import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { HistoryPanel } from './components/HistoryPanel';
import { PythonGuide } from './components/PythonGuide';
import { PythonSimulator } from './components/PythonSimulator';
import { Footer } from './components/Footer';
import { useCalculationHistory } from './hooks/useCalculationHistory';
import {
  Calculator as CalcIcon,
  BookOpen,
  Terminal,
  History,
  Sparkles,
  Instagram,
  Globe
} from 'lucide-react';

export default function App() {
  const { history, addCalculation, clearHistory, removeCalculation } = useCalculationHistory();
  const [selectedResult, setSelectedResult] = useState<number | string | null>(null);
  const [activeView, setActiveView] = useState<'calc' | 'learn' | 'simulator'>('calc');
  const [showMobileHistory, setShowMobileHistory] = useState<boolean>(false);

  const handleCalculationComplete = (
    num1: number,
    operation: '+' | '-' | '×' | '÷' | '%',
    num2: number,
    expression: string,
    result: number | string
  ) => {
    addCalculation(num1, operation, num2, expression, result);
  };

  const handleSelectHistoryResult = (val: number | string) => {
    setSelectedResult(val);
    setActiveView('calc');
    setShowMobileHistory(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d11] text-zinc-100 selection:bg-red-500 selection:text-white relative overflow-x-hidden">
      {/* Subtle background red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Navigation & Header */}
      <header className="w-full border-b border-zinc-800/80 bg-[#0d0f14]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30">
              <CalcIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
              CALCULADORA <span className="text-red-500 font-mono">PYTHON</span>
            </h1>
          </div>

          {/* Navigation Pill Tabs */}
          <nav className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setActiveView('calc')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeView === 'calc'
                  ? 'bg-red-500 text-white shadow-sm shadow-red-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5" />
              <span>Calculadora</span>
            </button>

            <button
              onClick={() => setActiveView('learn')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeView === 'learn'
                  ? 'bg-red-500 text-white shadow-sm shadow-red-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aprenda Python</span>
            </button>

            <button
              onClick={() => setActiveView('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                activeView === 'simulator'
                  ? 'bg-red-500 text-white shadow-sm shadow-red-500/30 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Simulador Terminal</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* VIEW 1: CALCULATOR + HISTORY */}
        {activeView === 'calc' && (
          <div>
            {/* Mobile History Toggle button */}
            <div className="lg:hidden mb-4 flex justify-end">
              <button
                onClick={() => setShowMobileHistory(!showMobileHistory)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-red-500/40 transition-colors"
              >
                <History className="w-3.5 h-3.5 text-red-500" />
                <span>Histórico ({history.length})</span>
              </button>
            </div>

            {/* Grid layout: Calculator & History side by side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Calculator column */}
              <div className="lg:col-span-7 flex justify-center">
                <Calculator
                  onCalculationComplete={handleCalculationComplete}
                  externalValue={selectedResult}
                  onClearExternalValue={() => setSelectedResult(null)}
                />
              </div>

              {/* History column on desktop, or conditionally on mobile */}
              <div
                className={`lg:col-span-5 ${
                  showMobileHistory ? 'block' : 'hidden lg:block'
                }`}
              >
                <HistoryPanel
                  history={history}
                  onSelectResult={handleSelectHistoryResult}
                  onClearHistory={clearHistory}
                  onRemoveItem={removeCalculation}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PYTHON GUIDE & ANSWERS */}
        {activeView === 'learn' && (
          <div className="max-w-4xl mx-auto">
            <PythonGuide />
          </div>
        )}

        {/* VIEW 3: PYTHON TERMINAL SIMULATOR */}
        {activeView === 'simulator' && (
          <div className="max-w-4xl mx-auto">
            <PythonSimulator />
          </div>
        )}
      </main>

      {/* Footer with Instagram and Website */}
      <Footer />
    </div>
  );
}
