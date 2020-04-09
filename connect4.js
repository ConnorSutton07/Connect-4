let canvas = document.querySelector('canvas');
let turnTracker = document.querySelector('.tracker');
let reset = document.querySelector('.reset');

canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerHeight * (3/4) * (7/6);
let canvasX = (window.innerWidth - canvas.width) / 2;

let c = canvas.getContext('2d');
let length = canvas.height * (1/6);
let radius = Math.sqrt(canvas.width) * 1.3;
let isClicked = false;
let playerTurn = 'Y';
let board = [];
let gameover = false;
let piece_count = 0;
let height = canvas.height;
let mouse = 
{
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(e) 
    {
        mouse.x = e.x;
        mouse.y = e.y;
    }
);

window.addEventListener('resize', () => 
{
    canvas.height = window.innerHeight * (3/4);
    canvas.width = window.innerHeight * (3/4) * (7/6);
});

class Column
{
    constructor(i)
    {
        this.pieces = ['O', 'O', 'O', 'O', 'O', 'O'];
        this.order = i;
        this.right_limit = i * canvas.width * (1/7) + canvasX;
    }
    insert(piece)
    {
        for (let i = 5; i >= 0; i--)
        {
            if (this.pieces[i] == 'O')
            {
                this.pieces[i] = piece;
                piece_count++;
                drawBoard();

                if (piece_count >= 7) gameover = CheckForWin(piece, this, this.order - 1, i);
                if (gameover)
                {
                    if (piece == 'Y') turnTracker.innerText = "Yellow wins!";
                    else turnTracker.innerText = "Red wins!";
                }
                else 
                {
                    if (piece == 'Y')
                    {
                        playerTurn = 'R';
                        turnTracker.innerText = "Red's turn!";
                    }
                    else
                    {
                        playerTurn = 'Y';
                        turnTracker.innerText = "Yellow's turn!";
                    }
                }
                break;
            }
        }
    }
}

function CheckForWin(player, column, i, j)
{
    let horizontal = 1;
    let vertical = 1;
    let diagonal_lr = 1;
    let diagonal_rl = 1;

    let col = j;
    let row = i;

    //count vertical pieces in a row
    while (col + 1 <= 6)
    {
        if (column.pieces[col + 1] == player)
        {
            vertical ++;
            col ++;
        }
        else break;
    }
    col = j;
    while ((col - 1) >= 0)
    {
        if (column.pieces[col - 1] == player)
        {
            vertical ++;
            col --;
        } 
        else break;
    }

    //count horizontal pieces in a row
    while (row + 1 <= 5)
    {
        if (board[row + 1].pieces[j] == player)
        {
            horizontal ++;
            row ++;
        }
        else break;
    }
    row = i;
    while (row - 1 >= 0)
    {
        if (board[row - 1].pieces[j] == player)
        {
            horizontal ++;
            row --;
        }
        else break;
    }

    row = i;
    col = j;
    //count diagonal pieces from left to right
    while (row - 1 >= 0 && col + 1 <= 7)
    {
        if (board[row - 1].pieces[col + 1] == player)
        {
            row --;
            col ++;
            diagonal_lr ++;
        }
        else break;
    }

    row = i;
    col = j;
    while (row + 1 <= 5 && col - 1 >= 0)
    {
        if (board[row + 1].pieces[col - 1] == player)
        {
            row ++;
            col --;
            diagonal_lr ++;
        }
        else break;
    }

    //count diagonal pieces from right to left
    row = i;
    col = j;
    while (row - 1 >= 0 && col - 1 >= 0)
    {
        if (board[row - 1].pieces[col - 1] == player)
        {
            row --;
            col --;
            diagonal_rl ++;
        }
        else break;

    }

    row = i;
    col = j;
    while (row + 1 <= 5 && col + 1 <= 6)
    {
        if (board[row + 1].pieces[col + 1] == player)
        {
            row ++;
            col ++;
            diagonal_rl ++;
        }
        else break;
    }

    if (vertical >= 4 || horizontal >= 4 || diagonal_lr >= 4 || diagonal_rl >= 4)
    {
        return true;
    }
}   

function drawBoard()
{
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].pieces.length; j++)
        {
            c.beginPath();
            c.arc(i * length + (length / 2), j * length + (length / 2), radius, 0, Math.PI * 2, false);
            if (board[i].pieces[j] == 'Y') c.fillStyle = "#D9BE36";
            else if (board[i].pieces[j] == 'R') c.fillStyle = "#F23838";
            else c.fillStyle = "#fffaf0";
            c.fill();
        }
    }
}


function start()
{
    piece_count = 0;
    gameover = false;
    board = [];
    isClicked = false;
    playerTurn = 'Y';

    for (let i = 0; i < 7; i++)
    {
        board[i] = new Column(i + 1);
    }

    drawBoard();
    turnTracker.innerText = "Yellow's turn! ";
}

window.addEventListener('mousedown', () => {
    let clickPos = mouse.x;
    if ((mouse.x >= canvasX) && (mouse.x <= canvas.width + canvasX) && !gameover)
    {
        for (let column of board)
        {
            if (column.right_limit >= clickPos)
            {
                column.insert(playerTurn);
                break;
            }
        }
    }
});

window.addEventListener('mouseup', () => {isClicked = false;});

reset.addEventListener('click', start);

start();
