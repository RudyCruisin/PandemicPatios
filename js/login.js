var ghLogin = document.getElementById("ghLogin");
ghLogin.addEventListener("click", () => {
    window.location.href = "/auth/github"
})

var fbLogin = document.getElementById("fb_button");
fbLogin.addEventListener("click", () => {
    window.location.href = "/auth/facebook"
})

var twitLogin = document.getElementById("twit_button");
twitLogin.addEventListener("click", () => {
    window.location.href = "/auth/twitter"    
})

var googLogin = document.getElementById("goog_button");
googLogin.addEventListener("click", () => {
    window.location.href = "/auth/google"    
})