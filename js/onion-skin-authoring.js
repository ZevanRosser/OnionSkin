var os = os || {};

os.OnionSkinAuthoring = function() {
  os.win = $(window);
  os.doc = $(document);
  os.body = $("body");
  os.ui = $("#ui");

  var fileListPath = "php/file-list.php",
      savePath = "php/save.php",
      isFile = /[a-zA-Z0-9_\-]+/,
      files = $("#files"),
      fileName = $("#file-name"),
      newFile = $("#new-file"),
      save = $("#save"),
      download = $("#download"),
      downloadMode = false,
      renderer = new os.Renderer(),
      canvas = new os.Canvas(renderer),
      timeline = new os.Timeline(canvas);

  newFile.click(function() {
    fileName.val("");
    files.val("--files");
    timeline.reset();
  });

  download.click(function() {
    downloadMode = true;
    save.trigger("click");
  });

  save.click(function() {
    var name = $.trim(fileName.val());
    fileName.val(name);
    if (name.length == 0 || !isFile.test(name)) {
      alert("Please enter a valid file name.");
      return;
    }
    var data = JSON.stringify(canvas.getData());
    $.post(savePath, {
      n: name,
      data: data
    }, function() {
      if (!downloadMode){
        alert("Your file has been saved.");
      }
      $.post(fileListPath, updateFiles);

    });
  });

  $.post(fileListPath, updateFiles);

  function updateFiles(data) {
    var name = fileName.val()
    files.html(data);
    files.val(name);
    if (downloadMode) {
      window.location.href = "download.php?f=" + name;
      downloadMode = false;
    }
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