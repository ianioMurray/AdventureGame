"use strict";

var toSave = (function(classLevel, saveAgainst) 
{
    var clericSaves = [
        {type: "DeathRayPoison", requiredRoll: 11},
        {type: "MagicWands", requiredRoll:  12},
        {type: "ParalysisTurnToStone", requiredRoll:  14},
        {type: "DragonBreath", requiredRoll: 16},
        {type: "RodsStavesSpells", requiredRoll:  15}
    ];

    var fighterSaves = [
        {type: "DeathRayPoison", requiredRoll:  12},
        {type: "MagicWands", requiredRoll:  13},
        {type: "ParalysisTurnToStone", requiredRoll:  14},
        {type: "DragonBreath", requiredRoll:  15},
        {type: "RodsStavesSpells", requiredRoll:  16}
    ];

    var magicUserSaves = [
        {type: "DeathRayPoison", requiredRoll:  13},
        {type: "MagicWands", requiredRoll:  14},
        {type: "ParalysisTurnToStone", requiredRoll:  13},
        {type: "DragonBreath", requiredRoll:  16},
        {type: "RodsStavesSpells", requiredRoll:  15}
    ];

    var thiefSaves = [
        {type:"DeathRayPoison", requiredRoll:  13},
        {type: "MagicWands", requiredRoll:  14},
        {type: "ParalysisTurnToStone", requiredRoll:  13},
        {type: "DragonBreath", requiredRoll:  16},
        {type: "RodsStavesSpells", requiredRoll:  15}
    ];

    var getSavingThrow = function(classLevel, saveAgainst)
    {
        var saveCollection;
        switch(classLevel.class)
        {
            case "Cleric":
                saveCollection = clericSaves;
                break;
            case "Fighter":
                saveCollection = fighterSaves;
                break;
            case "MagicUser":
                saveCollection = magicUserSaves;
                break;    
            case "Thief":
                saveCollection = thiefSaves;
                break;  
            default:
                throw "Unknown character class";
        }

        for(var i=0; saveCollection.length > i; i++)
        {
            if(saveCollection[i].type === saveAgainst)
            {
                return saveCollection[i].requiredRoll;
            }
        }
        throw "unknown saving throw type";
    };

    return {
        getSavingThrow: getSavingThrow
    };
})();
