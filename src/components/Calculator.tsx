import React, { useState, useEffect, useCallback } from 'react';
import { OperationType } from '../types';
import { Delete, RotateCcw, Percent, Equal } from 'lucide-react';

interface CalculatorProps {
  onCalculationComplete: (
    num1: number,
    operation: '+' | '-' | '×' | '÷' | '%',
    num2: number,
    expression: string,
    result: number | string
  ) => void;
  externalValue?: number | string | null;
  onClearExternalValue?: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  onCalculationComplete,
  externalValue,
  onClearExternalValue
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<OperationType>(null);
  const [waitingForNextOperand, setWaitingForNextOperand] = useState<boolean>(false);
  const [expressionPreview, setExpressionPreview] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  // If a value comes from history "Reutilizar", inject it cleanly
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== null) {
      if (typeof externalValue === 'number' || (!isNaN(Number(externalValue)) && externalValue !== '')) {
        setDisplayValue(String(externalValue));
        setWaitingForNextOperand(false);
        setHasError(false);
        if (onClearExternalValue) onClearExternalValue();
      }
    }
  }, [externalValue, onClearExternalValue]);

  // Clean numbers formatting
  const formatDisplay = (val: string) => {
    if (val === 'Erro' || hasError) return 'Erro: Divisão por 0';
    if (val.length > 14) {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        return num.toExponential(6);
      }
    }
    return val;
  };

  // Clear all or current
  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNextOperand(false);
    setExpressionPreview('');
    setHasError(false);
  };

  // Backspace (Delete last digit)
  const handleDeleteDigit = () => {
    if (hasError) {
      handleClear();
      return;
    }
    if (waitingForNextOperand) return;
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  // Input single digit
  const handleInputDigit = (digit: string) => {
    if (hasError) {
      setDisplayValue(digit);
      setHasError(false);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNextOperand(false);
      setExpressionPreview('');
      return;
    }

    if (waitingForNextOperand) {
      setDisplayValue(digit);
      setWaitingForNextOperand(false);
    } else {
      if (displayValue === '0' && digit !== '.') {
        setDisplayValue(digit);
      } else {
        if (displayValue.replace(/[^0-9]/g, '').length < 15) {
          setDisplayValue(displayValue + digit);
        }
      }
    }
  };

  // Input decimal point
  const handleInputDecimal = () => {
    if (hasError) {
      handleClear();
      setDisplayValue('0.');
      return;
    }
    if (waitingForNextOperand) {
      setDisplayValue('0.');
      setWaitingForNextOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Toggle +/- sign
  const handleToggleSign = () => {
    if (hasError) return;
    const current = parseFloat(displayValue);
    if (current !== 0 && !isNaN(current)) {
      setDisplayValue(String(-current));
    }
  };

  // Percentage %
  const handlePercentage = () => {
    if (hasError) return;
    const current = parseFloat(displayValue);
    if (!isNaN(current)) {
      const result = current / 100;
      setDisplayValue(String(result));
      if (previousValue !== null && operation) {
        setExpressionPreview(`${previousValue} ${operation} ${current}%`);
      }
    }
  };

  // Internal calculator core logic
  const calculateResult = (
    first: number,
    op: '+' | '-' | '×' | '÷' | '%',
    second: number
  ): { value: number | 'Erro'; expression: string } => {
    let result: number | 'Erro' = 0;
    const expression = `${first} ${op} ${second}`;

    switch (op) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '×':
        result = first * second;
        break;
      case '÷':
        if (second === 0) {
          result = 'Erro';
        } else {
          result = first / second;
        }
        break;
      case '%':
        result = (first * second) / 100;
        break;
      default:
        result = second;
    }

    // Round slight floating point inaccuracies (e.g. 0.1 + 0.2 = 0.30000000000000004)
    if (typeof result === 'number') {
      result = parseFloat(result.toFixed(10));
    }

    return { value: result, expression };
  };

  // Operator (+, -, ×, ÷)
  const handleOperator = (nextOp: '+' | '-' | '×' | '÷') => {
    if (hasError) {
      handleClear();
      return;
    }

    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpressionPreview(`${inputValue} ${nextOp}`);
    } else if (operation && !waitingForNextOperand) {
      // Execute pending operation
      const { value, expression } = calculateResult(previousValue, operation, inputValue);

      if (value === 'Erro') {
        setHasError(true);
        setDisplayValue('Erro');
        setExpressionPreview(`${previousValue} ÷ 0 =`);
        onCalculationComplete(previousValue, operation, inputValue, expression, 'Erro: Divisão por 0');
        setPreviousValue(null);
        setOperation(null);
        return;
      }

      setPreviousValue(value);
      setDisplayValue(String(value));
      setExpressionPreview(`${value} ${nextOp}`);
      onCalculationComplete(previousValue, operation, inputValue, expression, value);
    } else {
      // Just changing the operator before entering next operand
      setExpressionPreview(`${previousValue} ${nextOp}`);
    }

    setWaitingForNextOperand(true);
    setOperation(nextOp);
  };

  // Equals (=)
  const handleEquals = useCallback(() => {
    if (hasError || previousValue === null || operation === null) return;

    const inputValue = parseFloat(displayValue);
    const { value, expression } = calculateResult(previousValue, operation, inputValue);

    if (value === 'Erro') {
      setHasError(true);
      setDisplayValue('Erro');
      setExpressionPreview(`${previousValue} ÷ 0 =`);
      onCalculationComplete(previousValue, operation, inputValue, expression, 'Erro: Divisão por 0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNextOperand(true);
      return;
    }

    setDisplayValue(String(value));
    setExpressionPreview(`${expression} =`);
    onCalculationComplete(previousValue, operation, inputValue, expression, value);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNextOperand(true);
  }, [hasError, previousValue, operation, displayValue, onCalculationComplete]);

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing shortcuts with Ctrl / Cmd / Alt
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleInputDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleInputDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteDigit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, previousValue, operation, waitingForNextOperand, hasError, handleEquals]);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#12151c] border border-zinc-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl relative select-none">
      {/* Decorative top red accent subtle line */}
      <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80" />

      {/* Screen / Display Area */}
      <div className="bg-[#0b0d11] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 mb-5 flex flex-col justify-end min-h-[115px] sm:min-h-[130px] relative overflow-hidden shadow-inner">
        {/* Subtle active operator indicator tag */}
        <div className="flex items-center justify-between text-xs mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {operation ? `Operação: ${operation}` : 'Pronto'}
            </span>
          </div>
          <span className="text-zinc-500 font-mono text-xs truncate max-w-[200px] text-right">
            {expressionPreview || '\u00A0'}
          </span>
        </div>

        {/* Big Digit Display */}
        <div className="w-full text-right overflow-x-auto whitespace-nowrap">
          <span
            className={`font-mono font-bold tracking-tight text-white transition-all duration-150 ${
              hasError
                ? 'text-red-400 text-xl sm:text-2xl'
                : displayValue.length > 10
                ? 'text-2xl sm:text-3xl'
                : displayValue.length > 7
                ? 'text-3xl sm:text-4xl'
                : 'text-4xl sm:text-5xl'
            }`}
          >
            {formatDisplay(displayValue)}
          </span>
        </div>
      </div>

      {/* Keypad Grid: 4 columns, designed with big touch buttons for mobile & PC */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {/* Row 1: AC, ⌫, %, ÷ */}
        <button
          onClick={handleClear}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-red-500/40 text-red-400 font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm group"
          title="Limpar tudo (Esc)"
        >
          <RotateCcw className="w-4 h-4 mr-1 group-hover:-rotate-45 transition-transform" />
          <span>{displayValue !== '0' || previousValue !== null ? 'C' : 'AC'}</span>
        </button>

        <button
          onClick={handleDeleteDigit}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm"
          title="Apagar dígito (Backspace)"
        >
          <Delete className="w-5 h-5" />
        </button>

        <button
          onClick={handlePercentage}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm"
          title="Porcentagem (%)"
        >
          <Percent className="w-5 h-5 text-zinc-400" />
        </button>

        <button
          onClick={() => handleOperator('÷')}
          type="button"
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm border ${
            operation === '÷' && waitingForNextOperand
              ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/30'
              : 'bg-zinc-900/90 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/60'
          }`}
          title="Dividir (/)"
        >
          ÷
        </button>

        {/* Row 2: 7, 8, 9, × */}
        <button
          onClick={() => handleInputDigit('7')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          7
        </button>
        <button
          onClick={() => handleInputDigit('8')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          8
        </button>
        <button
          onClick={() => handleInputDigit('9')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          9
        </button>
        <button
          onClick={() => handleOperator('×')}
          type="button"
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm border ${
            operation === '×' && waitingForNextOperand
              ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/30'
              : 'bg-zinc-900/90 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/60'
          }`}
          title="Multiplicar (*)"
        >
          ×
        </button>

        {/* Row 3: 4, 5, 6, - */}
        <button
          onClick={() => handleInputDigit('4')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          4
        </button>
        <button
          onClick={() => handleInputDigit('5')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          5
        </button>
        <button
          onClick={() => handleInputDigit('6')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          6
        </button>
        <button
          onClick={() => handleOperator('-')}
          type="button"
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm border ${
            operation === '-' && waitingForNextOperand
              ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/30'
              : 'bg-zinc-900/90 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/60'
          }`}
          title="Subtrair (-)"
        >
          -
        </button>

        {/* Row 4: 1, 2, 3, + */}
        <button
          onClick={() => handleInputDigit('1')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          1
        </button>
        <button
          onClick={() => handleInputDigit('2')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          2
        </button>
        <button
          onClick={() => handleInputDigit('3')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          3
        </button>
        <button
          onClick={() => handleOperator('+')}
          type="button"
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm border ${
            operation === '+' && waitingForNextOperand
              ? 'bg-red-500 text-white border-red-400 shadow-md shadow-red-500/30'
              : 'bg-zinc-900/90 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/60'
          }`}
          title="Somar (+)"
        >
          +
        </button>

        {/* Row 5: ±, 0, ., = */}
        <button
          onClick={handleToggleSign}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-zinc-300 font-medium text-lg sm:text-xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
          title="Inverter sinal (±)"
        >
          ±
        </button>

        <button
          onClick={() => handleInputDigit('0')}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-semibold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          0
        </button>

        <button
          onClick={handleInputDecimal}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-white font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
        >
          .
        </button>

        <button
          onClick={handleEquals}
          type="button"
          className="h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-xl sm:text-2xl flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-red-600/30 border border-red-400/30 group"
          title="Calcular resultado (Enter ou =)"
        >
          <Equal className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
