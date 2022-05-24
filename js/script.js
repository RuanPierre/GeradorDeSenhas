function pegarTamanho() {
    tamanho = parseInt(document.getElementById("input").value);
    document.getElementById("input").value = "";
  
    digitos = "0123456789";
    letras_min = "aãbcçdefghijklmnopqrstuvwxyz";
    letras_mai = "AÃBCÇDEFGHIJKLMNOPQRSTUVWXYZ";
    caracteres_esp = "!#$%&*+,-./:;<=>?@^_`|~";
  
    valores = digitos + letras_min + letras_mai + caracteres_esp;
  
    if (tamanho >= 1) {
      if (tamanho <= 100) {
        var senha = formarSenha();
        exibirNaTela(senha);
      } else {
        document.getElementById("div-resultado").innerHTML=
        '<h2 id="resultado" class="resultado">Senha muito grande (Digite números menores que 100)</h2>'
      }
    } else {
      document.getElementById("div-resultado").innerHTML=
      '<h2 id="resultado" class="resultado">Senha nula ou negativa (Digite números maiores que 0)</h2>'
    }
  }
  
function formarSenha() {
    var senha = "";

    for (var i = 0; i < tamanho; i++) {
      var numeroSorteado = Math.floor(Math.random() * 89);
      var valor = valores[numeroSorteado];
  
      if (valor == ";") {
        if (senha.indexOf("&") >= 0) {
          while (numeroSorteado == 78) {
            numeroSorteado = Math.floor(Math.random() * 89);
          }
          valor = valores[numeroSorteado];
          
        }
      }
  
      senha += valor;
    }
    senha = verificador(senha);
    return senha;
  }
  
function verificador(senha) {
    // Garantia de que irá ter ao menos um caractere de cada tipo, proporcionando uma senha mais segura //
  
    var verDigito = 0;
    var verLetraMin = 0;
    var verLetraMai = 0;
    var verChar = 0;

    
    if (tamanho < 50) {
      var numNec = Math.floor(0.25 * tamanho);
    } else {
      var numNec = 12;
    }
  
    for (var i = 0; i < tamanho; i++) {
      if (digitos.indexOf(senha[i]) >= 0) {
        verDigito += 1;
      } else if (letras_min.indexOf(senha[i]) >= 0) {
        verLetraMin += 1;
      } else if (letras_mai.indexOf(senha[i]) >= 0) {
        verLetraMai += 1;
      } else if (caracteres_esp.indexOf(senha[i]) >= 0) {
        verChar += 1;
      }
    }
  
    if (
      verDigito < numNec || verLetraMin < numNec || verLetraMai < numNec || verChar < numNec) {
         senha = formarSenha();
    }

    return senha;
  }

function exibirNaTela(senha) {
    var senha1 = "";
    var valorDivisao = 50;

    senha = ajustarSenha(senha, "exibir");

    if (tamanho > 50){
      // Se a senha tem mais de 50 caracteres só são mostrados os primeiros 50 caracteres

      if (senha.indexOf("&#60;")){
      valorDivisao = definirValorDivisao(senha);
      }

      for(var i = 0; i < valorDivisao; i++){
        senha1 += senha[i];
        console.log(senha[i]);
      }
      
      document.getElementById("div-resultado").innerHTML= '<h2 id="resultado" class="resultado">' + senha1 + 
      ' (...)</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
      document.getElementById("resultado").value = senha;
      console.log(senha1)
      }
    else {
    document.getElementById("div-resultado").innerHTML= '<h2 id="resultado" class="resultado">' + senha 
    + '</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
    document.getElementById("resultado").value = senha;
    }
  }

async function copiar() {
    try {
      var senha = document.getElementById("resultado").value;
      senha = ajustarSenha(senha, "copiar");
      await navigator.clipboard.writeText(senha);
      alert("Texto Copiado!")
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

function ajustarSenha(senha, tipoDaFuncao) {

    if (tipoDaFuncao == "exibir") {
      for (var i = 0; i < tamanho; i++) {
        if (senha[i] == "<") {
          senha = senha.replace("<", "&#60;");
        }
      }
    }
    else if (tipoDaFuncao == "copiar"){
      console.log(senha)
      for (var i = 0; i < tamanho-4; i++) {
        if (senha[i] == "&" && senha[i+1] == "#" && senha[i+2] == "6" && 
          senha[i+3] == "0" && senha[i+4] == ";") {
          senha = senha.replace("&#60;", "<");
        }
      }
    }

      return senha
  }

  function definirValorDivisao(senha){

    // Se é encontrado o símbolo "&#60;" a borda da divisao aumenta em 4
    // para incluir todos esses caracteres e formar o simbolo "<" 
    // Por exemplo se esse simbolo estiver na posição 0, 1, 2, 3, e 4
    // o simbolo "<" vai fazer com que a frase fique com 46 letras ao invés de 50
    // Então é adicionado mais 4 espaços para letras 

    var valorDivisao = 50;
    var indexDivisao = 50;

      for (var i = 0; i < indexDivisao-4; i++){

        if (senha[i] == "&" && senha[i+1] == "#" && senha[i+2] == "6" && 
        senha[i+3] == "0" && senha[i+4] == ";") {
          indexDivisao += 4;
          valorDivisao += 4;
        }
      }
    return valorDivisao;
  }

  
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var btn = document.querySelector("#btn");
  
      btn.click();
    }
  });

       