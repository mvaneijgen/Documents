// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: battery-three-quarters;
module.exports = () => {
  const percentage = Math.round(Device.batteryLevel() * 100)
  //   🔴⚫️🔶🔸💚❇️🛑✴️🆘⚠️✅🛑🔴🟠🟡🟢🟣⚫️⚪️🟤🟥🟧🟨🟩🟦🟪⬛️⬜️🟫

  const indicator = {
    '0-15': '🔴',
    '16-49': '🟠',
    '50-80': '🟢',
    '81-100': '🟡'
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
