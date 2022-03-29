import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const standardVerticalPadding = hp(3)
export const standardHorizontalPadding = wp(10)

const theme = {
    colors: {
        primary: '#FA9500',
        secondary: "#00272B",
        tertiary: "#E5ECE9",
        white: 'white',
        //     black;
        grey0: "rgba(0, 0, 0, 0.5)",
        //     grey1;
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

    borderRadius: 4,

    Text: {
        style: {
            fontSize: 12,
        },
    },
    Button: {
        textStyle: {
            fontSize: 12
        },
    },
    Input: {
        textStyle: {
            fontSize: 12
        }
    }
};

export default theme;