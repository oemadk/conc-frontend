import { Component, OnInit } from '@angular/core';

import { UploadFilesService } from 'src/app/_services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RfaComponent} from '../../rfa/rfa.component';
import {  Input, Output, EventEmitter  } from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent  implements OnInit  {
  @Output() clinicalChild: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  category?: string;
  message = '';

  fileInfos?: Observable<any>;

  constructor(public uploadService: UploadFilesService) {
    // @ts-ignore
    // @ts-ignore
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();

  }
  selectFile(event: any, category: string): void {
    this.category = category;
    console.log(this.category, 'el category');
    this.selectedFiles = event.target.files;
    this.upload();
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
              console.log(this.message);
              const a = {
                category: this.category,
                name: this.message
              };
              // @ts-ignore
              this.updateParent(a);
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

  updateParent(name: { name: string; category: string }): void{
    // @ts-ignore
    this.clinicalChild.emit(name);
  }
}
