export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { keyword, category } = req.query;

  // Map category names to Roblox subcategory IDs
  const catMap = {
    'Hats': '&subcategory=Hat',
    'Shirts': '&subcategory=ClassicShirts',
    'Pants': '&subcategory=ClassicPants',
    'Faces': '&subcategory=Face',
    'Accessories': '&subcategory=Accessories',
    'Packages': '&subcategory=Bundle',
  };

  const catParam = catMap[category] || '';
  const keywordParam = keyword ? `&keyword=${encodeURIComponent(keyword)}` : '';

  try {
    const url = `https://catalog.roblox.com/v1/search/items?category=Clothing${catParam}${keywordParam}&limit=30&sortType=2`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data.data) return res.json({ items: [] });

    // Get thumbnails for all items
    const ids = data.data.map(i => i.id).join(',');
    const thumbR = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${ids}&size=150x150&format=Png`);
    const thumbData = await thumbR.json();
    const thumbMap = {};
    (thumbData.data || []).forEach(t => { thumbMap[t.targetId] = t.imageUrl; });

    const items = data.data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price ?? 'Free',
      imageUrl: thumbMap[item.id] || null,
      category: category || 'All',
    }));

    res.json({ items });
  } catch (e) {
    res.status(500).json({ error: 'Catalog API error' });
  }
}
