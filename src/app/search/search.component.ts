import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searching: boolean = false;
  searchText: FormControl = new FormControl();
  total: number;
  users: any;
  user: any;
  repos: any;

  constructor(private http: HttpClient) {
    this.searchText.valueChanges
      .distinctUntilChanged()
      .debounceTime(500)
      .subscribe(value => {
        this.users = [];
        if (value) {
          this.searching = true;
          this.http.get(`https://api.github.com/search/users?q=${value}`).subscribe(response => {
            this.users = response['items'];
            this.total = response['total_count'];
            this.searching = false;
          });
        }
      });
  }

  ngOnInit() {}
}