// Global library array to store all books
let library = [
    {
        title: "Sahih Al-Bukhari",
        author: "Imam Muhammad al-Bukhari",
        isRead: true
    },
    {
        title: "Sahih Muslim",
        author: "Imam Muslim ibn al-Hajjaj",
        isRead: true
    },
    {
        title: "Riyadh as-Salihin",
        author: "Imam An-Nawawi",
        isRead: false
    },
    {
        title: "The Sealed Nectar",
        author: "Safiur Rahman Mubarakpuri",
        isRead: false
    },
    {
        title: "Sherlock Holmes: The Complete Novels",
        author: "Arthur Conan Doyle",
        isRead: true
    },
    {
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        isRead: false
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        isRead: true
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        isRead: false
    },
    {
        title: "The History of the Khalifahs",
        author: "Jalal ad-Din as-Suyuti",
        isRead: false
    },
    {
        title: "1984",
        author: "George Orwell",
        isRead: true
    }
];

let running = true;

// Function to add a book
function addBook() {
    const title = prompt("Enter the book title:");
    if (!title) {
        alert("Title cannot be empty!");
        return;
    }

    const author = prompt("Enter the author name:");
    if (!author) {
        alert("Author cannot be empty!");
        return;
    }

    const newBook = {
        title: title,
        author: author,
        isRead: false
    };

    library.push(newBook);
    alert(`Book "${title}" by ${author} has been added!`);
    console.log(`✅ Added: "${title}" by ${author}`);
    displayBooks();
    updateStats();
}

// Function to list all books
function listBooks() {
    console.log("\n📚 ===== LIBRARY BOOKS =====");
    if (library.length === 0) {
        console.log("No books in the library.");
        return;
    }

    library.forEach((book, index) => {
        const status = book.isRead ? "✅ Read" : "📖 Unread";
        console.log(`${index + 1}. "${book.title}" by ${book.author} - ${status}`);
    });
    console.log("===========================\n");
}

// Function to mark a book as read
function markAsRead(title) {
    const book = library.find(b => b.title.toLowerCase() === title.toLowerCase());
    
    if (book) {
        if (book.isRead) {
            alert(`"${book.title}" is already marked as read!`);
            console.log(`ℹ️ "${book.title}" was already marked as read.`);
        } else {
            book.isRead = true;
            alert(`"${book.title}" has been marked as read!`);
            console.log(`✅ Marked as read: "${book.title}"`);
            displayBooks();
            updateStats();
        }
    } else {
        alert(`Book "${title}" not found in the library.`);
        console.log(`❌ Book "${title}" not found.`);
    }
}

// BONUS: Function to remove a book
function removeBook(title) {
    const index = library.findIndex(b => b.title.toLowerCase() === title.toLowerCase());
    
    if (index !== -1) {
        const removedBook = library[index];
        library.splice(index, 1);
        alert(`"${removedBook.title}" has been removed from the library!`);
        console.log(`🗑️ Removed: "${removedBook.title}"`);
        displayBooks();
        updateStats();
    } else {
        alert(`Book "${title}" not found in the library.`);
        console.log(`❌ Book "${title}" not found.`);
    }
}

// BONUS: Function to list only unread books
function listUnreadBooks() {
    console.log("\n📖 ===== UNREAD BOOKS =====");
    const unreadBooks = library.filter(book => !book.isRead);
    
    if (unreadBooks.length === 0) {
        console.log("No unread books! Great job! 🎉");
        return;
    }

    unreadBooks.forEach((book, index) => {
        console.log(`${index + 1}. "${book.title}" by ${book.author}`);
    });
    console.log("===========================\n");
}

// UI Functions
function displayBooks(filter = 'all') {
    const container = document.getElementById('booksContainer');
    let booksToDisplay = library;

    if (filter === 'unread') {
        booksToDisplay = library.filter(book => !book.isRead);
    }

    if (booksToDisplay.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No Books Found</h2>
                <p>${filter === 'unread' ? 'All books have been read! 🎉' : 'Start adding books to your library!'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = booksToDisplay.map(book => `
        <div class="book-card ${book.isRead ? 'read' : ''}">
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-status ${book.isRead ? 'status-read' : 'status-unread'}">
                ${book.isRead ? '✅ Read' : '📖 Unread'}
            </div>
            <div class="book-actions">
                ${!book.isRead ? `<button class="btn-success" onclick="markAsRead('${book.title.replace(/'/g, "\\'")}')">Mark as Read</button>` : ''}
                <button class="btn-danger" onclick="confirmRemoveBook('${book.title.replace(/'/g, "\\'")}')">Remove</button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const total = library.length;
    const read = library.filter(b => b.isRead).length;
    const unread = total - read;

    document.getElementById('totalBooks').textContent = total;
    document.getElementById('readBooks').textContent = read;
    document.getElementById('unreadBooks').textContent = unread;
}

function openAddBookModal() {
    document.getElementById('addBookModal').classList.add('active');
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookTitle').focus();
}

function closeAddBookModal() {
    document.getElementById('addBookModal').classList.remove('active');
}

function addBookFromModal() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();

    if (!title || !author) {
        alert('Please fill in both title and author!');
        return;
    }

    const newBook = {
        title: title,
        author: author,
        isRead: false
    };

    library.push(newBook);
    console.log(`✅ Added: "${title}" by ${author}`);
    displayBooks();
    updateStats();
    closeAddBookModal();
}

function showAllBooks() {
    displayBooks('all');
    listBooks();
}

function showUnreadBooks() {
    displayBooks('unread');
    listUnreadBooks();
}

function confirmRemoveBook(title) {
    if (confirm(`Are you sure you want to remove "${title}"?`)) {
        removeBook(title);
    }
}

function clearConsole() {
    console.clear();
    console.log("🧹 Console cleared!");
}

// Console-based menu (runs in console)
function startConsoleMenu() {
    console.log("\n🎉 Welcome to Book Tracker!");
    console.log("You can interact with the app through the webpage or use these console commands:");
    console.log("- addBook() - Add a new book");
    console.log("- listBooks() - List all books");
    console.log("- markAsRead('title') - Mark a book as read");
    console.log("- removeBook('title') - Remove a book");
    console.log("- listUnreadBooks() - List unread books only");
    console.log("\nType 'startPromptMenu()' to use the original prompt-based menu\n");
    
    listBooks();
}

// Original prompt-based menu
function startPromptMenu() {
    running = true;
    while (running) {
        const choice = prompt(`
            📚 Book Tracker
            1. Add Book
            2. List Books
            3. Mark Book as Read
            4. Remove Book
            5. List Unread Books
            6. Exit

            Enter your choice:`);

        switch (choice) {
            case "1":
                addBook();
                break;
            case "2":
                listBooks();
                break;
            case "3":
                const titleToRead = prompt("Enter the title of the book to mark as read:");
                if (titleToRead) markAsRead(titleToRead);
                break;
            case "4":
                const titleToRemove = prompt("Enter the title of the book to remove:");
                if (titleToRemove) removeBook(titleToRemove);
                break;
            case "5":
                listUnreadBooks();
                break;
            case "6":
                running = false;
                alert("Goodbye! Happy reading! 📚");
                console.log("👋 Goodbye!");
                break;
            default:
                alert("Invalid choice. Please try again.");
        }
    }
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    displayBooks();
    updateStats();
    startConsoleMenu();
});

// Close modal when clicking outside
document.getElementById('addBookModal').addEventListener('click', (e) => {
    if (e.target.id === 'addBookModal') {
        closeAddBookModal();
    }
});

// Allow Enter key to add book in modal
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('addBookModal').classList.contains('active')) {
        addBookFromModal();
    }
});