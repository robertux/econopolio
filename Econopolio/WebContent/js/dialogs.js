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