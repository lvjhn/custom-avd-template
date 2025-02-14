import { BaseModel } from "@adonisjs/lucid/orm"
import { ModelQueryBuilderContract } from "@adonisjs/lucid/types/model"



export default class PolymorphicModel extends BaseModel {

    static mappings() : any {

    }

    static foreignKey : string

    static async mergedQuery(
        mainQuery : 
            (query: ModelQueryBuilderContract<any, any>) => any, 
        subQuery? : 
            (query: ModelQueryBuilderContract<any, any>) => any 
    ) {
        const results = await mainQuery(this.query())
        const types : any = {}
        const reverseMap : any = {}
        const idMap : any = {}
        for(let result of results) {
            types[result.source] = []
            idMap[result.source] = {}
        }
        let i = 0
        for(let result of results) {
            types[result.source].push(result[this.foreignKey])
            idMap[result.source][result[this.foreignKey]] = i 
            i++
        }

        const mappings = this.mappings()
        const binds = []

        for(let morph in mappings) {
            const Model = mappings[morph][1]()
            let subResults 

            reverseMap[Model.table] = mappings[morph][0]
            
            if(!(mappings[morph][0] in types)) {
                continue
            }
            
            if(subQuery) {
                subResults = await subQuery(
                    Model.query().whereIn(
                        "id", 
                        types[reverseMap[Model.table]]
                    )
                )
            } else {
                subResults = await Model.query().whereIn(
                    "id", 
                    types[reverseMap[Model.table]]
                )
            }

            for(let subResult of subResults) {
                const targetIndex = idMap[mappings[morph][0]][subResult.id]
                results[targetIndex].liked = subResult
             }            

        
        }

        
        return results
    }
}