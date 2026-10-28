import React, { useState } from 'react';
import { CalculationRecord } from '../types';
import { History, Trash2, ArrowUpRight, Copy, Check, Clock } from 'lucide-react';

interface HistoryPanelProps {
  history: CalculationRecord[];
  onSelectResult: (val: number | string) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  onRemoveItem
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: CalculationRecord) => {
    const text = `${item.expression} = ${item.result}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-[#12151c] border border-zinc-800/90 rounded-3xl p-5 flex flex-col h-full shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              Histórico
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-red-400">
                {history.length}
              </span>
            </h3>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-colors"
            title="Limpar todo o histórico"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Limpar</span>
          </button>
        )}
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto my-3 pr-1 space-y-2 max-h-[380px] sm:max-h-[460px]">
        {history.length === 0 ? (
          <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 text-zinc-500">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-zinc-600">
              <History className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-zinc-400">Nenhum cálculo recente</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="group p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/70 hover:border-red-500/40 hover:bg-zinc-800/60 transition-all duration-200 relative"
            >
              <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-600" />
                  {formatTime(item.timestamp)}
                </span>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1 rounded hover:bg-zinc-700/60 text-zinc-400 hover:text-white"
                    title="Copiar conta"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400"
                    title="Excluir este item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Expression */}
              <div className="text-xs text-zinc-400 font-mono tracking-tight">
                {item.expression}
              </div>

              {/* Result + Reuse Button */}
              <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-800/40">
                <span className="text-lg font-bold font-mono text-white group-hover:text-red-400 transition-colors">
                  = {item.result}
                </span>

                <button
                  onClick={() => onSelectResult(item.result)}
                  className="flex items-center gap-1 text-[11px] font-medium text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white px-2.5 py-1 rounded-lg border border-red-500/20 transition-all"
                  title="Usar esse resultado na calculadora"
                >
                  <span>Reutilizar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
