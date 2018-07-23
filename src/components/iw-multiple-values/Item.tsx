export class Item {
    public name: string;
    public placeholder: string;
    public value: string;
    public type: string;

    constructor(name: string, value: string, placeholder: string, type: string) {
        this.name = name;
        this.placeholder = placeholder;
        this.value = value;
        this.type = type;
    }
}