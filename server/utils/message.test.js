let expect = require('expect');
let {generateMessage} = require('./message');

describe('gengerateMessage' , ()=>{
    it('should generate correct message object' , ()=>{
        let from = 'peronName';
        let text = 'some message';
        let message = generateMessage(from , text);

        expect(message.createAt).toBeCalled('number');
        expect(message).toInclude({from , text})
    });
});  