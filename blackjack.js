//Start of code to read entire page
$(function(event){
	//----------------------------------------------------------------------------------------------
	//Variables
	//Declares the intro page
	var $intro = $("#introduction");
	//Declare the game page
	var $game = $("#game");
	//Declare score board page
	//Declare the play button in the start page
	var $play = $("#playButton");
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
	//Declare display for deck size
	var $deckSize = $("#deckSize");
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
	//cashOut button declared
	var $cash = $("#cashOut");
	//Deck variable which stores card objects
	var deck = [];
	//player array to store player and dealer
	var players = [];
	//Player variable to know which who wants to hit or stand
	var playerTurn;
	//Dealer standing checks if dealer has stand
	var dealerStand = false;
	//Result variable to see the result of the round, 0 means no result and 1 means theres result
	var result = 0;
	//Pot variable to contain the amount betted
	var pot = 0;
	//Varible to check the amount of cards played
	var cardsPlayed = 0;
	//Declare player side display
	var $playerSide = $("#playerSide");
	//Declare dealer side display
	var $dealerSide = $("#dealerSide");
	//Declare firstCard variable to display first dealer card 
	var firstCard = 0;
	//----------------------------------------------------------------------------------------------
	//Start function
	function start(){
		//Sets up everything for the game
		setUpGame();
		//Implementing the buttons
		buttonsImplement();
	}
	//----------------------------------------------------------------------------------------------
	//Function to set up game
	function setUpGame(){
		//Create deck at start of game
		createDeck();
		//Create player and dealer at start of game
		createPlayers();
		//Display player's funds at the start of the game
		playerFunds();
		//Disable some of the non needed buttons at the start
		startButtons();
		//Resets game outcome
		resetOutcome();
		//Displays deck size at the start
		displayDeck();
	}
	//----------------------------------------------------------------------------------------------
	//Start buttons that are disabled
	function startButtons(){
		enableButton($bet);
		disableButton($deal);
		disableButton($hit);
		disableButton($stand);
	}
	//----------------------------------------------------------------------------------------------
	//Buttons activated and disabled after betting
	function betButtons(){
		disableButton($bet);
		enableButton($deal);
	}
	//----------------------------------------------------------------------------------------------
	//Buttons activated and disabled after dealing
	function dealButtons(){
		disableButton($deal);
		enableButton($hit);
		enableButton($stand);
	}
	//----------------------------------------------------------------------------------------------
	//Buttons disable hit and stand buttons during comparison
	function endButtons(){
		disableButton($hit);
		disableButton($stand);
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
		// Implement listner for cash out button
		$cash.on("click",cashOut);
		//Play button implementation
		$play.on("click",gameStart);
	}
	//----------------------------------------------------------------------------------------------
	//Function to hide front page and bring game elements up
	function gameStart(){
		$intro.hide();
		$game.show();
	}
	//----------------------------------------------------------------------------------------------
	//Function to check card display for which player
	function playerDisplayCard(playerSuit,playerNum){
		//If player then display card
		console.log(playerTurn);
		if(playerTurn.id == "player"){
			createPlayerCard(playerSuit,playerNum,$playerSide);
		}else{
			createPlayerCard(playerSuit,playerNum,$dealerSide);
		}

	}
	//----------------------------------------------------------------------------------------------
	//Function to create a card for display
	function createPlayerCard(suit,number,side){
		console.log("create card");
		var displaySuit = determineSuit(suit);
		var displayNum =  determineNum(number);
		var color = determineColor(suit);
		//Creating the elements to be used as the card
		var $container = $("<div></div>");
		$container.addClass("outline");
		var  $top = $("<div><span>"+displayNum+"</span><span>"+displaySuit+"</span></div>");
		$top.addClass("top");
		var $middle = $("<h1></h1>");
		$middle.addClass("middle");
		var $bottom = $("<div><span>"+displaySuit+"</span><span>"+displayNum+"</span></div>");
		$bottom.addClass("bottom");
		//Append all card elements inside the card then appending the card to html
		$container.append($top,$middle,$bottom);
		$container.addClass(color);

		side.append($container);
		//Makes the class flipped by using adding the back class
		if((firstCard>0)&&playerTurn.id == "dealer"){
			$container.addClass("back");
		}
	}
	//----------------------------------------------------------------------------------------------
	//Function to remove cards off the table after each round
	function removeCards(){
		//Removes all cards off player side
		$playerSide.empty();
		//Removes all cards off dealer side
		$dealerSide.empty();
	}
	//----------------------------------------------------------------------------------------------
	//Function to determine color of card
	function determineColor(colorSuit){
		console.log("Color card");
		var colorReturned;
		if((colorSuit=="Diamonds")||(colorSuit=="Hearts")){
			return "red"
		}else{
			return "black"
		}
	}
	//----------------------------------------------------------------------------------------------
	//Function to determine suit to be displayed
	function determineSuit(suit){
		var suitDisplayed;
		switch(suit){
			case "Diamonds":
				suitDisplayed = "&diams;";
			break;
			case "Clubs":
				suitDisplayed = "&clubs;";
			break;
			case "Hearts":
				suitDisplayed = "&hearts;";
			break;
			default:
				suitDisplayed = "&spades;";
		}
		return suitDisplayed
	}
	//----------------------------------------------------------------------------------------------
	//Function to determine number to be displayed
	function determineNum(cardNumber){
		var numberDisplayed;
		switch(cardNumber.toString()){
			case "1":
				numberDisplayed = "A";
			break;
			case "11":
				numberDisplayed = "J";
			break;
			case "12":
				numberDisplayed = "Q";
			break;
			case "13":
				numberDisplayed = "K";
			break;
			default:
				numberDisplayed= cardNumber.toString();
		}
		return numberDisplayed;
	}
	//----------------------------------------------------------------------------------------------
	//Function hiding game nad leaderboards
	function introPage(){
		$game.hide();
	}
	//----------------------------------------------------------------------------------------------
	//Function to display deck size to user
	function displayDeck(){
		console.log("In display");
		$deckSize.html("Cards in deck: " + (52-cardsPlayed));
	}
	//----------------------------------------------------------------------------------------------
	//Function for cashing out
	function cashOut(){
		gameReset();
	}
	//----------------------------------------------------------------------------------------------
	//Function of bet
	function bet(){
		//grab value user inputed into text box
		var playerBet = parseInt($amount.val());
		//Checks if input is a number or larger than player funds
		if((playerBet>players[0].amount)||isNaN(playerBet)||(playerBet <= 0)){
			//If so tell player to enter an appropirate amount
			$potDisplay.html("Invalid input!");
		}else{
			players[0].amount -= playerBet;
			inputPot(playerBet);	
			betButtons();
		}
		playerTurn = players[0];
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
			//Display dealt cards
			//Push 2 cards to player's and dealer's hand
			if(i < 2){
				//pushing to player
				players[0].hand.push(cards[i]);
				console.log("Player hand " + cards[i].number);
				if(i == 1){
					playerTurn = players[1];
				}
			}else{
				//Pushing to dealer
				firstCard++;
				players[1].hand.push(cards[i]);
			}
		}
		total();
	}
	//----------------------------------------------------------------------------------------------
	//Function of hit 
	function hit(){
		//player draws new card and then deler makes decision
		playerTurn = players[0];
		hitCard();
		dealerDecision();
	}
	//----------------------------------------------------------------------------------------------
	//Function for stand
	function stand(){
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
		playerTurn.hand.push(newCard);
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
				var addValue = 0;
				//Checks value of cards so K,Q,J cards are valued at 10
				if(players[0].hand[i].number < 10){
					addValue = players[0].hand[i].number;
				}else{
					addValue = 10;
				}

				playerTotal += addValue;
				players[0].total = playerTotal;
			}else{
			//Else update the dealer's total by subtracting the player length from i to get the index 0 start
				var addValue = 0;
				//Checks value of cards so K,Q,J cards are valued at 10
				if(players[1].hand[i-players[0].hand.length].number < 10){
					addValue = players[1].hand[i-players[0].hand.length].number;
				}else{
					addValue = 10;
				}
				dealerTotal += addValue;
				players[1].total = dealerTotal;
			}
		}
		displayPlayer();
		//Check if player is able to continue checking both the total of player and dealer
		if(playerContinue()){
			console.log("Player current total " + players[0].total);
			dealButtons();
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
		endButtons();
		if(players[0].total < 22){
			//If player is not bust then do comparison for win tie or lose
			if(((players[0].total == 21) && (players[1].total != 21))||(players[1].total > 21)||((21 - players[0].total)<(21-players[1].total))){
				outcome(" Player wins!");
				players[0].amount += pot;
			}else if(players[0].total==players[1].total){
				outcome(" Its a tie!");
				players[0].amount += (pot/2);
			}else{
				outcome(" Dealer wins!");
			}
		}else{
			//If player is over 21 then dealer wins by default
			outcome(" Dealer wins!");
		}
		result++;
		playerFunds();
		//Resetting player hand and total for next round, funds is not resetted to keep the same
		console.log("Round over resetting");
		for(var i = 0; i<players.length; i++){
			players[i].total = 0;
			players[i].hand = [];
		}
		pot = 0;
		firstCard = 0;
	}
	//----------------------------------------------------------------------------------------------
	//Function to check the state of the deck as well as play amount
	function gameContinue(){
		if((cardsPlayed > 43)||(players[0].amount == 0)){
			return false
		}else{
			return true
		}
	}
	//----------------------------------------------------------------------------------------------
	//Function to reset gamme
	function gameReset(){
		//Empty the major variables
		deck = [];
		players =[];
		cardsPlayed = 0;
		//sets up game again
		setUpGame();
		console.log(players[0],players[1]);
	}
	//----------------------------------------------------------------------------------------------
	//Function to see if player and dealer can continue to play for that round
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
		cardsPlayed++;
		//Display card drawed on html
		playerDisplayCard(deck[randomNum].suit,deck[randomNum].number);
		//Updates and displays deck size for every draw
		displayDeck();
		return deck[randomNum];
	}
	//----------------------------------------------------------------------------------------------
	//Function for dealer to decide if to draw card
	function dealerDecision(){
		//If dealer hand is smaller than 14 then draw a card else stand
		if(result == 0){
			console.log("Dealer's turn");
			if((players[1].total < 15)&&(players[0].total < 21)){
				playerTurn = players[1];
				console.log("Dealer hits!");
				dealerStand = false;
				hitCard();
			}else{
				console.log("Dealer stands!");
				dealerStand = true;
			}
		}
	}
	//----------------------------------------------------------------------------------------------
	//Function to grey out and disable buttons
	function disableButton(button){
		button.prop('disabled',true).addClass('disabled');
	}
	//----------------------------------------------------------------------------------------------
	//Function to restore button functions
	function enableButton(button){
		button.prop('disabled',false).removeClass('disabled');
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
		//Display dealers card at the end of round
		displaydealerCards();
		//Resets html display in 5 seconds 
		window.setTimeout(resetOutcome, 5000);	
	}
	//----------------------------------------------------------------------------------------------
	//Function to display dealer faced down cards
	function displaydealerCards(){
		var $dealerCards = $(".back");
		console.log("Displaying cards",$dealerCards);
		$dealerCards.removeClass("back");
	}
	//----------------------------------------------------------------------------------------------
	//Function to reset display outcome of the round
	function resetOutcome(){
		$pDisplay.html("Player hand total: 0");
		$result.html(" ");
		$betDisplay.html("Player bets: 0");
		$potDisplay.html("Pot total: 0");
		//Resetting the table display so no cards remain
		removeCards();
		//Resetting buttons along with display
		startButtons();
	}
	//----------------------------------------------------------------------------------------------
	//Create player function
	function createPlayers(){
		var cards1 = [];
		var cards2 = [];
		//Creating 2 new player objects and pushing them into the players array for storage
		players.push(new player(500,cards1,0,"player"));
		players.push(new player(Infinity,cards2,0,"dealer"));
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
	//Player object blueprint
	function player(funds,card,value,identity){
		this.id = identity;
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
	//Player score object to store player name along with their final score
	function playerScore(playerName,playerScore){
		this.playerName = playerName;
		this.playerScore = playerScore;
	}
	//----------------------------------------------------------------------------------------------
	introPage();
	start();
})