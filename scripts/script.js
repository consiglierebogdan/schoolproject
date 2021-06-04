function toGroupItem(id){
	
	document.location.href = "group_item.html";
	sessionStorage.setItem("groupp", id);

}

window.addEventListener("DOMContentLoaded", () => {
	
	function req(){
		var request = new XMLHttpRequest();
		request.open('GET','https://alexmarchukprod.com.ua/groups');
		request.send();
		request.addEventListener('readystatechange', function() {
	  
		  	if ((request.readyState==4) && (request.status==200)) {
		    	var tree = JSON.parse(request.response);

				tree.forEach(item => {
					
					let card = document.createElement('div');
					card.classList.add('q');
					card.setAttribute("id", "card");
					var getIdGroup = item.id;
					
					sessionStorage.setItem("id", getIdGroup);
					
					card.setAttribute("onclick","toGroupItem("+ getIdGroup + ");");
				
						card.innerHTML = `
								
							<div class="name" id="m">${item.title}</div>
							<div class="pib" id="m">${item.formMaster.surname + " " + item.formMaster.name + " " + item.formMaster.patronymic}</div>
							<div class="num" id="m">${item.students.length}</div>
							<div class="img"><img src="img/expand-more-white-48-dp.png"></div>
							
					`;

						
						document.querySelector('.spisok').appendChild(card);
						
					
				})
		  	} else {
		  		console.error("Error!")
		  	}
			
		});
	}

	req();

	

	let input = document.querySelector("#search");
	try{
		input.oninput = function() {
			let value = this.value.toUpperCase(); 
			let list1 = document.querySelectorAll('.q');
			
			if (value != "") {
				list1.forEach(elem => {
					var txt = elem.querySelectorAll("#m");
					var name = txt[1].innerText.toUpperCase();

					if (txt[0].innerText.search(value) == -1 && name.search(value) == -1) {
						elem.style.display = 'none';
					} 
					
					
				})
			} else{
				list1.forEach(elem => {
					elem.style.display = 'flex';
				})
			}

		}
	} catch(e){

	}

	
});