'use strict';
const player = document.querySelector('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const playeractive = document.querySelector('.player--active');
const score = document.querySelector('.score');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current = document.querySelectorAll('.current-score');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const newgame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
dice.style.visibility = "hidden";
score0.textContent = "0";
score1.textContent = "0";
let sumcurrent0 = 0;
let sumcurrent1 = 0;
let sumscore0 = 0;
let sumscore1 = 0;
roll.addEventListener('click',function(){
    let num = Math.floor(Math.random()*6)+1;
    check(num);
});
function check(num){
    if(num === 1){
        dice.style.visibility = "visible";
        dice.src = "images/dice-1.png";
    }
    else if(num === 2){
        dice.style.visibility = "visible";
        dice.src = "images/dice-2.png";
    }
    else if(num === 3){
        dice.style.visibility = "visible";
        dice.src = "images/dice-3.png";
    }
    else if(num === 4){
        dice.style.visibility = "visible";
        dice.src = "images/dice-4.png";
    }
    else if(num === 5){
        dice.style.visibility = "visible";
        dice.src = "images/dice-5.png";
    }
    else if(num === 6){
        dice.style.visibility = "visible";
        dice.src = "images/dice-6.png";
    }
    if (player0.classList.contains('player--active')){
        sumcurrent0 += num;
        if(num !== 1){
            current0.textContent = sumcurrent0; 
        }
        else{
            sumcurrent0 = 0;
            current0.textContent = "0"; 
            player0.classList.remove('player--active');
            player1.classList.add('player--active');
        }
    }
    else{
        sumcurrent1 += num;
        if(num !== 1){
            current1.textContent = sumcurrent1; 
        }
        else{
            sumcurrent1 = 0;
            current1.textContent = "0"; 
            player1.classList.remove('player--active');
            player0.classList.add('player--active');
        }
    }
}
hold.addEventListener('click',function(){
    if(player0.classList.contains('player--active')){
        sumscore0 += sumcurrent0;
        sumcurrent0 = 0;
        score0.textContent = sumscore0;
        player0.classList.remove('player--active');
        player1.classList.add('player--active');
        current0.textContent = "0";
        if(sumscore0>=100){
            player0.classList.add('player--winner');
            if(localStorage.getItem("player0name") === "")
            {
                name0.textContent = "PLAYER 1 🏆";
            }
            else
            {
                name0.textContent = localStorage.getItem("player0name");
                name0.textContent += " 🏆";
            }
            hold.style.visibility = "hidden";
            roll.style.visibility = "hidden";
        }
    }
    else{
        sumscore1 += sumcurrent1;
        sumcurrent1 = 0;
        score1.textContent = sumscore1;
        player1.classList.remove('player--active');
        player0.classList.add('player--active');
        current1.textContent = "0";
        if(sumscore1>=100){
            player1.classList.add('player--winner');
            if(localStorage.getItem("player1name") === "")
            {
                name1.textContent = "PLAYER 2 🏆";
            }
            else
            {
                name1.textContent = localStorage.getItem("player1name");
                name1.textContent += " 🏆";
            }
            hold.style.visibility = "hidden";
            roll.style.visibility = "hidden";
        }
    }
});
newgame.addEventListener('click',function(){
    sumcurrent0 = 0;
    sumcurrent1 = 0;
    sumscore0 = 0;
    sumscore1 = 0;
    dice.style.visibility = "hidden";
    score0.textContent = "0";
    score1.textContent = "0";
    current0.textContent = "0"; 
    current1.textContent = "0";
    hold.style.visibility = "visible";
    roll.style.visibility = "visible";
    name0.textContent = "PLAYER 1";
    name1.textContent = "PLAYER 2";
    if(player0.classList.contains('player--winner')){
        player0.classList.remove('player--winner');
    } 
    else{
        player1.classList.remove('player--winner');
    }
    if(!player0.classList.contains('player--active')){
        player0.classList.add('player--active');
        player1.classList.remove('player--active');
    }
    if(localStorage.getItem("player0name") === "")
    {
        name0.textContent = "Player 1";
    }
    else
    {
        name0.textContent = localStorage.getItem("player0name");
    }
    if(localStorage.getItem("player1name") === "")
    {
        name1.textContent = "Player 2";
    }
    else
    {
        name1.textContent = localStorage.getItem("player1name");
    }

});


// modal

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
function removeModal(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
closeModal.addEventListener('click',removeModal);
overlay.addEventListener('click',removeModal);
document.addEventListener('keydown',function(e){
    if(e.key === "Escape" && !(modal.classList.contains('hidden'))){
        removeModal();
    }
});


const player0name = document.getElementById('player0name');
const player1name = document.getElementById('player1name');
const btnletplay = document.getElementById('btnletplay');

btnletplay.addEventListener('click', resetting);
document.addEventListener('keydown',function(e1){
    if(e1.key === "Enter" && !(modal.classList.contains('hidden'))){
        resetting();
    }
})
function resetting(){
    localStorage.setItem("player0name",player0name.value);
    localStorage.setItem("player1name",player1name.value);
    if(localStorage.getItem("player0name") === "")
    {
        name0.textContent = "Player 1";
    }
    else
    {
        name0.textContent = localStorage.getItem("player0name");
    }
    if(localStorage.getItem("player1name") === "")
    {
        name1.textContent = "Player 2";
    }
    else
    {
        name1.textContent = localStorage.getItem("player1name");
    }
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
