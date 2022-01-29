var screen = document.querySelector(".screen");
var keys = document.querySelectorAll(".key");
for (i = 0; i < keys.length; i += 1) {
  keys[i].addEventListener("click", function(event) {
    let keyVal = this.innerHTML;
    let number = parseInt(keyVal);
    if (!isNaN(number)) {
      typeValue(number);
    } else {
      switch (keyVal) {
        case "del":
          screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length - 1)
          break;
        case ".":
          screen.innerHTML += ".";
          break;
        case "reset":
          screen.innerHTML = "";
          break;
      }
    }
  })

}

function typeValue(number) {
  screen.innerHTML += number;
}
