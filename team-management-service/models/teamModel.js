export class Team {
    constructor({ id, name, captainId, createdAt }) {
        this._id = id;
        this.name = name || '';
        this.captainId = captainId || '';
        this.createdAt = createdAt || '';

        this.teamLogo = '';
        
        this.players = [];
        this.gameTitles = [];
        this.stats = {};
        this.matchHistory = [];
        this.tournamentHistory = [];

        this.socials = [];

        this.isPro = false;
        this.isVerified = false;
    }

    init(data) {
        if (data.name) this.name = data.name;
        if (data.captainId) this.captainId = data.captainId;
        if (data.createdAt) this.createdAt = data.createdAt;
        if (data.teamLogo) this.teamLogo = data.teamLogo;
        if (data.players) this.players = data.players;
        if (data.gameTitles) this.gameTitles = data.gameTitles;
        if (data.stats) this.stats = data.stats;
        if (data.matchHistory) this.matchHistory = data.matchHistory;
        if (data.tournamentHistory) this.tournamentHistory = data.tournamentHistory;
        if (data.socials) this.socials = data.socials;
        if (data.isPro) this.isPro = data.isPro;
        if (data.isVerified) this.isVerified = data.isVerified;
    }

    addPlayer(playerId, gameTitle) {
        this.players.push({playerId, gameTitle});
    }

    removePlayer(playerId, gameTitle) {
        const index = this.players.findIndex((p) => p.playerId === playerId && p.gameTitle === gameTitle);
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }
}