/* =========================================================
   SCRIPT GERAL DO SITE
   Funciona nas 3 páginas (index, sobre-mim, inscricao),
   por isso cada bloco checa se os elementos existem
   antes de manipulá-los.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    inicializarCalculadora();
    inicializarMascaraTelefone();
    inicializarValidacaoAltura();
    inicializarValidacaoPeso();
    inicializarContadorVagas();
});

/* ---------------------------------------------------------
   1. CALCULADORA DE IMC E ÁGUA (página Inscrição)
   --------------------------------------------------------- */
function inicializarCalculadora() {
    const form = document.querySelector('#form-inscricao');
    const nomeInput = document.querySelector('#nome');
    const alturaInput = document.querySelector('#altura');
    const pesoInput = document.querySelector('#peso');
    const resultado = document.querySelector('#resultado-imc');

    if (!form || !alturaInput || !pesoInput || !resultado) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        processarDados(nomeInput, alturaInput, pesoInput, resultado);
    });
}

function processarDados(nomeInput, alturaInput, pesoInput, resultado) {
    const nome = (nomeInput && nomeInput.value.trim()) || 'Visitante';
    const vAltura = parseFloat(String(alturaInput.value).replace(',', '.'));
    const vPeso = parseFloat(String(pesoInput.value).replace(',', '.'));

    resultado.classList.add('visivel');

    if (vAltura > 0 && vPeso > 0) {
        const imc = (vPeso / (vAltura * vAltura)).toFixed(2);
        let classificacao = '';
        let cor = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            cor = '#ecdd53';
        } else if (imc <= 24.9) {
            classificacao = 'Peso Normal';
            cor = '#4caf50';
        } else if (imc <= 29.9) {
            classificacao = 'Sobrepeso';
            cor = '#ff9800';
        } else {
            classificacao = 'Obesidade';
            cor = '#eb766d';
        }

        // Cálculo simplificado: 35ml de água por kg de peso corporal
        const qtdAgua = (vPeso * 35) / 1000;

        resultado.innerHTML = `
            <h3>CALCULADORA DA SAÚDE</h3>
            <p><strong>${escaparTexto(nome)}</strong> algumas informações para você:</p>
            <p>Seu IMC é
                <span style="color: ${cor}; font-weight: 900; text-shadow: 1px 1px 2px black, 0 0 10px ${cor};">
                    ${imc} (${classificacao})
                </span>
            </p>
            <p>Beba pelo menos <strong>${qtdAgua.toFixed(1)}L</strong> de água por dia.</p>
        `;
    } else {
        resultado.innerHTML = `<h3>Por favor, preencha peso e altura corretamente.</h3>`;
    }
}

// Pequena proteção contra injeção de HTML via campo de nome
function escaparTexto(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

/* ---------------------------------------------------------
   2. MÁSCARA DE TELEFONE
   --------------------------------------------------------- */
function inicializarMascaraTelefone() {
    const telInput = document.querySelector('#telefone');
    if (!telInput) return;

    telInput.addEventListener('input', (event) => {
        let valor = event.target.value;

        valor = valor.replace(/\D/g, '');       // remove tudo que não é número
        valor = valor.slice(0, 11);             // limita a 11 dígitos (DDD + número)
        valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

        event.target.value = valor;
    });
}

/* ---------------------------------------------------------
   3. VALIDAÇÃO DE ALTURA
   --------------------------------------------------------- */
function inicializarValidacaoAltura() {
    const altura = document.querySelector('#altura');
    if (!altura) return;

    altura.addEventListener('blur', () => {
        const valor = parseFloat(String(altura.value).replace(',', '.'));

        if (valor > 2.5 || valor < 0.5) {
            altura.classList.add('campo-erro', 'shake');
            altura.setCustomValidity('Insira uma altura válida em metros (ex: 1.75).');
            altura.reportValidity();
        } else {
            altura.classList.remove('campo-erro', 'shake');
            altura.setCustomValidity('');
        }
    });
}

/* ---------------------------------------------------------
   4. VALIDAÇÃO DE PESO
   --------------------------------------------------------- */
function inicializarValidacaoPeso() {
    const peso = document.querySelector('#peso');
    const erroPeso = document.querySelector('#erro-peso');
    if (!peso) return;

    peso.addEventListener('blur', () => {
        const valor = parseFloat(String(peso.value).replace(',', '.'));
        const invalido = isNaN(valor) || valor > 500 || valor < 1;

        if (invalido) {
            peso.classList.add('campo-erro', 'shake');
            peso.setCustomValidity('O peso parece incorreto.');
            peso.reportValidity();
            if (erroPeso) erroPeso.style.display = 'block';
        } else {
            peso.classList.remove('campo-erro', 'shake');
            peso.setCustomValidity('');
            if (erroPeso) erroPeso.style.display = 'none';
        }
    });
}

/* ---------------------------------------------------------
   5. CONTADOR DE VAGAS (página Sobre Mim)
   --------------------------------------------------------- */
function inicializarContadorVagas() {
    const spanVagas = document.querySelector('#numero-vagas');
    if (!spanVagas) return;

    const vagasRestantes = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    spanVagas.textContent = vagasRestantes;
}








