const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let create a function to inilazie the game
function initGame(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""];
    //when reset button is pressed we should clear in UI also
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents='all';
        //remove green background
        boxes[index].classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

// boxes.forEach((box)=>{
//     box.addEventListener('click',()=>{
//         if (currentPlayer === 'X') {
//         currentPlayer = 'O';
//     } else {
//         currentPlayer = 'X';
//     }
//     gameInfo.innerText=`Current Player - ${currentPlayer}`;
//     });

    
// });

// boxes.forEach((box)=>{
//     box.addEventListener('click',()=>{
//         if (currentPlayer === 'X'){
//             // box.textContent=`${currentPlayer}`;
//             box.textContent='O'
//         }
//         else{
//             box.textContent='X';
//         }
        
        

//     });
// });
function swapTurn(){
    if(currentPlayer==='X'){
        
        currentPlayer='O'
    }
    else if(currentPlayer==='O'){
        currentPlayer='X'
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`
}

function gameOver(){
    // newGameBtn.classList.add('active');
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" ||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&
        (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]==='X'){
                answer='X';
            }
            else{
                answer='O';
            }
            //stop the game as soon as winner is decleared
            boxes.forEach((box)=>{
                box.style.pointerEvents='none';
            });

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
            
        }
    });
    //winner is found
    if(answer!==""){
        gameInfo.innerText=`Winner - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }
    
    //when there is no winner

    // if(answer===""){
    //     gameInfo.innerText=`Game is Tied!`;     ----> This will execute at starrting
    //     newGameBtn.classList.add('active');
    //     return;
    // }

    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    })
    if(fillCount==9){
        gameInfo.innerText=`Game is Tied!`;     
        newGameBtn.classList.add('active');
        return;
    }
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none';
        //Swap karo turn ko
        swapTurn();
        //check if anybody won
        gameOver(); 
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener('click',initGame);