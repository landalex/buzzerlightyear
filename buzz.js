var buzzButton, resetButton, saveButton, buzzText;
var userName = "No Name";
var userId = "42";
window.onload = function() {
    buzzButton = document.getElementById("buzzButton");
    buzzButton.addEventListener("click", function() {
        setButton(true);
        buzzButton.setAttribute("disabled", "disabled");
    });

    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        setButton(false);
    });

    saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function() {
        var users, numUsers;
        ref.child("users").once('value', function(snapshot) {
            users = getUsersArray(snapshot.val());
            numUsers = users.length;
            userName = getUserName(users, numUsers);
            userId = ref.child("users").push({userName: userName}).key();
        });
    });

    buzzText = document.getElementById("buzzText");
};


ref.child("status").on('value', function(snapshot) {
    var status = snapshot.val();
    if (status.buttonClicked) {
        buzzButton.setAttribute("disabled", "disabled");
        if (status.userId === userId) {
            buzzText.style.visibility = "visible";
        }
        else {
            buzzText.style.visibility = "hidden";
        }
    }
    else {
        buzzButton.removeAttribute("disabled");
        buzzText.style.visibility = "hidden";
    }

});


function getUsersArray(userObj) {
	var users = [];
	for (var user in userObj) {
		users.push(userObj[user]);
	}
	return users;
}

function getUserName(users, numUsers) {
    var userInput = document.getElementById('user').value;
    if (userInput !== "") {
        return userInput;
    }
    else {
        return "User " + (numUsers + 1);
    }
}

function setButton(clicked) {
    ref.child("status").set({
        buttonClicked: clicked,
        user: userName,
        userId: userId
    });
}
