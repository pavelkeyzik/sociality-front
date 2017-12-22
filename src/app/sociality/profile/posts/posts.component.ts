import { Component, Input } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent {

  private id: string;
  private authId: string;
  private posts = [];

  constructor(private api: ApiService,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.authId = localStorage.getItem('id');

    if(this.id == null) this.id = this.authId;

    this.updatePosts();
  }

  removePost(id: string) {
    this.api.removePost(id).subscribe(data => this.updatePosts());
  }

  onSubmit(form) {
    let params = {
      text: form.value.text,

    };
    console.log(this.postText);
    if(this.postText != null)
    {
      let params = {
        text: this.postText,
        meId: this.id
      };
      this.api.addPost(params).subscribe(data => this.updatePosts());
    }
    this.postText = '';
  }

  updatePosts() {
    this.api.getPosts(this.id).subscribe(data => {
      this.posts = data.result;
    });
  }
}
