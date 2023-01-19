const clock = document.getElementById('horas');
const initClock = document.getElementById('initClock');
const resetClock = document.getElementById('resetClock');
const stopClock = document.getElementById('stopClock');

let segundos = 0;
let minutos = 0;
let horas = 0;
let timer = 0;
let timerAtual = 0;

function criaHoras(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    })
}

initClock.addEventListener('click', (event) => {
    event.preventDefault();
    clockInit();
})

stopClock.addEventListener('click', (event) => {
    event.preventDefault();
    clockStop()
})

resetClock.addEventListener('click', (event) => {
    event.preventDefault();
    clockReset();
})

function clockAtual() {
    const clock = document.getElementById('horas');
    clearInterval(timer);
    segundos = 0;
    clock.innerText = '00:00:00';

    stopClock.classList.add('disabled');

    timerAtual = setInterval(() => {
        let horaAtual = new Date();
        let hora = formatMinutes(horaAtual.getHours());
        let min = formatMinutes(horaAtual.getMinutes());
        let seconds = formatMinutes(horaAtual.getSeconds());

        const hourMounted = `${hora}:${min}:${seconds}`;

        clock.innerText = hourMounted;

    }, 1000)
}

function clockInit() {

    stopClock.classList.remove('disabled')
    clearInterval(timerAtual)
    console.log('TIMER ATUAL',timerAtual);

    if(timerAtual !== 0) {

        clearInterval(timerAtual);  
        timer = setInterval(() => {
            segundos++;
            clock.innerText = criaHoras(segundos)
        }, 1000)      

    } else {

        timer = setInterval(() => {
            segundos++;
            clock.innerText = criaHoras(segundos)
        }, 1000)
    }

}

function clockStop() {
    if(segundos !== 0 && stopClock.innerText === 'Parar') {
        clearInterval(timer);
        stopClock.innerText = 'Retomar'

    } else if(segundos !== 0 && stopClock.innerText === 'Retomar'){
        clearInterval(timer);
        stopClock.innerText = 'Parar'
        clockInit();

    } else {
        console.log('Você precisa iniciar o relógio');
    }
}

function clockReset() {
    clearInterval(timer);
    clearInterval(timerAtual);
    segundos = 0;
    clock.innerText = '00:00:00'
}


function formatDataAtual() {
    const elementDate = document.getElementById('dataAtual');

    let dateAtual = new Date();

    let dia = dateAtual.getDate();
    let mes = dateAtual.getMonth();
    let ano = dateAtual.getFullYear();

    switch (mes) {
        case 0:
            mes = 'Jan'
            break;
        case 1:
            mes = 'Fev'
            break;
        case 2:
            mes = 'Mar'
            break;
        case 3:
            mes = 'Abr'
            break;
        case 4:
            mes = 'Mai'
            break;
        case 5:
            mes = 'Jun'
            break;
        case 6:
            mes = 'Jul'
            break;
        case 7:
            mes = 'Ago'
            break;
        case 8:
            mes = 'Set'
            break;
        case 9:
            mes = 'Out'
            break;
        case 10:
            mes = 'Nov'
            break;
        case 11:
            mes = 'Dez'
            break;
        default:
            break;
    }

    const resData = `${dia} ${mes} ${ano}`
    elementDate.innerText = resData;
}

function formatMinutes(num) {
    return num >= 10 ? num : `0${num}`
}