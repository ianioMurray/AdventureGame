function getRandomMonster(monsters) { return dice.rollDice("1D" + monsters.length); }
function getRandomCharacter(party)  { return dice.rollDice("1D" + party.length); }

function create3FighterParty()
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
    
	fighter1.name = "Albert";
	fighter2.name = "Bob";
	fighter3.name = "Charley";

    return [fighter1, fighter2, fighter3];
}

function create3FighterAnd3ClericParty()
{
    var fighter1 = new Fighter(fighterTestParams);
	var fighter2 = new Fighter(fighterTestParams);
	var fighter3 = new Fighter(fighterTestParams);
	var cleric1 = new Cleric(clericTestParams);
	var cleric2 = new Cleric(clericTestParams);
	var cleric3 = new Cleric(clericTestParams);
	var sword1 = new Sword(swordParams);
	var sword2 = new Sword(swordParams);
	var sword3 = new Sword(swordParams);
	var mace1 = new Mace(maceParams);
	var mace2 = new Mace(maceParams);
	var mace3 = new Mace(maceParams);
	var plateMail1 = new PlateMail(plateArmourParams);
	var plateMail2 = new PlateMail(plateArmourParams);
	var plateMail3 = new PlateMail(plateArmourParams);
	var plateMail4 = new PlateMail(plateArmourParams);
	var plateMail5 = new PlateMail(plateArmourParams);
	var plateMail6 = new PlateMail(plateArmourParams);

	fighter1.name = "Albert";
	fighter2.name = "Bob";
	fighter3.name = "Charley";
	cleric1.name = "Dave";
	cleric2.name = "Eric";
	cleric3.name = "Fred";

	fighter1.equip(sword1);
	fighter1.equip(plateMail1);
	fighter2.equip(sword2);
	fighter2.equip(plateMail2);
	fighter3.equip(sword3);
	fighter3.equip(plateMail3);

	cleric1.equip(mace1);
	cleric1.equip(plateMail4);
	cleric2.equip(mace2);
	cleric2.equip(plateMail5);
	cleric3.equip(mace3);
    cleric3.equip(plateMail6);
    
    return [fighter1, fighter2, fighter3, cleric1, cleric2, cleric3];
}

function runCombat(party, monsters)
{
    var monsterName = monsters[0].name;

    console.log("you encounter " + monsters.length + " " + monsterName + "s");
	for(let i = 0; monsters.length > i; i++)
	{
		console.log(monsters[i].name + " " + i + " has " + monsters[i].currentHitPoints + " hit points");
    }
    
    console.log("----------------------------------");

    for(let i = 0; party.length > i; i++)
	{
		console.log(party[i].name + " has " + party[i].currentHitPoints + " hit points");
    }

    console.log("----------------------------------");

	while(party.length > 0 && monsters.length > 0)
	{
		for(let i=0; party.length > i; i++)
		{
			if(party[i].isParalysised)
			{
				console.log(party[i].name + " is paralysised for " + party[i].paralysisedDuration + " more turns");
				party[i].paralysisedDuration--;
			}
            else
            {
                var monsterIndex = getRandomMonster(monsters) - 1;
                console.log(party[i].name + " attacks " + monsterName + " " + monsterIndex);
                party[i].attack(monsters[monsterIndex]);
                console.log(monsterName + " " + monsterIndex + "'s hit points are " + monsters[monsterIndex].currentHitPoints);	
            }		
		}

		for(let i=0; monsters.length > i; i++)
		{
			if(monsters[i].isDead)
			{
				monsters.splice(i, 1);
				i = i -1;
			}
		}

		console.log("There are now " + monsters.length + " " + monsterName + " left");

		console.log("----------------------------");

		for(let i=0; monsters.length > i; i++)
		{
			var characterIndex = getRandomCharacter(party) - 1;
			console.log(monsterName + " " + i + " attacks " + party[characterIndex].name);
			monsters[i].attack(party[characterIndex]);
            console.log(party[characterIndex].name + "'s hit points are " + party[characterIndex].currentHitPoints);
			console.log(party[characterIndex].name + " is paralysis " + party[characterIndex].isParalysised);			
		}

		for(let i=0; party.length > i; i++)
		{
			if(party[i].isDead)
			{
				party.splice(i, 1);
				i = i -1;
			}
		}

		console.log("Thare are now " + party.length + " party members left");
        console.log("----------------------------------");
    }
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

    fighter1.name = "Conan the Barbarian";
    fighter2.name = "Conan the Destoryer";
    
    var party1 = [fighter1];
    var party2 = [fighter2];

    runCombat(party1, party2);   
}

function runTestCombatvMonsterBandits()
{
	console.log("----------------------------------");
	console.log("Party vs Bandits");
	
	var monsters = Monster.createMonsters(Bandit, Bandit.getNumberAppearing());
    var party = create3FighterParty();
	console.log(monsters[0].GetTreasureType());
	runCombat(party, monsters);
}

function runTestCombatvMonsterBanditsInLair()
{
	console.log("----------------------------------");
	console.log("Party vs Bandits");
	var inLiar = true;
	var monsters = Monster.createMonsters(Bandit, Bandit.getNumberAppearing(inLiar), inLiar);
	var party = create3FighterParty();
	console.log(monsters[0].GetTreasureType());
	runCombat(party, monsters);
}


function runTestCombatvMonsterCarrionCrawler()
{
	console.log("Party vs Carrion Crawler");

	var monsters = Monster.createMonsters(CarrionCrawler, CarrionCrawler.getNumberAppearing());
	var party = create3FighterAnd3ClericParty();

    runCombat(party, monsters);
}

function runTestCombatvMonsterBear()
{
    console.log("Party vs Grizzly Bear");

	var monsters = Monster.createMonsters(BearCave, BearCave.getNumberAppearing());
    var party = create3FighterAnd3ClericParty();
   
    runCombat(party, monsters);
}