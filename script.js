document.getElementById('form-cartao').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const numeroCartao = document.getElementById('numero-cartao').value;
    const dataValidade = document.getElementById('data-validade').value;
    const codigoSeguranca = document.getElementById('codigo-seguranca').value;
    
    const resultado = validarCartao(numeroCartao, dataValidade, codigoSeguranca);
    
    if (resultado.numeroValido && resultado.dataValida && resultado.codigoValido) {
        alert(`Os dados inseridos são válidos.\nBandeira do Cartão: ${resultado.bandeira}`);
    } else {
        alert('Os dados inseridos são inválidos.');
    }
});

function validarCartao(creditCardNumber, expirationDate, securityCode) {
    // Função para validar o número do cartão de crédito
    function validarNumeroCartao(numero) {
        const regex = /^[0-9]{16}$/;
        return regex.test(numero);
    }

    // Função para identificar a bandeira do cartão
    function identificarBandeira(numero) {
        const bandeiras = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
            enroute: /^(2014|2149)\d{11}$/,
            voyager: /^8699[0-9]{11}$/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
            aura: /^50[0-9]{14,17}$/
        };

        for (const [bandeira, regex] of Object.entries(bandeiras)) {
            if (regex.test(numero)) {
                return bandeira;
            }
        }

        return 'desconhecida';
    }

    // Função para validar a data de validade
    function validarDataValidade(data) {
        const regex = /^(0[1-9]|1[0-2])\/(26|27|28)$/;
        return regex.test(data);
    }

    // Função para validar o código de segurança
    function validarCodigoSeguranca(codigo) {
        const regex = /^[0-9]{3}$/;
        return regex.test(codigo);
    }

    const numeroValido = validarNumeroCartao(creditCardNumber);
    const bandeira = identificarBandeira(creditCardNumber);
    const dataValida = validarDataValidade(expirationDate);
    const codigoValido = validarCodigoSeguranca(securityCode);

    return {
        numeroValido,
        bandeira,
        dataValida,
        codigoValido
    };
}