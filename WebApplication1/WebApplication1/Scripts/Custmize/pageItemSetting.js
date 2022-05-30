
function welcomeBlockSetting() {
    if ($("#member-id").data("memberid")) {
        $(".go-to-login-page").hide();
    }
}
function loginRegisterButtonSetting(isLoginState) {
    $("#login-register-register-button").hide();
    $("#login-register-login-button").hide();
    $("#login-register-name-block").hide();
    if (isLoginState) {
        $('#login-register-title').text('登入');
        $("#login-register-register-button").show();
        return;
    }
    $('#login-register-title').text('註冊');
    $("#login-register-login-button").show();
    $("#login-register-name-block").show();
}
function allBlockHide() {
    $("#welcome-block").hide();
    $("#login-register-block").hide();
    $("#rooms-block").hide();
}
function showWelcomeBlock() {
    allBlockHide();
    welcomeBlockSetting();
    $("#welcome-block").show();
}
function showLoginRegisterBlock() {
    allBlockHide();
    $("#login-register-block").show();
}
function showRoomsBlock() {
    allBlockHide();
    cleanRoomsTable();
    $("#rooms-block").show();
}
function cleanRoomsTable() {
    $("#findRoomResult").html('');
}
function cleanMyAccountOrderListTable() {
    $("#my-orderlist").html('');
}