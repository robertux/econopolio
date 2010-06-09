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
	$("#resultImg").attr("class", "");
	$("#dialogQuestion").html(preguntas[currentTipoPregunta].preguntas[currentPregunta].pregunta);
	$("#questionList").html("");
	var ul = $("<ul>");
	var ulComodines = $("<ul>");
	var preguntaEspecial = preguntas[currentTipoPregunta].preguntas[currentPregunta].correcta == -1;
	
	switch(preguntas[currentTipoPregunta].tipo){
		case "Planificación": $("#questionImage").attr("src", ""); break;
		case "Precaución": $("#questionImage").attr("src", "media/inversion.png"); break;
		case "Producción y almacenamiento": $("#questionImage").attr("src", "media/produccion.png"); break;
		case "Economía y financiamiento": $("#questionImage").attr("src", "media/economia.png"); break;
		case "Organización": $("#questionImage").attr("src", ""); break;
		case "Marketing": $("#questionImage").attr("src", ""); break; 
		case "Castigo": $("#questionImage").attr("src", "media/castigo.png"); break;
		case "Oportunidad": $("#questionImage").attr("src", "media/oportunidad.png"); break;
	}
	
	for(var i=0; i<preguntas[currentTipoPregunta].preguntas[currentPregunta].opciones.length; i++){
		var opcion = $("<a>").attr("href", "#").attr("id", "btnQuestion" + i).addClass("questionOption");
		opcion.attr("onclick", "evaluarRespuesta(" + i + ")");
		opcion.html(preguntas[currentTipoPregunta].preguntas[currentPregunta].opciones[i])
		var li = $("<li>");
		li.append(opcion);
		ul.append(li);
	}
	if(!comodinSaltarPreguntaUsed && !preguntaEspecial){
		var liComodinSaltarPregunta = $("<li>").attr("href", "#").attr("id", "btnSaltarPregunta").addClass("questionOption");
		liComodinSaltarPregunta.html("Saltar pregunta");
		liComodinSaltarPregunta.attr("onclick", "saltarPregunta()");
		ulComodines.append(liComodinSaltarPregunta);
	}
	
	if(!comodinEliminarOpcionesUsed && !preguntaEspecial){
		var liComodinEliminarOpciones = $("<li>").attr("href", "#").attr("id", "btnEliminarOpciones").addClass("questionOption");
		liComodinEliminarOpciones.html("Eliminar opciones");
		liComodinEliminarOpciones.attr("onclick", "eliminarOpciones()");
		ulComodines.append(liComodinEliminarOpciones);
	}
	
	$("#questionList").append(ul);
	$("#questionList").append(ulComodines);
	
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
		height: 385
	});
}

function closeWinDialog(){
	$("#winDialog").dialog("close");
	startNewGame();
}
