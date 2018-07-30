# iw-multiple-values

# How to use

Simply use the tag `iw-multiple-values` and inside put the inputs that you want, for example:

```
         <iw-multiple-values label="{{'Characteristics Rel.' | translate}}">
                        <select name="id">
                            <option value=""></option>
                            <option value="{{item.id}}" ng-repeat="item in vm.servicedata.serviceSpecCharacteristics">{{item.name}}</option>
                        </select>
                        <select name="type">
                            <option value=""></option>
                            <option value="dependency">{{'dependency' | translate}}</option>
                        </select>
                    </iw-multiple-values>
```

## Properties

### label
string

### value
Array

Value of the component

### canEdit
boolean

If true, the user can add/delete/modify the values.




*Built with [StencilJS](https://stenciljs.com/)*
