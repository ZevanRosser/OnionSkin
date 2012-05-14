<?php
  
  $files = glob("../files/*");
  
  echo "<option value='--files'>--files</option>";
  
  foreach($files as $file){
    $file = preg_replace("/\.\.\/files\/|\.json/", "", $file);
    echo "<option value='$file'>$file</option>"; 
  }