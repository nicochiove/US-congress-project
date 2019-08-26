var legislators= new Vue({
	el: "#app",
	data: {
		legislators: [],
		states: [],
	},
	created(){
		m_data.forEach(state => this.states.push(state));
        this.states.sort((x,y) => x.id.localeCompare(y.id));
		
		let selected= this.getSelectedState();
		if(selected=="ct"){
		ct_legislators.forEach(legislator => { Object.defineProperty(legislator,"chamber_title",{value: this.getChamberTitle(legislator)}); 											this.legislators.push(legislator)});
		this.legislators.sort(function(x,y) {return x.full_name.localeCompare(y.full_name)});
		}
	},
	methods: {
		getChamberTitle:function(legislador){
			let str;
			((legislador.chamber == "upper")?  str="Senator" : str="Representative" )
			return str;
		},
		desplegarEstados: function(){

			let dropStates= document.getElementById("statesLinks");

			if(!dropStates.hasAttribute("style")){
				dropStates.setAttribute("style","display:block");
				dropStates.removeAttribute("style");
			}else{
				dropStates.getAttribute("style","display:none");
			}
		},
		getStateId: function(str){
			return "legislators.html?state="+str;
		},
		getSelectedState: function(){
			
			let parameters= window.location.href.split("?")[1].split("=");
			let paramValues={};
			let key= parameters[0];
			let value= parameters[1];
			
			Object.defineProperties(paramValues, {key: {value: value}});
			//parameters.forEach(parameter => {Object.defineProperties(paramvalues,{ } )};
			return paramValues.key;
		}
	}
})