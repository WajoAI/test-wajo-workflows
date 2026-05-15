const express = require('express');
const router = express.Router();

// BUG: SQL injection vulnerability (intentional for testing TLM review)
router.get('/users', async (req, res) => {
  const name = req.query.name;
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  const results = await db.query(query);
  res.json(results);
});

// BUG: No auth check on admin endpoint
router.delete('/users/:id', async (req, res) => {
  await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.json({ deleted: true });
});

module.exports = router;
// trigger rebuild
// re-trigger
