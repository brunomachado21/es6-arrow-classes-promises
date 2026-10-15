/* ==========================================================================
   ATIVIDADE PRÁTICA: ECMASCRIPT 6 (PARTE 3)
   Tópicos: Arrow Functions, Rest/Spread, Destructuring, Classes e Promises
   Referência: "ECMAScript 6 - Entre de cabeça no futuro do JavaScript"
   ========================================================================== */

// --------------------------------------------------------------------------
// Exercício 1 - Hora de usar as setas
// --------------------------------------------------------------------------
let carrinho = [
  { nome: 'abacaxi', preco: '2.00' },
  { nome: 'detergente', preco: '2.50' },
  { nome: 'bolacha', preco: '3.80' }
];

// refatorado para arrow function e interpolacao com template string
const imprimeProduto = (nome, preco) => {
  console.log(`Produto: ${nome} | Preço: ${preco}`);
};

carrinho.forEach(produto => imprimeProduto(produto.nome, produto.preco));


// --------------------------------------------------------------------------
// Exercício 2 - Vou lavar sua boca com sabão!
// --------------------------------------------------------------------------
let palavroes = [
  "Inconstitucionalíssimo",
  "Otorrinolaringologista",
  "Pneumoultramicroscopicossilicovulcanoconiose",
  "Oftalmotorrinolaringologista"
];

// arrow function reduzida em uma linha so com retorno implicito
let tamanhos = palavroes.map(palavrao => palavrao.length);

console.log(tamanhos); // [ 22, 22, 44, 28 ]


// --------------------------------------------------------------------------
// Exercício 3 - Não são só umas reticências?
// --------------------------------------------------------------------------
/*
RESPOSTA:
A diferenca basica entre os dois operadores e o objetivo de juntar ou espalhar:

- Operador Rest (...): serve para pegar varios argumentos soltos passados numa
  funcao e juntar tudo dentro de um unico array. Ele agrupa dados.
  
- Operador Spread (...): faz o oposto. Pega um array ou objeto iteravel que ja
  esta montado e "espalha" seus elementos de forma individual onde sao esperados.
*/

// Exemplo pratico:
function exemploRest(...itens) {
  return itens; // junta itens soltos num array
}

const arrayBase = [1, 2];
const exemploSpread = [...arrayBase, 3, 4]; // espalha os elementos: [1, 2, 3, 4]


// --------------------------------------------------------------------------
// Exercício 4 - A união faz a força
// --------------------------------------------------------------------------
const equipeMarketing = ['Joana', 'Marcela', 'Bruna'];
const equipeComercial = ['Talita', 'Luisa', 'Vitória'];

// substituindo o concat pelo spread para juntar as duas listas
const timeCompleto = [...equipeMarketing, ...equipeComercial];

function realizaBrainstorm(equipe) {
  console.log('Brainstorm com:', equipe.join(', '));
}

realizaBrainstorm(timeCompleto);


// --------------------------------------------------------------------------
// Exercício 5 - Pegando a propriedade na lata
// --------------------------------------------------------------------------
const usuario = {
  nome: 'Lucas',
  email: 'lucas@teste.com',
  idade: 25
};

// desestruturacao direta em uma linha pegando os campos do objeto
const { email, nome, idade } = usuario;

console.log(nome, email, idade);


// --------------------------------------------------------------------------
// Exercício 6 - Cara-Crachá
// --------------------------------------------------------------------------
const profissional = {
  titulo: 'Engenheiro de Software',
  departamento: 'Engenharia'
};

// desestruturacao aplicada direto na assinatura dos parametros
function isEngenheiro({ titulo, departamento }) {
  return titulo.indexOf("Engenheiro") > -1 && departamento === 'Engenharia';
}

console.log(isEngenheiro(profissional)); // true
profissional.titulo = 'Marketing';
console.log(isEngenheiro(profissional)); // false


// --------------------------------------------------------------------------
// Exercício 7 - O meu videogame é muito melhor que o seu
// --------------------------------------------------------------------------
class VideoGame {
  constructor(nome, controles, saida, midia) {
    this.nome = nome;
    this.controles = controles;
    this.saida = saida;
    this.midia = midia;
  }
}

// PlayStation herda de VideoGame usando extends e super
class PlayStation extends VideoGame {
  constructor(nome, controles, saida, midia, nEntradasUSB, voltagem, adicionais) {
    super(nome, controles, saida, midia);
    this.nEntradasUSB = nEntradasUSB;
    this.voltagem = voltagem;
    this.adicionais = adicionais;
  }
}

// instanciando o objeto conforme pedido no enunciado
const meuConsole = new PlayStation(
  'PS5',
  2,
  'HDMI',
  'Blu-ray Ultra HD',
  4,
  110,
  ['Controle sem fio', 'Headset']
);

console.log(meuConsole);


// --------------------------------------------------------------------------
// Exercício 8 - Você cumpre as suas promessas?
// --------------------------------------------------------------------------
function simulaPromise(sucesso) {
  const promessa = new Promise((resolve, reject) => {
    if (sucesso) {
      resolve('ok');
    } else {
      reject('not ok');
    }
  });

  promessa
    .then(resultado => console.log(resultado))
    .catch(erro => console.log(erro));
}

// Testes:
simulaPromise(true);  // ok
simulaPromise(false); // not ok


// --------------------------------------------------------------------------
// Exercício 9 - Você cumpre as suas promessas em tempo?
// --------------------------------------------------------------------------
function simulaPromiseComDelay(sucesso, delay) {
  const promessa = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (sucesso) {
        resolve('ok');
      } else {
        reject('not ok');
      }
    }, delay);
  });

  promessa
    .then(resultado => console.log(resultado))
    .catch(erro => console.log(erro));
}

// Testes com tempos diferentes:
simulaPromiseComDelay(true, 2000);  // ok (aparece depois)
simulaPromiseComDelay(false, 1000); // not ok (aparece primeiro)


// --------------------------------------------------------------------------
// Exercício 10 - Passando promessa de pai para filho
// --------------------------------------------------------------------------
/*
PROBLEMA:
No trecho original, o segundo .then exibe "undefined" porque o primeiro .then
apenas executa o console.log e nao retorna nada (retorno padrao undefined). 
Em promises encadeadas, o proximo .then recebe exatamente o que foi retornado 
pelo .then anterior.

SOLUCAO:
Basta adicionar a instrucao "return data;" no primeiro .then para repassar o
valor da variavel adiante.
*/

const promiseExemplo = Promise.resolve('dados carregados');

// Codigo corrigido:
promiseExemplo
  .then((data) => {
    console.log(`resultado positivo: ${data}`);
    return data; // repassa o dado pro proximo then
  })
  .then((data) => console.log(`resultado positivo 2: ${data}`))
  .catch((data) => console.log(`resultado negativo: ${data}`));