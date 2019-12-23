const expect = require('expect');
const {Users} = require('./Users');

describe('Users' , ()=>{
    let users;

    beforeEach(()=>{
        users = new users();
        users.users=[{
            id : '1',
            name : 'mike',
            room : 'Node course'
        },{
            id : '2',
            name : 'jen',
            room : 'React course'
        },{
            id:'3',
            name : 'mock',
            room : 'Node course'
        }]
    })

    it('Should add new user' , ()=>{
        let users = new Users();
        let user = {
            id : '123',
            name : 'Pouya' , 
            room : 'The Office Fans'
        }
        let resUser = users.addUser(user.name , user.id , user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should remove a user' , ()=>{
        let usetID = '123';
        let user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });
    
    it('Should not remove a user' , ()=>{
        let usetID = '99';
        let user = users.removeUser(userID);
    
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

    it('Should find user' , ()=>{
        let userID = '2';
        let user = users.getUser(userID);

        expect(user.id).toBe(userID);
    })

    it('Should not find user' , ()=>{
        let userID = '99';
        let user = users.getUser(userID);

        expect(user).toNotExist();
    })

    it('Should return names for node course' , ()=>{
        let userList = users.getUserList('Node course');

        expect(userList).toEqual(['mike' , 'mock'])
    })

    it('Should return names for react course' , ()=>{
        let userList = users.getUserList('react course');

        expect(userList).toEqual(['jen'])
    })
})