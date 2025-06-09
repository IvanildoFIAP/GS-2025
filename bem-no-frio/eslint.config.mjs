import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Configurações herdadas do Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Suas regras personalizadas
  {
    rules: {
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-console": "off", // para permitir console.log
      // adicione mais se quiser
    },
  },
];

export default eslintConfig;
