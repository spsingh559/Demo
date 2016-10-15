//Copyright {2016} {NIIT Limited, Wipro Limited}
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
//   Name of Developers  Abhinav Kareer,Sunil Mekala, Pratik Sinha, Anil Sawant,Venkata Gopichand
//


var mongoose = require('mongoose'),
  Topic = require('./topic'),
  Profile = require('./profile'),
  QuestionPapers=require('./questionPaper'),
  tournamentSchema = mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    matches: Number,
    playersPerMatch: Number,
    imageUrl: String,
    tournamentFollowers: {
      type: Number,
      default: 0
    },
    rulesDescription: String,
    totalGamesPlayed: {
      type: Number,
      default: 0
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    leaderBoard: [{
      userId: {
        type: String,
        ref: 'Profile'
      },
      playerName: String,
      playerPic: String,
      totalScore: Number
    }],
    topics: [{
      levelId: String,
      topicId: {
        type: String,
        ref: 'Topic'
      },
      games: [{
        type: String,
        ref: 'Game'
      }],
      isRandom: Boolean,
      difficultyLevel: [Number],
      levelMultiplier: Number,
      questionPaper:String
    }],
    registration: {
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      }
    }
  }),
  Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
