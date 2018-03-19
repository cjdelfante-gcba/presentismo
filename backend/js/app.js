var _fech   = ['osvaldo','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    _letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'], _user   = {},
    _usuario_session,
    _sys = {},
    _sys_invitados = {};

function _funciones_de_carga()
{
    $r.dom();
    window.location.href = '#';
    TweenMax.ticker.useRAF(true);
    TweenMax.ticker.fps(80);
    _login = function(a)
    {
        a.preventDefault();
        _error = 0;
        if(_e.d.registro_documento.value.length < 5  )
            _error = 'Dni incorrecto';
        else if(_e.d.registro_pass.value.length > 18 && _e.d.registro_pass.value.length < 3)
            _error ='La contrase&ntilde;a ingresada debe tener entre 3 18 caracteres como minimo';
        
        if(_error == 0)
            $r.ajax("php/funciones.php","POST","h=login&"+$r.serialize(_e.d.formulario_login))
        else
            alert(_error,2000);
        delete _error;
    }
    _e.d.formulario_login.addEventListener('submit', _login);

    if( ($r.tls('t') == "") || ($r.tls('t') == null ) || ($r.tls('t') == undefined) )
        window.location.href = "#login";
    else
        window.location.href = "#empleados";
};

_hash_change = function(a)
{
    _url    = a.newURL.split("#")[1];
    _ourl   = a.oldURL.split("#")[1];
    if(_url != '')
        _cambia_seccion(_url);
    _secciones = document.getElementsByClassName('secciones');
};
window.addEventListener("hashchange", _hash_change);
document.addEventListener("backbutton", function(a){a.preventDefault();}, false);

function _recibe_ajax(v,b)
{
    if( v.termina == "login" )
    {
        if(v.aviso)
        {
            $r.cls('t', window.btoa(JSON.stringify(v.datos)));
            window.location.hash = "#empleados";
        }
        else
            alert("Los datos no son válidos");
    }
    else
    {
        if((v.termina != "expirado"))
        {
            switch(b)
            {
                case 'cierra_sesion':
                    if (v.aviso)
                    {
                        $r.lls();
                        TweenMax.fromTo(_e.d.menu_usuario, .2, {alpha: 1, display:"inline-block"}, {alpha: 0, display:"none", ease: Power3.easeInOut});
                        window.location.href = "#login";
                        _usuario_session = null;
                    }
                break;
                case 'trae_empleados':
                    if (v.aviso) 
                    {
                        if(v.cant > 0)
                        {
                            if(v.datos.length > 0)
                            {
                                _e.d.tabla_empleados.innerHTML = "";
                                for (var i = 0; i < v.datos.length; i++) 
                                {
                                    $ht =  '<td class="table_cell_evento borde_cell_evento"><img src="qr/'+v.datos[i].d_d+'.png"></td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_nom+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_ape+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_d+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_ubica+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_nper+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_feri+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+v.datos[i].d_rubr+'</td>\
                                            <td class="table_cell_evento borde_cell_evento">'+ v.datos[i].d_hoin +'</td>\
                                            <td class="table_cell_evento borde_cell_evento contiene_iconos_editar">\
                                                <div class="contiene_btones_empleados"><img class="ver_ojo_permi" onclick="_ve_permisionario('+v.datos[i].d_d+')" src="template/iconos/view.png">\
                                                <img class="borra_permi" onclick="_borra_permisionario('+v.datos[i].d_d+')" src="template/iconos/garbage.png"></div>\
                                            </td>';
                                    _tr  =  document.createElement('tr');
                                    if (i%2 == 0) {
                                        _tr.classList.add("fila_gris")
                                    }
                                    _tr.innerHTML = $ht;
                                    _tr.setAttribute('data-puntero', v.datos[i].d_d);
                                    _tr.setAttribute('class', 'fila_lista_permisionario');
                                    _e.d.tabla_empleados.appendChild(_tr);
                                }
                            }
                        }
                        else
                            alert("No hay permisionarios disponibles");
                        // _e.d.decargar_registros_tattoo_bsas.innerHTML = '<span><a href="./xmls/registros_tattoo_bsas.php" target="_blank">Descargar registros</a></span>'
                    }
                    else
                        alert('Error en la carga');
                break;
                case "trae_asistencias":
                    if (v.aviso) 
                    {
                        if( v.datos.length > 0 )
                        {
                            _e.d.tabla_asistencias.innerHTML = "";
                            for (var i = 0; i < v.datos.length; i++) 
                            {
                                $ht =  '<td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_fec+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_hora+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_nomem+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_apeem+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_d+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">'+v.datos[i].d_feri+'</td>';
                                _tr  =  document.createElement('tr');
                                if (i%2 == 0) {
                                    _tr.classList.add("fila_gris")
                                }
                                _tr.innerHTML = $ht;
                                _e.d.tabla_asistencias.appendChild(_tr);
                            }
                        }
                        
                    }
                    else
                    {
                        $ht =  '<td class="table_cell_asistencia borde_cell_evento">-</td>\
                                <td class="table_cell_asistencia borde_cell_evento">-</td>\
                                <td class="table_cell_asistencia borde_cell_evento">-</td>\
                                <td class="table_cell_asistencia borde_cell_evento">-</td>\
                                <td class="table_cell_asistencia borde_cell_evento">-</td>\
                                <td class="table_cell_asistencia borde_cell_evento">-</td>';
                        _tr  =  document.createElement('tr');
                        if (i%2 == 0) {
                            _tr.classList.add("fila_gris")
                        }
                        _tr.innerHTML = $ht;
                        _e.d.tabla_asistencias.appendChild(_tr);

                        alert('No se encuentran datos', 2500);
                    }
                break;
                case "trae_usuarios":
                    if (v.aviso) 
                    {
                        if( v.datos.length > 0 )
                        {
                            _e.d.tabla_usuarios.innerHTML = "";
                            for (var i = 0; i < v.datos.length; i++) 
                            {
                                $ht =  '<td class="table_cell_asistencia borde_cell_evento" data-puntero-editar="'+i+'">'+v.datos[i].d_u+'</td>\
                                        <td class="table_cell_asistencia borde_cell_evento">******</td>\
                                        <td class="table_cell_asistencia borde_cell_evento editar_usuario"><img class="edit_user" data-u="'+v.datos[i].u+'" data-d-u="'+v.datos[i].d_u+'" data-puntero="'+i+'" onclick="_edita_usuario(this)" src="template/iconos/edit.png" /> <img id="delete_user" onclick="_elimina_usuario(\''+v.datos[i].u+'\')" src="template/iconos/garbage.png" /> <img id="ve_user" onclick="_ve_usuario(\''+v.datos[i].u+'\')" src="template/iconos/view.png" /></td>';
                                _tr  =  document.createElement('tr');
                                _tr.classList.add("fila_usuario");
                                _tr.setAttribute('data-puntero', v.datos[i].u);
                                if (i%2 == 0) {
                                    _tr.classList.add("fila_gris")
                                }
                                _tr.innerHTML = $ht;
                                _e.d.tabla_usuarios.appendChild(_tr);
                            }
                        }
                    }
                    else
                        _e.d.tabla_usuarios.innerHTML = "No hay usuarios disponibles";
                break;
                case "edita_usuario":
                    if (v.aviso) 
                    {
                        _cierrapop();
                        document.querySelector('.borde_cell_evento[data-puntero-editar="'+v.puntero+'"]').innerHTML = v.user;
                        document.querySelector('.edit_user[data-puntero="'+v.puntero+'"]').setAttribute('data-d-u', v.user);
                        _e.d.user.value = "";
                        _e.d.pass.value = "";
                        alert("La edición se realizó con éxito", 1200);
                    }
                    else
                        alert("Problemas en la edición, por favor intentelo más tarde.");
                break;
                case "_elimina_usuario":
                    if (v.aviso) 
                    {
                        _cierrapop();
                        document.querySelector('.fila_usuario[data-puntero="'+v.puntero+'"]').remove();
                        alert("La edición se realizó con éxito", 1200);
                    }
                    else
                        alert("Problemas en la edición, por favor intentelo más tarde.");
                break;
                case "_crea_usuario":
                    if (v.aviso) 
                    {
                        _cierrapop();
                        _cant = document.getElementsByClassName('fila_usuario').length;
                        $ht =  '<td class="table_cell_asistencia borde_cell_evento" data-puntero-editar="'+(_cant-1)+'">'+v.user+'</td>\
                                <td class="table_cell_asistencia borde_cell_evento">******</td>\
                                <td class="table_cell_asistencia borde_cell_evento editar_usuario"><img class="edit_user" data-u="'+v.u+'" data-d-u="'+v.user+'" data-puntero="'+(_cant-1)+'" onclick="_edita_usuario(this)" src="template/iconos/edit.png" /> \
                                <img id="delete_user" onclick="_elimina_usuario(\''+v.u+'\')" src="template/iconos/garbage.png" />\
                                <img id="ve_user" onclick="_ve_usuario(\''+v.u+'\')" src="template/iconos/view.png" /></td>';
                        _tr  =  document.createElement('tr');
                        _tr.classList.add("fila_usuario");
                        _tr.setAttribute('data-puntero', v.u);
                        if (i%2 == 0) {
                            _tr.classList.add("fila_gris")
                        }
                        _tr.innerHTML                    = $ht;
                        _contenido                       = _e.d.tabla_usuarios.innerHTML;
                        _e.d.tabla_usuarios.innerHTML    = "";
                        _e.d.tabla_usuarios.appendChild(_tr);
                        _otrocontenido = _e.d.tabla_usuarios.innerHTML;
                        _e.d.tabla_usuarios.innerHTML    = "";
                        _e.d.tabla_usuarios.innerHTML    = _otrocontenido+_contenido;
                        delete _contenido; delete _otrocontenido;
                        alert("El usuario se creo con éxito", 1200);
                    }
                    else
                        alert("Problemas en la edición, por favor intentelo más tarde.");
                break;
                case "_ve_usuario":
                    if(v.aviso)
                    {
                        _e.d.interna_popup.innerHTML = '<div id="cruz_popup" onclick="_cierrapop()">x</div>\
                                                        <div class="titularpop">Detalle de usuario</div>\
                                                        <div id="content_ver_usuario">\
                                                            <div class="ver_usuario_list" placeholder="Nombre"><span>Nombre: </span><span>'+v.datos[0].d_no+'</span></div>\
                                                            <div class="ver_usuario_list" placeholder="Apellido"><span>Apellido: </span><span>'+v.datos[0].d_ap+'</span></div>\
                                                            <div class="ver_usuario_list" placeholder="Email"><span>Email: </span><span>'+v.datos[0].d_em+'</span></div>\
                                                            <div class="ver_usuario_list" placeholder="Usuario"><span>Usuario: </span><span>'+v.datos[0].d_us+'</span></div>\
                                                        </div>';
                        TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});
                    }
                    else
                        alert("Problemas en la edición, por favor intentelo más tarde.");
                break;
                case "_crea_empleado":
                    if(v.aviso == true)
                    {
                        _e.d.form_crea_empleado.reset();
                        alert("El permisionario fue creado con éxito");
                    }
                    else if(v.aviso == 'repetido')
                        alert('Ya se encuentra un empleado registrado con ese documento');
                    else if(v.aviso == 'inhabilitado')
                        alert('Ya se encuentra un empleado registrado con ese documento, desea habilitarlo?');
                    else
                        alert("Problemas en la edición, por favor intentelo más tarde.");
                break;
                case "_ficha_permisionario":
                    if(v.aviso)
                    {
                        _e.d.interna_popup.innerHTML = "";
                        _cierra                      = document.createElement('div');
                        _cierra.setAttribute('id', 'cruz_popup');
                        _cierra.addEventListener('click', _cierrapop);
                        _cierra.innerHTML            = 'X';

                        _titular                     = document.createElement('div');
                        _titular.setAttribute('class', 'titularpop');
                        _titular.innerHTML           = 'Detalle de usuario';

                        _imprimir                    = document.createElement('button');
                        _imprimir.setAttribute('class', 'btn_gral');
                        _imprimir.setAttribute('id', 'btn_imprimir');
                        _imprimir.innerHTML          = "Imprimir ficha";
                        var _imprimeficha = function()
                        {
                           window.print();
                        };
                        _imprimir.addEventListener('click', _imprimeficha);

                        _contenido                   = document.createElement('div');
                        _contenido.setAttribute('id', "cont_ficha_permisionario");
                        (v.datos[0].fot == "") ? $foto = 'template/iconos/default.png' : $foto = 'template/fichas/fotos/'+v.datos[0].fot;
                        _contenido.innerHTML         = '<div class="impresionqr_modulo"> <div class="internasqr"> <div> <div> <img src="template/fichas/cabecera.jpg" /> </div> <div> <span>Ministerio de ambiente y espacio publico</span> <span>Subsecretaría de administración y uso del espacio público</span> <span>Dirección general de ferias</span> </div> <div> <div>Permiso de uso N°'+v.datos[0].np+'</div> <img src="qr/'+v.datos[0].d+'.png" /> <div>'+v.datos[0].tp+'</div> </div> <div class="contenedordatos"> <div>Feria: '+v.datos[0].fe+'</div> <div>Nombre: '+v.datos[0].n+' '+v.datos[0].a+'</div> <div>Dni: '+v.datos[0].d+'</div> <div>Rubro: '+v.datos[0].r+'</div> </div> </div> </div> <div class="contenedorpie"> <span>Mostrar permiso en lugar visible</span> <div> <img src="template/fichas/pie.jpg" /> </div> </div> </div> <div class="impresionqr_modulo"> <div class="internasqr"> <div> <div> <img src="template/fichas/cabecera.jpg" /> </div> <div> <span>Feria parque centenario</span> <span>'+v.datos[0].di+'</span> <span>Fecha de vencimiento '+v.datos[0].v+'</span> </div> <div> <img id="foto_ficha" src="'+$foto+'" /> <img src="template/fichas/firma.jpg" /> </div> </div> </div> <div class="contenedorpie"> <span>La presente credencial es personal e instransferible</span> <div> <img src="template/fichas/pie.jpg" /> </div> </div> </div>';
                        _e.d.interna_popup.setAttribute("class", "popupImpresionficha");          
                        _e.d.interna_popup.appendChild(_cierra);
                        _e.d.interna_popup.appendChild(_titular);
                        _e.d.interna_popup.appendChild(_imprimir);
                        _e.d.interna_popup.appendChild(_contenido);

                        TweenMax.to(_e.d.contenedor_popup, .2, {alpha: 1, transform:"scale(1)", display:"inline-block", ease: Power3.easeInOut});

                        delete _cierrapop; delete _titular; delete _contenido; delete _imprimir;
                    }   
                    else
                        alert("Problemas de conexión, por favor intentelo más tarde.");
                break;
                case "_borra_permisionario":
                    if(v.aviso)
                    {
                        document.querySelector('.fila_lista_permisionario[data-puntero="'+v.p+'"]').remove();
                        _cierrapop();
                    }
                    else
                        alert("Problemas de conexión, por favor intentelo más tarde.");
                break;
                case "_carga_masiva_csv":
                    if(v.aviso)
                    {
                        _e.d.devuelve_contenido_excel.innerHTML = '<div id="resultados_carga">Resultados de carga</div>';

                        for (var i = 1; i < v.cant; i++) 
                        {
                            var _item_cm        = document.createElement('div');
                                _item_cm.setAttribute('class', 'devolucion_cm');

                            var _ndni           = document.createElement('span');
                                _ndni.innerHTML = "Dni: "+v.datos[i].id_permisionario;

                            var _estado             = document.createElement('span');
                                _estado.innerHTML   = "Estado: "+ v.datos[i].aviso;

                            _item_cm.appendChild(_ndni);
                            _item_cm.appendChild(_estado);
                            _e.d.devuelve_contenido_excel.appendChild(_item_cm);
                        }

                        delete _item_cm; delete _ndni; delete _estado;
                    }
                    else
                        alert("Problemas de conexión, por favor intentelo más tarde.");  
                break;
            }
        }
        else
        {
            $r.lls();
            TweenMax.fromTo(_e.d.menu_usuario, .2, {alpha: 1, display:"inline-block"}, {alpha: 0, display:"none", ease: Power3.easeInOut});
            window.location.href = "#login";
            _usuario_session = null;
        }
    }
};
/* borrado de variables generales */
delete _recibe_ajax, _hash_change;