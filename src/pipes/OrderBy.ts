import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import {List} from 'Immutable';
import {StoreModel} from "../models/StoreModel";

@Pipe({
    name: 'OrderBy'
})
export class OrderBy implements PipeTransform {
    transform(items: List<StoreModel>, ...args: any[]): any {
        if (_.isNull(args))
            return items;
        var field = args[0];
        var desc = args[1] == undefined ? false : args[1];
        if (items && field) {
            return items.sort((a: StoreModel, b: StoreModel)=> {
                // support both array as well as string based fields
                // [sortableHeader]="['Value','label']" or sortableHeader="myField"
                if (typeof field === 'object') {
                    var f1 = field[0];
                    var f2 = field[1];
                    if (a.getKey(f1)[f2] < b.getKey(f1)[f2])
                        return desc ? 1 : -1;
                    if (a.getKey(f1)[f2] > b.getKey(f1)[f2])
                        return desc ? -1 : 1;
                    return 0;
                } else {
                    if (a.getKey(field) < b.getKey(field))
                        return desc ? 1 : -1;
                    if (a.getKey(field) > b.getKey(field))
                        return desc ? -1 : 1;
                    return 0;
                }

            })
        }
        return items;
    }
}