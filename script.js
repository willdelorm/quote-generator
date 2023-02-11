const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpin() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpin() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpin();
  //Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check quote length to determine style
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  hideLoadingSpin();
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpin();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();