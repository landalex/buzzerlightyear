var ref = new Firebase("urlmao");

var buzzButton, resetButton, thisUser, userId;
window.onload = function() {
    buzzButton = document.getElementById("buzzButton");
    buzzButton.addEventListener("click", function() {
        ref.child("status").set({
            buttonClicked: true
        });
        buzzButton.setAttribute("disabled", "disabled");
    });

    resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function() {
        ref.child("status").set({
            buttonClicked: false
        });
    });
};

// ref.child("users").once('value', function(snapshot) {
//     var users = getUsersArray(snapshot.exportVal().users);
//     var numUsers = users.length;
//     thisUser = "User " + (numUsers + 1);
//     userRef.update( {
//         nickname: thisUser
//     });
//
//     document.createTextNode(thisUser);
// });
//
// var userRef = ref.child("users").push({nickname: "User"});
// userId = userRef.key();

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
