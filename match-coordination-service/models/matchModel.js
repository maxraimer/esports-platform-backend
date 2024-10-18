export class Match {
    constructor({id}) {
        this._id = id;
        this.status = 'pending';
        this.format = '';
        this.winner = '';
        this.roundsPlayed = -1;
        this.tournament = {
            id: '',
            round: '',
            phase: '',
            numMatch: -1,
            bracket: ''
        };
        this.totalScore = {
            teamA: -1,
            teamB: -1,
        };
        this.mapveto = {
            maps: [],
            vetoSteps: [],
            finalMaps: []
        };
        this.teams = {
            teamA: {},
            teamB: {}
        }
    }

    init(data) {
        if (data.status) this.status = data.status;
        if (data.format) this.status = data.format;
        if (data.winner) this.status = data.winner;
        if (data.roundsPlayed) this.status = data.roundsPlayed;
        if (data.totalScore) this.status = data.totalScore;
        if (data.mapveto) this.status = data.mapveto;
        if (data.teams) this.status = data.teams;
    }

    updateStatus(newStatus) {
        const allowedStatuses = ['pending', 'in-progress', 'finished'];
        if (!allowedStatuses.includes(newStatus)) {
            throw new Error(`Invalid status: ${newStatus}`);
        }
        this.status = newStatus;
    }

    determineWinner() {
        if (this.status === 'finished') {
            if (this.score.teamA > this.score.teamB) {
                this.winner = 'teamA';
            } else if (this.score.teamA < this.score.teamB) {
                this.winner = 'teamB';
            } else {
                throw new Error('Score is equal, can not determine winner');
            }
        } else {
            throw new Error('Match has to be finished first');
        }
    }

    setTeam({teamSide, team}) {
        if (!team || !teamSide) {
            throw new Error('Team is required');
        }
        teamSide === 'teamA' ? this.teams.teamA = team : this.teams.teamB = team;
    }

    setScore([team1Score, team2Score]) {
        if (typeof team1Score !== 'number' || typeof team2Score !== 'number') {
            throw new Error('Scores must be valid numbers');
        }
        this.score = [team1Score, team2Score];
    }

    setMapPool(maps) {
        if (!Array.isArray(maps) || maps.length !== 7) {
            throw new Error('Map pool must be a 7-elements array');
        }
        this.mapveto.maps = maps;
    }

    addVetoStep(step) {
        if (!step || !step.team || !step.action || !step.map) {
            throw new Error('Each veto step must include team, action, and map');
        }
        if (!this.mapveto.maps.includes(step.map)) {
            throw new Error(`There is no ${step.map} in the pool`);
        }
        this.mapveto.vetoSteps.push(step);
    }

    setFinalMaps() {
        const mapPool = this.mapveto.maps.slice();
        const finalMaps = [];

        this.mapveto.vetoSteps.forEach((step) => {
            const index = mapPool.findIndex((map) => map === step.map);

            if (index !== -1) {
                if (step.action === 'pick') {
                    finalMaps.push(step.map);
                }
                mapPool.splice(index, 1);
            }
            
        });

        if (mapPool.length === 1) {
            finalMaps.push(mapPool[0]);
        }
    
        this.mapveto.finalMaps = finalMaps;
    }
}

class MatchTeam {
    constructor({id}) {
        this._id = id;
        this.score = -1;
        this.name = '';
        this.players = {
            player1: {},
            player2: {},
            player3: {},
            player4: {},
            player5: {}
        }
    }

    init(data) {
        if (data.score) this.score = data.score;
        if (data.name) this.name = data.name;
        if (data.players) this.players = data.players;
    }

    setPlayer({playerNumber, player}) {
        if (!player || !playerNumber) {
            throw new Error('Player and PlayerNumber are required');
        }
        if (!playerNumber.includes('player')) {
            throw new Error('PlayerNumver has to be "player" + number');
        }
        
        this.players[playerNumber] = player;
    }
}

class MatchPlayer {
    constructor({id}) {
        this._id = id;
        this.nickname = '';
        this.team = '';
        this.teamName = '';
        this.rating = -1;
        this.stats = {
            kills: -1,
            deaths: -1,
            assists: -1,
            hsp: -1,
            KASRounds: -1,
            multikills: -1,
            totalDamage: {
                dealt: -1,
                received: -1
            },
            clutches: {
                vs1: -1,
                vs2: -1,
                vs3: -1,
                vs4: -1,
                vs5: -1
            },
            headToHead: {
                player1: {kills: -1, deaths: -1},
                player2: {kills: -1, deaths: -1},
                player3: {kills: -1, deaths: -1},
                player4: {kills: -1, deaths: -1},
                player5: {kills: -1, deaths: -1}
            }
        }
    }

    init(data) {
        if (data.nickname) this.nickname = data.nickname;
        if (data.team) this.team = data.team;
        if (data.teamName) this.teamName = data.teamName;
        if (data.rating) this.rating = data.rating;
        if (data.stats) this.stats = data.stats;
    }
}