let canvas = document.querySelector('canvas');

canvas.height = window.innerHeight * (3/4);
canvas.width = window.innerHeight * (3/4) * (7/6);

let c = canvas.getContext('2d');
let length = canvas.height * (1/6);
let radius = Math.sqrt(canvas.width) * 1.2;

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
    constructor()
    {
        this.pieces = ['O', 'O', 'O', 'O', 'O', 'O'];
    }
}

let board = [];

for (let i = 0; i < 7; i++)
{
    board[i] = new Column();
}

function drawBoard()
{
    for (let i = 0; i < board.length; i++)
    {
        for (let j = 0; j < board[i].pieces.length; j++)
        {
            c.beginPath();
            c.arc(i * length + (length / 2), j * length + (length / 2), radius, 0, Math.PI * 2, false);
            if (board[i].pieces[j] == 'B') c.fillStyle = "#2494FF";
            else if (board[i].pieces[j] == 'R') c.fillStyle = "#FF524F";
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
animate();