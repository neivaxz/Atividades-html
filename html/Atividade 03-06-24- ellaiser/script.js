(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_carros')) ?? [];
}

function setLocalStorage(bd_carros) {
  localStorage.setItem('bd_carros', JSON.stringify(bd_carros));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { 
  limparTabela();
  const bd_carros = getLocalStorage();
  let index = 0;
  for (const carro of bd_carros) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${carro.marca}</td>
        <td>${carro.modelo}</td>
        <td>${carro.cor}</td>
        <td>${carro.chassi}</td>
        <td>${carro.placa}</td>
        <td>${carro.ano}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { 
  const carros = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    cor: document.getElementById('cor').value,
    chassi: document.getElementById('chassi').value,
    placa: document.getElementById('placa').value,
    ano: document.getElementById('ano').value,
  }
  const bd_carros = getLocalStorage();
  bd_carros.push(carros);
  setLocalStorage(bd_carros);
  atualizarTabela();
}

function excluir(index) { 
  const bd_carros = getLocalStorage();
  bd_carros.splice(index, 1);
  setLocalStorage(bd_carros);
  atualizarTabela();
}

function validarSerial() { 
  const bd_carros = getLocalStorage();
  const chassi = document.getElementById("chassi");
  const feedbackChassi = document.getElementById("feedbackChassi");
  
  for (const carro of bd_carros) {
    if (chassi.value === carro.chassi) {
      chassi.setCustomValidity("Este chassi já existe!");
      feedbackChassi.innerText = "Este chassi já existe!";
      return false;
    } else {
      chassi.setCustomValidity("");
      feedbackChassi.innerText = "Informe o chassi corretamente.";
    }
  }
  return true;
}
atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada
const chassi = document.getElementById("chassi");
const feedbackChassi = document.getElementById("feedbackChassi");
chassi.addEventListener('input', validarChassi);


