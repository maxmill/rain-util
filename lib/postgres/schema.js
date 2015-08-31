var queries = {
    tables: function tables(namespace = 'public') {
        return 'SELECT table_name FROM information_schema.tables  WHERE table_schema=\'' + namespace + '\';';
    },

    columns: function columns(tables, namespace = 'public') {
        return 'SELECT attnum, attname, attrelid:: REGCLASS AS table_name, format_type(atttypid, atttypmod) AS datatype ' + 'FROM pg_attribute ' + 'WHERE NOT attisdropped AND attnum > 0 ' + 'AND attrelid IN (' + tables.map(function (id) {
                return '\'' + namespace + '.' + id + '\'::REGCLASS';
            }).join(',') + ') ' + 'ORDER BY attrelid, attnum;';
    },
    indexes: 'SELECT U.usename AS user_name, ns.nspname AS schema_name, idx.indrelid :: REGCLASS AS table_name, i.relname AS index_name, idx.indisunique AS is_unique, idx.indisprimary AS is_primary, am.amname AS index_type, idx.indkey, ARRAY( SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE) FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k) AS index_keys,(idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional, idx.indpred IS NOT NULL AS is_partial FROM pg_index AS idx JOIN pg_class AS i ON i.oid = idx.indexrelid JOIN pg_am AS am ON i.relam = am.oid JOIN pg_namespace AS NS ON i.relnamespace = NS.OID JOIN pg_user AS U ON i.relowner = U.usesysid WHERE NOT nspname LIKE \'pg%\';'
};
var tableBlackList = ['seed', 'migrate', 'pg', 'schema'];
var withoutTableNames = function withoutTableNames(c) {
    delete c.table_name;
    return c;
};
var blackList = function excludeTables(tables) {
    return tables.map(function (t) {
        return t.table_name;
    }).filter(function (t) {
        return tableBlackList.indexOf(t.split('_')[0]) < 0;
    });
};
var field = function field(column) {
    return {
        fieldId: column.attnum,
        fieldName: column.attname,
        fieldType: column.datatype
    };
};
var getEntities = function getEntities(tables, columns, indexes) {
    var entities = {};
    tables.forEach(function (t) {
        var matches = function matches(c) {
            return c.table_name === t;
        };
        entities[t] = {
            columns: columns.filter(matches).map(withoutTableNames).map(field),
            indexes: indexes.filter(matches).map(withoutTableNames)
        };
    });
    return entities;
};

module.exports = {
    queries: queries,
    blackList: blackList,
    getEntities: getEntities
};