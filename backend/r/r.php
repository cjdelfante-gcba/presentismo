	<?php
/* Clase de LfPHP para hacer conexion y consultas */

	class rei
	{
	var $connstr = getenv("MYSQLCONNSTR_MySqlDB");    

	/*variables de conexion local*/
	var $c; 
	var $conexion = "";
	var $usuario = ""; 
	var $clave = ""; 
	var $base = "";
	
	function __construct()
	{
	    foreach ($_SERVER as $key => $value) 
	    {
	        if (strpos($key, "MYSQLCONNSTR_") !== 0) 
	        {
	            continue;
	        }
	        $conexion = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
	        $usuario = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
	        $clave = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
	        $base = preg_replace("/^.*Database=(.+?)$/", "\\1", $value);
	        break;
	    }

	    print "Conexion: " . $conexion;
   	} 
    //Parse the above environment variable to retrieve username, password and hostname.
    

	  
	  /*variables de resultado*/
	  var $total_consultas = 0;


	  public function conectar()
	  { 
	    if($this->conexion != "") // si tiene conexion
	    	return @mysqli_connect($this->conexion, $this->usuario, $this->clave, $this->base);
	  }

	  public function pedido($c, $sql)   // ex consulta
	  { 
	    $res 			= @mysqli_query($c, $sql);
	    if(!$res)
	      $r['aviso'] 	= 'MySQL Error: ' . mysqli_error($c);
	  	else
	  	  $r['aviso'] 	= true;
	    return $res;
	  }

	  public function carga($c, $sql)   // ex consulta
	  { 
	    $res 			= @mysqli_query($c, $sql);
	    if(!$res)
	      $res 	= false;
	  	else
	  	  $res 	= true;
	    return $res;
	  }

	  public function traeDatos($res)
	  {
	   	return @mysqli_fetch_array($res, MYSQLI_ASSOC);
	  }

	  public function cantidadDeDatos($res)
	  {
	   return @mysqli_num_rows($res);
	  }

	  public function datosTotales()
	  {
	   return $this->total_consultas; 
	  }

	  public function cerrarConexion()
	  {
	   	return @mysqli_close();
	  }
	  
	  public function str_replace_assoc($sql) 
	  {
	  	 $replace = array('(me)'=>'<','(ma)'=>'>','(mei)'=>'<=','(mai)'=>'>=','(ig)'=>'=', '(s)'=>'+', '(r)'=>'-', '|'=>"'",'(p)'=>'%','(amper)'=>'&');
		 return str_replace(array_keys($replace), array_values($replace), $sql);
	  }

	  public function ultimo_id($c)
	  {
	  	return mysqli_insert_id($c);
	  }
	}
?>