//Start of code to read entire page
//----------------------------------------------------------------------------------------------
//Variables
//Deal button implemented
var $deal = $("#deal");
//Bet button declared

//Hit button declared
//Its not what it looks like
var $hit = $("#hit");
//Stand button declared
var $stand = $("#stand");
//Deck variable which stores card objects
var deck = [];
//player array to store player and dealer
var players = [];
//Player variable to know which who wants to hit or stand
var player;
//Dealer standing checks if dealer has stand
var dealerStand;
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
			console.log("Player hand " + cards[i].number);
		}else{
			//Pushing to dealer
			players[1].hand.push(cards[i]);
		}
	}
	total();
}
//----------------------------------------------------------------------------------------------
//Function of bet

//----------------------------------------------------------------------------------------------
//Function of hit 
function hit(){
	//player draws new card and then deler makes decision
	player = players[0];
	hitCard();
	dealerDecision();
}
//----------------------------------------------------------------------------------------------
//Function for stand
function stand(){
	console.log("Player stands");
	//Check if dealer still wants to carry on
	do{
		dealerDecision();
	}while(!dealerStand);
	//Once dealer has finished his go compare the two final scores
	total();
}
//----------------------------------------------------------------------------------------------
//Function to hit card
function hitCard(){
	//Draw a new card from deck
	var newCard = cardDraw();
	//Pushing the new card into the player hand depending who called push.
	//This allow for both dealer and player to use same function
	player.hand.push(newCard);
	//Run total again to update and check for new total
	total();
}
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
			players[0].total = playerTotal;
		}else{
		//Else update the dealer's total by subtracting the player length from i to get the index 0 start
			dealerTotal += players[1].hand[i-players[0].hand.length].number;
			players[1].total = dealerTotal;
		}
	}
	//Check if player is able to continue checking both the total of player and dealer
	if(playerContinue()){
		//Implement action listener for hit
		//Can only hit if player can continue
		$hit.on("click",hit);
		//Implement action listener for stand
		//Can only stand if player can continue
		$stand.on("click",stand);
		console.log("Player current total " + players[0].total);
	}else{
		//compares total of dealer and player.
		comparison();
	}
}
//----------------------------------------------------------------------------------------------
//Function to compare and find winner
function comparison(){
	//Finds the win,tie and lose conditions by comparing dealer and player value.
	//Checks if player is bust or not
	if(players[0].total < 22){
		//If player is not bust then do comparison for win tie or lose
		if(((players[0].total == 21) && (players[1].total != 21))||(players[1].total > 21)||((21 - players[0].total)<(21-players[1].total))){
			console.log("Player wins!");
		}else if(players[0].total==players[1].total){
			console.log("Its a tie!");
		}else{
			console.log("Dealer wins!");
		}
	}else{
		//If player is over 21 then dealer wins by default
		console.log("Dealer wins!");
	}
	console.log("Player",players[0],players[0].total);
	console.log("Dealer",players[1],players[1].total);
}
//----------------------------------------------------------------------------------------------
//Function to see if player and dealer can continue
function playerContinue(){
	if((players[0].total < 21)&&(players[1].total < 21) ){
		return true
	}else{
		return false
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
//Function for dealer to decide if to draw card
function dealerDecision(){
	//If dealer hand is smaller than 14 then draw a card else stand
	console.log("Dealer's turn");
	if((players[1].total < 14)&&(players[0].total < 21)){
		player = players[1];
		console.log("Dealer hits!");
		hitCard();
		dealerStand = false;
	}else{
		console.log("Dealer stands!");
		dealerStand = true;
	}
}
//----------------------------------------------------------------------------------------------
//Player object blueprint
function player(funds,card,value){
	this.amount = funds;
	this.hand = card;
	this.total = value;
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
	players.push(new player(500,cards1,0,false));
	players.push(new player(Infinity,cards2,0,false));
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