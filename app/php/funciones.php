<?php
	header("Access-Control-Allow-Origin:*");
	// obliga al horario argentino
    date_default_timezone_set('America/Argentina/Buenos_Aires');	
    @include('r.php');
	$r['aviso'] = false;
	$h 			= $_POST['h'];
	switch ($h)
	{
		case "_ingresa":
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
		case "_guarda_asistencia":
			$codigo 	= trim(strip_tags( base64_decode($_POST['c'])) );
			$nombre 	= trim(strip_tags( base64_decode($_POST['n']) ) );
			$apellido 	= trim(strip_tags( base64_decode($_POST['a']) ) );
			$id 		= trim(strip_tags( base64_decode($_POST['u']) ) );

			$rei	= new rei();
			$c 		= $rei->conectar();
			$sql	= 'SELECT codigo as d_codi, feria  as d_feri, tipo_permiso as d_ubica, nombre as d_nom, apellido as d_ape, rubro as d_rubr, n_permiso as d_nper, vencimiento as d_hoin, disposicion as d_hofi, dni as d_d, id FROM mayep_presentismo_empleados WHERE dni = "'.$codigo.'" AND habilitado = 1;';
			
			$res 		= $rei->pedido($c,$sql);
			$cant 		= $rei->cantidadDeDatos($res);
			// $r['canti'] =$cant;
			if( $cant > 0 )
			{
				$datos 	= $rei->traeDatos($res);
				// $r['asdasd'] = $datos;
				// $r['rdd'] = $_POST['u'];
				$sql2	= 'INSERT INTO mayep_presentismo_asistencias (id_empleado, codigo_empleado, id_inspector, n_permiso, nombre_inspector, apellido_inspector, nombre_empleado, apellido_empleado, feria, tipo_permiso, rubro, vencimiento, disposicion, fecha, hora, a) VALUES ('.$datos['id'].', "'.$codigo.'", '.$id.', "'.$datos['d_nper'].'", "'.utf8_encode($nombre).'", "'.utf8_encode($apellido).'", "'.utf8_encode($datos['d_nom']).'", "'.utf8_encode($datos['d_ape']).'", "'.utf8_encode($datos['d_feri']).'", "'.utf8_encode($datos['d_ubica']).'", "'.utf8_encode($datos['d_rubr']).'", "'.utf8_encode($datos['d_hoin']).'","'.utf8_encode($datos['d_hofi']).'", "'.date('Y-m-d').'", "'.date('H:i:s').'", "'.$datos['d_d'].'")';
				// $r['test'] = $sql2;
				$res2 	= $rei->pedido($c,$sql2);
				if($res2)			
				{
					$r['aviso'] 	= true;
					$r['nombre'] 	= utf8_encode(rawurldecode($datos['d_nom']));
					$r['apellido'] 	= utf8_encode(rawurldecode($datos['d_ape']));
					$r['vencimiento'] 	= utf8_encode(rawurldecode($datos['d_hoin']));
					$r['disposicion']	= utf8_encode(rawurldecode($datos['d_hofi']));
					$r['tipo_permiso'] = utf8_encode(rawurldecode($datos['d_ubica']));
					$r['d_nper'] 	= utf8_encode(rawurldecode($datos['d_nper']));
					$r['dni'] 		= utf8_encode(rawurldecode($datos['d_d']));
					$r['feria']		= utf8_encode(rawurldecode($datos['d_feri']));
				}
			}
			else
			{
				if($_POST['puntero'] == 'qr')
				{
					$r['aviso'] = 'no_encontrado';
					$r['c'] 	= $_POST['c'];
				}
			}
			$r['puntero'] 	= $_POST['puntero'];
			$rei->cerrarConexion();	
		break;
		case "_lista_empleados":
			$rei	= new rei();
			$c 		= $rei->conectar();
			$sql	= 'SELECT dni as d_codi, feria  as d_feri, tipo_permiso as d_ubica, nombre as d_nom, apellido as d_ape, rubro as d_rubr, n_permiso as d_nper, vencimiento as d_hoin, disposicion as d_hofi, dni as d_d FROM mayep_presentismo_empleados WHERE habilitado = 1';
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
		default:
		
				$r['aviso'] = ' Sal de aqui ... ';
		break;

	}
	$r['termina'] = $h;
	echo json_encode($r);
?>