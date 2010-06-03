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
		title: "Pregunta",
		height: 450,
		width: 800 
	});
}

function closeQuestionDialog(respuesta){
	$("#questionDialog").dialog("close");
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