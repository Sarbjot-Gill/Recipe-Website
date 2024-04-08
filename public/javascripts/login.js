var logIn = () => {


        $("#loginForm").validate();

        console.log($("#loginForm").valid());

        if ($("#loginForm").valid()) {

            var controls = document.getElementById("loginForm").elements;
            console.log(controls);
            var formData = new FormData();


            var http = new XMLHttpRequest()
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.response);

                    var divTag = document.getElementById("response");
                    if (this.response == "wrong") {
                        divTag.className = `alert alert-danger`;
                        divTag.innerText = `Wrong username password.`;
                    }
                }
            }




        }






}