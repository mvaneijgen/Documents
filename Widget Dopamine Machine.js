// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: smile-beam;
// const battery = importModule('_Widget Battery')
const SIZE = {
  sm: 10,
  md: 16,
  lg: 50
}
const COLOR = {
  grey: "#bbbbbb"
}

//--------------------------------//
// Setup widget 
//--------------------------------//
const widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentMedium()
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
  widget.backgroundImage = image

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

  return widget
}
// END Create widget ------------//