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
	var cards = [];
	//Use for loop to draw cards and store them into dealer and user hands
	for(var i = 0; i < 4 ; i++){
		cards.push(cardDraw());
		//Push 2 cards to player's and dealer's hand
		if(i < 2){
			//pushing to player
			players[0].hand.push(cards[i]);
		}else{
			//Pushing to dealer
			players[1].hand.push(cards[i]);
		}
	}
	total();
	console.log(players[0],players[1]);
}
//----------------------------------------------------------------------------------------------
//Function of bet

//----------------------------------------------------------------------------------------------
//Function of hit

//----------------------------------------------------------------------------------------------
//Function for stand

//----------------------------------------------------------------------------------------------
//Function to check current total of hand
function total(){
	var playerTotal = 0;
	var dealerTotal = 0;
	//For loop below combines 2 for loops to total both player and dealer hand at the same time and update their total value.
	//Adds the length of both the dealer and player hand array to find how many loops
	for(var i = 0; i<(players[0].hand.length+players[1].hand.length); i++){
		//First statment updates and stores the player total
		if(i<players[0].hand.length){
			playerTotal += players[0].hand[i].number;
			console.log("Player card number " + players[0].hand[i].number);
			players[0].total = playerTotal;
		}else{
		//Else update the dealer's total by subtracting the player length from i to get the index 0 start
			dealerTotal += players[1].hand[i-players[0].hand.length].number;
			console.log("Dealer card number " + players[1].hand[i-players[0].hand.length].number);
			players[1].total = dealerTotal;
		}
	}
}
//----------------------------------------------------------------------------------------------
//Function for drawing cards
function cardDraw(){
	//Random number between 0-51
	var randomNum = Math.floor(Math.random() * 52) 
	//Random number used on array to grab random card
	//Check if card selected is current in play or already been dealt using a while loop
	while(deck[randomNum].dealt){
		//While the card dealt is true select another random number and try again
		randomNum = Math.floor(Math.random() * 52);
	}
	//When a card is found that has not been dealt set the dealt to true and return card
	deck[randomNum].dealt = true;
	return deck[randomNum];
}
//----------------------------------------------------------------------------------------------
//Player object blueprint
function player(funds,card,value,play){
	this.amount = funds;
	this.hand = card;
	this.total = value;
	this.state = play;
}
//----------------------------------------------------------------------------------------------
//Card object blueprint
function card(num,Suit,play){
	this.number = num;
	this.suit = Suit;
	this.dealt = play;
}
//----------------------------------------------------------------------------------------------
//Create player function
function createPlayers(){
	var cards1 = [];
	var cards2 = [];
	//Creating 2 new player objects and pushing them into the players array for storage
	players.push(new player(500,cards1,0,"under21"));
	players.push(new player(Infinity,cards2,0,"under21"));
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