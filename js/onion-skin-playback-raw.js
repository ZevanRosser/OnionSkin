var os = os || {};

os.OnionSkinPlaybackRaw = function(data) {

  os.win = $(window);
  os.doc = $(document);
  os.body = $("body");
  os.ui = $("#ui");

  var renderer = new os.Renderer();
  var canvas = new os.Canvas(renderer);

  canvas.noDraw = true;
  
  canvas.setData(data);
  canvas.play();

};