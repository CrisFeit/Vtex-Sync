// ---------------------------------- Configuration ---------------------------------------

export const storeName         = 'My-Store';
export const desktopLayout     ='wid='
export const mobileLayout      ='wid='
export const vtex              = '../app/dist';
export const folders           = '{desktop,mobile,shared}';
export const pugFiles          = `../app/src/${folders}/pug/**/[^_]*.pug`;
export const pugWatch          = `../app/src/${folders}/pug/**/*.pug`;
export const scriptsWatch      = `../app/src/${folders}/js/**/*.js`;
export const scripts           = `../app/src/${folders}/js/*.js`;
export const styles            = `../app/src/${folders}/sass/**/*.scss`;
export const sprites           = '../app/assets/sprites/**/*.png';
export const vuefiles          = `../app/src/${folders}/vue/modules/components vue/*.vue`;
export const vuescripts        = `../app/src/${folders}/vue/*.js`;
export const vueScriptsWatch   = `../app/src/${folders}/vue/**/*.js`;
export const vueFilesWatch     = `../app/src/${folders}/vue/**/*.vue`;
