$(document).ready(function(){
	$(".button").button();
	startNewGame();
	$("#btnStartNewGame").click(function(){
		openConfirmDialog("Está seguro que desea salir del juego?");
	});
});

//player data
var playerName = "Jugador";
var playerJob = "Puesto";
var playerCompany = "Empresa";
var playerScore = 600;
var scoreStep = 50;
var currentTipoPregunta = 0;
var currentPregunta = 0;

function startNewGame(){
	$("#playerIcon").css("left", coordenadas[0].x);
	$("#playerIcon").css("top", coordenadas[0].y);
	resetDado();
	resetPlayer();
	playerScore = 600;
	openNewPlayerDialog();
}

function evaluarRespuesta(respuesta){
	$("#questionDialog").find(".questionButton").attr("disabled", "true");
	if(respuesta == preguntas[currentTipoPregunta].preguntas[currentPregunta].correcta){
		$("#result").removeClass("fail");
		$("#result").addClass("success");
		$("#result").html("Respuesta correcta!");
		playerScore += scoreStep;
	}
	else{
		$("#result").removeClass("success");
		$("#result").addClass("fail");
		$("#result").html("Respuesta equivocada");
		playerScore -= scoreStep;
	}
			
	$("#playerScore").html("$" + playerScore + ".0");
	$("#questionDialog").find(".questionButton").removeAttr("disabled");
	
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
	playerCurrentPos += positions;
	currentPregunta = playerCurrentPos;
	while(currentPregunta>=preguntas[currentTipoPregunta].preguntas.length){
		currentPregunta -= preguntas[currentTipoPregunta].preguntas.length-1;
		currentTipoPregunta++;
	}
	openQuestionDialog();
}

function resetPlayer(){
	$("#playerIcon").css("left", coordenadas[0].x);
	$("#playerIcon").css("top", coordenadas[0].y);
}
