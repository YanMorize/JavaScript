var vidas = 1 
var altura = 0	
var largura = 0
var tempo = 60

var cria_mosquito_tempo = 1500

var nivel = window.location.search

nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	cria_mosquito_tempo = 1500
}
	else if (nivel === 'dificil') {
	cria_mosquito_tempo = 1000
	}
	else if (nivel === 'chucknorris') {
	cria_mosquito_tempo = 750
	}
function regularTamanhoPalco() {

	altura = window.innerWidth
	largura = window.innerHeight	

	console.log(largura, altura)
}

	var cronometro = setInterval(function(){

		tempo -= 1 


		if(tempo < 0 ) {	
			clearInterval(cronometro)
			clearInterval(criar_mosquito)
			window.location.href = 'vitoria.html'
		}
		else{

		document.getElementById('cronometro').innerHTML = tempo
		
		}

	},1000)

	regularTamanhoPalco()

function posicaoRandomica(){

	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()
		if (vidas >= 3 ) {
			window.location.href = 'game_over.html'
		}
		else{document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
		
		vidas++
		}
	}

	var positionX = Math.floor(Math.random() * altura) - 90
	var positionY = Math.floor(Math.random() * largura) - 90

	positionX = positionX < 0 ? 0 : positionX
	positionY = positionY < 0 ? 0 : positionY
	console.log(positionY, positionX)

	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png' 
	mosquito.className = tamanhoAleatorio()+ ' ' + ladoAleatorio()
	mosquito.style.left = positionX + 'px'
	mosquito.style.top = positionY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function () {
		this.remove()
	}

	document.body.appendChild(mosquito)


	console.log(ladoAleatorio())
}

 
function tamanhoAleatorio() {
	 
	var classe = Math.floor(Math.random() * 3)

	switch(classe){

		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'
		
		case 2:
			return 'mosquito3'
		
	}
}
function ladoAleatorio() {

	var lado = Math.floor(Math.random() * 2)

	switch(lado){

		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}
	
}