export type ValueType = "number"|
                        "null"|
                        "bool"

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
export interface BoolVal  {
    type : "bool",
    value : boolean,
}


export function MK_NUMBER(value = 0) : NumberVal{
    return { type : "number",value } as NumberVal;
}


export function MK_NULL() : NullVal{
    return { type : "null", value : "null" } as NullVal;
}
export function MK_BOOL(value : boolean) : BoolVal{
    return { type : "bool", value  } as BoolVal;
}
