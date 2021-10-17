import {Component, OnInit} from '@angular/core';
declare var $: any;
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../_services/auth.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  accountInfo: { access_token: string; user_id: any; } | undefined;
  sessionid: any;
  sideMenu: boolean = false;
  eventStreamInfo = {
    from: 'END'
  };
  formid = '615f64fd330586a4fc5e8aa8';
  chattingbutton = true;
  roomInfo: any[] | undefined;
  memberInfo = [];
  viewingRoomId: string | number | undefined | boolean;
  number = this.route.snapshot.paramMap.get('id');

  private currentUser: { username: 'admin'; password: '12345678'; } | undefined;

  constructor( private route: ActivatedRoute,
              private router: Router) {
    console.log(this.number);
    localStorage.setItem('nav', 'off');
  }

  ngOnInit(): void {
    localStorage.setItem('nav', 'off');

    this.connect();
  }

  onLoggedIn(data: { access_token: string; user_id: any; } | undefined): void {
    const self = this;
    console.log('hello world from onloggedin');
    console.log('from onloggedin', data);
    self.accountInfo = data;
    this.longpollEventStream();
    self.getCurrentRoomList();
    $('.roomListDashboard').css({visibility: 'visible'});
    $('.roomContents').css({visibility: 'visible'});
    $('.signUp').css({display: 'none'});
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
        auth: {session: self.sessionid, type: 'm.login.dummy'},
        inhibit_login: false
      }),
      dataType: 'json',
      success(data: any) {
        console.log(data, 'after registering');
      },
      // tslint:disable-next-line:typedef
      error(err: { responseText: any; }) {
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
      data: JSON.stringify({user, password, type: 'm.login.password'}),
      dataType: 'json',
      success(data: { access_token: string; user_id: any; } | undefined) {
        self.onLoggedIn(data);
      },
      error(err: any) {
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
      success(data: { auth: { session: any; }; }) {
        console.log(data, 'sessionId');
        self.sessionid = data.auth.session;
      },
      error(err: any) {
        self.sessionid = this.data.auth.session;
        $.ajax({
          url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/register?kind=user',
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            username: this.currentUser.username,
            password: this.currentUser.password,
            auth: {session: self.sessionid, type: 'm.login.dummy'},
            inhibit_login: false
          }),
          dataType: 'json',
          success(data: any) {
            console.log(data, 'after registering');
          },
          error(err: any) {
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
        auth: {session: self.sessionid, type: 'm.login.dummy'},
        inhibit_login: false
      }),
      dataType: 'json',
      success(data: { access_token: string; user_id: any; } | undefined) {
        console.log(data, 'after registering');
        self.onLoggedIn(data);

      },
      error(err: { responseText: any; }) {
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

    $.getJSON(url, (data: { end: string; chunk: string | any[]; }) => {
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
        } else if (data.chunk[i].type === 'm.room.member') {
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
        } else {
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
    }).fail(function(err: any) {
      console.log('it failed so its reloading lol');
      // @ts-ignore
      setTimeout(self.longpollEventStream(), 5000);
    });
  }


  // ************** Creating a room ******************
  createroom() {
    const self = this;
    $(document).on('click', '.createRoom', function() {
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
        success(response: { membership: string; latest_message: string; }) {
          console.log('inside function createroom1');

          $('#roomAlias').val('');
          response.membership = 'join'; // you are automatically joined into every room you make.
          response.latest_message = '';

          // @ts-ignore
          self.roomInfo.push(response);
          self.setRooms(self.roomInfo);
        },
        error(err: { responseText: any; }) {
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
    $.getJSON(url, function(data: { rooms: any; }) {
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
    }).fail(function(err: { responseText: any; }) {
      alert(JSON.stringify($.parseJSON(err.responseText)));
    });
  }

  loadRoomContent(roomId: string | number | boolean | undefined) {
    const self = this;
    console.log('loadRoomContent ' + roomId);
    self.viewingRoomId = roomId;
    console.log('the assignment to the viewing room id is here', roomId, this.viewingRoomId);
    $('#roomName').text('Room: ' + roomId);
    $('.sendMessageForm').css({visibility: 'visible'});
    this.getMessages(roomId);
    this.getMemberList(roomId);
  }

  getMessages(roomId: string | number | boolean | undefined) {
    const self = this;
    $('#messages').empty();
    // @ts-ignore
    // @ts-ignore
    const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/' + encodeURIComponent(roomId) + '/messages?access_token=' + self.accountInfo.access_token + '&from=END&dir=b&limit=10';
    // tslint:disable-next-line:only-arrow-functions
    $.getJSON(url, function(data: { chunk: string | any[]; }) {
      for (let i = data.chunk.length - 1; i >= 0; --i) {
        console.log('inside function getmessages');

        self.addMessage(data.chunk[i]);
      }
    });
  }
  idk(){
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
        data: JSON.stringify({membership: 'join'}),
        dataType: 'json',
        success(data: any) {
          console.log('is it here ya omar2');
          this.loadRoomContent(roomId);
          this.getCurrentRoomList();
        },
        error(err: { responseText: any; }) {
          alert(JSON.stringify($.parseJSON(err.responseText)));
        }
      });
    } else {
      // @ts-ignore
      this.loadRoomContent(roomId);
    }
  }

  getMemberList(roomId: string | number | undefined | boolean) {
    const self = this;
    $('#members').empty();
    self.memberInfo = [];
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    const url = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/api/v1/rooms/' + encodeURIComponent(roomId) + '/members?access_token=' + self.accountInfo.access_token;
    $.getJSON(url, function(data: { chunk: string | any[]; }) {
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
    $(document).on('click', '.sendMessage', function() {
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
    $(document).on('click', '.sendRequest', function() {
      if (self.viewingRoomId === undefined) {
        alert('There is no room to send a message to!');
        return;
      }
      const body = 'Doctor has requested you to make a CBD Blood exam';
      self.sendMessage(self.viewingRoomId, body);
    });
  }


  sendMessage(roomId: string | number | boolean, body: any) {
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
      success(data: any) {
        $('#body').val('');
      },
      error(err: { responseText: any; }) {
        alert(JSON.stringify($.parseJSON(err.responseText)));
      }
    });
  }


  sendMessageRequest(roomId: string | number | boolean, body: any) {
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
      success(data: any) {
        $('#body').val('');
      },
      error(err: { responseText: any; }) {
        alert(JSON.stringify($.parseJSON(err.responseText)));
      }
    });
  }

  // ************** Navigation and DOM manipulation **************
  setRooms(roomList: string | any[] | undefined) {
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
          data: JSON.stringify({membership: 'join'}),
          dataType: 'json',
          success(data: any) {
            console.log('is it here ya omar2');
            // @ts-ignore
            self.loadRoomContent(roomId);
            self.getCurrentRoomList();
          },
          error(err: { responseText: any; }) {
            alert(JSON.stringify($.parseJSON(err.responseText)));
          }
        });
      } else {
        // @ts-ignore
        self.loadRoomContent(roomId);
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  addMessage(data: { content: { body: any; membership: string | undefined; msgtype: string; url: string; }; type: string; state_key: string; user_id: any; sender: string; }) {
    const self = this;
    let msg = data.content.body;
    if (data.type === 'm.room.member') {
      if (data.content.membership === undefined) {
        return;
      }
      if (data.content.membership === 'invite') {
        msg = '<em>invited ' + data.state_key + ' to the room</em>';
      } else if (data.content.membership === 'join') {
        msg = '<em>joined the room</em>';
      } else if (data.content.membership === 'leave') {
        msg = '<em>left the room</em>';
      } else if (data.content.membership === 'ban') {
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
    } else if (data.content.msgtype === 'm.image') {
      console.log('it sees that its an image');
      const link = 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/media/r0/thumbnail/yashfiichat.eastus.cloudapp.azure.com/';
      const urllink = data.content.url.substring(
        data.content.url.lastIndexOf('com/') + 4
      );
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

    }else if(data.sender == '@drbot:yashfiichat.eastus.cloudapp.azure.com')  {
      let h = msg;
    let theLink = h.substring(
        h.lastIndexOf('http')
      );

      const row = ' <li>\n' +
        '                        <div class="chat__bubble chat__bubble--me" style="margin: 0 auto;\n' +
        '    background: red;\n' +
        '    color: white;\n' +
        '    font-style: italic;\n' +
        '    font-size: 17px;text-align:center;">'
        + msg + '</br>'+

        '<a target="_blank" href="' + theLink + '"/>LINK</a>' +
       ' </div>\n' +
        '                                        </li>';
      $('#messages').
      append(row);
    }else  {
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


  addMember(data: any) {
    const row = '<tr>' +
      '<td>' + data.state_key + '</td>' +
      '<td>' + data.content.membership + '</td>' +
      '</tr>';
    $('#members').append(row);
  }

}
