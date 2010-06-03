function openConfirmDialog(dialogMsg){
	$("#confirmDialog>p>label").html(dialogMsg);
	
	$("#confirmDialog").dialog({
		modal: "true",
		title: "Confirmación"
	});
}

function closeConfirmDialog(answer){
	$("#confirmDialog").dialog("close");
	if(answer)
		startNewGame();
}

function openQuestionDialog(){
	$("#result").html("");
	$("#dialogQuestion").html(preguntas[currentTipoPregunta].preguntas[currentPregunta].pregunta);
	$("#questionList").html("");
	var ul = $("<ul>");
	for(var i=0; i<preguntas[currentTipoPregunta].preguntas[currentPregunta].opciones.length; i++){
		var opcion = $("<a>").attr("href", "#").attr("id", "btnQuestion" + i).addClass("questionOption");
		opcion.attr("onclick", "evaluarRespuesta(" + i + ")");
		opcion.html(preguntas[currentTipoPregunta].preguntas[currentPregunta].opciones[i])
		var li = $("<li>");
		li.append(opcion);
		ul.append(li);
	}
	$("#questionList").append(ul);
	
	$("#questionDialog").dialog({
		modal: true,
		title: "Pregunta - " + preguntas[currentTipoPregunta].tipo,
		height: 450,
		width: 800 
	});
}

function closeQuestionDialog(respuesta){
	$("#questionDialog").dialog("close");
	checkForGameOver();
	checkForWin();
}

function openNewPlayerDialog(){
	$("#newPlayerDialog").dialog({
		title: "Nuevo jugador",
		modal: true,
		height: 270,
		width: 420,
		close: function(){
			playerName = $("#txtJugador").val();
			playerJob = $("#txtPuesto").val();
			playerCompany = $("#txtEmpresa").val();
			
			$("#playerName").html(playerName);
			$("#playerJob").html(playerJob);
			$("#playerCompany").html(playerCompany);
		}
	})
}

function closeNewPlayerDialog(){
	$("#newPlayerDialog").dialog("close");
}

function openGameOverDialog(){
	$("#gameOverDialog").dialog({
			modal: true,
			title: "Juego Terminado",
		});
}

function closeGameOverDialog(){
	$("#gameOverDialog").dialog("close");
	
	startNewGame();
}

function openWinDialog(){
	$("#winDialog>p>label#title").html("Felicidades " + playerName + "!");
	$("#winDialog>p>label#content").html("Has participado contestando " + preguntasContestadas + " preguntas, de las cuales " + preguntasAcertadas + " fueron correctamente contestadas. Tu puntuación es de " + roundNumber(((preguntasAcertadas / preguntasContestadas)*100),2) + "%");
	$("#winDialog").dialog({
		modal: true,
		title: "Felicidades!",
		width: 700,
		height: 288
	});
}

function closeWinDialog(){
	$("#winDialog").dialog("close");
	startNewGame();
}
