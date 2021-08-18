function desaparecerRegistro() {
	$("#oscurecer").fadeOut();
}
function desaparecer(){
		$("#registrar").fadeOut(300, desaparecerRegistro);
}
function mostrarFormulario(){
	$("#registrar").fadeIn();
	$("#oscurecer").click(desaparecer);
	$("#cerrar").click(desaparecer);
	
}

function aparecerRegistro(e){
e.preventDefault();
$("#oscurecer").fadeIn(500, mostrarFormulario);
}

function mostrarInsertar(){
$("#regis").click(aparecerRegistro);
}
$(document).ready(mostrarInsertar);