import { belongsTo } from "@adonisjs/lucid/orm"

function createClass(table: any, Something: any, ReferredClass: any) {

    class DynamicClass extends Something {
        static table = table;

        @belongsTo(ReferredClass)
        declare liked : any;
    }

    return DynamicClass;
}

export function createPolymorphicModels(mappings: any, Something: any) {
    const classes: any = {};

    for (let likeable in mappings) {
        const model = likeable;
        const table = mappings[model][0];
        const ReferredClass = mappings[model][1];
        classes[model] = createClass(table, Something, ReferredClass);
    }

    return classes;
}