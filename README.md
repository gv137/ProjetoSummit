# Sistema de Registro de Problemas Urbanos via QR Code

Este projeto consiste em um sistema web para registro de problemas urbanos pelos cidadãos através de QR Codes espalhados pela cidade. Os registros são enviados diretamente para uma planilha Google Sheets da prefeitura.

## Estrutura do Projeto

```
problemas-publicos/
├── css/
│   └── style.css           # Estilos do formulário e interface
├── js/
│   └── script.js           # Validação e envio de dados
├── img/                    # Pasta para imagens (adicione o logo da prefeitura aqui)
├── index.html              # Formulário de registro de problemas
└── google_apps_script.gs   # Código para o Google Apps Script
```

## Funcionalidades

1. **Formulário de Registro de Problemas**
   - Campos para nome e contato do cidadão (opcionais)
   - Campo para localização do problema (com opção de usar GPS)
   - Seleção do tipo de problema (buraco, vazamento, etc.)
   - Campo para descrição detalhada
   - Upload de foto do problema (opcional)
   - Identificação automática do QR Code escaneado

2. **Integração com Google Sheets**
   - Armazenamento dos registros em planilha
   - Interface administrativa para gerenciamento dos problemas
   - Atualização de status e observações

3. **Recursos Adicionais**
   - Design responsivo para dispositivos móveis
   - Validação de dados antes do envio
   - Suporte a geolocalização
   - Pré-visualização de fotos

## Instruções de Configuração

### 1. Configuração da Planilha Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha
2. Renomeie a primeira aba para "Problemas Urbanos"
3. Adicione os seguintes cabeçalhos na primeira linha:
   - Timestamp
   - Nome do Cidadão
   - Contato
   - Localização
   - Tipo de Problema
   - Outro Problema
   - Descrição
   - ID do QR Code
   - Tem Foto
   - Status
   - Observações Admin

### 2. Configuração do Google Apps Script

1. Na sua planilha, vá em "Extensões" > "Apps Script"
2. Apague qualquer código existente e cole o conteúdo do arquivo `google_apps_script.gs`
3. Salve o projeto com um nome relevante (ex: "Sistema de Problemas Urbanos")
4. Execute a função `initialSetup` uma vez para configurar o ID da planilha:
   - Selecione a função no menu suspenso próximo ao botão de execução
   - Clique no botão de execução (ícone de play)
   - Autorize as permissões solicitadas
5. Implante o script como aplicativo da web:
   - Clique em "Implantar" > "Nova implantação"
   - Selecione o tipo "Aplicativo da web"
   - Descrição: "Sistema de Problemas Urbanos"
   - Execute como: "Eu" (sua conta)
   - Quem tem acesso: "Qualquer pessoa" (importante para permitir o envio de dados)
   - Clique em "Implantar"
6. Copie a URL do aplicativo da web gerada

### 3. Configuração do Formulário Web

1. Edite o arquivo `js/script.js`
2. Localize a linha com `const scriptURL = "https://script.google.com/macros/s/SEU_ID_DO_SCRIPT_AQUI/exec";`
3. Substitua `SEU_ID_DO_SCRIPT_AQUI` pela ID do seu script (parte da URL copiada no passo anterior)
4. Adicione o logo da prefeitura na pasta `img/` com o nome `logo-prefeitura.png`

### 4. Geração dos QR Codes

1. Para cada localização onde deseja colocar um QR Code, crie um identificador único (ex: "CENTRO-001", "BAIRRO-NORTE-002")
2. Gere QR Codes que apontem para a URL do seu formulário com o parâmetro `qr` contendo o identificador:
   ```
   https://seu-dominio.com/index.html?qr=CENTRO-001
   ```
3. Use um serviço online de geração de QR Codes como [QR Code Generator](https://www.qr-code-generator.com/) ou [QRCode Monkey](https://www.qrcode-monkey.com/)
4. Imprima os QR Codes e coloque-os em locais estratégicos pela cidade

## Hospedagem

Para disponibilizar o sistema online, você pode:

1. **Hospedagem Simples**:
   - Faça upload dos arquivos para qualquer serviço de hospedagem web
   - Certifique-se de que o domínio seja HTTPS para permitir acesso à câmera e GPS

2. **GitHub Pages**:
   - Crie um repositório no GitHub
   - Faça upload dos arquivos
   - Ative o GitHub Pages nas configurações do repositório

3. **Google Cloud Storage**:
   - Crie um bucket no Google Cloud Storage
   - Configure-o para hospedagem de site estático
   - Faça upload dos arquivos

## Uso do Sistema

### Para Cidadãos:

1. Escanear o QR Code com qualquer aplicativo de câmera
2. Preencher o formulário com os detalhes do problema
3. Opcionalmente, adicionar uma foto e usar GPS para localização precisa
4. Enviar o registro

### Para Administradores (Prefeitura):

1. Acessar a planilha Google Sheets para ver todos os registros
2. Atualizar o status dos problemas diretamente na planilha
3. Adicionar observações sobre as ações tomadas
4. Opcionalmente, acessar a interface administrativa via URL do Apps Script

## Considerações de Segurança

- O sistema usa autenticação simples para a interface administrativa
- As fotos são enviadas como base64 e armazenadas na planilha
- Para maior segurança, considere implementar um sistema de autenticação mais robusto
- Revise periodicamente as permissões do Google Apps Script

## Suporte e Manutenção

Para manutenção futura:

1. **Atualização de Tipos de Problemas**:
   - Edite o arquivo `index.html` para adicionar ou remover opções no select `tipo-problema`

2. **Alteração de Campos**:
   - Modifique o HTML e o script do Google Apps Script para adicionar ou remover campos

3. **Backup de Dados**:
   - Exporte periodicamente a planilha Google Sheets para CSV ou Excel

---


