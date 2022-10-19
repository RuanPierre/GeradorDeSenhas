function pegarTamanho() {

  let tamanho = parseInt(document.getElementById("input").value);
  document.getElementById("input").value = "";

  if (tamanho >= 1) {
    if (tamanho <= 100000) {
      let senha = formarSenha(tamanho);
      exibirNaTela(senha);
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

    senhaSegura = verificador(senha);

  } while (senhaSegura == false);

  return senha;
}

const verificador = (senha) => {
  // Garantia de que irá ter ao menos um caractere de cada tipo, proporcionando uma senha mais segura //

  let tamanho = senha.length;
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
    if (
      quantDigitos >= numNecessario && quantLetrasMin >= numNecessario && quantLetrasMai >= numNecessario && quantChar >= numNecessario)
      return true;
  }
  return false;
}

const exibirNaTela = (senha) => {
  let senhaDisplay = "";

  if (senha.length > 10) {
    // Se a senha tem mais de 10 caracteres só são mostrados os primeiros 10 caracteres
    for (var i = 0; i < 10; i++) {
      senhaDisplay += senha[i];
    }
    senhaDisplay += " (...)"
  }
  else {
    senhaDisplay = senha;
  }

  senhaDisplay = ajustarSenha(senhaDisplay);

  document.getElementById("div-resultado").innerHTML = '<h2 id="resultado" class="resultado">' + senhaDisplay +
    '</h2><button id="btn-copy" onclick="copiar()"><img src="img/copy.svg" alt="copiar"></button>'
  document.getElementById("resultado").value = senha;

}

const ajustarSenha = (senha) => {

  for (i in senha) {
    if (senha.includes("<")) {
      senha = senha.replace("<", "&#60;");
    }
    else
      break;
  }

  return senha;

}


async function copiar() {
  try {
    let senha = document.getElementById("resultado").value;
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