import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const PythonSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [chosenOp, setChosenOp] = useState<string>('1');
  const [num1, setNum1] = useState<string>('10');
  const [num2, setNum2] = useState<string>('2');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Python 3.11.8 (main, Feb 2026)',
    '[GCC 12.2.0] on linux',
    'Executando: python3 calculadora.py',
    '====================================',
    '      CALCULADORA DO IGOR ALMEIDA    ',
    '====================================',
    '  [1] + Adição',
    '  [2] - Subtração',
    '  [3] * Multiplicação',
    '  [4] / Divisão',
    '  [5] H Ver Histórico',
    '  [0] S Sair do programa',
    '===================================='
  ]);

  const opSymbols: Record<string, string> = {
    '1': '+',
    '2': '-',
    '3': '*',
    '4': '/'
  };

  const opNames: Record<string, string> = {
    '1': 'somar',
    '2': 'subtrair',
    '3': 'multiplicar',
    '4': 'dividir'
  };

  const handleSimulate = () => {
    const n1 = parseFloat(num1.replace(',', '.'));
    const n2 = parseFloat(num2.replace(',', '.'));

    if (isNaN(n1) || isNaN(n2)) {
      setTerminalLogs((prev) => [
        ...prev,
        `>>> input("Escolha uma opção"): ${chosenOp}`,
        `>>> input("Digite o primeiro número"): ${num1}`,
        `>>> input("Digite o segundo número"): ${num2}`,
        '❌ [!] Erro ValueError: Você digitou um texto não numérico!'
      ]);
      setStep(4);
      return;
    }

    const opSymbol = opSymbols[chosenOp] || '+';
    const funcName = opNames[chosenOp] || 'somar';
    let resultStr = '';

    if (chosenOp === '4' && n2 === 0) {
      resultStr = '❌ Erro: Não é possível dividir por zero!';
    } else {
      let res = 0;
      if (chosenOp === '1') res = n1 + n2;
      if (chosenOp === '2') res = n1 - n2;
      if (chosenOp === '3') res = n1 * n2;
      if (chosenOp === '4') res = n1 / n2;

      // round
      res = parseFloat(res.toFixed(6));
      resultStr = `✅ Resultado: ${n1} ${opSymbol} ${n2} = ${res}`;
    }

    setTerminalLogs((prev) => [
      ...prev,
      `>>> input("Escolha uma opção (0 a 5): "): ${chosenOp}`,
      `>>> input("Digite o primeiro número: "): ${num1}`,
      `>>> input("Digite o segundo número: "): ${num2}`,
      `[PYTHON] Chamando a função: ${funcName}(a=${n1}, b=${n2})`,
      resultStr,
      `[HISTÓRICO] Registro salvo na lista 'historico'`,
      '------------------------------------'
    ]);

    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setTerminalLogs([
      'Python 3.11.8 (main, Feb 2026)',
      'Executando: python3 calculadora.py',
      '====================================',
      '      CALCULADORA DO IGOR ALMEIDA    ',
      '====================================',
      '  [1] + Adição',
      '  [2] - Subtração',
      '  [3] * Multiplicação',
      '  [4] / Divisão',
      '  [5] H Ver Histórico',
      '  [0] S Sair do programa',
      '===================================='
    ]);
  };

  return (
    <div className="bg-[#12151c] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Simulador do Terminal Python
              <span className="text-[10px] font-mono uppercase bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                Passo a Passo
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Veja exatamente como o código Python processa cada linha no terminal
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl hover:border-zinc-700 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Terminal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-3">
              1. Escolha a Operação no Menu
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: '1', label: '[1] Adição (+)' },
                { id: '2', label: '[2] Subtração (-)' },
                { id: '3', label: '[3] Multiplicação (*)' },
                { id: '4', label: '[4] Divisão (/)' }
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setChosenOp(op.id)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    chosenOp === op.id
                      ? 'bg-red-500/20 border-red-500 text-white shadow-sm shadow-red-500/20'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block">
              2. Simule a entrada com input()
            </span>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Primeiro número (num1):
              </label>
              <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                placeholder="Ex: 10"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">
                Segundo número (num2):
              </label>
              <input
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-red-500"
                placeholder="Ex: 2 ou 0"
              />
            </div>

            {/* Quick Test Division by Zero preset */}
            {chosenOp === '4' && (
              <button
                type="button"
                onClick={() => setNum2('0')}
                className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 underline pt-1"
              >
                <AlertTriangle className="w-3 h-3" /> Testar divisão por 0 (ver proteção)
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleSimulate}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Executar no Terminal Python</span>
          </button>
        </div>

        {/* Terminal Output Column */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="rounded-2xl bg-[#090b0e] border border-zinc-800 p-4 font-mono text-xs flex-1 min-h-[300px] max-h-[420px] overflow-y-auto flex flex-col shadow-inner">
            {/* Terminal bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-zinc-500 text-[11px] ml-2">bash - terminal python</span>
              </div>
              <span className="text-[10px] text-zinc-600">UTF-8</span>
            </div>

            {/* Terminal lines */}
            <div className="space-y-1 text-zinc-300">
              {terminalLogs.map((log, index) => {
                let colorClass = 'text-zinc-300';
                if (log.startsWith('✅')) colorClass = 'text-green-400 font-semibold';
                else if (log.startsWith('❌')) colorClass = 'text-red-400 font-semibold';
                else if (log.startsWith('>>>')) colorClass = 'text-yellow-300';
                else if (log.startsWith('[PYTHON]')) colorClass = 'text-red-400';
                else if (log.startsWith('[HISTÓRICO]')) colorClass = 'text-blue-400';
                else if (log.startsWith('=')) colorClass = 'text-zinc-600';

                return (
                  <div key={index} className={`${colorClass} leading-relaxed break-all`}>
                    {log}
                  </div>
                );
              })}
              <div className="flex items-center text-red-500 animate-pulse pt-2">
                <span>❯&nbsp;</span>
                <span className="w-2 h-4 bg-red-500 inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
