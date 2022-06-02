const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')





let apiQuotes = [];
// show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}



// show new quote
function newQuote(){
  //pick a random quote
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
// check if author exists
if(!quote.author){
  authorText.textContent = 'unknown';
} else {
  authorText.textContent = quote.author;
}

// check quote length
if(quote.text.length > 50){
  quoteText.classList.add('long-quote');
} else {
  quoteText.classList.remove('long-quote')
}

// set Quote ,Hide loader
quoteText.textContent = quote.text;
complete();
}
// get quotes from APi
async function getQuotes(){
  loading()
    const apiURL ='https://type.fit/api/quotes';
    try{
      const response = await fetch(apiURL);
      apiQuotes = await response.json();
      newQuote();
    } catch(error){
        // catch error here

    }

}
// Tweet Quote
function tweetQuote(){
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL,'_blank');
}

// event listener

twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote)

// on load
getQuotes()
