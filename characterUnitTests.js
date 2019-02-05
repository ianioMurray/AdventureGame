
runUnitTests();

function runUnitTests()
{
	var allTestsPass = true;
	var noOfFailingTests = 0;
	
	function checkLevel(adventurer, expectedLevel, actualLevel)
	{
		if(actualLevel !== expectedLevel)
		{
			allTestsPass = false;
			noOfFailingTests++;				
			console.log("FAIL: character " + adventurer.name + "'s level should be " + expectedLevel + " but was " + actualLevel);
		}
	}
	
	function checkExperience(adventurer, expectedExperience, actualExperience)
	{
		if(actualExperience !== expectedExperience)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: character " + adventurer.name + "'s experience should be " + expectedExperience + " but appears to be " + actualExperience);
		}
	}
	
	function checkDexterityBonus(adventurer, expected, actual) 
	{
		if(expected !== actual)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: character " + adventurer.name + "'s dexterity bonus should be " + expected + " but appears to be " + actual);
		}
	}
	

	function checkItemEquiped(adventurer, item, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: item " + item + " equiped to " + adventurer.name + " was " + actual + " but " + expected + " was expected");				
		}
	}					
	
	function checkItemUnEquiped(adventurer, item, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: item " + item + " unequiped from " + adventurer.name + " was " + actual + " but " + expected + " was expected");				
		}
	}
	
	function checkArmourClass(adventurer, expected, actual)
	{			
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: character " + adventurer.name + "'s armour class is " + actual + " but " + expected + " was expected");				
		}
	}								
	
	function checkNoOfHandsFree(adventurer, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: the number of hands " + adventurer.name + " has free is " + actual + " but " + expected + " was expected");				
		}
	}
	
	function checkIsArmourEquiped(adventure, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;	
			console.log("FAIL: " + adventurer.name + " has armour equiped " + actual + " but " + expected + " was expected");				
		}
	}
	
	function checkRequiredToHitRoles(adventurer, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;			
			console.log("FAIL: " + adventurer.name + " requires a roll of " + actual + " to hit but " + expected + " was expected");				
		}
	}
	
	function checkIfAttackHit(adventurer, expected, actual)
	{
		if(actual !== expected)
		{
			allTestsPass = false;
			noOfFailingTests++;			
			console.log("FAIL: " + adventurer.name + "'s attack hit was " + actual + " but " + expected + " was expected");				
		}	
	};
	
	function checkHitPointsAndIsDeadAfterTakingDamage(adventurer, expectedHp, isDeadExpected)
	{
		if(adventurer.currentHitPoints !== expectedHp)
		{
			allTestsPass = false;
			noOfFailingTests++;			
			console.log("FAIL: " + adventurer.name + "'s hit points are " + adventurer.currentHitPoints + " but " + expectedHp + " was expected");				
		}
		
		if(adventurer.isDead !== isDeadExpected)
		{
			allTestsPass = false;
			noOfFailingTests++;			
			console.log("FAIL: " + adventurer.name + "'s was dead " + adventurer.isDead + " but " + isDeadExpected + " was expected");				
		}			
	};
	
	//character 	
	var magaicUserTestParams = { 
		name: "kazam",
		strength: 8,
		intelligence: 15,
		wisdom: 13,
		dexterity: 12,
		constitution: 7,
		chrisma: 15,
		hp: 2
	};
	var magicUser = new MagicUser(magaicUserTestParams);

	
	var fighterTestParams = { 
		name: "Conan",
		strength: 18,
		intelligence: 5,
		wisdom: 8,
		dexterity: 14,
		constitution: 11,
		chrisma: 6,
		hp: 8
	};
	var fighter = new Fighter(fighterTestParams);

	
	var clericTestParams = { 
		name: "Radagast",
		strength: 13,
		intelligence: 8,
		wisdom: 17,
		dexterity: 5,
		constitution: 8,
		chrisma: 16,
		hp: 4
	};
	var cleric = new Cleric(clericTestParams);

	var thiefTestParams = { 
		name: "Sticky",
		strength: 6,
		intelligence: 17,
		wisdom: 3,
		dexterity: 18,
		constitution: 17,
		chrisma: 11,
		hp: 4
	};
	var thief = new Thief(thiefTestParams);	
	
	//weapons
	var swordParams = {
		cost: 10,
		damage: 8,
		isMagic: false,
		special: "",
		is2Handed: false
	};
	var sword = new Sword(swordParams);

	var daggerParams = {
		cost: 3,
		damage: 4,
		typeOfWeapon: false,
		isMagic: false,
		special: ""
	};
	var dagger = new Dagger(daggerParams);		
	
	//armour
	var leatherArmourParams = {	
		cost: 20,
		isMagic: false,
		special: ""
	};	
	var leatherArmour = new LeatherArmour(leatherArmourParams);
	
	var chainArmourParams = {	
		cost: 40,  //TODO : check cost
		isMagic: false,
		special: ""
	};		
	var chainMail = new ChainMail(chainArmourParams);
	
	var plateArmourParams = {	
		cost: 40,  //TODO : check cost
		isMagic: false,
		special: ""
	};		
	var plateMail = new PlateMail(plateArmourParams);
	
	//shield
	var shieldParams = {
		cost: 10,
		isMagic: false,
		special: "",
	};	
	var shield = new Shield(shieldParams);
	

	function testLevelCorrect(adventurer, secondLevel, thirdLevel) 
	{
		//newly created character tested for experience and level
		checkExperience(adventurer, 0, adventurer.experience);
		checkLevel(adventurer, 1, adventurer.currentLevel);
		
		//add experience so 1 pt less than 2nd level
		var secondLevelMinusOne = secondLevel-1;
		adventurer.gainExperience(secondLevelMinusOne);
		checkExperience(adventurer, secondLevelMinusOne, adventurer.experience);	
		checkLevel(adventurer, 1, adventurer.currentLevel);
		
		//add 1 more experience so total equals amount for 2nd level
		adventurer.gainExperience(1);			
		checkExperience(adventurer, secondLevel, adventurer.experience);	
		checkLevel(adventurer, 2, adventurer.currentLevel);
		
		//add experience so 1 pt less than 3rd level
		var experienceRequiredToGetToThirdLevelMinusOne = (thirdLevel-secondLevel) - 1;
		var thirdLevelMinusOne = thirdLevel-1;
		adventurer.gainExperience(experienceRequiredToGetToThirdLevelMinusOne);
		checkExperience(adventurer, thirdLevelMinusOne, adventurer.experience);	
		checkLevel(adventurer, 2, adventurer.currentLevel);
		
		//add 1 more experience so total equals amount for 3rd level
		adventurer.gainExperience(1);
		checkExperience(adventurer, thirdLevel, adventurer.experience);	
		checkLevel(adventurer, 3, adventurer.currentLevel);
	}	
	
	testLevelCorrect(magicUser, 2500, 5000);
	testLevelCorrect(fighter, 2000, 4000);
	testLevelCorrect(thief, 1200, 2400);		
	testLevelCorrect(cleric, 1500, 3000);
			
	checkDexterityBonus(magicUser, 0, magicUser.calculateArmourClassDexterityModifier());
	checkDexterityBonus(fighter, -1, fighter.calculateArmourClassDexterityModifier());
	checkDexterityBonus(thief, -3, thief.calculateArmourClassDexterityModifier());		
	checkDexterityBonus(cleric, 2, cleric.calculateArmourClassDexterityModifier());

	//check character can use a sword and that based on the result the number of hands they have free is correct
	checkItemEquiped(magicUser, "sword", false, magicUser.equip(sword));
	checkNoOfHandsFree(magicUser, 2, magicUser.noOfHandsFree);
	checkItemEquiped(fighter, "sword", true, fighter.equip(sword));
	checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree);		
	checkItemEquiped(thief, "sword", true, thief.equip(sword));
	checkNoOfHandsFree(thief, 1, thief.noOfHandsFree);			
	checkItemEquiped(cleric, "sword", false, cleric.equip(sword));
	checkNoOfHandsFree(cleric, 2, cleric.noOfHandsFree);	

	//Unequip sword
	checkItemUnEquiped(magicUser, "sword", false, magicUser.unEquip(sword));  // he doesnt have a sword
	checkNoOfHandsFree(magicUser, 2, magicUser.noOfHandsFree);
	checkItemUnEquiped(fighter, "sword", true, fighter.unEquip(sword));  
	checkNoOfHandsFree(fighter, 2, fighter.noOfHandsFree);
	checkItemUnEquiped(thief, "sword", true, thief.unEquip(sword));  
	checkNoOfHandsFree(thief, 2, thief.noOfHandsFree);		
	checkItemUnEquiped(cleric, "sword", false, cleric.unEquip(sword));  // he doesnt have a sword
	checkNoOfHandsFree(cleric, 2, cleric.noOfHandsFree);	

	//check character can use leather armour
	checkItemEquiped(magicUser, "leather armour", false, magicUser.equip(leatherArmour));
	checkArmourClass(magicUser, 9, magicUser.armourClass);		
	checkItemEquiped(fighter, "leather armour", true, fighter.equip(leatherArmour));
	checkArmourClass(fighter, 6, fighter.armourClass);			
	checkItemEquiped(thief, "leather armour", true, thief.equip(leatherArmour));
	checkArmourClass(thief, 4, thief.armourClass);
	checkItemEquiped(cleric, "leather armour", true, cleric.equip(leatherArmour));
	checkArmourClass(cleric, 9, cleric.armourClass);	
	
	//check a character is unable to equip 2 sets of armour
	checkIsArmourEquiped(fighter, true, fighter.isArmourEquiped());		
	checkItemEquiped(fighter, "chain armour", false, fighter.equip(chainMail));
	checkArmourClass(fighter, 6, fighter.armourClass);	
	
	//unequip LeatherArmour
	checkItemUnEquiped(magicUser, "leather armour", false, magicUser.unEquip(leatherArmour));  // he doesnt have leather armour
	checkArmourClass(magicUser, 9, magicUser.armourClass);	
	checkItemUnEquiped(fighter, "leather armour", true, fighter.unEquip(leatherArmour));  
	checkArmourClass(fighter, 8, fighter.armourClass);	
	checkItemUnEquiped(thief, "leather armour", true, thief.unEquip(leatherArmour)); 
	checkArmourClass(thief, 6, thief.armourClass);	 	
	checkItemUnEquiped(cleric, "leather armour", true, cleric.unEquip(leatherArmour));  
	checkArmourClass(cleric, 9, cleric.armourClass);	
	
	//ensure characters dont have armour equiped after the unequip / or never been equipped
	checkIsArmourEquiped(magicUser, false, magicUser.isArmourEquiped());
	checkIsArmourEquiped(fighter, false, fighter.isArmourEquiped());	
	
	//check character can use chain mail armour
	checkItemEquiped(magicUser, "chain mail armour", false, magicUser.equip(chainMail));
	checkArmourClass(magicUser, 9, magicUser.armourClass);		
	checkItemEquiped(fighter, "chain mail armour", true, fighter.equip(chainMail));
	checkArmourClass(fighter, 4, fighter.armourClass);			
	checkItemEquiped(thief, "chain mail armour", false, thief.equip(chainMail));
	checkArmourClass(thief, 6, thief.armourClass);
	checkItemEquiped(cleric, "chain mail armour", true, cleric.equip(chainMail));
	checkArmourClass(cleric, 7, cleric.armourClass);
	
	//unequip ChainMailArmour
	checkItemUnEquiped(magicUser, "chain mail armour", false, magicUser.unEquip(chainMail));  // he doesnt have chain mail armour
	checkArmourClass(magicUser, 9, magicUser.armourClass);	
	checkItemUnEquiped(fighter, "chain mail armour", true, fighter.unEquip(chainMail));  
	checkArmourClass(fighter, 8, fighter.armourClass);	
	checkItemUnEquiped(thief, "chain mail armour", false, thief.unEquip(chainMail));   // he doesnt have chain mail armour
	checkArmourClass(thief, 6, thief.armourClass);	 	
	checkItemUnEquiped(cleric, "chain mail armour", true, cleric.unEquip(chainMail));  
	checkArmourClass(cleric, 9, cleric.armourClass);	
	
	//check character can use plate mail armour
	checkItemEquiped(magicUser, "plate mail armour", false, magicUser.equip(plateMail));
	checkArmourClass(magicUser, 9, magicUser.armourClass);		
	checkItemEquiped(fighter, "plate mail armour", true, fighter.equip(plateMail));
	checkArmourClass(fighter, 2, fighter.armourClass);			
	checkItemEquiped(thief, "plate mail armour", false, thief.equip(plateMail));
	checkArmourClass(thief, 6, thief.armourClass);
	checkItemEquiped(cleric, "plate mail armour", true, cleric.equip(plateMail));
	checkArmourClass(cleric, 5, cleric.armourClass);
	
	//check character can use shield (note: armour class still inculdes plate mail armour)
	checkItemEquiped(magicUser, "shield", false, magicUser.equip(shield));
	checkArmourClass(magicUser, 9, magicUser.armourClass);		
	checkNoOfHandsFree(magicUser, 2, magicUser.noOfHandsFree);
	checkItemEquiped(fighter, "shield", true, fighter.equip(shield));
	checkArmourClass(fighter, 1, fighter.armourClass);			
	checkNoOfHandsFree(fighter, 1, fighter.noOfHandsFree);
	checkItemEquiped(thief, "shield", false, thief.equip(shield));
	checkArmourClass(thief, 6, thief.armourClass);
	checkNoOfHandsFree(thief, 2, thief.noOfHandsFree);		
	checkItemEquiped(cleric, "shield", true, cleric.equip(shield));
	checkArmourClass(cleric, 4, cleric.armourClass);				
	checkNoOfHandsFree(cleric, 1, cleric.noOfHandsFree);				
	
	//check character can use dagger (note: some characters still holding a shield)
	checkItemEquiped(magicUser, "dagger", true, magicUser.equip(dagger));		
	checkNoOfHandsFree(magicUser, 1, magicUser.noOfHandsFree);
	checkItemEquiped(fighter, "dagger", true, fighter.equip(dagger));		
	checkNoOfHandsFree(fighter, 0, fighter.noOfHandsFree);
	checkItemEquiped(thief, "dagger", true, thief.equip(dagger));
	checkNoOfHandsFree(thief, 1, thief.noOfHandsFree);		
	checkItemEquiped(cleric, "dagger", false, cleric.equip(dagger));		
	checkNoOfHandsFree(cleric, 1, cleric.noOfHandsFree);
	
	//check it is not possible to hold 3 items (testing on fighter has he has no hands free currently)
	checkItemEquiped(fighter, "dagger", false, fighter.equip(dagger));	
	
	//check 'required to hit' values 
	checkRequiredToHitRoles(magicUser, 10, magicUser.roleRequiredToHit(magicUser, dagger)); //magic user has an AC of 9
	checkRequiredToHitRoles(magicUser, 18, magicUser.roleRequiredToHit(fighter, dagger));   //fighter has an AC of 1
	checkRequiredToHitRoles(magicUser, 13, magicUser.roleRequiredToHit(thief, dagger));     //thief has an AC of 6
	checkRequiredToHitRoles(magicUser, 15, magicUser.roleRequiredToHit(cleric, dagger));    //cleric has an AC of 4

	//check for a hit 
	checkIfAttackHit(magicUser, false, magicUser.isAttackAHit(9, magicUser.roleRequiredToHit(magicUser)));
	checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(10, magicUser.roleRequiredToHit(magicUser)));	
	checkIfAttackHit(magicUser, true, magicUser.isAttackAHit(11, magicUser.roleRequiredToHit(magicUser)));	
	
	//check take damage and is character dead
	magicUser.takeDamage(1);
	checkHitPointsAndIsDeadAfterTakingDamage(magicUser, 1, false);
	fighter.takeDamage(10);
	checkHitPointsAndIsDeadAfterTakingDamage(fighter, -2, true);	
	

	if(allTestsPass == true)
	{
		console.log("----------------------------------------------------------------");
		console.log("PASS: all tests passed");
		console.log("----------------------------------------------------------------");	
	}
	else
	{		
		console.log("----------------------------------------------------------------");
		console.log("FAIL: " + noOfFailingTests + " failed");
		console.log("----------------------------------------------------------------");			
	}
}

function runCharacterGenerationTest(charact) 
{
	function checkAttribute(attribute, charactAttribute)
	{
		if(charactAttribute < 3 || charactAttribute > 18)
		{
			console.log("FAIL: character's " + attribute + " is not between 3 and 18");
		}
	}
	
	function checkHitPoints(expectedMin, expectedMax)
	{
		if(charact.getHitPoints < 1 || charact.getHitPoints > 4)
		{
			console.log("FAIL: character's hit potins should be between " + expectedMin + " and " + expectedMax);
		}
	}				

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
		checkHitPoints(1, 4);
		checkCanUseMagic(true);
		checkWeaponsRestriction(true);
		checkArmourRestriction(true);
		checkCanUseShield(false);
	}
	else if (charact instanceof Fighter)
	{
		checkHitPoints(1, 8);
		checkCanUseMagic(false);
		checkWeaponsRestriction(false);
		checkArmourRestriction(false);
		checkCanUseShield(true);
	}		
	else if (charact instanceof Thief)
	{		
		checkHitPoints(1, 4);
		checkCanUseMagic(false);
		checkWeaponsRestriction(false);
		checkArmourRestriction(true);
		checkCanUseShield(false);
	}	
	else if (charact instanceof Cleric)
	{	
		checkHitPoints(1, 6);
		checkCanUseMagic(true);
		checkWeaponsRestriction(true);
		checkArmourRestriction(false);
		checkCanUseShield(true);
	}
}