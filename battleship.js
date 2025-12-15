//  All functions in the code are at the end for readability.

// This is the matrix for battleship. 
let grid = [gA = [" ", " ", " ", " ", " "],
            gB = [" ", " ", " ", " ", " "],
            gC = [" ", " ", " ", " ", " "],
            gD = [" ", " ", " ", " ", " "],
            gE = [" ", " ", " ", " ", " "]];

// the rows of the grid are set to variables that are used in a switch later on.
let A = gA;
let B = gB;
let C = gC;
let D = gD;
let E = gE;

// array of numbers that are used to set a random position in the grid.
let gridin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

// 
let gridpos = [];

// will generate 6 random numbers from gridin. the numbers are never repeated.
for (let i = 0; i <= 5; i++) {
    let res = Math.floor(Math.random() * gridin.length);
    let ret = gridin.splice(res, 1);
    gridpos.push(ret);
};

// this loop will set the ships or astrisks(*) into the matrix(grid) used for play.
for (let i = 0; i <= 5; i++) {    
    let pos = gridpos[i];
    if (pos < 5) {
        gA.splice(pos, 1, "*"); 
    } else if (pos < 10 && pos > 4) {
        let q = pos - 5;
        gB.splice(q, 1, "*");
    } else if (pos < 15 && pos > 9) {
        let w = pos - 10;
        gC.splice(w, 1, "*");
    } else if (pos < 20 && pos > 14) {
        let e = pos - 15;
        gD.splice(e, 1, "*");
    } else if (pos < 25 && pos > 19) {
        let r = pos - 20;
        gE.splice(r, 1, "*");
    } else {
        process.stdout.write("Something went wrong!");   
    };  
}; 

/* This will display the generated ships in the matrix for testing.
 it is commented out so the user(player) can't see it*/
//console.table(grid);

// the actual game function.

let numberofshots = 0;
let totalships = 6;
let numberofhits = 0;
process.stdout.write("\nWelcome to Battleship!\n");
process.stdout.write("Enter a letter from A to E, follwed by a number from 1 to 5:(ex: a1)\n");
process.stdin.on("data", function(inputFromUser){
    // turns the input from the user into an array.
    let targeting = inputFromUser.toString().trim().toUpperCase().split("");
//input is checked
    checkUserInput(targeting);
    
/* x is the letter that the user chose. y is the number.
x will be used to check what row the user has selectd.
y is used for the index or where in the row the user selected.
both get filled from the check input function*/
    let x = "";
    let y = "";
// ind will set the number input by the user to a proper array index number
    let ind = y - 1;
// marker is just a place holder variable so it can be put into the function
    let marker = "";
//checks if there is a ship where the user guessed.
    checkforhit(x, ind, marker);
//ends the game if all ships are sunk
    if (numberofhits == totalships) {
        process.stdout.write("All ships sunk!\n" + "You used " + numberofshots + " shots");
        process.exit();
    }
});

// ****** the functions ********

/* uses the variables for the grid rows that were declared at line 12
marker then becomes the arry index for that row*/
function checkforhit(x, ind, marker){
        switch (x) {
        case "A" :
            marker = gA[ind];
            hitormiss(marker);
            break;
        case "B" :
            marker = gB[ind];
            hitormiss(marker);
            break;
        case "C" :
            marker = gC[ind];
            hitormiss(marker);
            break;
        case "D" :
            marker = gD[ind];
            hitormiss(marker);
            break;
        case "E" :
            marker = gE[ind];
            hitormiss(marker);
            break;
        default :
            process.stdout.write("Something went wrong! Try again!");
            break;
    };
}
// checks if the marker(grid row index) is the same as an astrisk or ship 
function hitormiss(marker) {
            if (marker == '*') {
                return (process.stdout.write("HIT!\n" + "Ship Sunk!\n"),
                        numberofshots++, 
                        numberofhits++ 
                    );
            } else {
                return (process.stdout.write("MISS!\n"), numberofshots++);
            };
}
// simply checks that the user input is valid.
function checkUserInput(targeting){
    if (targeting[0] != A && targeting[0] != B && targeting[0] != C && targeting[0] != D && targeting[0] != E){
        process.stdout.write("\nNot a valid letter!\n");
        process.stdout.write("\nPlease use a, b, c, d, or e\n");
    } else {
        let x = targeting[0];
        return x;
    }

    if (targeting[1] < 1 && targeting[1] > 5 ){
        process.stdout.write("\nNot a valid number!\n");
        process.stdout.write("\nPlease use 1, 2, 3, 4, or 5\n");
    } else {
        let y = targeting[1];
        return y;
    }
}