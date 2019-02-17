
"use strict"

const _MaxNumberOfInventoryItems = 50;

function Inventory()
{
    this.itemsInInvetory = [];

    this.addItemToInventory = function(item)
	{
		if(!this.isInventoryFull(item))
		{
			this.itemsInInvetory.push(item);
		}
		else if(item.isCombinableInInventory)
		{
			this.attemptToCombineItemWithInventoryItems(item);
		}
	};
   
    this.removeItemFromInventory = function(item)
	{
		var index = this.indexOfItemInInventroy(item.id);
		if(index === -1)
		{
			return;
		}
		else
		{
			this.itemsInInvetory.splice(index, 1);
		}
	};
   
    this.indexOfItemInInventroy = function(itemId)
	{
		for(var i = 0; this.itemsInInvetory.length > i; i++)
		{
			if(this.itemsInInvetory[i].id === itemId)
			{
				return i;
			}
		}
		return -1;
	};
   
    this.isInventoryFull = function()
	{
		if(this.itemsInInvetory.length === _MaxNumberOfInventoryItems)
		{
			console.log("character's inventory is full"); 
			return true;
		}
		return false;
    };

	this.attemptToCombineItemWithInventoryItems = function(item)
	{
		for(var i = 0; this.itemsInInvetory.length > i; i++)
		{
			if(this.itemsInInvetory[i].id === item.id)
			{
				//item in inventory is not at its max
				if(this.itemsInInvetory[i].remainingNumberOfUses < this.itemsInInvetory[i].maxNumberOfUses)
				{
					var noOfUsesToAddToItemInInventroy = 0;

					//get the number of available uses and increase it up to the max (if necessary)
					var noOfUsesBelowMax = this.itemsInInvetory[i].maxNumberOfUses - this.itemsInInvetory[i].remainingNumberOfUses;

					if(noOfUsesBelowMax > item.remainingNumberOfUses)
					{
						noOfUsesToAddToItemInInventroy = item.remainingNumberOfUses;
					}
					else
					{
						noOfUsesToAddToItemInInventroy = noOfUsesBelowMax;
					}

					this.itemsInInvetory[i].remainingNumberOfUses = this.itemsInInvetory[i].remainingNumberOfUses + noOfUsesToAddToItemInInventroy;
					item.remainingNumberOfUses = item.remainingNumberOfUses - noOfUsesToAddToItemInInventroy;
				}
			}

			//no more uses left for the item being addded to the inventory
			if(item.remainingNumberOfUses <= 0)
			{
				break;
			}
		}
    };
    
    this.indexOfAmmo = function(weapon)
	{
		return this.indexOfItemInInventroy(weapon.ammoId);
	};

	this.reduceUsesOfAmmo = function(index)
	{
		this.itemsInInvetory[index].remainingNumberOfUses = this.itemsInInvetory[index].remainingNumberOfUses - 1;

		if(this.itemsInInvetory[index].remainingNumberOfUses === 0)
		{
			this.itemsInInvetory.splice(index, 1);
		} 
	};
}