import { ClientEngineType } from '../../runtime/utils/getClientEngineType'

/**
 * Builds the necessary bits so that our users can get a helpful warning during
 * "generate" in case of conflicts between their environment & their env files.
 * @param clientEngineType
 * @param runtimePath
 * @returns
 */
export function buildWarnEnvConflicts(
  clientEngineType: ClientEngineType,
  runtimePath: string,
  runtimeName: string,
) {
  if (clientEngineType !== ClientEngineType.DataProxy) {
    return `
const { warnEnvConflicts } = require('${runtimePath}/${runtimeName}')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})`
  }

  return ''
}
