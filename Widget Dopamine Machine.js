// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: smile-beam;
// const battery = importModule('_Widget Battery')
const SIZE = {
  sm: 10,
  md: 12,
  lg: 50
}
const COLOR = {
  grey: "#bbb",
  light: "#fff",
}
let fm = FileManager.iCloud()

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

  let image = fm.readImage(fm.documentsDirectory() + "/imgMedium.JPG")
  widget.backgroundImage = image

  // END Background 🖼️ image --------------//
  let path;
  if (fm.bookmarkExists("data.json")) {
    path = fm.bookmarkedPath("data.json")
  }
  const data = JSON.parse(fm.readString(path));

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();


  const things = data.things;
  const glyphs = data.glyphs;
  const count = 22;
  const today = new Date();

  let row = stack.addStack()

  things.forEach(item => {
    let current = 0;
    let streak = 0;
    let total = 0;
    row = stack.addStack() // Add thing label 
    let thingText = row.addText(item)
    thingText.font = Font.mediumSystemFont(SIZE.md)
    thingText.textColor = new Color(COLOR.grey)

    // Get glyph logic
    row = stack.addStack()
    const filter = data.entries.filter(entry => entry.type === item);
    let previousDayCount = 1;
    let progress
    let text = []

    function calibrating(array) {
      for (const [index, m] of array.entries()) {
        if (m === glyphs[2]) break;
        if (m === glyphs[3]) array[index] = glyphs[0]
      }
    }

    // First of check if today has entry before looping
    const checkToday = filter.some(found => {
      return datesAreOnSameDay(new Date(found.date), today);
    })
    text.push(checkToday ? glyphs[2] : glyphs[1])

    function logic(data) {      // Check if the dayBefore is in data
      const check = filter.some(found => {
        const dayBefore = new Date(new Date().setDate(today.getDate() - previousDayCount));
        return datesAreOnSameDay(new Date(found.date), dayBefore);
      })
      if (check) {
        total++;
        streak++;
        current++;
        return text.push(glyphs[2])
      }
      // Todo: Check if there is no more data glyphs[0]
      //       if (filter.length < count - previousDayCount) return text.push(glyphs[0])
      // Otherwise glyph failed
      text.push(glyphs[3])

    }

    for (let i = 0; i < count; i++) {
      logic()
      previousDayCount++;
    }

    // Check if the last glyphs are red
    text.reverse()
    calibrating(text)
    row = stack.addStack() // Add thing label 
    // Add thing progress to row
    progress = row.addText(text.join(''))
    progress.font = Font.mediumSystemFont(SIZE.sm)
    //     progress.textColor = new Color(COLOR.grey)
  })

  // END top bar  --------------//
  stack.addSpacer()

  return widget
}
// END Create widget ------------//