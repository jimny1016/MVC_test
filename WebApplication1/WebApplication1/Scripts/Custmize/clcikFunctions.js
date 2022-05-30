
function clickFunctionsSetting() {
    $(".go-to-login-page").click(function () {
        showLoginRegisterBlock();
        loginRegisterButtonSetting(true);
    });
    $("#login-register-login-button").click(function () {
        loginRegisterButtonSetting(true);
    });
    $("#login-register-register-button").click(function () {
        loginRegisterButtonSetting(false);
    });
    //登入註冊按鈕
    $("#login-register-submit-button").click(function () {
        if (!IsEmail($('#login-register-account').val())) {
            alert("帳號不為正確之EMAIL格式。");
            return;
        }
        if ($('#login-register-password').val().includes(" ")) {
            alert("密碼不能有空白。");
            return;
        }
        if ($('#login-register-password').val().trim().length < 6) {
            alert("密碼長度不足6。");
            return;
        }
        var isRegister = $('#login-register-name-block').css('display') == 'block';
        if (isRegister && $('#login-register-name').val().trim().length < 1) {
            alert("請輸入姓名。");
            return;
        }

        if (isRegister) {
            $.when(ajaxRegister($('#login-register-account').val(), $('#login-register-password').val(), $('#login-register-name').val())).done(function (response) {
                console.log(response);
                if (!response.Success) {
                    alert('註冊失敗:' + response.Document);
                    return;
                }
                $("#member-id").data("memberid", response.Response[0].Id); 
                alert('註冊成功!');
            });
            
        }
    });    
}