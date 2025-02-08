export class ChartInfo {
    labels?: string[];
    borrowedDatas?: number[];
    reviewedDatas?: number[];

    constructor(){
        this.labels = [];
        this.borrowedDatas = [];
        this.reviewedDatas = [];
    }
}