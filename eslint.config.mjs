import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import promise from "eslint-plugin-promise";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/coverage/**",
            "**/.vite/**",
            "**/public/**",
            "**/*.config.js",
            "**/*.config.ts",
            "**/*.config.mjs",
            "**/.DS_Store",
            "**/tests/**",
            "**/test/**",
            "**/__tests__/**",
            "**/*.test.{ts,tsx,js,jsx}",
            "**/*.spec.{ts,tsx,js,jsx}",
            "**/vite-env.d.ts",
            "!**/src/**",
        ],
    },
    ...fixupConfigRules(compat.extends(
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "plugin:security/recommended",
        "plugin:sonarjs/recommended",
        "plugin:promise/recommended",
    )),
    {
        plugins: {
            react: fixupPluginRules(react),
            "react-hooks": fixupPluginRules(reactHooks),
            "react-refresh": reactRefresh,
            "unused-imports": unusedImports,
            import: fixupPluginRules(_import),
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            "jsx-a11y": fixupPluginRules(jsxA11Y),
            prettier: fixupPluginRules(prettier),
            security: fixupPluginRules(security),
            sonarjs: fixupPluginRules(sonarjs),
            unicorn: fixupPluginRules(unicorn),
            promise: fixupPluginRules(promise),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2020,
                ...globals.node,
            },
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: ["./tsconfig.json", "./tsconfig.node.json"],
                tsconfigRootDir: __dirname,
            },
        },

        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },

        rules: {
            // Console and debugging
            "no-console": "warn",
            "no-debugger": "warn",
            
            // React specific rules
            "react/prop-types": "off", // Using TypeScript for prop validation
            "react/jsx-uses-react": "off", // React 17+ JSX transform
            "react/react-in-jsx-scope": "off", // React 17+ JSX transform
            "react/jsx-no-target-blank": ["error", { allowReferrer: false }],
            "react/jsx-curly-brace-presence": ["warn", "never"],
            "react/jsx-boolean-value": ["warn", "never"],
            "react/jsx-fragments": ["warn", "syntax"],
            "react/jsx-no-useless-fragment": "warn",
            "react/jsx-pascal-case": "error",
            "react/no-array-index-key": "warn",
            "react/no-unstable-nested-components": "error",
            "react/self-closing-comp": ["warn", { component: true, html: true }],
            
            // React Hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            
            // React Refresh (Vite HMR)
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            // TypeScript specific
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "after-used",
                    ignoreRestSiblings: false,
                    argsIgnorePattern: "^_.*?$",
                    varsIgnorePattern: "^_.*?$",
                },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/prefer-nullish-coalescing": "error",
            "@typescript-eslint/prefer-optional-chain": "error",
            "@typescript-eslint/no-unnecessary-condition": "warn",
            "@typescript-eslint/strict-boolean-expressions": "off",
            
            // Import/Export rules
            "unused-imports/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "warn",
            "import/order": [
                "warn",
                {
                    groups: [
                        "type",
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                        {
                            pattern: "@/**",
                            group: "internal",
                        },
                        {
                            pattern: "~/**",
                            group: "internal",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react"],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "import/no-duplicates": "error",
            "import/no-unresolved": "error",
            "import/no-cycle": "error",
            "import/no-self-import": "error",
            
            // Accessibility
            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/interactive-supports-focus": "warn",
            "jsx-a11y/anchor-is-valid": "warn",
            "jsx-a11y/alt-text": "error",
            
            // Code quality
            "prefer-const": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-template": "warn",
            "prefer-destructuring": ["warn", { object: true, array: false }],
            "no-nested-ternary": "warn",
            "no-unneeded-ternary": "error",
            
            // Security
            "security/detect-object-injection": "off", // Too many false positives
            
            // SonarJS - disable some overly strict rules
            "sonarjs/cognitive-complexity": ["error", 20],
            "sonarjs/no-duplicate-string": "off",
            "sonarjs/prefer-immediate-return": "off",
            
            // Unicorn rules (selective)
            "unicorn/filename-case": [
                "error",
                {
                    cases: {
                        camelCase: true,
                        pascalCase: true,
                        kebabCase: true,
                    },
                },
            ],
            "unicorn/no-null": "off",
            "unicorn/prevent-abbreviations": "off",
            
            // Promise rules
            "promise/catch-or-return": "error",
            "promise/no-return-wrap": "error",
            
            // Prettier
            "prettier/prettier": "warn",
            
            // JSX prop sorting
            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                    ignoreCase: true,
                },
            ],
            
            // Padding lines for readability
            "padding-line-between-statements": [
                "warn",
                {
                    blankLine: "always",
                    prev: "*",
                    next: "return",
                },
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*",
                },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"],
                },
                {
                    blankLine: "always",
                    prev: ["block", "block-like"],
                    next: "*",
                },
                {
                    blankLine: "always",
                    prev: "*",
                    next: ["block", "block-like"],
                },
            ],
        },
    },
]; 