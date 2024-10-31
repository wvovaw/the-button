// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prerttier from 'eslint-plugin-prettier/recommended'
export default tseslint.config(
	prerttier,
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
		"@typescript-eslint/no-unsafe-return": "warn",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/restrict-template-expressions": "warn",
		"@typescript-eslint/no-unused-vars": ["warn", {
				"argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
		}],
		"@typescript-eslint/naming-convention": [
			"warn",
			{
				"selector": "property",
				"format": ["camelCase", "PascalCase"]
			},
			{
				"selector": "property",
				"format": null,
				"filter": {
					"regex": "()",
					"match": true
				}
			}
		],
		"new-cap": "warn"
		}
	}
);
