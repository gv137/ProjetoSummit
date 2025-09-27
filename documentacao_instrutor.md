# Funcionalidade de Acesso do Instrutor

Esta documentação descreve a funcionalidade adicional de acesso do instrutor ao sistema de registro de problemas urbanos.

## Visão Geral

O sistema agora inclui uma área protegida por senha para instrutores visualizarem os problemas registrados pelos cidadãos. Esta funcionalidade permite:

1. Autenticação com senha específica ("Summit")
2. Visualização de todos os problemas registrados em formato de tabela
3. Visualização de fotos enviadas pelos cidadãos
4. Atualização dos dados em tempo real

## Arquivos Adicionados

1. `instrutor.html` - Página de login do instrutor
2. `visualizar.html` - Página de visualização dos problemas registrados

## Como Acessar

1. Acesse a página de login do instrutor: `https://seu-dominio.com/instrutor.html`
2. Digite a senha: `Summit`
3. Após autenticação bem-sucedida, você será redirecionado para a página de visualização

## Funcionalidades da Página de Visualização

- **Tabela de Problemas**: Exibe todos os problemas registrados com detalhes como data/hora, localização, tipo, descrição, etc.
- **Visualização de Fotos**: Clique em "Ver foto" para visualizar as imagens enviadas pelos cidadãos
- **Atualização de Dados**: Use o botão "Atualizar Dados" para carregar as informações mais recentes
- **Logout**: O botão "Sair" encerra a sessão e retorna à página de login

## Integração com Google Sheets

A página de visualização está configurada para buscar dados diretamente da planilha Google Sheets. Para que funcione corretamente:

1. Certifique-se de que o Google Apps Script esteja configurado e publicado
2. Atualize a URL do script no arquivo `visualizar.html` (linha 162):
   ```javascript
   const scriptURL = "https://script.google.com/macros/s/SEU_ID_DO_SCRIPT_AQUI/exec";
   ```

## Personalização

### Alterando a Senha

Para alterar a senha de acesso do instrutor:

1. Abra o arquivo `instrutor.html`
2. Localize a linha 58: `const INSTRUCTOR_PASSWORD = "Summit";`
3. Substitua "Summit" pela nova senha desejada

### Personalizando a Visualização

Para personalizar a aparência ou comportamento da página de visualização:

1. Edite o arquivo `visualizar.html`
2. Modifique os estilos CSS dentro da tag `<style>` para alterar cores, tamanhos, etc.
3. Ajuste o JavaScript para alterar o comportamento da página

## Considerações de Segurança

- A autenticação é baseada em senha simples armazenada no código JavaScript
- A sessão é mantida usando `sessionStorage`, que persiste apenas até o fechamento do navegador
- Para maior segurança em ambiente de produção, considere implementar um sistema de autenticação mais robusto

## Próximos Passos Sugeridos

- Implementar autenticação baseada em servidor
- Adicionar funcionalidade para editar o status dos problemas diretamente na interface
- Implementar filtros e busca na tabela de problemas
