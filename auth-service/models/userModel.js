export class User {
    constructor({id, username, email, password}) {
        this._id = id;
        this.username = username || '';
        this.email = email || '';
        this.password = password || '';
        this.profilePic = '';
        this.profileCover = '';

        this.firstName = '';
        this.lastName = '';
        this.nickname = '';
        this.publicName = '';
        this.age = -1
        this.dateOfBirth = -1;
        this.address = '';

        this.rank = {};
        this.achievements = [];
        this.team = {};
        this.stats = {};
        this.matchHistory = [];
        this.tournamentHistory = [];
        this.friends = [];
        this.activities = [];

        this.socials = [];

        this.joinDate = -1;
        this.lastLogin = -1;
        
        this.flags = {};

        this.linkedAccounts = {
            steam: {
                steamID: -1,
                steamID64: -1,
                linkedGames: []
            },
            riot: {
                name: '',
                tag: '',
                linkedGames: []
            }
        };
    }

    init(data) {
        if (data.email !== undefined) this.email = data.email;
        if (data.password !== undefined) this.password = data.password;
        if (data.profilePic !== undefined) this.profilePic = data.profilePic;
        if (data.profileCover !== undefined) this.profileCover = data.profileCover;
        if (data.firstName !== undefined) this.firstName = data.firstName;
        if (data.lastName !== undefined) this.lastName = data.lastName;
        if (data.nickname !== undefined) this.nickname = data.nickname;
        if (data.publicName !== undefined) this.publicName = data.publicName;
        if (data.age !== undefined) this.age = data.age;
        if (data.dateOfBirth !== undefined) this.dateOfBirth = data.dateOfBirth;
        if (data.address !== undefined) this.address = data.address;
        if (data.rank !== undefined) this.rank = data.rank;
        if (data.achievements !== undefined) this.achievements = data.achievements;
        if (data.team !== undefined) this.team = data.team;
        if (data.stats !== undefined) this.stats = data.stats;
        if (data.matchHistory !== undefined) this.matchHistory = data.matchHistory;
        if (data.tournamentHistory !== undefined) this.tournamentHistory = data.tournamentHistory;
        if (data.friends !== undefined) this.friends = data.friends;
        if (data.activities !== undefined) this.activities = data.activities;
        if (data.socials !== undefined) this.socials = data.socials;
        if (data.joinDate !== undefined) this.joinDate = data.joinDate;
        if (data.lastLogin !== undefined) this.lastLogin = data.lastLogin;
        if (data.flags !== undefined) this.flags = data.flags;
        if (data.linkedAccounts !== undefined) this.linkedAccounts = data.linkedAccounts;
    }
}