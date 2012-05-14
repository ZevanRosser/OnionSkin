os.Renderer = function() {

  this.render = function(c, data) {
    var leng = data.length;
    c.beginPath();
    for (var i = 0; i < leng; i++) {
      var line = data[i];
      var lineLeng = line.length;
      for (var j = 0; j < lineLeng; j += 2) {
        if (j == 0) {
          c.moveTo(line[j], line[j + 1]);
        } else {
          c.lineTo(line[j], line[j + 1]);
        }
      }
    }
    c.stroke();
  };

};