//OBJETO VUE
var app= new Vue({
	el: '#app',
	data:{
		members: [],
		states: [],
    	checkedParties:["R","I","D"],
    	selectedState: "ALL",
		ready: false,
		myKey: { 	method: 'GET',
					headers: {"X-API-Key": "zolm02UWxpPs5cIsMAZ96wNK1gT0QYX3uTc6pZT0"},
					mode: 'cors',
					cache: 'default' },
		urlSenate: "https://api.propublica.org/congress/v1/115/senate/members.json",
		urlHouse: "https://api.propublica.org/congress/v1/115/house/members.json"
	},
	created(){
		(document.getElementById("senate")? this.fnFetch(this.urlSenate, this.myKey) : this.fnFetch(this.urlHouse, this.myKey))
	},
	methods:{
		filterMembers: function(){
			return (app != undefined)? app.members.filter(member => app.checkedParties.indexOf(member.party)>-1).filter(member => (app.selectedState ==="ALL" || app.selectedState === member.state)) : null
		},
		fnFetch: function(url, myHeaders){
			fetch(url,myHeaders).then(function(response) {
              if(response.ok) {//SI LA LLAMADA FUE EXITOSA HACE LA PROMESA DE DEVOLVER UN JSON CON LA INFO
                return response.json(); 
              }
              //SI LA LLAMADA NO FUE EXITOSA ENVIA EL MENSAJE DE ERROR CORRESPONDIENTE PARA QUE EL CATCH LO LEVANTE
              throw new Error(response.statusText);
            }).then(function(json) {//ACCIONES CON EL JSON RECIBIDO DEL SERVIDOR
			  console.log(json);
			  let dataRaw= json;
			  app.members= dataRaw.results[0].members;
			  cargarStates(app.members);
			  app.ready= true;
			  
            }).catch(function(error) {
              //TOMA CUALQUIER ERROR QUE SUCEDA EN LA CADENA
              console.log( "Request failed: " + error.message );
            })
		},
	}
});


function cargarStates(array){//CARGA LOS ESTADOS EN EL OBJETO VUE ORDENADOS ALFABETICAMENTE
	array.forEach(i => (app.states.indexOf(i.state) === -1 )? app.states.push(i.state) : null);
	app.states.sort((x,y)=>x.localeCompare(y));
}
