const path = require("path");
const fetch = require("node-fetch");
(async () => {
  let resp = await fetch(
    "https://storage.googleapis.com/skia-cdn/google-web-fonts/Roboto-Regular.ttf"
  );
  let robotoData = await resp.arrayBuffer();

  const CanvasKitInit = require("canvaskit-wasm");

  const CanvasKit = await CanvasKitInit({
    locateFile: (file) => {
      return path.join(path.dirname(require.resolve("canvaskit-wasm")), file);
    },
  });

  let skcanvas = CanvasKit.MakeCanvas(300, 200);
  skcanvas.loadFont(robotoData, {
    style: "normal",
    family: "Roboto",
    weight: "normal",
    variant: "normal",
  });
  let ctx = skcanvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 300, 200);
  ctx.font = "48px Roboto";
  ctx.fillStyle = "black";
  ctx.fillText("Hello world", 10, 50);
  let imgData = skcanvas.toDataURL();

  console.log(imgData);
})();
