(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+XlM":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function ChatComponent_button_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Start CHATTING");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ChatComponent {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.eventStreamInfo = {
            from: 'END'
        };
        this.chattingbutton = true;
        this.memberInfo = [];
        this.number = this.route.snapshot.paramMap.get('id');
        console.log(this.number);
        localStorage.setItem('nav', 'off');
    }
    ngOnInit() {
        localStorage.setItem('nav', 'off');
        this.connect();
    }
    onLoggedIn(data) {
        const self = this;
        console.log('hello world from onloggedin');
        console.log('from onloggedin', data);
        self.accountInfo = data;
        this.longpollEventStream();
        self.getCurrentRoomList();
        $('.roomListDashboard').css({ visibility: 'visible' });
        $('.roomContents').css({ visibility: 'visible' });
        $('.signUp').css({ display: 'none' });
    }
    // tslint:disable-next-line:typedef
    sendnotice() {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        $.ajax({
            url: 'http://23.96.36.35:3000/webhook',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                // @ts-ignore
                username: this.currentUser.username,
                // @ts-ignore
                password: this.currentUser.password,
                // @ts-ignore
                auth: { session: self.sessionid, type: 'm.login.dummy' },
                inhibit_login: false
            }),
            dataType: 'json',
            success(data) {
                console.log(data, 'after registering');
            },
            // tslint:disable-next-line:typedef
            error(err) {
                let msg = 'Is the homeserver running?';
                const errJson = $.parseJSON(err.responseText);
                if (errJson !== null) {
                    msg = errJson.error;
                }
                alert('Unable to register: ' + msg);
            }
        });
    }
    connect() {
        const self = this;
        // @ts-ignore
        const user = localStorage.getItem('user');
        // @ts-ignore
        const password = localStorage.getItem('password');
        // @ts-ignore
        $.ajax({
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user, password, type: 'm.login.password' }),
            dataType: 'json',
            success(data) {
                self.onLoggedIn(data);
            },
            error(err) {
                alert('Unable to login: is the homeserver running?');
            }
        });
    }
    register() {
        // @ts-ignore
        $.ajax({
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/register?kind=user',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                // @ts-ignore
                username: this.currentUser.username,
                // @ts-ignore
                password: this.currentUser.password,
                type: 'm.login.password'
            }),
            dataType: 'json',
            success(data) {
                console.log(data, 'sessionId');
                self.sessionid = data.auth.session;
            },
            error(err) {
                self.sessionid = this.data.auth.session;
                $.ajax({
                    url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/register?kind=user',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        username: this.currentUser.username,
                        password: this.currentUser.password,
                        auth: { session: self.sessionid, type: 'm.login.dummy' },
                        inhibit_login: false
                    }),
                    dataType: 'json',
                    success(data) {
                        console.log(data, 'after registering');
                    },
                    error(err) {
                        let msg = 'Is the homeserver running?';
                        const errJson = $.parseJSON(err.responseText);
                        if (errJson !== null) {
                            msg = errJson.error;
                        }
                        alert('Unable to register: ' + msg);
                    }
                });
                this.onLoggedIn(this.data);
            }
        });
        const self = this;
        console.log(self.currentUser, 'self');
        console.log(this.currentUser, 'this');
        $.ajax({
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/register?kind=user',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                // @ts-ignore
                username: this.currentUser.username,
                // @ts-ignore
                password: this.currentUser.password,
                auth: { session: self.sessionid, type: 'm.login.dummy' },
                inhibit_login: false
            }),
            dataType: 'json',
            success(data) {
                console.log(data, 'after registering');
                self.onLoggedIn(data);
            },
            error(err) {
                let msg = 'Is the homeserver running?';
                const errJson = $.parseJSON(err.responseText);
                if (errJson !== null) {
                    msg = errJson.error;
                }
                alert('Unable to register: ' + msg);
            }
        });
    }
    longpollEventStream() {
        const self = this;
        const eventStreamInfo = {
            from: 'END'
        };
        let url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/events?access_token=$token&from=$from';
        console.log(eventStreamInfo, 'this');
        // @ts-ignore
        url = url.replace('$token', self.accountInfo.access_token);
        url = url.replace('$from', eventStreamInfo.from);
        $.getJSON(url, (data) => {
            eventStreamInfo.from = data.end;
            console.log('data.end', data.end);
            let hasNewLatestMessage = false;
            let updatedMemberList = false;
            let i = 0;
            let j = 0;
            for (i = 0; i < data.chunk.length; ++i) {
                console.log('inside function longpollevent1');
                if (data.chunk[i].type === 'm.room.message') {
                    console.log('Got new message: ' + JSON.stringify(data.chunk[i]));
                    if (self.viewingRoomId === data.chunk[i].room_id) {
                        console.log('is it here or something1');
                        self.addMessage(data.chunk[i]);
                    }
                    // @ts-ignore
                    for (j = 0; j < self.roomInfo.length; ++j) {
                        console.log('inside function longpollevent2');
                        // @ts-ignore
                        if (self.roomInfo[j].room_id === data.chunk[i].room_id) {
                            // @ts-ignore
                            self.roomInfo[j].latest_message = data.chunk[i].content.body;
                            hasNewLatestMessage = true;
                        }
                    }
                }
                else if (data.chunk[i].type === 'm.room.member') {
                    console.log('inside function longpollevent3');
                    if (self.viewingRoomId === data.chunk[i].room_id) {
                        console.log('Got new member: ' + JSON.stringify(data.chunk[i]));
                        self.addMessage(data.chunk[i]);
                        for (j = 0; j < self.memberInfo.length; ++j) {
                            // @ts-ignore
                            if (self.memberInfo[j].state_key === data.chunk[i].state_key) {
                                // @ts-ignore
                                self.memberInfo[j] = data.chunk[i];
                                updatedMemberList = true;
                                break;
                            }
                        }
                        if (!updatedMemberList) {
                            console.log('inside function longpollevent3');
                            // @ts-ignore
                            self.memberInfo.push(data.chunk[i]);
                            updatedMemberList = true;
                        }
                    }
                    // @ts-ignore
                    if (data.chunk[i].state_key === self.accountInfo.user_id) {
                        console.log('inside function longpollevent4');
                        self.getCurrentRoomList(); // update our join/invite list
                    }
                }
                else {
                    console.log('Discarding: ' + JSON.stringify(data.chunk[i]));
                }
            }
            if (hasNewLatestMessage) {
                self.setRooms(self.roomInfo);
                console.log('is it here or something2');
            }
            if (updatedMemberList) {
                $('#members').empty();
                for (i = 0; i < this.memberInfo.length; ++i) {
                    self.addMember(this.memberInfo[i]);
                }
            }
            self.longpollEventStream();
            // tslint:disable-next-line:only-arrow-functions
        }).fail(function (err) {
            console.log('it failed so its reloading lol');
            // @ts-ignore
            setTimeout(self.longpollEventStream(), 5000);
        });
    }
    // ************** Creating a room ******************
    createroom() {
        const self = this;
        $(document).on('click', '.createRoom', function () {
            const roomAlias = $('#roomAlias').val();
            const data = {
                room_alias_name: undefined
            };
            // @ts-ignore
            if (roomAlias.length > 0) {
                // @ts-ignore
                data.room_alias_name = roomAlias;
            }
            // @ts-ignore
            $.ajax({
                // @ts-ignore
                url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/createRoom?access_token=' + self.accountInfo.access_token,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                dataType: 'json',
                success(response) {
                    console.log('inside function createroom1');
                    $('#roomAlias').val('');
                    response.membership = 'join'; // you are automatically joined into every room you make.
                    response.latest_message = '';
                    // @ts-ignore
                    self.roomInfo.push(response);
                    self.setRooms(self.roomInfo);
                },
                error(err) {
                    alert(JSON.stringify($.parseJSON(err.responseText)));
                }
            });
        });
    }
    // ************** Getting current state **************
    getCurrentRoomList() {
        const self = this;
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/initialSync?access_token=' + self.accountInfo.access_token + '&limit=1';
        $.getJSON(url, function (data) {
            const rooms = data.rooms;
            for (let i = 0; i < rooms.length; ++i) {
                if ('messages' in rooms[i]) {
                    console.log('inside function getroomlist');
                    rooms[i].latest_message = rooms[i].messages.chunk[0].content.body;
                }
            }
            self.roomInfo = rooms;
            self.setRooms(self.roomInfo);
            // @ts-ignore
            // tslint:disable-next-line:only-arrow-functions
        }).fail(function (err) {
            alert(JSON.stringify($.parseJSON(err.responseText)));
        });
    }
    loadRoomContent(roomId) {
        const self = this;
        console.log('loadRoomContent ' + roomId);
        self.viewingRoomId = roomId;
        console.log('the assignment to the viewing room id is here', roomId, this.viewingRoomId);
        $('#roomName').text('Room: ' + roomId);
        $('.sendMessageForm').css({ visibility: 'visible' });
        this.getMessages(roomId);
        this.getMemberList(roomId);
    }
    getMessages(roomId) {
        const self = this;
        $('#messages').empty();
        // @ts-ignore
        // @ts-ignore
        const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/' + encodeURIComponent(roomId) + '/messages?access_token=' + self.accountInfo.access_token + '&from=END&dir=b&limit=10';
        // tslint:disable-next-line:only-arrow-functions
        $.getJSON(url, function (data) {
            for (let i = data.chunk.length - 1; i >= 0; --i) {
                console.log('inside function getmessages');
                self.addMessage(data.chunk[i]);
            }
        });
    }
    idk() {
        const roomId = this.number;
        console.log('can it see the room id?', roomId);
        const membership = $(this).find('td:eq(1)').text();
        if (membership !== 'join') {
            console.log('Joining room ' + roomId);
            let url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/$roomid/join?access_token=$token';
            // @ts-ignore
            url = url.replace('$token', self.accountInfo.access_token);
            // @ts-ignore
            url = url.replace('$roomid', encodeURIComponent(roomId));
            $.ajax({
                url,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ membership: 'join' }),
                dataType: 'json',
                success(data) {
                    console.log('is it here ya omar2');
                    this.loadRoomContent(roomId);
                    this.getCurrentRoomList();
                },
                error(err) {
                    alert(JSON.stringify($.parseJSON(err.responseText)));
                }
            });
        }
        else {
            // @ts-ignore
            this.loadRoomContent(roomId);
        }
    }
    getMemberList(roomId) {
        const self = this;
        $('#members').empty();
        self.memberInfo = [];
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/' + encodeURIComponent(roomId) + '/members?access_token=' + self.accountInfo.access_token;
        $.getJSON(url, function (data) {
            for (let i = 0; i < data.chunk.length; ++i) {
                console.log('inside function getmemberlist');
                // @ts-ignore
                self.memberInfo.push(data.chunk[i]);
                self.addMember(data.chunk[i]);
            }
        });
    }
    // ************** Sending messages **************
    clickSend() {
        const self = this;
        $(document).on('click', '.sendMessage', function () {
            if (self.viewingRoomId === undefined) {
                console.log(self.viewingRoomId);
                alert('There is no room to send a message to!');
                return;
            }
            const body = $('#body').val();
            self.sendMessage(self.viewingRoomId, body);
        });
    }
    clicksendRequest() {
        const self = this;
        $(document).on('click', '.sendRequest', function () {
            if (self.viewingRoomId === undefined) {
                alert('There is no room to send a message to!');
                return;
            }
            const body = 'Doctor has requested you to make a CBD Blood exam';
            self.sendMessage(self.viewingRoomId, body);
        });
    }
    sendMessage(roomId, body) {
        const self = this;
        const msgId = $.now();
        let url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/$roomid/send/m.room.message?access_token=$token';
        // @ts-ignore
        url = url.replace('$token', self.accountInfo.access_token);
        url = url.replace('$roomid', encodeURIComponent(roomId));
        const data = {
            msgtype: 'm.text',
            body
        };
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            // tslint:disable-next-line:no-shadowed-variable
            success(data) {
                $('#body').val('');
            },
            error(err) {
                alert(JSON.stringify($.parseJSON(err.responseText)));
            }
        });
    }
    sendMessageRequest(roomId, body) {
        const self = this;
        const msgId = $.now();
        let url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/$roomid/send/m.room.message?access_token=$token';
        // @ts-ignore
        url = url.replace('$token', self.accountInfo.access_token);
        url = url.replace('$roomid', encodeURIComponent(roomId));
        const data = {
            msgtype: 'm.text',
            body: 'hello world automatic response'
        };
        $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            success(data) {
                $('#body').val('');
            },
            error(err) {
                alert(JSON.stringify($.parseJSON(err.responseText)));
            }
        });
    }
    // ************** Navigation and DOM manipulation **************
    setRooms(roomList) {
        const self = this;
        // wipe existing entries
        $('#rooms').find('tr:gt(0)').remove();
        let rows = '';
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < roomList.length; ++i) {
            let row;
            if (roomList != null) {
                row = '<tr>' +
                    '<td>' + roomList[i].room_id + '</td>' +
                    '<td>' + roomList[i].membership + '</td>' +
                    '<td>' + roomList[i].latest_message + '</td>' +
                    '</tr>';
            }
            rows += row;
            console.log('got into set rooms function');
        }
        $('#rooms').append(rows);
        $('.button').click(() => {
            this.chattingbutton = false;
            console.log('is it here ya omar1');
            // const roomId = $(this).find('td:eq(0)').text();
            const roomId = this.number;
            console.log('can it see the room id?', roomId);
            const membership = $(this).find('td:eq(1)').text();
            if (membership !== 'join') {
                console.log('Joining room ' + roomId);
                let url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/$roomid/join?access_token=$token';
                // @ts-ignore
                url = url.replace('$token', self.accountInfo.access_token);
                // @ts-ignore
                url = url.replace('$roomid', encodeURIComponent(roomId));
                $.ajax({
                    url,
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ membership: 'join' }),
                    dataType: 'json',
                    success(data) {
                        console.log('is it here ya omar2');
                        // @ts-ignore
                        self.loadRoomContent(roomId);
                        self.getCurrentRoomList();
                    },
                    error(err) {
                        alert(JSON.stringify($.parseJSON(err.responseText)));
                    }
                });
            }
            else {
                // @ts-ignore
                self.loadRoomContent(roomId);
            }
        });
    }
    // tslint:disable-next-line:max-line-length
    addMessage(data) {
        const self = this;
        let msg = data.content.body;
        if (data.type === 'm.room.member') {
            if (data.content.membership === undefined) {
                return;
            }
            if (data.content.membership === 'invite') {
                msg = '<em>invited ' + data.state_key + ' to the room</em>';
            }
            else if (data.content.membership === 'join') {
                msg = '<em>joined the room</em>';
            }
            else if (data.content.membership === 'leave') {
                msg = '<em>left the room</em>';
            }
            else if (data.content.membership === 'ban') {
                msg = '<em>was banned from the room</em>';
            }
        }
        if (msg === undefined) {
            return;
        }
        //     var row = "                                        <li class=\"media received\">\n" +
        //         "                                            <div class=\"media-body\">\n" +
        //         "                                                <div class=\"msg-box\">\n" +
        //         "                                                    <div>" +
        //         "<p>" + msg + "</p>" +
        //         "                                                  <ul class=\"chat-msg-info\">\n" +
        //         "                                                            <li>\n" +
        //         "                                                                <div class=\"chat-time\">\n" +
        //         "                                                                    <span>" + data.user_id + "</span>\n" +
        //         "                                                                </div>\n" +
        //         "                                                            </li>\n" +
        //         "                                                        </ul>" +
        //         "                                                    </div>\n" +
        //         "                                                </div>\n" +
        //         "                                            </div>\n" +
        //         "                                        </li>";
        //     $("#messages").append(row);
        // }else{
        //     var row = "                                        <li class=\"media sent\">\n" +
        //         "                                            <div class=\"media-body\">\n" +
        //         "                                                <div class=\"msg-box\">\n" +
        //         "                                                    <div>" +
        //         "<p>" + msg + "</p>" +
        //         "                                                  <ul class=\"chat-msg-info\">\n" +
        //         "                                                            <li>\n" +
        //         "                                                                <div class=\"chat-time\">\n" +
        //         "                                                                    <span>" + data.user_id + "</span>\n" +
        //         "                                                                </div>\n" +
        //         "                                                            </li>\n" +
        //         "                                                        </ul>" +
        //         "                                                    </div>\n" +
        //         "                                                </div>\n" +
        //         "                                            </div>\n" +
        //         "                                        </li>";
        //     $("#messages").append(row);
        // @ts-ignore
        if (data.user_id !== self.accountInfo.user_id && data.content.msgtype !== 'm.image' && data.sender !== '@drbot:yashfiichat.eastus.cloudapp.azure.com') {
            const row = ' <li>\n' +
                '                        <div class="chat__time">1 Minute ago</div>\n' +
                '                        <div class="chat__bubble chat__bubble--you">'
                + msg +
                '                                            </div>\n' +
                '                                        </li>';
            $('#messages').append(row);
        }
        else if (data.content.msgtype === 'm.image') {
            console.log('it sees that its an image');
            const link = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/media/r0/thumbnail/yashfiichat.eastus.cloudapp.azure.com/';
            const urllink = data.content.url.substring(data.content.url.lastIndexOf('com/') + 4);
            const widthheightscale = '?width=200&height=200&method=scale';
            const row = ' <li>\n' +
                '                        <div class="chat__time">1 Minute ago</div>\n' +
                '                        <div class="chat__bubble chat__bubble--you">' + '<img src="' + link +
                urllink + widthheightscale + '"' + '\>' + '</br>' +
                '                                            </div>\n' +
                '                                        </li>';
            console.log(link, 'the link');
            console.log(row, 'the row');
            $('#messages').append(row);
        }
        else if (data.sender == '@drbot:yashfiichat.eastus.cloudapp.azure.com') {
            const row = ' <li>\n' +
                '                        <div class="chat__bubble chat__bubble--me" style="margin: 0 auto;\n' +
                '    background: red;\n' +
                '    color: white;\n' +
                '    font-style: italic;\n' +
                '    font-size: 17px;">'
                + msg +
                '                                            </div>\n' +
                '                                        </li>';
            $('#messages').
                append(row);
        }
        else {
            const row = ' <li>\n' +
                '                        <div class="chat__time">1 Minute ago</div>\n' +
                '                        <div class="chat__bubble chat__bubble--me">'
                + msg +
                '                                            </div>\n' +
                '                                        </li>';
            $('#messages').
                append(row);
        }
    }
    // /AlqPFHkTiUfTCrIzWwTsAPdT?width=200&height=200&method=scale
    addMember(data) {
        const row = '<tr>' +
            '<td>' + data.state_key + '</td>' +
            '<td>' + data.content.membership + '</td>' +
            '</tr>';
        $('#members').append(row);
    }
}
ChatComponent.ɵfac = function ChatComponent_Factory(t) { return new (t || ChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
ChatComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatComponent, selectors: [["app-chat"]], decls: 42, vars: 1, consts: [[1, "chat", "col-12", "col-md-12", "col-lg-12", "col-xl-12", "px-0", "pl-md-1"], [1, "chat__container"], [1, "chat__wrapper", "py-2", "pt-mb-2", "pb-md-3"], [1, "chat__messaging", "messaging-member--online", "pb-2", "pb-md-2", "pl-2", "pl-md-4", "pr-2"], [1, "chat__previous", "d-flex", "d-md-none"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 45.5 30.4", 1, "svg-icon", "svg-icon--previous"], ["d", "M43.5,13.1H7l9.7-9.6A2.1,2.1,0,1,0,13.8.6L.9,13.5h0L.3,14v.6c0,.1-.1.1-.1.2v.4a2,2,0,0,0,.6,1.5l.3.3L13.8,29.8a2.1,2.1,0,1,0,2.9-2.9L7,17.2H43.5a2,2,0,0,0,2-2A2.1,2.1,0,0,0,43.5,13.1Z", "fill", "#f68b3c"], [1, "chat__notification", "d-flex", "d-md-none", "chat__notification--new"], [1, "chat__infos", "pl-2", "pl-md-0"], ["data-online", "true", 1, "chat-member__wrapper", 2, "justify-content", "center"], [1, "chat-member__avatar"], ["src", "assets/img/patient4.png", "alt", "Jenny Smith", "loading", "lazy"], [1, "user-status", "user-status--large"], [1, "chat-member__details"], [1, "chat-member__name"], [1, "chat-member__status"], [2, "background-color", "#b7fe9c"], [1, "text-center"], [1, "chat__content", "pt-4", "px-3", "messageWrapper", 2, "padding", "0px !important"], ["id", "messages", 1, "chat__list-messages", 2, "background", "#f1feea", "margin-bottom", "0px"], [1, "chat__send-container", "px-2", "px-md-3", "pt-1", "pt-md-3", 2, "margin-top", "0", "padding-top", "0 !important", "padding", "0px !important"], [1, "custom-form__send-wrapper"], ["type", "text", "placeholder", "Write a message! ", "id", "body", "autocomplete", "off", 1, "textEntry", 2, "width", "100%", "height", "60px"], [1, "custom-form__send-img"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 45.7 45.7", 1, "svg-icon", "svg-icon--send-img"], ["d", "M6.6,45.7A6.7,6.7,0,0,1,0,39.1V6.6A6.7,6.7,0,0,1,6.6,0H39.1a6.7,6.7,0,0,1,6.6,6.6V39.1h0a6.7,6.7,0,0,1-6.6,6.6ZM39,4H6.6A2.6,2.6,0,0,0,4,6.6V39.1a2.6,2.6,0,0,0,2.6,2.6H39.1a2.6,2.6,0,0,0,2.6-2.6V6.6A2.7,2.7,0,0,0,39,4Zm4.7,35.1Zm-4.6-.4H6.6a2.1,2.1,0,0,1-1.8-1.1,2,2,0,0,1,.3-2.1l8.1-10.4a1.8,1.8,0,0,1,1.5-.8,2.4,2.4,0,0,1,1.6.7l4.2,5.1,6.6-8.5a1.8,1.8,0,0,1,1.6-.8,1.8,1.8,0,0,1,1.5.8L40.7,35.5a2,2,0,0,1,.1,2.1A1.8,1.8,0,0,1,39.1,38.7Zm-17.2-4H35.1l-6.5-8.6-6.5,8.4C22,34.6,22,34.7,21.9,34.7Zm-11.2,0H19l-4.2-5.1Z", "fill", "#f68b3c"], [1, "custom-form__send-emoji"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 46.2 46.2", 1, "svg-icon", "svg-icon--send-emoji"], ["d", "M23.1,0A23.1,23.1,0,1,0,46.2,23.1,23.1,23.1,0,0,0,23.1,0Zm0,41.6A18.5,18.5,0,1,1,41.6,23.1,18.5,18.5,0,0,1,23.1,41.6Zm8.1-20.8a3.5,3.5,0,0,0,3.5-3.5,3.5,3.5,0,0,0-7,0,3.5,3.5,0,0,0,3.5,3.5ZM15,20.8a3.5,3.5,0,0,0,3.5-3.5A3.5,3.5,0,0,0,15,13.9a3.4,3.4,0,0,0-3.4,3.4A3.5,3.5,0,0,0,15,20.8Zm8.1,15a12.6,12.6,0,0,0,10.5-5.5,1.7,1.7,0,0,0-1.3-2.6H14a1.7,1.7,0,0,0-1.4,2.6A12.9,12.9,0,0,0,23.1,35.8Z", "fill", "#f68b3c"], ["type", "submit", "id", "sendMsg", 1, "custom-form__send-submit", "sendMessage", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 45.6 45.6", 1, "svg-icon", "svg-icon--send"], ["d", "M20.7,26.7a1.4,1.4,0,0,1-1.2-.6,1.6,1.6,0,0,1,0-2.4L42.6.5a1.8,1.8,0,0,1,2.5,0,1.8,1.8,0,0,1,0,2.5L21.9,26.1A1.6,1.6,0,0,1,20.7,26.7Z", "fill", "#d87232"], ["d", "M29.1,45.6a1.8,1.8,0,0,1-1.6-1L19.4,26.2,1,18.1a1.9,1.9,0,0,1-1-1.7,1.8,1.8,0,0,1,1.2-1.6L43.3.1a1.7,1.7,0,0,1,1.8.4,1.7,1.7,0,0,1,.4,1.8L30.8,44.4a1.8,1.8,0,0,1-1.6,1.2ZM6.5,16.7l14.9,6.6a2,2,0,0,1,.9.9l6.6,14.9L41,4.6Z", "fill", "#d87232"], ["class", "button", 4, "ngIf"], [1, "button"]], template: function ChatComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Consultant");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Online");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h3", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Request");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "ul", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "svg", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "svg", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatComponent_Template_button_click_36_listener() { return ctx.clickSend(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "svg", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "path", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "path", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, ChatComponent_button_41_Template, 2, 0, "button", 33);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.chattingbutton);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], styles: ["@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\");\n\n[_ngcontent-%COMP%]:root {\n  --bg-page: #ffffff;\n  --bg-page-darker: #f7f7f7;\n  --bg-page-darkest: #b3b3b3;\n  --colour-primary: #3996fb;\n  --colour-primary-lightest: #e8f3ff;\n  --colour-primary-darker: #1a7ee6;\n  --colour-third: #419d78;\n  --colour-third-lighter: #7bc9aa;\n  --colour-third-lightest: #e6f7f0;\n  --colour-text: #696969;\n  --colour-text-lighter: #9b9b9b;\n  --colour-text-darker: #626262;\n  --colour-text-darkest: #363636;\n  --border-color: #e8e7e7;\n  --form-radius: 13px;\n  --search-form-bg-colour: #f2f2f2;\n  --send-form-bg-colour: #f2f2f2;\n  --send-btn-box-shadow-colour: #7bbafd;\n  --chat-bubble-me: #f2f2f2;\n  --chat-bubble-you: var(--colour-primary);\n}\n.dark-mode[_ngcontent-%COMP%] {\n  --bg-page: #1a1a1a;\n  --bg-page-darker: #363636;\n  --bg-page-darkest: #818181;\n  --colour-primary: #1a71d0;\n  --colour-primary-lightest: #202c3a;\n  --colour-primary-darker: #449ffd;\n  --colour-third: #41c590;\n  --colour-third-lighter: #56d6a3;\n  --colour-third-lightest: #272f2c;\n  --colour-text: #c7c7c7;\n  --colour-text-lighter: #868686;\n  --colour-text-darker: #dcdcdc;\n  --colour-text-darkest: #eaeaea;\n  --border-color: #4c4c4c;\n  --search-form-bg-colour: #363636;\n  --send-form-bg-colour: #363636;\n  --send-btn-box-shadow-colour: #44515f;\n  --chat-bubble-me: #363636;\n  --chat-bubble-you: var(--colour-primary);\n}\n\n*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nhtml[_ngcontent-%COMP%] {\n  scroll-behavior: smooth;\n}\nbody[_ngcontent-%COMP%] {\n  -webkit-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-family: \"Inter\", sans-serif;\n  font-weight: normal;\n  color: var(--colour-text);\n  background-color: var(--bg-page);\n}\n\n\n.messages-page[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n.messages-page__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.messages-page__title[_ngcontent-%COMP%] {\n  color: var(--colour-text-darker);\n  font-weight: bold;\n  font-size: 1.5rem;\n}\n@media screen and (max-width: 1199px) {\n  .messages-page__title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.messages-page__dark-mode-toogler[_ngcontent-%COMP%] {\n  width: 2.6rem;\n  height: 2.6rem;\n  padding: 0.35rem;\n  border-radius: 50%;\n  border: 1px solid var(--border-color);\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.messages-page__dark-mode-toogler[_ngcontent-%COMP%]:hover {\n  background-color: var(--colour-primary);\n  border-color: var(--colour-primary);\n}\n.messages-page__dark-mode-toogler[_ngcontent-%COMP%]:hover   path[_ngcontent-%COMP%] {\n  fill: var(--bg-page-darker);\n}\n.messages-page__list[_ngcontent-%COMP%] {\n  list-style: none;\n  flex-grow: 1;\n  overflow-y: auto;\n}\n.messages-page__list-scroll[_ngcontent-%COMP%] {\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.custom-form[_ngcontent-%COMP%] {\n  color: var(--colour-text-darkest);\n  padding: 1.5rem;\n  border-radius: 13px;\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%], .custom-form__send-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, .custom-form__send-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--colour-text-lighter);\n  font-size: 0.9rem;\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .custom-form__send-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: none;\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 3rem;\n  background-color: var(--search-form-bg-colour);\n  border: 1px solid var(--bg-page);\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:placeholder-shown {\n  background-color: var(--search-form-bg-colour);\n  border: 1px solid var(--bg-page);\n}\n.custom-form__search-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  background-color: var(--bg-page);\n  border-color: var(--border-color);\n  color: var(--colour-text);\n}\n.custom-form__send-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 6rem;\n  padding-left: 3.25rem;\n  background-color: var(--send-form-bg-colour);\n  border: none;\n}\n.custom-form__send-wrapper[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  background-color: var(--send-form-bg-colour);\n  border-color: transparent;\n  color: var(--colour-text);\n}\n.custom-form__search-submit[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 3.5rem;\n  cursor: pointer;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.custom-form__search-submit[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border: none;\n}\n.custom-form__send-submit[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 0.5rem;\n  transform: translateY(-50%);\n  height: 2.3rem;\n  width: 2.3rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--colour-primary);\n  border-radius: 50%;\n  box-shadow: 0 3px 3px var(--send-btn-box-shadow-colour);\n  border: none;\n  outline: none;\n  text-align: center;\n  font-size: 1.2rem;\n  padding-top: 0.3rem;\n  color: white;\n  padding-right: 0.1rem;\n}\n.custom-form__send-submit[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border: none;\n}\n.custom-form__send-submit[_ngcontent-%COMP%]:hover {\n  background-color: var(--colour-primary-darker);\n}\n.custom-form__send-img[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 0.5rem;\n  transform: translateY(-50%);\n  width: 2.3rem;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.custom-form__send-emoji[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 3.2rem;\n  transform: translateY(-50%);\n  width: 2.3rem;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.messaging-member[_ngcontent-%COMP%] {\n  border-radius: var(--form-radius);\n}\n.messaging-member[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-page-darker);\n}\n.messaging-member--new[_ngcontent-%COMP%]   .messaging-member__name[_ngcontent-%COMP%] {\n  color: var(--colour-text-darker);\n}\n.messaging-member--new[_ngcontent-%COMP%]   .messaging-member__message[_ngcontent-%COMP%] {\n  color: var(--colour-text-darker);\n  font-weight: bold;\n}\n.messaging-member--online[_ngcontent-%COMP%]   .user-status[_ngcontent-%COMP%] {\n  background-color: var(--colour-third-lighter);\n}\n.messaging-member--active[_ngcontent-%COMP%] {\n  background-color: var(--colour-primary-lightest);\n}\n.messaging-member--active[_ngcontent-%COMP%]:hover {\n  background-color: var(--colour-primary-lightest);\n}\n@media screen and (max-width: 767px) {\n  .messaging-member--active[_ngcontent-%COMP%] {\n    background-color: var(--bg-page);\n  }\n\n  .messaging-member--active[_ngcontent-%COMP%]:hover {\n    background-color: var(--bg-page-darker);\n  }\n}\n.messaging-member__wrapper[_ngcontent-%COMP%] {\n  cursor: pointer;\n  padding: 0.5rem 1rem;\n  border-radius: var(--form-radius);\n  display: grid;\n  grid-template-columns: 4rem 4fr;\n  grid-template-rows: 2rem 2rem;\n  column-gap: 1rem;\n  grid-template-areas: \"avatar     name\" \"avatar     message\";\n}\n@media screen and (max-width: 1199px) {\n  .messaging-member__wrapper[_ngcontent-%COMP%] {\n    grid-template-columns: 3.5rem 1fr;\n    grid-template-rows: 1.75rem 1.75rem;\n  }\n}\n@media screen and (max-width: 991px) {\n  .messaging-member__wrapper[_ngcontent-%COMP%] {\n    grid-template-columns: 3.2rem 1fr;\n    grid-template-rows: 1.75rem 1.75rem;\n  }\n}\n.messaging-member__avatar[_ngcontent-%COMP%] {\n  grid-area: avatar;\n  position: relative;\n}\n.messaging-member__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  width: 100%;\n}\n.messaging-member__name[_ngcontent-%COMP%] {\n  font-weight: bold;\n  grid-area: name;\n  color: var(--colour-text-darker);\n  margin-top: auto;\n  font-size: 0.9rem;\n}\n.messaging-member__message[_ngcontent-%COMP%] {\n  grid-area: message;\n  white-space: nowrap;\n  word-break: break-word;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 0.9rem;\n}\n.chat[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n.chat__container[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n.chat__wrapper[_ngcontent-%COMP%] {\n  background-color: var(--bg-page);\n  height: 100%;\n  width: 100%;\n  border-left: 1px solid var(--border-color);\n  border-right: 1px solid var(--border-color);\n  overflow: hidden;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n@media screen and (max-width: 767px) {\n  .chat__wrapper[_ngcontent-%COMP%] {\n    border-left: none;\n    border-right: none;\n  }\n}\n.chat__messaging[_ngcontent-%COMP%] {\n  width: 100%;\n  border-bottom: 1px solid var(--border-color);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.chat__previous[_ngcontent-%COMP%] {\n  width: 8%;\n  min-width: 2rem;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.7rem;\n  cursor: pointer;\n  color: var(--colour-primary);\n}\n.chat__notification[_ngcontent-%COMP%] {\n  width: 4%;\n  min-width: 1.5rem;\n}\n.chat__notification[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: none;\n  width: 1.4rem;\n  height: 1.4rem;\n  text-align: center;\n  border-radius: 50%;\n  font-weight: bold;\n  color: white;\n  background-color: var(--colour-primary);\n  font-size: 0.9rem;\n}\n.chat__notification--new[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.chat__infos[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.chat__actions[_ngcontent-%COMP%] {\n  font-size: 5px;\n  height: 2rem;\n  min-width: 2rem;\n  color: var(--colour-primary);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n.chat__actions[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n}\n.chat__actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  width: 2.6rem;\n  height: 2.6rem;\n  padding: 0.35rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  background-color: var(--bg-page);\n}\n.chat__actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    + li[_ngcontent-%COMP%] {\n  margin-left: 0.3rem;\n}\n.chat__actions[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background-color: var(--colour-primary-lightest);\n}\n.chat__content[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow-y: auto;\n}\n.chat__list-messages[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n.chat__list-messages[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.7rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.chat__list-messages[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .chat__bubble[_ngcontent-%COMP%] {\n  margin-bottom: 0.2rem;\n}\n.chat__bubble[_ngcontent-%COMP%] {\n  position: relative;\n  color: var(--colour-text-darkest);\n  padding: 0.5rem 1rem;\n  border-radius: 22px;\n  background-color: var(--bg-page);\n  max-width: 30rem;\n  font-size: 0.9rem;\n  overflow: hidden;\n  overflow-wrap: break-word;\n  word-break: break-word;\n}\n.chat__bubble--you[_ngcontent-%COMP%] {\n  margin-right: 2rem;\n  color: white;\n  background-color: var(--chat-bubble-you);\n}\n.chat__bubble--me[_ngcontent-%COMP%] {\n  margin-left: 2rem;\n  background-color: var(--chat-bubble-me);\n  align-self: flex-end;\n}\n.chat__time[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--colour-text-lighter);\n  align-self: center;\n  padding-bottom: 0.2rem;\n}\n.chat__send-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.chat-member__wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.chat-member__avatar[_ngcontent-%COMP%] {\n  position: relative;\n  width: 3.5rem;\n}\n.chat-member__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  width: 100%;\n}\n@media screen and (max-width: 767px) {\n  .chat-member__avatar[_ngcontent-%COMP%] {\n    width: 2.5rem;\n  }\n}\n.chat-member__name[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: var(--colour-text-darker);\n  margin-top: auto;\n  white-space: nowrap;\n  word-break: break-all;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  font-size: 1rem;\n}\n@media screen and (max-width: 1199px) {\n  .chat-member__name[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n.chat-member__details[_ngcontent-%COMP%] {\n  margin-left: 0.8rem;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n}\n@media screen and (max-width: 767px) {\n  .chat-member__details[_ngcontent-%COMP%] {\n    margin-left: 1rem;\n  }\n}\n.chat-member__age[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--colour-text-lighter);\n  position: relative;\n}\n.chat-member__age[_ngcontent-%COMP%]::after {\n  content: \" . \";\n  font-size: 0px;\n  position: absolute;\n  top: 50%;\n  right: -4px;\n  width: 3px;\n  height: 3px;\n  background-color: var(--colour-text-lighter);\n  border-radius: 50%;\n}\n.chat-member__status[_ngcontent-%COMP%] {\n  color: var(--colour-text-lighter);\n  font-size: 0.8rem;\n}\n.chat__profile[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 20rem;\n}\n.chat--mobile[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10001;\n  transform: translateY(100%);\n  display: none;\n  transition: transform 0.3s ease-in-out 0.1s;\n}\n.chat--mobile[_ngcontent-%COMP%]   .chat__wrapper[_ngcontent-%COMP%] {\n  border-radius: 0;\n}\n.chat--mobile.chat--show[_ngcontent-%COMP%] {\n  display: block;\n  transform: translateY(0%);\n  border-radius: 0;\n}\n.user-profile[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  overflow-y: auto;\n}\n.user-profile__wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  padding-top: 5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n}\n.user-profile__close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  left: 1.5rem;\n  width: 2rem;\n  height: 2rem;\n  color: var(--colour-primary);\n  font-size: 1.375rem;\n  cursor: pointer;\n  z-index: 10003;\n}\n.user-profile__avatar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.user-profile__avatar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 9rem;\n  border-radius: 50%;\n}\n.user-profile__name[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-top: 0.7rem;\n  color: var(--colour-text-darker);\n  word-wrap: break-word;\n  font-size: 1.15rem;\n}\n@media screen and (max-width: 767px) {\n  .user-profile__name[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n}\n.user-profile__phone[_ngcontent-%COMP%] {\n  color: var(--colour-text-darker);\n  font-size: 0.9rem;\n}\n.user-profile__details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n}\n.user-profile__location[_ngcontent-%COMP%] {\n  color: var(--colour-text-lighter);\n  font-size: 0.9rem;\n}\n.user-profile__description[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.user-profile__description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 1.3rem;\n  word-wrap: break-word;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 0.9rem;\n}\n.user-profile__label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: bold;\n}\n.user-profile__tags[_ngcontent-%COMP%] {\n  list-style: none;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.user-profile__tags[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.3rem 1rem;\n  border-radius: 1rem;\n  margin-right: 0.3rem;\n  margin-bottom: 0.3rem;\n  font-size: 0.9rem;\n}\n.user-profile__tags[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: none;\n}\n.user-profile__tags--primary[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  background-color: var(--colour-primary-lightest);\n  color: var(--colour-primary-darker);\n}\n.user-profile__tags--primary[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-primary-darker);\n}\n.user-profile__tags--secondary[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  background-color: var(--colour-third-lightest);\n  color: var(--colour-third);\n}\n.user-profile__tags--secondary[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: var(--colour-third);\n}\n.user-profile--large[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  top: 0;\n  right: 0;\n  z-index: 10002;\n  transform: translateX(100%);\n  transition: transform 0.3s ease-in-out 0.1s;\n  background-color: var(--bg-page);\n  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.06);\n}\n.user-profile--large.user-profile--show[_ngcontent-%COMP%] {\n  display: block;\n  transform: translateX(0%);\n  border-radius: 0;\n}\n.user-status[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  width: 1rem;\n  height: 1rem;\n  background-color: var(--colour-text-lighter);\n  border: 3px solid white;\n  border-radius: 50%;\n}\n.user-status--online[_ngcontent-%COMP%] {\n  background-color: var(--colour-third);\n}\n.svg-icon[_ngcontent-%COMP%] {\n  width: 70%;\n}\n.svg-icon[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: var(--colour-primary);\n}\n.svg-icon--send[_ngcontent-%COMP%] {\n  width: 60%;\n}\n.svg-icon--send[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon--send[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: white;\n}\n.svg-icon--search[_ngcontent-%COMP%] {\n  width: 40%;\n}\n.svg-icon--search[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon--search[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: var(--bg-page-darkest);\n}\n.svg-icon--send-img[_ngcontent-%COMP%] {\n  width: 55%;\n}\n.svg-icon--send-img[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon--send-img[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: var(--bg-page-darkest);\n}\n.svg-icon--send-emoji[_ngcontent-%COMP%] {\n  width: 60%;\n}\n.svg-icon--send-emoji[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon--send-emoji[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: var(--bg-page-darkest);\n}\n.svg-icon--previous[_ngcontent-%COMP%] {\n  width: 55%;\n}\n.svg-icon--dark-mode[_ngcontent-%COMP%] {\n  width: 80%;\n}\n.svg-icon--dark-mode[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .svg-icon--dark-mode[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: var(--colour-primary);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGNoYXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQVEsdUZBQUE7QUFDUjs7d0NBQUE7QUFHQTtFQUNFLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7RUFDQSw2QkFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQ0FBQTtFQUNBLHlCQUFBO0VBQ0Esd0NBQUE7QUFDRjtBQUVBO0VBQ0Usa0JBQUE7RUFDQSx5QkFBQTtFQUNBLDBCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsdUJBQUE7RUFDQSwrQkFBQTtFQUNBLGdDQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLDZCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLGdDQUFBO0VBQ0EsOEJBQUE7RUFDQSxxQ0FBQTtFQUNBLHlCQUFBO0VBQ0Esd0NBQUE7QUFDRjtBQUVBOzt3Q0FBQTtBQUdBOzs7RUFHRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0FBQ0Y7QUFFQTtFQUNFLHVCQUFBO0FBQ0Y7QUFFQTtFQUNFLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0FBQ0Y7QUFFQTs7d0NBQUE7QUFHQTs7d0NBQUE7QUFHQTtFQUNFLGFBQUE7QUFDRjtBQUNBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUFFRjtBQUFBO0VBQ0UsZ0NBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FBR0Y7QUFEQTtFQUNFO0lBQ0UsaUJBQUE7RUFJRjtBQUNGO0FBRkE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQ0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUlGO0FBRkE7RUFDRSx1Q0FBQTtFQUNBLG1DQUFBO0FBS0Y7QUFIQTtFQUNFLDJCQUFBO0FBTUY7QUFKQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBT0Y7QUFMQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFRRjtBQUxBO0VBQ0UsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFRRjtBQU5BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVNGO0FBQ0E7RUFDRSxpQ0FBQTtFQUNBLGlCQUFBO0FBWUY7QUFWQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQWFGO0FBWEE7RUFDRSxtQkFBQTtFQUNBLDhDQUFBO0VBQ0EsZ0NBQUE7QUFjRjtBQUpBO0VBQ0UsOENBQUE7RUFDQSxnQ0FBQTtBQWlCRjtBQWZBO0VBQ0UsZ0NBQUE7RUFDQSxpQ0FBQTtFQUNBLHlCQUFBO0FBa0JGO0FBaEJBO0VBQ0UsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLDRDQUFBO0VBQ0EsWUFBQTtBQW1CRjtBQWpCQTtFQUNFLDRDQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQW9CRjtBQWxCQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFxQkY7QUFuQkE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQXNCRjtBQXBCQTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLGFBQUE7RUFDQSwyQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsdURBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQXVCRjtBQXJCQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0FBd0JGO0FBdEJBO0VBQ0UsOENBQUE7QUF5QkY7QUF2QkE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBMEJGO0FBeEJBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQTJCRjtBQXhCQTtFQUNFLGlDQUFBO0FBMkJGO0FBekJBO0VBQ0UsdUNBQUE7QUE0QkY7QUExQkE7RUFDRSxnQ0FBQTtBQTZCRjtBQTNCQTtFQUNFLGdDQUFBO0VBQ0EsaUJBQUE7QUE4QkY7QUE1QkE7RUFDRSw2Q0FBQTtBQStCRjtBQTdCQTtFQUNFLGdEQUFBO0FBZ0NGO0FBOUJBO0VBQ0UsZ0RBQUE7QUFpQ0Y7QUEvQkE7RUFDRTtJQUNFLGdDQUFBO0VBa0NGOztFQWhDQTtJQUNFLHVDQUFBO0VBbUNGO0FBQ0Y7QUFqQ0E7RUFDRSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGFBQUE7RUFDQSwrQkFBQTtFQUNBLDZCQUFBO0VBRUEsZ0JBQUE7RUFDQSwyREFBQTtBQW1DRjtBQWpDQTtFQUNFO0lBQ0UsaUNBQUE7SUFDQSxtQ0FBQTtFQW9DRjtBQUNGO0FBbENBO0VBQ0U7SUFDRSxpQ0FBQTtJQUNBLG1DQUFBO0VBb0NGO0FBQ0Y7QUFsQ0E7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBb0NGO0FBbENBO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FBcUNGO0FBbkNBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBc0NGO0FBcENBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBdUNGO0FBcENBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUF1Q0Y7QUFyQ0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQXdDRjtBQXRDQTtFQUNFLGdDQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSwwQ0FBQTtFQUNBLDJDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0FBeUNGO0FBdkNBO0VBQ0U7SUFDRSxpQkFBQTtJQUNBLGtCQUFBO0VBMENGO0FBQ0Y7QUF4Q0E7RUFDRSxXQUFBO0VBQ0EsNENBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQTBDRjtBQXhDQTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsNEJBQUE7QUEyQ0Y7QUF6Q0E7RUFDRSxTQUFBO0VBQ0EsaUJBQUE7QUE0Q0Y7QUExQ0E7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsdUNBQUE7RUFDQSxpQkFBQTtBQTZDRjtBQTNDQTtFQUNFLGNBQUE7QUE4Q0Y7QUE1Q0E7RUFDRSxZQUFBO0FBK0NGO0FBN0NBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsNEJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFnREY7QUE5Q0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7QUFpREY7QUEvQ0E7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0FBa0RGO0FBaERBO0VBQ0UsbUJBQUE7QUFtREY7QUFqREE7RUFDRSxnREFBQTtBQW9ERjtBQWxEQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQXFERjtBQW5EQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7QUFzREY7QUFwREE7RUFDRSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7QUF1REY7QUFyREE7RUFDRSxxQkFBQTtBQXdERjtBQXREQTtFQUNFLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0FBeURGO0FBdkRBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0Esd0NBQUE7QUEwREY7QUF4REE7RUFDRSxpQkFBQTtFQUNBLHVDQUFBO0VBQ0Esb0JBQUE7QUEyREY7QUF6REE7RUFDRSxpQkFBQTtFQUNBLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtBQTRERjtBQTFEQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBNkRGO0FBM0RBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtBQThERjtBQTVEQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtBQStERjtBQTdEQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQWdFRjtBQTlEQTtFQUNFO0lBQ0UsYUFBQTtFQWlFRjtBQUNGO0FBL0RBO0VBQ0UsaUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBaUVGO0FBL0RBO0VBQ0U7SUFDRSxpQkFBQTtFQWtFRjtBQUNGO0FBaEVBO0VBQ0UsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtBQWtFRjtBQWhFQTtFQUNFO0lBQ0UsaUJBQUE7RUFtRUY7QUFDRjtBQWpFQTtFQUNFLGlCQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQkFBQTtBQW1FRjtBQWpFQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsNENBQUE7RUFDQSxrQkFBQTtBQW9FRjtBQWxFQTtFQUNFLGlDQUFBO0VBQ0EsaUJBQUE7QUFxRUY7QUFuRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBc0VGO0FBcEVBO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLDJDQUFBO0FBdUVGO0FBckVBO0VBQ0UsZ0JBQUE7QUF3RUY7QUF0RUE7RUFDRSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQXlFRjtBQXRFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBeUVGO0FBdkVBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7QUEwRUY7QUF4RUE7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSw0QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7QUEyRUY7QUF6RUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQTRFRjtBQTFFQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQTZFRjtBQTNFQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUE4RUY7QUE1RUE7RUFDRTtJQUNFLGlCQUFBO0VBK0VGO0FBQ0Y7QUE3RUE7RUFDRSxnQ0FBQTtFQUNBLGlCQUFBO0FBK0VGO0FBN0VBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQWdGRjtBQTlFQTtFQUNFLGlDQUFBO0VBQ0EsaUJBQUE7QUFpRkY7QUEvRUE7RUFDRSxrQkFBQTtBQWtGRjtBQWhGQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFtRkY7QUFqRkE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0FBb0ZGO0FBbEZBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0FBcUZGO0FBbkZBO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQXNGRjtBQXBGQTtFQUNFLHFCQUFBO0FBdUZGO0FBckZBO0VBQ0UsZ0RBQUE7RUFDQSxtQ0FBQTtBQXdGRjtBQXRGQTtFQUNFLG1DQUFBO0FBeUZGO0FBdkZBO0VBQ0UsOENBQUE7RUFDQSwwQkFBQTtBQTBGRjtBQXhGQTtFQUNFLDBCQUFBO0FBMkZGO0FBekZBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxNQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7RUFDQSwyQkFBQTtFQUNBLDJDQUFBO0VBQ0EsZ0NBQUE7RUFDQSwwQ0FBQTtBQTRGRjtBQTFGQTtFQUNFLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FBNkZGO0FBMUZBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNENBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBNkZGO0FBM0ZBO0VBQ0UscUNBQUE7QUE4RkY7QUEzRkE7RUFDRSxVQUFBO0FBOEZGO0FBNUZBOztFQUVFLDJCQUFBO0FBK0ZGO0FBN0ZBO0VBQ0UsVUFBQTtBQWdHRjtBQTlGQTs7RUFFRSxXQUFBO0FBaUdGO0FBL0ZBO0VBQ0UsVUFBQTtBQWtHRjtBQWhHQTs7RUFFRSw0QkFBQTtBQW1HRjtBQWpHQTtFQUNFLFVBQUE7QUFvR0Y7QUFsR0E7O0VBRUUsNEJBQUE7QUFxR0Y7QUFuR0E7RUFDRSxVQUFBO0FBc0dGO0FBcEdBOztFQUVFLDRCQUFBO0FBdUdGO0FBckdBO0VBQ0UsVUFBQTtBQXdHRjtBQXRHQTtFQUNFLFVBQUE7QUF5R0Y7QUF2R0E7O0VBRUUsMkJBQUE7QUEwR0YiLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwXCIpO1xyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgVmFyaWFibGVzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbjpyb290IHtcclxuICAtLWJnLXBhZ2U6ICNmZmZmZmY7XHJcbiAgLS1iZy1wYWdlLWRhcmtlcjogI2Y3ZjdmNztcclxuICAtLWJnLXBhZ2UtZGFya2VzdDogI2IzYjNiMztcclxuICAtLWNvbG91ci1wcmltYXJ5OiAjMzk5NmZiO1xyXG4gIC0tY29sb3VyLXByaW1hcnktbGlnaHRlc3Q6ICNlOGYzZmY7XHJcbiAgLS1jb2xvdXItcHJpbWFyeS1kYXJrZXI6ICMxYTdlZTY7XHJcbiAgLS1jb2xvdXItdGhpcmQ6ICM0MTlkNzg7XHJcbiAgLS1jb2xvdXItdGhpcmQtbGlnaHRlcjogIzdiYzlhYTtcclxuICAtLWNvbG91ci10aGlyZC1saWdodGVzdDogI2U2ZjdmMDtcclxuICAtLWNvbG91ci10ZXh0OiAjNjk2OTY5O1xyXG4gIC0tY29sb3VyLXRleHQtbGlnaHRlcjogIzliOWI5YjtcclxuICAtLWNvbG91ci10ZXh0LWRhcmtlcjogIzYyNjI2MjtcclxuICAtLWNvbG91ci10ZXh0LWRhcmtlc3Q6ICMzNjM2MzY7XHJcbiAgLS1ib3JkZXItY29sb3I6ICNlOGU3ZTc7XHJcbiAgLS1mb3JtLXJhZGl1czogMTNweDtcclxuICAtLXNlYXJjaC1mb3JtLWJnLWNvbG91cjogI2YyZjJmMjtcclxuICAtLXNlbmQtZm9ybS1iZy1jb2xvdXI6ICNmMmYyZjI7XHJcbiAgLS1zZW5kLWJ0bi1ib3gtc2hhZG93LWNvbG91cjogIzdiYmFmZDtcclxuICAtLWNoYXQtYnViYmxlLW1lOiAjZjJmMmYyO1xyXG4gIC0tY2hhdC1idWJibGUteW91OiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbn1cclxuXHJcbi5kYXJrLW1vZGUge1xyXG4gIC0tYmctcGFnZTogIzFhMWExYTtcclxuICAtLWJnLXBhZ2UtZGFya2VyOiAjMzYzNjM2O1xyXG4gIC0tYmctcGFnZS1kYXJrZXN0OiAjODE4MTgxO1xyXG4gIC0tY29sb3VyLXByaW1hcnk6ICMxYTcxZDA7XHJcbiAgLS1jb2xvdXItcHJpbWFyeS1saWdodGVzdDogIzIwMmMzYTtcclxuICAtLWNvbG91ci1wcmltYXJ5LWRhcmtlcjogIzQ0OWZmZDtcclxuICAtLWNvbG91ci10aGlyZDogIzQxYzU5MDtcclxuICAtLWNvbG91ci10aGlyZC1saWdodGVyOiAjNTZkNmEzO1xyXG4gIC0tY29sb3VyLXRoaXJkLWxpZ2h0ZXN0OiAjMjcyZjJjO1xyXG4gIC0tY29sb3VyLXRleHQ6ICNjN2M3Yzc7XHJcbiAgLS1jb2xvdXItdGV4dC1saWdodGVyOiAjODY4Njg2O1xyXG4gIC0tY29sb3VyLXRleHQtZGFya2VyOiAjZGNkY2RjO1xyXG4gIC0tY29sb3VyLXRleHQtZGFya2VzdDogI2VhZWFlYTtcclxuICAtLWJvcmRlci1jb2xvcjogIzRjNGM0YztcclxuICAtLXNlYXJjaC1mb3JtLWJnLWNvbG91cjogIzM2MzYzNjtcclxuICAtLXNlbmQtZm9ybS1iZy1jb2xvdXI6ICMzNjM2MzY7XHJcbiAgLS1zZW5kLWJ0bi1ib3gtc2hhZG93LWNvbG91cjogIzQ0NTE1ZjtcclxuICAtLWNoYXQtYnViYmxlLW1lOiAjMzYzNjM2O1xyXG4gIC0tY2hhdC1idWJibGUteW91OiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBCYXNlXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiosXHJcbio6OmJlZm9yZSxcclxuKjo6YWZ0ZXIge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbmh0bWwge1xyXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICBmb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XHJcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcclxuICBmb250LWZhbWlseTogXCJJbnRlclwiLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1wYWdlKTtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIE1peGlucyAmIGZ1bmN0aW9uc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgTWFpblxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4ubWVzc2FnZXMtcGFnZSB7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG4ubWVzc2FnZXMtcGFnZV9faGVhZGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5tZXNzYWdlcy1wYWdlX190aXRsZSB7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWRhcmtlcik7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1zaXplOiAxLjVyZW07XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTE5OXB4KSB7XHJcbiAgLm1lc3NhZ2VzLXBhZ2VfX3RpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gIH1cclxufVxyXG4ubWVzc2FnZXMtcGFnZV9fZGFyay1tb2RlLXRvb2dsZXIge1xyXG4gIHdpZHRoOiAyLjZyZW07XHJcbiAgaGVpZ2h0OiAyLjZyZW07XHJcbiAgcGFkZGluZzogMC4zNXJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5tZXNzYWdlcy1wYWdlX19kYXJrLW1vZGUtdG9vZ2xlcjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3VyLXByaW1hcnkpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3VyLXByaW1hcnkpO1xyXG59XHJcbi5tZXNzYWdlcy1wYWdlX19kYXJrLW1vZGUtdG9vZ2xlcjpob3ZlciBwYXRoIHtcclxuICBmaWxsOiB2YXIoLS1iZy1wYWdlLWRhcmtlcik7XHJcbn1cclxuLm1lc3NhZ2VzLXBhZ2VfX2xpc3Qge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgZmxleC1ncm93OiAxO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuLm1lc3NhZ2VzLXBhZ2VfX2xpc3Qtc2Nyb2xsIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLmN1c3RvbS1mb3JtIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VzdCk7XHJcbiAgcGFkZGluZzogMS41cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEzcHg7XHJcbn1cclxuLmN1c3RvbS1mb3JtX19zZWFyY2gtd3JhcHBlciwgLmN1c3RvbS1mb3JtX19zZW5kLXdyYXBwZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmN1c3RvbS1mb3JtX19zZWFyY2gtd3JhcHBlciBpbnB1dDo6LW1vei1wbGFjZWhvbGRlciwgLmN1c3RvbS1mb3JtX19zZW5kLXdyYXBwZXIgaW5wdXQ6Oi1tb3otcGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiB2YXIoLS1jb2xvdXItdGV4dC1saWdodGVyKTtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlYXJjaC13cmFwcGVyIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciwgLmN1c3RvbS1mb3JtX19zZW5kLXdyYXBwZXIgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtbGlnaHRlcik7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuLmN1c3RvbS1mb3JtX19zZWFyY2gtd3JhcHBlciBpbnB1dDo6cGxhY2Vob2xkZXIsIC5jdXN0b20tZm9ybV9fc2VuZC13cmFwcGVyIGlucHV0OjpwbGFjZWhvbGRlciB7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWxpZ2h0ZXIpO1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VhcmNoLXdyYXBwZXIgaW5wdXQ6Zm9jdXMsIC5jdXN0b20tZm9ybV9fc2VuZC13cmFwcGVyIGlucHV0OmZvY3VzIHtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGJveC1zaGFkb3c6IG5vbmU7XHJcbn1cclxuLmN1c3RvbS1mb3JtX19zZWFyY2gtd3JhcHBlciBpbnB1dCB7XHJcbiAgcGFkZGluZy1yaWdodDogM3JlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWFyY2gtZm9ybS1iZy1jb2xvdXIpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJnLXBhZ2UpO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VhcmNoLXdyYXBwZXIgaW5wdXQ6LW1vei1wbGFjZWhvbGRlci1zaG93biB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VhcmNoLWZvcm0tYmctY29sb3VyKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iZy1wYWdlKTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlYXJjaC13cmFwcGVyIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VhcmNoLWZvcm0tYmctY29sb3VyKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1iZy1wYWdlKTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlYXJjaC13cmFwcGVyIGlucHV0OnBsYWNlaG9sZGVyLXNob3duIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWFyY2gtZm9ybS1iZy1jb2xvdXIpO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJnLXBhZ2UpO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VhcmNoLXdyYXBwZXIgaW5wdXQ6Zm9jdXMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXBhZ2UpO1xyXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLWNvbG9yKTtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQpO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VuZC13cmFwcGVyIGlucHV0IHtcclxuICBwYWRkaW5nLXJpZ2h0OiA2cmVtO1xyXG4gIHBhZGRpbmctbGVmdDogMy4yNXJlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZW5kLWZvcm0tYmctY29sb3VyKTtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuLmN1c3RvbS1mb3JtX19zZW5kLXdyYXBwZXIgaW5wdXQ6Zm9jdXMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlbmQtZm9ybS1iZy1jb2xvdXIpO1xyXG4gIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0KTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlYXJjaC1zdWJtaXQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAzLjVyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlYXJjaC1zdWJtaXQ6Zm9jdXMge1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VuZC1zdWJtaXQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICByaWdodDogMC41cmVtO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICBoZWlnaHQ6IDIuM3JlbTtcclxuICB3aWR0aDogMi4zcmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGJveC1zaGFkb3c6IDAgM3B4IDNweCB2YXIoLS1zZW5kLWJ0bi1ib3gtc2hhZG93LWNvbG91cik7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xyXG4gIHBhZGRpbmctdG9wOiAwLjNyZW07XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHBhZGRpbmctcmlnaHQ6IDAuMXJlbTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlbmQtc3VibWl0OmZvY3VzIHtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlbmQtc3VibWl0OmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeS1kYXJrZXIpO1xyXG59XHJcbi5jdXN0b20tZm9ybV9fc2VuZC1pbWcge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICBsZWZ0OiAwLjVyZW07XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gIHdpZHRoOiAyLjNyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4uY3VzdG9tLWZvcm1fX3NlbmQtZW1vamkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICByaWdodDogMy4ycmVtO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcclxuICB3aWR0aDogMi4zcmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5tZXNzYWdpbmctbWVtYmVyIHtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1mb3JtLXJhZGl1cyk7XHJcbn1cclxuLm1lc3NhZ2luZy1tZW1iZXI6aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXBhZ2UtZGFya2VyKTtcclxufVxyXG4ubWVzc2FnaW5nLW1lbWJlci0tbmV3IC5tZXNzYWdpbmctbWVtYmVyX19uYW1lIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VyKTtcclxufVxyXG4ubWVzc2FnaW5nLW1lbWJlci0tbmV3IC5tZXNzYWdpbmctbWVtYmVyX19tZXNzYWdlIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VyKTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4ubWVzc2FnaW5nLW1lbWJlci0tb25saW5lIC51c2VyLXN0YXR1cyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3VyLXRoaXJkLWxpZ2h0ZXIpO1xyXG59XHJcbi5tZXNzYWdpbmctbWVtYmVyLS1hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG91ci1wcmltYXJ5LWxpZ2h0ZXN0KTtcclxufVxyXG4ubWVzc2FnaW5nLW1lbWJlci0tYWN0aXZlOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeS1saWdodGVzdCk7XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAubWVzc2FnaW5nLW1lbWJlci0tYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXBhZ2UpO1xyXG4gIH1cclxuICAubWVzc2FnaW5nLW1lbWJlci0tYWN0aXZlOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXBhZ2UtZGFya2VyKTtcclxuICB9XHJcbn1cclxuLm1lc3NhZ2luZy1tZW1iZXJfX3dyYXBwZXIge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1mb3JtLXJhZGl1cyk7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDRyZW0gNGZyO1xyXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMnJlbSAycmVtO1xyXG4gIC1tb3otY29sdW1uLWdhcDogMXJlbTtcclxuICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiYXZhdGFyICAgICBuYW1lXCIgXCJhdmF0YXIgICAgIG1lc3NhZ2VcIjtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMTk5cHgpIHtcclxuICAubWVzc2FnaW5nLW1lbWJlcl9fd3JhcHBlciB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMuNXJlbSAxZnI7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDEuNzVyZW0gMS43NXJlbTtcclxuICB9XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkxcHgpIHtcclxuICAubWVzc2FnaW5nLW1lbWJlcl9fd3JhcHBlciB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMuMnJlbSAxZnI7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDEuNzVyZW0gMS43NXJlbTtcclxuICB9XHJcbn1cclxuLm1lc3NhZ2luZy1tZW1iZXJfX2F2YXRhciB7XHJcbiAgZ3JpZC1hcmVhOiBhdmF0YXI7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5tZXNzYWdpbmctbWVtYmVyX19hdmF0YXIgaW1nIHtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLm1lc3NhZ2luZy1tZW1iZXJfX25hbWUge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGdyaWQtYXJlYTogbmFtZTtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VyKTtcclxuICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG59XHJcbi5tZXNzYWdpbmctbWVtYmVyX19tZXNzYWdlIHtcclxuICBncmlkLWFyZWE6IG1lc3NhZ2U7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuXHJcbi5jaGF0IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmNoYXRfX2NvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5jaGF0X193cmFwcGVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1wYWdlKTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xyXG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC5jaGF0X193cmFwcGVyIHtcclxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xyXG4gICAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gIH1cclxufVxyXG4uY2hhdF9fbWVzc2FnaW5nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5jaGF0X19wcmV2aW91cyB7XHJcbiAgd2lkdGg6IDglO1xyXG4gIG1pbi13aWR0aDogMnJlbTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZvbnQtc2l6ZTogMS43cmVtO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXByaW1hcnkpO1xyXG59XHJcbi5jaGF0X19ub3RpZmljYXRpb24ge1xyXG4gIHdpZHRoOiA0JTtcclxuICBtaW4td2lkdGg6IDEuNXJlbTtcclxufVxyXG4uY2hhdF9fbm90aWZpY2F0aW9uIHNwYW4ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgd2lkdGg6IDEuNHJlbTtcclxuICBoZWlnaHQ6IDEuNHJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuLmNoYXRfX25vdGlmaWNhdGlvbi0tbmV3IHNwYW4ge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi5jaGF0X19pbmZvcyB7XHJcbiAgZmxleC1ncm93OiAxO1xyXG59XHJcbi5jaGF0X19hY3Rpb25zIHtcclxuICBmb250LXNpemU6IDVweDtcclxuICBoZWlnaHQ6IDJyZW07XHJcbiAgbWluLXdpZHRoOiAycmVtO1xyXG4gIGNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uY2hhdF9fYWN0aW9ucyB1bCB7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5jaGF0X19hY3Rpb25zIGxpIHtcclxuICB3aWR0aDogMi42cmVtO1xyXG4gIGhlaWdodDogMi42cmVtO1xyXG4gIHBhZGRpbmc6IDAuMzVyZW07XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1wYWdlKTtcclxufVxyXG4uY2hhdF9fYWN0aW9ucyBsaSArIGxpIHtcclxuICBtYXJnaW4tbGVmdDogMC4zcmVtO1xyXG59XHJcbi5jaGF0X19hY3Rpb25zIGxpOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeS1saWdodGVzdCk7XHJcbn1cclxuLmNoYXRfX2NvbnRlbnQge1xyXG4gIGZsZXgtZ3JvdzogMTtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcbi5jaGF0X19saXN0LW1lc3NhZ2VzIHtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbn1cclxuLmNoYXRfX2xpc3QtbWVzc2FnZXMgbGkge1xyXG4gIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG59XHJcbi5jaGF0X19saXN0LW1lc3NhZ2VzIGxpIC5jaGF0X19idWJibGUge1xyXG4gIG1hcmdpbi1ib3R0b206IDAuMnJlbTtcclxufVxyXG4uY2hhdF9fYnViYmxlIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWRhcmtlc3QpO1xyXG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctcGFnZSk7XHJcbiAgbWF4LXdpZHRoOiAzMHJlbTtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIG92ZXJmbG93LXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcclxufVxyXG4uY2hhdF9fYnViYmxlLS15b3Uge1xyXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2hhdC1idWJibGUteW91KTtcclxufVxyXG4uY2hhdF9fYnViYmxlLS1tZSB7XHJcbiAgbWFyZ2luLWxlZnQ6IDJyZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2hhdC1idWJibGUtbWUpO1xyXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG59XHJcbi5jaGF0X190aW1lIHtcclxuICBmb250LXNpemU6IDAuOHJlbTtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtbGlnaHRlcik7XHJcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gIHBhZGRpbmctYm90dG9tOiAwLjJyZW07XHJcbn1cclxuLmNoYXRfX3NlbmQtY29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5jaGF0LW1lbWJlcl9fd3JhcHBlciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuLmNoYXQtbWVtYmVyX19hdmF0YXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogMy41cmVtO1xyXG59XHJcbi5jaGF0LW1lbWJlcl9fYXZhdGFyIGltZyB7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgLmNoYXQtbWVtYmVyX19hdmF0YXIge1xyXG4gICAgd2lkdGg6IDIuNXJlbTtcclxuICB9XHJcbn1cclxuLmNoYXQtbWVtYmVyX19uYW1lIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VyKTtcclxuICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xyXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDExOTlweCkge1xyXG4gIC5jaGF0LW1lbWJlcl9fbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICB9XHJcbn1cclxuLmNoYXQtbWVtYmVyX19kZXRhaWxzIHtcclxuICBtYXJnaW4tbGVmdDogMC44cmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC5jaGF0LW1lbWJlcl9fZGV0YWlscyB7XHJcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcclxuICB9XHJcbn1cclxuLmNoYXQtbWVtYmVyX19hZ2Uge1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIGNvbG9yOiB2YXIoLS1jb2xvdXItdGV4dC1saWdodGVyKTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLmNoYXQtbWVtYmVyX19hZ2U6OmFmdGVyIHtcclxuICBjb250ZW50OiBcIiAuIFwiO1xyXG4gIGZvbnQtc2l6ZTogMHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDUwJTtcclxuICByaWdodDogLTRweDtcclxuICB3aWR0aDogM3B4O1xyXG4gIGhlaWdodDogM3B4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWxpZ2h0ZXIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG4uY2hhdC1tZW1iZXJfX3N0YXR1cyB7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWxpZ2h0ZXIpO1xyXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xyXG59XHJcbi5jaGF0X19wcm9maWxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAyMHJlbTtcclxufVxyXG4uY2hhdC0tbW9iaWxlIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgei1pbmRleDogMTAwMDE7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQgMC4xcztcclxufVxyXG4uY2hhdC0tbW9iaWxlIC5jaGF0X193cmFwcGVyIHtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcbi5jaGF0LS1tb2JpbGUuY2hhdC0tc2hvdyB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcblxyXG4udXNlci1wcm9maWxlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG4udXNlci1wcm9maWxlX193cmFwcGVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBhZGRpbmctdG9wOiA1cmVtO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbn1cclxuLnVzZXItcHJvZmlsZV9fY2xvc2Uge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDFyZW07XHJcbiAgbGVmdDogMS41cmVtO1xyXG4gIHdpZHRoOiAycmVtO1xyXG4gIGhlaWdodDogMnJlbTtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXByaW1hcnkpO1xyXG4gIGZvbnQtc2l6ZTogMS4zNzVyZW07XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHotaW5kZXg6IDEwMDAzO1xyXG59XHJcbi51c2VyLXByb2ZpbGVfX2F2YXRhciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi51c2VyLXByb2ZpbGVfX2F2YXRhciBpbWcge1xyXG4gIHdpZHRoOiA5cmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG4udXNlci1wcm9maWxlX19uYW1lIHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBtYXJnaW4tdG9wOiAwLjdyZW07XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWRhcmtlcik7XHJcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gIGZvbnQtc2l6ZTogMS4xNXJlbTtcclxufVxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC51c2VyLXByb2ZpbGVfX25hbWUge1xyXG4gICAgZm9udC1zaXplOiAxLjFyZW07XHJcbiAgfVxyXG59XHJcbi51c2VyLXByb2ZpbGVfX3Bob25lIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtZGFya2VyKTtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG4udXNlci1wcm9maWxlX19kZXRhaWxzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi51c2VyLXByb2ZpbGVfX2xvY2F0aW9uIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXRleHQtbGlnaHRlcik7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuLnVzZXItcHJvZmlsZV9fZGVzY3JpcHRpb24ge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4udXNlci1wcm9maWxlX19kZXNjcmlwdGlvbiBwIHtcclxuICBtYXJnaW4tdG9wOiAxLjNyZW07XHJcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuLnVzZXItcHJvZmlsZV9fbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcbi51c2VyLXByb2ZpbGVfX3RhZ3Mge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4udXNlci1wcm9maWxlX190YWdzIGxpIHtcclxuICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcclxuICBib3JkZXItcmFkaXVzOiAxcmVtO1xyXG4gIG1hcmdpbi1yaWdodDogMC4zcmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDAuM3JlbTtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG4udXNlci1wcm9maWxlX190YWdzIGE6aG92ZXIge1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4udXNlci1wcm9maWxlX190YWdzLS1wcmltYXJ5IGxpIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvdXItcHJpbWFyeS1saWdodGVzdCk7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci1wcmltYXJ5LWRhcmtlcik7XHJcbn1cclxuLnVzZXItcHJvZmlsZV9fdGFncy0tcHJpbWFyeSBhOmhvdmVyIHtcclxuICBjb2xvcjogdmFyKC0tY29sb3VyLXByaW1hcnktZGFya2VyKTtcclxufVxyXG4udXNlci1wcm9maWxlX190YWdzLS1zZWNvbmRhcnkgbGkge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG91ci10aGlyZC1saWdodGVzdCk7XHJcbiAgY29sb3I6IHZhcigtLWNvbG91ci10aGlyZCk7XHJcbn1cclxuLnVzZXItcHJvZmlsZV9fdGFncy0tc2Vjb25kYXJ5IGE6aG92ZXIge1xyXG4gIGNvbG9yOiB2YXIoLS1jb2xvdXItdGhpcmQpO1xyXG59XHJcbi51c2VyLXByb2ZpbGUtLWxhcmdlIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgei1pbmRleDogMTAwMDI7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0IDAuMXM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctcGFnZSk7XHJcbiAgYm94LXNoYWRvdzogLTNweCAwIDNweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xyXG59XHJcbi51c2VyLXByb2ZpbGUtLWxhcmdlLnVzZXItcHJvZmlsZS0tc2hvdyB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDAlKTtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcblxyXG4udXNlci1zdGF0dXMge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgd2lkdGg6IDFyZW07XHJcbiAgaGVpZ2h0OiAxcmVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG91ci10ZXh0LWxpZ2h0ZXIpO1xyXG4gIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG4udXNlci1zdGF0dXMtLW9ubGluZSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3VyLXRoaXJkKTtcclxufVxyXG5cclxuLnN2Zy1pY29uIHtcclxuICB3aWR0aDogNzAlO1xyXG59XHJcbi5zdmctaWNvbiBwYXRoLFxyXG4uc3ZnLWljb24gY2lyY2xlIHtcclxuICBmaWxsOiB2YXIoLS1jb2xvdXItcHJpbWFyeSk7XHJcbn1cclxuLnN2Zy1pY29uLS1zZW5kIHtcclxuICB3aWR0aDogNjAlO1xyXG59XHJcbi5zdmctaWNvbi0tc2VuZCBwYXRoLFxyXG4uc3ZnLWljb24tLXNlbmQgY2lyY2xlIHtcclxuICBmaWxsOiB3aGl0ZTtcclxufVxyXG4uc3ZnLWljb24tLXNlYXJjaCB7XHJcbiAgd2lkdGg6IDQwJTtcclxufVxyXG4uc3ZnLWljb24tLXNlYXJjaCBwYXRoLFxyXG4uc3ZnLWljb24tLXNlYXJjaCBjaXJjbGUge1xyXG4gIGZpbGw6IHZhcigtLWJnLXBhZ2UtZGFya2VzdCk7XHJcbn1cclxuLnN2Zy1pY29uLS1zZW5kLWltZyB7XHJcbiAgd2lkdGg6IDU1JTtcclxufVxyXG4uc3ZnLWljb24tLXNlbmQtaW1nIHBhdGgsXHJcbi5zdmctaWNvbi0tc2VuZC1pbWcgY2lyY2xlIHtcclxuICBmaWxsOiB2YXIoLS1iZy1wYWdlLWRhcmtlc3QpO1xyXG59XHJcbi5zdmctaWNvbi0tc2VuZC1lbW9qaSB7XHJcbiAgd2lkdGg6IDYwJTtcclxufVxyXG4uc3ZnLWljb24tLXNlbmQtZW1vamkgcGF0aCxcclxuLnN2Zy1pY29uLS1zZW5kLWVtb2ppIGNpcmNsZSB7XHJcbiAgZmlsbDogdmFyKC0tYmctcGFnZS1kYXJrZXN0KTtcclxufVxyXG4uc3ZnLWljb24tLXByZXZpb3VzIHtcclxuICB3aWR0aDogNTUlO1xyXG59XHJcbi5zdmctaWNvbi0tZGFyay1tb2RlIHtcclxuICB3aWR0aDogODAlO1xyXG59XHJcbi5zdmctaWNvbi0tZGFyay1tb2RlIHBhdGgsXHJcbi5zdmctaWNvbi0tZGFyay1tb2RlIGNpcmNsZSB7XHJcbiAgZmlsbDogdmFyKC0tY29sb3VyLXByaW1hcnkpO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Omar Emad\Music\conc\frontend\concAngular\src\main.ts */"zUnb");


/***/ }),

/***/ "1W4x":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "7Vn+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




function RegisterComponent_form_3_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Username is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_7_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Username must be at least 3 characters ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_7_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Username must be at most 20 characters ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegisterComponent_form_3_div_7_div_1_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_form_3_div_7_div_2_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RegisterComponent_form_3_div_7_div_3_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.errors.minlength);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.errors.maxlength);
} }
function RegisterComponent_form_3_div_13_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Email is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_13_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Email must be a valid email address ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegisterComponent_form_3_div_13_div_1_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_form_3_div_13_div_2_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors.email);
} }
function RegisterComponent_form_3_div_19_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_19_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Password must be at least 6 characters ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function RegisterComponent_form_3_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RegisterComponent_form_3_div_19_div_1_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, RegisterComponent_form_3_div_19_div_2_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r7.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r7.errors.minlength);
} }
function RegisterComponent_form_3_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Signup failed!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r9.errorMessage, " ");
} }
function RegisterComponent_form_3_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 5, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function RegisterComponent_form_3_Template_form_ngSubmit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return _r2.form.valid && ctx_r17.onSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Username");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 9, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegisterComponent_form_3_Template_input_ngModelChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.form.username = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, RegisterComponent_form_3_div_7_Template, 4, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "input", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegisterComponent_form_3_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.form.email = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, RegisterComponent_form_3_div_13_Template, 3, 2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 16, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegisterComponent_form_3_Template_input_ngModelChange_17_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.form.password = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, RegisterComponent_form_3_div_19_Template, 3, 2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Sign Up");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, RegisterComponent_form_3_div_23_Template, 4, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](12);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.form.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.errors && _r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.form.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors && _r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.form.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r7.errors && _r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r2.submitted && ctx_r0.isSignUpFailed);
} }
function RegisterComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Your registration is successful! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class RegisterComponent {
    constructor(authService) {
        this.authService = authService;
        this.form = {
            username: null,
            email: null,
            password: null
        };
        this.isSuccessful = false;
        this.isSignUpFailed = false;
        this.errorMessage = '';
    }
    ngOnInit() {
    }
    onSubmit() {
        const { username, email, password } = this.form;
        this.authService.register(username, email, password).subscribe(data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
        }, err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
        });
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"])); };
RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegisterComponent, selectors: [["app-register"]], decls: 5, vars: 2, consts: [[1, "col-md-12"], [1, "card", "card-container"], ["id", "profile-img", "src", "//ssl.gstatic.com/accounts/ui/avatar_2x.png", 1, "profile-img-card"], ["name", "form", "novalidate", "", 3, "ngSubmit", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["name", "form", "novalidate", "", 3, "ngSubmit"], ["f", "ngForm"], [1, "form-group"], ["for", "username"], ["type", "text", "name", "username", "required", "", "minlength", "3", "maxlength", "20", 1, "form-control", 3, "ngModel", "ngModelChange"], ["username", "ngModel"], ["class", "alert-danger", 4, "ngIf"], ["for", "email"], ["type", "email", "name", "email", "required", "", "email", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["email", "ngModel"], ["for", "password"], ["type", "password", "name", "password", "required", "", "minlength", "6", 1, "form-control", 3, "ngModel", "ngModelChange"], ["password", "ngModel"], [1, "btn", "btn-primary", "btn-block"], ["class", "alert alert-warning", 4, "ngIf"], [1, "alert-danger"], [4, "ngIf"], [1, "alert", "alert-warning"], [1, "alert", "alert-success"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RegisterComponent_form_3_Template, 24, 7, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, RegisterComponent_div_4_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isSuccessful);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isSuccessful);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["MinLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["MaxLengthValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["EmailValidator"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "3/gx":
/*!****************************************************************!*\
  !*** ./src/app/icudirectrequest/icudirectrequest.component.ts ***!
  \****************************************************************/
/*! exports provided: IcudirectrequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IcudirectrequestComponent", function() { return IcudirectrequestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "K3ix");
/* harmony import */ var src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/rfa.service */ "CGPM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function IcudirectrequestComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Accepted > ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](a_r5.name);
} }
function IcudirectrequestComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IcudirectrequestComponent_div_21_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const d_r6 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](24); return ctx_r7.openModal(_r2, d_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Denied");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const d_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](d_r6.name);
} }
function IcudirectrequestComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Modal");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IcudirectrequestComponent_ng_template_23_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.modalRef == null ? null : ctx_r9.modalRef.hide(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Reasons to Decline RFA");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "@time&date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "By: ICU Specialist");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.declinedData.reasons, " ");
} }
function IcudirectrequestComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IcudirectrequestComponent_div_29_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const p_r11 = ctx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.gotofilledform(p_r11); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Pending\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](p_r11.name);
} }
class IcudirectrequestComponent {
    constructor(modalService, rfaService, route, router) {
        this.modalService = modalService;
        this.rfaService = rfaService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.pending = this.rfaService.getPending();
        this.accepted = this.rfaService.getAccepted();
        this.declined = this.rfaService.getDeclined();
    }
    gotofilledform(data) {
        this.router.navigate(['/rfafilled', data._id]);
    }
    gotoAdmission() {
        this.router.navigate(['/rfa']);
    }
    // tslint:disable-next-line:typedef
    openModal(template, data) {
        this.declinedData = data;
        this.modalRef = this.modalService.show(template);
    }
}
IcudirectrequestComponent.ɵfac = function IcudirectrequestComponent_Factory(t) { return new (t || IcudirectrequestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["BsModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_2__["RfaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
IcudirectrequestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IcudirectrequestComponent, selectors: [["app-icudirectrequest"]], decls: 31, vars: 9, consts: [[2, "margin-top", "-100px"], [1, "row", 2, "border-bottom-color", "#d6d6d6"], [1, "col", 2, "color", "var(--bs-gray-900)", "border-bottom-color", "#d6d6d6"], [1, "text-center"], [1, "row"], [1, "col", "text-center", 2, "margin-top", "30px"], ["type", "button", 1, "btn", "btn-primary", "text-center", 2, "background", "#9ddcff", "color", "#017fe0", "width", "250.5px", "height", "70px", 3, "click"], [1, "row", 2, "margin-top", "30px"], [1, "col"], [2, "padding", "10px", "font-size", "14px", "background", "#e5e5e5", "margin-bottom", "2px"], ["class", "row", "style", "margin-top: 0px;", 4, "ngFor", "ngForOf"], ["declinedModal", ""], [1, "row", 2, "margin-top", "0px"], [1, "col", "d-flex", "flex-row", "flex-grow-1", "justify-content-between", "align-items-baseline", 2, "padding", "10px", "margin-left", "10px", "margin-right", "10px", "border-bottom", "1px solid #e6e6e6"], [1, "d-inline-block", 2, "font-size", "14px", "background", "rgba(229,229,229,0)"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "text-center", "d-flex", "flex-row", "justify-content-end"], [1, "col", "d-flex", "flex-row", "flex-grow-1", "justify-content-between", "align-items-baseline", 2, "padding", "10px", "margin-right", "10px", "margin-left", "10px", "border-bottom", "1px solid #e6e6e6"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "text-center", "d-flex", "flex-row", "justify-content-end", 3, "click"], [1, "fa", "fa-info-circle", 2, "margin-left", "3px", "margin-top", "4px"], [1, "modal-header"], [1, "modal-title", "pull-left"], ["type", "button", "aria-label", "Close", 1, "btn-close", "close", "pull-right", 3, "click"], ["aria-hidden", "true", 1, "visually-hidden"], [1, "modal-body"], [2, "padding", "20px"], [2, "background", "#e5e5e5", "padding-left", "10px"], [2, "border-bottom", "1px solid #ededed", "padding", "10px"], [2, "padding", "20px", "display", "inline-block", "border", "1px solid #cccccc", "border-radius", "10px", "width", "38%"], [2, "padding", "20px", "display", "inline-block", "border", "1px solid #cccccc", "border-radius", "10px", "width", "60%"]], template: function IcudirectrequestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h5", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Good morning...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "ICU Transfers Request");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IcudirectrequestComponent_Template_button_click_9_listener() { return ctx.gotoAdmission(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Request an ICU Transfer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h1", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "ICU Accepted Transfers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, IcudirectrequestComponent_div_15_Template, 6, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h1", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "ICU Denied Transfers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, IcudirectrequestComponent_div_21_Template, 8, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](22, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, IcudirectrequestComponent_ng_template_23_Template, 28, 1, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h1", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Pending Transfers");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, IcudirectrequestComponent_div_29_Template, 6, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](30, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](16, 3, ctx.accepted));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](22, 5, ctx.declined));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](30, 7, ctx.pending));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".btn-outline-primary[_ngcontent-%COMP%] {\n  color: #0379fa;\n  border-color: transparent;\n  color: #a5a5a5;\n}\n\n.btn-check[_ngcontent-%COMP%]:active    + .btn-outline-primary[_ngcontent-%COMP%], .btn-check[_ngcontent-%COMP%]:checked    + .btn-outline-primary[_ngcontent-%COMP%], .btn-outline-primary.active[_ngcontent-%COMP%], .btn-outline-primary.dropdown-toggle.show[_ngcontent-%COMP%], .btn-outline-primary[_ngcontent-%COMP%]:active, .btn-outline-primary[_ngcontent-%COMP%]:hover {\n  color: #a5a5a5;\n  background-color: white;\n  border-color: #59a1db;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGljdWRpcmVjdHJlcXVlc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtBQUVGIiwiZmlsZSI6ImljdWRpcmVjdHJlcXVlc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnRuLW91dGxpbmUtcHJpbWFyeSB7XHJcbiAgY29sb3I6ICMwMzc5ZmE7XHJcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBjb2xvcjogI2E1YTVhNTtcclxufVxyXG4uYnRuLWNoZWNrOmFjdGl2ZSsuYnRuLW91dGxpbmUtcHJpbWFyeSwgLmJ0bi1jaGVjazpjaGVja2VkKy5idG4tb3V0bGluZS1wcmltYXJ5LCAuYnRuLW91dGxpbmUtcHJpbWFyeS5hY3RpdmUsIC5idG4tb3V0bGluZS1wcmltYXJ5LmRyb3Bkb3duLXRvZ2dsZS5zaG93LCAuYnRuLW91dGxpbmUtcHJpbWFyeTphY3RpdmUsIC5idG4tb3V0bGluZS1wcmltYXJ5OmhvdmVyIHtcclxuICBjb2xvcjogI2E1YTVhNTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXItY29sb3I6ICM1OWExZGI7XHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "3nXK":
/*!****************************************!*\
  !*** ./src/app/user/user.component.ts ***!
  \****************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class UserComponent {
    constructor() { }
    ngOnInit() {
    }
}
UserComponent.ɵfac = function UserComponent_Factory(t) { return new (t || UserComponent)(); };
UserComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserComponent, selectors: [["app-user"]], decls: 2, vars: 0, template: function UserComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "user works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "7Vn+":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
class AuthService {
    constructor(http) {
        this.http = http;
    }
    login(username, password) {
        return this.http.post(AUTH_API + 'signin', {
            username,
            password
        }, httpOptions);
    }
    register(username, email, password) {
        return this.http.post(AUTH_API + 'signup', {
            username,
            email,
            password
        }, httpOptions);
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "8cPU":
/*!**********************************************************!*\
  !*** ./src/app/messaginghome/messaginghome.component.ts ***!
  \**********************************************************/
/*! exports provided: MessaginghomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessaginghomeComponent", function() { return MessaginghomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



class MessaginghomeComponent {
    constructor(router) {
        this.router = router;
        this.eventStreamInfo = {
            from: 'END'
        };
        this.memberInfo = [];
    }
    ngOnInit() {
        this.connect();
    }
    onClick(event) {
        if (event.target.className === 'theroomid') {
            this.roomitself = event.target.attributes.value.nodeValue;
            this.inviteBotandUser(this.roomitself);
            this.router.navigate(['chat', this.roomitself]);
        }
    }
    inviteBotandUser(room) {
        // @ts-ignore
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@drbot:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@nurse:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@user1:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        // $.ajax({
        //   url: 'http://localhost:3000/invite',
        //   type: 'POST',
        //   contentType: 'application/json; charset=utf-8',
        //   data: JSON.stringify({
        //     roomId: room
        //   }),
        //   dataType: 'json',
        //   success(data: any) {
        //     console.log(data, 'after registering');
        //   },
        //   // tslint:disable-next-line:typedef
        //   error(err: { responseText: any; }) {
        //     let msg = 'Is the homeserver running?';
        //     const errJson = $.parseJSON(err.responseText);
        //     if (errJson !== null) {
        //       msg = errJson.error;
        //     }
        //     alert('Unable to register: ' + msg);
        //   }
        //
        // });
    }
    connect() {
        const self = this;
        // @ts-ignore
        const user = localStorage.getItem('user');
        // @ts-ignore
        const password = localStorage.getItem('password');
        // @ts-ignore
        $.ajax({
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user, password, type: 'm.login.password' }),
            dataType: 'json',
            success(data) {
                self.onLoggedIn(data);
            },
            error(err) {
                alert('Unable to login: is the homeserver running?');
            }
        });
    }
    onLoggedIn(data) {
        const self = this;
        console.log('hello world from onloggedin');
        console.log('from onloggedin', data);
        self.accountInfo = data;
        this.getCurrentRoomList();
    }
    createroom(alias) {
        const self = this;
        const roomAlias = alias;
        const data = {
            room_alias_name: undefined
        };
        // @ts-ignore
        if (roomAlias.length > 0) {
            // @ts-ignore
            data.room_alias_name = roomAlias;
        }
        // @ts-ignore
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/createRoom?access_token=' + self.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            success(response) {
                console.log('inside function createroom1');
                $('#roomAlias').val('');
                response.membership = 'join'; // you are automatically joined into every room you make.
                response.latest_message = '';
                // @ts-ignore
                self.roomInfo.push(response);
            },
            error(err) {
                alert(JSON.stringify($.parseJSON(err.responseText)));
            }
        });
    }
    getCurrentRoomList() {
        const self = this;
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/initialSync?access_token=' + self.accountInfo.access_token + '&limit=1';
        $.getJSON(url, function (data) {
            const rooms = data.rooms;
            for (let i = 0; i < rooms.length; ++i) {
                if ('messages' in rooms[i]) {
                    console.log('inside function getroomlist');
                    rooms[i].latest_message = rooms[i].messages.chunk[0].content.body;
                }
            }
            self.roomInfo = rooms;
            self.setRooms(self.roomInfo);
            // @ts-ignore
            // tslint:disable-next-line:only-arrow-functions
        }).fail(function (err) {
            alert(JSON.stringify($.parseJSON(err.responseText)));
        });
    }
    setRooms(roomList) {
        const self = this;
        // wipe existing entries
        $('#rooms').find('tr:gt(0)').remove();
        let rows = '';
        // @ts-ignore
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < roomList.length; ++i) {
            console.log(roomList);
            let row;
            if (roomList != null) {
                var main;
                if (roomList[i].state ? roomList[i].state[2].content.alias : undefined != undefined) {
                    main = roomList[i].state[2].content.alias;
                }
                else {
                    main = '#Patient Room:';
                }
                var mySubString = main.substring(main.indexOf("#") + 1, main.lastIndexOf(":"));
                row =
                    '<div style="display:flex; flex:1;flex-direction: row; justify-content: center; z-index:9999" (click)="thisroom(' + roomList[i].room_id + ')">\n' +
                        '    <div style="display:flex; flex:0.15; flex-direction:column; justify-content: center">\n' +
                        '      <img class="rounded-circle img-fluid" src="assets/img/patient4.png" width="80" height="80" (click)="thisroom(' + roomList[i].room_id + ')">\n' +
                        '    </div>\n' +
                        '    <div style="display:flex; flex:0.85; flex-direction:column;    justify-content: center;\n' +
                        '    background: #b4e1ff; padding:10px; border:1px solid #eaeaea; border-left:0;border-right:0;">\n' +
                        '      <div style="display:flex; flex:1; align-self: center; color:#cdcdcd">\n' +
                        '        <b>REQUEST</b>\n' +
                        '      </div>\n' +
                        '      <div style="display:flex; flex:1; margin-top:-20px; color:#000100"><b class="theroom">' + mySubString + '</b>\n' +
                        '      </div>\n' +
                        '      <div style="color:#000100">\n' +
                        '        <p>Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey</p>\n' +
                        '      </div>\n' +
                        '<div>' +
                        '<button class="theroomid" value="' + roomList[i].room_id + '">Join</button> </div>' +
                        '</div>\n' +
                        '</div>';
            }
            rows += row;
            console.log('got into set rooms function');
        }
        $('#rooms').append(rows);
    }
    loadRoomContent(roomId) {
        const self = this;
        console.log('loadRoomContent ' + roomId);
        self.viewingRoomId = roomId;
        console.log('the assignment to the viewing room id is here', roomId, this.viewingRoomId);
        $('#roomName').text('Room: ' + roomId);
        $('.sendMessageForm').css({ visibility: 'visible' });
        // this.getMessages(roomId);
        // this.getMemberList(roomId);
    }
    thisroom(data) {
        console.log(data);
    }
}
MessaginghomeComponent.ɵfac = function MessaginghomeComponent_Factory(t) { return new (t || MessaginghomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
MessaginghomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MessaginghomeComponent, selectors: [["app-messaginghome"]], hostBindings: function MessaginghomeComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MessaginghomeComponent_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } }, decls: 74, vars: 0, consts: [[1, "row", 2, "border-bottom-color", "#d6d6d6"], [1, "col", 2, "color", "var(--bs-gray-900)", "border-bottom-color", "#d6d6d6"], ["role", "search"], ["id", "search", "type", "search", "placeholder", "Search...", "autofocus", "", "required", "", 2, "width", "100%"], [2, "display", "flex", "flex", "1"], [2, "display", "flex", "padding", "10px", "align-self", "flex-start", "padding-left", "0", "flex-direction", "column", "align-self", "flex-start"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "text-center", "d-flex", "flex-row", "justify-content-end"], [2, "display", "flex", "flex", "1", "flex-direction", "column"], [2, "display", "flex", "padding", "10px", "flex-direction", "column"], [2, "display", "flex", "padding", "10px", "flex-direction", "column", "padding-right", "0"], ["id", "rooms", 1, "roomList", 2, "text-decoration", "none"], [2, "text-decoration", "none"], [2, "display", "flex", "flex", "1", "flex-direction", "row", "justify-content", "center"], [2, "display", "flex", "flex", "0.15", "flex-direction", "column", "justify-content", "center"], ["src", "assets/img/patient3.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "0.85", "flex-direction", "column", "justify-content", "center", "background", "#c5ffb4", "padding", "10px", "border", "1px solid #eaeaea", "border-left", "0", "border-right", "0"], [2, "display", "flex", "flex", "1", "align-self", "center", "color", "#cdcdcd"], [2, "display", "flex", "flex", "1", "margin-top", "-20px", "color", "#000100"], [2, "color", "#000100"], ["src", "assets/img/patient2.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "0.85", "flex-direction", "column", "justify-content", "center", "background", "#ffcdb2", "padding", "10px", "border", "1px solid #eaeaea", "border-left", "0", "border-right", "0"], ["src", "assets/img/patient1.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "0.85", "flex-direction", "column", "justify-content", "center", "background", "#b4e1ff", "margin-bottom", "10px", "padding", "10px", "border", "1px solid #eaeaea", "border-left", "0", "border-right", "0"], [3, "click"], [1, "roomContents", 2, "display", "none"], [2, "display", "none"], [1, "membersWrapper"], ["id", "members"]], template: function MessaginghomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Messages");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "All Types");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Requests");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Treatment");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Discussion");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "DISCUSSION");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Name of patient");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "TREATMENT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Name of patient");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "img", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "REQUEST");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "b", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MessaginghomeComponent_Template_b_click_62_listener() { return ctx.thisroom("hello"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Name of patient");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey,Lorem ipsum dolot sit amey");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Member list:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "table", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"]], styles: ["body[_ngcontent-%COMP%] {\n  width: 80%;\n  margin: 0 auto;\n}\n\n.textOnInput[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -15px;\n  left: 23px;\n  padding: 2px;\n  z-index: 1;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:after {\n  content: \" \";\n  background-color: #fff;\n  width: 100%;\n  height: 13px;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\nlabel[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXG1lc3NhZ2luZ2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7QUFFRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtBQUVGOztBQUNBO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQUVGOztBQUNBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQUVGOztBQUNBO0VBQ0UsMkJBQUE7QUFFRiIsImZpbGUiOiJtZXNzYWdpbmdob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICB3aWR0aDo4MCU7XHJcbiAgbWFyZ2luOjAgYXV0bztcclxufVxyXG4udGV4dE9uSW5wdXQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnRleHRPbklucHV0IGxhYmVsIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtMTVweDtcclxuICBsZWZ0OiAyM3B4O1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4udGV4dE9uSW5wdXQgbGFiZWw6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IFwiIFwiO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxM3B4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiAtMTtcclxufVxyXG5cclxubGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbCB7XHJcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xyXG5cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/user.service */ "VITL");


class HomeComponent {
    constructor(userService) {
        this.userService = userService;
    }
    ngOnInit() {
        this.userService.getPublicContent().subscribe(data => {
            this.content = data;
        }, err => {
            this.content = JSON.parse(err.error).message;
        });
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"])); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 4, vars: 1, consts: [[1, "container"], [1, "jumbotron"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.content);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "AMz4":
/*!**********************************************!*\
  !*** ./src/app/icuhome/icuhome.component.ts ***!
  \**********************************************/
/*! exports provided: IcuhomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IcuhomeComponent", function() { return IcuhomeComponent; });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/modal */ "K3ix");
/* harmony import */ var src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/rfa.service */ "CGPM");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function IcuhomeComponent_a_42_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function IcuhomeComponent_a_42_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5); const p_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r4.gotofilledform(p_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Request for Admission - RFA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "b", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Chest Pain ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Seizure");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "b", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " Shortness of breath");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "b", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r3.date_of_admission);
} }
function IcuhomeComponent_a_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Admitted and waiting for patient transfer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "b", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Chest Pain ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Seizure");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "b", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " Shortness of breath");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "b", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r6.date_of_admission);
} }
function IcuhomeComponent_a_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Request for Admission Denied ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "b", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Chest Pain ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, " Seizure");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "b", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, " Shortness of breath");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "b", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const d_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](d_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](d_r7.date_of_admission);
} }
class IcuhomeComponent {
    constructor(modalService, rfaService, route, router) {
        this.modalService = modalService;
        this.rfaService = rfaService;
        this.route = route;
        this.router = router;
        this.facircle = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__["faCircle"];
    }
    // tslint:disable-next-line:typedef
    openModal(template, data) {
        this.declinedData = data;
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit() {
        this.pending = this.rfaService.getPending();
        this.accepted = this.rfaService.getAccepted();
        this.declined = this.rfaService.getDeclined();
    }
    gotoAdmission() {
        this.router.navigate(['/rfa']);
    }
    gotofilledform(data) {
        this.router.navigate(['/rfafilled', data._id]);
    }
}
IcuhomeComponent.ɵfac = function IcuhomeComponent_Factory(t) { return new (t || IcuhomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_2__["BsModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_3__["RfaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
IcuhomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: IcuhomeComponent, selectors: [["app-icuhome"]], decls: 48, vars: 9, consts: [[1, "textOnInput", 2, "margin-top", "20px"], ["for", "inputText"], [2, "width", "100%", "height", "auto", "border", "1px solid #8e8e8e", "border-radius", "10px", "margin-bottom", "20px"], [2, "display", "block"], [2, "display", "flex", "padding", "20px", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], [2, "flex", "1", "padding", "5px"], [1, "textOnInput"], ["placeholder", "Full Name", "type", "text", 1, "form-control"], ["type", "date", 1, "form-control"], [2, "flex", "0.5", "padding", "5px"], ["placeholder", "###-###-###-##", "type", "number", 1, "form-control"], ["placeholder", "Weight KG", "type", "number", 1, "form-control"], [2, "text-decoration", "none", 3, "click"], [2, "display", "flex", "flex", "1", "flex-direction", "row", "justify-content", "center"], [2, "display", "flex", "flex", "0.15", "flex-direction", "column", "justify-content", "center"], ["src", "assets/img/icurequest.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "0.85", "flex-direction", "column", "justify-content", "center", "background", "#59c1ff", "margin-bottom", "10px", "padding", "10px", "border", "1px solid #eaeaea", "border-left", "0", "border-right", "0"], [2, "display", "flex", "flex", "1", "align-self", "center", "color", "black", "background", "#59c1ff"], ["style", "text-decoration: none;", 4, "ngFor", "ngForOf"], [2, "text-decoration", "none"], [2, "display", "flex", "flex", "1", "flex-direction", "row", "justify-content", "center", 3, "click"], ["src", "assets/img/patient1.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "0.85", "flex-direction", "column", "justify-content", "center", "background", "white", "margin-bottom", "10px", "padding", "10px", "border", "1px solid #eaeaea", "border-left", "0", "border-right", "0"], [2, "display", "flex", "flex", "1", "align-self", "center", "color", "#cdcdcd"], [2, "display", "flex", "flex", "1", "margin-top", "-20px", "color", "#000100"], [2, "color", "#000100"], [2, "display", "inline-block", "margin-right", "2px", "width", "12px", "height", "12px", "background", "black", "border-radius", "50%"], [2, "vertical-align", "top"], [2, "display", "inline-block", "width", "12px", "height", "12px", "background", "black", "border-radius", "50%"], [2, "color", "#000100", "display", "flex", "justify-content", "space-between", "align-content", "space-between"], [2, "align-items", "baseline", "flex", "3", "display", "flex"], [2, "flex", "1", "display", "flex", "color", "#7c7c7c"], [2, "display", "flex", "flex", "1", "flex-direction", "row", "justify-content", "center", "background", "#cacacc", "opacity", "0.5"], ["src", "assets/img/patient2.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "1", "align-self", "center", "color", "#64ad4f"], [1, "denied", 2, "display", "flex", "flex", "1", "flex-direction", "row", "justify-content", "center"], ["src", "assets/img/patient3.png", "width", "80", "height", "80", 1, "rounded-circle", "img-fluid"], [2, "display", "flex", "flex", "1", "align-self", "center", "color", "#c15345"]], template: function IcuhomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "ICU Specialist Info");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Shift start time");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "ICU ID #");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Shift ended at:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function IcuhomeComponent_Template_a_click_33_listener() { return ctx.gotoAdmission(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](36, "img", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Direct ICU Admission");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](42, IcuhomeComponent_a_42_Template, 22, 2, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](43, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](44, IcuhomeComponent_a_44_Template, 22, 2, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](45, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](46, IcuhomeComponent_a_46_Template, 23, 2, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](47, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](43, 3, ctx.pending));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](45, 5, ctx.accepted));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](47, 7, ctx.declined));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: ["body[_ngcontent-%COMP%] {\n  width: 80%;\n  margin: 0 auto;\n}\n\n.textOnInput[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -15px;\n  left: 23px;\n  padding: 2px;\n  z-index: 1;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:after {\n  content: \" \";\n  background-color: #fff;\n  width: 100%;\n  height: 13px;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\nlabel[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGljdWhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7QUFFRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtBQUVGOztBQUNBO0VBQ0UsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtBQUVGOztBQUNBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQUVGOztBQUNBO0VBQ0UsMkJBQUE7QUFFRiIsImZpbGUiOiJpY3Vob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICB3aWR0aDo4MCU7XHJcbiAgbWFyZ2luOjAgYXV0bztcclxufVxyXG4udGV4dE9uSW5wdXQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLnRleHRPbklucHV0IGxhYmVsIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtMTVweDtcclxuICBsZWZ0OiAyM3B4O1xyXG4gIHBhZGRpbmc6IDJweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4udGV4dE9uSW5wdXQgbGFiZWw6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IFwiIFwiO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxM3B4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICB6LWluZGV4OiAtMTtcclxufVxyXG5cclxubGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcclxufVxyXG5cclxuLmZvcm0tY29udHJvbCB7XHJcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xyXG5cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BNo2":
/*!**************************************************!*\
  !*** ./src/app/rfafilled/rfafilled.component.ts ***!
  \**************************************************/
/*! exports provided: RfafilledComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RfafilledComponent", function() { return RfafilledComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recordrtc */ "qe5e");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recordrtc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/modal */ "K3ix");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/upload-files.service */ "GjtP");
/* harmony import */ var src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/_services/rfa.service */ "CGPM");
/* harmony import */ var _record_mic_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../record-mic.service */ "GmjU");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _components_upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/upload-files/upload-files.component */ "CZHk");












function RfafilledComponent_ng_template_221_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h4", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Modal");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_ng_template_221_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r30.modalRef == null ? null : ctx_r30.modalRef.hide(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "form", 95, 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function RfafilledComponent_ng_template_221_Template_form_ngSubmit_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31); const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](8); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _r28.form.valid && ctx_r32.onSubmit2(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Reasons");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "input", 97, 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_ng_template_221_Template_input_ngModelChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r33.form2.reasons = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "button", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_ng_template_221_Template_button_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r34.onSubmit2(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r27.form2.reasons);
} }
class RfafilledComponent {
    constructor(modalService, route, uploadService, rfaService, mic_record, sanatizer) {
        // @ts-ignore
        this.modalService = modalService;
        this.route = route;
        this.uploadService = uploadService;
        this.rfaService = rfaService;
        this.mic_record = mic_record;
        this.sanatizer = sanatizer;
        this.formId = this.route.snapshot.paramMap.get('id');
        // @ts-ignore
        this.Rfafilled = this.rfaService.getRfa(this.formId).subscribe(data => {
            this.Rfafilled = data['0'];
            console.log(this.Rfafilled);
            this.form.date_of_birth = new Date(this.Rfafilled.date_of_birth).toDateString(),
                this.form.age = this.Rfafilled.age,
                this.form.name = this.Rfafilled.name,
                this.form.gender = this.Rfafilled.gender,
                this.form.height = this.Rfafilled.height,
                this.form.weight = this.Rfafilled.weight,
                this.form.department = this.Rfafilled.department,
                this.form.date_of_admission = new Date(this.Rfafilled.date_of_admission).toDateString(),
                this.form.original_diagnosis = this.Rfafilled.original_diagnosis,
                this.form.shortness_of_breath = this.Rfafilled.shortness_of_breath,
                this.form.altered_state_of_mind = this.Rfafilled.altered_state_of_mind,
                this.form.chest_pain = this.Rfafilled.chest_pain,
                this.form.hypotension = this.Rfafilled.hypotension,
                this.form.cardiac_arrest = this.Rfafilled.cardiac_arrest,
                this.form.bleeding = this.Rfafilled.bleeding,
                this.form.arrhythmia = this.Rfafilled.arrhythmia,
                this.form.seizure = this.Rfafilled.seizure,
                this.form.focal_deficit = this.Rfafilled.focal_deficit,
                this.form.posto = this.Rfafilled.posto,
                this.form.other = this.Rfafilled.other,
                this.form.clinical = this.Rfafilled.clinical,
                this.form.lab = this.Rfafilled.lab,
                this.form.xray = this.Rfafilled.xray,
                this.form.cat = this.Rfafilled.cat,
                this.form.mri = this.Rfafilled.mri,
                this.form.ultrasound = this.Rfafilled.ultrasound,
                this.form.clinical2 = this.Rfafilled.clinical2,
                this.form.lab2 = this.Rfafilled.lab2,
                this.form.xray3 = this.Rfafilled.xray3,
                this.form.cat4 = this.Rfafilled.cat4,
                this.form.mri5 = this.Rfafilled.mri5,
                this.form.ultrasound6 = this.Rfafilled.ultrasound6,
                this.form.voice_notes = this.Rfafilled.voice_notes,
                this.form.status = this.Rfafilled.status;
        }, err => {
        });
        this.progress = 0;
        this.message = '';
        this.form = {
            name: this.Rfafilled.name,
            date_of_birth: this.Rfafilled.date_of_birth,
            age: this.Rfafilled.age,
            gender: this.Rfafilled.gender,
            height: this.Rfafilled.height,
            weight: this.Rfafilled.weight,
            department: this.Rfafilled.department,
            date_of_admission: this.Rfafilled.date_of_admission,
            // tslint:disable-next-line:no-bitwise
            original_diagnosis: this.Rfafilled.original_diagnosis,
            shortness_of_breath: this.Rfafilled.shortness_of_breath,
            altered_state_of_mind: this.Rfafilled.altered_state_of_mind,
            chest_pain: this.Rfafilled.chest_pain,
            hypotension: this.Rfafilled.hypotension,
            cardiac_arrest: this.Rfafilled.cardiac_arrest,
            bleeding: this.Rfafilled.bleeding,
            arrhythmia: this.Rfafilled.arrhythmia,
            seizure: this.Rfafilled.seizure,
            focal_deficit: this.Rfafilled.focal_deficit,
            posto: this.Rfafilled.posto,
            other: this.Rfafilled.other,
            clinical: this.Rfafilled.clinical,
            lab: this.Rfafilled.lab,
            xray: this.Rfafilled.xray,
            cat: this.Rfafilled.cat,
            mri: this.Rfafilled.mri,
            ultrasound: this.Rfafilled.ultrasound,
            clinical2: this.Rfafilled.clinical2,
            lab2: this.Rfafilled.lab2,
            xray3: this.Rfafilled.xray3,
            cat4: this.Rfafilled.cat4,
            mri5: this.Rfafilled.mri5,
            ultrasound6: this.Rfafilled.ultrasound6,
            voice_notes: this.Rfafilled.voice_notes,
            status: 'pending'
        };
        this.form2 = {
            id: this.formId,
            reasons: null,
        };
    }
    // tslint:disable-next-line:typedef
    openModal(template) {
        this.modalRef = this.modalService.show(template);
    }
    onSubmit2() {
        const { id, reasons } = this.form2;
        this.rfaService.declineRfa(id, reasons).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
        // @ts-ignore
        // @ts-ignore
        // this.createAudioElement2(this.Rfafilled.voice_notes);
    }
    nameUpdate($event) {
        console.log($event);
    }
    onSubmit() {
        const { name, date_of_birth, age, gender, height, weight, department, date_of_admission, original_diagnosis, shortness_of_breath, altered_state_of_mind, chest_pain, hypotension, cardiac_arrest, bleeding, arrhythmia, seizure, focal_deficit, posto, other, clinical, lab, xray, cat, mri, ultrasound, clinical2, lab2, xray3, cat4, mri5, ultrasound6, voice_notes, status } = this.form;
        this.rfaService.rfaAdmission(name, date_of_birth, age, gender, height, weight, department, date_of_admission, original_diagnosis, shortness_of_breath, altered_state_of_mind, chest_pain, hypotension, cardiac_arrest, bleeding, arrhythmia, seizure, focal_deficit, posto, other, clinical, lab, xray, cat, mri, ultrasound, clinical2, lab2, xray3, cat4, mri5, ultrasound6, voice_notes, status).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
    declineRfa() {
        // @ts-ignore
        this.rfaService.declineRfa(this.formId);
    }
    startRecording() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const mediaDeviceObj = navigator.mediaDevices;
            const micStream = yield mediaDeviceObj.getUserMedia({ audio: true });
            // const speakerStream = await mediaDeviceObj.getDisplayMedia({video: false, audio: true});
            this.mic_audio = new recordrtc__WEBPACK_IMPORTED_MODULE_1__["StereoAudioRecorder"](micStream, { audio: true });
            // this.speaker_audio = new RecordRTC.StereoAudioRecorder(speakerStream, {audio: true});
            this.mic_audio.record();
            console.log('Mic Reccording Started');
            // this.speaker_audio.record();
            console.log('Speaker Reccording Started');
        });
    }
    stopRecording() {
        this.mic_audio.stop((blob) => {
            console.log(blob);
            this.blobMicUrl = this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            this.blobTofile(blob, 'testAudioMic');
            this.createAudioElement(blob);
            console.log('Mic Recording Stopped');
        });
        // this.speaker_audio.stop((blob: Blob) => {
        //   console.log(blob);
        //   this.blobMicUrl = this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        //   // this.blobTofile(blob,"testAudioMic");
        //   this.createAudioElement(blob);
        //   console.log('Mic Recording Stopped');
        // });
    }
    blobTofile(blob, fileName) {
        console.log('Inside blob to File conversion');
        const b = (blob);
        b.lastModified = new Date();
        b.name = fileName;
        const auiodMicFile = blob;
        console.log(auiodMicFile, 'what is this?');
        // return auiodMicFile;
        if (auiodMicFile) {
            this.currentFile = auiodMicFile;
            console.log(this.currentFile, 'the current file');
            this.uploadService.upload(this.currentFile).subscribe((event) => {
                if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress) {
                    this.progress = Math.round(100 * event.loaded / event.total);
                }
                else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                    this.message = event.body.message;
                    this.fileInfos = this.uploadService.getFiles();
                }
            }, (err) => {
                console.log(err);
                this.progress = 0;
                if (err.error && err.error.message) {
                    this.message = err.error.message;
                }
                else {
                    this.message = 'Could not upload the file!';
                }
                this.currentFile = undefined;
            });
        }
    }
    createAudioElement2(url) {
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const audio = document.createElement('audio');
        const deleteButton = document.createElement('button');
        const articleMain = document.querySelector('article');
        // clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.innerHTML = 'Delete';
        //  clipLabel.innerHTML = clipName;
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        // @ts-ignore
        articleMain.appendChild(clipContainer);
        const blob = url;
        // const audioURL = window.URL.createObjectURL(blob);
        audio.src = 'http://localhost:8080/files/' + blob;
        this.form.voice_notes = audio.src;
        console.log(audio.src, 'audio source thingy');
        //  Delete button functionality
        // tslint:disable-next-line:only-arrow-functions typedef
        deleteButton.onclick = function (e) {
            const evtTgt = e.target;
            // @ts-ignore
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        };
    }
    // Code for creating Audio Element
    createAudioElement(blobMic) {
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const audio = document.createElement('audio');
        const deleteButton = document.createElement('button');
        const articleMain = document.querySelector('article');
        // clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.innerHTML = 'Delete';
        //  clipLabel.innerHTML = clipName;
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        // @ts-ignore
        articleMain.appendChild(clipContainer);
        const blob = blobMic;
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log(audio.src, 'audio source thingy');
        //  Delete button functionality
        // tslint:disable-next-line:only-arrow-functions typedef
        deleteButton.onclick = function (e) {
            const evtTgt = e.target;
            // @ts-ignore
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        };
    }
    upload() {
        this.progress = 0;
        if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            if (file) {
                this.currentFile = file;
                this.uploadService.upload(this.currentFile).subscribe((event) => {
                    if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    }
                    else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                        this.message = event.body.message;
                        this.fileInfos = this.uploadService.getFiles();
                    }
                }, (err) => {
                    console.log(err);
                    this.progress = 0;
                    if (err.error && err.error.message) {
                        this.message = err.error.message;
                    }
                    else {
                        this.message = 'Could not upload the file!';
                    }
                    this.currentFile = undefined;
                });
            }
            this.selectedFiles = undefined;
        }
    }
}
RfafilledComponent.ɵfac = function RfafilledComponent_Factory(t) { return new (t || RfafilledComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__["BsModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_6__["UploadFilesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_rfa_service__WEBPACK_IMPORTED_MODULE_7__["RfaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_record_mic_service__WEBPACK_IMPORTED_MODULE_8__["RecordMicService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__["DomSanitizer"])); };
RfafilledComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RfafilledComponent, selectors: [["app-rfafilled"]], decls: 223, vars: 25, consts: [["name", "form", "novalidate", "", 3, "ngSubmit"], ["f", "ngForm"], [1, "row"], [1, "col"], ["type", "button", 1, "btn", "btn-outline-primary", 2, "border-radius", "3px", "border-color", "rgb(255,255,255)", "border-bottom-style", "none", "border-bottom-color", "rgb(255,255,255)"], [1, "fa", "fa-chevron-left"], [1, "textOnInput", 2, "margin-top", "20px"], ["for", "inputText"], [2, "width", "100%", "height", "auto", "border-radius", "10px", ";border", "4px solid black", "margin-bottom", "20px"], [2, "display", "block"], [2, "display", "flex", "padding", "20px", "padding-bottom", "0px", "flex-wrap", "wrap", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], [2, "flex", "1", "padding", "5px"], [1, "textOnInput"], ["placeholder", "Full Name", "type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["name", "ngModel"], ["type", "text", "name", "date_of_birth", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["date_of_birth", "ngModel"], [2, "flex", "0.5", "padding", "5px"], ["type", "number", "name", "age", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["age", "ngModel"], [2, "display", "flex", "padding", "20px", "padding-bottom", "0px", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], ["placeholder", "Height cm", "type", "number", "name", "height", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["height", "ngModel"], ["placeholder", "Weight KG", "type", "number", "name", "weight", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["weight", "ngModel"], ["placeholder", "Medical Department: ER/OR/IP", "type", "number", "name", "department", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["department", "ngModel"], [2, "display", "flex", "padding", "20px", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], ["placeholder", "date", "type", "text", "name", "date_of_admission", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["date_of_admission", "ngModel"], [2, "width", "100%", "border-radius", "10px", "height", "auto", "border", "4px solid black", "margin-bottom", "20px"], ["placeholder", "Original Diagnosis", "name", "original_diagnosis", "type", "text", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["original_diagnosis", "ngModel"], ["for", "inputText", 2, "margin-left", "20px"], [2, "width", "100%", "height", "auto", "border-top", "2px solid black", "margin-bottom", "20px"], [2, "display", "flex", "padding", "20px", "flex", "1", "flex-direction", "column", "align-content", "center", "margin-bottom", "10px"], ["type", "checkbox", "value", "1", "name", "original_diagnosis", "required", "", 3, "ngModel", "ngModelChange"], ["shortness_of_breath", "ngModel"], ["type", "checkbox", "name", "altered_state_of_mind", "required", "", 3, "ngModel", "ngModelChange"], ["altered_state_of_mind", "ngModel"], ["type", "checkbox", "name", "chest_pain", "required", "", 3, "ngModel", "ngModelChange"], ["chest_pain", "ngModel"], ["type", "checkbox", "name", "hypotension", "required", "", 3, "ngModel", "ngModelChange"], ["hypotension", "ngModel"], ["type", "checkbox", "name", "cardiac_arrest", "required", "", 3, "ngModel", "ngModelChange"], ["cardiac_arrest", "ngModel"], ["type", "checkbox", "name", "bleeding", "required", "", 3, "ngModel", "ngModelChange"], ["bleeding", "ngModel"], ["type", "checkbox", "name", "arrhythmia", "required", "", 3, "ngModel", "ngModelChange"], ["arrhythmia", "ngModel"], ["type", "checkbox", "name", "seizure", "required", "", 3, "ngModel", "ngModelChange"], ["seizure", "ngModel"], ["type", "checkbox", "name", "focal_deficit", "required", "", 3, "ngModel", "ngModelChange"], ["focal_deficit", "ngModel"], ["type", "checkbox", "name", "posto", "required", "", 3, "ngModel", "ngModelChange"], ["posto", "ngModel"], [2, "width", "100%", "height", "auto", "border-top", "1px solid #ced4da", "margin-bottom", "20px"], ["id", "w3review", "name", "w3review", "rows", "4", "name", "other", "required", "", 3, "ngModel", "ngModelChange"], ["other", "ngModel"], [2, "display", "flex", "flex-direction", "row", "flex", "1"], [2, "display", "flex", "flex-direction", "column", "flex", "2"], [2, "display", "flex", "flex-direction", "row", "flex", "1", "justify-content", "space-evenly"], [2, "width", "100%", "height", "auto", "border-radius", "10px", "border", "1px solid #ced4da", "margin-bottom", "20px"], [3, "clinicalChild"], [2, "display", "flex", "justify-content", "space-between"], [2, "flex", "1"], ["type", "checkbox", "name", "clinical2", "required", "", 3, "ngModel", "ngModelChange"], ["clinical2", "ngModel"], ["type", "checkbox", "name", "lab2", "required", "", 3, "ngModel", "ngModelChange"], ["lab2", "ngModel"], ["type", "checkbox", "name", "xray3", "required", "", 3, "ngModel", "ngModelChange"], ["xray3", "ngModel"], ["type", "checkbox", "name", "cat4", "required", "", 3, "ngModel", "ngModelChange"], ["cat4", "ngModel"], ["type", "checkbox", "name", "mri5", "required", "", 3, "ngModel", "ngModelChange"], ["mri5", "ngModel"], ["type", "checkbox", "name", "ultrasound6", "required", "", 3, "ngModel", "ngModelChange"], ["ultrasound6", "ngModel"], [2, "display", "flex", "flex-direction", "column", "flex", "1", "justify-content", "space-evenly"], [1, "record", 3, "click"], [1, "stop", 3, "click"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "text-center", "d-flex", "flex-row", "justify-content-center", 2, "display", "flex", "padding", "10px", "width", "100%", "background", "#9ddcff", 3, "click"], ["tabindex", "-1", "role", "dialog", "aria-labelledby", "mySmallModalLabel", "aria-hidden", "true", 1, "modal", "fade", "bd-example-modal-lrg"], [1, "modal-dialog", "modal-lrg"], [1, "modal-content"], [2, "padding", "20px", "display", "flex"], [2, "padding-top", "50%", "padding-bottom", "50%", "margin", "0 auto", "align-items", "center", "justify-content", "center"], ["href", "icurequest.html", 2, "text-decoration", "none", "color", "black"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["template", ""], [1, "modal-header"], [1, "modal-title", "pull-left"], ["type", "button", "aria-label", "Close", 1, "btn-close", "close", "pull-right", 3, "click"], ["aria-hidden", "true", 1, "visually-hidden"], [1, "modal-body"], ["name", "form2", "novalidate", "", 3, "ngSubmit"], ["f2", "ngForm"], ["placeholder", "reasons", "type", "text", "name", "reasons", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["reasons", "ngModel"], [3, "click"]], template: function RfafilledComponent_Template(rf, ctx) { if (rf & 1) {
        const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "form", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function RfafilledComponent_Template_form_ngSubmit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](1); return _r0.form.valid && ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "\u00A0Back");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Admission");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, "Patient Personal Info");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "input", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_21_listener($event) { return ctx.form.name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "Date of Birth");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "input", 15, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_27_listener($event) { return ctx.form.date_of_birth = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Age");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "input", 18, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_33_listener($event) { return ctx.form.age = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Height");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "input", 21, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_41_listener($event) { return ctx.form.height = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, "Weight");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "input", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_47_listener($event) { return ctx.form.weight = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52, "Department");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "input", 25, 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_53_listener($event) { return ctx.form.department = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](55, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](56, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](61, "Date of Admission");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "input", 28, 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_62_listener($event) { return ctx.form.date_of_admission = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](64, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67, "Reasons for Requesting Transfer to ICU ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "Original Diagnosis");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "input", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_75_listener($event) { return ctx.form.original_diagnosis = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](79, "Reasons for Transfer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](80, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "input", 36, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_85_listener($event) { return ctx.form.shortness_of_breath = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, " Shortness of Beath");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "input", 38, 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_90_listener($event) { return ctx.form.altered_state_of_mind = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, " Altered Mental state");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "input", 40, 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_95_listener($event) { return ctx.form.chest_pain = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](98, " Chest pain");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "input", 42, 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_100_listener($event) { return ctx.form.hypotension = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](102, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](103, " Hypotension");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](104, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "input", 44, 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_106_listener($event) { return ctx.form.cardiac_arrest = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, " Cardiac arrest");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "input", 46, 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_111_listener($event) { return ctx.form.bleeding = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](114, " Bleeding");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "input", 48, 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_116_listener($event) { return ctx.form.arrhythmia = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, " Arrhythmia");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "input", 50, 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_121_listener($event) { return ctx.form.seizure = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](123, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](124, " Seizure");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "input", 52, 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_127_listener($event) { return ctx.form.focal_deficit = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](129, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](130, " Focal deficit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](131, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](132, "input", 54, 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_132_listener($event) { return ctx.form.posto = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](134, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](135, " Postoperative");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](137, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139, "Other: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](140, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](142, "textarea", 57, 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_textarea_ngModelChange_142_listener($event) { return ctx.form.other = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](144, "              List any other reasons or details");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](145, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](146, "div", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](147, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](148, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](150, "Digital Attachements");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](152, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](154, "app-upload-files", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("clinicalChild", function RfafilledComponent_Template_app_upload_files_clinicalChild_154_listener($event) { return ctx.nameUpdate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](155, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](156, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](157, "Physically sent with patient");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](158, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](159, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](160, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](161, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](163, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](164, "input", 66, 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_164_listener($event) { return ctx.form.clinical2 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](166, " Clinical report");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](167, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](168, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](169, "input", 68, 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_169_listener($event) { return ctx.form.lab2 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](171, " Lab report");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](172, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](174, "input", 70, 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_174_listener($event) { return ctx.form.xray3 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](176, " X-Ray Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](177, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](178, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](179, "input", 72, 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_179_listener($event) { return ctx.form.cat4 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](181, " CAT Scan Image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](182, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](183, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](184, "input", 74, 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_184_listener($event) { return ctx.form.mri5 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](186, " MRI Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](187, "span", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](188, "p", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](189, "input", 76, 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfafilledComponent_Template_input_ngModelChange_189_listener($event) { return ctx.form.ultrasound6 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](191, " Ultrasound Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](192, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](193, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](194, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](195, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](196, "Voice Notes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](197, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](198, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](199, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](200, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](201, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](202, "button", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_Template_button_click_202_listener() { return ctx.startRecording(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](203, "Start Recording");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](204, "button", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_Template_button_click_204_listener() { return ctx.stopRecording(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](205, "Stop Recording");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](206, "button", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_Template_button_click_206_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](207, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](208, "Submit request to transfer to ICU");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](209, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](210, "div", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](211, "div", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](212, "div", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](213, "h4", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](214, "a", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](215, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](216, "Your Request Has Been ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](217, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](218, " Submitted Successfully");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](219, "button", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfafilledComponent_Template_button_click_219_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r35); const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](222); return ctx.openModal(_r26); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](220, "Create template modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](221, RfafilledComponent_ng_template_221_Template, 15, 1, "ng-template", null, 89, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.date_of_birth);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.age);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.height);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.department);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.date_of_admission);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.original_diagnosis);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.shortness_of_breath);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.altered_state_of_mind);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.chest_pain);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.hypotension);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.cardiac_arrest);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.bleeding);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.arrhythmia);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.seizure);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.focal_deficit);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.posto);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.other);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.clinical2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.lab2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.xray3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.cat4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.mri5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.ultrasound6);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["CheckboxRequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["CheckboxControlValueAccessor"], _components_upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_11__["UploadFilesComponent"]], styles: ["body[_ngcontent-%COMP%] {\n  width: 80%;\n  margin: 0 auto;\n}\n\n.textOnInput[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -15px;\n  left: 23px;\n  padding: 2px;\n  z-index: 1;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:after {\n  content: \" \";\n  background-color: #fff;\n  width: 100%;\n  height: 13px;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\nlabel[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHJmYWZpbGxlZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FBRUY7O0FBQ0E7RUFDRSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0FBRUY7O0FBQ0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBRUY7O0FBQ0E7RUFDRSwyQkFBQTtBQUVGIiwiZmlsZSI6InJmYWZpbGxlZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgd2lkdGg6ODAlO1xyXG4gIG1hcmdpbjowIGF1dG87XHJcbn1cclxuLnRleHRPbklucHV0IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi50ZXh0T25JbnB1dCBsYWJlbCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogLTE1cHg7XHJcbiAgbGVmdDogMjNweDtcclxuICBwYWRkaW5nOiAycHg7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLnRleHRPbklucHV0IGxhYmVsOmFmdGVyIHtcclxuICBjb250ZW50OiBcIiBcIjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTNweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgei1pbmRleDogLTE7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgbWFyZ2luLWJvdHRvbTogLjVyZW07XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wge1xyXG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcclxuXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "CGPM":
/*!******************************************!*\
  !*** ./src/app/_services/rfa.service.ts ***!
  \******************************************/
/*! exports provided: RfaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RfaService", function() { return RfaService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const AUTH_API = 'http://localhost:8080/api/rfa';
const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({ 'Content-Type': 'application/json' })
};
class RfaService {
    constructor(http) {
        this.http = http;
    }
    rfaAdmission(name, date_of_birth, age, gender, height, weight, department, date_of_admission, original_diagnosis, shortness_of_breath, altered_state_of_mind, chest_pain, hypotension, cardiac_arrest, bleeding, arrhythmia, seizure, focal_deficit, posto, other, clinical, lab, xray, cat, mri, ultrasound, clinical2, lab2, xray3, cat4, mri5, ultrasound6, voice_notes, status) {
        return this.http.post(AUTH_API, {
            name,
            date_of_birth,
            age,
            gender,
            height,
            weight,
            department,
            date_of_admission,
            original_diagnosis,
            shortness_of_breath,
            altered_state_of_mind,
            chest_pain,
            hypotension,
            cardiac_arrest,
            bleeding,
            arrhythmia,
            seizure,
            focal_deficit,
            posto,
            other,
            clinical,
            lab,
            xray,
            cat,
            mri,
            ultrasound,
            clinical2,
            lab2,
            xray3,
            cat4,
            mri5,
            ultrasound6,
            voice_notes,
            status
        }, httpOptions);
    }
    getPending() {
        return this.http.get(`${AUTH_API}/pending`);
    }
    getAccepted() {
        return this.http.get(`${AUTH_API}/accepted`);
    }
    getDeclined() {
        return this.http.get(`${AUTH_API}/declined`);
    }
    getRfa(id) {
        return this.http.get(`${AUTH_API}/${id}`);
    }
    declineRfa(id, reasons) {
        return this.http.post(`${AUTH_API}/${id}/decline`, { id, reasons }, httpOptions);
    }
}
RfaService.ɵfac = function RfaService_Factory(t) { return new (t || RfaService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
RfaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RfaService, factory: RfaService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "CZHk":
/*!*******************************************************************!*\
  !*** ./src/app/components/upload-files/upload-files.component.ts ***!
  \*******************************************************************/
/*! exports provided: UploadFilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFilesComponent", function() { return UploadFilesComponent; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/upload-files.service */ "GjtP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





const _c0 = function (a0) { return { width: a0 }; };
function UploadFilesComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, ctx_r0.progress + "%"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-valuenow", ctx_r0.progress);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.progress, "% ");
} }
function UploadFilesComponent_div_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.message);
} }
// @ts-ignore
class UploadFilesComponent {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.clinicalChild = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.progress = 0;
        this.message = '';
        // @ts-ignore
        // @ts-ignore
    }
    ngOnInit() {
        this.fileInfos = this.uploadService.getFiles();
    }
    selectFile(event, category) {
        this.category = category;
        console.log(this.category, 'el category');
        this.selectedFiles = event.target.files;
        this.upload();
    }
    upload() {
        this.progress = 0;
        if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            if (file) {
                this.currentFile = file;
                this.uploadService.upload(this.currentFile).subscribe((event) => {
                    if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpEventType"].UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    }
                    else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpResponse"]) {
                        this.message = event.body.message;
                        console.log(this.message);
                        const a = {
                            category: this.category,
                            name: this.message
                        };
                        // @ts-ignore
                        this.updateParent(a);
                        this.fileInfos = this.uploadService.getFiles();
                    }
                }, (err) => {
                    console.log(err);
                    this.progress = 0;
                    if (err.error && err.error.message) {
                        this.message = err.error.message;
                    }
                    else {
                        this.message = 'Could not upload the file!';
                    }
                    this.currentFile = undefined;
                });
            }
            this.selectedFiles = undefined;
        }
    }
    updateParent(name) {
        // @ts-ignore
        this.clinicalChild.emit(name);
    }
}
UploadFilesComponent.ɵfac = function UploadFilesComponent_Factory(t) { return new (t || UploadFilesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_2__["UploadFilesService"])); };
UploadFilesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UploadFilesComponent, selectors: [["app-upload-files"]], outputs: { clinicalChild: "clinicalChild" }, decls: 62, vars: 8, consts: [[1, "row"], [1, "col-8"], [2, "flex", "1", "margin-bottom", "0px"], [1, "btn", "btn-default", "p-0"], ["type", "file", 3, "change"], [1, "col-4"], [1, "btn", "btn-success", "btn-sm", 2, "border", "0px", "color", "#2b9ae9", "background", "transparent", "text-decoration", "underline", 3, "disabled", "click"], ["class", "progress my-3", 4, "ngIf"], ["class", "alert alert-secondary", "role", "alert", 4, "ngIf"], [1, "progress", "my-3"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "progress-bar-info", "progress-bar-striped", 3, "ngStyle"], ["role", "alert", 1, "alert", "alert-secondary"]], template: function UploadFilesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Clinical report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_5_listener($event) { return ctx.selectFile($event, "clinical"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_7_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Lab report");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_15_listener($event) { return ctx.selectFile($event, "lab"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_17_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "X-Ray Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_25_listener($event) { return ctx.selectFile($event, "xray"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_27_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "CAT Scan Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_35_listener($event) { return ctx.selectFile($event, "catscan"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_37_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "MRI Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_45_listener($event) { return ctx.selectFile($event, "mri"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_47_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Ultrasound Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function UploadFilesComponent_Template_input_change_55_listener($event) { return ctx.selectFile($event, "ultrasound"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function UploadFilesComponent_Template_button_click_57_listener() { return ctx.upload(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, " UPLOAD");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](60, UploadFilesComponent_div_60_Template, 3, 5, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](61, UploadFilesComponent_div_61_Template, 2, 1, "div", 8);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.selectedFiles);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.currentFile);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.message);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgStyle"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1cGxvYWQtZmlsZXMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "FQmJ":
/*!****************************************************!*\
  !*** ./src/app/_services/token-storage.service.ts ***!
  \****************************************************/
/*! exports provided: TokenStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenStorageService", function() { return TokenStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
class TokenStorageService {
    constructor() { }
    signOut() {
        window.sessionStorage.clear();
    }
    saveToken(token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }
    getToken() {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }
    saveUser(user) {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    getUser() {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}
TokenStorageService.ɵfac = function TokenStorageService_Factory(t) { return new (t || TokenStorageService)(); };
TokenStorageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TokenStorageService, factory: TokenStorageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "GjtP":
/*!***************************************************!*\
  !*** ./src/app/_services/upload-files.service.ts ***!
  \***************************************************/
/*! exports provided: UploadFilesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFilesService", function() { return UploadFilesService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



class UploadFilesService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080';
    }
    upload(file) {
        const formData = new FormData();
        formData.append('file', file);
        const req = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpRequest"]('POST', `${this.baseUrl}/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
    getFiles() {
        return this.http.get(`${this.baseUrl}/files`);
    }
}
UploadFilesService.ɵfac = function UploadFilesService_Factory(t) { return new (t || UploadFilesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
UploadFilesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UploadFilesService, factory: UploadFilesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "GmjU":
/*!***************************************!*\
  !*** ./src/app/record-mic.service.ts ***!
  \***************************************/
/*! exports provided: RecordMicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecordMicService", function() { return RecordMicService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class RecordMicService {
    constructor() { }
}
RecordMicService.ɵfac = function RecordMicService_Factory(t) { return new (t || RecordMicService)(); };
RecordMicService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RecordMicService, factory: RecordMicService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "LkI3":
/*!****************************************************!*\
  !*** ./src/app/calculator/calculator.component.ts ***!
  \****************************************************/
/*! exports provided: CalculatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatorComponent", function() { return CalculatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CalculatorComponent {
    constructor() { }
    ngOnInit() {
    }
}
CalculatorComponent.ɵfac = function CalculatorComponent_Factory(t) { return new (t || CalculatorComponent)(); };
CalculatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CalculatorComponent, selectors: [["app-calculator"]], decls: 1, vars: 0, consts: [["src", "https://qxmd.com/calculate/calculator_42/framingham-chf-criteria", 2, "border", "0", "box-shadow", "none", "min-height", "720px", "min-width", "310px", "width", "100%", "max-width", "720px", "overflow", "hidden"]], template: function CalculatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 0);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYWxjdWxhdG9yLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Nv+Q":
/*!****************************************************!*\
  !*** ./src/app/board-user/board-user.component.ts ***!
  \****************************************************/
/*! exports provided: BoardUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardUserComponent", function() { return BoardUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/user.service */ "VITL");


class BoardUserComponent {
    constructor(userService) {
        this.userService = userService;
    }
    ngOnInit() {
        this.userService.getUserBoard().subscribe(data => {
            this.content = data;
        }, err => {
            this.content = JSON.parse(err.error).message;
        });
    }
}
BoardUserComponent.ɵfac = function BoardUserComponent_Factory(t) { return new (t || BoardUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"])); };
BoardUserComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BoardUserComponent, selectors: [["app-board-user"]], decls: 4, vars: 1, consts: [[1, "container"], [1, "jumbotron"]], template: function BoardUserComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.content);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJib2FyZC11c2VyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/token-storage.service */ "FQmJ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




function AppComponent_div_0_ul_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.username);
} }
function AppComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_0_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "LogOut");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, AppComponent_div_0_ul_4_Template, 5, 1, "ul", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isLoggedIn);
} }
function AppComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(tokenStorageService) {
        this.tokenStorageService = tokenStorageService;
        this.title = 'concAngular';
        this.roles = [];
        this.isLoggedIn = false;
        this.showAdminBoard = false;
        this.showModeratorBoard = false;
        this.nav = localStorage.getItem('nav');
    }
    ngOnInit() {
        this.nav = localStorage.getItem('nav');
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
            this.username = user.username;
        }
    }
    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_token_storage_service__WEBPACK_IMPORTED_MODULE_1__["TokenStorageService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 2, consts: [["id", "app", 4, "ngIf"], [4, "ngIf"], ["id", "app"], [1, "nav-link", 2, "position", "absolute", "z-index", "9999", 3, "click"], [1, "navbar", "navbar-expand", 2, "justify-content", "flex-end"], ["class", "navbar-nav ml-auto", 4, "ngIf"], [1, "navbar-nav", "ml-auto"], [1, "nav-item"], ["src", "assets/img/header.png", "width", "70", "height", "70", 1, "rounded-circle", "img-fluid", "image-header", 2, "text-align", "right"], ["href", "/profile", "routerLink", "profile", 1, "nav-link"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AppComponent_div_0_Template, 7, 1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_div_1_Template, 2, 0, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoggedIn || ctx.nav != "off");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);


/***/ }),

/***/ "VITL":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");


const API_URL = 'http://localhost:8080/api/test/';
class UserService {
    constructor(http) {
        this.http = http;
    }
    getPublicContent() {
        return this.http.get(API_URL + 'all', { responseType: 'text' });
    }
    getUserBoard() {
        return this.http.get(API_URL + 'user', { responseType: 'text' });
    }
    getModeratorBoard() {
        return this.http.get(API_URL + 'mod', { responseType: 'text' });
    }
    getAdminBoard() {
        return this.http.get(API_URL + 'admin', { responseType: 'text' });
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "W6KJ":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/token-storage.service */ "FQmJ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



function ProfileComponent_div_0_li_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const role_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", role_r4, " ");
} }
function ProfileComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Token:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Email:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Roles:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, ProfileComponent_div_0_li_17_Template, 2, 1, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.currentUser.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", ctx_r0.currentUser.accessToken.substring(0, 20), " ... ", ctx_r0.currentUser.accessToken.substr(ctx_r0.currentUser.accessToken.length - 20), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.currentUser.email, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.currentUser.roles);
} }
function ProfileComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0, " Please login.\n");
} }
class ProfileComponent {
    constructor(token) {
        this.token = token;
    }
    ngOnInit() {
        this.currentUser = this.token.getUser();
    }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) { return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_token_storage_service__WEBPACK_IMPORTED_MODULE_1__["TokenStorageService"])); };
ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProfileComponent, selectors: [["app-profile"]], decls: 3, vars: 2, consts: [["class", "container", 4, "ngIf", "ngIfElse"], ["loggedOut", ""], [1, "container"], [1, "jumbotron"], [4, "ngFor", "ngForOf"]], template: function ProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProfileComponent_div_0_Template, 18, 5, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProfileComponent_ng_template_1_Template, 1, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.currentUser)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header/header.component */ "fECr");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer/footer.component */ "fp1T");
/* harmony import */ var _welcomepage_welcomepage_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./welcomepage/welcomepage.component */ "hyiv");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "44PX");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./calculator/calculator.component */ "LkI3");
/* harmony import */ var _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./icuhome/icuhome.component */ "AMz4");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./register/register.component */ "1W4x");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _helpers_auth_interceptor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_helpers/auth.interceptor */ "tElQ");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./profile/profile.component */ "W6KJ");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./user/user.component */ "3nXK");
/* harmony import */ var _board_user_board_user_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./board-user/board-user.component */ "Nv+Q");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rfa_rfa_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./rfa/rfa.component */ "q1cZ");
/* harmony import */ var _components_upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/upload-files/upload-files.component */ "CZHk");
/* harmony import */ var _icudirectrequest_icudirectrequest_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./icudirectrequest/icudirectrequest.component */ "3/gx");
/* harmony import */ var _rfafilled_rfafilled_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./rfafilled/rfafilled.component */ "BNo2");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-bootstrap/modal */ "K3ix");
/* harmony import */ var _icubeds_icubeds_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./icubeds/icubeds.component */ "ftbM");
/* harmony import */ var _messaginghome_messaginghome_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./messaginghome/messaginghome.component */ "8cPU");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./chat/chat.component */ "+XlM");
/* harmony import */ var _patientlisting_patientlisting_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./patientlisting/patientlisting.component */ "zvGY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/core */ "fXoL");


































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_30__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_30__["ɵɵdefineInjector"]({ providers: [_helpers_auth_interceptor__WEBPACK_IMPORTED_MODULE_15__["authInterceptorProviders"]], imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_20__["RouterModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__["TabsModule"].forRoot(),
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_25__["ModalModule"].forRoot()
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_30__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
        _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
        _welcomepage_welcomepage_component__WEBPACK_IMPORTED_MODULE_5__["WelcomepageComponent"],
        _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_9__["CalculatorComponent"],
        _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_10__["IcuhomeComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
        _register_register_component__WEBPACK_IMPORTED_MODULE_12__["RegisterComponent"],
        _profile_profile_component__WEBPACK_IMPORTED_MODULE_16__["ProfileComponent"],
        _home_home_component__WEBPACK_IMPORTED_MODULE_17__["HomeComponent"],
        _user_user_component__WEBPACK_IMPORTED_MODULE_18__["UserComponent"],
        _board_user_board_user_component__WEBPACK_IMPORTED_MODULE_19__["BoardUserComponent"],
        _rfa_rfa_component__WEBPACK_IMPORTED_MODULE_21__["RfaComponent"],
        _components_upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_22__["UploadFilesComponent"],
        _icudirectrequest_icudirectrequest_component__WEBPACK_IMPORTED_MODULE_23__["IcudirectrequestComponent"],
        _rfafilled_rfafilled_component__WEBPACK_IMPORTED_MODULE_24__["RfafilledComponent"],
        _icubeds_icubeds_component__WEBPACK_IMPORTED_MODULE_26__["IcubedsComponent"],
        _messaginghome_messaginghome_component__WEBPACK_IMPORTED_MODULE_27__["MessaginghomeComponent"],
        _chat_chat_component__WEBPACK_IMPORTED_MODULE_28__["ChatComponent"],
        _patientlisting_patientlisting_component__WEBPACK_IMPORTED_MODULE_29__["PatientlistingComponent"]], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_20__["RouterModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"], ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__["TabsModule"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_14__["HttpClientModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_25__["ModalModule"]] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_30__["ɵɵsetComponentScope"](_rfa_rfa_component__WEBPACK_IMPORTED_MODULE_21__["RfaComponent"], [_angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["CheckboxRequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["CheckboxControlValueAccessor"], _components_upload_files_upload_files_component__WEBPACK_IMPORTED_MODULE_22__["UploadFilesComponent"]], []);


/***/ }),

/***/ "fECr":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class HeaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 13, vars: 0, consts: [["role", "banner", 1, "toolbar"], ["width", "40", "alt", "Angular Logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="], [1, "spacer"], ["aria-label", "Angular on twitter", "target", "_blank", "rel", "noopener", "href", "https://twitter.com/angular", "title", "Twitter"], ["id", "twitter-logo", "height", "24", "data-name", "Logo", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 400 400"], ["width", "400", "height", "400", "fill", "none"], ["d", "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23", "fill", "#fff"], ["aria-label", "Angular on YouTube", "target", "_blank", "rel", "noopener", "href", "https://youtube.com/angular", "title", "YouTube"], ["id", "youtube-logo", "height", "24", "width", "24", "data-name", "Logo", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "#fff"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Welcome");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "svg", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "rect", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "svg", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toolbar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  background-color: #1976d2;\n  color: white;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: 0 8px;\n}\n.toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: 0 16px;\n}\n.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 960px;\n  flex-direction: column;\n  align-items: center;\n}\nsvg.material-icons[_ngcontent-%COMP%] {\n  height: 24px;\n  width: auto;\n}\nsvg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 8px;\n}\n.card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: #888;\n}\n.card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: 16px;\n}\n.card[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  border: 1px solid #eee;\n  background-color: #fafafa;\n  height: 40px;\n  width: 200px;\n  margin: 0 8px 16px;\n  padding: 16px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.2s ease-in-out;\n  line-height: 24px;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0;\n}\n.card.card-small[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 168px;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n  cursor: pointer;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n  transform: translateY(-3px);\n  box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: #696767;\n}\n.card.highlight-card[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: white;\n  font-weight: 600;\n  border: none;\n  width: auto;\n  min-width: 30%;\n  position: relative;\n}\n.card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 60px;\n}\nsvg#rocket[_ngcontent-%COMP%] {\n  width: 80px;\n  position: absolute;\n  left: -10px;\n  top: -24px;\n}\nsvg#rocket-smoke[_ngcontent-%COMP%] {\n  height: calc(100vh - 95px);\n  position: absolute;\n  top: 10px;\n  right: 180px;\n  z-index: -10;\n}\na[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n  color: #1976d2;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  color: #125699;\n}\n.terminal[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80%;\n  max-width: 600px;\n  border-radius: 6px;\n  padding-top: 45px;\n  margin-top: 8px;\n  overflow: hidden;\n  background-color: #0f0f10;\n}\n.terminal[_ngcontent-%COMP%]::before {\n  content: \"\u2022\u2022\u2022\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 4px;\n  background: #3a3a3a;\n  color: #c2c3c4;\n  width: 100%;\n  font-size: 2rem;\n  line-height: 0;\n  padding: 14px 0;\n  text-indent: 4px;\n}\n.terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;\n  color: white;\n  padding: 0 1rem 1rem;\n  margin: 0;\n}\n.circle-link[_ngcontent-%COMP%] {\n  height: 40px;\n  width: 40px;\n  border-radius: 40px;\n  margin: 8px;\n  background-color: white;\n  border: 1px solid #eeeeee;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: 1s ease-out;\n}\n.circle-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-0.25rem);\n  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n}\nfooter[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  line-height: 20px;\n}\nfooter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.github-star-badge[_ngcontent-%COMP%] {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n.github-star-badge[_ngcontent-%COMP%]:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\nsvg#clouds[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: -160px;\n  left: -230px;\n  z-index: -10;\n  width: 1920px;\n}\n\n@media screen and (max-width: 767px) {\n  .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    height: 16px;\n    margin: 8px 0;\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 72px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    right: 120px;\n    transform: rotate(-5deg);\n  }\n}\n@media screen and (max-width: 575px) {\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    display: none;\n    visibility: hidden;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDRSwwSkFBQTtFQUNBLGVBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQ0FBQTtFQUNBLGtDQUFBO0FBRUY7QUFDQTs7Ozs7O0VBTUUsYUFBQTtBQUVGO0FBQ0E7RUFDRSxTQUFBO0FBRUY7QUFDQTtFQUNFLE9BQUE7QUFFRjtBQUNBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQUNBO0VBQ0UsY0FBQTtBQUVGO0FBQ0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtBQUVGO0FBQ0E7RUFDRSxZQUFBO0VBQ0EsY0FBQTtBQUVGO0FBQ0E7O0VBRUUsWUFBQTtBQUVGO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBRUY7QUFDQTtFQUNFLGlCQUFBO0FBRUY7QUFDQTtFQUNFLFVBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FBRUY7QUFDQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsZUFBQTtBQUVGO0FBQ0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUVGO0FBQ0E7RUFDRSxlQUFBO0FBRUY7QUFDQTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtBQUVGO0FBQ0E7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBRUY7QUFDQTtFQUNFLGlCQUFBO0FBRUY7QUFDQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBRUY7QUFDQTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFFRjtBQUNBOzs7RUFHRSxjQUFBO0VBQ0EscUJBQUE7QUFFRjtBQUNBO0VBQ0UsY0FBQTtBQUVGO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQUVGO0FBQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQUNBO0VBQ0Usd0VBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHdFQUFBO0VBQ0EsdUJBQUE7QUFFRjtBQUNBO0VBQ0UsK0JBQUE7RUFDQSwyQ0FBQTtBQUVGO0FBQ0E7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBRUY7QUFDQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0VBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMElBQUE7QUFFRjtBQUNBO0VBQ0UsZ0VBQUE7RUFDQSxvQ0FBQTtFQUNBLDJCQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFFRjtBQUVBLHNCQUFBO0FBQ0E7RUFFRTs7SUFFRSxXQUFBO0VBQUY7O0VBR0E7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQUFGOztFQUdBO0lBQ0UsaUJBQUE7RUFBRjs7RUFHQTtJQUNFLFlBQUE7SUFDQSx3QkFBQTtFQUFGO0FBQ0Y7QUFHQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLGtCQUFBO0VBREY7QUFDRiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG46aG9zdCB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNiB7XG4gIG1hcmdpbjogOHB4IDA7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi5zcGFjZXIge1xuICBmbGV4OiAxO1xufVxuXG4udG9vbGJhciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiA2MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50b29sYmFyIGltZyB7XG4gIG1hcmdpbjogMCAxNnB4O1xufVxuXG4udG9vbGJhciAjdHdpdHRlci1sb2dvIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICBtYXJnaW46IDAgOHB4O1xufVxuXG4udG9vbGJhciAjeW91dHViZS1sb2dvIHtcbiAgaGVpZ2h0OiA0MHB4O1xuICBtYXJnaW46IDAgMTZweDtcbn1cblxuLnRvb2xiYXIgI3R3aXR0ZXItbG9nbzpob3Zlcixcbi50b29sYmFyICN5b3V0dWJlLWxvZ286aG92ZXIge1xuICBvcGFjaXR5OiAwLjg7XG59XG5cbi5jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luOiA4MnB4IGF1dG8gMzJweDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBtYXgtd2lkdGg6IDk2MHB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5zdmcubWF0ZXJpYWwtaWNvbnMge1xuICBoZWlnaHQ6IDI0cHg7XG4gIHdpZHRoOiBhdXRvO1xufVxuXG5zdmcubWF0ZXJpYWwtaWNvbnM6bm90KDpsYXN0LWNoaWxkKSB7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uY2FyZCBzdmcubWF0ZXJpYWwtaWNvbnMgcGF0aCB7XG4gIGZpbGw6ICM4ODg7XG59XG5cbi5jYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xuICBoZWlnaHQ6IDQwcHg7XG4gIHdpZHRoOiAyMDBweDtcbiAgbWFyZ2luOiAwIDhweCAxNnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xufVxuXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KDpsYXN0LWNoaWxkKSB7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxuLmNhcmQuY2FyZC1zbWFsbCB7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2OHB4O1xufVxuXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jYXJkLWNvbnRhaW5lciAuY2FyZDpub3QoLmhpZ2hsaWdodC1jYXJkKTpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTdweCByZ2JhKDAsIDAsIDAsIDAuMzUpO1xufVxuXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCk6aG92ZXIgLm1hdGVyaWFsLWljb25zIHBhdGgge1xuICBmaWxsOiAjNjk2NzY3O1xufVxuXG4uY2FyZC5oaWdobGlnaHQtY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxOTc2ZDI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogYXV0bztcbiAgbWluLXdpZHRoOiAzMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhcmQuY2FyZC5oaWdobGlnaHQtY2FyZCBzcGFuIHtcbiAgbWFyZ2luLWxlZnQ6IDYwcHg7XG59XG5cbnN2ZyNyb2NrZXQge1xuICB3aWR0aDogODBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAtMTBweDtcbiAgdG9wOiAtMjRweDtcbn1cblxuc3ZnI3JvY2tldC1zbW9rZSB7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDk1cHgpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTBweDtcbiAgcmlnaHQ6IDE4MHB4O1xuICB6LWluZGV4OiAtMTA7XG59XG5cbmEsXG5hOnZpc2l0ZWQsXG5hOmhvdmVyIHtcbiAgY29sb3I6ICMxOTc2ZDI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuYTpob3ZlciB7XG4gIGNvbG9yOiAjMTI1Njk5O1xufVxuXG4udGVybWluYWwge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiA4MCU7XG4gIG1heC13aWR0aDogNjAwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZy10b3A6IDQ1cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBmMGYxMDtcbn1cblxuLnRlcm1pbmFsOjpiZWZvcmUge1xuICBjb250ZW50OiBcIuKAouKAouKAolwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQ6ICMzYTNhM2E7XG4gIGNvbG9yOiAjYzJjM2M0O1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcGFkZGluZzogMTRweCAwO1xuICB0ZXh0LWluZGVudDogNHB4O1xufVxuXG4udGVybWluYWwgcHJlIHtcbiAgZm9udC1mYW1pbHk6IFNGTW9uby1SZWd1bGFyLCBDb25zb2xhcywgTGliZXJhdGlvbiBNb25vLCBNZW5sbywgbW9ub3NwYWNlO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDAgMXJlbSAxcmVtO1xuICBtYXJnaW46IDA7XG59XG5cbi5jaXJjbGUtbGluayB7XG4gIGhlaWdodDogNDBweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gIG1hcmdpbjogOHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZWVlZTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4xMiksIDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMjQpO1xuICB0cmFuc2l0aW9uOiAxcyBlYXNlLW91dDtcbn1cblxuLmNpcmNsZS1saW5rOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjI1cmVtKTtcbiAgYm94LXNoYWRvdzogMHB4IDNweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbn1cblxuZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMjBweDtcbn1cblxuZm9vdGVyIGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uZ2l0aHViLXN0YXItYmFkZ2Uge1xuICBjb2xvcjogIzI0MjkyZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nOiAzcHggMTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNywgMzEsIDM1LCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZmFmYmZjLCAjZWZmM2Y2IDkwJSk7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFNlZ29lIFVJLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBBcHBsZSBDb2xvciBFbW9qaSwgU2Vnb2UgVUkgRW1vamksIFNlZ29lIFVJIFN5bWJvbDtcbn1cblxuLmdpdGh1Yi1zdGFyLWJhZGdlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KC0xODBkZWcsICNmMGYzZjYsICNlNmViZjEgOTAlKTtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI3LCAzMSwgMzUsIDAuMzUpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMC41ZW07XG59XG5cbi5naXRodWItc3Rhci1iYWRnZSAubWF0ZXJpYWwtaWNvbnMge1xuICBoZWlnaHQ6IDE2cHg7XG4gIHdpZHRoOiAxNnB4O1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbn1cblxuc3ZnI2Nsb3VkcyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgYm90dG9tOiAtMTYwcHg7XG4gIGxlZnQ6IC0yMzBweDtcbiAgei1pbmRleDogLTEwO1xuICB3aWR0aDogMTkyMHB4O1xufVxuXG4vKiBSZXNwb25zaXZlIFN0eWxlcyAqL1xuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmNhcmQtY29udGFpbmVyID4gKjpub3QoLmNpcmNsZS1saW5rKSxcbi50ZXJtaW5hbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuY2FyZDpub3QoLmhpZ2hsaWdodC1jYXJkKSB7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIG1hcmdpbjogOHB4IDA7XG4gIH1cblxuICAuY2FyZC5oaWdobGlnaHQtY2FyZCBzcGFuIHtcbiAgICBtYXJnaW4tbGVmdDogNzJweDtcbiAgfVxuXG4gIHN2ZyNyb2NrZXQtc21va2Uge1xuICAgIHJpZ2h0OiAxMjBweDtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDU3NXB4KSB7XG4gIHN2ZyNyb2NrZXQtc21va2Uge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG59Il19 */"] });


/***/ }),

/***/ "fp1T":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "44PX");
/* harmony import */ var _messaginghome_messaginghome_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../messaginghome/messaginghome.component */ "8cPU");
/* harmony import */ var _patientlisting_patientlisting_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../patientlisting/patientlisting.component */ "zvGY");
/* harmony import */ var _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icuhome/icuhome.component */ "AMz4");
/* harmony import */ var _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../calculator/calculator.component */ "LkI3");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");








const _c0 = ["staticTabs"];
function FooterComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 2);
} }
function FooterComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 3);
} }
function FooterComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "fa-icon", 4);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", ctx_r2.fabed);
} }
function FooterComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 5);
} }
class FooterComponent {
    constructor() {
        this.fabed = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__["faBed"];
    }
    selectTab(tabId) {
        var _a;
        if ((_a = this.staticTabs) === null || _a === void 0 ? void 0 : _a.tabs[tabId]) {
            this.staticTabs.tabs[tabId].active = true;
        }
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], viewQuery: function FooterComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.staticTabs = _t.first);
    } }, decls: 13, vars: 1, consts: [[3, "justified"], ["tabHeading", ""], ["src", "assets/img/tab1.png", 1, "img-width-adj"], ["src", "assets/img/tab2.png", 1, "img-width-adj"], [3, "icon"], ["id", "s2", "src", "assets/img/tab4.png", 1, "img-width-adj"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tabset", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, FooterComponent_ng_template_2_Template, 1, 0, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-messaginghome");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FooterComponent_ng_template_5_Template, 1, 0, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "app-patientlisting");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, FooterComponent_ng_template_8_Template, 1, 1, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "app-icuhome");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, FooterComponent_ng_template_11_Template, 1, 0, "ng-template", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "app-calculator");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("justified", true);
    } }, directives: [ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_2__["TabsetComponent"], ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_2__["TabDirective"], ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_2__["TabHeadingDirective"], _messaginghome_messaginghome_component__WEBPACK_IMPORTED_MODULE_3__["MessaginghomeComponent"], _patientlisting_patientlisting_component__WEBPACK_IMPORTED_MODULE_4__["PatientlistingComponent"], _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_5__["IcuhomeComponent"], _calculator_calculator_component__WEBPACK_IMPORTED_MODULE_6__["CalculatorComponent"], _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FaIconComponent"]], styles: [".nav-tabs[_ngcontent-%COMP%] {\n  bottom: 1px;\n  position: absolute;\n  width: 100%;\n}\n\n.img-width-adj[_ngcontent-%COMP%] {\n  width: 5vw;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGZvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFDRjs7QUFDQTtFQUNFLFVBQUE7QUFFRiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2LXRhYnN7XHJcbiAgYm90dG9tOiAxcHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5pbWctd2lkdGgtYWRqe1xyXG4gIHdpZHRoOjV2dztcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "ftbM":
/*!**********************************************!*\
  !*** ./src/app/icubeds/icubeds.component.ts ***!
  \**********************************************/
/*! exports provided: IcubedsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IcubedsComponent", function() { return IcubedsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class IcubedsComponent {
    constructor() { }
    ngOnInit() {
    }
}
IcubedsComponent.ɵfac = function IcubedsComponent_Factory(t) { return new (t || IcubedsComponent)(); };
IcubedsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IcubedsComponent, selectors: [["app-icubeds"]], decls: 73, vars: 0, consts: [[1, "row", 2, "border-bottom-color", "#d6d6d6", "margin-top", "-100px"], [1, "col", 2, "color", "var(--bs-gray-900)", "border-bottom-color", "#d6d6d6"], [1, "text-center"], [1, "row"], [1, "col"], ["href", "/rfa"], ["type", "button", 1, "btn", "btn-outline-primary", 2, "border-radius", "3px", "border-color", "rgb(255,255,255)", "border-bottom-style", "none", "border-bottom-color", "rgb(255,255,255)"], [1, "fa", "fa-chevron-left"], [2, "border", "1px solid #f7f7f7", "flex", "1", "display", "flex"], [2, "border", "5px solid #89a2b4", "border-radius", "10px", "margin-top", "30px", "width", "90%", "margin", "0 auto", "margin-top", "30px", "background-color", "#b3b3b3", "display", "flex", "flex", "1", "padding", "20px"], [2, "display", "flex", "flex-direction", "column", "flex", "2"], [2, "background-color", "white", "color", "black", "padding", "10px", "width", "300px", "height", "40px"], [2, "display", "flex", "margin-top", "10px", "width", "300px", "flex", "1", "justify-content", "space-between"], [2, "background-color", "white", "padding", "5px", "color", "black", "width", "230px", "height", "40px"], [2, "background-color", "white", "padding", "5px", "color", "black", "width", "50px", "height", "40px"], [2, "display", "flex", "flex-direction", "column", "flex", "1"], [2, "background-color", "white", "color", "black", "text-align", "center", "border", "2px solid #467237", "border-radius", "10px", "width", "auto", "background-color", "#84fe58"], ["href", "rfa.html"], [2, "background-color", "white", "color", "black", "text-align", "center", "border", "2px solid #5b1812", "border-radius", "10px", "width", "auto", "background-color", "#ac0e00", "color", "white"]], template: function IcubedsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h6", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Request of ICU TRANSFERS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u00A0Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "ICU Unit Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Total number of beds");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "xx");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "total Beds available");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "ICU Unit Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Total number of beds");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "xx");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "total Beds available");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "ICU Unit Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Total number of beds");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "xx");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "total Beds available");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY3ViZWRzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "hyiv":
/*!******************************************************!*\
  !*** ./src/app/welcomepage/welcomepage.component.ts ***!
  \******************************************************/
/*! exports provided: WelcomepageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomepageComponent", function() { return WelcomepageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class WelcomepageComponent {
    constructor(route, router) {
        this.route = route;
        this.router = router;
    }
    goto(id) {
        this.router.navigate(['/login', id]);
    }
    ngOnInit() {
    }
}
WelcomepageComponent.ɵfac = function WelcomepageComponent_Factory(t) { return new (t || WelcomepageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
WelcomepageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomepageComponent, selectors: [["app-welcomepage"]], decls: 15, vars: 0, consts: [[1, "changeBackground", "align-middle"], [1, "row"], [1, "col-sm-12", "offset-sm-0", "offset-md-0"], [1, "text-center", 2, "margin-bottom", "40px"], [1, "text-center", 2, "margin-bottom", "80px"], [1, "col-md-12", "offset-md-0", "text-center"], ["src", "assets/img/1.png", 3, "click"], ["src", "assets/img/2.png", 3, "click"], ["src", "assets/img/3.png", 3, "click"], ["src", "assets/img/4.png", 3, "click"]], template: function WelcomepageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Welcome to Concilio Login Screen");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h4", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Please choose your role and use your username and password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomepageComponent_Template_img_click_10_listener() { return ctx.goto(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomepageComponent_Template_img_click_11_listener() { return ctx.goto(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomepageComponent_Template_img_click_13_listener() { return ctx.goto(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomepageComponent_Template_img_click_14_listener() { return ctx.goto(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".changeBackground[_ngcontent-%COMP%] {\n  background-color: #dbdbdb;\n  height: 100vh;\n}\n\nbody[_ngcontent-%COMP%] {\n  background-color: #dbdbdb;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHdlbGNvbWVwYWdlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBR0E7RUFDRSx5QkFBQTtBQUFGIiwiZmlsZSI6IndlbGNvbWVwYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNoYW5nZUJhY2tncm91bmR7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjojZGJkYmRiO1xyXG4gIGhlaWdodDogMTAwdmg7XHJcblxyXG59XHJcblxyXG5ib2R5e1xyXG4gIGJhY2tncm91bmQtY29sb3I6I2RiZGJkYjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "q1cZ":
/*!**************************************!*\
  !*** ./src/app/rfa/rfa.component.ts ***!
  \**************************************/
/*! exports provided: RfaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RfaComponent", function() { return RfaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recordrtc */ "qe5e");
/* harmony import */ var recordrtc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recordrtc__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/modal */ "K3ix");
/* harmony import */ var src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/upload-files.service */ "GjtP");
/* harmony import */ var _services_rfa_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_services/rfa.service */ "CGPM");
/* harmony import */ var _record_mic_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../record-mic.service */ "GmjU");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");









function RfaComponent_ng_template_204_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h4", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Modal");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfaComponent_ng_template_204_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r28.modalRef == null ? null : ctx_r28.modalRef.hide(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h4", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "a", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Your Request Has Been ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13, " Submitted Successfully");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
class RfaComponent {
    constructor(modalService, uploadService, rfaService, mic_record, sanatizer) {
        this.modalService = modalService;
        this.uploadService = uploadService;
        this.rfaService = rfaService;
        this.mic_record = mic_record;
        this.sanatizer = sanatizer;
        this.eventStreamInfo = {
            from: 'END'
        };
        this.memberInfo = [];
        this.form = {
            name: null,
            date_of_birth: null,
            age: 26,
            gender: null,
            height: null,
            weight: null,
            department: null,
            date_of_admission: null,
            // tslint:disable-next-line:no-bitwise
            original_diagnosis: null,
            shortness_of_breath: null,
            altered_state_of_mind: null,
            chest_pain: null,
            hypotension: null,
            cardiac_arrest: null,
            bleeding: null,
            arrhythmia: null,
            seizure: null,
            focal_deficit: null,
            posto: null,
            other: null,
            clinical: null,
            lab: null,
            xray: null,
            cat: null,
            mri: null,
            ultrasound: null,
            clinical2: null,
            lab2: null,
            xray3: null,
            cat4: null,
            mri5: null,
            ultrasound6: null,
            voice_notes: null,
            status: 'pending'
        };
        this.progress = 0;
        this.message = '';
    }
    // tslint:disable-next-line:typedef
    sanitize(url) {
    }
    openModal(template) {
        this.modalRef = this.modalService.show(template);
    }
    ngOnInit() {
        this.uploadService.getFiles()
            .subscribe((data) => {
            for (const file of data) {
                console.log(file);
                this.createAudioElement2(file.name);
            }
        });
    }
    nameUpdate($event) {
        console.log($event);
        // @ts-ignore
        const categori = $event.category;
        // @ts-ignore
        const name = $event.name;
        console.log(name);
        if (categori === 'clinical') {
            this.form.clinical = 'http://localhost:8080/files/' + name;
        }
        else if (categori === 'lab') {
            this.form.lab = 'http://localhost:8080/files/' + name;
        }
        else if (categori === 'xray') {
            this.form.xray = 'http://localhost:8080/files/' + name;
        }
        else if (categori === 'catscan') {
            this.form.cat = 'http://localhost:8080/files/' + name;
        }
        else if (categori === 'mri') {
            this.form.mri = 'http://localhost:8080/files/' + name;
        }
        else if (categori === 'ultrasound') {
            this.form.ultrasound = 'http://localhost:8080/files/' + name;
        }
    }
    onSubmit() {
        const { name, date_of_birth, age, gender, height, weight, department, date_of_admission, original_diagnosis, shortness_of_breath, altered_state_of_mind, chest_pain, hypotension, cardiac_arrest, bleeding, arrhythmia, seizure, focal_deficit, posto, other, clinical, lab, xray, cat, mri, ultrasound, clinical2, lab2, xray3, cat4, mri5, ultrasound6, voice_notes, status } = this.form;
        this.rfaService.rfaAdmission(name, date_of_birth, age, gender, height, weight, department, date_of_admission, original_diagnosis, shortness_of_breath, altered_state_of_mind, chest_pain, hypotension, cardiac_arrest, bleeding, arrhythmia, seizure, focal_deficit, posto, other, clinical, lab, xray, cat, mri, ultrasound, clinical2, lab2, xray3, cat4, mri5, ultrasound6, voice_notes, status).subscribe(data => {
            console.log(data);
            this.rfaidfromResponse = data.message._id;
            this.connect();
        }, err => {
            console.log(err);
        });
    }
    startRecording() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const mediaDeviceObj = navigator.mediaDevices;
            const micStream = yield mediaDeviceObj.getUserMedia({ audio: true });
            // const speakerStream = await mediaDeviceObj.getDisplayMedia({video: false, audio: true});
            this.mic_audio = new recordrtc__WEBPACK_IMPORTED_MODULE_1__["StereoAudioRecorder"](micStream, { audio: true });
            // this.speaker_audio = new RecordRTC.StereoAudioRecorder(speakerStream, {audio: true});
            this.mic_audio.record();
            console.log('Mic Reccording Started');
            // this.speaker_audio.record();
            console.log('Speaker Reccording Started');
        });
    }
    stopRecording() {
        this.mic_audio.stop((blob) => {
            console.log(blob);
            this.blobMicUrl = this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            this.blobTofile(blob, 'testAudioMic');
            this.createAudioElement(blob);
            console.log('Mic Recording Stopped');
        });
        // this.speaker_audio.stop((blob: Blob) => {
        //   console.log(blob);
        //   this.blobMicUrl = this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        //   // this.blobTofile(blob,"testAudioMic");
        //   this.createAudioElement(blob);
        //   console.log('Mic Recording Stopped');
        // });
    }
    blobTofile(blob, fileName) {
        console.log('Inside blob to File conversion');
        const b = (blob);
        b.lastModified = new Date();
        b.name = fileName;
        const auiodMicFile = blob;
        console.log(auiodMicFile, 'what is this?');
        // return auiodMicFile;
        if (auiodMicFile) {
            this.currentFile = auiodMicFile;
            console.log(this.currentFile, 'the current file');
            this.uploadService.upload(this.currentFile).subscribe((event) => {
                if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress) {
                    this.progress = Math.round(100 * event.loaded / event.total);
                }
                else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                    this.message = event.body.message;
                    this.fileInfos = this.uploadService.getFiles();
                }
            }, (err) => {
                console.log(err);
                this.progress = 0;
                if (err.error && err.error.message) {
                    this.message = err.error.message;
                }
                else {
                    this.message = 'Could not upload the file!';
                }
                this.currentFile = undefined;
            });
        }
    }
    createAudioElement2(url) {
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const audio = document.createElement('audio');
        const deleteButton = document.createElement('button');
        const articleMain = document.querySelector('article');
        // clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.innerHTML = 'Delete';
        //  clipLabel.innerHTML = clipName;
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        // @ts-ignore
        articleMain.appendChild(clipContainer);
        const blob = url;
        // const audioURL = window.URL.createObjectURL(blob);
        audio.src = 'http://localhost:8080/files/' + blob;
        this.form.voice_notes = audio.src;
        console.log(audio.src, 'audio source thingy');
        //  Delete button functionality
        // tslint:disable-next-line:only-arrow-functions typedef
        deleteButton.onclick = function (e) {
            const evtTgt = e.target;
            // @ts-ignore
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        };
    }
    // Code for creating Audio Element
    createAudioElement(blobMic) {
        const clipContainer = document.createElement('article');
        const clipLabel = document.createElement('p');
        const audio = document.createElement('audio');
        const deleteButton = document.createElement('button');
        const articleMain = document.querySelector('article');
        // clipContainer.classList.add('clip');
        audio.setAttribute('controls', '');
        deleteButton.innerHTML = 'Delete';
        //  clipLabel.innerHTML = clipName;
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        // @ts-ignore
        articleMain.appendChild(clipContainer);
        const blob = blobMic;
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log(audio.src, 'audio source thingy');
        //  Delete button functionality
        // tslint:disable-next-line:only-arrow-functions typedef
        deleteButton.onclick = function (e) {
            const evtTgt = e.target;
            // @ts-ignore
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        };
    }
    upload() {
        this.progress = 0;
        if (this.selectedFiles) {
            const file = this.selectedFiles.item(0);
            if (file) {
                this.currentFile = file;
                this.uploadService.upload(this.currentFile).subscribe((event) => {
                    if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    }
                    else if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                        this.message = event.body.message;
                        this.fileInfos = this.uploadService.getFiles();
                    }
                }, (err) => {
                    console.log(err);
                    this.progress = 0;
                    if (err.error && err.error.message) {
                        this.message = err.error.message;
                    }
                    else {
                        this.message = 'Could not upload the file!';
                    }
                    this.currentFile = undefined;
                });
            }
            this.selectedFiles = undefined;
        }
    }
    //chat stuff to creat a room for every RFA
    connect() {
        const self = this;
        // @ts-ignore
        const user = 'user1';
        // @ts-ignore
        const password = '12345678';
        // @ts-ignore
        $.ajax({
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user, password, type: 'm.login.password' }),
            dataType: 'json',
            success(data) {
                self.onLoggedIn(data);
            },
            error(err) {
                alert('Unable to login: is the homeserver running?');
            }
        });
    }
    onLoggedIn(data) {
        const self = this;
        console.log('hello world from onloggedin');
        console.log('from onloggedin', data);
        self.accountInfo = data;
        this.createroom(this.form.name);
    }
    createroom(alias) {
        const self = this;
        const roomAlias = alias;
        const data = {
            room_alias_name: undefined
        };
        // @ts-ignore
        if (roomAlias.length > 0) {
            // @ts-ignore
            data.room_alias_name = roomAlias;
        }
        // @ts-ignore
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/createRoom?access_token=' + self.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            success(response) {
                this.responsewithRoomid = response;
                self.inviteBotandUser(this.responsewithRoomid.room_id);
                $('#roomAlias').val('');
                response.membership = 'join'; // you are automatically joined into every room you make.
                response.latest_message = '';
                // @ts-ignore
                self.roomInfo.push(response);
            },
            error(err) {
                alert(JSON.stringify($.parseJSON(err.responseText)));
            }
        });
    }
    inviteBotandUser(room) {
        // @ts-ignore
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@drbot:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@nurse:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        $.ajax({
            // @ts-ignore
            url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/' + encodeURIComponent(room) + '/invite?access_token=' + this.accountInfo.access_token,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ user_id: '@user1:yashfiichat.eastus.cloudapp.azure.com' }),
            dataType: 'json',
            success(data) {
            },
            error(err) {
            }
        });
        $.ajax({
            url: 'http://localhost:3000/invite',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                roomId: room,
                link: 'http://localhost:4200/rfafilled/' + this.rfaidfromResponse
            }),
            dataType: 'json',
            success(data) {
                console.log(data, 'after registering');
            },
            // tslint:disable-next-line:typedef
            error(err) {
                let msg = 'Is the homeserver running?';
                const errJson = $.parseJSON(err.responseText);
                if (errJson !== null) {
                    msg = errJson.error;
                }
                alert('Unable to register: ' + msg);
            }
        });
    }
}
RfaComponent.ɵfac = function RfaComponent_Factory(t) { return new (t || RfaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_4__["BsModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_upload_files_service__WEBPACK_IMPORTED_MODULE_5__["UploadFilesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_rfa_service__WEBPACK_IMPORTED_MODULE_6__["RfaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_record_mic_service__WEBPACK_IMPORTED_MODULE_7__["RecordMicService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"])); };
RfaComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RfaComponent, selectors: [["app-rfa"]], decls: 206, vars: 25, consts: [["name", "form", "novalidate", "", 3, "ngSubmit"], ["f", "ngForm"], [1, "row"], [1, "col"], [1, "textOnInput", 2, "margin-top", "20px"], ["for", "inputText"], [2, "width", "100%", "height", "auto", "border-radius", "10px", ";border", "4px solid black", "margin-bottom", "20px"], [2, "display", "block"], [2, "display", "flex", "padding", "20px", "padding-bottom", "0px", "flex-wrap", "wrap", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], [2, "flex", "1", "padding", "5px"], [1, "textOnInput"], ["placeholder", "Full Name", "type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["name", "ngModel"], ["type", "date", "name", "date_of_birth", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["date_of_birth", "ngModel"], [2, "flex", "0.5", "padding", "5px"], ["type", "number", "name", "age", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["age", "ngModel"], [2, "display", "flex", "padding", "20px", "padding-bottom", "0px", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], ["placeholder", "Height cm", "type", "number", "name", "height", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["height", "ngModel"], ["placeholder", "Weight KG", "type", "number", "name", "weight", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["weight", "ngModel"], ["placeholder", "Medical Department: ER/OR/IP", "type", "number", "name", "department", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["department", "ngModel"], [2, "display", "flex", "padding", "20px", "flex", "1", "flex-direction", "row", "align-content", "center", "margin-bottom", "10px"], ["placeholder", "Height cm", "type", "date", "name", "date_of_admission", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["date_of_admission", "ngModel"], [2, "width", "100%", "border-radius", "10px", "height", "auto", "border", "4px solid black", "margin-bottom", "20px"], ["placeholder", "Original Diagnosis", "name", "original_diagnosis", "type", "text", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["original_diagnosis", "ngModel"], ["for", "inputText", 2, "margin-left", "20px"], [2, "width", "100%", "height", "auto", "border-top", "2px solid black", "margin-bottom", "20px"], [2, "display", "flex", "padding", "20px", "flex", "1", "flex-direction", "column", "align-content", "center", "margin-bottom", "10px"], ["type", "checkbox", "value", "1", "name", "original_diagnosis", "required", "", 3, "ngModel", "ngModelChange"], ["shortness_of_breath", "ngModel"], ["type", "checkbox", "name", "altered_state_of_mind", "required", "", 3, "ngModel", "ngModelChange"], ["altered_state_of_mind", "ngModel"], ["type", "checkbox", "name", "chest_pain", "required", "", 3, "ngModel", "ngModelChange"], ["chest_pain", "ngModel"], ["type", "checkbox", "name", "hypotension", "required", "", 3, "ngModel", "ngModelChange"], ["hypotension", "ngModel"], ["type", "checkbox", "name", "cardiac_arrest", "required", "", 3, "ngModel", "ngModelChange"], ["cardiac_arrest", "ngModel"], ["type", "checkbox", "name", "bleeding", "required", "", 3, "ngModel", "ngModelChange"], ["bleeding", "ngModel"], ["type", "checkbox", "name", "arrhythmia", "required", "", 3, "ngModel", "ngModelChange"], ["arrhythmia", "ngModel"], ["type", "checkbox", "name", "seizure", "required", "", 3, "ngModel", "ngModelChange"], ["seizure", "ngModel"], ["type", "checkbox", "name", "focal_deficit", "required", "", 3, "ngModel", "ngModelChange"], ["focal_deficit", "ngModel"], ["type", "checkbox", "name", "posto", "required", "", 3, "ngModel", "ngModelChange"], ["posto", "ngModel"], [2, "width", "100%", "height", "auto", "border-top", "1px solid #ced4da", "margin-bottom", "20px"], ["id", "w3review", "name", "w3review", "rows", "4", "name", "other", "required", "", 3, "ngModel", "ngModelChange"], ["other", "ngModel"], [2, "display", "flex", "flex-direction", "row", "flex", "1"], [1, "textOnInput", 2, "margin-top", "20px", "width", "100%", "padding-right", "10px"], [2, "width", "100%", "height", "100%", "border-radius", "10px", "border", "4px solid black", "margin-bottom", "20px"], [3, "clinicalChild"], [1, "textOnInput", 2, "margin-top", "20px", "width", "100%", "padding-left", "10px"], [2, "display", "flex", "justify-content", "space-between"], [2, "flex", "1"], ["type", "checkbox", "name", "clinical2", "required", "", 3, "ngModel", "ngModelChange"], ["clinical2", "ngModel"], ["type", "checkbox", "name", "lab2", "required", "", 3, "ngModel", "ngModelChange"], ["lab2", "ngModel"], ["type", "checkbox", "name", "xray3", "required", "", 3, "ngModel", "ngModelChange"], ["xray3", "ngModel"], ["type", "checkbox", "name", "cat4", "required", "", 3, "ngModel", "ngModelChange"], ["cat4", "ngModel"], ["type", "checkbox", "name", "mri5", "required", "", 3, "ngModel", "ngModelChange"], ["mri5", "ngModel"], ["type", "checkbox", "name", "ultrasound6", "required", "", 3, "ngModel", "ngModelChange"], ["ultrasound6", "ngModel"], [2, "display", "flex", "flex-direction", "row", "flex", "1", "justify-content", "space-evenly"], [1, "textOnInput", 2, "margin-top", "20px", "width", "100%"], [2, "width", "100%", "height", "auto", "border-radius", "10px", "border", "1px solid #ced4da", "margin-bottom", "20px"], [2, "flex", "1", "padding", "5px", "width", "100%"], [1, "record", 3, "click"], [1, "stop", 3, "click"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "text-center", "d-flex", "flex-row", "justify-content-center", 2, "display", "flex", "padding", "10px", "width", "100%", "background", "#9ddcff", "margin-bottom", "20px", 3, "click"], ["template", ""], [1, "modal-header"], [1, "modal-title", "pull-left"], ["type", "button", "aria-label", "Close", 1, "btn-close", "close", "pull-right", 3, "click"], ["aria-hidden", "true", 1, "visually-hidden"], [1, "modal-body"], [2, "padding", "20px", "display", "flex"], [2, "padding-top", "50%", "padding-bottom", "50%", "margin", "0 auto", "align-items", "center", "justify-content", "center"], ["href", "icudirectrequest", 2, "text-decoration", "none", "color", "black"]], template: function RfaComponent_Template(rf, ctx) { if (rf & 1) {
        const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "form", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function RfaComponent_Template_form_ngSubmit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](1); return _r0.form.valid && ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Admission");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Patient Personal Info");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "input", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_16_listener($event) { return ctx.form.name = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, "Date of Birth");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "input", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_22_listener($event) { return ctx.form.date_of_birth = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, "Age");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "input", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_28_listener($event) { return ctx.form.age = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Height");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "input", 19, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_36_listener($event) { return ctx.form.height = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](38, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Weight");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "input", 21, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_42_listener($event) { return ctx.form.weight = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Department");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "input", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_48_listener($event) { return ctx.form.department = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](50, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "Date of Admission");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "input", 26, 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_57_listener($event) { return ctx.form.date_of_admission = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](59, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "Reasons for Requesting Transfer to ICU ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](69, "Original Diagnosis");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "input", 29, 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_70_listener($event) { return ctx.form.original_diagnosis = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "Reasons for Transfer ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](78, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](80, "input", 34, 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_80_listener($event) { return ctx.form.shortness_of_breath = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](83, " Shortness of Beath");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](84, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "input", 36, 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_85_listener($event) { return ctx.form.altered_state_of_mind = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, " Altered Mental state");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "input", 38, 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_90_listener($event) { return ctx.form.chest_pain = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93, " Chest pain");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](94, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "input", 40, 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_95_listener($event) { return ctx.form.hypotension = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](98, " Hypotension");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](100, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "input", 42, 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_101_listener($event) { return ctx.form.cardiac_arrest = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](103, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](104, " Cardiac arrest");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](105, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "input", 44, 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_106_listener($event) { return ctx.form.bleeding = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, " Bleeding");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "input", 46, 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_111_listener($event) { return ctx.form.arrhythmia = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](113, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](114, " Arrhythmia");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "input", 48, 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_116_listener($event) { return ctx.form.seizure = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, " Seizure");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "input", 50, 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_122_listener($event) { return ctx.form.focal_deficit = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](124, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](125, " Focal deficit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "input", 52, 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_127_listener($event) { return ctx.form.posto = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](129, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](130, " Postoperative");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](131, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](132, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "label", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134, "Other: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](135, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](137, "textarea", 55, 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_textarea_ngModelChange_137_listener($event) { return ctx.form.other = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139, "              List any other reasons or details");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](140, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](142, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](143, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](144, "Digital Attachements");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](145, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](146, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](147, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](148, "app-upload-files", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("clinicalChild", function RfaComponent_Template_app_upload_files_clinicalChild_148_listener($event) { return ctx.nameUpdate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](149, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](150, "div", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](151, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](152, "Physically sent with patient");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](153, "div", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](154, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](155, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](156, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](157, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](158, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](159, "input", 64, 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_159_listener($event) { return ctx.form.clinical2 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](161, " Clinical report");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](162, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](163, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](164, "input", 66, 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_164_listener($event) { return ctx.form.lab2 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](166, " Lab report");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](167, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](168, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](169, "input", 68, 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_169_listener($event) { return ctx.form.xray3 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](171, " X-Ray Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](172, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](173, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](174, "input", 70, 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_174_listener($event) { return ctx.form.cat4 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](176, " CAT Scan Image ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](177, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](178, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](179, "input", 72, 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_179_listener($event) { return ctx.form.mri5 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](181, " MRI Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](182, "span", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](183, "p", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](184, "input", 74, 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RfaComponent_Template_input_ngModelChange_184_listener($event) { return ctx.form.ultrasound6 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](186, " Ultrasound Image");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](187, "div", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](188, "div", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](189, "div", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](190, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](191, "Voice Notes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](192, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](193, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](194, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](195, "div", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](196, "article");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](197, "button", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfaComponent_Template_button_click_197_listener() { return ctx.startRecording(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](198, "Start Recording");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](199, "button", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfaComponent_Template_button_click_199_listener() { return ctx.stopRecording(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](200, "Stop Recording");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](201, "button", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function RfaComponent_Template_button_click_201_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30); const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](205); ctx.onSubmit(); return ctx.openModal(_r26); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](202, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](203, "Submit request to transfer to ICU");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](204, RfaComponent_ng_template_204_Template, 14, 0, "ng-template", null, 83, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.date_of_birth);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.age);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.height);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.weight);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.department);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.date_of_admission);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.original_diagnosis);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.shortness_of_breath);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.altered_state_of_mind);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.chest_pain);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.hypotension);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.cardiac_arrest);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.bleeding);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.arrhythmia);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.seizure);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.focal_deficit);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.posto);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.other);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.clinical2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.lab2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.xray3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.cat4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.mri5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.form.ultrasound6);
    } }, styles: ["body[_ngcontent-%COMP%] {\n  width: 80%;\n  margin: 0 auto;\n}\n\n.textOnInput[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -15px;\n  left: 23px;\n  padding: 2px;\n  z-index: 1;\n}\n\n.textOnInput[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:after {\n  content: \" \";\n  background-color: #fff;\n  width: 100%;\n  height: 13px;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  z-index: -1;\n}\n\nlabel[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 500;\n  display: inline-block;\n  margin-bottom: 0.5rem;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  box-shadow: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHJmYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0FBRUY7O0FBQ0E7RUFDRSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0FBRUY7O0FBQ0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBRUY7O0FBQ0E7RUFDRSwyQkFBQTtBQUVGIiwiZmlsZSI6InJmYS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgd2lkdGg6ODAlO1xyXG4gIG1hcmdpbjowIGF1dG87XHJcbn1cclxuLnRleHRPbklucHV0IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi50ZXh0T25JbnB1dCBsYWJlbCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogLTE1cHg7XHJcbiAgbGVmdDogMjNweDtcclxuICBwYWRkaW5nOiAycHg7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLnRleHRPbklucHV0IGxhYmVsOmFmdGVyIHtcclxuICBjb250ZW50OiBcIiBcIjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTNweDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgei1pbmRleDogLTE7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBmb250LXNpemU6IDE2cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgbWFyZ2luLWJvdHRvbTogLjVyZW07XHJcbn1cclxuXHJcbi5mb3JtLWNvbnRyb2wge1xyXG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcclxuXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "tElQ":
/*!**********************************************!*\
  !*** ./src/app/_helpers/auth.interceptor.ts ***!
  \**********************************************/
/*! exports provided: AuthInterceptor, authInterceptorProviders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authInterceptorProviders", function() { return authInterceptorProviders; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/token-storage.service */ "FQmJ");



const TOKEN_HEADER_KEY = 'x-access-token'; // for Spring Boot back-end
class AuthInterceptor {
    constructor(token) {
        this.token = token;
    }
    intercept(req, next) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }
        return next.handle(authReq);
    }
}
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) { return new (t || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__["TokenStorageService"])); };
AuthInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthInterceptor, factory: AuthInterceptor.ɵfac });
const authInterceptorProviders = [
    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HTTP_INTERCEPTORS"], useClass: AuthInterceptor, multi: true }
];


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _welcomepage_welcomepage_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcomepage/welcomepage.component */ "hyiv");
/* harmony import */ var _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icuhome/icuhome.component */ "AMz4");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.component */ "1W4x");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile/profile.component */ "W6KJ");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _board_user_board_user_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./board-user/board-user.component */ "Nv+Q");
/* harmony import */ var _rfa_rfa_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rfa/rfa.component */ "q1cZ");
/* harmony import */ var _icudirectrequest_icudirectrequest_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icudirectrequest/icudirectrequest.component */ "3/gx");
/* harmony import */ var _rfafilled_rfafilled_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rfafilled/rfafilled.component */ "BNo2");
/* harmony import */ var _icubeds_icubeds_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./icubeds/icubeds.component */ "ftbM");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./footer/footer.component */ "fp1T");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./chat/chat.component */ "+XlM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");
















const routes = [
    { path: 'welcome', component: _welcomepage_welcomepage_component__WEBPACK_IMPORTED_MODULE_1__["WelcomepageComponent"] },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"] },
    { path: 'login/:id', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'rfafilled/:id', component: _rfafilled_rfafilled_component__WEBPACK_IMPORTED_MODULE_10__["RfafilledComponent"] },
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"] },
    { path: 'icuhome', component: _footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_5__["ProfileComponent"] },
    { path: 'user', component: _board_user_board_user_component__WEBPACK_IMPORTED_MODULE_7__["BoardUserComponent"] },
    { path: 'rfa', component: _rfa_rfa_component__WEBPACK_IMPORTED_MODULE_8__["RfaComponent"] },
    { path: 'icubeds', component: _icubeds_icubeds_component__WEBPACK_IMPORTED_MODULE_11__["IcubedsComponent"] },
    { path: 'chat/:id', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_13__["ChatComponent"] },
    { path: 'icuhome1', component: _icuhome_icuhome_component__WEBPACK_IMPORTED_MODULE_2__["IcuhomeComponent"] },
    { path: 'icudirectrequest', component: _icudirectrequest_icudirectrequest_component__WEBPACK_IMPORTED_MODULE_9__["IcudirectrequestComponent"] },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "vtpD":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "7Vn+");
/* harmony import */ var _services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/token-storage.service */ "FQmJ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






function LoginComponent_form_17_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Username is required! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_form_17_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Password is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_form_17_div_9_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Password must be at least 6 characters ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LoginComponent_form_17_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, LoginComponent_form_17_div_9_div_1_Template, 2, 0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, LoginComponent_form_17_div_9_div_2_Template, 2, 0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors.minlength);
} }
function LoginComponent_form_17_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Login failed: ", ctx_r7.errorMessage, " ");
} }
function LoginComponent_form_17_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginComponent_form_17_Template_form_ngSubmit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return _r2.form.valid && ctx_r10.onSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_form_17_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.form.username = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, LoginComponent_form_17_div_5_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 21, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_form_17_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.form.password = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, LoginComponent_form_17_div_9_Template, 3, 2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " cancel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, LoginComponent_form_17_div_16_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.form.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r3.errors && _r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.form.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r5.errors && _r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r2.submitted && ctx_r0.isLoginFailed);
} }
function LoginComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Logged in as ", ctx_r1.roles, ". ");
} }
class LoginComponent {
    constructor(authService, tokenStorage, route, router) {
        this.authService = authService;
        this.tokenStorage = tokenStorage;
        this.route = route;
        this.router = router;
        this.form = {
            username: null,
            password: null
        };
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.errorMessage = '';
        this.roles = [];
        this.loginTitle = '';
        this.number = this.route.snapshot.paramMap.get('id');
        if (this.number) {
            if (this.number === '1') {
                this.loginTitle = 'ER/OR/IP Login';
            }
            else if (this.number === '2') {
                this.loginTitle = 'Consultant ICU/EXT login';
                localStorage.setItem('user', 'user1');
                localStorage.setItem('password', '12345678');
            }
            else if (this.number === '3') {
                this.loginTitle = 'ICU Nurse login';
                localStorage.setItem('user', 'nurse');
                localStorage.setItem('password', 'Nurse@1234');
            }
            else if (this.number === '4') {
                this.loginTitle = 'ICU Specialist login';
                localStorage.setItem('user', 'user1');
                localStorage.setItem('password', '12345678');
            }
        }
    }
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }
    onSubmit() {
        const { username, password } = this.form;
        this.authService.login(username, password).subscribe(data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            this.gotoAdmission();
        }, err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
        });
    }
    gotoAdmission() {
        if (this.number) {
            if (this.number === '1') {
                this.router.navigate(['/icudirectrequest']);
            }
            else if (this.number === '2') {
                this.router.navigate(['/icuhome']);
            }
            else if (this.number === '3') {
                this.router.navigate(['/icuhome']);
            }
            else if (this.number === '4') {
                this.router.navigate(['/icuhome']);
            }
        }
    }
    reloadPage() {
        window.location.reload();
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_token_storage_service__WEBPACK_IMPORTED_MODULE_2__["TokenStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 19, vars: 3, consts: [[1, "row", 2, "border-bottom-color", "#d6d6d6"], [1, "col", 2, "color", "var(--bs-gray-900)", "border-bottom-color", "#d6d6d6"], [1, "text-center"], [1, "row"], [1, "col"], ["href", "welcome"], ["type", "button", 1, "btn", "btn-outline-primary", 2, "border-radius", "3px", "border-color", "rgb(255,255,255)", "border-bottom-style", "none", "border-bottom-color", "rgb(255,255,255)"], [1, "fa", "fa-chevron-left"], [2, "border", "1px solid #f7f7f7", "flex", "1", "display", "flex"], [2, "display", "flex", "flex", "1", "margin-top", "20%"], [1, "text-center", 2, "flex", "1"], [1, "col-md-12"], [1, "card", "card-container", 2, "border", "0"], ["name", "form", "novalidate", "", 3, "ngSubmit", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], ["name", "form", "novalidate", "", 3, "ngSubmit"], ["f", "ngForm"], [1, "form-group", "m-3"], ["type", "text", "name", "username", "placeholder", "username", "required", "", 1, "form-control", 3, "ngModel", "ngModelChange"], ["username", "ngModel"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["type", "password", "name", "password", "placeholder", "password", "required", "", "minlength", "6", 1, "form-control", 3, "ngModel", "ngModelChange"], ["password", "ngModel"], [1, "form-group", "text-end"], [1, "btn", "btn-outline-primary", "mx-3"], [1, "form-group"], ["role", "alert", 1, "alert", "alert-danger"], [4, "ngIf"], [1, "alert", "alert-success"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h6", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Good morning, please login!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "i", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u00A0Back");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, LoginComponent_form_17_Template, 17, 5, "form", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, LoginComponent_div_18_Template, 2, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.loginTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoggedIn);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["MinLengthValidator"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zvGY":
/*!************************************************************!*\
  !*** ./src/app/patientlisting/patientlisting.component.ts ***!
  \************************************************************/
/*! exports provided: PatientlistingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientlistingComponent", function() { return PatientlistingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PatientlistingComponent {
    constructor() { }
    ngOnInit() {
    }
}
PatientlistingComponent.ɵfac = function PatientlistingComponent_Factory(t) { return new (t || PatientlistingComponent)(); };
PatientlistingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PatientlistingComponent, selectors: [["app-patientlisting"]], decls: 2, vars: 0, template: function PatientlistingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "patientlisting works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXRpZW50bGlzdGluZy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map