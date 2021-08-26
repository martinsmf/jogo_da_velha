'use strict'

let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelector('#buttons-container button');
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
            } else {
                player02++
            }

            checkWinCondition();
        }

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

    /* const horizontal = win['horizontal'];
    horizontal(b1, b2, b3); */

    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
        let b1child = b1.childNodes[0].className;
        let b2child = b2.childNodes[0].className;
        let b3child = b3.childNodes[0].className;

        if (b1child == 'x' && b2child == 'x' && b3child == 'x') {
            console.log('x venceu');

        } else if (b1child == 'o' && b2child == 'o' && b3child == 'o') {
            console.log('o venceu');
        }
    }
}

/* const win = {
    horizontal: (b1, b2, b3) => {

        let b1child = b1.childNodes[0].className;
        let b2child = b2.childNodes[0].className;
        let b3child = b3.childNodes[0].className;

        if (b1child == 'x' && b2child == 'x' && b3child == 'x') {
            console.log('x venceu');

        } else if (b1child == 'o' && b2child == 'o' && b3child == 'o') {
            console.log('o venceu');
        }
    }
} */