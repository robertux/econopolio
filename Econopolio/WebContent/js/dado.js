var dadoTossing = false;
var dadoTimer = null;
var dadoCurrent = 1;
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
	movePlayer(dadoCurrent);
}

function randomDadoFace(){
	var nextDadoPos = Math.floor(Math.random()*6);
	var nextDadoPosStr = "-" + dadoPositionsArr[nextDadoPos] + "px 0px";
	$("#caraDado").css("background-position", nextDadoPosStr);
	dadoCurrent = nextDadoPos+1;
}

function resetDado(){
	var dadoPosStr = "-" + dadoPositionsArr[0] + "px 0px";
	$("#caraDado").css("background-position", dadoPosStr);
	dadoCurrent = 1;
}
