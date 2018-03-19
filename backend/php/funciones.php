<?php
	session_start();
	header("Access-Control-Allow-Origin:*");
	// obliga al horario argentino
    date_default_timezone_set('America/Argentina/Buenos_Aires');	
    
    @include('../r/r.php');
    @include "BarcodeQR.php"; 
    $h = $_POST['h'];
	
	
	$url_gen = $_SERVER['HTTP_HOST'].'/';
	$uploads_dir = "../template/fichas/fotos/";

	if($h != 'login' && $h != 'registro')
	{
		if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) 
		{
			session_unset();
			session_destroy();
			$h = 'expirado';
		}
	}
	$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time

//  funciones
	function limpiarString($data)
	{
		$data = strtolower($data);
		//Reemplazamos caracteres especiales latinos
		$find = array('á','é','í','ó','ú','â','ê','î','ô','û','ã','õ','ç','ñ');
		$repl = array('a','e','i','o','u','a','e','i','o','u','a','o','c','n');
		$data = str_replace($find, $repl, $data);
		//Añadimos los guiones
		$find = array(' ', '&amp;', '\r\n', '\n','+');
		$data = str_replace($find, '-', $data);
		//Eliminamos y Reemplazamos los demas caracteres especiales
		$find = array('/[^a-z0-9\-&lt;&gt;]/', '/[\-]+/', '/&lt;{^&gt;*&gt;/');
		$repl = array('', '_', '');
		$data = preg_replace($find, $repl, $data);
		return $data;
	}

	function rand_str($length =5)
	{
	    $chars = '124567890';
	    $chars_length = (strlen($chars) - 1);
	    $string = $chars{rand(0, $chars_length)};
	    for ($i = 1; $i < $length; $i = strlen($string))
	    {
	        $r = $chars{rand(0, $chars_length)};
	        if ($r != $string{$i - 1}) $string .= $r;
	    }
	    return $string;
	}

// ajax
	if($h != 'expirado')
	{
		switch ($h)
		{
				case 'login':
					$doc 	= trim(strip_tags($_POST['registro_documento']));
					$pass 	= trim(strip_tags( base64_decode($_POST['registro_pass']) ));

					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'SELECT l.id_inspector AS u, e.nombre AS n, e.apellido AS a, e.email AS em FROM mayep_presentismo_login AS l, mayep_presentismo_inspectores AS e WHERE l.user = "'.$doc.'" AND l.pass = "'.md5($pass).'" AND l.habilitado = 1 AND e.habilitado = 1;';
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for($i=0;$i<$cant;$i++)
							$r['datos'][$i] = $rei->traeDatos($res);
					}
					$rei->cerrarConexion();
				break;
				case 'trae_empleados':
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'SELECT codigo as d_codi, feria  as d_feri, tipo_permiso as d_ubica, nombre as d_nom, apellido as d_ape, rubro as d_rubr, n_permiso as d_nper, vencimiento as d_hoin, disposicion as d_hofi, dni as d_d FROM mayep_presentismo_empleados WHERE habilitado = 1 ORDER BY id DESC';
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					$r['cant'] = $cant;
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for( $i = 0; $i < $cant; $i++ )
						{
							$re = $rei->traeDatos($res);
						    foreach( $re as $key => $valor )
						    	$r['datos'][$i][$key] =utf8_encode(rawurldecode($valor));
						}
					}
					else
						$r['aviso'] = true;
					$rei->cerrarConexion();
				break;
				case "trae_asistencias":
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= "SELECT n_permiso as d_npermi, nombre_empleado  as d_nomem, apellido_empleado as d_apeem, feria as d_feri, fecha as d_fec, hora as d_hora, a as d_d FROM mayep_presentismo_asistencias ORDER BY STR_TO_DATE(fecha , '%Y-%m-%d'), STR_TO_DATE(hora, '%h:%i:%s') DESC ;";
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for( $i = 0; $i < $cant; $i++ )
						{
							$re = $rei->traeDatos($res);
						    foreach( $re as $key => $valor )
						    	$r['datos'][$i][$key] = $valor;
						}
					}
					$rei->cerrarConexion();
				break;
				case 'cierra_sesion':
					session_destroy();
					$r['aviso'] = true;
				break;
				case "trae_usuarios":
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'SELECT user as d_u, id as u FROM mayep_presentismo_login WHERE habilitado = 1 ORDER BY id DESC';
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for( $i = 0; $i < $cant; $i++ )
						{
							$re = $rei->traeDatos($res);
						    foreach( $re as $key => $valor )
						    	$r['datos'][$i][$key] = $valor;
						}
					}
					$rei->cerrarConexion();
				break;
				case "edita_usuario":
					$user 	= trim(strip_tags($_POST['user']));
					if(isset($_POST['pass']))
						$pass 	= ', pass = "'.md5(trim(strip_tags( base64_decode($_POST['pass']) )));
					else
						$pass = "";

					$id 	= trim(strip_tags( base64_decode($_POST['u_editar']) ));

					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'UPDATE mayep_presentismo_login SET user = "'.$user.'"'.$pass.' WHERE id = '.$id.';';
					$res 	= $rei->pedido($c,$sql);
					if( $res )
					{
						$r['aviso'] 	= true;
						$r['user'] 		= trim($_POST['user']);
						$r['puntero'] 	= $_POST['puntero'];
					}
					$rei->cerrarConexion();
				break;
				case "_elimina_usuario":
					$id 	= trim(strip_tags($_POST['u']));
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'UPDATE mayep_presentismo_login SET habilitado = 0 WHERE id_inspector = "'.$id.'";';
					$r['sql'] = $sql;
					$res 	= $rei->pedido($c,$sql);
					if( $res )
					{
						$r['aviso'] 	= true;
						$r['puntero'] 	= $id;
					}
					$rei->cerrarConexion();
				break;
				case "_crea_usuario":
					$nombre 	= trim(strip_tags($_POST['nombre']));
					$apellido 	= trim(strip_tags($_POST['apellido']));
					$email 		= trim(strip_tags($_POST['email']));
					$pass 		= trim(strip_tags( base64_decode($_POST['pass']) ));
					$user 		= trim(strip_tags( base64_decode($_POST['user']) ));

					$rei		= new rei();
					$c 			= $rei->conectar();
					$sql		= 'INSERT INTO mayep_presentismo_inspectores (nombre, apellido, email, habilitado) VALUES ("'.$nombre.'", "'.$apellido.'", "'.$email.'", 1);';
					$res 		= $rei->pedido($c,$sql);
					if( $res )
					{
						$datos 		= $rei->ultimo_id($c);
						$sql2		= 'INSERT INTO mayep_presentismo_login (id_inspector, user, pass, habilitado) VALUES ("'.$datos.'", "'.$user.'", "'.md5($pass).'", 1);';
						$res 		= $rei->pedido($c,$sql2);

						if($res)
						{
							$r['aviso'] 	= true;
							$r['user'] 		= $user;
							$r['u'] 		= $datos;
						}
					}
					$rei->cerrarConexion();
				break;
				case "_ve_usuario":
					$u 		= trim(strip_tags( base64_decode($_POST['u']) ));
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'SELECT i.nombre as d_no, i.apellido as d_ap, i.email as d_em, l.user as d_us FROM mayep_presentismo_login as l,
								mayep_presentismo_inspectores as i WHERE i.id = "'.$u.'" AND i.habilitado = 1 AND l.habilitado = 1';
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for( $i = 0; $i < $cant; $i++ )
						{
							$re = $rei->traeDatos($res);
						    foreach( $re as $key => $valor )
						    	$r['datos'][$i][$key] = $valor;
						}
					}
					$rei->cerrarConexion();
				break;
				case "_crea_empleado":
					$nombre 	 = trim(strip_tags($_POST['nombre']));
					$apellido 	 = trim(strip_tags($_POST['apellido']));
					$dni 		 = trim(strip_tags($_POST['dni']));
					$rubro 		 = trim(strip_tags($_POST['rubro']));
					$tipo_permiso  = trim(strip_tags($_POST['tipo_permiso']));
					$feria 		 = trim(strip_tags($_POST['feria']));
					$n_permiso 	 = trim(strip_tags($_POST['n_permiso']));
					$vencimiento = trim(strip_tags($_POST['vencimiento']));
					$disposicion = trim(strip_tags($_POST['disposicion']));
					
		            	// $r['files'] = $_FILES['imagen'];
					if(isset($_FILES['imagen']))
		            { 
		            	if($_FILES["imagen"]["error"] == UPLOAD_ERR_OK)
		            	{
			                $parsea_img 		= explode('.', $_FILES['imagen']['name']);
			                $image      		= limpiarString($parsea_img[0]); 

			                $tmp_name 			= $_FILES["imagen"]["tmp_name"];
					        $name 				= basename($image."_".rand_str(5)."_".date('Ymds').'.'.$parsea_img[1] );
					        //$r['test'] = $uploads_dir;
					        if( move_uploaded_file($tmp_name, $uploads_dir."/".$name) == true )
					        {
					        	$r['imagen'] 	= 'ok';
					        	$nombrefoto 	= $name;
					        }

		            	}
		            	else
		            		$r['aviso'] = false;
		            }

		            if(isset($r['imagen']))
		            {
			            if( $r['imagen'] == 'ok' )
			            {
							$rei		= new rei();
							$c 			= $rei->conectar();
							$sql 		= 'SELECT dni, habilitado FROM mayep_presentismo_empleados WHERE dni = "'.$dni.'";';
							$res 		= $rei->pedido($c,$sql);
							$cant 		= $rei->cantidadDeDatos($res);
							if( $cant > 0 )
							{
								$re 		= $rei->traeDatos($res);
								if($re['habilitado'] == 0)
									$r['aviso'] = "inhabilitado";
								else
									$r['aviso'] = "repetido";
							}
							else
							{
								$sql2		= 'INSERT INTO mayep_presentismo_empleados (nombre, apellido, dni, n_permiso, feria, tipo_permiso, rubro, vencimiento, disposicion, foto, habilitado) VALUES ("'.$nombre.'", "'.$apellido.'", "'.$dni.'", "'.$n_permiso.'", "'.$feria.'", "'.$tipo_permiso.'","'.$rubro.'", "'.$vencimiento.'", "'.$disposicion.'","'.$nombrefoto.'",1);';
								$res2 		= $rei->pedido($c,$sql2);
								if( $res2 )
								{
									$qr = new BarcodeQR(); 
									$qr->text($dni);
									$qr->draw(150, "../qr/".$dni.".png");

									$r['aviso'] 				= true;
									// $r['datos']['nombre'] 		= trim(strip_tags($_POST['nombre']));
									// $r['datos']['apellido'] 	= trim(strip_tags($_POST['apellido']));
									// $r['datos']['dni'] 			= trim(strip_tags($_POST['dni']));
									// $r['datos']['rubro'] 		= trim(strip_tags($_POST['rubro']));
									// $r['datos']['tipo_permiso'] = trim(strip_tags($_POST['tipo_permiso']));
									// $r['datos']['feria'] 		= trim(strip_tags($_POST['feria']));
									// $r['datos']['n_permiso'] 	= trim(strip_tags($_POST['n_permiso']));
									// $r['datos']['u'] 			= $rei->ultimo_id($c);
									// $r['datos']['url'] 			= "qr/".$dni.".png";
								}
							}
							$rei->cerrarConexion();
			            }
			        }

				break;
				case "_ficha_permisionario":
					$u 		= trim(strip_tags($_POST['dni']));
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'SELECT n_permiso as np, nombre as n, apellido as a, dni as d, feria as fe, rubro as r, foto as fot, tipo_permiso as tp, vencimiento as v, disposicion as di FROM mayep_presentismo_empleados WHERE dni = "'.$u.'"';
					$res 	= $rei->pedido($c,$sql);
					$cant 	= $rei->cantidadDeDatos($res);
					if( $cant > 0 )
					{
						$r['aviso'] = true;
						for( $i = 0; $i < $cant; $i++ )
						{
							$re = $rei->traeDatos($res);
						    foreach( $re as $key => $valor )
						    	$r['datos'][$i][$key] = utf8_encode(rawurldecode($valor));
						}
					}
					$rei->cerrarConexion();
				break;
				case "_borra_permisionario":
					$u 		= trim(strip_tags($_POST['dni']));
					$rei	= new rei();
					$c 		= $rei->conectar();
					$sql	= 'UPDATE mayep_presentismo_empleados SET habilitado = 0 WHERE dni = "'.$u.'"';
					$res 	= $rei->pedido($c,$sql);
					if( $res )
					{
						$r['aviso'] 	= true;
						$r['p'] 		= $u;
					}
					$rei->cerrarConexion();
				break;
				case "_carga_masiva_csv":
		       		function generarCodigo($longitud) 
		       		{
						 $key 		= '';
						 $pattern 	= '1234567890abcdefghijklmnopqrstuvwxyz';
						 $max 		= strlen($pattern)-1;
						 for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
						 return $key;
					}

		       		$archivo 	= base64_decode($_POST['archivo_masivo']);
		       		$nombrefile = md5( generarCodigo(10) ). "_" . date("Ymd_His"). ".csv";
		            $path 		= 'archivos/' . $nombrefile;
		            @file_put_contents($path, $archivo);

		            $f_pointer		= @fopen($path,"r"); 
					$cantidad_filas = count(explode(';',@file_get_contents($path)));
					$r['cant'] 		= $cantidad_filas;
					for($f=0; $f < $cantidad_filas; $f++) 
					{ 
						$ar=@fgetcsv($f_pointer);

						if( trim($ar[0]) != "" )
						{
							for ($i=0; $i < count($ar); $i++) 
							{ 
								$parsea = explode(";", $ar[0]);
								for ($d=0; $d < count($parsea); $d++)
									$ex[$f][$d] = $parsea[$d];
							}
						}
					}
					
					$rei					= new rei();
					$c 						= $rei->conectar();
					for ($g=1; $g < count($ex); $g++) 
					{ 
						$r['aviso'] = true;
						if($g != 0)
						{

							$sql = 'SELECT dni, habilitado FROM mayep_presentismo_empleados WHERE dni = "'.trim($ex[$g][5]).'";';
							$res = $rei->pedido($c,$sql);

							$cant 	= $rei->cantidadDeDatos($res);
							if( $cant == 0 )
							{
								$qr = new BarcodeQR(); 
								$qr->text($ex[$g][5]);
								$qr->draw(150, "../qr/".trim($ex[$g][5]).".png");
								$sql = 'INSERT INTO mayep_presentismo_empleados (n_permiso,tipo_permiso, feria,apellido, nombre,dni, rubro, vencimiento, disposicion, habilitado) VALUES ("'.trim($ex[$g][0]).'","'.trim($ex[$g][1]).'", "'.trim($ex[$g][2]).'","'.trim($ex[$g][3]).'","'.trim($ex[$g][4]).'","'.trim($ex[$g][5]).'","'.trim($ex[$g][6]).'","'.trim($ex[$g][7]).'","'.trim($ex[$g][8]).'",1)';
								$res 	= $rei->pedido($c,$sql);
								
								if( $res )
								{
									$r['datos'][$g]['id_permisionario'] 	= (int)trim($ex[$g][5]);
									$r['datos'][$g]['aviso'] 				= "ok";
								}
								else
								{
									$r['datos'][$g]['id_permisionario'] 	= (int)trim($ex[$g][5]);
									$r['datos'][$g]['aviso'] 				= "error";
								}
							}
							else
							{
								$r['datos'][$g]['id_permisionario'] 	= (int)trim($ex[$g][5]);
								$r['datos'][$g]['aviso'] 				= "error";
							}
						}
					}

					$r['cant'] = $g;
		       	break;
				default:
						$r['aviso'] = ' Sal de aqui ... ';
				break;

		}
	}
	$r['termina'] = $h;
	echo json_encode($r);
?>