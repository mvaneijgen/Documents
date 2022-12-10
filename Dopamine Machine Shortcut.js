// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: external-link-alt;
const SHORTCUTNAME = "Dopamine Machine";
const BASEURL = "shortcuts://run-shortcut?name=";
Safari.open(BASEURL + encodeURI(SHORTCUTNAME));