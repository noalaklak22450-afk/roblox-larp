const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ── /api/user?username=xyz ──
app.get('/api/user', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    const r = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`);
    const data = await r.json();
    if (data.errorMessage || !data.Id) return res.status(404).json({ error: 'User not found' });

    const thumbR = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=420x420&format=Png&isCircular=false`);
    const thumbData = await thumbR.json();
    const imageUrl = thumbData?.data?.[0]?.imageUrl || null;

    res.json({ id: data.Id, username: data.Username, imageUrl });
  } catch (e) {
    res.status(500).json({ error: 'Roblox API error' });
  }
});

// ── /api/catalog?category=Hats&keyword=cool ──
app.get('/api/catalog', async (req, res) => {
  const { category, keyword } = req.query;

  const catMap = {
    'Hats':        'subcategory=Hat',
    'Shirts':      'subcategory=ClassicShirts',
    'Pants':       'subcategory=ClassicPants',
    'Faces':       'subcategory=Face',
    'Accessories': 'subcategory=Accessories',
    'Packages':    'subcategory=Bundle',
  };

  const catParam  = catMap[category] ? `&${catMap[category]}` : '';
  const kwParam   = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';

  try {
    const url = `https://catalog.roblox.com/v1/search/items?category=Clothing${catParam}${kwParam}&limit=30&sortType=2`;
    const r = await fetch(url);
    const data = await r.json();
    if (!data.data) return res.json({ items: [] });

    const ids = data.data.map(i => i.id).join(',');
    const thumbR = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${ids}&size=150x150&format=Png`);
    const thumbData = await thumbR.json();

    const thumbMap = {};
    (thumbData.data || []).forEach(t => { thumbMap[t.targetId] = t.imageUrl; });

    const items = data.data.map(item => ({
      id:       item.id,
      name:     item.name,
      price:    item.price ?? 0,
      imageUrl: thumbMap[item.id] || null,
      category: category || 'All',
    }));

    res.json({ items });
  } catch (e) {
    res.status(500).json({ error: 'Catalog API error' });
  }
});

app.listen(PORT, () => console.log(`NexusRB running on port ${PORT}`));
