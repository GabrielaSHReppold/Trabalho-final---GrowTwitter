import { Base } from "./Base";
import { Like } from "./Like";
import { Likes } from "../database/Likes";
import { User } from "./User";

export type TweetType = "tweet" | "reply";

export class Tweet extends Base {
  private _content: string;
  private _type: TweetType;
  private _user: User;
  private _likes: Like[];
  private _replies: Tweet[];

  constructor(user: User, content: string, type: TweetType) {
    super();
    this._content = content;
    this._type = type;
    this._user = user;
    this._likes = [];
    this._replies = [];
  }


  //Método 1: Replies
  public addReply(user: User, content: string): Tweet {
    const replyTweet = new Tweet(user, content, "reply");
    this._replies.push(replyTweet);
    console.log(`<@${user.username}> respondeu ao tweet de @${this._user.username}: "${content}"`);
    return replyTweet;
  }

  // Método 2: Like
  public addLike(user: User): void {
    const like = new Like(user);  
    this._likes.push(like);       
    Likes.push(like);            
    console.log(`<@${user.username}> curtiu o tweet de @${this._user.username}`);
  }

  public removeLike(user: User): void {
    const likeIndex = this._likes.findIndex(like => like.user.id === user.id);
    if (likeIndex !== -1) {
      this._likes.splice(likeIndex, 1);  
      console.log(`<@${user.username}> removeu o like do tweet de @${this._user.username}`);
    } else {
      console.log(`<@${user.username}> ainda não curtiu o tweet de @${this._user.username}`);
    }
  }

  public showLikes(): void {
    if (this._likes.length === 1) {
      console.log(`[@${this._likes[0].user.username} curtiu isso]`);
    } else if (this._likes.length > 1) {
      console.log(`[@${this._likes[0].user.username} e mais ${this._likes.length - 1} usuários curtiram isso]`);
    }
  }

  // Método 3: Show
  public showTweet(): void {
    console.log(`@${this._user.username}: ${this._content}`);
    if (this._likes.length === 1) {
      console.log(`[@${this._likes[0].user.username} curtiu isso]`);
  } else if (this._likes.length > 1) {
      console.log(`[@${this._likes[0].user.username} e mais ${this._likes.length - 1} usuários curtiram isso]`);
  }
    this._replies.forEach(reply => {
      console.log(`> @${reply._user.username}: ${reply._content}`);
  });
  console.log('--------------------------------');
  }

  //Método 4: showReplies
  public showReplies(): void {
    this._replies.forEach(reply => {
      console.log(`> @${reply.user.username}: ${reply._content}`);
    });
  }

  //Getters
  public get content(): string {
    return this._content;
  }

  public get type(): TweetType {
    return this._type;
  }

  public get user(): User {
    return this._user;
  }

  public get likes(): Like[] {
    return this._likes;
  }

  public get replies(): Tweet[] {
    return this._replies;
  }

}