var os = os || {};

os.OnionSkinPlayback = function(path){
  
  os.win = $(window);
  os.doc = $(document);
  os.body = $("body");
  os.ui = $("#ui");

  var renderer = new os.Renderer();
  var canvas = new os.Canvas(renderer);
  
  $.post(path, function(data){
    data = JSON.parse(data);
    canvas.setData(data);
    canvas.play();
  });
  
};