import { Component, Element } from '@stencil/core';
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

  @Element() element: HTMLStencilElement;
  
  // Array of inputs
  model: Item[] = [];

  componentWillLoad() {
    // Primero si es text
    let inputs = this.element.querySelectorAll("input");
    if (inputs.length) {
      Array.from(inputs).forEach(input => {
        this.model.push(new Item(input.name, input.name, input.placeholder, input.type));
        this.element.removeChild(input);
      });
    } else {
      console.warn('Inputs elements arent found');
    }
  }

  render() {
    console.log(this.model);
    let pl = {'padding-left': '0px'};
    return (
      <div class="container">
        <div class="form-group">
          <label class="control-label col-sm-2">Related Parties </label>{/*  <!-- for inputname --> */}
          {this.model.map((i) =>
            <div class="col-xs-10" style={pl}> 
              <fieldset class="mb10">
                <div class="form-horizontal">
                  <div class="inputinline col-xs-2">
                    <input class="form-control input-sm" type="text" value={i.name} placeholder={i.placeholder} />
                  </div>
                  <div class="inputinline inputinlinebtn col-xs-2">
                    <button type="button" ng-if="$last" class="btn btn-xs btn-primary btn-circle"><i class="fa fa-plus"></i></button>
                    <button type="button" class="btn btn-xs btn-primary btn-circle"><i class="fa fa-minus"></i></button>
                  </div>
                </div>
              </fieldset>
            </div>
          )}
        </div>
      </div>
    );
  }

}






