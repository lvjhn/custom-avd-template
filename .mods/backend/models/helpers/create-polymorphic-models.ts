import { belongsTo } from "@adonisjs/lucid/orm"
import type { BelongsTo } from "@adonisjs/lucid/types/relations"

function createClass(table: any, Something: any, ReferredClass: any) {
    class DynamicClass extends Something {
        static table = table;

        @belongsTo(() => ReferredClass)
        declare liked: BelongsTo<typeof ReferredClass>;
    }

    return DynamicClass;
}

export function createPolymorphicModels(mappings: any, Something: any) {
    const classes: any = {};

    for (let likeable in mappings) {
        const model = likeable;
        const table = mappings[model][0];
        const ReferredClass = mappings[model][1];
        classes[table] = createClass(table, Something, ReferredClass);
    }

    return classes;
}