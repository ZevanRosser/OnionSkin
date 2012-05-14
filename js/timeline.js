os.Timeline = function(canvas) {
  var add = $("#add"),
      frameNum = $("#frame-num"),
      stop = $("#stop"),
      timeline = $("#timeline"),
      play = $("#play"),
      frame = 1,
      currFrameBtn, 
      SPACE = 32,
      RIGHT = 39,
      
      cover = $("<div>", {
        css: {
          position: "absolute",
          top: 0,
          left: 0,
          width: os.win.width(),
          height: os.win.height(),
          backgroundColor: "red",
          opacity: 0
       }
     }).appendTo(os.body).hide();

  this.setData = function(data) {
    try {
      data = JSON.parse(data);
      frame = 0;
      timeline.html("");
      for (var i = 0; i < data.length; i++) {
        addFrame();
      }
      canvas.setData(data);
      canvas.gotoAndStop(0);
      timeline.find("div").first().trigger("mousedown");
    }catch(e){
      alert("Error reading file..."); 
    }
  };

  function addFrame() {
    canvas.addFrame();
    $("<div class='frame'>")
      .attr("data-num", frame++)
      .appendTo(timeline)
      .trigger("mousedown");
    frameNum.text(frame);
  }

  canvas.frameChangeCallback(function(theFrame) {
    currFrameBtn.css({
      backgroundColor: "#ccc"
    });
    currFrameBtn = $(".frame").eq(theFrame);
    currFrameBtn.css({
      backgroundColor: "gray"
    });
    updateFrameNum(theFrame);
  });

  play.click(function() {
    canvas.play();
    cover.show();
  });

  stop.click(function() {
    canvas.stop();
    cover.hide();
  });

  add.click(function() {
    addFrame();
  });
  
  function updateFrameNum(num){
    frameNum.text(parseInt(num) + 1);
  }

  os.doc.keyup(function(e) {
    if (e.which == SPACE) {
      addFrame();
    } else if (e.which == RIGHT) {
      canvas.play();
      cover.show();
    }
  });

  os.doc.on("click", ".frame", function() {
    var num = $(this).attr("data-num");
    canvas.gotoAndStop(num);
    updateFrameNum(num);
  }).on("mousedown", ".frame", function() {
    if (currFrameBtn) {
      currFrameBtn.css({
        backgroundColor: "#ccc"
      });
    }
    currFrameBtn = $(this).css({
      backgroundColor: "gray"
    });
  });
};