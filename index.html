export default async function handler(req, res) {
  const url = 'https://litangdingzhen.me/get_data';

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 只返回第一项（包含 re_coin 和 sold_count）
    const first = Array.isArray(data) && data.length > 0 ? data[0] : null;

    if (first && typeof first.sold_count !== 'undefined') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({ sold_count: first.sold_count });
    } else {
      res.status(404).json({ error: '未找到 sold_count' });
    }
  } catch (err) {
    res.status(500).json({ error: '查询失败', detail: err.message });
  }
