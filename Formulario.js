const url = 'https://viacep.com.br/ws/$cep/json/';

var form =document.getElementById("formulario");

function Cadastro(){
    var id = document.getElementById("id").value
    var nome = document.getElementById("nome").value;
    var telefone= document.getElementById("tel").value;
    var salario = document.getElementById("salario").value;
    var idade =document.forms["formulario"]["idade"].value;
    var estadoCivil =document.forms["formulario"]["estado"].value;

    if(estadoCivil == "casado"){
        alert("Necessario enviar a documentação da esposa(o)");
        return false;
    }

    if(idade<18){
        alert("menor de idade");
        return false;
    }
    
    
    if(salario > 10000){
        alert("Necessario declarar imposto de renda");
        return false;
	}

    return true;
}

function findCEP(){
    var cep = document.getElementById("cep").value;
    var urlWithCEP = url.replaceAll("$cep", cep).replaceAll("-","");
    loadDoc(urlWithCEP);
}

function loadDoc(urlWithCEP){
    this.getJSON(urlWithCEP, function(err, data){
        document.getElementById("logradouro").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;
    });
}

var getJSON = function(url, callback){

    var  xhr  = new XMLHttpRequest(); 
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(){
        var status = xhr.status;
        if (status === 200){
            callback(null,  xhr.response);
        }else{
            callback(status, xhr.response);
        }
    };
    xhr.send();
}