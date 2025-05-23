document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("contact-form element not found");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`Contact Form Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    const mailtoLink = `mailto:umair.ghafoor06@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  });
});
