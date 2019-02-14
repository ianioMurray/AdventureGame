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
	
	uiElements.strengthField.value = dice.rollAndSumDice("3D6");
	uiElements.intelligenceField.value = dice.rollAndSumDice("3D6");
	uiElements.wisdomField.value = dice.rollAndSumDice("3D6");
	uiElements.dexterityField.value = dice.rollAndSumDice("3D6");	
	uiElements.constitutionField.value = dice.rollAndSumDice("3D6");
	uiElements.charimsaField.value = dice.rollAndSumDice("3D6");	
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