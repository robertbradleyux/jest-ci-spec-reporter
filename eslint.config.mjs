import { defineConfig } from "eslint/config";
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

export default defineConfig([{
    extends: compat.extends("plugin:@typescript-eslint/recommended"),
    rules: {
        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": false,
            minimumDescriptionLength: 6,
        }],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/member-ordering": ["error", {
            default: ["static-field", "instance-field", "static-method", "instance-method"],
        }],
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": ["error", {
            ignoreParameters: true,
        }],
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": ["error", {
            args: "none",
            ignoreRestSiblings: true,
        }],
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/unified-signatures": "error",
        curly: "error",
        "eol-last": "error",
        eqeqeq: ["error", "always", {
            null: "ignore",
        }],
        "guard-for-in": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-console": ["error", {
            allow: ["error", "info", "log", "warn"],
        }],
        "no-eval": "error",
        "no-irregular-whitespace": "error",
        "no-labels": ["error", {
            allowLoop: true,
            allowSwitch: true,
        }],
        "no-new-wrappers": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-useless-escape": "error",
        quotes: ["error", "single", {
            avoidEscape: true,
        }],
        radix: "error",
        "spaced-comment": "error",
    },
}]);