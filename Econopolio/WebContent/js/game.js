$(document).ready(function(){
	$(".button").button();
});

var dadoTossing = false;
var dadoTimer = null;
var dadoPositionsArr = [0, 50, 100, 150, 200, 250];

function toggleDado(){
	if(dadoTossing){
		stopAnimDado();
		$("#btnAnimDado").val("Lanzar dado");
	}
	else{
		startAnimDado();
		$("#btnAnimDado").val("Detener dado");
	}
		
	dadoTossing = !dadoTossing;
}

function startAnimDado(){
	dadoTimer = setInterval("randomDadoFace()", 50);
}

function stopAnimDado(){
	clearInterval(dadoTimer);
	openQuestionDialog();
}

function randomDadoFace(){
	var nextDadoPos = Math.floor(Math.random()*6);
	var nextDadoPosStr = "-" + dadoPositionsArr[nextDadoPos] + "px 0px";
	$("#caraDado").css("background-position", nextDadoPosStr);
}

function startNewGame(){
	openConfirmDialog("Está seguro que desea salir del juego?");
}


function openConfirmDialog(dialogMsg){
	$("#confirmDialog>p>label").html(dialogMsg);
	
	$("#confirmDialog").dialog({
		modal: "true",
		title: "Confirmación"
	});
}

function closeConfirmDialog(){
	$("#confirmDialog").dialog("close");
}

function openQuestionDialog(){
	$("#questionDialog").dialog({
		modal: true,
		title: "Pregunta"
	});
}

function closeQuestionDialog(respuesta){
	$("#questionDialog").dialog("close");
	evaluarRespuesta(respuesta);
}

function evaluarRespuesta(respuesta){
	
	if(respuesta == 1){
		$("#responseDialog>p>label").removeClass("fail");
		$("#responseDialog>p>label").addClass("success");
		openResponseDialog("Respuesta correcta!");
	}
	else{
		$("#responseDialog>p>label").removeClass("success");
		$("#responseDialog>p>label").addClass("fail");
		openResponseDialog("Respuesta equivocada");
	}
}

function openResponseDialog(dialogMsg){
	$("#responseDialog>p>label").html(dialogMsg);
	$("#responseDialog").dialog({
		modal: true
	})
}

function closeResponseDialog(){
	$("#responseDialog").dialog("close");
}
