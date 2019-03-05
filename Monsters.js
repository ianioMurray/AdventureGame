
"use strict";

//--------------------------------------------
//             MONSTERS
//--------------------------------------------
const specialDamage = "Special";

function Monster()
{
    this.attack = function(opponent)
    {
        var count = 0;

        for(var i=0; this.attacks.length > i; i++ )
        {
            var ToHit = requiredToHit.getToHit(this, opponent);

            if(dice.rollDice("1D20") >= ToHit)
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
            this.isDead = true;
        }
    };

    this.parseHitDice = function()
    {
        var match = /^([0-9]+)/.exec(this.hitDice);
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
        var match = /^([0-9]+)[+-]?/.exec(this.hitDice);

        return match[0];
    };

    this.GetHPs = function()
    {
        var parsedHitDice = this.parseHitDice();
        var hitPoints = 0;  
        hitPoints = dice.rollDice( parsedHitDice.hitDice + "D8");
        return hitPoints + parsedHitDice.modifier;
    };
}

Monster.createMonsters = function(typeOfMonster)
{
    var monsters = [];

    for(var i = 0; typeOfMonster.getNumberAppearing() > i; i++)
    {
        var monster = new typeOfMonster();
        monsters.push(monster);
    }
    return monsters;
};


//--------------------------------------------
//-------------Acolyte------------------------
//--------------------------------------------

//if there are more than 4 then 1 is a leader roll a 1D10 on 1-4 level 2 / 5-7 level 3 / 8-9 level 4 / 10 level 5
//the leader will know a random spell 
function Acolyte()
{
    this.name = "Acolyte";
    this.race = "human";
    this.armourClass = 2;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: characterType.Cleric, level: 1};
    this.morale = 7;
    this.treasureType = "U";
    //this.Alignment = [{ alignment: Lawful, probability: 33 }, { alignment: Chaotic, probability: 33 }, { alignment: Neutral, probability: 34 }];
}

Acolyte.prototype = new Monster();
Acolyte.prototype.Constructor = Acolyte;
Acolyte.getNumberAppearing = function() {return dice.rollDice("1D8");};


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
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: "1d4" }, { attackType: "Claw", damage: "1d4" }];
    this.saveAs = { class: characterType.Fighter, level: 2};
    this.morale = 7;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

Ape.prototype = new Monster();
Ape.prototype.Constructor = Ape;
Ape.getNumberAppearing = function() {return dice.rollDice("1D6");};


//--------------------------------------------
//-------------Bandit-------------------------
//--------------------------------------------

//This is a typical bandit 
//If a bandit Camp is encountered the teasureType will be "U" and the noAppearing "3D10"
//Bandits might have a leader who can be any class and is 1 level higher than a standard bandit
function Bandit()
 {
    this.name = "Bandit";
    this.race = "human";
    this.armourClass = 6;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: characterType.Thief, level: 1};  
    this.morale = 8;
    this.treasureType = "U";
    //this.Alignment = [{ alignment: Chaotic, probability: 50 }, { alignment: Neutral, probability: 50 }];
}

Bandit.prototype = new Monster();
Bandit.prototype.Constructor = Bandit;
Bandit.getNumberAppearing = function() {return dice.rollDice("1D8");};


//--------------------------------------------
//---------------Bat--------------------------
//--------------------------------------------

//confusion = -2 to hit and saving throws and cannot cast spells
function Bat()
 {
    this.name = "Bat";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = 0;
    this.hitPoints = "1";
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Confusion", damage: "0D4" }]; //does no damage
    this.saveAs = { class: characterType.NormalMan, level: 0};  
    this.morale = 6;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

Bat.prototype = new Monster();
Bat.prototype.Constructor = Bat;
Bat.getNumberAppearing = function() {return dice.rollDice("1D100");};


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
    this.movement = 180;
    this.attacks = [{ attackType: "Bite", damage: "1D4" }]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
    this.morale = 8;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BatGiant.prototype = new Monster();
BatGiant.prototype.Constructor = BatGiant;
BatGiant.getNumberAppearing = function() {return dice.rollDice("1D10");};


//------------------------------------------
//---           Bear Prototype           ---
//------------------------------------------
function Bear() 
{  }

Bear.prototype = new Monster();
Bear.prototype.Constructor = Bear;
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
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, { attackType: "Claw", damage: specialDamage }, { attackType: "Bite", damage: "1D6"}]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  
    this.morale = 7;
    this.treasureType = "U";
   // this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearBlack.prototype = new Bear();
BearBlack.prototype.Constructor = BearBlack;
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
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, { attackType: "Claw", damage: specialDamage }, { attackType: "Bite", damage: "1D8"}]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  
    this.morale = 8;
    this.treasureType = "U";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearGrizzly.prototype = new Bear();
BearGrizzly.prototype.Constructor = BearGrizzly;
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
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, { attackType: "Claw", damage: specialDamage }, { attackType: "Bite", damage: "1D10"}]; 
    this.saveAs = { class: characterType.Fighter, level: 3};  
    this.morale = 8;
    this.treasureType = "U";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearPolar.prototype = new Bear();
BearPolar.prototype.Constructor = BearPolar;
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
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: specialDamage }, { attackType: "Claw", damage: specialDamage }, { attackType: "Bite", damage: "2D6"}]; 
    this.saveAs = { class: characterType.Fighter, level: 3};  
    this.morale = 9;
    this.treasureType = "V";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearCave.prototype = new Bear();
BearCave.prototype.Constructor = BearCave;
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
    this.movement = 120;
    this.attacks = [{ attackType: "Bite", damage: "2D4" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
    this.morale = 7;
    this.treasureType = "Nil";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleFire.prototype = new BeetleGiant();
BeetleFire.prototype.Constructor = BeetleFire;
BeetleFire.getNumberAppearing = function() { return dice.rollDice("1D8"); };

//--------------------------------------------
//---------------Beetle, Oil-----------------
//--------------------------------------------

// special damage which will reduce characters toHit roll for 24hrs
function BeetleOil()
 {
    this.name = "Oil Beetle";
    this.race = "animal";
    this.armourClass = 4;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Bite", damage: "1D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1};  
    this.morale = 8;
    this.treasureType = "Nil";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleOil.prototype = new BeetleGiant();
BeetleOil.prototype.Constructor = BeetleOil;
BeetleOil.getNumberAppearing = function() { return dice.rollDice("1D8"); };

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
    this.movement = 150;
    this.attacks = [{ attackType: "Bite", damage: "2D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 1 };  
    this.morale = 9;
    this.treasureType = "U";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BeetleTiger.prototype = new BeetleGiant();
BeetleTiger.prototype.Constructor = BeetleTiger;
BeetleTiger.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//---------------Berserker--------------------
//--------------------------------------------

//this.specialAbilities = [{ AttackRollBonus, value=+2, against =[Men, Kobolds, Goblins, Orcs] }, { NoRetreatOrSurrender }];
function Berserker() 
{
    this.name = "Berserker";
    this.race = "human";
    this.armourClass = 7;
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 }; 
    this.morale = 12;                   //set to 12 for the moment to reflect that they never run or surrender
    this.treasureType = "P";
    //this.Alignment = Neutral;
}

Berserker.prototype = new Monster();
Berserker.prototype.Constructor = Berserker;
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
    this.movement = 150;
    this.attacks = [{ attackType: "Tusk", damageAmount: "2D4" }];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 9;
    this.treasureType = "Nil";
    //this.Alignment = Neutral;
}

Boar.prototype = new Monster();
Boar.prototype.Constructor = Boar;
Boar.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//-------------------Bugbear------------------
//--------------------------------------------

//surprise on a 1 to 3 on 1D6.  if using weapon they get weapon damage +1
function Bugbear() 
{
    this.name = "Bugbear";
    this.race = "humaniod";
    this.armourClass = 5;
    this.hitDice = "3+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "2D4" }];  //if weapon they get +1
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    this.morale = 9;
    this.treasureType = "B";
    //this.Alignment = Chaotic;
}

Bugbear.prototype = new Monster();
Bugbear.prototype.Constructor = Bugbear;
Bugbear.getNumberAppearing = function() { return dice.rollDice("2D4"); };

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
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage }, 
                    { attackType: "Tentacle", damage: specialDamage },
                    { attackType: "Tentacle", damage: specialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2};  
    this.morale = 9;
    this.treasureType = "B";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

CarrionCrawler.prototype = new Monster();
CarrionCrawler.prototype.Constructor = CarrionCrawler;
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
    this.movement = 150;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D3" }, 
                    { attackType: "Claw", damageAmount: "1D3" }, 
                    { attackType: "Bite", damageAmount: "1D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 8;
    this.treasureType = "U";
    //this.Alignment = Neutral;
}

MountainLion.prototype = new CatGiant();
MountainLion.prototype.Constructor = MountainLion;
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
    this.movement = 210;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Bite", damageAmount: "1D8" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 8;
    this.treasureType = "U";
    //this.Alignment = Neutral;
}

Panther.prototype = new CatGiant();
Panther.prototype.Constructor = Panther;
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
    this.movement = 150;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4+1" },      
                    { attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Bite", damageAmount: "1D10" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    this.morale = 9;
    this.treasureType = "U";
    //this.Alignment = Neutral;
}

Lion.prototype = new CatGiant();
Lion.prototype.Constructor = Lion;
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
    this.movement = 150;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6" },      
                    { attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Bite", damageAmount: "2D6" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 3 }; 
    this.morale = 9;
    this.treasureType = "U";
    //this.Alignment = Neutral;
}

Tiger.prototype = new CatGiant();
Tiger.prototype.Constructor = Tiger;
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
    this.movement = 150;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D8" },      
                    { attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Bite", damageAmount: "2D8" } ]; 
    this.saveAs = { class: characterType.Fighter, level: 4 }; 
    this.morale = 10;
    this.treasureType = "V";
    //this.Alignment = Neutral;
}

SabreToothTiger.prototype = new CatGiant();
SabreToothTiger.prototype.Constructor = SabreToothTiger;
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
    this.movement = 60;
    this.attacks = [{ attackType: "Bite", damageAmount: "1D2" },      
                    { attackType: "Bump", damageAmount: "1D4" }, 
                    { attackType: "Spit", damageAmount: specialDamage } ]; 
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 5;
    this.treasureType = "Nil";
    //this.Alignment = Neutral;
}

CaveLocust.prototype = new Monster();
CaveLocust.prototype.Constructor = CaveLocust;
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
    this.hitDice = "0.5";        //TODO - work out how to deal with this (1-4 hps)
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [{ attackType: "Bite", damageAmount: specialDamage } ]; 
    this.saveAs = { class: characterType.NormalMan, level: 0 }; 
    this.morale = 7;
    this.treasureType = "Nil";
    //this.Alignment = Neutral;
}

CentipedeGiant.prototype = new Monster();
CentipedeGiant.prototype.Constructor = CentipedeGiant;
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

//this.specialAbilities = [{ description = "able to shape itself into the double of any humanoid creature (up to seven or so feet tall) it observes" },
//{ description = "Save Vs Spells bonus", modifierAmount = + 10 },
//{ description = "Save vs Wands bonus", modifierAmount = +7 }];
// unaffected by charm and sleep spells

function Doppleganger() {
    this.name = "Doppleganger";
    this.race = "???";                 //not sure what this should be
    this.armourClass = 5;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "UnspecifiedAttack", damageAmount: "1D12" }];
    this.saveAs = { class: characterType.Fighter, level: 10 }; 
    this.morale = 10;
    this.treasureType = "E";    
    //this.Alignment = [{ alignment = ChaoticEvil, probability = 50 }, { alignment = Neutral, probability = 50 }];
}

Doppleganger.prototype = new Monster();
Doppleganger.prototype.Constructor = Doppleganger;
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

// this.specialAbilities = [{ description = "BreathWeapon: Cold", area= "80 foot X 30 foot cone" }];
// not affected by cold attacks

function WhiteDragon() {
    this.name = "White Dragon";
    this.race = "dragon";                 
    this.armourClass = 3;
    this.hitDice = "6";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Claw", damageAmount: "1D4" }, 
                    { attackType: "Bite", damageAmount: "2D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 6 }; 
    this.morale = 8;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.canTalk = 10;
    this.isSleep = 50;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 0;
    this.thirdLevelSpells = 0;
}

WhiteDragon.prototype = new Dragon();
WhiteDragon.prototype.Constructor = WhiteDragon;
WhiteDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Black Dragon----------------
//--------------------------------------------

// this.specialAbilities = [{ description = "BreathWeapon: acid", area= "60 foot X 5 foot line" }];
// not affected by acid attacks

function BlackDragon() {
    this.name = "Black Dragon";
    this.race = "dragon";                 
    this.armourClass = 2;
    this.hitDice = "7";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Claw", damageAmount: "1D4+1" }, 
                    { attackType: "Bite", damageAmount: "2D10" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 7 }; 
    this.morale = 8;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 20;
    this.isSleep = 40;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 0;
    this.thirdLevelSpells = 0;
}

BlackDragon.prototype = new Dragon();
BlackDragon.prototype.Constructor = BlackDragon;
BlackDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Green Dragon----------------
//--------------------------------------------

// this.specialAbilities = [{ description = "BreathWeapon: Chlorine Gas", area= "50 foot X 40 foot cloud" }];
// not affected by Chlorine Gas attacks

function GreenDragon() {
    this.name = "Green Dragon";
    this.race = "dragon";                 
    this.armourClass = 1;
    this.hitDice = "8";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Claw", damageAmount: "1D6" }, 
                    { attackType: "Bite", damageAmount: "3D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 8 }; 
    this.morale = 9;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 30;
    this.isSleep = 30;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 3;
    this.thirdLevelSpells = 0;
}

GreenDragon.prototype = new Dragon();
GreenDragon.prototype.Constructor = GreenDragon;
GreenDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Blue Dragon----------------
//--------------------------------------------

// this.specialAbilities = [{ description = "BreathWeapon: Lightening", area= "100 foot X 5 foot line" }];
// not affected by Lightening attacks

function BlueDragon() {
    this.name = "Blue Dragon";
    this.race = "dragon";                 
    this.armourClass = 0;
    this.hitDice = "9";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D6+1" }, 
                    { attackType: "Claw", damageAmount: "1D6+1" }, 
                    { attackType: "Bite", damageAmount: "3D10" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 9 }; 
    this.morale = 9;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.canTalk = 40;
    this.isSleep = 20;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 4;
    this.thirdLevelSpells = 0;
}

BlueDragon.prototype = new Dragon();
BlueDragon.prototype.Constructor = BlueDragon;
BlueDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Red Dragon----------------
//--------------------------------------------

// this.specialAbilities = [{ description = "BreathWeapon: Fire", area= "90 foot X 30 foot cone" }];
// not affected by Fire attacks

function RedDragon() {
    this.name = "Red Dragon";
    this.race = "dragon";                 
    this.armourClass = -1;
    this.hitDice = "10";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Claw", damageAmount: "1D8" }, 
                    { attackType: "Bite", damageAmount: "4D8" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 10 }; 
    this.morale = 10;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Chaotic, probability = 100 }];
    this.canTalk = 50;
    this.isSleep = 10;
    this.firstLevelSpells = 3;
    this.secondLevelSpells = 3;
    this.thirdLevelSpells = 3;
}

RedDragon.prototype = new Dragon();
RedDragon.prototype.Constructor = RedDragon;
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
    this.movement = 90;
    this.attacks = [{ attackType: "Claw", damageAmount: "2D4" }, 
                    { attackType: "Claw", damageAmount: "2D4" }, 
                    { attackType: "Bite", damageAmount: "6D6" },
                    { attackType: "Breath", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 11 }; 
    this.morale = 10;
    this.treasureType = "H";    
    //this.Alignment = [{ alignment = Lawful, probability = 100 }];
    this.canTalk = 100;
    this.isSleep = 5;
    this.firstLevelSpells = 4;
    this.secondLevelSpells = 4;
    this.thirdLevelSpells = 4;
}

GoldDragon.prototype = new Dragon();
GoldDragon.prototype.Constructor = GoldDragon;
GoldDragon.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

//--------------------------------------------
//----------------Driver Ant------------------
//--------------------------------------------

//once engaged in combat they will cross fire to get at an opponent
//30% chance a nest will have gold nuggets worth 1D10 thousand gold pieces 

function DriverAnt() {
    this.name = "Driver Ant";
    this.race = "animal";                 
    this.armourClass = 3;
    this.hitDice = "4";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 180;
    this.attacks = [{ attackType: "Bite", damageAmount: "2D6" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 7;
    this.treasureType = "U";    
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
}

DriverAnt.prototype = new Monster();
DriverAnt.prototype.Constructor = DriverAnt;
DriverAnt.getNumberAppearing = function() {  return dice.rollDice("2D4"); };

//--------------------------------------------
//-------------------Dwarf--------------------
//--------------------------------------------

//there will be a leader if more than 20 dwarves Level 3-8 usually with a magic item

function Dwarf() {
    this.name = "Dwarf";
    this.race = "humanoid";                 
    this.armourClass = 4;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 }; 
    this.morale = 8;
    this.treasureType = "G";    
    //this.Alignment = [{ alignment = Neutral/Lawful, probability = 100 }];
}

Dwarf.prototype = new Monster();
Dwarf.prototype.Constructor = Dwarf;
Dwarf.getNumberAppearing = function() {  return dice.rollDice("1D6"); };

//--------------------------------------------
//-------------------Elf----------------------
//--------------------------------------------

//there will be a leader if more than 15 elves Level 2-7 usually with a magic item

function Elf() {
    this.name = "Elf";
    this.race = "humanoid";                 
    this.armourClass = 5;
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Elf, level: 1 }; 
    this.morale = 8;
    this.treasureType = "E";    
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.firstLevelSpells = 1;
}

Elf.prototype = new Monster();
Elf.prototype.Constructor = Elf;
Elf.getNumberAppearing = function() {  return dice.rollDice("1D4"); };

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
    this.movement = 150;
    this.attacks = [{ attackType: "Bite", damageAmount: "1D8" } ];
    this.saveAs = { class: characterType.Fighter, level: 1 }; 
    this.morale = 8;
    this.treasureType = "Nil";    
    //this.Alignment = [{ alignment = Neutral, probability = 100 }];
    this.firstLevelSpells = 1;
}

FerretGiant.prototype = new Monster();
FerretGiant.prototype.Constructor = FerretGiant;
FerretGiant.getNumberAppearing = function() {  return dice.rollDice("1D8"); };

//--------------------------------------------
//-----------------Gargoyle-------------------
//--------------------------------------------

//    this.specialAbilities[{ description = "semi-intelligent and cunning" }, { description = "can only be hit with magic weapons" }];
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
    this.movement = 90;
    //this.movement = [{ movementType = Gound, movementRate = 90 }, { movementType = Flying, movementRate = 150 }];
    this.attacks = [
        { attackType: "Claw", damageAmount: "1D3" },
        { attackType: "Claw", damageAmount: "1D3" },
        { attackType: "Bite", damageAmount: "1D6" },
        { attackType: "Horn", damageAmount: "1D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 8 }; 
    this.morale = 11;
    this.treasureType = "C"; 
    //this.Alignment = LawfulEvil;
}

Gargoyle.prototype = new Monster();
Gargoyle.prototype.Constructor = Gargoyle;
Gargoyle.getNumberAppearing = function() {  return dice.rollDice("1D6"); };

//--------------------------------------------
//---------------Gelatinous Cube--------------
//--------------------------------------------

//surprise on 1-4 (of 1D6)
// immune to cold and lightening 

function GelatinousCube()
 {
    this.name = "Gelatinous Cube";
    this.race = "slime";  
    this.armourClass = 8; 
    this.hitDice = "4";  
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [
        { attackType: "Disolve", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 12;
    this.treasureType = "V"; 
    //this.Alignment = Neutral;
}

GelatinousCube.prototype = new Monster();
GelatinousCube.prototype.Constructor = GelatinousCube;
GelatinousCube.getNumberAppearing = function() {  return 1; };
GelatinousCube.prototype.specialDamage = function(opponent)
{
    //if opponent hit before they must make a save vs paralysis. If they fail all following attacks are always hits 
    //first hit does 2D4 damage
    opponent.takeDamage(dice.rollDice("2D4"));
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
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [ { attackType: "Claw", damageAmount: specialDamage }, 
                     { attackType: "Claw", damageAmount: specialDamage }, 
                     { attackType: "Bite", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 9;
    this.treasureType = "B"; 
    //this.Alignment = Chaotic;
 }

 Ghoul.prototype = new Monster();
 Ghoul.prototype.Constructor = Ghoul;
 Ghoul.getNumberAppearing = function() { return dice.rollDice("1D6"); };
 Ghoul.prototype.specialDamage = function(opponent)
 {
    opponent.takeDamage(dice.rollDice("2D4"));
    //elves are not affected by paralysis
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

//if more than 20 gnolls they will have a leader with 16hps, who attacks as hitdice 3 monster

function Gnoll()
 {
    this.name = "Gnoll";
    this.race = "humaniod";   
    this.armourClass = 5;
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 90;
    this.attacks = [ { attackType: "WeaponAttack", damageAmount: "2D4" } ];
    this.saveAs = { class: characterType.Fighter, level: 2 }; 
    this.morale = 8;
    this.treasureType = "D"; 
    //this.Alignment = Chaotic;
 }

 Gnoll.prototype = new Monster();
 Gnoll.prototype.Constructor = Gnoll;
 Gnoll.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//--------------------Gnome-------------------
//--------------------------------------------

//if more than 20 gnomes they will have a leader with 11hps, who attacks as hitdice 2 monster

function Gnome()
 {
    this.name = "Gnome";
    this.race = "humaniod";   
    this.armourClass = 5;
    this.hitDice = "1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [ { attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.Dwarf, level: 1 }; 
    this.morale = 8;
    this.treasureType = "C"; 
    //this.Alignment = Lawful/Neutral;
 }

 Gnome.prototype = new Monster();
 Gnome.prototype.Constructor = Gnome;
 Gnome.getNumberAppearing = function() { return dice.rollDice("1D8"); };
 
//--------------------------------------------
//--------------------Goblin------------------
//--------------------------------------------

//   this.specialAbilities = [{ description = "-1 off attack die roll in daylight" },
// { description = "can see in the dark" }, 
//{ description = "Always attack dwarves on sight" }];
// 1 of every 4 will ride a dire wolf 
//in their lair there will be a king with 15hps, 3 hitdice and +1 damage
//the king  will have 2-12 body guards - fight as 2 hitdice and have 2-12hps

 function Goblin() 
 {
    this.name = "Goblin";
    this.race = "humaniod";  
    this.armourClass = 6;
    this.hitDice = "1D-1";    
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;    
    this.movement = 60;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D6" } ];
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    this.morale = 7;
    this.treasureType = "R";
  //  this.Alignment = Chaotic;
}

Goblin.prototype = new Monster();
Goblin.prototype.Constructor = Goblin;
Goblin.getNumberAppearing = function() { return dice.rollDice("2D4"); };

//--------------------------------------------
//--------------------Gray Ooze---------------
//--------------------------------------------

//this.specialAbilities = [{ description = "resembles wet stone and difficult to detect" }, 
//{ description = "Can corrode metal in one turn" }, 
//{ description = "Immune to cold and fire" }];

function GrayOoze() 
{
    this.name = "Gray Ooze";
    this.race = "slime";
    this.armourClass = 8;
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.movement = 10;
    this.attacks = [{ attackType: "disolve", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 2 };
    this.morale = 12;
    this.treasureType = "Nil";
    //  this.Alignment = Neutral;  
}

GrayOoze.prototype = new Monster();
GrayOoze.prototype.Constructor = GrayOoze;
GrayOoze.getNumberAppearing = function() { return 1; };
GrayOoze.prototype.specialDamage = function(opponent)
{
    //the first hits does 2D8 damage after than all hits are automatic
    //attack disolves armour in 1 turn
    opponent.takeDamage(dice.rollDice("2D8"));
};

//--------------------------------------------
//---------------Green Slime------------------
//--------------------------------------------

//{ description: "Immune to all damage except fire and cold" },
// burning the slime will do half damage to it and half to anyone being disolved by it 
//{ description: "Eats everything but stone" },
//{ description: "Sticks to flesh , turning the flesh into green slime. Can only be remeved by Cure Disease spell" }];

function GreenSlime()
 {
    this.name = "Green Slime";
    this.race = "slime";
    this.armourClass = "?????"; // "can always be hit";
    this.hitDice = "2";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.movement = 3;
    this.attacks =  [{ attackType: "disolve", damageAmount: specialDamage }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    this.morale = 12;
    this.treasureType = "Nil";
    //  this.Alignment = Neutral;  
 }

GreenSlime.prototype = new Monster();
GreenSlime.prototype.Constructor = GreenSlime;
GreenSlime.getNumberAppearing = function() { return 1; };
GreenSlime.prototype.specialDamage = function(opponent)
{
    //disolves wood and metal in 6 rounds 
    //after armour disolved the oppoent will be absorbed in 1 to 4 rounds
};

//--------------------------------------------
//-----------------Halfling-------------------
//--------------------------------------------

//in a village there will be a leader level 2-7 - 2hitDice
//a leader will have a militia 5-20 halflings all 2 hitdice

function Halfling()
 {
    this.name = "Halfling";
    this.race = "humanoid";
    this.armourClass = 7; 
    this.hitDice = "1-1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.movement = 90;
    this.attacks =  [{ attackType: "WeaponAttack", damageAmount: "1D6" }];
    this.saveAs = { class: characterType.Halfling, level: 1 };
    this.morale = 7;
    this.treasureType = "V";
    //  this.Alignment = Lawful;  
 }

Halfling.prototype = new Monster();
Halfling.prototype.Constructor = Halfling;
Halfling.getNumberAppearing = function() { return dice.rollDice("3D6"); };

//--------------------------------------------
//-------------------Harpy--------------------
//--------------------------------------------

//+2 to all saves

function Harpy()
 {
    this.name = "Harpy";
    this.race = "?????";   //not sure 
    this.armourClass = 7; 
    this.hitDice = "3";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.movement = 60;
    this.attacks =  [{ attackType: "Claw", damageAmount: "1D4" },
                     { attackType: "Claw", damageAmount: "1D4" },
                     { attackType: "WeaponAttack", damageAmount: "1D6" },
                     { attackType: "Song", damageAmount: specialDamage } ];
    this.saveAs = { class: characterType.Halfling, level: 3 };
    this.morale = 7;
    this.treasureType = "C";
    //  this.Alignment = Chaotic;  
 }

Harpy.prototype = new Monster();
Harpy.prototype.Constructor = Harpy;
Harpy.getNumberAppearing = function() { return dice.rollDice("1D6"); };
Harpy.prototype.specialDamage = function(opponent)
{
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.RodsStavesSpells, dice.rollDice("1D20")))
    {
        //oppoent is charmed 
    }
};

//--------------------------------------------
//-------------------Hobgoblin----------------
//--------------------------------------------

// in their lair will be a king with 22hps 5hitdice +2 damage
// he will have 1-4 body guards 4hitdice 3-18hps
//with the king moral is 10

function Hobgoblin()
 {
    this.name = "Hobgoblin";
    this.race = "humanoid";
    this.armourClass = 6;
    this.hitDice = "1+1";
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.movement = 90;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D8" }];
    this.saveAs = { class: characterType.Fighter, level: 1 };
    this.morale = 8;
    this.treasureType = "D";
    //  this.Alignment = Chaotic; 
}

Hobgoblin.prototype = new Monster();
Hobgoblin.prototype.Constructor = Hobgoblin;
Hobgoblin.getNumberAppearing = function() { return dice.rollDice("1D6"); };

//--------------------------------------------
//-------------------Insect Swarm-------------
//--------------------------------------------

//no damaged by weapons but waving them may ward off the swarm
//touchs waved do 1-4 damage to the swarm
//sleep will affect the full swarm

function InsectSwarm()
 {
    this.name = "Insect Swarm";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "3";                //can be anything from 2-4
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.movement = 30;
    this.attacks = [{ attackType: "Swarm", damageAmount: "2" }];  //exact damage and always hits
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    this.morale = 11;
    this.treasureType = "Nil";
    //  this.Alignment = Neutral; 
}

InsectSwarm.prototype = new Monster();
InsectSwarm.prototype.Constructor = InsectSwarm;
InsectSwarm.getNumberAppearing = function() { return 1; };

//--------------------------------------------
//-------------------Killer Bee--------------
//--------------------------------------------

function KillerBee()
 {
    this.name = "Killer Bee";
    this.race = "animal";
    this.armourClass = 7;
    this.hitDice = "0.5";                //half a hit dice - 1D4 hps
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false; 
    this.movement = 150;
    this.attacks = [{ attackType: "String", damageAmount: SpecialDamage }];  
    this.saveAs = { class: characterType.Fighter, level: 1 };
    this.morale = 9;
    this.treasureType = "Nil";
    //  this.Alignment = Neutral; 
}

KillerBee.prototype = new Monster();
KillerBee.prototype.Constructor = KillerBee;
KillerBee.getNumberAppearing = function() { return dice.rollDice("1D6"); };
KillerBee.prototype.specialDamage = function(opponent)
{
    opponent.takeDamage(dice.rollDice("1D3"));
    this.isDead = true;   //bee dies when it stings 
    if(!savingThrow.isSavingThrowMade(opponent.saveAs, savingThrow.typeOfSave.DeathRayPoison, dice.rollDice("1D20")))
    {
        //oppoent dies 
    }
    //Once strung the opponent will take 1 damage until the sting is removed which takes 1 turn
};

//--------------------------------------------
//---------------------Kobold-----------------
//--------------------------------------------

//    this.specialAbilities = [{ Name = "infravision" }];
// cheiftain has 9hps and 2hitdice
// he has 1D6 bodyGuards with 6hps and hitdice 1+1
//moral is 8 with a cheiftain 

function Kobold()
{
    this.name = "Kobold";
    this.race = "humanoid";
    this.armourClass = 7;
    this.hitDice = "0.5";            //half hit dice - hps 1D4
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;   
    this.movement = 60;
    this.attacks = [{ attackType: "WeaponAttack", damageAmount: "1D4" }];
    this.saveAs = { class: characterType.NormalMan, level: 0 };
    this.morale = 6;
    this.treasureType = "P";
    //this.Alignment = Chaotic;
}

Kobold.prototype = new Monster();
Kobold.prototype.Constructor = Kobold;
Kobold.getNumberAppearing = function() { return dice.rollDice("4D4"); };





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
function Mule(params) {
    Horse.Call(params);
    this.name = "Mule";
    this.movement = 120;
    this.hitDice = "2d8+1";
    this.specialAbilities = [{ description = "Carry 3500gp" }];
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



function LizardMan(params) {
    this.name = "Lizard Man";
    this.movement = [{ movementType=Ground, movementRate = 60 }, { movementType=Water, movementRate = 120 }];
    this.hitDice = "2d8+1";
    this.armourClass = 5;
    this.treasureType = "D";
    this.Alignment = Neutral;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d8" }];
    this.specialAbilities = [{ description = "Semi-Intelligent" }];
    }
function Lycanthrope(params) {
    this.name = "Lycanthrope";
    this.treasureType = "C";
    this.attacks = 1;
    this.specialAbilities = [{ description = "Immune to NormalWeapons in were - form" }, { description = "Repelled by Wolfsbane" }, { description = "TransmitLycanthropy if inflict 50% of health transform in 2 - 24 days" }];
    }
function Wereboar(params) {
    this.Name = "Wereboar";
    this.movement = 120;
    this.hitDice = "4d8+1";
        this.armourClass = 4
    this.Alignment = Neutral / ChaoticGood;   // not sure if this varies as the form taken, or is a random probability
    }
function Wererat(params) {
    this.Name = "Wererat";
    this.movement = 120;
    this.hitDice = "3d8";
    this.armourClass = 7;
    this.Alignment = Neutral / LawfulEvil;   // not sure if this varies as the form taken, or is a random probability
    this.specialAbillities.add({ description = "Move Silently" });
    this.specialAbillities.add({ description = "Summon Rats 1-100" });
    }
function Werebear(params) {
    this.Name = "Werebear";
    this.movement = 90;
    this.hitDice = "6d8";
    this.armourClass = 2;
    this.Alignment = Neutral / ChaoticGood;   // not sure if this varies as the form taken, or is a random probability
    }
function Weretiger(params) {
    this.Name = "Weretiger";
    this.movement = 120;
    this.hitDice = "5d8";
    this.armourClass = 3;
    this.Alignment = Neutral / ChaoticEvil;   // not sure if this varies as the form taken, or is a random probability
    }
function Werewolf(params) {
    this.Name = "Werewolf";
    this.movement = 150;
    this.hitDice = "4d8";
    this.armourClass = 5;
    this.Alignment = Neutral / LawfulEvil;   // not sure if this varies as the form taken, or is a random probability
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
function Medusa(params) {
    this.name = "Medusa";
    this.movement = 90;
    this.hitDice = "4d8";
    this.armourClass = 8;
    this.treasureType = "F";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d6" }];
    this.specialAbilities = [{ PetrifyingGaze }];
        }
function Minotaur(params) {
    this.name = "Minotaur";
    this.movement = 120;
    this.hitDice = "6d8";
    this.armourClass = 6;
    this.treasureType = "C";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = HornAttack, damageAmount = "1d6" }, { attackType = HornAttack, damageAmount = "1d6" }, { attackType = BiteAttack, damageAmount = "1d6" }];
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
function OchreJelly(params) {
    this.name = "Ochre Jelly";
    this.movement = 30;
    this.hitDice = "5d8";
    this.armourClass = 8;
    this.treasureType = null;
    this.attacks = [{ attackType = DisolveAttack, damageAmount = "2d6" }];
    this.specialAbiities = [{ description = "disolves organic material" }, { description = "Seeps Through Cracks" }];
    }
function Ogre(params) {
    this.name = "Ogre";
    this.movement = 90;
    this.hitDice = "4d8+1";
    this.armourClass = 6;
    this.treasureType = "C" + "1000gp / 1d6 * 100gp outside lair";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d10" }];
    }
function Orc(params) {
    this.name = "Orc";
    this.movement = 90;
    this.hitDice = "1d8";
    this.armourClass = 7;
    this.treasureType = "D";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d6" }];
    this.specialAbilities = [{ description = "- 1 Attack in Daylight" }];
}
function OwlBear(params) {
    this.name = "Owl Bear";
    this.movement = 120;
    this.hitDice = "5d8";
    this.armourClass = 5;
    this.treasureType = "C";
    this.Alignment = Neutral;
    this.attacks = [{ attackType = BeakAttack, damageAmount = "1d8" }, { attackType = ClawAttack, damageAmount = "1d8" }, { attackType = HugAttack, damageAmount = "1d8" }];
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
function Pixie(params) {
    this.name = "Pixie";
    this.movement = [{ movementType=Ground, movementRate = 90 }, { movementType=Flying, movementRate = 180 }];
    this.hitDice = "1d8";
    this.armourClass = 3;
    this.treasureType = "R + S";
    this.Alignment = [{ alignment = Neutral, probability = 50 } / { alignment = ChaoticGood, probability = 50 }];
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d4", note = "possibly ranged" }];
    this.SpecialAbilities = [{ description = "Invisible" }, { description = "Can AttackWhile Invisible" }, { description = "Fly for 3 turns then rest a turn" }];
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
function RustMonster(params) {
    this.name = "Rust Monster";
    this.movement = 120;
    this.hitDice = "5d8";
    this.armourClass = 2;
    this.treasureType = null;
    this.Alignment = Neutral;
    this.attacks = [{ attackType = UnspecifiedAttck, damageAmount = null, special = " Rusts metal" }];
}
function Shadow(params) {
    this.name = "Shadow";
    this.movement = 90;
    this.hitDice = "2D+2";
    this.armourClass = 7;
    this.treasureType = "F";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = TouchAttack, damageAmount = "1d4", special = "Drains 1 point of Strength - at 0 points you become a shadow" }];
    this.specialAbilities = [{ description = "Non-corporeal" }, { description = "Intelligent" }, { description = "Immune to Non-Magical Weapons" }, { description = "Immune to sleep and charm spells" }];
}
function Skeleton(params) {
    this.name = "Skeleton";
    this.movement = 60;
    this.hitDice = "1d4";
    this.armourClass = 8;
    this.treasureType = null;
    this.Alignment = Neutral;
    this.attacks = 1;
    this.damage = [{ attackType = WeaponAttack, damageAmount = "1d6" }];
    this.specialAbilities = [{ description = "Immune to sleep, charm and mind reading" }];
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
function Stirge(params) {
    this.name = "Stirge";
    this.movement = 180;
    this.hitDice = "1d8";
    this.armourClass = 7;
    this.treasureType = "Q";
    this.Alignment = Neutral;
    this.attacks = 1;
    this.damage = [{ attackType = BeakAttack, damageAmount = "1d3" }];
    this.specialAbiities = [{ description = "Sucks blood after successful attack", damageAmount = "1d4" }, { description = "+ 2 all attacks" }];
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
    function Wight(params) {
        this.name = "Wight";
        this.movement = 90;
        this.hitDice = "3d8";
        this.armourClass = 5;
        this.treasureType = "B";
        this.Alignment = LawfulEvil;
        this.attacks = [{ attackType = touchAttack, damageAmount = 0, special = "drain 1 level, SlaveResurrection" }];
        this.specialAbilities[{ description = "Immune to Normal weapons" }];
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
    function YellowMold(params) {
        this.name = "Yellow Mold";
        this.movement = Immobile;
        this.hitDice = "2d8";
        this.armourClass = "always hit";
        this.treasureType = null;
        this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d6" }];
        this.specialAbilities = [{ description = "Can Only Be killed by Fire" }, { description = "Disolves organic material" }, {description = " On rough contact releases spores - 10 area save vs poison or suffocting death"}, { description = "per 10 square feet of mold" }];
    }
function Zombie(params) {
    this.name = "Zombie";
    this.movement = 120;
    this.hitDice = "2d8";
    this.armourClass = 8;
    this.treasureType = null;
    this.Alignment = Neutral;
    this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d8" }];
    this.specialAbilities = [{ description = "Immune to Sleep, Charm, ESP" }, { description = "Slow, can only attack every other round" }];
}
*/