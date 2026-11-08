let estadoPokedex = {
    digitando: false,
}

let numPokemon = '';
let pokemonAtual = 1;

const key1 = document.querySelector('#key-1');
const key2 = document.querySelector('#key-2');
const key3 = document.querySelector('#key-3');
const key4 = document.querySelector('#key-4');
const key5 = document.querySelector('#key-5');
const key6 = document.querySelector('#key-6');
const key7 = document.querySelector('#key-7');
const key8 = document.querySelector('#key-8');
const key9 = document.querySelector('#key-9');
const key10 = document.querySelector('#key-10');
const btnWhiteLeft = document.querySelector('#btn-white-left');
const btnWhiteRight = document.querySelector('#btn-white-right');
const infoScreen = document.querySelector('#info-screen');
const mainScreen = document.querySelector('#main-screen');
const btnUp = document.querySelector('#btn-up');
const btnDown = document.querySelector('#btn-down');
const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');
const displayLeft = document.querySelector('#small-display-left');
const displayRight = document.querySelector('#small-display-right');
const numberDisplay = document.querySelector('#number-display');

key1.addEventListener('click', () => leituraTeclado('1'));
key2.addEventListener('click', () => leituraTeclado('2'));
key3.addEventListener('click', () => leituraTeclado('3'));
key4.addEventListener('click', () => leituraTeclado('4'));
key5.addEventListener('click', () => leituraTeclado('5'));
key6.addEventListener('click', () => leituraTeclado('6'));
key7.addEventListener('click', () => leituraTeclado('7'));
key8.addEventListener('click', () => leituraTeclado('8'));
key9.addEventListener('click', () => leituraTeclado('9'));
key10.addEventListener('click', () => leituraTeclado('0'));
btnWhiteLeft.addEventListener('click', buscarPokemon);
btnWhiteRight.addEventListener('click', apagar);
btnUp.addEventListener('click', () => mudarPokemon(-10));
btnDown.addEventListener('click', () => mudarPokemon(10));
btnLeft.addEventListener('click', () => mudarPokemon(-1));
btnRight.addEventListener('click', () => mudarPokemon(1));


function leituraTeclado(tecla)
{
    if(!estadoPokedex.digitando)
    {
        infoScreen.textContent = '';
        estadoPokedex.digitando = true;
    }
    numPokemon += tecla;
    infoScreen.textContent = numPokemon;
}

function apagar()
{
    if(estadoPokedex.digitando)
    {
        numPokemon = numPokemon.slice(0, -1);
        if(numPokemon.length < 1)
        {
            estadoPokedex.digitando = false;
            infoScreen.textContent = 'Aguardando dados…';
        }
        else
        {
            infoScreen.textContent = numPokemon;
        }
    }
}

async function consultarApi(msg)
{
    try
    {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${msg}`);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        const data = await response.json();
        const respostaEspecie = await fetch(data.species.url);
        const especie = await respostaEspecie.json();
        console.log(especie.generation.name);
        const regioes = {
            'generation-i': 'Kanto',
            'generation-ii': 'Johto',
            'generation-iii': 'Hoenn',
            'generation-iv': 'Sinnoh',
            'generation-v': 'Unova',
            'generation-vi': 'Kalos',
            'generation-vii': 'Alola',
            'generation-viii': 'Galar',
            'generation-ix': 'Paldea'
        };
        const regiao = regioes[especie.generation.name];
        const tipos = data.types.map(item => item.type.name).join(', ');
        const peso = data.weight / 10;
        const altura = data.height / 10;
        displayLeft.textContent = `Peso: ${peso} kg`;
        displayRight.textContent = `Altura: ${altura} m`;
        infoScreen.textContent = `Tipo: ${tipos} | Peso: ${peso} kg | Altura: ${altura} m | Região: ${regiao}`;
        console.log(data);
        const urlImage = data.sprites.front_default;
        exibirSprite(urlImage);
    }
    catch(erro)
    {
        alert(erro.message);  
    }
}

function buscarPokemon() {
    if (!estadoPokedex.digitando || numPokemon === '') {
        alert('Digite o número de um Pokémon!');
        return;
    }

    pokemonAtual = Number(numPokemon);
    numberDisplay.textContent = `#${String(pokemonAtual).padStart(3, '0')}`;
    consultarApi(pokemonAtual);
}

function mudarPokemon(valor) {
    pokemonAtual += valor;
    numberDisplay.textContent = `#${String(pokemonAtual).padStart(3, '0')}`;
    consultarApi(pokemonAtual);
}
function exibirSprite(urlImage,)
{
    mainScreen.textContent = '';
    const img = document.createElement('img');
    img.src = urlImage;
    img.style.width = '15rem';
    img.style.transform = 'translate(0, -40px)'
    mainScreen.appendChild(img);
}