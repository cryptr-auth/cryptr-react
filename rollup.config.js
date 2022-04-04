import del from 'rollup-plugin-delete'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'
import analyze from 'rollup-plugin-analyzer'

const isProduction = process.env.NODE_ENV === 'production'
const name = pkg.name
const input = 'src/lib/index.ts'
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
}
const plugins = [
  del({ targets: 'dist/*', runOnce: true }),
  typescript({ useTsconfigDeclarationDir: true }),
  external(),
  resolve(),
  replace({ preventAssignment: true, preferBuiltins: true, __VERSION__: `'${pkg.version}'` }),
  analyze({ summaryOnly: true }),
]

export default [
  {
    input,
    output: [
      {
        name,
        file: 'dist/cryptr-react.js',
        format: 'umd',
        globals,
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      ...plugins,
      ...(isProduction
        ? []
        : [
            serve({
              contentBase: ['build'],
              open: true,
              port: 5001,
            }),
            livereload({watch: 'src'}),
          ]),
    ],
  },
  ...(isProduction
    ? [
        {
          input,
          output: [
            {
              name,
              file: 'dist/cryptr-react.min.js',
              format: 'umd',
              globals,
              sourcemap: true,
              exports: 'named',
            },
          ],
          plugins: [...plugins, terser()],
        },
        {
          input,
          output: {
            name,
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
          },
          plugins,
        },
        {
          input,
          output: {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
          },
          plugins,
        },
      ]
    : []),
]
