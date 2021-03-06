"use strict";

//run tests
const noOfTests = 200;
var tests = new Tests();
runCharacterUnitTests();
runInventoryUnitTests();
runWeaponUnitTests();
runMonsterUnitTests();
runSavingThrowTests();
//runAmmoTests();
runDiceUnitTests();
tests.testResults();

//runTestCombatvCharacter();
//runTestCombatvMonsterBandits();
//runTestCombatvMonsterBanditsInLair();
//runTestCombatvMonsterCarrionCrawler();
//runTestCombatvMonsterBear();


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

	this.checkIsSavingThrowMade = function(individual, typeOfSave, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + individual.name + "'s saving throw against " + typeOfSave + " was " + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkParseHitDiceHd = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + monster.name + "'s hit dice are " + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkParseHitDiceModifier = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + monster.name + "'s hit dice modifier is " + actual + " but the expected was " + expected;
		this.validate(expected, actual, message);
	};

	this.checkCreateMonsters = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + actual + " " + monster.name + "s were created in the group but " + expected + " were expected";
		this.validate(expected, actual, message);
	};
	
	this.checkGetHPs = function (monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + monster + "'s hit points were outside expected range";
		this.validate(expected, actual, message);
	};

	this.checkSurpriseOpponent = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " + monster.name + " has acheived surprise " + actual + " but the expected was " +  expected;
		this.validate(expected, actual, message);		
	};

	this.checkGetLevel = function(monster, expected, actual, testName) 
	{
		var message = " FAIL " + testName + ": " + monster.name + "'s level is " + actual + " but the expected was " +  expected;
		this.validate(expected, actual, message);	
	};

	this.checkNoOfMonsters = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": there were " + actual + " " + monster.name + "s created but  " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkMonstersName = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + "'s name is " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};	

	this.checkGetMorale = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + "'s morale is " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkLeaderAlive = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + "'s leader is alive " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);		
	};

	this.checkIsImmuneToDamageType = function(monster, weapon, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + " is immune to " + weapon.name + " - " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkAutomaticallyHitsOpponent = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + " will auto hit - " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.checkIsAutomicallyHitByOpponent = function(monster, expected, actual, testName)
	{
		var message = " FAIL " + testName + ": " +  monster.name + " will be automatically hit - " + actual + " but " + expected + " was expected";
		this.validate(expected, actual, message);
	};

	this.testResults = function()
	{
		if(this.allTestsPass === true)
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

function runMonsterUnitTests()
{
	testMonsterToHit();
	testMonsterTakeDamage();
	testParseHitDice();
	testCreateMonsters();
	testGetHPs();
	testSurpriseOpponent();
	testGetLevel();
	testGetMorale();
	testIsImmuneToDamageType();
	testAutomaticallyHitsOpponent();
	testIsAutomicallyHitByOpponent();
}

//-----------------------------------------------

function runSavingThrowTests()
{
	testIsSavingThrowMade();
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
	var aveMagicUser = new MagicUser(magaicUserWithAverageStatsParams);
	var fighter = new Fighter(fighterWithAverageStatsParams);
	var cleric = new Cleric(clericWithAverageStatsParams);
	var aveThief = new Thief(thiefWithAverageStatsParams);
	var badFighter = new Fighter(fighterWithAwfulStatsParams);
	var goodFighter = new Fighter(fighterWithAwesomeStatsParams);
	var thief = new Thief(thiefTestParams);
	var magicUser = new MagicUser(magaicUserTestParams);

	//newly created character with no experience
	tests.checkExperience(aveMagicUser, 0, aveMagicUser.experience, testGainExperience.name);
	//add 100 experience
	aveMagicUser.gainExperience(100);
	tests.checkExperience(aveMagicUser, 100, aveMagicUser.experience, testGainExperience.name);	
		
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
	tests.checkExperience(aveThief, 0, aveThief.experience, testGainExperience.name);
	//add 34 experience
	aveThief.gainExperience(34);
	tests.checkExperience(aveThief, 34, aveThief.experience, testGainExperience.name);

	//lose experience (I am thinking of drain level for the future)
	//subtract 10 experience
	aveThief.gainExperience(-10);
	tests.checkExperience(aveThief, 24, aveThief.experience, testGainExperience.name);
	
	//newly created character with no experience
	tests.checkExperience(badFighter, 0, badFighter.experience, testGainExperience.name);
	//add 100 experience but this character has a xp modifier of -20%
	badFighter.gainExperience(100);	
	tests.checkExperience(badFighter, 80, badFighter.experience, testGainExperience.name);

	//newly created character with no experience
	tests.checkExperience(goodFighter, 0, goodFighter.experience, testGainExperience.name);
	//add 100 experience but this character has a xp modifier of 10%
	goodFighter.gainExperience(100);	
	tests.checkExperience(goodFighter, 110, goodFighter.experience, testGainExperience.name);

	//newly created character with no experience
	tests.checkExperience(thief, 0, thief.experience, testGainExperience.name);
	//add 100 experience but this character has a xp modifier of 10%
	thief.gainExperience(100);	
	tests.checkExperience(thief, 110, thief.experience, testGainExperience.name);	

	//newly created character with no experience
	tests.checkExperience(magicUser, 0, magicUser.experience, testGainExperience.name);
	//add 100 experience but this character has a xp modifier of 5%
	magicUser.gainExperience(100);	
	tests.checkExperience(magicUser, 105, magicUser.experience, testGainExperience.name);		
}	

function testLevelUp()
{
	var magicUser = new MagicUser(magaicUserWithAverageStatsParams);
	var fighter = new Fighter(fighterWithAverageStatsParams);
	var cleric = new Cleric(clericWithAverageStatsParams);
	var thief = new Thief(thiefWithAverageStatsParams);	
	
	var characters = [	{ classType: magicUser, secondLevel: 2500, thirdLevel: 5000 },
						{ classType: fighter, secondLevel: 2000, thirdLevel: 4000 },
						{ classType: cleric, secondLevel: 1500, thirdLevel: 3000 },
						{ classType: thief, secondLevel: 1200, thirdLevel: 2400 } ];

	for(let i = 0; characters.length > i; i++)
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
	for(let i = 0; _MaxNumberOfInventoryItems > i; i++)
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
	for(let i = 0; _MaxNumberOfInventoryItems > i; i++)
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
	for(let i = 0; (_MaxNumberOfInventoryItems - 2) > i; i++)
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
	for(let i = 0; 10 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 10, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 8 arrows in slot 11
	anotherFighter.inventory.addItemToInventory(arrowUses8);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);	

	//add items to inventory to fill up to space 27
	for(let i = 0; 15 > i; i++)
	{
		anotherFighter.inventory.addItemToInventory(anotherSword);
	}
	tests.checkAddItemToInventory(anotherFighter, 26, anotherFighter.inventory.itemsInInvetory.length, testAddItemToInventory.name);

	//add 7 arrows in slot 27
	anotherFighter.inventory.addItemToInventory(arrowUses7);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[10].name, 8, anotherFighter.inventory.itemsInInvetory[10].remainingNumberOfUses, testAddItemToInventory.name);
	tests.checkNumberOfUses(anotherFighter, anotherFighter.inventory.itemsInInvetory[26].name, 7, anotherFighter.inventory.itemsInInvetory[26].remainingNumberOfUses, testAddItemToInventory.name);		

	//add items to inventory to fill up to space 39
	for(let i = 0; 11 > i; i++)
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
	for(let i = 0; 5 > i; i++)
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
	for(let i = 0; 6 > i; i++)
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
	for(let i = 1; (_MaxNumberOfInventoryItems - 1) > i; i++)
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

function testMonsterToHit()
{
	var ape = new Ape();
	var acolyte = new Acolyte(); 

	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);

	var shield = new Shield(shieldParams);
	var plateMail = new PlateMail(plateArmourParams);

	fighter.equip(plateMail);
	fighter.equip(shield);

	//4 hit dice monster
	tests.checkRequiredToHitRoles(ape, 7, requiredToHit.getToHit(ape, magicUser), testMonsterToHit.name);  //mager user has an AC of 9
	tests.checkRequiredToHitRoles(ape, 15, requiredToHit.getToHit(ape, fighter), testMonsterToHit.name);  //fighter user has an AC of 1

	//1 hit dice monster
	tests.checkRequiredToHitRoles(acolyte, 10, requiredToHit.getToHit(acolyte, magicUser), testMonsterToHit.name);  //mager user has an AC of 9
	tests.checkRequiredToHitRoles(acolyte, 18, requiredToHit.getToHit(acolyte, fighter), testMonsterToHit.name);  //fighter user has an AC of 1
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

function testMonsterTakeDamage()
{
	var ape = new Ape();
	var acolyte = new Acolyte(); 

	ape.currentHitPoints = 7;
	ape.takeDamage(4);	
	tests.checkHitPoints(ape, 3, ape.currentHitPoints, testMonsterTakeDamage.name);
	tests.checkIsDead(ape, false, ape.isDead, testMonsterTakeDamage.name);	

	acolyte.currentHitPoints = 6;
	acolyte.takeDamage(10);	
	tests.checkHitPoints(acolyte, -4, acolyte.currentHitPoints, testMonsterTakeDamage.name);
	tests.checkIsDead(acolyte, true, acolyte.isDead, testMonsterTakeDamage.name);	
}

function testIsSavingThrowMade()
{
	var ape = new Ape();
	var acolyte = new Acolyte(); 
	var magicUser = new MagicUser(magaicUserTestParams);
	var fighter = new Fighter(fighterTestParams);
	var cleric = new Cleric(clericTestParams);
	var thief = new Thief(thiefTestParams);	

	//save vs poison 
	tests.checkIsSavingThrowMade(ape, "DeathRayPoison", false, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DeathRayPoison, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "DeathRayPoison", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "DeathRayPoison", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DeathRayPoison, 13), testIsSavingThrowMade.name);
	
	tests.checkIsSavingThrowMade(acolyte, "DeathRayPoison", false, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DeathRayPoison, 10), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "DeathRayPoison", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DeathRayPoison, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "DeathRayPoison", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(magicUser, "DeathRayPoison", false, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "DeathRayPoison", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DeathRayPoison, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "DeathRayPoison", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DeathRayPoison, 14), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(fighter, "DeathRayPoison", false, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DeathRayPoison, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "DeathRayPoison", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "DeathRayPoison", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DeathRayPoison, 13), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(cleric, "DeathRayPoison", false, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DeathRayPoison, 10), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "DeathRayPoison", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DeathRayPoison, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "DeathRayPoison", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(thief, "DeathRayPoison", false, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DeathRayPoison, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "DeathRayPoison", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DeathRayPoison, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "DeathRayPoison", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DeathRayPoison, 14), testIsSavingThrowMade.name);

	//save vs magic wands 
	tests.checkIsSavingThrowMade(ape, "MagicWands", false, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.MagicWands, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "MagicWands", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "MagicWands", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.MagicWands, 14), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(acolyte, "MagicWands", false, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.MagicWands, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "MagicWands", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.MagicWands, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "MagicWands", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(magicUser, "MagicWands", false, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "MagicWands", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.MagicWands, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "MagicWands", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.MagicWands, 15), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(fighter, "MagicWands", false, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.MagicWands, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "MagicWands", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "MagicWands", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.MagicWands, 14), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(cleric, "MagicWands", false, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.MagicWands, 11), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "MagicWands", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.MagicWands, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "MagicWands", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(thief, "MagicWands", false, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.MagicWands, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "MagicWands", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.MagicWands, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "MagicWands", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.MagicWands, 15), testIsSavingThrowMade.name);

	//save vs paralysis
	tests.checkIsSavingThrowMade(ape, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 15), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(acolyte, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 15), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(magicUser, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 12), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(fighter, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(fighter.saveAs,savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(fighter.saveAs,savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(fighter.saveAs,savingThrow.typeOfSave.ParalysisTurnToStone, 15), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(cleric, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 15), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(thief, "ParalysisTurnToStone", false, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone), 12, testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 13), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "ParalysisTurnToStone", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.ParalysisTurnToStone, 14), testIsSavingThrowMade.name);

	//save vs dragon breathe
	tests.checkIsSavingThrowMade(ape, "DragonBreath", false, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DragonBreath, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "DragonBreath", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "DragonBreath", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(acolyte, "DragonBreath", false, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "DragonBreath", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "DragonBreath", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.DragonBreath, 17), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(magicUser, "DragonBreath", false, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "DragonBreath", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "DragonBreath", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.DragonBreath, 17), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(fighter, "DragonBreath", false, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DragonBreath, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "DragonBreath", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "DragonBreath", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(cleric, "DragonBreath", false, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "DragonBreath", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "DragonBreath", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.DragonBreath, 17), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(thief, "DragonBreath", false, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DragonBreath, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "DragonBreath", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DragonBreath, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "DragonBreath", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.DragonBreath, 17), testIsSavingThrowMade.name);

	//save vs Rods & staves
	tests.checkIsSavingThrowMade(ape, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(ape, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(ape.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 17), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(acolyte, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(acolyte, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(acolyte.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(magicUser, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(magicUser, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(magicUser.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(fighter, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(fighter, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(fighter.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 17), testIsSavingThrowMade.name);

	tests.checkIsSavingThrowMade(cleric, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(cleric, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(cleric.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);
	
	tests.checkIsSavingThrowMade(thief, "RodsStavesSpells", false, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 14), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 15), testIsSavingThrowMade.name);
	tests.checkIsSavingThrowMade(thief, "RodsStavesSpells", true, savingThrow.isSavingThrowMade(thief.saveAs, savingThrow.typeOfSave.RodsStavesSpells, 16), testIsSavingThrowMade.name);
}

function testParseHitDice()
{
	var carrionCrawler = new CarrionCrawler();
	var ape = new Ape();
	var bat = new BatNormal();
	var goblin = new Goblin();
	var mountainLion = new MountainLion();

	//HD 3+1 
	tests.checkParseHitDiceHd(carrionCrawler, "3", carrionCrawler.parseHitDice().hitDice, testParseHitDice.name);
	tests.checkParseHitDiceModifier(carrionCrawler, 1, carrionCrawler.parseHitDice().modifier, testParseHitDice.name);	
	//HD 4
	tests.checkParseHitDiceHd(ape, "4", ape.parseHitDice().hitDice, testParseHitDice.name);
	tests.checkParseHitDiceModifier(ape, 0, ape.parseHitDice().modifier, testParseHitDice.name);
	//HD 0.1
	tests.checkParseHitDiceHd(bat, "0.1", bat.parseHitDice().hitDice, testParseHitDice.name);
	tests.checkParseHitDiceModifier(bat, 0, bat.parseHitDice().modifier, testParseHitDice.name);
	//HD 1-1
	tests.checkParseHitDiceHd(goblin, "1", goblin.parseHitDice().hitDice, testParseHitDice.name);
	tests.checkParseHitDiceModifier(goblin, -1, goblin.parseHitDice().modifier, testParseHitDice.name);
	//HD 3+2
	tests.checkParseHitDiceHd(mountainLion, "3", mountainLion.parseHitDice().hitDice, testParseHitDice.name);
	tests.checkParseHitDiceModifier(mountainLion, 2, mountainLion.parseHitDice().modifier, testParseHitDice.name);
}

function testCreateMonsters()
{
	tests.checkCreateMonsters(CarrionCrawler, 2, Monster.createMonsters(CarrionCrawler, 2).length, testCreateMonsters.name);
	tests.checkCreateMonsters(Acolyte, 3, Monster.createMonsters(Acolyte, 3).length, testCreateMonsters.name);
	//creates a group of acolytes with a leader
	tests.checkCreateMonsters(Acolyte, 5, Monster.createMonsters(Acolyte, 4).length, testCreateMonsters.name);
	//create a group of bandits with a leader
	tests.checkCreateMonsters(Bandit, 7, Monster.createMonsters(Bandit, 6, false, false, true).length, testCreateMonsters.name);
	//create a group of bandits without a leader
	tests.checkCreateMonsters(Bandit, 12, Monster.createMonsters(Bandit, 12).length, testCreateMonsters.name);
	//attempt to create a group of carrionCrawlers with a leader will create a group but a leader is not possible with carrion crawlers
	tests.checkCreateMonsters(CarrionCrawler, 3, Monster.createMonsters(CarrionCrawler, 3, false, false, true).length, testCreateMonsters.name);
}

function testGetHPs()
{
	testApeHps();
	testBatHps();
	testKolboldHPs();
	testGnollLeaderHPs();
	testGnomeChieftainHPs();
	testGnomeChieftainBodyguardHPs();
}

function checkHPs(params)
{
	var resultOutsideRange = false;
	for(let i =0; noOfTests > i; i++)
	{
		var monster = new params.monsterType();
		var result = monster.GetHPs();
		if(result < params.min || result > params.max)
		{
			resultOutsideRange = true;
		}
	}
	tests.checkGetHPs(params.monsterName, false, resultOutsideRange, checkHPs.name);
}

function testApeHps()
{
	//Ape is 4 Hit Dice
	var params = {
		min: 4,
		max: 32,
		monsterName: "Ape",
		monsterType: Ape
	};
	checkHPs(params);
}

function testBatHps()
{
	//Bat is 0.1 Hit Dice so has 1 Hp
	var params = {
		min: 1,
		max: 1,
		monsterName: "Normal Bat",
		monsterType: BatNormal
	};
	checkHPs(params);
}

function testKolboldHPs()
{
	//Kolbold is 0.5 hit dice
	var params = {
		min: 1,
		max: 4,
		monsterName: "Kolbold",
		monsterType: Kobold
	};
	checkHPs(params);
}

function testGnollLeaderHPs()
{
	//Gnoll Leader is 3 hit dice and has 16 Hp
	var params = {
		min: 16,
		max: 16,
		monsterName: "Gnoll Leader",
		monsterType: GnollLeader
	};
	checkHPs(params);
}

function testGnomeChieftainHPs()
{
	//Gnome Chieftain is 4 hit dice and has 18 Hp
	var params = {
		min: 18,
		max: 18,
		monsterName: "Gnome Chieftain",
		monsterType: GnomeChieftain
	};
	checkHPs(params);
}

function testGnomeChieftainBodyguardHPs()
{
	//Gnome Chieftain bodyguard is 3 hit dice and have 10-13Hp
	var params = {
		min: 10,
		max: 13,
		monsterName: "Gnome Chieftain Bodyguard",
		monsterType: GnomeChieftainBodyGuard
	};
	checkHPs(params);
}


function testSurpriseOpponent()
{
	var boar = new Boar();
	var bugbear = new Bugbear();

	tests.checkSurpriseOpponent(boar, true, boar.surpriseOpponent(2), testSurpriseOpponent.name);
	tests.checkSurpriseOpponent(boar, false, boar.surpriseOpponent(3), testSurpriseOpponent.name);

	tests.checkSurpriseOpponent(bugbear, true, bugbear.surpriseOpponent(3), testSurpriseOpponent.name);
	tests.checkSurpriseOpponent(bugbear, false, bugbear.surpriseOpponent(4), testSurpriseOpponent.name);
}

function testGetLevel()
{
	var dwarfLeader = new DwarfLeader();

	tests.checkGetLevel(dwarfLeader, "3", dwarfLeader.getLevel(3), testGetLevel.name);
}

function testGetMorale()
{
	//create a group of dwarves with a leader 
	var dwarvesWithLeader = Monster.createMonsters(Dwarf, 20);
	tests.checkNoOfMonsters(dwarvesWithLeader[1], 21, dwarvesWithLeader.length, testGetMorale.name);
	tests.checkMonstersName(dwarvesWithLeader[0], "Dwarf Leader", dwarvesWithLeader[0].name, testGetMorale.name);
	tests.checkMonstersName(dwarvesWithLeader[1], "Dwarf", dwarvesWithLeader[1].name, testGetMorale.name);

	tests.checkGetMorale(dwarvesWithLeader[1], 10, dwarvesWithLeader[1].getMorale(), testGetMorale.name);
	//kill a random dwarf and morale is unaffected 
	dwarvesWithLeader[1].setIsDead();
	tests.checkLeaderAlive(dwarvesWithLeader[1], true, Dwarf.leaderAlive, testGetMorale.name);
	tests.checkGetMorale(dwarvesWithLeader[1], 10, dwarvesWithLeader[1].getMorale(), testGetMorale.name);
	//kill the leader and morale should drop
	dwarvesWithLeader[0].setIsDead();
	tests.checkLeaderAlive(dwarvesWithLeader[1], false, Dwarf.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(dwarvesWithLeader[1], 8, dwarvesWithLeader[1].getMorale(), testGetMorale.name);


	//create a group of dwarves with NO leader 
	var dwarvesWithNoLeader = Monster.createMonsters(Dwarf, 10);
	tests.checkNoOfMonsters(dwarvesWithNoLeader[1], 10, dwarvesWithNoLeader.length, testGetMorale.name);	
	tests.checkGetMorale(dwarvesWithNoLeader[1], 8, dwarvesWithNoLeader[1].getMorale(), testGetMorale.name);
	//kill a random dwarf and morale is unaffected 
	dwarvesWithNoLeader[1].setIsDead();
	tests.checkLeaderAlive(dwarvesWithLeader[1], false, Dwarf.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(dwarvesWithNoLeader[1], 8, dwarvesWithNoLeader[1].getMorale(), testGetMorale.name);


	//create a group of Acolytes with leader 
	var acolytesWithLeader = Monster.createMonsters(Acolyte, 4);
	tests.checkMonstersName(acolytesWithLeader[0], "Acolyte Leader", acolytesWithLeader[0].name, testGetMorale.name);
	tests.checkMonstersName(acolytesWithLeader[1], "Acolyte", acolytesWithLeader[1].name, testGetMorale.name);

	tests.checkNoOfMonsters(acolytesWithLeader[1], 5, acolytesWithLeader.length, testGetMorale.name);	
	tests.checkLeaderAlive(acolytesWithLeader[1], true, Acolyte.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(acolytesWithLeader[1], 7, acolytesWithLeader[1].getMorale(), testGetMorale.name);
	//kill the leader does not affect acolyte morale
	acolytesWithLeader[0].setIsDead();
	tests.checkLeaderAlive(acolytesWithLeader[1], false, Acolyte.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(acolytesWithLeader[1], 7, acolytesWithLeader[1].getMorale(), testGetMorale.name);


	//create a group of Bandits with leader
	var banditsWithLeader = Monster.createMonsters(Bandit, 4, false, false, true);
	tests.checkMonstersName(banditsWithLeader[0], "Bandit Leader", banditsWithLeader[0].name, testGetMorale.name);
	tests.checkMonstersName(banditsWithLeader[1], "Bandit", banditsWithLeader[1].name, testGetMorale.name);

	tests.checkNoOfMonsters(banditsWithLeader[1], 5, banditsWithLeader.length, testGetMorale.name);	
	tests.checkLeaderAlive(banditsWithLeader[1], true, Bandit.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(banditsWithLeader[1], 8, banditsWithLeader[1].getMorale(), testGetMorale.name);
	//kill the leader does not affect bandits morale
	banditsWithLeader[0].setIsDead();
	tests.checkLeaderAlive(banditsWithLeader[1], false, Bandit.leaderAlive, testGetMorale.name);	
	tests.checkGetMorale(banditsWithLeader[1], 8, banditsWithLeader[1].getMorale(), testGetMorale.name);

	//create a group of Gnomes in their lair with a leader and chieftain
	var gnomesWithLeaderAndChieftain = Monster.createMonsters(Gnome, 20, true);
	tests.checkMonstersName(gnomesWithLeaderAndChieftain[0], "Gnome Leader", gnomesWithLeaderAndChieftain[0].name, testGetMorale.name);
	tests.checkMonstersName(gnomesWithLeaderAndChieftain[1], "Gnome Chieftain", gnomesWithLeaderAndChieftain[1].name, testGetMorale.name);
	tests.checkMonstersName(gnomesWithLeaderAndChieftain[2], "Gnome Chieftain Bodyguard", gnomesWithLeaderAndChieftain[2].name, testGetMorale.name);
	tests.checkMonstersName(gnomesWithLeaderAndChieftain[10], "Gnome", gnomesWithLeaderAndChieftain[10].name, testGetMorale.name);
	tests.checkGetMorale(gnomesWithLeaderAndChieftain[1], 10, gnomesWithLeaderAndChieftain[1].getMorale(), testGetMorale.name);

	//kill a random gnome and morale is unaffected 
	gnomesWithLeaderAndChieftain[10].setIsDead();
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], true, Gnome.leaderAlive, testGetMorale.name);
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], true, Gnome.chieftainAlive, testGetMorale.name);
	tests.checkGetMorale(gnomesWithLeaderAndChieftain[1], 10, gnomesWithLeaderAndChieftain[1].getMorale(), testGetMorale.name);

	//kill a chieftain gnome and morale is unaffected 
	gnomesWithLeaderAndChieftain[2].setIsDead();
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], true, Gnome.leaderAlive, testGetMorale.name);
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], true, Gnome.chieftainAlive, testGetMorale.name);
	tests.checkGetMorale(gnomesWithLeaderAndChieftain[1], 10, gnomesWithLeaderAndChieftain[1].getMorale(), testGetMorale.name);

	//kill the gnome leader and morale is unaffected (only affected by chieftain)
	gnomesWithLeaderAndChieftain[0].setIsDead();
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], false, Gnome.leaderAlive, testGetMorale.name);
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], true, Gnome.chieftainAlive, testGetMorale.name);
	tests.checkGetMorale(gnomesWithLeaderAndChieftain[1], 10, gnomesWithLeaderAndChieftain[1].getMorale(), testGetMorale.name);

	//kill the gnome chieftain and morale changes to 8
	gnomesWithLeaderAndChieftain[1].setIsDead();
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], false, Gnome.leaderAlive, testGetMorale.name);
	tests.checkLeaderAlive(gnomesWithLeaderAndChieftain[1], false, Gnome.chieftainAlive, testGetMorale.name);
	tests.checkGetMorale(gnomesWithLeaderAndChieftain[1], 8, gnomesWithLeaderAndChieftain[1].getMorale(), testGetMorale.name);
}

function testIsImmuneToDamageType()
{
	var gargoyle = new Gargoyle();
	var ferret = new FerretGiant();

	var sword = new Sword(swordParams);
	var silverDagger = new SilverDagger(silverDaggerParams);
	var magicalSword = new Sword(magicalSwordParams);

	//ferret is not immune to any damage
	tests.checkIsImmuneToDamageType(ferret, sword, false, ferret.isImmuneToDamageType(sword), testIsImmuneToDamageType.name);
	tests.checkIsImmuneToDamageType(ferret, silverDagger, false, ferret.isImmuneToDamageType(silverDagger), testIsImmuneToDamageType.name);
	tests.checkIsImmuneToDamageType(ferret, magicalSword, false, ferret.isImmuneToDamageType(magicalSword), testIsImmuneToDamageType.name);

	//gargoyle is immune to all damage except silver or magical weapons 
	tests.checkIsImmuneToDamageType(gargoyle, sword, true, gargoyle.isImmuneToDamageType(sword), testIsImmuneToDamageType.name);
	tests.checkIsImmuneToDamageType(gargoyle, silverDagger, true, gargoyle.isImmuneToDamageType(silverDagger), testIsImmuneToDamageType.name);
	tests.checkIsImmuneToDamageType(gargoyle, magicalSword, false, gargoyle.isImmuneToDamageType(magicalSword), testIsImmuneToDamageType.name);
}

function testAutomaticallyHitsOpponent()
{
	var gelatinousCube = new GelatinousCube();
	var fighter = new Fighter(fighterTestParams);

	//will NOT auto hit opponent that is not paralysised or that has not been hit before
	tests.checkAutomaticallyHitsOpponent(gelatinousCube, false, gelatinousCube.automaticallyHitsOpponent(fighter), testAutomaticallyHitsOpponent.name);

	//will NOT auto hit opponent - fighter previously hit but not paralysised 
	gelatinousCube.previouslyHit = [fighter];
	fighter.isParalysised = false;
	tests.checkAutomaticallyHitsOpponent(gelatinousCube, false, gelatinousCube.automaticallyHitsOpponent(fighter), testAutomaticallyHitsOpponent.name);	

	//will NOT auto hit opponent - fighter Not previously hit but is paralysised 
	gelatinousCube.previouslyHit = [];
	fighter.isParalysised = true;
	tests.checkAutomaticallyHitsOpponent(gelatinousCube, false, gelatinousCube.automaticallyHitsOpponent(fighter), testAutomaticallyHitsOpponent.name);	

	//will auto hit opponent - fighter  previously hit and is paralysised 
	gelatinousCube.previouslyHit = [fighter];
	fighter.isParalysised = true;
	tests.checkAutomaticallyHitsOpponent(gelatinousCube, true, gelatinousCube.automaticallyHitsOpponent(fighter), testAutomaticallyHitsOpponent.name);	
}

function testIsAutomicallyHitByOpponent()
{
	var greenSlime = new GreenSlime();
	var gnoll = new Gnoll();

	tests.checkIsAutomicallyHitByOpponent(greenSlime, true, greenSlime.isAutomicallyHitByOpponent(), testIsAutomicallyHitByOpponent.name);
	tests.checkIsAutomicallyHitByOpponent(gnoll, false, gnoll.isAutomicallyHitByOpponent(), testIsAutomicallyHitByOpponent.name);
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

	tests.checkNoOfDice(params.diceRollAsString, params.noOfDice, dice.getNumberOfDice(), checkDice.name);
	tests.checkTypeOfDice(params.diceRollAsString, params.typeOfDice, dice.getTypeOfDice(), checkDice.name);
	tests.checkDiceModifier(params.diceRollAsString, params.modifier, dice.getDiceModifier(), checkDice.name);

	var resultOutsideRange = false;

	for(let i =0; noOfTests > i; i++)
	{
		var result = dice.rollDice(params.diceRollAsString);
		if(result > params.max || result < params.min)
		{
			resultOutsideRange = true;
		}
	}
	tests.checkDiceRange(params.diceRollAsString, false, resultOutsideRange, checkDice.name);
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
