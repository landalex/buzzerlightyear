var buzzButton, resetButton, saveButton, userName;
window.onload = function() {
    buzzButton = document.getElementById("buzzButton");
    buzzButton.addEventListener("click", function() {
        ref.child("status").set({
            buttonClicked: true,
            user: userName
        });
        buzzButton.setAttribute("disabled", "disabled");
    });

    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        ref.child("status").set({
            buttonClicked: false,
            user: userName
        });
    });

    saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function() {
        var users, numUsers;
        ref.child("users").once('value', function(snapshot) {
            users = getUsersArray(snapshot.val());
            numUsers = users.length;
            userName = getUserName(users, numUsers);
            ref.child("users").push({userName: userName});
        });
    })
};


ref.child("status").on('value', function(snapshot) {
    var status = snapshot.val();
    if (status.buttonClicked) {
        buzzButton.setAttribute("disabled", "disabled");
    }
    else {
        buzzButton.removeAttribute("disabled");
    }
});


function getUsersArray(userObj) {
	var users = [];
	for (user in userObj) {
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
