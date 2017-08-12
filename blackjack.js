//Start of code to read entire page
//----------------------------------------------------------------------------------------------
//Variables
//Deal button implemented
var $deal = $("#deal");
//Bet button declared

//Hit button declared

//Stand button declared

//Deck variable which stores card objects
var deck = [];
//player array to store player and dealer
var players = [];
//----------------------------------------------------------------------------------------------
//Start function
function start(){
	//Create deck at start of game
	createDeck();
	//Create player and dealer at start of game
	createPlayers();
	//Implementing the buttons
	buttonsImplement();

}
//----------------------------------------------------------------------------------------------
//Button implementation function
function buttonsImplement(){
	//Implement action listener for deal
	$deal.on("click",dealing);
 	//Implement action listener for bet

	//Implement action listener for hit

	//Implement action listener for stand
}
//----------------------------------------------------------------------------------------------
//Function of dealing
function dealing(){
	console.log("dealing!");

}
//----------------------------------------------------------------------------------------------
//Function of bet

//----------------------------------------------------------------------------------------------
//Function of hit

//----------------------------------------------------------------------------------------------
//Function for stand

//----------------------------------------------------------------------------------------------
//Function for drawing cards

//----------------------------------------------------------------------------------------------
//Player object blueprint
function player(funds,card){
	this.amount = funds;
	this.hand = card;

}
//----------------------------------------------------------------------------------------------
//Card object blueprint
function card(num,Suit,play){
	this.number = num;
	this.suit = Suit;
	this.played = play;
}
//----------------------------------------------------------------------------------------------
//Create player function
function createPlayers(){
	var cards = []
	players.push(new player(500,cards));
	players.push(new player(Infinity,cards));
}
//----------------------------------------------------------------------------------------------
//Create cards and store in deck function 
function createDeck(){
	for(var i = 0 ; i < 52; i++){
		if (i < 13){ 
		deck[i] = new card(i+1,"Diamonds",false);
	}else if (i < 26 && i > 12){ 
		deck[i] = new card(i-12,"Clubs",false);
	}else if (i < 39 && i > 25){ 
		deck[i] = new card(i-25,"Hearts",false);
	}else 
		deck[i] = new card(i-38,"Spades",false);
	}
}
//----------------------------------------------------------------------------------------------
start();