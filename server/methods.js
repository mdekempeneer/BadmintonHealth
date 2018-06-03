import { Email } from 'meteor/email';
import { SportData } from '../imports/api/sportdata.js';
import { NotificationHistory } from '../imports/api/notifications.js';
import { Clicks } from '../imports/api/clicks.js';
import { PersonalGoalData } from '../imports/api/personalgoals.js';

Meteor.methods({
    updateClub(clubName) {
        Meteor.users.update(Meteor.user()._id, { $set: { club: clubName } });
    },

    updateTeam(teamName) {
        Meteor.users.update(Meteor.user()._id, { $set: { team: teamName } });
    },

    updateBirthDay(birthDay) {
        Meteor.users.update(Meteor.user()._id, { $set: { birthday: birthDay } });
    },

    daysRowReset() {
        Meteor.users.update(Meteor.user()._id, { $set: { days: 1, lastday: new Date() } });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: 1 } });
    },

    updateLastDay(day) {
        Meteor.users.update(Meteor.user()._id, { $set: { days: day, lastday: new Date() } });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: 3 } });
    },

    updateMaxDays(maxDay) {
        Meteor.users.update(Meteor.user()._id, { $set: { days: maxDay, maxdays: maxDay, lastday: new Date() } });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: 10 } });
    },

    addPoints(points) {
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    updateLevel() {
        Meteor.users.update(Meteor.user()._id, { $inc: { currentLevel: 1 } });
    },

    addSportType(result) {
        SportData.insert({ result, user: Meteor.user()._id, date: new Date() });
    },

    sendEmail(to, from, replyTo, subject, text) {
        check([to, from, replyTo, subject, text], [String]);
        this.unblock();
        Email.send({ to, from, replyTo, subject, text });
    },

    newBadge(nheartrate, nweight, ndistance, nsteps, nsleep, ntime, ntype, ntext) {
        Meteor.users.update(Meteor.user()._id, {
            $set: {
                'badges.mostRecent3': {
                    heartrate: Meteor.user().badges.mostRecent2.heartrate, weight: Meteor.user().badges.mostRecent2.weight, distance: Meteor.user().badges.mostRecent2.distance,
                    steps: Meteor.user().badges.mostRecent2.steps, sleep: Meteor.user().badges.mostRecent2.sleep, time: Meteor.user().badges.mostRecent2.time,
                    date: Meteor.user().badges.mostRecent2.date, type: Meteor.user().badges.mostRecent2.type, text: Meteor.user().badges.mostRecent2.text
                }
            }
        });

        Meteor.users.update(Meteor.user()._id, {
            $set: {
                'badges.mostRecent2': {
                    heartrate: Meteor.user().badges.mostRecent1.heartrate, weight: Meteor.user().badges.mostRecent1.weight, distance: Meteor.user().badges.mostRecent1.distance,
                    steps: Meteor.user().badges.mostRecent1.steps, sleep: Meteor.user().badges.mostRecent1.sleep, time: Meteor.user().badges.mostRecent1.time,
                    date: Meteor.user().badges.mostRecent1.date, type: Meteor.user().badges.mostRecent1.type, text: Meteor.user().badges.mostRecent1.text
                }
            }
        });

        Meteor.users.update(Meteor.user()._id, {
            $set: {
                'badges.mostRecent1': {
                    heartrate: nheartrate, weight: nweight, distance: ndistance,
                    steps: nsteps, sleep: nsleep, time: ntime,
                    date: new Date(), type: ntype, text: ntext
                },
                'badges.currentLevel': {
                    heartrate: Math.max(Meteor.user().badges.currentLevel.heartrate, nheartrate),
                    weight: Math.max(Meteor.user().badges.currentLevel.weight, nweight),
                    distance: Math.max(Meteor.user().badges.currentLevel.distance, ndistance),
                    steps: Math.max(Meteor.user().badges.currentLevel.steps, nsteps),
                    sleep: Math.max(Meteor.user().badges.currentLevel.sleep, nsleep),
                    time: Math.max(Meteor.user().badges.currentLevel.time, ntime)
                },
                'badges.lastUpdate': new Date(),
                'badges.totalBadges': Meteor.user().badges.totalBadges + 1
            }
        });

        if(nheartrate > 0) {
            var tmp = Meteor.user().badges.rows.heart;
            tmp[nheartrate-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.heart': tmp } });
        } else if(nweight > 0) {
            var tmp = Meteor.user().badges.rows.weight;
            tmp[nweight-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.weight': tmp } });
        } else if(ndistance > 0) {
            var tmp = Meteor.user().badges.rows.distance;
            tmp[ndistance-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.distance': tmp } });
        } else if(nsteps > 0) {
            var tmp = Meteor.user().badges.rows.steps;
            tmp[nsteps-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.steps': tmp } });
        } else if(nsleep > 0) {
            var tmp = Meteor.user().badges.rows.sleep;
            tmp[nsleep-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.sleep': tmp } });
        } else if(ntime > 0) {
            var tmp = Meteor.user().badges.rows.time;
            tmp[ntime-1] = true;
            Meteor.users.update(Meteor.user()._id, { $set: { 'badges.rows.time': tmp } });
        }
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: 25 } });
    },

    addFeeling(mtype, mvalue, points) {
        SportData.insert({
            result: {
                type: mtype,
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: mvalue
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    addWeight(mvalue, points) {
        SportData.insert({
            result: {
                type: 'HKQuantityTypeIdentifierWeight',
                creationDate: moment().format(),
                value: mvalue
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });

    },

    addHeartRate(mvalue, points) {
        SportData.insert({
            result: {
                type: 'HeartRate',
                creationDate: moment().format(),
                value: mvalue
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    addHeartRateMax(mvalue, type, points) {
        SportData.insert({
            result: {
                type: 'HeartRate',
                creationDate: moment().format(),
                value: mvalue,
                extra: type
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    async addSteps(mvalue, points) {
        var minus = 0
        const finder = SportData.find({
            user: Meteor.user()._id,
            'result.type': 'stepCount',
            'result.creationDate': moment().startOf('day').format('YYYY-MM-DD')
        });

        if (finder.count() > 0) {
            minus = finder.fetch()[0].earnedPoints;
            SportData.remove({
                _id: finder.fetch()[0]._id
            })
        }
        SportData.insert({
            result: {
                type: 'stepCount',
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: mvalue
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: (points-minus) } });
    },

    addSleep(value1, value2, value3, value4, points) {
        const totalLight = value1 * 60 * 60 + value2 * 60;
        const totalDeep = value3 * 60 * 60 + value4 * 60;
        SportData.insert({
            result: {
                type: 'lightSleep',
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: totalLight
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points * 0.5
        });
        SportData.insert({
            result: {
                type: 'deepSleep',
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: totalDeep
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points * 0.5
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    addWorkPoint(mvalue, points) {
        SportData.insert({
            result: {
                type: 'workPoint',
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: mvalue
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    addSport(sport, points) {
        SportData.insert({
            result: {
                type: "sport",
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: sport
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: points
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    serverNotification() {
        var last = NotificationHistory.findOne({}, {sort: {addedAt: -1}});
        var badge = 1;

        if (last != null) {
            badge = last.badge + 1;
        }

        NotificationHistory.insert({
			badge: badge,
			addedAt: new Date()
		}, function (error, result) {
			if (!error) {
				Push.send({
					from: 'push',
					title: 'Hello World',
					text: 'This notification has been sent from the SERVER',
					badge: badge,
					payload: {
						title: 'Hello World',
						historyId: result
					},
					query: {}
				});
			}
		});
	},

	removeHistory() {
		NotificationHistory.remove({}, function (error) {
			if (!error) {
				console.log('All history removed');
			}
		});
	},

    clickInit() {
        if (Clicks.find({user: Meteor.user()._id}).count() === 0) {
            Clicks.insert({
                user: Meteor.user()._id,
                general: {},
                startpage: {},
                addworkout: {},
                analyseworkout: {},
                badges: {},
                highscore: {},
                profile: {},
                settings: {},
            });
        } else {
        }
    },

    clickUpdate(page, button) {
        var tag = page.concat('.').concat(button);
        Clicks.update({user: Meteor.user()._id}, { $inc: { [tag]: 1 } });
    },

    sportdays(name, value) {
        var tag = 'sportdays'.concat('.').concat(name);
        Meteor.users.update(Meteor.user()._id, { $set: { [tag]: value } });
    },

    reminderDate() {
        Meteor.users.update(Meteor.user()._id, { $set: { 'sportdays.checkdate': moment().startOf('week').format() } });
    },

    removeSportDataId(idRemove) {
        SportData.remove({_id: idRemove});
    },

    cleanClick() {
        Clicks.find().forEach( (item) =>  {
            if ( item.general.menuButton === undefined &&
                 item.general.homeButton === undefined &&
                 item.general.profile    === undefined &&
                 item.general.settings   === undefined &&
                 item.startpage.addWorkout     === undefined &&
                 item.startpage.moreBadges     === undefined &&
                 item.startpage.viewWorkout    === undefined &&
                 item.startpage.moreHighscores === undefined) {
                        Clicks.remove({_id: item._id})
            }
        });
    },

    personalGoal(type, amount) {
        PersonalGoalData.insert({
            user: Meteor.user()._id,
            type: type,
            amount: amount,
            date: (moment().format('dddd') === 'Sunday' ?
                        moment().startOf('week').add(1, 'day').subtract(1, 'week').format('YYYY-MM-DD') :
                        moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'))
        });
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: 1 } });
    },

    reachedGoalData(item, amount) {
        PersonalGoalData.update(item._id, { $set: { reached: amount } });
    },

    deleteWorkingPointData(idRemove) {
        SportData.remove({_id: idRemove});
    },

    startTimer() {
        SportData.insert({
            result: {
                type: 'timer',
                creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                value: 0
            },
            user: Meteor.user()._id,
            date: new Date(),
            earnedPoints: 0
        });
    },

    updateTime(milis, points) {
        const item = SportData.find({
                        user: Meteor.user()._id,
                        'result.type': 'time',
                        'result.creationDate': moment().startOf('day').format('YYYY-MM-DD'),
                    });

        if (item.count() === 0) {
            SportData.insert({
                result: {
                    type: 'time',
                    creationDate: moment().startOf('day').format('YYYY-MM-DD'),
                    value: milis,
                    times: 1
                },
                user: Meteor.user()._id,
                date: new Date(),
                earnedPoints: points
            });
        } else {
            SportData.update(item.fetch()[0]._id, {
                $inc: {
                    'result.value': milis,
                    'result.times': 1,
                    earnedPoints: points
                }
            });
        }
        Meteor.users.update(Meteor.user()._id, { $inc: { currentPoints: points } });
    },

    deleteTimer(id) {
        SportData.remove({_id: id});
    },

    timerBool(bool) {
        Meteor.users.update(Meteor.user()._id, { $set: { timer: bool } });
    },

    deleteSportId(idRemove) {
        SportData.remove({_id: idRemove});
    },

    nonZero(id) {
        SportData.update(id, { $inc: { earnedPoints: 1 } });
    }
});
