var words = ['Awesome!', 'prettY', 'trap  ', 'there are two space symbols after \'trap\' word, good luck!',
	'relax','u?','wherearemyspaces?',
	'Trap  again.  There  are  two  spaces  between  all  the  words  instead  the  last one',
	'EvErything will bE bEtter','bang','um','Hell yeaH!',
	'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn\'t so bad after all',
	'The river stole the gods.',
	'Sorry John, you must  loose. It was great  pleasure to play with you :((  .',
	'She always speaks to him in a loud voice',
	'We need to rent a room for our party.',
	'The memory we used to share is no longer coherent',
	'Don\'t step on the broken glass.',
	'She folded her handkerchief neatly',
	'I\'d rather be a bird than a fish.',
	'The shooter says goodbye to his love',
	'I will never be this young again. Ever. Oh damn... I just got older.',
	'Malls are great places to shop; I can find everything I need under one roof',
	'Lets all be unique together until we realise we are all the same.',
	'She only paints with bold colors; she does not like pastels',
	'She was too short to see over the fence.',
	'Wednesday is hump day, but has anyone asked the camel if he\'s happy about it?',
	'She works two jobs to make ends meet; at least, that was her reason for not having time to join us',
	'We have a lot of rain in June.',
	'She advised him to come back at once',
	'The sky is clear; the stars are twinkling.',
	'He didn\'t want to go to the dentist, yet he went anyway',
	'The mysterious diary records the voice.',
	'Someone I know recently combined Maple Syrup & buttered Popcorn thinking it would taste like caramel popcorn. It didn\'t and they don\'t recommend anyone else do it either.',
	'Please wait outside of the house',
	'Hurry!',
	'The clock within this blog and the clock on my laptop are 1 hour different from each other.',
	'The book is in front of the table',
	'A song can make or ruin a person\'s day if they let it get to them.'];

/* Configuration */
var startIndex = 0;
var startTime;
var timePerLetter = 0.5;
var timeForLookup = 1;
var penaltyTime = 2;


var TEXT_BOX = $('#idTextBox');
var INPUT_TEXT = $('#idInput');
var BTN_SUBMIT = $('#idBtnSubmit');
var TIMER_TEXT = $('#idTimerText');
var PENALTY_TEXT = $('#idPenaltySec');

$(function(){
	TEXT_BOX.attr('unselectable','on')
     .css({'-moz-user-select':'-moz-none',
           '-moz-user-select':'none',
           '-o-user-select':'none',
           '-khtml-user-select':'none', 
           '-webkit-user-select':'none',
           '-ms-user-select':'none',
           'user-select':'none'
     }).bind('selectstart', function(){ return false; });
    INPUT_TEXT.focus();
	words = shuffle(words);

	generateWord();
	startTime = calculateStartTime();
	BTN_SUBMIT.click(function () {
		onSubmit();
    });

    $(INPUT_TEXT).keyup(function(e){
        if(e.keyCode == 13)
        {
            onSubmit();
        }
    });

    var myInterval = setInterval(function () {


		if (startTime<0){
			alert('GAME OVER!');
			clearInterval(myInterval);
            window.location.replace("../../index.html");
		}

        TIMER_TEXT.text(startTime);
        TIMER_TEXT.css('color','');
		if (parseInt(TIMER_TEXT.text(), 10)<6) {
			TIMER_TEXT.css('color','#E74249');
		}
        startTime--;

    }, 1000);
});

function onSubmit() {
	if(TEXT_BOX.text()===INPUT_TEXT.val()){
		generateWord();
		startTime = calculateStartTime();
		INPUT_TEXT.val('');
	}else{
		$('.input-c').effect( "shake" );
		PENALTY_TEXT.show();
		PENALTY_TEXT.toggle("puff");
		startTime-=penaltyTime;
	}
}

function generateWord() {

	if (startIndex>=words.length){
		words = shuffle(words);
		startIndex = 0;
	}
    TEXT_BOX.text(words[startIndex]);
    startIndex++;
}

function shuffle (array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array;
}

function calculateStartTime() {
	var a = TEXT_BOX.text().length*timePerLetter+timeForLookup;
	var b = Math.round(a);

	if (b>30) {
		//it's too easy to type text if timer greater than 30 (nearly 60 letters). So let's do some evil :)
		b-=10;
	}
	return b;
}