# SendEmail
Web Api para envio de emails.

**OBS**: Em desenvolvimento.

##Arquitetura.

Utilizado paradigma funcional para criação do factory do email - (se encontra na pasta infra).

##Tecnologias Utilizadas

1. Nodejs.
2. Hapijs.
3. Consign.
4. SendGrid.

##Exemplo de utilização.

Passos para consumir o exemplo na pasta routes.

1. Clonar o repositorio.
2. Npm init.
3. Criar uma conta no [SendGrid](https://sendgrid.com/)
    1.  Criar um Token da sua Conta dentro do SendGrid.
    *  Opcional: Criar um Templated dentro do SendGrid.
4. Subistituir as informações do exemplo.
5. Execultar a aplicação conforme o exemplo abaixo (no terminal).
> sgToken="seu token criado no senGrid" node server.

**OBS** Se precisar de ajuda ou duvidas abrir uma issue.









