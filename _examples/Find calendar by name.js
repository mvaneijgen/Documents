// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;

Calendar.forEventsByTitle('Gezin').then(successCallback,failureCallback)

async function successCallback(result) {
  calcal=result
  console.log(calcal)
//   console.log(calcal[0])
  console.log(calcal.title)
  calSet(calcal[0])
}


async function failureCallback(error) {
  console.error("Error generating audio file: " + error);
}