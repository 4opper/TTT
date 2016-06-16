function Playground(turn, win) {
	var self = this;
	this.appendPlayground = function() {
		document.body.appendChild(self.domElement);
	}
	this.turn = turn;
	this.win = win;
	this.domElement = document.createElement('div');
	this.results = {};
	this.allCells = [];
	this.winningCells = [];
};

function Cell(row, column) {
	var self = this;
	this.domElement = document.createElement('div');
	this.domElement.addEventListener('click', function(){
		self.fillCell();
	});	
	this.column = column;
	this.row = row;
};

// Defines whitch symbol to put in cell
Playground.prototype.toggleTurn = function() {
	var symbol = this.turn ? 'x' : 'o';
	this.turn = !this.turn;
	return symbol;

};

Playground.prototype.addAttribute = function(elem, attribute , value) {
	elem.setAttribute(attribute, value);
};

Playground.prototype.append = function(obj) {
	this.domElement.appendChild(obj.domElement);
	this.allCells.push(obj);
};

Playground.prototype.makeFields = function(){
	for(i = 1; i < 4; i++) {
		for(j = 1; j < 4; j++) {
			var cell = new Cell(i,j);
			playground.append(cell);
		}
	}
};

// Changes background color of winningCells
Playground.prototype.makeWin = function() {
	this.win = true;
	//whoseTurn.domElement.style.visibility = 'hidden';
	for (var i=0;i<playground.winningCells.length; i++) {
		var el = playground.winningCells[i].domElement;
		el.style.background = 'crimson';
	}
};

Playground.prototype.checkWin = function(cellsToCheck) {
	if (playground.check_combination(playground.allCells)) {
		playground.makeWin();
	}
};

Playground.prototype.check_combination =  function(r) {
	return this.check(r[0],r[1],r[2]) || this.check(r[0],r[3],r[6]) || this.check(r[6],r[7],r[8]) || this.check(r[1],r[4],r[7])
	|| this.check(r[2],r[5],r[8]) || this.check(r[0],r[4],r[8]) || this.check(r[2],r[4],r[6]) || this.check(r[3],r[4],r[5])
};

Playground.prototype.check = function(first, second, third) {
	if (first.domElement.innerHTML == second.domElement.innerHTML && first.domElement.innerHTML == third.domElement.innerHTML && (first.domElement.innerHTML == 'o' || first.domElement.innerHTML == 'x')) {
		this.winningCells = [first, second, third];
		return true;
	}
};	

Cell.prototype.addClass = function(value) {
	this.domElement.setAttribute('class', value);
};

Cell.prototype.addId = function(value){
	this.domElement.setAttribute('id', value);
};

Cell.prototype.fillCell = function() {
	var currentCell = event.target;
	if (currentCell.innerHTML == '' && !playground.win) {
		currentCell.innerHTML = playground.toggleTurn();
		playground.checkWin();
	}
};

var playground = new Playground(true, false);
playground.appendPlayground();
playground.makeFields();