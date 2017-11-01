const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db')

class Politician {

  static findAll() {
    let query = `SELECT * FROM congress_members;`
    return new Promise((resolve,reject) => {
      db.all(query, function(err, politicians){
        if(!err) {
          resolve(politicians)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = Politician
