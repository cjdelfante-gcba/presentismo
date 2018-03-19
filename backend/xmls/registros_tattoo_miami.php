<?php
// session_start();
date_default_timezone_set('America/Argentina/Buenos_Aires');

// 	if( $_SESSION['validado'] === true ){
		// validacion de vida para las sessiones 
		header('Content-type: application/vnd.ms-excel');
		header("Content-Disposition: attachment; filename=Tatto Buenos Aires registros.xls");
		header("Pragma: no-cache");
		header("Expires: 0");
		include('../r/r.php');

		$rei 			= new rei();
		$c 				= $rei->conectar();
		$sql 			= 'SELECT	
										`nombre` AS nombre_cl, 
										`apellido` AS apellido_cl, 
										`edad` AS edad_cl,
										`fecha_nacimiento` AS fecha_nacimiento_cl,
										`passaporte` AS passaporte_cl,
										`foto` AS foto_cl,
										`direccion` AS direccion_cl,
										`telefono` AS telefono_cl,
										`celular` AS celular_cl,
										`email` AS email_cl,
										`problemas_cardiacos` AS problemas_cardiacos_cl,
										`problemas_cardiacos_especificaciones` AS problemas_cardiacos_especificaciones_cl,
										`epilepsia_declarada` AS epilepsia_cl,
										`epilepesia_observacion` AS epilepesia_observacion_cl,
										`hepatitis` AS hepatitis_cl,
										`hepatitis_detalles` AS hepatitis_detalles_cl,
										`sifilis` AS sifilis_cl,
										`sifilis_observaciones` AS sifilis_observaciones_cl,
										`consumo_de_drogas` AS drogas_cl,
										`consumo_de_drogas_observaciones` AS drogas_observaciones_cl,
										`otras_afecciones` AS afecciones_cl,
										`otras_afecciones_obsercvaciones` AS afecciones_obsercvaciones_cl,
										`zona_aplicacion_tatto` AS zona_aplicacion_cl,
										`descripcion_tatuaje` AS descripcion_tatuaje_cl,
										`tatuador` AS tatuador_cl,
										`fecha_creacion` AS fecha_creada_cl,
										`consumo_alcohol` AS alcohol_cl,
										`consumo_alcohol_observaciones` AS alcohol_observaciones_cl
								FROM `_formulario_autorizacion_iristatoo` WHERE estado = 1 AND pais = "bsas"';
		$res 			= $rei->pedido($c, $sql);  // traeDatos
		$cant 			= $rei->cantidadDeDatos($res);
		$i 				= 0;     
		if($cant > 0)
		{
			$tab = '<table class="tabla">
						<thead>
							<tr>
								<td></h3>Nombre</h3></td>
								<td></h3>Apellido</h3></td>
								<td></h3>Edad</h3></td>
								<td></h3>Fecha de nacimiento</h3></td>
								<td></h3>Passaporte</h3></td>
								<td></h3>Foto</h3></td>
								<td></h3>Direccion</h3></td>
								<td></h3>Telefono</h3></td>
								<td></h3>Celular</h3></td>
								<td></h3>Email</h3></td>
								<td></h3>Problemas cardiacos</h3></td>
								<td></h3>Problemas cardiacos especificaciones</h3></td>
								<td></h3>Epilepsia</h3></td>
								<td></h3>Epilepesia observacion</h3></td>
								<td></h3>Hepatitis</h3></td>
								<td></h3>Hepatitis_detalles</h3></td>
								<td></h3>Sifilis</h3></td>
								<td></h3>Sifilis observaciones</h3></td>
								<td></h3>Drogas</h3></td>
								<td></h3>Drogas observaciones</h3></td>
								<td></h3>Consumo de alcohol</h3></td>
								<td></h3>Consumo de alcoholobservaciones</h3></td>
								<td></h3>Afecciones</h3></td>
								<td></h3>Afecciones observaciones</h3></td>
								<td></h3>Zona aplicacion</h3></td>
								<td></h3>Descripcion del tatuaje</h3></td>
								<td></h3>Tatuador</h3></td>
								<td></h3>Fecha creada</h3></td>
			    			</tr>
						</thead>
					<tbody>
					';
			while($re = $rei->traeDatos($res))
			{
				($re['problemas_cardiacos_cl']==0)?$problemas_cardiacos_cl = 'si': $problemas_cardiacos_cl = 'no';
				($re['epilepsia_cl']==0)?$epilepsia_cl='si':$epilepsia_cl='no';
				($re['hepatitis_cl']==0)?$hepatitis_cl='si':$hepatitis_cl='no';
				($re['sifilis_cl']==0)?$sifilis_cl='si':$sifilis_cl='no';
				($re['drogas_cl']==0)?$drogas_cl='si':$drogas_cl='no';
				($re['alcohol_cl']==0)?$alcohol_cl='si':$alcohol_cl='no';
			    $tab .='<tr>
					    	<td></h3>'.$re['nombre_cl'].'</h3></td>
							<td></h3>'.$re['apellido_cl'].'</h3></td>
							<td></h3>'.$re['edad_cl'].'</h3></td>
							<td></h3>'.$re['fecha_nacimiento_cl'].'</h3></td>
							<td></h3>'.$re['passaporte_cl'].'</h3></td>
							<td></h3>'.$re['foto_cl'].'</h3></td>
							<td></h3>'.$re['direccion_cl'].'</h3></td>
							<td></h3>'.$re['telefono_cl'].'</h3></td>
							<td></h3>'.$re['celular_cl'].'</h3></td>
							<td></h3>'.$re['email_cl'].'</h3></td>
							<td></h3>'.$problemas_cardiacos_cl.'</h3></td>
							<td></h3>'.$re['problemas_cardiacos_especificaciones_cl'].'</h3></td>
							<td></h3>'.$epilepsia_cl.'</h3></td>
							<td></h3>'.$re['epilepesia_observacion_cl'].'</h3></td>
							<td></h3>'.$hepatitis_cl.'</h3></td>
							<td></h3>'.$re['hepatitis_detalles_cl'].'</h3></td>
							<td></h3>'.$sifilis_cl.'</h3></td>
							<td></h3>'.$re['sifilis_observaciones_cl'].'</h3></td>
							<td></h3>'.$drogas_cl.'</h3></td>
							<td></h3>'.$re['drogas_observaciones_cl'].'</h3></td>
							<td></h3>'.$alcohol_cl.'</h3></td>
							<td></h3>'.$re['alcohol_observaciones_cl'].'</h3></td>
							<td></h3>'.$re['afecciones_cl'].'</h3></td>
							<td></h3>'.$re['afecciones_obsercvaciones_cl'].'</h3></td>
							<td></h3>'.$re['zona_aplicacion_cl'].'</h3></td>
							<td></h3>'.$re['descripcion_tatuaje_cl'].'</h3></td>
							<td></h3>'.$re['tatuador_cl'].'</h3></td>
							<td></h3>'.$re['fecha_creada_cl'].'</h3></td>
		    			</tr>';
		        $i++;
			}
			
			$tab .= "</tbody>
						<tfoot>
							<tr>
								<td></h3>Nombre</h3></td>
								<td></h3>Apellido</h3></td>
								<td></h3>Edad</h3></td>
								<td></h3>Fecha de nacimiento</h3></td>
								<td></h3>Passaporte</h3></td>
								<td></h3>Foto</h3></td>
								<td></h3>Direccion</h3></td>
								<td></h3>Telefono</h3></td>
								<td></h3>Celular</h3></td>
								<td></h3>Email</h3></td>
								<td></h3>Problemas cardiacos</h3></td>
								<td></h3>Problemas cardiacos especificaciones</h3></td>
								<td></h3>Epilepsia</h3></td>
								<td></h3>Epilepesia observacion</h3></td>
								<td></h3>Hepatitis</h3></td>
								<td></h3>Hepatitis_detalles</h3></td>
								<td></h3>Sifilis</h3></td>
								<td></h3>Sifilis observaciones</h3></td>
								<td></h3>Drogas</h3></td>
								<td></h3>Drogas observaciones</h3></td>
								<td></h3>Consumo de alcohol</h3></td>
								<td></h3>Consumo de alcoholobservaciones</h3></td>
								<td></h3>Afecciones</h3></td>
								<td></h3>Afecciones observaciones</h3></td>
								<td></h3>Zona aplicacion</h3></td>
								<td></h3>Descripcion del tatuaje</h3></td>
								<td></h3>Tatuador</h3></td>
								<td></h3>Fecha creada</h3></td>
			    			</tr>
						</tfoot>
					</table>";
			$r['aviso'] = "si";
		}

		echo $tab;

		$rei->cerrarConexion();

		// echo '<script type="text/javascript"> window.close(); </script>';
	// }
	// else{
	// 	echo '<script type="text/javascript"> location.href="../index.php"; </script>';
	// }
?>


