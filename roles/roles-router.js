const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/newdb.db3"
  }
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("roles")
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("roles")
    .where({ id })
    .first()
    .then(role => {
      res.status(200).json(role);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const role = req.body;
  db("roles")
    .insert(role)
    .then(id => {
      db("roles")
        .where({ id: id[0] })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  db("roles")
    .where({ id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("roles")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json(count);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
