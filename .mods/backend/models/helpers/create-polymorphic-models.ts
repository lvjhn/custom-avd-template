import { belongsTo } from "@adonisjs/lucid/orm"

function createClass(
    table: any, 
    Something: any, 
    ReferredClass: any, 
    foreignKey : string
) {

    class DynamicClass extends Something {
        static table = table;

        @belongsTo(ReferredClass, { foreignKey })
        declare liked : any;
    }

    return DynamicClass;
}

export function createPolymorphicModels(
    PolymorphicModel : any,
    Something: any, 
) {
    const classes: any = {};
    const mappings = PolymorphicModel.mappings()
    const foreignKey = PolymorphicModel.foreignKey

    for (let likeable in mappings) {
        const model = likeable;
        const table = mappings[model][0];
        const ReferredClass = mappings[model][1];
        classes[model] = createClass(table, Something, ReferredClass, foreignKey);
    }

    return classes;
}