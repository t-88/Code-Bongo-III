export type ValueType = "number"|
                        "null"

export interface RunTimeVal  {
    type : ValueType,
}

export interface NumberVal  {
    type : "number",
    value : number,
}
export interface NullVal  {
    type : "null",
    value : "null",
}