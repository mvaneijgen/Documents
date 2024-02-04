// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: check-circle;
module.exports = async () => {
  const config = importModule('_config')
  const cfg = await config()
  const token = cfg.todoist.token;
  const project_id = cfg.todoist.project_id;
  const url =
    `https://api.todoist.com/rest/v2/tasks?project_id=${project_id}`;

  let r = new Request(url)
  r.headers = { 'Authorization': 'Bearer ' + token };

  let result = await r.load();

  result = result.toRawString()
  result = JSON.parse(result);
  console.log(result)

  const items = result
    .filter(item => !item.parent_id) // filter only top level items
    .map(item => `${item.content}`)

  return items;
}