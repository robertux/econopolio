$(document).ready(function(){
	$(".button").button();
	startNewGame();
	$("#btnStartNewGame").click(function(){
		openConfirmDialog("Está seguro que desea reiniciar el juego?");
	});
});

//player data
var playerName = "Jugador";
var playerJob = "Puesto";
var playerCompany = "Empresa";
var playerScore = 600;
var scoreStep = 100;
var currentTipoPregunta = 0;
var currentPregunta = 0;

var comodinSaltarPreguntaUsed = false;
var comodinEliminarOpcionesUsed = false;

var preguntasContestadas = 0;
var preguntasAcertadas = 0;

var poseeSeguro = false;
var poseeSeguridad = false;
var poseeMaquinaria = false;
var poseeProdsInterm = false;

function startNewGame(){
	$("#playerIcon").css("left", coordenadas[0].x);
	$("#playerIcon").css("top", coordenadas[0].y);
	resetDado();
	resetPlayer();
	playerScore = 600;
	$("#playerScore").html("$" + playerScore + ".0");
	currentTipoPregunta = 0;
	currentPregunta = 0;
	playerCurrentPos = 0;
	preguntasAcertadas = 0;
	preguntasContestadas = 0;
	
	comodinEliminarOpcionesUsed = false;
	comodinSaltarPreguntaUsed = false;
	$("#comodinSaltarPregunta").show();
	$("#comodinEliminarOpciones").show();
	
	openNewPlayerDialog();
}

function evaluarRespuesta(respuesta){
	var preguntaEspecial = preguntas[currentTipoPregunta].preguntas[currentPregunta].correcta == -1;
	
	var esPreguntaPrecaucion = (preguntas[currentTipoPregunta].tipo.indexOf("Precaución") >= 0);
	var esPreguntaOportunidad = (preguntas[currentTipoPregunta].tipo.indexOf("Oportunidad") >= 0);
	var esPreguntaCastigo = (preguntas[currentTipoPregunta].tipo.indexOf("Castigo") >= 0);
	
	var keyword = preguntas[currentTipoPregunta].preguntas[currentPregunta].keyword;
	
	if(preguntaEspecial){
		if(esPreguntaPrecaucion && respuesta == 0){
			if(keyword.indexOf("seguro") >= 0) poseeSeguro = true;
			if(keyword.indexOf("seguridad") >= 0) poseeSeguridad = true; 
			if(keyword.indexOf("maquinaria") >= 0) poseeMaquinaria = true;
			if(keyword.indexOf("productos") >= 0) poseeProdsInterm = true;
		}
		
		if(esPreguntaCastigo || esPreguntaOportunidad){
			if((keyword.indexOf("seguro") >= 0) && !poseeSeguro) playerScore -= (playerScore * 0.5);
			if((keyword.indexOf("seguridad") >= 0) && !poseeSeguridad) playerScore -= (playerScore * 0.3);
			if((keyword.indexOf("maquinaria") >= 0) && poseeMaquinaria) playerScore += (playerScore * 0.5);
			if((keyword.indexOf("productos") >= 0) && poseeProdsInterm) playerScore += (playerScore * 0.3);
		}
		
		$("#playerScore").html("$" + playerScore + ".0");
		closeQuestionDialog();
		return;
	}
	
	preguntasContestadas++;
	if(respuesta == preguntas[currentTipoPregunta].preguntas[currentPregunta].correcta){
		preguntasAcertadas++;
		$("#result").removeClass("fail");
		$("#result").addClass("success");
		$("#result").html("Respuesta correcta!");
		$("#resultImg").addClass("answerWin");
		playerScore += scoreStep;
	}
	else{
		$("#result").removeClass("success");
		$("#result").addClass("fail");
		$("#result").html("Respuesta equivocada");
		$("#resultImg").addClass("answerFail");
		playerScore -= scoreStep;
	}
			
	$("#playerScore").html("$" + playerScore + ".0");
	
	setTimeout("closeQuestionDialog()", 1500);
}

function movePlayer(positions){
	if((playerCurrentPos + positions) >= coordenadas.length)
		positions = coordenadas.length - playerCurrentPos;
	
	for(var i=playerCurrentPos; i<=(playerCurrentPos+positions) && i<coordenadas.length; i++){
		$("#playerIcon").animate({
			left: coordenadas[i].x,
			top: coordenadas[i].y,
		}, 500);
	}
	setTimeout("afterMovePlayer(" + positions + ")", 700*positions);
}

function afterMovePlayer(positions){
	if((playerCurrentPos+positions) >= maxPos){
		playerCurrentPos = maxPos;
		currentPregunta = preguntas[currentTipoPregunta].preguntas.length-1;
	}
	else{
		playerCurrentPos += positions;
		currentPregunta += positions;
	}
	
	while(currentPregunta>=preguntas[currentTipoPregunta].preguntas.length){
		currentPregunta -= preguntas[currentTipoPregunta].preguntas.length;
		currentTipoPregunta++;
	}
	openQuestionDialog();
}

function resetPlayer(){
	$("#playerIcon").css("left", coordenadas[0].x);
	$("#playerIcon").css("top", coordenadas[0].y);
}

function checkForGameOver(){
	if(playerScore == 0)
		openGameOverDialog();
}

function checkForWin(){
	if(playerCurrentPos >= maxPos)
		openWinDialog();
}


function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function saltarPregunta(){
	closeQuestionDialog();
	comodinSaltarPreguntaUsed = true;
	$("#comodinSaltarPregunta").hide();
}

function eliminarOpciones(){
	var opcionesEliminar = Math.floor(preguntas[currentTipoPregunta].preguntas[currentPregunta].opciones.length / 2);
	var opcionesEliminadas = 0;
	var i = 0;
	var liList = $("#questionList>ul>li");
	while(opcionesEliminadas < opcionesEliminar){
		if(i != preguntas[currentTipoPregunta].preguntas[currentPregunta].correcta){
			$(liList[i]).fadeOut();
			opcionesEliminadas++;
		}
		i++;
	}
	
	comodinEliminarOpcionesUsed = true;
	$("#comodinEliminarOpciones").hide();
	$("#btnEliminarOpciones").fadeOut();
}
