// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: check-circle;
module.exports = async () => {
  return {
    todoist: {
      token: 'TOKEN',
      project_id: 'ID'
    },
    notion: {
      token: 'TOKEN',
      databaseId: 'ID'
    },
    darksky: {
      apiKey: "KEY",
    },
    gmail: {
      user: "USER",
      pass: "PASS"
    },
    location:{
      latitude: "LAT",
      longditude: "LONG"
    }
  }
}