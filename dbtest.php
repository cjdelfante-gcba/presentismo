<html>
 <head>
  <title>Prueba de PHP</title>
 </head>
 <body>
 <?php
    $connstr = getenv("MYSQLCONNSTR_MySqlDB");    
    
    //Parse the above environment variable to retrieve username, password and hostname.
    foreach ($_SERVER as $key => $value) 
    {
        if (strpos($key, "MYSQLCONNSTR_") !== 0) 
        {
            continue;
        }
        $hostname = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
        $username = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
        $password = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
        break;
    }
    echo "Server Name: ".$hostname."</br>";
    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) or die("Unable to connect to MySQL");
    echo "<br>Connected to DB server successfully</br>";
    //select a database to work with
    $selectDb = mysql_select_db("default", $dbhandle) or die("Could not select database");
	
    mysql_close($dbhandle);
?>
 </body>
</html>