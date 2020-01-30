/* eslint-disable */
import typescript2 from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';

const isProduction = process.env.NODE_ENV === 'production';

const base = {
  input: './src/index.ts',
  plugins: [
    autoExternal(),
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          declaration: isProduction,
          declarationDir: './types',
        },
        include: ['./src/index.ts', './src/modules/Event.ts'],
        exclude: ['./node_modules/**/*.*'],
      },
      useTsconfigDeclarationDir: true,
    }),
  ],
  external: ['../../../fhexdump'],
};

const targets = [
  {
    ...base,
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
  },
];

if (isProduction) {
  targets.push({
    ...base,
    output: {
      file: './lib/index.mjs',
      format: 'es',
    },
  });
}

export default targets;
