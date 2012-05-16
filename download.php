<?php
  if (isset($_GET["f"])){
    header('Content-disposition: attachment; filename=' . $_GET["f"]);
    header('Content-type: text/html');
  }else{
    die("no file name");
  }
  
  ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title></title>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script>
      <?php
        echo file_get_contents("js/onion-skin-playback-raw.js");
        echo file_get_contents("js/renderer.js");
        echo file_get_contents("js/canvas.js");
      ?>
      ;$(function(){    
        new os.OnionSkinPlaybackRaw(<?php require_once("files/".$_GET["f"].".json"); ?>);
      });
    </script>
    <style>
      body, html{
        overflow : hidden; 
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>
<!--
<script src="js/onion-skin-playback.js"></script>
<script src="js/renderer.js"></script>
<script src="js/canvas.js"></script>-->