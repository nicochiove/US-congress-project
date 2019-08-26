var dataJSON= new Vue({
	el: '#app',
	data:{
		ready: true,
		members: [],
		//HEADERS PARA REQUEST
		myKey: { 	method: 'GET',
               		headers: {"X-API-Key": "zolm02UWxpPs5cIsMAZ96wNK1gT0QYX3uTc6pZT0"},
               		mode: 'cors',
          			cache: 'default' },
		//URL API
		urlSenate: "https://api.propublica.org/congress/v1/115/senate/members.json",
		urlHouse: "https://api.propublica.org/congress/v1/115/house/members.json",
	},
	beforeDestroy(){
		this.ready= true;
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
				  console.log(json);
				  let dataRaw= json;
				  dataJSON.members= dataRaw.results[0].members;
				  this.ready= true;
				  //statistics.$mount("#tablas");
				}).catch(function(error) {
				  //TOMA CUALQUIER ERROR QUE SUCEDA EN LA CADENA
				  console.log( "Request failed: " + error.message );
				});
		}
})