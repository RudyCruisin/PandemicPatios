window.onload = async e => {

    var userStatus = await fetchStatus("/user/status")

    if (userStatus == false) {
        $("#logoutButton").hide();
        $("#patioButton").hide();

    }
    else if (userStatus == true) {
        $("#loginButton").hide();
    }
}

async function fetchStatus(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}
