
"use strict"


//created so the methods and properties are private unless they are identifed in the return

var dice = (function()
{
    // Default dice roll
    var diceRoll = 
    { 
        typeOfDice: 6, 
        numberOfDice: 1, 
        modifier: 0 
    };


   var rollDice = function(params) 
   {
        var result = 0;

        //covert params to a valid diceRoll
       getDiceRoll(params);

        // Roll the appropriate dice the appropriate number of times and get the sum of the result 
        for (var i = 0; i < diceRoll.numberOfDice; i++)
        {
            result += (Math.floor(Math.random() * (diceRoll.typeOfDice))) + 1;
        }

        // Add any modifiers to the total
        if ('modifier' in diceRoll) {
            diceRoll.modifier = parseInt(diceRoll.modifier);
            if (!isNaN(diceRoll.modifier)) {
                result += diceRoll.modifier;
            }
        }
        
        return result;
    };
    
    var getDiceRoll = function(params)
    {
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
    };

    var parseStringToDiceRoll = function(params)
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

    var getNumberOfDice = function()
    {
        return diceRoll.numberOfDice;
    };

    var getTypeOfDice = function()
    {
        return diceRoll.typeOfDice;
    };

    var getDiceModifier = function()
    {
        return diceRoll.modifier;
    };

    //expose these functions ONLY
    return {
        rollDice: rollDice,
        getNumberOfDice: getNumberOfDice,  //for testing only
        getTypeOfDice: getTypeOfDice,     //for testing only
        getDiceModifier: getDiceModifier //for testing only
    }
})();