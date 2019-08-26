var statistics = new Vue({
	el: '#app',
	data:{
		demMembers: [],
		repMembers: [],
		indMembers: [],
		totalMembers: 0,
		numberOfDem: 0,
		numberOfRep: 0,
		numberOfInd: 0,
		promedioDem: 0,
		promedioRep: 0,
		promedioInd: 0,
		promVotesGral: 0,
		mostEng: [],
		leastEng: [],
		mostLoyal: [],
		leastLoyal: [],
		ready: false,
		//HEADERS PARA REQUEST
		myKey: { 	method: 'GET',
               		headers: {"X-API-Key": "zolm02UWxpPs5cIsMAZ96wNK1gT0QYX3uTc6pZT0"},
               		mode: 'cors',
          			cache: 'default' },
		//URL API
		urlSenate: "https://api.propublica.org/congress/v1/115/senate/members.json",
		urlHouse: "https://api.propublica.org/congress/v1/115/house/members.json",
	},
	created(){//ENVIA EL REQUEST Y CON LOS DATOS RECIBIDOS COMPLETA EL VUE
			let url;
			(document.getElementById("senate")? url= this.urlSenate : url= this.urlHouse);
		
			  fetch(url, this.myKey).then(function(response) {
				  if(response.ok) {//SI LA LLAMADA FUE EXITOSA HACE LA PROMESA DE DEVOLVER UN JSON CON LA INFO
					return response.json(); 
				  }
				  //SI LA LLAMADA NO FUE EXITOSA ENVIA EL MENSAJE DE ERROR CORRESPONDIENTE PARA QUE EL CATCH LO LEVANTE
				  throw new Error(response.statusText);
				}).then(function(json) {//GUARDA EL JSON EN EL OBJETO
				  let dataRaw= json;
				  let parsedData= dataRaw.results[0].members;
				  console.log(parsedData);
				  statistics.totalMembers= parsedData.length;
				  statistics.fillStats(parsedData);
				  statistics.leastMost(parsedData);
				  statistics.ready=true;
				}).catch(function(error) {
				  //TOMA CUALQUIER ERROR QUE SUCEDA EN LA CADENA
				  console.log( "Request failed: " + error.message );
				});
	},
	methods:{
		parseMembers: function(lista){
			this.demMembers= lista.filter(member => member.party === "D");
			this.repMembers= lista.filter(member => member.party === "R");
			this.indMembers= lista.filter(member => member.party === "I");
		},
		fillStats: function(parsed){
			this.parseMembers(parsed);
			this.numberOfDem= this.demMembers.length;
			this.numberOfRep= this.repMembers.length;
			this.numberOfInd= this.indMembers.length;
			this.promedioDem= this.promVotesParty(this.demMembers);
			this.promedioRep= this.promVotesParty(this.repMembers);
			this.promedioInd= this.promVotesParty(this.indMembers);
			this.promVotesGral= ((parseFloat(this.promedioDem) + parseFloat(this.promedioInd) + parseFloat(this.promedioRep))/((this.numberOfInd>0)? 3 : 2)).toFixed(2);
		},
		promVotesParty: function(lista){
			let suma=0;
			lista.forEach(i => {suma+= parseFloat((i.votes_with_party_pct != null)? i.votes_with_party_pct : 0)})
			return (suma/parseFloat(((lista.length<1)? 1: lista.length))).toFixed(2);
		},
		leastMost: function(members){//Busca el valor de corte y llama al escritor de codigo para las tablas de loyalty
			
			if(document.getElementById("engage")){
				
				members.sort(function(x,y) {return y.missed_votes - x.missed_votes});

				let diezPercent = parseInt(this.totalMembers*0.1);
				var valorCorteLeast = members[diezPercent-1].missed_votes;
				var valorCorteMost = members[this.totalMembers - 1 - diezPercent].missed_votes;
				
				this.fillMostLeast(valorCorteLeast,valorCorteMost, members);
			} else {
				
				let aux= members.filter(i => i.votes_with_party_pct != undefined);
				aux.sort(function(x,y) {return x.votes_with_party_pct - y.votes_with_party_pct});

				let diezPercent = parseInt(this.totalMembers*0.1);
				var valorCorteLeast = aux[diezPercent-1].votes_with_party_pct;
				var valorCorteMost = aux[this.totalMembers - 1 - diezPercent].votes_with_party_pct;
				
				this.fillMostLeast(valorCorteLeast,valorCorteMost, aux);
			}
			
		},
		fillMostLeast: function(corte_least, corte_most, lista){//LLENA LOS ARRA DE LEAST Y MOST
			
			if(document.getElementById("attendance")){
				
				this.mostEng= lista.filter(member => (member.missed_votes <= corte_most && member.missed_votes!= null));
				this.leastEng= lista.filter((member => member.missed_votes >= corte_least && member.missed_votes != null));	
				this.mostEng.reverse();
				
			} else{
				
				this.mostLoyal= lista.filter(member => member.votes_with_party_pct >= corte_most);
				this.leastLoyal= lista.filter(member => member.votes_with_party_pct <= corte_least);
				this.mostLoyal.reverse();
				
			}
		},
	}
});


