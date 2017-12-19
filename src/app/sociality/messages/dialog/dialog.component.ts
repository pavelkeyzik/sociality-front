import { Component, ViewChild, OnInit } from '@angular/core';
import { ViewImageComponent } from './view-image/view-image.component';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TopBarService } from '../../../shared/services/top-bar.service';

 @Component({
   selector: 'app-dialog',
   templateUrl: './dialog.component.html',
   styleUrls: ['./dialog.component.less'],
   providers: [ApiService]
 })
 export class DialogComponent implements OnInit {
   private messages;
   private id = localStorage.getItem('id');
   @ViewChild(ViewImageComponent) viewImage;

   constructor(private api: ApiService,
               private route: ActivatedRoute,
               private router: Router,
               private topBar: TopBarService) {
     topBar.setViewNavBar(true);
     this.api.getProfile(route.snapshot.params['id']).subscribe(data => {
       this.topBar.setTextNavBar('Dialog with ' + data.name);
     });
     api.getMessages(route.snapshot.params['id'])
        .subscribe(data => {
          this.messages = data.result;
        }, error => router.navigate(['/login']));
   }

   ngOnInit() {
     this.api.readMessage(this.route.snapshot.params['id']).subscribe();
   }

   showImage(url: string) {
     this.viewImage.show(url);
   }

   onChange(event) {
     console.log(event.target.files[0]);
   }

   onSubmit(form) {
     let message = form.value.text;
     if(message != '') {
       let params = {
         type: 'text',
         messageText: message
       }
       this.api.sendMessage(this.route.snapshot.params['id'], params).subscribe(data => {
         console.log('SUCCESS:', data);
       }, error => {
         console.log('ERROR:', error);
       });
     }
     form.value.text = '';
   }

 }
