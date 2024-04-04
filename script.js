document.getElementById("revealButton").addEventListener("click", function() {
  var hiddenElement = document.getElementById("hiddenElement");
  if (hiddenElement.style.display === "none") {
    hiddenElement.style.display = "block"; // Show the element
  } else {
    hiddenElement.style.display = "none"; // Hide the element
  }
});
