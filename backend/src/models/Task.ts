export class Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;

    constructor(id: string, title: string, description: string, completed: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
        };
    }
}