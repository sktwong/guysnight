/*
 * Guy's Night Out - Big 2
 * stats.controller.js
 *
 * Game stats - modal controller
 *
 */
big2App.controller('modalStatsController', ['$scope', 'big2AppService', '$uibModalInstance', 'historyData', '$timeout', '$uibModal', modalStatsControllerFn]);

function modalStatsControllerFn($scope, big2AppService, $uibModalInstance, historyData, $timeout, $uibModal) {

    var vm = this;
    var data = (historyData.showHistory) ? big2AppService.getHistory(historyData.date) : big2AppService.getData();

    if (historyData.date == 'all') {
        data = consolidateData(data);
    }

    vm.gamesPlayed = data.scores.length;
    vm.players = data.players;
    vm.scores = data.scores;
    vm.settings = data.settings;
    vm.showHistory = historyData.showHistory;
    vm.totals = angular.copy(data.totals);
    
    vm.formatDate = big2AppService.formatDate;
    vm.formattedHistoryDate = historyData.date ? big2AppService.formatDate(historyData.date) : '';
    vm.historyDates = big2AppService.getHistoryDates();
    vm.historyModal = historyModal;
    vm.statDate = historyData.date;

    vm.stats = {
        totals: data.totals || initBlankStats(),
        totalWins: initBlankStats(),
        totalSmallWins: initBlankStats(),
        totalLosses: initBlankStats(),
        totalSmallLosses: initBlankStats(),
        totalSits: initBlankStats(),
        totalPlayed: initBlankStats(),
        totalDoubles: initBlankStats(),
        totalTriples: initBlankStats(),
        winPercentage: initBlankStats(),
        smallWinPercentage: initBlankStats(),
        lossPercentage: initBlankStats(),
        smallLossPercentage: initBlankStats(),
        totalBigLoser: initBlankStats(),
        avgWinningScore: initBlankStats(),
        avgLosingScore: initBlankStats(),
        winningScores: initBlankStatsArray(),
        losingScores: initBlankStatsArray(),
        winningStreaks: initBlankStats(),
        biggestWinningStreak: initBlankStats(),
        losingStreaks: initBlankStats(),
        biggestLosingStreak: initBlankStats(),
        playingStreaks: initBlankStats(),
        biggestPlayingStreak: initBlankStats(),
        biggestWin: initBlankStats(),
        secondPlace: initBlankStats(),
        thirdPlace: initBlankStats(),
        totalThreeDiamonds: initBlankStats(),
        totalOppositionDoublesTriples: initBlankStats()
    };

    vm.gameStats = {
        mostWins: { number: 0, players: [] },
        mostLosses: { number: 0, players: [] },
        biggestWin: { score: 0, winners: [], formattedWinners: '' },
        biggestLosingStreak: { number: 0, players: [] },
        avgGameLength: { minutes: 0, seconds: 0 }
    }

    vm.trends = {
        scores: initBlankStatsArray(),
        cumulativeScores: initBlankStatsArray()
    };

    // Calculate majority of stats
    angular.forEach(data.scores, function(score) {
        var winner = null;
        var totalOppositionDoublesTriples = 0;
        var biggestLosingScore = 0;
        var secondBestScore = 39; // Start second best score at biggest possible (39)
        var thirdBestScore = 39; // Start third best score at biggest possible (39)

        angular.forEach(score, function(val, key) {

            if (key.indexOf('player') > -1) {

                // Total wins, win streaks
                if (val < 0) {
                    winner = key;
                    vm.stats.totalWins[key]++;
                    vm.stats.winningScores[key].push({ id: score.id, score: val });

                    // Increment winning streak, set biggest winning streak
                    vm.stats.winningStreaks[key]++;
                    if (vm.stats.winningStreaks[key] > vm.stats.biggestWinningStreak[key]) {
                        vm.stats.biggestWinningStreak[key] = vm.stats.winningStreaks[key];
                    }

                    // Reset losing streak
                    vm.stats.losingStreaks[key] = 0;

                    // Increment playing streak, set biggest playing streak
                    vm.stats.playingStreaks[key]++;
                    if (vm.stats.playingStreaks[key] > vm.stats.biggestPlayingStreak[key]) {
                        vm.stats.biggestPlayingStreak[key] = vm.stats.playingStreaks[key];
                    }
                }

                // Total losses / loss streaks
                if (val > 0) {
                    vm.stats.totalLosses[key]++;
                    vm.stats.losingScores[key].push({ id: score.id, score: val });

                    // Increment losing streak, set biggest losing streak
                    vm.stats.losingStreaks[key]++;
                    if (vm.stats.losingStreaks[key] > vm.stats.biggestLosingStreak[key]) {
                        vm.stats.biggestLosingStreak[key] = vm.stats.losingStreaks[key];
                    }

                    // Reset winning streak
                    vm.stats.winningStreaks[key] = 0;

                    // Increment playing streak, set biggest playing streak
                    vm.stats.playingStreaks[key]++;
                    if (vm.stats.playingStreaks[key] > vm.stats.biggestPlayingStreak[key]) {
                        vm.stats.biggestPlayingStreak[key] = vm.stats.playingStreaks[key];
                    }
                }

                // Total games sat out
                if (val == 0) {
                    vm.stats.totalSits[key]++;

                    // Reset playing streak
                    vm.stats.playingStreaks[key] = 0;
                }

                // Total games played
                if (val < 0 || val > 0) {
                    vm.stats.totalPlayed[key]++;
                }

                // Total Doubles
                if (val == 20 || val == 22 || val == 24) {
                    vm.stats.totalDoubles[key]++;
                    totalOppositionDoublesTriples++;
                }

                // Total Triples
                if (val == 39) {
                    vm.stats.totalTriples[key]++;
                    totalOppositionDoublesTriples++;
                }

                // Set the biggest losing score
                if (val > biggestLosingScore) {
                    biggestLosingScore = val;
                }

                // Total small wins (3 - 9 cards)
                if (val >= -9 && val <= -3) {
                    vm.stats.totalSmallWins[key]++;
                }

                // Total small losses (1 - 3 cards)
                if (val == 1 || val == 2 || val == 3) {
                    vm.stats.totalSmallLosses[key]++;
                }

                // Set second / third place
                if (val > 0 && val <= secondBestScore) {
                    secondBestScore = val;

                } else if (val > 0 && val > secondBestScore && val <= thirdBestScore) {
                    thirdBestScore = val;
                }

                // Add the game score only for graphing object
                vm.trends.scores[key].push(val);
            }
        });

        // Set the big losers, second / third place finishers
        angular.forEach(score, function(val, key) {
            if (val == biggestLosingScore) {
                vm.stats.totalBigLoser[key]++;
            }

            if (val == secondBestScore) {
                vm.stats.secondPlace[key]++;
            }

            if (val == thirdBestScore) {
                vm.stats.thirdPlace[key]++;
            }
        });

        // Assign the total opposition doubles / triples stat
        vm.stats.totalOppositionDoublesTriples[winner] += totalOppositionDoublesTriples;
    });

    // Calculate:
    // - win / loss percentages
    // - average winning / losing score
    angular.forEach(vm.players, function(val, key) {
        vm.stats.winPercentage[key] = (vm.stats.totalWins[key] / (vm.stats.totalPlayed[key] || 1) * 100).toFixed(0);
        vm.stats.smallWinPercentage[key] = (vm.stats.totalSmallWins[key] / (vm.stats.totalWins[key] || 1) * 100).toFixed(0);
        vm.stats.lossPercentage[key] = (vm.stats.totalLosses[key] / (vm.stats.totalPlayed[key] || 1) * 100).toFixed(0);
        vm.stats.smallLossPercentage[key] = (vm.stats.totalSmallLosses[key] / (vm.stats.totalLosses[key] || 1) * 100).toFixed(0);

        var totalWinningScores = 0;
        angular.forEach(vm.stats.winningScores[key], function(val, key) {
            totalWinningScores += val.score;
        });
        vm.stats.avgWinningScore[key] = (totalWinningScores / (vm.stats.totalWins[key] || 1)).toFixed(0);

        var totalLosingScores = 0;
        angular.forEach(vm.stats.losingScores[key], function(val, key) {
            totalLosingScores += val.score;
        });
        vm.stats.avgLosingScore[key] = (totalLosingScores / (vm.stats.totalLosses[key] || 1)).toFixed(0);
    });

    // Calculate most wins, biggest win
    var biggestWin = 0;
    angular.forEach(vm.stats.winningScores, function(val, key) {
        if (val.length > vm.gameStats.mostWins.number) {
            vm.gameStats.mostWins.number = val.length;
            vm.gameStats.mostWins.players = [vm.players[key] || key];
        }

        else if (val.length == vm.gameStats.mostWins.number) {
            vm.gameStats.mostWins.players.push(vm.players[key] || key);   
        }

        // Determine the biggest win(s)
        angular.forEach(val, function(val) {
            // Set overall biggest win
            if (val.score < vm.gameStats.biggestWin.score) {
                vm.gameStats.biggestWin.score = val.score;
                vm.gameStats.biggestWin.winners = [{
                    player: vm.players[key],
                    gameId: val.id
                }];
                vm.gameStats.biggestWin.formattedWinners = [vm.players[key] + ' - Game ' + val.id];
            }

            else if (val.score == vm.gameStats.biggestWin.score) {
                vm.gameStats.biggestWin.winners.push({
                    player: vm.players[key],
                    gameId: val.id
                });
                vm.gameStats.biggestWin.formattedWinners.push(vm.players[key] + ' - Game ' + val.id);
            }

            // Set individual biggest win
            if (val.score < vm.stats.biggestWin[key]) {
                vm.stats.biggestWin[key] = val.score;
            }
        });
    });

    // Calculate most losses
    angular.forEach(vm.stats.losingScores, function(val, key) {
        if (val.length > vm.gameStats.mostLosses.number) {
            vm.gameStats.mostLosses.number = val.length;
            vm.gameStats.mostLosses.players = [vm.players[key] || key];
        }

        else if (val.length == vm.gameStats.mostLosses.number) {
            vm.gameStats.mostLosses.players.push(vm.players[key] || key);
        }
    });

    // Find longest losing streak
    angular.forEach(vm.stats.biggestLosingStreak, function(val, key) {
        if (val > vm.gameStats.biggestLosingStreak.number) {
            vm.gameStats.biggestLosingStreak.number = val;
            vm.gameStats.biggestLosingStreak.players = [vm.players[key] || key];
        }

        else if (val == vm.gameStats.biggestLosingStreak.number) {
            vm.gameStats.biggestLosingStreak.players.push(vm.players[key] || key);
        }
    });

    // Flag the biggest stat in each set
    angular.forEach(vm.stats, function(stat, statKey) {
        var biggestVal = 0;
        var biggestKey = [];

        angular.forEach(stat, function(val, key) {
            if (statKey == 'totals') {
                if (val < biggestVal) {
                    biggestVal = val;
                    biggestKey = [key];

                } else if (val == biggestVal) {
                    biggestKey.push(key);
                }

            } else {
                if (Math.abs(val) > biggestVal) {
                    biggestVal = Math.abs(val);
                    biggestKey = [key];

                } else if (Math.abs(val) == biggestVal) {
                    biggestKey.push(key);
                }
            }
        });
        if (stat) {
            stat.biggest = biggestKey;
        }
    });

    // Calculate average game length
    // - game start time not available, so we take an average out of all the games minus 1
    var startTime = new Date(data.scores[0].timestamp);
    var endTime = new Date(data.scores[data.scores.length - 1].timestamp);
    var totalTime = endTime.getTime() - startTime.getTime();
    var avgGameLength = totalTime / (data.scores.length - 1);

    var avgGameLengthMinutes = Math.floor(avgGameLength / 1000 / 60);
    var avgGameLengthSeconds = ((avgGameLength / 1000) % 60).toFixed(0);
    if (avgGameLengthSeconds >= 0 && avgGameLengthSeconds <= 9) {
        avgGameLengthSeconds = '0' + avgGameLengthSeconds; // pad a leading zero
    }

    vm.gameStats.avgGameLength = {
        minutes: avgGameLengthMinutes,
        seconds: avgGameLengthSeconds,
        available: !isNaN(avgGameLengthMinutes) && !isNaN(avgGameLengthSeconds)
    };

    // Generate object for graphing
    angular.forEach(vm.trends.scores, function(playerVal, playerKey) {
        var total = 0;
        angular.forEach(playerVal, function(scoreVal, scoreKey) {
            total = (scoreVal || 0) + total;
            vm.trends.cumulativeScores[playerKey].push({ x: scoreKey, y: total });
        });
    });
    $timeout(function() {
        plotChart(vm.trends.cumulativeScores);
    }, 0);

    function initBlankStats() {
        var stat = {};
        for (var i = 0; i < data.settings.numberOfPlayers; i++) {
            stat['player' + (i + 1)] = 0;
        }
        return stat;
    }

    function initBlankStatsArray() {
        var stat = {};
        for (var i = 0; i < data.settings.numberOfPlayers; i++) {
            stat['player' + (i + 1)] = [];
        }
        return stat;
    }

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

    function plotChart(data) {
        var dataColours = [
            'rgba(255, 99, 132, 1)', // red
            'rgba(54, 162, 235, 1)', // blue
            'rgba(255, 206, 86, 1)', // yellow
            'rgba(75, 192, 192, 1)', // green
            'rgba(153, 102, 255, 1)', // purple
            'rgba(255, 159, 64, 1)' // orange
        ];

        var datasets = [];
        var dataIndex = 0;
        angular.forEach(data, function(val, key) {
            var config = {
                label: vm.players[key],
                fill: false,
                data: data[key],
                borderColor: dataColours[dataIndex],
                borderWidth: 3,
                pointRadius: 0
            }
            datasets.push(config);
            dataIndex++;
        });

        // Draws horizontal line at a given y-axis index
        var originalLineDraw = Chart.controllers.line.prototype.draw;
        Chart.helpers.extend(Chart.controllers.line.prototype, {
            draw: function() {
                originalLineDraw.apply(this, arguments);

                var chart = this.chart;
                var ctx = chart.chart.ctx;

                var index = chart.config.data.lineAtIndex;
                if (angular.isNumber(index)) {
                    var xaxis = chart.scales['x-axis-0'];
                    var yaxis = chart.scales['y-axis-0'];

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(xaxis.left, yaxis.getPixelForValue(index));
                    ctx.strokeStyle = '#acacac';
                    ctx.lineWidth = 1;
                    ctx.lineTo(xaxis.right, yaxis.getPixelForValue(index));
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });

        // Adjust legend position for smaller screens
        var legendPosition = (window.innerWidth >= 768) ? 'right' : 'top';

        var ctx = document.getElementById("scoring-trends").getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                lineAtIndex: 0, // Draw horizontal line at y-axis
                datasets: datasets
            },
            options: {
                legend: {
                    position: legendPosition
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            reverse: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Score'
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.5)',
                            display: false
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: 'Game #'
                        },
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0.5)',
                            display:false
                        }
                    }]
                }
            }
        });
    }

    function consolidateData(data) {
        var players = consolidatePlayers(data);
        var settings = consolidateSettings(players);
        var scoresAndTotals = consolidateScoresAndTotals(data, players);

        return {
            players: players,
            settings: settings,
            scores: scoresAndTotals.scores,
            totals: scoresAndTotals.totals
        };
    }

    function consolidatePlayers(data) {
        var playerNames = [];
        angular.forEach(data, function(gameVal, gameKey) {
            angular.forEach(gameVal.players, function(playerVal, playerKey) {
                if (playerNames.indexOf(playerVal) == -1) {
                    playerNames.push(playerVal);
                }
            });
        });
        playerNames.sort();

        var players = {};
        for (var i = 0; i < playerNames.length; i++) {
            players['player' + (i + 1)] = playerNames[i];
        }

        return players;
    }

    function consolidateSettings(players) {
        return {
            numberOfPlayers: Object.keys(players).length
        }
    }

    function consolidateScoresAndTotals(data, players) {
        var scores = [];
        var totals = {};

        angular.forEach(players, function(playerVal, playerKey) {
            var index = 0;

            angular.forEach(data, function(gameVal, gameKey) {
                var target = '';
                angular.forEach(gameVal.players, function(gamePlayerVal, gamePlayerKey) {
                    if (playerVal === gamePlayerVal) {
                        target = gamePlayerKey;
                    }
                });

                angular.forEach(gameVal.scores, function(gameScoreVal, gameScoreKey) {
                    var tempScore = {
                        id: gameScoreVal.id,
                        consolidatedId: index + 1,
                        [playerKey]: gameScoreVal[target] || 0
                    }
                    scores[index] = angular.extend(tempScore, scores[index]);
                    totals[playerKey] = (totals[playerKey] || 0) + (gameScoreVal[target] || 0);

                    index++;
                });
            });
        });

        return {
            scores: scores,
            totals: totals
        };
    }

    function historyModal(date) {
        // Close existing window first
        $uibModalInstance.dismiss('cancel');

        var historyModal = $uibModal.open({
            size: 'md',
            templateUrl: 'modals/stats/stats.tmpl.html',
            controller: 'modalStatsController',
            controllerAs: 'vm',
            resolve: { 
                historyData: function() {
                    return {
                        showHistory: true, 
                        date: date
                    };
                }
            }
        });
    }
}