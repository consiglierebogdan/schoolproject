window.addEventListener("DOMContentLoaded", () => {
    var id = sessionStorage.getItem("pupil");
    var requestPupil = new XMLHttpRequest;
        requestPupil.open('GET','https://alexmarchukprod.com.ua/student?id=' + id);
        requestPupil.send();
        requestPupil.addEventListener('readystatechange', function() {
            if ((requestPupil.readyState == 4) && (requestPupil.status == 200)) {
                var info_of_pupil = JSON.parse(requestPupil.response);
                console.log(info_of_pupil);
                
                let fullPupilName = document.querySelector('.block_name_text');
                let birth = document.querySelector('.info_one .info_text_2');
                let email = document.querySelector('.info_two .info_text_2');
                let favsubj = document.querySelector('.info_three .info_text_2');
                let desc = document.querySelector('.block_1 .block_text_2');
                let olimpic = document.querySelector('.block_2 .block_text_2_1');
                let pic = document.querySelector('.photo img');

                fullPupilName.innerText = info_of_pupil.surname + " " +  info_of_pupil.name + " " +  info_of_pupil.patronymic;
                birth.innerText = info_of_pupil.birthday;
                
               email.innerText = info_of_pupil.email;
              
                
                favsubj.innerText = info_of_pupil.favoriteSubject;
                pic.setAttribute("src", info_of_pupil.photo);
                desc.innerText = info_of_pupil.description;
                olimpic.innerText = info_of_pupil.olympicReserve;
               
                var hobbies = info_of_pupil.interests;
                var achievements = info_of_pupil.achievements;
               
                hobbies.forEach(hobby => {
                    let card = document.createElement('div');
					card.classList.add('.down_text_2_1');
					
                    card.innerText = hobby;
                    document.querySelector('.down_text_2').appendChild(card);
                })
                var counter = 0;
                achievements.forEach(achieve => {
                    counter = counter + 1;
                    let ach = document.createElement('div');
					ach.classList.add('.down_text_2_2');
					
                    ach.innerText = achieve;
                    if (counter <= 2){
                        document.querySelector('.down_2 .down_text_2').appendChild(ach);
                    }
                })

            }
            
    })
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