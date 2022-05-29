
(function ($) {
    $.extend($, {
        //Replace item[0][propName] to item[0].propName for MVC model binder
        postMvc: function (url, data, dataType) {
            return $.ajax({
                url: url,
                type: "POST", dataType: dataType,
                data: data,
                beforeSend: function (xhr, settings) {
                    settings.data =
                        settings.data.replace(/%5D%5B(.+?)%5D=/g, "%5D.$1=");
                }
            });
        }
    });
})(jQuery);
function ajaxRegister(Account, Password, Name) {
    return $.postMvc(
        "/Member/Register",
        { Account: Account, Password: Password, Name : Name },
        "json"
    );
}
function ajaxLogin(Account, Password) {
    return $.postMvc(
        "/Member/Login",
        { Account: Account, Password : Password },
        "json"
    );
}
function ajaxFindRoom(CheckingDate) {
    return $.postMvc(
        "/OrderList/FindRoom",
        { CheckingDate: CheckingDate },
        "json"
    );
}
function ajaxCreatOrderList(MemberId, RoomId, CheckingDate, Price) {
    return $.postMvc(
        "/OrderList/CreatOrderList",
        { MemberId: MemberId, RoomId: RoomId, CheckingDate: CheckingDate, Price : Price },
        "json"
    );
}
function ajaxEditOrderList(Id, CheckingDate) {
    return $.postMvc(
        "/OrderList/EditOrderList",
        { Id: Id, CheckingDate: CheckingDate },
        "json"
    );
}
function ajaxDeleteOrderList(Id) {
    return $.postMvc(
        "/OrderList/FindUsersOrderList",
        { Id: Id },
        "json"
    );
}
function ajaxFindUsersOrderList(memberId) {
    return $.postMvc(
        "/OrderList/FindUsersOrderList",
        { MemberId: memberId },
        "json"
    );
}