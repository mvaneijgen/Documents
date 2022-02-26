// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;
module.exports.date = () => {
  let date = new Date();
  date = date.toString().toUpperCase().split(" ");
  return `${date[0]} ${date[2]} ${date[1]} ${date[3]} ${date[4]}`;
}
module.exports.items = async () => {
  const now = new Date().getHours()
  let result;
  // List calender items of the next day, if its after 18:00
  if (now <= 17) {
    result = await CalendarEvent.today();
  } else {
    result = await CalendarEvent.tomorrow();
  }

  const items = result.filter(item => !item.isAllDay)
    .filter(item => item.calendar.identifier !== "362AA7F4-ACE2-43FE-B7B3-3506F1A1DFAF")
    .map(item => {
      const time = `${item.startDate.getHours()}${item.startDate.getMinutes() === 0 ? '' : item.startDate.getMinutes()}-${item.endDate.getHours()}${item.endDate.getMinutes() === 0 ? '' : item.startDate.getMinutes()}`
      const title = `${item.title}`
      return {
        "title": title,
        "hex": item.calendar.color.hex,
        "time": time
      }
    })
  return items
}