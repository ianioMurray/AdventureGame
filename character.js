"use strict"

window.onload = init;

var game = {
	
	characters: [],
	magicUserSpells: [],
	clericSpells: [],
	
	createCharacter: function(characterType, params)
	{	
		var  character ="";
		switch(characterType) 
		{
			case "fighter":
				character = new Fighter(params);
				break;
			case "thief":
				character = new Thief(params);
				break;
			case "cleric":
				character = new Cleric(params);
				break;
			case "magicUser":
				character = new MagicUser(params);
				break;
			default:
				throw "Unknown Character";
		}
		runCharacterGenerationTest(character);
		this.characters.push(character);
	},
	
	createSpells: function()
	{
		var charmPersonParams = {
			name: "charm person",
			level: 1,
			range: 120, 
			duration: "",
			target: ["human", "bugbear", "gnoll", "gnome", "hobgoblin", "lizardman", "kolbold", "orge", "pixie", "sprite"],
			savingThrowToAvoid: "spells",
			areaAffected: null,
			damage: null
		};
		
		magicUserSpells.push(new magicUserSpells(charmPersonParams));
	}
};



function init() 
{
	var uiElements = {
		createCharacterButton: document.getElementById("createCharacter"),
		acceptAttributes: document.getElementById("acceptAttributes"),
		strengthField: document.getElementById("strengthfield"),
		intelligenceField: document.getElementById("intelligencefield"),
		wisdomField: document.getElementById("wisdomfield"),
		dexterityField: document.getElementById("dexterityfield"),
		constitutionField: document.getElementById("constitutionfield"),
		charimsaField: document.getElementById("charismafield"),
		container2: document.getElementById("radials"),
		figherRadial: document.getElementById("figherRadial"),
		thiefRadial: document.getElementById("thiefRadial"),
		clericRadial: document.getElementById("clericRadial"),
		magicUserRadial: document.getElementById("magicUserRadial"),
		nameField: document.getElementById("namefield")
	};	
	
	uiElements.nameField.value = "";
	uiElements.strengthField.value = "";
	uiElements.intelligenceField.value = "";
	uiElements.wisdomField.value = "";
	uiElements.dexterityField.value = "";	
	uiElements.constitutionField.value = "";
	uiElements.charimsaField.value = "";
		
	uiElements.createCharacterButton.onclick = function(){
		generateAttributes(uiElements);
	};

	uiElements.acceptAttributes.style.display = 'none';
	uiElements.acceptAttributes.onclick = function() {
		chooseClass(uiElements);
	};
}

function generateAttributes(uiElements)
{
	uiElements.createCharacterButton.innerHTML = "Reset Values";
	uiElements.acceptAttributes.style.display = 'inline';
	
	uiElements.strengthField.value = generateRandomNumber(6, 3);
	uiElements.intelligenceField.value = generateRandomNumber(6, 3);
	uiElements.wisdomField.value = generateRandomNumber(6, 3);
	uiElements.dexterityField.value = generateRandomNumber(6, 3);	
	uiElements.constitutionField.value = generateRandomNumber(6, 3);
	uiElements.charimsaField.value = generateRandomNumber(6, 3);	
}

function chooseClass(uiElements)
{
	uiElements.createCharacterButton.style.display = 'none';
	uiElements.acceptAttributes.style.display = 'none';
	uiElements.container2.style.display = 'inline-block';
	
	var attributes = {
		name: uiElements.nameField.value,
		strength: uiElements.strengthField.value,
		intelligence: uiElements.intelligenceField.value,
		wisdom: uiElements.wisdomField.value,
		dexterity: uiElements.dexterityField.value,
		constitution: uiElements.constitutionField.value,
		charisma: uiElements.charimsaField.value 
	};

	uiElements.figherRadial.onclick = function() { game.createCharacter("fighter", attributes); }; 
	uiElements.thiefRadial.onclick = function() { game.createCharacter("thief", attributes); }; 
	uiElements.clericRadial.onclick = function() { game.createCharacter("cleric", attributes); }; 
	uiElements.magicUserRadial.onclick = function() { game.createCharacter("magicUser", attributes); };
}

function generateRandomNumber(diceType, noOfDice)
{
	var totalVal = 0;
	
	for(var i= 0; noOfDice > i; i++)
	{
		totalVal += (Math.floor(Math.random() * diceType)) + 1;
	} 
	return totalVal;
}



//--------------------------------------------
//             CHARACTER TYPES
//--------------------------------------------

function Character()
{	
	this.isSpellCaster = false;
	this.hasWeaponRestrictions = false;
	this.hasArmourRestrictions = false;
	this.canUseShield = true;
	this.noOfHands = 2;
	this.useableWeapon = [];

	this.getStrength = function() { return this.strength };
	this.getIntelligence = function() { return this.intelligence };
	this.getWisdom = function() { return this.wisdom };
	this.getDexterity = function() { return this.dexterity };
	this.getConstitution = function() { return this.constitution };
	this.getCharisma = function() { return this.charisma };
	this.getCurrentHitPoints = function() { return this.currentHitPoints };
	
	
	this.gainExperience = function(experience)
	{
		this.experience = this.experience + experience;
		this.checkIfLevelGained();
	};
	
	this.checkIfLevelGained = function() 
	{
		//takes characters current experience and compares it to the 
		//experience required to level up (we use their currentLevel in the array as level starts at 1 and array at 0)
		if( this.experience >= this.levelExperience[this.currentLevel] )
		{
			this.levelUp();
		}
	};
	
	this.isShieldEquiped = function()
	{
		for(var i=0; this.equipedInHands.length > i; i++)
		{
			if(this.equipedInHands[i] instanceof Shield)
			{
				return true;
			}
		}
		return false;
	};
	
	this.isArmourEquiped = function()
	{
		if(this.equipedArmour.length > 0)
		{
			return true;
		}
		return false;
	};	
	
	this.getEquipedWeapon = function()
	{
		//there is an assumption here that only 1 weapon is equiped as a character can only 
		//attack once that makes sense though it would be possible to equip 2 weapons
		for(var i=0; this.equipedInHands.length > i; i++)
		{
			if(this.equipedInHands[i] instanceof Weapon)
			{
				return this.equipedInHands[i];
			}
		}

		if (this.noOfHandsFree > 0)
		{
			return new Fist();
		}

		console.log("You have no weapon equiped and no hands free to punch with");
		return null;
	};
	
	this.isCharacterUnableToUseThisWeapon = function(weapon)
	{
		return (this.hasWeaponRestrictions && ( this.useableWeapon.indexOf(weapon.typeOfWeapon) < 0));
	};
	
	this.isCharacterAbleToUseAShield = function()
	{
		return this.canUseShield;
	};
	
	this.isCharacterUnableToUseThisArmour = function(armour)
	{
		return (this.hasArmourRestrictions && ( this.useableArmour.indexOf(armour.type) < 0 ));
	};

	this.getNumberOfHandsRequiredForItem = function(item)
	{
		if(item.is2Handed)
		{
			return 2;
		}
		else
		{
			return 1;
		}
	};

	this.doesCharacterHaveHandsAvailableToEquipItem = function(item, handsRequired)
	{		
		if(this.noOfHandsFree < handsRequired)
		{
			return false;
		}
		return true;
	};	
	
	this.equip = function(item)
	{
		if(item.equipTo === "hand")
		{
			//can this character use this weapon
			if((item instanceof Weapon) && this.isCharacterUnableToUseThisWeapon(item))
			{
				console.log("this character cannot use this weapon");
			}
			//can this character use a shield
			else if((item instanceof Shield) && !this.isCharacterAbleToUseAShield())
			{
				console.log("this character cannot use a shield");				
			}
			else
			{
				var handsRequired = this.getNumberOfHandsRequiredForItem(item);
					
				if(this.doesCharacterHaveHandsAvailableToEquipItem(item, handsRequired))
				{
					this.noOfHandsFree = this.noOfHandsFree - handsRequired;
					this.equipedInHands.push(item);
					this.armourClass = this.calculateArmourClass();
					return true;
				}
				else 
				{
					console.log("you need to unequip something first");
				}
			}
		}
		else if	(item.equipTo === "body")
		{
			if(this.isCharacterUnableToUseThisArmour(item))
			{
				console.log("this character cannot use this type of armour");
			}
			else if(this.isArmourEquiped())
			{
				console.log("you need to unequip the character current armour first");	
			}
			else
			{
				this.equipedArmour.push(item);
				this.armourClass = this.calculateArmourClass();
				return true;
			}
		}
		return false;
	};
	
	this.isEquipped = function(item, itemLocation)
	{
		if(itemLocation === "hand")
		{	
			return this.equipedInHands.indexOf(item);
		}
		else 
		{
			return this.equipedArmour.indexOf(item);
		}
	};
	
	this.unEquip = function(item)
	{
		//returns the index of the item in the approprate location array
		var indexOfItem = this.isEquipped(item, item.equipTo);

		if(indexOfItem >= 0)
		{
			if(item.equipTo === "hand")
			{
				this.equipedInHands.splice(indexOfItem, 1);
				this.noOfHandsFree = this.noOfHandsFree + this.getNumberOfHandsRequiredForItem(item);
				this.armourClass = this.calculateArmourClass(); //in case it was a shield that is unequipped
				return true;
			}
			else
			{
				this.equipedArmour.splice(indexOfItem, 1);
				this.armourClass = this.calculateArmourClass();
				return true;
			}
		}
		return false;		
	}
	
	this.calculateAttributeModifier = function(attribute)
	{
		if( attribute === 3 )
		{
			return -3;
		}
		else if ( attribute <= 5 )
		{
			return -2;
		}
		else if ( attribute <= 8 )
		{
			return -1;
		}
		else if ( attribute <= 12 )
		{
			return 0;
		}
		else if ( attribute <= 15 )
		{
			return 1;
		}
		else if  ( attribute <= 17 )
		{
			return 2;
		}
		else if (attribute = 18 )
		{
			return 3;
		}
		else
		{
			throw("attribute should be between 3 and 18");
		}
	}
	
	this.calculateArmourClass = function() 
	{
		var armourClass = 9;
		
		//if the character has armour equiped set their armour class
		if(this.isArmourEquiped())
		{
			armourClass = this.equipedArmour[0].armourClass;
		}
		
		//recalculate thier armour class taking into account their dexterity
		armourClass = armourClass + ( this.calculateAttributeModifier(this.dexterity) * -1)
		
		//if the characters AC is now greater than 9 set it back to 9
		if(armourClass > 9)
		{
			armourClass =  9;
		}

		//recalculate their armour class if they have a shield 
		//this is done here to avoid a situation where a character's AC is greater than 10  
		//would make the shield pointless
		if(this.isShieldEquiped())
		{
			armourClass = armourClass - 1;
		}

		return armourClass;
	};
	
	this.roleRequiredToHit = function(opponent, weapon)
	{
		var scoresToHit = [ 	{armourClass: 9, toHit: 10},
								{armourClass: 8, toHit: 11},
								{armourClass: 7, toHit: 12},
								{armourClass: 6, toHit: 13},
								{armourClass: 5, toHit: 14},
								{armourClass: 4, toHit: 15},
								{armourClass: 3, toHit: 16},
								{armourClass: 2, toHit: 17},
								{armourClass: 1, toHit: 18},
								{armourClass: 0, toHit: 19},
								{armourClass: -1, toHit: 20},
								{armourClass: -2, toHit: 20},
								{armourClass: -3, toHit: 20} ];
		
		for(var i = 0; scoresToHit.length > i; i++)
		{
			if(scoresToHit[i].armourClass === opponent.armourClass)
			{
				var toHit = scoresToHit[i].toHit;

				//if weapon is a melee weapon give strength modifier, if not its a ranged weapon so give dexitory modifier
				if(weapon instanceof MeleeWeapon)
				{
					toHit = toHit - this.calculateAttributeModifier(this.strength);
				}
				else 
				{
					toHit = toHit - this.calculateAttributeModifier(this.dexterity);
				}

				//if modifiers make to the toHit greater than 20 set it back to 20
				if(toHit > 20)
				{
					toHit = 20;
				}

				return toHit;
			}	
		}
		return 20;
	};
	
	this.isAttackAHit = function(role, requiredToHit)
	{
		if(role >= requiredToHit)
		{
			return true;
		}
		return false;
	};
	
	this.attack = function(opponent)
	{
		var weapon = this.getEquipedWeapon();

		if(weapon === null)
		{
			console.log("You have no weapons equiped and no hands to punch with");
			return;
		}

		var requiredToHit = this.roleRequiredToHit(opponent, weapon);
		
		var attackIsAHit = this.isAttackAHit(generateRandomNumber(20, 1), requiredToHit);
		
		if(attackIsAHit)
		{
			opponent.takeDamage(generateRandomNumber(weapon.damage, 1));
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
	
	this.calculateInitativeModifier = function()
	{
		var attribute = this.dexterity;
		if( attribute === 3 )
		{
			return -2;
		}
		else if ( attribute <= 8 )
		{
			return -1;
		}
		else if ( attribute <= 12 )
		{
			return 0;
		}
		else if  ( attribute <= 17 )
		{
			return 1;
		}
		else if (attribute = 18 )
		{
			return 2;
		}
		else
		{
			throw("attribute should be between 3 and 18");
		}
	};	
	
	this.getIndividualInitative = function()
	{
		return generateRandomNumber(6, 1) + this.calculateInitativeModifier();
	};
	
	this.setHitPoints = function(randomHps)
	{
		var maxHps;
		
		var hitPointsUplift =  randomHps + this.calculateAttributeModifier(this.constitution);
		//its possible that hit points for a new character would be 0 or less after you take into account the constitution modifier
		// so the min HPs is 1 
		//this applies when you go up levels - HPs should increase by a min of 1 and not decrease or remain the same
		if(hitPointsUplift <= 0)
		{
			hitPointsUplift = 1;
		}
		
		if(this.maxHitPoints == undefined)
		{
			maxHps = 0;
		}
		else
		{
			maxHps = this.maxHitPoints;
		}
		
		return hitPointsUplift + maxHps;
	};
}

//--------------------------------------------
function Fighter(params)
{
	this.name = params.name;
	this.currentLevel = 1;
	this.experience = 0;
	this.strength = params.strength; 
	this.intelligence = params.intelligence; 
	this.wisdom = params.wisdom; 
	this.dexterity = params.dexterity; 
	this.constitution = params.constitution; 
	this.charisma = params.charisma; 
	this.maxHitPoints = this.setHitPoints(generateRandomNumber(8, 1));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
}

Fighter.prototype = new Character();
Fighter.prototype.constructor = Fighter;

Fighter.prototype.levelExperience = [0, 2000, 4000];
Fighter.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(generateRandomNumber(8, 1));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};


//--------------------------------------------
//-------------Thief------------------------
//--------------------------------------------
function Thief(params)
{
	this.name = params.name;
	this.currentLevel = 1;
	this.experience = 0;
	this.strength = params.strength; 
	this.intelligence = params.intelligence; 
	this.wisdom = params.wisdom; 
	this.dexterity = params.dexterity; 
	this.constitution = params.constitution; 
	this.charisma = params.charisma;
	this.maxHitPoints = this.setHitPoints(generateRandomNumber(4, 1));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
}

Thief.prototype = new Character();
Thief.prototype.constructor = Thief;

Thief.prototype.hasArmourRestrictions = true;
Thief.prototype.useableArmour = ["leather"];
Thief.prototype.canUseShield = false;
Thief.prototype.levelExperience = [0, 1200, 2400];
Thief.prototype.pickLockChance = [15, 20, 25];

Thief.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(generateRandomNumber(4, 1));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};

Thief.prototype.pickLockSuccess = function() 
	{
		//takes random perc and compares it to the lock pick success chance
		//(we use their currentLevel in the array as level starts at 1 and array at 0)
		if(generateRandomNumber(100, 1) >= this.pickLockChance[this.currentLevel - 1])
		{
			return true;
		}
		else {
			return false;
		}
	};

//TODO 
// implement find/remove traps, pick pocket, move silently, climb sheer surfaces, hide in shadows, hear noise


//--------------------------------------------
//------------Cleric------------------------
//--------------------------------------------
function Cleric(params)
{
	this.name = params.name;
	this.currentLevel = 1;
	this.experience = 0;
	this.strength = params.strength; 
	this.intelligence = params.intelligence; 
	this.wisdom = params.wisdom; 
	this.dexterity = params.dexterity; 
	this.constitution = params.constitution; 
	this.charisma = params.charisma; 
	this.maxHitPoints = this.setHitPoints(generateRandomNumber(6, 1));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
}

Cleric.prototype = new Character();
Cleric.prototype.constructor = Cleric;

Cleric.prototype.hasWeaponRestrictions = true;
Cleric.prototype.useableWeapon = ["club", "mace", "sling", "war hammer"];
Cleric.prototype.levelExperience = [0, 1500, 3000];
Cleric.prototype.isSpellCaster = true;

Cleric.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(generateRandomNumber(6, 1));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};

//TODO 
// turn undead

//--------------------------------------------
//-------------Magic-User---------------------
//--------------------------------------------
function MagicUser(params)
{
	this.name = params.name;
	this.currentLevel = 1;
	this.experience = 0;
	this.strength = params.strength; 
	this.intelligence = params.intelligence; 
	this.wisdom = params.wisdom; 
	this.dexterity = params.dexterity; 
	this.constitution = params.constitution; 
	this.charisma = params.charisma; 
	this.maxHitPoints = this.setHitPoints(generateRandomNumber(4, 1));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfCurrentFirstLevelSpells = 0;
	this.maxNoOfFirstLevelSpells = 1;
	this.noOfCurrentSecondLevelSpells = 0;
	this.maxNoOfSecondLevelSpells = 0;
	this.currentSpells = [];
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
}

MagicUser.prototype = new Character();
MagicUser.prototype.constructor = MagicUser;

MagicUser.prototype.hasWeaponRestrictions = true;
MagicUser.prototype.useableWeapon = ["dagger", "silver dagger"];
MagicUser.prototype.hasArmourRestrictions = true;
MagicUser.prototype.useableArmour = [];
MagicUser.prototype.canUseShield = false;
MagicUser.prototype.levelExperience = [0, 2500, 5000];
MagicUser.prototype.isSpellCaster = true;

MagicUser.prototype.levelUp = function() 
	{
		this.currentLevel++;
		
		if(this.currentLevel === 2)
		{
			this.maxNoOfFirstLevelSpells++;
		}
		else if(this.currentLevel === 3)
		{
			this.maxNoOfSecondLevelSpells++;
		}
		
		this.maxHitPoints = this.setHitPoints(generateRandomNumber(4, 1));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};

MagicUser.prototype.learnSpell = function(spell)
	{
		if(spell.level === 1)
		{
			if(this.maxNoOfFirstLevelSpells > this.noOfCurrentFirstLevelSpells)
			{
				noOfCurrentFirstLevelSpells++;
				this.currentSpells.push(spell);
			}
			else
			{
				console.log(this.name + " isnt able to learn any more first Level spells");
			}
		}
		else if (spell.level === 2)
		{
			if(this.maxNoOfSecondLevelSpells > this.noOfCurrentSecondLevelSpells)
			{
				noOfCurrentSecondLevelSpells++;
				this.currentSpells.push(spell);
			}
			else
			{
				console.log(this.name + " isnt able to learn any more second Level spells");
			}
		}
	};

MagicUser.prototype.resetSpells = function()
	{
		this.noOfCurrentFirstLevelSpells = 0;
		this.noOfCurrentSecondLevelSpells = 0;
		this.currentSpells = [];
	};

//--------------------------------------------
//             SPELLS
//--------------------------------------------
function Spell()
{
}

//-------------------------------------------
//---------Magic-User Spells-----------------
//-------------------------------------------
function MagicUserSpell(params)
{
	this.name = params.name;
	this.level = params.level;
	this.range = params.range;
	this.duration = params.duration;
	this.target = params.target;
	this.savingThrowToAvoid = params.savingThrowToAvoid;
	this.areaAffected = params.areaAffected;
	this.damage = params.damage;
}

MagicUserSpell.prototype = new Spell();
MagicUserSpell.prototype.constructor = MagicUserSpell;



//--------------------------------------------
//             MONSTERS
//--------------------------------------------
function Monster()
{
}

//-------------------------------------------
//-------------------Orc---------------------
//-------------------------------------------
function Orc(params)
{
	this.armourClass = 6;
	this.hitDice = 1;
	this.movement = 120;
	this.noAttacks = 1;
	
}