import { Router } from 'express';
import { ITEMS } from '../data/items';
import { requireAuth, AuthedRequest } from '../middleware/auth';

const router = Router();

router.get('/items', requireAuth, (req: AuthedRequest, res) => {
  const role = req.user!.role;
  const { category, q } = req.query as { category?: string; q?: string };

  let results = ITEMS.slice();

  if (role !== 'admin') {
    results = results.filter(i => i.category !== 'Dairy, Meat & Fresh Foods');
  }

  if (category) {
    results = results.filter(i => i.category === category);
  }

  if (q) {
    const needle = q.toString().toLowerCase();
    results = results.filter(i => i.name.toLowerCase().includes(needle));
  }

  res.json({ count: results.length, items: results });
});

export default router;