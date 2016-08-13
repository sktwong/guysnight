/*
 * Guy's Night Out - Big 2
 * services.js
 *
 * All game services
 * - saving data
 * - retrieving data
 * - clearing data
 *
 */
big2App.factory('big2AppService', ['localStorageService', Big2AppServiceFn]);

function Big2AppServiceFn(localStorageService) {

    return {
        createNewGame: createNewGame,
        createNewScore: createNewScore,
        getData: getData,
        getSettings: getSettings,
        saveData: saveData,
        getHistory: getHistory
    };

    function createNewGame(settings) {
        // Temp setting of players
        var players = {'player1': '', 'player2': '', 'player3': '', 'player4': ''};
        if (settings.numberOfPlayers == '5') {
            players.player5 = '';
        }

        var scores = [];
        // scores.push(createNewScore(1, settings));

        var newGameData = {
            'settings': settings,
            'players': players,
            'scores': scores
        }
        saveData(newGameData);
    }

    function createNewScore(newGameId, settings) {
        var newScore = { 
            'id': newGameId
        };
        for (var i = 0; i < settings.numberOfPlayers; i++) {
            newScore['player' + (i + 1)] = '';
        }
        return newScore;
    }

    function getData() {
        return localStorageService.get('guysNightOut-big2');
    }

    function getHistory(date) {
        return getHistoricalData(date);
    }

    function getSettings() {
        return getData().settings;
    }

    function saveData(data) {
        localStorageService.set('guysNightOut-big2', data);
    }

    function getHistoricalData(date) {
        var data = {};
        data['2016.07.22'] = { "settings": { "numberOfPlayers": "5", "pointValue": "0.10" }, "players": { "player1": "Rob", "player2": "Marcus", "player3": "Kelvin", "player4": "James", "player5": "Steve" }, "scores": [ { "id": 1, "timestamp": "2016-07-23T01:47:58.186Z", "player1": 1, "player2": 3, "player3": 0, "player4": -10, "player5": 6 }, { "id": 2, "timestamp": "2016-07-23T01:54:49.098Z", "player1": 1, "player2": -7, "player3": 5, "player4": 1, "player5": 0 }, { "id": 3, "timestamp": "2016-07-23T01:58:38.478Z", "player1": 20, "player2": -60, "player3": 0, "player4": 20, "player5": 20 }, { "id": 4, "timestamp": "2016-07-23T02:02:57.450Z", "player1": 5, "player2": -13, "player3": 6, "player4": 2, "player5": 0 }, { "id": 5, "timestamp": "2016-07-23T02:07:03.005Z", "player1": -7, "player2": 3, "player3": 0, "player4": 3, "player5": 1 }, { "id": 6, "timestamp": "2016-07-23T02:11:21.184Z", "player1": 3, "player2": -10, "player3": 4, "player4": 0, "player5": 3 }, { "id": 7, "timestamp": "2016-07-23T02:14:58.888Z", "player1": -24, "player2": 20, "player3": 0, "player4": 3, "player5": 1 }, { "id": 8, "timestamp": "2016-07-23T02:19:37.021Z", "player1": 6, "player2": 0, "player3": 4, "player4": -30, "player5": 20 }, { "id": 9, "timestamp": "2016-07-23T02:25:15.619Z", "player1": -4, "player2": 1, "player3": 1, "player4": 2, "player5": 0 }, { "id": 10, "timestamp": "2016-07-23T02:30:28.826Z", "player1": 2, "player2": 1, "player3": 1, "player4": 0, "player5": -4 }, { "id": 11, "timestamp": "2016-07-23T02:35:41.221Z", "player1": 0, "player2": 4, "player3": 1, "player4": -10, "player5": 5 }, { "id": 12, "timestamp": "2016-07-23T02:40:35.106Z", "player1": 9, "player2": 2, "player3": -18, "player4": 7, "player5": 0 }, { "id": 13, "timestamp": "2016-07-23T02:45:32.788Z", "player1": 0, "player2": 3, "player3": 1, "player4": 3, "player5": -7 }, { "id": 14, "timestamp": "2016-07-23T02:52:00.118Z", "player1": 20, "player2": -48, "player3": 20, "player4": 0, "player5": 8 }, { "id": 15, "timestamp": "2016-07-23T02:57:39.679Z", "player1": 4, "player2": 4, "player3": 0, "player4": 1, "player5": -9 }, { "id": 16, "timestamp": "2016-07-23T03:04:17.437Z", "player1": 0, "player2": 4, "player3": 2, "player4": -15, "player5": 9 }, { "id": 17, "timestamp": "2016-07-23T03:10:04.382Z", "player1": 2, "player2": -7, "player3": 2, "player4": 3, "player5": 0 }, { "id": 18, "timestamp": "2016-07-23T03:14:44.099Z", "player1": 7, "player2": 6, "player3": 7, "player4": 0, "player5": -20 }, { "id": 19, "timestamp": "2016-07-23T03:19:56.954Z", "player1": -8, "player2": 1, "player3": 0, "player4": 5, "player5": 2 }, { "id": 20, "timestamp": "2016-07-23T03:25:57.603Z", "player1": -7, "player2": 3, "player3": 1, "player4": 0, "player5": 3 }, { "id": 21, "timestamp": "2016-07-23T03:32:35.092Z", "player1": 5, "player2": -15, "player3": 5, "player4": 5, "player5": 0 }, { "id": 22, "timestamp": "2016-07-23T03:37:41.982Z", "player1": -9, "player2": 2, "player3": 0, "player4": 5, "player5": 2 }, { "id": 23, "timestamp": "2016-07-23T03:42:35.710Z", "player1": -24, "player2": 9, "player3": 6, "player4": 0, "player5": 9 }, { "id": 24, "timestamp": "2016-07-23T03:46:21.988Z", "player1": 22, "player2": -51, "player3": 20, "player4": 9, "player5": 0 }, { "id": 25, "timestamp": "2016-07-23T03:51:43.723Z", "player1": 0, "player2": 2, "player3": -9, "player4": 4, "player5": 3 }, { "id": 26, "timestamp": "2016-07-23T03:58:56.638Z", "player1": 5, "player2": -7, "player3": 1, "player4": 0, "player5": 1 }, { "id": 27, "timestamp": "2016-07-23T04:02:51.573Z", "player1": 0, "player2": 20, "player3": 9, "player4": 8, "player5": -37 }, { "id": 28, "timestamp": "2016-07-23T04:06:07.902Z", "player1": 4, "player2": 0, "player3": 20, "player4": -27, "player5": 3 }, { "id": 29, "timestamp": "2016-07-23T04:09:58.772Z", "player1": 1, "player2": -11, "player3": 0, "player4": 4, "player5": 6 }, { "id": 30, "timestamp": "2016-07-23T04:13:28.048Z", "player1": 5, "player2": 7, "player3": -16, "player4": 4, "player5": 0 }, { "id": 31, "timestamp": "2016-07-23T04:17:40.015Z", "player1": 4, "player2": 0, "player3": 9, "player4": -17, "player5": 4 }, { "id": 32, "timestamp": "2016-07-23T04:24:15.129Z", "player1": -12, "player2": 7, "player3": 0, "player4": 4, "player5": 1 }, { "id": 33, "timestamp": "2016-07-23T04:28:35.198Z", "player1": 3, "player2": 0, "player3": 6, "player4": 4, "player5": -13 }, { "id": 34, "timestamp": "2016-07-23T04:35:09.086Z", "player1": 20, "player2": 3, "player3": 0, "player4": 2, "player5": -25 }, { "id": 35, "timestamp": "2016-07-23T04:40:35.026Z", "player1": 0, "player2": 8, "player3": 5, "player4": -15, "player5": 2 }, { "id": 36, "timestamp": "2016-07-23T04:46:19.646Z", "player1": -8, "player2": 0, "player3": 2, "player4": 5, "player5": 1 }, { "id": 37, "timestamp": "2016-07-23T04:51:27.648Z", "player1": 4, "player2": -12, "player3": 3, "player4": 0, "player5": 5 }, { "id": 38, "timestamp": "2016-07-23T04:57:24.671Z", "player1": 5, "player2": -9, "player3": 2, "player4": 2, "player5": 0 }, { "id": 39, "timestamp": "2016-07-23T05:02:03.114Z", "player1": 0, "player2": 3, "player3": 2, "player4": -6, "player5": 1 }, { "id": 40, "timestamp": "2016-07-23T05:07:51.887Z", "player1": 5, "player2": 0, "player3": -17, "player4": 6, "player5": 6 }, { "id": 41, "timestamp": "2016-07-23T05:12:33.451Z", "player1": -4, "player2": 2, "player3": 1, "player4": 1, "player5": 0 }, { "id": 42, "timestamp": "2016-07-23T05:17:49.769Z", "player1": -10, "player2": 0, "player3": 1, "player4": 5, "player5": 4 }, { "id": 43, "timestamp": "2016-07-23T05:22:07.652Z", "player1": 2, "player2": 5, "player3": 1, "player4": 0, "player5": -8 }, { "id": 44, "timestamp": "2016-07-23T05:26:56.301Z", "player1": 1, "player2": 0, "player3": 5, "player4": -11, "player5": 5 }, { "id": 45, "timestamp": "2016-07-23T05:30:54.221Z", "player1": -16, "player2": 3, "player3": 0, "player4": 6, "player5": 7 }, { "id": 46, "timestamp": "2016-07-23T05:34:34.589Z", "player1": 9, "player2": 5, "player3": 7, "player4": -21, "player5": 0 }, { "id": 47, "timestamp": "2016-07-23T05:38:43.032Z", "player1": 0, "player2": 20, "player3": 3, "player4": 5, "player5": -28 }, { "id": 48, "timestamp": "2016-07-23T05:42:05.678Z", "player1": 6, "player2": 0, "player3": 6, "player4": 6, "player5": -18 }, { "id": 49, "timestamp": "2016-07-23T05:47:12.573Z", "player1": 3, "player2": -15, "player3": 6, "player4": 0, "player5": 6 }, { "id": 50, "timestamp": "2016-07-23T05:50:05.130Z", "player1": -28, "player2": 3, "player3": 0, "player4": 20, "player5": 5 }, { "id": 51, "timestamp": "2016-07-23T05:53:58.901Z", "player1": 9, "player2": 4, "player3": -21, "player4": 0, "player5": 8 }, { "id": 52, "timestamp": "2016-07-23T05:57:46.920Z", "player1": 0, "player2": 9, "player3": 4, "player4": -21, "player5": 8 }, { "id": 53, "timestamp": "2016-07-23T06:00:48.539Z", "player1": -10, "player2": 0, "player3": 3, "player4": 6, "player5": 1 } ], "totals": { "player1": 22, "player2": -98, "player3": 101, "player4": -22, "player5": -3 } };
        data['2016.08.12'] = { "settings": { "numberOfPlayers": "4", "pointValue": "0.10" }, "players": { "player1": "Marcus", "player2": "Steve", "player3": "Kelvin", "player4": "James" }, "scores": [ { "id": 1, "player1": -4, "player2": 2, "player3": 1, "player4": 1, "timestamp": "2016-08-13T02:15:04.031Z" }, { "id": 2, "player1": 7, "player2": -15, "player3": 6, "player4": 2, "timestamp": "2016-08-13T02:19:37.823Z" }, { "id": 3, "player1": 1, "player2": -14, "player3": 6, "player4": 7, "timestamp": "2016-08-13T02:24:23.896Z" }, { "id": 4, "player1": 5, "player2": -19, "player3": 7, "player4": 7, "timestamp": "2016-08-13T02:29:02.717Z" }, { "id": 5, "player1": 7, "player2": 5, "player3": 5, "player4": -17, "timestamp": "2016-08-13T02:33:13.991Z" }, { "id": 6, "player1": -9, "player2": 3, "player3": 2, "player4": 4, "timestamp": "2016-08-13T02:38:37.887Z" }, { "id": 7, "player1": 4, "player2": 9, "player3": -14, "player4": 1, "timestamp": "2016-08-13T02:43:06.034Z" }, { "id": 8, "player1": -14, "player2": 8, "player3": 4, "player4": 2, "timestamp": "2016-08-13T02:49:29.666Z" }, { "id": 9, "player1": -18, "player2": 7, "player3": 7, "player4": 4, "timestamp": "2016-08-13T02:54:59.876Z" }, { "id": 10, "player1": 2, "player2": -5, "player3": 2, "player4": 1, "timestamp": "2016-08-13T03:00:37.211Z" }, { "id": 11, "player1": 2, "player2": 4, "player3": 1, "player4": -7, "timestamp": "2016-08-13T03:06:23.503Z" }, { "id": 12, "player1": 4, "player2": 4, "player3": 2, "player4": -10, "timestamp": "2016-08-13T03:11:40.363Z" }, { "id": 13, "player1": 4, "player2": 6, "player3": 20, "player4": -30, "timestamp": "2016-08-13T03:16:49.522Z" }, { "id": 14, "player1": 1, "player2": 2, "player3": 7, "player4": -10, "timestamp": "2016-08-13T03:22:25.425Z" }, { "id": 15, "player1": 2, "player2": 4, "player3": -26, "player4": 20, "timestamp": "2016-08-13T03:27:54.193Z" }, { "id": 16, "player1": -11, "player2": 4, "player3": 2, "player4": 5, "timestamp": "2016-08-13T03:35:38.211Z" }, { "id": 17, "player1": 2, "player2": 5, "player3": -9, "player4": 2, "timestamp": "2016-08-13T03:41:18.853Z" }, { "id": 18, "player1": -4, "player2": 1, "player3": 2, "player4": 1, "timestamp": "2016-08-13T03:47:44.898Z" }, { "id": 19, "player1": 7, "player2": -20, "player3": 5, "player4": 8, "timestamp": "2016-08-13T03:52:49.644Z" }, { "id": 20, "player1": 4, "player2": 3, "player3": -27, "player4": 20, "timestamp": "2016-08-13T03:58:30.680Z" }, { "id": 21, "player1": 7, "player2": 5, "player3": -19, "player4": 7, "timestamp": "2016-08-13T04:04:49.826Z" }, { "id": 22, "player1": 6, "player2": -37, "player3": 24, "player4": 7, "timestamp": "2016-08-13T04:07:45.699Z" }, { "id": 23, "player1": 1, "player2": -3, "player3": 1, "player4": 1, "timestamp": "2016-08-13T04:12:58.822Z" }, { "id": 24, "player1": 6, "player2": -9, "player3": 2, "player4": 1, "timestamp": "2016-08-13T04:19:15.002Z" }, { "id": 25, "player1": 5, "player2": -13, "player3": 5, "player4": 3, "timestamp": "2016-08-13T04:26:12.262Z" }, { "id": 26, "player1": -6, "player2": 4, "player3": 1, "player4": 1, "timestamp": "2016-08-13T04:34:33.313Z" }, { "id": 27, "player1": -32, "player2": 20, "player3": 7, "player4": 5, "timestamp": "2016-08-13T04:41:03.103Z" }, { "id": 28, "player1": 9, "player2": 5, "player3": 22, "player4": -36, "timestamp": "2016-08-13T04:45:19.171Z" }, { "id": 29, "player1": 3, "player2": 3, "player3": 1, "player4": -7, "timestamp": "2016-08-13T04:51:17.969Z" }, { "id": 30, "player1": 5, "player2": 1, "player3": -7, "player4": 1, "timestamp": "2016-08-13T04:55:19.618Z" }, { "id": 31, "player1": 8, "player2": 7, "player3": -22, "player4": 7, "timestamp": "2016-08-13T05:03:32.160Z" }, { "id": 32, "player1": 6, "player2": -20, "player3": 7, "player4": 7, "timestamp": "2016-08-13T05:07:02.681Z" }, { "id": 33, "player1": 5, "player2": 3, "player3": 1, "player4": -9, "timestamp": "2016-08-13T05:14:06.370Z" }, { "id": 34, "player1": 7, "player2": 7, "player3": -19, "player4": 5, "timestamp": "2016-08-13T05:18:27.653Z" }, { "id": 35, "player1": 1, "player2": -17, "player3": 8, "player4": 8, "timestamp": "2016-08-13T05:26:39.352Z" }, { "id": 36, "player1": 9, "player2": 3, "player3": 4, "player4": -16, "timestamp": "2016-08-13T05:33:00.105Z" }, { "id": 37, "player1": -6, "player2": 2, "player3": 3, "player4": 1, "timestamp": "2016-08-13T05:38:33.641Z" }, { "id": 38, "player1": 7, "player2": 4, "player3": 3, "player4": -14, "timestamp": "2016-08-13T05:43:49.692Z" }, { "id": 39, "player1": 5, "player2": -18, "player3": 4, "player4": 9, "timestamp": "2016-08-13T05:48:29.248Z" }, { "id": 40, "player1": 6, "player2": -19, "player3": 9, "player4": 4, "timestamp": "2016-08-13T05:53:52.434Z" }, { "id": 41, "player1": 2, "player2": 2, "player3": 3, "player4": -7, "timestamp": "2016-08-13T05:59:08.593Z" }, { "id": 42, "player1": -19, "player2": 6, "player3": 7, "player4": 6, "timestamp": "2016-08-13T06:03:31.899Z" }, { "id": 43, "player1": 7, "player2": 6, "player3": 8, "player4": -21, "timestamp": "2016-08-13T06:07:44.003Z" }, { "id": 44, "player1": 8, "player2": -16, "player3": 6, "player4": 2, "timestamp": "2016-08-13T06:14:33.272Z" }, { "id": 45, "player1": 5, "player2": -17, "player3": 6, "player4": 6, "timestamp": "2016-08-13T06:18:39.120Z" }, { "id": 46, "player1": 2, "player2": 5, "player3": -16, "player4": 9, "timestamp": "2016-08-13T06:23:38.997Z" }, { "id": 47, "player1": 1, "player2": 4, "player3": 7, "player4": -12, "timestamp": "2016-08-13T06:28:01.022Z" }, { "id": 48, "player1": 3, "player2": 2, "player3": -11, "player4": 6, "timestamp": "2016-08-13T06:32:43.064Z" }, { "id": 49, "player1": 3, "player2": 8, "player3": -20, "player4": 9, "timestamp": "2016-08-13T06:37:13.920Z" } ], "totals": { "player1": 56, "player2": -78, "player3": 28, "player4": -6 } };
        
        return data[date];
    }
}