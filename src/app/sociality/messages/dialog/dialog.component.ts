import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ViewImageComponent } from './view-image/view-image.component';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TopBarService } from '../../../shared/services/top-bar.service';
import { LoaderService } from '../../../shared/services/loader.service';

 @Component({
   selector: 'app-dialog',
   templateUrl: './dialog.component.html',
   styleUrls: ['./dialog.component.less'],
   providers: [ApiService]
 })
 export class DialogComponent implements OnInit, OnDestroy {
   private messages;
   private id = localStorage.getItem('id');
   private messagesInterval;
   @ViewChild(ViewImageComponent) viewImage;

   constructor(private api: ApiService,
               private route: ActivatedRoute,
               private router: Router,
               private topBar: TopBarService,
               private loader: LoaderService) {
     topBar.setViewNavBar(true);
     this.api.getProfile(route.snapshot.params['id']).subscribe(data => {
       this.topBar.setTextNavBar('Dialog with ' + data.name);
     });
     this.getMessages();

     this.messagesInterval = setInterval(() => {
       this.getMessages();
     }, 2000);
   }

   getMessages() {
     this.api.getMessages(this.route.snapshot.params['id'])
        .subscribe(data => {
          this.messages = data.result;
        }, error => this.router.navigate(['/login']));
   }

   ngOnInit() {
     this.api.readMessage(this.route.snapshot.params['id']).subscribe();
   }

   ngOnDestroy() {
     clearInterval(this.messagesInterval);
   }

   showImage(id: string) {
     this.viewImage.show(id);
   }

   @ViewChild("file") fileInput;

   onChange() {
     this.loader.setLoad(true);
     this.api.uploadImage(this.fileInput.nativeElement.files[0]).subscribe(data => {
       this.sendImage(data.imageId);
       this.loader.setLoad(false);
     });
   }

   onSubmit(form) {
     let message = form.value.text;
     this.sendMessage(message);
     this.message = '';
   }

   sendMessage(message: string) {
     if(message != '') {
       let params = {
         type: 'text',
         messageText: message
       };

       this.api.sendMessage(this.route.snapshot.params['id'], params).subscribe(data => {
         console.log('SUCCESS:', data);
       }, error => {
         console.log('ERROR:', error);
       });
     }
   }

   sendImage(imageId: string) {
     let params = {
       type: 'image',
       messageImage: imageId
     };

     this.api.sendMessage(this.route.snapshot.params['id'], params).subscribe(data => {
       console.log('SUCCESS:', data);
     }, error => {
       console.log('ERROR:', error);
     });
   }

 }
