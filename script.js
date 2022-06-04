const gameBoard = (() => {
    
    let board = [];
    const restart = () => {
        for(let i=0; i<9; i++){
            board[i] = '';
        }
    }
    const put = (char, index) => {
        board[index] = char;
    }
    return {restart, put};
    
})();


const gameController = (() => {

    let startGame = 0;
    let counter = 1;

    const p1Turn = document.querySelector('.p1Turn');
    const p2Turn = document.querySelector('.p2Turn');
    const boxes = document.querySelectorAll('.box');

    const start = document.querySelector('.start');
    start.addEventListener("click", () => {
        startGame = 1;
        gameBoard.restart();
        p2Turn.style.opacity = 0;
        p1Turn.style.opacity = 1;
        for(let i=0; i<boxes.length; i++){
            boxes[i].textContent = '';
        }
    });

    const board = document.querySelector('.board');
    board.addEventListener('click', (e) => {
        if(startGame === 1 && e.target.textContent === ''){
            let boxClicked = e.target.dataset.index;
            let char = '';
            if((counter&1)){
                //p1 chance
                char = 'X';
                p1Turn.style.opacity = 0;
                p2Turn.style.opacity = 1;
            }
            else{
                //p2 chance
                char = 'O';
                p1Turn.style.opacity = 1;
                p2Turn.style.opacity = 0;
            }
            e.target.textContent = char;
            gameBoard.put(char, boxClicked);
            counter++;
        }
    })
})();
