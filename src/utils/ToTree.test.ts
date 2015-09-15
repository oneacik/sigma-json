test("toTree creates root representation", ()=>{
   expect(toTree({})).toEqual({params:{}, value:{}});
});
