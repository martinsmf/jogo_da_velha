'use strict'

let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('#buttons-container button');
let messageContainer = document.getElementById('message');
let messageText = document.querySelector('#message p');
let secondPlayer;


// contador de jogadas
let player01 = 0;
let player02 = 0;

// adicionando o evento de click aos boxes
for (let i = 0; i < boxes.length; i++) {

    // quando alguém clica na caixa
    boxes[i].addEventListener('click', function () {

        let el = checkEl(player01, player02)

        if (this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);

            this.appendChild(cloneEl);

            // computar a jogada
            if (player01 == player02) {
                player01++;
                if (secondPlayer == 'ia-player') {
                    computerPlay();
                    player02++
                }
            } else {
                player02++;
            }

            checkWinCondition();
        }
    })
}


// event for know if is 2 players or IA
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        secondPlayer = this.getAttribute('id');
        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none';
        }
        setTimeout(function () {
            let container = document.getElementById('container')
            container.classList.remove('hide');
        }, 500)
    })
}

function checkEl(player01, player02) {
    let el;
    if (player01 == player02) {
        el = x;
    } else {
        el = o;
    }
    return el;
}


function checkWinCondition() {
    let b1 = document.getElementById('block-1');
    let b2 = document.getElementById('block-2');
    let b3 = document.getElementById('block-3');
    let b4 = document.getElementById('block-4');
    let b5 = document.getElementById('block-5');
    let b6 = document.getElementById('block-6');
    let b7 = document.getElementById('block-7');
    let b8 = document.getElementById('block-8');
    let b9 = document.getElementById('block-9');

    const winner = verifyWin['winner'];
    // horizontal
    winner(b1, b2, b3);
    winner(b4, b5, b6);
    winner(b7, b8, b9);

    // vertical
    winner(b1, b4, b7);
    winner(b2, b5, b8);
    winner(b3, b6, b9);

    // diagonal
    winner(b1, b5, b9);
    winner(b3, b5, b7);

    // given hash
    verifyWin.hash(boxes);
}

const verifyWin = {
    winner: (box1, box2, box3) => {

        if (box1.childNodes.length > 0 && box2.childNodes.length > 0 && box3.childNodes.length > 0) {
            let box1child = box1.childNodes[0].className;
            let box2child = box2.childNodes[0].className;
            let box3child = box3.childNodes[0].className;
            if (box1child == 'x' && box2child == 'x' && box3child == 'x') {
                verifyWin.declareWinner('x');
            } else if (box1child == 'o' && box2child == 'o' && box3child == 'o') {
                verifyWin.declareWinner('o');
            }
        }
    },
    hash: (boxes) => {
        let counter = 0;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].childNodes[0] != undefined) {
                counter++;
            }
        }
        if (counter == 9) {
            verifyWin.declareWinner('deu velha')
        }
    },
    declareWinner: (winner) => {
        let scoreboardX = document.querySelector('#scoreboard-1')
        let scoreboardO = document.querySelector('#scoreboard-2')
        let msg = '';

        if (winner == 'x') {
            scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
            msg = 'O jogador 1 venceu!'
        } else if (winner == 'o') {
            scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
            msg = 'O jogador 2 venceu!'
        } else {
            msg = 'Deu velha!'
        }

        messageText.innerHTML = msg;
        messageContainer.classList.remove('hide');
        setTimeout(function () {
            messageContainer.classList.add('hide')
        }, 3000)

        resetGame();
    }
}

function resetGame() {
    player01 = 0;
    player02 = 0;

    let boxesToRemove = document.querySelectorAll('.box div');

    for (let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}

function computerPlay() {
    let cloneO = o.cloneNode(true);
    let counter = 0;
    let filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        let randomNumber = Math.floor(Math.random() * 5);

        if (boxes[i].childNodes[0] == undefined) {
            if (randomNumber <= 1) {
                boxes[i].appendChild(cloneO)
                counter++;
                break;
            }
        } else {
            filled++;
        }

    }
}

if (counter == 0 && filled < 9) {
    computerPlay();
}