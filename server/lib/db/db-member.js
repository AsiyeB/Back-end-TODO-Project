const {
  Client
} = require('pg')

const config = {
  user: process.env.PGUSER,
  password: 'partintern',
  database: process.env.PGDATABASE,
  port: '5432',
  connectionString: 'postgres://maz:partintern@5.39.44.17:5432/todo',
  statement_timeout: process.env.PGTIMEOUT
}

exports.getMemberNameByUsername = (username) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (username) {
        query = client.query('SELECT * FROM member WHERE username=($1)', [username])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getOwnerUsername = (memberid) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (memberid) {
        query = client.query('SELECT username FROM member WHERE memberid=($1)', [memberid])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getMembersBoard = (id) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      let query
      if (id) {
        query = client.query('SELECT member.username,member.image   FROM  member,boardmember where member.memberid = boardmember.memberid and boardmember.boardid=($1)', [id])
      }
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.getBoarsDetail = (ownerid) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT boardinfo.ownerid,boardinfo.boardid,boardinfo.nameboard,member.username FROM  member,boardinfo where member.memberid=boardinfo.ownerid and boardinfo.boardid in (SELECT boardinfo.boardid FROM boardinfo,member,boardmember where ( boardinfo.ownerid = member.memberid and boardinfo.ownerid =($1))or((boardmember.memberid =($1) and boardmember.boardid=boardinfo.boardid and boardmember.memberid=member.memberid)))', [ownerid])
      // const query = client.query('SELECT DISTINCT boardinfo.boardid,member.username FROM member,boardinfo where member.username IN (SELECT  member.username from member WHERE member.memberid IN (SELECT boardinfo.ownerid FROM boardinfo,member,boardmember where ( boardinfo.ownerid = member.memberid and boardinfo.ownerid =($1))or((boardmember.memberid =($1) and boardmember.boardid=boardinfo.boardid and boardmember.memberid=member.memberid))))', [ownerid])
      // const query = client.query('  where ( boardinfo.ownerid = member.memberid and boardinfo.ownerid =($1))or((boardmember.memberid =($1) and boardmember.boardid=boardinfo.boardid and boardmember.memberid=member.memberid))', [ownerid])
      // let query = client.query('SELECT DISTINCT boardinfo.boardid,ownerid,boardinfo.nameboard,boardinfo.ownerid FROM boardinfo,member,boardmember where ( boardinfo.ownerid = member.memberid and boardinfo.ownerid =($1))or((boardmember.memberid =($1) and boardmember.boardid=boardinfo.boardid and boardmember.memberid=member.memberid))', [ownerid])
      return query
      //   .then((res) => {
      //     query = client.query('SELECT member.username FROM  member where member.memberid in (SELECT ownerid FROM boardinfo,member,boardmember where ( boardinfo.ownerid = member.memberid and boardinfo.ownerid =($1))or((boardmember.memberid =($1) and boardmember.boardid=boardinfo.boardid and boardmember.memberid=member.memberid))))', [ownerid])
      //       .then((res) => {
      //         console.log(res)
      //       })
      //   })
    })
    .then((res) => {
      // console.log(res)
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addMember = (member) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // const id = 1256
      return client.query(`INSERT INTO member(firstname,lastname) 
                      VALUES ($1, $2);`,
        [member.firstname, member.lastname])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.getlastMember = () => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      const query = client.query('SELECT * FROM member ORDER BY memberid DESC LIMIT 1')
      return query
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.addMemberToBoard = (member) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // const id = 1256
      return client.query(`INSERT INTO boardmember(boardid,memberid) 
                      VALUES ($1, $2);`,
        [member.boardid, member.memberid])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.removeMember = (boardid, memberid) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      return client.query(`DELETE FROM  boardmember WHERE boardid=($1) and memberid=($2)`, [boardid, memberid])
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
exports.removeUser = (username) => {
  let result
  const client = new Client(config)
  return client
    .connect()
    .then(() => {
      // return client.query(`DELETE FROM todoinfo WHERE boardid=($1)`, [id])
      // .then(() => {
      return client.query(`DELETE FROM member WHERE username=($1)`, [username])
      // })
    })
    .then((res) => {
      result = res
      return client.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      throw e
    })
}