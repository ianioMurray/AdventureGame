"use strict"

//character 	
var magaicUserTestParams = { 
	name: "kazam",
	strength: 8,
	intelligence: 15,
	wisdom: 13,
	dexterity: 12,
	constitution: 7,
	chrisma: 15
};
	
var fighterTestParams = { 
	name: "Conan",
	strength: 18,
	intelligence: 5,
	wisdom: 8,
	dexterity: 14,
	constitution: 11,
	chrisma: 6
};

var clericTestParams = { 
	name: "Radagast",
	strength: 13,
	intelligence: 8,
	wisdom: 17,
	dexterity: 5,
	constitution: 8,
	chrisma: 16
};

var thiefTestParams = { 
	name: "Sticky",
	strength: 5,
	intelligence: 17,
	wisdom: 3,
	dexterity: 18,
	constitution: 17,
	chrisma: 11
};

var fighterWithAwfulStatsParams = {
	name: "Sickly",
	strength: 3,
	intelligence: 3,
	wisdom: 3,
	dexterity: 3,
	constitution: 3,
	chrisma: 3
};

var fighterWithAwesomeStatsParams = {
	name: "Super Butler",
	strength: 18,
	intelligence: 18,
	wisdom: 18,
	dexterity: 18,
	constitution: 18,
	chrisma: 18
};

var fighterWithAverageStatsParams = {
	name: "Jo Average",
	strength: 11,
	intelligence: 11,
	wisdom: 11,
	dexterity: 11,
	constitution: 11,
	chrisma: 11
};


//weapons
var swordParams = {
	name: "Sword",
	description: "standard sword",
	isMagical: false,
	special: "",
};

var twoHandedSwordParams = {
	name: "Two Handed Sword",
	description: "standard two handed sword",
	isMagical: false,
	special: ""
};

var shortSwordParams = {
	name: "Short Sword",
	description: "standard short sword",
	isMagical: false,
	special: ""
};

var daggerParams = {
	name: "Dagger",
	description: "standard dagger",
	isMagical: false,
	special: ""
};

var silverDaggerParams = {
	name: "Silver Dagger",
	description: "silver dagger",
	isMagical: false,
	special: ""
};

var handAxeParams = {
	name: "Hand Axe",
	description: "standard hand axe",
	isMagical: false,
	special: ""
};

var battleAxeParams = {
	name: "Battle Axe",
	description: "standard battle axe",
	isMagical: false,
	special: ""
};

var maceParams = {
	name: "Mace",
	description: "standard mace",
	isMagical: false,
	special: ""
};

var clubParams = {
	name: "Club",
	description: "standard club",
	isMagical: false,
	special: ""
};

var poleArmParams = {
	name: "Pole Arm",
	description: "standard pole arm",
	isMagical: false,
	special: ""
};

var spearParams = {
	name: "Spear",
	description: "standard spear",
	isMagical: false,
	special: ""
};

var warHammerParams = {
	name: "War Hammer",
	description: "standard war hammer",
	isMagical: false,
	special: ""
};

var crossbowParams = {
	name: "Crossbow",
	description: "standard crossbow",
	isMagical: false,
	special: ""
};

var longbowParams = {
	name: "Longbow",
	description: "standard longbow",
	isMagical: false,
	special: ""
};

var shortbowParams = {
	name: "Shortbow",
	description: "standard shortbow",
	isMagical: false,
	special: ""
};

var slingParams = {
	name: "Sling",
	description: "standard sling",
	isMagical: false,
	special: ""
};

//armour
var leatherArmourParams = {	
	name: "Leather Armour",
	description: "Leather Armour",
	isMagical: false,
	special: ""
};	

var chainArmourParams = {	
	name: "Chain Mail Armour",
	description: "Chain Mail Armour", 
	isMagical: false,
	special: ""
};

var plateArmourParams = {	
	name: "Plate Mail Armour",
	description: "Plate Mail Armour",
	isMagical: false,
	special: ""
};	

//shield	
var shieldParams = {
	name: "Shield",
	description: "Standard Shield",
	isMagical: false,
	special: ""
};

//misc
var quarrelParams = {
	name: "Quarrel",
	description: "Standard Quarrel",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 30
};

var arrowParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 20
};

var stoneParams = {
	name: "Stone",
	description: "Standard Sling Stone",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 30
};

var arrowNotFullParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 10
};

var arrow8UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 8
};

var arrow7UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 7
};

var arrow18UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 18
};

var arrow11UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 11
};

var arrow2UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 2
};

var arrow15UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 15
};

var arrow20UsesParams = {
	name: "Arrow",
	description: "Standard Arrow",
	isMagical: false,
	special: "",
	remainingNumberOfUses: 20
};



//run tests
var tests = new Tests();
runCharacterUnitTests();
runInventoryUnitTests();
runWeaponUnitTests();
//runAmmoTests();
const noOfTests = 200;
runDiceUnitTests();
tests.testResults();

//runTestCombatvCharacter();
runTestCombatvMonsters();


function Tests()
{
	this.allTestsPass = true;
	this.noOfFailingTests = 0;
	this.totalTests = 0;
	
	this.validate = function(expected, actual, message)
	{
		this.totalTests++;	
		
		if(actual !== expected)
		{
			this.allTestsPass = false;
			this.noOfFailingTests++;		

			console.log("%c"+ message, "color: red;");
		}
	};
	
	this.checkIsSpellCaster = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + " should be a spell caster: " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};

	this.checkHasWeaponRestrictions = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + " should have weapon restrictions: " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};
	
	this.checkHasArmourRestrictions = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + " should have armour restrictions: " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};

	this.checkCanUseShield = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + " should be able to use a shield: " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};

	this.checkUseableWeapon = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + " should be restricted to using " + expected + " different types of weapons but the value was " + actual;
		this.validate(expected, actual, message);
	};

	this.checkLevel = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + "'s level should be " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};

	this.checkMaxHitPointsEqualCurrentHitPoints = function(adventurer, maxHitPoints, currentHitPoints, expected, testName)
	{	
		var currentEqualsMaxHitPoints = (maxHitPoints === currentHitPoints);

		var message = " FAIL " + testName + ": character " + adventurer.name + "'s current and max Hit Points are equal: " + currentEqualsMaxHitPoints + " but " + expected + " was expected";
		this.validate(expected, currentEqualsMaxHitPoints, message);	
	}
	
	this.checkExperience = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": character " + adventurer.name + "'s experience should be " + expected + " but appears to be " + actual;
		this.validate(expected, actual, message);
	};
	
	this.checkDexterityBonus = function(adventurer, expected, actual, testName) 
	{
		var message = " FAIL " + testName + ": character " + adventurer.name + "'s dexterity bonus should be " + expected + " but appears to be " + actual;
		this.validate(expected, actual, message);	
	};
	
	this.checkStrengthBonus = function(adventurer, expected, actual, testName) 
	{
		var message = " FAIL " + testName + ": character " + adventurer.name + "'s strength bonus should be " + expected + " but appears to be " + actual;
		this.validate(expected, actual, message);		
	};
	
	this.checkConstitutionBonus = function(adventurer, expected, actual, testName) 
	{
		var message = " FAIL " + testName + ": character " + adventurer.name + "'s constitution bonus should be " + expected + " but appears to be " + actual;
		this.validate(expected, actual, message);	
	};
	
	this.checkItemEquiped = function(adventurer, item, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": item " + item + " equiped to " + adventurer.name + " was " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};
	
	this.checkItemUnEquiped  = function(adventurer, item, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": item " + item + " unequiped from " + adventurer.name + " was " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};
	
	this.checkArmourClass = function(adventurer, expected, actual, testName)
	{	
		var message = " FAIL " + testName + ": character " + adventurer.name + "'s armour class is " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};
	
	this.checkNoOfHandsFree = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": the number of hands " + adventurer.name + " has free is " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};
	
	this.checkIsArmourEquiped = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has armour equiped " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};
	
	this.checkSetHitPoints = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + "'s hit points are " + actual + " but should be " + expected;
		this.validate(expected, actual, message);
	};

	this.checkRequiredToHitRoles = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " requires a roll of " + actual + " to hit but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};		
		
	this.checkIfAttackHit = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + "'s attack hit was " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};
	
	this.checkIndividualInitiativeModifier = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + "'s individual initiative is " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};
	
	this.checkHitPoints = function(adventurer, expected, actual, testName)	
	{
		var message = " FAIL " + testName + ": " + adventurer.name + "'s hit points are " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};		
		
	this.checkIsDead = function(adventurer, expected, actual, testName)	
	{
		var message = " FAIL " + testName + ": " + adventurer.name + "'s was dead " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);	
	};	

	this.checkWeaponIsTwoHanded = function(weapon, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + weapon.name + " is 2 handed: " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkWeaponIsRanged = function(weapon, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + weapon.name + " is ranged: " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkGetEquipedWeapon = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " should has a " + actual + " as a weapon but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkIsInventoryFull = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " is able to add item to inventory: " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkAddItemToInventory = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has " + actual + " items in their inventory but " + expected + " was expected";
		this.validate(expected, actual, message);
	};
	
	this.checkIndexOfItemInInventory = function(adventurer, weaponName, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has " + weaponName + " at inventory index: " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkRemoveItemFromInventory = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has an inventory size of " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkIndexOfAmmo = function(adventurer, weaponName, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has an index of "  + actual + " for the ammo of the "  + weaponName + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkUseAmmo = function(adventurer, weaponName, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + adventurer.name + " has an inventory size of "  + actual + " after firing the "  + weaponName + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkNoOfDice = function(diceRoll, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + diceRoll + "'s number of dice was "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkTypeOfDice = function(diceRoll, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + diceRoll + "'s type of dice was "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkDiceModifier = function(diceRoll, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + diceRoll + "'s modifier was "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkDiceRange = function(diceRoll, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + diceRoll + "'s result was outside the range: "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkNumberOfUses = function(adventurer, ammoName, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + ammoName + "'s number of uses in this slot are: "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);		
	};

	this.checkIsCombinableInInventory = function(weaponName, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + weaponName + " is combinable in inventory: "  + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);	
	};

	this.testResults = function()
	{
		if(this.allTestsPass == true)
		{
			console.log("%c ----------------------------------------------------------------", "color: green;");
			console.log("%cPASS: all " + this.totalTests + " tests passed", "color: green;");
			console.log("%c----------------------------------------------------------------", "color: green;");	
		}
		else
		{		
			console.log("%c----------------------------------------------------------------", "color: red;");
			console.log("%cFAIL: " + this.noOfFailingTests + " of " + this.totalTests + " failed", "color: red;");
			console.log("%c----------------------------------------------------------------", "color: red;");			
		}
	};
}



function runCharacterUnitTests()
{	
	testIsSpellCaster();
	testHasWeaponRestrictions();
	testHasArmourRestrictions();
	testCanUseShield();
	testUseableWeapon();

	testGainExperience();
	testLevelUp();
	testMaxHitPointsEqualCurrentHitPointsAfterLevelingUp();
	
	testDexterityBonus();
	testStrengthBonus();
	testConstitutionBonus();
	
	testIndividualInitiativeBonus();
	
	testEquipDagger();
	testEquipSilverDagger();
	testEquipSword();
	testEquipTwoHandedSword();
	testEquipShortSword();
	testEquipHandAxe();
	testEquipBattleAxe();
	testEquipMace();
	testEquipClub();
	testEquipPoleArm();
	testEquipSpear();
	testEquipWarHammer();
	testEquipCrossbow();
	testEquipLongbow();
	testEquipShortbow();
	testEquipSling();

	testUnequipSword();
	
	testNoOfHandsFree();
	testEquipTwoHandedWeaponWhenOnlyOneHandFree();
	testEquipThirdHandItemFails();
	
	testIsArmourEquiped();
	testEquipLeatherArmour();
	testEquipChainMailArmour();
	testEquipPlateMailArmour();
	testEquipShield();
	testUnequipLeatherArmour();
	testEquipTwoSetsOfArmour();

	testCalculateArmourClass();

	testSetHitPoints();
	
	testRoleRequiredToHit();
	testGetEquipedWeapon();	
	testIndexOfAmmo();
	testUseAmmo();
	testIfAttackHits();
	testTakeDamage();
}

//-----------------------------------------------

function runInventoryUnitTests()
{
	testIsInventoryFull();
	testAddItemToInventory();
	testindexOfItemInInventroy();
	testRemoveItemFromInventory();
}

//-----------------------------------------------

function runWeaponUnitTests()
{
	testWeaponIsTwoHanded();
	testWeaponIsRanged();
	testIsCombinableInInventory();
}

//-----------------------------------------------

function runAmmoTests()
{
	//this should cause an exception to be thrown as it is not possible to create an instance of ammo with remainingNumberOfUses greater than MaxNumberOfUses
	var badStonesParams = {
		name: "Stone",
		description: "Standard Sling Stone",
		isMagical: false,
		special: "",
		remainingNumberOfUses: 50
	};
	
	var stone = new Stone(stoneParams);
	console.log(stone.remainingNumberOfUses);
	var badStone = new Stone(badStonesParams);
	console.log(badStone.remainingNumberOfUses);
}

//-----------------------------------------------

function testIsSpellCaster()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	tests.checkIsSpellCaster(magicUser, true, magicUser.isSpellCaster, testIsSpellCaster.name);
	tests.checkIsSpellCaster(fighter, false, fighter.isSpellCaster, testIsSpellCaster.name);
	tests.checkIsSpellCaster(cleric, true, cleric.isSpellCaster, testIsSpellCaster.name);
	tests.checkIsSpellCaster(thief, false, thief.isSpellCaster, testIsSpellCaster.name);
}

function testHasWeaponRestrictions()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	tests.checkHasWeaponRestrictions(magicUser, true, magicUser.hasWeaponRestrictions, testHasWeaponRestrictions.name);
	tests.checkHasWeaponRestrictions(fighter, false, fighter.hasWeaponRestrictions, testHasWeaponRestrictions.name);
	tests.checkHasWeaponRestrictions(cleric, true, cleric.hasWeaponRestrictions, testHasWeaponRestrictions.name);
	tests.checkHasWeaponRestrictions(thief, false, thief.hasWeaponRestrictions, testHasWeaponRestrictions.name);
}

function testHasArmourRestrictions()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	tests.checkHasArmourRestrictions(magicUser, true, magicUser.hasArmourRestrictions, testHasArmourRestrictions.name);
	tests.checkHasArmourRestrictions(fighter, false, fighter.hasArmourRestrictions, testHasArmourRestrictions.name);
	tests.checkHasArmourRestrictions(cleric, false, cleric.hasArmourRestrictions, testHasArmourRestrictions.name);
	tests.checkHasArmourRestrictions(thief, true, thief.hasArmourRestrictions, testHasArmourRestrictions.name);
}

function testCanUseShield()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	tests.checkCanUseShield(magicUser, false, magicUser.canUseShield, testCanUseShield.name);
	tests.checkCanUseShield(fighter, true, fighter.canUseShield, testCanUseShield.name);
	tests.checkCanUseShield(cleric, true, cleric.canUseShield, testCanUseShield.name);
	tests.checkCanUseShield(thief, false, thief.canUseShield, testCanUseShield.name);
}

function testUseableWeapon()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	tests.checkUseableWeapon(magicUser, 2, magicUser.useableWeapon.length, testUseableWeapon.name);
	tests.checkUseableWeapon(fighter, 0, fighter.useableWeapon.length, testUseableWeapon.name);
	tests.checkUseableWeapon(cleric, 4, cleric.useableWeapon.length, testUseableWeapon.name);
	tests.checkUseableWeapon(thief, 0, thief.useableWeapon.length, testUseableWeapon.name);
}

function testGainExperience() 
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	//newly created character with no experience
	tests.checkExperience(magicUser, 0, magicUser.experience, testGainExperience.name);
	//add 100 experience
	magicUser.gainExperience(100);
	tests.checkExperience(magicUser, 100, magicUser.experience, testGainExperience.name);	
		
	//newly created character with no experience
	tests.checkExperience(fighter, 0, fighter.experience, testGainExperience.name);
	//add 1500 experience
	fighter.gainExperience(1500);
	tests.checkExperience(fighter, 1500, fighter.experience, testGainExperience.name);	

	//newly created character with no experience
	tests.checkExperience(cleric, 0, cleric.experience, testGainExperience.name);
	//add 3400 experience
	cleric.gainExperience(3400);
	tests.checkExperience(cleric, 3400, cleric.experience, testGainExperience.name);	
		
	//newly created character with no experience
	tests.checkExperience(thief, 0, thief.experience, testGainExperience.name);
	//add 34 experience
	thief.gainExperience(34);
	tests.checkExperience(thief, 34, thief.experience, testGainExperience.name);

	//lose experience (I am thinking of drain level for the future)
	//subtract 10 experience
	thief.gainExperience(-10);
	tests.checkExperience(thief, 24, thief.experience, testGainExperience.name);	
}	

function testLevelUp()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var characters = [	{ classType: magicUser, secondLevel: 2500, thirdLevel: 5000 },
						{ classType: fighter, secondLevel: 2000, thirdLevel: 4000 },
						{ classType: cleric, secondLevel: 1500, thirdLevel: 3000 },
						{ classType: thief, secondLevel: 1200, thirdLevel: 2400 } ];

	for(var i = 0; characters.length > i; i++)
	{
		//newly created character 
		tests.checkLevel(characters[i].classType, 1, characters[i].classType.currentLevel, testLevelUp.name);

		//add experience so 1 pt less than 2nd level
		var secondLevelMinusOne = characters[i].secondLevel - 1;
		characters[i].classType.gainExperience(secondLevelMinusOne);
		tests.checkLevel(characters[i].classType, 1, characters[i].classType.currentLevel, testLevelUp.name);

		//add 1 more experience so total equals amount for 2nd level
		characters[i].classType.gainExperience(1);			
		tests.checkLevel(characters[i].classType, 2, characters[i].classType.currentLevel, testLevelUp.name);

		//add experience so 1 pt less than 3rd level
		var experienceRequiredToGetToThirdLevelMinusOne = (characters[i].thirdLevel - characters[i].secondLevel) - 1;
		var thirdLevelMinusOne = characters[i].thirdLevel - 1;
		characters[i].classType.gainExperience(experienceRequiredToGetToThirdLevelMinusOne);		
		tests.checkLevel(characters[i].classType, 2, characters[i].classType.currentLevel, testLevelUp.name);
		
		//add 1 more experience so total equals amount for 3rd level
		characters[i].classType.gainExperience(1);
		tests.checkLevel(characters[i].classType, 3, characters[i].classType.currentLevel, testLevelUp.name); 
	}
}

function testMaxHitPointsEqualCurrentHitPointsAfterLevelingUp()
{
	var fighter = new Fighter(fighterTestParams);
	
	//ensure new character's current hps equal their max hps
	tests.checkMaxHitPointsEqualCurrentHitPoints(fighter, fighter.maxHitPoints, fighter.currentHitPoints, true, testMaxHitPointsEqualCurrentHitPointsAfterLevelingUp.name);

	//take damage so max and current hitpoints should no longer be equal
	fighter.takeDamage(1);
	tests.checkMaxHitPointsEqualCurrentHitPoints(fighter, fighter.maxHitPoints, fighter.currentHitPoints, false, testMaxHitPointsEqualCurrentHitPointsAfterLevelingUp.name);
	
	//as character levels up their current hitpoints should be reset to the max hitpoints
	fighter.gainExperience(2500);
	tests.checkMaxHitPointsEqualCurrentHitPoints(fighter, fighter.maxHitPoints, fighter.currentHitPoints, true, testMaxHitPointsEqualCurrentHitPointsAfterLevelingUp.name);
}

function testDexterityBonus()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	
	tests.checkDexterityBonus(magicUser, 0, magicUser.calculateAttributeModifier(magicUser.dexterity), testDexterityBonus.name);
	tests.checkDexterityBonus(fighter, 1, fighter.calculateAttributeModifier(fighter.dexterity), testDexterityBonus.name);
	tests.checkDexterityBonus(thief, 3, thief.calculateAttributeModifier(thief.dexterity), testDexterityBonus.name);		
	tests.checkDexterityBonus(cleric, -2, cleric.calculateAttributeModifier(cleric.dexterity), testDexterityBonus.name);
	tests.checkDexterityBonus(fighterBad, -3, fighterBad.calculateAttributeModifier(fighterBad.dexterity), testDexterityBonus.name);		
	tests.checkDexterityBonus(fighterSuper, 3, fighterSuper.calculateAttributeModifier(fighterSuper.dexterity), testDexterityBonus.name);
	tests.checkDexterityBonus(fighterAverage, 0, fighterAverage.calculateAttributeModifier(fighterAverage.dexterity), testDexterityBonus.name);	
}

function testStrengthBonus()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	
	tests.checkStrengthBonus(magicUser, -1, magicUser.calculateAttributeModifier(magicUser.strength), testStrengthBonus.name);
	tests.checkStrengthBonus(fighter, 3, fighter.calculateAttributeModifier(fighter.strength), testStrengthBonus.name);
	tests.checkStrengthBonus(thief, -2, thief.calculateAttributeModifier(thief.strength), testStrengthBonus.name);		
	tests.checkStrengthBonus(cleric, 1, cleric.calculateAttributeModifier(cleric.strength), testStrengthBonus.name);
	tests.checkStrengthBonus(fighterBad, -3, fighterBad.calculateAttributeModifier(fighterBad.strength), testStrengthBonus.name);		
	tests.checkStrengthBonus(fighterSuper, 3, fighterSuper.calculateAttributeModifier(fighterSuper.strength), testStrengthBonus.name);
	tests.checkStrengthBonus(fighterAverage, 0, fighterAverage.calculateAttributeModifier(fighterAverage.strength), testStrengthBonus.name);
}

function testConstitutionBonus()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	
	tests.checkConstitutionBonus(magicUser, -1, magicUser.calculateAttributeModifier(magicUser.constitution), testConstitutionBonus.name);
	tests.checkConstitutionBonus(fighter, 0, fighter.calculateAttributeModifier(fighter.constitution), testConstitutionBonus.name);
	tests.checkConstitutionBonus(thief, 2, thief.calculateAttributeModifier(thief.constitution), testConstitutionBonus.name);		
	tests.checkConstitutionBonus(cleric, -1, cleric.calculateAttributeModifier(cleric.constitution), testConstitutionBonus.name);
	tests.checkConstitutionBonus(fighterBad, -3, fighterBad.calculateAttributeModifier(fighterBad.constitution), testConstitutionBonus.name);		
	tests.checkConstitutionBonus(fighterSuper, 3, fighterSuper.calculateAttributeModifier(fighterSuper.constitution), testConstitutionBonus.name);
	tests.checkConstitutionBonus(fighterAverage, 0, fighterAverage.calculateAttributeModifier(fighterAverage.constitution), testConstitutionBonus.name);
}

function testIndividualInitiativeBonus()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	
	tests.checkIndividualInitiativeModifier(magicUser, 0, magicUser.calculateInitativeModifier(), testIndividualInitiativeBonus.name);
	tests.checkIndividualInitiativeModifier(fighter, 1, fighter.calculateInitativeModifier(), testIndividualInitiativeBonus.name);	
	tests.checkIndividualInitiativeModifier(thief, 2, thief.calculateInitativeModifier(), testIndividualInitiativeBonus.name);	
	tests.checkIndividualInitiativeModifier(cleric, -1, cleric.calculateInitativeModifier(), testIndividualInitiativeBonus.name);
	tests.checkIndividualInitiativeModifier(fighterBad, -2, fighterBad.calculateInitativeModifier(), testIndividualInitiativeBonus.name);		
	tests.checkIndividualInitiativeModifier(fighterSuper, 2, fighterSuper.calculateInitativeModifier(), testIndividualInitiativeBonus.name);
	tests.checkIndividualInitiativeModifier(fighterAverage, 0, fighterAverage.calculateInitativeModifier(), testIndividualInitiativeBonus.name);
}

function testIsInventoryFull()
{
	var magicUser = new MagicUser(magaicUserTestParams);

	var sword = new Sword(swordParams);

	//add max number of items to inventory
	for(var i = 0; _MaxNumberOfInventoryItems > i; i++)
	{
		tests.checkIsInventoryFull(magicUser, false, magicUser.inventory.isInventoryFull(sword), testIsInventoryFull.name);
		magicUser.inventory.itemsInInvetory.push(sword);
	}

	//ensure attempting to add 1 more item to the inventory fails
	tests.checkIsInventoryFull(magicUser, true, magicUser.inventory.isInventoryFull(sword), testIsInventoryFull.name);
}

function testAddItemToInventory()
{
	var magicUser = new MagicUser(magaicUserTestParams);

	var sword = new Sword(swordParams);
	var arrow = new Arrow(arrowParams);

	//add items to inventory till the max inventory size is reached 
	for(var i = 0; _MaxNumberOfInventoryItems > i; i++)
	{
		var expectedInventoryItems = i + 1;
		magicUser.inventory.addItemToInventory(sword);
		tests.checkAddItemToInventory(magicUser, expectedInventoryItems, magicUser.inventory.itemsInInvetory.length, testAddItemToInventory.name);
	}

	//ensure attempting to add 1 more item to the inventory fails so the number of items in the inventory is still set to the max
	magicUser.inventory.addItemToInventory(sword);	
	tests.checkAddItemToInventory(magicUser, _MaxNumberOfInventoryItems, magicUser.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//----

	var fighter = new Fighter(fighterTestParams);

	var arrowFirst10 = new Arrow(arrowNotFullParams);
	var arrowSecond10 = new Arrow(arrowNotFullParams);
	var arrowThird10 = new Arrow(arrowNotFullParams);

	//test inventory with combinable items 
	fighter.inventory.addItemToInventory(arrow);
	tests.checkAddItemToInventory(fighter, 1, fighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);	
	tests.checkNumberOfUses(fighter, fighter.inventory.itemsInInvetory[0].name, 20, fighter.inventory.itemsInInvetory[0].remainingNumberOfUses, testAddItemToInventory.name);

	//fill inventory so that only 1 slot left (-2 as 1 slot already used and want 1 left free) 
	for(var i = 0; (_MaxNumberOfInventoryItems - 2) > i; i++)
	{
		fighter.inventory.addItemToInventory(sword);
	}

	tests.checkAddItemToInventory(fighter, 49, fighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);
	//add 10 arrows to last inventory slot (inventory is now full)
	fighter.inventory.addItemToInventory(arrowFirst10);
	tests.checkAddItemToInventory(fighter, 50, fighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);
	tests.checkNumberOfUses(fighter, fighter.inventory.itemsInInvetory[49].name, 10, fighter.inventory.itemsInInvetory[49].remainingNumberOfUses, testAddItemToInventory.name);
	//add another 10 arrows (total 20) to last inventory slot (inventory is still full)
	fighter.inventory.addItemToInventory(arrowSecond10);
	tests.checkAddItemToInventory(fighter, 50, fighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);
	tests.checkNumberOfUses(fighter, fighter.inventory.itemsInInvetory[49].name, 20, fighter.inventory.itemsInInvetory[49].remainingNumberOfUses, testAddItemToInventory.name);	
	//attempt to add more arrows but all slots full and all arrows in inventory have max number of uses	
	fighter.inventory.addItemToInventory(arrowThird10);
	tests.checkAddItemToInventory(fighter, 50, fighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//----

	var anotherFighter = new Fighter(fighterTestParams);

	var arrowUses8 = new Arrow(arrow8UsesParams);
	var arrowUses7 = new Arrow(arrow7UsesParams);
	var arrowUses18 = new Arrow(arrow18UsesParams);
	var arrowUses11 = new Arrow(arrow11UsesParams);
	var arrowUses2 = new Arrow(arrow2UsesParams);
	var arrowUses15 = new Arrow(arrow15UsesParams);
	var arrowUses20 = new Arrow(arrow20UsesParams);
	var anotherSword = new Sword(swordParams);

	//add items to inventory to fill first 10 spaces
	for(var i = 0; 10 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 10, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 8 arrows in slot 11
	anotherFighter.inventory.addItemToInventory(arrowUses8);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	

	//add items to inventory to fill up to space 27
	for(var i = 0; 15 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 26, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 7 arrows in slot 27
	anotherFighter.inventory.addItemToInventory(arrowUses7);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 7, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		

	//add items to inventory to fill up to space 39
	for(var i = 0; 11 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 38, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 18 arrows in slot 39  -- then check no of arrows and that arrows have not combined as inventory is not full 
	anotherFighter.inventory.addItemToInventory(arrowUses18);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 7, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[38].name, 18, anotherFighter.inventory.itemsInInvetory[38].remainingNumberOfUses, testAddItemToInventory.name);		

	//add items to inventory to fill up to space 45
	for(var i = 0; 5 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 44, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 11 arrows in slot 45  -- then check no of arrows and that arrows have not combined as inventory is not full 
	anotherFighter.inventory.addItemToInventory(arrowUses11);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 7, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[38].name, 18, anotherFighter.inventory.itemsInInvetory[38].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[44].name, 11, anotherFighter.inventory.itemsInInvetory[44].remainingNumberOfUses, testAddItemToInventory.name);	

	//fill the rest of the inventory 
	for(var i = 0; 6 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 50, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//inventory is now full 
	//add 2 more arrows -- these should combine with the arrows in slot 11 to increase the total there to 10
	anotherFighter.inventory.addItemToInventory(arrowUses2);	
	tests.checkAddItemToInventory(anotherFighter, 50, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 10, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 7, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[38].name, 18, anotherFighter.inventory.itemsInInvetory[38].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[44].name, 11, anotherFighter.inventory.itemsInInvetory[44].remainingNumberOfUses, testAddItemToInventory.name);	

	//add another 15 arrows -- this should combine with those in slot 11 to its max of 20 and the remaining 5 should combine with those in slot 27 to make its total 12
	anotherFighter.inventory.addItemToInventory(arrowUses15);	
	tests.checkAddItemToInventory(anotherFighter, 50, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 20, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 12, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[38].name, 18, anotherFighter.inventory.itemsInInvetory[38].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[44].name, 11, anotherFighter.inventory.itemsInInvetory[44].remainingNumberOfUses, testAddItemToInventory.name);	
	
	//add another 20 arrows -- this should combine with those in slot 27 to its max of 20, slot 39 to max its slot at 20 and the remaining 11 should attempt to combine with those 
	//in slot 45. it will max at 20 and leave 1 which will not be added to the inventory
	anotherFighter.inventory.addItemToInventory(arrowUses20);	
	tests.checkAddItemToInventory(anotherFighter, 50, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 20, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 20, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[38].name, 20, anotherFighter.inventory.itemsInInvetory[38].remainingNumberOfUses, testAddItemToInventory.name);		
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[44].name, 20, anotherFighter.inventory.itemsInInvetory[44].remainingNumberOfUses, testAddItemToInventory.name);	
}

function testindexOfItemInInventroy()
{
	var magicUser = new MagicUser(magaicUserTestParams);

	var sword = new Sword(swordParams);
	var shield = new Shield(shieldParams);

	//item not in inventory 
	tests.checkIndexOfItemInInventory(MagicUser, sword.name, -1, magicUser.inventory.indexOfItemInInventroy(sword.id), testindexOfItemInInventroy.name);

	//item in inventory 
	magicUser.inventory.addItemToInventory(sword);
	tests.checkIndexOfItemInInventory(MagicUser, sword.name, 0, magicUser.inventory.indexOfItemInInventroy(sword.id), testindexOfItemInInventroy.name);	

	//add items to inventory till inventory is 1 away from full (start loop at 1 as 1 item already in inventory)
	for(var i = 1; (_MaxNumberOfInventoryItems - 1) > i; i++)
	{
		magicUser.inventory.addItemToInventory(sword);
	}

	//item is last item in inventory
	magicUser.inventory.addItemToInventory(shield);
	tests.checkIndexOfItemInInventory(MagicUser, shield.name, (_MaxNumberOfInventoryItems - 1), magicUser.inventory.indexOfItemInInventroy(shield.id), testindexOfItemInInventroy.name);
	//check to ensure inventory full (message should appear in console)
	magicUser.inventory.addItemToInventory(shield);
}

function testRemoveItemFromInventory()
{
	var magicUser = new MagicUser(magaicUserTestParams);

	var sword = new Sword(swordParams);
	var shield = new Shield(shieldParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);

	//length of inventory should not change if attempting to remove an item not in inventory 
	magicUser.inventory.removeItemFromInventory(sword);
	tests.checkRemoveItemFromInventory(magicUser, 0, magicUser.inventory.itemsInInvetory.length, testRemoveItemFromInventory.name);

	//lenght of inventory should decrease when removing items
	magicUser.inventory.addItemToInventory(twoHandedSword);
	magicUser.inventory.addItemToInventory(shield);
	tests.checkRemoveItemFromInventory(magicUser, 2, magicUser.inventory.itemsInInvetory.length, testRemoveItemFromInventory.name);	
	magicUser.inventory.removeItemFromInventory(twoHandedSword);
	tests.checkRemoveItemFromInventory(magicUser, 1, magicUser.inventory.itemsInInvetory.length, testRemoveItemFromInventory.name);
	magicUser.inventory.removeItemFromInventory(shield);
	tests.checkRemoveItemFromInventory(magicUser, 0, magicUser.inventory.itemsInInvetory.length, testRemoveItemFromInventory.name);
}

function testEquipDagger()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var dagger = new Dagger(daggerParams);
		
	tests.checkItemEquiped(magicUser, dagger.name, true, magicUser.equip(dagger), testEquipDagger.name);		
	tests.checkItemEquiped(fighter, dagger.name, true, fighter.equip(dagger), testEquipDagger.name);		
	tests.checkItemEquiped(thief, dagger.name, true, thief.equip(dagger), testEquipDagger.name);
	tests.checkItemEquiped(cleric, dagger.name, false, cleric.equip(dagger), testEquipDagger.name);		
}

function testEquipSilverDagger()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var silverDagger = new SilverDagger(silverDaggerParams);
		
	tests.checkItemEquiped(magicUser, silverDagger.name, true, magicUser.equip(silverDagger), testEquipSilverDagger.name);		
	tests.checkItemEquiped(fighter, silverDagger.name, true, fighter.equip(silverDagger), testEquipSilverDagger.name);		
	tests.checkItemEquiped(thief, silverDagger.name, true, thief.equip(silverDagger), testEquipSilverDagger.name);
	tests.checkItemEquiped(cleric, silverDagger.name, false, cleric.equip(silverDagger), testEquipSilverDagger.name);	
}

function testEquipSword()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var sword = new Sword(swordParams);
	
	tests.checkItemEquiped(magicUser, sword.name, false, magicUser.equip(sword), testEquipSword.name);
	tests.checkItemEquiped(fighter, sword.name, true, fighter.equip(sword), testEquipSword.name);		
	tests.checkItemEquiped(thief, sword.name, true, thief.equip(sword), testEquipSword.name);		
	tests.checkItemEquiped(cleric, sword.name, false, cleric.equip(sword), testEquipSword.name);
}

function testEquipTwoHandedSword()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	
	tests.checkItemEquiped(magicUser, twoHandedSword.name, false, magicUser.equip(twoHandedSword), testEquipTwoHandedSword.name);
	tests.checkItemEquiped(fighter, twoHandedSword.name, true, fighter.equip(twoHandedSword), testEquipTwoHandedSword.name);		
	tests.checkItemEquiped(thief, twoHandedSword.name, true, thief.equip(twoHandedSword), testEquipTwoHandedSword.name);		
	tests.checkItemEquiped(cleric, twoHandedSword.name, false, cleric.equip(twoHandedSword), testEquipTwoHandedSword.name);
}

function testEquipShortSword()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var shortSword = new ShortSword(shortSwordParams);
	
	tests.checkItemEquiped(magicUser, shortSword.name, false, magicUser.equip(shortSword), testEquipShortSword.name);
	tests.checkItemEquiped(fighter, shortSword.name, true, fighter.equip(shortSword), testEquipShortSword.name);		
	tests.checkItemEquiped(thief, shortSword.name, true, thief.equip(shortSword), testEquipShortSword.name);		
	tests.checkItemEquiped(cleric, shortSword.name, false, cleric.equip(shortSword), testEquipShortSword.name);
}

function testEquipHandAxe()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var handAxe = new HandAxe(handAxeParams);
	
	tests.checkItemEquiped(magicUser, handAxe.name, false, magicUser.equip(handAxe), testEquipHandAxe.name);
	tests.checkItemEquiped(fighter, handAxe.name, true, fighter.equip(handAxe), testEquipHandAxe.name);		
	tests.checkItemEquiped(thief, handAxe.name, true, thief.equip(handAxe), testEquipHandAxe.name);		
	tests.checkItemEquiped(cleric, handAxe.name, false, cleric.equip(handAxe), testEquipHandAxe.name);
}

function testEquipBattleAxe()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var battleAxe = new BattleAxe(battleAxeParams);
	
	tests.checkItemEquiped(magicUser, battleAxe.name, false, magicUser.equip(battleAxe), testEquipBattleAxe.name);
	tests.checkItemEquiped(fighter, battleAxe.name, true, fighter.equip(battleAxe), testEquipBattleAxe.name);		
	tests.checkItemEquiped(thief, battleAxe.name, true, thief.equip(battleAxe), testEquipBattleAxe.name);		
	tests.checkItemEquiped(cleric, battleAxe.name, false, cleric.equip(battleAxe), testEquipBattleAxe.name);
}

function testEquipMace()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var mace = new Mace(maceParams);
	
	tests.checkItemEquiped(magicUser, mace.name, false, magicUser.equip(mace), testEquipMace.name);
	tests.checkItemEquiped(fighter, mace.name, true, fighter.equip(mace), testEquipMace.name);		
	tests.checkItemEquiped(thief, mace.name, true, thief.equip(mace), testEquipMace.name);		
	tests.checkItemEquiped(cleric, mace.name, true, cleric.equip(mace), testEquipMace.name);
}

function testEquipClub()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var club = new Club(clubParams);
	
	tests.checkItemEquiped(magicUser, club.name, false, magicUser.equip(club), testEquipClub.name);
	tests.checkItemEquiped(fighter, club.name, true, fighter.equip(club), testEquipClub.name);		
	tests.checkItemEquiped(thief, club.name, true, thief.equip(club), testEquipClub.name);		
	tests.checkItemEquiped(cleric, club.name, true, cleric.equip(club), testEquipClub.name);
}

function testEquipPoleArm()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var polearm = new PoleArm(poleArmParams);
	
	tests.checkItemEquiped(magicUser, polearm.name, false, magicUser.equip(polearm), testEquipPoleArm.name);
	tests.checkItemEquiped(fighter, polearm.name, true, fighter.equip(polearm), testEquipPoleArm.name);		
	tests.checkItemEquiped(thief, polearm.name, true, thief.equip(polearm), testEquipPoleArm.name);		
	tests.checkItemEquiped(cleric, polearm.name, false, cleric.equip(polearm), testEquipPoleArm.name);
}

function testEquipSpear()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var spear = new Spear(spearParams);
	
	tests.checkItemEquiped(magicUser, spear.name, false, magicUser.equip(spear), testEquipSpear.name);
	tests.checkItemEquiped(fighter, spear.name, true, fighter.equip(spear), testEquipSpear.name);		
	tests.checkItemEquiped(thief, spear.name, true, thief.equip(spear), testEquipSpear.name);		
	tests.checkItemEquiped(cleric, spear.name, false, cleric.equip(spear), testEquipSpear.name);
}

function testEquipWarHammer()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var warHammer = new WarHammer(warHammerParams);
	
	tests.checkItemEquiped(magicUser, warHammer.name, false, magicUser.equip(warHammer), testEquipWarHammer.name);
	tests.checkItemEquiped(fighter, warHammer.name, true, fighter.equip(warHammer), testEquipWarHammer.name);		
	tests.checkItemEquiped(thief, warHammer.name, true, thief.equip(warHammer), testEquipWarHammer.name);		
	tests.checkItemEquiped(cleric, warHammer.name, true, cleric.equip(warHammer), testEquipWarHammer.name);
}

function testEquipCrossbow()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var crossbow = new Crossbow(crossbowParams);
	
	tests.checkItemEquiped(magicUser, crossbow.name, false, magicUser.equip(crossbow), testEquipCrossbow.name);
	tests.checkItemEquiped(fighter, crossbow.name, true, fighter.equip(crossbow), testEquipCrossbow.name);		
	tests.checkItemEquiped(thief, crossbow.name, true, thief.equip(crossbow), testEquipCrossbow.name);		
	tests.checkItemEquiped(cleric, crossbow.name, false, cleric.equip(crossbow), testEquipCrossbow.name);
}

function testEquipLongbow()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var longbow = new Longbow(longbowParams);
	
	tests.checkItemEquiped(magicUser, longbow.name, false, magicUser.equip(longbow), testEquipLongbow.name);
	tests.checkItemEquiped(fighter, longbow.name, true, fighter.equip(longbow), testEquipLongbow.name);		
	tests.checkItemEquiped(thief, longbow.name, true, thief.equip(longbow), testEquipLongbow.name);		
	tests.checkItemEquiped(cleric, longbow.name, false, cleric.equip(longbow), testEquipLongbow.name);
}

function testEquipShortbow()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var shortbow = new Shortbow(shortbowParams);
	
	tests.checkItemEquiped(magicUser, shortbow.name, false, magicUser.equip(shortbow), testEquipShortbow.name);
	tests.checkItemEquiped(fighter, shortbow.name, true, fighter.equip(shortbow), testEquipShortbow.name);		
	tests.checkItemEquiped(thief, shortbow.name, true, thief.equip(shortbow), testEquipShortbow.name);		
	tests.checkItemEquiped(cleric, shortbow.name, false, cleric.equip(shortbow), testEquipShortbow.name);
}

function testEquipSling()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var sling = new Sling(slingParams);
	
	tests.checkItemEquiped(magicUser, sling.name, false, magicUser.equip(sling), testEquipSling.name);
	tests.checkItemEquiped(fighter, sling.name, true, fighter.equip(sling), testEquipSling.name);		
	tests.checkItemEquiped(thief, sling.name, true, thief.equip(sling), testEquipSling.name);		
	tests.checkItemEquiped(cleric, sling.name, true, cleric.equip(sling), testEquipSling.name);
}


function testUnequipSword()
{
	var fighter = new Fighter(fighterTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var sword = new Sword(swordParams);

	//it should not be possible to unequip something you dont have 
	tests.checkItemUnEquiped(fighter, sword.name, false, fighter.unEquip(sword), testUnequipSword.name);  	
	
	fighter.equip(sword);
	tests.checkItemUnEquiped(fighter, sword.name, true, fighter.unEquip(sword), testUnequipSword.name);  

	thief.equip(sword);
	tests.checkItemUnEquiped(thief, sword.name, true, thief.unEquip(sword), testUnequipSword.name);  	
}

function testNoOfHandsFree()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);

	var sword = new Sword(swordParams);
	var dagger = new Dagger(daggerParams);
	var shield = new Shield(shieldParams);
	var leatherArmour = new LeatherArmour(leatherArmourParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	
	//test still both hands free if character cannot equip selected item 
	magicUser.equip(sword);
	tests.checkNoOfHandsFree(magicUser, 2, magicUser.noOfHandsFree, testNoOfHandsFree.name);

	//test only 1 hand free if character can use selected item 
	fighter.equip(sword);
	tests.checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree, testNoOfHandsFree.name);
	//test no hands free if character has 2 equiped hand items 
	fighter.equip(shield);
	tests.checkNoOfHandsFree(fighter, 0, fighter.noOfHandsFree, testNoOfHandsFree.name);	
	//test 1 hand free if unequip 1 of the two items 
	fighter.unEquip(shield);
	tests.checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree, testNoOfHandsFree.name);
	//check equipping non hand item does not change no of hands free
	fighter.equip(leatherArmour);
	tests.checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree, testNoOfHandsFree.name);
	fighter.unEquip(sword);

	//test to make sure no of hands free does not go below 0
	thief.equip(sword);
	thief.equip(dagger);	
	tests.checkNoOfHandsFree(thief, 0, thief.noOfHandsFree, testNoOfHandsFree.name);
	thief.equip(dagger);
	tests.checkNoOfHandsFree(thief, 0, thief.noOfHandsFree, testNoOfHandsFree.name);
	thief.unEquip(sword);
	thief.unEquip(dagger);

	//test to make sure no hands free when 2 handed weapon equiped
	fighterSuper.equip(twoHandedSword);
	tests.checkNoOfHandsFree(fighterSuper, 0, fighterSuper.noOfHandsFree, testNoOfHandsFree.name);	
	//ensure both hands free when 2 handed weapon unequiped
	fighterSuper.unEquip(twoHandedSword);
	tests.checkNoOfHandsFree(fighterSuper, 2, fighterSuper.noOfHandsFree, testNoOfHandsFree.name);	
}

function testEquipTwoHandedWeaponWhenOnlyOneHandFree()
{
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	
	var sword = new Sword(swordParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);

	fighterSuper.equip(sword);
	tests.checkItemEquiped(fighterSuper, twoHandedSword.name, false, fighterSuper.equip(twoHandedSword), testEquipTwoHandedWeaponWhenOnlyOneHandFree.name);	
}

function testWeaponIsTwoHanded()
{
	var sword = new Sword(swordParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	var shortSword = new ShortSword(shortSwordParams);
	var dagger = new Dagger(daggerParams);
	var silverDagger = new SilverDagger(silverDaggerParams);
	var handAxe = new HandAxe(handAxeParams);
	var battleAxe = new BattleAxe(battleAxeParams);
	var mace = new Mace(maceParams);
	var club = new Club(clubParams);
	var poleArm = new PoleArm(poleArmParams);	
	var spear = new Spear(spearParams);
	var warHammer = new WarHammer(warHammerParams);
	var crossbow = new Crossbow(crossbowParams);
	var longbow = new Longbow(longbowParams);
	var shortbow = new Shortbow(shortbowParams);
	var sling = new Sling(slingParams);

	tests.checkWeaponIsTwoHanded(sword, false, sword.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(twoHandedSword, true, twoHandedSword.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(shortSword, false, shortSword.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(dagger, false, dagger.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(silverDagger, false, silverDagger.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(handAxe, false, handAxe.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(battleAxe, true, battleAxe.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(mace, false, mace.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(club, false, club.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(poleArm, true, poleArm.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(spear, false, spear.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(warHammer, false, warHammer.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(crossbow, true, crossbow.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(longbow, true, longbow.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(shortbow, true, shortbow.is2Handed, testWeaponIsTwoHanded.name);
	tests.checkWeaponIsTwoHanded(sling, true, sling.is2Handed, testWeaponIsTwoHanded.name);
}

function testWeaponIsRanged()
{
	var sword = new Sword(swordParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	var shortSword = new ShortSword(shortSwordParams);
	var dagger = new Dagger(daggerParams);
	var silverDagger = new SilverDagger(silverDaggerParams);
	var handAxe = new HandAxe(handAxeParams);
	var battleAxe = new BattleAxe(battleAxeParams);
	var mace = new Mace(maceParams);
	var club = new Club(clubParams);
	var poleArm = new PoleArm(poleArmParams);	
	var spear = new Spear(spearParams);
	var warHammer = new WarHammer(warHammerParams);
	var crossbow = new Crossbow(crossbowParams);
	var longbow = new Longbow(longbowParams);
	var shortbow = new Shortbow(shortbowParams);
	var sling = new Sling(slingParams);

	tests.checkWeaponIsRanged(sword, false, sword.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(twoHandedSword, false, twoHandedSword.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(shortSword, false, shortSword.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(dagger, false, dagger.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(silverDagger, false, silverDagger.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(handAxe, false, handAxe.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(battleAxe, false, battleAxe.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(mace, false, mace.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(club, false, club.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(poleArm, false, poleArm.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(spear, false, spear.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(warHammer, false, warHammer.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(crossbow, true, crossbow.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(longbow, true, longbow.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(shortbow, true, shortbow.isRanged, testWeaponIsRanged.name);
	tests.checkWeaponIsRanged(sling, true, sling.isRanged, testWeaponIsRanged.name);
}

function testIsCombinableInInventory()
{
	var sword = new Sword(swordParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	var shortSword = new ShortSword(shortSwordParams);

	var chainMail = new ChainMail(chainArmourParams);
	var plateMail = new PlateMail(plateArmourParams);
	var shield = new Shield(shieldParams);

	var arrow = new Arrow(arrowParams);
	var quarrel = new Quarrel(quarrelParams);
	var stone = new Stone(stoneParams);

	//weapons should not combine
	tests.checkIsCombinableInInventory(sword.name, false, sword.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(twoHandedSword.name, false, twoHandedSword.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(shortSword.name, false, shortSword.isCombinableInInventory, testIsCombinableInInventory.name);

	//armoun and shield should not combine
	tests.checkIsCombinableInInventory(chainMail.name, false, chainMail.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(plateMail.name, false, plateMail.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(shield.name, false, shield.isCombinableInInventory, testIsCombinableInInventory.name);

	//ammo should combine
	tests.checkIsCombinableInInventory(arrow.name, true, arrow.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(quarrel.name, true, quarrel.isCombinableInInventory, testIsCombinableInInventory.name);
	tests.checkIsCombinableInInventory(stone.name, true, stone.isCombinableInInventory, testIsCombinableInInventory.name);
}

function testEquipThirdHandItemFails()
{
	var fighter = new Fighter(fighterTestParams);
		
	var dagger = new Dagger(daggerParams);
	var sword = new Sword(swordParams);
	var shield = new Shield(shieldParams);

	tests.checkItemEquiped(fighter, sword.name, true, fighter.equip(sword), testEquipThirdHandItemFails.name);	
	tests.checkItemEquiped(fighter, shield.name, true, fighter.equip(shield), testEquipThirdHandItemFails.name);		
	tests.checkItemEquiped(fighter, dagger.name, false, fighter.equip(dagger), testEquipThirdHandItemFails.name);
}

function testIsArmourEquiped()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);

	var leatherArmour = new LeatherArmour(leatherArmourParams);
	var chainMail = new ChainMail(chainArmourParams);
	var plateMail = new PlateMail(plateArmourParams);
	var shield = new Shield(shieldParams);

	//ensure this is false for a new character
	tests.checkIsArmourEquiped(cleric, false, cleric.isArmourEquiped(), testIsArmourEquiped.name);

	//ensure this is false when character cannot use armour type
	magicUser.equip(leatherArmour);
	tests.checkIsArmourEquiped(magicUser, false, magicUser.isArmourEquiped(), testIsArmourEquiped.name);
	magicUser.unEquip(leatherArmour);

	//ensure this is true when character can use armour type
	fighter.equip(leatherArmour);
	tests.checkIsArmourEquiped(fighter, true, fighter.isArmourEquiped(), testIsArmourEquiped.name);
	fighter.unEquip(leatherArmour);
	fighterBad.equip(chainMail);
	tests.checkIsArmourEquiped(fighterBad, true, fighterBad.isArmourEquiped(), testIsArmourEquiped.name);	
	fighterBad.unEquip(leatherArmour);
	fighterSuper.equip(plateMail);
	tests.checkIsArmourEquiped(fighterSuper, true, fighterSuper.isArmourEquiped(), testIsArmourEquiped.name);	
	fighterSuper.unEquip(leatherArmour);

	//ensure that this is false after unequiping the armour 
	cleric.equip(chainMail);
	tests.checkIsArmourEquiped(cleric, true, cleric.isArmourEquiped(), testIsArmourEquiped.name);
	cleric.unEquip(chainMail);
	tests.checkIsArmourEquiped(cleric, false, cleric.isArmourEquiped(), testIsArmourEquiped.name);

	//ensure shield does not effect this 
	cleric.equip(shield);
	tests.checkIsArmourEquiped(cleric, false, cleric.isArmourEquiped(), testIsArmourEquiped.name);	
}

function testEquipLeatherArmour()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var leatherArmour = new LeatherArmour(leatherArmourParams);
	
	tests.checkItemEquiped(magicUser,leatherArmour.name, false, magicUser.equip(leatherArmour), testEquipLeatherArmour.name);
	tests.checkItemEquiped(fighter, leatherArmour.name, true, fighter.equip(leatherArmour), testEquipLeatherArmour.name);
	tests.checkItemEquiped(thief, leatherArmour.name, true, thief.equip(leatherArmour), testEquipLeatherArmour.name);
	tests.checkItemEquiped(cleric, leatherArmour.name, true, cleric.equip(leatherArmour), testEquipLeatherArmour.name);
}

function testEquipChainMailArmour()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var chainMail = new ChainMail(chainArmourParams);
	
	tests.checkItemEquiped(magicUser, chainMail.name, false, magicUser.equip(chainMail), testEquipChainMailArmour.name);	
	tests.checkItemEquiped(fighter, chainMail.name, true, fighter.equip(chainMail), testEquipChainMailArmour.name);
	tests.checkItemEquiped(thief, chainMail.name, false, thief.equip(chainMail), testEquipChainMailArmour.name);
	tests.checkItemEquiped(cleric, chainMail.name, true, cleric.equip(chainMail), testEquipChainMailArmour.name);	
}

function testEquipPlateMailArmour()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var plateMail = new PlateMail(plateArmourParams);
	
	tests.checkItemEquiped(magicUser, plateMail.name, false, magicUser.equip(plateMail), testEquipPlateMailArmour.name);
	tests.checkItemEquiped(fighter, plateMail.name, true, fighter.equip(plateMail), testEquipPlateMailArmour.name);
	tests.checkItemEquiped(thief, plateMail.name, false, thief.equip(plateMail), testEquipPlateMailArmour.name);
	tests.checkItemEquiped(cleric, plateMail.name, true, cleric.equip(plateMail), testEquipPlateMailArmour.name);
}

function testEquipShield()
{
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);		
	
	var shield = new Shield(shieldParams);
	
	tests.checkItemEquiped(magicUser, shield.name, false, magicUser.equip(shield), testEquipShield.name);		
	tests.checkItemEquiped(fighter, shield.name, true, fighter.equip(shield), testEquipShield.name);		
	tests.checkItemEquiped(thief, shield.name, false, thief.equip(shield), testEquipShield.name);
	tests.checkItemEquiped(cleric, shield.name, true, cleric.equip(shield), testEquipShield.name);				
}

function testCalculateArmourClass()
{
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);

	var leatherArmour = new LeatherArmour(leatherArmourParams);
	var chainMail = new ChainMail(chainArmourParams);
	var plateMail = new PlateMail(plateArmourParams);
	var shield = new Shield(shieldParams);

	//character with no armour 
	//character no constitution bonus
	tests.checkArmourClass(fighterAverage, 9, fighterAverage.armourClass, testCalculateArmourClass.name);	
	//character with constitution bonus of -3 -- AC cannot be worse than 9
	tests.checkArmourClass(fighterBad, 9, fighterBad.armourClass, testCalculateArmourClass.name);	
	//character with constitution bonus of +3 	
	tests.checkArmourClass(fighterSuper, 6, fighterSuper.armourClass, testCalculateArmourClass.name);	

	//character with no armour and aweful dexterity still gets a bonus for having a shield 
	fighterBad.equip(shield);
	tests.checkArmourClass(fighterBad, 8, fighterBad.armourClass, testCalculateArmourClass.name);	
	fighterBad.unEquip(shield);

	//character with leather armour 
	//character no constitution bonus
	fighterAverage.equip(leatherArmour);
	tests.checkArmourClass(fighterAverage, 7, fighterAverage.armourClass, testCalculateArmourClass.name);	
	fighterAverage.unEquip(leatherArmour);
	//character with constitution bonus of -3 -- AC cannot be worse than 9
	fighterBad.equip(leatherArmour);
	tests.checkArmourClass(fighterBad, 9, fighterBad.armourClass, testCalculateArmourClass.name);	
	fighterBad.unEquip(leatherArmour);
	//character with constitution bonus of +3 	
	fighterSuper.equip(leatherArmour);
	tests.checkArmourClass(fighterSuper, 4, fighterSuper.armourClass, testCalculateArmourClass.name);	
	fighterSuper.unEquip(leatherArmour);

	//armour class is unchanged when attempting to equip armour that the character cannot use
	//thief cannot use plate mail (thief has -3 AC bonus) 
	thief.equip(plateMail);
	tests.checkArmourClass(thief, 6, thief.armourClass, testCalculateArmourClass.name);		
	thief.unEquip(LeatherArmour);

	//armour class is unaffected when attempting to equip a second set of armour 
	//first armour is equipped (cleric has -2 Ac bonus)
	cleric.equip(chainMail);
	tests.checkArmourClass(cleric, 7, cleric.armourClass, testCalculateArmourClass.name);	
	//second armour is not equipped as character is already wearing an armour
	cleric.equip(plateMail);
	tests.checkArmourClass(cleric, 7, cleric.armourClass, testCalculateArmourClass.name);
	cleric.unEquip(chainMail);

	//character with Plate mail equpied first and then shield 
	//character no constitution bonus
	fighterAverage.equip(plateMail);
	fighterAverage.equip(shield);
	tests.checkArmourClass(fighterAverage, 2, fighterAverage.armourClass, testCalculateArmourClass.name);	
	fighterAverage.unEquip(plateMail);
	fighterAverage.unEquip(shield);
	//character with constitution bonus of -3
	fighterBad.equip(plateMail);
	fighterBad.equip(shield);
	tests.checkArmourClass(fighterBad, 5, fighterBad.armourClass, testCalculateArmourClass.name);	
	fighterBad.unEquip(plateMail);
	fighterBad.unEquip(shield);
	//character with constitution bonus of +3 	
	fighterSuper.equip(plateMail);
	fighterSuper.equip(shield);
	tests.checkArmourClass(fighterSuper, -1, fighterSuper.armourClass, testCalculateArmourClass.name);	
	fighterSuper.unEquip(plateMail);
	fighterSuper.unEquip(shield);

	//character with shield equpied first and then chain mail  
	//character no constitution bonus
	fighterAverage.equip(shield);
	fighterAverage.equip(chainMail);
	tests.checkArmourClass(fighterAverage, 4, fighterAverage.armourClass, testCalculateArmourClass.name);	
	fighterAverage.unEquip(shield);
	fighterAverage.unEquip(chainMail);
	//character with constitution bonus of -3
	fighterBad.equip(shield);
	fighterBad.equip(chainMail);
	tests.checkArmourClass(fighterBad, 7, fighterBad.armourClass, testCalculateArmourClass.name);	
	fighterBad.unEquip(shield);
	fighterBad.unEquip(chainMail);
	//character with constitution bonus of +3 	
	fighterSuper.equip(shield);
	fighterSuper.equip(chainMail);
	tests.checkArmourClass(fighterSuper, 1, fighterSuper.armourClass, testCalculateArmourClass.name);	
	fighterSuper.unEquip(shield);
	fighterSuper.unEquip(chainMail);

	//check armour class is recalculated when armour is unequiped 
	//character no constitution bonus
	fighterAverage.equip(leatherArmour);
	fighterAverage.unEquip(leatherArmour);
	tests.checkArmourClass(fighterAverage, 9, fighterAverage.armourClass, testCalculateArmourClass.name);	
	//character with constitution bonus of -3 -- AC cannot be worse than 9
	fighterBad.equip(leatherArmour);
	fighterBad.unEquip(leatherArmour);
	tests.checkArmourClass(fighterBad, 9, fighterBad.armourClass, testCalculateArmourClass.name);	
	//character with constitution bonus of +3 	
	fighterSuper.equip(leatherArmour);
	fighterSuper.unEquip(leatherArmour);
	tests.checkArmourClass(fighterSuper, 6, fighterSuper.armourClass, testCalculateArmourClass.name);	

	//check armour class is recalculated when shield is unequipped 
	cleric.equip(shield); 
	tests.checkArmourClass(cleric, 8, cleric.armourClass, testCalculateArmourClass.name);		
	cleric.unEquip(shield); 
	tests.checkArmourClass(cleric, 9, cleric.armourClass, testCalculateArmourClass.name);	
}

function testUnequipLeatherArmour()
{
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);		

	var leatherArmour = new LeatherArmour(leatherArmourParams);

	//no leather armour equiped
	tests.checkItemUnEquiped(fighter, leatherArmour.name, false, fighter.unEquip(leatherArmour), testUnequipLeatherArmour.name); 	
	
	fighter.equip(leatherArmour);	
	tests.checkItemUnEquiped(fighter, leatherArmour.name, true, fighter.unEquip(leatherArmour), testUnequipLeatherArmour.name);  
	
	thief.equip(leatherArmour);		
	tests.checkItemUnEquiped(thief, leatherArmour.name, true, thief.unEquip(leatherArmour), testUnequipLeatherArmour.name);

	cleric.equip(leatherArmour);
	tests.checkItemUnEquiped(cleric, leatherArmour.name, true, cleric.unEquip(leatherArmour), testUnequipLeatherArmour.name);  
}

function testEquipTwoSetsOfArmour()
{
	var fighter = new Fighter(fighterTestParams);
	
	var leatherArmour = new LeatherArmour(leatherArmourParams);
	var chainMail = new ChainMail(chainArmourParams);
	
	fighter.equip(leatherArmour);
	tests.checkIsArmourEquiped(fighter, true, fighter.isArmourEquiped(), testEquipTwoSetsOfArmour.name);
	//equip chain mail should fail	
	tests.checkItemEquiped(fighter, chainMail.name, false, fighter.equip(chainMail), testEquipTwoSetsOfArmour.name);
}

function testSetHitPoints()
{
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);

	//setting the character's hitpoints to undefined to simulate a new character generation
	fighterAverage.maxHitPoints = undefined;
	fighterBad.maxHitPoints = undefined;
	fighterSuper.maxHitPoints = undefined;

	//check new character's Hitpoint generation where Constitution modifier is 0
	tests.checkSetHitPoints(fighterAverage, 5, fighterAverage.setHitPoints(5), testSetHitPoints.name);
	//check new character's Hitpoint generation where Constitution modifier is -3 (this would give the character less than 0 hit points)
	tests.checkSetHitPoints(fighterBad, 1, fighterBad.setHitPoints(2), fighterBad.name);
	//check new character's Hitpoint generation where Constitution modifier is 3
	tests.checkSetHitPoints(fighterSuper, 5, fighterSuper.setHitPoints(2), testSetHitPoints.name);

	//setting the character's hitpoints to what was previously generated 
	fighterAverage.maxHitPoints = 5;
	fighterBad.maxHitPoints = 1;
	fighterSuper.maxHitPoints = 5;

	//simulate character's hit points increasing due to a level up 
	// this character had 5 hp previously and has a constitution modifier of 0
	tests.checkSetHitPoints(fighterAverage, 10, fighterAverage.setHitPoints(5), testSetHitPoints.name);
	// this character had 1 hp previously and has a constitution modifier of -3
	tests.checkSetHitPoints(fighterBad, 2, fighterBad.setHitPoints(2), fighterBad.name);
	// this character had 1 hp previously and has a constitution modifier of 3
	tests.checkSetHitPoints(fighterSuper, 9, fighterSuper.setHitPoints(1), testSetHitPoints.name);
}

function testRoleRequiredToHit()
{
 	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	var badFighter = new Fighter(fighterWithAwfulStatsParams);
	
	var dagger = new Dagger(daggerParams);
	var shield = new Shield(shieldParams);
	var plateMail = new PlateMail(plateArmourParams);
	var crossbow = new Crossbow(crossbowParams);
	var fist = new Fist();
	
	fighter.equip(plateMail);
	fighter.equip(shield);
	
	cleric.equip(plateMail);
	cleric.equip(shield);
	
	//to Hit with melee weapons -- takes into account str modifier
	tests.checkRequiredToHitRoles(magicUser, 11, magicUser.roleRequiredToHit(magicUser, dagger), testRoleRequiredToHit.name); //magic user has an AC of 9
	tests.checkRequiredToHitRoles(magicUser, 19, magicUser.roleRequiredToHit(fighter, dagger), testRoleRequiredToHit.name);   //fighter has an AC of 1
	tests.checkRequiredToHitRoles(magicUser, 14, magicUser.roleRequiredToHit(thief, dagger), testRoleRequiredToHit.name);     //thief has an AC of 6
	tests.checkRequiredToHitRoles(magicUser, 16, magicUser.roleRequiredToHit(cleric, dagger), testRoleRequiredToHit.name);    //cleric has an AC of 4
	tests.checkRequiredToHitRoles(fighter, 12, fighter.roleRequiredToHit(cleric, dagger), testRoleRequiredToHit.name);    //cleric has an AC of 4	

	//to Hit with Fist -- should be the same as melee weapon
	tests.checkRequiredToHitRoles(magicUser, 11, magicUser.roleRequiredToHit(magicUser, fist), testRoleRequiredToHit.name); //magic user has an AC of 9

	//to Hit with ranged weapons -- takes into account dex modifier
	tests.checkRequiredToHitRoles(thief, 7, thief.roleRequiredToHit(magicUser, crossbow), testRoleRequiredToHit.name); //magic user has an AC of 9
	tests.checkRequiredToHitRoles(thief, 15, thief.roleRequiredToHit(fighter, crossbow), testRoleRequiredToHit.name);   //fighter has an AC of 1
	tests.checkRequiredToHitRoles(thief, 10, thief.roleRequiredToHit(thief, crossbow), testRoleRequiredToHit.name);     //thief has an AC of 6
	tests.checkRequiredToHitRoles(thief, 12, thief.roleRequiredToHit(cleric, crossbow), testRoleRequiredToHit.name);    //cleric has an AC of 4
	tests.checkRequiredToHitRoles(badFighter, 20, badFighter.roleRequiredToHit(fighter, crossbow), testRoleRequiredToHit.name);    //fighter has an AC of 1	
}

function testGetEquipedWeapon()
{	
	var fighterAverage = new Fighter(fighterWithAverageStatsParams);
	var fighterBad = new Fighter(fighterWithAwfulStatsParams);
	var fighterSuper = new Fighter(fighterWithAwesomeStatsParams);
	var magicUser = new MagicUser(magaicUserTestParams);
	var thief = new Thief(thiefTestParams);	

	var dagger = new Dagger(daggerParams);
	var twoHandedSword = new TwoHandedSword(twoHandedSwordParams);
	var crossbow = new Crossbow(crossbowParams);
	var shield = new Shield(shieldParams);
	var fist = new Fist();

	//one handed melee weapon equiped
	magicUser.equip(dagger);
	tests.checkGetEquipedWeapon(magicUser, dagger.name, magicUser.getEquipedWeapon().name, testGetEquipedWeapon.name);

	//two handed melee weapon equiped
	fighterSuper.equip(twoHandedSword);
	tests.checkGetEquipedWeapon(fighterSuper, twoHandedSword.name, fighterSuper.getEquipedWeapon().name, testGetEquipedWeapon.name);

	//ranged weapon equiped
	thief.equip(crossbow);
	tests.checkGetEquipedWeapon(thief, crossbow.name, thief.getEquipedWeapon().name, testGetEquipedWeapon.name);	

	//no weapon equiped but 1 hand free
	fighterAverage.equip(shield);
	tests.checkGetEquipedWeapon(fighterAverage, fist.name, fighterAverage.getEquipedWeapon().name, testGetEquipedWeapon.name);	

	//no weapon equiped and no hands free	
	fighterBad.equip(shield);
	fighterBad.equip(shield);
	tests.checkGetEquipedWeapon(fighterBad, null, fighterBad.getEquipedWeapon(), testGetEquipedWeapon.name);	
}

function testIndexOfAmmo()
{
	var fighter = new Fighter(fighterTestParams);	

	var crossbow = new Crossbow(crossbowParams);
	var longbow = new Longbow(longbowParams);
	var shortbow = new Shortbow(shortbowParams);
	var sling = new Sling(slingParams);

	var shield = new Shield(shieldParams);
	var arrow = new Arrow(arrowParams);
	var quarrel = new Quarrel(quarrelParams);
	var stone = new Stone(stoneParams);

	fighter.inventory.addItemToInventory(shield);
	fighter.inventory.addItemToInventory(arrow);
	fighter.inventory.addItemToInventory(quarrel);
	fighter.inventory.addItemToInventory(stone);

	//test index of quarrel using crossbow
	fighter.equip(crossbow);
	tests.checkIndexOfAmmo(fighter, crossbow.name, 2, fighter.inventory.indexOfAmmo(crossbow), testIndexOfAmmo.name);
	fighter.unEquip(crossbow);

	//test index of arrow using longbow
	fighter.equip(longbow);
	tests.checkIndexOfAmmo(fighter, longbow.name, 1, fighter.inventory.indexOfAmmo(longbow), testIndexOfAmmo.name);
	fighter.unEquip(longbow);

	//test index of stone using sling 
	fighter.equip(sling);
	tests.checkIndexOfAmmo(fighter, sling.name, 3, fighter.inventory.indexOfAmmo(sling), testIndexOfAmmo.name);
	fighter.unEquip(sling);

	//test index of arrow using shortbow 
	fighter.equip(shortbow);
	tests.checkIndexOfAmmo(fighter, shortbow.name, 1, fighter.inventory.indexOfAmmo(shortbow), testIndexOfAmmo.name);
	fighter.unEquip(shortbow);
}

function testUseAmmo()
{
	var fighter = new Fighter(fighterTestParams);	

	var crossbow = new Crossbow(crossbowParams);
	var longbow = new Longbow(longbowParams);
	var shortbow = new Shortbow(shortbowParams);
	var sling = new Sling(slingParams);

	var arrow = new Arrow(arrowParams);
	var quarrel = new Quarrel(quarrelParams);
	var stone = new Stone(stoneParams);

	fighter.inventory.addItemToInventory(arrow);
	fighter.inventory.addItemToInventory(quarrel);
	fighter.inventory.addItemToInventory(stone);
	fighter.inventory.addItemToInventory(arrow);

	//use 1 ammo should reduce the number of uses of the ammo in the inventroy -- the ammo item should not be removed unless there are no uses left
	var indexOfQuarrel = fighter.inventory.indexOfAmmo(crossbow);
	fighter.useAmmo(indexOfQuarrel);
	tests.checkUseAmmo(fighter, crossbow.name, 29, fighter.inventory.itemsInInvetory[indexOfQuarrel].remainingNumberOfUses, testUseAmmo.name);
	tests.checkRemoveItemFromInventory(fighter.name, 4, fighter.inventory.itemsInInvetory.length, testUseAmmo.name);	
	
	var indexOfArrow = fighter.inventory.indexOfAmmo(longbow);
	fighter.useAmmo(indexOfArrow);
	tests.checkUseAmmo(fighter, longbow.name, 19, fighter.inventory.itemsInInvetory[indexOfArrow].remainingNumberOfUses, testUseAmmo.name);
	tests.checkRemoveItemFromInventory(fighter.name, 4, fighter.inventory.itemsInInvetory.length, testUseAmmo.name);	

	var indexOfStone = fighter.inventory.indexOfAmmo(sling);
	fighter.useAmmo(indexOfStone);
	tests.checkUseAmmo(fighter, sling.name, 29, fighter.inventory.itemsInInvetory[indexOfStone].remainingNumberOfUses, testUseAmmo.name);
	tests.checkRemoveItemFromInventory(fighter.name, 4, fighter.inventory.itemsInInvetory.length, testUseAmmo.name);	
	
	fighter.useAmmo(indexOfArrow);
	tests.checkUseAmmo(fighter, shortbow.name, 18, fighter.inventory.itemsInInvetory[indexOfArrow].remainingNumberOfUses, testUseAmmo.name);
	tests.checkRemoveItemFromInventory(fighter.name, 4, fighter.inventory.itemsInInvetory.length, testUseAmmo.name);	

	//change the number of quarrels to 1 and then use it should remove the quarrels from the inventory
	fighter.inventory.itemsInInvetory[indexOfQuarrel].remainingNumberOfUses = 1;
	fighter.useAmmo(indexOfQuarrel);
	tests.checkRemoveItemFromInventory(fighter.name, 3, fighter.inventory.itemsInInvetory.length, testUseAmmo.name);	
}

function testIfAttackHits()
{
	 var magicUser = new MagicUser(magaicUserTestParams);
	 
	 var dagger = new Dagger(daggerParams);

	tests.checkIfAttackHit(magicUser, false, magicUser.isAttackAHit(10, magicUser.roleRequiredToHit(magicUser, dagger)), testIfAttackHits.name);
	tests.checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(11, magicUser.roleRequiredToHit(magicUser, dagger)), testIfAttackHits.name);	
	tests.checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(12, magicUser.roleRequiredToHit(magicUser, dagger)), testIfAttackHits.name);
}

function testTakeDamage()
{
 	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var thief = new Thief(thiefTestParams);	

	//take damage less than current number of HPs should still be alive
	magicUser.currentHitPoints = 2;
	magicUser.takeDamage(1);
	tests.checkHitPoints(magicUser, 1, magicUser.currentHitPoints, testTakeDamage.name);
	tests.checkIsDead(magicUser, false, magicUser.isDead, testTakeDamage.name);

	//take damage more than current number of HPs should still be dead
	fighter.currentHitPoints = 8;
	fighter.takeDamage(10);	
	tests.checkHitPoints(fighter, -2, fighter.currentHitPoints, testTakeDamage.name);
	tests.checkIsDead(fighter, true, fighter.isDead, testTakeDamage.name);	

	//take damage equal than current number of HPs should still be dead
	thief.currentHitPoints = 4;
	thief.takeDamage(4);	
	tests.checkHitPoints(thief, 0, thief.currentHitPoints, testTakeDamage.name);
	tests.checkIsDead(thief, true, thief.isDead, testTakeDamage.name);	
}

//----------------------------------------------------------

function runTestCombatvCharacter()
{
	var fighter1 = new Fighter(fighterTestParams);
	var fighter2 = new Fighter(fighterTestParams);
	var sword = new Sword(swordParams);
	fighter1.currentHitPoints = 8;
	fighter2.currentHitPoints = 8;
	fighter1.equip(sword);
	fighter2.equip(sword);
	
	console.log("fighter1's hit points are " + fighter1.currentHitPoints);
	console.log("fighter2's hit points are " + fighter2.currentHitPoints);	
	
	while(!fighter1.isDead && !fighter2.isDead)
	{
		var fighter1Initiative = fighter1.getIndividualInitative();
		var fighter2Initiative = fighter2.getIndividualInitative();
		
		if(fighter1Initiative >= fighter2Initiative)
		{
			console.log("fighter1 attacks");
			fighter1.attack(fighter2);
			console.log("fighter2's hit points are " + fighter2.currentHitPoints);
			if(fighter2.isDead)
			{
				console.log("fighter2 is Dead");
				break;
			}
			console.log("fighter2 attacks");
			fighter2.attack(fighter1);
			console.log("fighter1's hit points are " + fighter1.currentHitPoints);
			if(fighter1.isDead)
			{
				console.log("fighter1 is Dead");
				break;
			}
		}
		else
		{
			console.log("fighter2 attacks");
			fighter2.attack(fighter1);
			console.log("fighter1's hit points are " + fighter1.currentHitPoints);
			if(fighter1.isDead)
			{
				console.log("fighter1 is Dead");
				break;
			}
			console.log("fighter1 attacks");
			fighter1.attack(fighter2);		
			console.log("fighter2's hit points are " + fighter2.currentHitPoints);
			if(fighter2.isDead)
			{
				console.log("fighter2 is Dead");
				break;
			}
		}
	}
}


function runTestCombatvMonsters()
{
	var fighter1 = new Fighter(fighterTestParams);
	var fighter2 = new Fighter(fighterTestParams);
	var fighter3 = new Fighter(fighterTestParams);
	var sword = new Sword(swordParams);
	var sword1 = new Sword(swordParams);
	var sword2 = new Sword(swordParams);
	fighter1.equip(sword);
	fighter2.equip(sword1);
	fighter3.equip(sword2);

	var monsters = Monster.createMonsters(Bandit);

	console.log("you encounter " + monsters.length + " " + monsters[0].name + "s");
	for(var i = 0; monsters.length > i; i++)
	{
		console.log(monsters[i].name + " " + i + " has " + monsters[i].currentHitPoints + " hit points");
	}
}


//--------------------------------------------------------------------------------------------------------------

function runDiceUnitTests()
{
	test3d6();
	test3D6();
	testd10();
	testd20();
	test2D4Plus1();
	test2D4Minus1();
	testD100();
	testD8();
}

function checkDice(params)
{
	dice.rollDice(params.diceRollAsString);

	tests.checkNoOfDice(params.diceRollAsString, params.noOfDice, dice.getNumberOfDice(), test3d6.name);
	tests.checkTypeOfDice(params.diceRollAsString, params.typeOfDice, dice.getTypeOfDice(), test3d6.name);
	tests.checkDiceModifier(params.diceRollAsString, params.modifier, dice.getDiceModifier(), test3d6.name);

	var resultOutsideRange = false

	for(var i =0; noOfTests > i; i++)
	{
		var result = dice.rollDice(params.diceRollAsString);
		if(result > params.max || result < params.min)
		{
			resultOutsideRange = true;
		}
	}
	tests.checkDiceRange(params.diceRollAsString, false, resultOutsideRange, test3d6.name);
}

function test3d6()
{
	var params = 
	{
		min: 3,
		max: 18,
		noOfDice: 3,
		typeOfDice: 6,
		modifier: 0,
		diceRollAsString: "3d6"
	};
	checkDice(params);
}

function test3D6()
{
	var params = 
	{
		min: 3,
		max: 18,
		noOfDice: 3,
		typeOfDice: 6,
		modifier: 0,
		diceRollAsString: "3D6"
	};
	checkDice(params);
}

function testd10()
{
	var params = 
	{
		min: 1,
		max: 10,
		noOfDice: 1,
		typeOfDice: 10,
		modifier: 0,
		diceRollAsString: "d10"
	};
	checkDice(params);
}

function testd20()
{
	var params = 
	{
		min: 1,
		max: 20,
		noOfDice: 1,
		typeOfDice: 20,
		modifier: 0,
		diceRollAsString: "d20"
	};
	checkDice(params);	
}

function test2D4Plus1()
{
	var params = 
	{
		min: 3,
		max: 9,
		noOfDice: 2,
		typeOfDice: 4,
		modifier: 1,
		diceRollAsString: "2D4+1"
	};
	checkDice(params);		
}

function test2D4Minus1()
{
	var params = 
	{
		min: 1,
		max: 7,
		noOfDice: 2,
		typeOfDice: 4,
		modifier: -1,
		diceRollAsString: "2D4-1"
	};
	checkDice(params);		
}

function testD100()
{
	var params = 
	{
		min: 1,
		max: 100,
		noOfDice: 1,
		typeOfDice: 100,
		modifier: 0,
		diceRollAsString: "D100"
	};
	checkDice(params);		
}

function testD8()
{
	var params = 
	{
		min: 1,
		max: 8,
		noOfDice: 1,
		typeOfDice: 8,
		modifier: 0,
		diceRollAsString: "D8"
	};
	checkDice(params);		
}
