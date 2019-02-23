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