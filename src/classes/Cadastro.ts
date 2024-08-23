import { User } from "./User";
import { Users } from "../database/Users";

export class Cadastro {
    public createUser(name: string, username: string, email: string, password: string): User | null {
        const existingUser = Users.find(user => user.username === username);
        if (existingUser) {
            console.log("Username já existe.");
            return null;
        }

        const newUser = new User(name, username, email, password);
        Users.push(newUser); 
        return newUser;
    }

    public findUsername(username: string): User | undefined {
        return Users.find(user => user.username === username);
    }
}
