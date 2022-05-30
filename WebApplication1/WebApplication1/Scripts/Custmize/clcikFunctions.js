
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
                if (!response.Success) {
                    alert('註冊失敗:' + response.Document);
                    return;
                }
                $("#member-id").data("memberid", response.Result[0].Id);
                $("#member-name").data("membername", response.Result[0].Name);
                alert('註冊成功!');
                showWelcomeBlock();
                return;
            });
        }
        else {
            $.when(ajaxLogin($('#login-register-account').val(), $('#login-register-password').val())).done(function (response) {
                if (!response.Success) {
                    alert('登入失敗:' + response.Document);
                    return;
                }
                $("#member-id").data("memberid", response.Result[0].Id);
                $("#member-name").data("membername", response.Result[0].Name);
                alert('登入成功!');
                showWelcomeBlock();
                return;
            });
        }

    });
    $("#findRoom").click(function () {
        $.when(ajaxFindRoom($("#checkindate").val())).done(function (response) {
            cleanRoomsTable();
            var expected_keys = { Title: true, ImageURL: true, Price: true };
            var tbl_body = document.createElement("tbody");
            $.each(response.Result, function () {
                var tbl_row = tbl_body.insertRow();
                $.each(this, function (k, v) {
                    if ((k in expected_keys) && expected_keys[k]) {
                        var cell = tbl_row.insertCell();
                        if (k == "ImageURL") {
                            var newImg = document.createElement("img");
                            newImg.src = v.toString();
                            newImg.width = 288;
                            newImg.height = 192;
                            cell.appendChild(newImg);
                        }
                        else {
                            cell.appendChild(document.createTextNode(v.toString()));
                        }
                    }
                });
                var cellbtn = tbl_row.insertCell();
                var createOrderListBtn = document.createElement("input");
                createOrderListBtn.type = "button";
                createOrderListBtn.value = "訂房";
                var targetRoomId = this.Id;
                var targetPrice = this.Price;
                createOrderListBtn.addEventListener("click", function () {
                    CreateOrderList(targetRoomId, $("#checkindate").val(), targetPrice);
                });
                cellbtn.appendChild(createOrderListBtn);
            });
            $("#findRoomResult").append(tbl_body);   //DOM table doesn't have .appendChild
        });
    });
    $(".go-to-search-page").click(function () {
        showRoomsBlock();
    });

    $("#go-to-my-account").click(function () {
        $.when(ajaxFindUsersOrderList($("#member-id").data("memberid"))).done(function (response) {
            cleanMyAccountOrderListTable();
            var tbl_body = document.createElement("tbody");
            $.each(response.Result, function () {
                var tbl_row = tbl_body.insertRow();

                var cell = tbl_row.insertCell();
                cell.appendChild(document.createTextNode(this.Room.Title.toString()));

                cell = tbl_row.insertCell();
                var newImg = document.createElement("img");
                newImg.src = this.Room.ImageURL.toString();
                newImg.width = 288;
                newImg.height = 192;
                cell.appendChild(newImg);

                cell = tbl_row.insertCell();
                cell.appendChild(document.createTextNode(this.OrderList.CheckingDate.toString()));

                cell = tbl_row.insertCell();
                cell.appendChild(document.createTextNode(this.Room.Price.toString()));

                //var cellbtn = tbl_row.insertCell();
                //var createOrderListBtn = document.createElement("input");
                //createOrderListBtn.type = "button";
                //createOrderListBtn.value = "訂房";
                //var targetRoomId = this.Id;
                //var targetPrice = this.Price;
                //createOrderListBtn.addEventListener("click", function () {
                //    CreateOrderList(targetRoomId, $("#checkindate").val(), targetPrice);
                //});
                //cellbtn.appendChild(createOrderListBtn);
            });
            $("#my-orderlist").append(tbl_body);   //DOM table doesn't have .appendChild
        });
    });
}
function CreateOrderList(roomId, checkingDate, price) {

    if (!$("#member-id").data("memberid")) {
        alert("您尚未登入。");
        $(".go-to-login-page").trigger("click");
        return;
    }

    $.when(ajaxCreatOrderList($("#member-id").data("memberid"), roomId, checkingDate, price)).done(function (response) {
        console.log(response);
        if (!response.Success) {
            alert('建立訂單失敗:' + response.Document);
            return;
        }
        showWelcomeBlock();
        alert('建立訂單成功!');
        return;
    });
}