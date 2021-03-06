// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: battery-three-quarters;
module.exports = () => {
  const percentage = Math.round(Device.batteryLevel() * 100)
  //   π΄β«οΈπΆπΈπβοΈπβ΄οΈπβ οΈβππ΄π π‘π’π£β«οΈβͺοΈπ€π₯π§π¨π©π¦πͺβ¬οΈβ¬οΈπ«

  const indicator = {
    '0-15': 'π΄',
    '16-49': 'π ',
    '50-80': 'π’',
    '81-100': 'π‘'
  };

  let indicatorSelected;

  Number.prototype.between = function (a, b) {
    var min = Math.min.apply(Math, [a, b]),
      max = Math.max.apply(Math, [a, b]);
    return this >= min && this <= max;
  };

  for (const [key, value] of Object.entries(indicator)) {
    let numbers = key.split('-');
    if (percentage.between(...numbers)) {
      indicatorSelected = value;
    }
  }
  return `${percentage}% ${indicatorSelected}`;
}
