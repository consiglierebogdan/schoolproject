function toPupilItem(id){
	document.location.href = "pupil-item.html";
	sessionStorage.setItem("pupil", id);
}
window.addEventListener("DOMContentLoaded", () => {
    var teacher_block = document.querySelector(".info_one");
    teacher_block.addEventListener("click", () => {
        console.log(this.textContent);
    });
    var id = sessionStorage.getItem("groupp");
    var requestGroup = new XMLHttpRequest;
        requestGroup.open('GET','https://alexmarchukprod.com.ua/group?id=' + id);
        requestGroup.send();
        requestGroup.addEventListener('readystatechange', function() {
            if ((requestGroup.readyState == 4) && (requestGroup.status == 200)) {
                var info_of_group = JSON.parse(requestGroup.response);
                console.log(info_of_group);
                var studs = info_of_group.students;
                let titleOfGroup = document.createElement('h1');
                let fullMaster = document.querySelector('.info_text_2');
                let boys = document.querySelector('.info_two .info_text_2');
                let direct = document.querySelector('.info_three .info_text_2');
                let subj1 = document.querySelector('.info_text_2_1');
                let subj2 = document.querySelector('.info_text_2_2');
                let subj3 = document.querySelector('.info_text_2_3');
                
                titleOfGroup.classList.add('group_name');
                titleOfGroup.innerHTML = `
                    <h1>${info_of_group.title}</h1>
                `;
                fullMaster.innerText = info_of_group.formMaster.surname + " " +  info_of_group.formMaster.name + " " +  info_of_group.formMaster.patronymic;
                boys.innerText = info_of_group.students.length;
                direct.innerText = info_of_group.specialization;
                subj1.innerText = info_of_group.advancedSubjects[0];
                subj2.innerText = info_of_group.advancedSubjects[1];
                subj3.innerText = info_of_group.advancedSubjects[2];
                document.querySelector('.block_name').appendChild(titleOfGroup);
                studs.forEach(stud => {
                    let card = document.createElement('div');
					card.classList.add('q');
					card.setAttribute("id", "card");
                    var getIdPupil = stud.id;

                    sessionStorage.setItem("id", getIdPupil);
                    card.setAttribute("onclick","toPupilItem("+ getIdPupil + ");");
                    card.innerHTML = `
								
                        <div class="photo photo1"><img src="img/avatar.png"></div>
                        <div class="pib">${stud.surname + " " + stud.name + " " + stud.patronymic} </div>
                        <div class="img"><img src="img/expand-more-white-48-dp.png"></div>
							
					`;
                    document.querySelector('.spisok').appendChild(card);

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