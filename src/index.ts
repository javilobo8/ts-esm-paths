import CustomDate from '#components/customdate.js';
import CustomError from '#components/customerror.js';
import OtherUtil from './components/otherutil.js';
import OtherUtilTS from './components/otherutilts.js';

import testaction from './services/actions/testaction.js';

testaction();

console.log(
  "ALL OK!",
  CustomDate.name,
  CustomError.name,
  OtherUtil.name,
  OtherUtilTS.name
);
