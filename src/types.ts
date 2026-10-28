export interface CalculationRecord {
  id: string;
  timestamp: number;
  num1: number;
  operation: '+' | '-' | '×' | '÷' | '%';
  num2: number;
  expression: string;
  result: number | string;
}

export type OperationType = '+' | '-' | '×' | '÷' | '%' | null;

export interface PythonCodeSection {
  id: string;
  title: string;
  summary: string;
  code: string;
  explanation: string;
  tags: string[];
}
