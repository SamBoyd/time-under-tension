import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {createTheme} from "@rneui/themed";

export const standardVerticalPadding = hp(3)
export const standardHorizontalPadding = wp(10)

const theme = createTheme({
    colors: {
        primary: '#CDE6F5',
        secondary: "#5F758E",
        tertiary: "#262521",
        white: '#CECABA',
        //     black;
        grey0: "#31302C",
        grey1: "#5D5B54",

        shadowLight: "#343230",
        shadowDark: "#141204",
        //     grey2;
        //     grey3;
        //     grey4;
        //     grey5;
        //     greyOutline;
        //     searchBg;
        //     success;
        //     error;
        //     warning;
        //     divider;
        //     platform: {
        //         ios: {
        //             primary;
        //             secondary;
        //             grey;
        //             searchBg;
        //             success;
        //             error;
        //             warning;
        //         };
        //         android: {
        //             // Same as ios
        //         };
        //         web: {
        //             // Same as ios
        //         };
        //     };
    },

    fontFamily: 'sf-ui-display-semibold',
    textSize: 12,

    borderRadius: 8,
    internalPadding: wp(2),
    shadowDistance: 3,

    Input: {
        textStyle: {
            fontSize: 12
        }
    },

    Icon: {
        color: '#CECABA',
    }

});

export default theme;