var elements = document.querySelectorAll("*");
alert("There are currently " + elements.length + " elements on the page");
elements[elements.length - 2].style.backgroundColor = "red";
