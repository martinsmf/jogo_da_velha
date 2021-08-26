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