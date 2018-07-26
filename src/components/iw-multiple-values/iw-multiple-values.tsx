import { Component, Element, State, Prop } from '@stencil/core';
import { Item } from './Item';

// La metadata le agrega propiades/metodos a la clase
/*
  TODO:
    * Como funcionan los metadatos?
    * Pasar los estilos
    * Terminar de programar :)
    * Emitir evento de agarrar el valor!
*/
@Component({
  tag: 'iw-multiple-values',
})
export class IwMultipleValues {

  @Element() element: HTMLElement;
  @Prop() label: string;
  @State() data: any[];
  
  // Array of inputs
  model: Item[] = [];
  modelObj: object;

  componentWillLoad() {
    // console.log(this.element.getAttribute('value')); // Obtener el valor
    let inputs = this.element.querySelectorAll("input");
    if (inputs.length) {
      Array.from(inputs).forEach(input => {
        this.model.push(new Item(input.name, input.value, input.placeholder, input.type));
        this.element.removeChild(input);
      });
      this.data = [this.makeObject()];
    } else {
      console.warn('Inputs elements arent found');
    }
  }

  componentDidUpdate() {
    // When re-render the component, update the value of the element
    this.element.setAttribute('value', JSON.stringify(this.data));
  }

  makeObject() {
    let obj = {};
    for (let item of this.model) {
      obj[item.name] = item.value;
    }
    this.modelObj = { ...obj };
    return obj;
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
                          <input class="form-control input-sm" name={i.name} value={e[i.name]} type={i.type} placeholder={i.placeholder} onInput={(ev) => this.changeValue(ev, idx, i.name)} />
                        </div>
                      </div>
                    )}
                    {/* Buttons */}
                    <div class="inputinline inputinlinebtn col-xs-2">
                      {this.data.length == idx+1 ? <button type="button" ng-if="$last" class="btn btn-xs btn-primary btn-circle" onClick={this.addItem.bind(this)}><i class="fa fa-plus"></i></button> : null}
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






