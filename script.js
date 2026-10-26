
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");

// Menú para celulares
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

// Cerrar menú después de seleccionar una sección
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Filtros de motocicletas
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    document.querySelectorAll(".bike-card").forEach(card => {
      const show =
        filter === "all" || card.dataset.category === filter;

      card.hidden = !show;
      card.style.display = show ? "" : "none";
    });
  });
});

// Preparar una solicitud de cotización
function chooseBike(model) {
  document.querySelector("#interest").value =
    "Motocicleta importada";

  const message = document.querySelector("#message");

  message.value =
    `Hola, me interesa recibir información y una cotización para ${model}. ` +
    "¿Me pueden indicar versiones, año, disponibilidad y costo estimado de importación?";

  document.querySelector("#contacto").scrollIntoView({
    behavior: "smooth"
  });

  setTimeout(() => {
    document.querySelector("#name").focus({
      preventScroll: true
    });
  }, 500);
}

// Botones de las tarjetas
document.querySelectorAll(".quote-btn, .heart").forEach(button => {
  button.addEventListener("click", () => {
    const model =
      button.dataset.bike ||
      button.getAttribute("aria-label").replace("Consultar ", "");

    chooseBike(model);
  });
});

// Formulario de WhatsApp
document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const interest = document.querySelector("#interest").value;
  const message = document.querySelector("#message").value.trim();

  // IMPORTANTE:
  // Reemplazá este número con el WhatsApp real de tu negocio.
  // Usá el código de país y solo números, sin + ni espacios.
  const whatsappNumber = "50600000000";

  const text =
    `Hola, soy ${name}. Me interesa: ${interest}. ${message}`;

  if (whatsappNumber === "50600000000") {
    alert(
      "Antes de publicar, reemplazá 50600000000 " +
      "por el número real de WhatsApp en script.js."
    );
    return;
  }

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

// Año automático en el pie de página
document.querySelector("#year").textContent =
  new Date().getFullYear();
