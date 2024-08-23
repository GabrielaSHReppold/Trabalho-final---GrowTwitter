//Para testes, criar pelo menos 3 usuários, 3 tweets, 3 likes e 3 replies.
import { Cadastro } from "./classes/Cadastro";
import { Tweet, TweetType } from "./classes/Tweet";

console.log("------------Iniciando os testes de cadastro de usuários-----------------");
console.log("");

const cadastro = new Cadastro();

// Criando alguns usuários
const airton = cadastro.createUser("Airton", "airton", "airton@example.com", "password123");
const marcia = cadastro.createUser("Marcia", "marcia", "marcia@example.com", "password123");
const nicoli = cadastro.createUser("Nicoli", "nicoli", "nicoli@example.com", "password123");

if (airton && marcia && nicoli) {
    console.log("Todos os usuários foram criados com sucesso.");
    console.log(`Usuário 1: ${airton.username}`);
    console.log(`Usuário 2: ${marcia.username}`);
    console.log(`Usuário 3: ${nicoli.username}`);
} else {
    console.log("Falha ao criar um ou mais usuários.");
}

const foundUser1 = cadastro.findUsername("airton");
if (foundUser1) {
    console.log(`Usuário encontrado: ${foundUser1.username}`);
} else {
    console.log("Usuário 'airton' não encontrado.");
}

const foundUser2 = cadastro.findUsername("marcia");
if (foundUser2) {
    console.log(`Usuário encontrado: ${foundUser2.username}`);
} else {
    console.log("Usuário 'marcia' não encontrado.");
}

const foundUser3 = cadastro.findUsername("nicoli");
if (foundUser3) {
    console.log(`Usuário encontrado: ${foundUser3.username}`);
} else {
    console.log("Usuário 'nicoli' não encontrado.");
}

// Tentando criar um usuário com o mesmo username "airton", o que deve falhar
const airtonDuplicado = cadastro.createUser("Airton Duplicado", "airton", "duplicado@example.com", "password123");

if (airtonDuplicado) {
    console.log("Erro: Um usuário duplicado foi criado, mas não deveria ter sido.");
} else {
    console.log("Sucesso: Ao criar um usuário com username duplicado deu erro conforme esperado.");
}

console.log ("")
console.log ("")

// Tweets de usuários
if (nicoli) {
    const tweetNicoli1 = nicoli.sendTweet("Estou muito feliz em participar desta rede tão fantástica!", "tweet");
    const replyNicoli1 = nicoli.sendTweet("Quero convencer meus pais a entrarem também!", "reply");

    console.log("Tweets da Nicoli foram criados com sucesso.");
}

if (airton && marcia && nicoli) {
    // Airton tweeta 
    const tweetAirton1 = airton.sendTweet("Estou ansioso para entrar no Twitter, ainda bem que aprendi!", "tweet");

    // Marcia responde ao tweet do Airton
    tweetAirton1.addReply(marcia, "Espero aprender muito por aqui!");

    // Marcia entra no Twitter
    const tweetMarcia1 = marcia.sendTweet("Espero saber muito disso aqui!", "tweet");

    // Nicoli curte os comentários de Airton e Marcia
    tweetAirton1.addLike(nicoli);
    tweetMarcia1.addLike(nicoli);

    // Marcia curte o comentário de Nicoli
    tweetAirton1.addLike(marcia);
    tweetMarcia1.addLike(marcia);

    // Exibindo os tweets e interações
    tweetAirton1.showTweet();
    tweetMarcia1.showTweet();

    // Nicoli responde ao tweet de Airton
    tweetAirton1.addReply(nicoli, "Pois é, mas tu viu que o Twitter provavelmente vai sair do Brasil né, por causa de toda treta?");

    // Marcia responde ao comentário da Nicoli
    const replyMarcia2 = new Tweet(marcia, "Sim eu vi", "reply");
    tweetAirton1.addReply(marcia, "Sim eu vi");

    // Airton responde 
    tweetAirton1.addReply(airton, "É tudo culpa do sistema corrupto do Brasil.");

    // Marcia sugere procurar outra plataforma
    const replyMarcia3 = new Tweet(marcia, "É só procurar por outra plataforma.", "reply");
    tweetAirton1.addReply(marcia, "É só procurar por outra plataforma.");

    // Nicoli e Airton curtem a resposta da Marcia
    tweetAirton1.addLike(nicoli);
    tweetAirton1.addLike(airton);

    // Airton descurte a resposta
    tweetAirton1.removeLike(airton);

    // Exibindo os tweets e interações
    tweetAirton1.showTweet();
    tweetMarcia1.showTweet();
}

