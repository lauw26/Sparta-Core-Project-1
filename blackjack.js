//Start of code to read entire page
$(function(event){
	//----------------------------------------------------------------------------------------------
	//Variables
	//Displays outcome of round to html
	var $result = $("#result");
	//Display for player information
	var $pDisplay = $("#playerStats");
	//Declare display for pot
	var $potDisplay = $("#pot");
	//Declare display for the amount player bets
	var $betDisplay = $("#betAmount");
	//Declare display for player fundings
	var $amountDisplay= $("#playerAmount");
	//Deal button implemented
	var $deal = $("#deal");
	//Bet button declared
	var $bet = $("#bet");
	//Amount bos is decleared to obtain user bet
	var $amount = $("#amount");
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
	//Result variable to see the result of the round, 0 means no result and 1 means theres result
	var result = 0;
	//Pot variable to contain the amount betted
	var pot = 0;
	//----------------------------------------------------------------------------------------------
	//Start function
	function start(){
		//Create deck at start of game
		createDeck();
		//Create player and dealer at start of game
		createPlayers();
		//Implementing the buttons
		buttonsImplement();
		//Display player's funds at the start of the game
		playerFunds();

	}
	//----------------------------------------------------------------------------------------------
	//Button implementation function
	function buttonsImplement(){
		//Implement action listener for deal
		$deal.on("click",dealing);
	 	//Implement action listener for bet
	 	$bet.on("click",bet);
	 	//Implement action listener for hit
		$hit.on("click",hit);
		//Implement action listener for stand
		$stand.on("click",stand);
	}
	//----------------------------------------------------------------------------------------------
	//Function of bet
	function bet(){
		//grab value user inputed into text box
		var playerBet = parseInt($amount.val());
		//Checks if input is a number or larger than player funds
		if((playerBet>players[0].amount)||isNaN(playerBet)){
			//If so tell player to enter an appropirate amount
			$potDisplay.html("Invalid input!\nPlease enter an appropirate amount");
		}else{
			players[0].amount -= playerBet;
			inputPot(playerBet);	
		}
	}
	//----------------------------------------------------------------------------------------------
	//Function of pot
	function inputPot(betAmount){
		pot += (betAmount*2);
		$betDisplay.html("Player bets: " + betAmount);
		$potDisplay.html("Pot total: " + pot);
		playerFunds();
	}
	//----------------------------------------------------------------------------------------------
	//Function for displaying player funds
	function playerFunds(betAmount){
		$amountDisplay.html("Player amount: " + players[0].amount);
	}
	//----------------------------------------------------------------------------------------------
	//Function of dealing
	function dealing(){
		var cards = [];
		//Result resets result upon first dealing move
		result = 0;
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
		comparison();
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
		displayPlayer();
		//Check if player is able to continue checking both the total of player and dealer
		if(playerContinue()){
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
				outcome(" Player wins!");
			}else if(players[0].total==players[1].total){
				outcome(" Its a tie!");
			}else{
				outcome(" Dealer wins!");
			}
		}else{
			//If player is over 21 then dealer wins by default
			outcome(" Dealer wins!");
		}
		result++;

		console.log("Player",players[0],players[0].total);
		console.log("Dealer",players[1],players[1].total);
		//Resetting player hand and total for next round, funds is not resetted to keep the same
		console.log("Round over resetting");
		for(var i = 0; i<players.length; i++){
			players[i].total = 0;
			players[i].hand = [];
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
		if(result == 0){
			console.log("Dealer's turn");
			if((players[1].total < 15)&&(players[0].total < 21)){
				player = players[1];
				console.log("Dealer hits!");
				dealerStand = false;
				hitCard();
			}else{
				console.log("Dealer stands!");
				dealerStand = true;
			}
		}else{

		}
	}
	//----------------------------------------------------------------------------------------------
	//Function of display player information
	function displayPlayer(){
		$pDisplay.html("Player hand total: " + players[0].total);
	}
	//----------------------------------------------------------------------------------------------
	//Function to display outcome of round
	function outcome(resulting){
		$result.html("Dealer hand total: " + players[1].total + resulting);
		window.setTimeout(resetOutcome, 3000);	
	}
	//----------------------------------------------------------------------------------------------
	//Function to reset display outcome of the round
	function resetOutcome(){
		$pDisplay.html("Player hand total: " + 0);
		$result.html(" ");
		$betDisplay.html("Player bets: 0");
		$potDisplay.html("Pot total: 0");
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
})