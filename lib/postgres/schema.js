var queries = function (namespace = 'public') {
    return {
        tables: `SELECT table_name FROM information_schema.tables  WHERE table_schema='${namespace}';`,
        columns: `SELECT * FROM information_schema.columns WHERE table_schema = '${namespace}'`,
        indexes: `SELECT U.usename AS user_name, ns.nspname AS schema_name, idx.indrelid::REGCLASS AS table_name, i.relname AS index_name, idx.indisunique AS is_unique, idx.indisprimary AS is_primary, am.amname AS index_type, idx.indkey, ARRAY( SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE) FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k) AS index_keys,(idx.indexprs IS NOT NULL) OR (idx.indkey::int[] @> array[0]) AS is_functional, idx.indpred IS NOT NULL AS is_partial FROM pg_index AS idx JOIN pg_class AS i ON i.oid = idx.indexrelid JOIN pg_am AS am ON i.relam = am.oid JOIN pg_namespace AS NS ON i.relnamespace = NS.OID JOIN pg_user AS U ON i.relowner = U.usesysid WHERE nspname='${namespace}';`,
        constraints: `SELECT constraint_name, constraint_type, table_name FROM information_schema.table_constraints  WHERE table_schema = '${namespace}'`
    }
};

var tableBlackList = ['seed', 'migrate', 'pg', 'schema'];
var withoutTableNames = (c) => {
    delete c.table_name;
    return c;
};
var blackList = (tables) =>
    tables.map((t)=> t.table_name)
        .filter((t)=> tableBlackList.indexOf(t.split('_')[0]) < 0);

var field = (column) => ({
    fieldId: column.attnum,
    fieldName: column.attname,
    fieldType: column.datatype
});
var constraint = (c)=>({
    name: c.constraint_name,
    type: c.constraint_type
});
var matchTable = (c) =>  c.table_name === t;
var getEntities = (tables, columns, indexes, constraints) =>
    tables.map((t) =>({
        columns: columns.filter(matches).map(field),
        indexes: indexes.filter(matches).map(withoutTableNames),
        constraints: constraints.filter(matches).map(withoutTableNames).map(constraint)
    }));

module.exports = {
    queries: queries,
    blackList: blackList,
    getEntities: getEntities
};