// API
"use strict";

class API {

    post(data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                console.log("Success");
            }
        };
        xhr.open("POST", "todo", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }

    patch(data) {
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.status == 200) {
                console.log("Sucess");
            }
        };
        let id = data.id;
        delete data.id;
        xhr.open("PATCH", "todo/" + id, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
}