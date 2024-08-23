import { Base } from "./Base";
import { Like } from "./Like";
import { Likes } from "../database/Likes";
import { Tweet, TweetType } from "./Tweet";
import { Tweets } from "../database/Tweets";
import { Users } from "../database/Users";

export class User extends Base {
    private _name: string;
    private _username: string;
    private _email: string;
    private _password: string;
    private _followers: User[];  
    private _tweets: Tweet[];    
  
    constructor(name: string, username: string, email: string, password: string) {
      super();
      this._name = name;
      this._username = username;
      this._email = email;
      this._password = password;
      this._followers = [];
      this._tweets = [];
    }

    //Método 1: sendTweet
    public sendTweet(content: string, type: TweetType): Tweet {
        const newTweet = new Tweet(this, content, type);
        this._tweets.push(newTweet);   
        Tweets.push(newTweet);         
        console.log(`<@${this._username}> enviou um novo tweet: "${content}"`);
        return newTweet;
    }
    
    //Método 2: Follow 
    public follow(userId: string): void {
        const user = Users.find(user => user.id === userId);

        if (!user) {
            console.log(`Usuário com id ${userId} não encontrado.`);
            return;
        }

        if (user === this) {
            console.log(`${this._name}, você não pode seguir a si mesmo.`);
            return;
        }

        if (this._followers.includes(user)) {
            const index = this._followers.findIndex(follower => follower.id === user.id);
            if (index !== -1) {
                this._followers.splice(index, 1);
                console.log(`<@${this._username} deixou de seguir @${user.username}>`);
            }
        } else {
            this._followers.push(user);
            console.log(`<@${this._username} agora está seguindo @${user.username}>`);
        }
    }

    //Método 3: Exibir feed
    public showTweets(): void {
        this._tweets.forEach(tweet => {
            tweet.showTweet();
        });
    }

    public showFeed(): void {
        console.log(`Feed de @${this._username}:`);
    
        this.showTweets();
        
        this._followers.forEach(follower => {
            follower.showTweets();
        });
    }

    // Getters
    public get id(): string {
        return super.id;  
    }

    public get username(): string {
       return this._username;  
    }

    public get followers(): User[] {
       return this._followers;  
    }

    public get tweets(): Tweet[] {
        return this._tweets;  
    }
}


