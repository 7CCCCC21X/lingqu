export default async function handler(req, res) {
  const url = 'https://litangdingzhen.me/get_data';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0' // 防止 Cloudflare 拦截
      }
    });

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const sold_count_1 = data[0]?.sold_count;

      if (typeof sold_count_1 !== 'undefined') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ sold_count_1 });
      } else {
        return res.status(404).json({ error: 'sold_count 不存在于第一个元素中' });
      }
    } else {
      return res.status(404).json({ error: '数据为空或格式错误' });
    }
  } catch (err) {
    return res.status(500).json({ error: '查询失败', detail: err.message });
  }
}
