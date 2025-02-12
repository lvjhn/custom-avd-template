
export const makePolymorphicView = (name : string, tables : string[]) : string => {
    let view = "CREATE VIEW " + name + " AS "; 
    let subQueries = []
    for(let table of tables) {
        subQueries.push("SELECT * FROM " + table)
    }
    view += subQueries.join(" UNION ALL ")
    return view 
}