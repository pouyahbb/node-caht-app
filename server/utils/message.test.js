let expect = require('expect');
let {generateMessage , generateLocationMessage} = require('./message');

describe('gengerateMessage' , ()=>{
    it('should generate correct message object' , ()=>{
        let from = 'peronName';
        let text = 'some message';
        let message = generateMessage(from , text);

        expect(message.createAt).toBeCalled('number');
        expect(message).toInclude({from , text})
    });
});  

describe('generateLocationMessage' , ()=>{
    it('should generate correct location object' , ()=>{
        let form = 'Deb';
        let latitude = 15;
        let longitude = 19;
        let url = `https://www.google.com/maps?q=15,19`;
        let message = generateLocationMessage(from , latitude , longitude);

        expect(message.createAt).toBeCalled('number');
        expect(message).toInclude({from , url})
    }) 
})