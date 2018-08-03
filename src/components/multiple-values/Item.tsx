export class Item {
    public name: string;
    public placeholder: string;
    public value: string;
    public type: string;
    public className: string;
    public options?: any[];

    constructor(name: string, value: string, placeholder: string, type: string, className: string, options?: any[]) {
        this.name = name;
        this.placeholder = placeholder;
        this.value = value;
        this.type = type;
        this.className = className;
        this.options = options;
    }
}