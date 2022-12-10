// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: grip-horizontal;
// ? Comment out modules you don't want to use
// const battery = importModule('_Widget Battery')
const calendar = importModule('_Widget Calendar')
// const todoist = importModule('_Widget todoist')
const weather = importModule('_Widget Weather')// 
const mail = importModule('_Widget mail')
const notion = importModule('_Widget notion')
// const bgImage = importModule('_Widget bgImage')
// Split 🧩 up widget output to seperate files
const SIZE = {
  sm: 10,
  md: 16,
  lg: 50
}
const COLOR = {
  grey: "#bbbbbb",
  bgGrey: "#1e1e1e"
}
function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '…'
}
//--------------------------------//
// Setup widget 
//--------------------------------//
const widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentLarge()
}
Script.setWidget(widget)
Script.complete()
// END Setup widget --------------//

//--------------------------------//
// Create widget
//--------------------------------//
async function createWidget() {

  const widget = new ListWidget()
  const stack = widget.addStack();
  stack.layoutVertically();

  //--------------------------------//
  // Background 🖼️ image 
  //--------------------------------//
  if (typeof bgImage !== 'undefined') {
    const path = await bgImage()
    if (path) {
      //       const file = Image.fromFile(path)
      const fm = FileManager.iCloud()
      widget.backgroundImage = fm.readImage(path)
    }
  }
  //   let fm = FileManager.iCloud()
  //   let path = ''
  //   if (fm.bookmarkExists("image.jpg")) {
  //     path = fm.bookmarkedPath("image.jpg")
  //     widget.backgroundImage = fm.readImage(path);
  //   }
  //   return path
  //   myfi
  // let fm = FileManager.iCloud()
  // const filename = "image.jpg"
  // const files = FileManager.local()
  // const path = files.joinPath(files.documentsDirectory(), filename)
  let fm = FileManager.iCloud()
  let image = fm.readImage(fm.documentsDirectory() + "/image.jpg")
//   widget.backgroundImage = image
widget.backgroundColor = new Color(COLOR.bgGrey)

  // END Background 🖼️ image --------------//

  //--------------------------------//
  // top row 
  /*--------------------------------
  | DATE                      BATT |
  --------------------------------*/
  let row = stack.addStack()
  if (typeof calendar !== 'undefined') {
    const dateText = row.addText(await calendar.date())
    dateText.font = Font.mediumSystemFont(SIZE.sm)
    dateText.textColor = new Color(COLOR.grey)
  }
  row.addSpacer()
  if (typeof battery !== 'undefined') {
    const batteryText = row.addText(battery())
    batteryText.font = Font.mediumSystemFont(SIZE.sm)
    batteryText.textColor = new Color(COLOR.grey)
    batteryText.rightAlignText()
  }
  // END top bar  --------------//
  //--------------------------------//
  // Calendar row
  /*--------------------------------
  | CAL 1                    CAL 3 |
  | CAL 1                    CAL 3 |
  --------------------------------*/
  if (typeof calendar !== 'undefined') {
    let calendarItems = await calendar.items()
    calendarItems = calendarItems.slice(0, 4)
    calendarItems.forEach((item, index, array) => {
      // Add a new row every two items
      if (index % 2 === 0) {
        row = stack.addStack()
        row.url = "calshow://"
      }
      const calStack = row.addStack()
      calStack.layoutVertically();

      const title = calStack.addStack()
      // title.layoutVertically();

      const colorBar = title.addText('❙ ')
      colorBar.textColor = new Color(`#${item.hex}`)

      title.addText(truncateString(item.title, 14))

      const time = calStack.addText(item.time)
      time.font = Font.mediumSystemFont(SIZE.sm)
      time.textColor = new Color(COLOR.grey)
      row.addStack(calStack)

      if (index % 2 === 0) {
        row.addSpacer()
      }
    })
  }
  // END Calendar row  --------------//
  stack.addSpacer()
  //--------------------------------//
  // Middle row 
  /*--------------------------------
  | TODO         WIND         MAIL |
  | ITEM         TEMP              |
  | ITEM                           |
  --------------------------------*/
  row = stack.addStack()
  if (typeof todoist !== 'undefined') {
    const todoItems = await todoist()
    const todoStack = row.addStack()
    todoStack.layoutVertically();
    todoStack.url = "todoist://"
    if (todoItems.length > 1) {
      todoItems.forEach((item, index, array) => {
        todoStack.addText(`□ ${truncateString(item, 12)}`)
        row.addStack(todoStack)
      })
    } else {
      todoStack.addText('All done for today 🎉')
    }
  }
  row.addSpacer()
  if (typeof weather !== 'undefined') {
    const weatherObj = await weather();
    const weatherStack = row.addStack();
    weatherStack.layoutVertically();
    weatherStack.url = "https://www.buienradar.nl/nederland/neerslag/zoom/3uurs?lat=52.381&lon=4.637"

    weatherStack.addText(`${weatherObj.weather.icon} ${weatherObj.weather.temp} ${weatherObj.weather.rain}`)
    weatherStack.addText(`${weatherObj.wind.direction} ${weatherObj.wind.speed}m/s ${weatherObj.wind.icon}`)
  }
  row.addSpacer()
  if (typeof mail !== 'undefined') {
    const mailText = row.addText(await mail())
    mailText.font = Font.mediumSystemFont(SIZE.lg)
    mailText.rightAlignText()
    mailText.url = "googlegmail://"
  }
  // END Middle row --------------//
  stack.addSpacer()
  //--------------------------------//
  // Notion row
  /*--------------------------------
  | 🛠️ Create                      |
  | ITEM                      ITEM |
  | ITEM                      ITEM |
  | ITEM                      ITEM |
  --------------------------------*/
  const notionText = stack.addText("🛠️ CREATE")
  row = stack.addStack()
  row.url = "https://www.notion.so/studioalloy/Yearly-theme-Create-0c1f56de907046ef82c8e1d345c4d39f"

  if (typeof notion !== 'undefined') {
    let notionItems = await notion()
    notionItems = notionItems.slice(0, 8)
    notionText.font = Font.mediumSystemFont(SIZE.sm)
    notionText.textColor = new Color(COLOR.grey)

    const halfItems = notionItems.length / 2;
    let nextHalf = false;
    let notionStack = row.addStack();
    row.addSpacer()

    notionItems.forEach((item, index, array) => {
      // Split the layout into after half the itmes
      if (!nextHalf && index >= halfItems) {
        nextHalf = true;
        notionStack = row.addStack()

      }
      notionStack.layoutVertically();
      notionStack.addText(truncateString(item.title, 16))
      const nextText = notionStack.addText(truncateString(item.next, 30))
      // notionStack.addText(item.title)
      //       const nextText = notionStack.addText(item.next.toString())
      nextText.font = Font.mediumSystemFont(SIZE.sm)
      nextText.textColor = new Color(COLOR.grey)
    })
  }
  // END Notion row --------------//
  return widget
}
// END Create widget ------------//
