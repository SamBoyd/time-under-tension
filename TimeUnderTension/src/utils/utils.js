import humanizeDuration from "humanize-duration";

export const isRealValue = (obj) => {
    return obj && obj !== 'null' && typeof obj !== 'undefined';
}

export const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
        shortEn: {
            y: () => "year",
            mo: () => "month",
            w: () => "week",
            d: () => "day",
            h: () => "hour",
            m: () => "min",
            s: () => "sec",
        },
    },
});