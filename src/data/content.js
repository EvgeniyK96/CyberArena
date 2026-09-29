// Статический контент сайта. Когда появится бэкенд — эти данные
// (занятость мест, турниры, меню) будут приходить из API.

export const NAV = [
  { id: 'zones', label: 'Игровые зоны' },
  { id: 'aegis', label: 'Железо' },
  { id: 'booking', label: 'Тарифы & Бронь' },
  { id: 'tournaments', label: 'Турниры' },
  { id: 'games', label: 'Игры' },
  { id: 'bar', label: 'Клуб & Бар' },
  { id: 'contacts', label: 'Контакты' },
]

export const HERO_STATS = [
  { value: 60, suffix: '+', label: 'Bootcamp & VIP ПК' },
  { value: 24, suffix: '/7', label: 'Режим нон-стоп' },
  { value: 1, suffix: ' MS', label: 'Dual 1Gbps LAN' },
  { text: 'BAR', label: 'Крафт и бургеры' },
]

export const TELEMETRY = [
  { icon: 'sensors', text: 'Температура зала', strong: '21.5°C климат-контроль' },
  { icon: 'router', text: 'Пинг до Valve (Stockholm / Frankfurt)', strong: '12–18 MS' },
  { icon: 'power', text: 'Питание', strong: 'двойной резерв UPS Industrial' },
  { icon: 'lan', text: 'Канал', strong: '2 × 10 Гбит/с оптика' },
  { icon: 'shield', text: 'Защита', strong: 'DDoS L3/L4/L7' },
  { dot: true, strong: '42 свободных ПК сейчас' },
]

export const ZONES = [
  {
    id: 'standard',
    title: 'Standard Zone',
    klass: 'Class: Cyber Runner',
    badge: '30 станций',
    accent: 'cyan',
    video: '/media/runner.mp4',
    poster: '/media/runner-poster.jpg',
    price: 150,
    cta: 'Бронь',
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
    badge: '2 буткемпа 5×5',
    accent: 'lime',
    video: '/media/aegis.mp4',
    poster: '/media/aegis-poster.jpg',
    price: 300,
    cta: 'Снять сквад',
    specs: [
      ['GPU', 'RTX 4080 SUPER 16GB OC'],
      ['Display', 'ZOWIE XL2566K 360Hz DyAc-2'],
      ['Voice & Comms', 'Discord Station + звукопоглощение'],
      ['Seating', 'Noblechairs Hero Black Edition'],
    ],
  },
  {
    id: 'vip',
    title: 'Ultra VIP / Stream',
    klass: 'Class: Apex Cybernetic',
    badge: 'Приватные ложи + PS5 Pro',
    accent: 'magenta',
    image: '/img/hero.jpg',
    price: 450,
    cta: 'Бронь VIP',
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
    ['Видеокарта', 'RTX 4070 Ti SUPER', 'RTX 4080 SUPER OC', 'RTX 4090 24GB'],
    ['Процессор', 'i7-14700KF', 'i9-14900K', 'i9-14900KF'],
    ['ОЗУ', '32GB DDR5', '32GB DDR5 6400', '64GB DDR5 7200'],
    ['Монитор', '280Hz Fast-IPS', 'ZOWIE 360Hz DyAc-2', 'ROG OLED 540Hz'],
    ['Мышь', 'Logitech G PRO', 'ZOWIE EC2-CW', 'Logitech G PRO X Superlight 2'],
    ['Гарнитура', 'HyperX Cloud Alpha', 'HyperX Cloud II Wireless', 'Shure SM7B + Beyerdynamic DT 900'],
    ['Кресло', 'Cougar Armor One', 'Noblechairs Hero', 'Herman Miller Embody'],
    ['Приватность', 'Общий зал', 'Закрытая комната 5×5', 'Приватная ложа'],
  ],
}

export const AEGIS_FEATURES = [
  { k: '360', u: 'Hz', label: 'ZOWIE DyAc-2 на каждом месте' },
  { k: '0.8', u: 'ms', label: 'пинг внутри арены' },
  { k: '10', u: 'Gb/s', label: 'NVMe кэш-сервер игр' },
  { k: '5×5', u: '', label: 'звукоизолированные буткемпы' },
]

// Зоны карты зала. busy — занятые места (пока захардкожено, потом из API).
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
    price: 450,
    night: 1900,
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
    price: 300,
    night: 1200,
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
    price: 150,
    night: 690,
    icon: 'desktop_windows',
    accent: 'cyan',
    chips: ['32GB DDR5', 'Logitech G PRO', 'Cloud Alpha'],
    gpu: 'RTX 4070 Ti / 280Hz',
    cpu: 'i7-14700KF',
  },
]

export const PACKAGES = [
  { id: '1h', title: '1 час', note: 'Почасовой тест', hours: 1, mult: 1 },
  { id: '3h', title: '3 часа', note: 'Скидка 10%', hours: 3, mult: 2.7, hit: true },
  { id: '5h', title: '5 часов ранкед', note: 'Выгода 15%', hours: 5, mult: 4.25 },
  { id: 'night', title: 'Пакет «Ночь»', note: '22:00 — 08:00', hours: 10, night: true },
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
    when: 'Суббота • 16:00 LAN',
    status: 'Осталось 3 слота',
    title: 'NEXUS CS2 5v5 Weekend Cup',
    text: 'Командный LAN-турнир по системе Double Elimination. Официальные судьи, трансляция на клубном Twitch-канале и персональные медали.',
    prize: '150 000 ₽',
    slots: { taken: 13, total: 16 },
    cta: 'Зарегистрировать сквад',
    accent: 'cyan',
  },
  {
    icon: 'military_tech',
    when: 'Воскресенье • 18:00',
    status: 'Открытая сетка',
    title: 'Valorant 1v1 Aim King',
    text: 'Одиночный чемпионат на точность стрельбы. Кастомный deathmatch-сервер, призы от спонсоров HyperX и клубные депозитные часы.',
    prize: '50 000 ₽ + депозиты',
    slots: { taken: 41, total: 64 },
    cta: 'Принять вызов',
    accent: 'magenta',
  },
]

export const MENU = [
  { icon: 'lunch_dining', title: 'Сет «Pro Gamer Burger»', note: 'Мраморная говядина, сыр чеддер + картофель фри', price: '490 ₽' },
  { icon: 'local_cafe', title: 'Nexus Neon Energy Shot', note: 'Крафтовый тонизирующий лимонад (гуарана, мята, лайм)', price: '290 ₽' },
  { icon: 'local_pizza', title: 'Пицца «Headshot» 30 см', note: 'Пепперони, халапеньо, моцарелла — к месту за 15 минут', price: '650 ₽' },
  { icon: 'smoking_rooms', title: 'Smoke Lounge 18+', note: 'Отдельная зона. Премиальные бестабачные и классические миксы', price: 'от 1200 ₽' },
]

export const OFFERS = [
  {
    icon: 'school',
    title: 'Студенческий −20%',
    text: 'С понедельника по четверг с 09:00 до 18:00 по предъявлению студенческого билета любого вуза или колледжа.',
    foot: 'Промокод: STUDENT-NEXUS',
    accent: 'cyan',
  },
  {
    icon: 'groups',
    title: 'Сквад 5+1 в подарок',
    text: 'Бронируйте Bootcamp-комнату составом из 5 человек на 5 часов и получайте 6-й час тренировки бесплатно.',
    foot: 'Автоматически при брони буткемпа',
    accent: 'magenta',
  },
  {
    icon: 'nights_stay',
    title: 'Ночной пакет 690 ₽',
    text: '10 часов непрерывного гейминга с 22:00 до 08:00 — 690 ₽ в Standard Zone и 1200 ₽ в Bootcamp.',
    foot: 'Ежедневно с 22:00',
    accent: 'lime',
  },
]

export const CONTACTS = {
  phone: '+7 (495) 890-20-40',
  email: 'support@nexus-arena.ru',
  address: 'Москва, Киберспортивный пр-д, 12',
  metro: '5 мин от м. Авиамоторная',
  socials: ['Discord', 'Twitch', 'Telegram', 'VK Arena'],
  payments: 'МИР / VISA / SberPay / USDT',
}
