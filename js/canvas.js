os.Canvas = function(renderer) {
  this.onionSkin = true;  
  this.playing = true;
  var frame = 0,
      frames = [[]],
      line = 0,
      container = $("#container"),
      canvas = $("<canvas>").appendTo(container)[0],
      c = canvas.getContext("2d"),
      px, py, offY = os.ui.outerHeight(), 
      playFrame = 0, 
      playId;

  canvas.width = os.win.width();
  canvas.height = os.win.height() - offY;

  this.frameChange = function(){};
  this.frameChangeCallback = function(func){
    this.frameChange = func;
  }
  
  this.getData = function() {
    return frames.concat();
  };
  
  this.reset = function(){
    this.setData([[]]); 
  };
  this.setData = function(data) {
    frame = -1;
    frames = data.concat();
  }

  this.play = function() {
    this.stop();
    this.playing = true;
    playFrame = frame;
    this.onionSkin = false;
    playId = setInterval($.proxy(playLoop, this), 90);
  };
  
  function playLoop(){
    var currFrame = playFrame++ % frames.length;
    this.frameChange(currFrame);
    this.gotoAndStop(currFrame);
  }
  
  this.stop = function() {
    this.playing = false;
    clearInterval(playId);
    playCount = 0;
    this.onionSkin = true;
    this.frameChange(0);
    this.gotoAndStop(0);
  };

  this.addFrame = function() {
    frame++;
    frames[frame] = [];
    line = 0;
    this.gotoAndStop(frame);
  };

  this.gotoAndStop = function(frameNum) {
    frame = parseInt(frameNum);
    line = frames[frame].length;
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (this.onionSkin) {
      c.strokeStyle = "rgba(0,0,0,0.3)";
      if (frame > 0) {
        renderer.render(c, frames[frame - 1]);
      }
      if (frame < frames.length - 1) {
        renderer.render(c, frames[frame + 1]);
      }
    }
    c.strokeStyle = "black";
    renderer.render(c, frames[frame]);
  };

  function returnFalse() {
    return false;
  }
  $(canvas).mousedown(function(e) {
    px = e.pageX;
    py = e.pageY - offY;
    frames[frame][line++] = [px, py];
    os.doc.on("mousemove.draw", draw);
    os.body.on("selectstart.drag dragstart.drag mousedown.drag", returnFalse);
  });
  os.doc.mouseup(function() {
    os.body.off("selectstart.drag dragstart.drag mousedown.drag", returnFalse);
    os.doc.off("mousemove.draw");
  });

  function draw(e) {
    c.lineStyle = "black";
    c.beginPath();
    c.moveTo(px, py);
    c.lineTo(e.pageX, e.pageY - offY);
    c.stroke();
    frames[frame][line - 1].push(e.pageX, e.pageY - offY);
    px = e.pageX;
    py = e.pageY - offY;
  }
};