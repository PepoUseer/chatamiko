<<<<<<< HEAD
function toggleMore() {
    var dots = document.getElementById("dots");
    var moreContent = document.getElementById("moreContent");
    var moreContents = document.getElementById("moreContents");
    var readMoreBtn = document.getElementById("readMoreBtn");
    var readLessBtn = document.getElementById("readLessBtn");
    var isExpanded = moreContent.classList.contains("more-shown");

    if (!isExpanded) {
        dots.style.display = "none";
        moreContent.classList.add("more-shown");
        readMoreBtn.style.display = "none";

        moreContents.style.display = "block";
        moreContents.style.overflow = "hidden";
        moreContents.style.transition = "height 0.5s cubic-bezier(0.5,0,0.5,1), opacity 0.3s";
        moreContents.style.height = "0px";
        moreContents.style.opacity = "1";

        moreContents.offsetHeight;

        let scrollHeight = moreContents.scrollHeight + "px";
        moreContents.style.height = scrollHeight;

        setTimeout(() => {
            moreContents.style.height = "auto";
            moreContents.style.overflow = "visible";
            readLessBtn.style.display = "inline-block";
        }, 500);
    } else {
        dots.style.display = "inline";
        moreContent.classList.remove("more-shown");
        readMoreBtn.style.display = "inline-block";
        readLessBtn.style.display = "none";

        moreContents.style.overflow = "hidden";
        moreContents.style.transition = "height 0.5s cubic-bezier(0.5,0,0.5,1), opacity 0.3s";
        moreContents.style.height = moreContents.scrollHeight + "px";
        moreContents.offsetHeight; 

        moreContents.style.height = "0px";
        moreContents.style.opacity = "1";

        setTimeout(() => {
            moreContents.style.display = "none";
            moreContents.style.height = "0px";
            moreContents.style.overflow = "hidden";
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Spracovanie prepínača témy
    const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const body = document.body;
		const toggleBtn = document.getElementById("theme-toggle");
		const iconSpan = toggleBtn.querySelector(".theme-icon");

		function applyTheme(theme) {
			if (theme === "dark") {
				body.classList.add("dark-mode");
				iconSpan.textContent = "☀️";
			} else {
				body.classList.remove("dark-mode");
				iconSpan.textContent = "🌙";
			}
		}

		// Nastavenie podľa localStorage alebo systému
		if (savedTheme) {
			applyTheme(savedTheme);
		} else {
			applyTheme(prefersDark ? "dark" : "light");
		}

		toggleBtn.addEventListener("click", () => {
			const isDark = body.classList.toggle("dark-mode");
			const newTheme = isDark ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			iconSpan.textContent = isDark ? "☀️" : "🌙";
        });
    
    
    
    const form = document.getElementById("subscribeForm");
    const messageBox = document.getElementById("notification");
    let hideMessageTimeout = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Zabráni reloadu stránky

        let formData = new FormData(form);

        fetch("/api.php", {
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



=======
function toggleMore() {
    var dots = document.getElementById("dots");
    var moreContent = document.getElementById("moreContent");
    var moreContents = document.getElementById("moreContents");
    var readMoreBtn = document.getElementById("readMoreBtn");
    var readLessBtn = document.getElementById("readLessBtn");
    var isExpanded = moreContent.classList.contains("more-shown");

    if (!isExpanded) {
        dots.style.display = "none";
        moreContent.classList.add("more-shown");
        readMoreBtn.style.display = "none";

        moreContents.style.display = "block";
        moreContents.style.overflow = "hidden";
        moreContents.style.transition = "height 0.5s cubic-bezier(0.5,0,0.5,1), opacity 0.3s";
        moreContents.style.height = "0px";
        moreContents.style.opacity = "1";

        moreContents.offsetHeight;

        let scrollHeight = moreContents.scrollHeight + "px";
        moreContents.style.height = scrollHeight;

        setTimeout(() => {
            moreContents.style.height = "auto";
            moreContents.style.overflow = "visible";
            readLessBtn.style.display = "inline-block";
        }, 500);
    } else {
        dots.style.display = "inline";
        moreContent.classList.remove("more-shown");
        readMoreBtn.style.display = "inline-block";
        readLessBtn.style.display = "none";

        moreContents.style.overflow = "hidden";
        moreContents.style.transition = "height 0.5s cubic-bezier(0.5,0,0.5,1), opacity 0.3s";
        moreContents.style.height = moreContents.scrollHeight + "px";
        moreContents.offsetHeight; 

        moreContents.style.height = "0px";
        moreContents.style.opacity = "1";

        setTimeout(() => {
            moreContents.style.display = "none";
            moreContents.style.height = "0px";
            moreContents.style.overflow = "hidden";
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Spracovanie prepínača témy
    const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const body = document.body;
		const toggleBtn = document.getElementById("theme-toggle");
		const iconSpan = toggleBtn.querySelector(".theme-icon");

		function applyTheme(theme) {
			if (theme === "dark") {
				body.classList.add("dark-mode");
				iconSpan.textContent = "☀️";
			} else {
				body.classList.remove("dark-mode");
				iconSpan.textContent = "🌙";
			}
		}

		// Nastavenie podľa localStorage alebo systému
		if (savedTheme) {
			applyTheme(savedTheme);
		} else {
			applyTheme(prefersDark ? "dark" : "light");
		}

		toggleBtn.addEventListener("click", () => {
			const isDark = body.classList.toggle("dark-mode");
			const newTheme = isDark ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			iconSpan.textContent = isDark ? "☀️" : "🌙";
        });
    
    
    
    const form = document.getElementById("subscribeForm");
    const messageBox = document.getElementById("notification");
    let hideMessageTimeout = null;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Zabráni reloadu stránky

        let formData = new FormData(form);

        fetch("/api.php", {
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



>>>>>>> 05481ac036ebf45c92d3e0af872f3efc3d76bee5
