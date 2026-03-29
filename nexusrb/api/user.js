export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  try {
    const r = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`);
    const data = await r.json();
    if (data.errorMessage || !data.Id) return res.status(404).json({ error: 'User not found' });

    // Get avatar thumbnail
    const thumbR = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.Id}&size=420x420&format=Png&isCircular=false`);
    const thumbData = await thumbR.json();
    const imageUrl = thumbData?.data?.[0]?.imageUrl || null;

    res.json({ id: data.Id, username: data.Username, imageUrl });
  } catch (e) {
    res.status(500).json({ error: 'Roblox API error' });
  }
}
