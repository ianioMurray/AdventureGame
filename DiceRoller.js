
"use strict"

var dice = new Dice();

function Dice()
{

    // Default dice roll
    this.diceRoll = 
    { 
        typeOfDice: 6, 
        numberOfDice: 1, 
        modifier: 0 
    };


   this.rollDice = function(params) 
   {
        var result = 0;

        //covert params to a valid diceRoll
        this.getDiceRoll(params);

        // Roll the appropriate dice the appropriate number of times and get the sum of the result 
        for (var i = 0; i < this.diceRoll.numberOfDice; i++)
        {
            result += (Math.floor(Math.random() * (this.diceRoll.typeOfDice))) + 1;
        }

        // Add any modifiers to the total
        if ('modifier' in this.diceRoll) {
            this.diceRoll.modifier = parseInt(this.diceRoll.modifier);
            if (!isNaN(this.diceRoll.modifier)) {
                result += this.diceRoll.modifier;
            }
        }
        return result;
    };
    
    this.getDiceRoll = function(params)
    {
         if (typeof params === "string") {
            this.diceRoll = this.parseStringToDiceRoll(params);

        } else {
            // Examine our parameters

            if ('typeOfDice' in params){
                this.diceRoll.typeOfDice = params.typeOfDice;
            }

            if ('numberOfDice' in params) {
                this.diceRoll.numberOfDice = params.numberOfDice;
            }

            if ('modifier' in params){
                this.diceRoll.modifier = params.modifier;
            }
        }
    };

    this.parseStringToDiceRoll = function(params)
     {
        var match = /^(\d+)?d(\d+)([+-]\d+)?$/i.exec(params);

        if (!match) {
            throw "Invalid dice notation: " + params;
        }

        return {
            numberOfDice: (typeof match[1] == 'undefined') ? 1 : parseInt(match[1]),
            typeOfDice: parseInt(match[2]),
            modifier: (typeof match[3] == 'undefined') ? 0 : parseInt(match[3])
        };
    };
}