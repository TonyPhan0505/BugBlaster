/////////////////////////////// Import Dependencies ///////////////////////////////
import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Colors from '../../utils/colors.utils';
//////////////////////////////////////////////////////////////////////////////////

///////////////////////////// Component /////////////////////////////
export default function Loader({ loading }) {
  return (
        <div style={styles.loaderContainer}>
            <ClimbingBoxLoader
                color={Colors.two}
                loading={loading}
                size={27}
                aria-label="Loading"
                data-testid="loader"
            />
        </div>
  )
}
///////////////////////////////////////////////////////////////////

//////////////////////////// Styles ////////////////////////////
const styles = {
    loaderContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "100px"
    }
};
///////////////////////////////////////////////////////////////