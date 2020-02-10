import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';

let api_genre = "16"
const API_KEY  = 'a51409b0f6bda6655a4f45263f1420e8'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY

                // Hint: You will need a function to change this URL to 
                // dynamically modify the start and end date range.
                + '&primary_release_date.gte=2019-01-01'
                + '&primary_release_date.lte=2019-02-25'
                
                // Hint: You will want to dynamically change the page number 
                // and genre number.
                + '&page=1&with_genres=16';

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';

@Component({
  selector: 'app-root',
  templateUrl: './app.home.html',
  styleUrls: ['./app.home.css']
})
export class AppHome {
    _movieArray: Array<any>;
    _genreArray: Array<any>;
    _http:HttpClient;
    selectedGenre: string;
    pageConfig: any;
    
    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this.selectedGenre = "16";
        this.pageConfig = {
            currentPage: 1,
            itemsPerPage: 0,
            totalItems:0
            };
        
    }

    ngOnInit() {
        
        this.getGenres();
        this.getMovies(true);
       
    }

    pageChange(newPage: number) {
        this.pageConfig.currentPage = newPage;
        this.getMovies(false);
    }

    setGenre(){
        this.pageConfig.currentPage = 1;
        this.getMovies(true);
    }

    getDateRange(range:number) {
        let today = new Date();
        today.setDate(today.getDate() - range);
        return this.getFormattedDate(today);

    }

    // Hint.
    // Months and days less than 10 you may want to 
    // create some kind of string formater that appends a 0 
    // before the day or month number.
    getFormattedDate(dt:Date) {
        return `${dt.getFullYear()}-${(Number(dt.getMonth()) + 1 ).toString().padStart(2,"0")}-${dt.getDay().toString().padStart(2,"0")}`;
    }

    getMovies(loading: boolean) {
        let url = new URL(BASE_URL);
        /*Changing the url paramters */
        url.searchParams.set("with_genres",this.selectedGenre);
        url.searchParams.set("primary_release_date.gte",this.getDateRange(30));
        url.searchParams.set("primary_release_date.lte",this.getDateRange(0));
        url.searchParams.set("page",this.pageConfig.currentPage);

        this._http.get<any>(url.href)

          // Get data and wait for result.
          .subscribe(data => {
              this._movieArray  = data.results;
                
              this._movieArray.forEach(function(obj, idx){
                obj.noImage = false;    
                if(obj.poster_path == null){
                    obj.noImage = true;
                }
              });
            

              this.pageConfig.currentPage = data.page;
              if(loading){
                this.pageConfig.itemsPerPage = data.results.length;
                this.pageConfig.totalItems = data.total_results;
              }
          }, 
          error =>{
            // Let user know about the error.
            alert(error);
            console.error(error)
          })
    }

    getGenres() {
        
        this._http.get<any>(GENRE_URL)
        // Get data and wait for result.
        .subscribe(data => {
            this._genreArray = data.genres;
        }, 

        error =>{
          // Let user know about the error.
          alert(error);
          console.error(error)
        });
    }
}


  