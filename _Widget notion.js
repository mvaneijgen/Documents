// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: check-circle;
module.exports = async () => {
  const config = importModule('_config')
  const cfg = await config()
  const token = cfg.notion.token
  const databaseId = cfg.notion.databaseId
  let url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  const body = {
    filter: {
      and: [
        { property: "Tags", multi_select: { contains: "🛠️ Create" } },
        { property: "Status", select: { does_not_equal: "✅ Done" } },
      { property: "Status", select: { does_not_equal: "🕦 Someday" } }
]
    }
  }

  let r = new Request(url)
  r.method = "POST";
  r.body = JSON.stringify(body)
  r.headers = {
    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token,
    'Notion-Version': '2021-08-16'
  };

  let result = await r.load();
  result = result.toRawString()
  result = JSON.parse(result);
//   console.log(result)
  let items = result.results
    .map(item => {
      const obj = {
        title: `${item.properties.Name.title[0].text.content}`,
        next: ''
      }
      if (item.properties.Next.rich_text[0]) {
        obj.next = item.properties.Next.rich_text[0].text.content
      }
      return obj
    })
    .sort(() => Math.random() - 0.5)
  // .slice(0, 8)
  return items;
}