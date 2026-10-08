// Статический контент сайта. Когда появится бэкенд — эти данные
// (занятость мест, турниры, меню) будут приходить из API.
// Переводимые поля — { ru, kk } (выбираются через tr() из useLang),
// обычные строки одинаковы для обоих языков. Цены — в тенге (₸).

export const NAV = [
  { id: 'zones', label: { ru: 'Игровые зоны', kk: 'Ойын аймақтары' } },
  { id: 'aegis', label: { ru: 'Железо', kk: 'Жабдық' } },
  { id: 'booking', label: { ru: 'Тарифы & Бронь', kk: 'Тарифтер & Бронь' } },
  { id: 'tournaments', label: { ru: 'Турниры', kk: 'Турнирлер' } },
  { id: 'games', label: { ru: 'Игры', kk: 'Ойындар' } },
  { id: 'bar', label: { ru: 'Клуб & Бар', kk: 'Клуб & Бар' } },
  { id: 'contacts', label: { ru: 'Контакты', kk: 'Байланыс' } },
]

export const HERO_STATS = [
  { value: 60, suffix: '+', label: 'Bootcamp & VIP ПК' },
  { value: 24, suffix: '/7', label: { ru: 'Режим нон-стоп', kk: 'Тоқтаусыз режим' } },
  { value: 1, suffix: ' MS', label: 'Dual 1Gbps LAN' },
  { text: 'BAR', label: { ru: 'Крафт и бургеры', kk: 'Крафт пен бургерлер' } },
]

export const TELEMETRY = [
  {
    icon: 'sensors',
    text: { ru: 'Температура зала', kk: 'Зал температурасы' },
    strong: { ru: '21.5°C климат-контроль', kk: '21.5°C климат-бақылау' },
  },
  { icon: 'router', text: { ru: 'Пинг до игровых серверов СНГ', kk: 'ТМД ойын серверлеріне пинг' }, strong: '40–60 MS' },
  { icon: 'power', text: { ru: 'Питание', kk: 'Қуат' }, strong: { ru: 'двойной резерв UPS Industrial', kk: 'қос резервті UPS Industrial' } },
  { icon: 'lan', text: { ru: 'Канал', kk: 'Арна' }, strong: '2 × 10 Гбит/с оптика' },
  { icon: 'shield', text: { ru: 'Защита', kk: 'Қорғаныс' }, strong: 'DDoS L3/L4/L7' },
  { dot: true, strong: { ru: '42 свободных ПК сейчас', kk: 'Қазір 42 ПК бос' } },
]

export const ZONES = [
  {
    id: 'standard',
    title: 'Standard Zone',
    klass: 'Class: Cyber Runner',
    badge: { ru: '30 станций', kk: '30 станция' },
    accent: 'cyan',
    video: '/media/runner.mp4',
    poster: '/media/runner-poster.jpg',
    price: 900,
    cta: { ru: 'Бронь', kk: 'Бронь' },
    specs: [
      ['GPU', 'RTX 4070 Ti SUPER 16GB'],
      ['Display', '27" 2K Fast-IPS 280Hz 0.5ms'],
      ['Seating', 'Cougar Armor One Royal Black'],
      ['Gear', 'HyperX Cloud Alpha + Alloy Origins'],
    ],
  },
  {
    id: 'bootcamp',
    title: 'Bootcamp Pro',
    klass: 'Class: Aegis Heavy Mecha',
    badge: { ru: '2 буткемпа 5×5', kk: '2 буткемп 5×5' },
    accent: 'lime',
    video: '/media/aegis.mp4',
    poster: '/media/aegis-poster.jpg',
    price: 1800,
    cta: { ru: 'Снять сквад', kk: 'Сквадқа алу' },
    specs: [
      ['GPU', 'RTX 4080 SUPER 16GB OC'],
      ['Display', 'ZOWIE XL2566K 360Hz DyAc-2'],
      ['Voice & Comms', { ru: 'Discord Station + звукопоглощение', kk: 'Discord Station + дыбыс сіңіру' }],
      ['Seating', 'Noblechairs Hero Black Edition'],
    ],
  },
  {
    id: 'vip',
    title: 'Ultra VIP / Stream',
    klass: 'Class: Apex Cybernetic',
    badge: { ru: 'Приватные ложи + PS5 Pro', kk: 'Жеке ложалар + PS5 Pro' },
    accent: 'magenta',
    video: '/media/hero.mp4',
    poster: '/media/hero-poster.jpg',
    price: 2700,
    cta: { ru: 'Бронь VIP', kk: 'VIP бронь' },
    specs: [
      ['GPU & CPU', 'RTX 4090 24GB + i9-14900KF'],
      ['Monitor', 'ROG Swift Pro 540Hz eSports'],
      ['Stream gear', 'Shure SM7B + GoXLR + Cam 4K'],
      ['Lounge', 'OLED TV 77" + PS5 Pro 4K 120Hz'],
    ],
  },
]

export const COMPARISON = {
  cols: ['Standard', 'Bootcamp Pro', 'Ultra VIP'],
  rows: [
    [{ ru: 'Видеокарта', kk: 'Бейнекарта' }, 'RTX 4070 Ti SUPER', 'RTX 4080 SUPER OC', 'RTX 4090 24GB'],
    ['Процессор', 'i7-14700KF', 'i9-14900K', 'i9-14900KF'],
    [{ ru: 'ОЗУ', kk: 'Жедел жады' }, '32GB DDR5', '32GB DDR5 6400', '64GB DDR5 7200'],
    ['Монитор', '280Hz Fast-IPS', 'ZOWIE 360Hz DyAc-2', 'ROG OLED 540Hz'],
    [{ ru: 'Мышь', kk: 'Тінтуір' }, 'Logitech G PRO', 'ZOWIE EC2-CW', 'Logitech G PRO X Superlight 2'],
    ['Гарнитура', 'HyperX Cloud Alpha', 'HyperX Cloud II Wireless', 'Shure SM7B + Beyerdynamic DT 900'],
    [{ ru: 'Кресло', kk: 'Орындық' }, 'Cougar Armor One', 'Noblechairs Hero', 'Herman Miller Embody'],
    [
      { ru: 'Приватность', kk: 'Жекелік' },
      { ru: 'Общий зал', kk: 'Ортақ зал' },
      { ru: 'Закрытая комната 5×5', kk: 'Жабық бөлме 5×5' },
      { ru: 'Приватная ложа', kk: 'Жеке ложа' },
    ],
  ],
}

export const AEGIS_FEATURES = [
  { k: '360', u: 'Hz', label: { ru: 'ZOWIE DyAc-2 на каждом месте', kk: 'Әр орында ZOWIE DyAc-2' } },
  { k: '0.8', u: 'ms', label: { ru: 'пинг внутри арены', kk: 'арена ішіндегі пинг' } },
  { k: '10', u: 'Gb/s', label: { ru: 'NVMe кэш-сервер игр', kk: 'ойындардың NVMe кэш-сервері' } },
  { k: '5×5', u: '', label: { ru: 'звукоизолированные буткемпы', kk: 'дыбыс оқшауланған буткемптер' } },
]

// Зоны карты зала. busy — занятые места (пока захардкожено, потом из API).
// price — ₸ за час, night — ₸ за ночной пакет.
export const SEAT_ZONES = [
  {
    id: 'vip',
    title: 'VIP Lounge Privacy',
    range: 'ПК #01 — #06',
    spec: 'RTX 4090 / 540Hz OLED',
    prefix: 'V',
    from: 1,
    to: 6,
    cols: 6,
    busy: [2, 5],
    price: 2700,
    night: 10900,
    icon: 'star',
    accent: 'magenta',
    chips: ['64GB DDR5', 'G PRO X SL2', 'Shure SM7B'],
    gpu: 'RTX 4090 / 540Hz',
    cpu: 'i9-14900KF',
  },
  {
    id: 'bootcamp',
    title: 'Bootcamp Alpha 5×5',
    range: 'ПК #07 — #16',
    spec: 'RTX 4080 / 360Hz DyAc',
    prefix: 'B',
    from: 7,
    to: 16,
    cols: 5,
    busy: [10, 11, 14],
    price: 1800,
    night: 6900,
    icon: 'groups',
    accent: 'lime',
    chips: ['32GB DDR5', 'ZOWIE EC2', 'Cloud II'],
    gpu: 'RTX 4080 / 360Hz',
    cpu: 'i9-14900K',
  },
  {
    id: 'standard',
    title: 'Main Stage Standard',
    range: 'ПК #17 — #36',
    spec: 'RTX 4070 Ti / 280Hz',
    prefix: 'S',
    from: 17,
    to: 36,
    cols: 10,
    busy: [20, 23, 26, 29, 30, 33],
    price: 900,
    night: 3900,
    icon: 'desktop_windows',
    accent: 'cyan',
    chips: ['32GB DDR5', 'Logitech G PRO', 'Cloud Alpha'],
    gpu: 'RTX 4070 Ti / 280Hz',
    cpu: 'i7-14700KF',
  },
]

export const PACKAGES = [
  { id: '1h', title: { ru: '1 час', kk: '1 сағат' }, note: { ru: 'Почасовой тест', kk: 'Сағаттық тест' }, hours: 1, mult: 1 },
  { id: '3h', title: { ru: '3 часа', kk: '3 сағат' }, note: { ru: 'Скидка 10%', kk: '10% жеңілдік' }, hours: 3, mult: 2.7, hit: true },
  { id: '5h', title: { ru: '5 часов ранкед', kk: '5 сағат ранкед' }, note: { ru: 'Выгода 15%', kk: '15% үнем' }, hours: 5, mult: 4.25 },
  { id: 'night', title: { ru: 'Пакет «Ночь»', kk: '«Түн» пакеті' }, note: '22:00 — 08:00', hours: 10, night: true },
]

export const GAMES = [
  { icon: 'my_location', title: 'CS 2', note: '128 tick ready • 400+ FPS', tag: 'cyan' },
  { icon: 'shield', title: 'Dota 2', note: 'All heroes open', tag: 'magenta' },
  { icon: 'bolt', title: 'Valorant', note: 'Vanguard secure LAN', tag: 'magenta' },
  { icon: 'military_tech', title: 'Apex Legends', note: 'Ultra settings 240 FPS', tag: 'lime' },
  { icon: 'directions_car', title: 'GTA RP / Majestic', note: 'Pre-cached redux mods', tag: 'cyan' },
  { icon: 'radar', title: 'Warzone / MW3', note: 'Shaders pre-installed', tag: 'lime' },
  { icon: 'sports_martial_arts', title: 'Mortal Kombat 1', note: 'DualSense Sony 4K', tag: 'magenta' },
  { icon: 'sports_soccer', title: 'EA Sports FC 25', note: 'Co-op tournament mode', tag: 'cyan' },
  { icon: 'visibility', title: 'Cyberpunk 2077', note: 'Path tracing overdrive', tag: 'magenta' },
  { icon: 'paragliding', title: 'PUBG Battlegrounds', note: 'Pro res 2K high FPS', tag: 'lime' },
]

export const TOURNAMENTS = [
  {
    icon: 'trophy',
    when: { ru: 'Суббота • 16:00 LAN', kk: 'Сенбі • 16:00 LAN' },
    status: { ru: 'Осталось 3 слота', kk: '3 слот қалды' },
    title: 'NEXUS CS2 5v5 Weekend Cup',
    text: {
      ru: 'Командный LAN-турнир по системе Double Elimination. Официальные судьи, трансляция на клубном Twitch-канале и персональные медали.',
      kk: 'Double Elimination жүйесі бойынша командалық LAN-турнир. Ресми төрешілер, клубтың Twitch-арнасында трансляция және жеке медальдар.',
    },
    prize: '1 000 000 ₸',
    slots: { taken: 13, total: 16 },
    cta: { ru: 'Зарегистрировать сквад', kk: 'Сквадты тіркеу' },
    accent: 'cyan',
  },
  {
    icon: 'military_tech',
    when: { ru: 'Воскресенье • 18:00', kk: 'Жексенбі • 18:00' },
    status: { ru: 'Открытая сетка', kk: 'Ашық тор' },
    title: 'Valorant 1v1 Aim King',
    text: {
      ru: 'Одиночный чемпионат на точность стрельбы. Кастомный deathmatch-сервер, призы от спонсоров HyperX и клубные депозитные часы.',
      kk: 'Ату дәлдігі бойынша жеке чемпионат. Кастомды deathmatch-сервер, HyperX демеушілерінен жүлделер және клубтың депозиттік сағаттары.',
    },
    prize: { ru: '300 000 ₸ + депозиты', kk: '300 000 ₸ + депозиттер' },
    slots: { taken: 41, total: 64 },
    cta: { ru: 'Принять вызов', kk: 'Сынды қабылдау' },
    accent: 'magenta',
  },
]

// price — ₸; from: true → «от …»
export const MENU = [
  {
    icon: 'lunch_dining',
    title: { ru: 'Сет «Pro Gamer Burger»', kk: '«Pro Gamer Burger» сеті' },
    note: { ru: 'Мраморная говядина, сыр чеддер + картофель фри', kk: 'Мәрмәр сиыр еті, чеддер ірімшігі + фри картобы' },
    price: 2900,
  },
  {
    icon: 'local_cafe',
    title: 'Nexus Neon Energy Shot',
    note: { ru: 'Крафтовый тонизирующий лимонад (гуарана, мята, лайм)', kk: 'Крафттық сергітетін лимонад (гуарана, жалбыз, лайм)' },
    price: 1500,
  },
  {
    icon: 'local_pizza',
    title: { ru: 'Пицца «Headshot» 30 см', kk: '«Headshot» пиццасы 30 см' },
    note: { ru: 'Пепперони, халапеньо, моцарелла — к месту за 15 минут', kk: 'Пепперони, халапеньо, моцарелла — 15 минутта орныңа' },
    price: 3900,
  },
  {
    icon: 'smoking_rooms',
    title: 'Smoke Lounge 18+',
    note: { ru: 'Отдельная зона. Премиальные бестабачные и классические миксы', kk: 'Бөлек аймақ. Премиум темекісіз және классикалық микстер' },
    price: 7000,
    from: true,
  },
]

export const OFFERS = [
  {
    icon: 'school',
    title: { ru: 'Студенческий −20%', kk: 'Студенттік −20%' },
    text: {
      ru: 'С понедельника по четверг с 09:00 до 18:00 по предъявлению студенческого билета любого вуза или колледжа.',
      kk: 'Дүйсенбіден бейсенбіге дейін 09:00–18:00 аралығында кез келген ЖОО немесе колледждің студенттік билетін көрсеткенде.',
    },
    code: 'STUDENT-NEXUS',
    accent: 'cyan',
  },
  {
    icon: 'groups',
    title: { ru: 'Сквад 5+1 в подарок', kk: 'Сквад 5+1 сыйға' },
    text: {
      ru: 'Бронируйте Bootcamp-комнату составом из 5 человек на 5 часов и получайте 6-й час тренировки бесплатно.',
      kk: 'Bootcamp-бөлмесін 5 адамдық құраммен 5 сағатқа брондап, 6-шы жаттығу сағатын тегін алыңыз.',
    },
    foot: { ru: 'Автоматически при брони буткемпа', kk: 'Буткемпті брондағанда автоматты түрде' },
    accent: 'magenta',
  },
  {
    icon: 'nights_stay',
    title: { ru: 'Ночной пакет 3 900 ₸', kk: 'Түнгі пакет 3 900 ₸' },
    text: {
      ru: '10 часов непрерывного гейминга с 22:00 до 08:00 — 3 900 ₸ в Standard Zone и 6 900 ₸ в Bootcamp.',
      kk: '22:00-ден 08:00-ге дейін 10 сағат үздіксіз гейминг — Standard Zone-да 3 900 ₸, Bootcamp-та 6 900 ₸.',
    },
    foot: { ru: 'Ежедневно с 22:00', kk: 'Күн сайын 22:00-ден' },
    accent: 'lime',
  },
]

export const CONTACTS = {
  phone: '+7 (727) 350-20-40',
  email: 'support@nexus-arena.kz',
  address: { ru: 'Алматы, пр. Абая, 68', kk: 'Алматы, Абай даңғылы, 68' },
  metro: { ru: '5 мин от м. Байконур', kk: 'Байқоңыр метросынан 5 мин' },
  socials: ['Discord', 'Twitch', 'Telegram', 'Instagram'],
  payments: 'Kaspi QR / Halyk / VISA / Mastercard',
}
