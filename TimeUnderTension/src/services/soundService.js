import Sound from 'react-native-sound';
Sound.setCategory('Playback', true);


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
            whoosh.reset();
            whoosh.release();
        });
    });
}
