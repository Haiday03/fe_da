export class DashboardInfo {
    countUsers? :number;
    countNewUsers? :number;
    countAuthors? :number; 
    countNewAuthors? :number;
    countCategories? :number;
    countNewCategories? :number;
    countBooks? :number;
    countNewBooks? :number;

    constructor(){
        this.countUsers=0;
        this.countNewUsers=0;
        this.countAuthors=0;
        this.countNewAuthors=0;
        this.countCategories=0;
        this.countNewCategories=0;
        this.countBooks=0;
        this.countNewBooks=0;
    }
}