export class Item {
    public name: string;
    public placeholder: string;
    public value: string;
    public type: string;
    public options?: any[];

    constructor(name: string, value: string, placeholder: string, type: string, options?: any[]) {
        this.name = name;
        this.placeholder = placeholder;
        this.value = value;
        this.type = type;
        this.options = options;
    }
}