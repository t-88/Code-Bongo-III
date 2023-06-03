import { RunTimeVal } from "./value.ts";

export default class Environment {
    private parent? : Environment;
    public vars : Map<string,RunTimeVal>;

    constructor(parentEnv? : Environment) {
        this.parent =  parentEnv;
        this.vars = new Map();
    }

    public resolve_var(name : string) : Map<string,RunTimeVal> {
        // console.log(this.vars[name],this.vars);
        if(this.vars[name] != undefined) {
            return this.vars;
        }

        if(this.parent == undefined) {
            console.error(`[Error] var ${name} not found in scope`);
            Deno.exit(1);
        }

        return (this.parent as Environment).resolve_var(name);
    }


    public declare_var(name: string, val : RunTimeVal) {
        if(this.vars[name] != undefined) {
            console.error(`[Error] declaring already exsiting var ${name}`);
            Deno.exit(1);
        }

        this.vars[name] = val;        
    }

    public assigne_var(name : string, val: RunTimeVal) {
        let vars = this.resolve_var(name) as Map<string,RunTimeVal>;
        vars[name] = val; 
    }
    public get_var(name : string) : RunTimeVal {
        return this.resolve_var(name)[name];
    }
}