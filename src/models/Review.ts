class Review {
    username?:string;
    content?: string; 
    reviewId?: number; 
    rating: number; 
  
    constructor(
        username?:string,
        content?: string,
        reviewId?: number, 
        rating: number = 0,
    )  {
        this.username=username;
        this.content=content;
        this.reviewId=reviewId;
        this.rating=rating;
    }
    
    
  }
  
  export default Review;
  