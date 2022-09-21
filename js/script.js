function pegarTamanho() {

  let tamanho = parseInt(document.getElementById("input").value);
  document.getElementById("input").value = "";

  if (tamanho >= 1) {
    if (tamanho <= 10000) {
      let senha = formarSenha(tamanho);
      exibirNaTela(senha, tamanho);
    } else {
      document.getElementById("div-resultado").innerHTML =
        '<h2 id="resultado" class="resultado">Senha muito grande (Digite números menores que 10000)</h2>'
    }
  } else {
    document.getElementById("div-resultado").innerHTML =
      '<h2 id="resultado" class="resultado">Senha nula ou negativa (Digite números maiores que 0)</h2>'
  }
}

const formarSenha = (tamanho) => {

  const valores = "0123456789aãbcçdefghijklmnopqrstuvwxyzAÃBCÇDEFGHIJKLMNOPQRSTUVWXYZ!#$%&*+,-./:;<=>?@^_`|~";
  let numeroSorteado, valor, senha;
  let senhaSegura = false;

  do {

    senha = "";

    for (var i = 0; i < tamanho; i++) {
      numeroSorteado = Math.floor(Math.random() * valores.length);

      // Evita problemas como uma senha que contenha & seguido de ; já que existem códigos para letras assim então a senha teria um tamanho menor do que o esperado
      if (senha.indexOf("&") >= 0) {
        while (valores[numeroSorteado] == ";") {
          numeroSorteado = Math.floor(Math.random() * valores.length);
        }
      }

      valor = valores[numeroSorteado];
      senha += valor;
    }

    senhaSegura = verificador(senha, tamanho);

  } while (senhaSegura == false);

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
    quantDigitos < numNecessario || quantLetrasMin < numNecessario || quantLetrasMai < numNecessario || quantChar < numNecessario)
    return false;
  else
    return true;
}

const exibirNaTela = (senha, tamanho) => {
  let senhaDisplay = "";
  let valorDivisao;

  valorDivisao = definirValorDivisao(senha); // define qual o numero de iterações para pegar os 10 primeiros caracteres da senha
  senha = ajustarSenha(senha, 1);

  if (tamanho > 10) {
    // Se a senha tem mais de 10 caracteres só são mostrados os primeiros 10 caracteres

    for (var i = 0; i < valorDivisao; i++) {
      senhaDisplay += senha[i];
    }

    document.getElementById("div-resultado").innerHTML = '<h2 id="resultado" class="resultado">' + senhaDisplay +
      ' (...)</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
  }
  else {
    document.getElementById("div-resultado").innerHTML = '<h2 id="resultado" class="resultado">' + senha
      + '</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
  }
  document.getElementById("resultado").value = senha;
}

const ajustarSenha = (senha, caso) => {

  switch (caso) {
    case 1:
      for (i in senha) {
        if (senha.includes("<")) {
          senha = senha.replace("<", "&#60;");
        }
        else
          break;
      }

      return senha;
      break;

    case 2:
      for (i in senha) {
        if (senha.includes("&#60;")) {
          senha = senha.replace("&#60;", "<");
        }
        else
          break
      }
      return senha;
      break;

    default:
      return senha;
      break;
  }

}

const definirValorDivisao = (senha) => {

  // Se a senha tem "<" ele tem que pegar mais 4 espaços
  // ja que é usado esse símbolo "&#60;"

  let valorDivisao = 10;

  for (let i = 0; i < 10; i++) {
    if (senha.includes("<")) {
      valorDivisao += 4;
    }
    else
      break;
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

