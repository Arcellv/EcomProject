const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

let isSearchOpen = false;

searchIcon.addEventListener("click", () => {
  if (!isSearchOpen) {
    searchInput.style.display = "inline-block";
    searchInput.focus();
    isSearchOpen = true;
  } else {
    const query = searchInput.value.trim();
    if (query) {
      alert("Searching for: " + query);
    }
    isSearchOpen = false;
    searchInput.style.display = "none";
    searchInput.value = "";
  }
});

