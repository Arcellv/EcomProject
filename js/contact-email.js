
// EmailJS script initialization
(function () {
  emailjs.init("wvTRqNzOYq_pjHnvX"); // Replace with your EmailJS public key
})();

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all required fields.");
      return;
    }

    // Use EmailJS to send the form data
    emailjs
      .send("service_5fdf1vt", "template_1x0qgor", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      })
      .then(
        function (response) {
          alert("Message sent successfully!");
          contactForm.reset();
        },
        function (error) {
          alert("Failed to send message. Try again later.");
          console.error("EmailJS Error:", error);
        }
      );
  });
});