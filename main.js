cargarAcordionDefault();

var legislators= new Vue({
    el: '#nav',
    data: {
        states: [],
    },
    created(){
        m_data.forEach(state => this.states.push(state));
        this.states.sort((x,y) => x.id.localeCompare(y.id));
    }
})


function cargarAcordionDefault(){

    document.getElementById("acordion").innerHTML= 

                        `<div class="card">
							<div class="card-header" id="headingOne">
                            	<h2 class="mb-0">
        							<button onclick="cargarAcordionDesplegado()" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Read More</button>
								</h2>
    						</div>
                        </div>`;
}

function cargarAcordionDesplegado(){

	document.getElementById("acordion").innerHTML= 

                        `<div id="collapseOne" class="collapse" aria-labelledby="headingOne">
                            <div class="card-body">
                                <h3>Background History of Government Transparency</h3>
                                <p>In the West, the idea that government should be open to public scrutiny and susceptible to public opinion dates back at least to the time of the Enlightenment, when many philosophes made an attack on absolutist doctrine of state secrecy, a core part of their intellectual project. The passage of formal legislative instruments to this end can also be traced to this time with Sweden, for example, (which then included Finland as a Swedish-governed territory) enacting free press legislation as part of its constitution (Freedom of the Press Act, 1766). This approach, and that of the philosophes more broadly, is strongly related to recent historiography on the eighteenth-century public sphere.

                                <p>Influenced by Enlightenment thought, the revolutions in America (1776) and France (1789), freedom of the press enshrined provisions and requirements for public budgetary accounting and freedom of the press in constitutional articles. In the nineteenth century, attempts by Metternichean statesmen to row back on these measures were vigorously opposed by a number of eminent liberal politicians and writers, Bentham, Mill and Acton prominent among the latter.</p>

                                <p>Open government is widely seen to be a key hallmark of contemporary democratic practice and is often linked to the passing of freedom of information legislation. Scandinavian countries claim to have adopted the first freedom of information legislation, dating the origins of its modern provisions to the eighteenth century and Finland continuing the presumption of openness after gaining independence in 1917, passing its Act on Publicity of Official Documents in 1951 (superseded by new legislation in 1999).</p>

                                <p>The United States passed its Freedom of Information Act (FOIA) in 1966, FOIAs, Access to Information Acts (AIAs) or equivalent laws were passed in Denmark and Norway in 1970.</p>
                            </div>
                        </div>
                        <div class="card">
							<div class="card-header" id="headingOne">
                            	<h2 class="mb-0">
        							<button onclick="cargarAcordionDefault()" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Read Less</button>
								</h2>
    						</div>
                        </div>`;
}

function desplegarEstados(){

    let dropStates= document.getElementById("statesLinks");

    if(!dropStates.hasAttribute("style")){
        dropStates.setAttribute("style","display:block");
        dropStates.removeAttribute("style");
    }else{
        dropStates.getAttribute("style","display:none");
    }
}
