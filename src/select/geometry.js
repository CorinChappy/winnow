const compose = require('./compose')
function createClause (options = {}) {
  const funcs = []
  if (options.projection) funcs.push({ project: true })
  if (options.geometryPrecision) funcs.push({ reducePrecision: true })
  if (options.toEsri) funcs.push('esriGeom')

  return funcs.length ? compose(funcs, 'geometry') + ' as geometry' : 'geometry'
}

module.exports = { createClause }
