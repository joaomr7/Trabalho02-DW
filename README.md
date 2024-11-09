# Trabalho 02 - React
## Integrantes
- Bernardo Estevam Krzyuy
- João Marcos Ressetti

## Introdução
Neste trabalho, desenvolvemos uma aplicação ReactJS para a API REST desenvolvida no Trabalho 01.
Fizemos, no entanto, algumas alteracoes no código original:
- Jogador
    - Adicionamos o atributo "time", para que possamos agrupar jogadores de um mesmo time
- Pagamento
   - Substituimos os atributos "ano" e "mes" pelo atributo "data" a fim de granular os dados de um pagamento
- Funcionalidades adicionais
    - Cálculo do número total de jogadores 
    - Cálculo do número total de pagamentos 
    - Cálculo do valor total de pagamentos realizados 
    
## Descrição da Aplicação
**URL:** http://localhost:5173/

### Caminho "/"
Visualização dos pagamentos

Busca por pagamento através do nome do jogador associado e/ou data realizada

Modal para cadastro de novo pagamento, edição ou remoção de pagamento existente

### Caminho "/jogadores"
Visualização dos jogadores

Busca por jogador através do nome e/ou time que ele faz parte

Modal para cadastro de novo jogador, edição ou remoção de jogador existente

### Presente em ambos os caminhos
Barra de navegação, para facilitar a navegação entre as telas

KPIS - número total de jogadores e pagamentos, valor total dos pagamentos