import { Base } from "./Base";
import { Tweet } from "./Tweet";
import { User } from "./User";

export class Like extends Base {
  private _user: User;

  constructor(user: User) {
    super();
    this._user = user;
  }

  public get user(): User {
    return this._user;
  }
}