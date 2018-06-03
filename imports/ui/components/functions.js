import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SportData } from '../../api/sportdata.js';

export function getThisWeekList(beginWeek) {
    var tmpList = new Mongo.Collection(null);

    Meteor.users.find().forEach( (item) => {
        var total = 0;

        SportData.find({ user: item._id, 'result.creationDate': {$gte: beginWeek}}).map( (sport) => {
            total += sport.earnedPoints
        })

        if (isNaN(total) ) { total = 0; }

        tmpList.insert({
            _id: item._id,
            user: item._id,
            score: total,
            profile: item.profile,
            services: item.services,
            club: item.club,
            team: item.team
        })
    })

    return tmpList;
}
