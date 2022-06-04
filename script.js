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
    const winOrNot = () => {
        for(let i=0; i<9; i=i+3){
            let cnt = 1;
            for(let j=i+1; j<i+3; j++){
                if(board[j] == board[i]){
                    cnt++;
                }
                else{
                    break;
                }
            }
            if(cnt == 3 && board[i] != ''){
                return board[i];
            }
        }
        for(let i=0; i<3; i++){
            let cnt = 1;
            for(let j=i+3; j<i+7; j=j+3){
                if(board[j] == board[i]){
                    cnt++;
                }
                else{
                    break;
                }
            }
            if(cnt == 3 && board[i] != ''){
                return board[i];
            }
        }

        let element1 = board[0];
        let cnt1 = 1;
        for(let i=4; i<9; i=i+4){
            if(board[i] == element1){
                cnt1++;
            }
            else{
                break;
            }
        }
        if(cnt1 === 3 && element1 != ''){
            return element1;
        }

        let element2 = board[2];
        let cnt2 = 1;
        for(let i=4; i<7; i=i+2){
            if(board[i] == element2){
                cnt2++;
            }
            else{
                break;
            }
        }
        if(cnt2 === 3 && element2 != ''){
            return element2;
        }
        return 0;
    }
    return {restart, put, winOrNot};
    
})();


const gameController = (() => {

    let startGame = 0;
    let counter = 1;

    const p1Turn = document.querySelector('.p1Turn');
    const p2Turn = document.querySelector('.p2Turn');
    const boxes = document.querySelectorAll('.box');
    const board = document.querySelector('.board');
    const winner = document.querySelector('.winner');
    const start = document.querySelector('.start');

    start.addEventListener("click", () => {
        startGame = 1;
        counter = 1;
        gameBoard.restart();
        p2Turn.style.opacity = 0;
        p1Turn.style.opacity = 1;
        for(let i=0; i<boxes.length; i++){
            boxes[i].textContent = '';
        }
        winner.textContent = '';
        board.addEventListener('click', game);
    });

    const game = (e) => {
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

            let result = gameBoard.winOrNot();
            if(result != 0){
                if(result == 'X'){
                    winner.textContent = 'Congratulations! Player 1 Wins';
                }
                else if(result == 'O'){
                    winner.textContent = 'Congratulations! Player 2 Wins';
                }
                board.removeEventListener('click', game);
            }
        }
    }
})();
