// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
module.exports.bgWidget = function (a, b) {
	const widget = await createWidget()
	if (!config.runsInWidget) {
		await widget.presentLarge()
	}
	Script.setWidget(widget)
	Script.complete()

	async function createWidget() {
		let widget = new ListWidget()
		let req = new Request("https://i.imgur.com/9SfAMW9.jpg")

		let image = await req.loadImage()

		widget.backgroundImage = image

		return widget
	}
}
