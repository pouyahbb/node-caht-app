const expect = require('expect');

const {isRealString} = require('./validation');



describe('isRealString' , ()=>{
    it('Should reject non-string values',()=>{
        let res = isRealString(98);
        expect(res).toBe(false);
    });
    it('Should reject string with only spaces' , ()=>{
        let res = isRealString('          ');
        expect(res).toBe(false);
    });
    it('Should allow string with non-space characters' , ()=>{
        let res = isRealString('   Pouya    ');
        expect(res).toBe(true);
    })
})