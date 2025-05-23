document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const subject = encodeURIComponent(`Contact Form Message from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
      const mailtoLink = `mailto:umair.ghafoor06@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
    });
  } else {
    console.error("Form with ID 'contact-form' not found.");
  }
});
