<?php
  
  if (isset($_POST["n"])){
    
    $name = $_POST["n"];    
    
    $file = fopen("../files/" . $name . ".json", "w");
    
    if (!$file) die("error");
    
    fwrite($file, $_POST["data"]);
    
    fclose($file);
    
  }