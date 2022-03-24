

export function navbar () {
  var documentElement = document.querySelector("html");
//   var navb = document.querySelector("#navb");
  var menuIsOpen = navb.classList.contains("hidden");
//   var burger = document.querySelector("#burger");
  var svgIcon = burger.getElementsByTagName("svg");

  documentElement.addEventListener("click", function (event) {
          
      if (menuIsOpen && !navb.contains(event.target) || burger.contains(event.target)) {
          svgIcon[0].classList.toggle("hidden");
          svgIcon[1].classList.toggle("hidden");
          navb.classList.toggle("h-0");
          menuIsOpen = !menuIsOpen;
      }
  });

  // Browser resize listener
  window.addEventListener("resize",  function menuResize() {
    // first get the size from the window
    // Rezise menu if user changing the width with responsive menu opened
    const window_size = window.innerWidth || document.body.clientWidth;
    if (window_size > 768) {
        navb.classList.remove("h-64");
    }
});

}