window.addEventListener("DOMContentLoaded", () => {

	function reqForTeachers(){
		var request = new XMLHttpRequest();
		request.open("GET", 'https://alexmarchukprod.com.ua/teachers');

		request.send();
		request.addEventListener("readystatechange", function(){
			if ((request.readyState == 4) && (request.status == 200)) {
				var teachers = JSON.parse(request.response);

				teachers.forEach(teacher => {
					let card = document.createElement('div');
					card.classList.add('q');
					card.setAttribute("id", "card")
					try {
						card.innerHTML = `
							<div class="photo photo1"><img src="img/avatar.png"></div>
							<div class="pib">${teacher.surname + " " + teacher.name + " " + teacher.patronymic} </div>
							<div class="img"><img src="img/expand-more-white-48-dp.png"></div>
						`;
						document.querySelector('.spisok').appendChild(card);
					} catch(e){
						
					}
				})
		  	} else {
		  		console.error("Error!")
		  	}
				})
			}
			reqForTeachers();
			// Поиск
	
	let input = document.querySelector("#search");
	input.oninput = function() {
		let value = this.value.toUpperCase(); 
		let list1 = document.querySelectorAll('.q');
		
		if (value != "") {
			list1.forEach(elem => {
				var txt = elem.querySelectorAll(".pib");
				
				txt.forEach(pib => {
					if (pib.innerText.toUpperCase().search(value) == -1) {
						elem.style.display = 'none';
				} 
				})
				
				
				
			})
		} else{
			list1.forEach(elem => {
				elem.style.display = 'flex';
			})
		}


}
})
	