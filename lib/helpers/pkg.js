import Path from 'path'
import { createRequire } from 'module'

const req = createRequire(import.meta.url)
export const Package = req(Path.resolve(process.cwd(), 'package.json'))
