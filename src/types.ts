export interface ParsedTransaction {
  id: string;
  date: string;
  description: string;
  amount?: string;
  debit?: string;
  credit?: string;
  balance?: string;
  rawLine?: string;
}

export type ColumnFormat = 'three-amounts' | 'two-amounts' | 'one-amount';

export interface ColumnDefinition {
  key: keyof ParsedTransaction;
  label: string;
  align?: 'left' | 'right' | 'center';
}

export interface ParseResult {
  success: boolean;
  transactions: ParsedTransaction[];
  totalRows: number;
  columnFormat: ColumnFormat;
  columns: ColumnDefinition[];
  fileName: string;
  pageCount: number;
  error?: string;
  warning?: string;
  isScanned?: boolean;
}

export type PageRoute = 
  | 'home'
  | 'pricing'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'refund-policy'
  | 'contact';
