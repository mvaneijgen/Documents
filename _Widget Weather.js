// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: cloud;
module.exports = async () => {
  const config = importModule('_config')
  const cfg = await config()
  //   const location = await Location.current();
  const location = cfg.location;
  const apiKey = cfg.darksky.apiKey;
  const lang = 'en';
  const units = 'si';
  const url =
    `https://api.darksky.net/forecast/${apiKey}/${location.latitude},${location.longitude}?lang=${lang}&units=${units}&exclude=minutely,hourly`;

  let current;
  let fm = FileManager.iCloud()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, "wind.json")
  let text = fm.read(path)
  let rawString = text.toRawString()
  let logicJSON = JSON.parse(rawString);
  const obj = {
    weather: {
      icon: '🌤️',
      temp: '0°',
      rain: '0%'
    },
    wind: {
      direction: '🎯',
      speed: '0',
      icon: '🎏'
    }
  }
  // END Scriptable get JSON -------------------------------------//
  const r = new Request(url)
  let resp = await r.load()

  resp = resp.toRawString()
  resp = JSON.parse(resp);

  current = resp.currently;
  const directionSections = 360 / logicJSON.direction.length; // Divide 360 degrees to the amount of directions
  if (current.windBearing) {
    // if (current.hasOwnProperty('windBearing')) {
    const direction = Math.ceil(current.windBearing / directionSections) - 1; // Calculate the wind 💨 the wind direction. Minus 1 because JS strats at 0
    obj.wind.direction = logicJSON.direction[direction];
    obj.wind.speed = Math.round(current.windSpeed);
  }
  // Calculate Wind 💨 strenght
  Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return this >= min && this <= max;
  };

  for (const [key, value] of Object.entries(logicJSON.speed)) {
    let numbers = key.split('-');
    if (current.windSpeed.between(...numbers)) {
      obj.wind.icon = value;
    }
  }
  obj.weather.temp = `${Math.round(current.temperature)}°`;
  obj.weather.rain = `${current.precipProbability*100}%`;

  return obj;
}