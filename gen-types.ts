import { config } from 'dotenv'
import { execSync } from 'child_process'
import path from 'path'
import { writeFileSync } from 'fs'

config()

const projectId = process.env.SUPABASE_PROJECT_ID
const schema = process.env.SUPABASE_SCHEMA || 'public'
const outFile = path.resolve('src/types/supabase.ts')

if (!projectId) {
  throw new Error('SUPABASE_PROJECT_ID não definido no .env')
}

const cmd = `npx supabase gen types typescript --project-id ${projectId} --schema ${schema}`

console.log(`🔄 Gerando tipos do Supabase para o schema "${schema}"...`)

const types = execSync(cmd, { encoding: 'utf-8' })
writeFileSync(outFile, types)

console.log(`✅ Tipos salvos em ${outFile}`)
