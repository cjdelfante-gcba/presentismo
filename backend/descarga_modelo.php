<?php

date_default_timezone_set('America/Argentina/Buenos_Aires'); 

$filename = 'modelo_cargamasiva_permisionarios-'.date("Y-m-d")."-".time();

header('Content-type: application/vnd.ms-excel');
header("content-type:application/csv;charset=UTF-8");
header("Content-Disposition: attachment; filename=".$filename.".csv");
header("Pragma: no-cache");
header("Expires: 0"); 

$output = 'N° DE PERMISO;TIPO DE PERMISO;FERIA;APELLIDO;NOMBRE;DNI;RUBRO;VENCIMIENTO;NRO.DISPOSICION 
';
$output.= '123;TITULAR;Feria Americana; Juan; Pérez; 1258964586; Vestimenta;1/15/2019;DI-2018-69-DGFER';
	
echo utf8_decode(html_entity_decode($output));

?>