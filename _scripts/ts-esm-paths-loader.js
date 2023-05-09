import { resolve as resolveTs } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'
import { pathToFileURL } from 'url'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

console.log(paths)

export function resolve(specifier, ctx, defaultResolve) {
  console.log('---------------------------');
  const lastIndexOfIndex = specifier.lastIndexOf('/index.js')
  console.log('specifier', specifier);
  if (lastIndexOfIndex !== -1) {
    // Handle index.js
    const trimmed = specifier.substring(0, lastIndexOfIndex)
    const match = matchPath(trimmed)
    console.log('trimmed', trimmed, match);
    if (match) {
      const filePath = pathToFileURL(`${match}/index.js`).href;
      console.log('filePath', filePath);
      return resolveTs(filePath, ctx, defaultResolve)
    }
  } else if (specifier.endsWith('.js')) {
    // Handle *.js
    const trimmed = specifier.substring(0, specifier.length - 3)
    const match = matchPath(trimmed)
    console.log('trimmed', trimmed, match);
    if (match) {
      const filePath = pathToFileURL(`${match}.js`).href;
      console.log('filePath', filePath);
      return resolveTs(filePath, ctx, defaultResolve)
    }
  }
  return resolveTs(specifier, ctx, defaultResolve)
}

export { load, transformSource } from 'ts-node/esm'