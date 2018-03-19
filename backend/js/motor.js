// programacion
function _cambia_seccion(_url)
{
	_secciones = document.getElementsByClassName('secciones');
	for (var i = 0; i < _secciones.length; i++) {
		_secciones[i].style.display = "none";
		_secciones[i].style.opacity = "0";
	}
	$r.dom();
	if(_url != 'registro' && _url != 'login')
		TweenMax.to(_e.d.cnt_general, 1, {alpha: 1, display:"inline-block", ease: Power3.easeInOut});

	TweenMax.to(_e.d[_url], .2, {alpha: 1, display:"inline-block", delay:.1, ease: Power3.easeIn});
	switch(_url)
	{
		case 'login':
			TweenMax.fromTo(_e.d.cnt_login_registro, .2, {alpha: 0, display:"none"}, {alpha: 1, display:"inline-block", ease: Power3.easeInOut});
			TweenMax.fromTo(_e.d.login, 1, {alpha: 0, display:"none"}, {alpha: 1, display:"inline-block", ease: Power3.easeInOut});
		break;
		case 'empleados':
			if( (_sys.permisionarios == false) || (_sys.permisionarios == undefined) )
			{
				_sys.permisionarios == true;
				$r.ajax("php/funciones.php","POST","h=trae_empleados");

				_e.d.icono_usuario_menu.addEventListener('click', _abre_menu);
				_e.d.cierra_menu_usuario.addEventListener('click', _cierra_menu);
				_e.d.cerrar_sesion.addEventListener('click', _cierra_sesion);
			}
		break;
		case 'asistencias':
			$r.ajax("php/funciones.php","POST","h=trae_asistencias");
		break;
		case 'usuarios':
			$r.ajax("php/funciones.php","POST","h=trae_usuarios");
			var _crea_usuario = function()
			{
				_e.d.interna_popup.innerHTML = '<div id="cruz_popup" onclick="_cierrapop()">x</div>\
												<div class="titularpop">Crear usuario</div>\
												<form id="form_crea_usuario" onsubmit="return _formcrea_usuario()">\
													<input type="text" id="creauser_nombre" name="nombre" placeholder="Nombre" />\
													<input type="text" id="creauser_apellido" name="apellido" placeholder="Apellido" />\
													<input type="text" id="creauser_email" name="email" placeholder="Email" />\
													<input type="text" id="creauser_usuario" name="user" placeholder="Usuario" />\
													<input id="creauser_pass" type="password" name="pass" placeholder="*****" />\
													<input class="btn_submit" type="submit" value="Guardar" />\
												</form>';
				TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});
			};
			_e.d.nuevo_usuario.addEventListener('click', _crea_usuario);
		break;
		case "nuevo_permisionario":
			if( (_sys.nuevo_permisionario == false) || (_sys.nuevo_permisionario == undefined) )
			{
				_sys.nuevo_permisionario == true;
				var _formcrea_empleado = function(a)
				{
					a.preventDefault();
					_err = true;
					if( (_e.d.creaempleado_nombre == "") || (_e.d.creaempleado_nombre.value.length < 3) )
						_err = "Debe ingresar un nombre valido";
					else if( (_e.d.creaempleado_apellido == "") || (_e.d.creaempleado_apellido.value.length < 3) )
						_err = "Debe ingresar un apellido valido";
					else if( (_e.d.creaempleado_dni == "") || (_e.d.creaempleado_dni.value.length < 3) )
						_err = "Debe ingresar un dni valido";
					else if( (_e.d.creaempleado_npermiso == "") || (_e.d.creaempleado_npermiso.value.length < 3) )
						_err = "Debe ingresar un número de permiso valido";
					else if( (_e.d.creaempleado_feria == "") || (_e.d.creaempleado_feria.value.length < 3) )
						_err = "Debe ingresar una feria valida";
					else if( (_e.d.creaempleado_ubicacion == "") || (_e.d.creaempleado_ubicacion.value.length < 3) )
						_err = "Debe ingresar un tipo de feria valida";
					else if( (_e.d.creaempleado_rubro == "") || (_e.d.creaempleado_rubro.value.length < 3) )
						_err = "Debe ingresar un rubro valido";
					else if( (_e.d.creaempleado_horario_inicio == "") || (_e.d.creaempleado_horario_inicio.value.length < 3) )
						_err = "Debe ingresar un vencimiento valido";
					else if( (_e.d.creaempleado_horario_fin == "") || (_e.d.creaempleado_horario_fin.value.length < 3) )
						_err = "Debe ingresar una disposicion valido";
					else if( _e.d.foto_permisionario.files.length == 0 )
						_err = "Debe seleccionar una foto para la ficha del permisionario";

					if( _err === true )
					{
						// console.log(_e.d.foto_permisionario.files[0].name)
						var input_imagen 	= _e.d.foto_permisionario,formdata = false;
						var data 			= new FormData();
						var files  			= input_imagen.files[0];
					    data.append('imagen', files);
					    $r.ajax_file_form("php/funciones.php","POST",data,"h=_crea_empleado&"+$r.serialize(_e.d.form_crea_empleado));
					}
					else
						alert(_err, 1200);
				};
				_e.d.form_crea_empleado.addEventListener('submit', _formcrea_empleado);
			}
		break;
		case "carga_masiva_permisionarios":
			_e.d.in_excel.value 					= "";
			_e.d.subefilename.innerHTML 			= "";
			_e.d.devuelve_contenido_excel.innerHTML = "";

			if( (_sys.carga_masiva == false) || (_sys.carga_masiva == undefined) )
			{
				_sys.carga_masiva == true;

				_e.d.in_excel.addEventListener("change", _pone_nombre_imagen );


				_envia_carga_masiva = function(ev)
			    {
			        ev.preventDefault()

			        if( _e.d.in_excel.files.length != 0 )
			        {
			            _nf     = _e.d.in_excel.files[0].name;
			            _ext    = _e.d.in_excel.files[0].name.slice(_nf.length-3);

			            if( _ext == 'csv' )
			            {
			                datos = 'h=_carga_masiva_csv&'+$r.serialize(_e.d.form_carga_masiva);
			                $r.ajax("php/funciones.php","POST",datos);
			                _e.d.devuelve_contenido_excel.innerHTML = "Carga en Proceso ...";
			            }
			            else
			                alert('El archivo debe ser .csv', 800)
			        }
			        else
			            alert('Debe seleccionar un archivo .csv', 800)
			    }
			    _e.d.form_carga_masiva.addEventListener('submit', _envia_carga_masiva, false);
			}
		break;
	}
}


_pone_nombre_imagen = function(e)
{
    if(_e.d.in_excel.files.length > 0)
    {
        _nm                                    = _e.d.in_excel.files[0].name;
        _e.d.subefilename.innerHTML    = _nm;

        var fileToLoad = _e.d.in_excel.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(e) 
        {
            _e.d.hidden_imagen_1.value = e.target.result;
        };
 
        fileReader.readAsDataURL(fileToLoad);
    }
};

var _abre_menu = function()
{
	TweenMax.to(_e.d.menu_usuario, .2, {alpha: 1, display:"inline-block", ease: Power3.easeInOut});
};
var _cierra_menu = function()
{
	TweenMax.to(_e.d.menu_usuario, .2, {alpha: 0, display:"none", ease: Power3.easeInOut});
};
var _cierra_sesion = function()
{
	$r.lls();
	window.location.href = "#login";
	_cierra_menu();
};
_precarga_general = function(){
  _body = document.getElementsByTagName('body')[0];

  _contenedor_general = document.createElement("div");
  _contenedor_general.setAttribute("id","popupcontenedor-alerta");
  _loader = document.createElement("div");
  _loader.setAttribute("id","loader");

  _contenedor_general.appendChild(_loader);
  _body.appendChild(_contenedor_general);

  delete _contenedor_general;
  delete _loader;
}
_cierra_popup_precarga = function()
{
  if(document.getElementById("popupcontenedor-alerta"))
    document.getElementById("popupcontenedor-alerta").remove();
};

function $_optimiza_fecha(f)
{
	_diahora 	= f.split("-")[2];
	_dia 		= _diahora.split(" ")[0];
	_mes 		= _fech[f.split("-")[1]];
	_anio 		= f.split("-")[0];
	_hora 		= _diahora.split(" ")[1];

	_ffinal 	= _dia+" "+_mes+' '+_anio+' '+ _hora;
	return _ffinal
};

var _envia_edicion_usuario = function()
{	
	$r.dom();
	_err = true;
	if( (_e.d.user == "") || (_e.d.user.value.length < 3) )
		_err = "Debe ingresar un usuario valido";
	// else if( (_e.d.pass == "") || (_e.d.pass.value.length < 3) )
	// 	_err = "Debe ingresar una pass valida";

	if( _err === true )
	{
		_data = '&user='+_e.d.user.value;
		if(_e.d.pass.value != "")
			_data += '&pass='+window.btoa(_e.d.pass.value);
		_data += '&u_editar='+window.btoa(_e.d.u_editar.value);
		_data += '&puntero='+i; 
		$r.ajax("php/funciones.php","POST","h=edita_usuario"+_data);
	}
	else
		alert(_err, 1200);

	return false;
};
var _cierrapop = function()
{
	TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 0, transform:"scale(0)", display:"none", ease: Power3.easeInOut});
};
var _edita_usuario = function(e)
{
	u = e.getAttribute('data-u');
	t = e.getAttribute('data-d-u');
	i = e.getAttribute('data-puntero');
	_e.d.interna_popup.innerHTML = '<div id="cruz_popup" onclick="_cierrapop()">x</div><div class="titularpop">Editar usuario</div><form id="form_edita_usuario" onsubmit="return _envia_edicion_usuario()"><input type="text" id="user" name="user" value="'+t+'" /><input name="u" id="u_editar" type="hidden" value="'+u+'" /><input id="pass" type="password" name="pass" placeholder="*****" /><input class="btn_submit" type="submit" value="Guardar" /></form>';
	TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});
};

var _elimina_usuario_final = function(u)
{
	$r.ajax("php/funciones.php","POST","h=_elimina_usuario&u="+u);
};

var _elimina_usuario = function(u)
{
	_e.d.interna_popup.innerHTML = '<div id="cruz_popup" onclick="_cierrapop()">x</div><div class="textpop">Esta seguro que desea eliminar este usuario?</div><button class="btn_submit" onclick="_cierrapop()">Cancelar</button><button class="btn_submit" onclick="_elimina_usuario_final('+u+')">Eliminar</button></form>';
	TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});
};

var _formcrea_usuario = function()
{
	$r.dom();
	_err = true;
	if( (_e.d.creauser_nombre == "") || (_e.d.creauser_nombre.value.length < 3) )
		_err = "Debe ingresar un nombre valido";
	else if( (_e.d.creauser_apellido == "") || (_e.d.creauser_apellido.value.length < 3) )
		_err = "Debe ingresar un apellido valido";
	else if( (_e.d.creauser_email == "") || (_e.d.creauser_email.value.length < 3) )
		_err = "Debe ingresar un email valido";
	else if( (_e.d.creauser_usuario == "") || (_e.d.creauser_usuario.value.length < 3) )
		_err = "Debe ingresar un usuario valido";
	else if( (_e.d.creauser_pass == "") || (_e.d.creauser_pass.value.length < 3) )
		_err = "Debe ingresar una pass valida";

	if( _err === true )
	{
		_data =  '&nombre='+_e.d.creauser_nombre.value;
		_data += '&apellido='+_e.d.creauser_apellido.value;
		_data += '&email='+_e.d.creauser_email.value;
		_data += '&user='+window.btoa(_e.d.creauser_usuario.value);
		_data += '&pass='+window.btoa(_e.d.creauser_pass.value);
		$r.ajax("php/funciones.php","POST","h=_crea_usuario"+_data);
	}
	else
		alert(_err, 1200);

	return false;
};

var _ve_usuario = function(u)
{
	$r.ajax("php/funciones.php","POST","h=_ve_usuario&u="+window.btoa(u));
};

var _ve_permisionario = function(dni)
{
	$r.ajax("php/funciones.php","POST","h=_ficha_permisionario&dni="+dni);
};

var _elimina_permisionario_final = function(dni)
{
	$r.ajax("php/funciones.php","POST","h=_borra_permisionario&dni="+dni);
}	

var _borra_permisionario = function(dni)
{
	_e.d.interna_popup.innerHTML = '<div id="cruz_popup" onclick="_cierrapop()">x</div><div class="textpop">Esta seguro que desea eliminar este usuario?</div><button class="btn_submit" onclick="_cierrapop()">Cancelar</button><button class="btn_submit" onclick="_elimina_permisionario_final('+dni+')">Eliminar</button></form>';
	TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});
}