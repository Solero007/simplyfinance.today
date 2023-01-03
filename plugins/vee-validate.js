import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { setInteractionMode } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

extend('validDate', {
    params: ['day', 'month', 'year'],
    validate(value, { day, month, year }) {
        let date = new Date(`${year}-${month}-${day}`);
        return dateIsValid(date);
    },
    message: 'Date is not valid',
});

extend('hasValidAddress', {
    params: ['test'],
    validate(value, { test }) {
        return true;
    },
    message: 'Address not valid',
});

extend('isProfanity', {
    params: ['value'],
    validate(value, { x }) {
        const check = [
            'link',
            'mbna',
            'mint',
            'argos',
            'fluid',
            'newday',
            'debenhams',
            'harvey',
            'house of',
            'opus',
            'amazon',
            'tui',
            'shop',
            'shop direct',
            'sygma',
            'tesco',
            'tymit',
            'virgin',
            'studio',
            'high and mighty',
            'fashion',
            'jacamo',
            'marisota',
            'premier',
            'jd williams',
            'aktive',
            'the brilliant',
            'brilliant',
            'fifty',
            'naturally',
            'the shoe',
            'shoe',
            'shoe tailor',
            'ambrose',
            'julipa',
            'bonmarché',
            'united',
            'ardent',
            'next',
            'laredoute',
            'express',
            'milier',
            'freemans',
            'crazy',
            'home',
            'simply be',
            'kaleidoscope',
            'look',
            'co-op',
            'grattan',
            'damartex',
            'avon',
            'ace',
            'next',
            'house',
            'oxendales',
            'merligen',
            'daxon',
            'afibel',
            'zopa',
            '118 118',
            'vertbaudet',
            'fair',
            'jaja',
            'amigo',
            'bamboo',
            'buddy',
            'consollo',
            'george',
            'glo',
            'guarantor',
            'hero',
            'lendFair',
            'suco',
            'tfs',
            'trust',
            'uk credit',
            '1 plus 1',
            'avant',
            'lending',
            'carcrashpoint',
            'everyday',
            'likely',
            'oakbrook',
            'loan on your car',
            'loans 2 go ltd',
            'mobile money',
            'moneybarn',
            'moolr',
            'motor',
            'progressive',
            'quick',
            'ramsdens',
            'savvy',
            'varooma',
            '1st',
            'h and t pawnbrokers',
            'honeycomb',
            'lendable',
            'oakam',
            'snap',
            'snap finance',
            'tm advances',
            'buffa',
            'fair',
            'match the cash',
            'my finance club',
            'quidie',
            'perfect home',
            'temple',
            'provident',
            'morses',
            'loans at home',
            'shopacheck',
            'mutual',
            'compton',
            'naylors',
            'skyline',
            's d taylor',
            'clc finance',
            'lowell portfolio',
            'hs home',
            'short term finance',
            'diamond financial',
            'estone personal',
            'g r finance',
            'creditstar',
            'money',
            'ferratum',
            'novaloans',
            'quidie',
            'quidmarket',
            'safetynet',
            'apfin',
            'shelby',
            'smart-pig',
            'wankers',
            'abbo',
            'abortionist',
            'abuser',
            'ahole',
            'alabamahotpocket',
            'alligatorbait',
            'anal',
            'analannie',
            'analsex',
            'anus',
            'areola',
            'arse',
            'arsebagger',
            'arsebandit',
            'arseblaster',
            'arsecowboy',
            'arsefuck',
            'arsefucker',
            'arsehat',
            'arsehole',
            'arseholes',
            'arsehore',
            'arsejockey',
            'arsekiss',
            'arsekisser',
            'arselick',
            'arselicker',
            'arselover',
            'arseman',
            'arsemonkey',
            'arsemunch',
            'arsemuncher',
            'arsepacker',
            'arsepirate',
            'arsepuppies',
            'arseranger',
            'arses',
            'arsewhore',
            'arsewipe',
            'ass',
            'assassinate',
            'assassination',
            'assbag',
            'assbagger',
            'assbandit',
            'assbanger',
            'assbite',
            'assblaster',
            'assclown',
            'asscock',
            'asscowboy',
            'asscracker',
            'asses',
            'assface',
            'assfuck',
            'assfucker',
            'assgoblin',
            'ass-hat',
            'asshat',
            'asshead',
            'asshole',
            'assholes',
            'assholz',
            'asshopper',
            'asshore',
            'ass-jabber',
            'assjacker',
            'assjockey',
            'asskiss',
            'asskisser',
            'assklown',
            'asslick',
            'asslicker',
            'asslover',
            'assman',
            'assmonkey',
            'assmunch',
            'assmuncher',
            'assnigger',
            'asspacker',
            'ass-pirate',
            'asspirate',
            'asspuppies',
            'assranger',
            'assshit',
            'assshole',
            'asssucker',
            'asswad',
            'asswhore',
            'asswipe',
            'axwound',
            'azzhole',
            'backdoorman',
            'badfuck',
            'baldy',
            'balllicker',
            'ballsack',
            'bampot',
            'banging',
            'barelylegal',
            'barface',
            'barfface',
            'bassterds',
            'bastard',
            'bastards',
            'bastardz',
            'basterds',
            'basterdz',
            'bazongas',
            'bazooms',
            'beaner',
            'beastality',
            'beastial',
            'beastiality',
            'beat-off',
            'beatoff',
            'beatyourmeat',
            'bestial',
            'bestiality',
            'biatch',
            'bicurious',
            'bigass',
            'bigbastard',
            'bigbutt',
            'bitch',
            'bitchass',
            'bitcher',
            'bitches',
            'bitchez',
            'bitchin',
            'bitching',
            'bitchslap',
            'bitchtits',
            'bitchy',
            'biteme',
            'blackout',
            'blowjob',
            'boffing',
            'bohunk',
            'bollick',
            'bollock',
            'bollocks',
            'bollox',
            'bondage',
            'boner',
            'boob',
            'boobies',
            'boobs',
            'booby',
            'bootycall',
            'bountybar',
            'breastjob',
            'breastlover',
            'breastman',
            'brothel',
            'brotherfucker',
            'bugger',
            'buggered',
            'buggery',
            'bukake',
            'bullcrap',
            'bulldike',
            'bulldyke',
            'bullshit',
            'bum',
            'bumblefuck',
            'bumfuck',
            'bungabunga',
            'bunghole',
            'butchbabes',
            'butchdike',
            'butchdyke',
            'butt-bang',
            'buttbang',
            'buttcheeks',
            'buttface',
            'butt-fuck',
            'buttfuck',
            'buttfucka',
            'butt-fucker',
            'buttfucker',
            'butt-fuckers',
            'buttfuckers',
            'butthead',
            'butthole',
            'buttman',
            'buttmunch',
            'buttmuncher',
            'butt-pirate',
            'buttpirate',
            'buttplug',
            'buttstain',
            'buttwipe',
            'byatch',
            'cacker',
            'cameljockey',
            'cameltoe',
            'carpetmuncher',
            'cawk',
            'cawks',
            'chav',
            'cherrypopper',
            'chesticle',
            'chickslick',
            'chinc',
            'chink',
            'choad',
            'chode',
            'clamdigger',
            'clamdiver',
            'clit',
            'clitface',
            'clitfuck',
            'clitoris',
            'clogwog',
            'clunge',
            'clusterfuck',
            'cnts',
            'cntz',
            'cock',
            'cockass',
            'cockbite',
            'cockblock',
            'cockblocker',
            'cockburger',
            'cockcowboy',
            'cockface',
            'cockfight',
            'cockfucker',
            'cock-head',
            'cockhead',
            'cockjockey',
            'cockknob',
            'cockknoker',
            'cocklicker',
            'cocklover',
            'cockmaster',
            'cockmongler',
            'cockmongruel',
            'cockmonkey',
            'cockmuncher',
            'cocknob',
            'cocknose',
            'cocknugget',
            'cockqueen',
            'cockrider',
            'cocks',
            'cockshit',
            'cocksman',
            'cocksmith',
            'cocksmoke',
            'cocksmoker',
            'cocksniffer',
            'cocksucer',
            'cocksuck',
            'cocksucked',
            'cock-sucker',
            'cocksucker',
            'cocksucking',
            'cocktease',
            'cockwaffle',
            'cocky',
            'coitus',
            'cok',
            'commie',
            'condom',
            'coochie',
            'coochy',
            'coon',
            'coondog',
            'cooter',
            'copulate',
            'cracker',
            'crackpipe',
            'crack-whore',
            'crackwhore',
            'crap',
            'crappy',
            'crotchjockey',
            'crotchmonkey',
            'crotchrot',
            'cum',
            'cumbubble',
            'cumdumpster',
            'cumfest',
            'cumguzzler',
            'cumjockey',
            'cumm',
            'cumquat',
            'cumqueen',
            'cumshot',
            'cumslut',
            'cumtart',
            'cunilingus',
            'cunillingus',
            'cunnie',
            'cunnilingus',
            'cunntt',
            'cunt',
            'cuntass',
            'cunteyed',
            'cuntface',
            'cuntfuck',
            'cuntfucker',
            'cunthole',
            'cuntlick',
            'cuntlicker',
            'cuntlicking',
            'cuntrag',
            'cunts',
            'cuntslut',
            'cuntsucker',
            'cuntz',
            'cybersex',
            'cyberslimer',
            'dago',
            'dammit',
            'damn',
            'damnation',
            'damnit',
            'darkie',
            'darky',
            'datnigga',
            'deapthroat',
            'deepthroat',
            'defecate',
            'deggo',
            'dego',
            'devilworshipper',
            'dick',
            'dickbag',
            'dickbeaters',
            'dickbrain',
            'dickface',
            'dickforbrains',
            'dickfuck',
            'dickfucker',
            'dickhead',
            'dickhole',
            'dickjuice',
            'dickless',
            'dicklick',
            'dicklicker',
            'dickmilk',
            'dickmonger',
            'dicks',
            'dickslap',
            'dick-sneeze',
            'dicksucker',
            'dicksucking',
            'dicktickler',
            'dickwad',
            'dickweasel',
            'dickweed',
            'dickwod',
            'dike',
            'dildo',
            'dildos',
            'dilldo',
            'dilldos',
            'dipshit',
            'dipstick',
            'dixiedike',
            'dixiedyke',
            'doggiestyle',
            'doggystyle',
            'dominatricks',
            'dominatrics',
            'dominatrix',
            'doochbag',
            'dookie',
            'douch',
            'douchbag',
            'douche',
            'douchebag',
            'douche-fag',
            'douchewaffle',
            'dragqueen',
            'dragqween',
            'dripdick',
            'dumass',
            'dumbass',
            'dumbbitch',
            'dumbfuck',
            'dumbshit',
            'dumshit',
            'dyke',
            'easyslut',
            'eatballs',
            'eatme',
            'eatpussy',
            'ejaculate',
            'ejaculated',
            'ejaculating',
            'ejaculation',
            'enema',
            'excrement',
            'executioner',
            'exhibitionist',
            'extremist',
            'facefucker',
            'facist',
            'faeces',
            'fag',
            'fagbag',
            'faget',
            'fagfucker',
            'fagging',
            'faggit',
            'faggot',
            'faggotcock',
            'faggots',
            'fagit',
            'fagot',
            'fags',
            'fagtard',
            'fagz',
            'faig',
            'faigs',
            'fannyfucker',
            'fark',
            'fart',
            'farted',
            'farting',
            'farty',
            'fastfuck',
            'fatass',
            'fatfuck',
            'fatfucker',
            'fatso',
            'feces',
            'felatio',
            'felch',
            'felcher',
            'felching',
            'fellatio',
            'feltch',
            'feltcher',
            'feltching',
            'fetish',
            'fingerfuck',
            'fingerfucked',
            'fingerfucker',
            'fingerfuckers',
            'fingerfucking',
            'fister',
            'fistfuck',
            'fistfucked',
            'fistfucker',
            'fistfucking',
            'fisting',
            'flamer',
            'flasher',
            'flatulence',
            'flid',
            'flippingthebird',
            'flyd',
            'flydie',
            'flydye',
            'fondle',
            'footaction',
            'footfuck',
            'footfucker',
            'footlicker',
            'foreskin',
            'fornicate',
            'foursome',
            'freakfuck',
            'freakyfucker',
            'freefuck',
            'fubar',
            'fucck',
            'fuck',
            'fucka',
            'fuckable',
            'fuckass',
            'fuckbag',
            'fuckboy',
            'fuckbrain',
            'fuckbuddy',
            'fuckbutt',
            'fuckbutter',
            'fucked',
            'fuckedup',
            'fucker',
            'fuckers',
            'fuckersucker',
            'fuckface',
            'fuckfest',
            'fuckfreak',
            'fuckfriend',
            'fuckhead',
            'fuckher',
            'fuckhole',
            'fuckin',
            'fuckina',
            'fucking',
            'fuckingbitch',
            'fuckingcunt',
            'fuckinnuts',
            'fuckinright',
            'fuckit',
            'fuckknob',
            'fuckme',
            'fuckmehard',
            'fuckmonkey',
            'fucknut',
            'fucknutt',
            'fuckoff',
            'fuckpig',
            'fucks',
            'fuckstick',
            'fucktard',
            'fucktart',
            'fuckup',
            'fuckwad',
            'fuckwhore',
            'fuckwit',
            'fuckwitt',
            'fuckyou',
            'fudgepacker',
            'fugly',
            'fuk',
            'Fukah',
            'fuken',
            'fuker',
            'fukin',
            'fukk',
            'fukkah',
            'fukken',
            'fukker',
            'fukkin',
            'fuks',
            'funfuck',
            'fuuck',
            'gangbang',
            'gangbanged',
            'gangbanger',
            'gatorbait',
            'gay',
            'gayass',
            'gaybob',
            'gayboy',
            'gaydo',
            'gayfuck',
            'gayfuckist',
            'gaygirl',
            'gaylord',
            'gaymuthafuckinwhore',
            'gays',
            'gaysex',
            'gaytard',
            'gaywad',
            'gayz',
            'genital',
            'genitals',
            'getiton',
            'givehead',
            'glazeddonut',
            'godammit',
            'goddamit',
            'goddammit',
            'goddamn',
            'goddamned',
            'god-damned',
            'goddamnes',
            'goddamnit',
            'goddamnmuthafucker',
            'goldenshower',
            'gonorrehea',
            'gonzagas',
            'gooch',
            'gook',
            'gotohell',
            'greaseball',
            'gringo',
            'grostulation',
            'guido',
            'gypo',
            'gypp',
            'gyppie',
            'gyppo',
            'gyppy',
            'handjob',
            'hardon',
            'hater',
            'hatred',
            'headfuck',
            'heeb',
            'hells',
            'herpes',
            'hijack',
            'hijacker',
            'hijacking',
            'hillbillies',
            'hindoo',
            'hitler',
            'hitlerism',
            'hitlerist',
            'hoar',
            'hobo',
            'hoe',
            'hoes',
            'holestuffer',
            'homo',
            'homobangers',
            'homodumbshit',
            'honger',
            'honkers',
            'honkey',
            'honky',
            'hookers',
            'hoor',
            'hoore',
            'hore',
            'horney',
            'horniest',
            'horny',
            'horseshit',
            'hosejob',
            'hotdamn',
            'hotpussy',
            'hottotrot',
            'humping',
            'husky',
            'hymen',
            'iblowu',
            'idiot',
            'incest',
            'insest',
            'intercourse',
            'internetwife',
            'interracial',
            'intheass',
            'inthebuff',
            'jackass',
            'jackoff',
            'jackshit',
            'jagoff',
            'jap',
            'japcrap',
            'japs',
            'jerkass',
            'jerkoff',
            'jerk-off',
            'jesuschrist',
            'jigaboo',
            'jiggabo',
            'jihad',
            'jijjiboo',
            'jisim',
            'jism',
            'jiss',
            'jizim',
            'jizjuice',
            'jizm',
            'jizz',
            'jizzim',
            'jizzum',
            'jubblies',
            'juggalo',
            'junglebunny',
            'kiddyfiddler',
            'kike',
            'kinky',
            'kissass',
            'knobz',
            'kondum',
            'kooch',
            'kootch',
            'krap',
            'krappy',
            'kraut',
            'kumbubble',
            'kumbullbe',
            'kummer',
            'kumming',
            'kums',
            'kunilingus',
            'kunnilingus',
            'kunt',
            'kunts',
            'kuntz',
            'kyke',
            'labia',
            'lactate',
            'ladyboy',
            'lameass',
            'lapdance',
            'lardass',
            'lesbain',
            'lesbayn',
            'lesbian',
            'lesbin',
            'lesbo',
            'lezbe',
            'lezbefriends',
            'lezbo',
            'lezz',
            'lezzer',
            'lezzie',
            'lezzo',
            'libido',
            'lickme',
            'limpdick',
            'lipshits',
            'lipshitz',
            'livesex',
            'lmfao',
            'loadedgun',
            'lovebone',
            'lovegoo',
            'lovegun',
            'lovejuice',
            'lovemuscle',
            'lovepistol',
            'loverocket',
            'lowlife',
            'lubejob',
            'lucifer',
            'luckycameltoe',
            'mafia',
            'malicious',
            'manhater',
            'manpaste',
            'marijuana',
            'masochist',
            'masokist',
            'massterbait',
            'masstrbait',
            'masstrbate',
            'mastabate',
            'mastabater',
            'masterbaiter',
            'masterbate',
            'masterbates',
            'mastrabator',
            'masturbate',
            'masturbating',
            'mattressprincess',
            'mcfagget',
            'meatbeater',
            'meatrack',
            'mgger',
            'mggor',
            'milf',
            'minge',
            'mofo',
            'molest',
            'molestation',
            'molester',
            'molestor',
            'moneyshot',
            'mooncricket',
            'moron',
            'mothafuck',
            'mothafucka',
            'mothafuckaz',
            'mothafucked',
            'mothafucker',
            'mothafuckin',
            'mothafucking',
            'mothafuckings',
            'mothafuker',
            'mothafukkah',
            'mothafukker',
            'motherfuck',
            'motherfucked',
            'mother-fucker',
            'motherfucker',
            'motherfuckin',
            'motherfucking',
            'motherfuckings',
            'motherfukah',
            'motherfuker',
            'motherfukkah',
            'motherfukker',
            'motherlovebone',
            'muff',
            'muffdive',
            'muffdiver',
            'muffindiver',
            'mufflikcer',
            'muncher',
            'munging',
            'murder',
            'murderer',
            'muthafucker',
            'muthafukah',
            'muthafuker',
            'muthafukkah',
            'muthafukker',
            'nastt',
            'nastybitch',
            'nastyho',
            'nastyslut',
            'nastywhore',
            'nazi',
            'necro',
            'negro',
            'negroes',
            'negroid',
            'nigaboo',
            'nigga',
            'niggah',
            'niggaracci',
            'niggard',
            'niggarded',
            'niggarding',
            'niggardliness',
            'niggardly',
            'niggards',
            'niggaz',
            'nigger',
            'niggerhead',
            'niggerhole',
            'niggers',
            'niggle',
            'niggled',
            'niggles',
            'niggling',
            'nigglings',
            'niggor',
            'niggur',
            'niglet',
            'nignog',
            'nigr',
            'nigra',
            'nigre',
            'nigur',
            'niiger',
            'niigr',
            'nipple',
            'nipplering',
            'nittit',
            'nlgger',
            'nlggor',
            'nofuckingway',
            'nonce',
            'nookey',
            'nookie',
            'nudger',
            'nutcase',
            'nutfucker',
            'nutsack',
            'ontherag',
            'orafis',
            'orgasim',
            'orgasm',
            'orgasum',
            'orgies',
            'orgy',
            'oriface',
            'orifice',
            'orifiss',
            'osamabinladen',
            'packi',
            'packie',
            'packy',
            'paedo',
            'paedofile',
            'paedophile',
            'paki',
            'pakie',
            'paky',
            'palesimian',
            'panooch',
            'panti',
            'pearlnecklace',
            'pecker',
            'peckerhead',
            'peckerwood',
            'peedo',
            'peeenus',
            'peeenusss',
            'peehole',
            'peenus',
            'peinus',
            'penas',
            'penile',
            'penis',
            'penisbanger',
            'penis-breath',
            'penises',
            'penisfucker',
            'penispuffer',
            'penus',
            'penuus',
            'perv',
            'perversion',
            'pervert',
            'phonesex',
            'phuc',
            'phuck',
            'phuk',
            'phuked',
            'phuker',
            'phuking',
            'phukked',
            'phukker',
            'phukking',
            'phungky',
            'phuq',
            'pi55',
            'picaninny',
            'piccaninny',
            'pickaninny',
            'pikey',
            'piky',
            'pimper',
            'pimpjuic',
            'pimpjuice',
            'pimpsimp',
            'pindick',
            'piss',
            'pissed',
            'pissedoff',
            'pisser',
            'pisses',
            'pissflaps',
            'pisshead',
            'pissin',
            'pissing',
            'pissoff',
            'playboy',
            'playbunny',
            'playgirl',
            'plumper',
            'pocketpool',
            'polac',
            'polack',
            'polak',
            'polesmoker',
            'pollock',
            'poon',
            'poonani',
            'poonany',
            'poontang',
            'pooperscooper',
            'pooping',
            'poorwhitetrash',
            'poostabber',
            'popimp',
            'porchmonkey',
            'porn',
            'pornflick',
            'pornking',
            'porno',
            'pornography',
            'pornprincess',
            'premature',
            'pric',
            'prick',
            'prik',
            'prickhead',
            'pros',
            'prostitute',
            'protestant',
            'pu55i',
            'pu55y',
            'pube',
            'pubiclice',
            'puke',
            'punanny',
            'punta',
            'puntang',
            'purinaprincess',
            'pusse',
            'pussee',
            'pussie',
            'pussies',
            'pussy',
            'pussyeater',
            'pussyfucker',
            'pussylicker',
            'pussylicking',
            'pussylips',
            'pussylover',
            'pussypounder',
            'pusy',
            'puto',
            'puuke',
            'puuker',
            'queef',
            'queer',
            'queerbait',
            'queerhole',
            'queers',
            'queerz',
            'quim',
            'qweers',
            'qweerz',
            'qweir',
            'racist',
            'raghead',
            'raped',
            'rapist',
            'rearend',
            'rearentry',
            'recktum',
            'rectum',
            'redneck',
            'renob',
            'rentafuck',
            'retard',
            'retarded',
            'rimjob',
            'rimming',
            'robber',
            'ruski',
            'russki',
            'russkie',
            'sadist',
            'sadom',
            'saeemabutt',
            'sandm',
            'sandnigger',
            'satan',
            'scag',
            'scank',
            'scat',
            'schlong',
            'screwing',
            'screwyou',
            'scrote',
            'scrotum',
            'scum',
            'scumbag',
            'seamanstaines',
            'semen',
            'sexed',
            'sexfarm',
            'sexhound',
            'sexhouse',
            'sexing',
            'sexkitten',
            'sexpot',
            'sexslave',
            'sextogo',
            'sextoy',
            'sextoys',
            'sexwhore',
            'sexymoma',
            'sexy-slim',
            'seymourbutts',
            'shag',
            'shagger',
            'shaggin',
            'shagging',
            'shat',
            'shhit',
            'shit',
            'shitass',
            'shitbag',
            'shitbagger',
            'shitbrains',
            'shitbreath',
            'shitcan',
            'shitcanned',
            'shitcunt',
            'shitdick',
            'shite',
            'shiteater',
            'shited',
            'shiter',
            'shitface',
            'shitfaced',
            'shitfit',
            'shitforbrains',
            'shitfuck',
            'shitfucker',
            'shitfull',
            'shithapens',
            'shithappens',
            'shithead',
            'shithole',
            'shithouse',
            'shiting',
            'shitlist',
            'shitola',
            'shitoutofluck',
            'shits',
            'shitspitter',
            'shitstain',
            'shitted',
            'shitter',
            'shittiest',
            'shitting',
            'shitty',
            'shity',
            'shitz',
            'shiz',
            'shiznit',
            'shortfuck',
            'shyt',
            'shyte',
            'shytty',
            'shyty',
            'sissy',
            'sixsixsix',
            'sixtynine',
            'sixtyniner',
            'skanck',
            'skank',
            'skankbitch',
            'skankee',
            'skankey',
            'skankfuck',
            'skanks',
            'skankwhore',
            'skanky',
            'skankybitch',
            'skankywhore',
            'skeet',
            'skinflute',
            'skullfuck',
            'skum',
            'skumbag',
            'slanteye',
            'slantyeye',
            'slapper',
            'slavedriver',
            'sleezebag',
            'sleezeball',
            'slideitin',
            'slimeball',
            'slimebucket',
            'slopehead',
            'slopey',
            'slopy',
            'slut',
            'slutbag',
            'sluts',
            'slutt',
            'slutting',
            'slutty',
            'slutwear',
            'slutwhore',
            'slutz',
            'smackthemonkey',
            'smeg',
            'smelly',
            'smut',
            'snatch',
            'snatchpatch',
            'snot',
            'snowback',
            'snownigger',
            'sodom',
            'sodomise',
            'sodomite',
            'sodomize',
            'sodomy',
            'son-of-a-bitch',
            'sonofabitch',
            'sonofbitch',
            'spac',
            'spacca',
            'spaghettibender',
            'spaghettinigger',
            'spank',
            'spankthemonkey',
            'spastic',
            'spazza',
            'sperm',
            'spermacide',
            'spermbag',
            'spermhearder',
            'spermherder',
            'spic',
            'spick',
            'spig',
            'spigotty',
            'spik',
            'spitter',
            'splittail',
            'splooge',
            'spooge',
            'spook',
            'spreadeagle',
            'spunk',
            'squaw',
            'stabber',
            'stiffy',
            'strapon',
            'stripclub',
            'stripper',
            'stroking',
            'stupidfuck',
            'stupidfucker',
            'suckass',
            'suckdick',
            'sucker',
            'suckme',
            'suckmyass',
            'suckmydick',
            'suckmytit',
            'suckoff',
            'swallower',
            'swastika',
            'syphilis',
            'tampon',
            'tantra',
            'tarbaby',
            'tard',
            'teat',
            'terror',
            'terrorist',
            'teste',
            'testicle',
            'testicles',
            'thaibride',
            'thickas',
            'thicklips',
            'thicko',
            'thirdeye',
            'thirdleg',
            'threesome',
            'thundercunt',
            'timbernigger',
            'tit',
            'titbitnipply',
            'titfuck',
            'titfucker',
            'titfuckin',
            'titjob',
            'titlicker',
            'titlover',
            'tits',
            'tittie',
            'titties',
            'titty',
            'tittyfuck',
            'tonguethrust',
            'tonguethruster',
            'tonguetramp',
            'torture',
            'tosser',
            'tosspot',
            'towelhead',
            'trailertrash',
            'tramp',
            'trannie',
            'tranny',
            'transvestite',
            'trisexual',
            'trots',
            'trousersnake',
            'tuckahoe',
            'tunneloflove',
            'turd',
            'turnon',
            'twat',
            'twatlips',
            'twats',
            'twatwaffle',
            'twink',
            'twinkie',
            'twobitwhore',
            'unclefucker',
            'unfuckable',
            'upskirt',
            'uptheass',
            'upthebutt',
            'urinate',
            'urine',
            'usamabinladen',
            'uterus',
            'vag',
            'vagiina',
            'vagina',
            'vaginal',
            'vajayjay',
            'vajina',
            'va-j-j',
            'valjina',
            'vibrater',
            'vibrator',
            'vietcong',
            'violate',
            'violation',
            'virginbreaker',
            'vjayjay',
            'vomit',
            'vullva',
            'vulva',
            'wank',
            'wanker',
            'wanking',
            'wankjob',
            'waysted',
            'welcher',
            'wetback',
            'wetspot',
            'whacker',
            'whigger',
            'whiskeydick',
            'whiskydick',
            'whitenigger',
            'whitetrash',
            'whitey',
            'whoor',
            'whop',
            'whore',
            'whorebag',
            'whoreface',
            'whorefucker',
            'whorehouse',
            'wifebeater',
            'williewanker',
            'wog',
            'wop',
            'wuss',
            'wuzzie',
            'x-rated',
            'xrated',
            'yellowman',
            'zigabo',
            'zipperhea',
            'zipperhead',
            'bumhole',
            'feck',
            'suck',
            'adolf',
            'moneygrabber',
            'lazy',
            'lying',
            'acunt',
            'lickmy',
            'suckmy',
            'bigbollocks',
            'bigdick',
            'bigcock',
            'blobby',
            'blair',
            'catshit',
            'fuckfaces',
            'link financial',
            'mbna ltd',
            'mint',
            'argos',
            'fluid',
            'newday',
            'debenhams',
            'harvey hichols',
            'house of fraser',
            'laura ashley',
            'opus',
            'amazon',
            'tui',
            'shop direct ireland limited',
            'shop direct finance company ltd',
            'sygma bank uk',
            'tesco bank',
            'tymit',
            'virgin money',
            'studio',
            'high and mighty',
            'fashion world',
            'jacamo',
            'marisota',
            'premier man',
            'jd williams & co ltd',
            'aktive kapital',
            'the brilliant gift shop',
            'fifty plus',
            'naturally close',
            'the shoe tailor',
            'ambrose wilson',
            'julipa',
            'bonmarché',
            'united kash',
            'ardent credit services ltd',
            'next directory',
            'laRedoute',
            'express gifts',
            'milier',
            'freemans plc',
            'crazy clearance',
            'home essentials',
            'simply be',
            'kaleidoscope',
            'look again',
            'co-op 2u',
            'grattan plc',
            'damartex uk limited',
            'avon',
            'ace',
            'next retail limited',
            'house of bath',
            'oxendales',
            'merligen nvestments',
            'daxon',
            'afibel',
            'zopa credit card',
            '118 118 credit card',
            'vertbaudet',
            'fair for you',
            'jaja credit card',
            'amigo',
            'bamboo',
            'buddy loans',
            'consollo',
            'george banco limited',
            'glo',
            'guarantor my loan',
            'hero loans',
            'lendFair',
            'suco',
            'tfs',
            'trust two',
            'uk credit limited',
            '1 plus 1',
            'avant credit',
            'lending stream',
            'carcrashpoint',
            'everyday loans',
            'likely loans',
            'oakbrook finance ltd',
            'loan on your car',
            'loans 2 go ltd',
            'mobile money ltd',
            'moneybarn',
            'moolr',
            'motor kitty',
            'progressive money',
            'quick loans',
            'ramsdens',
            'savvy',
            'varooma',
            '1st stop',
            '118 118',
            'h and t pawnbrokers',
            'honeycomb finance plc',
            'lendable ltd',
            'oakam ltd',
            'snap finance ltd',
            'tm advances ltd',
            'buffa loans',
            'fair finance',
            'match the cash ltd',
            'my finance club',
            'quidie limited',
            'perfect home',
            'temple finance',
            'provident financial',
            'morses club ltd',
            'loans at home',
            'shopacheck',
            'mutual',
            'compton finance',
            'naylors finance',
            'skyline direct',
            's d taylor',
            'clc finance ltd',
            'lowell portfolio i ltd',
            'hs home & media',
            'short term finance',
            'diamond financial services',
            'estone personal credit',
            'g r finance limited',
            'creditstar',
            'money boat',
            'ferratum uk',
            'novaloans ltd',
            'quidie limited',
            'quidmarket',
            'safetynet credit',
            'apfin ltd',
            'shelby finance',
            'smart-pig.com',
        ];

        return !check.includes(value.toLowerCase());
    },
    message: 'Content not accepted',
});

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

setInteractionMode('eager');

function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
}
