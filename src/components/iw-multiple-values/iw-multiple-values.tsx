import { Component, Element, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';
import { Item } from './Item';
import { compareArrays } from '../../utils/helpers';

@Component({
  tag: 'iw-multiple-values',
})
export class IwMultipleValues {

  model: Item[] = [];
  modelObj: object;

  @Element() element: HTMLElement;

  @State() data: any[] = [];

  @Prop() label: string;
  @Prop({ mutable: true }) value: any = [];

  @Watch('value')
  valueDidChangeHandler(newValue: string) {
    if (!Array.isArray(newValue)) {
      this.validateValue();
    }
  }

  @Event() valuechange: EventEmitter;

  componentWillLoad() {
    let inputs = this.element.querySelectorAll("input, select");
    if (inputs.length) {
      Array.from(inputs).forEach(input => {
        console.log(input.querySelectorAll('option'));
        let node = input as HTMLInputElement;
        this.model.push(new Item(node.name, node.value, node.placeholder, node.type, Array.from(input.querySelectorAll('option'))));
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
      console.warn('Inputs elements arent found');
    }
  }

  componentDidUpdate() {
    // When re-render the component, update the value of the element
    let value = JSON.parse(JSON.stringify(this.data));
    this.value = value;
    this.valuechange.emit(value);
  }

  makeObject() {
    let obj = {};
    for (let item of this.model) {
      obj[item.name] = item.value;
    }
    this.modelObj = { ...obj };
    return obj;
  }

  validateValue() {
    try {
      let values = JSON.parse(this.value);
      let keysModel = Object.keys(this.modelObj);
      values.forEach(element => {
        if (compareArrays(Object.keys(element), keysModel)) {
          this.data = [...this.data, element];
        }
      });

      if (!this.data.length) {
        throw "Objects are invalid";
      }

    } catch (e) {
      console.error("[IW] Value defined is not valid");
    }
  }

  addItem() {
    this.data = [...this.data, { ...this.modelObj }];
  }

  removeItem(index: number) {
    if (this.data.length == 1) {
      this.data = [this.makeObject()];
    } else {
      this.data = this.data.filter((_, idx) => idx !== index);
    }
  }

  changeValue(event, index: number, property: string) {
    let value = event.target.value;
    // this.data[index][property] = value; // Aca no hay reactividad
    this.data = this.data.map((i, idx) => {
      if (idx == index) {
        i[property] = value;
      }
      return i;
    });
  }

  render() {
    let pl = { 'padding-left': '0px' };
    return (
      <div class="container">
        <form class="form-horizontal col-xs-11">
          <div class="form-group">
            <label class="control-label col-sm-2">{this.label}</label>{/*  <!-- for inputname --> */}
            <div class="col-xs-10" style={pl}>
              {/* Repeat the fieldset */}
              {this.data.map((e, idx) =>
                <fieldset class="mb10">
                  <div class="form-horizontal">
                    {/* Inputs */}
                    {this.model.map((i) =>
                      <div>
                        <div class="inputinline col-xs-2">
                          {i.type == "select-one"
                            ? <select class="form-control input-sm" name="i.name" onInput={(ev) => this.changeValue(ev, idx, i.name)} >
                              {i.options.map(o =>
                                <option value={o.value}>{o.text}</option>
                              )}
                            </select>
                            : <input class="form-control input-sm" name={i.name} value={e[i.name]} type={i.type} placeholder={i.placeholder} onInput={(ev) => this.changeValue(ev, idx, i.name)} />}
                        </div>
                      </div>
                    )}
                    {/* Buttons */}
                    <div class="inputinline inputinlinebtn col-xs-2">
                      {this.data.length == idx + 1 ? <button type="button" ng-if="$last" class="btn btn-xs btn-primary btn-circle" onClick={this.addItem.bind(this)}><i class="fa fa-plus"></i></button> : null}
                      {this.data.length !== 1 ? <button type="button" class="btn btn-xs btn-primary btn-circle" onClick={_ => this.removeItem(idx)}><i class="fa fa-minus"></i></button> : null}
                    </div>
                  </div>
                </fieldset>
              )}
              {/* Fin repeat fieldset */}
            </div>
          </div>
        </form>
      </div>
    );
  }

}






