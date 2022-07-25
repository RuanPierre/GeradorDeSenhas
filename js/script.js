function pegarTamanho() {

    let tamanho = parseInt(document.getElementById("input").value);
    document.getElementById("input").value = "";
  
    if (tamanho >= 1) {
      if (tamanho <= 100) {
        let senha = formarSenha(tamanho);
        exibirNaTela(senha, senha.length);
      } else {
        document.getElementById("div-resultado").innerHTML=
        '<h2 id="resultado" class="resultado">Senha muito grande (Digite números menores que 100)</h2>'
      }
    } else {
      document.getElementById("div-resultado").innerHTML=
      '<h2 id="resultado" class="resultado">Senha nula ou negativa (Digite números maiores que 0)</h2>'
    }
  }
  
const formarSenha = (tamanho) => {

    const valores = "0123456789aãbcçdefghijklmnopqrstuvwxyzAÃBCÇDEFGHIJKLMNOPQRSTUVWXYZ!#$%&*+,-./:;<=>?@^_`|~";
    let senha = "";
    let numeroSorteado, valor;

    for (var i = 0; i < tamanho; i++) {
      numeroSorteado = Math.floor(Math.random() * 89);
      valor = valores[numeroSorteado];
  
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
    senha = verificador(senha, senha.length);
    return senha;
  }
  
const verificador = (senha, tamanho) => {
    // Garantia de que irá ter ao menos um caractere de cada tipo, proporcionando uma senha mais segura //

    const digitos = "0123456789";
    const letras_min = "aãbcçdefghijklmnopqrstuvwxyz";
    const letras_mai = "AÃBCÇDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteres_esp = "!#$%&*+,-./:;<=>?@^_`|~"; 
    let quantDigitos = 0;
    let quantLetrasMin = 0;
    let quantLetrasMai = 0
    let quantChar = 0;
    let numNecessario = 0;

    
    if (tamanho < 50) {
      numNecessario = Math.floor(0.25 * tamanho);
    } else {
      numNecessario = 12;
    }
  
    for (var i = 0; i < tamanho; i++) {
      if (digitos.includes(senha[i])) {
        quantDigitos += 1;
      } else if (letras_min.includes(senha[i])) {
        quantLetrasMin += 1;
      } else if (letras_mai.includes(senha[i])) {
        quantLetrasMai += 1;
      } else if (caracteres_esp.includes(senha[i])) {
        quantChar += 1;
      }
    }

    

    if (
      quantDigitos < numNecessario || quantLetrasMin < numNecessario || quantLetrasMai < numNecessario || quantChar < numNecessario) {
         senha = formarSenha(tamanho);
    }

    

    return senha;
  }

const exibirNaTela = (senha, tamanho) => {
    let senha1 = "";
    let valorDivisao = 10;

    senha = ajustarSenha(senha, 1);

    if (tamanho > 10){
      // Se a senha tem mais de 10 caracteres só são mostrados os primeiros 10 caracteres

      if (senha.includes("&#60;")){
      valorDivisao = definirValorDivisao(senha);
      }

      for(var i = 0; i < valorDivisao; i++){
        senha1 += senha[i];
      }
      
      document.getElementById("div-resultado").innerHTML= '<h2 id="resultado" class="resultado">' + senha1 + 
      ' (...)</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
      document.getElementById("resultado").value = senha;
      }
    else {
    document.getElementById("div-resultado").innerHTML= '<h2 id="resultado" class="resultado">' + senha 
    + '</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
    document.getElementById("resultado").value = senha;
    }
  }

const ajustarSenha = (senha, caso) => {

  switch (caso) {
    case 1:
      for (i in senha){
        if (senha[i] == "<"){
          senha = senha.replace("<", "&#60;");
          } 
        }
     
    return senha;
    break;
  
    case 2:
        for (let i = 0; i < senha.length-4; i++){
          if (senha[i] == "&" && senha[i+1] == "#" && senha[i+2] == "6"
          && senha[i+3] == "0" && senha[i+4] == ";"){
            senha = senha.replace("&#60;", "<");
          }
        }
      return senha;
    break;
    
    default:  
      return senha;
      break;
  }

  }

const definirValorDivisao = (senha) => {

    // Se a senha tem "<" ele irá ocupar 5 espaços
    // ja que é usado esse símbolo "&#60;"

    let valorDivisao = 10;
    
    senha = ajustarSenha(senha, 2);

    for (let i = 0; i < 10; i++) {
      if (senha[i] == "<"){
        valorDivisao += 4;
      }
    }
    return valorDivisao;
  }

async function copiar() {
    try {
      let senha = document.getElementById("resultado").value;

      senha = ajustarSenha(senha, 2);
      await navigator.clipboard.writeText(senha);
      alert("Texto Copiado!")
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var btn = document.querySelector("#btn");
  
      btn.click();
    }
  });

