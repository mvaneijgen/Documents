// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: location-arrow;
const weather = importModule('_Widget Weather')

const widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()
//--------------------------------//
// Create widget
//--------------------------------//
async function createWidget() {

  const widget = new ListWidget()
  const stack = widget.addStack();
  stack.layoutVertically();


  let row = stack.addStack()
  row.addSpacer()

  if (typeof weather !== 'undefined') {
    const weatherStack = row.addStack();
    weatherStack.layoutVertically();
    try {
      const weatherObj = await weather();

      weatherStack.url = "https://www.buienradar.nl/nederland/neerslag/zoom/3uurs?lat=52.381&lon=4.637"

      //       weatherStack.addText(`${weatherObj.weather.icon} ${weatherObj.weather.temp} ${weatherObj.weather.rain}`)
      weatherStack.addText(`${weatherObj.wind.direction}${weatherObj.wind.icon} ${weatherObj.wind.speed}m/s`)
    } catch (error) {
      weatherStack.addText('⚠️')
    }
  }


  return widget
}
// END Create widget ------------//
