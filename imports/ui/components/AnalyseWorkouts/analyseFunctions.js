import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SportData } from '../../../api/sportdata.js';

function getDataLabelsNoDate(type) {
    var sportsData = SportData.find({ user: Meteor.userId(), 'result.type': type }, {
                                      sort: { 'result.creationDate': 1 }
                                    })
                                .map(function(elem) {
            return moment(elem.result.creationDate, 'YYYY-MM-DD HH:mm:ss Z');
    });
    return sportsData;
}

function getDataValuesNoDate(type) {
    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': type }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
            return parseFloat(solo.result.value);
    });
    return sportsValues;
}

function getDataTimesNoDate(type) {
    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': type }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
            return parseFloat(solo.result.times);
    });
    return sportsValues;
}

export function getFeelingCollection(type) {
    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': type }, {
                                        sort: { 'result.creationDate': 1 }
                                    });

    var collect = sportsValues.map( (index) => {
        return {
            date: moment(index.result.creationDate, 'YYYY-MM-DD HH:mm:ss Z'),
            count: parseFloat(index.result.value)
        };
    });

    return collect;
}

function getDataLabels(type, firstDay, lastDay) {
    var sportsData = SportData.find({ user: Meteor.userId(), 'result.type': type,
                                        'result.creationDate': {
                                            $gt: firstDay,
                                            $lt: lastDay
                                        }
                                    }, {
                                      sort: { 'result.creationDate': 1 }
                                    })
                                .map(function(elem) {
            return moment(elem.result.creationDate, 'YYYY-MM-DD HH:mm:ss Z');
    });
    return sportsData;
}

function getDataValues(type, firstDay, lastDay) {
    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': type,
                                            'result.creationDate': {
                                                $gt: firstDay,
                                                $lt: lastDay
                                            }
                                    }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
            return parseFloat(solo.result.value);
    });
    return sportsValues;
}

function getDataTimes(type, firstDay, lastDay) {
    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': type,
                                            'result.creationDate': {
                                                $gt: firstDay,
                                                $lt: lastDay
                                            }
                                    }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
            return parseFloat(solo.result.times);
    });
    return sportsValues;
}

export function combineData(type, firstDay, lastDay) {
    const sportsData = getDataLabels(type, firstDay, lastDay);
    const sportsValues = getDataValues(type, firstDay, lastDay);

    var totalList = []

    for (var i=0; i<sportsData.length; i++) {
        totalList.push({x: sportsData[i], y: sportsValues[i]});
    }

    return totalList;
}

export function combineTimes(type, firstDay, lastDay) {
    const sportsData = getDataLabels(type, firstDay, lastDay);
    const sportsValues = getDataTimes(type, firstDay, lastDay);

    var totalList = []

    for (var i=0; i<sportsData.length; i++) {
        totalList.push({x: sportsData[i], y: sportsValues[i]});
    }

    return totalList;
}

export function combineDataNoDate(type) {
    const sportsData = getDataLabelsNoDate(type);
    const sportsValues = getDataValuesNoDate(type);

    var totalList = []

    for (var i=0; i<sportsData.length; i++) {
        totalList.push({x: sportsData[i], y: sportsValues[i]});
    }

    return totalList;
}

export function combineTimesNoDate(type) {
    const sportsData = getDataLabelsNoDate(type);
    const sportsValues = getDataTimesNoDate(type);

    var totalList = []

    for (var i=0; i<sportsData.length; i++) {
        totalList.push({x: sportsData[i], y: sportsValues[i]});
    }

    return totalList;
}

export function getHeartRateColorList(firstDay, lastDay) {
    var age;
    if(Meteor.user().birthday !== undefined) {
        if(Meteor.user().birthday === '') {
            age = 25;
        } else {
            const year1 = parseInt(moment().format('YYYY'))
            const year2 = parseInt(Meteor.user().birthday.substr(6,4))
            age = year1 - year2
        }
    } else {
        return 0;
    }

    const maximum = 220;
    const HFmax = maximum - age;

    const rates = [HFmax * 0.5, HFmax * 0.6, HFmax * 0.7, HFmax * 0.8, HFmax * 0.9, HFmax]

    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': 'HeartRate',
                                            'result.creationDate': {
                                                $gt: firstDay,
                                                $lt: lastDay
                                            }
                                    }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
        if (solo.result.value < rates[0]) {
            return 'gray';
        } else if (solo.result.value < rates[1]) {
            return 'gray';
        } else if (solo.result.value < rates[2]) {
            return 'blue';
        } else if (solo.result.value < rates[3]) {
            return 'green';
        } else if (solo.result.value < rates[4]) {
            return 'orange';
        } else if (solo.result.value < rates[5]) {
            return 'red';
        } else {
            return 'black';
        }
    });
    return sportsValues;
}

export function getHeartRateColorListNoDate() {
    var age;
    if(Meteor.user().birthday !== undefined) {
        if(Meteor.user().birthday === '') {
            age = 25;
        } else {
            const year1 = parseInt(moment().format('YYYY'))
            const year2 = parseInt(Meteor.user().birthday.substr(6,4))
            age = year1 - year2
        }
    } else {
        return 0;
    }

    const maximum = 220;
    const HFmax = maximum - age;

    const rates = [HFmax * 0.5, HFmax * 0.6, HFmax * 0.7, HFmax * 0.8, HFmax * 0.9, HFmax]

    var sportsValues = SportData.find({ user: Meteor.userId(), 'result.type': 'HeartRate'
                                    }, {
                                        sort: { 'result.creationDate': 1 }
                                    })
                                    .map(function(solo) {
        if (solo.result.value < rates[0]) {
            return 'gray';
        } else if (solo.result.value < rates[1]) {
            return 'gray';
        } else if (solo.result.value < rates[2]) {
            return 'blue';
        } else if (solo.result.value < rates[3]) {
            return 'green';
        } else if (solo.result.value < rates[4]) {
            return 'orange';
        } else if (solo.result.value < rates[5]) {
            return 'red';
        } else {
            return 'black';
        }
    });
    return sportsValues;
}
