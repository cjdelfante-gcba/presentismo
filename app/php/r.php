	<?php
/* Clase de LfPHP para hacer conexion y consultas */

	class rei
	{
	  /*variables de conexion local*/
	  var $c; 
	  var $conexion = "";
	  var $usuario 	= ""; 
	  var $clave 	= ""; 
	  var $base 	= "";
	  
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