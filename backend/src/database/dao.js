const db = require('./database');

class DAO {

    static selectOne({table = '', fields = ['*'], params = {}, additionalQuery = ''}, cb) {
        const query = {
            text: `SELECT ${fields.join(', ')} FROM ${table} ${getParams(params)} ${additionalQuery}`,
            values: Object.values(params)
        };
        db.executeQuery(query, (result) => cb(result && result[0]));
    }

    static selectMany({table = '', fields = ['*'], join = "", params = {}, additionalQuery = ''}, cb) {
        const query = {
            text: `SELECT ${fields.join(', ')} FROM ${table} ${join} ${getParams(params)} ${additionalQuery}`,
            values: Object.values(params)
        };
        db.executeQuery(query, (result) => cb(result));
    }

    static insert({table = '', values = {}}, cb) {
        const query = {
            text: `INSERT INTO ${table} ${join(getFields(values))} VALUES ${getInsertValues(values)} RETURNING id`,
            values: Object.values(values)
        };
        db.executeQuery(query, (result) => cb(result && result[0]));
    }

    static update({table = '', values = {}, params = {}}, cb) {
        const numberParams = getFields(values).length;
        const query = {
            text: `UPDATE ${table} SET ${getUpdateValues(values)} ${getParams(params, numberParams)}`,
            values: Object.values(values).concat(Object.values(params))
        };
        db.executeQuery(query, (result) => cb(result && result[0]));
    }

    static delete({table = '', params = {}}, cb) {
        const query = {
            text: `DELETE FROM ${table} ${getParams(params)}`,
            values: Object.values(params)
        };
        db.executeQuery(query, (result) => cb(result && result[0]));
    }

    static custom({sql = '', values = []}, cb){
        const query = {
            text: sql,
            values: values
        };
        db.executeQuery(query, (result) => cb(result));
    }
}

/*FUNCTIONS*/

function getFields(params){
    return Object.getOwnPropertyNames(params);
}

function join(array){
    return "( ".concat(array.join(', '), " )");
}

function paramIndex(index) {
    return `$${index + 1}`;
}

function getParams(params, baseIndex = 0){
    let query = 'WHERE 1 = 1';
    const columns = getFields(params);
    columns.forEach((column, index) => {
        query += ` AND ${column} = ${paramIndex(baseIndex + index)}`;
    });
    return query;
}

function getInsertValues(values){
    const indexValues = [];
    getFields(values).forEach((column, index) => {
        indexValues.push(paramIndex(index));
    });
    return join(indexValues);
}

function getUpdateValues(params){
    const values = [];
    getFields(params).forEach((column, index) => {
        values.push(`${column} = ${paramIndex(index)}`);
    });
    return values.join(', ');
}

module.exports = DAO;