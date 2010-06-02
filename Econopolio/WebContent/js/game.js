$(document).ready(function(){
	$(".button").button();
	startNewGame(true);
	$("body").bind("mousemove", function(evt){
		$("#pos").html("x: " + evt.pageX + ", y: " + evt.pageY);
	})
});

var dadoTossing = false;
var dadoTimer = null;
var dadoPositionsArr = [0, 50, 100, 150, 200, 250];

//player data
var playerName = "Jugador";
var playerJob = "Puesto";
var playerCompany = "Empresa";
var playerScore = 600;
var scoreStep = 50;
var confirmAnswer = false;

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

function startNewGame(firstTime){
	if(!firstTime)
		openConfirmDialog("Está seguro que desea salir del juego?", function(){ openNewPlayerDialog(); });
	else
		openNewPlayerDialog();
}


function openConfirmDialog(dialogMsg){
	$("#confirmDialog>p>label").html(dialogMsg);
	
	$("#confirmDialog").dialog({
		modal: "true",
		title: "Confirmación"
	});
}

function closeConfirmDialog(answer){
	$("#confirmDialog").dialog("close");
	confirmAnswer = answer;
}

function openQuestionDialog(){
	$("#questionDialog").dialog({
		modal: true,
		title: "Pregunta",
		height: 450,
		width: 800 
	});
}

function closeQuestionDialog(respuesta){
	$("#questionDialog").dialog("close");
	if(evaluarRespuesta(respuesta))
		playerScore += scoreStep;
	else
		playerScore -= scoreStep;
		
	$("#playerScore").html("$" + playerScore + ".0");
	$("#playerScore").effect("highlight", {}, 3000);
	$("#questionDialog").find(".questionButton").removeAttr("disabled");
}

function evaluarRespuesta(respuesta){
	$("#questionDialog").find(".questionButton").attr("disabled", "true");
	if(respuesta == 1){
		$("#result").removeClass("fail");
		$("#result").addClass("success");
		$("#result").html("Respuesta correcta!");
		return true;
	}
	else{
		$("#result").removeClass("success");
		$("#result").addClass("fail");
		$("#result").html("Respuesta equivocada");
	}
	
	return false;
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

