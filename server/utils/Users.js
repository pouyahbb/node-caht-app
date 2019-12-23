[{
    id:'#/1212312414214sfdaf',
    name : 'Pouya',
    room : 'The Office Fans'
}]

class Users {
    constructor (){
        this.users = [];
    }
    addUser (id , name , room){
        let user = {id , name , room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //return user that was removed
        let user =  this.getUser(id);

        if(user){
            this.users = this.users.filter((user)=>user.id !== id);
        }

        return user;

    }
    getUser (id){
        return this.users.filter((user)=>user.id === id)[0];
    }
    getUserList (room){
        let users = this.users.filter((user)=>user.room === room);
        let nameArray = users.map((user)=>user.name);

        return nameArray;
    }
}

module.exports = {Users};