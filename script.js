// ------- Quotes data -------

const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "You don’t have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    text: "Slow progress is still progress.",
    author: "Unknown",
  },
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln (probably)",
  },
  {
    text: "Done is better than perfect.",
    author: "Sheryl Sandberg",
  },
];

let currentQuoteIndex = -1;

// ------- DOM elements -------

const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");

const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

// ------- Quotes logic -------

function getRandomQuoteIndex() {
  if (quotes.length === 1) return 0;
  let index = Math.floor(Math.random() * quotes.length);
  // avoid repeating the same quote
  while (index === currentQuoteIndex) {
    index = Math.floor(Math.random() * quotes.length);
  }
  return index;
}

function showRandomQuote() {
  const index = getRandomQuoteIndex();
  currentQuoteIndex = index;
  const quote = quotes[index];
  quoteTextEl.textContent = `“${quote.text}”`;
  quoteAuthorEl.textContent = quote.author ? `— ${quote.author}` : "";
}

// ------- Notes logic -------

const STORAGE_KEY = "daily-quotes-notes";

let notes = [];

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      notes = parsed;
    }
  } catch (err) {
    console.error("Could not parse notes from localStorage", err);
  }
}

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.className = "note-item";

    const textSpan = document.createElement("span");
    textSpan.className = "note-text";
    textSpan.textContent = note;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "note-delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteNote(index);
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

function addNote(text) {
  notes.push(text);
  saveNotes();
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

// ------- Event listeners -------

newQuoteBtn.addEventListener("click", () => {
  showRandomQuote();
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = noteInput.value.trim();
  if (!value) return;
  addNote(value);
  noteInput.value = "";
});

// ------- Init -------

loadNotes();
renderNotes();
// show an initial quote so the app doesn't look empty
showRandomQuote();
