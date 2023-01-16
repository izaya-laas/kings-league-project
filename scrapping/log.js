import pc from 'picocolors'

const main = {
  info: pc.blue('ℹ'),
  success: pc.green('✔'),
  error: pc.red('×'),
  warning: pc.yellow('⚠')
}

export const logInfo = (...args) => console.log(`${main.info} ${pc.cyan(...args)}`)
export const logError = (...args) => console.log(`${main.error} ${pc.red(...args)}`)
export const logSuccess = (...args) => console.log(`${main.success} ${pc.green(...args)}`)
export const logWarning = (...args) => console.log(`${main.warning} ${pc.yellow(...args)}`)
