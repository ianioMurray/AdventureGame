


//--------------------------------------------
//             MONSTERS
//--------------------------------------------

function Monster()
{
    this.attack = function(opponent)
    {
        for(var i=0; this.attacks.length > i; i++ )
        {
            var hit = this.rollToHit();

            if(hit)
            {
                //all attacks will be against an opponent even if they die. 
                opponent.takeDamage(dice.rollDice(this.attacks[i].damage));
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

    this.GetHPs = function()
    {
        return dice.rollDice(this.hitDice + "D8");
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
    this.hitDice = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 60;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: "Cleric", level: 1};
    this.morale = 7;
    this.treasureType = "U";
    //this.Alignment = [{ alignment: Lawful, probability: 33 }, { alignment: Chaotic, probability: 33 }, { alignment: Neutral, probability: 34 }];
}

Acolyte.prototype = new Monster()
Acolyte.prototype.Constructor = Acolyte;
Acolyte.getNumberAppearing = function() {return dice.rollDice("1D8")};


//--------------------------------------------
//-------------Ape, White---------------------
//--------------------------------------------
function Ape()
{
    this.name = "White Ape";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = 4;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: "1d4" }, { attackType: "Claw", damage: "1d4" }];
    this.saveAs = { class: "Fighter", level: 2};
    this.morale = 7;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

Ape.prototype = new Monster()
Ape.prototype.Constructor = Ape;
Ape.getNumberAppearing = function() {return dice.rollDice("1D6")};


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
    this.hitDice = 1;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "WeaponAttack", damage: "1d6" }];
    this.saveAs = { class: "Thief", level: 1};  
    this.morale = 8;
    this.treasureType = "U";
    //this.Alignment = [{ alignment: Chaotic, probability: 50 }, { alignment: Neutral, probability: 50 }];
}

Bandit.prototype = new Monster()
Bandit.prototype.Constructor = Bandit;
Bandit.getNumberAppearing = function() {return dice.rollDice("1D8")};


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
    this.hitPoints = 1;
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Confusion", damage: "0D4" }]; //does no damage
    this.saveAs = { class: "Human", level: 0};  
    this.morale = 6;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

Bat.prototype = new Monster()
Bat.prototype.Constructor = Bat;
Bat.getNumberAppearing = function() {return dice.rollDice("1D100")};


//--------------------------------------------
//---------------Bat, Giant-------------------
//--------------------------------------------

function BatGiant()
 {
    this.name = "Giant Bat";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = 2;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 180;
    this.attacks = [{ attackType: "Bite", damage: "1D4" }]; 
    this.saveAs = { class: "Fighter", level: 1};  
    this.morale = 8;
    this.treasureType = "Nil";
    //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BatGiant.prototype = new Monster()
BatGiant.prototype.Constructor = BatGiant;
BatGiant.getNumberAppearing = function() {return dice.rollDice("1D10")};


//--------------------------------------------
//---------------Bear, Black------------------
//--------------------------------------------

function BearBlack()
 {
    this.name = "Black Bear";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = 4;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: "1D3" }, { attackType: "Claw", damage: "1D3" }, { attackType: "Bite", damage: "1D6"}]; 
    this.saveAs = { class: "Fighter", level: 2};  
    this.morale = 7;
    this.treasureType = "U";
   // this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearBlack.prototype = new Monster()
BearBlack.prototype.Constructor = BearBlack;
BearBlack.getNumberAppearing = function() {return dice.rollDice("1D4")};

//--------------------------------------------
//---------------Bear, Grizzly------------------
//--------------------------------------------

function BearGrizzly()
 {
    this.name = "Grizzly Bear";
    this.race = "animal";
    this.armourClass = 6;
    this.hitDice = 5;
    this.hitPoints = this.GetHPs();
    this.currentHitPoints = this.hitPoints;
    this.isDead = false;
    this.movement = 120;
    this.attacks = [{ attackType: "Claw", damage: "1D4" }, { attackType: "Claw", damage: "1D4" }, { attackType: "Bite", damage: "1D8"}]; 
    this.saveAs = { class: "Fighter", level: 2};  
    this.morale = 8;
    this.treasureType = "U";
   //this.Alignment = [{ alignment: Neutral, probability: 100 }];
}

BearGrizzly.prototype = new Monster()
BearGrizzly.prototype.Constructor = BearGrizzly;
BearGrizzly.getNumberAppearing = function() { return 1 };






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
function Berserker(params) {
    this.name = "Berserker";
    this.movement = 120;
    this.hitDice = "1d8+1";
    this.armourClass = 7;
    this.treasureType = "J";
    this.Alignment = Neutral;
    this.attacks = { attackType = WeaponAttack, damageAmount = "1d8" };
    this.specialAbilities = [{ AttackRollBonus, value=+2, against =[Men, Kobolds, Goblins, Orcs] }, { NoRetreatOrSurrender }];
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
function Bugbear(params) {
    this.name = "Bugbear";
    this.movement = 90;
    this.hitDice = "3d8+1";
    this.armourClass = 5;
    this.treasureType = "B";
    this.Alignment = ChaoticEvil;
    this.attacks = { attackType = WeaponAttack, damageAmount = "2d4" };
    this.specialAbilities = [{ description = "surprise 50% due to their stealth" }];
}
function CarrionCrawler(params) {
    this.name = "Carrion Crawler";
    this.movement = 120;
    this.hitDice = "3d8+1";
    this.armourClass = 7;
    this.treasureType = "B";
    this.Alignment = Neutral;
    this.attacks = { attackType = TentacleAttack, Quantity = 8 };		// Needs work
    this.specialAbilities = [{ description = "Can walk on walls and ceilings" }, { description = "Paralysing touch" }];
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
function Doppleganger(params) {
    this.name = "Doppleganger";
    this.movement = 90;
    this.hitDice = "4d8";
    this.armourClass = 5;
    this.treasureType = "E";
    this.Alignment = [{ alignment = ChaoticEvil, probability = 50 }, { alignment = Neutral, probability = 50 }];
    this.attacks = [{ attackType = UnspecifiedAttack, damageAmount = "1d12" }];
    this.specialAbilities = [{ description = "able to shape itself into the double of any humanoid creature (up to seven or so feet tall) it observes" },
        { description = "Save Vs Spells bonus", modifierAmount = + 10 },
        { description = "Save vs Wands bonus", modifierAmount = +7 }];
}
function Dragon(params) {
    this.name = "Dragon";
    this.movement = [{ movementType = Ground, movementRate = 90 }, { movementRate = 240, movementType = Flying }];
    this.armourClass = "2";
    this.treasureType = "H";
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d6" }, { attackType = ClawAttack, damageAmount = "1d6" }, { attackType = BiteAttack, damageAmount = "3d8" }];
}
function WhiteDragon(params) {
    Dragon.Call();
    this.specialAbilities = [{ description = "BreathWeapon: Cold", area= "80 foot X 30 foot cone" }];
    this.hitDice = { Min = "5d8", Max = "7d8" };
    this.Alignment = [{ alignment = Neutral, probability = 50 }, { alignment = ChaoticEvil, probability =  50 }];
}
function BlackDragon(params) {
    Dragon.Call();
    this.specialAbilities = [{ description = "BreathWeapon: acid", area= "60 foot X 5 foot line" }];
    this.hitDice = { Min = "6d8", Max = "8d8" };
    this.Alignment = [{ alignment = ChaoticEvil, probability = 50 }, { alignment = Neutral, probability = 50 }];
}
function RedDragon(params) {
    Dragon.Call();
    this.specialAbilities = [{ description = "BreathWeapon: fire", area= "90 foot X 30 foot cone" }];
    this.hitDice = { Min = "9d8", Max = "11d8" };
    this.Alignment = ChaoticEvil;
}
function BrassDragon(params) {
    Dragon.Call();
    this.specialAbilities = [{ description = "BreathWeapon: Sleep/Fear", area= "70 foot X 20 foot cone/50 foot X 40 foot cloud" }];
    this.hitDice = { Min= "6d8", Max= "8d8" };
    this.Alignment = [{ alignment = Neutral, probability = 50 }, { alignment = ChaoticGood, probability = 50 }];
}
function Gargoyle(params) {
    this.name = "Gargoyle";
    this.movement = [{ movementType = Gound, movementRate = 90 }, { movementType = Flying, movementRate = 150 }];
    this.hitDice = "4d8";
    this.armourClass = 5;
    this.treasureType = "C";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d4" }, { attackType = ClawAttack, damageAmount = "1d4" }, { attackType = ClawAttack, damageAmount = "1d4" }, { attackType = ClawAttack, damageAmount = "1d4" }];
    this.specialAbilities[{ description = "semi-intelligent and cunning" }, { description = "can only be hit with magic weapons" }];
}
function GelatinousCube(params) {
    this.name = "Gelatinous Cube";
    this.movement = 60;
    this.hitDice = "4d8";
    this.armourClass = 8;
    this.treasureType = variable;
    this.attacks = [{ attackType = DissolveAttack, damageAmount = "2d4" }];
    this.specialAbilities = [{ description = "Flesh that comes into contact with the cube is anesthetized unless a saving throw a-gainst paralysis is made." }, { description = "Immune to cold, lightning or most spells" }];
}
function Ghoul(params) {
    this.name = "Ghoul";
    this.movement = 90;
    this.hitDice = "2d8";
    this.armourClass = 6;
    this.treasureType = "B";
    this.Alignment = ChaoticEvil;
    this.attacks = [{ attackType = ClawAttack, damageAmount = "1d3" }, { attackType = ClawAttack, damageAmount = "1d3" }, { attackType = BiteAttack, damageAmount = "1d3" }];
    this.specialAbilities = [{ description = "Paralyze any human/humanoid figure they touch except elves who are immune" }];
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
function Gnome(params) {
    this.name = "Gnome";
    this.movement = 60;
    this.hitDice = "1d8";
    this.armourClass = 5;
    this.treasureType = "C";
    this.Alignment = [{ alignment = ChaoticGood, probability =  75 }, { alignment = Neutral, probability =  25 }];
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d6" }];
}
function Goblin(params) {
    this.name = "Goblin";
    this.movement = 60;
    this.hitDice = "1d8-1"; // Minimum 1
    this.armourClass = 6;
    this.treasureType = "L";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d6" }];
    this.specialAbilities = [{ description = "-1 off attack die roll in daylight" }, { description = "can see in the dark" }, { description = "Always attack dwarves on sight" }];
};
function GrayOoze(params) {
    this.name = "Gray Ooze";
    this.movement = 10;
    this.hitDice = "3d8";
    this.armourClass = 8;
    this.treasureType = null;
    this.attacks = [{ attackType = DissolveAttack, damageAmount = "2d8" }];
    this.specialAbilities = [{ description = "resembles wet stone and difficult to detect" }, { description = "Can corrode metal in one turn" }, { description = "Immune to cold and fire" }];
}
function GreenSlime(params) {
    this.name = "Green Slime";
    this.movement = 0;
    this.hitDice = "2d8";
    this.armourClass = "can always be hit";
    this.treasureType = null;
    this.attacks = [{ attackType = DissolveAttack }];
    this.specialAbilities = [{ description = "Non-mobile" },
    { description = "Immune to all damage except fire and cold" },
    { description = "Eats everything but stone" },
    { description = "Sticks to flesh , turning the flesh into green slime. Can only be remeved by Cure Disease spell" }];
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
function Hobgoblin(params) {
    this.name = "Hobgoblin";
    this.movement = 90;
    this.hitDice = "1d8+1";
    this.armourClass = 6;
    this.treasureType = "D";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = WeaponAttack.damageAmount = "1d8" }];
    this.specialAbilities = [{ Name= "MoraleModifier", Value= +1 }];
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
function Kobold(params) {
    this.name = "Kobold";
    this.movement = 120;
    this.hitDice = "1d4";
    this.armourClass = 7;
    this.treasureType = "J";
    this.Alignment = LawfulEvil;
    this.attacks = [{ attackType = WeaponAttack, damageAmount = "1d4" }];
    this.specialAbilities = [{ Name = "infravision" }];
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