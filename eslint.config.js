import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import globals from "globals"; // Import globals

export default [
  // Global ignores - prevent ESLint from even looking at these files/dirs
  {
    ignores: ["node_modules/", "dist/", "*.config.js", "*.js", "tsup.config.ts"], // Ignore node_modules, dist, config files, and ALL JS files
  },

  // Base recommended rules applied ONLY to TS files
  {
    files: ["**/*.ts"],
    rules: eslint.configs.recommended.rules,
  },

  // TypeScript specific configurations
  {
    files: ["**/*.ts"], // Apply to all TS files initially
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: "./",
      },
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs["recommended"].rules,
      "@typescript-eslint/explicit-function-return-type": "warn",
      "no-console": "warn", // Allow console usage, but warn
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "error"
        {
          argsIgnorePattern: "^_", // Keep ignoring unused function args starting with _
          varsIgnorePattern: "^_$", // Ignore ONLY variables named exactly "_"
          caughtErrorsIgnorePattern: "^_", // Optionally ignore caught error variables named _
        },
      ],
    },
  },

  // Prettier configuration applied ONLY to TS files
  {
    files: ["**/*.ts"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Using recommended rules directly might be tricky in flat config structure
      // Explicitly enabling the prettier rule is safer
      "prettier/prettier": "error",
    },
  },

  // Specific configuration for test files (overrides/additions)
  {
    files: ["_tests_/**/*.ts"], // Target only test TS files
    languageOptions: {
      globals: {
        // Add Jest globals
        ...globals.jest,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        project: "./tsconfig.tests.json",
        tsconfigRootDir: "./",
      },
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs["recommended"].rules,
      "@typescript-eslint/explicit-function-return-type": "warn",
      // No need to repeat plugins/base rules unless overriding specifically for tests
      // Example override:
      // "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
