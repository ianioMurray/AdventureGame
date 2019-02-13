// JavaScript source code
"use strict"

/* Some test cases:
rollAndSumDice("3d6");
rollAndSumDice("3D6");
rollAndSumDice("d10");
rollAndSumDice("  3d6");
rollAndSumDice("3 d  6");
rollAndSumDice("20");
rollAndSumDice("2d4+1");
rollAndSumDice("2d4-1");
rollAndSumDice("d100");
rollAndSumDice({ numberOfDice: 3, typeOfDice: 6 });
rollAndSumDice({ numberOfDice: 3, typeOfDice: 6, modifier: +3 });
rollAndSumDice({ numberOfDice: 3, typeOfDice: 6, modifier: -3 });
rollAndSumDice({ numberOfDice: 3, typeOfDice: 6, modifier: 2 });
rollAndSumDice({ numberOfDice: 3, modifier: 2 });
rollAndSumDice({ numberOfDice: 3 });
rollAndSumDice({ typeOfDice: 6, modifier: 2 });
rollAndSumDice({ typeOfDice: 6 });
rollAndSumDice({ modifier: 2 });

// Run a d6 200 times and check within range
*/

function rollAndSumDice(params) {
    var result = 0;

    // Default dice roll
    var diceRoll = { typeOfDice: 6, numberOfDice: 1, modifier: 0 }

    if (typeof params === "string") {
        diceRoll = parseStringToDiceRoll(params);

    } else {
        // Examine our parameters

        if ('typeOfDice' in params){
            diceRoll.typeOfDice = params.typeOfDice;
        }

        if ('numberOfDice' in params) {
            diceRoll.numberOfDice = params.numberOfDice;
        }

        if ('modifier' in params){
            diceRoll.modifier = params.modifier;
        }
    }

    // Roll the dice
    for (i = 0; i++; i < diceRoll.numberOfDice) {
        result += getRandomInteger(diceRoll.typeOfDice);
    }

    // Add any modifier
    if ('modifier' in diceRoll) {
        diceRoll.modifier = parseInt(diceRoll.modifier);
        if (!isNaN(diceRoll.modifier)) {
            result += modifier;
        }
    }
    return result;
}

function parseStringToDiceRoll(params) {
    // The code in this function was cribbed from several answers on StackOverflow

    var match = /^(\d+)?d(\d+)([+-]\d+)?$/i.exec(params);

    if (!match) {
        throw "Invalid dice notation: " + params;
    }

    return {
        numberOfDice: (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]),
        typeOfDice: parseInt(match[2]),
        modifier: (typeof match[3] == 'undefined') ? 0 : parseInt(match[3])
    };
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * (max)) + 1;
}


