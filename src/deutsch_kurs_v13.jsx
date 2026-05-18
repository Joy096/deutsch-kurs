import { useState } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#0d1117",card:"#161b22",card2:"#1c2128",border:"#30363d",
  green:"#3fb950",greenBg:"#0d2a16",red:"#f85149",redBg:"#2d1117",
  blue:"#58a6ff",blueBg:"#0d1f3c",yellow:"#e3b341",yellowBg:"#2a1f00",
  purple:"#bc8cff",purpleBg:"#1e1030",orange:"#f0883e",orangeBg:"#271500",
  teal:"#39d0d8",tealBg:"#042a2b",text:"#e6edf3",muted:"#8b949e",dim:"#484f58",
};
const AC=a=>a==="der"?C.blue:a==="die"?C.purple:C.orange;
const AB=a=>a==="der"?C.blueBg:a==="die"?C.purpleBg:C.orangeBg;
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}

// ═══════════════════════════════════ DATA ════════════════════════════════════

// ─── ALPHABET ────────────────────────────────────────────────────────────────
const ALPHABET=[
  {l:"A",n:"ah"},{l:"B",n:"beh"},{l:"C",n:"zeh"},{l:"D",n:"deh"},
  {l:"E",n:"eh"},{l:"F",n:"eff"},{l:"G",n:"geh"},{l:"H",n:"hah"},
  {l:"I",n:"ih"},{l:"J",n:"jot"},{l:"K",n:"kah"},{l:"L",n:"ell"},
  {l:"M",n:"emm"},{l:"N",n:"enn"},{l:"O",n:"oh"},{l:"P",n:"peh"},
  {l:"Q",n:"kuh"},{l:"R",n:"err"},{l:"S",n:"ess"},{l:"T",n:"teh"},
  {l:"U",n:"uh"},{l:"V",n:"fau"},{l:"W",n:"weh"},{l:"X",n:"iks"},
  {l:"Y",n:"üpsilon"},{l:"Z",n:"zett"},
  {l:"Ä",n:"A-Umlaut"},{l:"Ö",n:"O-Umlaut"},{l:"Ü",n:"U-Umlaut"},{l:"ß",n:"Eszett"},
];

// ─── ZAHLEN 0–20 ─────────────────────────────────────────────────────────────
const Z20=[
  {n:0,w:"null"},{n:1,w:"eins"},{n:2,w:"zwei"},{n:3,w:"drei"},{n:4,w:"vier"},
  {n:5,w:"fünf"},{n:6,w:"sechs"},{n:7,w:"sieben"},{n:8,w:"acht"},{n:9,w:"neun"},
  {n:10,w:"zehn"},{n:11,w:"elf"},{n:12,w:"zwölf"},{n:13,w:"dreizehn"},
  {n:14,w:"vierzehn"},{n:15,w:"fünfzehn"},{n:16,w:"sechzehn"},{n:17,w:"siebzehn"},
  {n:18,w:"achtzehn"},{n:19,w:"neunzehn"},{n:20,w:"zwanzig"},
];

// ─── BERUFE ───────────────────────────────────────────────────────────────────
const BERUFE=[
  {m:"Ingenieur",f:"Ingenieurin",ru:"инженер"},
  {m:"Verkäufer",f:"Verkäuferin",ru:"продавец"},
  {m:"Altenpfleger",f:"Altenpflegerin",ru:"сиделка"},
  {m:"Programmierer",f:"Programmiererin",ru:"программист"},
  {m:"Arzt",f:"Ärztin",ru:"врач"},
  {m:"Lehrer",f:"Lehrerin",ru:"учитель"},
  {m:"Elektriker",f:"Elektrikerin",ru:"электрик"},
  {m:"Friseur",f:"Friseurin",ru:"парикмахер"},
  {m:"Buchhalter",f:"Buchhalterin",ru:"бухгалтер"},
  {m:"Grafiker",f:"Grafikerin",ru:"дизайнер/график"},
  {m:"Student",f:"Studentin",ru:"студент"},
  {m:"Kinderarzt",f:"Kinderärztin",ru:"педиатр"},
  {m:"Hausmann",f:"Hausfrau",ru:"домохозяин / домохозяйка"},
];

// ─── NATIONALITÄTEN ───────────────────────────────────────────────────────────
const NATS=[
  {land:"Ukraine",art:"die",m:"Ukrainer",f:"Ukrainerin",spr:"Ukrainisch"},
  {land:"Deutschland",art:"",m:"Deutscher",f:"Deutsche",spr:"Deutsch"},
  {land:"Spanien",art:"",m:"Spanier",f:"Spanierin",spr:"Spanisch"},
  {land:"Türkei",art:"die",m:"Türke",f:"Türkin",spr:"Türkisch"},
  {land:"Kanada",art:"",m:"Kanadier",f:"Kanadierin",spr:"Englisch / Französisch"},
  {land:"China",art:"",m:"Chinese",f:"Chinesin",spr:"Chinesisch"},
  {land:"Griechenland",art:"",m:"Grieche",f:"Griechin",spr:"Griechisch"},
  {land:"Polen",art:"",m:"Pole",f:"Polin",spr:"Polnisch"},
  {land:"Frankreich",art:"",m:"Franzose",f:"Französin",spr:"Französisch"},
  {land:"Argentinien",art:"",m:"Argentinier",f:"Argentinierin",spr:"Spanisch"},
];

// ─── KLASSENRAUM VOKABULAR ────────────────────────────────────────────────────
const VOCAB=[
  {art:"der",de:"Tisch",ru:"стол",pl:"Tische",pt:"-e"},
  {art:"der",de:"Stuhl",ru:"стул",pl:"Stühle",pt:'"-e'},
  {art:"der",de:"Schlüssel",ru:"ключ",pl:"Schlüssel",pt:"—"},
  {art:"der",de:"Kugelschreiber",ru:"шариковая ручка",pl:"Kugelschreiber",pt:"—"},
  {art:"der",de:"Kuli",ru:"ручка (разг.)",pl:"Kulis",pt:"-s"},
  {art:"der",de:"USB-Stick",ru:"флешка",pl:"USB-Sticks",pt:"-s"},
  {art:"der",de:"Stift",ru:"карандаш / ручка",pl:"Stifte",pt:"-e"},
  {art:"der",de:"Bleistift",ru:"карандаш",pl:"Bleistifte",pt:"-e"},
  {art:"der",de:"Laptop",ru:"ноутбук",pl:"Laptops",pt:"-s"},
  {art:"die",de:"Tafel",ru:"доска",pl:"Tafeln",pt:"-n"},
  {art:"die",de:"Lampe",ru:"лампа",pl:"Lampen",pt:"-n"},
  {art:"die",de:"Flasche",ru:"бутылка",pl:"Flaschen",pt:"-n"},
  {art:"die",de:"Tasche",ru:"сумка",pl:"Taschen",pt:"-n"},
  {art:"die",de:"Brille",ru:"очки",pl:"Brillen",pt:"-n"},
  {art:"die",de:"Uhr",ru:"часы / час",pl:"Uhren",pt:"-en"},
  {art:"die",de:"Tür",ru:"дверь",pl:"Türen",pt:"-en"},
  {art:"die",de:"CD",ru:"компакт-диск",pl:"CDs",pt:"-s"},
  {art:"das",de:"Fenster",ru:"окно",pl:"Fenster",pt:"—"},
  {art:"das",de:"Heft",ru:"тетрадь",pl:"Hefte",pt:"-e"},
  {art:"das",de:"Buch",ru:"книга",pl:"Bücher",pt:'"-er'},
  {art:"das",de:"Wörterbuch",ru:"словарь",pl:"Wörterbücher",pt:'"-er'},
  {art:"das",de:"Papier",ru:"бумага",pl:"Papiere",pt:"-e"},
  {art:"das",de:"Plakat",ru:"плакат",pl:"Plakate",pt:"-e"},
  {art:"das",de:"Handy",ru:"мобильный телефон",pl:"Handys",pt:"-s"},
  {art:"das",de:"Tablet",ru:"планшет",pl:"Tablets",pt:"-s"},
];

// ─── ЕДИНЫЙ СЛОВАРЬ ПО ТЕМАМ ─────────────────────────────────────────────────
const WBDATA=[
  // ── L1-D · Zahlen bis 20 ─────────────────────────────────────────────────────
  {art:"",   de:"null",          pl:"—", ru:"ноль",                                 tema:"Alltag"},
  {art:"",   de:"eins",          pl:"—", ru:"один",                                 tema:"Alltag"},
  {art:"",   de:"zwei",          pl:"—", ru:"два",                                  tema:"Alltag"},
  {art:"",   de:"drei",          pl:"—", ru:"три",                                  tema:"Alltag"},
  {art:"",   de:"vier",          pl:"—", ru:"четыре",                               tema:"Alltag"},
  {art:"",   de:"fünf",          pl:"—", ru:"пять",                                 tema:"Alltag"},
  {art:"",   de:"sechs",         pl:"—", ru:"шесть",                                tema:"Alltag"},
  {art:"",   de:"sieben",        pl:"—", ru:"семь",                                 tema:"Alltag"},
  {art:"",   de:"acht",          pl:"—", ru:"восемь",                               tema:"Alltag"},
  {art:"",   de:"neun",          pl:"—", ru:"девять",                               tema:"Alltag"},
  {art:"",   de:"zehn",          pl:"—", ru:"десять",                               tema:"Alltag"},
  {art:"",   de:"elf",           pl:"—", ru:"одиннадцать",                          tema:"Alltag"},
  {art:"",   de:"zwölf",         pl:"—", ru:"двенадцать",                           tema:"Alltag"},
  {art:"",   de:"dreizehn",      pl:"—", ru:"тринадцать",                           tema:"Alltag"},
  {art:"",   de:"vierzehn",      pl:"—", ru:"четырнадцать",                         tema:"Alltag"},
  {art:"",   de:"fünfzehn",      pl:"—", ru:"пятнадцать",                           tema:"Alltag"},
  {art:"",   de:"sechzehn",      pl:"—", ru:"шестнадцать",                          tema:"Alltag"},
  {art:"",   de:"siebzehn",      pl:"—", ru:"семнадцать",                           tema:"Alltag"},
  {art:"",   de:"achtzehn",      pl:"—", ru:"восемнадцать",                         tema:"Alltag"},
  {art:"",   de:"neunzehn",      pl:"—", ru:"девятнадцать",                         tema:"Alltag"},
  {art:"",   de:"zwanzig",       pl:"—", ru:"двадцать",                             tema:"Alltag"},
  // ── L1-E · Berufe ────────────────────────────────────────────────────────────
  {art:"der", de:"Lehrer",       pl:"Lehrer",       ru:"учитель\nf. - die Lehrerin",    tema:"Alltag"},
  {art:"der", de:"Arzt",         pl:"Ärzte",        ru:"врач\nf. - die Ärztin",         tema:"Alltag"},
  {art:"der", de:"Ingenieur",    pl:"Ingenieure",   ru:"инженер\nf. - die Ingenieurin", tema:"Alltag"},
  {art:"der", de:"Verkäufer",    pl:"Verkäufer",    ru:"продавец\nf. - die Verkäuferin",tema:"Alltag"},
  {art:"der", de:"Elektriker",   pl:"Elektriker",   ru:"электрик\nf. - die Elektrikerin",tema:"Alltag"},
  {art:"der", de:"Friseur",      pl:"Friseure",     ru:"парикмахер\nf. - die Friseurin",tema:"Alltag"},
  {art:"der", de:"Programmierer",pl:"Programmierer",ru:"программист\nf. - die Programmiererin",tema:"Alltag"},
  {art:"der", de:"Buchhalter",   pl:"Buchhalter",   ru:"бухгалтер\nf. - die Buchhalterin",tema:"Alltag"},
  {art:"der", de:"Grafiker",     pl:"Grafiker",     ru:"дизайнер-график\nf. - die Grafikerin",tema:"Alltag"},
  {art:"der", de:"Altenpfleger", pl:"Altenpfleger", ru:"сиделка/опекун\nf. - die Altenpflegerin",tema:"Alltag"},
  {art:"der", de:"Student",      pl:"Studenten",    ru:"студент\nf. - die Studentin",   tema:"Alltag"},
  {art:"der", de:"Kinderarzt",   pl:"Kinderärzte",  ru:"педиатр\nf. - die Kinderärztin",tema:"Alltag"},
  {art:"der", de:"Hausmann",     pl:"Hausmänner",   ru:"домохозяин\nf. - die Hausfrau", tema:"Alltag"},
  // ── Левый столбик (стр. 1) ───────────────────────────────────────────────────
  {art:"die",de:"Tür",           pl:"Türen",          ru:"дверь",                  tema:"Kursraum"},
  {art:"das",de:"Fenster",       pl:"Fenster",         ru:"окно",                   tema:"Kursraum"},
  {art:"die",de:"Uhr",           pl:"Uhren",           ru:"часы",                   tema:"Kursraum"},
  {art:"der",de:"Stuhl",         pl:"Stühle",          ru:"стул",                   tema:"Kursraum"},
  {art:"das",de:"Plakat",        pl:"Plakate",         ru:"плакат",                 tema:"Kursraum"},
  {art:"die",de:"Tafel",         pl:"Tafeln",          ru:"доска",                  tema:"Kursraum"},
  {art:"die",de:"Lampe",         pl:"Lampen",          ru:"лампа",                  tema:"Kursraum"},
  {art:"die",de:"Flasche",       pl:"Flaschen",        ru:"бутылка",                tema:"Kursraum"},
  {art:"das",de:"Papier",        pl:"Papiere",         ru:"бумага",                 tema:"Kursraum"},
  {art:"das",de:"Wörterbuch",    pl:"Wörterbücher",    ru:"словарь",                tema:"Kursraum"},
  {art:"der",de:"Kugelschreiber",pl:"Kugelschreiber",  ru:"шариковая ручка",        tema:"Kursraum"},
  {art:"der",de:"Kuli",          pl:"Kulis",           ru:"ручка (разг.)",          tema:"Kursraum"},
  {art:"der",de:"Tisch",         pl:"Tische",          ru:"стол",                   tema:"Kursraum"},
  {art:"der",de:"USB-Stick",     pl:"USB-Sticks",      ru:"флешка",                 tema:"Kursraum"},
  {art:"der",de:"Schlüssel",     pl:"Schlüssel",       ru:"ключ",                   tema:"Kursraum"},
  {art:"das",de:"Handy",         pl:"Handys",          ru:"мобильный телефон",      tema:"Kursraum"},
  {art:"das",de:"Heft",          pl:"Hefte",           ru:"тетрадь",                tema:"Kursraum"},
  {art:"die",de:"Brille",        pl:"Brillen",         ru:"очки",                   tema:"Kursraum"},
  {art:"das",de:"Buch",          pl:"Bücher",          ru:"книга",                  tema:"Kursraum"},
  {art:"der",de:"Stift",         pl:"Stifte",          ru:"карандаш / ручка",       tema:"Kursraum"},
  {art:"die",de:"Tasche",        pl:"Taschen",         ru:"сумка",                  tema:"Kursraum"},
  {art:"das",de:"Tablet",        pl:"Tablets",         ru:"планшет",                tema:"Kursraum"},
  {art:"der",de:"Laptop",        pl:"Laptops",         ru:"ноутбук",                tema:"Kursraum"},
  {art:"der",de:"Fisch",         pl:"Fische",          ru:"рыба",                   tema:"Alltag"},
  // ── Правый столбик (стр. 1) — порядок как в конспекте ───────────────────────
  {art:"das",de:"Formular",      pl:"Formulare",       ru:"анкета, бланк",          tema:"Alltag"},
  {art:"der",de:"Pass",          pl:"Pässe",           ru:"паспорт",                tema:"Alltag"},
  {art:"das",de:"Café",          pl:"Cafés",           ru:"кафе",                   tema:"Alltag"},
  {art:"die",de:"Schokolade",    pl:"Schokoladen",     ru:"шоколад",                tema:"Alltag"},
  {art:"die",de:"Kasse",         pl:"Kassen",          ru:"касса",                  tema:"Alltag"},
  {art:"die",de:"Apotheke",      pl:"Apotheken",       ru:"аптека",                 tema:"Alltag"},
  {art:"die",de:"Pizza",         pl:"Pizzas",          ru:"пицца",                  tema:"Alltag"},
  {art:"die",de:"Oper",          pl:"Opern",           ru:"опера",                  tema:"Alltag"},
  {art:"der",de:"Bleistift",     pl:"Bleistifte",      ru:"карандаш",               tema:"Kursraum"},
  {art:"die",de:"CD",            pl:"CDs",             ru:"компакт-диск",           tema:"Kursraum"},
  {art:"das",de:"Portemonnaie",  pl:"Portemonnaies",   ru:"кошелёк",                tema:"Alltag"},
  {art:"der",de:"Radiergummi",   pl:"Radiergummis",    ru:"ластик",                 tema:"Kursraum"},
  {art:"die",de:"Schere",        pl:"Scheren",         ru:"ножницы",                tema:"Kursraum"},
  {art:"die",de:"Tasse",         pl:"Tassen",          ru:"чашка",                  tema:"Alltag"},
  {art:"der",de:"CD-Player",     pl:"CD-Player",       ru:"CD-плеер",               tema:"Kursraum"},
  {art:"die",de:"Jacke",         pl:"Jacken",          ru:"куртка, пиджак",         tema:"Alltag"},
  {art:"das",de:"Lineal",        pl:"Lineale",         ru:"линейка",                tema:"Kursraum"},
  {art:"der",de:"Markierstift",  pl:"Markierstifte",   ru:"маркер",                 tema:"Kursraum"},
  {art:"das",de:"Notizbuch",     pl:"Notizbücher",     ru:"блокнот",                tema:"Kursraum"},
  {art:"der",de:"Zettel",        pl:"Zettel",          ru:"листок, записка",        tema:"Kursraum"},
  {art:"die",de:"Hausaufgabe",   pl:"Hausaufgaben",    ru:"домашнее задание",       tema:"Kursraum"},
  // ── Möbel — левый столбик стр.3 ──────────────────────────────────────────────
  {art:"die",de:"Spüle",         pl:"Spülen",          ru:"раковина (кухонная)",    tema:"Möbel"},
  {art:"das",de:"Bett",          pl:"Betten",          ru:"кровать",                tema:"Möbel"},
  {art:"der",de:"Herd",          pl:"Herde",           ru:"плита",                  tema:"Möbel"},
  {art:"das",de:"Sofa",          pl:"Sofas",           ru:"диван",                  tema:"Möbel"},
  {art:"der",de:"Schrank",       pl:"Schränke",        ru:"шкаф",                   tema:"Möbel"},
  {art:"der",de:"Fernseher",     pl:"Fernseher",       ru:"телевизор",              tema:"Möbel"},
  {art:"der",de:"Sessel",        pl:"Sessel",          ru:"кресло",                 tema:"Möbel"},
  {art:"das",de:"Bild",          pl:"Bilder",          ru:"картина",                tema:"Möbel"},
  {art:"das",de:"Regal",         pl:"Regale",          ru:"полка",                  tema:"Möbel"},
  {art:"der",de:"Teppich",       pl:"Teppiche",        ru:"ковёр",                  tema:"Möbel"},
  {art:"der",de:"Vorhang",       pl:"Vorhänge",        ru:"штора, занавеска",       tema:"Möbel"},
  {art:"das",de:"Schlafzimmer",  pl:"Schlafzimmer",    ru:"спальня",                tema:"Möbel"},
  {art:"das",de:"Zimmer",        pl:"Zimmer",          ru:"комната",                tema:"Möbel"},
  {art:"der",de:"Schreibtisch",  pl:"Schreibtische",   ru:"письменный стол",        tema:"Möbel"},
  // Bad — идёт в левом столбике после Schreibtisch ──────────────────────────────
  {art:"das",de:"Bad",           pl:"Bäder",           ru:"ванная комната",         tema:"Bad"},
  {art:"die",de:"Badewanne",     pl:"Badewannen",      ru:"ванна",                  tema:"Bad"},
  {art:"die",de:"Dusche",        pl:"Duschen",         ru:"душ",                    tema:"Bad"},
  {art:"die",de:"Toilette",      pl:"Toiletten",       ru:"туалет",                 tema:"Bad"},
  {art:"das",de:"Waschbecken",   pl:"Waschbecken",     ru:"умывальник",             tema:"Bad"},
  {art:"der",de:"Spiegel",       pl:"Spiegel",         ru:"зеркало",                tema:"Bad"},
  // Левый столбик продолжается ──────────────────────────────────────────────────
  {art:"die",de:"Küche",         pl:"Küchen",          ru:"кухня",                  tema:"Möbel"},
  {art:"der",de:"Kühlschrank",   pl:"Kühlschränke",    ru:"холодильник",            tema:"Möbel"},
  {art:"das",de:"Wohnzimmer",    pl:"Wohnzimmer",      ru:"гостиная",               tema:"Möbel"},
  {art:"die",de:"Klimaanlage",   pl:"Klimaanlagen",    ru:"кондиционер",            tema:"Möbel"},
  {art:"die",de:"Zimmerpflanze", pl:"Zimmerpflanzen",  ru:"комнатное растение",     tema:"Möbel"},
  {art:"das",de:"Poster",        pl:"Poster",          ru:"постер, плакат",         tema:"Möbel"},
  // ── Правый столбик стр.2 (фото 4) ───────────────────────────────────────────
  {art:"die",de:"Terrasse",      pl:"Terrassen",       ru:"терраса",                tema:"Wohnung"},
  {art:"der",de:"Balkon",        pl:"Balkone",         ru:"балкон",                 tema:"Wohnung"},
  {art:"die",de:"Garage",        pl:"Garagen",         ru:"гараж",                  tema:"Wohnung"},
  {art:"das",de:"Arbeitszimmer", pl:"Arbeitszimmer",   ru:"рабочий кабинет",        tema:"Wohnung"},
  {art:"der",de:"Flur",          pl:"Flure",           ru:"коридор, прихожая",      tema:"Wohnung"},
  {art:"die",de:"Spülmaschine",  pl:"Spülmaschinen",   ru:"посудомоечная машина",   tema:"Möbel"},
  {art:"die",de:"Blume",         pl:"Blumen",          ru:"цветок",                 tema:"Möbel"},
  {art:"die",de:"Kommode",       pl:"Kommoden",        ru:"комод",                  tema:"Möbel"},
  {art:"der",de:"Trockner",      pl:"Trockner",        ru:"сушильная машина",       tema:"Möbel"},
  {art:"das",de:"Haus",          pl:"Häuser",          ru:"дом",                    tema:"Wohnung"},
  {art:"die",de:"Wohnung",       pl:"Wohnungen",       ru:"квартира",               tema:"Wohnung"},
  {art:"das",de:"Dorf",          pl:"Dörfer",          ru:"село, деревня",          tema:"Wohnung"},
  {art:"die",de:"Stadt",         pl:"Städte",          ru:"город",                  tema:"Wohnung"},
  {art:"das",de:"Apartment",     pl:"Apartments",      ru:"апартаменты, квартира",  tema:"Wohnung"},
  // ── Adjektive фото 4 — правый столбик стр.2 (после Apartment) ───────────────
  {art:"",de:"alt",          pl:"—",ru:"старый",           tema:"Adjektive"},
  {art:"",de:"neu",          pl:"—",ru:"новый",             tema:"Adjektive"},
  {art:"",de:"modern",       pl:"—",ru:"современный",      tema:"Adjektive"},
  {art:"",de:"groß",         pl:"—",ru:"большой",           tema:"Adjektive"},
  {art:"",de:"klein",        pl:"—",ru:"маленький",         tema:"Adjektive"},
  {art:"",de:"schön",        pl:"—",ru:"красивый",          tema:"Adjektive"},
  {art:"",de:"hässlich",     pl:"—",ru:"некрасивый",        tema:"Adjektive"},
  {art:"",de:"bequem",       pl:"—",ru:"удобный",           tema:"Adjektive"},
  {art:"",de:"unbequem",     pl:"—",ru:"неудобный",         tema:"Adjektive"},
  {art:"",de:"ordentlich",   pl:"—",ru:"аккуратный",        tema:"Adjektive"},
  {art:"",de:"unordentlich", pl:"—",ru:"неаккуратный",      tema:"Adjektive"},
  {art:"",de:"teuer",        pl:"—",ru:"дорогой",           tema:"Adjektive"},
  {art:"",de:"billig",       pl:"—",ru:"дешёвый",           tema:"Adjektive"},
  {art:"",de:"günstig",      pl:"—",ru:"выгодный, дешёвый", tema:"Adjektive"},
  // ── Adjektive стр.3 пары ─────────────────────────────────────────────────────
  {art:"",de:"breit",        pl:"—",ru:"широкий",           tema:"Adjektive"},
  {art:"",de:"schmal",       pl:"—",ru:"узкий",             tema:"Adjektive"},
  {art:"",de:"hell",         pl:"—",ru:"светлый",           tema:"Adjektive"},
  {art:"",de:"dunkel",       pl:"—",ru:"тёмный",            tema:"Adjektive"},
  {art:"",de:"links",        pl:"—",ru:"слева",             tema:"Adjektive"},
  {art:"",de:"rechts",       pl:"—",ru:"справа",            tema:"Adjektive"},
  {art:"",de:"oben",         pl:"—",ru:"вверху",            tema:"Adjektive"},
  {art:"",de:"unten",        pl:"—",ru:"внизу",             tema:"Adjektive"},
  {art:"",de:"gemütlich",    pl:"—",ru:"уютный",            tema:"Adjektive"},
  {art:"",de:"ungemütlich",  pl:"—",ru:"неуютный",          tema:"Adjektive"},
  {art:"",de:"hoch",         pl:"—",ru:"высокий",           tema:"Adjektive"},
  {art:"",de:"niedrig",      pl:"—",ru:"низкий",            tema:"Adjektive"},
  {art:"",de:"gut",          pl:"—",ru:"хороший",           tema:"Adjektive"},
  {art:"",de:"schlecht",     pl:"—",ru:"плохой",            tema:"Adjektive"},
  {art:"",de:"ruhig",        pl:"—",ru:"тихий, спокойный",  tema:"Adjektive"},
  {art:"",de:"laut",         pl:"—",ru:"громкий",           tema:"Adjektive"},
  // ── Существительные стр.3 (после пар) ────────────────────────────────────────
  {art:"die",de:"Lage",           pl:"Lagen",             ru:"расположение, местоположение",tema:"Wohnung"},
  {art:"der",de:"Stock",          pl:"Stockwerke",         ru:"этаж",                        tema:"Wohnung"},
  {art:"das",de:"Einfamilienhaus",pl:"Einfamilienhäuser", ru:"отдельный дом (на одну семью)",tema:"Wohnung"},
  {art:"die",de:"Zentralheizung", pl:"Zentralheizungen",  ru:"центральное отопление (ZH)",  tema:"Wohnung"},
  {art:"der",de:"Quadratmeter",   pl:"Quadratmeter",      ru:"квадратный метр (qm)",        tema:"Wohnung"},
  {art:"das",de:"Mehrfamilienhaus",pl:"Mehrfamilienhäuser",ru:"многокв. дом",               tema:"Wohnung"},
  {art:"das",de:"Hochhaus",       pl:"Hochhäuser",        ru:"высотный дом, небоскрёб",     tema:"Wohnung"},
  {art:"",   de:"in der Nähe von",pl:"—",                 ru:"рядом с, вблизи от",          tema:"Phrase"},
  {art:"das",de:"Reihenhaus",     pl:"Reihenhäuser",      ru:"таунхаус, рядовой дом",       tema:"Wohnung"},
  // ── Стр.3 низ + сегодняшний урок ─────────────────────────────────────────────
  {art:"",de:"verheiratet",  pl:"—",ru:"женатый, замужем",  tema:"Adjektive"},
  {art:"",de:"genug",        pl:"—",ru:"достаточно",        tema:"Adjektive"},
  {art:"",de:"furchtbar",    pl:"—",ru:"ужасный",           tema:"Adjektive"},
  {art:"",de:"kalt",         pl:"—",ru:"холодный",          tema:"Adjektive"},
  {art:"",de:"warm",         pl:"—",ru:"тёплый",            tema:"Adjektive"},
  {art:"",de:"sonnig",       pl:"—",ru:"солнечный",         tema:"Adjektive"},
  {art:"",de:"zentral",      pl:"—",ru:"центральный",       tema:"Adjektive"},
  {art:"",de:"interessant",  pl:"—",ru:"интересный",        tema:"Adjektive"},
  {art:"",de:"langweilig",   pl:"—",ru:"скучный",           tema:"Adjektive"},
  {art:"die",de:"Farbe",        pl:"Farben",       ru:"цвет",                   tema:"Wohnung"},
  {art:"das",de:"Erdgeschoss",  pl:"Erdgeschosse",  ru:"нулевой этаж (первый снизу)", tema:"Wohnung"},
  {art:"der",de:"erste Stock",  pl:"—",             ru:"1-й этаж",                   tema:"Wohnung"},
  {art:"der",de:"zweite Stock", pl:"—",             ru:"2-й этаж",                   tema:"Wohnung"},
  {art:"der",de:"dritte Stock", pl:"—",             ru:"3-й этаж",                   tema:"Wohnung"},
  {art:"das",de:"Dachgeschoss", pl:"Dachgeschosse",ru:"мансарда, верхний этаж", tema:"Wohnung"},
  {art:"der",de:"Garten",       pl:"Gärten",       ru:"сад",                    tema:"Wohnung"},
  {art:"das",de:"Geschäft",     pl:"Geschäfte",    ru:"магазин",                tema:"Alltag"},
  {art:"",   de:"bezahlen",     pl:"—",            ru:"платить",                tema:"Wohnung"},
  {art:"",   de:"es gibt",      pl:"—",            ru:"есть, имеется",          tema:"Phrase"},
  {art:"",   de:"Wie findest du ...?",pl:"—",       ru:"Как тебе нравится ...?", tema:"Phrase"},
  // ── Страницы 38–39 Arbeitsbuch (Wichtige Wörter) ─────────────────────────────
  {art:"der",de:"Nachttisch",     pl:"Nachttische",     ru:"тумбочка",                tema:"Möbel"},
  {art:"das",de:"Kissen",         pl:"Kissen",          ru:"подушка",                 tema:"Möbel"},
  {art:"die",de:"Bettdecke",      pl:"Bettdecken",      ru:"одеяло",                  tema:"Möbel"},
  {art:"der",de:"Teddybär",       pl:"Teddybären",      ru:"плюшевый мишка",          tema:"Möbel"},
  {art:"das",de:"Kinderzimmer",   pl:"Kinderzimmer",    ru:"детская комната",         tema:"Möbel"},
  {art:"der",de:"Küchenschrank",  pl:"Küchenschränke",  ru:"кухонный шкаф",           tema:"Möbel"},
  {art:"der",de:"Blumentopf",     pl:"Blumentöpfe",     ru:"цветочный горшок",        tema:"Möbel"},
  {art:"die",de:"Heizungsanlage", pl:"Heizungsanlagen", ru:"отопительная система",    tema:"Wohnung"},
  {art:"die",de:"Wäsche",         pl:"—",               ru:"бельё, стирка",           tema:"Alltag"},
  {art:"die",de:"Waschmaschine",  pl:"Waschmaschinen",  ru:"стиральная машина",       tema:"Möbel"},
  {art:"der",de:"Keller",         pl:"Keller",          ru:"подвал, погреб",          tema:"Wohnung"},
  // ── Familie (Verwandte) — стр. 39 ───────────────────────────────────────────
  {art:"die",de:"Großeltern",   pl:"—",             ru:"бабушка и дедушка (мн.ч.)", tema:"Alltag"},
  {art:"der",de:"Großvater",    pl:"Großväter",     ru:"дедушка",                   tema:"Alltag"},
  {art:"die",de:"Großmutter",   pl:"Großmütter",    ru:"бабушка",                   tema:"Alltag"},
  {art:"die",de:"Eltern",       pl:"—",             ru:"родители (мн.ч.)",          tema:"Alltag"},
  {art:"der",de:"Vater",        pl:"Väter",         ru:"отец",                      tema:"Alltag"},
  {art:"die",de:"Mutter",       pl:"Mütter",        ru:"мать",                      tema:"Alltag"},
  {art:"die",de:"Geschwister",  pl:"—",             ru:"братья и сёстры (мн.ч.)",   tema:"Alltag"},
  {art:"die",de:"Schwester",    pl:"Schwestern",    ru:"сестра",                    tema:"Alltag"},
  {art:"der",de:"Bruder",       pl:"Brüder",        ru:"брат",                      tema:"Alltag"},
  {art:"der",de:"Sohn",         pl:"Söhne",         ru:"сын",                       tema:"Alltag"},
  {art:"die",de:"Tochter",      pl:"Töchter",       ru:"дочь",                      tema:"Alltag"},
  {art:"die",de:"Enkelkinder",  pl:"—",             ru:"внуки (мн.ч.)",             tema:"Alltag"},
  {art:"der",de:"Enkel",        pl:"Enkel",         ru:"внук",                      tema:"Alltag"},
  {art:"die",de:"Enkelin",      pl:"Enkelinnen",    ru:"внучка",                    tema:"Alltag"},
  {art:"der",de:"Onkel",        pl:"Onkel",         ru:"дядя",                      tema:"Alltag"},
  {art:"die",de:"Tante",        pl:"Tanten",        ru:"тётя",                      tema:"Alltag"},
  {art:"der",de:"Cousin",       pl:"Cousins",       ru:"двоюродный брат",           tema:"Alltag"},
  {art:"die",de:"Cousine",      pl:"Cousinen",      ru:"двоюродная сестра",         tema:"Alltag"},
  {art:"der",de:"Neffe",        pl:"Neffen",        ru:"племянник",                 tema:"Alltag"},
  {art:"die",de:"Nichte",       pl:"Nichten",       ru:"племянница",                tema:"Alltag"},
  // ── Ehe & Familie / новые слова ──────────────────────────────────────────────
  {art:"der",de:"Kuchen",       pl:"Kuchen",        ru:"пирог, торт",               tema:"Alltag"},
  {art:"die",de:"Nachspeise",   pl:"Nachspeisen",   ru:"десерт",                    tema:"Alltag"},
  {art:"die",de:"Meinung",      pl:"Meinungen",     ru:"мнение",                    tema:"Alltag"},
  {art:"",   de:"gehören",      pl:"—",             ru:"принадлежать",              tema:"Alltag"},
  {art:"die",de:"Ehe",          pl:"Ehen",          ru:"брак, супружество",         tema:"Alltag"},
  {art:"das",de:"Ehepaar",      pl:"Ehepaare",      ru:"супружеская пара",          tema:"Alltag"},
  {art:"die",de:"Ehefrau",      pl:"Ehefrauen",     ru:"жена",                      tema:"Alltag"},
  {art:"der",de:"Ehemann",      pl:"Ehemänner",     ru:"муж",                       tema:"Alltag"},
  {art:"",   de:"heiraten",     pl:"—",             ru:"жениться / выходить замуж", tema:"Alltag"},
  {art:"",   de:"verheiratet sein",pl:"—",          ru:"быть женатым / замужней",   tema:"Phrase"},
  {art:"",   de:"nur",          pl:"—",             ru:"только",                    tema:"Alltag"},
];




// ─── ADJEKTIV-PAARE ───────────────────────────────────────────────────────────
const ADJEKTIV_PAARE=[
  {a:"alt",        ra:"старый",      b:"neu",          rb:"новый"},
  {a:"groß",       ra:"большой",     b:"klein",        rb:"маленький"},
  {a:"schön",      ra:"красивый",    b:"hässlich",     rb:"некрасивый"},
  {a:"bequem",     ra:"удобный",     b:"unbequem",     rb:"неудобный"},
  {a:"ordentlich", ra:"аккуратный",  b:"unordentlich", rb:"неаккуратный"},
  {a:"teuer",      ra:"дорогой",     b:"billig",       rb:"дешёвый"},
  {a:"breit",      ra:"широкий",     b:"schmal",       rb:"узкий"},
  {a:"hell",       ra:"светлый",     b:"dunkel",       rb:"тёмный"},
  {a:"links",      ra:"слева",       b:"rechts",       rb:"справа"},
  {a:"oben",       ra:"вверху",      b:"unten",        rb:"внизу"},
  {a:"modern",     ra:"современный", b:"",             rb:""},
  {a:"gemütlich",  ra:"уютный",      b:"ungemütlich",  rb:"неуютный"},
  {a:"hoch",       ra:"высокий",     b:"niedrig",      rb:"низкий"},
  {a:"gut",        ra:"хороший",     b:"schlecht",     rb:"плохой"},
  {a:"ruhig",      ra:"тихий, спокойный", b:"laut",   rb:"громкий"},
  {a:"kalt",       ra:"холодный",         b:"warm",   rb:"тёплый"},
  {a:"interessant",ra:"интересный",       b:"langweilig",rb:"скучный"},
  {a:"erst-",      ra:"первый",      b:"zweit-",       rb:"второй"},
  {a:"dritt-",     ra:"третий",      b:"viert-",       rb:"четвёртый"},
];

// ─── BEWERTUNG (оценки по эмодзи) ────────────────────────────────────────────
const BEWERTUNG=[
  {e:"😊",label:"positiv",col:C.green,words:[
    {de:"super",      ru:"супер, отлично"},
    {de:"toll",       ru:"здорово, классно"},
    {de:"sehr schön", ru:"очень красиво"},
    {de:"schön",      ru:"красивый"},
    {de:"elegant",    ru:"элегантный"},
    {de:"gemütlich",  ru:"уютный"},
  ]},
  {e:"😐",label:"neutral",col:C.yellow,words:[
    {de:"ganz schön",     ru:"довольно красиво"},
    {de:"nicht schlecht", ru:"неплохо"},
    {de:"okay",           ru:"нормально, ок"},
  ]},
  {e:"😞",label:"negativ",col:C.red,words:[
    {de:"schlecht",   ru:"плохой"},
    {de:"langweilig", ru:"скучный"},
    {de:"nicht schön",ru:"некрасиво"},
    {de:"hässlich",   ru:"некрасивый"},
    {de:"furchtbar",  ru:"ужасный"},
  ]},
];

// ─── DIÁLOGFRAGEN ─────────────────────────────────────────────────────────────
const DIALOG_FRAGEN=[
  {tag:"Begrüßung & Abschied",col:C.green,qa:[
    {q:"Guten Morgen!",           tr:"Доброе утро!",             a:"Guten Morgen!",                        note:"5:00–11:00 · формально"},
    {q:"Guten Tag!",              tr:"Добрый день!",               a:"Guten Tag!",                           note:"11:00–18:00 · формально"},
    {q:"Guten Abend!",            tr:"Добрый вечер!",              a:"Guten Abend!",                         note:"18:00–22:00 · формально"},
    {q:"Hallo! / Hey! / Ciao!",   tr:"Привет!",                   a:"Hallo! / Hey!",                        note:"неформально · du-Form"},
    {q:"Auf Wiedersehen!",        tr:"До свидания!",              a:"Auf Wiedersehen! / Auf Wiederschauen!",note:"формально · Sie-Form"},
    {q:"Tschüss!",                tr:"Пока!",             a:"Tschüss! / Bis bald!",                 note:"неформально · du-Form"},
    {q:"Bis bald! / Bis später!", tr:"До скорого! / Увидимся!",  a:"Bis bald!",                            note:"неформально"},
    {q:"Einen schönen Tag!",      tr:"Хорошего дня!",               a:"Danke, gleichfalls!",                  note:"gleichfalls = взаємно"},
    {q:"Einen schönen Abend!",    tr:"Хорошего вечера!",            a:"Danke, gleichfalls!",                  note:""},
    {q:"Ach so.",                 tr:"Вот как. / Понятно.",          a:"— (реакция на новую информацию)",      note:"Ach so = А, понятно! · выражает лёгкое удивление или понимание"},
  ]},
  {tag:"Kennenlernen — formell (Sie)",col:C.blue,qa:[
    {q:"Wie heißen Sie?",         tr:"Как вас зовут?",              a:"Ich heiße Vitali Klymenko.",           note:"heißen = называться"},
    {q:"Woher kommen Sie?",       tr:"Откуда вы?",                 a:"Ich komme aus der Ukraine.",           note:"aus der Ukraine · aus der Türkei · aus dem Irak"},
    {q:"Wo wohnen Sie?",          tr:"Где вы живёте?",              a:"Ich wohne in Köln. / in der Hauptstraße 5.", note:"wohnen = жить"},
    {q:"Was sind Sie von Beruf?", tr:"Кем вы работаете?",           a:"Ich bin Gitarrenlehrer von Beruf.",    note:"von Beruf = по профессии"},
    {q:"Welche Sprache(n) sprechen Sie?", tr:"Какие языки вы знаете?",a:"Ich spreche Deutsch und Englisch. Und Sie?",note:"sprechen = говорить"},
    {q:"Welche Hobbys haben Sie?",tr:"Какие у вас хобби?",            a:"Meine Hobbys sind Lesen und Musik.",   note:"gern = с удовольствием"},
    {q:"Wie geht es Ihnen?",      tr:"Как у вас дела?",           a:"Danke, gut. Und Ihnen? / Auch gut, danke.",note:"Ihnen = вам (Dativ) · Auch gut = у меня тоже хорошо"},
    {q:"Sind Sie neu hier?",      tr:"Вы тут новый/новая?",        a:"Ja, ich bin neu hier. / Ja, wir kommen aus Mannheim.",note:"p.17 Dialogtraining"},
    {q:"Freut mich! / Sehr angenehm!",tr:"Рад познакомиться! / Очень приятно!", a:"Freut mich auch!",      note:"при знакомстве"},
  ]},
  {tag:"Kennenlernen — informell (du)",col:C.teal,qa:[
    {q:"Wie heißt du?",           tr:"Как тебя зовут?",             a:"Ich heiße ... / Mein Name ist ...",    note:"неформально · du-Form"},
    {q:"Woher kommst du?",        tr:"Откуда ты?",                 a:"Ich komme aus der Ukraine.",           note:"Я из Украины"},
    {q:"Wo wohnst du?",           tr:"Где ты живёшь?",               a:"Ich wohne in Köln. / Ich bin neu hier im Haus.",note:"neu hier = недавно здесь"},
    {q:"Was bist du von Beruf?",  tr:"Кем ты работаешь?",            a:"Ich lerne Deutsch. / Ich bin Lehrer.", note:""},
    {q:"Welche Hobbys hast du?",  tr:"Какие у тебя хобби?",           a:"Ich spiele gern Fußball. / Mein Hobby ist Gitarrenspielen.",note:"gern = с удовольствием"},
    {q:"Wie geht es dir? / Wie geht's?",tr:"Как у тебя дела?",   a:"Gut, und dir? / Na, ja, es geht so.",  note:"es geht so = так собі"},
    {q:"Wie alt bist du?",        tr:"Сколько тебе лет?",        a:"Ich bin 32 Jahre alt.",                note:"Jahre alt = років"},
  ]},
  {tag:"Beruf & Hobbys",col:C.orange,qa:[
    {q:"Was machen Sie hier in Berlin?",tr:"Что вы тут делаете?",    a:"Ich lerne Deutsch.",                   note:"machen = робити"},
    {q:"Ich spiele gern Fußball.", tr:"Я с удовольствием играю в футбол.",a:"— (рассказ о хобби)",          note:"gern + Verb = делать что-то с удовольствием"},
    {q:"Mein Hobby ist Gitarrenspielen.",tr:"Моё хобби — игра на гитаре.",a:"— (рассказ о хобби)",          note:"субстантивированный инфинитив"},
    {q:"Ich bin Gitarrenlehrer von Beruf.",tr:"Я учитель гитары по профессии.",a:"— (рассказ о себе)",   note:"von Beruf = по профессии"},
    {q:"Wie alt sind Sie?",       tr:"Сколько вам лет?",          a:"Ich bin 45 Jahre alt.",                note:"формально · Sie-Form"},
  ]},
  {tag:"Kontakt & Nationalität",col:C.purple,qa:[
    {q:"Wie ist Ihre Handynummer?",tr:"Какой ваш номер телефона?",  a:"Meine Nummer ist 0176 ...",             note:"формально · Ihre = ваш"},
    {q:"Wie ist deine Telefonnummer?",tr:"Какой твой номер телефона?",a:"Meine Nummer ist ...",               note:"неформально · deine = твоя"},
    {q:"Wie ist deine Adresse?",  tr:"Какой твой адрес?",           a:"Ich wohne in der Berliner Straße 12.", note:""},
    {q:"Welche Nationalität haben Sie?",tr:"Какая ваша национальность?",a:"Ich bin Ukrainer / Grieche.",      note:"без артикля после bin!"},
    {q:"Woher kommt er/sie?",     tr:"Откуда он/она?",            a:"Er/Sie kommt aus der Türkei.",         note:"aus der Türkei = з Туреччини"},
    {q:"Welche Sprache spricht sie?",tr:"Какой язык она знает?",     a:"Sie spricht Griechisch / Englisch.",   note:"sprechen = говорить"},
    {q:"Wer ist das?",            tr:"Кто это?",                     a:"Das ist Michael. Er kommt aus Frankreich.",note:"Das ist... = Це..."},
  ]},
  {tag:"Im Kursraum",col:C.yellow,qa:[
    {q:"Wie bitte?",              tr:"Простите, как? / Повторите, пожалуйста?", a:"— (просьба повторить)",                note:"вежливая просьба"},
    {q:"Wie schreibt man das?",   tr:"Как это пишется?",             a:"Man schreibt: S-T-U-H-L.",             note:"man = обобщённое 'мы/кто-то'"},
    {q:"Was ist das?",            tr:"Что это такое?",                 a:"Das ist ein Tisch. / Das ist eine Lampe.",note:""},
    {q:"Ist das ein Bett?",       tr:"Это кровать?",                   a:"Ja, das ist ein Bett. / Nein, das ist kein Bett.",note:"kein/keine = отрицание существительного"},
    {q:"Brauchst du eine Mikrowelle?",tr:"Тебе нужна микроволновка?",a:"Nein, ich brauche keine.",       note:"brauchen = нуждаться"},
    {q:"Hast du einen Fernseher?",tr:"У тебя есть телевизор?",         a:"Nein, ich habe keinen Fernseher.",     note:"keinen = kein + m Akkusativ"},
    {q:"Kauft sie einen Laptop?", tr:"Она покупает ноутбук?",          a:"Ja, sie kauft einen Laptop.",          note:"einen = m Akkusativ"},
  ]},
  {tag:"Wohnen & Etagen",col:C.green,qa:[
    {q:"Wie ist Ihre Wohnung?",   tr:"Какая у вас квартира?",        a:"Meine Wohnung ist klein, aber hell. / Sie ist ruhig und günstig.",note:"klein aber hell = маленькая, но светлая"},
    {q:"Wie viele Zimmer haben Sie?",tr:"Сколько у вас комнат?",      a:"Drei Zimmer, eine Küche und ein Bad.",note:"ein Bad = ванная комната"},
    {q:"Was kostet Ihre Wohnung?",tr:"Сколько стоит ваша квартира?",  a:"Sie kostet 950 Euro ohne Nebenkosten.",note:"ohne = без · Nebenkosten = коммуналка"},
    {q:"Wie finden Sie die Wohnung?",tr:"Как вам квартира?",          a:"Ich finde sie sehr gemütlich! / Sie ist klein und langweilig.",note:"finden = считать, находить · gemütlich = уютный"},
    {q:"Das Badezimmer ist furchtbar!",tr:"Ванная — это ужас!",       a:"Ja, das finde ich auch. Es ist dunkel!",note:"furchtbar = ужасный · es ist dunkel = там темно"},
    {q:"Wohnst du in einem Haus oder in einer Wohnung?",tr:"Ты живёшь в доме или в квартире?",a:"Ich wohne in einer Wohnung / in einem Haus.",note:"in einem (Dativ m/n) · in einer (Dativ f)"},
    {q:"Wohnst du in einem Mehrfamilienhaus oder in einem Einfamilienhaus?",tr:"Ты живёшь в многоквартирном или отдельном доме?",a:"Ich wohne in einem Mehrfamilienhaus.",note:"Mehrfamilienhaus = многоквартирный · Einfamilienhaus = отдельный дом"},
    {q:"Wie viele Stockwerke hat dein Haus?",tr:"Сколько этажей в твоём доме?",a:"Mein Haus hat drei Stockwerke.",note:"das Stockwerk = этаж · Stockwerke = этажи"},
    {q:"In welchem Stock wohnst du?",tr:"На каком этаже ты живёшь?",a:"Ich wohne im dritten Stock. / Im Erdgeschoss.",note:"in welchem = на каком (Dativ) · im = in dem"},
    {q:"Wo wohnen Sie?",          tr:"Где вы живёте?",               a:"Ich wohne im 2. Stock. / Im Erdgeschoss.",note:"im = in dem"},
    {q:"Wie groß ist Ihre Wohnung?",tr:"Какого размера ваша квартира?",a:"Wir haben eine 3-Zimmer-Wohnung. / 80 Quadratmeter.",note:"qm = Quadratmeter"},
    {q:"Ist die Wohnung ruhig?",  tr:"Квартира тихая?",              a:"Ja, sehr ruhig. / Es geht, nicht sehr ruhig.",note:"ruhig = тихий · es geht = так себе"},
    {q:"Haben Sie einen Balkon?", tr:"У вас есть балкон?",           a:"Ja, er ist schön groß. / Nein, wir haben keinen Balkon.",note:"er = der Balkon (m)"},
    {q:"Wie hoch ist die Miete?", tr:"Сколько стоит аренда?",        a:"850 Euro Miete plus 180 Euro Nebenkosten.",note:"NK = Nebenkosten"},
    {q:"Wer wohnt im ersten Stock?",tr:"Кто живёт на первом этаже?",a:"Die Familie Wang wohnt im ersten Stock.",note:"Dativ: im ersten/zweiten/dritten Stock"},
    {q:"Wo wohnt Frau Moska?",    tr:"Где живёт фрау Моска?",         a:"Sie wohnt im 2. Stock links.",         note:"links = слева · rechts = справа"},
    {q:"Ich wohne schon lange hier.",tr:"Я уже давно тут живу.",    a:"— (рассказ о себе)",               note:"schon lange = уже давно"},
    {q:"Ich bin neu hier im Haus.",tr:"Я недавно в этом доме.",a:"— (при знакомстве с соседями)",       note:"neu = новый / недавно"},
  ]},
];
const ADRESSE=[
  {art:"die",de:"Straße",ru:"улица",pl:"Straßen"},
  {art:"die",de:"Hausnummer",ru:"номер дома",pl:"Hausnummern"},
  {art:"die",de:"Postleitzahl",ru:"почтовый индекс",pl:"Postleitzahlen"},
  {art:"die",de:"Telefonnummer",ru:"номер телефона",pl:"Telefonnummern"},
  {art:"die",de:"Handynummer",ru:"номер мобильного",pl:"Handynummern"},
  {art:"die",de:"Vorwahl",ru:"код города",pl:"Vorwahlen"},
  {art:"die",de:"E-Mail-Adresse",ru:"эл. почта",pl:"E-Mail-Adressen"},
  {art:"der",de:"Vorname",ru:"имя",pl:"Vornamen"},
  {art:"der",de:"Familienname",ru:"фамилия",pl:"Familiennamen"},
  {art:"der",de:"Nachname",ru:"фамилия (разг.)",pl:"Nachnamen"},
];

// ─── KONJUGATION (L1 — ohne er/sie/es) ───────────────────────────────────────
const KONJ_L1={
  fragen: {ich:"frage",du:"fragst",wir:"fragen",ihr:"fragt","sie/Sie":"fragen"},
  heißen: {ich:"heiße",du:"heißt",wir:"heißen",ihr:"heißt","sie/Sie":"heißen"},
  kommen: {ich:"komme",du:"kommst",wir:"kommen",ihr:"kommt","sie/Sie":"kommen"},
  sein:   {ich:"bin",  du:"bist",  wir:"sind",  ihr:"seid", "sie/Sie":"sind"},
};
// ─── KONJUGATION (L2 — er/es/sie + Plural) — порядок как в книге ─────────────
const KONJ_L2={
  kommen:  {ich:"komme",du:"kommst","er/es/sie":"kommt",wir:"kommen",ihr:"kommt","sie/Sie":"kommen"},
  arbeiten:{ich:"arbeite",du:"arbeitest","er/es/sie":"arbeitet",wir:"arbeiten",ihr:"arbeitet","sie/Sie":"arbeiten"},
  sprechen:{ich:"spreche",du:"sprichst","er/es/sie":"spricht",wir:"sprechen",ihr:"sprecht","sie/Sie":"sprechen"},
  sein:    {ich:"bin",du:"bist","er/es/sie":"ist",wir:"sind",ihr:"seid","sie/Sie":"sind"},
  heißen:  {ich:"heiße",du:"heißt","er/es/sie":"heißt",wir:"heißen",ihr:"heißt","sie/Sie":"heißen"},
  lernen:  {ich:"lerne",du:"lernst","er/es/sie":"lernt",wir:"lernen",ihr:"lernt","sie/Sie":"lernen"},
  wohnen:  {ich:"wohne",du:"wohnst","er/es/sie":"wohnt",wir:"wohnen",ihr:"wohnt","sie/Sie":"wohnen"},
  machen:  {ich:"mache",du:"machst","er/es/sie":"macht",wir:"machen",ihr:"macht","sie/Sie":"machen"},
  suchen:  {ich:"suche",du:"suchst","er/es/sie":"sucht",wir:"suchen",ihr:"sucht","sie/Sie":"suchen"},
  leben:   {ich:"lebe",du:"lebst","er/es/sie":"lebt",wir:"leben",ihr:"lebt","sie/Sie":"leben"},
  lieben:  {ich:"liebe",du:"liebst","er/es/sie":"liebt",wir:"lieben",ihr:"liebt","sie/Sie":"lieben"},
  schicken:{ich:"schicke",du:"schickst","er/es/sie":"schickt",wir:"schicken",ihr:"schickt","sie/Sie":"schicken"},
};

// ─── DIALOG DATA ──────────────────────────────────────────────────────────────
const DIALOGE={
  L1:[
    {tag:"Основные",col:C.blue,pairs:[
      // Begrüßen
      {q:"Wie geht es Ihnen?",            a:"Danke, gut. Und Ihnen? / Auch gut, danke.", note:"Ihnen = Вам (Dativ)",              fm:"f"},
      {q:"Wie geht es dir? / Wie geht's?",a:"Gut, und dir? / Na ja, es geht so.",        note:"dir = тебе · es geht so = так себе", fm:"i"},
      // Vorstellen
      {q:"Wie heißen Sie?",               a:"Ich heiße … / Mein Name ist …",            note:"heißen = называться",               fm:"f"},
      {q:"Woher kommen Sie?",             a:"Ich komme aus der Ukraine.",                note:"aus der Ukraine · aus der Türkei",   fm:"f"},
      {q:"Wo wohnen Sie?",                a:"Ich wohne in Köln.",                        note:"",                                  fm:"f"},
      {q:"Was sind Sie von Beruf?",       a:"Ich bin Lehrer. / Ich bin Ärztin.",         note:"OHNE Artikel: nicht «ein Lehrer»!",  fm:"f"},
      {q:"Wie ist Ihre Handynummer?",     a:"Meine Nummer ist 0176235628.",              note:"Ihre = ваш",                         fm:"f"},
      {q:"Wie heißt du?",                 a:"Ich heiße … / Mein Name ist …",            note:"informell · du-Form",                fm:"i"},
      {q:"Woher kommst du?",              a:"Ich komme aus der Ukraine.",                note:"",                                  fm:"i"},
      {q:"Wo wohnst du?",                 a:"Ich wohne in Köln.",                        note:"",                                  fm:"i"},
      {q:"Was bist du von Beruf?",        a:"Ich bin Ingenieur. / Ich lerne Deutsch.",  note:"",                                   fm:"i"},
      {q:"Wie ist deine Handynummer?",    a:"Meine Nummer ist …",                        note:"deine = твоя",                      fm:"i"},
      // Phrases (Kommunikation)
      {q:"Guten Morgen! / Guten Tag! / Guten Abend!", a:"Guten Morgen! / Guten Tag! / Guten Abend!", note:"формально · по времени суток", fm:"f"},
      {q:"Hallo! / Guten Tag! / Guten Morgen!",       a:"Hallo! / Hey!",                note:"неформально",                        fm:"i"},
      {q:"Auf Wiedersehen!",              a:"Auf Wiedersehen!",                          note:"прощание формально",                 fm:"f"},
      {q:"Tschüss!",                      a:"Tschüss! / Bis bald!",                     note:"прощание неформально",               fm:"i"},
    ]},
    {tag:"Дополнительные",col:C.teal,pairs:[
      {q:"Wer ist das?",                  a:"Das ist Paolo Costa. / Das ist Manu.",     note:"Wer = Кто (для людей)"},
      {q:"Wie alt sind Sie? / Wie alt bist du?", a:"Ich bin 34 Jahre alt.",            note:"Jahre alt = лет"},
      {q:"Sind Sie neu hier?",            a:"Ja, ich bin neu hier. / Wir kommen aus Mannheim.", note:"p.17 Dialogtraining",        fm:"f"},
      {q:"Wie bitte?",                    a:"— (просьба повторить)",                   note:"вежливая просьба"},
      {q:"Wie schreibt man das?",         a:"Ich buchstabiere: K-L-Y-M-E-N-K-O",      note:"buchstabieren = произносить по буквам"},
      {q:"Danke! / Vielen Dank!",         a:"Bitte! / Bitte sehr! / Gern!",            note:"Vielen Dank = большое спасибо"},
      {q:"Freut mich! / Sehr angenehm!",  a:"Freut mich auch!",                        note:"при знакомстве"},
      {q:"Einen schönen Tag!",            a:"Danke, gleichfalls!",                     note:"gleichfalls = взаємно"},
      {q:"Ach so.",                       a:"— (реакция на новую информацию)",          note:"Ach so = А, понятно!"},
      {q:"Auf Wiederhören!",              a:"Auf Wiederhören!",                         note:"по телефону · hören = слышать"},
      {q:"Ich bin nicht berufstätig.",    a:"— (вариант ответа)",                      note:"berufstätig = работающий · Hausfrau = домохозяйка"},
      {q:"Moment, ich buchstabiere:",     a:"Ka-Ell-Üpsilon-Emm-Eh-Enn-Ka-Oh",        note:"Moment = подождите секунду"},
    ]},
  ],
  L2:[
    {tag:"Основные",col:C.blue,pairs:[
      // Adresse/Telefonnummer (Kommunikation стр.)
      {q:"Wie ist Ihre/deine Adresse?",              a:"Ich wohne in der Schillerstraße 18 in München. Die Postleitzahl ist 80331.", note:"PLZ = Postleitzahl = почтовый индекс"},
      {q:"Wie ist Ihre/deine Telefonnummer?",        a:"Meine Telefonnummer ist 040 41 09 861.",    note:"Цифры телефона читают попарно"},
      // Muttersprache/Nationalität (Kommunikation стр.)
      {q:"Welche Sprachen sprechen Sie / sprichst du?", a:"Ich spreche Deutsch und Ukrainisch.",   note:"sprechen = говорить · Sprache = язык"},
      {q:"Was ist Ihre/deine Nationalität?",         a:"Ich bin Ukrainer. / Ich bin Ukrainerin.",  note:"без артикля после bin!"},
      // nach Wörtern fragen (Kommunikation стр.)
      {q:"Was ist das?",                             a:"Das ist ein Tisch. / Das ist eine Tasche.", note:"ein (m/n) / eine (f)"},
      {q:"Wie heißt das auf Deutsch?",               a:"Das heißt Stuhl. / Das ist ein Stuhl.",    note:"Спросить немецкое название"},
      {q:"Wie ist der Artikel?",                     a:"Der Artikel ist der/das/die.",              note:"Спросить род слова"},
      {q:"Wie schreibt man das?",                    a:"Ich buchstabiere: S-T-U-H-L",              note:"buchstabieren = произносить по буквам"},
      // phrases
      {q:"Ich wohne in der Schillerstraße 18 in München.", a:"— (адрес)",                         note:"Die Postleitzahl ist ... = почтовый индекс"},
      {q:"Ich spreche ...",                          a:"Ich spreche Deutsch und Ukrainisch.",       note:"Muttersprache = родной язык"},
      {q:"Ich bin ...",                              a:"Ich bin Ukrainer. / Ich bin Spanier.",      note:"Nationalität — без артикля!"},
    ]},
    {tag:"Дополнительные",col:C.teal,pairs:[
      {q:"Haben Sie eine E-Mail-Adresse?",           a:"Ja, meine E-Mail ist name@gmx.de.",        note:"@ = ätt · . = Punkt · - = Bindestrich"},
      {q:"Was kostet das? / Wie viel kostet das?",   a:"Das kostet 20 Euro.",                      note:"kostet (ед.ч.) / kosten (мн.ч.)"},
      {q:"Das ist aber teuer! / Das ist aber billig!", a:"Ja! / Nein, das ist günstig.",           note:"teuer = дорого · billig/günstig = дёшево"},
      {q:"Wie ist Ihre Vorwahl?",                    a:"Meine Vorwahl ist 040.",                    note:"München 089 · Berlin 030 · Frankfurt 069"},
      {q:"Polizei / Feuerwehr — welche Nummer?",     a:"Polizei: 110 · Feuerwehr/Notruf: 112",    note:"Wichtige Nummern in Deutschland!"},
      {q:"Wo ist die Kita? / Ist der Platz noch frei?", a:"Die Kita ist in der Schillerstraße. / Ja, der Platz ist frei.", note:"Kita = детский сад · frei = свободный"},
      {q:"Wie viele Stühle sind im Kursraum?",       a:"Da sind zwanzig Stühle.",                 note:"wie viele = сколько · da/hier = там/здесь"},
      // phrases
      {q:"Auf Wiederhören!",                         a:"Auf Wiederhören!",                          note:"по телефону"},
      {q:"Das ist richtig! / Das ist kaputt.",       a:"Richtig! / Kaputt. / Schick!",             note:"richtig=правильно · kaputt=сломан · schick=стильно"},
    ]},
  ],
  L3:[
    {tag:"Основные",col:C.green,pairs:[
      // über Wohnungen und Möbel sprechen (Kommunikation стр.)
      {q:"Was kostet die Wohnung?",                  a:"500 Euro ohne Nebenkosten. / 400 Euro Warmmiete.", note:"ohne Nebenkosten = без коммунальных · Warmmiete = всё включено"},
      {q:"Wie viele Zimmer haben Sie?",              a:"Drei Zimmer und eine Küche und ein Badezimmer.", note:"wie viele = сколько"},
      // über Dinge sprechen (Kommunikation стр.)
      {q:"Ist das ein Tisch?",                       a:"Nein, das ist kein Tisch. Das ist eine Lampe.", note:"kein/keine = нет"},
      {q:"Wie findest du die Lampe?",                a:"Ich finde die Lampe elegant. / Super! / Nicht schön.", note:"finden = считать · Akkusativ: den Stuhl / die Lampe"},
      // phrases (Kommunikation стр.)
      {q:"Wir haben keinen Teppich.",                a:"Aber wir brauchen keinen Teppich.",         note:"keinen (m Akk.) · keine (f Akk.)"},
      {q:"Wir brauchen eine Spülmaschine.",          a:"— (нам нужна посудомойка)",                  note:"brauchen + Akkusativ"},
      {q:"Wirklich?",                                a:"Ja, wirklich! / Oh, klasse!",               note:"wirklich = правда? · klasse = здорово!"},
      {q:"Der Stuhl ist schön. Ich kaufe den Stuhl.", a:"— (Стул красивый. Я покупаю стул.)",       note:"Akkusativ: den Stuhl (m → den)"},
      {q:"Ich finde die Lampe elegant.",             a:"— (Я считаю лампу элегантной.)",            note:"finden + Akkusativ + Adjektiv"},
      {q:"Die Wohnung ist klein, aber sie ist hell und hat einen Balkon.", a:"— (описание квартиры)", note:"aber = но · hell = светлый · hat einen Balkon = есть балкон"},
      {q:"Ich habe eine 1-Zimmer-Wohnung. Sie ist 35 qm groß.", a:"— (описание квартиры)",         note:"qm = Quadratmeter · groß = большой/метражный"},
    ]},
    {tag:"Дополнительные",col:C.teal,pairs:[
      {q:"Was haben Sie in der Wohnung?",            a:"Ich habe einen Tisch, zwei Stühle und ein Regal.", note:"m Akkusativ: einen Tisch"},
      {q:"Was brauchen Sie noch?",                   a:"Ich brauche noch eine Lampe und einen Kühlschrank.", note:"brauchen = нуждаться · noch = ещё"},
      {q:"Wie finden Sie das Sofa?",                 a:"Sehr schön! / Toll! / Gemütlich. / Langweilig.", note:"😊 sehr schön/toll · 😐 okay · 😞 langweilig/hässlich"},
      {q:"Wie ist Ihre Wohnung?",                    a:"Meine Wohnung ist klein, aber hell. / Sie ist ruhig und günstig.", note:"aber = но · hell = светлый"},
      {q:"Wie hoch ist die Miete?",                  a:"Die Miete ist 800 Euro plus Nebenkosten.",  note:"Miete = аренда · Nebenkosten = коммуналка"},
      {q:"Wo wohnen Sie?",                           a:"Ich wohne im 2. Stock. / Im Erdgeschoss.",  note:"im = in dem · Erdgeschoss = первый этаж снизу"},
      {q:"Wo gibt es einen Laden?",                  a:"Es gibt einen Obst- und Gemüseladen im Erdgeschoss.", note:"es gibt + Akkusativ = есть/имеется"},
      {q:"Wollen Sie ein Doppelzimmer oder ein Einzelzimmer?", a:"Ein Doppelzimmer, bitte.",       note:"Doppelzimmer = двухм. · Einzelzimmer = одноместный"},
      {q:"Ist das dein Laptop?",                     a:"Ja, das ist mein Laptop. / Nein, das ist nicht mein Laptop.", note:"dein = твой · mein = мой"},
      // phrases
      {q:"Ich bin zu Hause.",                        a:"— (Я дома)",                                note:"zu Hause = дома (где?) ≠ nach Hause = домой (куда?)"},
      {q:"Ich gehe jetzt nach Hause.",               a:"— (Я иду домой)",                           note:"nach Hause = домой (движение)"},
      {q:"Das Badezimmer ist furchtbar!",            a:"Ja, das finde ich auch. Es ist dunkel!",    note:"furchtbar = ужасный · dunkel = тёмный"},
    ]},
  ],
  L4:[
    {tag:"Основные",col:C.teal,pairs:[
      // über die Familie sprechen — formell/informell (Kommunikation стр. L4)
      {q:"Wo wohnen Ihre Eltern?",      a:"Meine Eltern wohnen in Kyiv.",                     note:"Ihre (formell) = ваши · meine = мои",          fm:"f"},
      {q:"Wo wohnen deine Eltern?",     a:"Meine Eltern wohnen in Kyiv.",                     note:"deine (informell) = твои · meine = мои",        fm:"i"},
      {q:"Wo wohnt Ihre Familie?",      a:"Meine Familie wohnt in der Ukraine.",               note:"Ihre Familie (formell)",                         fm:"f"},
      {q:"Wo wohnt deine Familie?",     a:"Meine Familie wohnt in der Ukraine.",               note:"deine Familie (informell)",                      fm:"i"},
      {q:"Haben Sie Kinder?",           a:"Ja, ich habe zwei Kinder. / Nein, keine Kinder.",  note:"keine Kinder = нет детей (Akkusativ)",           fm:"f"},
      {q:"Hast du Kinder?",             a:"Ja, ich habe einen Sohn und eine Tochter.",        note:"einen Sohn (m Akk.) · eine Tochter (f Akk.)",   fm:"i"},
      {q:"Wie heißen Ihre Kinder?",     a:"Meine Tochter heißt Nina, mein Sohn heißt Max.",  note:"mein (m) · meine (f/pl)",                        fm:"f"},
      {q:"Wie heißen deine Kinder?",    a:"Meine Kinder heißen Nina und Max.",                note:"heißen (мн.ч.) · meine Kinder = мои дети",      fm:"i"},
      {q:"Ist Ihre Familie groß?",      a:"Ja, ich habe viele Verwandte. / Nein, sie ist klein.", note:"viele Verwandte = много родственников",     fm:"f"},
      {q:"Ist deine Familie groß?",     a:"Nein, ich habe nur einen Bruder.",                 note:"nur = только · einen Bruder (m Akk.)",           fm:"i"},
    ]},
    {tag:"Дополнительные",col:C.green,pairs:[
      {q:"Haben Sie Fotos dabei?",      a:"Ja, hier ist meine Schwester. / Nein, leider nicht.", note:"Fotos dabei haben = иметь фото при себе · leider nicht = к сожалению нет"},
      {q:"Ist das Ihr Mann?",           a:"Ja, das ist Thomas, mein Mann.",                   note:"Ihr Mann (formell) · ihr Mann (он — её муж)"},
      {q:"Ist das Ihre Frau?",          a:"Ja, das ist meine Frau und das ist sein Sohn.",    note:"meine Frau = моя жена · sein Sohn = его сын"},
      {q:"Er/Sie ist verheiratet?",     a:"Ja, er ist verheiratet und hat zwei Kinder.",      note:"verheiratet sein = быть женатым/замужней"},
      {q:"Das ist aber süß!",           a:"Ja! Er ist zwei Jahre alt.",                       note:"süß = милый · zwei Jahre alt = двух лет"},
      {q:"Wie groß ist Ihre Familie?",  a:"Meine Familie ist klein. Ich habe nur einen Bruder.", note:"Wie groß ist = насколько большая"},
      {q:"Wer ist das?",                a:"Das ist mein Freund Luka. Er kommt aus Kroatien.", note:"Wer = кто (для людей)"},
      {q:"Das ist mein Bruder.",        a:"— (представляю брата)",                            note:"mein (m/n) · meine (f/pl)"},
      {q:"Das ist seine Frau.",         a:"— (это его жена)",                                 note:"seine (f) → er hat eine Frau"},
      {q:"Das ist ihre Tochter.",       a:"— (это её дочь)",                                  note:"ihre (f) → sie hat eine Tochter"},
    ]},
  ],
};
const Box=({c,s={},children})=><div style={{background:c?c+"18":C.card,border:`1px solid ${c||C.border}`,borderRadius:14,padding:"14px 16px",...s}}>{children}</div>;
const Pill=({c,children})=><span style={{background:c+"22",border:`1px solid ${c}55`,color:c,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700,display:"inline-block"}}>{children}</span>;
const RuText=({ru,style={}})=>{
  if(!ru||!ru.includes("\n"))return <span style={style}>{ru}</span>;
  const[main,sub]=ru.split("\n");
  return <span style={style}>{main}<br/><span style={{fontSize:"0.85em",opacity:0.7}}>{sub}</span></span>;
};
const H=({c=C.text,z=15,children})=><div style={{fontWeight:800,fontSize:z,color:c,marginBottom:8}}>{children}</div>;
const Row=({children,style={}})=><div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,...style}}>{children}</div>;
const Dim=({children})=><span style={{color:C.muted,fontSize:14}}>{children}</span>;
const Val=({c=C.text,children})=><span style={{color:c,fontWeight:700,fontSize:14}}>{children}</span>;

function TabBar({tabs,active,onChange}){
  return(
    <div style={{display:"flex",gap:6,marginBottom:16,background:C.card2,borderRadius:12,padding:4}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)}
          style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",
            background:active===t.id?C.border:"transparent",
            color:active===t.id?C.text:C.muted,fontWeight:600,fontSize:12,cursor:"pointer"}}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

const btnSt=(col,bg,w="auto")=>({background:bg,border:`1px solid ${col}`,color:col,borderRadius:10,
  padding:"11px 20px",fontSize:14,fontWeight:700,cursor:"pointer",width:w});

// ═══════════════════════════ QUIZ ENGINE ══════════════════════════════════════
function Quiz({questions}){
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [log,setLog]=useState([]);
  const ex=questions[idx];
  const pick=(i)=>{if(sel!==null)return;setSel(i);if(i===ex.ans)setScore(s=>s+1);setLog(l=>[...l,i===ex.ans]);};
  const next=()=>{if(idx+1>=questions.length)setDone(true);else{setIdx(i=>i+1);setSel(null);}};
  const reset=()=>{setIdx(0);setSel(null);setScore(0);setDone(false);setLog([]);};
  if(done){
    const p=Math.round(score/questions.length*100);
    return(
      <div style={{textAlign:"center",padding:"24px 0"}}>
        <div style={{fontSize:52}}>{p===100?"🏆":p>=70?"👍":"💪"}</div>
        <div style={{fontSize:34,fontWeight:900,color:C.green,margin:"8px 0 4px"}}>{score}/{questions.length}</div>
        <div style={{color:C.muted,marginBottom:14}}>{p===100?"Идеально!":p>=70?"Отлично!":p>=50?"Повтори ещё":"Нужно повторить"}</div>
        <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:18}}>
          {log.map((r,i)=><span key={i} style={{width:10,height:10,borderRadius:"50%",background:r?C.green:C.red,display:"inline-block"}}/>)}
        </div>
        <button onClick={reset} style={btnSt(C.green,C.greenBg)}>🔄 Повторить</button>
      </div>
    );
  }
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{color:C.muted,fontSize:12}}>{idx+1}/{questions.length}</span>
        <span style={{color:C.green,fontSize:12}}>✓{score}</span>
      </div>
      <div style={{height:3,background:C.border,borderRadius:3,marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${idx/questions.length*100}%`,background:C.green,transition:"width .3s"}}/>
      </div>
      {ex.hint&&<div style={{marginBottom:8}}><Pill c={C.purple}>{ex.hint}</Pill></div>}
      <Box s={{marginBottom:12}}>
        <div style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:1.5,whiteSpace:"pre-line"}}>{ex.q}</div>
      </Box>
      <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:10}}>
        {ex.opts.map((o,i)=>{
          let bc=C.border,bg=C.card,tc=C.text;
          if(sel!==null){if(i===ex.ans){bc=C.green;bg=C.greenBg;tc=C.green;}else if(i===sel){bc=C.red;bg=C.redBg;tc=C.red;}}
          return(
            <button key={i} onClick={()=>pick(i)}
              style={{border:`1.5px solid ${bc}`,background:bg,color:tc,borderRadius:10,
                padding:"11px 14px",fontSize:14,fontWeight:500,cursor:"pointer",
                textAlign:"left",display:"flex",gap:10,alignItems:"center"}}>
              <span style={{width:23,height:23,borderRadius:6,background:"rgba(255,255,255,.04)",
                fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {["A","B","C","D"][i]}
              </span>{o}
            </button>
          );
        })}
      </div>
      {sel!==null&&ex.exp&&(
        <Box c={sel===ex.ans?C.green:C.red} s={{marginBottom:10}}>
          <span style={{color:sel===ex.ans?C.green:C.red,fontWeight:800}}>{sel===ex.ans?"✓ Richtig!  ":"✗ Falsch — "}</span>
          <span style={{color:C.text,fontSize:13}}>{ex.exp}</span>
        </Box>
      )}
      {sel!==null&&(
        <button onClick={next} style={{...btnSt(C.blue,C.blueBg),"width":"100%"}}>
          {idx+1>=questions.length?"Результат →":"Weiter →"}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════ EXERCISES ═══════════════════════════════════════

// ─── DIALOG CARDS ─────────────────────────────────────────────────────────────
function DialogCards({lId}){
  const groups=DIALOGE[lId]||[];
  const [mode,setMode]=useState("fragen");
  const [fm,setFm]=useState("f"); // formell/informell — только для L1
  const [openItems,setOpenItems]=useState(new Set());
  const togItem=(k)=>setOpenItems(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n;});

  const isL1=lId==="L1";
  // фильтр по fm: показываем пары без fm (оба) ИЛИ совпадающие с выбранным режимом
  const filterFm=(pairs)=>isL1?pairs.filter(p=>!p.fm||p.fm===fm):pairs;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <Box c={C.teal}>
        <H c={C.teal}>💬 Диалоговые фразы</H>
        <div style={{fontSize:13,color:C.muted}}>Нажми на вопрос — увидишь ответ. Список пополняется с каждым уроком.</div>
      </Box>

      {/* ── Formell / Informell тогл (только L1) ── */}
      {isL1&&(
        <div style={{display:"flex",gap:6,background:C.card2,borderRadius:12,padding:4}}>
          {[{id:"f",label:"🎩 Formell (Sie)"},{id:"i",label:"👋 Informell (du)"}].map(t=>(
            <button key={t.id} onClick={()=>{setFm(t.id);setOpenItems(new Set());}} style={{
              flex:1,padding:"8px 0",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
              background:fm===t.id?(t.id==="f"?C.blue:C.green):"transparent",
              color:fm===t.id?"#000":C.muted,transition:"all .15s"
            }}>{t.label}</button>
          ))}
        </div>
      )}

      <div style={{display:"flex",gap:6,background:C.card2,borderRadius:12,padding:4}}>
        {[{id:"fragen",label:"❓ Вопросы"},{id:"phrasen",label:"📋 Фразы"}].map(t=>(
          <button key={t.id} onClick={()=>setMode(t.id)} style={{
            flex:1,padding:"8px 0",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
            background:mode===t.id?C.teal:"transparent",
            color:mode===t.id?"#000":C.muted,transition:"all .15s"
          }}>{t.label}</button>
        ))}
      </div>

      {/* ══ ВОПРОСЫ ══ */}
      {mode==="fragen"&&groups.map((g,gi)=>{
        const items=filterFm(g.pairs).filter(p=>p.q.includes("?"));
        if(!items.length)return null;
        return(
          <div key={gi}>
            <div style={{marginBottom:8}}><Pill c={g.col}>{g.tag}</Pill></div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {items.map((p,pi)=>{
                const k=`${gi}-${pi}`;const isO=openItems.has(k);
                return(
                  <div key={pi} onClick={()=>togItem(k)}
                    style={{background:C.card,border:`1.5px solid ${isO?g.col:C.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer"}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                      <div style={{fontWeight:600,fontSize:14,color:C.text,flex:1,lineHeight:1.4}}>❓ {p.q}</div>
                      <span style={{color:C.muted,fontSize:14,flexShrink:0}}>{isO?"▲":"▼"}</span>
                    </div>
                    {isO&&(
                      <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                        <div style={{background:g.col+"15",border:`1px solid ${g.col}40`,borderRadius:8,padding:"10px 12px",marginBottom:p.note?8:0}}>
                          <div style={{fontSize:11,color:g.col,fontWeight:700,marginBottom:3}}>ОТВЕТ</div>
                          <div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.a}</div>
                        </div>
                        {p.note&&<div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,padding:"6px 10px",fontSize:12,color:C.yellow}}>💡 {p.note}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ══ ФРАЗЫ — плоский список ══ */}
      {mode==="phrasen"&&(()=>{
        const all=groups.flatMap((g)=>filterFm(g.pairs).filter(p=>!p.q.includes("?")).map(p=>({...p,col:g.col})));
        if(!all.length)return <div style={{color:C.muted,fontSize:13,textAlign:"center",padding:20}}>Нет фраз</div>;
        return(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
            {all.map((p,pi)=>(
              <div key={pi} style={{padding:"10px 14px",borderBottom:pi<all.length-1?`1px solid ${C.border}30`:"none"}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>{p.q}</div>
                <div style={{fontSize:12,color:p.col,marginBottom:p.note?3:0}}>↩ {p.a}</div>
                {p.note&&<div style={{fontSize:11,color:C.dim,marginTop:2}}>📝 {p.note}</div>}
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ─── ALPHABET TRAINER ─────────────────────────────────────────────────────────
function AlphabetTrainer(){
  const [mode,setMode]=useState("table");
  const [qs]=useState(()=>shuffle(ALPHABET.slice(0,26)).slice(0,12).map(a=>{
    const wrong=shuffle(ALPHABET.filter(x=>x.l!==a.l)).slice(0,3);
    const opts=shuffle([a.n,...wrong.map(x=>x.n)]);
    return{q:`Как называется буква «${a.l}»?`,opts,ans:opts.indexOf(a.n),hint:"Buchstaben"};
  }));
  return(
    <div>
      <TabBar tabs={[{id:"table",label:"📋 Таблица"},{id:"quiz",label:"🎯 Тест"}]} active={mode} onChange={setMode}/>
      {mode==="table"?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
          {ALPHABET.map(a=>(
            <div key={a.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:18,color:C.blue}}>{a.l}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{a.n}</div>
            </div>
          ))}
        </div>
      ):<Quiz questions={qs}/>}
    </div>
  );
}

// ─── ZAHLEN TRAINER (0–20) ────────────────────────────────────────────────────
function ZahlenTrainer20(){
  const [mode,setMode]=useState("table");
  const [qs]=useState(()=>shuffle(Z20).map(z=>{
    const wrong=shuffle(Z20.filter(x=>x.n!==z.n)).slice(0,3).map(x=>x.w);
    const opts=shuffle([z.w,...wrong]);
    return{q:`Как по-немецки: ${z.n}?`,opts,ans:opts.indexOf(z.w),hint:"Zahlen"};
  }));
  return(
    <div>
      <TabBar tabs={[{id:"table",label:"📋 Таблица"},{id:"quiz",label:"🎯 Тест"}]} active={mode} onChange={setMode}/>
      {mode==="table"?(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {Z20.map(z=>(
            <div key={z.n} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:22,color:C.orange}}>{z.n}</div>
              <div style={{fontSize:13,color:C.text,marginTop:3}}>{z.w}</div>
            </div>
          ))}
        </div>
      ):<Quiz questions={qs}/>}
    </div>
  );
}

// ─── ZAHLEN TRAINER (20–1000) ─────────────────────────────────────────────────
function ZahlenTrainer1000(){
  const ZEHNER=[
    {n:20,w:"zwanzig"},{n:30,w:"dreißig"},{n:40,w:"vierzig"},{n:50,w:"fünfzig"},
    {n:60,w:"sechzig"},{n:70,w:"siebzig"},{n:80,w:"achtzig"},{n:90,w:"neunzig"},
    {n:100,w:"(ein)hundert"},{n:200,w:"zweihundert"},{n:1000,w:"(ein)tausend"},
  ];
  const [mode,setMode]=useState("table");
  const [qs]=useState(()=>{
    const items=[
      {n:21,w:"einundzwanzig"},{n:22,w:"zweiundzwanzig"},{n:25,w:"fünfundzwanzig"},
      {n:30,w:"dreißig"},{n:33,w:"dreiunddreißig"},{n:40,w:"vierzig"},
      {n:45,w:"fünfundvierzig"},{n:50,w:"fünfzig"},{n:60,w:"sechzig"},
      {n:70,w:"siebzig"},{n:80,w:"achtzig"},{n:90,w:"neunzig"},
      {n:100,w:"hundert"},{n:101,w:"hunderteins"},{n:200,w:"zweihundert"},
      {n:372,w:"dreihundertzweiundsiebzig"},{n:1000,w:"tausend"},
    ];
    return shuffle(items).slice(0,10).map(z=>{
      const wrong=shuffle(items.filter(x=>x.n!==z.n)).slice(0,3).map(x=>x.w);
      const opts=shuffle([z.w,...wrong]);
      return{q:`Как по-немецки: ${z.n}?`,opts,ans:opts.indexOf(z.w),hint:"Zahlen"};
    });
  });
  return(
    <div>
      <TabBar tabs={[{id:"table",label:"📋 Таблица"},{id:"quiz",label:"🎯 Тест"}]} active={mode} onChange={setMode}/>
      {mode==="table"?(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Box c={C.yellow}>
            <H c={C.yellow} z={14}>📌 Правило составных чисел</H>
            <div style={{fontSize:14,color:C.text,lineHeight:1.8}}>
              <b style={{color:C.orange}}>единицы + und + десятки</b><br/>
              45 = fünf<b style={{color:C.orange}}>und</b>vierzig<br/>
              21 = ein<b style={{color:C.orange}}>und</b>zwanzig (не zwei!)<br/>
              <span style={{color:C.muted,fontSize:12}}>⚠️ dreißig (не dreizig!) — особое написание</span>
            </div>
          </Box>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {ZEHNER.map(z=>(
              <div key={z.n} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontWeight:900,fontSize:20,color:C.orange}}>{z.n}</span>
                <span style={{fontSize:13,color:C.text}}>{z.w}</span>
              </div>
            ))}
          </div>
          <Box c={C.red} s={{marginTop:8}}>
            <H c={C.red} z={13}>🚨 Wichtige Nummern</H>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["Polizei","110","Полиция"],["Feuerwehr / Notruf","112","Пожарные / Скорая"]].map(([n,num,ru])=>(
                <div key={n} style={{background:C.redBg,border:`1px solid ${C.red}`,borderRadius:10,padding:"10px",textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:24,color:C.red}}>{num}</div>
                  <div style={{fontSize:12,color:C.text,marginTop:3}}>{n}</div>
                  <div style={{fontSize:11,color:C.muted}}>{ru}</div>
                </div>
              ))}
            </div>
          </Box>
          <Box c={C.blue} s={{marginTop:8}}>
            <H c={C.blue} z={13}>📞 Ländervorwahlen</H>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              {[["Deutschland","+49","9"],["Österreich","+43","43"],["Schweiz","+41","41"],["München","089",""],["Berlin","030",""],["Frankfurt","069",""]].map(([n,v,l])=>(
                <div key={n} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px",textAlign:"center"}}>
                  <div style={{fontWeight:800,fontSize:16,color:C.blue}}>{v}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>{n}</div>
                </div>
              ))}
            </div>
          </Box>
          <Box c={C.green} s={{marginTop:8}}>
            <H c={C.green} z={13}>➕ Математика по-немецки</H>
            <div style={{fontSize:14,color:C.text,lineHeight:2}}>
              <b style={{color:C.green}}>plus</b> (+)     <b style={{color:C.red}}>minus</b> (-)     <b style={{color:C.yellow}}>ist / gleich</b> (=)<br/>
              17 <b style={{color:C.green}}>plus</b> 3 <b style={{color:C.yellow}}>ist</b> zwanzig.<br/>
              33 <b style={{color:C.red}}>minus</b> 10 <b style={{color:C.yellow}}>ist</b> dreiundzwanzig.
            </div>
          </Box>
        </div>
      ):<Quiz questions={qs}/>}
    </div>
  );
}

// ─── WÖRTERBUCH ───────────────────────────────────────────────────────────────
function getPluralEnd(de,pl){
  if(!pl||pl==="—")return["—",""];
  // Нормализуем только умлауты (НЕ ß→ss — иначе длина сдвигается!)
  const n=s=>s.toLowerCase().replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u");
  const nd=n(de),np=n(pl);
  let i=0;
  while(i<nd.length&&i<np.length&&nd[i]===np[i])i++;
  return[pl.slice(0,i),pl.slice(i)];
}

function BewertungBlock(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:8,padding:"8px 8px 4px"}}>
      <div style={{fontSize:11,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:1,padding:"0 0 4px"}}>Bewertung — Оценка</div>
      {BEWERTUNG.map(group=>(
        <div key={group.e} style={{background:group.col+"12",border:`1px solid ${group.col}30`,borderRadius:10,overflow:"hidden"}}>
          <div style={{background:group.col+"22",padding:"5px 10px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:18}}>{group.e}</span>
            <span style={{fontSize:12,color:group.col,fontWeight:700}}>{group.label}</span>
          </div>
          {group.words.map(w=>(
            <div key={w.de} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,padding:"6px 10px",borderBottom:`1px solid ${group.col}15`}}>
              <span style={{fontSize:13,color:C.text,fontWeight:600}}>{w.de}</span>
              <span style={{fontSize:12,color:C.muted}}>{w.ru}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AbkBlock({standalone}){
  const ABK=[
    {short:"Zi.",     full:"Zimmer",           ru:"комната"},
    {short:"Zi.-Whg.",full:"Zimmer-Wohnung",   ru:"комнатная квартира"},
    {short:"Whg.",    full:"Wohnung",           ru:"квартира"},
    {short:"EFH",     full:"Einfamilienhaus",   ru:"отдельный дом"},
    {short:"EBK",     full:"Einbauküche",       ru:"встроенная кухня"},
    {short:"ZH",      full:"Zentralheizung",    ru:"центральное отопление"},
    {short:"NK",      full:"Nebenkosten",       ru:"коммунальные платежи"},
    {short:"qm",      full:"Quadratmeter",      ru:"квадратный метр"},
    {short:"Kü",      full:"Küche",             ru:"кухня"},
    {short:"WC",      full:"WC / Toilette",     ru:"туалет"},
    {short:"EG",      full:"Erdgeschoss",       ru:"0-й этаж, цоколь"},
    {short:"OG",      full:"Obergeschoss",      ru:"верхний этаж"},
    {short:"incl.",   full:"inklusive NK",      ru:"включая комм. платежи"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.blue}>
        <H c={C.blue}>📋 Abkürzungen in Wohnungsanzeigen</H>
        <div style={{fontSize:12,color:C.muted,marginBottom:10}}>Сокращения в объявлениях об аренде — упр. 22</div>
        <div style={{background:C.card2,borderRadius:10,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:0}}>
            {["Кратко","Полностью","Перевод"].map(h=>(
              <div key={h} style={{fontSize:10,color:C.dim,fontWeight:700,padding:"6px 10px",background:C.card2,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
            ))}
            {ABK.map(({short,full,ru},i)=>[
              <div key={short+"s"} style={{padding:"7px 10px",borderTop:`1px solid ${C.border}33`,fontWeight:800,fontSize:13,color:C.blue,background:i%2===0?C.card:"transparent"}}>{short}</div>,
              <div key={short+"f"} style={{padding:"7px 10px",borderTop:`1px solid ${C.border}33`,fontSize:13,color:C.text,background:i%2===0?C.card:"transparent"}}>{full}</div>,
              <div key={short+"r"} style={{padding:"7px 10px",borderTop:`1px solid ${C.border}33`,fontSize:12,color:C.muted,background:i%2===0?C.card:"transparent"}}>{ru}</div>,
            ])}
          </div>
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>📰 Пример объявления</H>
        <div style={{background:C.card2,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.text,lineHeight:1.9}}>
          <b style={{color:C.blue}}>3 Zi.-Whg.</b>, 80 <b style={{color:C.blue}}>qm</b>, <b style={{color:C.blue}}>EBK</b>, Bad, <b style={{color:C.blue}}>ZH</b>,<br/>
          ruhige Lage, 850 € + 180 € <b style={{color:C.blue}}>NK</b><br/>
          <span style={{color:C.muted,fontSize:11}}>= 3-комнатная квартира, 80 кв.м, встр. кухня, ванная, центр. отопление, тихое место, 850€ + 180€ коммунальные</span>
        </div>
      </Box>
    </div>
  );
}

function WbRegeln(){
  const [open,setOpen]=useState(false);
  return(
    <div style={{marginBottom:10}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,
          padding:"9px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
        <span style={{fontWeight:700,fontSize:13,color:C.yellow}}>📌 Правила: артикли & окончания множ. числа</span>
        <span style={{color:C.muted,fontSize:13}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginTop:4,
          display:"flex",flexDirection:"column",gap:12}}>

          {/* Артикли */}
          <div>
            <div style={{fontWeight:700,fontSize:12,color:C.yellow,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
              🏷️ Как узнать артикль по окончанию слова
            </div>
            {[
              {art:"der",col:C.blue,tips:[
                "-er → der Lehrer, der Wecker",
                "-ling → der Frühling, der Lehrling",
                "-or → der Motor, der Doktor",
                "Дни недели, месяцы, сезоны",
                "Мужчины, профессии м.р.",
              ]},
              {art:"die",col:C.purple,tips:[
                "-ung → die Wohnung, die Zeitung",
                "-heit/-keit → die Freiheit, die Möglichkeit",
                "-schaft → die Mannschaft",
                "-tät → die Universität, die Nationalität",
                "-ion → die Station, die Lektion",
                "-ie → die Energie, die Familie",
                "-ik → die Musik, die Physik",
                "Женщины, профессии ж.р. (-in)",
              ]},
              {art:"das",col:C.orange,tips:[
                "-chen/-lein → das Mädchen, das Häuslein",
                "-ment → das Apartment, das Instrument",
                "-tum → das Datum, das Zentrum",
                "-um → das Museum, das Stadium",
                "Глаголы как сущ. → das Lernen, das Essen",
              ]},
            ].map(({art,col,tips})=>(
              <div key={art} style={{background:col+"12",border:`1px solid ${col}30`,borderRadius:8,padding:"8px 10px",marginBottom:6}}>
                <div style={{background:col+"22",border:`1px solid ${col}55`,color:col,borderRadius:6,
                  padding:"2px 8px",fontWeight:800,fontSize:13,display:"inline-block",marginBottom:6}}>{art}</div>
                {tips.map(t=>{
                  const parts=t.split(" → ");
                  const isEnding=parts.length===2&&parts[0].startsWith("-");
                  return(
                    <div key={t} style={{fontSize:12,color:C.muted,marginBottom:3,display:"flex",alignItems:"baseline",gap:4,flexWrap:"wrap"}}>
                      <span>•</span>
                      {isEnding?(
                        <>
                          <span style={{background:col+"30",border:`1px solid ${col}60`,color:col,
                            borderRadius:4,padding:"0px 5px",fontWeight:800,fontSize:12,fontFamily:"monospace"}}>
                            {parts[0]}
                          </span>
                          <span style={{color:C.dim}}>→</span>
                          <span style={{color:C.muted}}>{parts[1]}</span>
                        </>
                      ):(
                        <span>{t}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Окончания мн.числа */}
          <div>
            <div style={{fontWeight:700,fontSize:12,color:C.yellow,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>
              📋 Типы окончаний множественного числа
            </div>
            {[
              {tp:"-e",  col:C.blue,  ex:"Tisch→Tisch e, Heft→Heft e",     tip:"Много m и n слов"},
              {tp:'"-e', col:C.purple,ex:"Stuhl→Stühl e, Stadt→Städt e",   tip:"+e и умлаут (a→ä, u→ü, o→ö)"},
              {tp:"-n",  col:C.green, ex:"Lampe→Lampe n, Straße→Straße n", tip:"Слово на -e → просто +n"},
              {tp:"-en", col:C.teal,  ex:"Uhr→Uhr en, Tür→Tür en",         tip:"Не на -e → +en"},
              {tp:"—",   col:C.yellow,ex:"Fenster→Fenster, Spiegel→Spiegel",tip:"Без изменений (чаще -er, -en)"},
              {tp:"-s",  col:C.orange,ex:"Handy→Handy s, Hotel→Hotel s",    tip:"Иностранные слова"},
              {tp:'"-er',col:C.red,   ex:"Buch→Büch er, Haus→Häus er",     tip:"+er и умлаут"},
            ].map(({tp,col,ex,tip})=>(
              <div key={tp} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
                <span style={{background:col+"22",border:`1px solid ${col}55`,color:col,
                  borderRadius:6,padding:"2px 9px",fontWeight:900,fontSize:12,flexShrink:0,minWidth:36,textAlign:"center"}}>{tp}</span>
                <div>
                  <div style={{fontSize:12,color:C.text}}>{ex}</div>
                  <div style={{fontSize:11,color:C.muted}}>{tip}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

function Woerterbuch(){
  const TEMEN=[
    {id:"all",      label:"Все",           col:C.teal},
    {id:"Kursraum", label:"🏫 Kursraum",   col:C.blue},
    {id:"Alltag",   label:"🛒 Alltag",     col:C.red},
    {id:"Möbel",    label:"🛋️ Möbel",     col:C.orange},
    {id:"Bad",      label:"🚿 Bad",         col:C.purple},
    {id:"Wohnung",  label:"🏠 Wohnung",    col:C.green},
    {id:"Adjektive",label:"🎨 Adjektive",  col:C.red},
    {id:"Phrase",   label:"💬 Фразы",      col:C.teal},
  ];
  const TYPEN=[
    {id:"recent",  label:"🆕 Последние", col:C.green},
    {id:"all",     label:"Все",           col:C.teal},
    {id:"Nomen",   label:"📦 Nomen",      col:C.blue},
    {id:"Adjektiv",label:"🎨 Adjektiv",   col:C.red},
    {id:"Phrase",  label:"💬 Фразы",      col:C.teal},
  ];
  const [typ,setTyp]=useState("recent");
  const [tema,setTema]=useState("all");
  const [art,setArt]=useState("all");
  const [search,setSearch]=useState("");
  const [sortNew,setSortNew]=useState(true);

  // при смене типа сбрасываем тему
  const changeTyp=(t)=>{setTyp(t);setTema("all");setArt("all");};

  const typFilter=(w)=>{
    if(typ==="recent")  return true; // фильтруем отдельно ниже
    if(typ==="Nomen")   return w.art!=="";
    if(typ==="Adjektiv")return w.tema==="Adjektive";
    if(typ==="Phrase")  return w.tema==="Phrase";
    return true;
  };

  const RECENT_COUNT=WBDATA.length;
  const recentBase=sortNew?[...WBDATA].reverse():[...WBDATA];
  const recentWords=search
    ?recentBase.filter(w=>w.de.toLowerCase().includes(search.toLowerCase())||w.ru.toLowerCase().includes(search.toLowerCase()))
    :recentBase;

  // Доступные темы для текущего типа
  const availableTemen=TEMEN.filter(t=>{
    if(t.id==="all")return true;
    if(typ==="Nomen")   return !["Adjektive","Phrase"].includes(t.id);
    if(typ==="Adjektiv")return t.id==="Adjektive";
    if(typ==="Phrase")  return t.id==="Phrase";
    return true;
  });

  const listRaw=WBDATA.map((w,i)=>({...w,_i:i})).filter(w=>
    typFilter(w)&&
    (tema==="all"||w.tema===tema)&&
    (art==="all"||w.art===art)&&
    (!search||w.de.toLowerCase().includes(search.toLowerCase())||w.ru.toLowerCase().includes(search.toLowerCase()))
  );
  const list=sortNew?[...listRaw].reverse():listRaw;

  const temenOrder=sortNew?[...TEMEN.slice(1)].reverse():TEMEN.slice(1);
  const groups=tema==="all"
    ?temenOrder.map(t=>({...t,words:list.filter(w=>w.tema===t.id)})).filter(g=>g.words.length>0)
    :[{id:tema,words:list,col:TEMEN.find(t=>t.id===tema)?.col||C.teal}];

  const oppMap={};
  const oppTransMap={};
  const bWords=new Set();
  ADJEKTIV_PAARE.forEach(p=>{
    if(p.a&&p.b){
      oppMap[p.a]=p.b; oppMap[p.b]=p.a;
      bWords.add(p.b);
    }
    if(p.a&&p.ra) oppTransMap[p.a]=p.ra;
    if(p.b&&p.rb) oppTransMap[p.b]=p.rb;
  });

  // убираем дубли: всегда показываем слово 'a' из пары, пропускаем 'b'
  const dedupeAdj=(words,noDedup=false)=>{
    if(noDedup)return words;
    return words.filter(w=>{
      if(w.art!=="")return true;
      return !bWords.has(w.de);
    });
  };

  const WRow=({w})=>{
    const[stem,end]=getPluralEnd(w.de,w.pl);
    const isAdj=w.art==="";
    const opposite=isAdj?oppMap[w.de]:null;
    const oppRu=opposite?oppTransMap[opposite]:null;
    if(w.tema==="Phrase")return(
      <div style={{padding:"8px 10px",borderBottom:`1px solid ${C.border}22`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <span style={{fontSize:13,color:C.teal,fontWeight:600,fontStyle:"italic"}}>{w.de}</span>
        <span style={{fontSize:12,color:C.muted,textAlign:"right"}}>{w.ru}</span>
      </div>
    );
    return(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,
        padding:"7px 8px",borderBottom:`1px solid ${C.border}22`,alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          {w.art&&<span style={{background:AB(w.art),border:`1px solid ${AC(w.art)}55`,color:AC(w.art),
            borderRadius:5,padding:"1px 5px",fontWeight:800,fontSize:11,flexShrink:0}}>{w.art}</span>}
          <span style={{fontSize:13,color:C.text,fontWeight:600}}>{w.de}</span>
        </div>
        <div style={{fontSize:13}}>
          {isAdj&&opposite
            ?<span style={{color:C.orange,fontWeight:700}}>≠ {opposite}</span>
            :end===""
              ?<span style={{color:C.muted}}>{stem||w.pl}</span>
              :<><span style={{color:C.muted}}>{stem}</span><span style={{color:C.green,fontWeight:800}}>{end}</span></>
          }
        </div>
        <div style={{fontSize:12,lineHeight:1.3,overflowWrap:"break-word",wordBreak:"break-word"}}>
          {isAdj
            ?<><span style={{color:C.text}}>{w.ru}</span>{oppRu&&<span style={{color:C.orange}}> / {oppRu}</span>}</>
            :<RuText ru={w.ru} style={{color:C.muted}}/>
          }
        </div>
      </div>
    );
  };

  const AdjPaare=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {ADJEKTIV_PAARE.map((p,i)=>(
        <div key={p.a} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",
          gap:4,padding:"7px 8px",borderBottom:`1px solid ${C.border}22`,alignItems:"center"}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:700,fontSize:13,color:C.text}}>{p.a}</div>
            <div style={{fontSize:11,color:C.muted}}>{p.ra}</div>
          </div>
          <div style={{color:C.border,fontSize:12,padding:"0 4px"}}>↔</div>
          <div style={{textAlign:"left"}}>
            {p.b
              ?<><div style={{fontWeight:700,fontSize:13,color:C.text}}>{p.b}</div>
                 <div style={{fontSize:11,color:C.muted}}>{p.rb}</div></>
              :<div style={{color:C.dim,fontSize:12}}>—</div>
            }
          </div>
        </div>
      ))}
    </div>
  );

  const showArtFilter=typ==="all"||typ==="Nomen";
  const isAdj=typ==="Adjektiv"||(tema==="Adjektive"&&typ==="all");

  return(
    <div>
      <WbRegeln/>
      {/* ── Тип: Все / Nomen / Adjektiv / Фразы ── */}
      <div style={{display:"flex",gap:5,marginBottom:8}}>
        {TYPEN.map(t=>(
          <button key={t.id} onClick={()=>changeTyp(t.id)}
            style={{flex:1,padding:"6px 4px",borderRadius:9,fontWeight:700,fontSize:12,cursor:"pointer",
              border:`1.5px solid ${typ===t.id?t.col:C.border}`,
              background:typ===t.id?t.col+"22":C.card,
              color:typ===t.id?t.col:C.muted,whiteSpace:"nowrap"}}>
            {t.label}
          </button>
        ))}
      </div>
      {/* ── Поиск ── */}
      <div style={{position:"relative",marginBottom:8}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск: Tisch, стол..."
          style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:10,
            padding:"9px 12px 9px 36px",color:C.text,fontSize:14,boxSizing:"border-box",outline:"none"}}/>
      </div>
      {/* ── Фильтр по теме (скрываем в recent) ── */}
      {typ!=="recent"&&(
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:8,scrollbarWidth:"none"}}>
        {availableTemen.map(t=>(
          <button key={t.id} onClick={()=>setTema(t.id)}
            style={{flexShrink:0,padding:"5px 12px",borderRadius:20,fontWeight:600,fontSize:12,cursor:"pointer",
              border:`1.5px solid ${tema===t.id?t.col:C.border}`,
              background:tema===t.id?t.col+"22":C.card,
              color:tema===t.id?t.col:C.muted,whiteSpace:"nowrap"}}>
            {t.label}
          </button>
        ))}
      </div>
      )}
      {/* ── Фильтр der/die/das (только для Nomen/Все) ── */}
      {showArtFilter&&typ!=="recent"&&(
        <div style={{display:"flex",gap:5,marginBottom:8,alignItems:"center"}}>
          {["all","der","die","das"].map(f=>(
            <button key={f} onClick={()=>setArt(f)}
              style={{flex:1,padding:"5px",borderRadius:9,fontWeight:700,fontSize:12,cursor:"pointer",
                border:`1.5px solid ${art===f?(f==="all"?C.teal:AC(f)):C.border}`,
                background:art===f?(f==="all"?C.tealBg:AB(f)):C.card,
                color:art===f?(f==="all"?C.teal:AC(f)):C.muted}}>
              {f==="all"?"Все":f}
            </button>
          ))}
        </div>
      )}
      {/* ── Сортировка (всегда) ── */}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
        <button onClick={()=>setSortNew(s=>!s)}
          style={{padding:"5px 12px",borderRadius:9,fontWeight:600,fontSize:12,cursor:"pointer",
            border:`1.5px solid ${C.border}`,background:sortNew?C.yellowBg:C.card,
            color:sortNew?C.yellow:C.muted,whiteSpace:"nowrap"}}>
          {sortNew?"🆕 Новые":"🕐 Старые"}
        </button>
      </div>
      {/* ── Заголовок колонок ── */}
      {!isAdj&&typ!=="Phrase"&&typ!=="recent"&&!search&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:"4px 8px",marginBottom:2}}>
          {["Singular","Plural","Перевод"].map(h=>(
            <div key={h} style={{fontSize:10,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
          ))}
        </div>
      )}

      {/* ══ ПОСЛЕДНИЕ ══ */}
      {typ==="recent"&&(
        <div style={{background:C.card,border:`1px solid ${C.green}35`,borderRadius:12,overflow:"hidden"}}>
          <div style={{background:C.green+"15",padding:"8px 12px",borderBottom:`1px solid ${C.green}25`}}>
            <span style={{fontSize:12,color:C.green,fontWeight:700}}>🆕 Все слова · новые сначала</span>
            <span style={{fontSize:11,color:C.dim,marginLeft:8}}>{WBDATA.length} слов</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:"4px 8px"}}>
            {["Singular","Plural","Перевод"].map(h=>(
              <div key={h} style={{fontSize:10,color:C.dim,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
            ))}
          </div>
          {dedupeAdj(recentWords,!!search).map((w,i)=><WRow key={w.de+w.tema+i} w={w}/>)}
        </div>
      )}
      {typ!=="recent"&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
        {groups.map(g=>(
          <div key={g.id} style={{background:C.card,border:`1px solid ${g.col}35`,borderRadius:12,overflow:"hidden"}}>
            {(tema==="all")&&(
              <div style={{background:g.col+"15",padding:"6px 10px",borderBottom:`1px solid ${g.col}25`}}>
                <span style={{fontSize:12,color:g.col,fontWeight:700}}>{TEMEN.find(t=>t.id===g.id)?.label}</span>
                <span style={{fontSize:11,color:C.dim,marginLeft:8}}>{g.words.length} слов</span>
              </div>
            )}
            {g.id==="Adjektive"&&!search
              ?<><AdjPaare/><BewertungBlock/></>
              :dedupeAdj(g.words,!!search).map((w,i)=><WRow key={w.de+w.tema+i} w={w}/>)
            }
          </div>
        ))}
      </div>}
      <div style={{fontSize:11,color:C.dim,textAlign:"center",marginTop:10}}>{list.length} слов</div>
    </div>
  );
}
// ─── FLASHCARDS ───────────────────────────────────────────────────────────────
function Flashcards(){
  const [words]=useState(()=>shuffle(VOCAB));
  const [idx,setIdx]=useState(0);
  const [flip,setFlip]=useState(false);
  const [known,setKnown]=useState(new Set());
  const w=words[idx];
  const move=(ok)=>{if(ok)setKnown(k=>new Set([...k,idx]));setFlip(false);setTimeout(()=>setIdx(i=>(i+1)%words.length),180);};
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{color:C.muted,fontSize:13}}>{idx+1}/{words.length} · <span style={{color:C.green}}>✓{known.size}</span></span>
        <button onClick={()=>{setIdx(0);setFlip(false);setKnown(new Set());}} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"3px 10px",fontSize:12,cursor:"pointer"}}>Сначала</button>
      </div>
      <div onClick={()=>setFlip(f=>!f)} style={{background:C.card,border:`2px solid ${flip?AC(w.art):C.border}`,borderRadius:16,minHeight:190,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",userSelect:"none",textAlign:"center",padding:20,marginBottom:12}}>
        {!flip?(<><div style={{fontSize:12,color:C.dim,marginBottom:12}}>👆 нажми</div><div style={{fontSize:36,fontWeight:900,color:C.text}}>{w.de}</div><div style={{fontSize:12,color:C.dim,marginTop:6}}>die {w.pl}</div></>)
        :(<><div style={{fontSize:28,fontWeight:900,color:AC(w.art),marginBottom:4}}>{w.art}</div><div style={{fontSize:26,fontWeight:800,color:C.text,marginBottom:6}}>{w.de}</div><div style={{fontSize:18,color:C.muted,marginBottom:8}}><RuText ru={w.ru}/></div><Pill c={C.yellow}>{w.pt}</Pill></>)}
      </div>
      {flip&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <button onClick={()=>move(false)} style={btnSt(C.red,C.redBg,"100%")}>✗ Не знаю</button>
        <button onClick={()=>move(true)} style={btnSt(C.green,C.greenBg,"100%")}>✓ Знаю!</button>
      </div>}
    </div>
  );
}

// ─── ARTIKEL TRAINER ─────────────────────────────────────────────────────────
function ArtikelTrainer(){
  const [words]=useState(()=>shuffle(VOCAB));
  const [idx,setIdx]=useState(0);
  const [sc,setSc]=useState(0);
  const [wr,setWr]=useState(0);
  const [flash,setFlash]=useState(null);
  const [done,setDone]=useState(false);
  const w=words[idx];
  const hit=(art)=>{
    if(flash)return;
    art===w.art?setSc(s=>s+1):setWr(s=>s+1);
    setFlash(art===w.art?"ok":"fail");
    setTimeout(()=>{setFlash(null);idx+1>=words.length?setDone(true):setIdx(i=>i+1);},700);
  };
  if(done)return(<div style={{textAlign:"center",padding:"24px 0"}}>
    <div style={{fontSize:52}}>{wr===0?"🏆":sc>=20?"👍":"💪"}</div>
    <div style={{fontSize:30,fontWeight:900,color:C.green}}>{sc}/{words.length}</div>
    <div style={{color:C.muted,marginBottom:16}}>Ошибок: {wr}</div>
    <button onClick={()=>{setIdx(0);setSc(0);setWr(0);setDone(false);setFlash(null);}} style={btnSt(C.green,C.greenBg)}>Ещё раз</button>
  </div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
      <span style={{color:C.muted,fontSize:13}}>{idx+1}/{words.length}</span>
      <span><span style={{color:C.green,fontSize:13}}>✓{sc}</span> <span style={{color:C.red,fontSize:13}}>✗{wr}</span></span>
    </div>
    <Box s={{minHeight:150,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",marginBottom:16,border:`2px solid ${flash==="ok"?C.green:flash==="fail"?C.red:C.border}`}}>
      <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Какой артикль?</div>
      <div style={{fontSize:34,fontWeight:900,color:C.text}}>{w.de}</div>
      <div style={{fontSize:13,color:C.muted,marginTop:4}}>{w.ru}</div>
      {flash==="fail"&&<div style={{color:C.red,fontSize:13,marginTop:8}}>Правильно: <b style={{color:AC(w.art)}}>{w.art}</b></div>}
      {flash==="ok"&&<div style={{fontSize:20,marginTop:6}}>✓</div>}
    </Box>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {["der","die","das"].map(a=>(
        <button key={a} onClick={()=>hit(a)} style={{border:`2px solid ${AC(a)}`,background:AB(a),color:AC(a),borderRadius:12,padding:"16px 4px",fontSize:20,fontWeight:900,cursor:"pointer"}}>{a}</button>
      ))}
    </div>
  </div>);
}

// ─── PLURAL QUIZ ─────────────────────────────────────────────────────────────
function PluralQuiz(){
  const [qs]=useState(()=>{
    const ends=["e","en","n","s","er","—"];
    const mk=(w)=>{const r=new Set();for(const e of shuffle(ends)){const f=e==="—"?w.de:w.de+e;if(f!==w.pl)r.add(`die ${f}`);if(r.size>=3)break;}r.add(`die ${w.de}en`);return [...r].slice(0,3);};
    return shuffle(VOCAB.map(w=>{const opts=shuffle([`die ${w.pl}`,...mk(w)]);return{q:`${w.art} ${w.de}  (${w.ru})\n→ Множественное число?`,opts,ans:opts.indexOf(`die ${w.pl}`),exp:`die ${w.pl}  [${w.pt}]`,hint:"Plural"};})).slice(0,14);
  });
  return <Quiz questions={qs}/>;
}

// ─── SENTENCE BUILDER ─────────────────────────────────────────────────────────
function SentenceBuilder(){
  const SENTS=[
    {w:["Das","ist","eine","Tasche","."],ru:"Это сумка."},
    {w:["Das","Buch","kostet","8","Euro","."],ru:"Книга стоит 8 евро."},
    {w:["Ich","komme","aus","der","Ukraine","."],ru:"Я из Украины."},
    {w:["Die","Stühle","sind","kaputt","."],ru:"Стулья сломаны."},
    {w:["Die","Taschen","kosten","30","Euro","."],ru:"Сумки стоят 30 евро."},
    {w:["Wie","heißen","Sie","?"],ru:"Как вас зовут?"},
    {w:["Ich","bin","Ukrainer","."],ru:"Я украинец."},
    {w:["Er","kommt","aus","der","Türkei","."],ru:"Он из Турции."},
    {w:["Was","sind","Sie","von","Beruf","?"],ru:"Кем вы работаете?"},
    {w:["Meine","Handynummer","ist","0176","."],ru:"Мой номер 0176."},
  ];
  const [idx,setIdx]=useState(0);
  const [chosen,setChosen]=useState([]);
  const [avail,setAvail]=useState(()=>shuffle(SENTS[0].w.filter(x=>x!=="."&&x!=="?")));
  const [res,setRes]=useState(null);
  const [sc,setSc]=useState(0);
  const [done,setDone]=useState(false);
  const s=SENTS[idx];
  const tgt=s.w.filter(x=>x!=="."&&x!=="?");
  const pick=(word,i)=>{if(res)return;setChosen(c=>[...c,word]);setAvail(a=>a.filter((_,j)=>j!==i));};
  const unpick=(i)=>{if(res)return;const w=chosen[i];setChosen(c=>c.filter((_,j)=>j!==i));setAvail(a=>[...a,w]);};
  const check=()=>{const ok=chosen.join(" ")===tgt.join(" ");if(ok)setSc(s=>s+1);setRes(ok?"ok":"fail");};
  const next=()=>{if(idx+1>=SENTS.length){setDone(true);return;}const ni=idx+1;setIdx(ni);setChosen([]);setAvail(shuffle(SENTS[ni].w.filter(x=>x!=="."&&x!=="?")));setRes(null);};
  if(done)return(<div style={{textAlign:"center",padding:"24px 0"}}>
    <div style={{fontSize:52}}>{sc>=8?"🏆":sc>=5?"👍":"💪"}</div>
    <div style={{fontSize:30,fontWeight:900,color:C.green}}>{sc}/{SENTS.length}</div>
    <button onClick={()=>{setIdx(0);setChosen([]);setAvail(shuffle(SENTS[0].w.filter(x=>x!=="."&&x!=="?")));setRes(null);setSc(0);setDone(false);}} style={{...btnSt(C.green,C.greenBg),marginTop:16}}>Повторить</button>
  </div>);
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
      <span style={{color:C.muted,fontSize:13}}>{idx+1}/{SENTS.length}</span>
      <span style={{color:C.green,fontSize:13}}>✓{sc}</span>
    </div>
    <Box c={C.yellow} s={{marginBottom:12}}>
      <div style={{fontSize:12,color:C.muted,marginBottom:3}}>Составь предложение:</div>
      <div style={{fontSize:16,fontWeight:700,color:C.yellow}}>{s.ru}</div>
    </Box>
    <div style={{minHeight:50,background:C.card,border:`1.5px solid ${res==="ok"?C.green:res==="fail"?C.red:C.blue}`,borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
      {chosen.length===0?<span style={{color:C.dim,fontSize:13}}>Нажимай слова снизу...</span>
       :chosen.map((w,i)=><button key={i} onClick={()=>unpick(i)} style={{background:C.blueBg,border:`1px solid ${C.blue}`,color:C.blue,borderRadius:8,padding:"5px 11px",fontSize:14,cursor:"pointer"}}>{w}</button>)}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
      {avail.map((w,i)=><button key={i} onClick={()=>pick(w,i)} style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"7px 13px",fontSize:14,cursor:"pointer"}}>{w}</button>)}
    </div>
    {res&&<Box c={res==="ok"?C.green:C.red} s={{marginBottom:10}}>{res==="ok"?<span style={{color:C.green,fontWeight:800}}>✓ Richtig!</span>:<span style={{color:C.red,fontWeight:800}}>✗ Правильно: <b style={{color:C.text}}>{tgt.join(" ")}.</b></span>}</Box>}
    {!res&&chosen.length===tgt.length&&<button onClick={check} style={{...btnSt(C.yellow,C.yellowBg),width:"100%"}}>Проверить ✓</button>}
    {res&&<button onClick={next} style={{...btnSt(C.blue,C.blueBg),width:"100%"}}>{idx+1>=SENTS.length?"Результат →":"Weiter →"}</button>}
  </div>);
}

// ─── ADRESSE TRAINER ─────────────────────────────────────────────────────────
function AdresseTrainer(){
  const [mode,setMode]=useState("table");
  const [qs]=useState(()=>shuffle([
    {q:"Как сказать 'почтовый индекс'?",opts:["die Vorwahl","die Postleitzahl","die Hausnummer","die Telefonnummer"],ans:1,hint:"Adresse"},
    {q:"Как сказать 'код города'?",opts:["die Telefonnummer","die Postleitzahl","die Vorwahl","die Handynummer"],ans:2,hint:"Adresse"},
    {q:"Артикль слова 'Vorname' (имя)?",opts:["die","das","der","ein"],ans:2,exp:"der Vorname",hint:"Adresse"},
    {q:"Как читают @ по-немецки?",opts:["at","arroba","ätt","email"],ans:2,exp:"@ = ätt",hint:"Adresse"},
    {q:"Wie ist Ihre ___? → Meine Adresse ist...",opts:["Vorname","Adresse","Beruf","Nationalität"],ans:1,hint:"Adresse"},
    {q:"Полный адрес по-немецки — какой порядок?",opts:["Hausnummer, Straße, PLZ, Stadt","Straße Hausnummer, PLZ Stadt","Stadt, Straße, PLZ","PLZ, Straße, Hausnummer"],ans:1,exp:"Juliusstraße 15, 22769 Hamburg",hint:"Adresse"},
    {q:"'Mein Kind ist zwei Jahre alt.' — сколько лет ребёнку?",opts:["12","20","2","22"],ans:2,hint:"Adresse"},
    {q:"Auf Wiederhören! — это...",opts:["До свидания (лично)","До свидания (по телефону)","Пока","Добрый день"],ans:1,exp:"Auf Wiederhören = До свидания по телефону",hint:"Adresse"},
  ]));
  return(
    <div>
      <TabBar tabs={[{id:"table",label:"📋 Таблица"},{id:"quiz",label:"🎯 Тест"}]} active={mode} onChange={setMode}/>
      {mode==="table"?(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {ADRESSE.map(a=>(
            <div key={a.de} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",display:"flex",gap:10,alignItems:"center"}}>
              <span style={{background:AB(a.art),border:`1px solid ${AC(a.art)}`,color:AC(a.art),borderRadius:7,padding:"2px 8px",fontWeight:800,fontSize:13,flexShrink:0}}>{a.art}</span>
              <span style={{fontWeight:700,color:C.text,flex:1}}>{a.de}</span>
              <span style={{color:C.muted,fontSize:13}}>{a.ru}</span>
            </div>
          ))}
          <Box c={C.yellow}>
            <H c={C.yellow} z={13}>📧 E-Mail lesen</H>
            <div style={{fontSize:13,color:C.text,lineHeight:1.9}}>
              kita-regenbogen@gmx.de читается:<br/>
              <b style={{color:C.blue}}>kita bindestrich regenbogen ätt ge em ix <span style={{color:C.orange}}>punkt</span> de e</b><br/>
              <span style={{color:C.muted,fontSize:12}}>@ = <b style={{color:C.green}}>ätt</b>  ·  . = <b style={{color:C.orange}}>Punkt</b>  ·  - = <b style={{color:C.muted}}>Bindestrich</b></span>
            </div>
          </Box>
          <Box c={C.blue}>
            <H c={C.blue} z={13}>📋 Пример адреса</H>
            <div style={{fontSize:13,color:C.text,lineHeight:1.9}}>
              Thomas Schulz<br/>
              Juliusstraße <b style={{color:C.orange}}>15</b><br/>
              <b style={{color:C.orange}}>22769</b> Hamburg
            </div>
          </Box>
        </div>
      ):<Quiz questions={qs}/>}
    </div>
  );
}

// ═══════════════════════════ THEORY PAGES ════════════════════════════════════

function T1A(){return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Box c={C.blue}>
      <H c={C.blue}>👋 Begrüßung — Приветствия</H>
      {[["Guten Morgen","Доброе утро","до ~11:00"],["Guten Tag","Добрый день","~11:00–18:00"],["Guten Abend","Добрый вечер","после 18:00"],["Hallo","Привет","неформально"],].map(([de,ru,note])=>(
        <div key={de} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
          <span style={{fontWeight:700,fontSize:14,color:C.blue,minWidth:120}}>{de}</span>
          <span style={{color:C.text,fontSize:13,flex:1}}>{ru}</span>
          <span style={{color:C.muted,fontSize:11}}>{note}</span>
        </div>
      ))}
    </Box>
    <Box c={C.purple}>
      <H c={C.purple}>🙋 Sich vorstellen — Знакомство</H>
      {[["Ich heiße Vitalii.","Меня зовут Виталий."],["Mein Name ist Klymenko.","Моя фамилия Клименко."],["Ich komme aus der Ukraine.","Я из Украины."],["Ich bin neu hier im Haus.","Я здесь новый (в доме)."],["Ich wohne schon lange hier.","Я уже давно здесь живу."],].map(([de,ru])=>(
        <div key={de} style={{background:C.card2,borderRadius:8,padding:"8px 10px",marginBottom:6}}>
          <div style={{fontWeight:600,fontSize:13,color:C.text,marginBottom:2}}>{de}</div>
          <div style={{fontSize:12,color:C.muted}}>{ru}</div>
        </div>
      ))}
    </Box>
    <Box c={C.yellow}>
      <H c={C.yellow} z={13}>💡 Ich heiße vs Ich bin</H>
      <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
        <b style={{color:C.blue}}>Ich heiße</b> Vitalii. — Меня зовут (буквально: я называюсь)<br/>
        <b style={{color:C.orange}}>Ich bin</b> Vitalii. — Я есть Виталий (= я представляюсь)<br/>
        Оба варианта правильны при знакомстве!
      </div>
    </Box>
  </div>
);}

function T1B(){return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Box c={C.blue}>
      <H c={C.blue}>🔤 Das Alphabet</H>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5,marginBottom:10}}>
        {ALPHABET.map(a=>(
          <div key={a.l} style={{background:C.card2,borderRadius:8,padding:"7px 4px",textAlign:"center"}}>
            <div style={{fontWeight:900,fontSize:18,color:C.blue}}>{a.l}</div>
            <div style={{fontSize:10,color:C.muted}}>{a.n}</div>
          </div>
        ))}
      </div>
    </Box>
    <Box c={C.purple}>
      <H c={C.purple}>🇩🇪 Umlaute und Eszett</H>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[["Ä","A-Umlaut","звучит как «э»"],["Ö","O-Umlaut","«ё» с округлёнными губами"],["Ü","U-Umlaut","«ю» с округлёнными губами"],["ß","Eszett","долгое «сс»: heißen, Straße"]].map(([l,n,d])=>(
          <div key={l} style={{background:C.card2,borderRadius:10,padding:"10px"}}>
            <div style={{fontWeight:900,fontSize:24,color:C.purple}}>{l}</div>
            <div style={{fontSize:12,color:C.text,fontWeight:600}}>{n}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{d}</div>
          </div>
        ))}
      </div>
    </Box>
    <Box c={C.yellow}>
      <H c={C.yellow} z={13}>✍️ Buchstabieren — Как произносить по буквам</H>
      <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
        <b>Wie schreibt man das?</b> — Как это пишется?<br/>
        <b>Ich buchstabiere:</b> — Я произнесу по буквам:<br/>
        K-L-Y-M-E-N-K-O → Ka-Ell-Üpsilon-Emm-Eh-Enn-Ka-Oh
      </div>
    </Box>
  </div>
);}

function T1C(){
  const verbs=Object.keys(KONJ_L1);
  const [sel,setSel]=useState("kommen");
  const c=KONJ_L1[sel];
  const rows=[["ich",c.ich],["wir",c.wir],["du",c.du],["ihr",c.ihr],["sie/Sie",c["sie/Sie"]]];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.blue}>
        <H c={C.blue}>💬 Formell (Sie) vs Informell (du)</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
          <div style={{background:C.blueBg,border:`1px solid ${C.blue}`,borderRadius:10,padding:"10px"}}>
            <div style={{color:C.blue,fontWeight:800,fontSize:13,marginBottom:6}}>Formell — Sie</div>
            {[["Frau + Familienname","Frau Schneider"],["Herr + Familienname","Herr Klein"],["Sie (с большой буквы)","= Вы"]].map(([k,v])=>(
              <div key={k} style={{fontSize:12,color:C.text,marginBottom:3}}><span style={{color:C.muted}}>{k}:</span> {v}</div>
            ))}
          </div>
          <div style={{background:C.greenBg,border:`1px solid ${C.green}`,borderRadius:10,padding:"10px"}}>
            <div style={{color:C.green,fontWeight:800,fontSize:13,marginBottom:6}}>Informell — du</div>
            {[["Vorname","Mario, Laura"],["du (с маленькой)","= ты"],["mit Freunden","с друзьями"]].map(([k,v])=>(
              <div key={k} style={{fontSize:12,color:C.text,marginBottom:3}}><span style={{color:C.muted}}>{k}:</span> {v}</div>
            ))}
          </div>
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow}>📝 Verben im Präsens (L1)</H>
        <div style={{fontSize:12,color:C.muted,marginBottom:10}}>⚠️ В Lektion 1 изучаем без формы er/sie/es — она появится в Lektion 2</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {verbs.map(v=>(
            <button key={v} onClick={()=>setSel(v)} style={{padding:"6px 12px",borderRadius:10,border:`1px solid ${sel===v?C.blue:C.border}`,background:sel===v?C.blueBg:C.card,color:sel===v?C.blue:C.muted,fontWeight:600,fontSize:13,cursor:"pointer"}}>{v}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {rows.map(([p,f])=>(
            <div key={p} style={{background:C.card2,borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{p}</div>
              <div style={{color:C.text,fontWeight:700,fontSize:15}}>{f}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>💡 Ich auch / Ich nicht</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
          Wir lernen Deutsch. → Ich lerne <b style={{color:C.green}}>auch</b> Deutsch.<br/>
          Ich komme aus Marokko. → Ich komme <b style={{color:C.red}}>nicht</b> aus Marokko.
        </div>
      </Box>
    </div>
  );
}

function T1D(){return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Box c={C.orange}>
      <H c={C.orange}>🔢 Zahlen 0–20</H>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
        {Z20.map(z=>(
          <div key={z.n} style={{background:C.card2,borderRadius:8,padding:"8px",textAlign:"center"}}>
            <div style={{fontWeight:900,fontSize:20,color:C.orange}}>{z.n}</div>
            <div style={{fontSize:12,color:C.text,marginTop:2}}>{z.w}</div>
          </div>
        ))}
      </div>
    </Box>
    <Box c={C.blue}>
      <H c={C.blue} z={13}>📱 Handynummer — как называть цифры</H>
      <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
        Цифры называют <b>по одной</b> или парами:<br/>
        0176 458910 → null eins sieben sechs / vier fünf acht neun eins null<br/>
        <span style={{color:C.muted}}>⚠️ По телефону: <b style={{color:C.orange}}>zwo</b> вместо zwei (чтобы не путать с drei)</span>
      </div>
    </Box>
  </div>
);}

function T1E(){return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Box c={C.yellow}>
      <H c={C.yellow}>💡 Главное правило</H>
      <div style={{fontSize:14,color:C.text,lineHeight:1.8}}>
        Ich bin <b style={{color:C.green}}>Ingenieur</b>. ✓<br/>
        Ich bin <b style={{color:C.red}}>ein Ingenieur</b>. ✗ (без артикля!)<br/>
        <span style={{color:C.muted,fontSize:12}}>После sein + профессия — артикль не используется</span>
      </div>
    </Box>
    <Box>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
        {["m 👨","f 👩","Bedeutung"].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
      </div>
      {BERUFE.map(b=>(
        <div key={b.m} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:5}}>
          <div style={{background:C.card2,borderRadius:8,padding:"7px 10px",fontSize:13,color:C.text}}>{b.m}</div>
          <div style={{background:C.card2,borderRadius:8,padding:"7px 10px",fontSize:13,color:C.purple}}>{b.f}</div>
          <div style={{background:C.card2,borderRadius:8,padding:"7px 10px",fontSize:12,color:C.muted}}>{b.ru}</div>
        </div>
      ))}
    </Box>
    <Box c={C.blue}>
      <H c={C.blue} z={13}>➕ Правило образования f-формы</H>
      <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
        m-форма + <b style={{color:C.green}}>-in</b> = f-форма<br/>
        Arzt → Ärz<b style={{color:C.green}}>t</b>in (+ умлаут)<br/>
        Elektriker → Elektrikerin
      </div>
    </Box>
  </div>
);}

function T2A(){
  const verbs=Object.keys(KONJ_L2);
  const [sel,setSel]=useState("kommen");
  const c=KONJ_L2[sel];
  const rows=[["ich",c.ich],["du",c.du],["er/es/sie",c["er/es/sie"]],["wir",c.wir],["ihr",c.ihr],["sie/Sie",c["sie/Sie"]]];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.green}>
        <H c={C.green}>🆕 Новое в L2: er / sie / es</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
          В Lektion 1 мы изучали без третьего лица. Теперь добавляется <b style={{color:C.green}}>er/sie/es</b> (он/она/оно).<br/>
          Окончание: обычно <b style={{color:C.green}}>-t</b> → komm<b style={{color:C.green}}>t</b>, lern<b style={{color:C.green}}>t</b>
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow}>📝 Verben im Präsens (L2 — полная таблица)</H>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {verbs.map(v=>(
            <button key={v} onClick={()=>setSel(v)} style={{padding:"6px 12px",borderRadius:10,border:`1px solid ${sel===v?C.blue:C.border}`,background:sel===v?C.blueBg:C.card,color:sel===v?C.blue:C.muted,fontWeight:600,fontSize:13,cursor:"pointer"}}>{v}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[["ich",c.ich],["wir",c.wir],["du",c.du],["ihr",c.ihr],["er/es/sie",c["er/es/sie"]],["sie/Sie",c["sie/Sie"]]].map(([p,f])=>(
            <div key={p} style={{background:p==="er/es/sie"?C.greenBg:C.card2,border:p==="er/es/sie"?`1px solid ${C.green}40`:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:11,color:p==="er/es/sie"?C.green:C.muted,marginBottom:2}}>{p}</div>
              <div style={{color:p==="er/es/sie"?C.green:C.text,fontWeight:700,fontSize:15}}>{f}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box>
        <H c={C.text} z={14}>🌍 Nationalitäten</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:6}}>
          {["Land","m","f","Sprache"].map(h=><div key={h} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {NATS.map(n=>(
          <div key={n.land} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:4}}>
            <div style={{background:C.card2,borderRadius:7,padding:"5px 7px",fontSize:12,color:C.blue}}>{n.land}{n.art&&<span style={{color:C.muted,fontSize:10}}> ({n.art})</span>}</div>
            <div style={{background:C.card2,borderRadius:7,padding:"5px 7px",fontSize:12,color:C.text}}>{n.m}</div>
            <div style={{background:C.card2,borderRadius:7,padding:"5px 7px",fontSize:12,color:C.purple}}>{n.f}</div>
            <div style={{background:C.card2,borderRadius:7,padding:"5px 7px",fontSize:11,color:C.muted}}>{n.spr}</div>
          </div>
        ))}
        <Box c={C.yellow} s={{marginTop:8}}>
          <div style={{fontSize:12,color:C.yellow}}>⚠️ Страны с артиклем: <b>aus DER Ukraine</b>, <b>aus DER Türkei</b></div>
        </Box>
      </Box>
    </div>
  );
}

function T2B(){return(
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    <Box c={C.teal}>
      <H c={C.teal}>📋 Nomen und Artikel</H>
      <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr",gap:6,marginBottom:6}}>
        {["","bestimmter Artikel","unbestimmter Artikel"].map((h,i)=>(
          <div key={i} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>
        ))}
      </div>
      {[
        {l:"m",term:"maskulin",def:"der",defEx:"der Mann",indef:"ein",indefEx:"ein Mann",col:C.blue,bg:C.blueBg},
        {l:"n",term:"neutral", def:"das",defEx:"das Kind",indef:"ein",indefEx:"ein Kind",col:C.orange,bg:C.orangeBg},
        {l:"f",term:"feminin", def:"die",defEx:"die Frau",indef:"eine",indefEx:"eine Frau",col:C.purple,bg:C.purpleBg},
        {l:"Pl.",term:"Plural",def:"die",defEx:"die Stühle",indef:"–",indefEx:"– Stühle",col:C.green,bg:C.greenBg},
      ].map(({l,term,def,defEx,indef,indefEx,col,bg})=>(
        <div key={l} style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr",gap:6,marginBottom:7,alignItems:"center"}}>
          <div style={{background:col+"22",border:`1px solid ${col}55`,borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
            <div style={{color:col,fontWeight:900,fontSize:14}}>{l}</div>
            <div style={{color:col,fontSize:9,opacity:.8}}>{term}</div>
          </div>
          <div style={{background:bg,border:`1px solid ${col}`,borderRadius:8,padding:"7px 10px"}}>
            <div style={{color:col,fontWeight:900,fontSize:16}}>{def}</div>
            <div style={{color:C.muted,fontSize:11}}>{defEx}</div>
          </div>
          <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 10px"}}>
            <div style={{color:col,fontWeight:900,fontSize:16}}>{indef}</div>
            <div style={{color:C.muted,fontSize:11}}>{indefEx}</div>
          </div>
        </div>
      ))}
      <Box c={C.yellow} s={{marginTop:4}}>
        <div style={{fontSize:13,color:C.text}}>
          Das ist <b style={{color:C.orange}}>eine</b> Tasche. <b style={{color:C.blue}}>Die</b> Tasche ist schick.<br/>
          <span style={{color:C.muted,fontSize:12}}>unbestimmt (впервые) → bestimmt (уже знаем)</span>
        </div>
      </Box>
    </Box>
    <Box c={C.orange}>
      <H c={C.orange}>📚 Plural — типы окончаний</H>
      {[
        {tp:"-e",col:C.blue,ex:"Tisch→Tische, Heft→Hefte",w:"Просто +e"},
        {tp:'"-e',col:C.purple,ex:"Stuhl→Stühle",w:"+e и умлаут (a→ä, u→ü, o→ö)"},
        {tp:"-n",col:C.green,ex:"Lampe→Lampen, Tasche→Taschen",w:"Слово на -e → просто +n"},
        {tp:"-en",col:C.teal,ex:"Uhr→Uhren, Tür→Türen",w:"Слово не на -e → +en"},
        {tp:"—",col:C.yellow,ex:"Fenster→Fenster, Schlüssel→Schlüssel",w:"Без изменений"},
        {tp:"-s",col:C.orange,ex:"Handy→Handys, Laptop→Laptops",w:"Иностранные слова"},
        {tp:'"-er',col:C.red,ex:"Buch→Bücher",w:"+er и умлаут"},
      ].map(({tp,col,ex,w})=>(
        <div key={tp} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}>
          <span style={{background:col+"22",border:`1px solid ${col}55`,color:col,borderRadius:8,padding:"3px 10px",fontWeight:900,fontSize:13,flexShrink:0,whiteSpace:"nowrap"}}>{tp}</span>
          <div><div style={{fontSize:12,color:C.muted,marginBottom:1}}>{w}</div><div style={{fontSize:12,color:col}}>{ex}</div></div>
        </div>
      ))}
    </Box>
  </div>
);}

function TGross(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>📝 Großschreibung — заглавные буквы</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>В немецком заглавные буквы используются чаще, чем в русском!</div>
      </Box>
      {[
        {rule:"Начало предложения",col:C.blue,ex:["Wie heißen Sie?","Ich komme aus Berlin."],note:"Всегда с большой буквы"},
        {rule:"Имена и фамилии",col:C.purple,ex:["Julia Meier","Hans Weber","Vitalii Klymenko"],note:"Vorname + Familienname — всегда с большой"},
        {rule:"Географические названия",col:C.green,ex:["Berlin","Deutschland","Europa","die Ukraine"],note:"Города, страны, континенты"},
        {rule:"Официальное Sie/Ihnen/Ihr",col:C.orange,ex:["Wie heißen Sie?","Danke, Ihnen.","Wie ist Ihre Adresse?"],note:"Sie/Ihnen/Ihr в официальном обращении — всегда с большой!"},
        {rule:"Все существительные (Nomen)",col:C.red,ex:["der Beruf","die Telefonnummer","das Haus","ein Lehrer"],note:"ЛЮБОЕ слово с артиклем = с большой буквы. Это главное отличие от русского!"},
      ].map(({rule,col,ex,note})=>(
        <div key={rule} style={{background:C.card,border:`1.5px solid ${col}35`,borderRadius:12,padding:"12px 14px"}}>
          <div style={{color:col,fontWeight:700,fontSize:14,marginBottom:6}}>📌 {rule}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:6}}>
            {ex.map(e=><Pill key={e} c={col}>{e}</Pill>)}
          </div>
          <div style={{fontSize:12,color:C.yellow,background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:7,padding:"4px 8px"}}>
            💡 {note}
          </div>
        </div>
      ))}
      <Box c={C.blue}>
        <H c={C.blue} z={13}>⚠️ Частая ошибка</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
          ✗ <span style={{color:C.red}}>wie heißen sie und woher kommen sie?</span><br/>
          ✓ <span style={{color:C.green}}>Wie heißen <b>S</b>ie und woher kommen <b>S</b>ie?</span><br/>
          ✓ <span style={{color:C.green}}>Ich heiße <b>C</b>lara <b>B</b>ai. Ich wohne in <b>M</b>ünchen.</span>
        </div>
      </Box>
    </div>
  );
}

function TAbkuerzungen(){
  const ab=[
    {ab:"Pl.",full:"Plural",ru:"множественное число"},
    {ab:"m.",full:"maskulin (männlich)",ru:"мужской род"},
    {ab:"f.",full:"feminin (weiblich)",ru:"женский род"},
    {ab:"n.",full:"neutral (sächlich)",ru:"средний род"},
    {ab:"Tel.",full:"Telefonnummer",ru:"номер телефона"},
    {ab:"Nr.",full:"Nummer",ru:"номер"},
    {ab:"€",full:"Euro",ru:"евро"},
    {ab:"Str.",full:"Straße",ru:"улица"},
    {ab:"PLZ",full:"Postleitzahl",ru:"почтовый индекс"},
    {ab:"Jh.",full:"Jahrhundert",ru:"век/столетие"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.teal}>
        <H c={C.teal}>🔤 Abkürzungen — Сокращения</H>
        <div style={{fontSize:13,color:C.muted}}>Часто встречаются в словарях и документах</div>
      </Box>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {ab.map(a=>(
          <div key={a.ab} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",display:"flex",gap:12,alignItems:"center"}}>
            <span style={{background:C.tealBg,border:`1px solid ${C.teal}`,color:C.teal,borderRadius:8,padding:"3px 10px",fontWeight:800,fontSize:14,minWidth:50,textAlign:"center",flexShrink:0}}>{a.ab}</span>
            <span style={{color:C.text,fontWeight:600,fontSize:13,flex:1}}>{a.full}</span>
            <span style={{color:C.muted,fontSize:12}}>{a.ru}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TWFragen(){
  const wf=[
    {w:"Wie",v:"heißen",rest:"Sie?",ru:"Как вас зовут?",a:"Ich heiße... / Mein Name ist..."},
    {w:"Wo",v:"wohnen",rest:"Sie?",ru:"Где вы живёте?",a:"Ich wohne in München. / In der Schillerstraße 18."},
    {w:"Was",v:"sind",rest:"Sie von Beruf?",ru:"Кем вы работаете?",a:"Ich bin Lehrerin. / Ich bin Student."},
    {w:"Wer",v:"ist",rest:"das?",ru:"Кто это?",a:"Das ist Herr Costa. / Das ist meine Kollegin."},
    {w:"Woher",v:"kommt",rest:"Frau Alvarez?",ru:"Откуда госпожа Альварес?",a:"Sie kommt aus Spanien, aus Barcelona."},
    {w:"Welche",v:"Sprachen",rest:"sprechen Sie?",ru:"На каких языках вы говорите?",a:"Ich spreche Ukrainisch und ein bisschen Deutsch."},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.blue}>
        <H c={C.blue}>❓ W-Fragen — вопросительные слова</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>
          Структура: <b style={{color:C.yellow}}>Fragewort</b> + <b style={{color:C.green}}>Verb</b> + остаток фразы
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:8}}>
          {[["Wie","Как?"],["Wo","Где?"],["Was","Что?"],["Wer","Кто?"],["Woher","Откуда?"],["Wohin","Куда?"],["Welche","Какой/Какие?"],["Wie viel","Сколько?"]].map(([w,ru])=>(
            <div key={w} style={{display:"flex",gap:8,alignItems:"center"}}>
              <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}40`,borderRadius:8,padding:"6px 10px",textAlign:"center",fontWeight:800,color:C.yellow,fontSize:14,minWidth:70,flexShrink:0}}>{w}</div>
              <div style={{background:C.card2,borderRadius:8,padding:"6px 10px",fontSize:13,color:C.muted,flex:1}}>{ru}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box>
        <H c={C.text} z={14}>📋 Примеры из книги</H>
        <div style={{display:"grid",gridTemplateColumns:"50px 80px 1fr",gap:5,marginBottom:6}}>
          {["Wort","Verb","Rest"].map(h=><div key={h} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {wf.map(({w,v,rest,ru,a})=>(
          <div key={w+v} style={{marginBottom:10}}>
            <div style={{display:"grid",gridTemplateColumns:"50px 80px 1fr",gap:5,alignItems:"center",marginBottom:4}}>
              <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}40`,borderRadius:7,padding:"6px",textAlign:"center",fontWeight:800,color:C.yellow,fontSize:14}}>{w}</div>
              <div style={{background:C.greenBg,border:`1px solid ${C.green}40`,borderRadius:7,padding:"6px",textAlign:"center",fontWeight:700,color:C.green,fontSize:13}}>{v}</div>
              <div style={{background:C.card2,borderRadius:7,padding:"6px 10px",fontSize:13,color:C.text}}>{rest}</div>
            </div>
            <div style={{fontSize:12,color:C.muted,marginLeft:4,marginBottom:2}}>{ru}</div>
            <div style={{fontSize:12,color:C.blue,marginLeft:4}}>→ {a}</div>
          </div>
        ))}
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>💡 Правило порядка слов</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
          В немецком вопросе глагол стоит <b style={{color:C.green}}>всегда на 2-м месте</b>:<br/>
          <b style={{color:C.yellow}}>Wie</b> <b style={{color:C.green}}>heißen</b> Sie? ✓<br/>
          <b style={{color:C.yellow}}>Woher</b> <b style={{color:C.green}}>kommen</b> Sie? ✓
        </div>
      </Box>
    </div>
  );
}

// ─── QUESTION BANKS ───────────────────────────────────────────────────────────
const Q_L1TEST=shuffle([
  {q:"Wie ___ Sie? (heißen)",opts:["heiße","heißt","heißen","heißtet"],ans:2,hint:"Verben"},
  {q:"Woher ___ Sie? (kommen)",opts:["komme","kommst","kommen","kommt"],ans:2,hint:"Verben"},
  {q:"Wie nennt man den Buchstaben «J»?",opts:["jah","jot","ji","jeh"],ans:1,hint:"Buchstaben"},
  {q:"5 auf Deutsch:",opts:["vier","sechs","fünf","sieben"],ans:2,hint:"Zahlen"},
  {q:"13 auf Deutsch:",opts:["dreizehn","dreizig","dreißig","vierzehn"],ans:0,hint:"Zahlen"},
  {q:"Официальное 'До свидания':",opts:["Tschüss","Hallo","Auf Wiedersehen","Guten Morgen"],ans:2,hint:"Formell"},
  {q:"Ich bin ___ (врач, m)?",opts:["der Arzt","ein Arzt","Arzt","Ärztin"],ans:2,hint:"Beruf"},
  {q:"'продавщица' (f)?",opts:["Verkäufer","Verkäuferin","Verkäufers","Verkauferin"],ans:1,hint:"Beruf"},
  {q:"Ich ___ nicht aus Spanien. (kommen)",opts:["komme","kommst","kommen","kommt"],ans:0,hint:"Verben"},
  {q:"Sie kommt aus ___ Ukraine.",opts:["aus Ukraine","aus der Ukraine","aus die Ukraine","von der Ukraine"],ans:1,hint:"Nationalität"},
]).slice(0,10);

const Q_2B=[
  {q:"'der Tisch' — какой род?",           opts:["maskulin","neutral","feminin","Plural"],    ans:0, hint:"Artikel"},
  {q:"'das Heft' — какой род?",            opts:["maskulin","neutral","feminin","Plural"],    ans:1, hint:"Artikel"},
  {q:"'die Tasche' — какой род?",          opts:["maskulin","neutral","feminin","Plural"],    ans:2, hint:"Artikel"},
  {q:"'Das ist ___ Tasche.' (впервые)",    opts:["die","eine","ein","—"],                     ans:1, exp:"f → eine (unbestimmt, впервые)", hint:"Artikel"},
  {q:"'___ Tasche ist schick.' (известна)",opts:["eine","ein","die","der"],                   ans:2, exp:"die Tasche (bestimmt, уже знаем)", hint:"Artikel"},
  {q:"Lampe → Plural:",                    opts:["Lampen","Lampes","Lampens","Lampe"],        ans:0, exp:"die Lampe, -n → Lampen",         hint:"Plural"},
  {q:"Tisch → Plural:",                    opts:["Tischen","Tischs","Tische","Tischa"],       ans:2, exp:"der Tisch, -e → Tische",         hint:"Plural"},
  {q:"Stuhl → Plural:",                    opts:["Stuhle","Stühle","Stühlen","Stuhls"],       ans:1, exp:'der Stuhl, "-e → Stühle',        hint:"Plural"},
  {q:"Buch → Plural:",                     opts:["Büchen","Bücher","Buchs","Buche"],          ans:1, exp:'das Buch, "-er → Bücher',        hint:"Plural"},
  {q:"Handy → Plural:",                    opts:["Handyen","Handis","Handys","Handies"],      ans:2, exp:"das Handy, -s → Handys",         hint:"Plural"},
];
const Q_ABK=[
  {q:"Что означает 'Pl.'?",  opts:["Plural","Platz","Plastik","Plakat"],       ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'm.'?",   opts:["maskulin","mittel","mehr","Moment"],       ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'f.'?",   opts:["fertig","feminin","frei","falsch"],        ans:1, hint:"Abkürzungen"},
  {q:"Что означает 'n.'?",   opts:["neu","neutral","nicht","normal"],          ans:1, hint:"Abkürzungen"},
  {q:"Что означает 'Str.'?", opts:["Stadt","Straße","Strich","Stock"],         ans:1, hint:"Abkürzungen"},
  {q:"Что означает 'PLZ'?",  opts:["Polizei","Platz","Postleitzahl","Plan"],   ans:2, hint:"Abkürzungen"},
  {q:"Что означает 'Tel.'?", opts:["Teil","Telefonnummer","Text","Termin"],    ans:1, hint:"Abkürzungen"},
  {q:"Что означает 'Nr.'?",  opts:["Nummer","Normal","Norden","Nacht"],        ans:0, hint:"Abkürzungen"},
];
const Q_ABK_WOHN=[
  {q:"Что означает 'Zi.'?",    opts:["Zimmer","Ziel","Zug","Zeit"],                        ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'EFH'?",    opts:["Einfamilienhaus","Erdgeschoss","Einheit","Etage"],   ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'EBK'?",    opts:["Einbauküche","Etagenbett","Eingang","Ende"],         ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'ZH'?",     opts:["Zentralheizung","Zwei-Haus","Zone","Zeit-Haus"],     ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'NK'?",     opts:["Nebenkosten","Neue Küche","Nord-Keller","Nacht"],    ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'qm'?",     opts:["Quadratmeter","Qualität","Quer","Querfläche"],       ans:0, hint:"Abkürzungen"},
  {q:"Что означает 'EG'?",     opts:["Erdgeschoss","Eingang","Etage","Ende"],              ans:0, hint:"Abkürzungen"},
  {q:"'3 Zi.-Whg.' — это:",    opts:["3-комнатная квартира","3-этажный дом","3 ванных","3 балкона"], ans:0, hint:"Anzeige"},
];
const Q_L2TEST=shuffle([
  {q:"Артикль: 'Tasche'",opts:["der","das","die","ein"],ans:2,hint:"Artikel"},
  {q:"Артикль: 'Heft'",opts:["der","die","das","ein"],ans:2,hint:"Artikel"},
  {q:"das Buch → Plural:",opts:["Büchen","Buchern","Bücher","Buchs"],ans:2,hint:"Plural"},
  {q:"die Lampe → Plural:",opts:["Lampes","Lampen","Lampe","Lampens"],ans:1,hint:"Plural"},
  {q:"Er ___ aus der Türkei. (kommen)",opts:["komme","kommst","kommen","kommt"],ans:3,hint:"Verben L2"},
  {q:"Sie (она) ___ Spanisch. (sprechen)",opts:["spreche","sprichst","spricht","sprechen"],ans:2,hint:"Verben L2"},
  {q:"50 auf Deutsch:",opts:["fünfzig","fünfzehn","fünfhundert","dreißig"],ans:0,hint:"Zahlen"},
  {q:"45 auf Deutsch:",opts:["vierzig","fünfundvierzig","vierundvierzig","sechsundvierzig"],ans:1,hint:"Zahlen"},
  {q:"Wie liest man @?",opts:["at","email","ätt","arr"],ans:2,hint:"Adresse"},
  {q:"'почтовый индекс' auf Deutsch:",opts:["die Hausnummer","die Vorwahl","die Postleitzahl","die Straße"],ans:2,hint:"Adresse"},
  {q:"Das Heft ___ 2 Euro.",opts:["kosten","kosteten","kostet","koste"],ans:2,hint:"Preise"},
  {q:"Die Stühle ___ 50 Euro.",opts:["kostet","kosten","kostets","koste"],ans:1,hint:"Preise"},
  {q:"Das ist ein Buch. ___ ist interessant.",opts:["Er","Sie","Ihr","Es"],ans:3,hint:"Pronomen"},
  {q:"Was bedeutet 'Kugelschreiber'?",opts:["карандаш","лампа","шариковая ручка","тетрадь"],ans:2,hint:"Vokabular"},
  {q:"Auf Wiederhören! — это...",opts:["До свидания лично","До свидания по телефону","Привет","Пока"],ans:1,hint:"Adresse"},
]).slice(0,15);


const Q_1A=[
  {q:"Wie heißen Sie? — правильный ответ:",opts:["Ich komme aus...","Ich heiße Lisa. Und Sie?","Ich wohne in Berlin.","Auf Wiedersehen!"],ans:1,hint:"1A"},
  {q:"Woher kommen Sie?",opts:["Ich heiße Paolo.","Ich wohne hier.","Ich komme aus Argentinien.","Ich bin neu."],ans:2,hint:"1A"},
  {q:"Что значит 'Ich wohne schon lange hier'?",opts:["Я здесь новый","Я уже давно здесь живу","Я приехал из...","Я учу немецкий"],ans:1,hint:"1A"},
  {q:"Как сказать 'Меня зовут'? (2 варианта)",opts:["Ich komme / Ich wohne","Ich heiße / Mein Name ist","Ich bin / Ich lerne","Ich heiße / Ich komme"],ans:1,hint:"1A"},
  {q:"Wer ist das? — правильный ответ:",opts:["Ich komme aus Peru.","Das ist Manu Costa.","Ich heiße Paolo.","Guten Morgen!"],ans:1,hint:"1A"},
];
const Q_1C=[
  {q:"Официально спросить 'Как дела?':",opts:["Wie geht es dir?","Wie geht es Ihnen?","Wie heißt du?","Na ja, es geht so."],ans:1,hint:"1C"},
  {q:"Неформально попрощаться:",opts:["Auf Wiedersehen","Guten Tag","Tschüss","Guten Morgen"],ans:2,hint:"1C"},
  {q:"Wir ___ aus Kanada. (kommen)",opts:["komme","kommst","kommt","kommen"],ans:3,hint:"1C"},
  {q:"Ihr ___ Deutsch. (lernen)",opts:["lerne","lernst","lernt","lernen"],ans:2,hint:"1C"},
  {q:"'Ich lerne Deutsch. Und Paul?' → правильный ответ:",opts:["Er lernt auch Deutsch.","Ich lerne auch Deutsch.","Paul lerne Deutsch.","Wir lernen Deutsch."],ans:1,hint:"1C"},
  {q:"Официальное обращение к незнакомцу:",opts:["du","ihr","Sie","dich"],ans:2,hint:"1C"},
];
const Q_1E=[
  {q:"Как сказать 'врач' (f)?",opts:["Arzt","Ärzter","Ärztin","Arztin"],ans:2,hint:"Berufe"},
  {q:"Ich bin ___ (инженер, m)",opts:["der Ingenieur","ein Ingenieur","Ingenieur","Ingenieuren"],ans:2,hint:"Berufe"},
  {q:"'парикмахер' (m)?",opts:["Friseurin","Friseur","Friserer","Friseuren"],ans:1,hint:"Berufe"},
  {q:"Что значит 'Hausfrau'?",opts:["медсестра","домохозяйка","учительница","продавщица"],ans:1,hint:"Berufe"},
  {q:"Was sind Sie von Beruf? → правильный ответ:",opts:["Ich bin ein Lehrer.","Ich bin der Lehrer.","Ich bin Lehrer.","Ich heiße Lehrer."],ans:2,hint:"Berufe"},
];
const Q_2A_S=[
  {q:"Er ___ aus der Türkei. (kommen)",opts:["komme","kommst","kommen","kommt"],ans:3,hint:"2A"},
  {q:"Sie (она) ___ Spanisch. (sprechen)",opts:["spreche","sprichst","spricht","sprechen"],ans:2,hint:"2A"},
  {q:"Woher kommt Rosa Navas?",opts:["aus der Türkei","aus Spanien","aus Polen","aus China"],ans:1,hint:"2A"},
  {q:"'украинец' auf Deutsch?",opts:["Ukrainisch","Ukrainer","Ukrainian","Ukrainien"],ans:1,hint:"2A"},
  {q:"Er ist ___ (Griechenland → Nationalität).",opts:["Griechisch","Griechenland","Grieche","Griecheln"],ans:2,hint:"2A"},
  {q:"Sie (она) ___ bei Siemens. (arbeiten)",opts:["arbeite","arbeitest","arbeitet","arbeiten"],ans:2,hint:"2A"},
];
const Q_WF_S=[
  {q:"Структура вопроса: ___ + Verb + ...",opts:["Verb + Fragewort","Fragewort + Verb","Subjekt + Verb","Verb + Subjekt"],ans:1,exp:"Fragewort → Verb → остаток",hint:"W-Fragen"},
  {q:"___ heißen Sie?",opts:["Wo","Was","Wie","Wer"],ans:2,hint:"W-Fragen"},
  {q:"___ wohnen Sie?",opts:["Wie","Was","Wer","Wo"],ans:3,hint:"W-Fragen"},
  {q:"___ sind Sie von Beruf?",opts:["Wer","Was","Wie","Wo"],ans:1,hint:"W-Fragen"},
  {q:"___ ist das? → Das ist Herr Costa.",opts:["Was","Wie","Wo","Wer"],ans:3,hint:"W-Fragen"},
  {q:"___ kommt Frau Alvarez?",opts:["Wie","Wo","Woher","Was"],ans:2,hint:"W-Fragen"},
  {q:"___ Sprachen sprechen Sie?",opts:["Wie","Welche","Was","Wer"],ans:1,hint:"W-Fragen"},
  {q:"___ kostet das?",opts:["Wer","Wo","Wie viel","Woher"],ans:2,hint:"W-Fragen"},
];

const Q_GROSS=[
  {q:"Какое слово написано ПРАВИЛЬНО?",opts:["wie heißen sie?","Wie heißen sie?","wie heißen Sie?","Wie heißen Sie?"],ans:3,exp:"Sie (официальное) — всегда с большой!",hint:"Großschreibung"},
  {q:"Что ВСЕГДА пишется с большой буквы в немецком?",opts:["Глаголы","Прилагательные","Все существительные","Наречия"],ans:2,exp:"Все Nomen (существительные) — с большой!",hint:"Großschreibung"},
  {q:"Правильное написание:",opts:["ich wohne in berlin","Ich wohne in Berlin.","ich Wohne in Berlin.","Ich wohne In berlin."],ans:1,exp:"Ich (начало), Berlin (город) — с большой",hint:"Großschreibung"},
  {q:"'der beruf' — что неправильно?",opts:["артикль der","слово beruf должно быть с большой","всё правильно","нет артикля"],ans:1,exp:"Все существительные с большой: der Beruf",hint:"Großschreibung"},
  {q:"Wie heißen ___ und woher kommen ___?",opts:["sie / sie","Sie / sie","sie / Sie","Sie / Sie"],ans:3,exp:"Официальное Sie — всегда с большой буквы",hint:"Großschreibung"},
];

// ─── L3 DATA ──────────────────────────────────────────────────────────────────
const MOEBEL=[
  // Wohnzimmer
  {art:"der",de:"Schrank",ru:"шкаф",pl:"Schränke",pt:'"-e',room:"Wohnzimmer"},
  {art:"der",de:"Sessel",ru:"кресло",pl:"Sessel",pt:"—",room:"Wohnzimmer"},
  {art:"der",de:"Teppich",ru:"ковёр",pl:"Teppiche",pt:"-e",room:"Wohnzimmer"},
  {art:"der",de:"Vorhang",ru:"занавеска",pl:"Vorhänge",pt:'"-e',room:"Wohnzimmer"},
  {art:"der",de:"Fernseher",ru:"телевизор",pl:"Fernseher",pt:"—",room:"Wohnzimmer"},
  {art:"das",de:"Regal",ru:"полка",pl:"Regale",pt:"-e",room:"Wohnzimmer"},
  {art:"das",de:"Sofa",ru:"диван",pl:"Sofas",pt:"-s",room:"Wohnzimmer"},
  {art:"das",de:"Bild",ru:"картина",pl:"Bilder",pt:"-er",room:"Wohnzimmer"},
  {art:"der",de:"Tisch",ru:"стол",pl:"Tische",pt:"-e",room:"Wohnzimmer"},
  {art:"der",de:"Stuhl",ru:"стул",pl:"Stühle",pt:'"-e',room:"Wohnzimmer"},
  // Schlafzimmer
  {art:"das",de:"Bett",ru:"кровать",pl:"Betten",pt:"-en",room:"Schlafzimmer"},
  {art:"die",de:"Kommode",ru:"комод",pl:"Kommoden",pt:"-n",room:"Schlafzimmer"},
  // Küche
  {art:"die",de:"Spüle",ru:"раковина",pl:"Spülen",pt:"-n",room:"Küche"},
  {art:"der",de:"Herd",ru:"плита",pl:"Herde",pt:"-e",room:"Küche"},
  {art:"der",de:"Kühlschrank",ru:"холодильник",pl:"Kühlschränke",pt:'"-e',room:"Küche"},
  {art:"die",de:"Mikrowelle",ru:"микроволновка",pl:"Mikrowellen",pt:"-n",room:"Küche"},
  {art:"die",de:"Spülmaschine",ru:"посудомоечная машина",pl:"Spülmaschinen",pt:"-n",room:"Küche"},
  {art:"die",de:"Waschmaschine",ru:"стиральная машина",pl:"Waschmaschinen",pt:"-n",room:"Küche"},
  // Allgemein
  {art:"die",de:"Lampe",ru:"лампа",pl:"Lampen",pt:"-n",room:"alle"},
  {art:"das",de:"Waschbecken",ru:"умывальник",pl:"Waschbecken",pt:"—",room:"Bad"},
];
const FARBEN=[
  {de:"braun",ru:"коричневый"},{de:"schwarz",ru:"чёрный"},{de:"rot",ru:"красный"},
  {de:"gelb",ru:"жёлтый"},{de:"grau",ru:"серый"},{de:"weiß",ru:"белый"},
  {de:"blau",ru:"синий / голубой"},{de:"grün",ru:"зелёный"},{de:"rosa",ru:"розовый"},
  {de:"lila",ru:"фиолетовый"},{de:"orange",ru:"оранжевый"},
];
const KONJ_HABEN={ich:"habe",du:"hast","er/es/sie":"hat",wir:"haben",ihr:"habt","sie/Sie":"haben"};
const KONJ_BRAUCHEN={ich:"brauche",du:"brauchst","er/es/sie":"braucht",wir:"brauchen",ihr:"braucht","sie/Sie":"brauchen"};
const KONJ_KAUFEN={ich:"kaufe",du:"kaufst","er/es/sie":"kauft",wir:"kaufen",ihr:"kauft","sie/Sie":"kaufen"};

// ─── POSSESSIVPRONOMEN ────────────────────────────────────────────────────────
const POSSESSIV=[
  {pro:"ich",poss:"mein",ru:"мой/моя/моё"},
  {pro:"du",poss:"dein",ru:"твой/твоя/твоё"},
  {pro:"er/es",poss:"sein",ru:"его"},
  {pro:"sie (она)",poss:"ihr",ru:"её"},
  {pro:"wir",poss:"unser",ru:"наш/наша/наше"},
  {pro:"ihr",poss:"euer",ru:"ваш/ваша/ваше"},
  {pro:"sie (они)",poss:"ihr",ru:"их"},
  {pro:"Sie (Вы)",poss:"Ihr",ru:"Ваш/Ваша/Ваше"},
];

// ─── WOHNVOKABULAR ERWEITERT ──────────────────────────────────────────────────
const WOHN_EXTRA=[
  {art:"der",de:"Schreibtisch",ru:"письменный стол",pl:"Schreibtische",pt:"-e"},
  {art:"der",de:"Spiegel",ru:"зеркало",pl:"Spiegel",pt:"—"},
  {art:"der",de:"Balkon",ru:"балкон",pl:"Balkons",pt:"-s"},
  {art:"der",de:"Flur",ru:"коридор, прихожая",pl:"Flure",pt:"-e"},
  {art:"der",de:"Urlaub",ru:"отпуск, каникулы",pl:"Urlaube",pt:"-e"},
  {art:"die",de:"Badewanne",ru:"ванна",pl:"Badewannen",pt:"-n"},
  {art:"die",de:"Dusche",ru:"душ",pl:"Duschen",pt:"-n"},
  {art:"die",de:"Toilette",ru:"туалет",pl:"Toiletten",pt:"-n"},
  {art:"die",de:"Klimaanlage",ru:"кондиционер",pl:"Klimaanlagen",pt:"-n"},
  {art:"die",de:"Terrasse",ru:"терраса",pl:"Terrassen",pt:"-n"},
  {art:"die",de:"Garage",ru:"гараж",pl:"Garagen",pt:"-n"},
  {art:"die",de:"Miete",ru:"аренда, квартплата",pl:"Mieten",pt:"-n"},
  {art:"die",de:"Nebenkosten",ru:"коммунальные платежи",pl:"Nebenkosten",pt:"—"},
  {art:"die",de:"Stadt",ru:"город",pl:"Städte",pt:'"-e'},
  {art:"die",de:"Nacht",ru:"ночь",pl:"Nächte",pt:'"-e'},
  {art:"das",de:"Dorf",ru:"село, деревня",pl:"Dörfer",pt:'"-er'},
  {art:"das",de:"Apartment",ru:"квартира, апартаменты",pl:"Apartments",pt:"-s"},
  {art:"das",de:"Hotel",ru:"отель, гостиница",pl:"Hotels",pt:"-s"},
  {art:"das",de:"Doppelzimmer",ru:"двухместный номер",pl:"Doppelzimmer",pt:"—"},
  {art:"das",de:"Einzelzimmer",ru:"одноместный номер",pl:"Einzelzimmer",pt:"—"},
  {art:"das",de:"Arbeitszimmer",ru:"рабочий кабинет",pl:"Arbeitszimmer",pt:"—"},
];

const Q_L3A=[
  {q:"Ich ___ kein Sofa. (haben)",opts:["hast","hat","habe","haben"],ans:2,hint:"haben"},
  {q:"Du ___ zwei Handys. (haben)",opts:["habe","hast","hat","haben"],ans:1,hint:"haben"},
  {q:"Er ___ einen Bleistift. (haben)",opts:["habe","hast","hat","haben"],ans:2,hint:"haben"},
  {q:"Wir ___ keinen Fernseher. (haben)",opts:["habe","habt","hat","haben"],ans:3,hint:"haben"},
  {q:"'Da ist kein Schrank.' — что означает kein?",opts:["есть шкаф","нет шкафа","красивый шкаф","маленький шкаф"],ans:1,exp:"kein/keine = нет / не имеется",hint:"kein"},
  {q:"Da ist ___ Lampe. (отрицание, f)",opts:["kein","keine","nicht","keinen"],ans:1,exp:"die Lampe → keine Lampe",hint:"kein"},
  {q:"Da ist ___ Tisch. (отрицание, m)",opts:["keine","keinen","kein","nicht"],ans:2,exp:"der Tisch → kein Tisch",hint:"kein"},
  {q:"Sie ___ einen Kühlschrank. (brauchen)",opts:["brauche","brauchst","braucht","brauchen"],ans:3,hint:"brauchen"},
];
const Q_L3FARBE=[
  {q:"Как сказать 'красный'?",opts:["blau","rot","gelb","grün"],ans:1,hint:"Farben"},
  {q:"Как сказать 'белый'?",opts:["schwarz","grau","weiß","braun"],ans:2,hint:"Farben"},
  {q:"Как сказать 'синий'?",opts:["blau","grün","lila","rosa"],ans:0,hint:"Farben"},
  {q:"Как сказать 'жёлтый'?",opts:["grün","gelb","orange","grau"],ans:1,hint:"Farben"},
  {q:"'schwarz' — это...",opts:["белый","серый","чёрный","коричневый"],ans:2,hint:"Farben"},
  {q:"'lila' — это...",opts:["розовый","фиолетовый","оранжевый","голубой"],ans:1,hint:"Farben"},
];
const Q_L3AKKU=[
  {q:"Der Stuhl ist schön. → Ich kaufe ___ Stuhl.",opts:["der","das","die","den"],ans:3,exp:"m Akkusativ: der → den",hint:"Akkusativ"},
  {q:"Das Buch ist gut. → Ich lese ___ Buch.",opts:["den","das","die","dem"],ans:1,exp:"n Akkusativ: das bleibt das",hint:"Akkusativ"},
  {q:"Die Lampe ist neu. → Ich kaufe ___ Lampe.",opts:["den","das","die","dem"],ans:2,exp:"f Akkusativ: die bleibt die",hint:"Akkusativ"},
  {q:"Ich brauche ___ Laptop. (m, unbestimmt)",opts:["ein","eine","einen","kein"],ans:2,exp:"m Akkusativ unbestimmt: einen",hint:"Akkusativ"},
  {q:"Ich habe ___ Sofa. (n, unbestimmt)",opts:["einen","eine","ein","einem"],ans:2,exp:"n Akkusativ: ein bleibt ein",hint:"Akkusativ"},
  {q:"Nur у какого рода меняется артикль в Akkusativ?",opts:["feminin (f)","neutral (n)","maskulin (m)","у всех"],ans:2,exp:"Nur m: der→den, ein→einen, kein→keinen",hint:"Akkusativ"},
];

function T3A(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>🏠 Möbel — Мебель</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:6}}>
          {["m (der)","n (das)","f (die)"].map(h=><div key={h} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {[["der","blue"],["das","orange"],["die","purple"]].map(([art,col])=>(
          <div key={art} style={{marginBottom:6}}>
            {MOEBEL.filter(m=>m.art===art).map(m=>(
              <div key={m.de} style={{background:C.card2,borderRadius:7,padding:"5px 8px",marginBottom:4,display:"flex",justifyContent:"space-between",fontSize:13}}>
                <span style={{color:C[col],fontWeight:600}}>{art} {m.de}</span>
                <span style={{color:C.muted}}>{m.ru}</span>
              </div>
            ))}
          </div>
        ))}
      </Box>
      <Box c={C.blue}>
        <H c={C.blue}>🔑 Das Verb haben</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[["ich",KONJ_HABEN.ich],["wir",KONJ_HABEN.wir],["du",KONJ_HABEN.du],["ihr",KONJ_HABEN.ihr],["er/es/sie",KONJ_HABEN["er/es/sie"]],["sie/Sie",KONJ_HABEN["sie/Sie"]]].map(([p,f])=>(
            <div key={p} style={{background:C.card2,borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{p}</div>
              <div style={{color:C.text,fontWeight:700,fontSize:15}}>{f}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.red}>
        <H c={C.red}>❌ kein / keine / kein</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>Отрицание при существительных = «нет / не имею»</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
          {[
            {label:"m",pos:"ein Tisch",neg:"kein Tisch",col:C.blue},
            {label:"n",pos:"ein Sofa",neg:"kein Sofa",col:C.orange},
            {label:"f",pos:"eine Lampe",neg:"keine Lampe",col:C.purple},
          ].map(({label,pos,neg,col})=>(
            <div key={label} style={{background:C.card2,borderRadius:10,padding:"8px",textAlign:"center"}}>
              <div style={{color:col,fontWeight:800,fontSize:13,marginBottom:4}}>{label}</div>
              <div style={{fontSize:12,color:C.green,marginBottom:2}}>{pos}</div>
              <div style={{fontSize:12,color:C.red}}>{neg}</div>
            </div>
          ))}
        </div>
        <Box c={C.yellow}>
          <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
            Da ist <b style={{color:C.green}}>ein</b> Schrank. → Da ist <b style={{color:C.red}}>kein</b> Schrank.<br/>
            Da ist <b style={{color:C.green}}>eine</b> Spüle. → Da ist <b style={{color:C.red}}>keine</b> Spüle.<br/>
            Da sind <b style={{color:C.green}}>—</b> Bilder. → Da sind <b style={{color:C.red}}>keine</b> Bilder.
          </div>
        </Box>
      </Box>
    </div>
  );
}

// ClickPill — тег с переводом по нажатию
function ClickPill({text,col}){
  const [open,setOpen]=useState(false);
  const stripped=text.replace(/^(der|die|das)\s+/i,"");
  const ru=WBDATA.find(w=>w.de===stripped)?.ru
        ||BEWERTUNG.flatMap(g=>g.words).find(w=>w.de===text)?.ru
        ||"";
  return(
    <div onClick={()=>setOpen(s=>!s)}
      style={{display:"inline-flex",flexDirection:"column",alignItems:"center",
        background:open?col+"44":col+"22",border:`1px solid ${col}${open?"99":"55"}`,
        borderRadius:20,padding:open?"5px 12px":"4px 10px",cursor:"pointer",
        transition:"background 0.15s",minWidth:60,textAlign:"center"}}>
      <span style={{fontSize:13,color:col,fontWeight:600,whiteSpace:"nowrap"}}>{text}</span>
      {open&&ru&&<span style={{fontSize:11,color:C.muted,marginTop:2}}>{ru}</span>}
    </div>
  );
}

function T3Farben(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.orange}>
        <H c={C.orange}>🎨 Farben — Цвета</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {FARBEN.map(f=>(
            <div key={f.de} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontWeight:700,fontSize:14,color:C.text}}>{f.de}</span>
              <span style={{color:C.muted,fontSize:13}}>{f.ru}</span>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>💡 Как использовать</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.9}}>
          Der Stuhl ist <b style={{color:C.blue}}>blau</b>.<br/>
          Ich finde das Sofa <b style={{color:C.orange}}>orange</b>.<br/>
          <span style={{color:C.muted}}>Цвета не меняются по родам!</span>
        </div>
      </Box>
    </div>
  );
}

function T3Akkusativ(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>📌 Nominativ vs Akkusativ</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>
          Nominativ = подлежащее (кто/что делает)<br/>
          Akkusativ = дополнение (кого/что?)
        </div>
        <div style={{background:C.card2,borderRadius:10,padding:"10px 12px",fontSize:13,color:C.text,lineHeight:1.9}}>
          <b style={{color:C.blue}}>Der Lehrer</b> (Nom.) schreibt <b style={{color:C.orange}}>einen Satz</b> (Akk.).<br/>
          <b style={{color:C.purple}}>Die Lehrerin</b> (Nom.) hat <b style={{color:C.orange}}>eine CD</b> (Akk.).<br/>
          <b style={{color:C.green}}>Ich</b> (Nom.) kaufe <b style={{color:C.orange}}>den Laptop</b> (Akk.).
        </div>
      </Box>
      <Box c={C.red}>
        <H c={C.red}>⚠️ Главное правило Akkusativ</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>Меняется только <b style={{color:C.red}}>maskulin (m)</b>!</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:5,marginBottom:6}}>
          {["","m","n","f","Pl."].map(h=><div key={h} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {[
          {type:"bestimmt (def.)",nom:["der","das","die","die"],akk:["den","das","die","die"]},
          {type:"unbestimmt",nom:["ein","ein","eine","—"],akk:["einen","ein","eine","—"]},
          {type:"negation",nom:["kein","kein","keine","keine"],akk:["keinen","kein","keine","keine"]},
        ].map(({type,nom,akk})=>(
          <div key={type} style={{marginBottom:8}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{type}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:5}}>
              <div style={{fontSize:11,color:C.muted,textAlign:"center"}}>Nom.</div>
              {nom.map((a,i)=><div key={i} style={{background:C.card2,borderRadius:6,padding:"4px",textAlign:"center",fontSize:13,color:C.text}}>{a}</div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:5,marginTop:3}}>
              <div style={{fontSize:11,color:C.orange,textAlign:"center"}}>Akk.</div>
              {akk.map((a,i)=><div key={i} style={{background:i===0?C.orangeBg:C.card2,border:i===0?`1px solid ${C.orange}`:`1px solid ${C.border}`,borderRadius:6,padding:"4px",textAlign:"center",fontSize:13,color:i===0?C.orange:C.muted,fontWeight:i===0?800:400}}>{a}</div>)}
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
}

function T3Intro(){
  const [active,setActive]=useState(null);
  const ZIMMER=[
    {name:"das Wohnzimmer",ru:"гостиная",col:C.blue,items:[
      {w:"das Sofa",ru:"диван"},{w:"der Sessel",ru:"кресло"},{w:"der Tisch",ru:"стол"},
      {w:"das Regal",ru:"полка"},{w:"der Fernseher",ru:"телевизор"},
      {w:"das Bild",ru:"картина"},{w:"der Teppich",ru:"ковёр"},
    ]},
    {name:"das Schlafzimmer",ru:"спальня",col:C.purple,items:[
      {w:"das Bett",ru:"кровать"},{w:"die Kommode",ru:"комод"},{w:"der Schrank",ru:"шкаф"},
    ]},
    {name:"die Küche",ru:"кухня",col:C.orange,items:[
      {w:"der Herd",ru:"плита"},{w:"der Kühlschrank",ru:"холодильник"},
      {w:"die Spüle",ru:"раковина"},{w:"die Mikrowelle",ru:"микроволновка"},
      {w:"die Spülmaschine",ru:"посудомойка"},{w:"die Waschmaschine",ru:"стиральная машина"},
    ]},
  ];
  const MEIN=[
    {e:"😊",col:C.green,words:[
      {w:"sehr schön",ru:"очень красиво"},{w:"toll",ru:"здорово"},{w:"super",ru:"супер"},
      {w:"schön",ru:"красивый"},{w:"elegant",ru:"элегантный"},{w:"gemütlich",ru:"уютный"},
    ]},
    {e:"😐",col:C.yellow,words:[
      {w:"ganz schön",ru:"довольно красиво"},{w:"nicht schlecht",ru:"неплохо"},{w:"okay",ru:"нормально"},
    ]},
    {e:"😞",col:C.red,words:[
      {w:"langweilig",ru:"скучный"},{w:"nicht schön",ru:"некрасиво"},
      {w:"hässlich",ru:"некрасивый"},{w:"furchtbar",ru:"ужасный"},
    ]},
  ];
  const ADJ=[
    {a:"groß",b:"klein",ru:"большой / маленький"},
    {a:"neu",b:"alt",ru:"новый / старый"},
    {a:"modern",b:"—",ru:"современный"},
    {a:"schön",b:"hässlich",ru:"красивый / некрасивый"},
    {a:"bequem",b:"unbequem",ru:"удобный / неудобный"},
    {a:"ordentlich",b:"unordentlich",ru:"аккуратный / беспорядочный"},
    {a:"elegant",b:"langweilig",ru:"элегантный / скучный"},
    {a:"gemütlich",b:"—",ru:"уютный"},
  ];

  const ClickPill=({word,ru,col})=>{
    const isOn=active===word;
    return(
      <span onClick={()=>setActive(isOn?null:word)} style={{
        display:"inline-flex",alignItems:"center",gap:5,cursor:"pointer",
        background:isOn?col:col+"22",border:`1px solid ${col}55`,
        color:isOn?"#fff":col,borderRadius:20,padding:"4px 10px",
        fontSize:12,fontWeight:600,transition:"all 0.15s",userSelect:"none",
      }}>
        {word}{isOn&&<span style={{fontSize:11,opacity:0.9}}>— {ru}</span>}
      </span>
    );
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>🏠 Zimmer — Комнаты</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>Pronomen: der→<b style={{color:C.blue}}>er</b> · das→<b style={{color:C.orange}}>es</b> · die→<b style={{color:C.purple}}>sie</b> · die(Pl.)→<b style={{color:C.green}}>sie</b></div>
        <div style={{fontSize:11,color:C.dim,marginBottom:8}}>👆 Нажми на слово — увидишь перевод</div>
        {ZIMMER.map(z=>(
          <div key={z.name} style={{background:z.col+"15",border:`1px solid ${z.col}40`,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
            <div style={{fontWeight:700,color:z.col,fontSize:14,marginBottom:6}}>{z.name} — <span style={{color:C.muted,fontSize:12}}>{z.ru}</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {z.items.map(i=><ClickPill key={i.w} word={i.w} ru={i.ru} col={z.col}/>)}
            </div>
          </div>
        ))}
      </Box>
      <Box c={C.blue}>
        <H c={C.blue}>✨ Adjektive für Möbel</H>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {ADJ.map(({a,b,ru})=>(
            <div key={a} style={{display:"flex",gap:8,alignItems:"center",background:C.card2,borderRadius:8,padding:"7px 10px"}}>
              <span style={{color:C.green,fontWeight:700,fontSize:13,minWidth:80}}>{a}</span>
              {b!=="—"&&<><span style={{color:C.dim}}>↔</span><span style={{color:C.red,fontSize:13,minWidth:80}}>{b}</span></>}
              <span style={{color:C.muted,fontSize:12,flex:1}}>{ru}</span>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.teal}>
        <H c={C.teal} z={13}>💬 Мнения (Meinungen)</H>
        <div style={{fontSize:11,color:C.dim,marginBottom:6}}>👆 Нажми на слово — увидишь перевод</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {MEIN.map(({e,words,col})=>(
            <div key={e} style={{background:col+"15",border:`1px solid ${col}35`,borderRadius:8,padding:"8px 10px",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:20}}>{e}</span>
              {words.map(w=><ClickPill key={w.w} word={w.w} ru={w.ru} col={col}/>)}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

function T3B(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.blue}>
        <H c={C.blue}>❓ Ja/Nein-Fragen</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>Вопросы на Да/Нет — глагол стоит на первом месте!</div>
        <div style={{background:C.card2,borderRadius:10,padding:"12px",marginBottom:10}}>
          <div style={{fontSize:14,color:C.text,lineHeight:2}}>
            <b style={{color:C.blue}}>Ist</b> das ein Tisch? → Ja, das <b style={{color:C.blue}}>ist</b> ein Tisch.<br/>
            <span style={{color:C.muted,fontSize:12,marginLeft:20}}>Nein, das <b style={{color:C.red}}>ist kein</b> Tisch. Das ist eine Lampe.</span><br/>
            <b style={{color:C.green}}>Haben</b> Sie eine Mikrowelle? → Ja, ich <b style={{color:C.green}}>habe</b> eine.<br/>
            <span style={{color:C.muted,fontSize:12,marginLeft:20}}>Nein, ich <b style={{color:C.red}}>habe keine</b> Mikrowelle.</span>
          </div>
        </div>
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,padding:"8px 10px",fontSize:13,color:C.yellow}}>
          💡 Ja/Nein-Frage: <b>Verb</b> + Subjekt + ...?<br/>
          Сравни: <b style={{color:C.blue}}>Ist</b> das ein Tisch? vs <b style={{color:C.green}}>Wie</b> <b style={{color:C.blue}}>heißen</b> Sie?
        </div>
      </Box>
      <Box>
        <H c={C.text} z={14}>🛋️ Neue Vokabeln</H>
        {[
          ["die Kommode","-n","комод"],
          ["das Waschbecken","—","умывальник"],
          ["die Spülmaschine","-n","посудомоечная машина"],
          ["die Waschmaschine","-n","стиральная машина"],
          ["die Mikrowelle","-n","микроволновка"],
          ["der Kühlschrank","-e+uml.","холодильник"],
        ].map(([w,pl,ru])=>(
          <div key={w} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.text,fontSize:13,fontWeight:600}}>{w}</span>
            <span style={{color:C.teal,fontSize:12}}>{pl}</span>
            <span style={{color:C.muted,fontSize:13}}>{ru}</span>
          </div>
        ))}
      </Box>
      <Box c={C.green}>
        <H c={C.green} z={13}>🗣️ Nützliche Ausdrücke</H>
        <div style={{fontSize:13,color:C.text,lineHeight:2}}>
          <b>Wirklich?</b> — Правда? Серьёзно?<br/>
          <b>Schau mal!</b> — Посмотри!<br/>
          <b>Oh, klasse!</b> — Отлично! Здорово!<br/>
          <b>Das finde ich auch.</b> — Я тоже так считаю.
        </div>
      </Box>
    </div>
  );
}

function T3C(){
  const etagen=[
    {de:"das Dachgeschoss",ru:"мансарда / последний этаж"},
    {de:"der 3. (dritte) Stock",ru:"3-й этаж"},
    {de:"der 2. (zweite) Stock",ru:"2-й этаж"},
    {de:"der 1. (erste) Stock",ru:"1-й этаж"},
    {de:"das Erdgeschoss",ru:"цокольный этаж (0)"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.purple}>
        <H c={C.purple}>🏢 Das Mehrfamilienhaus</H>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:10}}>
          {etagen.map((e,i)=>(
            <div key={e.de} style={{background:i===0?C.purpleBg:C.card2,border:`1px solid ${i===0?C.purple:C.border}`,borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between"}}>
              <span style={{color:i===0?C.purple:C.text,fontWeight:600,fontSize:13}}>{e.de}</span>
              <span style={{color:C.muted,fontSize:12}}>{e.ru}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:13,color:C.text,lineHeight:1.8}}>
          <b style={{color:C.blue}}>oben</b> = вверху &nbsp; <b style={{color:C.blue}}>unten</b> = внизу<br/>
          <b style={{color:C.green}}>links</b> = слева &nbsp; <b style={{color:C.green}}>rechts</b> = справа
        </div>
      </Box>
      <Box c={C.red}>
        <H c={C.red}>⭐ es gibt + Akkusativ</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>«есть / имеется» — es gibt + Akkusativ</div>
        {[
          {nom:"ein Laden (m)",akk:"Es gibt einen Laden.",col:C.blue},
          {nom:"ein Café (n)",akk:"Es gibt ein Café.",col:C.orange},
          {nom:"eine Kita (f)",akk:"Es gibt eine Kita.",col:C.purple},
          {nom:"Geschäfte (Pl.)",akk:"Es gibt Geschäfte.",col:C.green},
        ].map(({nom,akk,col})=>(
          <div key={nom} style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
            <span style={{background:col+"22",border:`1px solid ${col}55`,color:col,borderRadius:7,padding:"3px 8px",fontSize:12,flexShrink:0}}>{nom}</span>
            <span style={{fontSize:13,color:C.text}}>{akk}</span>
          </div>
        ))}
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,padding:"7px 10px",fontSize:13,color:C.yellow,marginTop:8}}>
          💡 После <b>es gibt</b> — всегда Akkusativ! <b style={{color:C.red}}>m: einen</b> (не ein!)
        </div>
      </Box>
    </div>
  );
}

function T3Poss(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.orange}>
        <H c={C.orange}>👤 Possessivpronomen — Притяжательные местоимения</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:10}}>Показывают принадлежность: <b style={{color:C.orange}}>чей? чья? чьё?</b></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:6}}>
          {["Pronomen","Possessiv","Значение"].map(h=><div key={h} style={{fontSize:10,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {POSSESSIV.map(({pro,poss,ru})=>(
          <div key={pro} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:5}}>
            <div style={{background:C.card2,borderRadius:7,padding:"6px 8px",fontSize:13,color:C.blue,fontWeight:600,textAlign:"center"}}>{pro}</div>
            <div style={{background:C.orangeBg,border:`1px solid ${C.orange}55`,borderRadius:7,padding:"6px 8px",fontSize:14,color:C.orange,fontWeight:800,textAlign:"center"}}>{poss}</div>
            <div style={{background:C.card2,borderRadius:7,padding:"6px 8px",fontSize:12,color:C.muted,textAlign:"center"}}>{ru}</div>
          </div>
        ))}
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>⚠️ Окончания — как у ein/kein</H>
        <div style={{fontSize:13,color:C.text,lineHeight:1.9}}>
          <b style={{color:C.blue}}>mein</b> Tisch (m, Nom.) &nbsp; <b style={{color:C.purple}}>meine</b> Lampe (f)<br/>
          <b style={{color:C.orange}}>mein</b> Heft (n) &nbsp; <b style={{color:C.red}}>meinen</b> Tisch (m, Akk.)<br/>
          <span style={{color:C.muted,fontSize:12}}>= окончания те же, что у ein/eine/einen!</span>
        </div>
      </Box>
      <Box c={C.green}>
        <H c={C.green} z={13}>📝 Примеры</H>
        <div style={{fontSize:13,color:C.text,lineHeight:2}}>
          Das ist <b style={{color:C.orange}}>mein</b> Buch. — Это моя книга.<br/>
          Ist das <b style={{color:C.blue}}>dein</b> Laptop? — Это твой ноутбук?<br/>
          In der Garage steht <b style={{color:C.purple}}>sein</b> Auto. — В гараже его машина.<br/>
          <b style={{color:C.green}}>Unser</b> Apartment ist gemütlich. — Наша квартира уютная.
        </div>
      </Box>
    </div>
  );
}

function T3WohnVok(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.blue}>
        <H c={C.blue}>🚿 Das Bad — Ванная комната</H>
        <div style={{fontSize:12,color:C.muted,marginBottom:8}}>Im Bad dusche ich mich.</div>
        {[
          {art:"die",de:"Dusche",ru:"душ"},{art:"die",de:"Badewanne",ru:"ванна"},
          {art:"die",de:"Toilette",ru:"туалет"},{art:"das",de:"Waschbecken",ru:"умывальник"},
          {art:"der",de:"Spiegel",ru:"зеркало"},
        ].map(w=>(
          <div key={w.de} style={{background:C.card2,borderRadius:8,padding:"7px 10px",marginBottom:4,display:"flex",gap:8,alignItems:"center"}}>
            <span style={{background:AB(w.art),border:`1px solid ${AC(w.art)}`,color:AC(w.art),borderRadius:7,padding:"2px 7px",fontWeight:800,fontSize:12,flexShrink:0}}>{w.art}</span>
            <span style={{fontWeight:600,color:C.text,flex:1}}>{w.de}</span>
            <span style={{color:C.muted,fontSize:12}}>{w.ru}</span>
          </div>
        ))}
      </Box>
      <Box c={C.green}>
        <H c={C.green}>🏘️ Wohnvokabular</H>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          {WOHN_EXTRA.map(w=>(
            <div key={w.de} style={{background:C.card2,borderRadius:8,padding:"6px 10px",display:"flex",gap:8,alignItems:"center"}}>
              <span style={{background:AB(w.art),border:`1px solid ${AC(w.art)}`,color:AC(w.art),borderRadius:6,padding:"1px 6px",fontWeight:800,fontSize:11,flexShrink:0}}>{w.art}</span>
              <span style={{fontWeight:600,color:C.text,fontSize:13,flex:1}}>{w.de}</span>
              <span style={{color:C.teal,fontSize:11,marginRight:4}}>{w.pl}</span>
              <span style={{color:C.muted,fontSize:12}}>{w.ru}</span>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.teal}>
        <H c={C.teal} z={13}>🔊 Aussprache: sp & st</H>
        <div style={{fontSize:13,color:C.text,lineHeight:2}}>
          В начале слова/слога:<br/>
          <b style={{color:C.orange}}>sp</b> = <b style={{color:C.green}}>шп</b>: <b>sp</b>rechen, <b>Sp</b>üle, <b>Sp</b>iegel<br/>
          <b style={{color:C.orange}}>st</b> = <b style={{color:C.green}}>шт</b>: <b>St</b>adt, <b>St</b>uhl, <b>St</b>raße<br/>
          <span style={{color:C.muted,fontSize:12}}>В середине слова — обычное «сп/ст»</span>
        </div>
      </Box>
      <Box c={C.yellow}>
        <H c={C.yellow} z={13}>🏠 zu Hause vs nach Hause</H>
        <div style={{fontSize:13,color:C.text,lineHeight:2}}>
          Ich <b style={{color:C.blue}}>bin</b> <b style={{color:C.green}}>zu Hause</b>. — Я <b>дома</b> (нахожусь).<br/>
          Ich <b style={{color:C.blue}}>gehe</b> <b style={{color:C.orange}}>nach Hause</b>. — Я иду <b>домой</b>.<br/>
          <span style={{color:C.muted,fontSize:12}}>zu Hause = где? · nach Hause = куда?</span>
        </div>
      </Box>
    </div>
  );
}

const Q_L3B=[
  {q:"Ist das ein Tisch? → Nein...",opts:["Nein, das ist nicht Tisch.","Nein, das ist kein Tisch.","Nein, kein ein Tisch.","Nein, das ist nicht ein Tisch."],ans:1,exp:"kein/keine для отрицания существительных",hint:"Ja/Nein"},
  {q:"Haben Sie eine Mikrowelle? → Ja...",opts:["Ja, ich habe eine Mikrowelle.","Ja, ich habe ein Mikrowelle.","Ja, ich habe einen Mikrowelle.","Ja, ich bin Mikrowelle."],ans:0,hint:"Ja/Nein"},
  {q:"Порядок слов в Ja/Nein-Frage:",opts:["Subjekt + Verb","Verb + Subjekt","W-Wort + Verb","Verb + W-Wort"],ans:1,exp:"Ist das...? Haben Sie...? — Verb zuerst!",hint:"Ja/Nein"},
  {q:"'Wirklich?' значит...",opts:["Правда?","Пожалуйста","Хорошо","Спасибо"],ans:0,hint:"Ausdrücke"},
  {q:"'klasse' значит...",opts:["скучно","ужасно","здорово/отлично","серьёзно?"],ans:2,hint:"Ausdrücke"},
];
const Q_L3C=[
  {q:"'Es gibt' + m → правильная форма:",opts:["Es gibt ein Laden.","Es gibt der Laden.","Es gibt einen Laden.","Es gibt einem Laden."],ans:2,exp:"es gibt + Akkusativ: m → einen",hint:"es gibt"},
  {q:"Wo ist das Erdgeschoss?",opts:["самый верхний этаж","под крышей","нулевой этаж","2-й этаж"],ans:2,exp:"das Erdgeschoss = 0-й этаж (вход)",hint:"Etagen"},
  {q:"'links' означает:",opts:["справа","вверху","слева","внизу"],ans:2,hint:"Richtung"},
  {q:"Wo wohnt Familie Wang? → ___ 2. Stock.",opts:["auf dem","an den","im","in"],ans:2,exp:"im = in dem: im 1./2./3. Stock",hint:"Etagen"},
  {q:"'Es gibt eine Kita.' — артикль после es gibt?",opts:["ein","eine","einen","—"],ans:1,exp:"f → eine (Akkusativ f = Nominativ f)",hint:"es gibt"},
];
const Q_L3TEST=shuffle([
  {q:"Ich ___ kein Sofa. (haben)",opts:["hast","hat","habe","haben"],ans:2,hint:"haben"},
  {q:"Er ___ einen Bleistift. (haben)",opts:["habe","hast","hat","haben"],ans:2,hint:"haben"},
  {q:"'keine Lampe' — почему keine?",opts:["m-форма","n-форма","f-форма","Plural"],ans:2,exp:"die Lampe → keine (f)",hint:"kein"},
  {q:"Как сказать 'красный'?",opts:["blau","rot","gelb","grün"],ans:1,hint:"Farben"},
  {q:"Как сказать 'чёрный'?",opts:["weiß","grau","braun","schwarz"],ans:3,hint:"Farben"},
  {q:"Я покупаю стол (m). Ich kaufe ___ Tisch.",opts:["der","das","die","den"],ans:3,exp:"m Akkusativ: den",hint:"Akkusativ"},
  {q:"Только у какого рода меняется артикль в Akkusativ?",opts:["f","n","m","у всех"],ans:2,exp:"Nur maskulin: der→den, ein→einen",hint:"Akkusativ"},
  {q:"Ich brauche ___ Laptop. (m, unbestimmt)",opts:["ein","eine","einen","kein"],ans:2,hint:"Akkusativ"},
  {q:"Wie finden Sie das Sofa?",opts:["Ich bin Sofa.","Das Sofa ist schön!","Ja, Sofa.","Ich kaufe."],ans:1,hint:"Meinung"},
  {q:"'das Bett' → Plural:",opts:["die Betten","die Bette","die Bettern","die Betts"],ans:0,hint:"Plural"},
]).slice(0,10);
const Q_L3POSS=shuffle([
  {q:"ich → ... Buch",opts:["sein Buch","ihr Buch","mein Buch","dein Buch"],ans:2,hint:"Possessiv"},
  {q:"er/es → ... Haus",opts:["ihr Haus","mein Haus","sein Haus","unser Haus"],ans:2,hint:"Possessiv"},
  {q:"sie (она) → ... Tasche",opts:["sein Tasche","ihr Tasche","mein Tasche","dein Tasche"],ans:1,exp:"sie(она)→ihr",hint:"Possessiv"},
  {q:"wir → ... Wohnung",opts:["eure","unsere","seine","ihre"],ans:1,exp:"wir → unser/unsere",hint:"Possessiv"},
  {q:"Ist das ___ Auto? (du-form)",opts:["sein Auto","mein Auto","dein Auto","unser Auto"],ans:2,exp:"du → dein",hint:"Possessiv"},
  {q:"Wie ist ___ Adresse? (Sie formell)",opts:["ihr","euer","Ihr","unser"],ans:2,exp:"Sie(Вы) → Ihr (с большой буквы!)",hint:"Possessiv"},
  {q:"In der Garage steht ___ Auto. (er)",opts:["mein","dein","sein","ihr"],ans:2,hint:"Possessiv"},
  {q:"___ Apartment ist gemütlich. (wir)",opts:["Euer","Unser","Sein","Ihr"],ans:1,hint:"Possessiv"},
]).slice(0,6);

const Q_L3WOHN=shuffle([
  {q:"'zu Hause' означает:",opts:["домой","дома (нахожусь)","в дом соседа","уходить"],ans:1,exp:"zu Hause = дома (состояние, нахожусь)",hint:"Wohnen"},
  {q:"'nach Hause' означает:",opts:["дома","из дома","домой (движение)","в дом соседа"],ans:2,exp:"nach Hause = домой (движение к дому)",hint:"Wohnen"},
  {q:"'die Miete' — это:",opts:["ночь","аренда/квартплата","улица","коридор"],ans:1,hint:"Wohnen"},
  {q:"sp в начале слова произносится как:",opts:["сп","шп","сб","зп"],ans:1,exp:"sp = шп: sprechen, Spiegel, Spüle",hint:"Aussprache"},
  {q:"st в начале слова произносится как:",opts:["ст","шт","зд","сд"],ans:1,exp:"st = шт: Stadt, Stuhl, Straße",hint:"Aussprache"},
  {q:"'das Doppelzimmer' — это:",opts:["одноместный номер","двухместный номер","коридор","гостиная"],ans:1,hint:"Hotel"},
  {q:"'übernachten' значит:",opts:["обедать","ночевать","уезжать","работать"],ans:1,hint:"Hotel"},
  {q:"'der Urlaub' — это:",opts:["работа","урок","отпуск/каникулы","улица"],ans:2,hint:"Urlaub"},
  {q:"das Dorf → Plural:",opts:["Dorfe","Dörfer","Dorfen","Dorfes"],ans:1,exp:'das Dorf, "-er → die Dörfer',hint:"Plural"},
  {q:"die Stadt → Plural:",opts:["Städten","Stadtse","Städte","Stadts"],ans:2,exp:'die Stadt, "-e → die Städte',hint:"Plural"},
]).slice(0,8);

// ═══════════════════ GROSSER TEST — ДАННЫЕ И КОМПОНЕНТЫ ════════════════════════

// ─── Данные для Lückentext ────────────────────────────────────────────────────
const LUECKEN_L1=shuffle([
  {sent:"Ich ___ aus der Ukraine.",         opts:["komme","kommst","kommt","kommen"],  ans:0,ru:"Я из Украины.",                       hint:"kommen"},
  {sent:"Du ___ sehr gut Deutsch.",         opts:["sprichst","spricht","spreche","sprechen"],ans:0,ru:"Ты хорошо говоришь по-немецки.", hint:"sprechen"},
  {sent:"Wie ___ Sie?",                     opts:["heiße","heißt","heißen","heißt"],   ans:2,ru:"Как вас зовут?",                     hint:"heißen"},
  {sent:"Ich ___ Lehrerin von Beruf.",      opts:["habe","heißt","bin","komme"],       ans:2,ru:"Я учительница по профессии.",         hint:"sein"},
  {sent:"Wir ___ aus Deutschland.",         opts:["kommt","kommen","komme","kommst"],  ans:1,ru:"Мы из Германии.",                    hint:"kommen"},
  {sent:"___ kommen Sie?",                  opts:["Was","Wie","Wer","Woher"],          ans:3,ru:"Откуда вы?",                         hint:"W-Frage"},
  {sent:"Ich ___ neu hier im Haus.",        opts:["haben","bin","komme","heiße"],      ans:1,ru:"Я новенький здесь в доме.",           hint:"sein"},
  {sent:"Sie ___ Spanisch und Englisch.",   opts:["sprichst","sprecht","spricht","sprechen"],ans:2,ru:"Она говорит по-испански и английски.",hint:"sprechen"},
  {sent:"___ heißt du?",                    opts:["Was","Woher","Wie","Wo"],           ans:2,ru:"Как тебя зовут?",                    hint:"W-Frage"},
  {sent:"Ihr ___ aus Kanada.",              opts:["kommen","kommt","komme","kommst"],  ans:1,ru:"Вы из Канады.",                      hint:"kommen (ihr)"},
]);
const LUECKEN_L2=shuffle([
  {sent:"Er ___ aus Spanien.",              opts:["komme","kommst","kommt","kommen"],  ans:2,ru:"Он из Испании.",                     hint:"kommen (er)"},
  {sent:"Sie ___ Türkisch und Deutsch.",    opts:["sprichst","spricht","spreche","sprechen"],ans:1,ru:"Она говорит по-турецки и немецки.",hint:"sprechen (sie)"},
  {sent:"Das ___ ein Tisch.",               opts:["bist","bin","ist","sind"],          ans:2,ru:"Это стол.",                          hint:"sein"},
  {sent:"Die Lampe ___ 15 Euro.",           opts:["kosten","kostest","kostet","koste"],ans:2,ru:"Лампа стоит 15 евро.",               hint:"kosten (sie)"},
  {sent:"Wie ___ das auf Deutsch?",         opts:["heiße","heißt","heißen","bist"],    ans:1,ru:"Как это называется по-немецки?",     hint:"heißen"},
  {sent:"Ich ___ in der Schillerstraße.",   opts:["wohnst","wohne","wohnt","wohnen"], ans:1,ru:"Я живу на Шиллерштрассе.",           hint:"wohnen"},
  {sent:"___ ist der Artikel?",             opts:["Was","Wie","Wer","Wo"],             ans:1,ru:"Какой артикль?",                     hint:"W-Frage"},
  {sent:"Er ___ Spanier.",                  opts:["bin","bist","ist","sind"],          ans:2,ru:"Он испанец.",                        hint:"sein (er)"},
  {sent:"Die Stühle ___ 30 Euro.",          opts:["kostet","koste","kosten","kostest"],ans:2,ru:"Стулья стоят 30 евро.",              hint:"kosten (sie Pl.)"},
  {sent:"Woher ___ Frau Alvarez?",          opts:["komme","kommst","kommt","kommen"],  ans:2,ru:"Откуда госпожа Альварес?",           hint:"kommen (sie)"},
]);
const LUECKEN_L3=shuffle([
  {sent:"Wir haben ___ Teppich.",           opts:["keinen","keine","kein","nicht"],    ans:0,ru:"У нас нет ковра.",                   hint:"kein (m Akk.)"},
  {sent:"Ich brauche ___ Lampe.",           opts:["keinen","keine","kein","nicht"],    ans:1,ru:"Мне не нужна лампа.",                hint:"kein (f Akk.)"},
  {sent:"Ich kaufe ___ Stuhl.",             opts:["der","die","das","den"],            ans:3,ru:"Я покупаю стул.",                    hint:"Akkusativ m"},
  {sent:"Wie findest du ___ Sofa?",         opts:["der","die","das","den"],            ans:2,ru:"Как тебе нравится диван?",           hint:"Akkusativ n"},
  {sent:"Das Zimmer ist klein, ___ gemütlich.", opts:["und","oder","aber","weil"],     ans:2,ru:"Комната маленькая, но уютная.",      hint:"Konjunktion"},
  {sent:"Die Wohnung ___ 500 Euro.",        opts:["koste","kostet","kosten","kostest"],ans:1,ru:"Квартира стоит 500 евро.",           hint:"kosten"},
  {sent:"Ich habe ___ Fernseher.",          opts:["keinen","keine","kein","nicht"],    ans:0,ru:"У меня нет телевизора.",             hint:"kein (m Akk.)"},
  {sent:"Wie viele Zimmer ___ Sie?",        opts:["habe","hast","hat","haben"],        ans:3,ru:"Сколько у вас комнат?",              hint:"haben (Sie)"},
  {sent:"Das ist ___ Tisch. (отрицание)",   opts:["kein","keine","keinen","nicht"],    ans:0,ru:"Это не стол.",                       hint:"kein (m Nom.)"},
  {sent:"Ich kaufe ___ Lampe.",             opts:["der","die","das","den"],            ans:1,ru:"Я покупаю лампу.",                   hint:"Akkusativ f"},
]);
const AKKU_BLITZ=shuffle([
  {sent:"Ich kaufe ___ Tisch. (m)",         opts:["der","den","die","das"],            ans:1,exp:"m Akk: der→den"},
  {sent:"Ich brauche ___ Lampe. (f)",       opts:["die","den","das","der"],            ans:0,exp:"f Akk: die bleibt die"},
  {sent:"Er kauft ___ Sofa. (n)",           opts:["den","die","das","dem"],            ans:2,exp:"n Akk: das bleibt das"},
  {sent:"Ich habe ___ Stuhl. (m, indef.)",  opts:["ein","eine","einen","einem"],       ans:2,exp:"m Akk unbestimmt: einen"},
  {sent:"Sie hat ___ Küche. (f, indef.)",   opts:["ein","eine","einen","einem"],       ans:1,exp:"f Akk: eine"},
  {sent:"Da ist ___ Schrank. (отрицание m)",opts:["kein","keine","keinen","nicht"],    ans:0,exp:"m Nom.: kein Schrank"},
  {sent:"Ich brauche ___ Bett. (n, indef.)",opts:["ein","eine","einen","einem"],       ans:0,exp:"n Akk: ein Bett"},
  {sent:"Sie kaufen ___ Sessel. (m)",       opts:["der","den","die","das"],            ans:1,exp:"m Akk: der→den"},
]);

// ─── Данные для Zuordnung ─────────────────────────────────────────────────────
const ZUORD_L1=[
  {de:"Guten Morgen!",          ru:"Доброе утро!"},
  {de:"Auf Wiedersehen!",       ru:"До свидания!"},
  {de:"Entschuldigung!",        ru:"Извините!"},
  {de:"Wie geht es Ihnen?",     ru:"Как у вас дела?"},
  {de:"Woher kommen Sie?",      ru:"Откуда вы?"},
  {de:"von Beruf",              ru:"по профессии"},
];
const ZUORD_L1_BERUFE=[
  {de:"Arzt",                   ru:"Ärztin"},
  {de:"Lehrer",                 ru:"Lehrerin"},
  {de:"Ingenieur",              ru:"Ingenieurin"},
  {de:"Verkäufer",              ru:"Verkäuferin"},
  {de:"Friseur",                ru:"Friseurin"},
  {de:"Elektriker",             ru:"Elektrikerin"},
];
const ZUORD_L2=[
  {de:"Pl.",                    ru:"Plural"},
  {de:"m.",                     ru:"maskulin"},
  {de:"f.",                     ru:"feminin"},
  {de:"n.",                     ru:"neutral"},
  {de:"Str.",                   ru:"Straße"},
  {de:"PLZ",                    ru:"Postleitzahl"},
];
const ZUORD_L3=[
  {de:"das Bett",               ru:"das Schlafzimmer"},
  {de:"der Herd",               ru:"die Küche"},
  {de:"die Badewanne",          ru:"das Bad"},
  {de:"das Sofa",               ru:"das Wohnzimmer"},
  {de:"der Schreibtisch",       ru:"das Arbeitszimmer"},
  {de:"die Spüle",              ru:"die Küche"},
];

// ─── Данные для Wortstellung ──────────────────────────────────────────────────
const WSENTS_L1=[
  {w:["Wie","heißen","Sie","?"],                               ru:"Как вас зовут?"},
  {w:["Ich","komme","aus","der","Ukraine","."],                ru:"Я из Украины."},
  {w:["Was","sind","Sie","von","Beruf","?"],                   ru:"Кем вы работаете?"},
  {w:["Ich","bin","Lehrerin","von","Beruf","."],               ru:"Я учительница по профессии."},
  {w:["Wie","ist","Ihre","Handynummer","?"],                   ru:"Какой ваш номер телефона?"},
  {w:["Ich","wohne","in","Köln","."],                          ru:"Я живу в Кёльне."},
  {w:["Wir","lernen","Deutsch","."],                           ru:"Мы учим немецкий."},
  {w:["Woher","kommst","du","?"],                              ru:"Откуда ты?"},
];
const WSENTS_L2=[
  {w:["Woher","kommen","Sie","?"],                             ru:"Откуда вы?"},
  {w:["Er","kommt","aus","Spanien","."],                       ru:"Он из Испании."},
  {w:["Welche","Sprachen","sprechen","Sie","?"],               ru:"На каких языках вы говорите?"},
  {w:["Das","ist","eine","Tasche","."],                        ru:"Это сумка."},
  {w:["Die","Lampe","kostet","20","Euro","."],                 ru:"Лампа стоит 20 евро."},
  {w:["Wie","ist","Ihre","Adresse","?"],                       ru:"Какой ваш адрес?"},
  {w:["Ich","wohne","in","der","Schillerstraße","18","."],     ru:"Я живу на Шиллерштрассе 18."},
  {w:["Wie","heißt","das","auf","Deutsch","?"],                ru:"Как это называется по-немецки?"},
];
const WSENTS_L3=[
  {w:["Was","kostet","die","Wohnung","?"],                     ru:"Сколько стоит квартира?"},
  {w:["Ich","kaufe","den","Stuhl","."],                        ru:"Я покупаю стул."},
  {w:["Wir","brauchen","eine","Spülmaschine","."],             ru:"Нам нужна посудомойка."},
  {w:["Die","Wohnung","ist","klein","aber","hell","."],        ru:"Квартира маленькая, но светлая."},
  {w:["Wie","findest","du","die","Lampe","?"],                 ru:"Как тебе нравится лампа?"},
  {w:["Ich","habe","keinen","Fernseher","."],                  ru:"У меня нет телевизора."},
  {w:["Das","Zimmer","hat","einen","Balkon","."],              ru:"В комнате есть балкон."},
  {w:["Wie","viele","Zimmer","haben","Sie","?"],               ru:"Сколько у вас комнат?"},
];

// ─── LueckenQuiz ─────────────────────────────────────────────────────────────
function LueckenQuiz({items}){
  const qs=useState(()=>shuffle(items))[0];
  const[idx,setIdx]=useState(0);const[sel,setSel]=useState(null);
  const[score,setScore]=useState(0);const[done,setDone]=useState(false);const[log,setLog]=useState([]);
  const q=qs[idx];const parts=q.sent.split("___");
  const pick=(i)=>{if(sel!==null)return;setSel(i);if(i===q.ans)setScore(s=>s+1);setLog(l=>[...l,i===q.ans]);};
  const next=()=>{if(idx+1>=qs.length)setDone(true);else{setIdx(i=>i+1);setSel(null);}};
  const reset=()=>{setIdx(0);setSel(null);setScore(0);setDone(false);setLog([]);};
  if(done)return(
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:48}}>{score/qs.length>=.9?"🏆":score/qs.length>=.6?"👍":"💪"}</div>
      <div style={{fontSize:32,fontWeight:900,color:C.green,margin:"8px 0 4px"}}>{score}/{qs.length}</div>
      <div style={{color:C.muted,marginBottom:14}}>{score===qs.length?"Perfekt!":score/qs.length>=.7?"Gut gemacht!":"Nochmal üben!"}</div>
      <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:18}}>
        {log.map((r,i)=><span key={i} style={{width:10,height:10,borderRadius:"50%",background:r?C.green:C.red,display:"inline-block"}}/>)}
      </div>
      <button onClick={reset} style={btnSt(C.green,C.greenBg)}>🔄 Повторить</button>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{color:C.muted,fontSize:12}}>{idx+1}/{qs.length}</span>
        <span style={{color:C.green,fontSize:12}}>✓{score}</span>
      </div>
      <div style={{height:3,background:C.border,borderRadius:3,marginBottom:12,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${idx/qs.length*100}%`,background:C.green,transition:"width .3s"}}/>
      </div>
      {q.hint&&<div style={{marginBottom:8}}><Pill c={C.purple}>{q.hint}</Pill></div>}
      <Box s={{marginBottom:12}}>
        <div style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:1.9}}>
          {parts[0]}
          <span style={{display:"inline-block",minWidth:90,padding:"1px 10px",
            borderBottom:`2.5px solid ${sel===null?C.blue:sel===q.ans?C.green:C.red}`,
            color:sel===null?C.dim:sel===q.ans?C.green:C.red,
            fontWeight:900,textAlign:"center",transition:"all .2s"}}>
            {sel!==null?q.opts[sel]:"___"}
          </span>
          {parts[1]}
        </div>
        {q.ru&&<div style={{fontSize:12,color:C.muted,marginTop:4}}>🇺🇦 {q.ru}</div>}
      </Box>
      <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:10}}>
        {q.opts.map((o,i)=>{
          let bc=C.border,bg=C.card,tc=C.text;
          if(sel!==null){if(i===q.ans){bc=C.green;bg=C.greenBg;tc=C.green;}else if(i===sel){bc=C.red;bg=C.redBg;tc=C.red;}}
          return(
            <button key={i} onClick={()=>pick(i)}
              style={{border:`1.5px solid ${bc}`,background:bg,color:tc,borderRadius:10,
                padding:"11px 14px",fontSize:14,fontWeight:500,cursor:"pointer",textAlign:"left",
                display:"flex",gap:10,alignItems:"center"}}>
              <span style={{width:23,height:23,borderRadius:6,background:"rgba(255,255,255,.04)",
                fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {["A","B","C","D"][i]}
              </span>{o}
            </button>
          );
        })}
      </div>
      {sel!==null&&(
        <Box c={sel===q.ans?C.green:C.red} s={{marginBottom:10}}>
          <span style={{color:sel===q.ans?C.green:C.red,fontWeight:800}}>
            {sel===q.ans?"✓ Richtig! ":"✗ Falsch — "+q.opts[q.ans]+" "}
          </span>
          {q.exp&&<span style={{color:C.text,fontSize:13}}>{q.exp}</span>}
        </Box>
      )}
      {sel!==null&&<button onClick={next} style={{...btnSt(C.blue,C.blueBg),width:"100%"}}>{idx+1>=qs.length?"Результат →":"Weiter →"}</button>}
    </div>
  );
}

// ─── Zuordnung (matching) ─────────────────────────────────────────────────────
function Zuordnung({pairs,leftLabel="Deutsch",rightLabel="Übersetzung"}){
  const SHOW=Math.min(6,pairs.length);
  const[items]=useState(()=>shuffle(pairs).slice(0,SHOW));
  const[rightOrder]=useState(()=>shuffle([...Array(SHOW).keys()]));
  const[selLeft,setSelLeft]=useState(null);
  const[matched,setMatched]=useState({});
  const[doneRight,setDoneRight]=useState(new Set());
  const[wrongPair,setWrongPair]=useState(null);
  const[attempts,setAttempts]=useState(0);
  const allDone=Object.keys(matched).length===SHOW;
  const clickLeft=(i)=>{if(matched[i])return;setSelLeft(selLeft===i?null:i);setWrongPair(null);};
  const clickRight=(ri)=>{
    if(doneRight.has(ri)||selLeft===null)return;
    const orig=rightOrder[ri];
    setAttempts(a=>a+1);
    if(orig===selLeft){
      setMatched(m=>({...m,[selLeft]:true}));
      setDoneRight(s=>new Set([...s,ri]));
      setSelLeft(null);
    } else {
      setWrongPair({l:selLeft,r:ri});
      setTimeout(()=>{setWrongPair(null);setSelLeft(null);},700);
    }
  };
  const reset=()=>{setSelLeft(null);setMatched({});setDoneRight(new Set());setWrongPair(null);setAttempts(0);};
  if(allDone)return(
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:48}}>{attempts<=SHOW?"🏆":attempts<=SHOW*1.5?"👍":"💪"}</div>
      <div style={{fontSize:26,fontWeight:900,color:C.green,margin:"8px 0 4px"}}>{SHOW}/{SHOW} совмещено!</div>
      <div style={{color:C.muted,marginBottom:16}}>Попыток: {attempts}</div>
      <button onClick={reset} style={btnSt(C.green,C.greenBg)}>🔄 Повторить</button>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:12,color:C.muted}}>Совмести пары · нажми слева, потом справа</div>
        <div style={{fontSize:12,color:C.green}}>✓ {Object.keys(matched).length}/{SHOW}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:10,color:C.dim,fontWeight:700,textAlign:"center",marginBottom:2,textTransform:"uppercase",letterSpacing:1}}>{leftLabel}</div>
          {items.map((item,i)=>{
            const isM=matched[i],isSel=selLeft===i,isW=wrongPair?.l===i;
            const col=isM?C.green:isSel?C.blue:isW?C.red:C.border;
            return(
              <button key={i} onClick={()=>clickLeft(i)}
                style={{border:`1.5px solid ${col}`,background:isM?C.greenBg:isSel?C.blueBg:isW?C.redBg:C.card,
                  color:isM?C.green:isSel?C.blue:C.text,borderRadius:10,padding:"9px 8px",
                  fontSize:12,fontWeight:700,cursor:isM?"default":"pointer",textAlign:"center",transition:"all .15s"}}>
                {isM?"✓":item.de}
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:10,color:C.dim,fontWeight:700,textAlign:"center",marginBottom:2,textTransform:"uppercase",letterSpacing:1}}>{rightLabel}</div>
          {rightOrder.map((origIdx,ri)=>{
            const item=items[origIdx];
            const isM=doneRight.has(ri),isW=wrongPair?.r===ri;
            const col=isM?C.green:isW?C.red:C.border;
            return(
              <button key={ri} onClick={()=>clickRight(ri)}
                style={{border:`1.5px solid ${col}`,background:isM?C.greenBg:isW?C.redBg:C.card,
                  color:isM?C.green:C.text,borderRadius:10,padding:"9px 8px",
                  fontSize:12,fontWeight:600,cursor:isM?"default":"pointer",textAlign:"center",transition:"all .15s"}}>
                {isM?"✓":item.ru}
              </button>
            );
          })}
        </div>
      </div>
      {selLeft!==null&&!wrongPair&&(
        <div style={{marginTop:10,fontSize:12,color:C.blue,textAlign:"center"}}>
          Выбрано: <b>{items[selLeft].de}</b> → нажми правую пару
        </div>
      )}
    </div>
  );
}

// ─── Wortstellung ─────────────────────────────────────────────────────────────
function WortstellungGame({sents}){
  const S=useState(()=>shuffle(sents))[0];
  const[idx,setIdx]=useState(0);
  const[chosen,setChosen]=useState([]);
  const[avail,setAvail]=useState(()=>shuffle(S[0].w.filter(x=>x!=="."&&x!=="?")));
  const[res,setRes]=useState(null);
  const[sc,setSc]=useState(0);
  const[done,setDone]=useState(false);
  const s=S[idx];const tgt=s.w.filter(x=>x!=="."&&x!=="?");
  const pick=(word,i)=>{if(res)return;setChosen(c=>[...c,word]);setAvail(a=>a.filter((_,j)=>j!==i));};
  const unpick=(i)=>{if(res)return;const w=chosen[i];setChosen(c=>c.filter((_,j)=>j!==i));setAvail(a=>[...a,w]);};
  const check=()=>{const ok=chosen.join(" ")===tgt.join(" ");if(ok)setSc(s=>s+1);setRes(ok?"ok":"fail");};
  const next=()=>{
    if(idx+1>=S.length){setDone(true);return;}
    const ni=idx+1;setIdx(ni);setChosen([]);
    setAvail(shuffle(S[ni].w.filter(x=>x!=="."&&x!=="?")));setRes(null);
  };
  const reset=()=>{setIdx(0);setChosen([]);setAvail(shuffle(S[0].w.filter(x=>x!=="."&&x!=="?")));setRes(null);setSc(0);setDone(false);};
  if(done)return(
    <div style={{textAlign:"center",padding:"24px 0"}}>
      <div style={{fontSize:48}}>{sc/S.length>=.9?"🏆":sc/S.length>=.6?"👍":"💪"}</div>
      <div style={{fontSize:30,fontWeight:900,color:C.green}}>{sc}/{S.length}</div>
      <button onClick={reset} style={{...btnSt(C.green,C.greenBg),marginTop:16}}>🔄 Повторить</button>
    </div>
  );
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{color:C.muted,fontSize:13}}>{idx+1}/{S.length}</span>
        <span style={{color:C.green,fontSize:13}}>✓{sc}</span>
      </div>
      <Box c={C.yellow} s={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:3}}>Составь предложение:</div>
        <div style={{fontSize:16,fontWeight:700,color:C.yellow}}>{s.ru}</div>
      </Box>
      <div style={{minHeight:48,background:C.card,border:`1.5px solid ${res==="ok"?C.green:res==="fail"?C.red:C.blue}`,
        borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        {chosen.length===0
          ?<span style={{color:C.dim,fontSize:13}}>Нажимай слова снизу...</span>
          :chosen.map((w,i)=><button key={i} onClick={()=>unpick(i)}
              style={{background:C.blueBg,border:`1px solid ${C.blue}`,color:C.blue,borderRadius:8,padding:"5px 11px",fontSize:14,cursor:"pointer"}}>{w}</button>)}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
        {avail.map((w,i)=><button key={i} onClick={()=>pick(w,i)}
          style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"7px 13px",fontSize:14,cursor:"pointer"}}>{w}</button>)}
      </div>
      {res&&<Box c={res==="ok"?C.green:C.red} s={{marginBottom:10}}>
        {res==="ok"
          ?<span style={{color:C.green,fontWeight:800}}>✓ Richtig!</span>
          :<span style={{color:C.red,fontWeight:800}}>✗ Richtig: <b style={{color:C.text}}>{tgt.join(" ")}.</b></span>}
      </Box>}
      {!res&&chosen.length===tgt.length&&<button onClick={check} style={{...btnSt(C.yellow,C.yellowBg),width:"100%"}}>Проверить ✓</button>}
      {res&&<button onClick={next} style={{...btnSt(C.blue,C.blueBg),width:"100%"}}>{idx+1>=S.length?"Результат →":"Weiter →"}</button>}
    </div>
  );
}

// ─── GrosserTest контейнер с табами ──────────────────────────────────────────
function GrosserTestContainer({rounds}){
  const[round,setRound]=useState(0);
  const r=rounds[round];
  return(
    <div>
      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
        {rounds.map((rd,i)=>(
          <button key={i} onClick={()=>setRound(i)} style={{
            flexShrink:0,padding:"7px 11px",borderRadius:10,
            border:`1.5px solid ${round===i?rd.col:C.border}`,cursor:"pointer",
            fontSize:12,fontWeight:700,background:round===i?rd.col+"22":C.card,
            color:round===i?rd.col:C.muted,whiteSpace:"nowrap"
          }}>{rd.icon} {rd.label}</button>
        ))}
      </div>
      <div style={{fontSize:11,color:C.dim,textAlign:"center",marginBottom:12}}>
        Раунд {round+1}/{rounds.length}: {r.label}
      </div>
      <div key={round}>
        {r.component()}
      </div>
    </div>
  );
}
function GrosserTest1(){return <GrosserTestContainer rounds={[
  {icon:"🎯",label:"Quiz",          col:C.yellow, component:()=><Quiz questions={Q_L1TEST}/>},
  {icon:"📝",label:"Lückentext",    col:C.blue,   component:()=><LueckenQuiz items={LUECKEN_L1}/>},
  {icon:"🔗",label:"Phrasen",       col:C.green,  component:()=><Zuordnung pairs={ZUORD_L1} leftLabel="Deutsch" rightLabel="Перевод"/>},
  {icon:"👔",label:"Berufe m/f",    col:C.purple, component:()=><Zuordnung pairs={ZUORD_L1_BERUFE} leftLabel="maskulin" rightLabel="feminin"/>},
  {icon:"🔤",label:"Wortstellung",  col:C.orange, component:()=><WortstellungGame sents={WSENTS_L1}/>},
]}/>;}
function GrosserTest2(){return <GrosserTestContainer rounds={[
  {icon:"🎯",label:"Quiz",          col:C.yellow, component:()=><Quiz questions={Q_L2TEST}/>},
  {icon:"📝",label:"Lückentext",    col:C.blue,   component:()=><LueckenQuiz items={LUECKEN_L2}/>},
  {icon:"🔗",label:"Abkürzungen",   col:C.teal,   component:()=><Zuordnung pairs={ZUORD_L2} leftLabel="Kürzel" rightLabel="Vollform"/>},
  {icon:"🔤",label:"Wortstellung",  col:C.orange, component:()=><WortstellungGame sents={WSENTS_L2}/>},
]}/>;}
function GrosserTest3(){return <GrosserTestContainer rounds={[
  {icon:"🎯",label:"Quiz",          col:C.yellow, component:()=><Quiz questions={Q_L3TEST}/>},
  {icon:"📝",label:"Lückentext",    col:C.blue,   component:()=><LueckenQuiz items={LUECKEN_L3}/>},
  {icon:"⚡",label:"Akkusativ",     col:C.red,    component:()=><LueckenQuiz items={AKKU_BLITZ}/>},
  {icon:"🔗",label:"Möbel→Zimmer",  col:C.green,  component:()=><Zuordnung pairs={ZUORD_L3} leftLabel="Möbel" rightLabel="Zimmer"/>},
  {icon:"🔤",label:"Wortstellung",  col:C.orange, component:()=><WortstellungGame sents={WSENTS_L3}/>},
]}/>;}

// ─── L4 — POSSESSIVARTIKEL ───────────────────────────────────────────────────
const Q_L4A=[
  {q:"Mein ___ heißt Max. (der Bruder)",     opts:["mein","meine","sein"],   ans:"mein",  note:"m → mein (без окончания)"},
  {q:"Das ist ___ Kind. (er/sein)",          opts:["sein","seine","ihr"],    ans:"sein",  note:"n → sein (без окончания)"},
  {q:"Wo wohnt ___ Familie? (du)",           opts:["dein","deine","ihre"],   ans:"deine", note:"f → deine (+e)"},
  {q:"___ Eltern wohnen in Berlin. (ich)",   opts:["Mein","Meine","Seine"],  ans:"Meine", note:"Plural → meine (+e)"},
  {q:"Das ist ___ Frau. (er)",               opts:["sein","seine","ihr"],    ans:"seine", note:"f → seine (+e)"},
  {q:"Wie heißen ___ Kinder? (Sie/formell)", opts:["Ihr","Ihre","Sein"],     ans:"Ihre",  note:"Plural (formell) → Ihre (+e)"},
  {q:"Das ist ___ Sohn. (sie/она)",          opts:["ihr","ihre","sein"],     ans:"ihr",   note:"m → ihr (без окончания)"},
  {q:"Wo wohnt ___ Bruder? (du)",            opts:["dein","deine","mein"],   ans:"dein",  note:"m → dein (без окончания)"},
  {q:"Das ist ___ Schwester. (ich)",         opts:["mein","meine","ihre"],   ans:"meine", note:"f → meine (+e)"},
  {q:"___ Kind ist zwei Jahre alt. (sie/она)",opts:["Ihr","Ihre","Sein"],    ans:"Ihr",   note:"n → ihr (без окончания)"},
];

function T4A(){
  const poss=[
    {pr:"ich",      m:"mein", n:"mein", f:"meine", pl:"meine"},
    {pr:"du",       m:"dein", n:"dein", f:"deine", pl:"deine"},
    {pr:"er / es",  m:"sein", n:"sein", f:"seine", pl:"seine"},
    {pr:"sie (она)",m:"ihr",  n:"ihr",  f:"ihre",  pl:"ihre"},
    {pr:"Sie",      m:"Ihr",  n:"Ihr",  f:"Ihre",  pl:"Ihre"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.teal}>
        <H c={C.teal}>👨‍👩‍👧 Possessivartikel im Singular</H>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr>
                <th/>
                {[{label:"m",col:C.blue},{label:"n",col:C.orange},{label:"f",col:C.purple},{label:"Pl.",col:C.purple}].map(({label,col})=>(
                  <th key={label} style={{padding:"3px 4px",textAlign:"center",fontSize:10,fontWeight:900,color:col,opacity:0.75}}>{label}</th>
                ))}
              </tr>
              <tr>
                {[{h:"",col:""},{h:"der Bruder",col:C.blue},{h:"das Kind",col:C.orange},{h:"die Schwester",col:C.purple},{h:"die Kinder",col:C.purple}].map(({h,col})=>(
                  <th key={h} style={{padding:"2px 6px 6px",fontWeight:700,fontSize:11,textAlign:"center",color:col||C.muted,borderBottom:`1px solid ${C.border}`}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {poss.map((row,i)=>(
                <tr key={row.pr} style={{background:i%2===0?C.card2:"transparent"}}>
                  <td style={{padding:"6px 8px",color:C.yellow,fontWeight:700,fontSize:12,whiteSpace:"nowrap"}}>{row.pr}</td>
                  {[row.m,row.n,row.f,row.pl].map((val,j)=>{
                    const hasE=val.endsWith("e");
                    return(
                      <td key={j} style={{padding:"6px 4px",textAlign:"center"}}>
                        <span style={{color:C.text,fontWeight:600}}>
                          {hasE
                            ? <>{val.slice(0,-1)}<span style={{color:C.orange,fontWeight:900}}>e</span></>
                            : val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
      <Box c={C.orange}>
        <H c={C.orange}>📐 Правило окончания</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {label:"m / n",sub:"der · das",ex:"mein Bruder · mein Kind",col:C.blue,end:"без окончания"},
            {label:"f / Plural",sub:"die · die Kinder",ex:"meine Schwester · meine Kinder",col:C.purple,end:"+e"},
          ].map(r=>(
            <div key={r.label} style={{background:C.card2,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
              <div style={{color:r.col,fontWeight:800,fontSize:15,marginBottom:2}}>{r.label}</div>
              <div style={{color:C.muted,fontSize:11,marginBottom:4}}>{r.sub}</div>
              <div style={{color:C.orange,fontWeight:800,fontSize:14,marginBottom:4}}>{r.end}</div>
              <div style={{color:C.muted,fontSize:11}}>{r.ex}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.purple}>
        <H c={C.purple}>⚡ ihr vs sein</H>

        {/* Главное правило */}
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}40`,borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.yellow,lineHeight:1.7}}>
          ⚡ Форма <b>ihr/ihre</b> и <b>sein/seine</b> зависит от рода <b>предмета</b> (о котором говорим), а не от рода владельца
        </div>

        {/* Два блока: sie и er/es */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>

          {/* sie → ihr/ihre */}
          <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
            <div style={{marginBottom:8}}>
              <span style={{color:C.purple,fontWeight:800,fontSize:14}}>sie</span>
              <span style={{color:C.muted,fontSize:12}}> = она → её вещь = </span>
              <span style={{color:C.text,fontWeight:800}}>ihr / ihre</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"auto auto 1fr",gap:"4px 10px",fontSize:12,alignItems:"center",marginBottom:6}}>
              <span style={{color:C.blue,fontWeight:700}}>der / das</span>
              <span style={{color:C.text,fontWeight:800}}>ihr</span>
              <span style={{color:C.muted}}>ihr Mann · ihr Kind</span>
              <span style={{color:C.purple,fontWeight:700}}>die / Pl.</span>
              <span style={{color:C.text,fontWeight:800}}>ihr<span style={{color:C.orange}}>e</span></span>
              <span style={{color:C.muted}}>ihre Frau · ihre Kinder</span>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:6,fontSize:11,color:C.muted,lineHeight:1.8}}>
              Das ist <b style={{color:C.text}}>ihr</b> Mann. = Это её муж.<br/>
              Das ist <b style={{color:C.text}}>ihre</b> Tochter. = Это её дочь.
            </div>
          </div>

          {/* er/es → sein/seine */}
          <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
            <div style={{marginBottom:8}}>
              <span style={{color:C.blue,fontWeight:800,fontSize:14}}>er / es</span>
              <span style={{color:C.muted,fontSize:12}}> = он/оно → его вещь = </span>
              <span style={{color:C.text,fontWeight:800}}>sein / seine</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"auto auto 1fr",gap:"4px 10px",fontSize:12,alignItems:"center",marginBottom:6}}>
              <span style={{color:C.blue,fontWeight:700}}>der / das</span>
              <span style={{color:C.text,fontWeight:800}}>sein</span>
              <span style={{color:C.muted}}>sein Vater · sein Kind</span>
              <span style={{color:C.purple,fontWeight:700}}>die / Pl.</span>
              <span style={{color:C.text,fontWeight:800}}>sein<span style={{color:C.orange}}>e</span></span>
              <span style={{color:C.muted}}>seine Mutter · seine Kinder</span>
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:6,fontSize:11,color:C.muted,lineHeight:1.8}}>
              Das ist <b style={{color:C.text}}>sein</b> Vater. = Это его отец.<br/>
              Das ist <b style={{color:C.text}}>seine</b> Mutter. = Это его мать. <span style={{color:C.orange}}>(Mutter = die → +e)</span>
            </div>
          </div>
        </div>

        {/* Подсказка ihr/Ihr */}
        <div style={{background:C.orangeBg,border:`1px solid ${C.orange}40`,borderRadius:8,padding:"8px 10px",fontSize:11,color:C.orange,lineHeight:1.7}}>
          ⚠️ <b>ihr</b> = её (sie) · <b>Ihr</b> = Ваш (Sie formell) — одинаково пишутся, смотри на контекст!
        </div>
      </Box>
      <Box c={C.green}>
        <H c={C.green}>✏️ Примеры</H>
        {[
          ["Ist das dein Buch?","Ja, das ist mein Buch."],
          ["Wo wohnen Ihre Eltern?","Meine Eltern wohnen in Kyiv."],
          ["Das ist sein Freund Luka.","Er kommt aus Kroatien."],
          ["Das ist ihre Schwester.","Und das sind ihre Töchter."],
        ].map(([a,b],i)=>(
          <div key={i} style={{background:C.card2,borderRadius:8,padding:"8px 10px",marginBottom:6}}>
            <div style={{color:C.blue,fontSize:13,marginBottom:2}}>— {a}</div>
            <div style={{color:C.green,fontSize:13}}>— {b}</div>
          </div>
        ))}
      </Box>
    </div>
  );
}

const LEKTIONEN=[
  {
    id:"L1",num:"1",title:"Willkommen!",
    sub:"A Guten Tag · B Buchstaben · C Formell und informell · D Zahlen · E Beruf",
    date:"Seite 9–18",col:C.blue,
    sections:[
      {id:"d1",  icon:"💬",title:"Dialogfragen L1",       sub:"Все фразы для диалога",          time:"∞",     col:C.teal,  hasT:false, ex:()=><DialogCards lId="L1"/>},
      {id:"1a",  icon:"👋",title:"A · Guten Tag",         sub:"Приветствия и знакомство",        time:"6 мин", col:C.blue,  hasT:true,  th:()=><T1A/>, ex:()=><Quiz questions={Q_1A}/>},
      {id:"1b",  icon:"🔤",title:"B · Buchstaben",        sub:"Алфавит и правописание",          time:"5 мин", col:C.purple,hasT:true,  th:()=><T1B/>, ex:()=><AlphabetTrainer/>},
      {id:"1c",  icon:"💬",title:"C · Formell und informell",sub:"Sie/du + глаголы без er/sie",  time:"7 мин", col:C.green, hasT:true,  th:()=><T1C/>, ex:()=><Quiz questions={Q_1C}/>},
      {id:"1d",  icon:"🔢",title:"D · Zahlen bis 20",     sub:"Числа 0–20 и телефон",           time:"5 мин", col:C.orange,hasT:true,  th:()=><T1D/>, ex:()=><ZahlenTrainer20/>},
      {id:"1e",  icon:"👔",title:"E · Was sind Sie von Beruf?",sub:"Профессии m/f форма",        time:"6 мин", col:C.yellow,hasT:true,  th:()=><T1E/>, ex:()=><Quiz questions={Q_1E}/>},
      {id:"1g",  icon:"📝",title:"Großschreibung",            sub:"Правила заглавных букв",        time:"4 мин", col:C.orange,hasT:true,  th:()=><TGross/>, ex:()=><Quiz questions={Q_GROSS}/>},
      {id:"t1",  icon:"🎯",title:"Großer Test L1",        sub:"Quiz · Lücken · Zuordnung · m/f · Wortstellung", time:"20 мин",col:C.yellow,hasT:false, ex:()=><GrosserTest1/>},
    ]
  },
  {
    id:"L2",num:"2",title:"Alte Heimat, neue Heimat",
    sub:"A Nationalität · B Im Deutschkurs · C Zahlen · D Adresse",
    date:"Seite 19–27",col:C.purple,
    sections:[
      {id:"d2",  icon:"💬",title:"Dialogfragen L2",       sub:"Все фразы для диалога",          time:"∞",     col:C.teal,  hasT:false, ex:()=><DialogCards lId="L2"/>},
      {id:"2a",  icon:"🌍",title:"A · Nationalität und Sprachen",sub:"Страны + er/es/sie глаголы", time:"7 мин", col:C.blue,  hasT:true,  th:()=><T2A/>, ex:()=><Quiz questions={Q_2A_S}/>},
      {id:"wf",  icon:"❓",title:"W-Fragen",               sub:"Вопросительные слова + порядок слов",time:"5 мин",col:C.yellow,hasT:true, th:()=><TWFragen/>, ex:()=><Quiz questions={Q_WF_S}/>},
      {id:"2b",  icon:"📚",title:"B · Im Deutschkurs",    sub:"Vokabular + Artikel + Plural",    time:"10 мин",col:C.orange,hasT:true,  th:()=><T2B/>, ex:()=><Quiz questions={Q_2B}/>},
      {id:"2c",  icon:"🔢",title:"C · Zahlen bis 1000",   sub:"Числа 20–1000",                   time:"5 мин", col:C.teal,  hasT:true,  th:()=><ZahlenTrainer1000/>, ex:()=><ZahlenTrainer1000/>},
      {id:"2d",  icon:"📬",title:"D · Wie ist Ihre Adresse?",sub:"Адрес, телефон, e-mail",      time:"5 мин", col:C.purple,hasT:true,  th:()=><AdresseTrainer/>,    ex:()=><AdresseTrainer/>},
      {id:"abk",  icon:"🔤",title:"Abkürzungen",              sub:"Pl./m./f./n./Tel./Nr./€/Str.", time:"3 мин", col:C.teal,  hasT:true,  th:()=><TAbkuerzungen/>, ex:()=><Quiz questions={Q_ABK}/>},
      {id:"t2",  icon:"🎯",title:"Großer Test L2",        sub:"Quiz · Lücken · Abkürzungen · Wortstellung",     time:"20 мин",col:C.yellow,hasT:false, ex:()=><GrosserTest2/>},
    ]
  },
  {
    id:"L3",num:"3",title:"Häuser und Wohnungen",
    sub:"Möbel · haben · kein/keine · Farben · Akkusativ",
    date:"KB Seite 29–33 · AB 28–31",col:C.green,
    sections:[
      {id:"d3",  icon:"💬",title:"Dialogfragen L3",          sub:"Фразы для диалога",                  time:"∞",     col:C.teal,  hasT:false, th:null,              ex:()=><DialogCards lId="L3"/>},
      {id:"3i",  icon:"🛋️",title:"A · Möbel und Zimmer",     sub:"Мебель, комнаты, описание квартиры", time:"5 мин", col:C.blue,  hasT:true,  th:()=><T3Intro/>,    ex:()=><Quiz questions={Q_L3FARBE}/>},
      {id:"3a",  icon:"🔑",title:"B · Wir brauchen...",       sub:"haben + kein/keine + Akkusativ",     time:"8 мин", col:C.green, hasT:true,  th:()=><T3A/>,        ex:()=><Quiz questions={Q_L3A}/>},
      {id:"3f",  icon:"🎨",title:"C · Farben und Meinungen",  sub:"Цвета + как выразить мнение",        time:"4 мин", col:C.orange,hasT:true,  th:()=><T3Farben/>,   ex:()=><Quiz questions={Q_L3FARBE}/>},
      {id:"3k",  icon:"📊",title:"Akkusativ",                 sub:"Nominativ vs Akkusativ",             time:"6 мин", col:C.red,   hasT:true,  th:()=><T3Akkusativ/>,ex:()=><Quiz questions={Q_L3AKKU}/>},
      {id:"3b",  icon:"❓",title:"Ja/Nein-Fragen",            sub:"Ist das ein Tisch? + новая мебель",  time:"5 мин", col:C.blue,  hasT:true,  th:()=><T3B/>,        ex:()=><Quiz questions={Q_L3B}/>},
      {id:"3c",  icon:"🏢",title:"Mehrfamilienhaus",          sub:"es gibt + Etagen + Richtungen",      time:"5 мин", col:C.purple,hasT:true,  th:()=><T3C/>,        ex:()=><Quiz questions={Q_L3C}/>},
      {id:"3d",  icon:"🏠",title:"D · Eine Wohnung suchen",   sub:"Wohnungsanzeigen + Adjektive",       time:"6 мин", col:C.orange,hasT:true,  th:()=><T3Poss/>,     ex:()=><Quiz questions={Q_L3POSS}/>},
      {id:"3e",  icon:"🏘️",title:"E · Wie ist Ihre Wohnung?", sub:"Описание квартиры + диалог",        time:"6 мин", col:C.teal,  hasT:true,  th:()=><T3WohnVok/>,  ex:()=><Quiz questions={Q_L3WOHN}/>},
      {id:"3g",  icon:"📋",title:"Abkürzungen Wohnung",       sub:"Zi. · EFH · EBK · ZH · NK · qm",    time:"3 мин", col:C.blue,  hasT:true,  th:()=><AbkBlock/>,   ex:()=><Quiz questions={Q_ABK_WOHN}/>},
      {id:"t3",  icon:"🎯",title:"Großer Test L3",            sub:"Quiz · Lücken · Akkusativ · Möbel · Wortstellung",time:"25 мин",col:C.yellow,hasT:false, th:null,              ex:()=><GrosserTest3/>},
    ]
  },
  {
    id:"L4",num:"4",title:"Familienleben",
    sub:"A Familienfotos · Possessivartikel · Familie",
    date:"KB Seite 39–...",col:C.teal,
    sections:[
      {id:"d4",  icon:"💬",title:"Dialogfragen L4",          sub:"Фразы для диалога",                  time:"∞",     col:C.teal,  hasT:false, th:null,         ex:()=><DialogCards lId="L4"/>},
      {id:"4a",  icon:"👨‍👩‍👧",title:"A · Familienfotos",       sub:"Possessivartikel: mein/dein/sein/ihr", time:"7 мин", col:C.blue,  hasT:true,  th:()=><T4A/>, ex:()=><Quiz questions={Q_L4A}/>},
    ]
  },
];

// ═══════════════════════════════ APP ══════════════════════════════════════════
// ─── ДИАЛОГЕ — КЛЮЧЕВЫЕ ВОПРОСЫ ──────────────────────────────────────────────
function DialogFragenPage(){
  const [mode,setMode]=useState("fragen");
  const [sortNew,setSortNew]=useState(false); // false = старые первые (L1→L3)
  const [fm,setFm]=useState("f");
  const [openItems,setOpenItems]=useState(new Set());
  const togItem=(k)=>setOpenItems(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n;});

  const LMETA={
    L1:{label:"L1 · Willkommen!",          col:C.blue},
    L2:{label:"L2 · Alte Heimat, neue Heimat", col:C.purple},
    L3:{label:"L3 · Häuser und Wohnungen",  col:C.green},
    L4:{label:"L4 · Familienleben",         col:C.teal},
  };
  const filterFm=(pairs,lId)=>lId==="L1"?pairs.filter(p=>!p.fm||p.fm===fm):pairs;

  const lektIds=Object.keys(DIALOGE);
  const ordered=sortNew?[...lektIds].reverse():lektIds;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>

      {/* ── Вопросы / Фразы ── */}
      <div style={{display:"flex",gap:6,background:C.card2,borderRadius:12,padding:4}}>
        {[{id:"fragen",label:"❓ Вопросы"},{id:"phrasen",label:"📋 Фразы"}].map(t=>(
          <button key={t.id} onClick={()=>setMode(t.id)} style={{
            flex:1,padding:"7px 0",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
            background:mode===t.id?C.teal:"transparent",
            color:mode===t.id?"#000":C.muted,transition:"all .15s"
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── Сортировка (справа, под табами) ── */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button onClick={()=>{setSortNew(s=>!s);setOpenItems(new Set());}}
          style={{padding:"5px 12px",borderRadius:9,fontWeight:600,fontSize:12,cursor:"pointer",
            border:`1.5px solid ${C.border}`,background:sortNew?C.yellowBg:C.card,
            color:sortNew?C.yellow:C.muted,whiteSpace:"nowrap"}}>
          {sortNew?"🆕 Новые":"🕐 Старые"}
        </button>
      </div>

      {/* ── Контент по урокам ── */}
      {ordered.map(lId=>{
        const meta=LMETA[lId];
        const groups=DIALOGE[lId]||[];
        const isL1=lId==="L1";

        const hasContent=groups.some(g=>{
          const pairs=filterFm(g.pairs,lId);
          return mode==="fragen"?pairs.some(p=>p.q.includes("?")):pairs.some(p=>!p.q.includes("?"));
        });
        if(!hasContent)return null;

        return(
          <div key={lId} style={{display:"flex",flexDirection:"column",gap:8}}>

            {/* Заголовок урока */}
            <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:4}}>
              <div style={{background:meta.col+"22",border:`2px solid ${meta.col}`,color:meta.col,
                borderRadius:8,padding:"3px 10px",fontWeight:900,fontSize:13,flexShrink:0}}>{lId}</div>
              <div style={{color:meta.col,fontWeight:700,fontSize:13}}>{meta.label.split(" · ")[1]}</div>
            </div>

            {/* ── ВОПРОСЫ ── */}
            {mode==="fragen"&&groups.map((g,gi)=>{
              const items=filterFm(g.pairs,lId).filter(p=>p.q.includes("?"));
              if(!items.length)return null;
              const isHauptGruppe=isL1&&g.tag==="Основные";
              return(
                <div key={gi}>
                  {/* Пилл + fm-тогл для L1 Основные */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                    <Pill c={g.col}>{g.tag}</Pill>
                    {isHauptGruppe&&(
                      <div style={{display:"flex",gap:4}}>
                        {[{id:"f",label:"Formell"},{id:"i",label:"Informell"}].map(t=>(
                          <button key={t.id} onClick={()=>{setFm(t.id);setOpenItems(new Set());}} style={{
                            padding:"3px 10px",borderRadius:8,border:`1.5px solid ${fm===t.id?meta.col:C.border}`,
                            background:fm===t.id?meta.col+"22":"transparent",
                            color:fm===t.id?meta.col:C.muted,fontSize:12,fontWeight:700,cursor:"pointer"
                          }}>{t.label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {items.map((p,pi)=>{
                      const k=`${lId}-${gi}-${pi}`;const isO=openItems.has(k);
                      return(
                        <div key={pi} onClick={()=>togItem(k)}
                          style={{background:C.card,border:`1.5px solid ${isO?g.col:C.border}`,borderRadius:12,padding:"11px 14px",cursor:"pointer"}}>
                          <div style={{display:"flex",justifyContent:"space-between",gap:10}}>
                            <div style={{fontWeight:600,fontSize:14,color:C.text,flex:1,lineHeight:1.4}}>❓ {p.q}</div>
                            <span style={{color:C.muted,fontSize:14,flexShrink:0}}>{isO?"▲":"▼"}</span>
                          </div>
                          {isO&&(
                            <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                              <div style={{background:g.col+"15",border:`1px solid ${g.col}40`,borderRadius:8,padding:"10px 12px",marginBottom:p.note?8:0}}>
                                <div style={{fontSize:11,color:g.col,fontWeight:700,marginBottom:3}}>ОТВЕТ</div>
                                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.a}</div>
                              </div>
                              {p.note&&<div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,padding:"6px 10px",fontSize:12,color:C.yellow}}>💡 {p.note}</div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ── ФРАЗЫ — плоский список ── */}
            {mode==="phrasen"&&(()=>{
              const all=groups.flatMap(g=>filterFm(g.pairs,lId).filter(p=>!p.q.includes("?")).map(p=>({...p,col:g.col})));
              if(!all.length)return null;
              return(
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                  {all.map((p,pi)=>(
                    <div key={pi} style={{padding:"10px 14px",borderBottom:pi<all.length-1?`1px solid ${C.border}30`:"none"}}>
                      <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>{p.q}</div>
                      <div style={{fontSize:12,color:p.col,marginBottom:p.note?3:0}}>↩ {p.a}</div>
                      {p.note&&<div style={{fontSize:11,color:C.dim,marginTop:2}}>📝 {p.note}</div>}
                    </div>
                  ))}
                </div>
              );
            })()}

          </div>
        );
      })}
    </div>
  );
}

export default function App(){
  const [lId,setLId]=useState(null);
  const [sId,setSId]=useState(null);
  const [tab,setTab]=useState("th");
  const [wbOpen,setWbOpen]=useState(false);
  const [dialogOpen,setDialogOpen]=useState(false);

  const lekt=lId?LEKTIONEN.find(l=>l.id===lId):null;
  const sec=sId&&lekt?lekt.sections.find(s=>s.id===sId):null;

  if(dialogOpen)return(
    <div style={root}>
      <div style={wrap}>
        <button onClick={()=>setDialogOpen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"0 0 14px"}}>← Главная</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:26}}>💬</span>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:C.text}}>Dialoge</div>
            <div style={{fontSize:12,color:C.muted}}>Ключевые вопросы · нажми для ответа</div>
          </div>
        </div>
        <DialogFragenPage/>
      </div>
    </div>
  );

  // Wörterbuch
  if(wbOpen)return(
    <div style={root}>
      <div style={wrap}>
        <button onClick={()=>setWbOpen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"0 0 14px"}}>← Главная</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:26}}>📖</span>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:C.text}}>Wörterbuch</div>
            <div style={{fontSize:12,color:C.muted}}>Все слова по темам · ед. / мн. / перевод</div>
          </div>
        </div>
        <Woerterbuch/>
      </div>
    </div>
  );

  // Section view
  if(sec)return(
    <div style={root}>
      <div style={wrap}>
        <button onClick={()=>{setSId(null);setTab("th");}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"0 0 14px"}}>← {lekt.title}</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:26}}>{sec.icon}</span>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:C.text}}>{sec.title}</div>
            <div style={{fontSize:12,color:C.muted}}>{sec.sub} · {sec.time}</div>
          </div>
        </div>
        {/* 2C и 2D объединяют теорию и задания в одном компоненте */}
        {(sec.id==="2c"||sec.id==="2d")?(
          sec.th&&sec.th()
        ):(
          <>
            {sec.hasT&&<TabBar tabs={[{id:"th",label:"📖 Теория"},{id:"ex",label:"✏️ Задания"}]} active={tab} onChange={setTab}/>}
            {tab==="th"&&sec.hasT?sec.th&&sec.th():sec.ex&&sec.ex()}
          </>
        )}
      </div>
    </div>
  );

  // Lektion view
  if(lekt)return(
    <div style={root}>
      <div style={wrap}>
        <button onClick={()=>setLId(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"0 0 14px"}}>← Главная</button>
        <div style={{marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <div style={{background:lekt.col+"22",border:`2px solid ${lekt.col}`,color:lekt.col,borderRadius:10,padding:"4px 12px",fontWeight:900,fontSize:18}}>L{lekt.num}</div>
            <div>
              <div style={{fontWeight:900,fontSize:18,color:C.text}}>{lekt.title}</div>
              <div style={{fontSize:12,color:C.muted}}>{lekt.date}</div>
            </div>
          </div>
          <div style={{fontSize:12,color:C.muted}}>{lekt.sub}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {lekt.sections.map((s,i)=>(
            <button key={s.id} onClick={()=>{setSId(s.id);setTab("th");}}
              style={{background:s.id.startsWith("t")&&!s.id.startsWith("tip")?C.yellowBg:s.id==="d1"||s.id==="d2"||s.id==="d3"||s.id==="wb"?C.tealBg:C.card,
                border:`1.5px solid ${s.id.startsWith("t")&&!s.id.startsWith("tip")?C.yellow:s.id==="d1"||s.id==="d2"||s.id==="d3"||s.id==="wb"?C.teal:C.border}`,
                borderRadius:13,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",textAlign:"left"}}>
              <div style={{fontSize:11,color:C.dim,width:16,textAlign:"center"}}>{i+1}</div>
              <span style={{fontSize:20}}>{s.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:14,color:s.id.startsWith("t")&&!s.id.startsWith("tip")?C.yellow:s.id==="d1"||s.id==="d2"||s.id==="d3"||s.id==="wb"?C.teal:C.text}}>{s.title}</div>
                <div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.sub}</div>
              </div>
              <div style={{fontSize:11,color:s.col,background:s.col+"18",border:`1px solid ${s.col}35`,borderRadius:8,padding:"3px 8px",flexShrink:0}}>{s.time}</div>
              <span style={{color:C.dim}}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Home
  return(
    <div style={root}>
      <div style={wrap}>
        <div style={{textAlign:"center",padding:"12px 0 24px"}}>
          <div style={{fontSize:48,marginBottom:8}}>🇩🇪</div>
          <div style={{fontSize:22,fontWeight:900,color:C.text}}>Deutschkurs</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {/* Wörterbuch */}
          <button onClick={()=>setWbOpen(true)}
            style={{background:C.tealBg,border:`2px solid ${C.teal}`,borderRadius:16,padding:"16px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:28}}>📖</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:16,color:C.teal}}>Wörterbuch</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{WBDATA.length} слов · Kursraum · Möbel · Wohnung · Reise · Adresse</div>
            </div>
            <span style={{color:C.teal,fontSize:20}}>›</span>
          </button>
          {/* Dialoge */}
          <button onClick={()=>setDialogOpen(true)}
            style={{background:C.blueBg||C.blue+"15",border:`2px solid ${C.blue}`,borderRadius:16,padding:"16px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:28}}>💬</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:16,color:C.blue}}>Dialoge</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{DIALOG_FRAGEN.reduce((s,g)=>s+g.qa.length,0)} вопросов · Kennenlernen · Wohnen · Kursraum</div>
            </div>
            <span style={{color:C.blue,fontSize:20}}>›</span>
          </button>
          {LEKTIONEN.map(l=>(
            <button key={l.id} onClick={()=>setLId(l.id)}
              style={{background:C.card,border:`2px solid ${l.col}40`,borderRadius:16,padding:"18px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
              <div style={{background:l.col+"22",border:`2px solid ${l.col}`,color:l.col,borderRadius:12,padding:"8px 14px",fontWeight:900,fontSize:22,flexShrink:0}}>L{l.num}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:17,color:C.text,marginBottom:3}}>{l.title}</div>
                <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{l.sub}</div>

              </div>
              <span style={{color:C.dim,fontSize:20}}>›</span>
            </button>
          ))}
        </div>
        <div style={{marginTop:16,background:C.card2,border:`1px dashed ${C.border}`,borderRadius:14,padding:"14px 16px",textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:6}}>📚</div>
          <div style={{fontSize:13,color:C.muted}}>Lektion 4 появится после следующих занятий</div>
        </div>
      </div>
    </div>
  );
}

const root={minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center",padding:"16px",fontFamily:"'Segoe UI',system-ui,sans-serif",color:C.text};
const wrap={width:"100%",maxWidth:500};
