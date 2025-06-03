export default async function handler(req, res) {
  const url = 'https://litangdingzhen.me/get_data';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (Array.isArray(data) && data.length >= 4) {
      const sold_counts = data.slice(0, 4).map((item, index) => ({
        [`sold_count_${index + 1}`]: item?.sold_count ?? null
      }));

      const hasAllCounts = sold_counts.every(item =>
        Object.values(item)[0] !== null
      );

      res.setHeader('Access-Control-Allow-Origin', '*');

      if (hasAllCounts) {
        // 合并成一个对象返回
        const result = Object.assign({}, ...sold_counts);
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: '部分 sold_count 不存在' });
      }
    } else {
      res.status(404).json({ error: '数据不足四个元素' });
    }
  } catch (err) {
    res.status(500).json({ error: '查询失败', detail: err.message });
  }
}
