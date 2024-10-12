export class User {
    constructor({id, username, email, password}) {
        this._id = id;
        this.username = username || '';
        this.email = email || '';
        this.password = password || '';
        this.profilePic = '';

        this.firstName = '';
        this.lastName = '';
        this.nickname = '';
        this.age = -1
        this.dateOfBirth = -1;

        this.gameTitles = [];
        this.rank = -1;
        this.achievements = [];
        this.team = {};
        this.stats = {};
        this.matchHistory = [];
        this.tournamentHistory = [];

        this.socials = [];

        this.joinDate = -1;
        this.lastLogin = -1;
        
        this.isPro = false;
        this.isOrg = false;
        this.isVerified = false;
    }

    init(data) {
        if (data.password !== undefined) this.password = data.password;
        if (data.profilePic !== undefined) this.profilePic = data.profilePic;
        if (data.firstName !== undefined) this.firstName = data.firstName;
        if (data.lastName !== undefined) this.lastName = data.lastName;
        if (data.nickname !== undefined) this.nickname = data.nickname;
        if (data.age !== undefined) this.age = data.age;
        if (data.dateOfBirth !== undefined) this.dateOfBirth = data.dateOfBirth;
        if (data.gameTitles !== undefined) this.gameTitles = data.gameTitles;
        if (data.rank !== undefined) this.rank = data.rank;
        if (data.achievements !== undefined) this.achievements = data.achievements;
        if (data.team !== undefined) this.team = data.team;
        if (data.stats !== undefined) this.stats = data.stats;
        if (data.matchHistory !== undefined) this.matchHistory = data.matchHistory;
        if (data.tournamentHistory !== undefined) this.tournamentHistory = data.tournamentHistory;
        if (data.socials !== undefined) this.socials = data.socials;
        if (data.joinDate !== undefined) this.joinDate = data.joinDate;
        if (data.lastLogin !== undefined) this.lastLogin = data.lastLogin;
        if (data.isPro !== undefined) this.isPro = data.isPro;
        if (data.isOrg !== undefined) this.isOrg = data.isOrg;
        if (data.isVerified !== undefined) this.isVerified = data.isVerified;
    }
}