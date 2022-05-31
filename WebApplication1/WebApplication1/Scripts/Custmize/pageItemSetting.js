
function welcomeBlockSetting() {
    $(".go-to-search-page").hide();
    $("#go-to-my-account").hide();
    $(".go-to-login-page").hide();
    if ($("#member-id").data("memberid")) {
        $(".go-to-search-page").show();
        $("#go-to-my-account").show();
    }
    else {
        $(".go-to-login-page").show();
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
    $("#my-account-block").hide();
    $("#edit-orderlist-block").hide();    
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
function showMyAccountBlock() {
    allBlockHide();
    $("#my-account-block").show();
}
function showEditOrderListBlock() {
    allBlockHide();
    $("#edit-orderlist-block").show();
}
function cleanRoomsTable() {
    $("#findRoomResult").html('');
}
function cleanMyAccountOrderListTable() {
    $("#my-orderlist").html('');
}