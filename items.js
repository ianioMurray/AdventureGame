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
	this.isRanged = false;
}

Weapon.prototype = new Item();
Weapon.prototype.constructor = Weapon;

//-----------------------------------------
//-------------Sword-----------------------
//-----------------------------------------
function Sword(params)
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 10;
	this.damage = 8;
	this.typeOfWeapon = "sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Sword.prototype = new Weapon();
Sword.prototype.constructor = Sword;

//-----------------------------------------
//--------two handed Sword-----------------
//-----------------------------------------
function TwoHandedSword(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 15;
	this.damage = 10;
	this.typeOfWeapon = "two handed sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

TwoHandedSword.prototype = new Weapon();
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
	this.damage = 6;
	this.typeOfWeapon = "short sword";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

ShortSword.prototype = new Weapon();
ShortSword.prototype.constructor = ShortSword;

//-----------------------------------------
//-------------Dagger-----------------------
//-----------------------------------------
function Dagger(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 3;
	this.damage = 4;
	this.typeOfWeapon = "dagger";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Dagger.prototype = new Weapon();
Dagger.prototype.constructor = Dagger;

//-----------------------------------------
//---------Silver Dagger-------------------
//-----------------------------------------
function SilverDagger(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 30;
	this.damage = 4;
	this.typeOfWeapon = "silver dagger";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

SilverDagger.prototype = new Weapon();
SilverDagger.prototype.constructor = SilverDagger;

//-----------------------------------------
//--------------Hand Axe-------------------
//-----------------------------------------
function HandAxe(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 4;
	this.damage = 6;
	this.typeOfWeapon = "hand axe";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

HandAxe.prototype = new Weapon();
HandAxe.prototype.constructor = HandAxe;

//-----------------------------------------
//-------------Battle Axe------------------
//-----------------------------------------
function BattleAxe(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 7;
	this.damage = 8;
	this.typeOfWeapon = "battle axe";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

BattleAxe.prototype = new Weapon();
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
	this.damage = 6;
	this.typeOfWeapon = "mace";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Mace.prototype = new Weapon();
Mace.prototype.constructor = Mace;

//-----------------------------------------
//----------------Club---------------------
//-----------------------------------------
function Club(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 3;
	this.damage = 4;
	this.typeOfWeapon = "club";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Club.prototype = new Weapon();
Club.prototype.constructor = Club;

//-----------------------------------------
//--------------Pole Arm-------------------
//-----------------------------------------
function PoleArm(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 7;
	this.damage = 10;
	this.typeOfWeapon = "pole arm";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

PoleArm.prototype = new Weapon();
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
	this.damage = 6;
	this.typeOfWeapon = "spear";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Spear.prototype = new Weapon();
Spear.prototype.constructor = Spear;

//-----------------------------------------
//-------------War Hammer------------------
//-----------------------------------------
function WarHammer(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 5;
	this.damage = 6;
	this.typeOfWeapon = "war hammer";
	this.isMagical = params.isMagical;
	this.special = params.special;
}

WarHammer.prototype = new Weapon();
WarHammer.prototype.constructor = WarHammer;

//-----------------------------------------
//--------------Crossbow-------------------
//-----------------------------------------
function Crossbow(params)
 {
	this.name = params.name;
	this.description = params.description;
	this.cost = 30;
	this.damage = 6;
	this.typeOfWeapon = "crossbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.requires = "quarrel";
}

Crossbow.prototype = new Weapon();
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
	this.damage = 6;
	this.typeOfWeapon = "longbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.requires = "arrow";
}

Longbow.prototype = new Weapon();
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
	this.damage = 6;
	this.typeOfWeapon = "shortbow";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.requires = "arrow";
}

Shortbow.prototype = new Weapon();
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
	this.damage = 4;
	this.typeOfWeapon = "sling";
	this.isMagical = params.isMagical;
	this.special = params.special;
	this.isRanged = true;
	this.requires = "stones";
}

Sling.prototype = new Weapon();
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
	this.type = "leather";
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
	this.type = "chain";
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
	this.type = "plate";
}

PlateMail.prototype = new Armour();
PlateMail.prototype.constructor = Armour;

//------------------------------------------
//---------------MISC-----------------------
//------------------------------------------
function Quarrel()
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.3;
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Quarrel.prototype = new Item();
Quarrel.prototype.constructor = Item;


function Arrow()
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.25;
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Arrow.prototype = new Item();
Arrow.prototype.constructor = Item;

function Stone()
{
	this.name = params.name;
	this.description = params.description;
	this.cost = 0.03;
	this.isMagical = params.isMagical;
	this.special = params.special;
}

Stone.prototype = new Item();
Stone.prototype.constructor = Item;
