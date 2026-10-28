import { useState, useEffect } from 'react';
import { CalculationRecord } from '../types';

const STORAGE_KEY = 'igor_calc_history_v1';

export function useCalculationHistory() {
  const [history, setHistory] = useState<CalculationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Não foi possível carregar o histórico local:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Erro ao salvar histórico local:', e);
    }
  }, [history]);

  const addCalculation = (
    num1: number,
    operation: '+' | '-' | '×' | '÷' | '%',
    num2: number,
    expression: string,
    result: number | string
  ) => {
    const newRecord: CalculationRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      num1,
      operation,
      num2,
      expression,
      result
    };

    setHistory((prev) => [newRecord, ...prev.slice(0, 49)]); // Mantém os 50 mais recentes
    return newRecord;
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Erro ao limpar histórico:', e);
    }
  };

  const removeCalculation = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    history,
    addCalculation,
    clearHistory,
    removeCalculation
  };
}
