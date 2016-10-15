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
//      Ghulam Rabbani, Abhishek Kumar, Kirushna

var mongoose = require('mongoose')
require('mongoose-function')(mongoose),
  badgeSchema=mongoose.Schema({
    badgeId: {type: String, unique: true},
    badgeName : String,
    badgeDesc : String,
    badgeUrl : String,
    badgeRule : String,
    badgeDep : Array,
    //it will store "counterName" as key and "expression" as value
    badgeFunct : Function
});
var Badge = mongoose.model('badge',badgeSchema,'badges')
module.exports = Badge;
