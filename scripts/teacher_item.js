window.addEventListener("DOMContentLoaded", () => {
    var id = sessionStorage.getItem("teacher");
    var requestTeacher = new XMLHttpRequest;
        requestTeacher.open('GET','https://alexmarchukprod.com.ua/teacher?id=' + id);
        requestTeacher.send();
        requestTeacher.addEventListener('readystatechange', function() {
            if ((requestTeacher.readyState == 4) && (requestTeacher.status == 200)) {
                var info_of_teacher = JSON.parse(requestTeacher.response);
                console.log(info_of_teacher);
                
                let fullMasterName = document.querySelector('.block_name_text');
                let category = document.querySelector('.info_one .info_text_2');
                let group = document.querySelector('.info_two .info_text_2');
                let subjs = document.querySelector('.info_three .info_text_2');
                let olimpic = document.querySelector('.block_text .block_text_2_1');
                let pic = document.querySelector('.photo img');

                fullMasterName.innerText = info_of_teacher.surname + " " +  info_of_teacher.name + " " +  info_of_teacher.patronymic;
                category.innerText = info_of_teacher.rank;
                if (info_of_teacher.group == null){
                    group.innerText = "-"
                }
                else if (info_of_teacher.group.title != null){
                    group.innerText = info_of_teacher.group.title;
                }
                
                subjs.innerText = info_of_teacher.subjects;
                olimpic.innerText = info_of_teacher.olympicReserve;
                pic.setAttribute("src", info_of_teacher.photo)

                var grps = info_of_teacher.groups;
                var achievements = info_of_teacher.achievements;
                
                grps.forEach(gr => {
                    let card = document.createElement('div');
					card.classList.add('.down_text_2_1');
					
                    card.innerText = gr;
                    document.querySelector('.down_text_2').appendChild(card);
                })
                achievements.forEach(achieve => {
                    let ach = document.createElement('div');
					ach.classList.add('.down_text_2_2');
					
                    ach.innerText = achieve;
                    document.querySelector('.down_2 .down_text_2').appendChild(ach);
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