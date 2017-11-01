const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Voters {

  static findAll() {
    let query = `SELECT * FROM voters`
    return new Promise((resolve,reject) => {
      db.all(query, function(err, voters) {
        if(!err) {
          resolve(voters)
        } else {
          reject(err)
        }
      })
    })
  }

  static findWhere(column, value, type) {
    let query = `SELECT *
                 FROM Voters WHERE ${column} `
    // let query = `SELECT id,
    //                 first_name,
    //                 last_name,
    //                 gender,
    //                 age,
    //                 case married
    //                 when 1 then 'Married'
    //                 when 0 then 'Single/Widow'
    //                 end married,
    //                 children_count
    //              FROM Voters WHERE ${column} `
    switch(type) {
      case 'equal':
        query += `= '${value}'`;
        break
      case 'like':
        query += `like '%${value}%' `
        break;
      case 'between':
        query += `between ${value.start} and ${value.end} `
        break;
      default:
        query += `= '${value}'`;
        break;
    }

    query += `ORDER BY ${column} asc`;

    return new Promise((resolve,reject) => {
      db.all(query, function(err, voters){
        if(!err) {
          resolve(voters)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = Voters
