export const theme = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#6200ee',
    accent: '#03dac4',
    // Màn Home
    home_bg: require('../../asset/image/home_bg_day.png'),
    titleColor: '#4E4330',
    subtitleColor: '#D500A7',
    // Màn viết thư
    letter_bg: require('../../asset/image/letter_background.png'),
    // Màn đọc thư
    read_bg: require('../../asset/image/read_bg.png'),
    // Màn chai lọ ở biển
    bottle_on_sand: require('../../asset/image/bottle_on_the_sand_night.png'),
    bottle_at_the_sea: require('../../asset/image/bottle_at_the_sea_morning.png'),
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#bb86fc',
    accent: '#03dac4',
    // Màn Home
    home_bg: require('../../asset/image/home_bg_night.png'),
    titleColor: '#FFFFFF',
    subtitleColor: '#FFC2F2',
    // Màn viết thư
    letter_bg: require('../../asset/image/letter_background_night.png'),
    // Màn đọc thư
    read_bg: require('../../asset/image/read_bg_night.png'),
    // Màn chai lọ ở biển
    bottle_on_sand: require('../../asset/image/bottle_on_the_sand_night.png'),
    bottle_at_the_sea: require('../../asset/image/bottle_at_the_sea_night.png'),
  },
  common: {
    // Component
    //--Button
    primaryButton: '#002AFF', // Updated from #0077B6
    secondaryButton: '#130080', // Updated from #486273
    buttonTextColor: '#FDF9F2',
    //--Icon
    accountIcon: require('../../asset/image/account_icon.svg'),
    baloIcon: require('../../asset/image/balo_icon.svg'),
    // Font
    fontWeight: 'bold',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  fontSize: {
    s: 12,
    m: 38, // Adjusted from 18 to aim for Figma's 50
    l: 35, // Adjusted from 28 to aim for Figma's 48
    xl: 60 // Adjusted from 40 to aim for Figma's 80
  },
};
