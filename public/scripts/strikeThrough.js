let checkBoxes = document.querySelectorAll("input[type=checkbox]");
  checkBoxes.forEach((check) => {
      check.addEventListener("click", strikeP);
  })
  
  function strikeP(){
      let nextSibling = this.nextElementSibling;
      nextSibling.classList.toggle("strikeThrough");
  }