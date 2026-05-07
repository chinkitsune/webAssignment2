/**
 * Author : Deng Dan
 */
window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const errorBox = document.getElementById("errorBox");
    const outputBox = document.getElementById("outputBox");

    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const comment = document.getElementById("comment");

    let errors = [];

    // Clear previous
    errorBox.innerHTML = "";
    outputBox.innerHTML = "";
    name.classList.remove("error");
    email.classList.remove("error");
    phone.classList.remove("error");
    comment.classList.remove("error");

    // Name validation
    if (name.value.trim().length < 2 || name.value.trim().length > 50) {
        errors.push("Name must be between 2 and 50 characters.");
        name.classList.add("error");
    }

    // Email validation
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        errors.push("Invalid email address.");
        email.classList.add("error");
    }

    // Phone validation (optional)
    if (phone.value.trim() !== "" && !/^\\+?\\d{7,15}$/.test(phone.value.trim())) {
        errors.push("Invalid phone number.");
        phone.classList.add("error");
    }

    // Comment validation
    if (comment.value.trim().length < 10) {
        errors.push("Comment must be at least 10 characters.");
        comment.classList.add("error");
    }

    // Show errors
    if (errors.length > 0) {
        let html = "<ul>";
        errors.forEach(e => html += `<li>${e}</li>`);
        html += "</ul>";
        errorBox.innerHTML = html;
    } else {
        outputBox.innerHTML = `<strong>Thank you, ${name.value}!</strong><br>
                                Your message has been sent.`;
        form.reset();
    }
    });
});