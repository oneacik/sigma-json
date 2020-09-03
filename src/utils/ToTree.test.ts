import { toTree } from "./ToTree";

test("toTree creates root representation", ()=>{
   expect(toTree({})).toEqual({params:{}, value:[]});
});

test("toTree creates representation for non empty root", ()=>{
   expect(toTree({ksi: 'delta'})).toEqual({params:{}, value:[{params:{id: 'ksi'}, value:'delta'}]});
});
