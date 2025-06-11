export default async function handler(req, res) {
  const url = 'https://litangdingzhen.me/get_data';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0' // 防止 Cloudflare 拦截
      }
    });

    const data = await response.json();

    // 需要至少两组数据
    if (Array.isArray(data) && data.length >= 2) {
      const sold_count_1 = data[0]?.sold_count;
      const sold_count_2 = data[1]?.sold_count;

      if (typeof sold_count_1 !== 'undefined' && typeof sold_count_2 !== 'undefined') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ sold_count_1, sold_count_2 });
      } else {
        return res.status(404).json({ error: '前两组数据中缺少 sold_count 字段' });
      }
    } else {
      return res.status(404).json({ error: '数据少于两组或格式错误' });
    }
  } catch (err) {
    return res.status(500).json({ error: '查询失败', detail: err.message });
  }
}
