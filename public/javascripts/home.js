// function getUpload() {
//     var http = new XMLHttpRequest();
//     http.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // console.log(this.response);
//             // console.log(JSON.parse(this.response));

//             var response = JSON.parse(this.response);
//             // console.log(response.length);

//             var tableTag = ` <div class="col">
//             `;

//             tableTag += `<div class="card">`;

//             response.forEach(function (value, index) {
//                 // console.log(value);
//                 // console.log(index);
//                 tableTag += `<h5 class="card-title">${value.name}</</h5>`;
//                 tableTag += `<p class="card-text">${value.username}</</p>`
//                 tableTag += `<p>
//                 <a class="btn btn-danger" data-bs-toggle="collapse" href="#${value.name}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Ingredients</a>
//                 <button class="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#${value.id}" aria-expanded="false" aria-controls="multiCollapseExample2">Recipe</button>
//             </p>
//             <div class="row">
//                 <div class="col">
//                     <div class="collapse multi-collapse" id="${value.name}">`
//                 tableTag += `<div class="card card-body">
//                 ${value.ingredients}
//             </div>
//         </div>
//     </div>`
//     tableTag += `<div class="col">
//     <div class="collapse multi-collapse" id="${value.id}">
//         <div class="card card-body">
//         ${value.recipe}
//         </div>
//     </div>
// </div>
// </div>

// </div>
// </div>
// </div>`
                // tableTag += `<td>${value.id}</td>`;
                // tableTag += `<td>${value.username}</td>`;
                // tableTag += `<td>${value.name}</td>`;
                // tableTag += `<td>${value.ingredients}</td>`;
                // tableTag += `<td>${value.recipe}</td>`;

                // tableTag += `<td>`;
                // tableTag += `<button onclick="deleteUser('${value.username}')" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-alt"></i></button>`;
                // // tableTag += `<button type="button" class="ms-3 btn btn-sm btn-primary">Update</button>`;
                // tableTag += `<button onclick="updateUser('${value.username}', '${value.email}', '${value.address}')" type="button" data-bs-toggle="modal" data-bs-target="#userUpdateModal"
                //                     class="ms-3 btn btn-sm btn-primary"><i class="fa fa-edit"></i></button>`;
                // tableTag += `</td>`;

//                 tableTag += `</tr>`;
//             });


//             tableTag += `</tbody>`;

//             tableTag += `</table>`;

//             document.getElementById("usersData").innerHTML = tableTag;

//         }
//     }
//     http.open("GET", "/get-upload", true);
//     http.send();
// }

function getUpload() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.response);
            // console.log(JSON.parse(this.response));

            var response = JSON.parse(this.response);
            // console.log(response.length);

            var tableTag = `<table class="table table-dark table-hover align-middle text-danger">`;
            tableTag += `<thead><tr><th>ID</th><th>Username</th><th>Recipe Name</th><th>Ingredients</th><th>Recipe</th></tr></thead>`;

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

                // tableTag += `<td>`;
                // tableTag += `<button onclick="deleteUser('${value.username}')" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-alt"></i></button>`;
                // // tableTag += `<button type="button" class="ms-3 btn btn-sm btn-primary">Update</button>`;
                // tableTag += `<button onclick="updateUser('${value.username}', '${value.email}', '${value.address}')" type="button" data-bs-toggle="modal" data-bs-target="#userUpdateModal"
                //                     class="ms-3 btn btn-sm btn-primary"><i class="fa fa-edit"></i></button>`;
                // tableTag += `</td>`;

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

