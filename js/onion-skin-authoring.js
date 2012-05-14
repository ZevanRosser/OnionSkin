var os = os || {};

os.OnionSkinAuthoring = function() {
  os.win = $(window);
  os.doc = $(document);
  os.body = $("body");
  os.ui = $("#ui");

  var fileListPath = "php/file-list.php", 
      savePath = "php/save.php",
      isFile = /[a-zA-Z0-9_\.]+/,
      files = $("#files"),
      fileName = $("#file-name"),
      newFile = $("#new-file"),
      renderer = new os.Renderer(),
      canvas = new os.Canvas(renderer),
      timeline = new os.Timeline(canvas);
  
  newFile.click(function(){
    fileName.val("");
    files.val("--files");
    timeline.reset();
  });

  $("#save").click(function() {
    var name = $.trim(fileName.val());
    if (name.length == 0 || !name.match(isFile)){
      alert("Please enter a valid file name.");
      return; 
    }
    var data = JSON.stringify(canvas.getData());
    $.post(savePath, {
      n: name,
      data: data
    }, function() {
      alert("Your file has been saved.");
      $.post(fileListPath, updateFiles);
      
    });
  });
  
  $.post(fileListPath, updateFiles);
  function updateFiles(data){
    files.html(data);
    files.val(fileName.val());
  }

  files.change(function() {
    var val = files.val();
    if (val != "--files") {
      $.post("files/" + val + ".json", function(data) {
        timeline.setData(data);
        fileName.val(val);
      });
    }
  });
};