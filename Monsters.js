
"use strict";

//--------------------------------------------
//             MONSTERS
//--------------------------------------------
const specialDamage = "Special";

function Monster()
{
    this.firstLevelSpells = 0;
    this.secondLevelSpells = 0;
    this.thirdLevelSpells = 0;
    this.inLair = false;
    this.inWilderness = false;
    this.movement = 0;
    this.flyMovement = 0;
    this.swimMovement = 0;
    this.webMovement = 0;
    this.hitDiceStars = 0;
    this.canTalk = 0;
    this.isSleep = 0;
    this.leader = false;
    this.chieftain = false;
    this.canOnlyBeDamagedBy = [];
    this.canAutoHit = false;
    this.previouslyHit = [];
    this.isHitAutomaticallyByOpponent = false;

    this.attack = function(opponent)
    {
        var count = 0;

        for(var i=0; this.attacks.length > i; i++ )
        {
            var ToHit = requiredToHit.getToHit(this, opponent);

            if(this.automaticallyHitsOpponent(opponent) || dice.rollDice("1D20") >= ToHit)
            {
                var damage = this.attacks[i].damage;

                //all attacks will be against one opponent even if they die. 
                if(damage !== specialDamage)
                {
                    opponent.takeDamage(dice.rollDice(damage));
                }
                else
                {
                    this.specialDamage(opponent, count);
                    count++;                               //added for bears to see if both claws hit
                }
            }
        }
    };

    this.takeDamage = function(damageAmount)
    {
        this.currentHitPoints = this.currentHitPoints - damageAmount;
        if(this.currentHitPoints <= 0)
        {
            this.setIsDead();
        }
    };

    this.parseHitDice = function()
    {
         //get the number of hitDice - numbers 0-9 [any amount of them] and decimal point and then number 0-9 [any amount of them]       
        var match = /^([0-9]*\.?[0-9]+)/.exec(this.hitDice);
        var match2 = /[+-][0-9]+/.exec(this.hitDice);
        
        if(match2 === null)
        {
            match2 = ["0"];
        }

        return {
            hitDice: match[0],
            modifier: parseInt(match2[0])   
        };
    };

    this.parseHitDiceWithoutModifier = function()
    {
        //get the number of hitDice - numbers 0-9 [any amount of them] and decimal point and then number 0-9 [any amount of them]
        // then an optional + or -
        var match = /^([0-9]*\.?[0-9]+)[+-]?/.exec(this.hitDice);

        return match[0];
    };

    this.GetHPs = function()
    {
        var parsedHitDice = this.parseHitDice();
        var hitPoints = 0;  
        if(parsedHitDice.hitDice === "0.1")
        {
            return 1;
        }
        else if (parsedHitDice.hitDice === "0.5")
        {
            hitPoints = dice.rollDice( "1D4");
            return hitPoints + parsedHitDice.modifier;
        }
        else if (parsedHitDice.hitDice === "1" && this.name === "Kobold King Bodyguard")
        {
            return 6;
        }
        else if (parsedHitDice.hitDice === "1" && this.name === "Medium")
        {
            return dice.rollDice("1D4");
        }
        else if (parsedHitDice.hitDice === "1" && this.name === "Orc Leader")
        {
            return 8;
        }
        else if (parsedHitDice.hitDice === "3" && this.name === "Medium Master")
        {
            return dice.rollDice("3D4");
        }
        else if (parsedHitDice.hitDice === "2" && this.name === "Gnome Leader")
        {
            return 11;
        }
        else if (parsedHitDice.hitDice === "2" && this.name === "Goblin King Bodyguard")
        {
            return dice.rollDice("2D6");   
        }
        else if (parsedHitDice.hitDice === "2" && this.name === "Kobold King")
        {
            return 9;   
        }
        else if (parsedHitDice.hitDice === "3" && this.name === "Gnoll Leader")
        {
            return 16;
        }
        else if (parsedHitDice.hitDice === "3" && this.name === "Goblin King")
        {
            return 15;
        }
        else if (parsedHitDice.hitDice === "3" && this.name === "Gnome Chieftain Bodyguard")
        {
            return dice.rollDice("1D4+9");
        }
        else if (parsedHitDice.hitDice === "4" && this.name === "Gnome Chieftain")
        {
            return 18;
        }
        else if (parsedHitDice.hitDice === "4" && this.name === "Hobgoblin King Bodyguard")
        {
            return dice.rollDice("3D6");
        }
        else if (parsedHitDice.hitDice === "4" && this.name === "Orc Chieftain")
        {
            return 15;
        }
        else if (parsedHitDice.hitDice === "5" && this.name === "Hobgoblin King")
        {
            return 22;
        }
        else if (parsedHitDice.hitDice === "5" && this.name === "Werewolf Leader")
        {
            return 30;
        }
        else 
        {
            hitPoints = dice.rollDice( parsedHitDice.hitDice + "D8");
            return hitPoints + parsedHitDice.modifier;
        }
    };

    this.surpriseOpponent = function(diceResult)
    {
        if(diceResult <= 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.setIsDead = function()
    {
        if(this.leader === true)
        {
            this.setLeaderDead();
        }
        if(this.chieftain === true)
        {
            this.setChieftainDead();
        }
        this.isDead = true;
    };

    this.isImmuneToDamageType = function(weaponHitWith)
    {
        if(this.canOnlyBeDamagedBy.length === 0)
        {
            return false;
        }

        for (let i = 0; this.canOnlyBeDamagedBy.length > i; i++)
        {
            if(this.canOnlyBeDamagedBy[i] === immunityToDamageTypes.magicalWeapon)
            {
                if(weaponHitWith.isMagical)
                {
                    return false;
                }
            }

            if(this.canOnlyBeDamagedBy[i] === immunityToDamageTypes.silverWeapon)
            {
                if(weaponHitWith.isSilver)
                {
                    return false;
                }
            }

            if(this.canOnlyBeDamagedBy[i] === immunityToDamageTypes.fireDamage)
            {
                //does weapon do fire damage
            }

            if(this.canOnlyBeDamagedBy[i] === immunityToDamageTypes.coldDamage)
            {
                //does weapon do cold damage
            }
        }

        return true;
    };

    this.automaticallyHitsOpponent = function(opponent)
    {
        if(this.canAutoHit)
        {
            if(this.autoHitPrerequisitesMet(opponent))
            {
                return true;
            }
        }
        return false;
    };

    this.isAutomicallyHitByOpponent = function()
    {
        if(this.isHitAutomaticallyByOpponent)
        {
            return true;
        }
        return false;
    };
}

Monster.createMonsters = function(typeOfMonster, numberOfMonstersAppearing, inLair = false, inWilderness = false, leaderPresent = false)
{
    var monsters = [];

    if(typeOfMonster.mayHaveLeader)
    {
        var noOfLeaders = typeOfMonster.noOfLeadersPresent(numberOfMonstersAppearing, inLair);
        
        if(leaderPresent && noOfLeaders === 0)
        {
            noOfLeaders= 1;
        }

        for(let i = 0; i < noOfLeaders; i++)
        {
            try
            {
                var leaderType = typeOfMonster.getLeaderType();
                let monster = new leaderType();
                monsters.push(monster);
                typeOfMonster.leaderAlive = true;
            }
            catch(err)
            {
                console.log(err.message);
            }
        }
    }

    if(typeOfMonster.mayHaveChieftain && inLair)
    {
        var chieftainType = typeOfMonster.getChieftainType();
        let monster = new chieftainType();
        monsters.push(monster);
        typeOfMonster.chieftainAlive = true;

        for(let i = 0; chieftainType.numberOfBodyGuards > i; i++)
        {
            var bodyguardType = typeOfMonster.getChieftainBodyguardType();
            let monster = new bodyguardType();
            monsters.push(monster); 
        }
    }

    for(var i = 0;  numberOfMonstersAppearing > i; i++)
    {
        let monster = new typeOfMonster();
        monsters.push(monster);
        monster.inLair = inLair;
        monster.inWilderness = inWilderness;
    }
    return monsters;
};


//--------------------------------------------
//-------------Acolyte------------------------
//--------------------------------------------

//if there are more than 4 then 1 is a leader 
function Acolyte()
{
    this.name = "Acolyte";
    this.race = "human";
    this.armourClass = 2;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: characterType.Cleric, level: 1};
    //this.Alignment = [{ alignment: Lawful, probability: 33 }, { alignment: Chaotic, probability: 33 }, { alignment: Neutral, probability: 34 }];
}

Acolyte.prototype = new Monster();
Acolyte.prototype.Constructor = Acolyte;
Acolyte.prototype.getTreasureType = function() { return ["U"]; };
Acolyte.prototype.movement = 60;
Acolyte.prototype.getMorale = function() { return  7; };
Acolyte.prototype.firstLevelSpells = 0;
Acolyte.getNumberAppearing = function() { return dice.rollDice("1D8"); };
Acolyte.leaderAlive = false;
Acolyte.mayHaveLeader = true;
Acolyte.noOfLeadersPresent = function(noAppearing)
{
    if(noAppearing >= 4)
    {
        return 1;
    }
    return 0;
};
Acolyte.getLeaderType = function() { return AcolyteLeader; };

//--------------------------------------------
//-------------AcolyteLeader------------------
//--------------------------------------------

//the leader will know random spells 

function AcolyteLeader()
{
    this.name = "Acolyte Leader";
    this.hitDice = this.GetHitDice();
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.leader = true;
    //this.Alignment = [{ alignment: Lawful, probability: 33 }, { alignment: Chaotic, probability: 33 }, { alignment: Neutral, probability: 34 }];
}

AcolyteLeader.prototype = new Acolyte();
AcolyteLeader.prototype.Constructor = AcolyteLeader;
AcolyteLeader.prototype.setLeaderDead = function() { Acolyte.leaderAlive = false; };
AcolyteLeader.prototype.GetHitDice = function()
{
    //roll a 1D10 on 1-4 level 2 / 5-7 level 3 / 8-9 level 4 / 10 level 5
    var diceResult = dice.rollDice("1D10");
    if (diceResult >= 1 && diceResult <=4)
    {
        this.firstLevelSpells = 1;
        return 2;
    }
    else if (diceResult >= 5 && diceResult <=7)
    {
        this.firstLevelSpells = 2;
        return 3;
    }
    else if (diceResult >= 8 && diceResult <=9)
    {
        this.firstLevelSpells = 2;
        this.secondLevelSpells = 1;
        return 4;
    }
    else if (diceResult === 10)
    {
        this.firstLevelSpells = 2;
        this.secondLevelSpells = 2;
        return 5;
    }
    else
    {
        throw "unexpected dice result";
    }
};

//--------------------------------------------
//-------------Ape, White---------------------
//--------------------------------------------
function Ape()
{
    this.name = "White Ape";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damage: "1d4" }, 
                    { attackType: "Claw", damage: "1d4" }];
    this.saveAs = { class: characterType.Fighter, level: 2};
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

Ape.prototype = new Monster();
Ape.prototype.Constructor = Ape;
Ape.prototype.getTreasureType = function() { return []; };
Ape.prototype.movement = 120;
Ape.prototype.getMorale = function() { return  7; };
Ape.getNumberAppearing = function() {return dice.rollDice("1D6");};


//--------------------------------------------
//-------------Bandit-------------------------
//--------------------------------------------

function Bandit()
 {
    this.name = "Bandit";
    this.race = "human";
    this.armourClass = 6;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: characterType.Thief, level: 1};  
    //this.Alignment = [{ alignment: Chaotic, probability: 50 }, { alignment: Neutral, probability: 50 }];
}

Bandit.prototype = new Monster();
Bandit.prototype.Constructor = Bandit;
Bandit.prototype.GetTreasureType = function()
{
    if(this.inLair)
    { 
        return ["A"];
    }  
    else
    {
        return ["U"];
    }
};
Bandit.prototype.movement = 120;
Bandit.prototype.getMorale = function() { return 8; };
Bandit.getNumberAppearing = function(inLair = false) 
{
     if(inLair)
     {
        return dice.rollDice("3D10");
     }
     else
     {
        return dice.rollDice("1D8");
     }
};
Bandit.leaderAlive = false;
Bandit.mayHaveLeader = true;                         
Bandit.getLeaderType = function() { return BanditLeader; };
Bandit.noOfLeadersPresent = function(noAppearing)
{
    // a leader is never automatically generated - they are only present when requested via the createMonsters
    return 0;
};

//--------------------------------------------
//-------------Bandit Leader------------------
//--------------------------------------------

// TODO: can be any class 
// TODO: bandits will not have a leader unless one is set in the createMonsters function

function BanditLeader()
 {
    this.name = "Bandit Leader";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: characterType.Thief, level: 1};  
    this.leader = true;
    //this.Alignment = [{ alignment: Chaotic, probability: 50 }, { alignment: Neutral, probability: 50 }];
}

BanditLeader.prototype = new Bandit();
BanditLeader.prototype.Constructor = BanditLeader;
BanditLeader.prototype.setLeaderDead = function() { Bandit.leaderAlive = false; };


//------------------------------------------
//---           Bat Prototype           ---
//------------------------------------------
function Bat() 
{  }

Bat.prototype = new Monster();
Bat.prototype.Constructor = Bat;

//--------------------------------------------
//---------------Bat Normal-------------------
//--------------------------------------------

function BatNormal()
 {
    this.name = "Bat";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "0.1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Confusion", damage: specialDamage }]; 
    this.saveAs = { class: characterType.NormalMan, level: 0};  
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BatNormal.prototype = new Bat();
BatNormal.prototype.Constructor = BatNormal;
BatNormal.prototype.movement = 9;
BatNormal.prototype.flyMovement = 120;
BatNormal.prototype.getTreasureType = function() { return []; };
BatNormal.prototype.getMorale = function() { return 6; };
BatNormal.getNumberAppearing = function() {return dice.rollDice("1D100");};
BatNormal.prototype.specialDamage = function(opponent)
{
    //does not do damage 
    //causes confusion -- -2 toHit and -2 saving throws and cannot cast spells
};

//--------------------------------------------
//---------------Bat, Giant-------------------
//--------------------------------------------

function BatGiant()
 {
    this.name = "Giant Bat";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damage: "1D4" }]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BatGiant.prototype = new Bat();
BatGiant.prototype.Constructor = BatGiant;
BatGiant.prototype.movement = 30;
BatGiant.prototype.flyMovement = 180;
BatGiant.prototype.getMorale = function() { return 8; };
BatGiant.prototype.getTreasureType = function() { return []; };
BatGiant.getNumberAppearing = function() {return dice.rollDice("1D10");};

//--------------------------------------------
//---------------Bat, Giant Vampire-----------
//--------------------------------------------

function BatGiantVampire()
 {
    this.name = "Giant Vampire Bat";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damage: specialDamage }]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BatGiantVampire.prototype = new Bat();
BatGiantVampire.prototype.Constructor = BatGiantVampire;
BatGiantVampire.prototype.movement = 30;
BatGiantVampire.prototype.flyMovement = 180;
BatGiantVampire.prototype.getMorale = function() { return 8; };
BatGiantVampire.prototype.getTreasureType = function() { return []; };
BatGiant.getNumberAppearing = function() {return dice.rollDice("1D10");};
BatGiantVampire.prototype.specialDamage = function(opponent) 
{
    opponent.takeDamage(dice.rollDice("1D4"));
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, dice.rollDice("1D20")))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = dice.rollDice("1D10");
        //opponent now will automatically be hit and take 1D4 damage
        //if they die this way they must save vs spells or become undead in 24 hours
    }
};

//------------------------------------------
//---           Bear Prototype           ---
//------------------------------------------
function Bear() 
{  }

Bear.prototype = new Monster();
Bear.prototype.Constructor = Bear;
Bear.prototype.movement = 120;
Bear.prototype.specialDamage = function(opponent, noOfPreviousClawHits)
{
    this.clawDamage(opponent);

    //check if previous claw attack hit
    if(noOfPreviousClawHits > 0)
    {
        opponent.takeDamage(dice.rollDice("2D8"));
    }
};

//--------------------------------------------
//---------------Bear, Black------------------
//--------------------------------------------

function BearBlack()
 {
    this.name = "Black Bear";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Bite", damage: "1D6"} ]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  
   // this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearBlack.prototype = new Bear();
BearBlack.prototype.Constructor = BearBlack;
BearBlack.prototype.getMorale = function() { return  7; };
BearBlack.prototype.getTreasureType = function() { return ["U"]; };
BearBlack.getNumberAppearing = function() { return dice.rollDice("1D4"); };
BearBlack.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
};

//--------------------------------------------
//---------------Bear, Grizzly------------------
//--------------------------------------------

function BearGrizzly()
 {
    this.name = "Grizzly Bear";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;

    this.attacks = [{ attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Bite", damage: "1D8"}]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  

   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearGrizzly.prototype = new Bear();
BearGrizzly.prototype.Constructor = BearGrizzly;
BearGrizzly.prototype.getMorale = function() { return  8; };
BearGrizzly.prototype.getTreasureType = function() { return ["U"]; };
BearGrizzly.getNumberAppearing = function() { return 1; };
BearGrizzly.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D4"));
};

//--------------------------------------------
//---------------Bear, Polar------------------
//--------------------------------------------

function BearPolar()
 {
    this.name = "Polar Bear";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Bite", damage: "1D10"} ]; 
    this.saveAs = { class: characterType.Fighter, level: 3};  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearPolar.prototype = new Bear();
BearPolar.prototype.Constructor = BearPolar;
BearPolar.prototype.getMorale = function() { return 8; };
BearPolar.prototype.getTreasureType = function() { return ["U"]; };
BearPolar.getNumberAppearing = function() { return 1; };
BearPolar.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D6"));
};

//--------------------------------------------
//---------------Bear, Cave-------------------
//--------------------------------------------

function BearCave()
 {
    this.name = "Cave Bear";
    this.race = "animal";
    this.armourClass = 5;
    this.hitDice = "7";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Claw", damage: specialDamage }, 
                    { attackType: "Bite", damage: "2D6"} ]; 
    this.saveAs = { class: characterType.Fighter, level: 3};  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearCave.prototype = new Bear();
BearCave.prototype.Constructor = BearCave;
BearCave.prototype.getMorale = function() { return 9; };
BearCave.prototype.getTreasureType = function() { return ["V"]; };
BearCave.getNumberAppearing = function() { return dice.rollDice("1D2"); };
BearCave.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D8"));
};

//------------------------------------------
//---       Giant Beetle Prototype       ---
//------------------------------------------
function BeetleGiant() 
{  }

BeetleGiant.prototype = new Monster();
BeetleGiant.prototype.Constructor = BeetleGiant;

//--------------------------------------------
//---------------Beetle, Fire-----------------
//--------------------------------------------

function BeetleFire()
 {
    this.name = "Fire Beetle";
    this.race = "animal";
    this.armourClass = 4;
    this.hitDice = "1+2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damage: "2D4" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleFire.prototype = new BeetleGiant();
BeetleFire.prototype.Constructor = BeetleFire;
BeetleFire.prototype.movement = 120;
BeetleFire.prototype.getMorale = function() { return 7; };
BeetleFire.prototype.getTreasureType = function() { return []; };
BeetleFire.getNumberAppearing = function() { return dice.rollDice("1D8"); };

//--------------------------------------------
//---------------Beetle, Oil-----------------
//--------------------------------------------

function BeetleOil()
 {
    this.name = "Oil Beetle";
    this.race = "animal";
    this.armourClass = 4;
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damage: "1D6" }, 
                    { attackType: "squirt", damage: specialDamage }]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleOil.prototype = new BeetleGiant();
BeetleOil.prototype.Constructor = BeetleOil;
BeetleOil.prototype.movement = 120;
BeetleOil.prototype.getMorale = function() { return 8; };
BeetleOil.prototype.getTreasureType = function() { return []; };
BeetleOil.getNumberAppearing = function() { return dice.rollDice("1D8"); };
BeetleOil.prototype.specialDamage = function(opponent)
{
    //squirts fluid that will cause the opponent to fight at -2 toHit for 24 hours
};

//--------------------------------------------
//---------------Beetle, Tiger----------------
//--------------------------------------------

function BeetleTiger()
 {
    this.name = "Tiger Beetle";
    this.race = "animal";
    this.armourClass = 3;
    this.hitDice = "3+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damage: "2D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1 };  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleTiger.prototype = new BeetleGiant();
BeetleTiger.prototype.Constructor = BeetleTiger;
BeetleTiger.prototype.movement = 150;
BeetleTiger.prototype.getMorale = function() { return 9; };
BeetleTiger.prototype.getTreasureType = function() { return ["U"]; };
BeetleTiger.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//---------------Berserker--------------------
//--------------------------------------------

// they get +2 toHit against Men, Kobolds, Goblins, Orcs

function Berserker() 
{
    this.name = "Berserker";
    this.race = "human";
    this.armourClass = 7;
    this.hitDice = "1+1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 }; 
    //this.Alignment = Neutral;
}

Berserker.prototype = new Monster();
Berserker.prototype.Constructor = Berserker;
Berserker.prototype.movement = 120;
Berserker.prototype.getMorale = function() { return 12; };   //set to 12 for the moment to reflect that they never run or surrender
Berserker.prototype.getTreasureType = function() 
{
    if(this.inWilderness)
    {
        return ["B"]; 
    } 
    else
    {
        return ["P"]; 
    }
};
Berserker.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//-------------------Boar---------------------
//--------------------------------------------

function Boar() 
{
    this.name = "Boar";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Tusk", damageAmount: "2D4" }];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Neutral;
}

Boar.prototype = new Monster();
Boar.prototype.Constructor = Boar;
Boar.prototype.movement = 150;
Boar.prototype.getMorale = function() { return 9; };
Boar.prototype.getTreasureType = function() { return []; };
Boar.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//-------------------Bugbear------------------
//--------------------------------------------

//if using weapon they get weapon damage +1

function Bugbear() 
{
    this.name = "Bugbear";
    this.race = "humaniod";
    this.armourClass = 5;
    this.hitDice = "3+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "2D4" }];  //if weapon they get +1
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    //this.Alignment = Chaotic;
}

Bugbear.prototype = new Monster();
Bugbear.prototype.Constructor = Bugbear;
Bugbear.prototype.movement = 90;
Bugbear.prototype.getMorale = function() { return 9; };
Bugbear.prototype.getTreasureType = function() { return ["B"]; };
Bugbear.getNumberAppearing = function() { return dice.rollDice("2D4"); };
Bugbear.prototype.surpriseOpponent= function(diceResult)
{
    //Bugbears surprise on a 1-3
    if(diceResult <= 3)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//---------------Carrion Crawler--------------
//--------------------------------------------

//description = "Can walk on walls and ceilings" },
function CarrionCrawler()
 {
    this.name = "Carrion Crawler";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "3+1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

CarrionCrawler.prototype = new Monster();
CarrionCrawler.prototype.Constructor = CarrionCrawler;
CarrionCrawler.prototype.movement = 120;
CarrionCrawler.prototype.getMorale = function() { return 9; };
CarrionCrawler.prototype.getTreasureType = function() { return ["B"]; };
CarrionCrawler.getNumberAppearing = function() { return dice.rollDice("1D3"); };
CarrionCrawler.prototype.specialDamage = function(opponent) {
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, dice.rollDice("1D20")))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = dice.rollDice("2D4");
    }

    //TODO - if all party members present are paralysised the crawler will starting eating them
};

//------------------------------------------
//---       Giant Cat Prototype          ---
//------------------------------------------
function CatGiant() 
{  }

CatGiant.prototype = new Monster();
CatGiant.prototype.Constructor = CatGiant;

//--------------------------------------------
//---------------Mountian Lion----------------
//--------------------------------------------

function MountainLion() 
{
    this.name = "Mountain Lion";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "3+2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D3" }, 
                    { attackType: "Claw", damageAmount: "1D3" }, 
                    { attackType: "Bite", damageAmount: "1D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Neutral;
}

MountainLion.prototype = new CatGiant();
MountainLion.prototype.Constructor = MountainLion;
MountainLion.prototype.movement = 150;
MountainLion.prototype.getMorale = function() { return  8; };
MountainLion.prototype.getTreasureType = function() { return ["U"]; };
MountainLion.getNumberAppearing = function() { return dice.rollDice("1D4"); };

//--------------------------------------------
//-----------------Panther--------------------
//--------------------------------------------

function Panther() 
{
    this.name = "Panther";
    this.race = "animal";
    this.armourClass = 4;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Bite", damageAmount: "1D8" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Neutral;
}

Panther.prototype = new CatGiant();
Panther.prototype.Constructor = Panther;
Panther.prototype.movement = 210;
Panther.prototype.getMorale = function() { return  8; };
Panther.prototype.getRreasureType = function() { return ["U"]; };
Panther.getNumberAppearing = function() { return dice.rollDice("1D2"); };

//--------------------------------------------
//-------------------Lion---------------------
//--------------------------------------------

function Lion() 
{
    this.name = "Lion";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4+1" },      
                    { attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Bite", damageAmount: "1D10" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    //this.Alignment = Neutral;
}

Lion.prototype = new CatGiant();
Lion.prototype.Constructor = Lion;
Lion.prototype.movement = 150;
Lion.prototype.getMorale = function() { return  9; };
Lion.prototype.getTreasureType = function() { return ["U"]; };
Lion.getNumberAppearing = function() { return dice.rollDice("1D4"); };

//--------------------------------------------
//-------------------Tiger--------------------
//--------------------------------------------

function Tiger() 
{
    this.name = "Tiger";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6" },      
                    { attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Bite", damageAmount: "2D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    //this.Alignment = Neutral;
}

Tiger.prototype = new CatGiant();
Tiger.prototype.Constructor = Tiger;
Tiger.prototype.movement = 150;
Tiger.prototype.getMorale = function() { return 9; };
Tiger.prototype.getTreasureType = function() { return ["U"]; };
Tiger.getNumberAppearing = function() { return 1; };

//--------------------------------------------
//--------------Sabre-tooth Tiger-------------
//--------------------------------------------

function SabreToothTiger() 
{
    this.name = "Sabre-tooth Tiger";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "8";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D8" },      
                    { attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Bite", damageAmount: "2D8" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 4 }; 
    //this.Alignment = Neutral;
}

SabreToothTiger.prototype = new CatGiant();
SabreToothTiger.prototype.Constructor = SabreToothTiger;
SabreToothTiger.prototype.movement = 150;
SabreToothTiger.prototype.getMorale = function() { return  10; };
SabreToothTiger.prototype.getTreasureType = function() { return ["V"]; };
SabreToothTiger.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Cave Locust-----------------
//--------------------------------------------

//they will try and flee most of the time.  When fleeing they will jump but 50% of the time they 
//will bump into a party member (Bump attack).  If cornered they will spit, the spit should be against AC9 
//it will paralysis for a turn.  Anyone going near the character will save vs poison or be sick till the character washes
//locusts shout warnings which 20% of the time will cause wandering monsters to appear
function CaveLocust() 
{
    this.name = "Cave Locust";
    this.race = "animal";
    this.armourClass = 4;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;

    this.attacks = [{ attackType: "Bite", damageAmount: "1D2" },      
                    { attackType: "Bump", damageAmount: "1D4" }, 
                    { attackType: "Spit", damageAmount: specialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 

    //this.Alignment = Neutral;
}

CaveLocust.prototype = new Monster();
CaveLocust.prototype.Constructor = CaveLocust;
CaveLocust.prototype.movement = 60;
CaveLocust.prototype.flyMovement = 180;
CaveLocust.prototype.getMorale = function() { return 5; };
CaveLocust.prototype.getTreasureType = function() { return []; };
CaveLocust.getNumberAppearing = function() {  return dice.rollDice("2D10"); };
CaveLocust.prototype.specialDamage = function(opponent) {
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = 1;
    }
};

//--------------------------------------------
//--------------Centipede, Giant--------------
//--------------------------------------------

function CentipedeGiant() 
{
    this.name = "Giant Centipede";
    this.race = "animal";
    this.armourClass = 9;
    this.hitDice = "0.5";        
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;

    this.attacks = [{ attackType: "Bite", damageAmount: specialDamage } ]; 
    this.saveAs = { class: characterType.NormalMan, level: 0 }; 

    //this.Alignment = Neutral;
}

CentipedeGiant.prototype = new Monster();
CentipedeGiant.prototype.Constructor = CentipedeGiant;
CentipedeGiant.prototype.movement = 60;
CentipedeGiant.prototype.getMorale = function() { return  7; };
CentipedeGiant.prototype.getTreasureType = function() { return []; };
CentipedeGiant.getNumberAppearing = function() {  return dice.rollDice("2D4"); };
CentipedeGiant.prototype.specialDamage = function(opponent) {
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        //TODO - this does no damage but movement is halved and character is unable to do physical activities for 10 days
    }
};

//--------------------------------------------
//----------------Doppleganger----------------
//--------------------------------------------

//able to shape itself into the double of any humanoid creature it observes (up to seven or so feet tall) 
//they save against charm and sleep spells as fighter level 10

function Doppleganger() {
    this.name = "Doppleganger";
    this.race = "???";                 //not sure what this should be
    this.armourClass = 5;
    this.hitDice = "4";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "UnspecifiedAttack", damageAmount: "1D12" }];
    this.saveAs = { class: characterType.Fighter, level: 10 }; 
    //this.Alignment = [{ alignment = ChaoticEvil, probability = 50 }, { alignment = Neutral, probability = 50 }];
}

Doppleganger.prototype = new Monster();
Doppleganger.prototype.Constructor = Doppleganger;
Doppleganger.prototype.movement = 90;
Doppleganger.prototype.getMorale = function() { return 10; };
Doppleganger.prototype.getTreasureType = function() { return ["E"]; }; 
Doppleganger.getNumberAppearing = function() {  return dice.rollDice("1D6"); };

//------------------------------------------
//---       Dragon Prototype          ---
//------------------------------------------

//dragons attack with claws and bite (1-3) OR breath (4-6) but not both at the same time
//dragons get 3 breath attacks per day

function Dragon()
{
}

Dragon.prototype = new Monster();
Dragon.prototype.Constructor = Dragon;
Dragon.prototype.hitDiceStars = 2;
Dragon.prototype.movement = 90;
Dragon.prototype.flyMovement = 240;
Dragon.prototype.getTreasureType = function() { return ["H"]; };
Dragon.prototype.specialDamage = function(opponent) {
    var damage = this.currentHitPoints;
    if(savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DragonBreath, dice.rollDice("1D20")))
    {
        damage = damage / 2;
    }
    opponent.takeDamage(damage);
};

//--------------------------------------------
//----------------White Dragon----------------
//--------------------------------------------

// BreathWeapon: Cold" - area= "80 foot X 30 foot cone" 
// not affected by cold attacks

function WhiteDragon() {
    this.name = "White Dragon";
    this.race = "dragon";                 
    this.armourClass = 3;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Bite", damageAmount: "2D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 6 }; 
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.canTalk = 10;
    this.isSleep = 50;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 0;
    this.thirdLevelSpells = 0;
}

WhiteDragon.prototype = new Dragon();
WhiteDragon.prototype.Constructor = WhiteDragon;
WhiteDragon.prototype.getMorale = function() { return 8; };
WhiteDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Black Dragon----------------
//--------------------------------------------

// BreathWeapon: acid - area= "60 foot X 5 foot line"
// not affected by acid attacks

function BlackDragon() {
    this.name = "Black Dragon";
    this.race = "dragon";                 
    this.armourClass = 2;
    this.hitDice = "7";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Bite", damageAmount: "2D10" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 7 }; 
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 20;
    this.isSleep = 40;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 0;
    this.thirdLevelSpells = 0;
}

BlackDragon.prototype = new Dragon();
BlackDragon.prototype.Constructor = BlackDragon;
BlackDragon.prototype.getMorale = function() { return 8; };
BlackDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Green Dragon----------------
//--------------------------------------------

// BreathWeapon: Chlorine Gas - area= "50 foot X 40 foot cloud"
// not affected by Chlorine Gas attacks

function GreenDragon() {
    this.name = "Green Dragon";
    this.race = "dragon";                 
    this.armourClass = 1;
    this.hitDice = "8";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Bite", damageAmount: "3D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 8 }; 
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 30;
    this.isSleep = 30;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 3;
    this.thirdLevelSpells = 0;
}

GreenDragon.prototype = new Dragon();
GreenDragon.prototype.Constructor = GreenDragon;
GreenDragon.prototype.getMorale = function() { return 9; };
GreenDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Blue Dragon----------------
//--------------------------------------------

// BreathWeapon: Lightening", area= "100 foot X 5 foot line" 
// not affected by Lightening attacks

function BlueDragon() {
    this.name = "Blue Dragon";
    this.race = "dragon";                 
    this.armourClass = 0;
    this.hitDice = "9";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6+1" }, 
                    { attackType: "Claw", damageAmount: "1D6+1" }, 
                    { attackType: "Bite", damageAmount: "3D10" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 9 };
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.canTalk = 40;
    this.isSleep = 20;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 4;
    this.thirdLevelSpells = 0;
}

BlueDragon.prototype = new Dragon();
BlueDragon.prototype.Constructor = BlueDragon;
BlueDragon.prototype.getMorale = function() { return 9; };
BlueDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Red Dragon----------------
//--------------------------------------------

// "BreathWeapon: Fire", area= "90 foot X 30 foot cone" 
// not affected by Fire attacks

function RedDragon() {
    this.name = "Red Dragon";
    this.race = "dragon";                 
    this.armourClass = -1;
    this.hitDice = "10";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Bite", damageAmount: "4D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 10 }; 
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 50;
    this.isSleep = 10;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 3;
    this.thirdLevelSpells = 3;
}

RedDragon.prototype = new Dragon();
RedDragon.prototype.Constructor = RedDragon;
RedDragon.prototype.getMorale = function() { return 10; };  
RedDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Gold Dragon----------------
//--------------------------------------------

// this.specialAbilities = [{ description = "BreathWeapon: Fire", area= "90 foot X 30 foot cone" },
//                          { description = "BreathWeapon: Gas", area= "50 foot X 40 foot cloud" }];
// not affected by Fire or gas attacks

function GoldDragon() {
    this.name = "Gold Dragon";
    this.race = "dragon";                 
    this.armourClass = -2;
    this.hitDice = "11";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Claw", damageAmount: "2D4" }, 
                    { attackType: "Claw", damageAmount: "2D4" }, 
                    { attackType: "Bite", damageAmount: "6D6" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 11 }; 
    //this.Alignment = [{ alignment = Lawful, probability = 100 }];
    this.canTalk = 100;
    this.isSleep = 5;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 4;
    this.thirdLevelSpells = 4;
}

GoldDragon.prototype = new Dragon();
GoldDragon.prototype.Constructor = GoldDragon;
GoldDragon.prototype.getMorale = function() { return 10; }; 
GoldDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Driver Ant------------------
//--------------------------------------------

function DriverAnt() {
    this.name = "Driver Ant";
    this.race = "animal";                 
    this.armourClass = 3;
    this.hitDice = "4";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damageAmount: "2D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
}

DriverAnt.prototype = new Monster();
DriverAnt.prototype.Constructor = DriverAnt;
DriverAnt.prototype.movement = 180;
DriverAnt.prototype.getMorale = function() { return 7; };  // but once engaged they will always continue to fight
DriverAnt.prototype.getTreasureType = function() 
{
    //30% chance a nest will have gold nuggets worth 1D10 thousand gold pieces 
    if(this.inLair)
    { 
        var extraGold = 0;
        if(dice.rollDice("1D10") <= 3)
        {
            extraGold = dice.rollDice("1D10") * 1000;
        }
        return ["U", extraGold];
    }  
    else
    {
        return [];
    }
};
DriverAnt.getNumberAppearing = function(inLair = false) 
{
     if(inLair)
     {
        return dice.rollDice("4D6");
     }
     else
     {
        return dice.rollDice("2D4");
     }
};

//--------------------------------------------
//-------------------Dwarf--------------------
//--------------------------------------------

function Dwarf() {
    this.name = "Dwarf";
    this.race = "humanoid";                 
    this.armourClass = 4;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Dwarf, level: 1 }; 
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

Dwarf.prototype = new Monster();
Dwarf.prototype.Constructor = Dwarf;
Dwarf.prototype.movement = 60;
Dwarf.prototype.getMorale = function() 
{
    // this is correct except when there are more than 1 leader.  Killing 1 leader will reduce all dwarves morale
    if(Dwarf.leaderAlive)
    {
        return 10;
    }
    else 
    {
        return 8;
    }
};
Dwarf.prototype.getTreasureType = function() { return ["G"]; };  
Dwarf.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
       return dice.rollDice("5D8");
    }
    else
    {
       return dice.rollDice("1D6");
    }
 };
Dwarf.getLeaderType = function() { return DwarfLeader; };
Dwarf.leaderAlive = false;
Dwarf.mayHaveLeader = true;
Dwarf.noOfLeadersPresent = function(noAppearing)
{
    //for every 20 dwarves there is 1 leader
    return Math.floor(noAppearing / 20);
};

//--------------------------------------------
//-------------------DwarfLeader--------------
//--------------------------------------------

//there will be a leader for every 20 dwarves Level 3-8 usually with a magic item

function DwarfLeader() {
    this.name = "Dwarf Leader";
    this.hitDice = this.getLevel(dice.rollDice("1D6+2"));
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Dwarf, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

DwarfLeader.prototype = new Dwarf();
DwarfLeader.prototype.Constructor = DwarfLeader;
DwarfLeader.prototype.getLevel = function(level) { return level.toString(); };
DwarfLeader.prototype.setLeaderDead = function() { Dwarf.leaderAlive = false; };

//--------------------------------------------
//-------------------Elf----------------------
//--------------------------------------------

//each elf will have a random level 1 spell 

function Elf() {
    this.name = "Elf";
    this.race = "humanoid";                 
    this.armourClass = 5;
    this.hitDice = "1+1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Elf, level: 1 }; 
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.firstLevelSpells = 1;
}

Elf.prototype = new Monster();
Elf.prototype.Constructor = Elf;
Elf.prototype.movement = 120;
Elf.prototype.getMorale = function() 
{
    if(Dwarf.leaderAlive)
    {
        return 10;
    }
    else 
    {
        return 8;
    }
};
Elf.prototype.getTreasureType = function() { return ["E"]; }; 
Elf.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
       return dice.rollDice("2D12");
    }
    else
    {
       return dice.rollDice("1D4");
    }
};
Elf.getLeaderType = function() { return ElfLeader; };
Elf.leaderAlive = false;
Elf.mayHaveLeader = true;
Elf.noOfLeadersPresent = function(noAppearing)
{
    if(noAppearing >= 15)
    {
        return 1;
    }
    return 0;
};

//--------------------------------------------
//-------------------ElfLeader--------------
//--------------------------------------------

//there will be a leader if more than 15 elves, the leader will be Level 2-7 usually with a magic item

function ElfLeader() {
    this.name = "Elf Leader";
    this.hitDice = this.getLevel(dice.rollDice("1D6+1"));
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Dwarf, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

ElfLeader.prototype = new Elf();
ElfLeader.prototype.Constructor = ElfLeader;
ElfLeader.prototype.getLevel = function(level) { return level.toString(); };
ElfLeader.prototype.setLeaderDead = function() { Elf.leaderAlive = false; };

//--------------------------------------------
//--------------Ferret, Giant-----------------
//--------------------------------------------

function FerretGiant() {
    this.name = "Giant Ferret";
    this.race = "animal";                 
    this.armourClass = 5;
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Bite", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 }; 
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
}

FerretGiant.prototype = new Monster();
FerretGiant.prototype.Constructor = FerretGiant;
FerretGiant.prototype.getMorale = function() { return 8; };
FerretGiant.prototype.movement = 150;
FerretGiant.prototype.getTreasureType = function() { return []; };   
FerretGiant.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
       return dice.rollDice("1D12");
    }
    else
    {
       return dice.rollDice("1D8");
    }
};

//--------------------------------------------
//-----------------Gargoyle-------------------
//--------------------------------------------

// semi-intelligent and cunning
// not affected by sleep or charm spells

function Gargoyle() 
{
    this.name = "Gargoyle";
    this.race = "???";                 //not sure what this should be
    this.armourClass = 5;
    this.hitDice = "4";   
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [
        { attackType: "Claw", damageAmount: "1D3" },
        { attackType: "Claw", damageAmount: "1D3" },
        { attackType: "Bite", damageAmount: "1D6" },
        { attackType: "Horn", damageAmount: "1D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 8 }; 
    //this.Alignment = LawfulEvil;
}

Gargoyle.prototype = new Monster();
Gargoyle.prototype.Constructor = Gargoyle;
Gargoyle.prototype.movement = 90;
Gargoyle.prototype.flyMovement = 150;
Gargoyle.prototype.canOnlyBeDamagedBy = [immunityToDamageTypes.magicalWeapon];
Gargoyle.prototype.getMorale = function() { return 11; };
Gargoyle.prototype.getTreasureType = function() { return ["C"]; };
Gargoyle.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
       return dice.rollDice("2D4");
    }
    else
    {
       return dice.rollDice("1D6");
    }
};

//--------------------------------------------
//---------------Gelatinous Cube--------------
//--------------------------------------------

// immune to cold and lightening 

function GelatinousCube()
 {
    this.name = "Gelatinous Cube";
    this.race = "slime";  
    this.armourClass = 8; 
    this.hitDice = "4";  
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [
        { attackType: "Disolve", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Neutral;
    this.previouslyHit = [];
}

GelatinousCube.prototype = new Monster();
GelatinousCube.prototype.Constructor = GelatinousCube;
GelatinousCube.prototype.getMorale = function() { return 12; };
GelatinousCube.prototype.getTreasureType = function() { return ["V"]; }; 
GelatinousCube.prototype.movement = 60;
GelatinousCube.prototype.canAutoHit = true;
GelatinousCube.getNumberAppearing = function() {  return 1; };
GelatinousCube.prototype.surpriseOpponent= function(diceResult)
{
    //Gelatinous Cube surprise on a 1-4
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};
GelatinousCube.prototype.specialDamage = function(opponent)
{
    //if opponent hit before they must make a save vs paralysis. If they fail they will be paralysised and all following attacks 
    //will automatically hit
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, dice.rollDice("1D20")))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = dice.rollDice("2D4");
    }

    opponent.takeDamage(dice.rollDice("2D4"));
    this.previouslyHit.push(opponent);
};
GelatinousCube.prototype.autoHitPrerequisitesMet = function(opponent)
{
    var currentOpponentPreviouslyHit  = false; 
    if(this.previouslyHit.indexOf(opponent) > -1)
    {
        currentOpponentPreviouslyHit = true;
    }

    if(opponent.isParalysised && currentOpponentPreviouslyHit)
    {
        return true;
    }
    return false;
};

//--------------------------------------------
//--------------------Ghoul-------------------
//--------------------------------------------

function Ghoul()
{
    this.name = "Ghoul";
    this.race = "undead";   
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [ { attackType: "Claw", damageAmount: specialDamage }, 
                     { attackType: "Claw", damageAmount: specialDamage }, 
                     { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Chaotic;
}

Ghoul.prototype = new Monster();
Ghoul.prototype.Constructor = Ghoul;
Ghoul.prototype.getTreasureType = function() { return ["B"]; }; 
Ghoul.prototype.getMorale = function() { return 9; };
Ghoul.prototype.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
       return dice.rollDice("2D8");
    }
    else
    {
       return dice.rollDice("1D6");
    }
};
Ghoul.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("2D4"));
    //elves are not affected by paralysis -- paralysis only affects creatures that are smaller than an orge
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, dice.rollDice("1D20")))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = dice.rollDice("2D4");
    }
    //if opponent is paralysised ghoul will attack another party member
};

//--------------------------------------------
//--------------------Gnoll-------------------
//--------------------------------------------

function Gnoll()
 {
    this.name = "Gnoll";
    this.race = "humaniod";   
    this.armourClass = 5;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [ { attackType: "WeaponAttack", damageAmount: "2D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    //this.Alignment = Chaotic;
 }

 Gnoll.prototype = new Monster();
 Gnoll.prototype.Constructor = Gnoll;
 Gnoll.prototype.movement = 90;
 Gnoll.prototype.getMorale = function() { return 8; };
 Gnoll.prototype.getTreasureType = function() { return ["D"]; }; 
 Gnoll.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("3D6");
    } 
    else
    {
        return dice.rollDice("1D6");
    }
};
Gnoll.getLeaderType = function() { return GnollLeader; };
Gnoll.leaderAlive = false;
Gnoll.mayHaveLeader = true;
Gnoll.noOfLeadersPresent = function(noAppearing)
{
    if(noAppearing >= 20)
    {
        return 1;
    }
    return 0;
};

//--------------------------------------------
//--------------------GnollLeader-------------
//--------------------------------------------

function GnollLeader() {
    this.name = "Gnoll Leader";
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GnollLeader.prototype = new Gnoll();
GnollLeader.prototype.Constructor = GnollLeader;
GnollLeader.prototype.setLeaderDead = function() { Gnoll.leaderAlive = false; };

//--------------------------------------------
//--------------------Gnome-------------------
//--------------------------------------------

//can see in the dark up to 90

function Gnome()
 {
    this.name = "Gnome";
    this.race = "humaniod";   
    this.armourClass = 5;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [ { attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Dwarf, level: 1 }; 
    //this.Alignment = Lawful/Neutral;
 }

 Gnome.prototype = new Monster();
 Gnome.prototype.Constructor = Gnome;
 Gnome.prototype.movement = 60;
 Gnome.prototype.getMorale = function() 
 {
     if(Gnome.chieftainAlive)
     {
         return 10;
     } 
     else
     {
         return 8; 
    }
};
 Gnome.prototype.getTreasureType = function() { return ["C"]; }; 
 Gnome.getNumberAppearing = function(inLair = false) 
 {
    if(inLair)
    {
       return dice.rollDice("5D8");
    }
    else
    {
       return dice.rollDice("1D8");
    }
};
Gnome.getLeaderType = function() { return GnomeLeader; };
Gnome.getChieftainType = function() { return GnomeChieftain; };
Gnome.getChieftainBodyguardType = function() { return GnomeChieftainBodyGuard; };
Gnome.leaderAlive = false;
Gnome.mayHaveLeader = true;
Gnome.noOfLeadersPresent = function(noAppearing)
{
    if(noAppearing >= 20)
    {
        return 1;
    }
    return 0;
};
Gnome.chieftainAlive = false;
Gnome.mayHaveChieftain = true;

//--------------------------------------------
//--------------------GnomeLeader-------------
//--------------------------------------------

//gnome leader appears when there are 20 or more gnomes

function GnomeLeader() {
    this.name = "Gnome Leader";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GnomeLeader.prototype = new Gnome();
GnomeLeader.prototype.Constructor = GnomeLeader;
GnomeLeader.prototype.setLeaderDead = function() { Gnome.leaderAlive = false; };

//--------------------------------------------
//----------------GnomeChieftain--------------
//--------------------------------------------

//gnome chieftain appears in the lair

function GnomeChieftain() {
    this.name = "Gnome Chieftain";
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8+1" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GnomeChieftain.prototype = new Gnome();
GnomeChieftain.prototype.Constructor = GnomeChieftain;
GnomeChieftain.prototype.setChieftainDead = function() { Gnome.chieftainAlive = false; };
GnomeChieftain.numberOfBodyGuards = dice.rollDice("1D6");

//--------------------------------------------
//-----------GnomeChieftainBodyGuard----------
//--------------------------------------------

//gnome chieftain has 1-6 bodyguards

function GnomeChieftainBodyGuard() {
    this.name = "Gnome Chieftain Bodyguard";
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GnomeChieftainBodyGuard.prototype = new Gnome();
GnomeChieftainBodyGuard.prototype.Constructor = GnomeChieftainBodyGuard;

//--------------------------------------------
//--------------------Goblin------------------
//--------------------------------------------

// in daylight they get -1 toHit 
// can see in the dark up to 90
// Always attack dwarves on sight
// 1 of every 4 will ride a dire wolf 

 function Goblin() 
 {
    this.name = "Goblin";
    this.race = "humaniod";  
    this.armourClass = 6;
    this.hitDice = "1D-1";    
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;    
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.NormalMan, level: 0 };
  //  this.Alignment = Chaotic;
}

Goblin.prototype = new Monster();
Goblin.prototype.Constructor = Goblin;
Goblin.prototype.movement = 60;
Goblin.prototype.getMorale = function() 
{
    if(Goblin.chieftainAlive)
    {
        return 9;
    } 
    else
    {
        return 7; 
    }
};
Goblin.prototype.getTreasureType = function()
{ 
    if(this.inLair || this.inWilderness)
    {
        return ["C"];
    }
    else 
    {
        return ["R"]; 
    }
};
Goblin.getNumberAppearing = function(inLair) 
{
    if(inLair)
    {
        return dice.rollDice("6D10"); 
    } 
    else
    {
        return dice.rollDice("2D4"); 
    }
};
Goblin.chieftainAlive = false;
Goblin.mayHaveChieftain = true;
Goblin.getChieftainType = function() { return GoblinKing; };
Goblin.getChieftainBodyguardType = function() { return GoblinChieftainBodyGuard; };

//--------------------------------------------
//----------------GoblinKing------------------
//--------------------------------------------

//goblin king appears in the lair
// no day light penalty

function GoblinKing() {
    this.name = "Goblin King";
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6+1" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GoblinKing.prototype = new Goblin();
GoblinKing.prototype.Constructor = GoblinKing;
GoblinKing.prototype.setChieftainDead = function() { Goblin.chieftainAlive = false; };
GoblinKing.numberOfBodyGuards = dice.rollDice("2D6");

//--------------------------------------------
//-----------GoblinkingBodyGuard----------
//--------------------------------------------

//goblin king has 2-12 bodyguards
// no day light penalty

function GoblinChieftainBodyGuard() {
    this.name = "Goblin King Bodyguard";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

GoblinChieftainBodyGuard.prototype = new Goblin();
GoblinChieftainBodyGuard.prototype.Constructor = GoblinChieftainBodyGuard;

//--------------------------------------------
//--------------------Gray Ooze---------------
//--------------------------------------------

//resembles wet stone and difficult to detect 
//Immune to cold and fire

function GrayOoze() 
{
    this.name = "Gray Ooze";
    this.race = "slime";
    this.armourClass = 8;
    this.hitDice = "3";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks = [{ attackType: "disolve", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;  
    this.previouslyHit = [];
}

GrayOoze.prototype = new Monster();
GrayOoze.prototype.Constructor = GrayOoze;
GrayOoze.prototype.movement = 10;
GrayOoze.prototype.getMorale = function() { return 12; };
GrayOoze.prototype.getTreasureType = function() { return []; };
GrayOoze.prototype.canAutoHit = true;
GrayOoze.getNumberAppearing = function() { return 1; };

GrayOoze.prototype.specialDamage = function(opponent)
{
    //after the first hit further hits are automatic
    opponent.takeDamage(dice.rollDice("2D8"));

    //attack disolves armour in 1 turn
    if(opponent.isArmourEquiped())
    {
        for(let i = 0; opponent.equipedArmour.length > i; i++)
        {
            opponent.unEquip(opponent.equipedArmour[i]);
        }
    }
};
GrayOoze.prototype.autoHitPrerequisitesMet = function(opponent)
{
    if(this.previouslyHit.indexOf(opponent) > -1)
    {
        return true;
    }
    return false;
};

//--------------------------------------------
//---------------Green Slime------------------
//--------------------------------------------

// burning the slime will do half damage to it and half to anyone being disolved by it 

function GreenSlime()
 {
    this.name = "Green Slime";
    this.race = "slime";
    this.isHitAutomaticallyByOpponent = true;
    this.armourClass = 9;          // added an armour class though one not need as they monster is always hit             
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks =  [{ attackType: "disolve", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;  
 }

GreenSlime.prototype = new Monster();
GreenSlime.prototype.Constructor = GreenSlime;
GreenSlime.prototype.movement = 3;
GreenSlime.prototype.getMorale = function() { return 12; };
GreenSlime.prototype.getTreasureType = function() { return []; };
// Immune to all damage except fire and cold
GreenSlime.prototype.canOnlyBeDamagedBy = [immunityToDamageTypes.fireDamage, immunityToDamageTypes.coldDamage];
GreenSlime.getNumberAppearing = function() { return 1; };
GreenSlime.prototype.specialDamage = function(opponent)
{
    // Eats everything but stone - disolves wood and metal in 6 rounds 
    // Sticks to flesh,  turning the flesh into green slime. 
    // after armour disolved the opponent will be absorbed in 1 to 4 rounds
    // Can only be removed by Cure Disease spell
};

//--------------------------------------------
//-----------------Halfling-------------------
//--------------------------------------------

function Halfling()
 {
    this.name = "Halfling";
    this.race = "humanoid";
    this.armourClass = 7; 
    this.hitDice = "1-1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks =  [{ attackType: "WeaponAttack", damageAmount: "1D6" }];
    this.saveAs = { class: characterType.Halfling, level: 1 };
    //  this.Alignment = Lawful;  
 }

Halfling.prototype = new Monster();
Halfling.prototype.Constructor = Halfling;
Halfling.prototype.movement = 90;
Halfling.prototype.getMorale = function() { return 7; };
Halfling.prototype.getTreasureType = function()
{
    if(this.inWilderness)
    {
        return ["B"];
    }
    else
    {
        return ["V"];
    }
};
Halfling.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("5D8");
    }
    else
    {
        return dice.rollDice("3D6"); 
    }
};
Halfling.getChieftainType = function() { return HalflingLeader; };
Halfling.getChieftainBodyguardType = function() { return HalflingMilitia; };
Halfling.chieftainAlive = false;
Halfling.mayHaveChieftain = true;

//--------------------------------------------
//----------------HalflingLeader--------------
//--------------------------------------------

function HalflingLeader() 
{
    this.name = "Halfling Leader";
    this.hitDice = dice.rollDice("1D6+1");
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Halfling, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

HalflingLeader.prototype = new Halfling();
HalflingLeader.prototype.Constructor = HalflingLeader;
HalflingLeader.prototype.setChieftainDead = function() { Halfling.chieftainAlive = false; };
HalflingLeader.numberOfBodyGuards = dice.rollDice("5D4");

//--------------------------------------------
//-----------HalflingMilitia------------------
//--------------------------------------------

function HalflingMilitia() 
{
    this.name = "Halfling Militia";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Halfling, level: parseInt(this.hitDice) }; 
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

HalflingMilitia.prototype = new Halfling();
HalflingMilitia.prototype.Constructor = HalflingMilitia;

//--------------------------------------------
//-------------------Harpy--------------------
//--------------------------------------------

// +2 to all their saving throws

function Harpy()
 {
    this.name = "Harpy";
    this.race = "?????";   //not sure 
    this.armourClass = 7; 
    this.hitDice = "3";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks =  [{ attackType: "Claw", damageAmount: "1D4" },
                     { attackType: "Claw", damageAmount: "1D4" },
                     { attackType: "WeaponAttack", damageAmount: "1D6" },
                     { attackType: "Song", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Halfling, level: 3 };
    //  this.Alignment = Chaotic;  
 }

Harpy.prototype = new Monster();
Harpy.prototype.Constructor = Harpy;
Harpy.prototype.movement = 60;
Harpy.prototype.flyMovement = 150;
Harpy.prototype.getMorale = function() { return 7; };
Harpy.prototype.getTreasureType = function() { return ["C"]; };
Harpy.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("2D4");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};
Harpy.prototype.specialDamage = function(opponent)
{
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.RodsStavesSpells, dice.rollDice("1D20")))
    {
        //opponent is charmed 
    }
};

//--------------------------------------------
//-------------------Hobgoblin----------------
//--------------------------------------------

// in their lair will be a king with 22hps 5 hitdice +2 damage
// he will have 1-4 body guards 4 hitdice 3-18hps
// with the king moral is 10

function Hobgoblin()
 {
    this.name = "Hobgoblin";
    this.race = "humanoid";
    this.armourClass = 6;
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Chaotic; 
}

Hobgoblin.prototype = new Monster();
Hobgoblin.prototype.Constructor = Hobgoblin;
Hobgoblin.prototype.movement = 90;
Hobgoblin.prototype.getMorale = function() 
{
    if(Hobgoblin.chieftainAlivereturn)
    {
        return 10;
    }
    else
    {
        return 8;
    }
};
Hobgoblin.prototype.getTreasureType = function() { return ["D"]; };
Hobgoblin.getNumberAppearing = function(inLair = false) 
{ 
    if(inLair)
    {
       return dice.rollDice("4D6");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};
Hobgoblin.getChieftainType = function() { return HobgoblinKing; };
Hobgoblin.getChieftainBodyguardType = function() { return HobgoblinKingBodyguard; };
Hobgoblin.chieftainAlive = false;
Hobgoblin.mayHaveChieftain = true;

//--------------------------------------------
//----------------HobgoblinKing---------------
//--------------------------------------------

function HobgoblinKing() 
{
    this.name = "Hobgoblin King";
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8+2" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
}

HobgoblinKing.prototype = new Hobgoblin();
HobgoblinKing.prototype.Constructor = HobgoblinKing;
HobgoblinKing.prototype.setChieftainDead = function() { Hobgoblin.chieftainAlive = false; };
HobgoblinKing.numberOfBodyGuards = dice.rollDice("1D4");

//--------------------------------------------
//-----------HobgoblinKingBodyguards----------
//--------------------------------------------

function HobgoblinKingBodyguard() 
{
    this.name = "Hobgoblin King Bodyguard";
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
}

HobgoblinKingBodyguard.prototype = new Hobgoblin();
HobgoblinKingBodyguard.prototype.Constructor = HobgoblinKingBodyguard;

//--------------------------------------------
//-------------------Insect Swarm-------------
//--------------------------------------------

// no damaged by weapons but waving them may ward off the swarm
// touchs waved do 1-4 damage to the swarm
// sleep will affect the full swarm

function InsectSwarm()
 {
    this.name = "Insect Swarm";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "1D3+1";                         
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Swarm", damageAmount: specialDamage }];  
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    //  this.Alignment = Neutral; 
}

InsectSwarm.prototype = new Monster();
InsectSwarm.prototype.Constructor = InsectSwarm;
InsectSwarm.prototype.canAutoHit = true;
InsectSwarm.prototype.movement = 30;
InsectSwarm.prototype.flyMovement = 60;
InsectSwarm.prototype.getMorale = function() { return 11; };
InsectSwarm.prototype.getTreasureType = function() { return []; };
InsectSwarm.getNumberAppearing = function() { return 1; };
InsectSwarm.prototype.autoHitPrerequisitesMet = function(opponent)
{
    return true;
};
InsectSwarm.prototype.specialDamage = function(opponent)
{
    // TODO: if attempting to ward off insects take half damage 
    if(opponent.isArmourEquiped())
    {
        opponent.takeDamage(2);
    }
    else
    {
        opponent.takeDamage(4);
    }
};

//--------------------------------------------
//-------------------Killer Bee--------------
//--------------------------------------------

// TODO: will attack anyone with 30 of lair automatically on sight
// TODO: honey in lair cures 1D4 damage

function KillerBee()
 {
    this.name = "Killer Bee";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "0.5";               
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "String", damageAmount: specialDamage }];  
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral; 
}

KillerBee.prototype = new Monster();
KillerBee.prototype.Constructor = KillerBee;
KillerBee.prototype.flyMovement = 150;
KillerBee.prototype.getMorale = function() { return 9; };
KillerBee.prototype.getTreasureType = function() { return []; };
KillerBee.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        var number = dice.rollDice("5D6"); 
        // always 10 bees with the queen
        if(number < 10)
        {
            number = 10;
        }
        return number;
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};
KillerBee.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
    
    // after a bee strings it dies unless its the queen 
    if(!this.chieftain)
    {
        this.isDead = true;   
    }

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isDead= true; 
    }
    
    //TODO: Once strung the opponent will take 1 damage until the sting is removed which takes 1 turn
};
KillerBee.getChieftainType = function() { return KillerBeeQueen; };
KillerBee.chieftainAlive = false;
KillerBee.mayHaveChieftain = true;

//--------------------------------------------
//----------------KillerBeeQueen--------------
//--------------------------------------------

function KillerBeeQueen() 
{
    this.name = "Kille rBee Queen";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "String", damageAmount: SpecialDamage }]; 
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
}

KillerBeeQueen.prototype = new KillerBee();
KillerBeeQueen.prototype.Constructor = KillerBeeQueen;
KillerBeeQueen.prototype.setChieftainDead = function() { KillerBee.chieftainAlive = false; };
KillerBeeQueen.prototype.numberOfBodyGuards = 0;

//--------------------------------------------
//---------------------Kobold-----------------
//--------------------------------------------

// TODO: infravision up to 90 distance
// TODO: they hate gnomes and will attack them on sight

function Kobold()
{
    this.name = "Kobold";
    this.race = "humanoid";
    this.armourClass = 7;
    this.hitDice = "0.5";            
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D4" }];
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    //this.Alignment = Chaotic;
}

Kobold.prototype = new Monster();
Kobold.prototype.Constructor = Kobold;
Kobold.prototype.movement = 60;
Kobold.prototype.getMorale = function() 
{
    if(this.chieftainAlive)
    {
        return 8;
    }
    else
    {
        return 6; 
    }
};
Kobold.prototype.getTreasureType = function()
{ 
    if(this.inWilderness)
    {
        return ["J"]; 
    }
    else
    {
        return ["P"];
    }
};
Kobold.getNumberAppearing = function(inLair = false) 
{ 
    if(inLair)
    {
        return dice.rollDice("6D10");   
    }
    else
    {
        return dice.rollDice("4D4"); 
    }
};   
        
Kobold.getChieftainType = function() { return KoboldKing; };
Kobold.getChieftainBodyguardType = function() { return KoboldKingBodyguard; };
Kobold.chieftainAlive = false;
Kobold.mayHaveChieftain = true;

//--------------------------------------------
//----------------KoboldKing---------------
//--------------------------------------------

function KoboldKing() 
{
    this.name = "Kobold King";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D4" } ];
    this.saveAs = { class: characterType.NormalMan, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
}

KoboldKing.prototype = new Kobold();
KoboldKing.prototype.Constructor = KoboldKing;
KoboldKing.prototype.setChieftainDead = function() { Kobold.chieftainAlive = false; };
KoboldKing.numberOfBodyGuards = dice.rollDice("1D6");

//--------------------------------------------
//-----------KoboldKingBodyguard--------------
//--------------------------------------------

function KoboldKingBodyguard() 
{
    this.name = "Kobold King Bodyguard";
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D4" } ];
    //TODO - it does not matter currently but a body guard is 1+1 but saves as level 1 
    this.saveAs = { class: characterType.NormalMan, level: parseInt(this.hitDice) }; 
}

KoboldKingBodyguard.prototype = new Kobold();
KoboldKingBodyguard.prototype.Constructor = KoboldKingBodyguard;

//------------------------------------------
//---       Living Statue Prototype      ---
//------------------------------------------

// TODO: immune to sleep 

function LivingStatue()
{
}

LivingStatue.prototype = new Monster();
LivingStatue.prototype.Constructor = LivingStatue;

//--------------------------------------------
//-------------------Crystal Statue-----------
//--------------------------------------------

function CrystalStatue()
 {
    this.name = "Crystal Living Statue";
    this.race = "living statue";                    
    this.armourClass = 4;
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" },
                    { attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Lawful; 
}

CrystalStatue.prototype = new LivingStatue();
CrystalStatue.prototype.Constructor = CrystalStatue;
CrystalStatue.prototype.movement = 90;
CrystalStatue.prototype.getMorale = function() { return 11; };
CrystalStatue.prototype.getTreasureType = function() { return []; };
CrystalStatue.getNumberAppearing = function() 
{
    //always this even in lair
    return dice.rollDice("1D6"); 
};

//--------------------------------------------
//-------------------Iron Statue--------------
//--------------------------------------------

//TODO: if hit and the characters weapon is not magical their weapon will become stuck in the statue
//      the weapon can only be removed once it is dead

function IronStatue()
 {
    this.name = "Iron Living Statue";
    this.race = "living statue";                     
    this.armourClass = 2;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" },
                    { attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Neutral; 
}

IronStatue.prototype = new LivingStatue();
IronStatue.prototype.Constructor = IronStatue;
IronStatue.prototype.movement = 30;
IronStatue.prototype.getMorale = function() { return 11; };
IronStatue.prototype.getTreasureType = function() { return []; };
IronStatue.getNumberAppearing = function() 
{
    //this is correct even in lair
    return dice.rollDice("1D4"); 
};

//--------------------------------------------
//-------------------Rock Statue--------------
//--------------------------------------------

function RockStatue()
 {
    this.name = "Rock Living Statue";
    this.race = "living statue";                     
    this.armourClass = 4;
    this.hitDice = "5";
    this.hitDiceStars = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 

    this.attacks = [{ attackType: "Magma", damageAmount: "2D6" },
                    { attackType: "Magma", damageAmount: "2D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 5 };

    //  this.Alignment = Chaotic; 
}

RockStatue.prototype = new LivingStatue();
RockStatue.prototype.Constructor = RockStatue;
RockStatue.prototype.movement = 60;
RockStatue.prototype.getMorale = function() { return 11; };
RockStatue.prototype.getTreasureType = function() { return []; };
RockStatue.getNumberAppearing = function() 
{ 
    //this is correct even in lair
    return dice.rollDice("1D3"); 
};

//------------------------------------------
//---       Lizard Giant Prototype      ---
//------------------------------------------

function LizardGiant()
{
}

LizardGiant.prototype = new Monster();
LizardGiant.prototype.Constructor = LizardGiant;

//--------------------------------------------
//-------------------Gecko--------------------
//--------------------------------------------

function Gecko()
 {
    this.name = "Gecko";
    this.race = "animal";                    
    this.armourClass = 5;
    this.hitDice = "3+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral; 
}

Gecko.prototype = new LizardGiant();
Gecko.prototype.Constructor = Gecko;
Gecko.prototype.movement = 120;
Gecko.prototype.getMorale = function() { return 7; };
Gecko.prototype.getTreasureType = function() { return ["U"]; };
Gecko.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("1D10");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};

//--------------------------------------------
//-------------------Draco--------------------
//--------------------------------------------

function Draco()
 {
    this.name = "Draco";
    this.race = "animal";                    
    this.armourClass = 5;
    this.hitDice = "4+2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1D10" } ];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Neutral; 
}

Draco.prototype = new LizardGiant();
Draco.prototype.Constructor = Draco;
Draco.prototype.movement = 120;
Draco.prototype.flyMovement = 210;
Draco.prototype.getMorale = function() { return 7; };
Draco.prototype.getTreasureType = function() { return ["U"]; };
Draco.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("1D8");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};

//--------------------------------------------
//--------------Horned Chameleon--------------
//--------------------------------------------

// TODO: Can fire its tongue at opponent - with a successful hit it draws opponent to it and 
//       automatically bites them (this might be covered already and might not need any change)

function HornedChameleon()
 {
    this.name = "Horned Chameleon";
    this.race = "animal";                    
    this.armourClass = 2;
    this.hitDice = "5";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "2D4" },
                    { attackType: "Horn", damageAmount: "1D6" },
                    { attackType: "Tail", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Neutral; 
}

HornedChameleon.prototype = new LizardGiant();
HornedChameleon.prototype.Constructor = HornedChameleon;
HornedChameleon.prototype.movement = 120;
HornedChameleon.prototype.getMorale = function() { return 7; };
HornedChameleon.prototype.getTreasureType = function() { return ["U"]; };
HornedChameleon.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("1D6");
    }
    else
    {
        return dice.rollDice("1D3"); 
    }
};
HornedChameleon.prototype.surpriseOpponent= function(diceResult)
{
    //Horned Chameleon surprise on a 1-5
    if(diceResult <= 5)
    {
        return true;
    }
    else
    {
        return false;
    }
};
HornedChameleon.prototype.specialDamage = function(opponent)
{
    // TODO: this is used against any opponent the lizard is not attacking
    opponent.isKnockedDown = true;
    // TODO: knocked down opponent cannot attack this turn 
};

//--------------------------------------------
//-----------------Tuatara--------------------
//--------------------------------------------

// TODO: can see in the dark up to 90

function Tuatara()
 {
    this.name = "Tuatara";
    this.race = "animal";                    
    this.armourClass = 4;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4" },
                    { attackType: "Claw", damageAmount: "1D4" },
                    { attackType: "Bite", damageAmount: "2D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Neutral; 
}

Tuatara.prototype = new LizardGiant();
Tuatara.prototype.Constructor = Tuatara;
Tuatara.prototype.movement = 90;
Tuatara.prototype.getMmorale = function() { return 6; };
Tuatara.prototype.getTreasureType = function() { return ["V"]; };
Tuatara.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("1D4");
    }
    else
    {
        return dice.rollDice("1D2"); 
    }
};

//--------------------------------------------
//-----------------Lizard Man-----------------
//--------------------------------------------

// Semi-Intelligent

function LizardMan()
 {
    this.name = "Lizard Man";
    this.race = "humanoid";
    this.armourClass = 5;
    this.hitDice = "2+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d6+1" }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral; 
 }

 LizardMan.prototype = new Monster();
 LizardMan.prototype.Constructor = LizardMan;
 LizardMan.prototype.movement = 60;
 LizardMan.prototype.swimMovement = 120;
 LizardMan.prototype.getMorale = function() { return 12; };
 LizardMan.prototype.getTreasureType = function() { return ["D"]; };
 LizardMan.getNumberAppearing = function(inLair = false)
 { 
    if(inLair)
    {
        return dice.rollDice("6D6");
    }
    else
    {
        return dice.rollDice("2D4"); 
    }
};

//------------------------------------------
//---      Lycanthrope Prototype      ---
//------------------------------------------

// TODO: if hit by Wolfsbane a lycanthrope must save vs poison or run away - wolfsbane can be swung or thrown like a normal weapon
// TODO: Transmit Lycanthropy - any character that losses more than 50% health to a lycanthrope will become one in 2 - 24 days
// TODO: they can be in human or wereform (in human form different AC and damage immunity does not apply)

function Lycanthrope()
{   
}

Lycanthrope.prototype = new Monster();
Lycanthrope.prototype.Constructor = Lycanthrope;
// TODO: immunity to damage types only applies in wereform
// TODO: they can be damaged by spells  
Lycanthrope.prototype.canOnlyBeDamagedBy = [immunityToDamageTypes.magicalWeapon,
                                            immunityToDamageTypes.silverWeapon];

//--------------------------------------------
//-----------------Wererat--------------------
//--------------------------------------------

// TODO: Summon 1D2 Gaint Rats who arrive in 1D4 turns

function Wererat()
 {
    this.Name = "Wererat";
    this.race = "lycanthrope";
    this.armourClass = 7;
    this.hitDice = "3";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1D4" }];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Chaotic;
 }

 Wererat.prototype = new Lycanthrope();
 Wererat.prototype.Constructor = Wererat;
 Wererat.prototype.movement = 120;
 Wererat.prototype.getMmorale = function() { return 8; };
 Wererat.prototype.getTreasureType = function() { return ["C"]; };
 Wererat.getNumberAppearing = function(inLair = false)
 { 
    if(inLair)
    {
        return dice.rollDice("2D8");
    }
    else
    {
        return dice.rollDice("1D8"); 
    }
};
Wererat.prototype.surpriseOpponent= function(diceResult)
{
    //Wererat surprise on a 1-4
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//-----------------Werewolf-------------------
//--------------------------------------------

// TODO: Summon 1D2 normal wolves who arrive in 1D4 turns

 function Werewolf()
  {
    this.Name = "Werewolf";
    this.race = "lycanthrope";
    this.armourClass = 5;
    this.hitDice = "4";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "2D4" }];
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Chaotic;
 }

 Werewolf.prototype = new Lycanthrope();
 Werewolf.prototype.Constructor = Werewolf;
 Werewolf.prototype.movement = 180;
 Werewolf.prototype.getMorale = function() { return 8; };
 Werewolf.prototype.getTreasureType = function() { return ["C"]; };
 Werewolf.getNumberAppearing = function(inLair = false)
 {
    if(inLair)
    {
        return dice.rollDice("2D6");
    }
    else{
        return dice.rollDice("1D6"); 
    }
};
Werewolf.getLeaderType = function() { return WerewolfLeader; };
Werewolf.leaderAlive = false;
Werewolf.mayHaveLeader = true;
Werewolf.noOfLeadersPresent = function(noAppearing)
{
    if(noAppearing >= 5)
    {
        return 1;
    }
    return 0;
};

//--------------------------------------------
//--------------------WerewolfLeader-------------
//--------------------------------------------

//Werewolf Leader appears when there are 5 or more werewolves

function WerewolfLeader() {
    this.name = "Werewolf Leader";
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "2D4+2" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //  this.Alignment = Chaotic;
}

WerewolfLeader.prototype = new Werewolf();
WerewolfLeader.prototype.Constructor = WerewolfLeader;
WerewolfLeader.prototype.setLeaderDead = function() { Werewolf.leaderAlive = false; };

//--------------------------------------------
//-----------------Wereboar-------------------
//--------------------------------------------

// TODO: semi intelligent
// TODO: Summon 1D2 normal boars who arrive in 1D4 turns
// TODO: in human form they get +2 damage and will fight to the death 

 function Wereboar()
  {
    this.Name = "Wereboar";
    this.race = "lycanthrope";
    this.armourClass = 4;
    this.hitDice = "4+1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Tusk", damageAmount: "2D6" }];
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Neutral;
}

Wereboar.prototype = new Lycanthrope();
Wereboar.prototype.Constructor = Wereboar;
Wereboar.prototype.movement = 150;
Wereboar.prototype.getMorale = function() { return 9; };
Wereboar.prototype.getTreasureType = function() { return ["C"]; };
Wereboar.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("2D4");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};

//--------------------------------------------
//-----------------Weretiger------------------
//--------------------------------------------

// TODO: Summon 1D2 Great Cats who arrive in 1D4 turns -- prefer tigers 

function Weretiger()
 {
    this.Name = "Weretiger";
    this.race = "lycanthrope";
    this.armourClass = 3;
    this.hitDice = "5";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6" },
                    { attackType: "Claw", damageAmount: "1D6" },      
                    { attackType: "Bite", damageAmount: "2D6" }];
    this.saveAs = { class: characterType.Fighter, level: 5 };
    //  this.Alignment = Neutral;
}

Weretiger.prototype = new Lycanthrope();
Weretiger.prototype.Constructor = Weretiger;
Weretiger.prototype.movement = 150;
Weretiger.prototype.getMorale = function() {return 9; };
Weretiger.prototype.getTreasureType = function() { return ["C"]; };
Weretiger.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("1D4");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};
Weretiger.prototype.surpriseOpponent= function(diceResult)
{
    //Weretiger surprise on a 1-4
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//-----------------Werebear-------------------
//--------------------------------------------

// TODO: Summon 1D2 of any type of bears who arrive in 1D4 turns

function Werebear()
 {
    this.Name = "Werebear";
    this.race = "lycanthrope";
    this.armourClass = 2;
    this.hitDice = "6";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Claw", damageAmount: specialDamage },
                    { attackType: "Claw", damageAmount: specialDamage },      
                    { attackType: "Bite", damageAmount: "2D8" }];
    this.saveAs = { class: characterType.Fighter, level: 6 };
    //  this.Alignment = Neutral;
}

Werebear.prototype = new Lycanthrope();
Werebear.prototype.Constructor = Werebear;
Werebear.prototype.movement = 120;
Werebear.prototype.getMorale = function() { return 10; };
Werebear.prototype.getTreasureType = function() { return ["C"]; };
Werebear.getNumberAppearing = function() 
{
    // always 1D4 even in lair 
    return dice.rollDice("1D4"); 
};
Werebear.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("2D4"));

    //check if previous claw attack hit
    if(noOfPreviousClawHits > 0)
    {
        opponent.takeDamage(dice.rollDice("2D8"));
    }
};

//--------------------------------------------
//-----------------Medium---------------------
//--------------------------------------------

function Medium()
 {
    this.name = "Medium";
    this.race = "humanoid";
    this.armourClass = 9;
    this.hitDice = "1";
    this.hitDiceStars = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d4" }]; // TODO: use a spell
    this.saveAs = { class: characterType.MagicUser, level: 1 };
    //  this.Alignment = Neutral / Lawful / Chaotic; 
    this.firstLevelSpells = 1;
 }

 Medium.prototype = new Monster();
 Medium.prototype.Constructor = Medium;
 Medium.prototype.movement = 120;
 Medium.prototype.getMorale = function() { return 7; };
 Medium.prototype.getTreasureType = function() { return ["V"]; };
 Medium.getNumberAppearing = function(inLair = false)
 {
    if(inLair)
    {
        return dice.rollDice("1D12");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};
Medium.getLeaderType = function() { return MediumMaster; };
Medium.leaderAlive = false;
Medium.mayHaveLeader = true;
Medium.noOfLeadersPresent = function(noAppearing)
{
    //there is a 50%  chance mediums will have a leader
    if (dice.rollDice("1D2") === 1)
    {
        return 1;
    }
    return 0;
};

//--------------------------------------------
//--------------------MediumMaster------------
//--------------------------------------------

//50% chance mediums will have master

function MediumMaster() {
    this.name = "Medium Master";
    this.hitDice = "3";
    this.hitDiceStars = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d4" }]; // TODO: use a spell
    this.saveAs = { class: characterType.MagicUser, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //  this.Alignment = Chaotic;
    this.firstLevelSpells = 2;
    this.secondLevelSpells = 1;
}

MediumMaster.prototype = new Medium();
MediumMaster.prototype.Constructor = MediumMaster;
MediumMaster.prototype.setLeaderDead = function() { Medium.leaderAlive = false; };

//--------------------------------------------
//-----------------Medusa---------------------
//--------------------------------------------

// TODO: PetrifyingGaze - will turn viewer into stone unless save vs turn to stone (including itself)
// TODO: attacking a medusa without looking directly at it will be done with a -4 toHit
//       when attacking this way the medusa get a +2 toHit 
// TODO: they get +2 saving throw vs spells 

function Medusa()
{
    this.name = "Medusa";
    this.race = "????";                 // not sure 
    this.armourClass = 8;
    this.hitDice = "4";
    this.hitDiceStars = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Snakebite", damageAmount: specialDamage }];  
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Chaotic; 
}

Medusa.prototype = new Monster();
Medusa.prototype.Constructor = Medusa;
Medusa.prototype.movement = 90;
Medusa.prototype.getMorale = function() { return 8; };
Medusa.prototype.getTreasureType = function() { return ["F"]; };
Medusa.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("1D4");
    }
    else
    {
        return dice.rollDice("1D3"); 
    }
};
Medusa.prototype.specialDamage = function(opponent)
{
    // bite from snakes on head
    opponent.takeDamage(dice.rollDice("1D6"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        // die in 1 turn
        opponent.isDead= true; 
    }
};

//--------------------------------------------
//-----------------Minotaur---------------------
//--------------------------------------------

// TODO: instead of the Gore and bite they can use use a weapon - weapon damage is +2

function Minotaur()
{
    this.name = "Minotaur";
    this.race = "????";  //to be decided
    this.armourClass = 6;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Gore", damageAmount: "1d6" }, 
                    { attackType: "Bite", damageAmount: "1d6" } ];   
    this.saveAs = { class: characterType.Fighter, level: 6 };
    //  this.Alignment = Chaotic; 
}

Minotaur.prototype = new Monster();
Minotaur.prototype.Constructor = Minotaur;
Minotaur.prototype.movement = 120;
Minotaur.prototype.getMorale = function() { return 12; };
Minotaur.prototype.getTreasureType = function() { return ["C"]; };
Minotaur.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("1D8");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};

//--------------------------------------------
//-----------------Mule-----------------------
//--------------------------------------------

// TODO: a mule can carry 2000gp - it can carry 4000gp but its movement drops to 60 

function Mule() 
{
    this.name = "Mule";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1d3" } ]; //TODO: rather than bite it can kick - 1D4 damage 
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    //  this.Alignment = Neutral; 
}

Mule.prototype = new Monster();
Mule.prototype.Constructor = Mule;
Mule.prototype.movement = 120;
Mule.prototype.getMorale = function() { return 8; };
Mule.prototype.getTreasureType = function() { return []; }; 
Mule.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("2D6");
    }
    else
    {
        return dice.rollDice("1D8"); 
    }   
};

//--------------------------------------------
//-----------Neaderthal (Caveman)-------------
//--------------------------------------------

// TODO: can use weapon -- with damage +1

function Neaderthal() 
{
    this.name = "Neaderthal";
    this.race = "humanoid";
    this.armourClass = 8;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Punch", damageAmount: "2d4" } ];  
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Lawful; 
}

Neaderthal.prototype = new Monster();
Neaderthal.prototype.Constructor = Neaderthal;
Neaderthal.prototype.movement = 120;
Neaderthal.prototype.getMorale = function() { return 7; };
Neaderthal.prototype.getTreasureType = function() { return ["C"]; };
Neaderthal.getNumberAppearing = function(inLair = false) 
{ 
    if(inLair)
    {
        return dice.rollDice("10D4");
    }
    else
    {
        return dice.rollDice("1D10"); 
    }
};
Neaderthal.getLeaderType = function() { return WerewolfLeader; };
Neaderthal.leaderAlive = false;
Neaderthal.mayHaveLeader = true;
Neaderthal.noOfLeadersPresent = function(noAppearing, inLair = false)
{
    if(inLair)
    {
        return 2;
    }
    return 0;
};

//--------------------------------------------
//---------------NeaderthalLeader-------------
//--------------------------------------------

// 2 Neaderthal Leaders appears when they are in their lair

function NeaderthalLeader() {
    this.name = "Neaderthal Leader";
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "Punch", damageAmount: "2d4" } ]; 
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //  this.Alignment = Lawful;
}

NeaderthalLeader.prototype = new Neaderthal();
NeaderthalLeader.prototype.Constructor = NeaderthalLeader;
NeaderthalLeader.prototype.setLeaderDead = function() { Neaderthal.leaderAlive = false; };

//--------------------------------------------
//-----------------Noble----------------------
//--------------------------------------------

// TODO: will be accompanied by a squire 2nd level
// TODO: usually also 10 retainers of level 1 fighters

function Noble() 
{
    this.name = "Noble";
    this.race = "human";
    this.armourClass = 2;
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d8" } ];  
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Lawful / Neutral / Chaotic; 
}

Noble.prototype = new Monster();
Noble.prototype.Constructor = Noble;
Noble.prototype.movement = 60;
Noble.prototype.getMorale = function() { return 8; };
Noble.prototype.getTreasureType = function() { return ["V", "V", "V"]; };
Noble.getNumberAppearing = function() 
{ 
    //always 2D6
    return dice.rollDice("2D6"); 
};

//--------------------------------------------
//-----------------Normal Human---------------
//--------------------------------------------

// TODO: weapon damage depends type of weapon used but set to 1D6 as a default  

function NormalHuman() 
{
    this.name = "Normal Human";
    this.race = "human";
    this.armourClass = 9;
    this.hitDice = "0.5";      
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d6" } ];  
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    //  this.Alignment = usually Lawful; 
}

NormalHuman.prototype = new Monster();
NormalHuman.prototype.Constructor = NormalHuman;
NormalHuman.prototype.movement = 120;
NormalHuman.prototype.getMorale = function() { return 6; };
NormalHuman.prototype.getTreasureType = function() { return ["U"]; }; 
NormalHuman.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("1D20");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};

//--------------------------------------------
//-----------------NPC party members----------
//--------------------------------------------


//   NPC parties //

//--------------------------------------------
//-----------------OchreJelly----------------
//--------------------------------------------

// TODO: disolves wood, leather and cloth in a round but it cannot dissolve metal or stone 
// it can Seeps Through Cracks
// TODO: attackes with weapons or lightening only makes 1D4 smaller ochreJellys - 2hitDice damage 1D6

function OchreJelly() 
{
    this.name = "Ochre Jelly";
    this.race = "slime";
    this.armourClass = 8;
    this.hitDice = "5";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Disolve", damageAmount: "2d6" } ];  
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Neutral; 
}

OchreJelly.prototype = new Monster();
OchreJelly.prototype.Constructor = OchreJelly;
OchreJelly.prototype.movement = 30;
OchreJelly.prototype.getMorale = function() { return 12; };
OchreJelly.prototype.getTreasureType = function() { return []; };
OchreJelly.getNumberAppearing = function() { return 1; };
OchreJelly.prototype.canOnlyBeDamagedBy = [immunityToDamageTypes.fireDamage,
                                           immunityToDamageTypes.coldDamage];

//--------------------------------------------
//--------------------Ogre--------------------
//--------------------------------------------

function Ogre() 
{
    this.name = "Ogre";
    this.race = "humanoid";
    this.armourClass = 5;
    this.hitDice = "4+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d10" }];
    this.saveAs = { class: characterType.Fighter, level: 4 };
    //  this.Alignment = Chaotic; 
}

Ogre.prototype = new Monster();
Ogre.prototype.Constructor = Ogre;
Ogre.prototype.movement = 90;
Ogre.prototype.getMorale = function() { return 10; };
Ogre.prototype.getTreasureType = function() 
{ 
    if(this.inWilderness)
    {
        return ["C", dice.rollDice("1D6") * 100];   // the 100-600 is gp 
    }
    else 
    {
        return ["C", 1000];       // the 1000 is 1000gp 
    }
 }; 
Ogre.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("2D6");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};

//--------------------------------------------
//--------------------Orc---------------------
//--------------------------------------------

// TODO: hate sunlight - 1 Attack in Daylight
// TODO: can use weapon 
// TODO: in the lair for every 20 orcs there will be a 1 in 1D6 chance of there being an ogre
// TODO: in the lair there is a 1 in 1D10 chance of there being a troll

function Orc()
{
    this.name = "Orc";
    this.race = "humanoid";
    this.armourClass = 6;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Chaotic;
}

Orc.prototype = new Monster();
Orc.prototype.Constructor = Orc;
Orc.prototype.movement = 120;
Orc.prototype.getMorale = function() 
{
    if(this.leaderAlive)
    {
        return 8; 
    }
    else
    {
        return 6;
    }
};
Orc.prototype.getTreasureType = function() { return ["D"]; };  
Orc.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("10D6");
    }
    else
    {
        return dice.rollDice("2D8"); 
    }
};
Orc.getLeaderType = function() { return OrcLeader; };
Orc.getChieftainType = function() { return OrcChieftain; };
Orc.leaderAlive = false;
Orc.mayHaveLeader = true;
Orc.noOfLeadersPresent = function(noAppearing)
{
    return 1;
};
Orc.chieftainAlive = false;
Orc.mayHaveChieftain = true;

//--------------------------------------------
//---------------OrcLeader--------------------
//--------------------------------------------

// Orc Leader appears within ANY group of orcs

function OrcLeader() {
    this.name = "Orc Leader";
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6+1" }];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.leader = true;
    //  this.Alignment = Chaotic;
}

OrcLeader.prototype = new Orc();
OrcLeader.prototype.Constructor = OrcLeader;
OrcLeader.prototype.setLeaderDead = function() { Orc.leaderAlive = false; };

//--------------------------------------------
//----------------OrcChieftain----------------
//--------------------------------------------

function OrcChieftain() 
{
    this.name = "Orc Chieftain";
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6+2" }];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) }; 
    this.chieftain = true;
}

OrcChieftain.prototype = new Orc();
OrcChieftain.prototype.Constructor = OrcChieftain;
OrcChieftain.prototype.setChieftainDead = function() { Orc.chieftainAlive = false; };
OrcChieftain.numberOfBodyGuards = 0;

//--------------------------------------------
//--------------------OwlBear-----------------
//--------------------------------------------

function OwlBear()
{
    this.name = "Owl Bear";
    this.race = "?????"; //to be decided 
    this.armourClass = 5;
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Claw", damageAmount: specialDamage }, 
                    { attackType: "Claw", damageAmount: specialDamage },
                    { attackType: "Bite", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Neutral;
}

OwlBear.prototype = new Monster();
OwlBear.prototype.Constructor = OwlBear;
OwlBear.prototype.movement = 120;
OwlBear.prototype.getMorale = function() { return 9; };
OwlBear.prototype.getTreasureType = function() { return ["C"]; };  
OwlBear.getNumberAppearing = function() { return dice.rollDice("1D4"); };
OwlBear.prototype.clawDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D8"));

    //check if previous claw attack hit
    if(noOfPreviousClawHits > 0)
    {
        opponent.takeDamage(dice.rollDice("2D8"));
    }
};

//--------------------------------------------
//--------------------Pixie-------------------
//--------------------------------------------

// TODO: invisible unless they want to be seen
// TODO: if they attack when invisible they stay invisible.  They will always surprise when attacking 
//       when they are invisible they cannot be attacked in round 1 but after that they can be at -2 toHit 
// TODO: they can only fly for 3 turns

function Pixie()
{
    this.name = "Pixie";
    this.race = "humanoid";
    this.armourClass = 3;
    this.hitDice = "1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D4" }];
    this.saveAs = { class: characterType.Elf, level: 1 };
    //  this.Alignment = Neutral;
}

Pixie.prototype = new Monster();
Pixie.prototype.Constructor = Pixie;
Pixie.prototype.movement = 90;
Pixie.prototype.flyMovement = 180;
Pixie.prototype.getMorale = function() { return 7; };
Pixie.prototype.getTreasureType = function() { return ["R", "S"]; };   
Pixie.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("10D4");
    } 
    else
    {
        return dice.rollDice("2D4"); 
    }
};

//------------------------------------------
//---      Rat Prototype      ---
//------------------------------------------

// TODO: no penalties for fighting in water

function Rat()
{   
}

Rat.prototype = new Monster();
Rat.prototype.Constructor = Rat;
Rat.prototype.diseaseAttack = function()
{
    //is the rat carrying a disease
    if(dice.rollDice("1D20" === 1))
    {
        //save to avoid catching disease
        if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
        {
            //the character gets a disease 

            if(dice.rollDice("1D4" === 1))
            {
                //opponent will die in 1D6 days
            }
            else
            {
                //opponent will be bed ridden for a month
            }
        }
    }
};

//--------------------------------------------
//----------------Normal Rat------------------
//--------------------------------------------

// TODO: attack in packs of 5-10 rates.  If there are more than 10 rats they will attack more than 1 individual.  

function RatNormal()
{
    this.name = "Normal Rat";
    this.race = "animal";
    this.armourClass = 9;
    this.hitDice = "0.1";                        
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "PackBite", damageAmount: specialDamage }];  //is for the pack not individual
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    //  this.Alignment = Neutral;
}

RatNormal.prototype = new Rat();
RatNormal.prototype.Constructor = RatNormal;
RatNormal.prototype.movement = 60;
RatNormal.prototype.swimMovement = 30;
RatNormal.prototype.getMorale = function() { return 5; };
RatNormal.prototype.getTreasureType = function() { return ["L"]; }; 
RatNormal.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("2D10");
    }
    else
    {
        return dice.rollDice("5D10"); 
    }
};
RatNormal.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D6"));
    this.diseaseAttack();
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.DeathRayPoison, dice.rollDice("1D20")))
    {
        // TODO rats will climb all over a character so they must save vs Death or be knocked down - while down a character cannot fight
        opponent.isKnockedDown = true;
    }
};

//--------------------------------------------
//----------------Giant Rat------------------
//--------------------------------------------

function RatGiant()
{
    this.name = "Giant Rat";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "0.5";                          
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

RatGiant.prototype = new Rat();
RatGiant.prototype.Constructor = RatGiant;
RatGiant.prototype.movement = 120;
RatGiant.prototype.swimMovement = 60;
RatGiant.prototype.getMorale = function() { return 8; };
RatGiant.prototype.getTreasureType = function() { return ["C"]; }; 
RatGiant.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("3D10");
    }
    else
    {
        return dice.rollDice("3D6"); 
    }
};
RatGiant.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
    this.diseaseAttack();
};

//--------------------------------------------
//--------------------Robber Fly--------------
//--------------------------------------------

// TODO: unhurt by killer bee poison
// TODO: leap into combat from 30 away

function RobberFly()
{
    this.name = "Robber Fly";
    this.race = "?????";             //not sure 
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

RobberFly.prototype = new Monster();
RobberFly.prototype.Constructor = RobberFly;
RobberFly.prototype.movement = 90;
RobberFly.prototype.flyMovement = 180;
RobberFly.prototype.getMorale = function() { return 8; };
RobberFly.prototype.gteTreasureType = function() { retunr ["U"]; }; 
RobberFly.getNumberAppearing = function(inLair) 
{
    if(inLair)
    {
        return dice.rollDice("2D6");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};
RobberFly.prototype.surpriseOpponent= function(diceResult)
{
    //robber flies surprise on a 1-4
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//--------------------Rock Baboon-------------
//--------------------------------------------

function RockBaboon()
{
    this.name = "Rock Baboon";
    this.race = "animal";            
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" },
                    { attackType: "Bite", damageAmount: "1D3" }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

RockBaboon.prototype = new Monster();
RockBaboon.prototype.Constructor = RockBaboon;
RockBaboon.prototype.movement = 120;
RockBaboon.prototype.getMorale = function() { return 8; };
RockBaboon.prototype.getTreasureType = function() { return ["U"]; }; 
RockBaboon.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("5D6");
    } 
    else
    {
        return dice.rollDice("2D6"); 
    }
};

//--------------------------------------------
//--------------------Rust Monster------------
//--------------------------------------------

function RustMonster()
{
    this.name = "Rust Monster";
    this.race = "?????";        //not sure 
    this.armourClass = 2;
    this.hitDice = "5";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: UnspecifiedAttck, damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Neutral;
}

RustMonster.prototype = new Monster();
RustMonster.prototype.Constructor = RustMonster;
RustMonster.prototype.movement = 120;
RustMonster.prototype.getMorale = function() { return 7; };
RustMonster.prototype.getTreasureType = function() { return []; }; 
RustMonster.getNumberAppearing = function() { return dice.rollDice("1D4"); };
RustMonster.prototype.specialDamage = function(opponent)
{
    // TODO: any time a rust monster is hit or hits -- the weapon or armour will rust and become useless
    // TODO: if the weapon/armour is magical they have 10% for each +1 of not being affected - if hit the item loses +1
};

//--------------------------------------------
//--------------------Shadow------------------
//--------------------------------------------
 
//immune to charm and sleep

function Shadow()
{
    this.name = "Shadow";
    this.race = "????";      //not sure 
    this.armourClass = 7;
    this.hitDice = "2+2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "TouchAttack", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Chaotic;
}

Shadow.prototype = new Monster();
Shadow.prototype.Constructor = Shadow;
Shadow.prototype.movement = 90;
Shadow.prototype.getMorale = function() { return 12; };
Shadow.prototype.getTreasureType = function() { return ["F"]; }; 
Shadow.prototype.canOnlyBeDamagedBy = [ immunityToDamageTypes.magicalWeapon ];
Shadow.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("1D12");
    }
    else
    {
        return dice.rollDice("1D8"); 
    }
};
Shadow.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D4"));
    //TODO: if hit an opponent loses 1 strenght for 8 turns
    //TODO: if a characters strength reaches 0 they become a shadow
};
Shadow.prototype.surpriseOpponent= function(diceResult)
{
    //Shadows surprise on a 1-5
    if(diceResult <= 5)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//---------------Shrew Giant------------------
//--------------------------------------------

// TODO: see in the dark up to 60 away
// TODO: see by echo location so a silence spell will blind them - if blind it will have AC8 and -4toHit
// TODO: due to their speed they will always have initative in the first attack and get +1 for the second attack
// TODO: any creaturing fighting 1 that is level 3 or less needs to make a save vs death or run away

function ShrewGiant()
{
    this.name = "Giant Shrew";
    this.race = "animal";  
    this.armourClass = 4;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Bite", damageAmount: "1D6" },
                    { attackType: "Bite", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

ShrewGiant.prototype = new Monster();
ShrewGiant.prototype.Constructor = ShrewGiant;
ShrewGiant.prototype.movement = 180;
ShrewGiant.prototype.getMorale = function() { return 10; };
ShrewGiant.prototype.getTreasureType = function() { return []; }; 
ShrewGiant.getNumberAppearing = function(inLair = false)
{ 
    if(inLair)
    {
        return dice.rollDice("1D8");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};

//--------------------------------------------
//---------------Shrieker---------------------
//--------------------------------------------

// look like giant mushrooms
// not really such thing as an attack see next comment
// TODO: if they detect light or movement they shreik for 1D3 rounds - -50% chance it will attack a wandering monster in 2-12 turns

function Shrieker()
{
    this.name = "Shrieker";
    this.race = "?????";        //not sure  
    this.armourClass = 7;
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [ ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

Shrieker.prototype = new Monster();
Shrieker.prototype.Constructor = Shrieker;
Shrieker.prototype.movement = 9;
Shrieker.prototype.getMorale = function() { return 12; };
Shrieker.prototype.getTreasureType = function() { return []; }; 
Shrieker.getNumberAppearing = function() { return dice.rollDice("1D8"); };

//--------------------------------------------
//---------------Skeleton---------------------
//--------------------------------------------

// TODO: Immune to sleep, charm and mind reading

function Skeleton() 
{
    this.name = "Skeleton";
    this.race = "undead";
    this.armourClass = 7;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [{ attackType: "WeaponAttack", damageAmount: "1d6" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Chaotic;
}

Skeleton.prototype = new Monster();
Skeleton.prototype.Constructor = Skeleton;
Skeleton.prototype.movement = 60;
Skeleton.prototype.getMorale = function() { return 12; };
Skeleton.prototype.getTreasureType = function() { return []; }; 
Skeleton.getNumberAppearing = function(inLair = false) 
{
    if(inLair)
    {
        return dice.rollDice("1D10");
    }
    else
    {
        return dice.rollDice("3D4"); 
    }
};

//------------------------------------------
//---      Snake Prototype      ---
//------------------------------------------

function Snake()
{   
}

Snake.prototype = new Monster();
Snake.prototype.Constructor = Snake;

//--------------------------------------------
//---------------Spitting Cobra---------------
//--------------------------------------------

function SpittingCobra() 
{
    this.name = "Spitting Cobra";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "1";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: SpecialDamage }, 
                    { attackType: "Spit", damageAmount: SpecialDamage } ]; //TODO: snake can only spit OR bite - current bite is implemented
                                                                           //TODO: can spit up to 6
                                                                           //TODO: if hit be spit opponent is blinded - cure by cure blindness
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

SpittingCobra.prototype = new Snake();
SpittingCobra.prototype.Constructor = SpittingCobra;
SpittingCobra.prototype.movement = 90;
SpittingCobra.prototype.getMorale = function() { return 7; };
SpittingCobra.prototype.getTreasureType = function() { return []; }; 
SpittingCobra.getNumberAppearing = function() { return dice.rollDice("1D6"); };
SpittingCobra.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isDead = true;
        //TODO: opponent will die in 1 to 10 turns
    }
};


//--------------------------------------------
//---------------Pit Viper--------------------
//--------------------------------------------

//TODO: they always get initative due to their quickness
//TODO : can see heat up to 60 

function PitViper() 
{
    this.name = "Pit Viper";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: SpecialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

PitViper.prototype = new Snake();
PitViper.prototype.Constructor = PitViper;
PitViper.prototype.movement = 90;
PitViper.prototype.getMorale = function() { return 7; };
PitViper.prototype.getTreasureType = function() { return []; }; 
PitViper.getNumberAppearing = function() { return dice.rollDice("1D8"); };
PitViper.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D4"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isDead = true;
    }
};

//--------------------------------------------
//---------------Sea Snake--------------------
//--------------------------------------------

function SeaSnake() 
{
    this.name = "Sea Snake";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "3";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: SpecialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

SeaSnake.prototype = new Snake();
SeaSnake.prototype.Constructor = SeaSnake;
SeaSnake.prototype.swimMovement = 90;
SeaSnake.prototype.getMorale = function() { return 7; };
SeaSnake.prototype.getTreasureType = function() { return []; }; 
SeaSnake.getNumberAppearing = function() { return dice.rollDice("1D8"); };
SeaSnake.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(1);
    //TODO: bite can go unnoticed 50% of the time 

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isDead = true;
        //TODO: will be felt in 3-6 turns 
        //TODO: only 25% chance that even if treated after felt the opponent will survive
    }
};

//--------------------------------------------
//---------------Giant Rattler-----------------
//--------------------------------------------

function GiantRattler() 
{
    this.name = "Giant Rattler";
    this.race = "animal";
    this.armourClass = 5;
    this.hitDice = "4";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: SpecialDamage },
                    { attackType: "Bite", damageAmount: SpecialDamage } ]; //TODO: very fast and get a 2nd attack at the end of the round 
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

GiantRattler.prototype = new Snake();
GiantRattler.prototype.Constructor = GiantRattler;
GiantRattler.prototype.movement = 120;
GiantRattler.prototype.getMorale = function() { return 8; };
GiantRattler.prototype.getTreasureType = function() { return ["U"]; }; 
GiantRattler.getNumberAppearing = function() { return dice.rollDice("1D4"); };
GiantRattler.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D4"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        opponent.isDead = true;
        //TODO: death in 1-6 turns 
    }
};

//--------------------------------------------
//---------------Rock Python------------------
//--------------------------------------------

function RockPython() 
{
    this.name = "Rock Python";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "5";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: "1D4" },
                    { attackType: "Squeeze", damageAmount: "2D4" } ]; // TODO: the second attack happens if the first was successful
                                                                      //        no roll to hit and is automatic every turn after that 
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    //  this.Alignment = Neutral;
}

RockPython.prototype = new Snake();
RockPython.prototype.Constructor = RockPython;
RockPython.prototype.movement = 90;
RockPython.prototype.getMorale = function() { return 8; };
RockPython.prototype.getTreasureType = function() { return ["U"]; };
RockPython.getNumberAppearing = function() { return dice.rollDice("1D3"); };

//------------------------------------------
//---      Spider Giant Prototype      ---
//------------------------------------------

function SpiderGiant()
{   
}

SpiderGiant.prototype = new Monster();
SpiderGiant.prototype.Constructor = SpiderGiant;

//--------------------------------------------
//---------------CrabSpider-------------------
//--------------------------------------------

function CrabSpider() 
{
    this.name = "Crab Spider";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

CrabSpider.prototype = new SpiderGiant();
CrabSpider.prototype.Constructor = CrabSpider;
CrabSpider.prototype.movement = 120;
CrabSpider.prototype.getMorale = function() { return 7; };
CrabSpider.prototype.getTreasureType = function() { return ["U"]; }; 
CrabSpider.getNumberAppearing = function() { return dice.rollDice("1D4"); };
CrabSpider.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D8"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs.DeathRayPoison), dice.rollDice("1D20")+2)
    {
        //TODO: poison weakens and means all saving throws at +2
        opponent.isDead = true;
        //TODO: death in 1 to 4 turns
    }
};
CrabSpider.prototype.surpriseOpponent= function(diceResult)
{
    //surpirse on 1 to 4 of 1D6
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//---------------BlackWidow-------------------
//--------------------------------------------

//TODO: they have webs - to escape a web see magic user web spell 

function BlackWidow() 
{
    this.name = "Black Widow";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "3";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

BlackWidow.prototype = new SpiderGiant();
BlackWidow.prototype.Constructor = BlackWidow;
BlackWidow.prototype.movement = 60;
BlackWidow.prototype.webMovement = 120;
BlackWidow.prototype.getMorale = function() { return 8; };
BlackWidow.prototype.getTreasureType = function() { return ["U"]; }; 
BlackWidow.getNumberAppearing = function() { return dice.rollDice("1D3"); };
BlackWidow.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("2D6"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs.DeathRayPoison), dice.rollDice("1D20"))
    {
        opponent.isDead = true;
        //TODO: death in 1 turn
    }
};

//--------------------------------------------
//---------------Tarantella-------------------
//--------------------------------------------

function Tarantella() 
{
    this.name = "Tarantella";
    this.race = "animal";
    this.armourClass = 5;
    this.hitDice = "4";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

Tarantella.prototype = new SpiderGiant();
Tarantella.prototype.Constructor = Tarantella;
Tarantella.prototype.movement = 120;
Tarantella.prototype.getMorale = function() { return 8; };
Tarantella.prototype.getTreasureType = function() { return ["U"]; };
Tarantella.getNumberAppearing = function() { return dice.rollDice("1D3"); };
Tarantella.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D8"));

    if(!savingThrow.isSavingThrowMade(opponent.saveAs.DeathRayPoison), dice.rollDice("1D20"))
    {
        //TODO: opponent starts to dance 
        //      on lookers must save vs spells or dance too - for as long as the original dancer is dancing
        //      when dancing you have -4 toHit and attackers get +4 toHit
        //      lasts 2-12 turns but after 5 the opponent is exhausted and will be automatically hit and unable to attack
        //      dispel magic ends the dance
    }
};

//--------------------------------------------
//---------------Sprite-----------------------
//--------------------------------------------

function Sprite() 
{
    this.name = "Sprite";
    this.race = "humaniod";
    this.armourClass = 5;
    this.hitDice = "0.5";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 

    this.damage = [ { attackType: "Spell", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Elf, level: 1 };
    //  this.Alignment = Neutral;
    this.firstLevelSpells = 1;
}

Sprite.prototype = new Monster();
Sprite.prototype.Constructor = Sprite;
Sprite.prototype.movement = 60;
Sprite.prototype.flyMovement = 180;
Sprite.prototype.getMorale = function() { return 7; };
Sprite.prototype.getTreasureType = function() { return ["S"]; };
Sprite.getNumberAppearing = function(inLair) 
{ 
    if(inLair)
    {
        return dice.rollDice("5D8");
    }
    else
    {
        return dice.rollDice("3D6"); 
    }
};
Sprite.prototype.specialDamage = function(opponent)
{
    //TOD): if there are 5 sprites or more they will curse an opponent -- they dont try and cause death 
    //       they attempt to cause mischief like making your nose grow or nipping a character continously
    //       use remove curse to get rid of this
};

//--------------------------------------------
//---------------Stirge-----------------------
//--------------------------------------------

//TODO: a flying stirge gets +2 toHit on its first attack

function Stirge() 
{
    this.name = "Stirge";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

Stirge.prototype = new Monster();
Stirge.prototype.Constructor = Stirge;
Stirge.prototype.movement = 30;
Stirge.prototype.flyMovement = 180;
Stirge.prototype.getMorale = function() { return 9; };
Stirge.prototype.getTreasureType = function() { return ["L"]; };
Stirge.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("3D12");
    }
    else
    {
        return dice.rollDice("1D10"); 
    } 
};
Stirge.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
    //TODO: once hit they attach themselves to the opponent and will do 1D3 damage each round
    //      this will continue till it or the opponent is dead 
};

//--------------------------------------------
//---------------Thoul-----------------------
//--------------------------------------------

//TODO: they regenerate 1 hp per round
//TODO: they can use weapons

function Thoul() 
{
    this.name = "Thoul";
    this.race = "?????";     /// to be decided 
    this.armourClass = 6;
    this.hitDice = "3";
    this.hitDiceStars = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Claw", damageAmount: specialDamage },
                    { attackType: "Claw", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 3 };
    //  this.Alignment = Chaotic;
}

Thoul.prototype = new Monster();
Thoul.prototype.Constructor = Thoul;
Thoul.prototype.movement = 120;
Thoul.prototype.getMorale = function() { return 10; };
Thoul.prototype.getTreasureType = function() { return ["C"]; }; 
Thoul.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("1D10");    
    } 
    else
    {
        return dice.rollDice("1D6"); 
    }
};
Thoul.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
    if(!savingThrow.isSavingThrowMade(opponent.saveAs.ParalysisTurnToStone), dice.rollDice("1D20"))
    {
        opponent.isParalysised = true;
        opponent.paralysisedDuration = dice.rollDice("2D4");
    }
};
Thoul.prototype.regenerateHp = function()
{
    this.currentHitPoints = this.currentHitPoints + 1;
};

//--------------------------------------------
//---------------Trader-----------------------
//--------------------------------------------

//TODO: in the wildeness they will usually have 1-4 pack mules with goods 


function Trader() 
{
    this.name = "Trader";
    this.race = "human";     
    this.armourClass = 6;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Chaotic/Neutral/Lawful;
}

Trader.prototype = new Monster();
Trader.prototype.Constructor = Trader;
Trader.prototype.movement = 120;
Trader.prototype.getMorale = function() { return 7; };
Trader.prototype.getTreasureType = function() { return ["U", "V"]; };
Trader.getNumberAppearing = function(inLair = false) {
    if(inLair)
    {
        return dice.rollDice("3D6");
    }
    else
    {
        return dice.rollDice("1D8"); 
    }
};

//--------------------------------------------
//---------------Troglodyte-------------------
//--------------------------------------------

//TODO: smelly secreation - humans and demi-humans must save vs poison or have -2 toHit them in melee combat

function Troglodyte() 
{
    this.name = "Troglodyte";
    this.race = "humanoid";          
    this.armourClass = 5;
    this.hitDice = "2";
    this.hitDiceStars = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 

    this.damage = [ { attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Claw", damageAmount: "1D4" },
                    { attackType: "Bite", damageAmount: "1D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };

    //  this.Alignment = Chaotic;
}

Troglodyte.prototype = new Monster();
Troglodyte.prototype.Constructor = Troglodyte;
Troglodyte.prototype.movement = 120;
Troglodyte.prototype.getMorale = function() { return 9; };
Troglodyte.prototype.getTreasureType = function() { return ["A"]; };   
Troglodyte.getNumberAppearing = function(inLair = false)
{
    if(inLair)
    {
        return dice.rollDice("5D8");
    }
    else
    {
        return dice.rollDice("1D8"); 
    }
};
Troglodyte.prototype.surpriseOpponent= function(diceResult)
{
    // suprise on a 1-4 of a 1D6
    if(diceResult <= 4)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//--------------------------------------------
//---------------Veteran-----------------------
//--------------------------------------------

function Veteran() 
{
    this.name = "Veteran";
    this.race = "human";     
    this.armourClass = 2;
    this.hitDice = this.GetHitDice(); 
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: parseInt(this.hitDice) };   
    //  this.Alignment = Chaotic/Neutral/Lawful;
}

Veteran.prototype = new Monster();
Veteran.prototype.Constructor = Veteran;
Veteran.prototype.movement = 60;
Veteran.prototype.getMorale = function() { return 9; };
Veteran.prototype.getTreasureType = function() { return ["V"]; }; 
Veteran.prototype.GetHitDice = function()
{
    //hit dice are 1-3
    var result = dice.rollDice("1D6");
    return Math.floor(result/2);  
};
Veteran.getNumberAppearing = function(inLair) 
{
    if(inLair)
    {
        return dice.rollDice("2D6");
    }
    else
    {
        return dice.rollDice("2D4"); 
    }
};

//--------------------------------------------
//---------------Wight-----------------------
//--------------------------------------------

function Wight() 
{
    this.name = "Wight";
    this.race = "undead";
    this.armourClass = 5;
    this.hitDice = "3";
    this.hitDiceStars = 1; 
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "touchAttack", damageAmount: specialDamage} ];
    this.saveAs = { class: characterType.Fighter, level: 3 };  
    //  this.Alignment = Chaotic
}

Wight.prototype = new Monster();
Wight.prototype.Constructor = Wight;
Wight.prototype.movement = 90;
Wight.prototype.getMorale = function() { return 12; };
Wight.prototype.getTreasureType = function() { return ["B"]; };
Wight.prototype.canOnlyBeDamagedBy = [immunityToDamageTypes.magicalWeapon, immunityToDamageTypes.silverWeapon];
Wight.getNumberAppearing = function(inLair) 
{
    if(inLair)
    {
        return dice.rollDice("1D8");
    }
    else
    {
        return dice.rollDice("1D6"); 
    }
};
Wight.prototype.specialDamage = function(opponent)
{
    //TODO: drains a level from the opponent (loss experience to go back to mid point of last level) 
    //      anyone who is killed in this way will become a wight in 1D4 days - they will be under control of the wight that created them
    //      also lose 1 hit dice of hps
};

//------------------------------------------
//---             Wolf Prototype         ---
//------------------------------------------

function Wolf()
{   
}

Wolf.prototype = new Monster();
Wolf.prototype.Constructor = Wolf;

//--------------------------------------------
//---------------NormalWolf-------------------
//--------------------------------------------

function NormalWolf() 
{
    this.name = "Normal Wolf";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "2+2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Neutral;
}

NormalWolf.prototype = new Wolf();
NormalWolf.prototype.Constructor = NormalWolf;
NormalWolf.prototype.movement = 180;
NormalWolf.prototype.getMorale = function() 
{
    //TODO: if 3 or less wolves or 50% killed their moral drops to 6
    return 8; 
};
NormalWolf.prototype.getTreasureType = function() { return []; }; 
NormalWolf.getNumberAppearing = function(inLair)
{
    if(inLair)
    {
        return dice.rollDice("3D6");
    } 
    else
    {
        return dice.rollDice("2D6"); 
    }
};

//--------------------------------------------
//-----------------DireWolf-------------------
//--------------------------------------------

function DireWolf() 
{
    this.name = "Dire Wolf";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = "4+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.damage = [ { attackType: "Bite", damageAmount: "2D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

DireWolf.prototype = new Wolf();
DireWolf.prototype.Constructor = DireWolf;
DireWolf.prototype.movement = 150;
DireWolf.prototype.getMorale = function() { return 8; };
DireWolf.prototype.getTreasureType = function() { return []; }; 
DireWolf.getNumberAppearing = function(inLair) 
{
    if(inLair)
    {
        return dice.rollDice("2D4");
    }
    else
    {
        return dice.rollDice("1D4"); 
    }
};

//--------------------------------------------
//---------------Yellow Mold------------------
//--------------------------------------------

//TODO: if touched by anything there is a 50% chance it will squirt spores in a 10x10x10 area 
//       - anyone in caught in the spores must save vs Death ray or choke to death in 6 rounds 

function YellowMold()
 {
    this.name = "Yellow Mold";
    this.race = "slime";
    this.armourClass = 9;                   //set to 9 but they are always hit by any attack  
    this.isHitAutomaticallyByOpponent = true;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.attacks = [{ attackType: "Spores", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    //  this.Alignment = Neutral;
}

YellowMold.prototype = new Monster();
YellowMold.prototype.Constructor = YellowMold;
YellowMold.prototype.movement = 0;
YellowMold.prototype.getMorale = function() { return 12; };   //not applicable so set to 12
YellowMold.prototype.getTreasureType = function() { return []; }; 
YellowMold.prototype.canOnlyBeDamagedBy = [ immunityToDamageTypes.fireDamage ];
YellowMold.getNumberAppearing = function() { return dice.rollDice("1D8"); };
YellowMold.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage("1D6");
    //they eat through wood and leather but not metal or stone 
};

//--------------------------------------------
//-----------------Zombie---------------------
//--------------------------------------------

//TODO: Immune to Sleep, Charm
//TODO: they make no noise
//TODO: they always attack last in a combat round 

function Zombie() 
{
    this.name = "Zombie";
    this.race = "undead";
    this.armourClass = 8;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1d8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    //  this.Alignment = Chaotic ;
}

Zombie.prototype = new Monster();
Zombie.prototype.Constructor = Zombie;
Zombie.prototype.movement = 120;
Zombie.prototype.getMorale = function() { return 12; };
Zombie.prototype.getTreasureType = function() { return []; }; 
Zombie.getNumberAppearing = function(inLair = false) 
{ 
    if(inLair)
    {
        return dice.rollDice("4D6");
    }
    else
    {
        return dice.rollDice("2D4"); 
    }
};






/*
function Basilisk(params) {
    this.name = "Basilisk";
    this.movement = 60;
    this.hitDice = "6d8+1";
    this.armourClass = 4;
    this.treasureType = "F";
    this.Alignment = Neutral;
    this.attacks = { attackType = BiteAttack, damageAmount = "1d10" };
    this.specialAbilities = [{ PetrifyingGaze }];
}
function BlackPudding(params) {
    this.name = "Black Pudding";
    this.movement = 60;
    this.hitDice = "10d8";
    this.armourClass = 6;
    this.treasureType = null;
    this.attacks = { attackType = DissolveAttack, damageAmount = "3d8" };
    this.notes = "5 to 30 feet in diameter";
    this.specialAbilities = [{ description = "dissolves everything but stone" }, { description = "destroys armour" }, { description = "can pass through small openings" }, { description = "only killed only by fire; other attacks break it up into smaller puddings" }];
}
function BlinkDog(params) {
    this.name = "Blink Dog";
    this.movement = 120;
    this.hitDice = "4d8";
    this.armourClass = 5;
    this.treasureType = "C";
    this.Alignment = LawfulGood;
    this.attacks = { attackType = BiteAttack, damageAmount = "1d6" };
    this.SpecialAbilities = [{ description = "highly intelligent" }, { description = "When attacking they teleport close to the enemy and then reappear 1 ' to 4' away and attack in the same melee round" }, { description = "will blink out and not reappear if seriously threatened" }, { description = "They will always attack a displacer beast" }];
}
function Chimera(params) {
    this.name = "Chimera";
    this.movement = [{ movementType = Ground, movementRate = 120 }, { movementType = Flying, movementRate = 180 }];
    this.hitDice = "9d8";
    this.armourClass = 4;
    this.treasureType = "F";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d3" },
        { attackType = ClawAttack, damageAmount = "1d3" },
        { attackType = BiteAttack, damageAmount = "2d4", description = "Goat Head" },
        { attackType = BiteAttack, damageAmount = "2d4", Name = "Lion Head" },
        { attackType = BiteAttack, damageAmount = "3d4", Name = "Dragon Head" },
        { description = "Fire Breath", Range= "50feet", damageAmount = "3d", frequency= "50% ", DailyLimit= "3 times/day" }];
}
function Cockatrice(params) {
    this.name = "Cockatrice";
    this.movement = [{ movementType = Ground, movementRate = 90 }, { movementType = Flying, movementRate = 180 }];
    this.hitDice = "5d8";
    this.armourClass = 6;
    this.treasureType = "D";
    this.Alignment = Neutral;
    this.attacks = [attackType = UnspecifiedAttack, damageAmount = "1d6"];
    this.specialAbilities = [{ description = "Petrifying Touch" }, { description = "Not intelligent" }];
}
function DisplacerBeast(params) {
    this.name = "Displacer Beast";
    this.movement = 150;
    this.hitDice = "6d8";
    this.armourClass = 4;
    this.treasureType = "D";
    this.Alignment = NeutralEvil;
    this.attacks = [{ attackType = TentacleAttack, damageAmount = "2d4" }, { attackType = TentacleAttack, damageAmount = "2d4" }];
    this.specialAbilities = [{ description = "Save vs Magic modifier", modifierAmount = +2 },
    { description = "penalty to attack rolls against creature", modifierAmount = "-2" },
    { description = "Bonus to All saving throws", modifierAmount = "+2" }];
}
function Djinni(params) {
    this.name = "Djinni";
    this.movement = [{ movementType = Ground, movementRate = 90 }, { movementType = Flying, movementRate = 240 }];
    this.hitDice = "7d8+1";
    this.armourClass = 5;
    this.treasureType = nil;
    this.Alignment = Neutral;
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "2d8" }];
    this.specialAbilities = [{ description = "Can conjure food that is nutritionally sound, create drinkable beverages, magic soft goods and even wooden objects which have permanence into being, conjure metallic objects which will last for a short time (the harder the metal, the shorter the life, i.e. djinni gold lasts one day, but djinni steel lasts but one turn), create illusions with both visual and audial components which will remain until touched or dispelled magically (the djinni does not need to concentrate upon the illusion to maintain it in existence)" }, { form = invisibility }, { form = gaseous }, { form = whirlwind, description = "cone with a 10 foot base diameter, a 20 foot diameter at the top,and a height of 30 feet. It takes the djinni 1 full turn to go into this state � or come out of it. A djinni whirl-wind will sweep aside and kill all creatures with fewer than two hit dice which it encounters, and it causes 2-12 hit points of damage to all other creatures caught in its path." }, { description = "can carry up to 6,000 gold pieces in weight without tiring, walking or flying. It is able to carry a double load for a short time � 3 turns walking or 1 turn flying � but must then rest for a turn" }];
}

function BrassDragon(params) {
    Dragon.Call();
    this.specialAbilities = [{ description = "BreathWeapon: Sleep/Fear", area= "70 foot X 20 foot cone/50 foot X 40 foot cloud" }];
    this.hitDice = { Min= "6d8", Max= "8d8" };
    this.Alignment = [{ alignment = Neutral, probability = 50 }, { alignment = ChaoticGood, probability = 50 }];
}
function Giant(params) {
    this.name = "Giant";
    this.hitDice = "8d-12";
    this.armourClass = 4;
    this.treasureType = "E + 5000gp";
    this.specialAbilities = [{ description = "Can throw rocks like a catapult, range 200 feet with a 20 foot hit area. Each rock does 2 dice of damage to anything it hits. A giant can throw one rock every 5 melee rounds." }];
}
function HillGiant(params) {
    this.name = "Hill Giant";
    this.HitDice = "8d8";
    this.Alignment = [{ alignment = Neutral, probability = 50 }, { alignment = ChaoticEvil, probability =  50 }];
    this.lair = Cave;
    this.size = "12'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "2d8" }];
}
function StoneGiant(params) {
    this.name = "Stone Giant";
    this.HitDice = "9d8";
    this.Alignment = Neutral;
    this.lair = Cave;
    this.size = "14'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "3d6" }];
    this.specialAbilities = [description = "Throws rocks 240 ft. with a 30 ft. impact area."];
}
function FrostGiant(params) {
    this.name = "Frost Giant";
    this.HitDice = "`10d8+1";
    this.Alignment = [{ alignment = Neutral, probability =  50 }, { alignment = ChaoticEvil, probability =  50 }];
    this.lair = Cave;
    this.size = "16'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "4d6" }];
    this.specialAbilities = [description = "Throws rocks 240 ft. with a 30 ft. impact area. Impervious to cold. Does 2 die + 1 damage per hit."];
}
function FireGiant(params) {
    this.name = "Fire Giant";
    this.HitDice = "11d8+3";
    this.Alignment = [{ alignment = Neutral, probability =  50 }, { alignment = LawfulEvil, probability =  50 }];
    this.lair = Castle;
    this.size = "12'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "5d6" }];
    this.specialAbilities = [description = "Throws rocks 240 ft. with a 30 ft. impact area. Impervious to fire, 2 dice + 2 damage."];
}
function CloudGiant(params) {
    this.name = "Cloud Giant";
    this.HitDice = "12d8+2";
    this.Alignment = Neutral;
    this.lair = Castle;
    this.size = "18'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "6d10+3" }];
    this.specialAbilities = [description = "Throws rocks 240 ft. with a 30 ft. impact area. 3 dice damage."];
}
function StormGiant(params) {
    this.name = "Storm Giant";
    this.HitDice = "15d8";
    this.Alignment = [{ alignment = Neutral, probability =  50 }, { alignment = ChaoticGood, probability =  50 }];
    this.lair = [Underwater, Mountain];
    this.size = "24'";
    this.damage = [{ attackType = UnspecifiedAttack, damageAmount = "7d6" }];
    this.specialAbilities = [description = "Throws rocks 240 ft. with a 30 ft. Can use weather control spell to cause storm. 3 dice + 3 damage."];
}
function GiantTick(params) {
    this.name = "Giant Tick";
    this.movement = 30;
    this.hitDice = "3d8";
    this.armourClass = 4;
    this.treasureType = null;
    this.attacks = [{ attackType = BiteAttack, damageAmount = "1D4" }];
    this.specialAbilties = [{ description = "A hit indicates that they have attached themselves and will draw 4 hit points worth of blood per melee round until killed or burned. Fire makes them detach themselves." }, { description = "After a hit by a giant tick it is necessary to Cure Disease because the creature's bite carried a disease fatal in 2-8 days" }];
}
function Griffon(params) {
    this.name = "Griffon";
    this.movement = [{ movementType=Ground, movementRate = 120 }, { movementType=Flying, movementRate = 300 }];
    this.hitDice = "7d8";
    this.armourClass = 5;
    this.treasureType = "E";
    this.Alignment = Neutral;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d4" }, { attackType = ClawAttack, damageAmount = "1d4" }, { attackType = BiteAttack, damageAmount = "2d8" }];
    this.specialAbilities = [{ description = "Hatred of Horses"}]
}
function Harpy(params) {
    this.name = "Harpy";
    this.movement = [{ movementType=Ground, movementRate = 60 }, { movementRate = 150, movementType=Flying }];
    this.hitDice = "3d8";
    this.armourClass = 7;
    this.treasureType = "C";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d4" }, { attackType = ClawAttack, damageAmount = "1d4" }, { attackType = WeaponAttack, damageAmount = "1d4" }];
    this.specialAbilities = [{ CharmSong }];
}
function HellHound(params) {
    this.name = "Hell Hound";
    this.movement = 120;
    this.hitDice = { Min= "3d8", Max= "7d8" };
    this.armourClass = 4;
    this.treasureType = "C";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = BiteAttack.damageAmount = "1d6" }];
    this.specialAbilities = [{ name= FireBreath, damageAmount= "HitDice*d6", Range= "5ft" }, { description = "Detect invisible" }];
}
function Hippogriff(params) {
    this.name = "Hippogriff";
    this.movement = [{ movementType = Ground, movementRate = 180 }, { movementType = Flying, movementRate = 360 }];
    this.hitDice = "3d8+1";
    this.armourClass = 5;
    this.treasureType = null;
    this.Alignment = Neutral;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d6" }, { attackType = ClawAttack, damageAmount = "1d6" }, { attackType = BiteAttack, damageAmount = "1d10" }];
    this.specialAbilities = [{ Name= "Hatred", Target= "Pegasi" }];
    }
function Horse(params) {
    this.name = "Horse";
    this.armourClass = 7;
    }
function LightHorse(params) {
    Horse.Call(params);
    this.name = "Light Horse";
    this.movement = 240;
    this.hitDice = "2d8";
    }
function MediumHorse(params) {
    Horse.Call(params);
    this.name = "Medium Horse";
    this.movement = 180;
    this.hitDice = "2d8+1";
    }
function HeavyWarHorse(params) {
    Horse.Call(params);
    this.name = "Heavy War Horse";
    this.movement = 120;
    this.hitDice = "3d8";
    }
function DraftHorse(params) {
    Horse.Call(params);
    this.name = "Draft Horse";
    this.movement = 120;
    this.hitDice = "2d8+1";
    }
function Hydra(params) {
    this.name = "Hydra";
    this.movement = 120;
    this.hitDice = "6 points per head";
    this.armourClass = 5;
    this.treasureType = "B";
    this.Alignment = Neutral;
    this.attacks = [{ Name = "BiteAttack", damageAmount = "1d6", quantity= "1 per head" }];
    }
function Manticore(params) {
    this.name = "Manticore";
    this.movement = [{ movementType = Ground, movementRate120 }, { movementType = Water, movementRate180 }];
    this.hitDice = "6d8+1";
    this.armourClass = 4;
    this.treasureType = "D";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d6" }, { attackType = ClawAttack, damageAmount = "1d6" }, { attackType = BiteAttack, damageAmount = "1d6" }];
    this.specialAbilities = [{ TailSpikes, RangedAttack, Quantity = 24, rateOfFire = 6, Range = 180, AsCrossbowBolts }];
}
function Mummy(params) {
    this.name = "Mummy";
    this.movement = 60;
    this.hitDice = "5d8+1";
    this.armourClass = 5;
    this.treasureType = "D";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d12" }];
    this.specialAbilities = [{ undead }, { description = "Inflict TombRot 10* healing time" }, { description = "Immune to normal weapons" }, { description = "Half damage from all attacks except fire" }, { description = "Fear, SavevsParalyze, + 2 for party number = 5 +" }];
    }
function Nixie(params) {
    this.name = "Nixie";
    this.movement = [{ movementType = Ground, movementRate = 60 }, { movementType = Swimming, movementRate = 120 }];
    this.hitDice = "1d8";
    this.armourClass = 7;
    this.treasureType = "B";
    this.Alignment = Neutral;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d4" }];
    }
function Pegasi(params) {
    this.name = "Pegasi";
    this.movement = [{ movementType=Ground, movementRate = 240 }, { movementType=Flying, movementRate = 480 }];
    this.hitDice = "2d+2";
    this.armourClass = 6;
    this.treasureType = null;
    this.Alignment = LawfulGood;
    this.attacks = [{ attackType = HoofAttack, damageAmount = "1d8" }, { attackType = HoofAttack, damageAmount = "1d8" }];
}
function PurpleWorm(params) {
    this.name = "Purple Worm";
    this.movement = 60;
    this.hitDice = "15d8";
    this.armourClass = 6;
    this.treasureType = "D";
    this.Alignment = Neutral;
    this.attacks = [{ attackType = BiteAttack, damageAmount = "2d6", special = "Hit + 2 Swallows, 6 turns to death, 12 turns to unrecoverable" }, { attackType = StingerAttack, damageAmount = "2d6", special = "Poisonous" }];
}
function Spectre(params) {
    this.name = "Spectre";
    this.movement = [{ movementType = Ground, movementRate = 150 }, { movementType = Flying, movementRate = 300 }];
    this.hitDice = "6d8";
    this.armourClass = 2;
    this.treasureType = "E";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d8", special = "Drains 2 Levels" }];
    this.specialAbilities[{ description = "Humans killed by a spectre become low-strength spectres under the control of the one who made them" }];
}
function Troll(params) {
    this.name = "Troll";
    this.movement = 120;
    this.hitDice = "6d8+3";
    this.armourClass = 6;
    this.treasureType = "D";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d6" }, { ClawAttack, damageAmount = "1d6" }, { BiteAttack, damageAmount = "1d6" }];
    this.specialAbilities[{ description = "Regenerates 3hp/turn, 3 turns after injury, will resume combat at 6hp" }];
    }
function Unicorn(params) {
    this.name = "Unicorn";
    this.movement = [{ movementType = Ground, movementRate = 240 }, { movementType = DimensionDoor, movementRate = 360 }];
    this.hitDice = 4;
    this.armourClass = 2;
    this.treasureType = null;
    this.Alignment = LawfulGood;
    this.attacks = [{ attackType = HoofAttack, damageAmount = "1d8" }, { HoofAttack, damageAmount = "1d8" }, { HornAttack, damageAmount = "1d8" }];
    this.specialAbilities = [{ description = "ResistMagic 8 + 1d20" }];
}
function Vampire(params) {
    this.name = "Vampire";
    this.movement = [{ movementType = Ground, movementRate = 120 }, { movementType = flying, movementRate = 180, note = "BatForm" }];
    this.hitDice = { Min= "7d8", Max= "9d8" };
    this.armourClass = 2;
    this.treasureType = "F";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d10", special = "LevelDrain 2" }];
    this.specialAbilities = [{ description = "Immune to Non-Magic weapons" }, { description = "RevertToGaseousForm on 0 Hits" },
    { description = "Regenerate 3hp per turn in gaseous form" },
    { description = "Can only be killed by being impaled through the heart with a wooden stick, exposed to direct sunlight or immersed in running water" },
    { description = "No reflection, Repelled by garlic, a mirror, or a strongly presented holy symbol" },
    { description = "Humnas killed by a vampire become vampires under the control of the one who made them." },
    { description = "Can summon 10d * 10 rats or 3d6 wolves" },
    { description = "polymorph self into gaseous form" },
    { description = "polymorph self into bat" },
    { description = "Gaze charms humans with -2 to save" }];
}
function Wraith(params) {
    this.name = "Wraith";
    this.movement = [{ movementType = Ground, movementRate = 120 }, { movementType = Flying, movementRate = 240 }];
    this.hitDice = "4d8";
    this.armourClass; 3;
    this.treasureType = "E";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = UnspecifieAttack, damageAmount = "1d6", special = "DrainsLevel 1" }];
    this.specialAbilities = [{ description = "non-Corporeal" }, { description = "Immune to Normal Weapons" }, { description = "Silver wapons do half damge" }, { description = "Magic Weapons do normal Damage excluding magic bonus" }];
}
*/