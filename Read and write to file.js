// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: genderless;
// const fileManager = FileManager.iCloud();
// or to store files only locally
// const fm = FileManager.local();
// const data = { data: "data" }
// to write data, use
// fileManager.write(fileManager.documentsDirectory(), data);
// or to write string, use
// fileManager.writeString(fileManager.documentsDirectory(), "data");

// write(filePath, content)

let fm = FileManager.iCloud()
let path = ''
if (fm.bookmarkExists("data")) {
  path = fm.bookmarkedPath("data")
}
// console.log(path)
const dataCurrent = fm.readString(path);
const string = '"date","Harmonica"';
const data = `${dataCurrent}\n${string}`;
fm.writeString(path, data)

// async function getCSV() {
//   let rawFeed = await loadText(fm);
//   console.log(rawFeed);  
//   return rawFeed.split('\n');
// }
// 
// async function loadText(url) {
//   let req = new Request(url)
//   let txt = await req.loadString()
//   return txt;
// }