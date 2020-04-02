let canvas = document.querySelector('canvas');
let turnTracker = document.querySelector('h3');

canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerHeight * (3/4) * (7/6);

let c = canvas.getContext('2d');
let length = canvas.height * (1/6);
let radius = Math.sqrt(canvas.width) * 1.3;
let isClicked = false;
let playerTurn = 'B';
canvasX = (window.innerWidth - canvas.width) / 2;
turnTracker.innerText = "Yellow's turn! ";

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
                break;
            }
        }
    }
}

let board = [];

for (let i = 0; i < 7; i++)
{
    board[i] = new Column(i + 1);
}

function drawBoard()
{
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].pieces.length; j++)
        {
            c.beginPath();
            c.arc(i * length + (length / 2), j * length + (length / 2), radius, 0, Math.PI * 2, false);
            if (board[i].pieces[j] == 'B') c.fillStyle = "#D9BE36";
            else if (board[i].pieces[j] == 'R') c.fillStyle = "#F23838";
            else c.fillStyle = "#fffaf0";
            c.fill();
        }
    }
}
function animate()
{
    requestAnimationFrame(animate);
    drawBoard();
}

window.addEventListener('mousedown', () => {
    let clickPos = mouse.x;
    if ((mouse.x >= canvasX) && (mouse.x <= canvas.width + canvasX))
    {
        for (let column of board)
        {
            if (column.right_limit >= clickPos)
            {
                column.insert(playerTurn);
                if (playerTurn == "B")
                {
                    playerTurn = 'R';
                    turnTracker.innerText = "Red's turn!";
                    break;
                }
                else
                {
                    playerTurn = 'B';
                    turnTracker.innerText = "Yellow's turn!";
                    break;
                }
            }
        }
    }
});

window.addEventListener('mouseup', () => {isClicked = false;});


animate();