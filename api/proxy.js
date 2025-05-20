export default async function handler(req, res) {
  const url = 'https://litangdingzhen.me/get_data';

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: '查询失败', detail: err.message });
  }
}
