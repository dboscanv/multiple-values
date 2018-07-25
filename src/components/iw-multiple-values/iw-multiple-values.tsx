import { Component, Element, State } from '@stencil/core';
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
  @State() data: any[];
  @State() test: any[] = [{a:1},{a:2},{a:3},{a:4},{a:5}];

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
      console.log(this.data);
    } else {
      console.warn('Inputs elements arent found');
    }
  }

  makeObject() {
    let obj = {};
    for (let item of this.model) {
      obj[item.name] = item.value;
    }
    this.modelObj = obj;
    return obj;
  }

  addItem() {
    this.data = [...this.data, this.modelObj];
  }

  changeValue(event, element, property) {
    let value = event.target.value;
    let el = this.data[element];
    let new_value = {[property]: value};
    
  }

  changeFirstOnly() {
    // TODO: Ver como hacer para sea reactivo?
    this.data[0] = {...this.data[0], first_name: "DIEGO!"}
    console.log(this.data);
    this.test[0] = {a:99};
    console.log(this.test);
  }

  render() {
    let pl = { 'padding-left': '0px' };
    return (
      <div class="container">
      {this.test.map(t => 
        <p>{t.a}</p>
      )}
      <button onClick={this.changeFirstOnly.bind(this)}>Change the first position only</button>
        <form class="form-horizontal col-xs-11">
          <div class="form-group">
            <label class="control-label col-sm-2">Related Parties </label>{/*  <!-- for inputname --> */}
            <div class="col-xs-10" style={pl}>
              {/* Repeat the fieldset */}
              {this.data.map((e, idx) =>
                <fieldset class="mb10">
                  <div class="form-horizontal">
                    {/* Inputs */}
                    {this.model.map((i) =>
                      <div>
                        <div class="inputinline col-xs-2">
                          <input class="form-control input-sm" name={i.name} value={e[i.name]} type={i.type} placeholder={i.placeholder} onInput={(ev) => this.changeValue(ev,idx,i.name)} />
                        </div>
                      </div>
                    )}
                    {/* Buttons */}
                    <div class="inputinline inputinlinebtn col-xs-2">
                      <button type="button" ng-if="$last" class="btn btn-xs btn-primary btn-circle" onClick={this.addItem.bind(this)}><i class="fa fa-plus"></i></button>
                      <button type="button" class="btn btn-xs btn-primary btn-circle"><i class="fa fa-minus"></i></button>
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






