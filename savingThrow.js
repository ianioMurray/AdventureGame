"use strict";

var savingThrow = (function(classLevel, saveAgainst) 
{
    var typeOfSave = {
        DeathRayPoison: "DeathRayPoison",
        MagicWands: "MagicWands",
        ParalysisTurnToStone: "ParalysisTurnToStone",
        DragonBreath: "DragonBreath",
        RodsStavesSpells: "RodsStavesSpells"
    };

    var clericSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll: 11},
        {type: typeOfSave.MagicWands, requiredRoll:  12},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll:  14},
        {type: typeOfSave.DragonBreath, requiredRoll: 16},
        {type: typeOfSave.RodsStavesSpells, requiredRoll:  15}
    ];

    var fighterSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll:  12},
        {type: typeOfSave.MagicWands, requiredRoll:  13},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll:  14},
        {type: typeOfSave.DragonBreath, requiredRoll:  15},
        {type: typeOfSave.RodsStavesSpells, requiredRoll:  16}
    ];

    var magicUserSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll:  13},
        {type: typeOfSave.MagicWands, requiredRoll:  14},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll:  13},
        {type: typeOfSave.DragonBreath, requiredRoll:  16},
        {type: typeOfSave.RodsStavesSpells, requiredRoll:  15}
    ];

    var thiefSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll:  13},
        {type: typeOfSave.MagicWands, requiredRoll:  14},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll:  13},
        {type: typeOfSave.DragonBreath, requiredRoll:  16},
        {type: typeOfSave.RodsStavesSpells, requiredRoll:  15}
    ];

    var normalManSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll:  14},
        {type: typeOfSave.MagicWands, requiredRoll:  15},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll:  16},
        {type: typeOfSave.DragonBreath, requiredRoll:  17},
        {type: typeOfSave.RodsStavesSpells, requiredRoll:  17}       
    ];

    var dwarfHalflingSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll: 10},
        {type: typeOfSave.MagicWands, requiredRoll: 11},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll: 12},
        {type: typeOfSave.DragonBreath, requiredRoll:  13},
        {type: typeOfSave.RodsStavesSpells, requiredRoll: 14}       
    ];

    var elfSaves = [
        {type: typeOfSave.DeathRayPoison, requiredRoll: 12},
        {type: typeOfSave.MagicWands, requiredRoll: 13},
        {type: typeOfSave.ParalysisTurnToStone, requiredRoll: 13},
        {type: typeOfSave.DragonBreath, requiredRoll:  15},
        {type: typeOfSave.RodsStavesSpells, requiredRoll: 15}   
    ];

    var getSavingThrow = function(classLevel, typeOfSavingThrow)
    {
        var saveCollection;
        switch(classLevel.class)
        {
            case characterType.Cleric:
                saveCollection = clericSaves;
                break;
            case characterType.Fighter:
                saveCollection = fighterSaves;
                break;
            case characterType.MagicUser:
                saveCollection = magicUserSaves;
                break;    
            case characterType.Thief:
                saveCollection = thiefSaves;
                break;  
            case characterType.NormalMan:
                saveCollection = normalManSaves;
                break;
            case characterType.Elf:
                saveCollection = elfSaves;
                break;
            case characterType.Dwarf:
            case characterType.Halfling:
                saveCollection = dwarfHalflingSaves;
                break;
            default:
                throw "Unknown character class";
        }

        for(var i=0; saveCollection.length > i; i++)
        {
            if(saveCollection[i].type === typeOfSavingThrow)
            {
                return saveCollection[i].requiredRoll;
            }
        }
        throw "unknown saving throw type";
    };

    var isSavingThrowMade = function(classLevel, typeOfSavingThrow, roll)
    {
        if(getSavingThrow(classLevel, typeOfSavingThrow) <= roll)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    return {
        typeOfSave: typeOfSave,
        isSavingThrowMade: isSavingThrowMade
    };
})();
