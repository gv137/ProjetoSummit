document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("problema-form");
    const tipoProblema = document.getElementById("tipo-problema");
    const outroProblemaContainer = document.getElementById("outro-problema-container");
    const outroProblema = document.getElementById("outro-problema");
    const btnGPS = document.getElementById("btn-gps");
    const localizacaoInput = document.getElementById("localizacao");
    const fotoInput = document.getElementById("foto-problema");
    const fotoPreview = document.getElementById("foto-preview");
    const qrCodeIdInput = document.getElementById("qr-code-id");
    const statusMessage = document.getElementById("mensagem-status");

    // URL do Google Apps Script que receberá os dados
    const scriptURL = "https://script.google.com/macros/s/AKfycbxsFWkR6yWiA6PQz2hEoF9fIvlZyb4esNNICXUjDcBPtwgnVpUJDBmU433ljz1W3gmb/exec"; // Substitua pelo ID do seu script publicado

    // Extrair o ID do QR Code da URL (se presente)
    function extrairQRCodeID() {
        const urlParams = new URLSearchParams(window.location.search);
        const qrId = urlParams.get('qr');
        if (qrId) {
            qrCodeIdInput.value = qrId;
        } else {
            qrCodeIdInput.value = "QR-DESCONHECIDO";
        }
    }

    // Mostrar/esconder campo "Outro problema" baseado na seleção
    tipoProblema.addEventListener("change", function() {
        if (this.value === "Outro") {
            outroProblemaContainer.style.display = "block";
            outroProblema.setAttribute("required", "");
        } else {
            outroProblemaContainer.style.display = "none";
            outroProblema.removeAttribute("required");
        }
    });

    // Usar geolocalização para preencher o campo de localização
    btnGPS.addEventListener("click", function() {
        if (navigator.geolocation) {
            btnGPS.textContent = "Obtendo localização...";
            btnGPS.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    localizacaoInput.value = `Latitude: ${lat}, Longitude: ${lng}`;
                    btnGPS.textContent = "Localização Obtida";
                    setTimeout(() => {
                        btnGPS.textContent = "Usar Minha Localização";
                        btnGPS.disabled = false;
                    }, 3000);
                },
                function(error) {
                    console.error("Erro ao obter localização:", error);
                    btnGPS.textContent = "Erro ao obter localização";
                    alert("Não foi possível obter sua localização. Por favor, digite o endereço manualmente.");
                    setTimeout(() => {
                        btnGPS.textContent = "Usar Minha Localização";
                        btnGPS.disabled = false;
                    }, 3000);
                }
            );
        } else {
            alert("Seu navegador não suporta geolocalização. Por favor, digite o endereço manualmente.");
        }
    });

    // Pré-visualização da foto
    fotoInput.addEventListener("change", function() {
        fotoPreview.innerHTML = "";
        const file = this.files[0];
        
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                alert("A imagem é muito grande. Por favor, escolha uma imagem menor que 5MB.");
                this.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                fotoPreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Validação e envio do formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Validação básica
        const localizacao = localizacaoInput.value.trim();
        const tipoProblemaSelecionado = tipoProblema.value;
        const descricao = document.getElementById("descricao").value.trim();

        if (!localizacao) {
            mostrarErro("Por favor, informe a localização do problema.");
            return;
        }

        if (!tipoProblemaSelecionado) {
            mostrarErro("Por favor, selecione o tipo de problema.");
            return;
        }

        if (tipoProblemaSelecionado === "Outro" && !outroProblema.value.trim()) {
            mostrarErro("Por favor, especifique o tipo de problema.");
            return;
        }

        if (!descricao) {
            mostrarErro("Por favor, forneça uma descrição detalhada do problema.");
            return;
        }

        // Se a validação passar, prepara para enviar
        mostrarStatus("Enviando registro...", false);
        
        // Desabilita o botão de envio para evitar múltiplos cliques
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;

        // Verificar se há uma URL de script configurada
        if (!scriptURL || scriptURL.includes("SEU_ID_DO_SCRIPT_AQUI")) {
            mostrarErro("Erro: URL do servidor não configurada. Por favor, contate o administrador.");
            submitButton.disabled = false;
            return;
        }

        // Preparar dados para envio
        const formData = new FormData(form);
        
        // Se tiver foto, converter para base64 para enviar via Google Apps Script
        if (fotoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Remover o prefixo "data:image/jpeg;base64," para economizar espaço
                const base64Image = e.target.result.split(',')[1];
                formData.append('foto_base64', base64Image);
                
                // Agora enviar os dados
                enviarDadosParaPlanilha(formData, submitButton);
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            // Se não tiver foto, enviar diretamente
            enviarDadosParaPlanilha(formData, submitButton);
        }
    });

    function enviarDadosParaPlanilha(formData, button) {
        // Converter FormData para objeto para envio via URL encoded
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Criar URL com parâmetros
        const url = new URL(scriptURL);
        Object.keys(data).forEach(key => {
            url.searchParams.append(key, data[key]);
        });
        
        // Enviar dados para o Google Apps Script
        fetch(url, { 
            method: "POST",
            mode: 'no-cors' // Necessário para scripts do Google
        })
        .then(() => {
            // Como estamos usando no-cors, não podemos acessar a resposta
            // Assumimos que foi bem-sucedido
            mostrarStatus("Registro enviado com sucesso! A prefeitura foi notificada sobre o problema.", true);
            form.reset();
            fotoPreview.innerHTML = "";
            extrairQRCodeID(); // Recarregar o ID do QR Code
        })
        .catch(error => {
            console.error("Erro no fetch:", error);
            mostrarErro("Erro de rede ao tentar enviar o registro: " + error.message);
        })
        .finally(() => {
            button.disabled = false;
        });
    }

    function mostrarErro(mensagem) {
        statusMessage.textContent = mensagem;
        statusMessage.className = "erro";
    }

    function mostrarStatus(mensagem, sucesso = true) {
        statusMessage.textContent = mensagem;
        statusMessage.className = sucesso ? "sucesso" : "";
    }

    // Inicializar a página
    extrairQRCodeID();
});
