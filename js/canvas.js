os.Canvas = function(renderer) {
  this.onionSkin = true;  
  this.playing = false;
  var frame = 0,
      frames = [[]],
      line = 0,
      container = $("#container"),
      canvas = $("<canvas>").appendTo(container)[0],
      c = canvas.getContext("2d"),
      tempCanvas = $("<canvas>")[0],
      tempContext = tempCanvas.getContext("2d"),
      px, py, offY = os.ui.outerHeight(), 
      playFrame = 0, 
      playId, 
      resizeId;

  function resize(){
    canvas.width = os.win.width();
    canvas.height = os.win.height() - offY;
   
  }
  resize();
  
  function drawTemp(){
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempContext.drawImage(canvas, 0, 0);
    resize();
    c.drawImage(tempCanvas, 0, 0);
  }
  
  os.win.resize(function(){
    clearInterval(resizeId);
    resizeId = setTimeout(drawTemp, 100);
  });

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

  this.next = function(){
    frame++;  
    var lengMinusOne = frames.length - 1;
    if (frame > lengMinusOne) frame = lengMinusOne;
    this.gotoAndStop(frame); 
    this.frameChange(frame);
  };
  this.prev = function(){
    frame--;
    if (frame < 0) frame = 0;
    this.gotoAndStop(frame); 
    this.frameChange(frame);
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