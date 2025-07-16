var express = require('express');
var router = express.Router();
const pgp = require('pg-promise')({
  error: (_, e) => {
    if (e.cn) {
      console.info('Connection', e.cn);
    }
  }
});

const db = pgp({
  "host": process.env.PG_HOSTNAME,
  "port": process.env.PG_PORT,
  "database": process.env.PG_DATABASE,
  "user": process.env.PGUSER,
  "password": process.env.PGPASSWORD,
});

db.connect().then(obj => {
  obj.done();
}).catch(error => {
  console.log("Database error", error.message ?? error);
})

/* GET items */
router.get('/', function(req, res) {
  db.many('SELECT * from items ORDER BY id ASC').then((data) => {
    res.status(200).send({ "items": data });
  }).catch((err) => {
    res.status(500).send({ err });
  });
});
  
/* POST items */
router.post('/', (req, res) => {
  db.result(`INSERT INTO items VALUES(DEFAULT, '${req.query.name}');`
  ).then(data =>
      res.status(201).send({ "inserted": data.rowCount })
  );
});

/* DELETE items */
router.delete('/:id', (req, res) => {
  db.none(
    `DELETE FROM items where id=${req.params.id};`
  ).then(
    res.status(200).send({})
  ).catch(err => {
    res.status(500).send(err);
  });
});

/* edit items */
router.post('/edit/:id', (req, res) => {
  db.none(`UPDATE items SET name='${req.query.name}' WHERE id=${req.params.id}`);
  res.status(200).send({});
});

module.exports = router;
