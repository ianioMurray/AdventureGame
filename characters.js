
"use strict";

//import {Inventory} from './inventorys';

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
	this.isParalysised = false;
	this.paralysisedDuration = 0;
	this.isKnockedDown = false;
	this.canOnlyBeDamagedBy = [];

	this.getStrength = function() { return this.strength; };
	this.getIntelligence = function() { return this.intelligence; };
	this.getWisdom = function() { return this.wisdom; };
	this.getDexterity = function() { return this.dexterity; };
	this.getConstitution = function() { return this.constitution; };
	this.getCharisma = function() { return this.charisma; };
	this.getCurrentHitPoints = function() { return this.currentHitPoints; };
	
	
	this.gainExperience = function(experience)
	{
		var bonusExperience = experience * this.calculateExperinceBonus();
		this.experience = this.experience + experience + bonusExperience;
		this.checkIfLevelGained();
	};
	
	this.calculateExperinceBonus = function()
	{
		var primeAttribute = this.primeRequisite;
		var attribute;
		switch(primeAttribute)
		{
			case charactersPrimeRequisite.Strength:
				attribute = this.strength;
				break;
			case charactersPrimeRequisite.Intelligence:
				attribute = this.intelligence;
				break;
			case charactersPrimeRequisite.Wisdom:
				attribute = this.wisdom;
				break;
			case charactersPrimeRequisite.Dexterity:
				attribute = this.dexterity;
				break;
			default:
				throw "Prime Requisite not found";
		}

		if( attribute >= 3 && attribute <= 5 )
		{
			return -0.2;
		}
		else if ( attribute <= 8 )
		{
			return -0.1;
		}
		else if ( attribute <= 12 )
		{
			return 0;
		}
		else if  ( attribute <= 15 )
		{
			return 0.05;
		}
		else if ( attribute > 16 && attribute < 19 )
		{
			return 0.1;
		}
		else
		{
			throw "Attribute score is not within the range 3 to 18";
		}
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

		return null;
	};
	
	this.isCharacterUnableToUseThisWeapon = function(weapon)
	{
		var canUseWeapon = this.hasWeaponRestrictions &&  this.useableWeapon.indexOf(weapon.id) < 0;
		return canUseWeapon;
	};
	
	this.isCharacterAbleToUseAShield = function()
	{
		return this.canUseShield;
	};
	
	this.isCharacterUnableToUseThisArmour = function(armour)
	{
		var canUseArmour = this.hasArmourRestrictions && this.useableArmour.indexOf(armour.id) < 0;
		return canUseArmour;
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
				console.log(this.name + " cannot use a "+ item.name);
			}
			//can this character use a shield
			else if((item instanceof Shield) && !this.isCharacterAbleToUseAShield())
			{
				console.log(this.name + " cannot use a shield");				
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
					console.log(this.name + " needs to unequip something first");
				}
			}
		}
		else if	(item.equipTo === "body")
		{	
			if(this.isCharacterUnableToUseThisArmour(item))
			{
				console.log(this.name + " cannot use " + item.name);
			}
			else if(this.isArmourEquiped())
			{
				console.log(this.name +  " needs to unequip their current armour first");	
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
	};
	
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
		else if (attribute === 18 )
		{
			return 3;
		}
		else
		{
			throw "attribute should be between 3 and 18";
		}
	};
	
	this.calculateArmourClass = function() 
	{
		var armourClass = 9;
		
		//if the character has armour equiped set their armour class
		if(this.isArmourEquiped())
		{
			armourClass = this.equipedArmour[0].armourClass;
		}
		
		//recalculate thier armour class taking into account their dexterity
		armourClass = armourClass + ( this.calculateAttributeModifier(this.dexterity) * -1);
		
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
		var toHit = requiredToHit.getToHit(this, opponent);
			
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
	};
	
	this.isAttackAHit = function(role, requiredToHit)
	{
		if(role >= requiredToHit)
		{
			return true;
		}
		return false;
	};

	this.useAmmo = function(index)
	{
		this.inventory.reduceUsesOfAmmo(index);
	};

	this.attack = function(opponent)
	{
		var weapon = this.getEquipedWeapon();

		if(weapon === null)
		{
			console.log(this.name + " has no weapons equiped and no hands free to punch with");
			return;
		}

		if(weapon instanceof RangedWeapon)
		{
			var index = this.hasAmmo(weapon);
			if(index === -1)
			{
				console.log(this.name + " has no ammo for their " + weapon.name);
				return;
			}
			else
			{
				this.useAmmo(index);
			}
		}

		var attackIsAHit = false;

		if(opponent.isAutomicallyHitByOpponent())
		{
			attackIsAHit = true;
		}
		else
		{
			var requiredToHit = this.roleRequiredToHit(opponent, weapon);
			attackIsAHit = this.isAttackAHit(dice.rollDice("1D20"), requiredToHit);
		}

		if(attackIsAHit)
		{
			if(!opponent.isImmuneToDamageType(weapon))
			{
				opponent.takeDamage(dice.rollDice(weapon.damage));
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
		else if (attribute === 18 )
		{
			return 2;
		}
		else
		{
			throw "attribute should be between 3 and 18";
		}
	};	
	
	this.getIndividualInitative = function()
	{
		return dice.rollDice("D6") + this.calculateInitativeModifier();
	};
	
	this.setHitPoints = function(hpIncrease)
	{
		var maxHps;
		
		var hitPointsUplift =  hpIncrease + this.calculateAttributeModifier(this.constitution);
		//its possible that hit points for a new character would be 0 or less after you take into account the constitution modifier
		// so the min HPs is 1 
		//this applies when you go up levels - HPs should increase by a min of 1 and not decrease or remain the same
		if(hitPointsUplift <= 0)
		{
			hitPointsUplift = 1;
		}
		
		//if the character is being created their hps will be undefined
		if(this.maxHitPoints === undefined)
		{
			maxHps = 0;
		}
		else
		{
			maxHps = this.maxHitPoints;
		}
		
		return hitPointsUplift + maxHps;
	};

	this.setIsDead = function()
	{
		this.isDead = true;
	};
}


//--------------------------------------------
//-------------Fighter------------------------
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
	this.maxHitPoints = this.setHitPoints(dice.rollDice("D8"));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
	this.inventory = new Inventory();
	this.saveAs = { class: characterType.Fighter, level: this.currentLevel};
	this.moneyGold = dice.rollDice("3D6") * 10;
}

Fighter.prototype = new Character();
Fighter.prototype.constructor = Fighter;
Fighter.prototype.primeRequisite = charactersPrimeRequisite.Strength;

Fighter.prototype.levelExperience = [0, 2000, 4000];
Fighter.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(dice.rollDice("D8"));
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
	this.maxHitPoints = this.setHitPoints(dice.rollDice("D4"));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
	this.inventory = new Inventory();
	this.saveAs = { class: characterType.Thief, level: this.currentLevel};
	this.moneyGold = dice.rollDice("3D6") * 10;
}

Thief.prototype = new Character();
Thief.prototype.constructor = Thief;

Thief.prototype.hasArmourRestrictions = true;
Thief.prototype.useableArmour = ["leather armour"];
Thief.prototype.canUseShield = false;
Thief.prototype.levelExperience = [0, 1200, 2400];
Thief.prototype.pickLockChance = [15, 20, 25];
Thief.prototype.primeRequisite = charactersPrimeRequisite.Dexterity;

Thief.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(dice.rollDice("D4"));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};

Thief.prototype.pickLockSuccess = function() 
	{
		//takes random perc and compares it to the lock pick success chance
		//(we use their currentLevel in the array as level starts at 1 and array at 0)
		if(dice.rollDice("D100") >= this.pickLockChance[this.currentLevel - 1])
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
	this.maxHitPoints = this.setHitPoints(dice.rollDice("D6"));
	this.currentHitPoints = this.maxHitPoints;
	this.noOfHandsFree = 2;
	this.equipedInHands = [];
	this.equipedArmour = [];
	this.armourClass = this.calculateArmourClass();
	this.isDead = false;
	this.inventory = new Inventory();
	this.saveAs = { class: characterType.Cleric, level: this.currentLevel};
	this.moneyGold = dice.rollDice("3D6") * 10;
}

Cleric.prototype = new Character();
Cleric.prototype.constructor = Cleric;

Cleric.prototype.hasWeaponRestrictions = true;
Cleric.prototype.useableWeapon = ["club", "mace", "sling", "war hammer"];
Cleric.prototype.levelExperience = [0, 1500, 3000];
Cleric.prototype.isSpellCaster = true;
Cleric.prototype.primeRequisite = charactersPrimeRequisite.Wisdom;

Cleric.prototype.levelUp = function() 
	{
		this.currentLevel++;
		this.maxHitPoints = this.setHitPoints(dice.rollDice("D6"));
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
	this.maxHitPoints = this.setHitPoints(dice.rollDice("D4"));
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
	this.inventory = new Inventory();
	this.saveAs = { class: characterType.MagicUser, level: this.currentLevel};
	this.moneyGold = dice.rollDice("3D6") * 10;
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
MagicUser.prototype.primeRequisite = charactersPrimeRequisite.Intelligence;

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
		
		this.maxHitPoints = this.setHitPoints(dice.rollDice("D4"));
		//when a character goes up a level this heal to max
		this.currentHitPoints = this.maxHitPoints;
	};

MagicUser.prototype.learnSpell = function(spell)
	{
		if(spell.level === 1)
		{
			if(this.maxNoOfFirstLevelSpells > this.noOfCurrentFirstLevelSpells)
			{
				this.noOfCurrentFirstLevelSpells++;
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
				this.noOfCurrentSecondLevelSpells++;
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





