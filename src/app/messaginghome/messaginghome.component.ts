import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-messaginghome',
  templateUrl: './messaginghome.component.html',
  styleUrls: ['./messaginghome.component.scss']
})
export class MessaginghomeComponent implements OnInit {
  accountInfo: { access_token: string; user_id: any; } | undefined;
  sessionid: any;
  eventStreamInfo = {
    from: 'END'
  };
  roomInfo: any[] | undefined;
  memberInfo = [];
  viewingRoomId: string | number | undefined | boolean;
  private currentUser: { username: 'admin'; password: '12345678'; } | undefined;
  roomitself: any;
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.connect();
  }
  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target.className === 'theroomid'){
      this.roomitself = event.target.attributes.value.nodeValue;
      this.inviteBotandUser(this.roomitself);
      this.router.navigate(['chat', this.roomitself]);

    }

  }
  inviteBotandUser(room: any){
    // @ts-ignore
    $.ajax({
      // @ts-ignore
      url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/'+ encodeURIComponent(room) +'/invite?access_token=' + this.accountInfo.access_token,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({user_id: '@drbot:yashfiichat.eastus.cloudapp.azure.com'}),
      dataType: 'json',
      success(data: { access_token: string; user_id: any; } | undefined) {
      },
      error(err: any) {
      }
    });
    $.ajax({
      // @ts-ignore
      url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/'+ encodeURIComponent(room) +'/invite?access_token=' + this.accountInfo.access_token,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({user_id: '@nurse:yashfiichat.eastus.cloudapp.azure.com'}),
      dataType: 'json',
      success(data: { access_token: string; user_id: any; } | undefined) {
      },
      error(err: any) {
      }
    });
    $.ajax({
      // @ts-ignore
      url: 'https://yashfiichat.eastus.cloudapp.azure.com/_matrix/client/r0/rooms/'+ encodeURIComponent(room) +'/invite?access_token=' + this.accountInfo.access_token,
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({user_id: '@user1:yashfiichat.eastus.cloudapp.azure.com'}),
      dataType: 'json',
      success(data: { access_token: string; user_id: any; } | undefined) {
      },
      error(err: any) {
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

  onLoggedIn(data: { access_token: string; user_id: any; } | undefined): void {
    const self = this;
    console.log('hello world from onloggedin');
    console.log('from onloggedin', data);
    self.accountInfo = data;
    this.getCurrentRoomList();
  }




  createroom(alias: any) {
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
      success(response: { membership: string; latest_message: string; }) {
        console.log('inside function createroom1');

        $('#roomAlias').val('');
        response.membership = 'join'; // you are automatically joined into every room you make.
        response.latest_message = '';

        // @ts-ignore
        self.roomInfo.push(response);
      },
      error(err: { responseText: any; }) {
        alert(JSON.stringify($.parseJSON(err.responseText)));
      }
    });

  }
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
  setRooms(roomList: string | any[] | undefined) {
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
        if(roomList[i].state?roomList[i].state[2].content.alias: undefined != undefined){
          main = roomList[i].state[2].content.alias;
        }else {
          main = '#Patient Room:';
        }
        var mySubString = main.substring(
          main.indexOf("#") + 1,
          main.lastIndexOf(":")
        );
        row =
          '<div style="display:flex; flex:1;flex-direction: row; justify-content: center; z-index:9999" (click)="thisroom('+ roomList[i].room_id +  ')">\n' +
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
          '<div>'+
          '<button class="theroomid" value="'+  roomList[i].room_id   + '">Join</button> </div>'+
          '</div>\n' +
          '</div>'

      }
      rows += row;
      console.log('got into set rooms function');
    }

    $('#rooms').append(rows);
  }
  loadRoomContent(roomId: string | number | boolean | undefined) {
    const self = this;
    console.log('loadRoomContent ' + roomId);
    self.viewingRoomId = roomId;
    console.log('the assignment to the viewing room id is here', roomId, this.viewingRoomId);
    $('#roomName').text('Room: ' + roomId);
    $('.sendMessageForm').css({visibility: 'visible'});
    // this.getMessages(roomId);
    // this.getMemberList(roomId);
  }
  thisroom(data: any){
    console.log(data);
  }
}
