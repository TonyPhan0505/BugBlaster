//////////////////////////// Import dependencies ////////////////////////////
import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";

import Colors from '../../utils/Colors.utils';
////////////////////////////////////////////////////////////////////////////

//////////////////////////// Component ////////////////////////////
export default function SmallLoader({ loading }) {
  return (
    <div style={styles.loaderContainer}>
        <BounceLoader
            color={Colors.secondaryOne}
            loading={loading}
            size={80}
            aria-label="Loading"
            data-testid="loader"
        />
    </div>
  )
}
/////////////////////////////////////////////////////////////////

//////////////////////////// Styles ////////////////////////////
const styles = {
    loaderContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.five
    }
};
///////////////////////////////////////////////////////////////