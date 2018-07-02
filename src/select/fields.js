/**
 * Create the SQL fragment used to SELECT GeoJSON attributes
 * @param {object} options
 * @param {string} idField a string that identifies which property can be used as the OBJECTID
 */
function createClause (options = {}, idField = null) {
  // Default clause
  let clause = `type, properties as properties`

  // Comma-delimited list of date-fields is needed for formatting ESRI specific output
  let dateFields = options.dateFields.join(',')

  // If options.fields defined, selected only a subset of teh GeoJSON properties
  if (options.fields) {
    // if option.fields is an Array, join with comma; if already a comma delimited list, remove any spaces
    let fields = (options.fields instanceof Array) ? options.fields.join(',') : options.fields.replace(/,\s+/g, ',')

    // For ESRI specific output, process w/ "pickAndEsriFy"; for simple GeoJSON output, process with "pick"
    clause = (options.toEsri) ? `pickAndEsriFy(properties, geometry, "${fields}", "${dateFields}", "${options.idField}") as attributes` : `pick(properties, "${fields}") as properties`
  } else if (options.toEsri) {
    // For ESRI specific output, process w/ "esriFy"
    clause = `esriFy(properties, geometry, "${dateFields}", "${options.idField}") as attributes`
  }
  return clause
}

module.exports = { createClause }
