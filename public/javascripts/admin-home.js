function getUpload() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.response);
            // console.log(JSON.parse(this.response));

            var response = JSON.parse(this.response);
            // console.log(response.length);

            var tableTag = `<table class="table table-dark table-hover align-middle text-danger">`;
            tableTag += `<thead><tr><th>ID</th><th>Username</th><th>Recipe Name</th><th>Ingredients</th><th>Recipe</th><th>Action</th></tr></thead>`;

            tableTag += `<tbody>`;

            response.forEach(function (value, index) {
                // console.log(value);
                // console.log(index);
                tableTag += `<tr>`;
                tableTag += `<td>${value.id}</td>`;
                tableTag += `<td>${value.username}</td>`;
                tableTag += `<td>${value.name}</td>`;
                tableTag += `<td>${value.ingredients}</td>`;
                tableTag += `<td>${value.recipe}</td>`;

                tableTag += `<td>`;
                tableTag += `<button onclick="deleteUser('${value.name}')" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-alt"></i></button>`;
                // tableTag += `<button type="button" class="ms-3 btn btn-sm btn-primary">Update</button>`;
                // tableTag += `<button onclick="updateUser('${value.username}', '${value.email}', '${value.address}')" type="button" data-bs-toggle="modal" data-bs-target="#userUpdateModal"
                //                     class="ms-3 btn btn-sm btn-primary"><i class="fa fa-edit"></i></button>`;
                tableTag += `</td>`;

                tableTag += `</tr>`;
            });


            tableTag += `</tbody>`;

            tableTag += `</table>`;

            document.getElementById("usersData").innerHTML = tableTag;

        }
    }
    http.open("GET", "/get-upload", true);
    http.send();
}

function deleteUser(name) {
    console.log(name);

    // confirm("Are you sure to delete?")

    if (confirm("Are you sure to delete?")) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.response);
                alert(this.response);
                getUpload();
            }
        }
        http.open("GET", `/delete-name?abc=${name}`, true);
        http.send();
    }
}



// var UserSignup = () => {
//
//     $("#SignupForm").validate();
//
//     console.log($("#SignupForm").valid());
//
//     if ($("#SignupForm").valid()) {
//
//         var controls = document.getElementById("SignupForm").elements;
//         console.log(controls);
//         var formData = new FormData();
//
//         // for (var i = 0; i < controls.length; i++) {
//         //     // console.log(controls[i].type);
//         //     if (controls[i].type !== "button") {
//         //         if (controls[i].type === "radio") {
//         //             if (controls[i].checked) {
//         //                 // console.log(controls[i].name, controls[i].value);
//         //
//         //                 formData.append(controls[i].name, controls[i].value);
//         //             }
//         //         } else {
//         //             // console.log(controls[i].name, controls[i].value);
//         //             formData.append(controls[i].name, controls[i].value);
//         //         }
//         //     }
//
//
//
//         var http = new XMLHttpRequest();
//         http.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 console.log(this.response);
//
//                 var divTag = document.getElementById("response");
//
//                 if (this.response == "exist") {
//                     divTag.className = `alert alert-danger`;
//                     divTag.innerText = `Username already exist.`;
//                 } else if (this.response == "notsame") {
//                     divTag.className = `alert alert-danger`;
//                     divTag.innerText = `Password & Confirm Password must be same.`;
//                 } else  {
//                     divTag.className = `alert alert-success`;
//                     divTag.innerText = `Signup Success`;
//                     document.getElementById("SignupForm").reset();
//
//                     setTimeout(() => {
//                         divTag.className = ``;
//                         divTag.innerText = ``;
//                     }, 2000);
//                 }
//
//             }
//         }
//         http.open("POST", "/admin-sign", true);
//         http.send(formData);
//     }
//
// }