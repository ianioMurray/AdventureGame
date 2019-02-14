//----------------------------------------
//			      ITEMS 
//----------------------------------------
function Item() 
{
}


//------------------------------------------
//---------------WEAPONS--------------------
//------------------------------------------
function Weapon()
{
	this.equipTo = "hand";
	this.is2Handed = false;

}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;

//------------------------------------------
//---------------MELEE WEAPON---------------
//------------------------------------------
function MeleeWeapon()
{
	this.isRanged = false;
}

MeleeWeapon.prototype = new Weapon();
MeleeWeapon.prototype.constructor = MeleeWeapon;

//-----------------------------------------
//-------------Sword-----------------------
//-----------------------------------------
function Sword(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 10;
	this.damage = "D8";
	this.id = "sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Sword.prototype = new MeleeWeapon();
Sword.prototype.constructor = Sword;

//-----------------------------------------
//--------two handed Sword-----------------
//-----------------------------------------
function TwoHandedSword(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 15;
	this.damage = "D10";
	this.id = "two handed sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

TwoHandedSword.prototype = new MeleeWeapon();
TwoHandedSword.prototype.constructor = TwoHandedSword;
TwoHandedSword.prototype.is2Handed = true;

//-----------------------------------------
//--------short Sword-----------------
//-----------------------------------------
function ShortSword(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 7;
	this.damage = "D6";
	this.id = "short sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

ShortSword.prototype = new MeleeWeapon();
ShortSword.prototype.constructor = ShortSword;

//-----------------------------------------
//-------------Dagger-----------------------
//-----------------------------------------
function Dagger(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 3;
	this.damage = "D4";
	this.id = "dagger";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Dagger.prototype = new MeleeWeapon();
Dagger.prototype.constructor = Dagger;

//-----------------------------------------
//---------Silver Dagger-------------------
//-----------------------------------------
function SilverDagger(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 30;
	this.damage = "D4";
	this.id = "silver dagger";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

SilverDagger.prototype = new MeleeWeapon();
SilverDagger.prototype.constructor = SilverDagger;

//-----------------------------------------
//--------------Hand Axe-------------------
//-----------------------------------------
function HandAxe(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 4;
	this.damage = "D6";
	this.id = "hand axe";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

HandAxe.prototype = new MeleeWeapon();
HandAxe.prototype.constructor = HandAxe;

//-----------------------------------------
//-------------Battle Axe------------------
//-----------------------------------------
function BattleAxe(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 7;
	this.damage = "D8";
	this.id = "battle axe";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

BattleAxe.prototype = new MeleeWeapon();
BattleAxe.prototype.constructor = BattleAxe;
BattleAxe.prototype.is2Handed = true;

//-----------------------------------------
//----------------Mace---------------------
//-----------------------------------------
function Mace(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 5;
	this.damage = "D6";
	this.id = "mace";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Mace.prototype = new MeleeWeapon();
Mace.prototype.constructor = Mace;

//-----------------------------------------
//----------------Club---------------------
//-----------------------------------------
function Club(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 3;
	this.damage = "D4";
	this.id = "club";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Club.prototype = new MeleeWeapon();
Club.prototype.constructor = Club;

//-----------------------------------------
//--------------Pole Arm-------------------
//-----------------------------------------
function PoleArm(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 7;
	this.damage = "D10";
	this.id = "pole arm";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

PoleArm.prototype = new MeleeWeapon();
PoleArm.prototype.constructor = PoleArm;
PoleArm.prototype.is2Handed = true;

//-----------------------------------------
//----------------Spear--------------------
//-----------------------------------------
function Spear(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 3;
	this.damage = "D6";
	this.id = "spear";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Spear.prototype = new MeleeWeapon();
Spear.prototype.constructor = Spear;

//-----------------------------------------
//-------------War Hammer------------------
//-----------------------------------------
function WarHammer(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 5;
	this.damage = "D6";
	this.id = "war hammer";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

WarHammer.prototype = new MeleeWeapon();
WarHammer.prototype.constructor = WarHammer;

//-----------------------------------------
//----------------Fist---------------------
//-----------------------------------------
function Fist()
 {
	this.name = "fist";
	this.damage = "D4";
	this.id = "fist";
}

Fist.prototype = new MeleeWeapon();
Fist.prototype.constructor = Fist;

//------------------------------------------
//---------------RANGED WEAPON---------------
//------------------------------------------
function RangedWeapon()
{
	this.isRanged = true;
}

RangedWeapon.prototype = new Weapon();
RangedWeapon.prototype.constructor = RangedWeapon;


//-----------------------------------------
//--------------Crossbow-------------------
//-----------------------------------------
function Crossbow(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 30;
	this.damage = "D6";
	this.id = "crossbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.ammoId = "quarrel";
}

Crossbow.prototype = new RangedWeapon();
Crossbow.prototype.constructor = Crossbow;
Crossbow.prototype.is2Handed = true;

//-----------------------------------------
//---------------Longbow-------------------
//-----------------------------------------
function Longbow(params)
	{
	this.name = params.name;
	this.description = params.description;
	this.cost = 40;
	this.damage = "D6";
	this.id = "longbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.ammoId = "arrow";
}

Longbow.prototype = new RangedWeapon();
Longbow.prototype.constructor = Longbow;
Longbow.prototype.is2Handed = true;        //there is nothing in the rules to say this but it just doesnt make sense for this not to be true
	
//-----------------------------------------
//--------------Shortbow-------------------
//-----------------------------------------
function Shortbow(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 25;
	this.damage = "D6";
	this.id = "shortbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.ammoId = "arrow";
}

Shortbow.prototype = new RangedWeapon();
Shortbow.prototype.constructor = Shortbow;
Shortbow.prototype.is2Handed = true;        //there is nothing in the rules to say this but it just doesnt make sense for this not to be true

//-----------------------------------------
//---------------sling---------------------
//-----------------------------------------
function Sling(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 1;                        //rules set price at 2 with 30 stones so I have made price 1 and then stones will be 1 as well
	this.damage = "D4";
	this.id = "sling";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.ammoId = "stone";
}

Sling.prototype = new RangedWeapon();
Sling.prototype.constructor = Sling;
Sling.prototype.is2Handed = true;        //there is nothing in the rules to say this but it just doesnt make sense for this not to be true


//------------------------------------------
//---------------SHIELD---------------------
//------------------------------------------
function Shield(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 10;
	this.id = "shield";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.equipTo = "hand";
}

Shield.prototype = new Item();
Shield.prototype.constructor = Item;


//------------------------------------------
//---------------ARMOUR---------------------
//------------------------------------------
function Armour()
{
	this.equipTo = "body";
}

Armour.prototype = new Item();
Armour.prototype.constructor = Item;

//------------------------------------------
//------------Leather Armour----------------
//------------------------------------------
function LeatherArmour(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 20;
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.armourClass = 7;
	this.id = "leather armour";
}

LeatherArmour.prototype = new Armour();
LeatherArmour.prototype.constructor = Armour;

//------------------------------------------
//-------------Chain Mail-------------------
//------------------------------------------
function ChainMail(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 40;
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.armourClass = 5;
	this.id = "chain mail";
}

ChainMail.prototype = new Armour();
ChainMail.prototype.constructor = Armour;

//------------------------------------------
//---------------Plate Mail-----------------
//------------------------------------------
function PlateMail(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 60;
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.armourClass = 3;
	this.id = "plate mail";
}

PlateMail.prototype = new Armour();
PlateMail.prototype.constructor = Armour;

//------------------------------------------
//---------------MISC-----------------------
//------------------------------------------
function Quarrel(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.3;
	this.id = "quarrel";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Quarrel.prototype = new Item();
Quarrel.prototype.constructor = Item;


function Arrow(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.25;
	this.id = "arrow";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Arrow.prototype = new Item();
Arrow.prototype.constructor = Item;

function Stone(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.03;
	this.id = "stone";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Stone.prototype = new Item();
Stone.prototype.constructor = Item;
