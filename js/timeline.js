os.Timeline = function(canvas) {
  var add = $("#add"),
      duplicate = $("#duplicate"),
      frameNum = $("#frame-num"),
      stop = $("#stop"),
      timeline = $("#timeline"),
      play = $("#play"),
      frame = 1,
      currFrameBtn = $(".frame"), 
      SPACE = 32,
      RIGHT = 39,
      LEFT = 37,
      LESS_THAN = 188, 
      GREATER_THAN = 190,
      OPTION = 18,
      
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
      timeline.scrollLeft(0);
      canvas.setData(data);
      canvas.gotoAndStop(0);
      timeline.find("div").first().trigger("mousedown");
    }catch(e){
      alert("Error reading file..."); 
    }
  };

  function addFrame() {
    canvas.addFrame();
    newFrameCell();
  }
  function duplicateFrame(){
    canvas.duplicateFrame();
    newFrameCell();
  }
  function newFrameCell(){
    $("<div class='frame'>")
      .css({left : frame * 11})
      .attr("data-num", frame++)
      .appendTo(timeline)
      .trigger("mousedown");
    frameNum.text(frame);
    var maxScroll = timeline[0].scrollWidth
    timeline.scrollLeft(maxScroll);
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
  
  duplicate.click(function(){
    duplicateFrame();
  });
  
  this.reset = function(){
    canvas.reset();
    frame = 0;
    timeline.html("");
    addFrame();
  };
  
  function updateFrameNum(num){
    frameNum.text(parseInt(num) + 1);
  }

  os.doc.keyup(function(e) { 
    if (canvas.playing) return;
      
    if (e.which == SPACE) {
      addFrame();
    } else if (e.which == LEFT){
      canvas.stop();
      cover.hide();
    } else if (e.which == RIGHT) {
      canvas.play();
      cover.show();
    }else if (e.which == LESS_THAN){
      canvas.prev();
    }else if (e.which == GREATER_THAN){
      canvas.next();
    }else if (e.which == OPTION){
      duplicateFrame(); 
    }
    //console.log(e.which);
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