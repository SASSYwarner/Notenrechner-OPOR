window.addEventListener("load", function () {

  function showSection(id) {
    const targetDiv = document.querySelector("#" + id);
    if (!targetDiv) return;

    document.querySelectorAll(".content > div").forEach(div => {
      div.classList.remove("active");
    });

    targetDiv.classList.add("active");
  }

  showSection("div1");

  document.querySelectorAll("[data-target]").forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      const target = this.getAttribute("data-target");
      if (!target) return;

      showSection(target);
    });
  });

});
