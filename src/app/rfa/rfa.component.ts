import {Component, OnInit} from '@angular/core';
import {RfaService} from '../_services/rfa.service';
declare var $: any;
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { RecordMicService } from '../record-mic.service';
import { UploadFilesService } from 'src/app/_services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-rfa',
  templateUrl: './rfa.component.html',
  styleUrls: ['./rfa.component.scss']
})

export class RfaComponent implements OnInit {
  accountInfo: { access_token: string; user_id: any; } | undefined;
  sessionid: any;
  eventStreamInfo = {
    from: 'END'
  };
  roomInfo: any[] | undefined;
  memberInfo = [];
  viewingRoomId: string | number | undefined | boolean;
  private currentUser: { username: 'admin'; password: '12345678'; } | undefined;

  error: string | undefined;
  responsewithRoomid: any;
  form: any = {
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
  mic_audio: any;
  rfaidfromResponse: any;
  blobMicUrl: any;
  speaker_audio: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  modalRef?: BsModalRef;

  fileInfos?: Observable<any>;
  constructor(private modalService: BsModalService, public uploadService: UploadFilesService, private rfaService: RfaService, private mic_record: RecordMicService, private sanatizer: DomSanitizer) {
  }
  // tslint:disable-next-line:typedef
  sanitize(url: string) {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.uploadService.getFiles()
      .subscribe(
        (data) => {
          for (const file of data){
            console.log(file);
            this.createAudioElement2(file.name);
          }
        });

  }

  nameUpdate($event: Array<any>): void{
    console.log($event);
    // @ts-ignore
    const categori = $event.category;
    // @ts-ignore
    const name = $event.name;
    console.log(name);
    if (categori === 'clinical'){
      this.form.clinical = 'http://23.96.36.35:8080/files/' + name;
    }else if (categori === 'lab'){
      this.form.lab = 'http://23.96.36.35:8080/files/' + name;
    }else if (categori === 'xray'){
      this.form.xray = 'http://23.96.36.35:8080/files/' + name;
    }else if (categori === 'catscan'){
      this.form.cat = 'http://23.96.36.35:8080/files/' + name;
    }else if (categori === 'mri'){
      this.form.mri = 'http://23.96.36.35:8080/files/' + name;
    }else if (categori === 'ultrasound'){
      this.form.ultrasound = 'http://23.96.36.35:8080/files/' + name;
    }
  }
  onSubmit(): void {
    const {
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
    } = this.form;

    this.rfaService.rfaAdmission(
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
      status,
      ).subscribe(
      data => {
            console.log(data);
            this.rfaidfromResponse = data.message._id;
            this.connect();
      },
      err => {
        console.log(err);
      }
    );
  }


  async startRecording(){
    const mediaDeviceObj = navigator.mediaDevices as any;
    const micStream = await mediaDeviceObj.getUserMedia({audio: true});
    // const speakerStream = await mediaDeviceObj.getDisplayMedia({video: false, audio: true});
    this.mic_audio = new RecordRTC.StereoAudioRecorder(micStream, {audio: true});
    // this.speaker_audio = new RecordRTC.StereoAudioRecorder(speakerStream, {audio: true});
    this.mic_audio.record();
    console.log('Mic Reccording Started');
    // this.speaker_audio.record();
    console.log('Speaker Reccording Started');
  }

  stopRecording(){
    this.mic_audio.stop((blob: Blob) => {
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

  blobTofile(blob: Blob, fileName: any){
    console.log('Inside blob to File conversion');
    const b: any = (blob);
    b.lastModified = new Date();
    b.name = fileName;
    const auiodMicFile: File = blob as File;
    console.log(auiodMicFile, 'what is this?');
    // return auiodMicFile;
    if (auiodMicFile) {
      this.currentFile = auiodMicFile;
      console.log(this.currentFile, 'the current file');

      this.uploadService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });

    }
  }
  createAudioElement2(url: string){
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
    audio.src = 'http://23.96.36.35:8080/files/' + blob;
    this.form.voice_notes = audio.src;
    console.log(audio.src, 'audio source thingy');

//  Delete button functionality
    // tslint:disable-next-line:only-arrow-functions typedef
    deleteButton.onclick = function(e) {
      const evtTgt = e.target;
      // @ts-ignore
      (evtTgt as Element).parentNode.parentNode.removeChild((evtTgt as Element).parentNode);
    };
  }


  // Code for creating Audio Element
  createAudioElement(blobMic: Blob){
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
    deleteButton.onclick = function(e) {
      const evtTgt = e.target;
      // @ts-ignore
      (evtTgt as Element).parentNode.parentNode.removeChild((evtTgt as Element).parentNode);
    };
  }


  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
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
    this.createroom(this.form.name);
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
          this.responsewithRoomid = response;
          self.inviteBotandUser(this.responsewithRoomid.room_id);

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

    $.ajax({
      url: 'http://52.170.142.161:3000/invite',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        roomId: room,
        link: 'https://conc-frontend.vercel.app/rfafilled/'+ this.rfaidfromResponse
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

}
