document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("subscribeForm");
    const messageBox = document.getElementById("notification");
    let hideMessageTimeout = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Zabráni reloadu stránky

        let formData = new FormData(form);

        fetch("/chatamiko/subs/subscribe.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json()) // Očakávame JSON odpoveď zo servera
            .then(data => {
                messageBox.innerText = data.message;
                messageBox.style.display = "block";

                if (data.status === "success") {
                    messageBox.style.color = "green";

                    if (typeof grecaptcha !== "undefined") {
                        grecaptcha.reset();
                    }
                } else {
                    messageBox.style.color = "red";

                    if (typeof grecaptcha !== "undefined") {
                        grecaptcha.reset();
                    }
                }

                // Zrušíme predchádzajúci časovač, ak existuje
                if (hideMessageTimeout) {
                    clearTimeout(hideMessageTimeout);
                }

                // Nastavíme nový časovač
                hideMessageTimeout = setTimeout(() => {
                    messageBox.style.display = "none";
                }, 3000);
            })
            .catch(error => {
                messageBox.innerText = "Chyba pri komunikácii so serverom.";
                messageBox.style.color = "red";
                messageBox.style.display = "block";

                if (typeof grecaptcha !== "undefined") {
                    grecaptcha.reset();
                }

                // Zrušíme predchádzajúci časovač, ak existuje
                if (hideMessageTimeout) {
                    clearTimeout(hideMessageTimeout);
                }

                // Nastavíme nový časovač
                hideMessageTimeout = setTimeout(() => {
                    messageBox.style.display = "none";
                }, 3000);
            })
    })
})



