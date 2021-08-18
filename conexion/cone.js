function Registro(id,nombre,acompanantes,lugar,fecha,hora) {
	this.id =id;
	this.nombre = nombre;
	this.acompanantes=acompanantes;
	this.lugar=lugar;
	this.fecha=fecha;
	this.hora=hora;
	}

$(document).ready(function(){
//conexion a bd
var base = openDatabase("mybd", "1.0","Prueba numero 3", 5*1024*1024);

//tabla 
var sql = "CREATE TABLE IF NOT EXISTS registro(id integer primary key autoincrement, nombre, acompanantes, lugar , fecha, hora )";
base.transaction(function(t){
		t.executeSql(sql);
	});
mostrar(base);
	
	$("#enviar").click(function(){
		guardar(objeto(),base);
		mostrar(base);
		limpiar();
	});

	$("#actualizar").click(function(){
		actualizar(objeto(),base);
		
		mostrar(base);
		
	});
	$("#cancelar").click(function(){
		limpiar();
		$("#enviar").css("display","block");
		$("#actualizar").css("display","none");
		$("#cancelar").css("display","none");
	});
});

	function objeto(){
	var registro = new Registro(

		parseInt($("#id").val()),
		$("#nombre").val(),
		$("#acompanantes").val(),
		$("#lugar").val(),
		$("#fecha").val(),
		$("#hora").val(),
		);
	return registro;
}
function guardar(registro,base){
	if(registro.nombre != '' && registro.acompanantes != '' && registro.lugar != '' && registro.fecha != '' && registro.hora != '' ){
		base.transaction(function(t){
			var sql = "INSERT INTO registro (nombre, acompanantes, lugar , fecha, hora)";
				sql += "VALUES (?,?,?,?,?,?)";
			t.executeSql(sql,
				[registro.nombre,registro.acompanantes,registro.lugar,registro.fecha,registro.hora]
			);
		});
		alert("Se guardo su registro, cuando vaya a su destino un guia lo acompa&ntilde;ara en su recorrido por su seguridad");
	}else{
		alert("Llene todos los campos son necesarios, por favor");
	}
}
function actualizar(registro,base){
	base.transaction(function(t){
		var l= "update registro set nombre = ?,acompanantes = ?, lugar= ?, fecha= ?,hora= ? where id = ?";
			t.executeSql(l,
				[registro.nombre,registro.acompanantes,registro.lugar,registro.fecha,registro.hora,registro.id]
			);

			console.log(registro);
		});
}
function eliminar(id, base){
	base.transaction(function(t){
			t.executeSql("DELETE FROM registro WHERE id =" +id);
		});
}

function mostrarId(id, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM registro WHERE id="+id,[],function(t,resultado){
			$("#id").val(resultado.rows.item(0).id);
			$("#nombre").val(resultado.rows.item(0).nombre);
			$("#acompanantes").val(resultado.rows.item(0).acompanantes);
			$("#lugar").val(resultado.rows.item(0).lugar);
			$("#fecha").val(resultado.rows.item(0).fecha);
			$("#hora").val(resultado.rows.item(0).hora);
			
		});
	});
}


function mostrar(base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM registro",[],function(t,resultado){
			var cabecera = "<tr>"+
					"<th>Id</th>"+
					"<th>Nombre</th>"+
					"<th>Acompa&ntilde;antes</th>"+
					"<th>Lugar</th>"+
					"<th>Fecha</th>"+
					"<th>Hora</th>"+
					"<th>Modificar</th>"+
					"<th>Eliminar</th>"+

				"</tr>";
			var cuerpo = "";
			for(var i = 0; i < resultado.rows.length; i++){
					cuerpo += "<tr>";
					cuerpo += "<td>" + resultado.rows.item(i).id + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).nombre + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).acompanantes + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).lugar + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).fecha + "</td>";
					cuerpo += "<td>" + resultado.rows.item(i).hora + "</td>";
					cuerpo += "<td><spam class='modificar' data-modificar='"+resultado.rows.item(i).id +"'>O</spam></td>";
					cuerpo += "<td><spam  class='eliminar' data-eliminar='"+resultado.rows.item(i).id +"'>X</spam></td>";
					cuerpo += "</tr>";
			}
				$("#registros").html(cabecera + cuerpo);
			$('.eliminar').click(function(){
				var confirmar = confirm("¿Desea eliminar?");
				if(confirmar == 1){
					eliminar($(this).attr('data-eliminar'),base);
					mostrar(base);
				}
			});

			$('.modificar').click(function(){
				mostrarId($(this).attr('data-modificar'),base);
				$("#enviar").css("display","none");
				$("#actualizar").css("display","block");
				$("#cancelar").css("display","block");
				
			});

		}); 
	});
}

function limpiar(){
	$("#id").val(''),
	$("#nombre").val(''),
	$("#acompanantes").val(''),
	$("#lugar").val(''),
	$("#fecha").val(''),
	$("#hora").val('')
}
