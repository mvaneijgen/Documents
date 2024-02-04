// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: location-arrow;
const weather = importModule('_Widget Weather')
let fm = FileManager.iCloud()
//--------------------------------//
// Styling 
//--------------------------------//
const SIZE = {
  sm: 10,
  md: 16,
  lg: 50
}
const COLOR = {
  grey: "#bbbbbb",
  bgGrey: "#1e1e1e"
}
// END Styling --------------//

const status = {
  '0-14': '👍', // Onder de 14km
  '15-16': '👌', // Onder de 16km
  '17-20': '👎', // Onder de 20km
  '21-100': '💣' // Meer dan 20
}
let currStatus = "📂";


const widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentMedium()
}
Script.setWidget(widget)
Script.complete()
//--------------------------------//
// Create widget
//--------------------------------//
async function createWidget() {

  let path;
  if (fm.bookmarkExists("Longboard data.json")) {
    path = fm.bookmarkedPath("Longboard data.json")
  }
  let data = JSON.parse(fm.readString(path));

  const widget = new ListWidget()
  const stack = widget.addStack();
  stack.layoutVertically();

  let row = stack.addStack()
  // row.addSpacer()

  // Caclualate all distances 
  const resultDistances = data.entries.reduce((accumulator, item) => {
    return accumulator += item.distance.toFixed(2);
  }, 0)
  const distanceLeft = data.goal - resultDistances;
  // Weeks left 

  const weeksLeft = Math.ceil((new Date(data.endDate) - new Date()) / 604800000);
  const calcAvrage = Math.ceil(distanceLeft / weeksLeft);
  const stringStatus = `${Math.round(distanceLeft)}km`

  //Get status --------//
  Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return this >= min && this <= max;
  };
  for (const [key, value] of Object.entries(status)) {
    let numbers = key.split('-');
    if (calcAvrage.between(...numbers)) {
      currStatus = value;
    }
  }
  /*--------------------------------
  | 🛠️ TO GO                       |
  | 123km left                     |
  | 👍 12km per week    🗓️ 12 weeks |
  --------------------------------*/
  row = stack.addStack()
  const title = stack.addText(`🛹 TO GO`)
  title.font = Font.mediumSystemFont(SIZE.sm)
  title.textColor = new Color(COLOR.grey)
  row = stack.addStack()
  row.addText(stringStatus)
  row = stack.addStack()
  const sub = row.addText(`${currStatus}${calcAvrage}km 🗓️ ${weeksLeft} weeks`);
  sub.font = Font.mediumSystemFont(SIZE.sm)
  sub.textColor = new Color(COLOR.grey)

  return widget
}
// END Create widget ------------//
