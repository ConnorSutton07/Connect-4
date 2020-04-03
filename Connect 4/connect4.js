let canvas = document.querySelector('canvas');
let turnTracker = document.querySelector('h3');

canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerHeight * (3/4) * (7/6);

let c = canvas.getContext('2d');
let length = canvas.height * (1/6);
let radius = Math.sqrt(canvas.width) * 1.3;
let isClicked = false;
let playerTurn = 'Y';
canvasX = (window.innerWidth - canvas.width) / 2;
let board = [];
let gameover = false;

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
        //window.alert("tryign to insert peice");
        for (let i = 5; i >= 0; i--)
        {
            if (this.pieces[i] == 'O')
            {
                this.pieces[i] = piece;
                drawBoard();

                gameover = CheckForWin(piece, this, this.order - 1, i);
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

    window.alert("starting check");
    //count vertical pieces in a row
    while (col + 1 <= 6)
    {
        if (column.pieces[col + 1] == player)
        {
            vertical ++;
            col ++;
        }
    }
    col = j;
    while ((col - 1) >= 0)
    {
        if (column.pieces[col - 1] == player)
        {
            vertical ++;
            col --;
        }
    }

    //count horizontal pieces in a row
    while (row + 1 <= 5)
    {
        if (board[row + 1].pieces[j] == player)
        {
            horizontal ++;
            row ++;
        }
    }
    row = i;
    while (row - 1 >= 0)
    {
        if (board)
    }
    while (board[row - 1].pieces[j] == player && (row - 1) >= 0)
    {
        horizontal ++;
        row --;
        console.log("4");
    }

    row = i;
    col = j;
    //count diagonal pieces from left to right
    while (board[row - 1].pieces[col + 1] == player && (row - 1) >= 0 && (col + 1) <= 7)
    {
        row --;
        col ++;
        diagonal_lr ++;
        console.log("5");
    }
    row = i;
    col = j;
    while (board[row + 1].pieces[col - 1] == player && (row + 1) <= 5 && (col - 1) >= 0)
    {
        row ++;
        col --;
        diagonal_lr ++;
        console.log("6");
    }

    //count diagonal pieces from right to left
    row = i;
    col = j;
    while (board[row - 1].pieces[col - 1] == player && (row - 1) >= 0 && (col - 1) >= 0)
    {
        row --;
        col --;
        diagonal_rl ++;
        console.log("7");
    }
    row = i;
    col = j;
    while (board[row + 1].pieces[col + 1] == player && (row + 1) <= 5 && (col + 1) <= 6)
    {
        row ++;
        col ++;
        diagonal_rl ++;
        console.log("8");
    }

    window.alert("Check ended");
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


start();
