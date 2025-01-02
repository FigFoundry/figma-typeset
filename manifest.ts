// https://www.figma.com/plugin-docs/manifest/

export default {
  name: "Typeset",
  id: "1455117604583415830",
  api: "1.0.0",
  editorType: ["figma", "figjam"],
  main: "./canvas.js",
  ui: "./plugin.html",
  documentAccess: "dynamic-page",
  networkAccess: {
    allowedDomains: ["none"],
  },
};
