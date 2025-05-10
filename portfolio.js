document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.getElementById("nav-menu");

    // Add click event listener to toggle navigation menu
    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchBar = document.getElementById("search-bar");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const mainContent = document.getElementById("main-content");

    // Toggle search bar visibility
    searchIcon.addEventListener("click", () => {
        searchBar.classList.toggle("hidden");
        if (!searchBar.classList.contains("hidden")) {
            searchInput.focus();
        }
    });

    // Handle the search functionality
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query) {
            // Remove previous highlights
            document.querySelectorAll(".highlight").forEach((element) => {
                element.classList.remove("highlight");
                const parent = element.parentElement;
                parent.innerHTML = parent.textContent; // Reset to original text
            });

            // Search within main content
            const contentElements = mainContent.querySelectorAll("h2, p");
            let found = false;

            contentElements.forEach((element) => {
                const text = element.textContent;
                const lowerText = text.toLowerCase();
                const matchStart = lowerText.indexOf(query);

                if (matchStart !== -1) {
                    found = true;

                    // Split the text into parts
                    const beforeMatch = text.slice(0, matchStart);
                    const match = text.slice(matchStart, matchStart + query.length);
                    const afterMatch = text.slice(matchStart + query.length);

                    // Update the element's HTML with highlighted match
                    element.innerHTML = `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;
                }
            });

            if (!found) {
                alert(`No results found for: "${query}"`);
            }

            searchInput.value = ""; // Clear the input field
        } else {
            alert("Please enter a search query.");
        }
    });

    // Optional: Close the search bar when clicking outside
    document.addEventListener("click", (event) => {
        if (!searchBar.contains(event.target) && event.target !== searchIcon) {
            searchBar.classList.add("hidden");
        }
    });
});
// Create Dark/Light Mode Toggle Button
const themeToggleBtn = document.createElement("button");
themeToggleBtn.id = "themeToggle";
themeToggleBtn.style.position = "fixed";
themeToggleBtn.style.bottom = "20px";
themeToggleBtn.style.left = "20px";
themeToggleBtn.style.padding = "10px";
themeToggleBtn.style.fontSize = "18px";
themeToggleBtn.style.borderRadius = "50%";
themeToggleBtn.style.backgroundColor = "#333";
themeToggleBtn.style.color = "white";
document.body.appendChild(themeToggleBtn);

// Check and Apply Theme on Page Load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        applyDarkTheme();
    } else {
        removeDarkTheme();
    }

    themeToggleBtn.addEventListener("click", toggleTheme);
});

// Toggle Theme
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark-theme");
    if (isDarkMode) {
        applyDarkTheme();
        localStorage.setItem("theme", "dark");
    } else {
        removeDarkTheme();
        localStorage.setItem("theme", "light");
    }
}

// Apply Dark Theme
function applyDarkTheme() {
    document.body.classList.add("dark-theme");
    themeToggleBtn.textContent = "🌞"; // Sun icon for light mode
    themeToggleBtn.style.backgroundColor = "#fff";
    themeToggleBtn.style.color = "#333";
}

// Remove Dark Theme
function removeDarkTheme() {
    document.body.classList.remove("dark-theme");
    themeToggleBtn.textContent = "🌗"; // Moon icon for dark mode
    themeToggleBtn.style.backgroundColor = "#333";
    themeToggleBtn.style.color = "white";
}

// Add Dark Theme Styles in CSS
const style = document.createElement("style");
style.textContent = `
    .dark-theme {
        background-color: #333;
        color: #333333;
    }
    .dark-theme header,
    .dark-theme footer {
        background-color: #444;
        color: #fff;
    }
    .dark-theme nav a {
        color: #ccc;
    }
    .dark-theme nav a.active {
        color: #fff;
    }
    .dark-theme button {
        background-color: #555;
        color: #fff;
    }
`;
document.head.appendChild(style);
// Create Scroll-to-Top Button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.id = "scrollToTop";
scrollToTopBtn.textContent = "⬆"; // Up arrow icon
scrollToTopBtn.style.position = "fixed";
scrollToTopBtn.style.bottom = "80px";
scrollToTopBtn.style.right = "20px";
scrollToTopBtn.style.padding = "10px";
scrollToTopBtn.style.fontSize = "18px";
scrollToTopBtn.style.borderRadius = "50%";
scrollToTopBtn.style.backgroundColor = "#333";
scrollToTopBtn.style.color = "white";
scrollToTopBtn.style.display = "none"; // Initially hidden
scrollToTopBtn.style.cursor = "pointer";
scrollToTopBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
document.body.appendChild(scrollToTopBtn);

// Show/Hide Button on Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// Scroll to Top on Click
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
// Image Modal for Captured Moments
const images = document.querySelectorAll("figure img");
images.forEach((image) => {
    image.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = "1000";

        const img = document.createElement("img");
        img.src = image.src;
        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";
        modal.appendChild(img);

        document.body.appendChild(modal);

        modal.addEventListener("click", () => {
            document.body.removeChild(modal);
        });
    });
});

// Audio Player Progress Bar
const audioPlayers = document.querySelectorAll("audio");
audioPlayers.forEach((audio) => {
    const progressBar = document.createElement("div");
    progressBar.style.height = "5px";
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "#ddd";
    progressBar.style.marginTop = "5px";
    progressBar.style.position = "relative";

    const progress = document.createElement("div");
    progress.style.height = "100%";
    progress.style.width = "0";
    progress.style.backgroundColor = "#56d856";
    progress.style.transition = "width 0.1s";
    progressBar.appendChild(progress);
    audio.parentNode.appendChild(progressBar);

    audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
    });
});
