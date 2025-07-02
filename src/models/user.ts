export class User {
    constructor(
        public id: number,
        public name: string
    ) { }

    static fromJson(json: any): User {
        return new User(json.id, json.name);
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name
        };
    }
}