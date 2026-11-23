
document.addEventListener("DOMContentLoaded", () => {
    const slides = Array.from(document.querySelectorAll(".slide"));

    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    const progressBar = document.getElementById("progressBar");
    const slideCounter = document.getElementById("slideCounter");

    let currentSlide = 0;

    if (slides.length === 0) {
        console.error("Слайди не знайдені!");
        return;
    }

    function showSlide(index) {
        // Перевіряємо межі презентації
        if (index < 0 || index >= slides.length) {
            return;
        }

        currentSlide = index;

        // Перемикаємо активний слайд
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        // Оновлюємо лічильник
        slideCounter.textContent =
            `${currentSlide + 1} / ${slides.length}`;

        // Оновлюємо прогрес
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Оновлюємо номери слайдів
        slides.forEach((slide, i) => {
            const number = slide.querySelector(".slide-number");

            if (number) {
                number.textContent =
                    `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
            }
        });

        // Активність кнопок
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === slides.length - 1;
    }

    // Перехід вперед
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    // Перехід назад
    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Кнопки
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Керування клавіатурою
    document.addEventListener("keydown", (event) => {
        // Не перемикаємо слайди, якщо користувач вводить текст
        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        switch (event.key) {
            case "ArrowRight":
            case " ":
            case "PageDown":
                event.preventDefault();
                nextSlide();
                break;

            case "ArrowLeft":
            case "PageUp":
                event.preventDefault();
                prevSlide();
                break;

            case "Home":
                event.preventDefault();
                showSlide(0);
                break;

            case "End":
                event.preventDefault();
                showSlide(slides.length - 1);
                break;
        }
    });

    // Керування свайпами на телефоні
    let touchStartX = 0;
    let touchEndX = 0;

    // Запускаємо презентацію
    showSlide(0);
});
