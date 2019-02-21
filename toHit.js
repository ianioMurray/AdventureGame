"use strict"

var requiredToHit = (function()
{
    var characterLevel1to3ScoresToHit = [ 	
        {armourClass: 9, toHit: 10},
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
        {armourClass: -3, toHit: 20} 
    ];

    var characterLevel4AndAboveScoresToHit = [ 	
        {armourClass: 9, toHit: 8},
        {armourClass: 8, toHit: 9},
        {armourClass: 7, toHit: 10},
        {armourClass: 6, toHit: 11},
        {armourClass: 5, toHit: 12},
        {armourClass: 4, toHit: 13},
        {armourClass: 3, toHit: 14},
        {armourClass: 2, toHit: 15},
        {armourClass: 1, toHit: 16},
        {armourClass: 0, toHit: 17},
        {armourClass: -1, toHit: 18},
        {armourClass: -2, toHit: 19},
        {armourClass: -3, toHit: 20} 
    ];
    


    var monsterHitDice1ScoresToHit = [
        {armourClass: 9, toHit: 10},
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
        {armourClass: -3, toHit: 20}
    ];

    var monsterHitDice1PlusTo2ScoresToHit = [ 	
        {armourClass: 9, toHit: 9},
        {armourClass: 8, toHit: 10},
        {armourClass: 7, toHit: 11},
        {armourClass: 6, toHit: 12},
        {armourClass: 5, toHit: 13},
        {armourClass: 4, toHit: 14},
        {armourClass: 3, toHit: 15},
        {armourClass: 2, toHit: 16},
        {armourClass: 1, toHit: 17},
        {armourClass: 0, toHit: 18},
        {armourClass: -1, toHit: 19},
        {armourClass: -2, toHit: 20},
        {armourClass: -3, toHit: 20} 
    ];

    var monsterHitDice2PlusTo3ScoresToHit = [ 	
        {armourClass: 9, toHit: 8},
        {armourClass: 8, toHit: 9},
        {armourClass: 7, toHit: 10},
        {armourClass: 6, toHit: 11},
        {armourClass: 5, toHit: 12},
        {armourClass: 4, toHit: 13},
        {armourClass: 3, toHit: 14},
        {armourClass: 2, toHit: 15},
        {armourClass: 1, toHit: 16},
        {armourClass: 0, toHit: 17},
        {armourClass: -1, toHit: 18},
        {armourClass: -2, toHit: 19},
        {armourClass: -3, toHit: 20} 
    ];

    var monsterHitDice3PlusTo4ScoresToHit = [ 	
        {armourClass: 9, toHit: 7},
        {armourClass: 8, toHit: 8},
        {armourClass: 7, toHit: 9},
        {armourClass: 6, toHit: 10},
        {armourClass: 5, toHit: 11},
        {armourClass: 4, toHit: 12},
        {armourClass: 3, toHit: 13},
        {armourClass: 2, toHit: 14},
        {armourClass: 1, toHit: 15},
        {armourClass: 0, toHit: 16},
        {armourClass: -1, toHit: 17},
        {armourClass: -2, toHit: 18},
        {armourClass: -3, toHit: 19} 
    ];

    var monsterHitDice4PlusTo5ScoresToHit = [ 	
        {armourClass: 9, toHit: 6},
        {armourClass: 8, toHit: 7},
        {armourClass: 7, toHit: 8},
        {armourClass: 6, toHit: 9},
        {armourClass: 5, toHit: 10},
        {armourClass: 4, toHit: 11},
        {armourClass: 3, toHit: 12},
        {armourClass: 2, toHit: 13},
        {armourClass: 1, toHit: 14},
        {armourClass: 0, toHit: 15},
        {armourClass: -1, toHit: 16},
        {armourClass: -2, toHit: 17},
        {armourClass: -3, toHit: 18} 
    ];

    var monsterHitDice5PlusTo6ScoresToHit = [ 	
        {armourClass: 9, toHit: 5},
        {armourClass: 8, toHit: 6},
        {armourClass: 7, toHit: 7},
        {armourClass: 6, toHit: 8},
        {armourClass: 5, toHit: 9},
        {armourClass: 4, toHit: 10},
        {armourClass: 3, toHit: 11},
        {armourClass: 2, toHit: 12},
        {armourClass: 1, toHit: 13},
        {armourClass: 0, toHit: 14},
        {armourClass: -1, toHit: 15},
        {armourClass: -2, toHit: 16},
        {armourClass: -3, toHit: 17} 
    ];

    var monsterHitDice6PlusTo7ScoresToHit = [ 	
        {armourClass: 9, toHit: 4},
        {armourClass: 8, toHit: 5},
        {armourClass: 7, toHit: 6},
        {armourClass: 6, toHit: 7},
        {armourClass: 5, toHit: 8},
        {armourClass: 4, toHit: 9},
        {armourClass: 3, toHit: 10},
        {armourClass: 2, toHit: 11},
        {armourClass: 1, toHit: 12},
        {armourClass: 0, toHit: 13},
        {armourClass: -1, toHit: 14},
        {armourClass: -2, toHit: 15},
        {armourClass: -3, toHit: 16} 
    ];

    var monsterHitDice7PlusTo9ScoresToHit = [ 	
        {armourClass: 9, toHit: 3},
        {armourClass: 8, toHit: 4},
        {armourClass: 7, toHit: 5},
        {armourClass: 6, toHit: 6},
        {armourClass: 5, toHit: 7},
        {armourClass: 4, toHit: 8},
        {armourClass: 3, toHit: 9},
        {armourClass: 2, toHit: 10},
        {armourClass: 1, toHit: 11},
        {armourClass: 0, toHit: 12},
        {armourClass: -1, toHit: 13},
        {armourClass: -2, toHit: 14},
        {armourClass: -3, toHit: 15} 
    ];

    var monsterHitDice9PlusTo11ScoresToHit = [ 	
        {armourClass: 9, toHit: 2},
        {armourClass: 8, toHit: 3},
        {armourClass: 7, toHit: 4},
        {armourClass: 6, toHit: 5},
        {armourClass: 5, toHit: 6},
        {armourClass: 4, toHit: 7},
        {armourClass: 3, toHit: 8},
        {armourClass: 2, toHit: 9},
        {armourClass: 1, toHit: 10},
        {armourClass: 0, toHit: 11},
        {armourClass: -1, toHit: 12},
        {armourClass: -2, toHit: 13},
        {armourClass: -3, toHit: 14} 
    ];

    var monsterHitDice11PlusTo13ScoresToHit = [ 	
        {armourClass: 9, toHit: 2},
        {armourClass: 8, toHit: 2},
        {armourClass: 7, toHit: 3},
        {armourClass: 6, toHit: 4},
        {armourClass: 5, toHit: 5},
        {armourClass: 4, toHit: 6},
        {armourClass: 3, toHit: 7},
        {armourClass: 2, toHit: 8},
        {armourClass: 1, toHit: 9},
        {armourClass: 0, toHit: 10},
        {armourClass: -1, toHit: 11},
        {armourClass: -2, toHit: 12},
        {armourClass: -3, toHit: 13} 
    ];

    var monsterHitDice13PlusTo15ScoresToHit = [ 	
        {armourClass: 9, toHit: 2},
        {armourClass: 8, toHit: 2},
        {armourClass: 7, toHit: 2},
        {armourClass: 6, toHit: 3},
        {armourClass: 5, toHit: 4},
        {armourClass: 4, toHit: 5},
        {armourClass: 3, toHit: 6},
        {armourClass: 2, toHit: 7},
        {armourClass: 1, toHit: 8},
        {armourClass: 0, toHit: 9},
        {ar2mourClass: -1, toHit: 10},
        {armourClass: -2, toHit: 11},
        {armourClass: -3, toHit: 12} 
    ];

    var monsterHitDice15PlusTo17ScoresToHit = [ 	
        {armourClass: 9, toHit: 2},
        {armourClass: 8, toHit: 2},
        {armourClass: 7, toHit: 2},
        {armourClass: 6, toHit: 2},
        {armourClass: 5, toHit: 3},
        {armourClass: 4, toHit: 4},
        {armourClass: 3, toHit: 5},
        {armourClass: 2, toHit: 6},
        {armourClass: 1, toHit: 7},
        {armourClass: 0, toHit: 8},
        {armourClass: -1, toHit: 9},
        {armourClass: -2, toHit: 10},
        {armourClass: -3, toHit: 11} 
    ];

    //above 17 
    var getToHit = function(attacker, opponent)
    {    
        var toHitCollection;
        
        if(attacker instanceof Monster)
        {
            toHitCollection = getMonsterToHitCollection(attacker);
    
        }
        else if (attacker instanceof Character)
        {
            toHitCollection = getCharacterToHitCollection(attacker);
        }
        else 
        {
            throw("unknown attacker type");
        }

        for(var i = 0; toHitCollection.length > i; i++)
        {
            if(toHitCollection[i].armourClass === opponent.armourClass)
            {
                return toHitCollection[i].toHit;
            }	
        }

        return 20;
    };

    var getMonsterToHitCollection = function(attacker)
    {
        var toHitScores;

        switch(attacker.hitDice)
        {
            case "1":
                toHitScores = monsterHitDice1ScoresToHit;
                break;
            case "1+":
            case "2":
                toHitScores = monsterHitDice1PlusTo2ScoresToHit;
                break;
            case "2+":
            case "3":
                toHitScores = monsterHitDice2PlusTo3ScoresToHit;
                break;
            case "3+":
            case "4":
                toHitScores = monsterHitDice3PlusTo4ScoresToHit;
                break;
            case "4+":
            case "5":
                toHitScores = monsterHitDice4PlusTo5ScoresToHit;
                break;
            case "5+":
            case "6":
                toHitScores = monsterHitDice5PlusTo6ScoresToHit;
                break;      
            case "6+":
            case "7":
                toHitScores = monsterHitDice6PlusTo7ScoresToHit;
                break;     
            case "7+":
            case "8":
            case "8+":
            case "9":
                toHitScores = monsterHitDice7PlusTo9ScoresToHit;
                break;    
            case "9+":
            case "10":
            case "10+":
            case "11":
                toHitScores = monsterHitDice9PlusTo11ScoresToHit;
                break;   
            case "11+":
            case "12":
            case "12+":
            case "13":
                toHitScores = monsterHitDice11PlusTo13ScoresToHit;
                break;   
            case "13+":
            case "14":
            case "14+":
            case "15":
                toHitScores = monsterHitDice13PlusTo15ScoresToHit;
                break;     
            case "15+":
            case "16":
            case "16+":
            case "17":
                toHitScores = monsterHitDice15PlusTo17ScoresToHit;
                break;     
            default:
                throw("unknown hit dice");
        }

        return toHitScores;
    };

    var getCharacterToHitCollection = function(attacker)
    {
        if(attacker.currentLevel >=1 && attacker.currentLevel <=3)
        {
            return characterLevel1to3ScoresToHit;   
        }
        else if (attacker.currentLevel > 3)
        {
            return characterLevel4AndAboveScoresToHit;
        }
        else
        {
            throw("character level is unknown");
        }
    };

    return  {
        getToHit: getToHit
    }
})();