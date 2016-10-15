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
//

var mongoose = require('mongoose'),

questionPaperSchema = mongoose.Schema({
  topics: [{ type: String, ref: 'Topics' }],// Distinct Topic Ids of the Questions in the Selected Question paper
  name : String ,// Name of the Question Paper. Should Be Unique across the Collection
  patternId : String, //patternId used to create the Question Paper
  active_in : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournaments' }], // In which all Tournaments is the Question Paper is currently used
  difficultyLevel : String, // Difficult Level of the Question Paper(User Selected)
  questions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question'}]
});

QuestionPapers = mongoose.model('QuestionPapers',questionPaperSchema,'questionPapers');

module.exports = QuestionPapers;
