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
	name: "sword",
	description: "standard sword",
	cost: 10,
	damage: 8,
	isMagic: false,
	special: "",
	is2Handed: false
};

var daggerParams = {
	name: "dagger",
	description: "standard dagger",
	cost: 3,
	damage: 4,
	typeOfWeapon: false,
	isMagic: false,
	special: ""
};

//armour
var leatherArmourParams = {	
	name: "Leather Armour",
	description: "Leather Armour",
	cost: 20,
	isMagic: false,
	special: ""
};	

var chainArmourParams = {	
	name: "Chain Mail Armour",
	description: "Chain Mail Armour",
	cost: 40,  
	isMagic: false,
	special: ""
};

var plateArmourParams = {	
	name: "Plate Mail Armour",
	description: "Plate Mail Armour",
	cost: 60,  
	isMagic: false,
	special: ""
};	

//shield	
var shieldParams = {
	name: "Shield",
	description: "Standard Shield",
	cost: 10,
	isMagic: false,
	special: "",
};


//run tests
var tests = new Tests();
runUnitTests();
//runTestCombat();


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

			console.log(message);
		}
	};
	
	this.checkLevel = function(adventurer, expected, actual, testName)
	{
		var message = " FAIL " + testName +": character " + adventurer.name + "'s level should be " + expected + " but was " + actual;
		this.validate(expected, actual, message);
	};
	
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
	
	this.testResults = function()
	{
		if(this.allTestsPass == true)
		{
			console.log("----------------------------------------------------------------");
			console.log("PASS: all " + this.totalTests + " tests passed");
			console.log("----------------------------------------------------------------");	
		}
		else
		{		
			console.log("----------------------------------------------------------------");
			console.log("FAIL: " + this.noOfFailingTests + " of " + this.totalTests + " failed");
			console.log("----------------------------------------------------------------");			
		}
	};
}




function runUnitTests()
{	
	testGainExperience();
	testLevelUp();
	
	testDexterityBonus();
	testStrengthBonus();
	testConstitutionBonus();
	
	testIndividualInitiativeBonus();
	
	testEquipDagger();
	testEquipSword();
	testUnequipSword();
	
	testNoOfHandsFree();
	testEquipThirdHandItemFails();
	
	testIsArmourEquiped();
	testEquipLeatherArmour();
	testEquipChainMailArmour();
	testEquipPlateMailArmour();
	testEquipShield();
	testUnequipLeatherArmour();
	testEquipTwoSetsOfArmour();

	testCalculateArmourClass();



	//test for setHitPoints
	

	

	
	testRoleRequiredToHit();
	testIfAttackHits();
	testTakeDamage();
	
	tests.testResults();
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

	var sword = new Sword(swordParams);
	var dagger = new Dagger(daggerParams);
	var shield = new Shield(shieldParams);
	var leatherArmour = new LeatherArmour(leatherArmourParams);
	
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
	tests.checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree, testNoOfHandsFree.name)

	//test to make sure no of hands free does not go below 0
	thief.equip(sword);
	thief.equip(dagger);	
	tests.checkNoOfHandsFree(thief, 0, thief.noOfHandsFree, testNoOfHandsFree.name);
	thief.equip(dagger);
	tests.checkNoOfHandsFree(thief, 0, thief.noOfHandsFree, testNoOfHandsFree.name);
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

function testRoleRequiredToHit()
{
 	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	
	
	var dagger = new Dagger(daggerParams);
	var shield = new Shield(shieldParams);
	var plateMail = new PlateMail(plateArmourParams);
	
	fighter.equip(plateMail);
	fighter.equip(shield);
	
	cleric.equip(plateMail);
	cleric.equip(shield);
	
	tests.checkRequiredToHitRoles(magicUser, 11, magicUser.roleRequiredToHit(magicUser, dagger), testRoleRequiredToHit.name); //magic user has an AC of 9
	tests.checkRequiredToHitRoles(magicUser, 19, magicUser.roleRequiredToHit(fighter, dagger), testRoleRequiredToHit.name);   //fighter has an AC of 1
	tests.checkRequiredToHitRoles(magicUser, 14, magicUser.roleRequiredToHit(thief, dagger), testRoleRequiredToHit.name);     //thief has an AC of 6
	tests.checkRequiredToHitRoles(magicUser, 16, magicUser.roleRequiredToHit(cleric, dagger), testRoleRequiredToHit.name);    //cleric has an AC of 4
	tests.checkRequiredToHitRoles(fighter, 12, fighter.roleRequiredToHit(cleric, dagger), testRoleRequiredToHit.name);    //cleric has an AC of 4	
}

function testIfAttackHits()
{
 	var magicUser = new MagicUser(magaicUserTestParams);

	tests.checkIfAttackHit(magicUser, false, magicUser.isAttackAHit(10, magicUser.roleRequiredToHit(magicUser)), testIfAttackHits.name);
	tests.checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(11, magicUser.roleRequiredToHit(magicUser)), testIfAttackHits.name);	
	tests.checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(12, magicUser.roleRequiredToHit(magicUser)), testIfAttackHits.name);
}

function testTakeDamage()
{
 	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);

	magicUser.currentHitPoints = 2;
	magicUser.takeDamage(1);
	tests.checkHitPoints(magicUser, 1, magicUser.currentHitPoints, testTakeDamage.name);
	tests.checkIsDead(magicUser, false, magicUser.isDead, testTakeDamage.name);
	
	fighter.currentHitPoints = 8;
	fighter.takeDamage(10);	
	tests.checkHitPoints(fighter, -2, fighter.currentHitPoints, testTakeDamage.name);
	tests.checkIsDead(fighter, true, fighter.isDead, testTakeDamage.name);	
}

//----------------------------------------------------------

function runTestCombat()
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
			fighter1.attack(fighter2, sword);
			console.log("fighter2's hit points are " + fighter2.currentHitPoints);
			if(fighter2.isDead)
			{
				console.log("fighter2 is Dead");
				break;
			}
			console.log("fighter2 attacks");
			fighter2.attack(fighter1, sword);
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
			fighter2.attack(fighter1, sword);
			console.log("fighter1's hit points are " + fighter1.currentHitPoints);
			if(fighter1.isDead)
			{
				console.log("fighter1 is Dead");
				break;
			}
			console.log("fighter1 attacks");
			fighter1.attack(fighter2, sword);		
			console.log("fighter2's hit points are " + fighter2.currentHitPoints);
			if(fighter2.isDead)
			{
				console.log("fighter2 is Dead");
				break;
			}
		}
	}
}

//----------------------------------------------------------


function runCharacterGenerationTest(charact) 
{
	function checkAttribute(attribute, charactAttribute)
	{
		if(charactAttribute < 3 || charactAttribute > 18)
		{
			console.log("FAIL: character's " + attribute + " is not between 3 and 18");
		}
	}
	
	const checkHitPoints = function(expectedMin, expectedMax)
	{
		if(charact.maxHitPoints < expectedMin || charact.maxHitPoints > expectedMax)
		{
			console.log("FAIL: character's hit points should be between " + expectedMin + " and " + expectedMax);
		}
	};

	function checkWeaponsRestriction(expected)
	{
		if(charact.hasWeaponRestrictions !== expected)
		{
			console.log("FAIL: character's weapon restriction should be " + expected);				
		}
	}
	
	function checkArmourRestriction(expected)
	{
		if(charact.hasArmourRestrictions !== expected)
		{
			console.log("FAIL: character's armour restriction should be " + expected);				
		}	
	}
	
	function checkCanUseShield(expected)
	{
		if(charact.canUseShield !== expected)
		{
			console.log("FAIL: character's 'can use shield' should be " + expected);	
		}
	}
		
	function checkCanUseMagic(expected)
	{
		if(charact.isSpellCaster !== expected)
		{
			console.log("FAIL: character is expected to have magic use equal " + expected);				
		}
	}
	
	//check current character being generated
	console.log(charact.name + " is a " + charact.constructor.name);
	checkAttribute("strength", charact.getStrength());
	checkAttribute("intelligence", charact.getIntelligence());		
	checkAttribute("wisdom", charact.getWisdom());		
	checkAttribute("dexterity", charact.getDexterity());
	checkAttribute("constitution", charact.getConstitution());		
	checkAttribute("charisma", charact.getCharisma());		

	if(charact instanceof MagicUser)
	{	
		checkHitPoints(1 + charact.calculateAttributeModifier(charact.constitution), 4 + charact.calculateAttributeModifier(charact.constitution));
		checkCanUseMagic(true);
		checkWeaponsRestriction(true);
		checkArmourRestriction(true);
		checkCanUseShield(false);
	}
	else if (charact instanceof Fighter)
	{
		checkHitPoints(1 + charact.calculateAttributeModifier(charact.constitution), 8 + charact.calculateAttributeModifier(charact.constitution));
		checkCanUseMagic(false);
		checkWeaponsRestriction(false);
		checkArmourRestriction(false);
		checkCanUseShield(true);
	}		
	else if (charact instanceof Thief)
	{		
		checkHitPoints(1 + charact.calculateAttributeModifier(charact.constitution), 4 + charact.calculateAttributeModifier(charact.constitution));
		checkCanUseMagic(false);
		checkWeaponsRestriction(false);
		checkArmourRestriction(true);
		checkCanUseShield(false);
	}	
	else if (charact instanceof Cleric)
	{	
		checkHitPoints(1 + charact.calculateAttributeModifier(charact.constitution), 6 + charact.calculateAttributeModifier(charact.constitution));
		checkCanUseMagic(true);
		checkWeaponsRestriction(true);
		checkArmourRestriction(false);
		checkCanUseShield(true);
	}
}