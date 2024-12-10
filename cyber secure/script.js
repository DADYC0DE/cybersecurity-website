// Utility function for sanitizing input
function sanitizeInput(input) {
    return input.replace(/[<>\/'"]/g, ""); // Strips out malicious characters
}

// Validate Form Function
function validateForm() {
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const phone = sanitizeInput(document.getElementById('phone').value.trim());
    
    // Regex patterns for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    // Validation Logic
    if (!emailPattern.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return false;
    } else if (!phonePattern.test(phone)) {
        alert("⚠️ Phone number must be exactly 10 digits.");
        return false;
    }

    window.location.href = "success.html"; // Redirect to success page
    return true;
}

// Save Comments to LocalStorage
function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Load Comments from LocalStorage
function loadComments() {
    return JSON.parse(localStorage.getItem('comments')) || [];
}

// Prevent Duplicate Comments
function isDuplicateComment(name, email, text, comments) {
    return comments.some(comment => 
        comment.name === name && comment.email === email && comment.text === text
    );
}

// Render Comments on the Page
function renderComments() {
    const comments = loadComments();
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = ''; // Clear the list

    comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment-item');

        commentItem.innerHTML = `
            <strong>${sanitizeInput(comment.name)}</strong> 
            (<em>${sanitizeInput(comment.email)}</em>) 
            <p>${sanitizeInput(comment.text)}</p>
        `;
        commentList.appendChild(commentItem);
    });
}

// Show Success Message
function showSuccessMessage() {
    const successMessage = document.getElementById('comment-success');
    successMessage.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// Handle Comment Form Submission
function handleCommentSubmit(event) {
    event.preventDefault();

    const name = sanitizeInput(document.getElementById('comment-name').value.trim());
    const email = sanitizeInput(document.getElementById('comment-email').value.trim());
    const text = sanitizeInput(document.getElementById('comment-text').value.trim());

    if (name && email && text) {
        const comments = loadComments();

        // Prevent duplicate comments
        if (isDuplicateComment(name, email, text, comments)) {
            alert("⚠️ Duplicate comment detected. Please submit a new comment.");
            return;
        }

        const newComment = { name, email, text };
        comments.push(newComment);
        saveComments(comments);
        renderComments();

        showSuccessMessage();
        document.getElementById('comment-form').reset(); // Clear form
    } else {
        alert("⚠️ All fields are required. Please fill in all the details.");
    }
}

// Event Listeners
document.getElementById('comment-form').addEventListener('submit', handleCommentSubmit);
window.addEventListener('DOMContentLoaded', renderComments);

// Optional Animation Example
let position = 0;
const box = document.querySelector('.animated-box');
if (box) { // Check if the element exists
    const moveBox = setInterval(() => {
        if (position >= 200) clearInterval(moveBox);
        box.style.left = position + 'px';
        position += 5;
    }, 50);
}
