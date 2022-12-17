import { createRequire } from 'module'

const req = createRequire(import.meta.url)
export const Package = req('../../../package.json')
