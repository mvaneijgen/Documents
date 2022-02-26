// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: envelope;
module.exports = async () => {
	const config = importModule('_config')
	const cfg = await config()
	const user = cfg.gmail.user;
	const pass = cfg.gmail.pass;
	const token = btoa(`${user}:${pass}`);
	const url = "https://mail.google.com/mail/feed/atom";

	const r = new Request(url)
	r.headers = { 'Authorization': 'basic ' + token };

	const result = await r.loadString();

	const parser = new XMLParser(result)

	const keys = []
	const values = []

	parser.didEndDocument = () => {
		// 	console.log('_________________')
		// 	console.log('Finished parsing!')
		return
	}

	parser.didStartDocument = () => {
		// 	console.log('Starting to parse...')
		// 	console.log('____________________')
		return
	}

	parser.didEndElement = (string) => {
		// 	console.log(string)
		keys.push(string)
		return string
	}

	parser.foundCharacters = (string) => {
		// 	console.log(string)
		values.push(string)
		return string
	}

	parser.parseErrorOccurred = (string) => {
		throw string
	}

	parser.parse()

	const data = {}
	for (i = 0; i < keys.length; i++) {
		data[keys[i]] = values[i]
	}

	return data.fullcount ? data.fullcount : "⧮"
}