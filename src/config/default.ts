import { Currency, Unit } from "../interfaces/configurations/default";

export const units: { [key: string]: Unit } = {
  // Base units
  m: { singular: "meter", plural: "meters" },
  "%": { singular: "percent", plural: "percent" },
  cm: { singular: "centimeter", plural: "centimeters" },
  mm: { singular: "millimeter", plural: "millimeters" },
  km: { singular: "kilometer", plural: "kilometers" },
  in: { singular: "inch", plural: "inches" },
  ft: { singular: "foot", plural: "feet" },
  yd: { singular: "yard", plural: "yards" },
  mi: { singular: "mile", plural: "miles" },
  g: { singular: "gram", plural: "grams" },
  mg: { singular: "milligram", plural: "milligrams" },
  kg: { singular: "kilogram", plural: "kilograms" },
  L: { singular: "liter", plural: "liters" },
  mL: { singular: "milliliter", plural: "milliliters" },
  s: { singular: "second", plural: "seconds" },
  min: { singular: "minute", plural: "minutes" },
  h: { singular: "hour", plural: "hours" },

  // Additional Time Units
  d: { singular: "day", plural: "days" },
  wk: { singular: "week", plural: "weeks" },
  mo: { singular: "month", plural: "months" },
  yr: { singular: "year", plural: "years" },

  // Additional Length Units
  μm: { singular: "micrometer", plural: "micrometers" },
  nm: { singular: "nanometer", plural: "nanometers" },
  nmi: { singular: "nautical mile", plural: "nautical miles" },

  // Additional Mass Units
  μg: { singular: "microgram", plural: "micrograms" },
  t: { singular: "tonne", plural: "tonnes" },
  lb: { singular: "pound", plural: "pounds" },
  oz: { singular: "ounce", plural: "ounces" },
  st: { singular: "stone", plural: "stones" },

  // Volume Units
  "cm³": { singular: "cubic centimeter", plural: "cubic centimeters" },
  gal: { singular: "gallon", plural: "gallons" },
  pt: { singular: "pint", plural: "pints" },
  qt: { singular: "quart", plural: "quarts" },
  "fl oz": { singular: "fluid ounce", plural: "fluid ounces" },
  "ft³": { singular: "cubic foot", plural: "cubic feet" },
  "in³": { singular: "cubic inch", plural: "cubic inches" },
  bbl: { singular: "barrel", plural: "barrels" },

  // Area Units
  "m²": { singular: "square meter", plural: "square meters" },
  "km²": { singular: "square kilometer", plural: "square kilometers" },
  "cm²": { singular: "square centimeter", plural: "square centimeters" },
  "mm²": { singular: "square millimeter", plural: "square millimeters" },
  ha: { singular: "hectare", plural: "hectares" },
  "ft²": { singular: "square foot", plural: "square feet" },
  "in²": { singular: "square inch", plural: "square inches" },
  ac: { singular: "acre", plural: "acres" },

  // Angle Units
  rad: { singular: "radian", plural: "radians" },
  deg: { singular: "degree", plural: "degrees" },
  grad: { singular: "gradian", plural: "gradians" },

  // Temperature Units
  K: { singular: "kelvin", plural: "kelvins" },
  "°C": { singular: "degree Celsius", plural: "degrees Celsius" },
  "°F": { singular: "degree Fahrenheit", plural: "degrees Fahrenheit" },

  // Speed Units
  "m/s": { singular: "meter per second", plural: "meters per second" },
  "m/s²": {
    singular: "meter per second squared",
    plural: "meters per second squared",
  },
  "km/h": { singular: "kilometer per hour", plural: "kilometers per hour" },
  "km/L": { singular: "kilometer per liter", plural: "kilometers per liter" },
  mph: { singular: "mile per hour", plural: "miles per hour" },
  "ft/s": { singular: "foot per second", plural: "feet per second" },
  kn: { singular: "knot", plural: "knots" },
  mach: { singular: "mach", plural: "" },
  c: { singular: "speed of light", plural: "" },

  // Force Units
  N: { singular: "newton", plural: "newtons" },
  kgf: { singular: "kilogram-force", plural: "" },
  lbf: { singular: "pound-force", plural: "" },
  dyn: { singular: "dyne", plural: "dynes" },

  // Pressure Units
  Pa: { singular: "pascal", plural: "pascals" },
  kPa: { singular: "kilopascal", plural: "kilopascals" },
  MPa: { singular: "megapascal", plural: "megapascals" },
  bar: { singular: "bar", plural: "bars" },
  atm: { singular: "atmosphere", plural: "atmospheres" },
  mmHg: { singular: "millimeter of mercury", plural: "millimeters of mercury" },
  inHg: { singular: "inch of mercury", plural: "inches of mercury" },
  psi: { singular: "pound per square inch", plural: "pounds per square inch" },
  "N/m²": {
    singular: "newton per square meter",
    plural: "newtons per square meter",
  },
  "kg/m²": {
    singular: "kilogram per square meter",
    plural: "kilograms per square meter",
  },

  // Energy Units
  J: { singular: "joule", plural: "joules" },
  kJ: { singular: "kilojoule", plural: "kilojoules" },
  MJ: { singular: "megajoule", plural: "megajoules" },
  cal: { singular: "calorie", plural: "calories" },
  kcal: { singular: "kilocalorie", plural: "kilocalories" },
  eV: { singular: "electron volt", plural: "electron volts" },
  BTU: { singular: "British thermal unit", plural: "British thermal units" },
  kWh: { singular: "kilowatt hour", plural: "kilowatt hours" },

  // Power Units
  W: { singular: "watt", plural: "watts" },
  kW: { singular: "kilowatt", plural: "kilowatts" },
  MW: { singular: "megawatt", plural: "megawatts" },
  hp: { singular: "horsepower", plural: "" },

  // Frequency Units
  Hz: { singular: "hertz", plural: "" },
  kHz: { singular: "kilohertz", plural: "" },
  MHz: { singular: "megahertz", plural: "" },
  GHz: { singular: "gigahertz", plural: "" },
  rpm: { singular: "revolution per minute", plural: "revolutions per minute" },
  "rad/s": { singular: "radian per second", plural: "radians per second" },
  "deg/s": { singular: "degree per second", plural: "degrees per second" },

  // Electrical Units
  V: { singular: "volt", plural: "volts" },
  mV: { singular: "millivolt", plural: "millivolts" },
  μV: { singular: "microvolt", plural: "microvolts" },
  kV: { singular: "kilovolt", plural: "kilovolts" },
  A: { singular: "ampere", plural: "amperes" },
  mA: { singular: "milliampere", plural: "milliamperes" },
  μA: { singular: "microampere", plural: "microamperes" },
  Ω: { singular: "ohm", plural: "ohms" },
  kΩ: { singular: "kilohm", plural: "kilohms" },
  MΩ: { singular: "megohm", plural: "megohms" },
  F: { singular: "farad", plural: "farads" },
  μF: { singular: "microfarad", plural: "microfarads" },
  nF: { singular: "nanofarad", plural: "nanofarads" },
  pF: { singular: "picofarad", plural: "picofarads" },
  H: { singular: "henry", plural: "henries" },
  mH: { singular: "millihenry", plural: "millihenries" },
  μH: { singular: "microhenry", plural: "microhenries" },
  S: { singular: "siemens", plural: "" },
  "S/m": { singular: "siemens per meter", plural: "" },
  "F/m": { singular: "farad per meter", plural: "farads per meter" },
  "Ω·m": { singular: "ohm meter", plural: "ohm meters" },
  "V/m": { singular: "volt per meter", plural: "volts per meter" },
  "A/m": { singular: "ampere per meter", plural: "amperes per meter" },

  // Magnetic Units
  T: { singular: "tesla", plural: "teslas" },
  mT: { singular: "millitesla", plural: "milliteslas" },
  μT: { singular: "microtesla", plural: "microteslas" },
  G: { singular: "gauss", plural: "" },
  Wb: { singular: "weber", plural: "webers" },
  mWb: { singular: "milliweber", plural: "milliwebers" },
  μWb: { singular: "microweber", plural: "microwebers" },

  // Density Units
  "kg/m³": {
    singular: "kilogram per cubic meter",
    plural: "kilograms per cubic meter",
  },
  "g/cm³": {
    singular: "gram per cubic centimeter",
    plural: "grams per cubic centimeter",
  },
  "g/mL": { singular: "gram per milliliter", plural: "grams per milliliter" },
  "lb/ft³": {
    singular: "pound per cubic foot",
    plural: "pounds per cubic foot",
  },
  "lb/in³": {
    singular: "pound per cubic inch",
    plural: "pounds per cubic inch",
  },
  sg: { singular: "specific gravity", plural: "" },

  // Volumetric Flow Units
  "m³/s": {
    singular: "cubic meter per second",
    plural: "cubic meters per second",
  },
  "L/s": { singular: "liter per second", plural: "liters per second" },
  "L/min": { singular: "liter per minute", plural: "liters per minute" },
  "L/h": { singular: "liter per hour", plural: "liters per hour" },
  "gal/min": { singular: "gallon per minute", plural: "gallons per minute" },
  "ft³/s": {
    singular: "cubic foot per second",
    plural: "cubic feet per second",
  },
  "bbl/d": { singular: "barrel per day", plural: "barrels per day" },

  // Fuel Economy Units
  "L/100km": { singular: "liter per 100 kilometers", plural: "" },
  mpg: { singular: "mile per gallon", plural: "miles per gallon" },
  mpg_imp: {
    singular: "mile per gallon imperial",
    plural: "miles per gallon imperial",
  },
  "L/km": { singular: "liter per kilometer", plural: "liters per kilometer" },
  "L/m": { singular: "liter per meter", plural: "liters per meter" },

  // Concentration Units
  ppm: { singular: "part per million", plural: "parts per million" },
  ppb: { singular: "part per billion", plural: "parts per billion" },
  ppt: { singular: "part per trillion", plural: "parts per trillion" },
  "mol/L": { singular: "mole per liter", plural: "moles per liter" },
  "mol/m³": {
    singular: "mole per cubic meter",
    plural: "moles per cubic meter",
  },
  "mg/L": { singular: "milligram per liter", plural: "milligrams per liter" },
  "g/L": { singular: "gram per liter", plural: "grams per liter" },
  "mg/kg": {
    singular: "milligram per kilogram",
    plural: "milligrams per kilogram",
  },

  // Illumination Units
  lm: { singular: "lumen", plural: "lumens" },
  cd: { singular: "candela", plural: "candelas" },
  lx: { singular: "lux", plural: "" },
  "ft-cd": { singular: "foot-candle", plural: "foot-candles" },

  // Radiation Units
  Bq: { singular: "becquerel", plural: "becquerels" },
  Ci: { singular: "curie", plural: "curies" },
  Sv: { singular: "sievert", plural: "sieverts" },
  Gy: { singular: "gray", plural: "grays" },

  // Catalytic Activity Units
  kat: { singular: "katal", plural: "katals" },
  U: { singular: "enzyme unit", plural: "enzyme units" },

  // Viscosity and Fluid Properties Units
  "Pa·s": { singular: "pascal second", plural: "pascal seconds" },
  cP: { singular: "centipoise", plural: "" },
  "kg/(m·s)": {
    singular: "kilogram per meter second",
    plural: "kilograms per meter second",
  },
  "lb/(ft·s)": {
    singular: "pound per foot second",
    plural: "pounds per foot second",
  },
  "m²/s": {
    singular: "square meter per second",
    plural: "square meters per second",
  },
  St: { singular: "stokes", plural: "" },
  cSt: { singular: "centistokes", plural: "" },
  "N/m": { singular: "newton per meter", plural: "newtons per meter" },
  "dyn/cm": { singular: "dyne per centimeter", plural: "dynes per centimeter" },

  // Thermal Properties Units
  "W/(m·K)": {
    singular: "watt per meter kelvin",
    plural: "watts per meter kelvin",
  },
  "cal/(cm·s·°C)": {
    singular: "calorie per centimeter second degree Celsius",
    plural: "calories per centimeter second degree Celsius",
  },
  "J/(kg·K)": {
    singular: "joule per kilogram kelvin",
    plural: "joules per kilogram kelvin",
  },
  "cal/(g·°C)": {
    singular: "calorie per gram degree Celsius",
    plural: "calories per gram degree Celsius",
  },
  "1/K": { singular: "per kelvin", plural: "" },
  "1/°C": { singular: "per degree Celsius", plural: "" },
  "W/m²": {
    singular: "watt per square meter",
    plural: "watts per square meter",
  },
  "cal/(cm²·s)": {
    singular: "calorie per square centimeter second",
    plural: "calories per square centimeter second",
  },
  "W/(m²·K)": {
    singular: "watt per square meter kelvin",
    plural: "watts per square meter kelvin",
  },
  "cal/(cm²·s·°C)": {
    singular: "calorie per square centimeter second degree Celsius",
    plural: "calories per square centimeter second degree Celsius",
  },
  "K/W": { singular: "kelvin per watt", plural: "kelvins per watt" },
  "°C/W": {
    singular: "degree Celsius per watt",
    plural: "degrees Celsius per watt",
  },

  // Data Transfer and Storage Units
  b: { singular: "bit", plural: "bits" },
  B: { singular: "byte", plural: "bytes" },
  kb: { singular: "kilobit", plural: "kilobits" },
  kB: { singular: "kilobyte", plural: "kilobytes" },
  Mb: { singular: "megabit", plural: "megabits" },
  MB: { singular: "megabyte", plural: "megabytes" },
  Gb: { singular: "gigabit", plural: "gigabits" },
  GB: { singular: "gigabyte", plural: "gigabytes" },
  Tb: { singular: "terabit", plural: "terabits" },
  TB: { singular: "terabyte", plural: "terabytes" },
  bps: { singular: "bit per second", plural: "bits per second" },
  kbps: { singular: "kilobit per second", plural: "kilobits per second" },
  Mbps: { singular: "megabit per second", plural: "megabits per second" },
  Gbps: { singular: "gigabit per second", plural: "gigabits per second" },
};

export const numbers = {
  ones: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
  teens: ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
  tens: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
  scales: ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"],
  ordinals: {
    one: "first",
    two: "second",
    three: "third",
    five: "fifth",
    eight: "eighth",
    nine: "ninth",
    twelve: "twelfth",
  },
};

export const currencySymbols: { [key: string]: Currency } = {
  $: {
    singular: "dollar",
    plural: "dollars",
    fraction: { singular: "cent", plural: "cents" },
  },
  "€": {
    singular: "euro",
    plural: "euros",
    fraction: { singular: "cent", plural: "cents" },
  },
  "£": {
    singular: "pound",
    plural: "pounds",
    fraction: { singular: "penny", plural: "pence" },
  },
  "¥": {
    singular: "yen",
    plural: "yen",
    fraction: null,
  },
  "₹": {
    singular: "rupee",
    plural: "rupees",
    fraction: { singular: "paisa", plural: "paise" },
  },
};

// Currency codes
export const currencyCodes: { [key: string]: Currency } = {
  USD: {
    singular: "dollar",
    plural: "dollars",
    fraction: { singular: "cent", plural: "cents" },
  },
  EUR: {
    singular: "euro",
    plural: "euros",
    fraction: { singular: "cent", plural: "cents" },
  },
  GBP: {
    singular: "pound",
    plural: "pounds",
    fraction: { singular: "penny", plural: "pence" },
  },
  JPY: {
    singular: "yen",
    plural: "yen",
    fraction: null,
  },
  INR: {
    singular: "rupee",
    plural: "rupees",
    fraction: { singular: "paisa", plural: "paise" },
  },
  CHF: {
    singular: "Swiss franc",
    plural: "Swiss francs",
    fraction: { singular: "rappen", plural: "rappen" },
  },
  AUD: {
    singular: "Australian dollar",
    plural: "Australian dollars",
    fraction: { singular: "cent", plural: "cents" },
  },
  CAD: {
    singular: "Canadian dollar",
    plural: "Canadian dollars",
    fraction: { singular: "cent", plural: "cents" },
  },
};

export const currencies = {
  ...currencySymbols,
  ...currencyCodes,
};

export const math = {
  "+": "plus",
  "-": "minus",
  "*": "times",
  "×": "times",
  "·": "times",
  "/": "divided by",
  "÷": "divided by",
  ":": "divided by",
  "^": "to the power of",
};
