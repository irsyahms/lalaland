const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/congress_poll_results.db');

class Votes {

  static findTopFive() {
    let query = `select v.total, v.name, voters.first_name, v.politician_id
                 from
                  (select count(votes.id) as total, politician_id, congress_members.name
                  from votes
                  left join congress_members
                  ON congress_members.id = votes.politician_id
                  group by politician_id
                  order by total desc
                  limit 5) as v
                  inner join votes ON v.politician_id = votes.politician_id
                  inner join voters ON votes.voter_id = voters.id
                  order by v.total desc, v.name`;

    return new Promise((resolve, reject) => {
      db.all(query, function(err,rows) {
        if(!err) {
          let tempArr = []
          let isFirst = true;
          let prevId = null

          //manipulasi object
          rows.map( r => {
            if(isFirst && prevId === null) {
              tempArr.push(r.first_name)
              prevId = r.politician_id;
              isFirst = false
            } else if(!isFirst && prevId === r.politician_id) {
              tempArr.push(r.first_name)
              prevId = r.politician_id;
            } else if(!isFirst && prevId !== r.politician_id) {
              tempArr = []
              tempArr.push(r.first_name);
              prevId = r.politician_id
            }
            r.voters = tempArr
          })

          isFirst = true
          prevId = null

          //filter distinct
          let result = rows.filter(function(r, index) {
            if(isFirst && prevId == null) {
              prevId = r.politician_id;
              isFirst = false
              return true
            } else if(!isFirst && prevId === r.politician_id) {
              return false
            } else if(!isFirst && prevId !== r.politician_id) {
              prevId = r.politician_id
              return true
            }
          })
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

  static analyzed() {
    let query = `select v.total as total, v.name as name, v.gender as gender,v.age as age
                from
                (select count(votes.id) as total,
                   voters.first_name || ' ' || voters.last_name as name,
                   voters.gender,
                   voters.age
                from votes
                left join congress_members
                ON congress_members.id = votes.politician_id
                left join voters
                ON votes.voter_id = voters.id
                group by votes.voter_id
                order by name asc, total desc) as v
                where v.total > 1`;

    return new Promise((resolve,reject) => {
      db.all(query, function(err,rows) {
        if(!err) {
          console.log(rows);
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
  }
}

Votes.findTopFive()

module.exports = Votes
