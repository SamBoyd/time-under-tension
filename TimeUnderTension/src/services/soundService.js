import Sound from 'react-native-sound';
// Make sure to use Playback and set Mixwithothers to true
Sound.setCategory('Playback', true)
// You only need to call the setActive(true) line *once in your code*, and you never set it to false,
// EVER unless you no longer want audio to be played in background.
// You do not need to try calling setActive(false) at any point in the onCompletion methods
Sound.setActive(true)

export const playSound = (filename) => {
    var whoosh = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log(`failed to load the sound ${filename}`, error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        // Play the sound with an onEnd callback
        whoosh.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            // whoosh.reset();
            // whoosh.release();
        });
    });
}
