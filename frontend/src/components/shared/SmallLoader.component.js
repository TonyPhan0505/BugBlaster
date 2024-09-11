//////////////////////////// Import dependencies ////////////////////////////
import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

import Colors from '../../utils/Colors.utils';
////////////////////////////////////////////////////////////////////////////

//////////////////////////// Component ////////////////////////////
export default function SmallLoader() {
  return (
    <BeatLoader
        color={Colors.five}
        size={9}
    />
  )
}
/////////////////////////////////////////////////////////////////