const faculties = [
	{
		name:"Pascasarjana",
		sub: ['Magister Manajemen','Magister Teologi']
	},
	{
		name:"Fakultas Ilmu Komputer",
		sub: ['Informatika', 'Sistem Informasi']
	},
	{
		name:"Fakultas Keguruan dan Ilmu Pendidikan",
		sub: [
			'Pendidikan Agama',
			'Pendidikan Bahasa Inggris',
			'Pendidikan Ekonomi',
			'Pendidikan Luar Sekolah'
			]
	},
	{
		name:"Fakultas Ekonomi dan Bisnis",
		sub: ['Akuntansi', 'Manajemen']
	},
	{
		name:"Fakultas Pertanian",
		sub: ['Agroteknologi']
	},
	{
		name:"Fakultas Keperawatan",
		sub: ['Profesi Ners', 'Keperawatan']
	},
	{
		name:"Fakultas Filsafat",
		sub: ['Ilmu Filsafat']
	},
]

let students = [
	{
		nim: '105011910075',
		name: 'Arwin Pangaila',
		gender: 'Male',
		faculty: 'Fakultas Ilmu Komputer',
		program_study: 'Sistem Informasi',
	},
	{
		nim: '105021810021',
		name: 'Jonathan Ticoalu',
		gender: 'Male',
		faculty: 'Fakultas Filsafat',
		program_study: 'Ilmu Filsafat',
	},
	{
		nim: '105011564582',
		name: 'Fanesha christina',
		gender: 'Female',
		faculty: 'Fakultas Ekonomi dan Bisnis',
		program_study: 'Manejement',
	},
	{
		nim: '105021910017',
		name: 'Marietta Unenor',
		gender: 'Female',
		faculty: 'Fakultas Keperawatan',
		program_study: 'Profesi Ners',
	},
	{
		nim: '105021731982',
		name: 'Christian Friendly Maabuat',
		gender: 'Male',
		faculty: 'Pascasarjana',
		program_study: 'Magister Manajement',
	},

]

// menampilkan form
const show_hide_form = document.querySelector("#show-hide-button");
const form = document.querySelector("form");

show_hide_form.addEventListener("click", function(){

	if(form.style.display === "none"){
		form.style.display = "block";
		show_hide_form.textContent = "Hide Form Add New Student";
	}
	else{
		form.style.display = "none";
		show_hide_form.textContent = "Show Form Add New Student";
	}
});

//fakultas dan program studi
const faculty_option = document.querySelector("#faculty-form");

for(faculty of faculties){
	let tag = document.createElement('option');
	let text = document.createTextNode(faculty.name);
	tag.appendChild(text);
	faculty_option.appendChild(tag);
}

let program_study = document.querySelector("#program-study-form");
faculty_option.addEventListener('change',function(e){

	let options = e.target.value;

	//check if selected faculty is valid
	if(faculties.map((faculty) => faculty.name).indexOf(options) != -1){
		faculties.filter((i) => {
			if(i.name == options){

				program_study.innerHTML = '';

				let tag = document.createElement('option');
				let text = document.createTextNode("-- SELECT PROGRAM OF STUDY --");
				tag.appendChild(text);
				program_study.appendChild(tag);

				for(j of i.sub){
					let tag = document.createElement('option');
					let text = document.createTextNode(j);
					tag.appendChild(text);
					program_study.appendChild(tag)
					
				}
			}
		});
	}
	else{
		program_study.innerHTML = '';

		let tag = document.createElement('option');
		let text = document.createTextNode("-- SELECT PROGRAM OF STUDY --");
		tag.appendChild(text);
		program_study.appendChild(tag);
	}
});

//mengambil data dari form
const submit_button = document.querySelector("#submit-button");

submit_button.addEventListener('click',() => {
	let student_nim = document.querySelector("#NIM").value;
	let student_name = document.querySelector("#full-name").value;
	let student_gender = document.querySelector('input[name="gender"]:checked').value;
	let student_faculty = document.querySelector("#faculty-form").options[document.querySelector("#faculty-form").selectedIndex].value;
	let student_program_study = document.querySelector("#program-study-form").options[document.querySelector("#program-study-form").selectedIndex].value;;

	
	//validating form data
	if(/^\d+$/.test(student_nim) != true){
		alert("Invalid Student NIM");
		return;
	}

	if(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(student_name) != true){
		alert("Invalid Student Name");
		return;
	}

	if(student_faculty == '-- SELECT FACULTY --'){
		alert("Invalid Faculty");
		return;
	}

	if(student_program_study == '-- SELECT PROGRAM OF STUDY --'){
		alert("Invalid Program Study");
		return;
	}

	if(students.map((s) => s.nim).includes(student_nim) == true){
		alert(`Duplicate NIM Detected!`);
		return;
	}

	//menambahkan student data ke student list
	students.push({
		nim: student_nim,
		name: student_name,
		gender: student_gender,
		faculty: student_faculty,
		program_study: student_program_study,
	});

	//memperbaharui list student
	alert(`${student_name} added.`);
	update_student_list();
	document.querySelector("form").reset();


});

//menampilkan seluruh student
const student_list = document.querySelector("#student-list");

function update_student_list(){

	student_list.innerHTML = "";

	for(student of students){
		let tr = document.createElement("tr");
		for(key in student){
			let td = document.createElement("td");
			td.appendChild(document.createTextNode(student[key]));
			tr.appendChild(td);
		}

		//menghapus
		let action = document.createElement("td");
		let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
	  </svg></button>`
		action.innerHTML = trash_icon;
		tr.appendChild(action);

		student_list.appendChild(tr);
	}
}
update_student_list();



//menghapus baris
function delete_row(btn) {

	var row = btn.parentNode.parentNode;

	student_name = row.getElementsByTagName("td")[1].textContent;
	student_nim = (row.querySelector("tr td").textContent);

	const confirm_delete = confirm(`Are You Sure To Delete ${student_name}?`);
 
	if(confirm_delete == true){		
		students = students.filter((s) =>{
			return s.nim != student_nim;
		});

		update_student_list();

		//reset input text
		document.querySelector("#search-student-form").reset();
	}
}

//mencari student dengan nama
let search_student = document.querySelector("#search-student");

search_student.addEventListener("input",() => {
	if(search_student.length == 0){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//melakukan filter terhadap student
		let filtered_students = students.filter((s) => {
			return s.name.toLowerCase().includes(search_student.value.toLowerCase());
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			//delete
			let action = document.createElement("td");
			let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
			<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
		  </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}

	}
});

//disable "Enter"
search_student.addEventListener('keydown',(e) =>{
	if(e.keyCode == 13){
		e.preventDefault();
	}

	return false;
});

//filter student
const filter_by_faculty = document.querySelector("#filter-by-faculty");

for(i of faculties){
	const parent = document.createElement("option");
	const child = document.createTextNode(i.name);
	parent.append(child);
	filter_by_faculty.appendChild(parent);
}

const filter_faculty_button = document.querySelector("#filter-faculty-button");

filter_faculty_button.addEventListener("click",() => {
	const selected_faculty = filter_by_faculty.options[filter_by_faculty.selectedIndex].value

	//update student list
	if(selected_faculty == "-- SELECT FACULTY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		const filtered_students = students.filter((s) => {
			return s.faculty == selected_faculty;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			//delete
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
			<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
		  </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});

const filter_by_program_study = document.querySelector("#filter-by-program-study");

for(i of faculties){

	for(j of i.sub){
		const parent = document.createElement("option");
		const child = document.createTextNode(j);
		parent.append(child);
		filter_by_program_study.appendChild(parent);
	}
}

const filter_program_study_button = document.querySelector("#filter-program-study-button");

filter_program_study_button.addEventListener("click",() => {
	const selected_program_study = filter_by_program_study.options[filter_by_program_study.selectedIndex].value

	//update student list
	if(selected_program_study == "-- SELECT PROGRAM STUDY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		const filtered_students = students.filter((s) => {
			return s.program_study == selected_program_study;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}
			
			//action #delete, 
			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
			<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
		  </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});

