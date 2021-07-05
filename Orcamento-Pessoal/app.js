
class Despesa{
	constructor(ano, mes, dia,tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this){
			if (this[i] === undefined || this[i] === '' || this[i] === null || this[i] === NaN) {
				return false
			}
			return true
		}
	}


}



	class Bd{
		constructor(){

			let id = localStorage.getItem('id')

			if (id === null) {
				localStorage.setItem('id', 0)
			}

		}
		getProximoId(){
			let proximoId = localStorage.getItem('id')
			return parseInt(proximoId) + 1
		}

		gravar(d){

			let id = this.getProximoId()
		
			localStorage.setItem(id, JSON.stringify(d))

			localStorage.setItem('id', id)
		}
	
		recuperarTodosOsRegistros(){
			
			let despesas = []

			let id = localStorage.getItem('id')

			for(let i = 1; i <= id; i++){

				let despesa = JSON.parse(localStorage.getItem(i))
			
				if (despesa === null) {

					continue
				}
				despesa.id = i
				despesas.push(despesa)
			}
		
			return despesas
		
		}
		
		remover(id){
			localStorage.removeItem(id)
		}

		pesquisar(despesa){
			let despesasFiltradas = []

			despesasFiltradas = this.recuperarTodosOsRegistros()

			console.log(despesa)

			if (despesa.ano != '') {
            	console.log("filtro de ano");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
			}
			if (despesa.mes != '') {
            	console.log("filtro de mes");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
			}
			if (despesa.dia != '') {
            	console.log("filtro de dia");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
			}
			if (despesa.tipo != '') {
            	console.log("filtro de tipo");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
			}
			if (despesa.descricao != '') {
            	console.log("filtro de descricao");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
			}
			if (despesa.valor != '') {
            	console.log("filtro de valor");
           		 despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
			}

			return despesasFiltradas
		}	

	}

	let bd = new Bd() 

	function cadastrarDespesa(){

		let ano = document.getElementById('ano')
		let mes = document.getElementById('mes')
		let dia = document.getElementById('dia')
		let tipo = document.getElementById('tipo')
		let descricao = document.getElementById('descricao')
		let valor = document.getElementById('valor')

		let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)	
		
		if (despesa.validarDados()) {
			bd.gravar(despesa)
			
			document.getElementById('modal-descricao').innerHTML = 'Despesa foi cadastrada com sucesso'
			document.getElementById('titulo').innerHTML = 'Registro inserido com sucesso'
			document.getElementById('modal_titulo_div').className = 'modal-header text success'
			document.getElementById('voltar').innerHTML = 'Voltar'
			document.getElementById('voltar').className = 'btn btn-success'

			$('#modalRegistraDespesa').modal('show')

			ano.value = ''
			mes.value = ''
			dia.value = ''
			tipo.value = ''
			descricao.value = ''
			valor.value = ''

		}else{
			document.getElementById('modal-descricao').innerHTML = 'Erro na gravação'
			document.getElementById('modal_titulo_div').className = 'modal-header text danger'
			document.getElementById('titulo').innerHTML = 'Falha no registro'
			document.getElementById('voltar').innerHTML = 'Voltar e corrigir'
			document.getElementById('voltar').className = 'btn btn-danger'

			$('#modalRegistraDespesa').modal('show')
		}


	}
		

	function carregaListaDespesas() {
	
	let despesas = []	

	despesas = bd.recuperarTodosOsRegistros()

	var listaDespesas = document.getElementById('listaDespesas')	

	despesas.forEach(function(d){


		let linha = listaDespesas.insertRow()


		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
		
		switch (d.tipo){
			case '1': d.tipo = 'Alimentação'
			break
			case '2': d.tipo = 'Educação'
			break
			case '3': d.tipo = 'Lazer'
			break
			case '4': d.tipo = 'Saúde'
			break
			case '5': d.tipo = 'Transporte'
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor


		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.id = d.id
		btn.innerHTML = '<i class = "fas fa-times"> </i>'
		btn.onclick = function(){
			bd.remover(this.id)
			window.location.reload()
			}
		linha.insertCell(4).append(btn)


	})	

	}	
	/*   <tr>
              <td>15/03/2018</td>
              <td>Tipo</td>
              <td>Descrição</td>
              <td>Valor</td>
              <td></td>
        </tr>  

    */
	

function pesquisarDespesa(){
		let ano = document.getElementById('ano').value
		let mes = document.getElementById('mes').value
		let dia = document.getElementById('dia').value
		let tipo = document.getElementById('tipo').value
		let descricao = document.getElementById('descricao').value
		let valor = document.getElementById('valor').value		

		let despesa = new Despesa(ano, mes, dia,tipo, descricao, valor)


		let despesas = bd.pesquisar(despesa)

		var listaDespesas = document.getElementById('listaDespesas')	
		listaDespesas.innerHTML = ''
		despesas.forEach(function(d){


		let linha = listaDespesas.insertRow()


		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}` 
		
		switch (d.tipo){
			case '1': d.tipo = 'Alimentação'
			break
			case '2': d.tipo = 'Educação'
			break
			case '3': d.tipo = 'Lazer'
			break
			case '4': d.tipo = 'Saúde'
			break
			case '5': d.tipo = 'Transporte'
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		let btn = document.createElement("button")
		linha.insertCell(4).append(btn)

	})	

	}	

