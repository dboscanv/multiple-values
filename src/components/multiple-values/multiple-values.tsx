import { Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Item } from './Item';
import { compareArrays } from '../../utils/helpers';

@Component({
  tag: 'multiple-values',
})
export class MultipleValues {

  /**
   * Array of inputs (with name, classname, placeholder, type)
   */
  private model: Item[] = [];

  /**
   * Guide object
   */
  private modelObj: object;

  @Element() element: HTMLElement;

  /**
   * Value of the component
   */
  @State() data: any[] = [];

  /**
   * The name of the label of inputs
   */
  @Prop() label: string;

  /**
   * The class of the label
   */
  @Prop() labelClass: string = "col-sm-1 col-form-label";

  /**
   * Class of container of all inputs
   */
  @Prop() containerClass: string = "col-sm-10";

  /**
   * Class of row (one row = one element of the data object = one group of inputs)
   */
  @Prop() rowClass: string = "form-row"

  /**
   * Class of input's container
   */
  @Prop() containerInputClass: string = "col-sm-2";

  /**
  * Class of button's container
  */
  @Prop() containerButtonsClass: string = "col-sm-2";

  /**
   * Button's class
   */
  @Prop() buttonClass: string = "btn btn-primary";

  /**
   * If true, the inputs can edit
   */
  @Prop() canEdit: boolean = true;

  /**
   * The value of the component (multiple-values) 
   */
  @Prop({ mutable: true }) value: Array<any> = [];

  @Watch('value')
  valueDidChangeHandler() {
    this.data = [];
    if (this.value.length) {
      this.validateValue();
    } else {
      this.data = [...this.data, { ...this.modelObj }];
    }
  }

  /**
   * Emitted when the value change
   */
  @Event() valuechange: EventEmitter;

  componentWillLoad() {
    let inputs = this.element.querySelectorAll("input, select");
    if (inputs.length) {
      Array.from(inputs).forEach(input => {
        let node = input as HTMLInputElement;
        this.model.push(new Item(node.name, node.value, node.placeholder, node.type, node.className, Array.from(input.querySelectorAll('option'))));
        this.element.removeChild(input);
      });

      this.makeObject();

      // Recibir valores
      if (this.value.length) {
        this.validateValue();
      } else {
        this.data = [...this.data, { ...this.modelObj }];
      }
    } else {
      console.warn('[MULTIPLE-VALUES] Inputs elements arent found');
    }
  }

  /**
   * Make the guide object
   */
  makeObject() {
    let obj = {};
    for (let item of this.model) {
      obj[item.name] = item.value;
    }
    this.modelObj = { ...obj };
    return obj;
  }

  /**
   * Validate if the value of the component is an array and if has the same keys of the guide object
   */
  validateValue() {
    let keysModel = Object.keys(this.modelObj);

    this.value.forEach(element => {
      if (compareArrays(Object.keys(element), keysModel)) {
        let clean_element = this.cleanValue(element, keysModel);
        this.data = [...this.data, clean_element];
      }
    });

    if (!this.data.length) {
      throw "[MULTIPLE-VALUES] Objects are not have the same keys of the inputs";
    }
  }

  cleanValue(obj, keysGuide) {
    for (let key in obj) {
      if (keysGuide.indexOf(key) == -1) {
        delete obj[key];
      }
    }
    return obj;
  }

  /**
   * To add item
   */
  addItem() {
    this.data = [...this.data, { ...this.modelObj }];
  }


  /**
   * To remove item
   * @param index of array
   */
  removeItem(index: number) {
    if (this.data.length == 1) {
      this.data = [this.makeObject()];
    } else {
      this.data = this.data.filter((_, idx) => idx !== index);
    }

    // Emit event and change the value of component
    this.valuechange.emit(this.data);
    this.value = this.data;
  }

  /**
   * Change the value of the component
   * @param event 
   * @param index of array
   * @param property name of property to change
   */
  changeValue(event, index: number, property: string) {
    let value = event.target.value;
    // this.data[index][property] = value; // Aca no hay reactividad
    this.data = this.data.map((i, idx) => {
      if (idx == index) {
        i[property] = value;
      }
      return i;
    });

    // Emit event and change the value of component
    this.valuechange.emit(this.data);
    this.value = this.data;
  }

  render() {
    return (
      <div class="form-group row">
        <label class={this.labelClass}>{this.label}</label>
        <div class={this.containerClass}>
          {this.data.map((e, idx) =>
            <div class={this.rowClass}>
              {/* Inputs */}
              {this.model.map((i) =>
                <div class={this.containerInputClass}>
                  {i.type == "select-one"
                    ? <select disabled={!this.canEdit} class={i.className} name="i.name" onInput={(ev) => this.changeValue(ev, idx, i.name)} >
                      {i.options.map(o =>
                        <option value={o.value} selected={o.value == e[i.name]}>{o.text}</option>
                      )}
                    </select>
                    : <input class={i.className} disabled={!this.canEdit} name={i.name} value={e[i.name]} type={i.type} placeholder={i.placeholder} onInput={(ev) => this.changeValue(ev, idx, i.name)} />}
                </div>
              )}
              {/* Buttons */}
              {this.canEdit ?
                <div class={this.containerButtonsClass}>
                  {this.data.length == idx + 1 ? <button type="button" class={this.buttonClass} onClick={this.addItem.bind(this)}>
                    <slot name="btn-plus">  </slot>
                  </button> : null}
                  {this.data.length !== 1 ? <button type="button" class={this.buttonClass} onClick={_ => this.removeItem(idx)}>
                    <slot name="btn-minus">  </slot>
                  </button> : null}
                </div> : null}
            </div>
          )}
        </div>
      </div>
    );
  }

}






