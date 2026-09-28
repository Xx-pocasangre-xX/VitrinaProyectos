import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next (a partir de la v15) exporta directamente arreglos
// de "flat config", compatibles de forma nativa con ESLint 9 — ya no es
// necesario envolverlos con el shim de compatibilidad @eslint/eslintrc.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
