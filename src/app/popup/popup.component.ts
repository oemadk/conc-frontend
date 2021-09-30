import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { RfaService } from 'src/app/_services/rfa.service';
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
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() formIdpassed: string | undefined;
   formId: any | undefined;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, public uploadService: UploadFilesService, private rfaService: RfaService, private mic_record: RecordMicService, private sanatizer: DomSanitizer) {
    // @ts-ignore
    if (this.formIdpassed != undefined) {
      this.formId = this.formIdpassed;
    }
  }    modalRef?: BsModalRef;


  // @ts-ignore
  Rfafilled: any =  this.rfaService.getRfa(this.formId).subscribe(
    data => {
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
        this.form.status = this.Rfafilled.status
    },
    err => {
    }
  );

  error: string | undefined;

  mic_audio: any;
  blobMicUrl: any;
  speaker_audio: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  form: any = {
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

  // @ts-ignore
  // @ts-ignore
  form2: any = {
    // @ts-ignore
    id: this.formIdpassed,
    reasons: null,
  };
// tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



  onSubmit2(): void {
    const {
      id,
      reasons
    } = this.form2;

    this.rfaService.declineRfa(
      id,
      reasons
    ).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  accept(): void{
    this.rfaService.acceptRfa(
      //@ts-ignore
      this.formId
    ).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
    // this.createAudioElement2(this.Rfafilled.voice_notes);
    if (this.formIdpassed != undefined) {
      this.formId = this.formIdpassed;
    }
  }

  nameUpdate($event: any): void{
    console.log($event);
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

    this.rfaService.rfaAdmission(name,
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
      },
      err => {
        console.log(err);
      }
    );
  }
  declineRfa(){
    // @ts-ignore
    this.rfaService.declineRfa(this.formId);
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
    audio.src = 'http://localhost:8080/files/' + blob;
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
}
