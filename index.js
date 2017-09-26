var fs = require('fs')
var bitcoin = require('bitcoinjs-lib')

var words = fs.readFileSync('words.txt', 'utf8').split('\n')

function generateAddress() {
	var keyPair = bitcoin.ECPair.makeRandom()
	return {
		public: keyPair.getAddress(),
		private: keyPair.toWIF()
	}
}

for(var i=0; i<10000; i++) {
	var current = generateAddress()
	var lower = current.public.toLowerCase().substr(1)
	var matchedWords = words.filter(function(word) {
	 	return lower.startsWith(word)
	})
	if(matchedWords[0]) {
		console.log(current.public + ' - ' + current.private)
	}
}
