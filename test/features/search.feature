#language: pt

Funcionalidade: search
busca uma noticia em uma data especifica
Cenário:  existem noticia na data informada
Dado que a data é '11/09/2018'
Quando o usuario pesquisar
Então retorna as noticias

Cenário:  não existem noticia na data informada
Dado que a data é '11/09/1500'
Quando o usuario pesquisar
Então retorna vazio

Cenário:  data incorreta
Dado que a data é '1500/11/09'
Quando o usuario pesquisar
Então retorna um erro de data