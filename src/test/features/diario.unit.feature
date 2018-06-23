Feature: Retornar as últimas edições do DIO

Essa funcionalidade tem como objetivo retornar as seguintes informações das
últimas edição do diário da impressa oficial do Espírito Santo:
i) data da publicação, ii) descrição e iii) url da edição

Scenario: Retonar as última edições do DIO
Given Eu sou um usuário
When  Eu quero saber as últimas noticias do DIO
Then  O sistema retorna as últimas noticias do DIO

Scenario: O DIO não está funcionando 
Given Eu sou um usuário
But   O diário está fora do ar
When  Eu quero saber as últimas noticias do DIO
Then  O sistema informar uma mensagem de error