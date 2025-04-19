/**
 * Configuration for currency fraction (e.g., cents).
 */
export interface CurrencyFractionConfig {
  singular: string;
  plural: string;
}

/**
 * Configuration for currency (e.g., USD).
 */
export interface Currency {
  singular: string;
  plural: string;
  fraction: CurrencyFractionConfig | null;
}

/**
 * Configuration for a unit (e.g., meter).
 */
export interface Unit {
  singular: string;
  plural: string;
}
