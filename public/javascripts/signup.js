

var UserSignup = () => {

    $("#SignupForm").validate();

     console.log($("#SignupForm").valid());

    // if ($("#SignupForm").valid()) {
    //
    //     var controls = document.getElementById("SignupForm").elements;
    //     console.log(controls);
    //     var formData = new FormData();
    //
    //     // for (var i = 0; i < controls.length; i++) {
    //     //     // console.log(controls[i].type);
    //     //     if (controls[i].type !== "button") {
    //     //         if (controls[i].type === "radio") {
    //     //             if (controls[i].checked) {
    //     //                 // console.log(controls[i].name, controls[i].value);
    //     //
    //     //                 formData.append(controls[i].name, controls[i].value);
    //     //             }
    //     //         } else {
    //     //             // console.log(controls[i].name, controls[i].value);
    //     //             formData.append(controls[i].name, controls[i].value);
    //     //         }
    //     //     }
    //
    //
    //
    //     // var http = new XMLHttpRequest();
    //     // http.onreadystatechange = function () {
    //     //     if (this.readyState == 4 && this.status == 200) {
    //     //         console.log(this.response);
    //     //
    //     //         var divTag = document.getElementById("response");
    //     //
    //     //         if (this.response == "exist") {
    //     //             divTag.className = `alert alert-danger`;
    //     //             divTag.innerText = `Username already exist.`;
    //     //         } else if (this.response == "notsame") {
    //     //             divTag.className = `alert alert-danger`;
    //     //             divTag.innerText = `Password & Confirm Password must be same.`;
    //     //         } else  {
    //     //             divTag.className = `alert alert-success`;
    //     //             divTag.innerText = `Signup Success`;
    //     //             document.getElementById("SignupForm").reset();
    //     //
    //     //             setTimeout(() => {
    //     //                 divTag.className = ``;
    //     //                 divTag.innerText = ``;
    //     //             }, 2000);
    //     //         }
    //     //
    //     //     }
    //     // }
    //     http.open("POST", "/sign", true);
    //     http.send(formData);
    // }

}