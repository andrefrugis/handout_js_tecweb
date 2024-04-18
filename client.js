const axios = require("axios");

async function get_token(){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "andref9" }, config)
        .then((response) => response.data.accessToken);
}


async function get_exercises(token){
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config2)
        .then((response) => response)
}

async function main(){
    let token = await get_token();
    let exercises = await get_exercises(token);
    

    const data = exercises.data;
    console.log(data);
    let i = 0;
    for (let dic in data) {
        let resposta;  // Definida fora dos blocos if para ter escopo no nível do loop
        const config2 = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
    
        if (data[dic].titulo === "Soma valores") {
            i ++;
            let {a, b} = data[dic].entrada;
            resposta = Number(a) + Number(b);
        } else if (data[dic].titulo === "Tamanho da string") {
            i ++;       
            let { string } = data[dic].entrada;  // Assumindo que a estrutura é similar a dos outros
            resposta = string.length;
        } else if (data[dic].titulo === "Nome do usuário") {
            i ++;
            let { email } = data[dic].entrada;  // Estrutura correta para desestruturação
            resposta = email.split("@")[0];
        } else if (data[dic].titulo === "Jaca Wars!") {
            i ++;
            let {vel, theta } = data[dic].entrada;
            distancia = (vel ** 2) * Math.sin(2 * theta) / 9.8;
            if (distancia >= 98 || distancia <= 102){
                resposta = 0;
            }
            else if (distancia < 98){
                resposta = -1;
            }
            else{
                resposta = 1;
            }
        } else if (data[dic].titulo === "Ano bissexto") {
            i ++;
            let {ano} = data[dic].entrada;    
            if (ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0){
                resposta = true;
            }
            else{
                resposta = false;
            }
        } else if (data[dic].titulo === "Volume da PIZZA!") {
            i ++;
            let raio = data[dic].entrada.z;
            let altura = data[dic].entrada.a;
            resposta = Math.round(Math.PI * raio ** 2 * altura);
            console.log(resposta);
        } else if (data[dic].titulo === "Movimento retilíneo uniforme") {
            i ++;
            let {s0, v, t} = data[dic].entrada;
            resposta = s0 + v * t;
        } else if (data[dic].titulo === "Inverta a string") {
            i ++;
            let {string} = data[dic].entrada;
            resposta = string.split("").reverse().join("");
        } else if (data[dic].titulo === "Soma os valores guardados no objeto") {
            i ++;
            let objeto = data[dic].entrada.objeto;  // Acessa o objeto correto
            let valores = Object.values(objeto);  // Obtém os valores do objeto
            resposta = valores.reduce((acc, curr) => acc + curr, 0);
        } else if (data[dic].titulo === "Encontra o n-ésimo número primo") {
            i ++;
            let n = data[dic].entrada.n;
            let primos = [];
            let j = 2;
            while (primos.length < n){
                let primo = true;
                for (let k = 2; k < j; k++){
                    if (j % k == 0){
                        primo = false;
                        break;
                    }
                }
                if (primo){
                    primos.push(j);
                }
                j++;
            }
            resposta = primos[n - 1];
        } else if (data[dic].titulo === 'Maior prefixo comum') {
            i ++;
            let {strings} = data[dic].entrada; // Supondo que é um array de strings
            if (strings.length === 0) {
                resposta = '';
            } else {
                resposta = strings[0]; // Inicializa a resposta com a primeira string
        
                for (let str of strings) {
                    let j = 0;
                    while (j < resposta.length && j < str.length && resposta[j] === str[j]) {
                        j++;
                    }
                    resposta = resposta.substring(0, j); // Atualiza a resposta com o prefixo comum
        
                    if (resposta === '') {
                        break; // Se não houver prefixo comum, interrompe o loop
                    }
                }
            }
        } else if (data[dic].titulo === 'Soma do segundo maior e menor números') {
            i ++;
            let {numeros} = data[dic].entrada; // Supondo que é um array de números
            let numerosOrdenados = numeros.sort((a, b) => a - b); // Ordena os números
            resposta = numerosOrdenados[1] + numerosOrdenados[numerosOrdenados.length - 2]; // Soma o segundo maior e o segundo menor
        } else if (data[dic].titulo === 'Conta palíndromos') {
            i++;
            let { palavras } = data[dic].entrada;
            if (palavras) { // Verifica se palavras é definido
                let palindromos = palavras.filter(palavra => 
                    palavra === palavra.split("").reverse().join(""));
                resposta = palindromos.length;
            } else {
                resposta = 0; // Se palavras não está definido, define resposta como 0
            }
        } else if (data[dic].titulo === 'Soma de strings de ints') {
            i++;
            let { strings } = data[dic].entrada;
            resposta = strings.reduce((acc, curr) => acc + Number(curr), 0);
        } else if (data[dic].titulo === 'Soma com requisições') {
            let endpoints = data[dic].entrada.endpoints;
            let soma = 0;
            i++;
            // Utilizando Promise.all para lidar com várias promessas de requisição
            Promise.all(endpoints.map(url => axios.get(url, config2)))
                .then(responses => {
                    // Somando os valores obtidos de cada endpoint
                    for (let response of responses) {
                        soma += response.data; // Assumindo que cada endpoint retorna diretamente um número
                    }
                })
            resposta = soma;
        }
        else if (data[dic].titulo === 'Caça ao tesouro') {
            i++;
            let inicio = data[dic].entrada.inicio;
            async function buscaTesouro(url){
                let response = await axios.get(url, config2);
                if ( typeof response.data === "number"){
                    return response.data;
                }
                else {
                    return await buscaTesouro(response.data)
                }
            }
            resposta = await buscaTesouro(inicio);
        }
        
        
        // Verifique se a resposta foi definida antes de fazer a requisição POST
        if (resposta !== undefined) {
            axios.post(`https://tecweb-js.insper-comp.com.br/exercicio/${dic}`, {"resposta": resposta}, config2)
                  .then((response) => console.log(response.data));
        }
    }
    console.log(i);    
}

main(
);
