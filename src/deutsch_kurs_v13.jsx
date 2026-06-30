import { useState, Fragment } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const DARK_THEME = {
  bg:"#0d1117",card:"#161b22",card2:"#1c2128",border:"#30363d",
  green:"#3fb950",greenBg:"#0d2a16",red:"#f85149",redBg:"#2d1117",
  blue:"#58a6ff",blueBg:"#0d1f3c",yellow:"#e3b341",yellowBg:"#2a1f00",
  purple:"#bc8cff",purpleBg:"#1e1030",orange:"#f0883e",orangeBg:"#271500",
  teal:"#39d0d8",tealBg:"#042a2b",text:"#e6edf3",muted:"#9ba5b0",dim:"#6a7280",
  ov3:"rgba(255,255,255,.05)",ov4:"rgba(255,255,255,.06)",ov5:"rgba(255,255,255,.07)",
  ov6:"rgba(255,255,255,.08)",ov7:"rgba(255,255,255,.10)",ov8:"rgba(255,255,255,.12)",
};
const LIGHT_THEME = {
  bg:"#ffffff",card:"#f6f8fa",card2:"#eaeef2",border:"#d0d7de",
  green:"#1a7f37",greenBg:"#dafbe1",red:"#cf222e",redBg:"#ffebe9",
  blue:"#0969da",blueBg:"#ddf4ff",yellow:"#7a5200",yellowBg:"#fff8c5",
  purple:"#8250df",purpleBg:"#fbefff",orange:"#bc4c00",orangeBg:"#fff1e5",
  teal:"#126269",tealBg:"#d3f4f5",text:"#1f2328",muted:"#4c5560",dim:"#6e7781",
  ov3:"rgba(0,0,0,.035)",ov4:"rgba(0,0,0,.045)",ov5:"rgba(0,0,0,.055)",
  ov6:"rgba(0,0,0,.065)",ov7:"rgba(0,0,0,.08)",ov8:"rgba(0,0,0,.10)",
};
// C — мутируемый объект палитры. Свойства подменяются applyTheme() при
// переключении темы; все JSX-стили читают C.xxx «вживую» при рендере,
// поэтому смена темы отражается на всём приложении без рефакторинга.
const C = {...DARK_THEME};
function applyTheme(name){
  Object.assign(C, name==="light"?LIGHT_THEME:DARK_THEME);
}
const AC=a=>a==="der"?C.blue:a==="die"?C.purple:C.orange;
const AB=a=>a==="der"?C.blueBg:a==="die"?C.purpleBg:C.orangeBg;
function shuffle(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function ThemeToggle({theme,onToggle}){
  return (
    <button onClick={onToggle} title={theme==="dark"?"Светлая тема":"Тёмная тема"}
      style={{position:"fixed",top:14,right:14,zIndex:50,
        background:C.card,border:`1.5px solid ${C.border}`,borderRadius:20,
        width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",
        cursor:"pointer",fontSize:17,boxShadow:"0 2px 8px rgba(0,0,0,.18)"}}>
      {theme==="dark"?"☀️":"🌙"}
    </button>
  );
}

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
  {art:"der", de:"Lehrer",       pl:"Lehrer",       ru:"учитель\nf. - die Lehrerin",    tema:"Berufe"},
  {art:"der", de:"Arzt",         pl:"Ärzte",        ru:"врач\nf. - die Ärztin",         tema:"Berufe"},
  {art:"der", de:"Ingenieur",    pl:"Ingenieure",   ru:"инженер\nf. - die Ingenieurin", tema:"Berufe"},
  {art:"der", de:"Verkäufer",    pl:"Verkäufer",    ru:"продавец\nf. - die Verkäuferin",tema:"Berufe"},
  {art:"der", de:"Elektriker",   pl:"Elektriker",   ru:"электрик\nf. - die Elektrikerin",tema:"Alltag"},
  {art:"der", de:"Friseur",      pl:"Friseure",     ru:"парикмахер\nf. - die Friseurin",tema:"Alltag"},
  {art:"der", de:"Programmierer",pl:"Programmierer",ru:"программист\nf. - die Programmiererin",tema:"Berufe"},
  {art:"der", de:"Buchhalter",   pl:"Buchhalter",   ru:"бухгалтер\nf. - die Buchhalterin",tema:"Alltag"},
  {art:"der", de:"Grafiker",     pl:"Grafiker",     ru:"дизайнер-график\nf. - die Grafikerin",tema:"Alltag"},
  {art:"der", de:"Altenpfleger", pl:"Altenpfleger", ru:"сиделка/опекун\nf. - die Altenpflegerin",tema:"Alltag"},
  {art:"der", de:"Student",      pl:"Studenten",    ru:"студент\nf. - die Studentin",   tema:"Berufe"},
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
  {art:"der",de:"Rucksack",      pl:"Rucksäcke",       ru:"рюкзак",                 tema:"Kursraum"},
  {art:"das",de:"Tablet",        pl:"Tablets",         ru:"планшет",                tema:"Kursraum"},
  {art:"der",de:"Laptop",        pl:"Laptops",         ru:"ноутбук",                tema:"Kursraum"},

  // ── Правый столбик (стр. 1) — порядок как в конспекте ───────────────────────
  {art:"das",de:"Formular",      pl:"Formulare",       ru:"анкета, бланк",          tema:"Alltag"},
  {art:"der",de:"Pass",          pl:"Pässe",           ru:"паспорт",                tema:"Alltag"},
  {art:"das",de:"Café",          pl:"Cafés",           ru:"кафе",                   tema:"Alltag"},

  {art:"die",de:"Kasse",         pl:"Kassen",          ru:"касса",                  tema:"Alltag"},
  {art:"die",de:"Apotheke",      pl:"Apotheken",       ru:"аптека",                 tema:"Alltag"},
  {art:"die",de:"Pizza",         pl:"Pizzas",          ru:"пицца",                  tema:"Alltag"},
  {art:"die",de:"Oper",          pl:"Opern",           ru:"опера",                  tema:"Alltag"},
  {art:"der",de:"Bleistift",     pl:"Bleistifte",      ru:"карандаш",               tema:"Kursraum"},
  {art:"die",de:"CD",            pl:"CDs",             ru:"компакт-диск",           tema:"Kursraum"},
  {art:"das",de:"Portemonnaie",  pl:"Portemonnaies",   ru:"кошелёк",                tema:"Alltag"},
  {art:"der",de:"Radiergummi",   pl:"Radiergummis",    ru:"ластик",                 tema:"Kursraum"},
  {art:"die",de:"Schere",        pl:"Scheren",         ru:"ножницы",                tema:"Kursraum"},
  {art:"die",de:"Tasse",         pl:"Tassen",          ru:"чашка",                  tema:"Küche"},
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
  {art:"der",de:"Herd",          pl:"Herde",           ru:"плита",                  tema:"Küche"},
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
  {art:"die",de:"Küche",         pl:"Küchen",          ru:"кухня",                  tema:"Küche"},
  {art:"der",de:"Kühlschrank",   pl:"Kühlschränke",    ru:"холодильник",            tema:"Küche"},
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
  {art:"der",de:"Küchenschrank",  pl:"Küchenschränke",  ru:"кухонный шкаф",           tema:"Küche"},
  {art:"der",de:"Blumentopf",     pl:"Blumentöpfe",     ru:"цветочный горшок",        tema:"Möbel"},
  {art:"die",de:"Heizungsanlage", pl:"Heizungsanlagen", ru:"отопительная система",    tema:"Wohnung"},
  {art:"die",de:"Wäsche",         pl:"—",               ru:"бельё, стирка",           tema:"Alltag"},
  {art:"die",de:"Waschmaschine",  pl:"Waschmaschinen",  ru:"стиральная машина",       tema:"Möbel"},
  {art:"der",de:"Keller",         pl:"Keller",          ru:"подвал, погреб",          tema:"Wohnung"},
  // ── Familie (Verwandte) — стр. 39 ───────────────────────────────────────────
  {art:"die",de:"Großeltern",   pl:"—",             ru:"бабушка и дедушка (мн.ч.)", tema:"Familie"},
  {art:"der",de:"Großvater",    pl:"Großväter",     ru:"дедушка",                   tema:"Familie"},
  {art:"die",de:"Großmutter",   pl:"Großmütter",    ru:"бабушка",                   tema:"Familie"},
  {art:"die",de:"Eltern",       pl:"—",             ru:"родители (мн.ч.)",          tema:"Familie"},
  {art:"der",de:"Vater",        pl:"Väter",         ru:"отец",                      tema:"Familie"},
  {art:"die",de:"Mutter",       pl:"Mütter",        ru:"мать",                      tema:"Familie"},
  {art:"die",de:"Geschwister",  pl:"—",             ru:"братья и сёстры (мн.ч.)",   tema:"Familie"},
  {art:"die",de:"Schwester",    pl:"Schwestern",    ru:"сестра",                    tema:"Familie"},
  {art:"der",de:"Bruder",       pl:"Brüder",        ru:"брат",                      tema:"Familie"},
  {art:"der",de:"Sohn",         pl:"Söhne",         ru:"сын",                       tema:"Familie"},
  {art:"die",de:"Tochter",      pl:"Töchter",       ru:"дочь",                      tema:"Familie"},
  {art:"die",de:"Enkelkinder",  pl:"—",             ru:"внуки (мн.ч.)",             tema:"Familie"},
  {art:"der",de:"Enkel",        pl:"Enkel",         ru:"внук",                      tema:"Familie"},
  {art:"die",de:"Enkelin",      pl:"Enkelinnen",    ru:"внучка",                    tema:"Familie"},
  {art:"der",de:"Onkel",        pl:"Onkel",         ru:"дядя",                      tema:"Familie"},
  {art:"die",de:"Tante",        pl:"Tanten",        ru:"тётя",                      tema:"Familie"},
  {art:"der",de:"Cousin",       pl:"Cousins",       ru:"двоюродный брат",           tema:"Familie"},
  {art:"die",de:"Cousine",      pl:"Cousinen",      ru:"двоюродная сестра",         tema:"Familie"},
  {art:"der",de:"Neffe",        pl:"Neffen",        ru:"племянник",                 tema:"Familie"},
  {art:"die",de:"Nichte",       pl:"Nichten",       ru:"племянница",                tema:"Familie"},
  // ── Ehe & Familie / новые слова ──────────────────────────────────────────────
  {art:"der",de:"Kuchen",       pl:"Kuchen",        ru:"пирог, торт",               tema:"Alltag"},
  {art:"die",de:"Nachspeise",   pl:"Nachspeisen",   ru:"десерт",                    tema:"Alltag"},
  {art:"die",de:"Meinung",      pl:"Meinungen",     ru:"мнение",                    tema:"Alltag"},
  {art:"",   de:"gehören",      pl:"—",             ru:"принадлежать",              tema:"Alltag"},
  {art:"die",de:"Ehe",          pl:"Ehen",          ru:"брак, супружество",         tema:"Familie"},
  {art:"das",de:"Ehepaar",      pl:"Ehepaare",      ru:"супружеская пара",          tema:"Familie"},
  {art:"die",de:"Ehefrau",      pl:"Ehefrauen",     ru:"жена",                      tema:"Familie"},
  {art:"der",de:"Ehemann",      pl:"Ehemänner",     ru:"муж",                       tema:"Familie"},
  {art:"",   de:"heiraten",     pl:"—",             ru:"жениться / выходить замуж", tema:"Familie"},
  {art:"",   de:"verheiratet sein",pl:"—",          ru:"быть женатым / замужней",   tema:"Phrase"},
  {art:"",   de:"nur",          pl:"—",             ru:"только",                    tema:"Alltag"},
  {art:"",   de:"jetzt",        pl:"—",             ru:"сейчас, теперь",            tema:"Alltag"},
  {art:"",   de:"auch",         pl:"—",             ru:"тоже, также",               tema:"Alltag"},
  // ── L4-B · Verben mit Vokalwechsel ───────────────────────────────────────────
  {art:"",   de:"schlafen",     pl:"—",             ru:"спать",                     tema:"Alltag"},
  {art:"",   de:"fahren",       pl:"—",             ru:"ехать, ездить",             tema:"Alltag"},
  {art:"",   de:"lesen",        pl:"—",             ru:"читать",                    tema:"Alltag"},
  {art:"",   de:"sehen",        pl:"—",             ru:"видеть; смотреть",          tema:"Alltag"},
  {art:"",   de:"nehmen",       pl:"—",             ru:"брать",                     tema:"Alltag"},
  {art:"",   de:"treffen",      pl:"—",             ru:"встречать(ся)",             tema:"Alltag"},
  {art:"",   de:"essen",        pl:"—",             ru:"есть, кушать",              tema:"Alltag"},
  {art:"",   de:"sprechen",     pl:"—",             ru:"говорить",                  tema:"Alltag"},
  // ── L4-B · Новые существительные ────────────────────────────────────────────
  {art:"der",de:"Bus",          pl:"Busse",         ru:"автобус",                   tema:"Alltag"},

  {art:"der",de:"Supermarkt",   pl:"Supermärkte",   ru:"супермаркет",               tema:"Alltag"},
  {art:"die",de:"Radtour",      pl:"Radtouren",     ru:"велопрогулка",              tema:"Alltag"},
  {art:"die",de:"Lebensmittel", pl:"—",             ru:"продукты питания (мн.ч.)",  tema:"Alltag"},
  {art:"die",de:"Sehenswürdigkeit",pl:"Sehenswürdigkeiten",ru:"достопримечательность",tema:"Alltag"},
  {art:"das",de:"Straßenfest",  pl:"Straßenfeste",  ru:"уличный праздник",          tema:"Alltag"},
  // ── L4-B · Фразы — активности ───────────────────────────────────────────────
  {art:"",   de:"den Bus nehmen",                    pl:"—",ru:"садиться в автобус",                    tema:"Phrase"},
  {art:"",   de:"einen Film sehen",                  pl:"—",ru:"смотреть фильм",                        tema:"Phrase"},
  {art:"",   de:"nach Hause fahren",                 pl:"—",ru:"ехать домой",                           tema:"Phrase"},
  {art:"",   de:"zu Mittag essen",                   pl:"—",ru:"обедать",                               tema:"Phrase"},
  {art:"",   de:"eine Radtour machen",               pl:"—",ru:"кататься на велосипеде",                tema:"Phrase"},
  {art:"",   de:"einen Kaffee trinken",              pl:"—",ru:"пить кофе",                             tema:"Phrase"},
  {art:"",   de:"ein Straßenfest besuchen",          pl:"—",ru:"посещать уличный праздник",             tema:"Phrase"},
  {art:"",   de:"Sehenswürdigkeiten besichtigen",    pl:"—",ru:"осматривать достопримечательности",     tema:"Phrase"},
  {art:"",   de:"Lebensmittel kaufen",               pl:"—",ru:"покупать продукты",                     tema:"Phrase"},
  {art:"",   de:"zuerst",       pl:"—",             ru:"сначала",                   tema:"Alltag"},
  {art:"",   de:"dann",         pl:"—",             ru:"потом, затем (следующий шаг)",  tema:"Alltag"},
  {art:"",   de:"danach",       pl:"—",             ru:"после этого (после конкр. действия)", tema:"Alltag"},
  {art:"",   de:"kennen",       pl:"—",             ru:"знать (человека или место)",    tema:"Alltag"},
  {art:"die",de:"Oma",          pl:"Omas",          ru:"бабушка (разг.)",           tema:"Familie"},
  {art:"der",de:"Opa",          pl:"Opas",          ru:"дедушка (разг.)",           tema:"Familie"},
  {art:"der",de:"Freund",       pl:"Freunde",        ru:"друг\nf. - die Freundin",   tema:"Alltag"},
  {art:"",   de:"trinken",      pl:"—",             ru:"пить",                       tema:"Alltag"},
  {art:"",   de:"machen",       pl:"—",             ru:"делать",                     tema:"Alltag"},
  {art:"der",de:"Bummel",       pl:"Bummel",        ru:"прогулка (неспешная)",       tema:"Alltag"},
  {art:"der",de:"Stadtbummel",  pl:"Stadtbummel",   ru:"прогулка по городу",         tema:"Alltag"},
  {art:"der",de:"Hafen",        pl:"Häfen",         ru:"порт, гавань",               tema:"Alltag"},
  {art:"das",de:"Schiff",       pl:"Schiffe",       ru:"корабль, судно",             tema:"Alltag"},
  {art:"",   de:"besuchen",     pl:"—",             ru:"посещать (человека или мероприятие)", tema:"Alltag"},
  {art:"",   de:"besichtigen",  pl:"—",             ru:"осматривать (место или достопримечательность)", tema:"Alltag"},
  {art:"die",de:"Innenstadt",   pl:"Innenstädte",   ru:"центр города, старый город", tema:"Alltag"},
  {art:"",   de:"wiederholen",  pl:"—",             ru:"повторять (материал); повторить", tema:"Alltag"},
  {art:"",   de:"allein",       pl:"—",             ru:"один, в одиночку (без компании)", tema:"Alltag"},
  {art:"die",de:"Laune",        pl:"Launen",        ru:"настроение",                 tema:"Alltag"},
  {art:"",   de:"zu tun",       pl:"—",             ru:"viel zu tun haben = иметь много дел; быть занятым", tema:"Phrase"},

  {art:"das",de:"Wochenende",   pl:"Wochenenden",   ru:"выходные (суббота и воскресенье)", tema:"Alltag"},
  {art:"",   de:"früher",       pl:"—",             ru:"раньше, прежде (в прошлом)",  tema:"Alltag"},
  {art:"die",de:"Grüße",        pl:"—",             ru:"приветы, пожелания (мн.ч.)",  tema:"Alltag"},
  // ── L4 · Wichtige Wörter (стр. 48) ──────────────────────────────────────────
  {art:"",   de:"studieren",    pl:"—",             ru:"учиться (в университете)",    tema:"Alltag"},
  {art:"",   de:"faulenzen",    pl:"—",             ru:"лениться, бездельничать",     tema:"Alltag"},
  {art:"",   de:"bleiben",      pl:"—",             ru:"оставаться (на месте)",       tema:"Alltag"},
  {art:"",   de:"chillen",      pl:"—",             ru:"расслабляться, отдыхать (разг.)", tema:"Alltag"},
  {art:"die",de:"Freizeit",     pl:"—",             ru:"свободное время",             tema:"Alltag"},
  {art:"der",de:"Film",         pl:"Filme",         ru:"фильм",                       tema:"Alltag"},
  {art:"der",de:"Tag",          pl:"Tage",          ru:"день",                        tema:"Alltag"},
  {art:"der",de:"Spaziergang",  pl:"Spaziergänge",  ru:"пешая прогулка",              tema:"Alltag"},
  {art:"die",de:"Schifffahrt",  pl:"Schifffahrten", ru:"прогулка на корабле, круиз",  tema:"Alltag"},
  {art:"",   de:"alle",         pl:"—",             ru:"все (без исключения)",        tema:"Alltag"},
  {art:"",   de:"gern/gerne",   pl:"—",             ru:"с удовольствием, охотно",     tema:"Alltag"},
  {art:"",   de:"wo",           pl:"—",             ru:"где (вопрос о месте; ≠ wohin)",    tema:"Alltag"},
  {art:"",   de:"wohin",        pl:"—",             ru:"куда (вопрос о движении; ≠ wo)",   tema:"Alltag"},
  {art:"",   de:"zu Hause",     pl:"—",             ru:"дома (нахождение; ≠ nach Hause)",  tema:"Phrase"},
  {art:"",   de:"nach Hause",   pl:"—",             ru:"домой (движение; ≠ zu Hause)",     tema:"Phrase"},
  {art:"",   de:"Zeit haben",   pl:"—",             ru:"иметь время; viel Zeit haben = иметь много времени", tema:"Phrase"},
  {art:"",   de:"am Wochenende",pl:"—",             ru:"на выходных (в субботу-воскресенье)", tema:"Phrase"},
  {art:"",   de:"alles anders", pl:"—",             ru:"всё иначе, всё по-другому",   tema:"Phrase"},
  {art:"",   de:"Viele Grüße",  pl:"—",             ru:"с уважением; приветы (конец письма/открытки)", tema:"Phrase"},
  {art:"",   de:"Bis bald",     pl:"—",             ru:"до скорого (прощание)",       tema:"Phrase"},
  // ── Wochentage ───────────────────────────────────────────────────────────────
  {art:"der",de:"Montag",       pl:"Montage",       ru:"понедельник",                 tema:"Tageszeiten"},
  {art:"der",de:"Dienstag",     pl:"Dienstage",     ru:"вторник",                     tema:"Tageszeiten"},
  {art:"der",de:"Mittwoch",     pl:"Mittwoche",     ru:"среда",                       tema:"Tageszeiten"},
  {art:"der",de:"Donnerstag",   pl:"Donnerstage",   ru:"четверг",                     tema:"Tageszeiten"},
  {art:"der",de:"Freitag",      pl:"Freitage",      ru:"пятница",                     tema:"Tageszeiten"},
  {art:"der",de:"Samstag",      pl:"Samstage",      ru:"суббота",                     tema:"Tageszeiten"},
  {art:"der",de:"Sonntag",      pl:"Sonntage",      ru:"воскресенье",                 tema:"Tageszeiten"},
  {art:"die",de:"Woche",        pl:"Wochen",        ru:"неделя",                      tema:"Tageszeiten"},
  {art:"",   de:"am Montag",    pl:"—",             ru:"в понедельник (и др. дни)",   tema:"Tageszeiten"},
  {art:"die",de:"Kindheit",     pl:"—",             ru:"детство",                     tema:"Alltag"},
  {art:"",   de:"draußen",      pl:"—",             ru:"снаружи, на улице (≠ drinnen)", tema:"Alltag"},
  {art:"die",de:"Zeit",         pl:"Zeiten",        ru:"время (свободное/занятое)",   tema:"Alltag"},
  {art:"",   de:"wenig",        pl:"—",             ru:"мало (≠ viel)",               tema:"Alltag"},
  {art:"",   de:"wieso",        pl:"—",             ru:"почему, зачем (≠ warum — более разг.)", tema:"Alltag"},
  // ── Arbeitsbuch p.49–51 ──────────────────────────────────────────────────────
  {art:"",   de:"schreiben",    pl:"—",             ru:"писать",                      tema:"Alltag"},
  {art:"",   de:"lernen",       pl:"—",             ru:"учить (язык/тему); учиться",  tema:"Alltag"},
  {art:"",   de:"oft",          pl:"—",             ru:"часто (≠ selten — редко)",    tema:"Alltag"},
  {art:"die",de:"Zeitung",      pl:"Zeitungen",     ru:"газета",                      tema:"Alltag"},
  {art:"der",de:"Dom",          pl:"Dome",          ru:"собор (кафедральный)",        tema:"Alltag"},
  {art:"die",de:"E-Mail",       pl:"E-Mails",       ru:"электронное письмо",          tema:"Alltag"},
  {art:"",   de:"eine Zeitung lesen",  pl:"—",      ru:"читать газету",               tema:"Phrase"},
  {art:"",   de:"eine E-Mail schreiben",pl:"—",     ru:"написать/писать имейл",       tema:"Phrase"},
  {art:"",   de:"im Restaurant essen", pl:"—",      ru:"есть в ресторане (≠ zu Hause essen)", tema:"Phrase"},
  {art:"",   de:"Deutsch lernen",      pl:"—",      ru:"учить немецкий",              tema:"Phrase"},
  {art:"der",de:"Kopfhörer",           pl:"Kopfhörer", ru:"наушники",                tema:"Kursraum"},
  {art:"der",de:"Ausflug",             pl:"Ausflüge",  ru:"экскурсия, вылазка",      tema:"Alltag"},
  // ── Tageszeiten ──────────────────────────────────────────────────────────────
  {art:"der",de:"Mittag",              pl:"Mittage",   ru:"полдень",                 tema:"Tageszeiten"},
  {art:"der",de:"Vormittag",           pl:"Vormittage",ru:"первая половина дня (до полудня)", tema:"Tageszeiten"},
  {art:"der",de:"Nachmittag",          pl:"Nachmittage",ru:"вторая половина дня (после полудня)", tema:"Tageszeiten"},
  {art:"der",de:"Abend",              pl:"Abende",    ru:"вечер",                   tema:"Tageszeiten"},
  {art:"der",de:"Spätabend",          pl:"Spätabende",ru:"поздний вечер",           tema:"Tageszeiten"},
  {art:"die",de:"Nacht",              pl:"Nächte",    ru:"ночь",                    tema:"Tageszeiten"},
  {art:"",   de:"lachen",             pl:"—",         ru:"смеяться",                tema:"Alltag"},
  {art:"",   de:"lächeln",            pl:"—",         ru:"улыбаться",               tema:"Alltag"},
  {art:"",   de:"fröhlich",           pl:"—",         ru:"весёлый, радостный",      tema:"Adjektive"},
  {art:"",   de:"traurig",            pl:"—",         ru:"грустный, печальный",     tema:"Adjektive"},
  {art:"",   de:"treiben",            pl:"—",         ru:"заниматься (спортом); гнать", tema:"Alltag"},
  {art:"",   de:"Sport treiben",      pl:"—",         ru:"заниматься спортом",      tema:"Phrase"},
  {art:"",   de:"spazieren gehen",    pl:"—",         ru:"гулять, идти на прогулку", tema:"Alltag"},
  {art:"",   de:"spazieren",         pl:"—",         ru:"гулять, прогуливаться",   tema:"Alltag"},
  {art:"",   de:"reiten",             pl:"—",         ru:"ездить верхом",           tema:"Alltag"},

  {art:"",   de:"weg",               pl:"—",         ru:"прочь, исчез, пропал",    tema:"Alltag"},
  {art:"",   de:"natürlich",          pl:"—",         ru:"конечно, естественно",    tema:"Alltag"},
  {art:"",   de:"vielleicht",         pl:"—",         ru:"может быть, возможно",    tema:"Alltag"},
  {art:"das",de:"Heimatland",         pl:"Heimatländer", ru:"родина, родная страна", tema:"Familie"},
  // ── L5 · Der Tag und die Woche ────────────────────────────────────────────────
  {art:"der",de:"Morgen",             pl:"Morgen",       ru:"утро",                    tema:"Tageszeiten"},
  {art:"",   de:"morgens",            pl:"—",            ru:"по утрам, утром",         tema:"Tageszeiten"},
  {art:"",   de:"mittags",            pl:"—",            ru:"в полдень, в обед",       tema:"Tageszeiten"},
  {art:"",   de:"abends",             pl:"—",            ru:"по вечерам, вечером",     tema:"Tageszeiten"},
  {art:"",   de:"nachts",             pl:"—",            ru:"ночью",                   tema:"Tageszeiten"},
  {art:"die",de:"Uhrzeit",            pl:"Uhrzeiten",    ru:"время (показание часов)", tema:"Alltag"},
  {art:"",   de:"beginnen",           pl:"—",            ru:"начинать(ся)",            tema:"Kursraum"},
  {art:"",   de:"enden",              pl:"—",            ru:"заканчивать(ся)",         tema:"Kursraum"},
  {art:"die",de:"Pause",              pl:"Pausen",       ru:"перерыв",                 tema:"Kursraum"},
  {art:"",   de:"grillen",            pl:"—",            ru:"жарить на гриле",         tema:"Alltag"},
  {art:"",   de:"tanzen",             pl:"—",            ru:"танцевать",               tema:"Alltag"},
  {art:"",   de:"schwimmen",          pl:"—",            ru:"плавать",                 tema:"Alltag"},
  {art:"",   de:"joggen",             pl:"—",            ru:"бегать трусцой",          tema:"Alltag"},
  {art:"",   de:"ein Bild malen",     pl:"—",            ru:"рисовать картину",        tema:"Phrase"},
  {art:"",   de:"Musik hören",        pl:"—",            ru:"слушать музыку",          tema:"Phrase"},
  {art:"",   de:"im Internet surfen", pl:"—",            ru:"сёрфить в интернете",     tema:"Phrase"},
  {art:"",   de:"Fußball spielen",    pl:"—",            ru:"играть в футбол",         tema:"Phrase"},
  {art:"",   de:"im Park joggen",     pl:"—",            ru:"бегать в парке",          tema:"Phrase"},
  {art:"",   de:"Wann?",              pl:"—",            ru:"Когда?",                  tema:"Phrase"},
  {art:"",   de:"Um wie viel Uhr?",   pl:"—",            ru:"В котором часу?",         tema:"Phrase"},
  {art:"",   de:"bunt",               pl:"—",            ru:"разноцветный, пёстрый",   tema:"Adjektive"},
  {art:"",   de:"froh",               pl:"—",            ru:"радостный, довольный (froh sein = быть рад)", tema:"Adjektive"},
  {art:"",   de:"fit",                pl:"—",            ru:"в форме, здоровый",       tema:"Adjektive"},
  {art:"",   de:"wahrscheinlich",     pl:"—",            ru:"вероятно, наверное",       tema:"Alltag"},
  {art:"",   de:"möglich",            pl:"—",            ru:"возможный, возможно",      tema:"Adjektive"},
  {art:"",   de:"vermuten",           pl:"—",            ru:"предполагать, подозревать",tema:"Alltag"},
  {art:"der",de:"Tanzkurs",           pl:"Tanzkurse",    ru:"курс танцев",              tema:"Alltag"},
  {art:"",   de:"bis",                pl:"—",            ru:"до (bis zwölf = до двенадцати)", tema:"Alltag"},
  {art:"",   de:"also",               pl:"—",            ru:"итак, значит",             tema:"Alltag"},
  {art:"",   de:"genau",              pl:"—",            ru:"точно, именно",            tema:"Alltag"},
  {art:"",   de:"offiziell",          pl:"—",            ru:"официальный, официально",  tema:"Adjektive"},
  // ── L5B · Trennbare Verben ───────────────────────────────────────────────────
  {art:"",   de:"anrufen",            pl:"—",            ru:"звонить (по телефону)",    tema:"Trennbare Verben"},
  {art:"",   de:"anfangen",           pl:"—",            ru:"начинать(ся) (разг.)",     tema:"Trennbare Verben"},
  {art:"",   de:"fernsehen",          pl:"—",            ru:"смотреть телевизор",       tema:"Trennbare Verben"},
  {art:"",   de:"aufstehen",          pl:"—",            ru:"вставать (с постели)",     tema:"Trennbare Verben"},
  {art:"",   de:"aufräumen",          pl:"—",            ru:"убирать, наводить порядок",tema:"Trennbare Verben"},
  {art:"",   de:"einkaufen",          pl:"—",            ru:"делать покупки",           tema:"Trennbare Verben"},
  {art:"",   de:"mitnehmen",          pl:"—",            ru:"брать с собой",            tema:"Trennbare Verben"},
  {art:"",   de:"ausgehen",           pl:"—",            ru:"выходить, идти гулять",    tema:"Trennbare Verben"},
  {art:"",   de:"mitkommen",          pl:"—",            ru:"идти вместе, присоединяться", tema:"Trennbare Verben"},
  {art:"",   de:"aufhören",           pl:"—",            ru:"прекращать, заканчивать",  tema:"Trennbare Verben"},
  {art:"",   de:"abspülen",           pl:"—",            ru:"мыть посуду",              tema:"Trennbare Verben"},
  {art:"",   de:"reparieren",         pl:"—",            ru:"ремонтировать",            tema:"Alltag"},

  {art:"",   de:"kochen",             pl:"—",            ru:"готовить (еду), варить",   tema:"Alltag"},
  {art:"der",de:"Zug",                pl:"Züge",         ru:"поезд",                   tema:"Alltag"},
  {art:"das",de:"Konzert",            pl:"Konzerte",     ru:"концерт",                 tema:"Alltag"},
  {art:"der",de:"Radiowecker",        pl:"Radiowecker",  ru:"радиобудильник",          tema:"Alltag"},
  {art:"das",de:"Gleis",              pl:"Gleise",       ru:"платформа, путь (на вокзале)", tema:"Alltag"},
  {art:"",   de:"klingeln",           pl:"—",            ru:"звонить, звенеть (о звонке)", tema:"Alltag"},
  {art:"",   de:"starten",            pl:"—",            ru:"стартовать, взлетать",    tema:"Alltag"},
  {art:"das",de:"Flugzeug",           pl:"Flugzeuge",    ru:"самолёт",                 tema:"Alltag"},
  {art:"die",de:"Tanzparty",          pl:"Tanzpartys",   ru:"вечеринка с танцами",     tema:"Alltag"},
  {art:"der",de:"Krimi",              pl:"Krimis",       ru:"детектив (фильм/книга)",  tema:"Alltag"},
  {art:"das",de:"Fußballspiel",       pl:"Fußballspiele",ru:"футбольный матч",         tema:"Alltag"},
  {art:"die",de:"Liebe",              pl:"—",            ru:"любовь",                  tema:"Familie"},
  {art:"",   de:"verliebt sein",      pl:"—",            ru:"быть влюблённым",         tema:"Phrase"},

  {art:"",   de:"von ... bis ...",    pl:"—",            ru:"с ... до ... (von 9 bis 12)", tema:"Phrase"},
  // ── Урок 09.06 · Новые слова ─────────────────────────────────────────────────
  {art:"",   de:"immer",             pl:"—",            ru:"всегда",                  tema:"Alltag"},
  {art:"",   de:"montags",           pl:"—",            ru:"по понедельникам (каждый понедельник)", tema:"Alltag"},
  {art:"",   de:"frühstücken",       pl:"—",            ru:"завтракать",              tema:"Alltag"},
  {art:"das",de:"Frühstück",         pl:"Frühstücke",   ru:"завтрак",                 tema:"Alltag"},
  {art:"das",de:"Abendessen",        pl:"—",            ru:"ужин",                    tema:"Alltag"},
  {art:"der",de:"Sprachkurs",        pl:"Sprachkurse",  ru:"языковой курс",           tema:"Alltag"},
  {art:"",   de:"zu Abend essen",    pl:"—",            ru:"ужинать",                 tema:"Phrase"},
  {art:"",   de:"ins Bett gehen",    pl:"—",            ru:"ложиться спать",          tema:"Phrase"},
  {art:"",   de:"einen Ausflug machen", pl:"—",         ru:"поехать на экскурсию",    tema:"Phrase"},
  {art:"",   de:"Hausaufgaben machen",  pl:"—",         ru:"делать домашнее задание", tema:"Phrase"},
  {art:"",   de:"zum Arzt gehen",    pl:"—",            ru:"пойти к врачу",           tema:"Phrase"},
  {art:"",   de:"einladen",          pl:"—",            ru:"пригласить",              tema:"Trennbare Verben"},
  {art:"",   de:"ausschlafen",       pl:"—",            ru:"выспаться",               tema:"Trennbare Verben"},
  {art:"",   de:"mitbringen",        pl:"—",            ru:"принести с собой",        tema:"Trennbare Verben"},
  {art:"",   de:"einschlafen",       pl:"—",            ru:"заснуть",                 tema:"Trennbare Verben"},
  {art:"",   de:"wegfahren",         pl:"—",            ru:"уехать, отправиться",     tema:"Trennbare Verben"},
  {art:"",   de:"ausfallen",         pl:"—",            ru:"отменяться, не состояться", tema:"Trennbare Verben"},
  {art:"",   de:"stattfinden",       pl:"—",            ru:"состояться, проходить",   tema:"Trennbare Verben"},
  {art:"",   de:"müde",              pl:"—",            ru:"усталый, утомлённый",     tema:"Adjektive"},
  {art:"",   de:"wollen",            pl:"—",            ru:"хотеть (намереваться)",   tema:"Alltag"},
  {art:"",   de:"kostenlos",         pl:"—",            ru:"бесплатный",              tema:"Adjektive"},
  {art:"der",de:"Fluss",             pl:"Flüsse",       ru:"река",                    tema:"Alltag"},
  {art:"die",de:"Brücke",            pl:"Brücken",      ru:"мост",                    tema:"Alltag"},
  {art:"",   de:"zum Glück",         pl:"—",            ru:"к счастью",               tema:"Phrase"},
  {art:"der",de:"Wald",              pl:"Wälder",       ru:"лес",                     tema:"Alltag"},
  {art:"",   de:"leider",            pl:"—",            ru:"к сожалению",             tema:"Alltag"},
  {art:"",   de:"früh",              pl:"—",            ru:"рано",                    tema:"Alltag"},
  {art:"",   de:"nie",               pl:"—",            ru:"никогда",                 tema:"Alltag"},
  {art:"",   de:"selten",            pl:"—",            ru:"редко",                   tema:"Alltag"},
  {art:"",   de:"manchmal",          pl:"—",            ru:"иногда",                  tema:"Alltag"},

  {art:"",   de:"fertig",            pl:"—",            ru:"готовый, законченный",    tema:"Adjektive"},
  {art:"",   de:"bereit",            pl:"—",            ru:"готовый (к действию)",    tema:"Adjektive"},
  // ── L5 D · Hast du Zeit? ──────────────────────────────────────────────────────
  {art:"",   de:"spät",              pl:"—",            ru:"поздно",                  tema:"Alltag"},
  {art:"",   de:"zusammen",          pl:"—",            ru:"вместе",                  tema:"Alltag"},
  {art:"",   de:"später",            pl:"—",            ru:"позже",                   tema:"Alltag"},
  {art:"",   de:"gerne",             pl:"—",            ru:"охотно, с удовольствием", tema:"Alltag"},
  {art:"das",de:"Hobby",             pl:"Hobbys",       ru:"хобби",                   tema:"Alltag"},
  {art:"",   de:"Lust haben",        pl:"—",            ru:"хотеть, желать",          tema:"Phrase"},

  {art:"",   de:"Schach spielen",    pl:"—",            ru:"играть в шахматы",        tema:"Phrase"},
  {art:"die",de:"Fahrkarte",         pl:"Fahrkarten",   ru:"транспортный билет",      tema:"Alltag"},
  {art:"der",de:"Zahnarzttermin",    pl:"Zahnarzttermine",ru:"визит к стоматологу",   tema:"Alltag"},
  {art:"",   de:"heute Abend",       pl:"—",            ru:"сегодня вечером",         tema:"Alltag"},
  // ── Lektion 6 · Lebensmittel und Getränke ────────────────────────────────────
  {art:"der",de:"Apfel",             pl:"Äpfel",        ru:"яблоко",                  tema:"Lebensmittel"},
  {art:"die",de:"Banane",            pl:"Bananen",      ru:"банан",                   tema:"Lebensmittel"},
  {art:"das",de:"Brot",              pl:"Brote",        ru:"хлеб",                    tema:"Lebensmittel"},
  {art:"die",de:"Butter",            pl:"—",            ru:"масло (сливочное)",       tema:"Lebensmittel"},
  {art:"das",de:"Hähnchen",          pl:"Hähnchen",     ru:"курица (целая)",          tema:"Lebensmittel"},
  {art:"der",de:"Joghurt",           pl:"Joghurts",     ru:"йогурт",                  tema:"Lebensmittel"},
  {art:"der",de:"Kaffee",            pl:"Kaffees",      ru:"кофе",                    tema:"Lebensmittel"},
  {art:"die",de:"Kartoffel",         pl:"Kartoffeln",   ru:"картофель",               tema:"Lebensmittel"},
  {art:"der",de:"Käse",              pl:"—",            ru:"сыр",                     tema:"Lebensmittel"},
  {art:"die",de:"Milch",             pl:"—",            ru:"молоко",                  tema:"Lebensmittel"},
  {art:"die",de:"Nudel",             pl:"Nudeln",       ru:"макароны",                tema:"Lebensmittel"},
  {art:"der",de:"Reis",              pl:"—",            ru:"рис",                     tema:"Lebensmittel"},
  {art:"der",de:"Salat",             pl:"Salate",       ru:"салат",                   tema:"Lebensmittel"},
  {art:"die",de:"Schokolade",        pl:"—",            ru:"шоколад",                 tema:"Lebensmittel"},
  {art:"der",de:"Tee",               pl:"Tees",         ru:"чай",                     tema:"Lebensmittel"},
  {art:"der",de:"Fisch",             pl:"Fische",       ru:"рыба",                    tema:"Lebensmittel"},
  {art:"die",de:"Tomate",            pl:"Tomaten",      ru:"помидор",                 tema:"Lebensmittel"},
  {art:"das",de:"Wasser",            pl:"—",            ru:"вода",                    tema:"Lebensmittel"},
  {art:"der",de:"Wein",              pl:"Weine",        ru:"вино",                    tema:"Lebensmittel"},
  {art:"die",de:"Wurst",             pl:"Würste",       ru:"колбаса",                 tema:"Lebensmittel"},
  {art:"die",de:"Zwiebel",           pl:"Zwiebeln",     ru:"лук",                     tema:"Lebensmittel"},
  {art:"",   de:"faul",              pl:"—",            ru:"ленивый",                 tema:"Adjektive"},
  {art:"der",de:"Tipp",              pl:"Tipps",        ru:"совет, подсказка",        tema:"Alltag"},
  {art:"der",de:"Respekt",           pl:"—",            ru:"уважение",                tema:"Alltag"},
  {art:"",   de:"langsam",           pl:"—",            ru:"медленный, медленно",     tema:"Adjektive"},
  {art:"die",de:"Übung",             pl:"Übungen",      ru:"упражнение",              tema:"Kursraum"},
  {art:"das",de:"Sonderangebot",     pl:"Sonderangebote",ru:"специальное предложение, акция", tema:"Alltag"},
  {art:"",   de:"mögen",             pl:"—",            ru:"любить, нравиться",       tema:"Alltag"},
  {art:"das",de:"Gewürz",            pl:"Gewürze",      ru:"специя, пряность",        tema:"Lebensmittel"},
  // ── Lektion 6 · Новые слова ─────────────────────────────────────────────────
  {art:"der",de:"Kaugummi",          pl:"Kaugummis",    ru:"жевательная резинка",      tema:"Lebensmittel"},
  {art:"der",de:"Mais",              pl:"—",            ru:"кукуруза",                 tema:"Lebensmittel"},
  {art:"der",de:"Zucker",            pl:"—",            ru:"сахар",                    tema:"Lebensmittel"},
  {art:"das",de:"Ei",                pl:"Eier",         ru:"яйцо",                     tema:"Lebensmittel"},
  {art:"das",de:"Brötchen",          pl:"Brötchen",     ru:"булочка",                  tema:"Lebensmittel"},
  {art:"die",de:"Orange",            pl:"Orangen",      ru:"апельсин",                 tema:"Lebensmittel"},
  {art:"die",de:"Erbse",             pl:"Erbsen",       ru:"горошина; Erbsen = горох", tema:"Lebensmittel"},
  {art:"die",de:"Spaghetti",         pl:"—",            ru:"спагетти",                 tema:"Lebensmittel"},
  {art:"die",de:"Marmelade",         pl:"Marmeladen",   ru:"джем, варенье",            tema:"Lebensmittel"},
  {art:"die",de:"Chips",             pl:"—",            ru:"чипсы",                    tema:"Lebensmittel"},
  {art:"die",de:"Dose",              pl:"Dosen",        ru:"банка (консервная)",        tema:"Lebensmittel"},
  {art:"die",de:"Packung",           pl:"Packungen",    ru:"пачка, упаковка",          tema:"Lebensmittel"},
  {art:"der",de:"Becher",            pl:"Becher",       ru:"стаканчик, контейнер",     tema:"Lebensmittel"},
  {art:"die",de:"Tüte",              pl:"Tüten",        ru:"пакет, кулёк",             tema:"Lebensmittel"},
  {art:"das",de:"Stück",             pl:"Stücke",       ru:"кусок, штука",             tema:"Lebensmittel"},
  {art:"das",de:"Glas",              pl:"Gläser",       ru:"банка (стеклянная)",        tema:"Lebensmittel"},
  {art:"der",de:"Kasten",            pl:"Kästen",       ru:"ящик (напр. ящик воды)",   tema:"Lebensmittel"},
  {art:"die",de:"Scheibe",           pl:"Scheiben",     ru:"ломтик, кусочек",          tema:"Lebensmittel"},
  {art:"die",de:"Metzgerei",         pl:"Metzgereien",  ru:"мясная лавка, мясник",     tema:"Lebensmittel"},
  {art:"die",de:"Bäckerei",          pl:"Bäckereien",   ru:"булочная, пекарня",        tema:"Lebensmittel"},
  {art:"der",de:"Markt",             pl:"Märkte",       ru:"рынок",                    tema:"Lebensmittel"},
  {art:"die",de:"Tankstelle",        pl:"Tankstellen",  ru:"заправочная станция",      tema:"Lebensmittel"},
  {art:"der",de:"Kiosk",             pl:"Kioske",       ru:"киоск",                    tema:"Lebensmittel"},
  {art:"",   de:"backen",            pl:"—",            ru:"печь, выпекать",           tema:"Lebensmittel"},
  {art:"",   de:"kosten",            pl:"—",            ru:"стоить",                   tema:"Lebensmittel"},
  {art:"",   de:"kaufen",            pl:"—",            ru:"покупать",                 tema:"Lebensmittel"},
  {art:"",   de:"verkaufen",         pl:"—",            ru:"продавать",                tema:"Lebensmittel"},
  {art:"",   de:"bekommen",          pl:"—",            ru:"получать",                 tema:"Lebensmittel"},
  {art:"",   de:"möchten",           pl:"—",            ru:"хотеть (вежливо; ich möchte = я хотел бы)", tema:"Lebensmittel"},
  {art:"das",de:"Bargeld",           pl:"—",            ru:"наличные (деньги)",        tema:"Lebensmittel"},
  {art:"die",de:"Olive",             pl:"Oliven",       ru:"олива, оливка",            tema:"Lebensmittel"},
  {art:"das",de:"Rührei",            pl:"Rühreier",     ru:"яичница-болтунья",         tema:"Lebensmittel"},
  {art:"die",de:"Waffel",            pl:"Waffeln",      ru:"вафля",                    tema:"Lebensmittel"},
  {art:"das",de:"Bonbon",            pl:"Bonbons",      ru:"конфета, леденец",         tema:"Lebensmittel"},
  {art:"die",de:"Konfitüre",         pl:"Konfitüren",   ru:"конфитюр (джем с кусочками фруктов)", tema:"Lebensmittel"},
  {art:"die",de:"Schlagsahne",       pl:"—",            ru:"взбитые сливки",           tema:"Lebensmittel"},
  {art:"der",de:"Keks",              pl:"Kekse",        ru:"печенье (штука)",          tema:"Lebensmittel"},
  {art:"der",de:"Kräutertee",        pl:"Kräutertees",  ru:"травяной чай",             tema:"Lebensmittel"},
  {art:"die",de:"Eiscreme",          pl:"Eiscremes",    ru:"мороженое",                tema:"Lebensmittel"},
  {art:"die",de:"Eiswaffel",         pl:"Eiswaffeln",   ru:"вафельный рожок",          tema:"Lebensmittel"},
  {art:"das",de:"Sandwich",          pl:"Sandwichs",    ru:"сэндвич, бутерброд",       tema:"Lebensmittel"},
  {art:"das",de:"Steak",             pl:"Steaks",       ru:"стейк",                    tema:"Lebensmittel"},
  {art:"der",de:"Beilagensalat",     pl:"Beilagensalate",ru:"салат (как гарнир)",      tema:"Lebensmittel"},
  {art:"der",de:"Frischkäse",        pl:"—",            ru:"сливочный сыр, творожный сыр", tema:"Lebensmittel"},
  {art:"die",de:"Salami",            pl:"Salamis",      ru:"салями",                   tema:"Lebensmittel"},
  {art:"die",de:"Karotte",           pl:"Karotten",     ru:"морковь",                  tema:"Lebensmittel"},
  {art:"der",de:"Knoblauch",         pl:"—",            ru:"чеснок",                   tema:"Lebensmittel"},
  {art:"das",de:"Hackfleisch",       pl:"—",            ru:"фарш",                     tema:"Lebensmittel"},
  {art:"der",de:"Schenkel",          pl:"Schenkel",     ru:"бедрышко (мясо)",          tema:"Lebensmittel"},
  {art:"die",de:"Brust",             pl:"Brüste",       ru:"грудка (мясо); грудь",     tema:"Lebensmittel"},
  {art:"der",de:"Brokkoli",          pl:"—",            ru:"брокколи",                 tema:"Lebensmittel"},
  {art:"der",de:"Rotkohl",           pl:"—",            ru:"краснокочанная капуста",   tema:"Lebensmittel"},
  {art:"der",de:"Blumenkohl",        pl:"—",            ru:"цветная капуста",          tema:"Lebensmittel"},
  {art:"die",de:"Aprikose",          pl:"Aprikosen",    ru:"абрикос",                  tema:"Lebensmittel"},
  // ── Фото + текст: новые слова ────────────────────────────────────────────────
  // Море / рыба
  {art:"der",de:"Krebs",             pl:"Krebse",       ru:"краб",                     tema:"Lebensmittel"},
  {art:"der",de:"Tintenfisch",       pl:"Tintenfische",  ru:"кальмар, осьминог",        tema:"Lebensmittel"},
  {art:"die",de:"Forelle",           pl:"Forellen",     ru:"форель",                   tema:"Lebensmittel"},
  {art:"der",de:"Thunfisch",         pl:"Thunfische",   ru:"тунец",                    tema:"Lebensmittel"},
  {art:"der",de:"Lachs",             pl:"Lachse",       ru:"лосось",                   tema:"Lebensmittel"},
  {art:"der",de:"Karpfen",           pl:"Karpfen",      ru:"карп",                     tema:"Lebensmittel"},
  {art:"die",de:"Garnele",           pl:"Garnelen",     ru:"креветка",                 tema:"Lebensmittel"},
  // Мясо
  {art:"der",de:"Schinken",          pl:"Schinken",     ru:"ветчина",                  tema:"Lebensmittel"},
  {art:"das",de:"Schweinefleisch",   pl:"—",            ru:"свинина",                  tema:"Lebensmittel"},
  {art:"das",de:"Rindfleisch",       pl:"—",            ru:"говядина",                 tema:"Lebensmittel"},
  {art:"das",de:"Würstchen",         pl:"Würstchen",    ru:"сосиска",                  tema:"Lebensmittel"},
  // Выпечка / хлеб
  {art:"das",de:"Toastbrot",         pl:"Toastbrote",   ru:"тостовый хлеб",            tema:"Lebensmittel"},
  {art:"das",de:"Weißbrot",          pl:"Weißbrote",    ru:"белый хлеб",               tema:"Lebensmittel"},
  {art:"das",de:"Vollkornbrot",      pl:"Vollkornbrote",ru:"цельнозерновой хлеб",      tema:"Lebensmittel"},
  {art:"das",de:"Baguette",          pl:"Baguettes",    ru:"багет",                    tema:"Lebensmittel"},
  {art:"das",de:"Croissant",         pl:"Croissants",   ru:"круассан",                 tema:"Lebensmittel"},
  {art:"der",de:"Pfannkuchen",       pl:"Pfannkuchen",  ru:"блинчик, оладья",          tema:"Lebensmittel"},
  {art:"der",de:"Käsekuchen",        pl:"Käsekuchen",   ru:"чизкейк, творожный пирог", tema:"Lebensmittel"},
  // Напитки
  {art:"die",de:"Limonade",          pl:"Limonaden",    ru:"лимонад",                  tema:"Lebensmittel"},
  {art:"der",de:"Weißwein",          pl:"Weißweine",    ru:"белое вино",               tema:"Lebensmittel"},
  {art:"der",de:"Sekt",              pl:"—",            ru:"игристое вино, шампанское", tema:"Lebensmittel"},
  {art:"die",de:"Cola",              pl:"Colas",        ru:"кола",                     tema:"Lebensmittel"},
  {art:"der",de:"Orangensaft",       pl:"Orangensäfte", ru:"апельсиновый сок",         tema:"Lebensmittel"},
  {art:"der",de:"Cappuccino",        pl:"Cappuccinos",  ru:"капучино",                 tema:"Lebensmittel"},
  {art:"der",de:"Espresso",          pl:"Espressos",    ru:"эспрессо",                 tema:"Lebensmittel"},
  {art:"der",de:"Schwarztee",        pl:"Schwarztees",  ru:"чёрный чай",               tema:"Lebensmittel"},
  {art:"der",de:"Milchkaffee",       pl:"Milchkaffees", ru:"молочный кофе (латте)",    tema:"Lebensmittel"},
  // Блюда / подача
  {art:"die",de:"Vorspeise",         pl:"Vorspeisen",   ru:"закуска, первое блюдо",    tema:"Lebensmittel"},
  {art:"das",de:"Hauptgericht",      pl:"Hauptgerichte",ru:"главное блюдо",            tema:"Lebensmittel"},
  {art:"die",de:"Suppe",             pl:"Suppen",       ru:"суп",                      tema:"Lebensmittel"},
  {art:"die",de:"Cornflakes",        pl:"—",            ru:"кукурузные хлопья",        tema:"Lebensmittel"},
  {art:"die",de:"Pommes frites",     pl:"—",            ru:"картофель фри",            tema:"Lebensmittel"},
  // Посуда / действия
  {art:"der",de:"Suppenlöffel",      pl:"Suppenlöffel", ru:"суповая ложка",            tema:"Lebensmittel"},
  {art:"das",de:"Messer",            pl:"Messer",       ru:"нож",                      tema:"Lebensmittel"},
  {art:"",   de:"schneiden",         pl:"—",            ru:"резать",                   tema:"Lebensmittel"},
  {art:"",   de:"schälen",           pl:"—",            ru:"чистить (кожуру)",         tema:"Lebensmittel"},
  // Яйца
  {art:"das",de:"Spiegelei",         pl:"Spiegeleier",  ru:"яичница-глазунья",         tema:"Lebensmittel"},
  {art:"das",de:"Hühnerei",          pl:"Hühnereier",   ru:"куриное яйцо",             tema:"Lebensmittel"},
  {art:"das",de:"Eiweiß",            pl:"—",            ru:"белок яйца",               tema:"Lebensmittel"},
  {art:"das",de:"Eigelb",            pl:"Eigelbe",      ru:"желток яйца",              tema:"Lebensmittel"},
  // Фрукты / ягоды
  {art:"der",de:"Pfirsich",          pl:"Pfirsiche",    ru:"персик",                   tema:"Lebensmittel"},
  {art:"die",de:"Birne",             pl:"Birnen",       ru:"груша",                    tema:"Lebensmittel"},
  {art:"die",de:"Kirsche",           pl:"Kirschen",     ru:"вишня, черешня",           tema:"Lebensmittel"},
  {art:"die",de:"Himbeere",          pl:"Himbeeren",    ru:"малина",                   tema:"Lebensmittel"},
  {art:"die",de:"Brombeere",         pl:"Brombeeren",   ru:"ежевика",                  tema:"Lebensmittel"},
  {art:"die",de:"Erdbeere",          pl:"Erdbeeren",    ru:"клубника",                 tema:"Lebensmittel"},
  {art:"die",de:"Grapefruit",        pl:"Grapefruits",  ru:"грейпфрут",               tema:"Lebensmittel"},
  {art:"die",de:"Zitrone",           pl:"Zitronen",     ru:"лимон",                    tema:"Lebensmittel"},
  {art:"die",de:"Limette",           pl:"Limetten",     ru:"лайм",                     tema:"Lebensmittel"},
  {art:"die",de:"Rosine",            pl:"Rosinen",      ru:"изюм",                     tema:"Lebensmittel"},
  // Овощи / зелень
  {art:"der",de:"Spinat",            pl:"—",            ru:"шпинат",                   tema:"Lebensmittel"},
  {art:"die",de:"Paprika",           pl:"Paprikas",     ru:"болгарский перец",         tema:"Lebensmittel"},
  {art:"der",de:"Kopfsalat",         pl:"Kopfsalate",   ru:"листовой салат-латук",     tema:"Lebensmittel"},
  {art:"die",de:"Gurke",             pl:"Gurken",       ru:"огурец",                   tema:"Lebensmittel"},
  {art:"der",de:"Kürbis",            pl:"Kürbisse",     ru:"тыква",                    tema:"Lebensmittel"},
  {art:"der",de:"Pilz",              pl:"Pilze",        ru:"гриб",                     tema:"Lebensmittel"},
  {art:"der",de:"Champignon",        pl:"Champignons",  ru:"шампиньон",               tema:"Lebensmittel"},
  // Приправы / специи / соусы
  {art:"die",de:"Mayonnaise",        pl:"—",            ru:"майонез",                  tema:"Lebensmittel"},
  {art:"der",de:"Senf",              pl:"—",            ru:"горчица",                  tema:"Lebensmittel"},
  {art:"der",de:"Ketchup",           pl:"—",            ru:"кетчуп",                   tema:"Lebensmittel"},
  {art:"der",de:"Essig",             pl:"—",            ru:"уксус",                    tema:"Lebensmittel"},
  {art:"das",de:"Olivenöl",          pl:"—",            ru:"оливковое масло",          tema:"Lebensmittel"},
  {art:"der",de:"Pfeffer",           pl:"—",            ru:"перец (специя)",           tema:"Lebensmittel"},
  {art:"das",de:"Salz",              pl:"—",            ru:"соль",                     tema:"Lebensmittel"},
  {art:"der",de:"Oregano",           pl:"—",            ru:"орегано",                  tema:"Lebensmittel"},
  {art:"die",de:"Minze",             pl:"Minzen",       ru:"мята",                     tema:"Lebensmittel"},
  {art:"der",de:"Rosmarin",          pl:"—",            ru:"розмарин",                 tema:"Lebensmittel"},
  {art:"das",de:"Basilikum",         pl:"—",            ru:"базилик",                  tema:"Lebensmittel"},
  {art:"der",de:"Schnittlauch",      pl:"—",            ru:"шнитт-лук",                tema:"Lebensmittel"},
  {art:"die",de:"Petersilie",        pl:"—",            ru:"петрушка",                 tema:"Lebensmittel"},
  // Прочее
  {art:"",   de:"vegetarisch",       pl:"—",            ru:"вегетарианский",           tema:"Lebensmittel"},
  {art:"die",de:"Leute",             pl:"—",            ru:"люди",                     tema:"Alltag"},
  {art:"der",de:"Nachtisch",         pl:"Nachtische",   ru:"десерт",                   tema:"Lebensmittel"},
  {art:"die",de:"Kantine",           pl:"Kantinen",     ru:"столовая",                 tema:"Lebensmittel", ipa:"[kanˈtiːnə]"},
  {art:"der",de:"Imbiss",            pl:"Imbisse",      ru:"закусочная; перекус",       tema:"Lebensmittel", ipa:"[ˈɪmbɪs]"},
  {art:"der",de:"Seetang",           pl:"—",            ru:"морская капуста; водоросли",tema:"Lebensmittel"},
  {art:"",   de:"fast",              pl:"—",            ru:"почти, едва не",           tema:"Alltag"},
  {art:"",   de:"doch",              pl:"—",            ru:"всё-таки; ведь; же (усиление)", tema:"Alltag"},
  {art:"",   de:"vergessen",         pl:"—",            ru:"забывать, забыть",         tema:"Alltag"},
  {art:"",   de:"holen",             pl:"—",            ru:"брать, забирать; принести", tema:"Alltag"},
  {art:"",   de:"fragen",            pl:"—",            ru:"спрашивать",               tema:"Alltag"},
  {art:"",   de:"gehen",             pl:"—",            ru:"идти, ходить",             tema:"Alltag"},
  {art:"",   de:"anbieten",          pl:"—",            ru:"предлагать, угощать",       tema:"Trennbare Verben"},
  {art:"",   de:"empfehlen",         pl:"—",            ru:"рекомендовать",             nota:"e→ie: empfiehlt"},
  {art:"",   de:"eineinhalb",        pl:"—",            ru:"полтора (1,5)"},
  {art:"",   de:"anderthalb",        pl:"—",            ru:"полтора (1,5) · разговорная форма"},
  {art:"",   de:"knapp",             pl:"—",            ru:"едва, чуть меньше; скудный, тесный"},
  // L7 Arbeit und Beruf
  {art:"der", de:"Beruf",            pl:"Berufe",       ru:"профессия",                                   tema:"Berufe"},
  {art:"der", de:"Kellner",          pl:"Kellner",      ru:"официант\nf. - die Kellnerin",                tema:"Berufe"},
  {art:"der", de:"Koch",             pl:"Köche",        ru:"повар\nf. - die Köchin",                      tema:"Berufe"},
  {art:"der", de:"Krankenpfleger",   pl:"Krankenpfleger",ru:"медбрат\nf. - die Krankenschwester",         tema:"Berufe"},
  {art:"der", de:"Hausmeister",      pl:"Hausmeister",  ru:"завхоз, комендант\nf. - die Hausmeisterin",   tema:"Berufe"},
  {art:"der", de:"Bankkaufmann",     pl:"Bankkaufleute",ru:"банковский служащий\nf. - die Bankkauffrau",  tema:"Berufe"},
  {art:"der", de:"Briefträger",      pl:"Briefträger",  ru:"почтальон\nf. - die Briefträgerin",           tema:"Berufe"},
  {art:"der", de:"Taxifahrer",       pl:"Taxifahrer",   ru:"таксист\nf. - die Taxifahrerin",              tema:"Berufe"},
  {art:"der", de:"Sekretär",         pl:"Sekretäre",    ru:"секретарь\nf. - die Sekretärin",              tema:"Berufe"},
  {art:"die", de:"Altenpflegerin",   pl:"-nen",         ru:"сиделка для пожилых",                         tema:"Berufe"},
  {art:"die", de:"Reinigungskraft",  pl:"-kräfte",      ru:"уборщик/уборщица",                            tema:"Berufe"},
  {art:"die", de:"Karriere",         pl:"-n",           ru:"карьера",                                     tema:"Arbeit"},
  {art:"die", de:"Stelle",           pl:"-n",           ru:"должность, вакансия, место",                  tema:"Arbeit"},
  {art:"die", de:"Arbeitszeit",      pl:"-en",          ru:"рабочее время",                               tema:"Arbeit"},
  {art:"die", de:"Mittagspause",     pl:"-n",           ru:"обеденный перерыв",                           tema:"Arbeit"},
  {art:"die", de:"Nachtschicht",     pl:"-en",          ru:"ночная смена",                                tema:"Arbeit"},
  {art:"der", de:"Schichtdienst",    pl:"-e",           ru:"сменная работа",                              tema:"Arbeit"},
  {art:"",   de:"verdienen",         pl:"—",            ru:"зарабатывать",                                tema:"Arbeit"},
  {art:"",   de:"schmecken",         pl:"—",            ru:"быть вкусным · Das schmeckt mir = мне нравится на вкус"},
  {art:"",   de:"satt",              pl:"—",            ru:"сытый · Ich bin satt = я наелся/наелась"},
  // L7B Bank
  {art:"der", de:"Geldautomat",      pl:"-en",          ru:"банкомат",                                    tema:"Arbeit"},
  {art:"die", de:"EC-Karte",         pl:"-n",           ru:"банковская карта",                            tema:"Arbeit"},
  {art:"die", de:"Kontonummer",      pl:"-n",           ru:"номер счёта",                                 tema:"Arbeit"},
  {art:"der", de:"Kontoauszug",      pl:"-züge",        ru:"выписка со счёта",                            tema:"Arbeit"},
  {art:"die", de:"IBAN",             pl:"—",            ru:"IBAN (международный номер счёта)",            tema:"Arbeit"},
  {art:"das", de:"Überweisungsformular",pl:"-e",        ru:"бланк банковского перевода",                  tema:"Arbeit"},
  {art:"das", de:"Konto",            pl:"Konten",       ru:"банковский счёт",                             tema:"Arbeit"},
  {art:"",   de:"überweisen",        pl:"—",            ru:"переводить (деньги)",                         tema:"Arbeit"},
  // L8 Körperteile
  {art:"der", de:"Kopf",             pl:"Köpfe",        ru:"голова",                pt:"\"-e",            tema:"Körper"},
  {art:"die", de:"Haare",            pl:"Haare",        ru:"волосы (pl.)",          pt:"—",               tema:"Körper"},
  {art:"das", de:"Auge",             pl:"Augen",        ru:"глаз",                  pt:"-n",              tema:"Körper"},
  {art:"das", de:"Ohr",              pl:"Ohren",        ru:"ухо",                   pt:"-en",             tema:"Körper"},
  {art:"der", de:"Mund",             pl:"Münder",       ru:"рот",                   pt:"\"-er",           tema:"Körper"},
  {art:"die", de:"Nase",             pl:"Nasen",        ru:"нос",                   pt:"-n",              tema:"Körper"},
  {art:"die", de:"Zunge",            pl:"Zungen",       ru:"язык (во рту)",         pt:"-n",              tema:"Körper"},
  {art:"der", de:"Hals",             pl:"Hälse",        ru:"горло, шея",            pt:"\"-e",            tema:"Körper"},
  {art:"die", de:"Schulter",         pl:"Schultern",    ru:"плечо",                 pt:"-n",              tema:"Körper"},
  {art:"der", de:"Arm",              pl:"Arme",         ru:"рука (от плеча до кисти)",pt:"-e",            tema:"Körper"},
  {art:"die", de:"Hand",             pl:"Hände",        ru:"рука (кисть)",          pt:"\"-e",            tema:"Körper"},
  {art:"der", de:"Finger",           pl:"Finger",       ru:"палец",                 pt:"—",               tema:"Körper"},
  {art:"das", de:"Handgelenk",       pl:"Handgelenke",  ru:"запястье",              pt:"-e",              tema:"Körper"},
  {art:"der", de:"Rücken",           pl:"Rücken",       ru:"спина",                 pt:"—",               tema:"Körper"},
  {art:"der", de:"Bauch",            pl:"Bäuche",       ru:"живот",                 pt:"\"-e",            tema:"Körper"},
  {art:"die", de:"Brust",            pl:"Brüste",       ru:"грудь",                 pt:"\"-e",            tema:"Körper"},
  {art:"das", de:"Bein",             pl:"Beine",        ru:"нога (от бедра до стопы)",pt:"-e",            tema:"Körper"},
  {art:"das", de:"Knie",             pl:"Knie",         ru:"колено",                pt:"—",               tema:"Körper"},
  {art:"der", de:"Fuß",              pl:"Füße",         ru:"стопа, нога (ступня)",  pt:"\"-e",            tema:"Körper"},
  {art:"die", de:"Zehe",             pl:"Zehen",        ru:"палец ноги",            pt:"-n",              tema:"Körper"},
  {art:"die", de:"Stirn",            pl:"Stirnen",      ru:"лоб",                   pt:"-en",             tema:"Körper"},
  {art:"das", de:"Kinn",             pl:"Kinne",        ru:"подбородок",            pt:"-e",              tema:"Körper"},
  {art:"die", de:"Wange",            pl:"Wangen",       ru:"щека",                  pt:"-n",              tema:"Körper"},
  {art:"die", de:"Lippe",            pl:"Lippen",       ru:"губа",                  pt:"-n",              tema:"Körper"},
  {art:"der", de:"Ellenbogen",       pl:"Ellenbogen",   ru:"локоть",                pt:"—",               tema:"Körper"},
  {art:"das", de:"Gelenk",           pl:"Gelenke",      ru:"сустав",                pt:"-e",              tema:"Körper"},
  {art:"der", de:"Knöchel",          pl:"Knöchel",      ru:"щиколотка, голеностоп", pt:"—",               tema:"Körper"},
  {art:"die", de:"Ferse",            pl:"Fersen",       ru:"пятка",                 pt:"-n",              tema:"Körper"},
  {art:"der", de:"Po",               pl:"Pos",          ru:"ягодица, попа",         pt:"-s",              tema:"Körper"},
  // L8 Gesundheit
  {art:"die", de:"Erkältung",        pl:"-en",          ru:"простуда",                                    tema:"Gesundheit"},
  {art:"der", de:"Husten",           pl:"—",            ru:"кашель",                                      tema:"Gesundheit"},
  {art:"der", de:"Schnupfen",        pl:"—",            ru:"насморк",                                     tema:"Gesundheit"},
  {art:"das", de:"Fieber",           pl:"—",            ru:"температура, жар",                            tema:"Gesundheit"},
  {art:"die", de:"Grippe",           pl:"-n",           ru:"грипп",                                       tema:"Gesundheit"},
  {art:"die", de:"Schmerzen",        pl:"Schmerzen",    ru:"боли, болезненные ощущения (обычно мн.ч.)",  pt:"—",tema:"Gesundheit"},
  {art:"die", de:"Tablette",         pl:"-n",           ru:"таблетка",                                    tema:"Gesundheit"},
  {art:"das", de:"Medikament",       pl:"-e",           ru:"лекарство, медикамент",                       tema:"Gesundheit"},
  {art:"das", de:"Rezept",           pl:"-e",           ru:"рецепт (врача); рецепт (кулинарный)",         tema:"Gesundheit"},
  {art:"",   de:"rezeptfrei",        pl:"—",            ru:"безрецептурный (без рецепта)",                tema:"Gesundheit"},
  {art:"",   de:"rezeptpflichtig",   pl:"—",            ru:"по рецепту (требует рецепта)",                tema:"Gesundheit"},
  {art:"die", de:"Praxis",           pl:"Praxen",       ru:"кабинет врача, медицинская клиника",          tema:"Gesundheit"},
  {art:"der", de:"Hausarzt",         pl:"Hausärzte",    ru:"участковый врач, терапевт\nf. - die Hausärztin",tema:"Gesundheit"},
  {art:"die", de:"Untersuchung",     pl:"-en",          ru:"обследование, осмотр",                        tema:"Gesundheit"},
  {art:"der", de:"Zufall",           pl:"Zufälle",      ru:"случайность, случай",                         tema:"Gesundheit"},
  {art:"",   de:"fehlen",            pl:"—",            ru:"не хватать; болеть · Was fehlt Ihnen? = Что вас беспокоит?"},
  {art:"",   de:"weh|tun",           pl:"—",            ru:"болеть · tut weh = болит",                    tema:"Gesundheit"},
  {art:"",   de:"erkältet",          pl:"—",            ru:"простуженный · Ich bin erkältet = у меня простуда"},
  // L7 дополнительные слова
  {art:"die", de:"Baustelle",        pl:"-n",           ru:"стройка, строительная площадка",              tema:"Arbeit"},
  {art:"die", de:"Werkstatt",        pl:"-en",          ru:"мастерская, автосервис",     pt:"\"-en",       tema:"Arbeit"},
  {art:"das", de:"Krankenhaus",      pl:"Krankenhäuser",ru:"больница",                   pt:"\"-er",       tema:"Gesundheit"},
  {art:"die", de:"Gebühr",           pl:"-en",          ru:"сбор, комиссия, плата",                       tema:"Arbeit"},
  {art:"die", de:"Bankverbindung",   pl:"-en",          ru:"банковские реквизиты",                        tema:"Arbeit"},
  {art:"die", de:"Überweisung",      pl:"-en",          ru:"банковский перевод; направление (к врачу)",   tema:"Arbeit"},
  {art:"die", de:"Kasse",            pl:"-n",           ru:"касса, кассовый аппарат",                     tema:"Arbeit"},
  {art:"das", de:"Formular",         pl:"-e",           ru:"бланк, форма, анкета",                        tema:"Arbeit"},
  {art:"das", de:"Team",             pl:"-s",           ru:"команда, коллектив",                          tema:"Arbeit"},
  {art:"der", de:"Kollege",          pl:"-n",           ru:"коллега (м.р.)\nf. - die Kollegin",           tema:"Arbeit"},
  {art:"der", de:"Termin",           pl:"-e",           ru:"встреча, запись (к врачу); срок",             tema:"Alltag"},
  {art:"der", de:"Chef",             pl:"-s",           ru:"начальник, шеф\nf. - die Chefin",             tema:"Arbeit"},
  {art:"die", de:"Haltestelle",      pl:"-n",           ru:"остановка (автобус/трамвай)",                 tema:"Alltag"},
  {art:"das", de:"Fahrzeug",         pl:"-e",           ru:"транспортное средство",                       tema:"Alltag"},
  {art:"der", de:"PKW",              pl:"—",            ru:"PKW = PersonenKraftWagen = легковой автомобиль"},
  {art:"der", de:"LKW",              pl:"—",            ru:"LKW = LastkraftWagen = грузовик"},
  {art:"",   de:"wechseln",          pl:"—",            ru:"менять (деньги/работу/место)",                tema:"Arbeit"},
  {art:"",   de:"beraten",           pl:"—",            ru:"консультировать, советовать",                 tema:"Arbeit"},
  {art:"",   de:"kontrollieren",     pl:"—",            ru:"контролировать, проверять",                   tema:"Arbeit"},
  {art:"",   de:"unterschreiben",    pl:"—",            ru:"подписывать",                                 tema:"Arbeit"},
  {art:"",   de:"anstrengend",       pl:"—",            ru:"утомительный, напряжённый, изматывающий"},
  {art:"",   de:"reisen",            pl:"—",            ru:"путешествовать",                              tema:"Alltag"},
  {art:"",   de:"drinnen",           pl:"—",            ru:"внутри, в помещении"},
  // L8 новые слова
  {art:"der", de:"Mumps",            pl:"—",            ru:"свинка (болезнь)",                            tema:"Gesundheit"},
  {art:"die", de:"Windpocken",       pl:"Windpocken",   ru:"ветряная оспа, ветрянка (мн.ч.)",  pt:"—",   tema:"Gesundheit"},
  {art:"die", de:"Masern",           pl:"Masern",       ru:"корь (мн.ч.)",                      pt:"—",   tema:"Gesundheit"},
  {art:"der", de:"Scharlach",        pl:"—",            ru:"скарлатина",                                  tema:"Gesundheit"},
  {art:"die", de:"Halstablette",     pl:"-n",           ru:"леденец/таблетка от горла",                   tema:"Gesundheit"},
  {art:"die", de:"Krankschreibung",  pl:"-en",          ru:"больничный лист (справка о болезни)",         tema:"Gesundheit"},
  {art:"die", de:"Krankenkasse",     pl:"-n",           ru:"страховая медицинская касса",                 tema:"Gesundheit"},
  {art:"die", de:"Gesundheitskarte", pl:"-n",           ru:"карта медицинского страхования",              tema:"Gesundheit"},
  {art:"die", de:"Zeitschrift",      pl:"-en",          ru:"журнал (периодическое издание)"},
  {art:"",   de:"operieren",         pl:"—",            ru:"оперировать",                                 tema:"Gesundheit"},
  {art:"",   de:"begleiten",         pl:"—",            ru:"сопровождать, составить компанию"},
  {art:"",   de:"messen",            pl:"—",            ru:"мерить, измерять · Fieber messen = мерить температуру", tema:"Gesundheit"},
  {art:"",   de:"anmachen",          pl:"—",            ru:"включать (свет/технику)",                     tema:"Trennbare Verben"},
  {art:"",   de:"ausmachen",         pl:"—",            ru:"выключать (свет/технику)",                    tema:"Trennbare Verben"},
  {art:"",   de:"möglicherweise",    pl:"—",            ru:"возможно, вероятно (möglicherweise > vielleicht)"},
  {art:"",   de:"überrascht",        pl:"—",            ru:"удивлённый · Ich bin überrascht = я удивлён(а)"},
  {art:"",   de:"sollte",            pl:"—",            ru:"следовало бы, нужно бы (Konjunktiv II от sollen) · Du solltest schlafen."},
  // ── L8E · Notruf ─────────────────────────────────────────────────────────────
  {art:"der", de:"Notruf",          pl:"-e",           ru:"экстренный вызов (112)",                      tema:"Notruf"},
  {art:"der", de:"Notfall",         pl:"Notfälle",     ru:"чрезвычайная ситуация",                       tema:"Notruf"},
  {art:"der", de:"Unfall",          pl:"Unfälle",      ru:"авария, несчастный случай",                   tema:"Notruf"},
  {art:"der", de:"Notarzt",         pl:"Notärzte",     ru:"врач скорой помощи\nf. - die Notärztin",      tema:"Notruf"},
  {art:"die", de:"Verletzung",      pl:"-en",          ru:"травма, повреждение",                         tema:"Notruf"},
  {art:"die", de:"Not",             pl:"Nöte",         ru:"нужда, необходимость",                        tema:"Notruf"},
  {art:"",   de:"verletzt",         pl:"—",            ru:"раненый, травмированный",                     tema:"Notruf"},
  {art:"",   de:"dringend",         pl:"—",            ru:"срочный, неотложный",                         tema:"Notruf"},
  {art:"",   de:"erklären",         pl:"—",            ru:"объяснять",                                   tema:"Notruf"},
  {art:"",   de:"schicken",         pl:"—",            ru:"отправлять, посылать",                         tema:"Notruf"},
  {art:"",   de:"auflegen",         pl:"—",            ru:"класть трубку (телефон)",                     tema:"Notruf"},
  {art:"",   de:"anhalten",         pl:"—",            ru:"останавливаться",                             tema:"Notruf"},
  {art:"",   de:"vorbeifahren",     pl:"—",            ru:"проезжать мимо",                              tema:"Notruf"},
  {art:"",   de:"erste Hilfe leisten", pl:"—",         ru:"оказывать первую помощь",                     tema:"Notruf"},
  // ── L9A · Verkehrsmittel ─────────────────────────────────────────────────────
  {art:"das", de:"Auto",            pl:"-s",           ru:"автомобиль",                                  tema:"Verkehrsmittel"},
  {art:"das", de:"Fahrrad",         pl:"Fahrräder",    ru:"велосипед",                                   tema:"Verkehrsmittel"},
  {art:"das", de:"Motorrad",        pl:"Motorräder",   ru:"мотоцикл",                                    tema:"Verkehrsmittel"},
  {art:"die", de:"Straßenbahn",     pl:"-en",          ru:"трамвай",                                     tema:"Verkehrsmittel"},
  {art:"die", de:"U-Bahn",          pl:"-en",          ru:"метро, подземка",                             tema:"Verkehrsmittel"},
  {art:"die", de:"S-Bahn",          pl:"-en",          ru:"городская электричка",                        tema:"Verkehrsmittel"},
  {art:"der", de:"Fußgänger",       pl:"-",            ru:"пешеход\nf. - die Fußgängerin",               tema:"Verkehrsmittel"},
  {art:"die", de:"Autobahn",        pl:"-en",          ru:"автострада",                                  tema:"Verkehrsmittel"},
  {art:"die", de:"Fahrbahn",        pl:"-en",          ru:"проезжая часть",                              tema:"Verkehrsmittel"},
  {art:"der", de:"Bürgersteig",     pl:"-e",           ru:"тротуар",                                     tema:"Verkehrsmittel"},
  {art:"der", de:"Fahrradweg",      pl:"-e",           ru:"велодорожка",                                 tema:"Verkehrsmittel"},
  {art:"das", de:"Verkehrsmittel",  pl:"Verkehrsmittel", ru:"транспортное средство (pl: Verkehrsmittel = виды транспорта)", tema:"Verkehrsmittel"},
  {art:"",   de:"benutzen",         pl:"—",            ru:"использовать, пользоваться",                  tema:"Verkehrsmittel"},
  {art:"",   de:"fliegen",          pl:"—",            ru:"летать",                                      tema:"Verkehrsmittel"},
  {art:"der", de:"Hubschrauber",    pl:"-",            ru:"вертолёт",                                    tema:"Verkehrsmittel"},
  {art:"das", de:"Wohnmobil",       pl:"-e",           ru:"автодом, кемпер",                              tema:"Verkehrsmittel"},
  {art:"die", de:"Fähre",           pl:"-n",           ru:"паром",                                       tema:"Verkehrsmittel"},
  {art:"der", de:"Motorroller",     pl:"-",            ru:"мотороллер, скутер",                          tema:"Verkehrsmittel"},
  {art:"das", de:"Boot",            pl:"-e",           ru:"лодка",                                       tema:"Verkehrsmittel"},
  {art:"die", de:"Straßenbahnhaltestelle",pl:"-n",     ru:"трамвайная остановка",                        tema:"Verkehrsmittel"},
  {art:"der", de:"Campingplatz",    pl:'"-e',          ru:"кемпинг",                                     tema:"Verkehrsmittel"},
  {art:"der", de:"Busbahnhof",      pl:'"-e',          ru:"автовокзал",                                  tema:"Verkehrsmittel"},
  // ── L8/L9 · Allgemein ────────────────────────────────────────────────────────
  {art:"das", de:"Werkzeug",        pl:"-e",           ru:"инструмент, орудие · das Zeug = вещи"},
  {art:"das", de:"Spielzeug",       pl:"-e",           ru:"игрушка · das Zeug = вещи"},
  // ── L8 · Gesundheit erweitert ─────────────────────────────────────────────────
  {art:"",   de:"erschöpft",        pl:"—",            ru:"изможденный, истощённый (о человеке)",        tema:"Gesundheit"},
  {art:"",   de:"übermüdet",        pl:"—",            ru:"переутомлённый",                              tema:"Gesundheit"},
  {art:"",   de:"überarbeitet",     pl:"—",            ru:"перетрудившийся",                             tema:"Gesundheit"},
  {art:"",   de:"überfordert",      pl:"—",            ru:"перегруженный (задачами)",                    tema:"Gesundheit"},
  {art:"",   de:"gestresst",        pl:"—",            ru:"в стрессе (о человеке)",                      tema:"Gesundheit"},
  {art:"",   de:"stressig",         pl:"—",            ru:"стрессовый (о ситуации)",                     tema:"Gesundheit"},
  {art:"",   de:"sich erholen",     pl:"—",            ru:"восстанавливаться, отдыхать",                 tema:"Gesundheit"},
  {art:"",   de:"sich entspannen",  pl:"—",            ru:"расслабляться",                               tema:"Gesundheit"},
  {art:"",   de:"sich ausruhen",    pl:"—",            ru:"отдыхать, передыхать",                        tema:"Gesundheit"},
  {art:"",   de:"sich hinlegen",    pl:"—",            ru:"лечь, прилечь",                               tema:"Gesundheit"},
  {art:"",   de:"sich bewegen",     pl:"—",            ru:"двигаться, делать физ. упражнения",           tema:"Gesundheit"},
  {art:"die", de:"Ernährung",       pl:"—",            ru:"питание, рацион",                             tema:"Gesundheit"},
  {art:"das", de:"Arzneimittel",    pl:"Arzneimittel", ru:"лекарственное средство (фарм.)",              tema:"Gesundheit"},
  {art:"",   de:"regelmäßig",       pl:"—",            ru:"регулярный; регулярно",                       tema:"Gesundheit"},
  {art:"",   de:"dick",             pl:"—",            ru:"толстый; жирный",                             tema:"Gesundheit"},
  {art:"",   de:"häufig",           pl:"—",            ru:"часто, нередко",                              tema:"Gesundheit"},
  {art:"das", de:"Gewicht",         pl:"Gewichte",     ru:"вес · zu viel Gewicht = лишний вес",          tema:"Gesundheit"},
  {art:"die", de:"Süßigkeiten",     pl:"—",            ru:"сладости, конфеты (только мн.ч.)",            tema:"Gesundheit"},
  {art:"",   de:"selbst",           pl:"—",            ru:"сам, сама, само (emphatic)"},
  // ── L8/L9 · Trennbare Verben / Phrase ────────────────────────────────────────
  {art:"",   de:"nachdenken",       pl:"—",            ru:"думать, размышлять (über +Akk = о чём-то)",  tema:"Trennbare Verben"},
  {art:"",   de:"ausgeben",         pl:"—",            ru:"тратить (деньги)",                            tema:"Trennbare Verben"},
  {art:"",   de:"sich leisten",     pl:"—",            ru:"позволить себе (купить / сделать что-то)"},
  {art:"",   de:"umsonst",          pl:"—",            ru:"бесплатно; зря, напрасно"},
  // ── Körper erweitert (pp.102-103) ─────────────────────────────────────────────
  {art:"der", de:"Ellbogen",        pl:"-",            ru:"локоть",                                      tema:"Körper"},
  {art:"der", de:"Unterschenkel",   pl:"-",            ru:"голень",                                      tema:"Körper"},
  {art:"der", de:"Oberschenkel",    pl:"-",            ru:"бедро",                                       tema:"Körper"},
  {art:"der", de:"Muskel",          pl:"-n",           ru:"мышца",                                       tema:"Körper"},
  {art:"der", de:"Zeh",             pl:"-en",          ru:"палец ноги",                                  tema:"Körper"},
  {art:"die", de:"Augenbraue",      pl:"-n",           ru:"бровь",                                       tema:"Körper"},
  {art:"die", de:"Wimper",          pl:"-n",           ru:"ресница",                                     tema:"Körper"},
  {art:"die", de:"Wirbelsäule",     pl:"—",            ru:"позвоночник",                                 tema:"Körper"},
  {art:"das", de:"Herz",            pl:"-en",          ru:"сердце",                                      tema:"Körper"},
  {art:"die", de:"Leber",           pl:"—",            ru:"печень",                                      tema:"Körper"},
  {art:"der", de:"Magen",           pl:"Mägen",        ru:"желудок",                                     tema:"Körper"},
  // ── Gesundheit L8 добавки ─────────────────────────────────────────────────────
  {art:"die", de:"Kontrolle",       pl:"-n",           ru:"осмотр, проверка, контроль",                  tema:"Gesundheit"},
  {art:"",   de:"untersuchen",      pl:"—",            ru:"обследовать, осматривать (пациента)",         tema:"Gesundheit"},
  {art:"",   de:"sich krankmelden", pl:"—",            ru:"сообщать о болезни (работодателю)",           tema:"Gesundheit"},
  // ── Notruf L8E добавки ────────────────────────────────────────────────────────
  {art:"das", de:"Feuer",           pl:"—",            ru:"огонь; пожар",                                tema:"Notruf"},
  {art:"die", de:"Feuerwehr",       pl:"-en",          ru:"пожарная служба",                             tema:"Notruf"},
  {art:"der", de:"Krankenwagen",    pl:"-",            ru:"машина скорой помощи",                        tema:"Notruf"},
  {art:"",   de:"zusammenstoßen",   pl:"—",            ru:"сталкиваться",                                tema:"Notruf"},
  // ── Verkehrsmittel L9 добавки ─────────────────────────────────────────────────
  {art:"",   de:"umsteigen",        pl:"—",            ru:"пересаживаться, делать пересадку",            tema:"Verkehrsmittel"},
  {art:"der", de:"Lkw",             pl:"-s",           ru:"грузовик (Lastkraftwagen)",                   tema:"Verkehrsmittel"},
  {art:"",   de:"parken",           pl:"—",            ru:"парковаться",                                 tema:"Verkehrsmittel"},
  {art:"",   de:"hupen",            pl:"—",            ru:"сигналить",                                   tema:"Verkehrsmittel"},
  {art:"",   de:"weiterfahren",     pl:"—",            ru:"продолжать ехать",                            tema:"Verkehrsmittel"},
  {art:"",   de:"blinken",          pl:"—",            ru:"мигать (поворотник)",                         tema:"Verkehrsmittel"},
  {art:"die", de:"Vorfahrt",        pl:"—",            ru:"право первого проезда, приоритет",            tema:"Verkehrsmittel"},
  // ── In der Stadt L9B ──────────────────────────────────────────────────────────
  {art:"die", de:"Kreuzung",        pl:"-en",          ru:"перекрёсток",                                 tema:"InDerStadt"},
  {art:"die", de:"Schule",          pl:"-n",           ru:"школа",                                       tema:"InDerStadt"},
  {art:"der", de:"Bahnhof",         pl:"Bahnhöfe",     ru:"вокзал, железнодорожная станция",              tema:"InDerStadt"},
  {art:"",   de:"müssen",           pl:"—",            ru:"быть обязанным, должен · ich muss · Modalverb"},
  {art:"die", de:"Ampel",           pl:"-n",           ru:"светофор",                                    tema:"InDerStadt"},
  {art:"die", de:"Ecke",            pl:"-n",           ru:"угол; угол улицы · um die Ecke = за углом",  tema:"InDerStadt"},
  {art:"der", de:"Kreisverkehr",    pl:"-e",           ru:"круговое движение, кольцо",                   tema:"InDerStadt"},
  {art:"die", de:"Ausfahrt",        pl:"-en",          ru:"выезд, съезд (с кольца)",                    tema:"InDerStadt"},
  {art:"die", de:"Stunde",          pl:"-n",           ru:"час (единица времени)",                       tema:"InDerStadt"},
  {art:"die", de:"Minute",          pl:"-n",           ru:"минута",                                      tema:"InDerStadt"},
  {art:"",   de:"geradeaus",        pl:"—",            ru:"прямо",                                       tema:"InDerStadt"},
  {art:"",   de:"gegenüber",        pl:"—",            ru:"напротив · gegenüber dem Bahnhof",            tema:"InDerStadt"},
  {art:"",   de:"abbiegen",         pl:"—",            ru:"поворачивать · links/rechts abbiegen",        tema:"InDerStadt"},
  {art:"",   de:"sich verfahren",   pl:"—",            ru:"заблудиться (на машине/транспорте)",          tema:"InDerStadt"},
  {art:"",   de:"sich verlaufen",   pl:"—",            ru:"заблудиться (пешком)",                        tema:"InDerStadt"},
  {art:"",   de:"einige",           pl:"—",            ru:"несколько, некоторые"},
  // ── Führerschein L9C ──────────────────────────────────────────────────────────
  {art:"der", de:"Führerschein",    pl:"-e",           ru:"водительское удостоверение, права",           tema:"Fuehrerschein"},
  {art:"",   de:"dürfen",           pl:"—",            ru:"иметь право, быть разрешено · ich darf",     tema:"Fuehrerschein"},
  {art:"",   de:"erlauben",         pl:"—",            ru:"разрешать",                                   tema:"Fuehrerschein"},
  {art:"",   de:"verbieten",        pl:"—",            ru:"запрещать",                                   tema:"Fuehrerschein"},
  {art:"",   de:"erkennen",         pl:"—",            ru:"признавать; узнавать",                        tema:"Fuehrerschein"},
  {art:"die", de:"Anerkennung",     pl:"—",            ru:"признание, подтверждение",                    tema:"Fuehrerschein"},
  {art:"",   de:"ausländisch",      pl:"—",            ru:"иностранный",                                 tema:"Fuehrerschein"},
  {art:"der", de:"Ausländer",       pl:"-",            ru:"иностранец · f. die Ausländerin",             tema:"Fuehrerschein"},
  {art:"die", de:"Behörde",         pl:"-n",           ru:"орган власти, ведомство",                     tema:"Fuehrerschein"},
  // ── L9 Wichtige Wörter (pp.112-113) ──────────────────────────────────────────
  {art:"der", de:"Weg",             pl:"-e",           ru:"путь, дорога; маршрут",                        tema:"InDerStadt"},
  {art:"der", de:"Flughafen",       pl:"Flughäfen",    ru:"аэропорт",                                     tema:"InDerStadt"},
  {art:"die", de:"Stadtmitte",      pl:"—",            ru:"центр города",                                 tema:"InDerStadt"},
  {art:"die", de:"Monatskarte",     pl:"-n",           ru:"месячный проездной",                           tema:"InDerStadt"},
  {art:"der", de:"Platz",           pl:"Plätze",       ru:"площадь; место",                               tema:"InDerStadt"},
  {art:"der", de:"Baum",            pl:"Bäume",        ru:"дерево",                                       tema:"InDerStadt"},
  {art:"die", de:"Bank",            pl:"Bänke",        ru:"скамейка · die Bank/-en = банк",               tema:"InDerStadt"},
  {art:"der", de:"Hund",            pl:"-e",           ru:"собака",                                       tema:"InDerStadt"},
  {art:"das", de:"Schwimmbad",      pl:"Schwimmbäder", ru:"бассейн, купальня",                            tema:"InDerStadt"},
  {art:"das", de:"Rathaus",         pl:"Rathäuser",    ru:"ратуша, мэрия",                                tema:"InDerStadt"},
  {art:"die", de:"Bibliothek",      pl:"-en",          ru:"библиотека",                                   tema:"InDerStadt"},
  {art:"der", de:"Hauptbahnhof",    pl:"Hauptbahnhöfe",ru:"главный вокзал (Hbf)",                         tema:"InDerStadt"},
  {art:"",   de:"weit",             pl:"—",            ru:"далеко; далёкий · nicht weit = недалеко",      tema:"InDerStadt"},
  {art:"die", de:"Linie",           pl:"-n",           ru:"линия (транспортная)",                         tema:"InDerStadt"},
  {art:"der", de:"Zoo",             pl:"-s",           ru:"зоопарк",                                      tema:"InDerStadt"},
  {art:"der", de:"Spielplatz",      pl:"Spielplätze",  ru:"детская площадка",                             tema:"InDerStadt"},
  // L9C Führerschein добавки
  {art:"die", de:"Führerscheinprüfung",pl:"-en",       ru:"экзамен на водительские права",                tema:"Fuehrerschein"},
  {art:"",   de:"anerkennen",       pl:"—",            ru:"официально признавать",                        tema:"Fuehrerschein"},
  {art:"das", de:"Vorfahrtsschild", pl:"-er",          ru:"знак приоритета",                              tema:"Fuehrerschein"},
  {art:"das", de:"Schild",          pl:"-er",          ru:"знак, табличка",                               tema:"Fuehrerschein"},
  // Fahrplan
  {art:"der", de:"Fahrplan",        pl:"Fahrpläne",    ru:"расписание (транспорта)",                      tema:"Verkehrsmittel"},
  {art:"die", de:"Abfahrt",         pl:"-en",          ru:"отправление (поезда/автобуса)",                tema:"Verkehrsmittel"},
  // ── L10 · Mein Leben ─────────────────────────────────────────────────────────
  {art:"die", de:"Großstadt",       pl:"Großstädte",   ru:"большой город (мегаполис)",                    tema:"MeinLeben"},
  {art:"die", de:"Kleinstadt",      pl:"Kleinstädte",  ru:"маленький город",                              tema:"MeinLeben"},
  {art:"",   de:"ledig",            pl:"—",            ru:"холостой, незамужняя; не в браке",             tema:"MeinLeben"},
  {art:"",   de:"geschieden",       pl:"—",            ru:"разведённый/разведённая",                      tema:"MeinLeben"},
  {art:"",   de:"gestern",          pl:"—",            ru:"вчера"},
  // L10A Perfekt — новые глаголы
  {art:"",   de:"träumen",          pl:"—",            ru:"мечтать; видеть сон (von +Dat)"},
  {art:"",   de:"suchen",           pl:"—",            ru:"искать"},
  {art:"",   de:"reden",            pl:"—",            ru:"разговаривать, говорить (mit +Dat)"},
  {art:"",   de:"abholen",          pl:"—",            ru:"забирать, встречать (кого-то)",               tema:"Trennbare Verben"},
  // ── Базовые глаголы (по таблице starke Verben) ────────────────────────────
  {art:"",   de:"haben",            pl:"—",            ru:"иметь · ich habe · hat gehabt"},
  {art:"",   de:"sein",             pl:"—",            ru:"быть · ich bin · ist gewesen"},
  {art:"",   de:"geben",            pl:"—",            ru:"давать · gibt · hat gegeben"},
  {art:"",   de:"helfen",           pl:"—",            ru:"помогать · hilft · hat geholfen"},
  {art:"",   de:"heißen",           pl:"—",            ru:"называться; звать · heißt · hat geheißen"},
  {art:"",   de:"stehen",           pl:"—",            ru:"стоять · steht · hat gestanden"},
  {art:"",   de:"bringen",          pl:"—",            ru:"приносить, доставлять · bringt · hat gebracht"},
  {art:"",   de:"denken",           pl:"—",            ru:"думать · denkt · hat gedacht"},
  {art:"",   de:"wissen",           pl:"—",            ru:"знать (факты) · weiß · hat gewusst"},
  {art:"",   de:"tun",              pl:"—",            ru:"делать · tut · hat getan"},
  {art:"",   de:"singen",           pl:"—",            ru:"петь · singt · hat gesungen"},
  {art:"",   de:"rufen",            pl:"—",            ru:"звать, кричать · ruft · hat gerufen"},
  {art:"",   de:"weinen",           pl:"—",            ru:"плакать"},
  {art:"",   de:"üben",             pl:"—",            ru:"упражняться, тренироваться"},
  {art:"",   de:"stellen",          pl:"—",            ru:"ставить (вертикально)"},
  {art:"",   de:"legen",            pl:"—",            ru:"класть (горизонтально)"},
  {art:"",   de:"hängen",           pl:"—",            ru:"вешать, висеть"},
  {art:"",   de:"zahlen",           pl:"—",            ru:"платить · zahlt · hat gezahlt"},
  {art:"",   de:"rauchen",          pl:"—",            ru:"курить"},
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
  {a:"fröhlich",   ra:"весёлый, радостный", b:"traurig", rb:"грустный, печальный"},
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
// ─── KONJUGATION (L2 — er/sie/es + Plural) — порядок как в книге ─────────────
const KONJ_L2={
  kommen:  {ich:"komme",du:"kommst","er/sie/es":"kommt",wir:"kommen",ihr:"kommt","sie/Sie":"kommen"},
  arbeiten:{ich:"arbeite",du:"arbeitest","er/sie/es":"arbeitet",wir:"arbeiten",ihr:"arbeitet","sie/Sie":"arbeiten"},
  sprechen:{ich:"spreche",du:"sprichst","er/sie/es":"spricht",wir:"sprechen",ihr:"sprecht","sie/Sie":"sprechen"},
  sein:    {ich:"bin",du:"bist","er/sie/es":"ist",wir:"sind",ihr:"seid","sie/Sie":"sind"},
  heißen:  {ich:"heiße",du:"heißt","er/sie/es":"heißt",wir:"heißen",ihr:"heißt","sie/Sie":"heißen"},
  lernen:  {ich:"lerne",du:"lernst","er/sie/es":"lernt",wir:"lernen",ihr:"lernt","sie/Sie":"lernen"},
  wohnen:  {ich:"wohne",du:"wohnst","er/sie/es":"wohnt",wir:"wohnen",ihr:"wohnt","sie/Sie":"wohnen"},
  machen:  {ich:"mache",du:"machst","er/sie/es":"macht",wir:"machen",ihr:"macht","sie/Sie":"machen"},
  suchen:  {ich:"suche",du:"suchst","er/sie/es":"sucht",wir:"suchen",ihr:"sucht","sie/Sie":"suchen"},
  leben:   {ich:"lebe",du:"lebst","er/sie/es":"lebt",wir:"leben",ihr:"lebt","sie/Sie":"leben"},
  lieben:  {ich:"liebe",du:"liebst","er/sie/es":"liebt",wir:"lieben",ihr:"liebt","sie/Sie":"lieben"},
  schicken:{ich:"schicke",du:"schickst","er/sie/es":"schickt",wir:"schicken",ihr:"schickt","sie/Sie":"schicken"},
};

// ─── KONJUGATION (L4B — Verben mit Vokalwechsel) ──────────────────────────────
const KONJ_L4B={
  sprechen:{type:"e→i", col:C.orange,bg:C.orangeBg, ich:"spreche", du:"sprichst","er/sie/es":"spricht", wir:"sprechen",ihr:"sprecht","sie/Sie":"sprechen", pt:"sprach", pf:"hat gesprochen"},
  essen:   {type:"e→i", col:C.orange,bg:C.orangeBg, ich:"esse",    du:"isst",    "er/sie/es":"isst",    wir:"essen",   ihr:"esst",  "sie/Sie":"essen",   note:"e выпадает перед -st/-t", pt:"aß", pf:"hat gegessen"},
  nehmen:  {type:"e→i", col:C.orange,bg:C.orangeBg, ich:"nehme",   du:"nimmst",  "er/sie/es":"nimmt",   wir:"nehmen",  ihr:"nehmt", "sie/Sie":"nehmen",  note:"⚠️ особая форма!", pt:"nahm", pf:"hat genommen"},
  treffen: {type:"e→i", col:C.orange,bg:C.orangeBg, ich:"treffe",  du:"triffst", "er/sie/es":"trifft",  wir:"treffen", ihr:"trefft","sie/Sie":"treffen"},
  messen:  {type:"e→i", col:C.orange,bg:C.orangeBg, ich:"messe",   du:"misst",   "er/sie/es":"misst",   wir:"messen",  ihr:"messt", "sie/Sie":"messen", pt:"maß", pf:"hat gemessen"},
  lesen:      {type:"e→ie",col:C.blue,  bg:C.blueBg,   ich:"lese",      du:"liest",      "er/sie/es":"liest",     wir:"lesen",     ihr:"lest",     "sie/Sie":"lesen", pt:"las", pf:"hat gelesen"},
  sehen:      {type:"e→ie",col:C.blue,  bg:C.blueBg,   ich:"sehe",      du:"siehst",     "er/sie/es":"sieht",     wir:"sehen",     ihr:"seht",     "sie/Sie":"sehen", pt:"sah", pf:"hat gesehen"},
  empfehlen:  {type:"e→ie",col:C.blue,  bg:C.blueBg,   ich:"empfehle",  du:"empfiehlst", "er/sie/es":"empfiehlt", wir:"empfehlen", ihr:"empfehlt", "sie/Sie":"empfehlen", pt:"empfahl", pf:"hat empfohlen"},
  schlafen:{type:"a→ä", col:C.purple,bg:C.purpleBg, ich:"schlafe", du:"schläfst","er/sie/es":"schläft", wir:"schlafen",ihr:"schlaft","sie/Sie":"schlafen", pt:"schlief", pf:"hat geschlafen"},
  fahren:  {type:"a→ä", col:C.purple,bg:C.purpleBg, ich:"fahre",   du:"fährst",  "er/sie/es":"fährt",   wir:"fahren",  ihr:"fahrt", "sie/Sie":"fahren", pt:"fuhr", pf:"ist gefahren"},
};

// ─── KONJUGATION (L4C — Präteritum haben/sein) ────────────────────────────────
const KONJ_L4C={
  "haben →": {col:C.blue,  bg:C.blueBg,   ich:"hatte",  du:"hattest", "er/sie/es":"hatte",  wir:"hatten", ihr:"hattet","sie/Sie":"hatten"},
  "sein →":  {col:C.purple,bg:C.purpleBg, ich:"war",    du:"warst",   "er/sie/es":"war",    wir:"waren",  ihr:"wart",  "sie/Sie":"waren"},
};

// ─── KONJUGATION (L5B — Trennbare Verben) ────────────────────────────────────
const KONJ_L5B={
  anrufen:   {pref:"an",  col:C.blue,   bg:C.blueBg,
    ich:"rufe … an",    du:"rufst … an",     "er/sie/es":"ruft … an",
    wir:"rufen … an",   ihr:"ruft … an",     "sie/Sie":"rufen … an", pt:"rief … an", pf:"hat angerufen"},
  anfangen:  {pref:"an",  col:C.blue,   bg:C.blueBg,   note:"a→ä",
    ich:"fange … an",   du:"fängst … an",    "er/sie/es":"fängt … an",
    wir:"fangen … an",  ihr:"fangt … an",    "sie/Sie":"fangen … an", pt:"fing … an", pf:"hat angefangen"},
  anbieten:  {pref:"an",  col:C.blue,   bg:C.blueBg,
    ich:"biete … an",   du:"bietest … an",   "er/sie/es":"bietet … an",
    wir:"bieten … an",  ihr:"bietet … an",   "sie/Sie":"bieten … an", pt:"bot … an", pf:"hat angeboten"},
  aufstehen: {pref:"auf", col:C.orange, bg:C.orangeBg,
    ich:"stehe … auf",  du:"stehst … auf",   "er/sie/es":"steht … auf",
    wir:"stehen … auf", ihr:"steht … auf",   "sie/Sie":"stehen … auf", pt:"stand … auf", pf:"ist aufgestanden"},
  aufräumen: {pref:"auf", col:C.orange, bg:C.orangeBg,
    ich:"räume … auf",  du:"räumst … auf",   "er/sie/es":"räumt … auf",
    wir:"räumen … auf", ihr:"räumt … auf",   "sie/Sie":"räumen … auf", pt:"räumte … auf", pf:"hat aufgeräumt"},
  aufhören:  {pref:"auf", col:C.orange, bg:C.orangeBg,
    ich:"höre … auf",   du:"hörst … auf",    "er/sie/es":"hört … auf",
    wir:"hören … auf",  ihr:"hört … auf",    "sie/Sie":"hören … auf", pt:"hörte … auf", pf:"hat aufgehört"},
  einkaufen: {pref:"ein", col:C.green,  bg:C.greenBg,
    ich:"kaufe … ein",  du:"kaufst … ein",   "er/sie/es":"kauft … ein",
    wir:"kaufen … ein", ihr:"kauft … ein",   "sie/Sie":"kaufen … ein", pt:"kaufte … ein", pf:"hat eingekauft"},
  mitnehmen: {pref:"mit", col:C.purple, bg:C.purpleBg, note:"e→i",
    ich:"nehme … mit",  du:"nimmst … mit",   "er/sie/es":"nimmt … mit",
    wir:"nehmen … mit", ihr:"nehmt … mit",   "sie/Sie":"nehmen … mit", pt:"nahm … mit", pf:"hat mitgenommen"},
  mitkommen: {pref:"mit", col:C.purple, bg:C.purpleBg,
    ich:"komme … mit",  du:"kommst … mit",   "er/sie/es":"kommt … mit",
    wir:"kommen … mit", ihr:"kommt … mit",   "sie/Sie":"kommen … mit", pt:"kam … mit", pf:"ist mitgekommen"},
  ausgehen:  {pref:"aus", col:C.red,    bg:C.redBg,
    ich:"gehe … aus",   du:"gehst … aus",    "er/sie/es":"geht … aus",
    wir:"gehen … aus",  ihr:"geht … aus",    "sie/Sie":"gehen … aus", pt:"ging … aus", pf:"ist ausgegangen"},
  fernsehen: {pref:"fern",col:C.teal,   bg:C.tealBg,   note:"e→ie",
    ich:"sehe … fern",  du:"siehst … fern",  "er/sie/es":"sieht … fern",
    wir:"sehen … fern", ihr:"seht … fern",   "sie/Sie":"sehen … fern", pt:"sah … fern", pf:"hat ferngesehen"},
  abspülen:  {pref:"ab",  col:C.yellow, bg:C.yellowBg,
    ich:"spüle … ab",   du:"spülst … ab",    "er/sie/es":"spült … ab",
    wir:"spülen … ab",  ihr:"spült … ab",    "sie/Sie":"spülen … ab", pt:"spülte … ab", pf:"hat abgespült"},
  anmachen:  {pref:"an",  col:C.blue,   bg:C.blueBg,
    ich:"mache … an",   du:"machst … an",    "er/sie/es":"macht … an",
    wir:"machen … an",  ihr:"macht … an",    "sie/Sie":"machen … an", pt:"machte … an", pf:"hat angemacht"},
  ausmachen: {pref:"aus", col:C.red,    bg:C.redBg,
    ich:"mache … aus",  du:"machst … aus",   "er/sie/es":"macht … aus",
    wir:"machen … aus", ihr:"macht … aus",   "sie/Sie":"machen … aus", pt:"machte … aus", pf:"hat ausgemacht"},
  einladen:  {pref:"ein", col:C.green,  bg:C.greenBg,  note:"a→ä",
    ich:"lade … ein",   du:"lädst … ein",    "er/sie/es":"lädt … ein",
    wir:"laden … ein",  ihr:"ladet … ein",   "sie/Sie":"laden … ein", pt:"lud … ein", pf:"hat eingeladen"},
  ausschlafen:{pref:"aus",col:C.red,    bg:C.redBg,    note:"a→ä",
    ich:"schlafe … aus",du:"schläfst … aus", "er/sie/es":"schläft … aus",
    wir:"schlafen … aus",ihr:"schlaft … aus","sie/Sie":"schlafen … aus", pt:"schlief … aus", pf:"hat ausgeschlafen"},
  mitbringen:{pref:"mit", col:C.purple, bg:C.purpleBg,
    ich:"bringe … mit", du:"bringst … mit",  "er/sie/es":"bringt … mit",
    wir:"bringen … mit",ihr:"bringt … mit",  "sie/Sie":"bringen … mit", pt:"brachte … mit", pf:"hat mitgebracht"},
  einschlafen:{pref:"ein",col:C.green,  bg:C.greenBg,  note:"a→ä",
    ich:"schlafe … ein",du:"schläfst … ein", "er/sie/es":"schläft … ein",
    wir:"schlafen … ein",ihr:"schlaft … ein","sie/Sie":"schlafen … ein", pt:"schlief … ein", pf:"ist eingeschlafen"},
  wegfahren: {pref:"weg", col:C.orange, bg:C.orangeBg, note:"a→ä",
    ich:"fahre … weg",  du:"fährst … weg",   "er/sie/es":"fährt … weg",
    wir:"fahren … weg", ihr:"fahrt … weg",   "sie/Sie":"fahren … weg", pt:"fuhr … weg", pf:"ist weggefahren"},
  ausfallen: {pref:"aus", col:C.red,    bg:C.redBg,    note:"a→ä",
    ich:"falle … aus",  du:"fällst … aus",   "er/sie/es":"fällt … aus",
    wir:"fallen … aus", ihr:"fallt … aus",   "sie/Sie":"fallen … aus", pt:"fiel … aus", pf:"ist ausgefallen"},
  stattfinden:{pref:"statt",col:C.teal, bg:C.tealBg,
    ich:"finde … statt",du:"findest … statt","er/sie/es":"findet … statt",
    wir:"finden … statt",ihr:"findet … statt","sie/Sie":"finden … statt", pt:"fand … statt", pf:"hat stattgefunden"},
};

// ─── Цвета префиксов ──────────────────────────────────────────────────────────
const PREF_COLORS={
  an:   {col:C.blue,   bg:C.blueBg},
  auf:  {col:C.orange, bg:C.orangeBg},
  aus:  {col:C.red,    bg:C.redBg},
  ein:  {col:C.green,  bg:C.greenBg},
  mit:  {col:C.purple, bg:C.purpleBg},
  weg:  {col:C.orange, bg:C.orangeBg},
  ab:   {col:C.yellow, bg:C.yellowBg},
  fern: {col:C.teal,   bg:C.tealBg},
  statt:{col:C.teal,   bg:C.tealBg},
};
const PREF_LIST=["statt","fern","aus","auf","ein","mit","weg","an","ab"];
const getVerbPref=de=>PREF_LIST.find(p=>de.startsWith(p))||"";

// ─── Единый словарь спряжений ─────────────────────────────────────────────────
const KONJ_ALL={
  ...KONJ_L4B,
  ...KONJ_L5B,
  haben:      {col:C.blue,  bg:C.blueBg,   ich:"habe",      du:"hast",       "er/sie/es":"hat",       wir:"haben",    ihr:"habt",     "sie/Sie":"haben",     imp:{du:"Hab!",    ihr:"Habt!",   Sie:"Haben Sie!"}, pt:"hatte", pf:"hat gehabt"},
  sein:       {col:C.purple,bg:C.purpleBg, ich:"bin",       du:"bist",       "er/sie/es":"ist",       wir:"sind",     ihr:"seid",     "sie/Sie":"sind",      imp:{du:"Sei!",    ihr:"Seid!",   Sie:"Seien Sie!"},  note:"⚠️ особый", pt:"war", pf:"ist gewesen"},
  wollen:     {col:C.red,   bg:C.redBg,    ich:"will",      du:"willst",     "er/sie/es":"will",      wir:"wollen",   ihr:"wollt",    "sie/Sie":"wollen",    note:"ich = er",noImp:true, pt:"wollte", pf:"hat gewollt"},
  können:     {col:C.green, bg:C.greenBg,  ich:"kann",      du:"kannst",     "er/sie/es":"kann",      wir:"können",   ihr:"könnt",    "sie/Sie":"können",    note:"ich = er",noImp:true, pt:"konnte", pf:"hat gekonnt"},
  müssen:     {col:C.orange,bg:C.orangeBg, ich:"muss",      du:"musst",      "er/sie/es":"muss",      wir:"müssen",   ihr:"müsst",    "sie/Sie":"müssen",    note:"ich = er",noImp:true, pt:"musste", pf:"hat gemusst"},
  sollen:     {col:C.teal,  bg:C.tealBg,  ich:"soll",      du:"sollst",     "er/sie/es":"soll",      wir:"sollen",   ihr:"sollt",    "sie/Sie":"sollen",    note:"ich = er",noImp:true, pt:"sollte", pf:"hat gesollt"},
  mögen:      {col:C.purple,bg:C.purpleBg, ich:"mag",       du:"magst",      "er/sie/es":"mag",       wir:"mögen",    ihr:"mögt",     "sie/Sie":"mögen",     note:"ich = er",noImp:true, pt:"mochte", pf:"hat gemocht"},
  laufen:     {col:C.purple,bg:C.purpleBg, ich:"laufe",     du:"läufst",     "er/sie/es":"läuft",     wir:"laufen",   ihr:"lauft",    "sie/Sie":"laufen",    imp:{du:"Lauf!",   ihr:"Lauft!", Sie:"Laufen Sie!"},  note:"a→ä", pt:"lief", pf:"ist gelaufen"},
  kommen:     {col:C.teal,  bg:C.tealBg,   ich:"komme",     du:"kommst",     "er/sie/es":"kommt",     wir:"kommen",   ihr:"kommt",    "sie/Sie":"kommen", pt:"kam", pf:"ist gekommen"},
  gehen:      {col:C.teal,  bg:C.tealBg,   ich:"gehe",      du:"gehst",      "er/sie/es":"geht",      wir:"gehen",    ihr:"geht",     "sie/Sie":"gehen", pt:"ging", pf:"ist gegangen"},
  machen:     {col:C.teal,  bg:C.tealBg,   ich:"mache",     du:"machst",     "er/sie/es":"macht",     wir:"machen",   ihr:"macht",    "sie/Sie":"machen", pt:"machte", pf:"hat gemacht"},
  lernen:     {col:C.teal,  bg:C.tealBg,   ich:"lerne",     du:"lernst",     "er/sie/es":"lernt",     wir:"lernen",   ihr:"lernt",    "sie/Sie":"lernen", pt:"lernte", pf:"hat gelernt"},
  wohnen:     {col:C.teal,  bg:C.tealBg,   ich:"wohne",     du:"wohnst",     "er/sie/es":"wohnt",     wir:"wohnen",   ihr:"wohnt",    "sie/Sie":"wohnen", pt:"wohnte", pf:"hat gewohnt"},
  arbeiten:   {col:C.teal,  bg:C.tealBg,   ich:"arbeite",   du:"arbeitest",  "er/sie/es":"arbeitet",  wir:"arbeiten", ihr:"arbeitet", "sie/Sie":"arbeiten",  note:"-e- вставка", pt:"arbeitete", pf:"hat gearbeitet"},
  heißen:     {col:C.teal,  bg:C.tealBg,   ich:"heiße",     du:"heißt",      "er/sie/es":"heißt",     wir:"heißen",   ihr:"heißt",    "sie/Sie":"heißen", pt:"hieß", pf:"hat geheißen"},
  kochen:     {col:C.teal,  bg:C.tealBg,   ich:"koche",     du:"kochst",     "er/sie/es":"kocht",     wir:"kochen",   ihr:"kocht",    "sie/Sie":"kochen", pt:"kochte", pf:"hat gekocht"},
  spielen:    {col:C.teal,  bg:C.tealBg,   ich:"spiele",    du:"spielst",    "er/sie/es":"spielt",    wir:"spielen",  ihr:"spielt",   "sie/Sie":"spielen", pt:"spielte", pf:"hat gespielt"},
  trinken:    {col:C.teal,  bg:C.tealBg,   ich:"trinke",    du:"trinkst",    "er/sie/es":"trinkt",    wir:"trinken",  ihr:"trinkt",   "sie/Sie":"trinken", pt:"trank", pf:"hat getrunken"},
  schreiben:  {col:C.teal,  bg:C.tealBg,   ich:"schreibe",  du:"schreibst",  "er/sie/es":"schreibt",  wir:"schreiben",ihr:"schreibt", "sie/Sie":"schreiben", pt:"schrieb", pf:"hat geschrieben"},
  reparieren: {col:C.teal,  bg:C.tealBg,   ich:"repariere", du:"reparierst", "er/sie/es":"repariert", wir:"reparieren",ihr:"repariert","sie/Sie":"reparieren", pt:"reparierte", pf:"hat repariert"},
  starten:    {col:C.teal,  bg:C.tealBg,   ich:"starte",    du:"startest",   "er/sie/es":"startet",   wir:"starten",  ihr:"startet",  "sie/Sie":"starten",   note:"-e- вставка", pt:"startete", pf:"hat gestartet"},
  klingeln:   {col:C.teal,  bg:C.tealBg,   ich:"klingle",   du:"klingelst",  "er/sie/es":"klingelt",  wir:"klingeln", ihr:"klingelt", "sie/Sie":"klingeln", pt:"klingelte", pf:"hat geklingelt"},
  frühstücken:{col:C.teal,  bg:C.tealBg,   ich:"frühstücke",du:"frühstückst","er/sie/es":"frühstückt",wir:"frühstücken",ihr:"frühstückt","sie/Sie":"frühstücken", pt:"frühstückte", pf:"hat gefrühstückt"},
  chillen:    {col:C.teal,  bg:C.tealBg,   ich:"chille",    du:"chillst",    "er/sie/es":"chillt",    wir:"chillen",  ihr:"chillt",   "sie/Sie":"chillen", pt:"chillte", pf:"hat gechillt"},
  treffen:    {col:C.orange,bg:C.orangeBg, ich:"treffe",    du:"triffst",    "er/sie/es":"trifft",    wir:"treffen",  ihr:"trefft",   "sie/Sie":"treffen",   note:"e→i", pt:"traf", pf:"hat getroffen"},
  tanzen:     {col:C.teal,  bg:C.tealBg,   ich:"tanze",     du:"tanzt",      "er/sie/es":"tanzt",     wir:"tanzen",   ihr:"tanzt",    "sie/Sie":"tanzen", pt:"tanzte", pf:"hat getanzt"},
  schwimmen:  {col:C.teal,  bg:C.tealBg,   ich:"schwimme",  du:"schwimmst",  "er/sie/es":"schwimmt",  wir:"schwimmen",ihr:"schwimmt", "sie/Sie":"schwimmen", pt:"schwamm", pf:"ist geschwommen"},
  joggen:     {col:C.teal,  bg:C.tealBg,   ich:"jogge",     du:"joggst",     "er/sie/es":"joggt",     wir:"joggen",   ihr:"joggt",    "sie/Sie":"joggen", pt:"joggte", pf:"ist gejoggt"},
  grillen:    {col:C.teal,  bg:C.tealBg,   ich:"grille",    du:"grillst",    "er/sie/es":"grillt",    wir:"grillen",  ihr:"grillt",   "sie/Sie":"grillen", pt:"grillte", pf:"hat gegrillt"},
  surfen:     {col:C.teal,  bg:C.tealBg,   ich:"surfe",     du:"surfst",     "er/sie/es":"surft",     wir:"surfen",   ihr:"surft",    "sie/Sie":"surfen", pt:"surfte", pf:"hat gesurft"},
  vergessen:  {col:C.orange,bg:C.orangeBg, ich:"vergesse",  du:"vergisst",   "er/sie/es":"vergisst",  wir:"vergessen",ihr:"vergesst", "sie/Sie":"vergessen", note:"e→i",
    imp:{du:"Vergiss!",  ihr:"Vergesst!",  Sie:"Vergessen Sie nicht!"}, pt:"vergaß", pf:"hat vergessen"},
  möchten:    {col:C.purple,bg:C.purpleBg, ich:"möchte",    du:"möchtest",   "er/sie/es":"möchte",    wir:"möchten",  ihr:"möchtet",  "sie/Sie":"möchten",   note:"ich = er (нет -t!)",noImp:true},
  kaufen:     {col:C.teal,  bg:C.tealBg,   ich:"kaufe",     du:"kaufst",     "er/sie/es":"kauft",     wir:"kaufen",   ihr:"kauft",    "sie/Sie":"kaufen", pt:"kaufte", pf:"hat gekauft"},
  bekommen:   {col:C.teal,  bg:C.tealBg,   ich:"bekomme",   du:"bekommst",   "er/sie/es":"bekommt",   wir:"bekommen", ihr:"bekommt",  "sie/Sie":"bekommen", pt:"bekam", pf:"hat bekommen"},
  kosten:     {col:C.teal,  bg:C.tealBg,   ich:"koste",     du:"kostest",    "er/sie/es":"kostet",    wir:"kosten",   ihr:"kostet",   "sie/Sie":"kosten",    note:"-e- вставка", pt:"kostete", pf:"hat gekostet"},
  backen:     {col:C.orange,bg:C.orangeBg, ich:"backe",     du:"bäckst",     "er/sie/es":"bäckt",     wir:"backen",   ihr:"backt",    "sie/Sie":"backen",    imp:{du:"Back!",   ihr:"Backt!", Sie:"Backen Sie!"},  note:"a→ä", pt:"buk", pf:"hat gebacken"},
  schneiden:  {col:C.teal,  bg:C.tealBg,   ich:"schneide",  du:"schneidest", "er/sie/es":"schneidet", wir:"schneiden",ihr:"schneidet","sie/Sie":"schneiden", note:"-e- вставка", pt:"schnitt", pf:"hat geschnitten"},
  schälen:    {col:C.teal,  bg:C.tealBg,   ich:"schäle",    du:"schälst",    "er/sie/es":"schält",    wir:"schälen",  ihr:"schält",   "sie/Sie":"schälen", pt:"schälte", pf:"hat geschält"},
  verkaufen:  {col:C.teal,  bg:C.tealBg,   ich:"verkaufe",  du:"verkaufst",  "er/sie/es":"verkauft",  wir:"verkaufen",ihr:"verkauft", "sie/Sie":"verkaufen", pt:"verkaufte", pf:"hat verkauft"},
  holen:      {col:C.teal,  bg:C.tealBg,   ich:"hole",      du:"holst",      "er/sie/es":"holt",      wir:"holen",    ihr:"holt",     "sie/Sie":"holen", pt:"holte", pf:"hat geholt"},
  fragen:     {col:C.teal,  bg:C.tealBg,   ich:"frage",     du:"fragst",     "er/sie/es":"fragt",     wir:"fragen",   ihr:"fragt",    "sie/Sie":"fragen", pt:"fragte", pf:"hat gefragt"},
  // L8E Notruf
  erklären:   {col:C.teal,  bg:C.tealBg,   ich:"erkläre",   du:"erklärst",   "er/sie/es":"erklärt",   wir:"erklären", ihr:"erklärt",  "sie/Sie":"erklären", pt:"erklärte", pf:"hat erklärt"},
  schicken:   {col:C.teal,  bg:C.tealBg,   ich:"schicke",   du:"schickst",   "er/sie/es":"schickt",   wir:"schicken", ihr:"schickt",  "sie/Sie":"schicken", pt:"schickte", pf:"hat geschickt"},
  benutzen:   {col:C.teal,  bg:C.tealBg,   ich:"benutze",   du:"benutzt",    "er/sie/es":"benutzt",   wir:"benutzen", ihr:"benutzt",  "sie/Sie":"benutzen", pt:"benutzte", pf:"hat benutzt"},
  fliegen:    {col:C.teal,  bg:C.tealBg,   ich:"fliege",    du:"fliegst",    "er/sie/es":"fliegt",    wir:"fliegen",  ihr:"fliegt",   "sie/Sie":"fliegen", pt:"flog", pf:"ist geflogen"},
  auflegen:   {pref:"auf",  col:C.orange, bg:C.orangeBg,
    ich:"lege … auf",   du:"legst … auf",   "er/sie/es":"legt … auf",
    wir:"legen … auf",  ihr:"legt … auf",   "sie/Sie":"legen … auf", pt:"legte … auf", pf:"hat aufgelegt"},
  anhalten:   {pref:"an",   col:C.blue,   bg:C.blueBg,   note:"a→ä",
    ich:"halte … an",   du:"hältst … an",   "er/sie/es":"hält … an",
    wir:"halten … an",  ihr:"haltet … an",  "sie/Sie":"halten … an", pt:"hielt … an", pf:"hat angehalten"},
  vorbeifahren:{pref:"vorbei",col:C.purple,bg:C.purpleBg, note:"a→ä",
    ich:"fahre … vorbei",  du:"fährst … vorbei",  "er/sie/es":"fährt … vorbei",
    wir:"fahren … vorbei", ihr:"fahrt … vorbei",  "sie/Sie":"fahren … vorbei", pt:"fuhr … vorbei", pf:"ist vorbeigefahren"},
  // L8 Gesundheit — reflexive Verben
  "sich erholen":   {col:C.teal,  bg:C.tealBg,  note:"Reflexiv",
    ich:"erhole mich",    du:"erholst dich",    "er/sie/es":"erholt sich",
    wir:"erholen uns",    ihr:"erholt euch",    "sie/Sie":"erholen sich",
    imp:{du:"Erhol dich!",    ihr:"Erholt euch!",    Sie:"Erholen Sie sich!"}, pt:"erholte sich", pf:"hat sich erholt"},
  "sich entspannen":{col:C.teal,  bg:C.tealBg,  note:"Reflexiv",
    ich:"entspanne mich", du:"entspannst dich", "er/sie/es":"entspannt sich",
    wir:"entspannen uns", ihr:"entspannt euch", "sie/Sie":"entspannen sich",
    imp:{du:"Entspann dich!", ihr:"Entspannt euch!", Sie:"Entspannen Sie sich!"}, pt:"entspannte sich", pf:"hat sich entspannt"},
  "sich bewegen":   {col:C.teal,  bg:C.tealBg,  note:"Reflexiv",
    ich:"bewege mich",    du:"bewegst dich",    "er/sie/es":"bewegt sich",
    wir:"bewegen uns",    ihr:"bewegt euch",    "sie/Sie":"bewegen sich",
    imp:{du:"Beweg dich!",    ihr:"Bewegt euch!",    Sie:"Bewegen Sie sich!"}, pt:"bewegte sich", pf:"hat sich bewegt"},
  "sich ausruhen":  {pref:"aus",  col:C.red,    bg:C.redBg,   note:"Reflexiv",
    ich:"ruhe mich … aus",  du:"ruhst dich … aus",  "er/sie/es":"ruht sich … aus",
    wir:"ruhen uns … aus",  ihr:"ruht euch … aus",  "sie/Sie":"ruhen sich … aus",
    imp:{du:"Ruh dich aus!",  ihr:"Ruht euch aus!",  Sie:"Ruhen Sie sich aus!"}, pt:"ruhte sich … aus", pf:"hat sich ausgeruht"},
  "sich hinlegen":  {pref:"hin",  col:C.red,    bg:C.redBg,   note:"Reflexiv",
    ich:"lege mich … hin",  du:"legst dich … hin",  "er/sie/es":"legt sich … hin",
    wir:"legen uns … hin",  ihr:"legt euch … hin",  "sie/Sie":"legen sich … hin",
    imp:{du:"Leg dich hin!",  ihr:"Legt euch hin!",  Sie:"Legen Sie sich hin!"}, pt:"legte sich … hin", pf:"hat sich hingelegt"},
  "sich leisten":   {col:C.teal,  bg:C.tealBg,  note:"Reflexiv (Dativ)",
    ich:"leiste mir",     du:"leistest dir",    "er/sie/es":"leistet sich",
    wir:"leisten uns",    ihr:"leistet euch",   "sie/Sie":"leisten sich",
    imp:{du:"Leiste dir!",    ihr:"Leistet euch!",   Sie:"Leisten Sie sich!"}, pt:"leistete sich", pf:"hat sich geleistet"},
  // L8 Gesundheit
  untersuchen: {col:C.teal, bg:C.tealBg,
    ich:"untersuche",  du:"untersuchst", "er/sie/es":"untersucht",
    wir:"untersuchen", ihr:"untersucht", "sie/Sie":"untersuchen", pt:"untersuchte", pf:"hat untersucht"},
  // L8E Notruf
  zusammenstoßen:{pref:"zusammen", col:C.red, bg:C.redBg, note:"sto\u00DF→st\u00F6\u00DFt",
    ich:"sto\u00DFe … zusammen",  du:"st\u00F6\u00DFt … zusammen", "er/sie/es":"st\u00F6\u00DFt … zusammen",
    wir:"sto\u00DFen … zusammen", ihr:"sto\u00DFt … zusammen",     "sie/Sie":"sto\u00DFen … zusammen", pt:"stieß … zusammen", pf:"ist zusammengestoßen"},
  // L9 Verkehr
  umsteigen:  {pref:"um",     col:C.orange, bg:C.orangeBg,
    ich:"steige … um",   du:"steigst … um",   "er/sie/es":"steigt … um",
    wir:"steigen … um",  ihr:"steigt … um",   "sie/Sie":"steigen … um", pt:"stieg … um", pf:"ist umgestiegen"},
  weiterfahren:{pref:"weiter",col:C.blue,   bg:C.blueBg,  note:"a→ä",
    ich:"fahre … weiter",  du:"fährst … weiter",  "er/sie/es":"fährt … weiter",
    wir:"fahren … weiter", ihr:"fahrt … weiter",  "sie/Sie":"fahren … weiter", pt:"fuhr … weiter", pf:"ist weitergefahren"},
  parken:     {col:C.teal,   bg:C.tealBg,
    ich:"parke",     du:"parkst",     "er/sie/es":"parkt",     wir:"parken",   ihr:"parkt",    "sie/Sie":"parken", pt:"parkte", pf:"hat geparkt"},
  hupen:      {col:C.teal,   bg:C.tealBg,
    ich:"hupe",      du:"hupst",      "er/sie/es":"hupt",      wir:"hupen",    ihr:"hupt",     "sie/Sie":"hupen", pt:"hupte", pf:"hat gehupt"},
  blinken:    {col:C.teal,   bg:C.tealBg,
    ich:"blinke",    du:"blinkst",    "er/sie/es":"blinkt",    wir:"blinken",  ihr:"blinkt",   "sie/Sie":"blinken", pt:"blinkte", pf:"hat geblinkt"},
  // L9B In der Stadt
  abbiegen:   {pref:"ab",    col:C.purple, bg:C.purpleBg,
    ich:"biege … ab",    du:"biegst … ab",    "er/sie/es":"biegt … ab",
    wir:"biegen … ab",   ihr:"biegt … ab",    "sie/Sie":"biegen … ab", pt:"bog … ab", pf:"ist abgebogen"},
  "sich verfahren":{col:C.teal, bg:C.tealBg, note:"a→ä | Reflexiv",
    ich:"verfahre mich",   du:"verfährst dich",   "er/sie/es":"verfährt sich",
    wir:"verfahren uns",   ihr:"verfahrt euch",   "sie/Sie":"verfahren sich",
    imp:{du:"Verfahre dich nicht!", ihr:"Verfahrt euch nicht!", Sie:"Verfahren Sie sich nicht!"}, pt:"verfuhr sich", pf:"hat sich verfahren"},
  "sich verlaufen":{col:C.teal, bg:C.tealBg, note:"a→ä | Reflexiv",
    ich:"verlaufe mich",   du:"verläufst dich",   "er/sie/es":"verläuft sich",
    wir:"verlaufen uns",   ihr:"verlauft euch",   "sie/Sie":"verlaufen sich",
    imp:{du:"Verlaube dich nicht!", ihr:"Verlauft euch nicht!", Sie:"Verlaufen Sie sich nicht!"}, pt:"verlief sich", pf:"hat sich verlaufen"},
  // L9C Führerschein
  dürfen:     {col:C.purple, bg:C.purpleBg, note:"Modalverb",
    ich:"darf",     du:"darfst",    "er/sie/es":"darf",     wir:"dürfen",   ihr:"dürft",    "sie/Sie":"dürfen", pt:"durfte", pf:"hat gedurft"},
  erlauben:   {col:C.teal,   bg:C.tealBg,
    ich:"erlaube",   du:"erlaubst",   "er/sie/es":"erlaubt",   wir:"erlauben", ihr:"erlaubt",  "sie/Sie":"erlauben", pt:"erlaubte", pf:"hat erlaubt"},
  verbieten:  {col:C.red,    bg:C.redBg,
    ich:"verbiete",  du:"verbietest", "er/sie/es":"verbietet", wir:"verbieten",ihr:"verbietet","sie/Sie":"verbieten", pt:"verbot", pf:"hat verboten"},
  erkennen:   {col:C.teal,   bg:C.tealBg,
    ich:"erkenne",   du:"erkennst",   "er/sie/es":"erkennt",   wir:"erkennen", ihr:"erkennt",  "sie/Sie":"erkennen", pt:"erkannte", pf:"hat erkannt"},
  // L9C
  anerkennen: {pref:"an",   col:C.teal,   bg:C.tealBg,
    ich:"erkenne … an", du:"erkennst … an", "er/sie/es":"erkennt … an",
    wir:"erkennen … an",ihr:"erkennt … an", "sie/Sie":"erkennen … an", pt:"erkannte … an", pf:"hat anerkannt"},
  // L10 Perfekt verbs
  träumen:    {col:C.teal,  bg:C.tealBg,
    ich:"träume",    du:"träumst",    "er/sie/es":"träumt",    wir:"träumen",  ihr:"träumt",   "sie/Sie":"träumen", pt:"träumte", pf:"hat geträumt"},
  spazieren:  {col:C.teal,  bg:C.tealBg,
    ich:"spaziere",  du:"spazierst",  "er/sie/es":"spaziert",  wir:"spazieren",ihr:"spaziert", "sie/Sie":"spazieren", pt:"spazierte", pf:"ist spaziert"},
  lachen:     {col:C.teal,  bg:C.tealBg,
    ich:"lache",     du:"lachst",     "er/sie/es":"lacht",     wir:"lachen",   ihr:"lacht",    "sie/Sie":"lachen", pt:"lachte", pf:"hat gelacht"},
  suchen:     {col:C.teal,  bg:C.tealBg,
    ich:"suche",     du:"suchst",     "er/sie/es":"sucht",     wir:"suchen",   ihr:"sucht",    "sie/Sie":"suchen", pt:"suchte", pf:"hat gesucht"},
  reden:      {col:C.teal,  bg:C.tealBg,  note:"-e Einfügung",
    ich:"rede",      du:"redest",     "er/sie/es":"redet",     wir:"reden",    ihr:"redet",    "sie/Sie":"reden", pt:"redete", pf:"hat geredet"},
  abholen:    {pref:"ab",   col:C.orange, bg:C.orangeBg,
    ich:"hole … ab", du:"holst … ab", "er/sie/es":"holt … ab",
    wir:"holen … ab",ihr:"holt … ab", "sie/Sie":"holen … ab", pt:"holte … ab", pf:"hat abgeholt"},
  // Базовые глаголы
  geben:      {col:C.blue,   bg:C.blueBg,   note:"e→i",
    ich:"gebe",      du:"gibst",      "er/sie/es":"gibt",      wir:"geben",    ihr:"gebt",     "sie/Sie":"geben", pt:"gab", pf:"hat gegeben"},
  helfen:     {col:C.blue,   bg:C.blueBg,   note:"e→i",
    ich:"helfe",     du:"hilfst",     "er/sie/es":"hilft",     wir:"helfen",   ihr:"helft",    "sie/Sie":"helfen", pt:"half", pf:"hat geholfen"},
  stehen:     {col:C.teal,   bg:C.tealBg,
    ich:"stehe",     du:"stehst",     "er/sie/es":"steht",     wir:"stehen",   ihr:"steht",    "sie/Sie":"stehen", pt:"stand", pf:"hat gestanden"},
  bringen:    {col:C.teal,   bg:C.tealBg,
    ich:"bringe",    du:"bringst",    "er/sie/es":"bringt",    wir:"bringen",  ihr:"bringt",   "sie/Sie":"bringen", pt:"brachte", pf:"hat gebracht"},
  denken:     {col:C.teal,   bg:C.tealBg,
    ich:"denke",     du:"denkst",     "er/sie/es":"denkt",     wir:"denken",   ihr:"denkt",    "sie/Sie":"denken", pt:"dachte", pf:"hat gedacht"},
  wissen:     {col:C.purple, bg:C.purpleBg, note:"weiß (ich/er)",
    ich:"weiß",      du:"weißt",      "er/sie/es":"weiß",      wir:"wissen",   ihr:"wisst",    "sie/Sie":"wissen", pt:"wusste", pf:"hat gewusst"},
  tun:        {col:C.purple, bg:C.purpleBg,
    ich:"tue",       du:"tust",       "er/sie/es":"tut",       wir:"tun",      ihr:"tut",      "sie/Sie":"tun", pt:"tat", pf:"hat getan"},
  singen:     {col:C.teal,   bg:C.tealBg,
    ich:"singe",     du:"singst",     "er/sie/es":"singt",     wir:"singen",   ihr:"singt",    "sie/Sie":"singen", pt:"sang", pf:"hat gesungen"},
  rufen:      {col:C.teal,   bg:C.tealBg,
    ich:"rufe",      du:"rufst",      "er/sie/es":"ruft",      wir:"rufen",    ihr:"ruft",     "sie/Sie":"rufen", pt:"rief", pf:"hat gerufen"},
  weinen:     {col:C.teal,   bg:C.tealBg,
    ich:"weine",     du:"weinst",     "er/sie/es":"weint",     wir:"weinen",   ihr:"weint",    "sie/Sie":"weinen", pt:"weinte", pf:"hat geweint"},
  üben:       {col:C.teal,   bg:C.tealBg,
    ich:"übe",       du:"übst",       "er/sie/es":"übt",       wir:"üben",     ihr:"übt",      "sie/Sie":"üben", pt:"übte", pf:"hat geübt"},
  stellen:    {col:C.teal,   bg:C.tealBg,
    ich:"stelle",    du:"stellst",    "er/sie/es":"stellt",    wir:"stellen",  ihr:"stellt",   "sie/Sie":"stellen", pt:"stellte", pf:"hat gestellt"},
  legen:      {col:C.teal,   bg:C.tealBg,
    ich:"lege",      du:"legst",      "er/sie/es":"legt",      wir:"legen",    ihr:"legt",     "sie/Sie":"legen", pt:"legte", pf:"hat gelegt"},
  zahlen:     {col:C.teal,   bg:C.tealBg,
    ich:"zahle",     du:"zahlst",     "er/sie/es":"zahlt",     wir:"zahlen",   ihr:"zahlt",    "sie/Sie":"zahlen", pt:"zahlte", pf:"hat gezahlt"},
  rauchen:    {col:C.teal,   bg:C.tealBg,
    ich:"rauche",    du:"rauchst",    "er/sie/es":"raucht",    wir:"rauchen",  ihr:"raucht",   "sie/Sie":"rauchen",
    pt:"rauchte", pf:"hat geraucht"},
  // L8/L9 allgemein
  nachdenken:  {pref:"nach", col:C.teal,  bg:C.tealBg,
    ich:"denke … nach",   du:"denkst … nach",   "er/sie/es":"denkt … nach",
    wir:"denken … nach",  ihr:"denkt … nach",   "sie/Sie":"denken … nach", pt:"dachte … nach", pf:"hat nachgedacht"},
  ausgeben:    {pref:"aus",  col:C.red,   bg:C.redBg,   note:"e→i",
    ich:"gebe … aus",     du:"gibst … aus",     "er/sie/es":"gibt … aus",
    wir:"geben … aus",    ihr:"gebt … aus",     "sie/Sie":"geben … aus", pt:"gab … aus", pf:"hat ausgegeben"},
  // Глаголы без таблицы — добавлено по запросу (30.06.2026)
  bezahlen:    {col:C.teal,  bg:C.tealBg,
    ich:"bezahle",   du:"bezahlst",   "er/sie/es":"bezahlt",   wir:"bezahlen", ihr:"bezahlt",  "sie/Sie":"bezahlen", pt:"bezahlte", pf:"hat bezahlt"},
  gehören:     {col:C.teal,  bg:C.tealBg,
    ich:"gehöre",    du:"gehörst",    "er/sie/es":"gehört",    wir:"gehören",  ihr:"gehört",   "sie/Sie":"gehören", pt:"gehörte", pf:"hat gehört"},
  heiraten:    {col:C.teal,  bg:C.tealBg,  note:"-e- вставка",
    ich:"heirate",   du:"heiratest",  "er/sie/es":"heiratet",  wir:"heiraten", ihr:"heiratet", "sie/Sie":"heiraten", pt:"heiratete", pf:"hat geheiratet"},
  kennen:      {col:C.teal,  bg:C.tealBg,  note:"Mischverb",
    ich:"kenne",     du:"kennst",     "er/sie/es":"kennt",     wir:"kennen",   ihr:"kennt",    "sie/Sie":"kennen", pt:"kannte", pf:"hat gekannt"},
  besuchen:    {col:C.teal,  bg:C.tealBg,
    ich:"besuche",   du:"besuchst",   "er/sie/es":"besucht",   wir:"besuchen", ihr:"besucht",  "sie/Sie":"besuchen", pt:"besuchte", pf:"hat besucht"},
  besichtigen: {col:C.teal,  bg:C.tealBg,
    ich:"besichtige",du:"besichtigst","er/sie/es":"besichtigt",wir:"besichtigen",ihr:"besichtigt","sie/Sie":"besichtigen", pt:"besichtigte", pf:"hat besichtigt"},
  wiederholen: {col:C.teal,  bg:C.tealBg,  note:"untrennbar (повторять)",
    ich:"wiederhole",du:"wiederholst","er/sie/es":"wiederholt",wir:"wiederholen",ihr:"wiederholt","sie/Sie":"wiederholen", pt:"wiederholte", pf:"hat wiederholt"},
  studieren:   {col:C.teal,  bg:C.tealBg,  note:"-ieren: kein ge-",
    ich:"studiere",  du:"studierst",  "er/sie/es":"studiert",  wir:"studieren",ihr:"studiert", "sie/Sie":"studieren", pt:"studierte", pf:"hat studiert"},
  faulenzen:   {col:C.teal,  bg:C.tealBg,
    ich:"faulenze",  du:"faulenzt",   "er/sie/es":"faulenzt",  wir:"faulenzen",ihr:"faulenzt", "sie/Sie":"faulenzen", pt:"faulenzte", pf:"hat gefaulenzt"},
  bleiben:     {col:C.purple,bg:C.purpleBg,
    ich:"bleibe",    du:"bleibst",    "er/sie/es":"bleibt",    wir:"bleiben",  ihr:"bleibt",   "sie/Sie":"bleiben", pt:"blieb", pf:"ist geblieben"},
  lächeln:     {col:C.teal,  bg:C.tealBg,
    ich:"lächle",    du:"lächelst",   "er/sie/es":"lächelt",   wir:"lächeln",  ihr:"lächelt",  "sie/Sie":"lächeln", pt:"lächelte", pf:"hat gelächelt"},
  treiben:     {col:C.purple,bg:C.purpleBg,
    ich:"treibe",    du:"treibst",    "er/sie/es":"treibt",    wir:"treiben",  ihr:"treibt",   "sie/Sie":"treiben", pt:"trieb", pf:"hat getrieben"},
  reiten:      {col:C.orange,bg:C.orangeBg,note:"-e- вставка",
    ich:"reite",     du:"reitest",    "er/sie/es":"reitet",    wir:"reiten",   ihr:"reitet",   "sie/Sie":"reiten", pt:"ritt", pf:"ist geritten"},
  beginnen:    {col:C.purple,bg:C.purpleBg,
    ich:"beginne",   du:"beginnst",   "er/sie/es":"beginnt",   wir:"beginnen", ihr:"beginnt",  "sie/Sie":"beginnen", pt:"begann", pf:"hat begonnen"},
  enden:       {col:C.teal,  bg:C.tealBg,  note:"-e- вставка",
    ich:"ende",      du:"endest",     "er/sie/es":"endet",     wir:"enden",    ihr:"endet",    "sie/Sie":"enden", pt:"endete", pf:"hat geendet"},
  vermuten:    {col:C.teal,  bg:C.tealBg,  note:"-e- вставка",
    ich:"vermute",   du:"vermutest",  "er/sie/es":"vermutet",  wir:"vermuten", ihr:"vermutet", "sie/Sie":"vermuten", pt:"vermutete", pf:"hat vermutet"},
  verdienen:   {col:C.teal,  bg:C.tealBg,
    ich:"verdiene",  du:"verdienst",  "er/sie/es":"verdient",  wir:"verdienen",ihr:"verdient", "sie/Sie":"verdienen", pt:"verdiente", pf:"hat verdient"},
  schmecken:   {col:C.teal,  bg:C.tealBg,
    ich:"schmecke",  du:"schmeckst",  "er/sie/es":"schmeckt",  wir:"schmecken",ihr:"schmeckt", "sie/Sie":"schmecken", pt:"schmeckte", pf:"hat geschmeckt"},
  überweisen:  {col:C.orange,bg:C.orangeBg,
    ich:"überweise", du:"überweist",  "er/sie/es":"überweist", wir:"überweisen",ihr:"überweist","sie/Sie":"überweisen", pt:"überwies", pf:"hat überwiesen"},
  fehlen:      {col:C.teal,  bg:C.tealBg,
    ich:"fehle",     du:"fehlst",     "er/sie/es":"fehlt",     wir:"fehlen",   ihr:"fehlt",    "sie/Sie":"fehlen", pt:"fehlte", pf:"hat gefehlt"},
  wechseln:    {col:C.teal,  bg:C.tealBg,
    ich:"wechsle",   du:"wechselst",  "er/sie/es":"wechselt",  wir:"wechseln", ihr:"wechselt", "sie/Sie":"wechseln", pt:"wechselte", pf:"hat gewechselt"},
  beraten:     {col:C.orange,bg:C.orangeBg,note:"a→ä",
    ich:"berate",    du:"berätst",    "er/sie/es":"berät",     wir:"beraten",  ihr:"beratet",  "sie/Sie":"beraten",
    imp:{du:"Berate!",  ihr:"Beratet!",  Sie:"Beraten Sie!"}, pt:"beriet", pf:"hat beraten"},
  kontrollieren:{col:C.teal, bg:C.tealBg,  note:"-ieren: kein ge-",
    ich:"kontrolliere",du:"kontrollierst","er/sie/es":"kontrolliert",wir:"kontrollieren",ihr:"kontrolliert","sie/Sie":"kontrollieren", pt:"kontrollierte", pf:"hat kontrolliert"},
  unterschreiben:{col:C.orange,bg:C.orangeBg,
    ich:"unterschreibe",du:"unterschreibst","er/sie/es":"unterschreibt",wir:"unterschreiben",ihr:"unterschreibt","sie/Sie":"unterschreiben", pt:"unterschrieb", pf:"hat unterschrieben"},
  reisen:      {col:C.orange,bg:C.orangeBg,
    ich:"reise",     du:"reist",      "er/sie/es":"reist",     wir:"reisen",   ihr:"reist",    "sie/Sie":"reisen", pt:"reiste", pf:"ist gereist"},
  operieren:   {col:C.teal,  bg:C.tealBg,  note:"-ieren: kein ge-",
    ich:"operiere",  du:"operierst",  "er/sie/es":"operiert",  wir:"operieren",ihr:"operiert", "sie/Sie":"operieren", pt:"operierte", pf:"hat operiert"},
  begleiten:   {col:C.teal,  bg:C.tealBg,  note:"-e- вставка",
    ich:"begleite",  du:"begleitest", "er/sie/es":"begleitet", wir:"begleiten",ihr:"begleitet","sie/Sie":"begleiten", pt:"begleitete", pf:"hat begleitet"},
  hängen:      {col:C.teal,  bg:C.tealBg,  note:"transitiv (вешать); 'висеть' = hing/gehangen",
    ich:"hänge",     du:"hängst",     "er/sie/es":"hängt",     wir:"hängen",   ihr:"hängt",    "sie/Sie":"hängen", pt:"hängte", pf:"hat gehängt"},
};

// Ударения: комбинирующая акута \u0301 ставится после ударной гласной
const STRESS_MARKS={
// Числа
"null":"nu\u0301ll","eins":"ei\u0301ns","zwei":"zwe\u0301i","drei":"dre\u0301i","vier":"vi\u0301er",
"fünf":"f\u00FC\u0301nf","sechs":"se\u0301chs","sieben":"si\u0301eben","acht":"a\u0301cht","neun":"ne\u0301un",
// Техника
"USB-Stick":"USB-Sti\u0301ck","CD-Player":"CD-Pla\u0301yer","E-Mail":"E-Ma\u0301il",
"zehn":"ze\u0301hn","elf":"e\u0301lf","zwölf":"zw\u00F6\u0301lf","dreizehn":"dre\u0301izehn",
"vierzehn":"vi\u0301erzehn","fünfzehn":"f\u00FC\u0301nfzehn","sechzehn":"se\u0301chzehn",
"siebzehn":"si\u0301ebzehn","achtzehn":"a\u0301chtzehn","neunzehn":"ne\u0301unzehn","zwanzig":"zwa\u0301nzig",
// Berufe
"Lehrer":"Le\u0301hrer","Arzt":"A\u0301rzt","Ingenieur":"Ingenie\u0301ur","Verkäufer":"Verk\u00E4\u0301ufer",
"Elektriker":"E\u0301lektriker","Friseur":"Frise\u0301ur","Programmierer":"Programmi\u0301erer",
"Buchhalter":"Bu\u0301chhalter","Grafiker":"Gra\u0301fiker","Altenpfleger":"A\u0301ltenpfleger",
"Student":"Stude\u0301nt","Kinderarzt":"Ki\u0301nderarzt","Hausmann":"Ha\u0301usmann",
// Kursraum — Gegenstände
"Tür":"T\u00FC\u0301r","Fenster":"Fe\u0301nster","Uhr":"U\u0301hr","Stuhl":"Stu\u0301hl",
"Plakat":"Plaka\u0301t","Tafel":"Ta\u0301fel","Lampe":"La\u0301mpe","Flasche":"Fla\u0301sche",
"Papier":"Papi\u0301er","Wörterbuch":"W\u00F6\u0301rterbuch","Kugelschreiber":"Ku\u0301gelschreiber",
"Kuli":"Ku\u0301li","Tisch":"Ti\u0301sch","Schlüssel":"Schl\u00FC\u0301ssel","Handy":"Ha\u0301ndy",
"Heft":"He\u0301ft","Brille":"Bri\u0301lle","Buch":"Bu\u0301ch","Stift":"Sti\u0301ft",
"Tasche":"Ta\u0301sche","Rucksack":"Ru\u0301cksack","Tablet":"Ta\u0301blet","Laptop":"La\u0301ptop",
"Bleistift":"Ble\u0301istift","Radiergummi":"Radi\u0301ergummi","Schere":"Sche\u0301re",
"Lineal":"Linea\u0301l","Markierstift":"Marki\u0301erstift","Notizbuch":"Noti\u0301zbuch",
"Zettel":"Ze\u0301ttel","Hausaufgabe":"Ha\u0301usaufgabe","Kopfhörer":"Ko\u0301pfhörer",
// Kursraum — Verben & Nomen
"beginnen":"begi\u0301nnen","enden":"e\u0301nden","Pause":"Pa\u0301use","wiederholen":"wiederho\u0301len",
"Übung":"\u00DC\u0301bung",
// Möbel / Bad / Küche
"Spüle":"Sp\u00FC\u0301le","Bett":"Be\u0301tt","Herd":"He\u0301rd","Sofa":"So\u0301fa",
"Schrank":"Schra\u0301nk","Fernseher":"Fe\u0301rnseher","Sessel":"Se\u0301ssel","Bild":"Bi\u0301ld",
"Regal":"Rega\u0301l","Teppich":"Te\u0301ppich","Vorhang":"Vo\u0301rhang",
"Schlafzimmer":"Schla\u0301fzimmer","Zimmer":"Zi\u0301mmer","Schreibtisch":"Schre\u0301ibtisch",
"Bad":"Ba\u0301d","Badewanne":"Ba\u0301dewanne","Dusche":"Du\u0301sche","Toilette":"Toile\u0301tte",
"Waschbecken":"Wa\u0301schbecken","Spiegel":"Spi\u0301egel","Küche":"K\u00FC\u0301che",
"Kühlschrank":"K\u00FC\u0301hlschrank","Wohnzimmer":"Wo\u0301hnzimmer","Klimaanlage":"Kli\u0301maanlage",
"Zimmerpflanze":"Zi\u0301mmerpflanze","Poster":"Po\u0301ster","Nachttisch":"Na\u0301chttisch",
"Kissen":"Ki\u0301ssen","Bettdecke":"Be\u0301ttdecke","Teddybär":"Te\u0301ddybär",
"Kinderzimmer":"Ki\u0301nderzimmer","Küchenschrank":"K\u00FC\u0301chenschrank","Blumentopf":"Blu\u0301mentopf",
"Waschmaschine":"Wa\u0301schmaschine","Spülmaschine":"Sp\u00FC\u0301lmaschine","Blume":"Blu\u0301me",
"Kommode":"Kommo\u0301de","Trockner":"Tro\u0301ckner","Heizungsanlage":"He\u0301izungsanlage",
"Tasse":"Ta\u0301sse",
// Wohnung
"Terrasse":"Terra\u0301sse","Balkon":"Balko\u0301n","Garage":"Gara\u0301ge",
"Arbeitszimmer":"A\u0301rbeitszimmer","Flur":"Flu\u0301r","Haus":"Ha\u0301us",
"Wohnung":"Wo\u0301hnung","Dorf":"Do\u0301rf","Stadt":"Sta\u0301dt","Apartment":"Apa\u0301rtment",
"Lage":"La\u0301ge","Stock":"Sto\u0301ck","Einfamilienhaus":"Ei\u0301nfamilienhaus",
"Zentralheizung":"Ze\u0301ntralheizung","Quadratmeter":"Quadra\u0301tmeter",
"Mehrfamilienhaus":"Me\u0301hrfamilienhaus","Hochhaus":"Ho\u0301chhaus","Reihenhaus":"Re\u0301ihenhaus",
"Erdgeschoss":"E\u0301rdgeschoss","erste Stock":"e\u0301rste Sto\u0301ck",
"zweite Stock":"zwe\u0301ite Sto\u0301ck","dritte Stock":"dri\u0301tte Sto\u0301ck",
"Dachgeschoss":"Da\u0301chgeschoss","Garten":"Ga\u0301rten","bezahlen":"beza\u0301hlen",
"Keller":"Ke\u0301ller","Farbe":"Fa\u0301rbe","Geschäft":"Gesch\u00E4\u0301ft",
// Adjektive
"alt":"a\u0301lt","neu":"ne\u0301u","modern":"mode\u0301rn","groß":"gro\u0301ß","klein":"kle\u0301in",
"schön":"sch\u00F6\u0301n","hässlich":"h\u00E4\u0301sslich","bequem":"beque\u0301m",
"unbequem":"unbeque\u0301m","ordentlich":"o\u0301rdentlich","unordentlich":"uno\u0301rdentlich",
"teuer":"te\u0301uer","billig":"bi\u0301llig","günstig":"g\u00FC\u0301nstig","breit":"bre\u0301it",
"schmal":"schma\u0301l","hell":"he\u0301ll","dunkel":"du\u0301nkel","links":"li\u0301nks",
"rechts":"re\u0301chts","oben":"o\u0301ben","unten":"u\u0301nten","gemütlich":"gem\u00FC\u0301tlich",
"ungemütlich":"ungem\u00FC\u0301tlich","hoch":"ho\u0301ch","niedrig":"ni\u0301edrig","gut":"gu\u0301t",
"schlecht":"schle\u0301cht","ruhig":"ru\u0301hig","laut":"la\u0301ut","verheiratet":"verhe\u0301iratet",
"genug":"genu\u0301g","furchtbar":"fu\u0301rchtbar","kalt":"ka\u0301lt","warm":"wa\u0301rm",
"sonnig":"so\u0301nnig","zentral":"zentra\u0301l","interessant":"interessa\u0301nt",
"langweilig":"la\u0301ngweilig","fröhlich":"fr\u00F6\u0301hlich","traurig":"tra\u0301urig","bunt":"bu\u0301nt",
"froh":"fro\u0301h","fit":"fi\u0301t","möglich":"m\u00F6\u0301glich","offiziell":"offizie\u0301ll",
"müde":"m\u00FC\u0301de","faul":"fa\u0301ul","bereit":"bere\u0301it","fertig":"fe\u0301rtig",
"langsam":"la\u0301ngsam","spät":"sp\u00E4\u0301t","später":"sp\u00E4\u0301ter","kostenlos":"ko\u0301stenlos",
// Familie
"Großeltern":"Gro\u0301ßeltern","Großvater":"Gro\u0301ßvater","Großmutter":"Gro\u0301ßmutter",
"Eltern":"E\u0301ltern","Vater":"Va\u0301ter","Mutter":"Mu\u0301tter","Geschwister":"Geschwi\u0301ster",
"Schwester":"Schwe\u0301ster","Bruder":"Bru\u0301der","Sohn":"So\u0301hn","Tochter":"To\u0301chter",
"Enkelkinder":"E\u0301nkelkinder","Enkel":"E\u0301nkel","Enkelin":"E\u0301nkelin","Onkel":"O\u0301nkel",
"Tante":"Ta\u0301nte","Cousin":"Cousi\u0301n","Cousine":"Cousi\u0301ne","Neffe":"Ne\u0301ffe",
"Nichte":"Ni\u0301chte","Oma":"O\u0301ma","Opa":"O\u0301pa","Ehe":"E\u0301he","Ehepaar":"E\u0301hepaar",
"Ehefrau":"E\u0301hefrau","Ehemann":"E\u0301hemann","heiraten":"he\u0301iraten","Liebe":"Li\u0301ebe",
"Heimatland":"He\u0301imatland","gehören":"geh\u00F6\u0301ren",
// Tageszeiten & Wochentage
"Montag":"Mo\u0301ntag","Dienstag":"Di\u0301enstag","Mittwoch":"Mi\u0301ttwoch",
"Donnerstag":"Do\u0301nnerstag","Freitag":"Fre\u0301itag","Samstag":"Sa\u0301mstag",
"Sonntag":"So\u0301nntag","Woche":"Wo\u0301che","Mittag":"Mi\u0301ttag","Vormittag":"Vo\u0301rmittag",
"Nachmittag":"Na\u0301chmittag","Abend":"A\u0301bend","Spätabend":"Sp\u00E4\u0301tabend","Nacht":"Na\u0301cht",
"Morgen":"Mo\u0301rgen","morgens":"mo\u0301rgens","mittags":"mi\u0301ttags","abends":"a\u0301bends",
"nachts":"na\u0301chts","am Montag":"am Mo\u0301ntag",
// Trennbare Verben
"anrufen":"a\u0301nrufen","anfangen":"a\u0301nfangen","anbieten":"a\u0301nbieten","fernsehen":"fe\u0301rnsehen",
"aufstehen":"a\u0301ufstehen","aufräumen":"a\u0301ufräumen","einkaufen":"ei\u0301nkaufen",
"mitnehmen":"mi\u0301tnehmen","ausgehen":"a\u0301usgehen","mitkommen":"mi\u0301tkommen",
"aufhören":"a\u0301ufhören","abspülen":"a\u0301bspülen","einladen":"ei\u0301nladen",
"ausschlafen":"a\u0301usschlafen","mitbringen":"mi\u0301tbringen","einschlafen":"ei\u0301nschlafen",
"wegfahren":"we\u0301gfahren","ausfallen":"a\u0301usfallen","stattfinden":"sta\u0301ttfinden",
"empfehlen":"empfe\u0301hlen",
"Kellner":"Ke\u0301llner","Koch":"Ko\u0301ch","Krankenpfleger":"Kra\u0301nkenpfleger","Karriere":"Karrie\u0301re",
"Beruf":"Beru\u0301f","Stelle":"Ste\u0301lle","verdienen":"verdie\u0301nen","schmecken":"schme\u0301cken",
"Geldautomat":"Geldautoma\u0301t","Kontoauszug":"Ko\u0301ntoauszug","IBAN":"I\u0301BAN","Konto":"Ko\u0301nto",
"Kopf":"Ko\u0301pf","Auge":"Au\u0301ge","Nase":"Na\u0301se","Mund":"Mu\u0301nd","Schulter":"Schu\u0301lter",
"Rücken":"Rü\u0301cken","Bauch":"Ba\u0301uch","Bein":"Be\u0301in","Knie":"Kni\u0301e","Fuß":"Fu\u0301\u00DF",
"Erkältung":"Erkä\u0301ltung","Husten":"Hu\u0301sten","Schnupfen":"Schnu\u0301pfen","Fieber":"Fie\u0301ber",
"Tablette":"Table\u0301tte","Medikament":"Medikame\u0301nt","Rezept":"Reze\u0301pt","Praxis":"Pra\u0301xis",
"Untersuchung":"Untersu\u0301chung","Hausarzt":"Ha\u0301usarzt","fehlen":"fe\u0301hlen",
"Bankkaufmann":"Ba\u0301nkkaufmann","Briefträger":"Brie\u0301fträger",
"Taxifahrer":"Ta\u0301xifahrer","Sekretär":"Sekretä\u0301r","Altenpflegerin":"A\u0301ltenpflegerin",
"Reinigungskraft":"Re\u0301inigungskraft","Hausmeister":"Ha\u0301usmeister","Arbeitszeit":"A\u0301rbeitszeit",
"Mittagspause":"Mi\u0301ttagspause","Nachtschicht":"Na\u0301chtschicht","Schichtdienst":"Schi\u0301chtdienst",
"Kontonummer":"Ko\u0301ntonummer","EC-Karte":"E\u0301C-Karte","überweisen":"überwe\u0301isen",
"Überweisungsformular":"Überwe\u0301isungsformular","satt":"sa\u0301tt",
"Haare":"Ha\u0301are","Ohr":"O\u0301hr","Zunge":"Zu\u0301nge","Hals":"Ha\u0301ls",
"Arm":"A\u0301rm","Hand":"Ha\u0301nd","Finger":"Fi\u0301nger","Handgelenk":"Ha\u0301ndgelenk",
"Brust":"Bru\u0301st","Zehe":"Ze\u0301he","Stirn":"Sti\u0301rn","Kinn":"Ki\u0301nn",
"Wange":"Wa\u0301nge","Lippe":"Li\u0301ppe","Ellenbogen":"E\u0301llenbogen",
"Gelenk":"Gele\u0301nk","Knöchel":"Knö\u0301chel","Ferse":"Fe\u0301rse","Po":"Po\u0301",
"Grippe":"Gri\u0301ppe","Schmerzen":"Schme\u0301rzen",
"rezeptfrei":"reze\u0301ptfrei","rezeptpflichtig":"reze\u0301ptpflichtig",
"Zufall":"Zu\u0301fall","erkältet":"erkä\u0301ltet","weh|tun":"we\u0301htun",
"knapp":"kna\u0301pp","anderthalb":"a\u0301nderthalb","eineinhalb":"ei\u0301neinhalb",
"Baustelle":"Ba\u0301ustelle","Werkstatt":"We\u0301rkstatt","Krankenhaus":"Kra\u0301nkenhaus",
"Gebühr":"Gebü\u0301hr","Bankverbindung":"Ba\u0301nkverbindung","Überweisung":"Überwe\u0301isung",
"Kasse":"Ka\u0301sse","Formular":"Formula\u0301r","Team":"Tea\u0301m",
"Kollege":"Kolle\u0301ge","Termin":"Termi\u0301n","Chef":"Che\u0301f",
"Haltestelle":"Ha\u0301ltestelle","Fahrzeug":"Fa\u0301hrzeug",
"wechseln":"we\u0301chseln","beraten":"bera\u0301ten","kontrollieren":"kontrollie\u0301ren",
"unterschreiben":"unterschre\u0301iben","anstrengend":"a\u0301nstrengend",
"allein":"alle\u0301in","reisen":"re\u0301isen","draußen":"drau\u0301ßen","drinnen":"dri\u0301nnen",
"Mumps":"Mu\u0301mps","Windpocken":"Wi\u0301ndpocken","Masern":"Ma\u0301sern",
"Scharlach":"Scha\u0301rlach","Halstablette":"Ha\u0301lstablette",
"Krankschreibung":"Kra\u0301nkschreibung","Krankenkasse":"Kra\u0301nkenkasse",
"Gesundheitskarte":"Gesundhe\u0301itskarte","Zeitschrift":"Ze\u0301itschrift",
"operieren":"operie\u0301ren","begleiten":"begle\u0301iten","messen":"me\u0301ssen",
"anmachen":"a\u0301nmachen","ausmachen":"a\u0301usmachen",
"möglicherweise":"mö\u0301glicherweise","wahrscheinlich":"wahrsche\u0301inlich",
"überrascht":"überra\u0301scht","sollte":"so\u0301llte",
// L8E Notruf
"Notruf":"No\u0301truf","Notfall":"No\u0301tfall","Unfall":"U\u0301nfall",
"Notarzt":"No\u0301tarzt","Verletzung":"Verle\u0301tzung","Not":"No\u0301t",
"verletzt":"verle\u0301tzt","dringend":"dri\u0301ngend","erklären":"erkl\u00E4\u0301ren","schicken":"schi\u0301cken",
"auflegen":"a\u0301uflegen","anhalten":"a\u0301nhalten","vorbeifahren":"vo\u0301rbeifahren",
"erste Hilfe leisten":"e\u0301rste Hi\u0301lfe le\u0301isten",
// L9 Verkehrsmittel
"Auto":"A\u0301uto","Fahrrad":"Fa\u0301hrrad","Motorrad":"Mo\u0301torrad",
"Straßenbahn":"Stra\u0301ßenbahn","U-Bahn":"U\u0301-Bahn","S-Bahn":"S-Ba\u0301hn",
"Hubschrauber":"Hu\u0301bschrauber","Boot":"Bo\u0301ot",
"Wohnmobil":"Wo\u0301hnmobil","Fähre":"Fä\u0301hre","Motorroller":"Mo\u0301torroller",
"Straßenbahnhaltestelle":"Stra\u0301ßenbahnhaltestelle",
"Campingplatz":"Ca\u0301mpingplatz","Busbahnhof":"Bu\u0301sbahnhof",
"Fußgänger":"Fu\u0301ßg\u00E4nger","Autobahn":"A\u0301utobahn","Fahrbahn":"Fa\u0301hrbahn",
"Bürgersteig":"B\u00FC\u0301rgersteig","Fahrradweg":"Fa\u0301hrradweg",
"Verkehrsmittel":"Verke\u0301hrsmittel","benutzen":"benu\u0301tzen","fliegen":"flie\u0301gen",
"Werkzeug":"We\u0301rkzeug","Spielzeug":"Spie\u0301lzeug",
// L8 Gesundheit erweitert
"erschöpft":"ersch\u00F6\u0301pft","übermüdet":"\u00FCberm\u00FC\u0301det",
"überarbeitet":"\u00FCbera\u0301rbeitet","überfordert":"\u00FCberfo\u0301rdert",
"gestresst":"gestre\u0301sst","stressig":"stre\u0301ssig",
"sich erholen":"sich erho\u0301len","sich entspannen":"sich entspan\u0301nen",
"sich ausruhen":"sich a\u0301usruhen","sich hinlegen":"sich hi\u0301nlegen",
"sich bewegen":"sich bewe\u0301gen","Ernährung":"Ern\u00E4\u0301hrung",
"Arzneimittel":"A\u0301rzneimittel","regelmäßig":"re\u0301gelm\u00E4\u00DFig","dick":"di\u0301ck","häufig":"h\u00E4\u0301ufig","Gewicht":"Gewi\u0301cht","S\u00FC\u00DFigkeiten":"S\u00FC\u0301\u00DFigkeiten","selbst":"se\u0301lbst",
// L8/L9 allgemein
"nachdenken":"na\u0301chdenken","ausgeben":"a\u0301usgeben",
"sich leisten":"sich le\u0301isten","umsonst":"umso\u0301nst",
// Körper
"Ellbogen":"E\u0301llbogen","Unterschenkel":"U\u0301nterschenkel","Oberschenkel":"O\u0301berschenkel",
"Muskel":"Mu\u0301skel","Zeh":"Ze\u0301h","Augenbraue":"A\u0301ugenbraue","Wimper":"Wi\u0301mper",
"Wirbels\u00E4ule":"Wi\u0301rbels\u00E4ule","Herz":"He\u0301rz","Leber":"Le\u0301ber","Magen":"Ma\u0301gen",
// Gesundheit
"Kontrolle":"Kontro\u0301lle","untersuchen":"untersu\u0301chen","sich krankmelden":"sich kra\u0301nkmelden",
// Notruf
"Feuer":"Fe\u0301uer","Feuerwehr":"Fe\u0301uerwehr","Krankenwagen":"Kra\u0301nkenwagen",
"zusammensto\u00DFen":"zusa\u0301mmensto\u00DFen",
// Verkehrsmittel
"umsteigen":"u\u0301msteigen","Lkw":"L\u0301kw","parken":"pa\u0301rken","hupen":"hu\u0301pen",
"weiterfahren":"we\u0301iterfahren","blinken":"bli\u0301nken","Vorfahrt":"Vo\u0301rfahrt",
// In der Stadt
"Kreuzung":"Kre\u0301uzung","Schule":"Schu\u0301le","Bahnhof":"Ba\u0301hnhof","vergessen":"verge\u0301ssen","m\u00FCssen":"m\u00FC\u0301ssen","Ampel":"A\u0301mpel","Ecke":"E\u0301cke","Kreisverkehr":"Kre\u0301isverkehr",
"Ausfahrt":"A\u0301usfahrt","Stunde":"Stu\u0301nde","Minute":"Minu\u0301te",
"geradeaus":"geradeaus\u0301","gegen\u00FCber":"ge\u0301gen\u00FCber","abbiegen":"a\u0301bbiegen",
"sich verfahren":"sich verfa\u0301hren","sich verlaufen":"sich verla\u0301ufen","einige":"ei\u0301nige",
// Führerschein
"F\u00FChrerschein":"F\u00FC\u0301hrerschein","d\u00FCrfen":"d\u00FC\u0301rfen","erlauben":"erla\u0301uben",
"verbieten":"verbie\u0301ten","erkennen":"erke\u0301nnen","Anerkennung":"Anerke\u0301nnung",
"ausl\u00E4ndisch":"ausl\u00E4\u0301ndisch","Ausl\u00E4nder":"Ausl\u00E4\u0301nder","Beh\u00F6rde":"Beh\u00F6\u0301rde",
// L9 Wichtige Wörter
"Weg":"We\u0301g","Flughafen":"Flu\u0301ghafen","Stadtmitte":"Sta\u0301dtmitte",
"Monatskarte":"Mo\u0301natskarte","Platz":"Pla\u0301tz","Baum":"Ba\u0301um",
"Hund":"Hu\u0301nd","Schwimmbad":"Schw\u0301immbad","Rathaus":"Ra\u0301thaus",
"Bibliothek":"Biblioth\u00E9k","Hauptbahnhof":"Ha\u0301uptbahnhof",
"weit":"we\u0301it","Linie":"Li\u0301nie","Zoo":"Zo\u0301o","Spielplatz":"Spie\u0301lplatz",
// L9C
"F\u00FChrerscheinpr\u00FCfung":"F\u00FC\u0301hrerscheinpr\u00FCfung",
"anerkennen":"anerke\u0301nnen","Vorfahrtsschild":"Vo\u0301rfahrtsschild","Schild":"Schi\u0301ld",
// Fahrplan
"Fahrplan":"Fa\u0301hrplan","Abfahrt":"A\u0301bfahrt",
// L10 MeinLeben
"Gro\u00DFstadt":"Gro\u0301\u00DFstadt","Kleinstadt":"Kle\u0301instadt",
"ledig":"le\u0301dig","geschieden":"geschi\u00E9den",
"gestern":"ge\u0301stern",
// Perfekt verbs
"tr\u00E4umen":"tr\u00E4\u0301umen","suchen":"su\u0301chen",
"reden":"re\u0301den","abholen":"a\u0301bholen",
"haben":"ha\u0301ben","sein":"se\u0301in","geben":"ge\u0301ben","helfen":"he\u0301lfen",
"hei\u00DFen":"hei\u0301\u00DFen","stehen":"ste\u0301hen","bringen":"bri\u0301ngen",
"denken":"de\u0301nken","wissen":"wi\u0301ssen","tun":"tu\u0301n",
"singen":"si\u0301ngen","rufen":"ru\u0301fen","weinen":"we\u0301inen",
"\u00FCben":"\u00FC\u0301ben","stellen":"ste\u0301llen","legen":"le\u0301gen",
"h\u00E4ngen":"h\u00E4\u0301ngen","zahlen":"za\u0301hlen","rauchen":"ra\u0301uchen",
// Lebensmittel
"Apfel":"A\u0301pfel","Banane":"Bana\u0301ne","Brot":"Bro\u0301t","Butter":"Bu\u0301tter",
"Hähnchen":"H\u00E4\u0301hnchen","Joghurt":"Jo\u0301ghurt","Kaffee":"Ka\u0301ffee",
"Kartoffel":"Karto\u0301ffel","Käse":"K\u00E4\u0301se","Milch":"Mi\u0301lch","Nudel":"Nu\u0301del",
"Reis":"Re\u0301is","Salat":"Sala\u0301t","Schokolade":"Schokola\u0301de","Tee":"Te\u0301e",
"Fisch":"Fi\u0301sch","Tomate":"Toma\u0301te","Wasser":"Wa\u0301sser","Wein":"We\u0301in",
"Wurst":"Wu\u0301rst","Zwiebel":"Zwi\u0301ebel","Gewürz":"Gew\u00FC\u0301rz",
// Alltag — Nomen & Adjektive
"Pass":"Pa\u0301ss",
"Apotheke":"Apothe\u0301ke","Pizza":"Pi\u0301zza","Oper":"O\u0301per",
"Portemonnaie":"Portemonn\u0061\u0301ie","Jacke":"Ja\u0301cke","Bus":"Bu\u0301s",
"Supermarkt":"Su\u0301permarkt","Radtour":"Ra\u0301dtour","Lebensmittel":"Le\u0301bensmittel",
"Sehenswürdigkeit":"Se\u0301henswürdigkeit","Straßenfest":"Stra\u0301ßenfest",
"Bummel":"Bu\u0301mmel","Stadtbummel":"Sta\u0301dtbummel","Hafen":"Ha\u0301fen","Schiff":"Schi\u0301ff",
"Innenstadt":"I\u0301nnenstadt","Laune":"La\u0301une","Wochenende":"Wo\u0301chenende",
"Freizeit":"Fre\u0301izeit","Film":"Fi\u0301lm","Tag":"Ta\u0301g","Spaziergang":"Spazi\u0301ergang",
"Schifffahrt":"Schi\u0301fffahrt","Kindheit":"Ki\u0301ndheit","Zeit":"Ze\u0301it",
"Zeitung":"Ze\u0301itung","Dom":"Do\u0301m","Ausflug":"A\u0301usflug","Uhrzeit":"U\u0301hrzeit",
"Tanzkurs":"Ta\u0301nzkurs","Konzert":"Konze\u0301rt","Radiowecker":"Ra\u0301diowecker",
"Gleis":"Gle\u0301is","Flugzeug":"Flu\u0301gzeug","Tanzparty":"Ta\u0301nzparty","Krimi":"Kri\u0301mi",
"Fußballspiel":"Fu\u0301ßballspiel","Frühstück":"Fr\u00FC\u0301hstück","Abendessen":"A\u0301bendessen",
"Sprachkurs":"Spra\u0301chkurs","Fluss":"Flu\u0301ss","Brücke":"Br\u00FC\u0301cke","Wald":"Wa\u0301ld",
"Hobby":"Ho\u0301bby","Fahrkarte":"Fa\u0301hrkarte","Zahnarzttermin":"Za\u0301hnarzttermin",
"Tipp":"Ti\u0301pp","Respekt":"Respe\u0301kt","Sonderangebot":"So\u0301nderangebot",
"Wäsche":"W\u00E4\u0301sche","Kuchen":"Ku\u0301chen","Nachspeise":"Na\u0301chspeise",
"Meinung":"Me\u0301inung",
// Alltag — Verben
"kennen":"ke\u0301nnen","trinken":"tri\u0301nken","machen":"ma\u0301chen","besuchen":"besu\u0301chen",
"besichtigen":"besi\u0301chtigen","studieren":"studi\u0301eren","faulenzen":"fa\u0301ulenzen",
"bleiben":"ble\u0301iben","schlafen":"schla\u0301fen","fahren":"fa\u0301hren","lesen":"le\u0301sen",
"sehen":"se\u0301hen","nehmen":"ne\u0301hmen","treffen":"tre\u0301ffen","essen":"e\u0301ssen",
"sprechen":"spre\u0301chen","schreiben":"schre\u0301iben","lernen":"le\u0301rnen",
"grillen":"gri\u0301llen","tanzen":"ta\u0301nzen","schwimmen":"schwi\u0301mmen","joggen":"jo\u0301ggen",
"lachen":"la\u0301chen","lächeln":"l\u00E4\u0301cheln","treiben":"tre\u0301iben","reiten":"re\u0301iten",
"spazieren":"spazi\u0301eren",
"kochen":"ko\u0301chen","klingeln":"kli\u0301ngeln","starten":"sta\u0301rten","wollen":"wo\u0301llen",
"vermuten":"vermu\u0301ten","reparieren":"repari\u0301eren","frühstücken":"fr\u00FC\u0301hstücken",
"chillen":"chi\u0301llen","mögen":"m\u00F6\u0301gen",

// Alltag — Adverbien & Adjektive
"zuerst":"zue\u0301rst","dann":"da\u0301nn","danach":"dana\u0301ch",
"früher":"fr\u00FC\u0301her","alle":"a\u0301lle","wo":"wo\u0301","wohin":"wohi\u0301n",
"wenig":"we\u0301nig","wieso":"wieso\u0301","oft":"o\u0301ft","weg":"we\u0301g",
"natürlich":"nat\u00FC\u0301rlich","vielleicht":"vielle\u0301icht",
"bis":"bi\u0301s","also":"a\u0301lso","genau":"gena\u0301u","immer":"i\u0301mmer",
"montags":"mo\u0301ntags","leider":"le\u0301ider","früh":"fr\u00FC\u0301h","nie":"ni\u0301e",
"selten":"se\u0301lten","manchmal":"ma\u0301nchmal","zusammen":"zusa\u0301mmen","gerne":"ge\u0301rne",
"jetzt":"je\u0301tzt","auch":"a\u0301uch","nur":"nu\u0301r",
"gern/gerne":"ge\u0301rn/ge\u0301rne","heute Abend":"he\u0301ute A\u0301bend",
"spazieren gehen":"spazi\u0301eren ge\u0301hen","Grüße":"Gr\u00FC\u0301ße",
"Freund":"Fre\u0301und","Zug":"Zu\u0301g",
// Phrases (короткие)
"zu Hause":"zu Ha\u0301use","nach Hause":"nach Ha\u0301use","Zeit haben":"Ze\u0301it ha\u0301ben",
"am Wochenende":"am Wo\u0301chenende","alles anders":"a\u0301lles a\u0301nders",
"Viele Grüße":"Vi\u0301ele Gr\u00FC\u0301ße","Bis bald":"Bi\u0301s ba\u0301ld",
"Sport treiben":"Spo\u0301rt tre\u0301iben","zu tun":"zu tu\u0301n","es gibt":"es gi\u0301bt",
"verheiratet sein":"verhe\u0301iratet se\u0301in","verliebt sein":"verli\u0301ebt se\u0301in",
"Deutsch lernen":"De\u0301utsch le\u0301rnen","Musik hören":"Mu\u0301sik h\u00F6\u0301ren",
"Fußball spielen":"Fu\u0301ßball spie\u0301len","Hausaufgaben machen":"Ha\u0301usaufgaben ma\u0301chen",
"zum Glück":"zum Gl\u00FC\u0301ck","Lust haben":"Lu\u0301st ha\u0301ben",
"Schach spielen":"Scha\u0301ch spie\u0301len","Wann?":"Wa\u0301nn?",
// Lektion 6 — новые слова
"Kaugummi":"Ka\u0301ugummi","Mais":"Ma\u0301is","Zucker":"Zu\u0301cker","Ei":"Ei\u0301",
"Brötchen":"Br\u00F6\u0301tchen","Orange":"Ora\u0301nge","Erbse":"E\u0301rbse",
"Spaghetti":"Spaghe\u0301tti","Marmelade":"Marmela\u0301de","Chips":"Chi\u0301ps",
"Dose":"Do\u0301se","Packung":"Pa\u0301ckung","Becher":"Be\u0301cher","Tüte":"T\u00FC\u0301te",
"Stück":"St\u00FC\u0301ck","Glas":"Gla\u0301s","Kasten":"Ka\u0301sten","Scheibe":"Sche\u0301ibe",
"Metzgerei":"Metzgere\u0301i","Bäckerei":"B\u00E4ckere\u0301i","Markt":"Ma\u0301rkt",
"Tankstelle":"Ta\u0301nkstelle","Kiosk":"Kio\u0301sk",
"backen":"ba\u0301cken","kosten":"ko\u0301sten","kaufen":"ka\u0301ufen",
"verkaufen":"verka\u0301ufen","bekommen":"beko\u0301mmen","möchten":"m\u00F6\u0301chten","Bargeld":"Ba\u0301rgeld","Olive":"Oli\u0301ve","Rührei":"R\u00FC\u0301hrei","Waffel":"Wa\u0301ffel","Bonbon":"Bonbo\u0301n","Konfitüre":"Konfit\u00FC\u0301re","Schlagsahne":"Schla\u0301gsahne","Keks":"Ke\u0301ks","Kräutertee":"Kr\u00E4\u0301utertee","Eiscreme":"Ei\u0301screme","Eiswaffel":"Ei\u0301swaffel","Sandwich":"Sa\u0301ndwich","Steak":"Ste\u0301ak","Beilagensalat":"Be\u0301ilagensalat","Frischkäse":"Fri\u0301schkäse","Salami":"Sala\u0301mi","Karotte":"Karo\u0301tte","Knoblauch":"Kno\u0301blauch","Hackfleisch":"Ha\u0301ckfleisch","Schenkel":"Sche\u0301nkel","Brokkoli":"Bro\u0301kkoli","Rotkohl":"Ro\u0301tkohl","Blumenkohl":"Blu\u0301menkohl","Aprikose":"Apriko\u0301se","Leute":"Le\u0301ute","Seetang":"Se\u0301etang","fast":"fa\u0301st","doch":"do\u0301ch","holen":"ho\u0301len","fragen":"fra\u0301gen","gehen":"ge\u0301hen","Nachtisch":"Na\u0301chtisch","Kantine":"Kanti\u0301ne","Imbiss":"I\u0301mbiss",
// Новые слова — ударения
"Krebs":"Kre\u0301bs","Tintenfisch":"Ti\u0301ntenfisch","Forelle":"Fore\u0301lle",
"Thunfisch":"Thu\u0301nfisch","Lachs":"La\u0301chs","Karpfen":"Ka\u0301rpfen","Garnele":"Garne\u0301le",
"Schinken":"Schi\u0301nken","Schweinefleisch":"Schwe\u0301inefleisch","Rindfleisch":"Ri\u0301ndfleisch",
"Würstchen":"W\u00FC\u0301rstchen","Toastbrot":"To\u0301astbrot","Weißbrot":"We\u0301ißbrot",
"Vollkornbrot":"Vo\u0301llkornbrot","Baguette":"Bague\u0301tte","Croissant":"Croissa\u0301nt",
"Pfannkuchen":"Pfa\u0301nnkuchen","Käsekuchen":"K\u00E4\u0301sekuchen",
"Limonade":"Limona\u0301de","Weißwein":"We\u0301ißwein","Sekt":"Se\u0301kt",
"Cola":"Co\u0301la","Orangensaft":"Ora\u0301ngensaft","Cappuccino":"Cappucci\u0301no",
"Espresso":"Espre\u0301sso","Schwarztee":"Schwa\u0301rztee","Milchkaffee":"Mi\u0301lchkaffee",
"Vorspeise":"Vo\u0301rspeise","Hauptgericht":"Ha\u0301uptgericht","Suppe":"Su\u0301ppe",
"Cornflakes":"Co\u0301rnflakes","Pommes frites":"Po\u0301mmes fri\u0301tes",
"Suppenlöffel":"Su\u0301ppenlöffel","Messer":"Me\u0301sser",
"schneiden":"schne\u0301iden","schälen":"sch\u00E4\u0301len",
"Spiegelei":"Spie\u0301gelei","Hühnerei":"H\u00FC\u0301hnerei",
"Eiweiß":"Ei\u0301weiß","Eigelb":"Ei\u0301gelb",
"Pfirsich":"Pfi\u0301rsich","Birne":"Bi\u0301rne","Kirsche":"Ki\u0301rsche",
"Himbeere":"Hi\u0301mbeere","Brombeere":"Bro\u0301mbeere","Erdbeere":"E\u0301rdbeere",
"Grapefruit":"Gra\u0301pefruit","Zitrone":"Zitro\u0301ne","Limette":"Lime\u0301tte",
"Rosine":"Rosi\u0301ne","Spinat":"Spina\u0301t","Paprika":"Pa\u0301prika",
"Kopfsalat":"Ko\u0301pfsalat","Gurke":"Gu\u0301rke","Kürbis":"K\u00FC\u0301rbis",
"Pilz":"Pi\u0301lz","Champignon":"Champigno\u0301n",
"Mayonnaise":"Mayonna\u0301ise","Senf":"Se\u0301nf","Ketchup":"Ke\u0301tchup",
"Essig":"E\u0301ssig","Olivenöl":"Oli\u0301venöl","Pfeffer":"Pfe\u0301ffer",
"Salz":"Sa\u0301lz","Oregano":"Ore\u0301gano","Minze":"Mi\u0301nze",
"Rosmarin":"Ro\u0301smarin","Basilikum":"Basili\u0301kum",
"Schnittlauch":"Schni\u0301ttlauch","Petersilie":"Petersi\u0301lie","vegetarisch":"vegeta\u0301risch",
};

// IPA-транскрипция для всего словаря (кроме фраз)
const IPA_DATA={
// Числа
"null":"[nʊl]","eins":"[aɪns]","zwei":"[tsvaɪ]","drei":"[dʁaɪ]","vier":"[fiːɐ̯]",
"fünf":"[fʏnf]","sechs":"[zɛks]","sieben":"[ˈziːbən]","acht":"[axt]","neun":"[nɔɪn]",
"zehn":"[tseːn]","elf":"[ɛlf]","zwölf":"[tsvœlf]","dreizehn":"[ˈdʁaɪtseːn]",
"vierzehn":"[ˈfiːɐ̯tseːn]","fünfzehn":"[ˈfʏnftseːn]","sechzehn":"[ˈzɛçtseːn]",
"siebzehn":"[ˈziːptseːn]","achtzehn":"[ˈaxtseːn]","neunzehn":"[ˈnɔɪntseːn]","zwanzig":"[ˈtsvantsiç]",
// Berufe
"Lehrer":"[ˈleːʁɐ]","Arzt":"[aːɐ̯tst]","Ingenieur":"[ɪŋɡeˈniøːɐ̯]","Verkäufer":"[fɛɐ̯ˈkɔɪ̯fɐ]",
"Elektriker":"[ˈɛlɛktʁɪkɐ]","Friseur":"[fʁiˈzøːɐ̯]","Programmierer":"[pʁoɡʁaˈmiːʁɐ]",
"Buchhalter":"[ˈbuːxhaltɐ]","Grafiker":"[ˈɡʁaːfɪkɐ]","Altenpfleger":"[ˈaltənˌpfleːɡɐ]",
"Student":"[ʃtuˈdɛnt]","Kinderarzt":"[ˈkɪndɐˌaːɐ̯tst]","Hausmann":"[ˈhaʊsman]",
// Kursraum
"Tür":"[tyːɐ̯]","Fenster":"[ˈfɛnstɐ]","Uhr":"[uːɐ̯]","Stuhl":"[ʃtuːl]",
"Plakat":"[plaˈkaːt]","Tafel":"[ˈtaːfəl]","Lampe":"[ˈlampə]","Flasche":"[ˈflaʃə]",
"Papier":"[paˈpiːɐ̯]","Wörterbuch":"[ˈvœʁtɐbuːx]","Kugelschreiber":"[ˈkuːɡəlˌʃʁaɪbɐ]",
"Kuli":"[ˈkuːli]","Tisch":"[tɪʃ]","Schlüssel":"[ˈʃlʏsəl]","Handy":"[ˈhɛndi]",
"Heft":"[hɛft]","Brille":"[ˈbʁɪlə]","Buch":"[buːx]","Stift":"[ʃtɪft]",
"Tasche":"[ˈtaʃə]","Rucksack":"[ˈʁʊkzak]","Tablet":"[ˈtablɛt]","Laptop":"[ˈlɛptɔp]",
"Bleistift":"[ˈblaɪʃtɪft]","Radiergummi":"[ʁaˈdiːɐ̯ɡʊmi]","Schere":"[ˈʃeːʁə]",
"Lineal":"[lineˈaːl]","Markierstift":"[maʁˈkiːɐ̯ʃtɪft]","Notizbuch":"[noˈtiːtsbʊx]",
"Zettel":"[ˈtsɛtəl]","Hausaufgabe":"[ˈhaʊsˌaʊfɡaːbə]","Kopfhörer":"[ˈkɔpfˌhøːʁɐ]",
"beginnen":"[bəˈɡɪnən]","enden":"[ˈɛndən]","Pause":"[ˈpaʊzə]",
"wiederholen":"[ˌviːdɐˈhoːlən]","Übung":"[ˈyːbʊŋ]",
// Möbel / Bad / Küche
"Spüle":"[ˈʃpyːlə]","Bett":"[bɛt]","Herd":"[heːɐ̯t]","Sofa":"[ˈzoːfa]",
"Schrank":"[ʃʁaŋk]","Fernseher":"[ˈfɛʁnˌzeːɐ̯]","Sessel":"[ˈzɛsəl]","Bild":"[bɪlt]",
"Regal":"[ʁeˈɡaːl]","Teppich":"[ˈtɛpɪç]","Vorhang":"[ˈfoːɐ̯haŋ]",
"Schlafzimmer":"[ˈʃlaːfˌtsɪmɐ]","Zimmer":"[ˈtsɪmɐ]","Schreibtisch":"[ˈʃʁaɪpˌtɪʃ]",
"Bad":"[baːt]","Badewanne":"[ˈbaːdəˌvanə]","Dusche":"[ˈdʊʃə]","Toilette":"[tɔɪˈlɛtə]",
"Waschbecken":"[ˈvaʃˌbɛkən]","Spiegel":"[ˈʃpiːɡəl]","Küche":"[ˈkʏçə]",
"Kühlschrank":"[ˈkyːlʃʁaŋk]","Wohnzimmer":"[ˈvoːnˌtsɪmɐ]","Klimaanlage":"[ˈkliːmaˌanlaːɡə]",
"Zimmerpflanze":"[ˈtsɪmɐˌpflantsə]","Poster":"[ˈpɔstɐ]","Nachttisch":"[ˈnaxtˌtɪʃ]",
"Kissen":"[ˈkɪsən]","Bettdecke":"[ˈbɛtˌdɛkə]","Teddybär":"[ˈtɛdiˌbɛːɐ̯]",
"Kinderzimmer":"[ˈkɪndɐˌtsɪmɐ]","Küchenschrank":"[ˈkʏçənˌʃʁaŋk]","Blumentopf":"[ˈbluːmənˌtɔpf]",
"Waschmaschine":"[ˈvaʃmaˌʃiːnə]","Spülmaschine":"[ˈʃpyːlmaˌʃiːnə]","Blume":"[ˈbluːmə]",
"Kommode":"[kɔˈmoːdə]","Trockner":"[ˈtʁɔknɐ]","Heizungsanlage":"[ˈhaɪtsʊŋsˌanlaːɡə]",
"Tasse":"[ˈtasə]",
// Wohnung
"Terrasse":"[tɛˈʁasə]","Balkon":"[balˈkoːn]","Garage":"[ɡaˈʁaːʒə]",
"Arbeitszimmer":"[ˈaʁbaɪtsˌtsɪmɐ]","Flur":"[fluːɐ̯]","Haus":"[haʊs]",
"Wohnung":"[ˈvoːnʊŋ]","Dorf":"[dɔʁf]","Stadt":"[ʃtat]","Apartment":"[aˈpaʁtmənt]",
"Lage":"[ˈlaːɡə]","Stock":"[ʃtɔk]","Einfamilienhaus":"[ˈaɪnfaˌmiːliənhaʊs]",
"Zentralheizung":"[tsɛnˈtʁaːlˌhaɪtsʊŋ]","Quadratmeter":"[kvaˈdʁaːtˌmeːtɐ]",
"Mehrfamilienhaus":"[ˈmeːɐ̯faˌmiːliənhaʊs]","Hochhaus":"[ˈhɔxˌhaʊs]","Reihenhaus":"[ˈʁaɪənˌhaʊs]",
"Erdgeschoss":"[ˈeːɐ̯tɡəˌʃɔs]","erste Stock":"[ˈeːɐ̯stə ʃtɔk]","zweite Stock":"[ˈtsvaɪtə ʃtɔk]",
"dritte Stock":"[ˈdʁɪtə ʃtɔk]","Dachgeschoss":"[ˈdaxɡəˌʃɔs]","Garten":"[ˈɡaʁtən]",
"bezahlen":"[bəˈtsaːlən]","Keller":"[ˈkɛlɐ]","Farbe":"[ˈfaʁbə]","Geschäft":"[ɡəˈʃɛft]",
// Adjektive
"alt":"[alt]","neu":"[nɔɪ]","modern":"[moˈdɛʁn]","groß":"[ɡʁoːs]","klein":"[klaɪn]",
"schön":"[ʃøːn]","hässlich":"[ˈhɛslɪç]","bequem":"[bəˈkveːm]","unbequem":"[ʊnbəˈkveːm]",
"ordentlich":"[ˈɔʁdəntlɪç]","unordentlich":"[ʊnˈɔʁdəntlɪç]","teuer":"[ˈtɔɪ̯ɐ]",
"billig":"[ˈbɪlɪç]","günstig":"[ˈɡʏnstɪç]","breit":"[bʁaɪt]","schmal":"[ʃmaːl]",
"hell":"[hɛl]","dunkel":"[ˈdʊŋkəl]","links":"[lɪŋks]","rechts":"[ʁɛçts]",
"oben":"[ˈoːbən]","unten":"[ˈʊntən]","gemütlich":"[ɡəˈmyːtlɪç]","ungemütlich":"[ʊnɡəˈmyːtlɪç]",
"hoch":"[hoːx]","niedrig":"[ˈniːdʁɪç]","gut":"[ɡuːt]","schlecht":"[ʃlɛçt]",
"ruhig":"[ˈʁuːɪç]","laut":"[laʊt]","verheiratet":"[fɛɐ̯ˈhaɪʁatɪt]","genug":"[ɡəˈnuːk]",
"furchtbar":"[ˈfʊʁçtbaːɐ̯]","kalt":"[kalt]","warm":"[vaʁm]","sonnig":"[ˈzɔnɪç]",
"zentral":"[tsɛnˈtʁaːl]","interessant":"[ɪntɛʁɛˈzant]","langweilig":"[ˈlaŋvaɪlɪç]",
"fröhlich":"[ˈfʁøːlɪç]","traurig":"[ˈtʁaʊʁɪç]","bunt":"[bʊnt]","froh":"[fʁoː]",
"fit":"[fɪt]","möglich":"[ˈmøːklɪç]","offiziell":"[ɔfɪˈtsiɛl]","müde":"[ˈmyːdə]",
"faul":"[faʊl]","bereit":"[bəˈʁaɪt]","fertig":"[ˈfɛʁtɪç]","langsam":"[ˈlaŋzaːm]",
"spät":"[ʃpɛːt]","später":"[ˈʃpɛːtɐ]","kostenlos":"[ˈkɔstənloːs]",
// Familie
"Großeltern":"[ˈɡʁoːsˌɛltɐn]","Großvater":"[ˈɡʁoːsˌfaːtɐ]","Großmutter":"[ˈɡʁoːsˌmʊtɐ]",
"Eltern":"[ˈɛltɐn]","Vater":"[ˈfaːtɐ]","Mutter":"[ˈmʊtɐ]","Geschwister":"[ɡəˈʃvɪstɐ]",
"Schwester":"[ˈʃvɛstɐ]","Bruder":"[ˈbʁuːdɐ]","Sohn":"[zoːn]","Tochter":"[ˈtɔxtɐ]",
"Enkelkinder":"[ˈɛŋkəlˌkɪndɐ]","Enkel":"[ˈɛŋkəl]","Enkelin":"[ˈɛŋkəlɪn]",
"Onkel":"[ˈɔŋkəl]","Tante":"[ˈtantə]","Cousin":"[kuˈzɛ̃]","Cousine":"[kuˈziːnə]",
"Neffe":"[ˈnɛfə]","Nichte":"[ˈnɪçtə]","Oma":"[ˈoːma]","Opa":"[ˈoːpa]",
"Ehe":"[ˈeːə]","Ehepaar":"[ˈeːəˌpaːɐ̯]","Ehefrau":"[ˈeːəˌfʁaʊ]","Ehemann":"[ˈeːəˌman]",
"heiraten":"[ˈhaɪʁatən]","Liebe":"[ˈliːbə]","Heimatland":"[ˈhaɪmatˌlant]","gehören":"[ɡəˈhøːʁən]",
// Tageszeiten
"Montag":"[ˈmoːntaːk]","Dienstag":"[ˈdiːnstaːk]","Mittwoch":"[ˈmɪtvɔx]",
"Donnerstag":"[ˈdɔnɐstaːk]","Freitag":"[ˈfʁaɪtaːk]","Samstag":"[ˈzamstaːk]",
"Sonntag":"[ˈzɔntaːk]","Woche":"[ˈvɔxə]","Mittag":"[ˈmɪtaːk]","Vormittag":"[ˈfoːɐ̯ˌmɪtaːk]",
"Nachmittag":"[ˈnaxˌmɪtaːk]","Abend":"[ˈaːbənt]","Spätabend":"[ˈʃpɛːtˌaːbənt]",
"Nacht":"[naxt]","Morgen":"[ˈmɔʁɡən]","morgens":"[ˈmɔʁɡəns]","mittags":"[ˈmɪtaːks]",
"abends":"[ˈaːbənts]","nachts":"[naxts]","am Montag":"[am ˈmoːntaːk]",
// Trennbare Verben
"anrufen":"[ˈanˌʁuːfən]","anfangen":"[ˈanˌfaŋən]","anbieten":"[ˈanˌbiːtən]","fernsehen":"[ˈfɛʁnˌzeːən]",
"aufstehen":"[ˈaʊfˌʃteːən]","aufräumen":"[ˈaʊfˌʁɔɪmən]","einkaufen":"[ˈaɪnˌkaʊfən]",
"mitnehmen":"[ˈmɪtˌneːmən]","ausgehen":"[ˈaʊsˌɡeːən]","mitkommen":"[ˈmɪtˌkɔmən]",
"aufhören":"[ˈaʊfˌhøːʁən]","abspülen":"[ˈapˌʃpyːlən]","einladen":"[ˈaɪnˌlaːdən]",
"ausschlafen":"[ˈaʊsˌʃlaːfən]","mitbringen":"[ˈmɪtˌbʁɪŋən]","einschlafen":"[ˈaɪnˌʃlaːfən]",
"wegfahren":"[ˈvɛkˌfaːʁən]","ausfallen":"[ˈaʊsˌfalən]","stattfinden":"[ˈʃtatˌfɪndən]",
"empfehlen":"[ɛmpˈfeːlən]",
"Kellner":"[ˈkɛlnɐ]","Koch":"[kɔx]","Krankenpfleger":"[ˈkʁaŋkənˌpfleːɡɐ]","Karriere":"[kaˈʁjeːʁə]",
"Beruf":"[bəˈʁuːf]","Stelle":"[ˈʃtɛlə]","verdienen":"[fɛɐ̯ˈdiːnən]","schmecken":"[ˈʃmɛkən]",
"Geldautomat":"[ˈɡɛltˌʔaʊtoma̤ːt]","Konto":"[ˈkɔnto]","IBAN":"[iːˈbaːn]",
"Kopf":"[kɔpf]","Auge":"[ˈaʊɡə]","Nase":"[ˈnaːzə]","Schulter":"[ˈʃʊltɐ]",
"Rücken":"[ˈʁʏkən]","Bauch":"[baʊx]","Bein":"[baɪn]","Knie":"[kniː]","Fuß":"[fuːs]",
"Erkältung":"[ɛɐ̯ˈkɛltʊŋ]","Husten":"[ˈhuːstən]","Schnupfen":"[ˈʃnʊpfən]","Fieber":"[ˈfiːbɐ]",
"Tablette":"[taˈblɛtə]","Medikament":"[medɪkaˈmɛnt]","Rezept":"[ʁeˈtsɛpt]","Praxis":"[ˈpʁaksɪs]",
"Hausarzt":"[ˈhaʊsˌʔaːɐ̯tst]","fehlen":"[ˈfeːlən]",
"Bankkaufmann":"[ˈbaŋkˌkaʊfman]","Briefträger":"[ˈbʁiːfˌtʁɛːɡɐ]",
"Taxifahrer":"[ˈtaksiˌfaːʁɐ]","Sekretär":"[zekʁeˈtɛːʁ]","Altenpflegerin":"[ˈaltənˌpfleːɡəʁɪn]",
"Reinigungskraft":"[ˈʁaɪnɪɡʊŋsˌkʁaft]","Hausmeister":"[ˈhaʊsˌmaɪstɐ]",
"Arbeitszeit":"[ˈaʁbaɪtsˌtsaɪt]","Mittagspause":"[ˈmɪtaːksˌpaʊzə]",
"Nachtschicht":"[ˈnaxtˌʃɪçt]","Schichtdienst":"[ˈʃɪçtˌdiːnst]",
"Kontonummer":"[ˈkɔntoˌnʊmɐ]","EC-Karte":"[eːˈtseːˌkaʁtə]",
"überweisen":"[ˈyːbɐˌvaɪzən]","Überweisungsformular":"[ˈyːbɐˌvaɪzʊŋsfɔʁmuˌlaːʁ]","satt":"[zat]",
"Haare":"[ˈhaːʁə]","Ohr":"[oːʁ]","Mund":"[mʊnt]","Zunge":"[ˈtsʊŋə]","Hals":"[hals]",
"Arm":"[aʁm]","Hand":"[hant]","Finger":"[ˈfɪŋɐ]","Handgelenk":"[ˈhantɡəˌlɛŋk]",
"Brust":"[bʁʊst]","Zehe":"[ˈtseːə]","Stirn":"[ʃtɪʁn]","Kinn":"[kɪn]",
"Wange":"[ˈvaŋə]","Lippe":"[ˈlɪpə]","Ellenbogen":"[ˈɛlənˌboːɡən]",
"Gelenk":"[ɡəˈlɛŋk]","Knöchel":"[ˈknœçəl]","Ferse":"[ˈfɛʁzə]","Po":"[poː]",
"Grippe":"[ˈɡʁɪpə]","Schmerzen":"[ˈʃmɛʁtsən]",
"rezeptfrei":"[ʁeˈtsɛptˌfʁaɪ]","rezeptpflichtig":"[ʁeˈtsɛptˌpflɪçtɪç]",
"Untersuchung":"[ˈʊntɐˌzuːxʊŋ]","Zufall":"[ˈtsuːˌfal]","erkältet":"[ɛɐ̯ˈkɛltɛt]",
"weh|tun":"[ˈveːˌtuːn]","Kontoauszug":"[ˈkɔntoˌʔaʊstsuːk]",
"knapp":"[knap]","anderthalb":"[ˈandɐtˌhalb]","eineinhalb":"[ˈaɪnaɪnˌhalb]",
"Baustelle":"[ˈbaʊˌʃtɛlə]","Werkstatt":"[ˈvɛʁkˌʃtat]","Krankenhaus":"[ˈkʁaŋkənˌhaʊs]",
"Gebühr":"[ɡəˈbyːʁ]","Bankverbindung":"[ˈbaŋkfɛɐ̯ˌbɪndʊŋ]","Überweisung":"[ˈyːbɐˌvaɪzʊŋ]",
"Kasse":"[ˈkasə]","Formular":"[fɔʁmuˈlaːʁ]","Team":"[tiːm]",
"Kollege":"[kɔˈleːɡə]","Termin":"[tɛʁˈmiːn]","Chef":"[ʃɛf]",
"Haltestelle":"[ˈhaltəˌʃtɛlə]","Fahrzeug":"[ˈfaːɐ̯ˌtsɔɪk]",
"wechseln":"[ˈvɛksəln]","beraten":"[bəˈʁaːtən]","kontrollieren":"[kɔntʁɔˈliːʁən]",
"unterschreiben":"[ˈʊntɐˌʃʁaɪbən]","anstrengend":"[ˈanˌʃtʁɛŋənt]",
"allein":"[aˈlaɪn]","reisen":"[ˈʁaɪzən]","draußen":"[ˈdʁaʊsən]","drinnen":"[ˈdʁɪnən]",
"Mumps":"[mʊmps]","Windpocken":"[ˈvɪntˌpɔkən]","Masern":"[ˈmaːzɐn]",
"Scharlach":"[ˈʃaːɐ̯lax]","Halstablette":"[ˈhalsˌtabletə]",
"Krankschreibung":"[ˈkʁaŋkˌʃʁaɪbʊŋ]","Krankenkasse":"[ˈkʁaŋkənˌkasə]",
"Gesundheitskarte":"[ɡəˈzʊnthaɪtsˌkaʁtə]","Zeitschrift":"[ˈtsaɪtˌʃʁɪft]",
"operieren":"[opeˈʁiːʁən]","begleiten":"[bəˈɡlaɪtən]","messen":"[ˈmɛsən]",
"anmachen":"[ˈanˌmaxən]","ausmachen":"[ˈaʊsˌmaxən]",
"möglicherweise":"[ˈmøːklɪçɐˌvaɪzə]","wahrscheinlich":"[vaːɐ̯ˈʃaɪnlɪç]",
"überrascht":"[ˈyːbɐˌʁaʃt]",
// L8E Notruf
"Notruf":"[ˈnoːtˌʁuːf]","Notfall":"[ˈnoːtˌfal]","Unfall":"[ˈʊnˌfal]",
"Notarzt":"[ˈnoːtˌʔaːɐ̯tst]","Verletzung":"[fɛɐ̯ˈlɛtsʊŋ]","Not":"[noːt]",
"verletzt":"[fɛɐ̯ˈlɛtst]","dringend":"[ˈdʁɪŋənt]","erklären":"[ɛɐ̯ˈklɛːʁən]","schicken":"[ˈʃɪkən]",
"auflegen":"[ˈaʊfˌleːɡən]","anhalten":"[ˈanˌhaltən]","vorbeifahren":"[ˈfoɐ̯baɪˌfaːʁən]",
// L9 Verkehrsmittel
"Auto":"[ˈaʊtoː]","Fahrrad":"[ˈfaːɐ̯ˌʁaːt]","Motorrad":"[ˈmoːtoɐ̯ˌʁaːt]",
"Straßenbahn":"[ˈʃtʁaːsənˌbaːn]","U-Bahn":"[ˈuːˌbaːn]","S-Bahn":"[ˈɛsˌbaːn]",
"Hubschrauber":"[ˈhuːpʃʁaʊbɐ]",
"Wohnmobil":"[ˈvoːnmoˌbiːl]","Fähre":"[ˈfɛːʁə]","Motorroller":"[ˈmoːtoːɐ̯ˌʁɔlɐ]",
"Boot":"[boːt]","Straßenbahnhaltestelle":"[ˈʃtʁaːsənbaːnˌhaltəʃtɛlə]",
"Campingplatz":"[ˈkɛmpɪŋplats]","Busbahnhof":"[ˈbʊsbaːnhoːf]",
"Fußgänger":"[ˈfuːsˌɡɛŋɐ]","Autobahn":"[ˈaʊtoˌbaːn]","Fahrbahn":"[ˈfaːɐ̯ˌbaːn]",
"Bürgersteig":"[ˈbʏɐ̯ɡɐˌʃtaɪk]","Fahrradweg":"[ˈfaːʁʁatˌveːk]",
"Verkehrsmittel":"[fɛɐ̯ˈkeːɐ̯sˌmɪtəl]","benutzen":"[bəˈnʊtsən]","fliegen":"[ˈfliːɡən]",
"Werkzeug":"[ˈvɛɐ̯kˌtsɔɪk]","Spielzeug":"[ˈʃpiːlˌtsɔɪk]",
// L8 Gesundheit erweitert
"erschöpft":"[ɛɐ̯ˈʃœpft]","übermüdet":"[ˌyːbɐˈmyːdət]",
"überarbeitet":"[ˌyːbɐˈʔaɐ̯baɪtət]","überfordert":"[ˌyːbɐˈfɔɐ̯dɐt]",
"gestresst":"[ɡəˈʃtʁɛst]","stressig":"[ˈʃtʁɛsɪç]",
"sich erholen":"[ɛɐ̯ˈhoːlən]","sich entspannen":"[ɛntˈʃpanən]",
"sich ausruhen":"[ˈaʊsˌʁuːən]","sich hinlegen":"[ˈhɪnˌleːɡən]",
"sich bewegen":"[bəˈveːɡən]","Ernährung":"[ɛɐ̯ˈnɛːʁʊŋ]",
"Arzneimittel":"[ˈaɐ̯tsnaɪˌmɪtəl]","regelmäßig":"[ˈʁeːɡəlˌmɛːsɪç]","dick":"[dɪk]","häufig":"[ˈhɔɪfɪç]","Gewicht":"[ɡəˈvɪçt]","Süßigkeiten":"[ˈzyːsɪçˌkaɪtən]","selbst":"[zɛlpst]",
// L8/L9 allgemein
"nachdenken":"[ˈnaxˌdɛŋkən]","ausgeben":"[ˈaʊsˌɡeːbən]",
"sich leisten":"[ˈlaɪstən]","umsonst":"[ʊmˈzɔnst]",
// Körper
"Ellbogen":"[ˈɛlboːɡən]","Unterschenkel":"[ˈʊntɐˌʃɛŋkəl]","Oberschenkel":"[ˈoːbɐˌʃɛŋkəl]",
"Muskel":"[ˈmʊskəl]","Zeh":"[tseː]","Augenbraue":"[ˈaʊɡənˌbʁaʊə]","Wimper":"[ˈvɪmpɐ]",
"Wirbelsäule":"[ˈvɪʁbəlˌzɔɪlə]","Herz":"[hɛʁts]","Leber":"[ˈleːbɐ]","Magen":"[ˈmaːɡən]",
// Gesundheit
"Kontrolle":"[kɔnˈtʁɔlə]","untersuchen":"[ˌʊntɐˈzuːxən]","sich krankmelden":"[ˈkʁaŋkˌmɛldən]",
// Notruf
"Feuer":"[ˈfɔɪɐ]","Feuerwehr":"[ˈfɔɪɐˌveːɐ̯]","Krankenwagen":"[ˈkʁaŋkənˌvaːɡən]",
"zusammenstoßen":"[tsʊˈzamənˌʃtoːsən]",
// Verkehrsmittel
"umsteigen":"[ˈʊmˌʃtaɪɡən]","Lkw":"[ˈɛlkaːveː]","parken":"[ˈpaʁkən]","hupen":"[ˈhuːpən]",
"weiterfahren":"[ˈvaɪtɐˌfaːʁən]","blinken":"[ˈblɪŋkən]","Vorfahrt":"[ˈfoːɐ̯ˌfaːɐ̯t]",
// In der Stadt
"Kreuzung":"[ˈkʁɔɪtsʊŋ]","Schule":"[ˈʃuːlə]","Bahnhof":"[ˈbaːnˌhoːf]","vergessen":"[fɛɐ̯ˈɡɛsən]","müssen":"[ˈmʏsən]","Ampel":"[ˈampəl]","Ecke":"[ˈɛkə]","Kreisverkehr":"[ˈkʁaɪsfɛɐ̯ˌkeːɐ̯]",
"Ausfahrt":"[ˈaʊsˌfaːɐ̯t]","Stunde":"[ˈʃtʊndə]","Minute":"[miˈnuːtə]",
"geradeaus":"[ɡəˌʁaːdəˈaʊs]","gegenüber":"[ˈɡeːɡənˌʔyːbɐ]","abbiegen":"[ˈapˌbiːɡən]",
"sich verfahren":"[fɛɐ̯ˈfaːʁən]","sich verlaufen":"[fɛɐ̯ˈlaʊfən]","einige":"[ˈaɪnɪɡə]",
// Führerschein
"Führerschein":"[ˈfyːʁɐˌʃaɪn]","dürfen":"[ˈdʏʁfən]","erlauben":"[ɛɐ̯ˈlaʊbən]",
"verbieten":"[fɛɐ̯ˈbiːtən]","erkennen":"[ɛɐ̯ˈkɛnən]","Anerkennung":"[ˈanɛɐ̯ˌkɛnʊŋ]",
"ausländisch":"[ˈaʊslɛndɪʃ]","Ausländer":"[ˈaʊslɛndɐ]","Behörde":"[bəˈhøːɐ̯də]",
// L9
"Weg":"[veːk]","Flughafen":"[ˈfluːkˌhaːfən]","Stadtmitte":"[ˈʃtatˌmɪtə]",
"Monatskarte":"[ˈmoːnatsˌkaʁtə]","Platz":"[plats]","Baum":"[baʊm]",
"Hund":"[hʊnt]","Schwimmbad":"[ˈʃvɪmˌbaːt]","Rathaus":"[ˈʁaːtˌhaʊs]",
"Bibliothek":"[ˌbɪblioˈteːk]","Hauptbahnhof":"[ˈhaʊptˌbaːnhoːf]",
"weit":"[vaɪt]","Linie":"[ˈliːniə]","Zoo":"[tsoː]","Spielplatz":"[ˈʃpiːlˌplats]",
"Führerscheinprüfung":"[ˈfyːʁɐʃaɪnˌpʁyːfʊŋ]","anerkennen":"[ˈanɛɐ̯ˌkɛnən]",
"Vorfahrtsschild":"[ˈfoːɐ̯faʁtsˌʃɪlt]","Schild":"[ʃɪlt]",
"Fahrplan":"[ˈfaːɐ̯ˌplaːn]","Abfahrt":"[ˈapˌfaːɐ̯t]",
"Großstadt":"[ˈɡʁoːsˌʃtat]","Kleinstadt":"[ˈklaɪnˌʃtat]",
"ledig":"[ˈleːdɪç]","geschieden":"[ɡəˈʃiːdən]",
"gestern":"[ˈɡɛstɐn]",
"träumen":"[ˈtʁɔɪmən]","suchen":"[ˈzuːxən]","reden":"[ˈʁeːdən]","abholen":"[ˈaphˌoːlən]",
"haben":"[ˈhaːbən]","sein":"[zaɪn]","geben":"[ˈɡeːbən]","helfen":"[ˈhɛlfən]",
"heißen":"[ˈhaɪsən]","stehen":"[ˈʃteːən]","bringen":"[ˈbʁɪŋən]",
"denken":"[ˈdɛŋkən]","wissen":"[ˈvɪsən]","tun":"[tuːn]",
"singen":"[ˈzɪŋən]","rufen":"[ˈʁuːfən]","weinen":"[ˈvaɪnən]",
"üben":"[ˈyːbən]","stellen":"[ˈʃtɛlən]","legen":"[ˈleːɡən]",
"hängen":"[ˈhɛŋən]","zahlen":"[ˈtsaːlən]","rauchen":"[ˈʁaʊxən]",
// Lebensmittel
"Apfel":"[ˈapfəl]","Banane":"[baˈnaːnə]","Brot":"[bʁoːt]","Butter":"[ˈbʊtɐ]",
"Hähnchen":"[ˈhɛːnçən]","Joghurt":"[ˈjoːɡʊʁt]","Kaffee":"[ˈkafe]","Kartoffel":"[kaʁˈtɔfəl]",
"Käse":"[ˈkɛːzə]","Milch":"[mɪlç]","Nudel":"[ˈnuːdəl]","Reis":"[ʁaɪs]",
"Salat":"[zaˈlaːt]","Schokolade":"[ʃokoˈlaːdə]","Tee":"[teː]","Fisch":"[fɪʃ]",
"Tomate":"[toˈmaːtə]","Wasser":"[ˈvasɐ]","Wein":"[vaɪn]","Wurst":"[vʊʁst]",
"Zwiebel":"[ˈtsviːbəl]","Gewürz":"[ɡəˈvʏʁts]","Kaugummi":"[ˈkaʊɡʊmi]",
"Mais":"[maɪs]","Zucker":"[ˈtsʊkɐ]","Ei":"[aɪ]","Brötchen":"[ˈbʁøːtçən]",
"Orange":"[oˈʁanʒə]","Erbse":"[ˈɛʁbzə]","Spaghetti":"[ʃpaˈɡɛti]",
"Marmelade":"[maʁməˈlaːdə]","Chips":"[tʃɪps]","Dose":"[ˈdoːzə]","Packung":"[ˈpakʊŋ]",
"Becher":"[ˈbɛçɐ]","Tüte":"[ˈtyːtə]","Stück":"[ʃtʏk]","Glas":"[ɡlaːs]",
"Kasten":"[ˈkastən]","Scheibe":"[ˈʃaɪbə]","Metzgerei":"[mɛtsɡəˈʁaɪ]",
"Bäckerei":"[bɛkəˈʁaɪ]","Markt":"[maʁkt]","Tankstelle":"[ˈtaŋkˌʃtɛlə]","Kiosk":"[kiˈɔsk]",
"backen":"[ˈbakən]","kosten":"[ˈkɔstən]","kaufen":"[ˈkaʊfən]","verkaufen":"[fɛɐ̯ˈkaʊfən]",
"bekommen":"[bəˈkɔmən]","möchten":"[ˈmœçtən]","Bargeld":"[ˈbaːɐ̯ɡɛlt]",
"Olive":"[oˈliːvə]","Rührei":"[ˈʁyːɐ̯ˌaɪ]","Waffel":"[ˈvafəl]","Bonbon":"[bɔnˈbɔn]",
"Konfitüre":"[kɔnfiˈtyːʁə]","Schlagsahne":"[ˈʃlaːkˌzaːnə]","Keks":"[keːks]",
"Kräutertee":"[ˈkʁɔɪtɐˌteː]","Eiscreme":"[ˈaɪsˌkʁeːm]","Eiswaffel":"[ˈaɪsˌvafəl]",
"Sandwich":"[ˈzɛntvɪtʃ]","Steak":"[steːk]","Beilagensalat":"[ˈbaɪlaːɡənzaˌlaːt]",
"Frischkäse":"[ˈfʁɪʃˌkɛːzə]","Salami":"[zaˈlaːmi]","Karotte":"[kaˈʁɔtə]",
"Knoblauch":"[ˈknoːblaʊx]","Hackfleisch":"[ˈhakˌflaɪʃ]","Schenkel":"[ˈʃɛŋkəl]",
"Brokkoli":"[ˈbʁɔkoli]","Rotkohl":"[ˈʁoːtkoːl]",
"Blumenkohl":"[ˈbluːmənkoːl]","Aprikose":"[apʁiˈkoːzə]","Nachtisch":"[ˈnaxtɪʃ]",
"Kantine":"[kanˈtiːnə]","Imbiss":"[ˈɪmbɪs]",
"Krebs":"[kʁeːps]","Tintenfisch":"[ˈtɪntənˌfɪʃ]","Forelle":"[foˈʁɛlə]",
"Thunfisch":"[ˈtuːnˌfɪʃ]","Lachs":"[laks]","Karpfen":"[ˈkaʁpfən]","Garnele":"[ɡaʁˈneːlə]",
"Schinken":"[ˈʃɪŋkən]","Schweinefleisch":"[ˈʃvaɪnəˌflaɪʃ]","Rindfleisch":"[ˈʁɪntˌflaɪʃ]",
"Würstchen":"[ˈvʏʁstçən]","Toastbrot":"[ˈtoːstbʁoːt]","Weißbrot":"[ˈvaɪsbʁoːt]",
"Vollkornbrot":"[ˈfɔlkɔʁnbʁoːt]","Baguette":"[baˈɡɛt]","Croissant":"[kʁoˈaːsɑ̃]",
"Pfannkuchen":"[ˈpfankuːxən]","Käsekuchen":"[ˈkɛːzəˌkuːxən]","Limonade":"[limoˈnaːdə]",
"Weißwein":"[ˈvaɪsvaɪn]","Sekt":"[zɛkt]","Cola":"[ˈkoːla]",
"Orangensaft":"[oˈʁanʒənzaft]","Cappuccino":"[kapuˈtʃiːno]","Espresso":"[ɛˈspʁɛso]",
"Schwarztee":"[ˈʃvaʁtsˌteː]","Milchkaffee":"[ˈmɪlçˌkafe]","Vorspeise":"[ˈfoːɐ̯ˌʃpaɪzə]",
"Hauptgericht":"[ˈhaʊptɡəˌʁɪçt]","Suppe":"[ˈzʊpə]","Cornflakes":"[ˈkɔʁnˌfleɪks]",
"Pommes frites":"[ˈpɔmˌfʁɪt]","Suppenlöffel":"[ˈzʊpənˌlœfəl]","Messer":"[ˈmɛsɐ]",
"schneiden":"[ˈʃnaɪdən]","schälen":"[ˈʃɛːlən]","Spiegelei":"[ˈʃpiːɡəlˌaɪ]",
"Hühnerei":"[ˈhyːnɐˌaɪ]","Eiweiß":"[ˈaɪvaɪs]","Eigelb":"[ˈaɪɡɛlp]",
"Pfirsich":"[ˈpfɪʁzɪç]","Birne":"[ˈbɪʁnə]","Kirsche":"[ˈkɪʁʃə]",
"Himbeere":"[ˈhɪmbeːʁə]","Brombeere":"[ˈbʁɔmbeːʁə]","Erdbeere":"[ˈeːɐ̯tbeːʁə]",
"Grapefruit":"[ˈɡʁeɪpfʁuːt]","Zitrone":"[tsiˈtʁoːnə]","Limette":"[liˈmɛtə]",
"Rosine":"[ʁoˈziːnə]","Spinat":"[ʃpiˈnaːt]","Paprika":"[ˈpapʁika]",
"Kopfsalat":"[ˈkɔpfzaˌlaːt]","Gurke":"[ˈɡʊʁkə]","Kürbis":"[ˈkyʁbɪs]",
"Pilz":"[pɪlts]","Champignon":"[ʃamˈpɪnjɔn]","Mayonnaise":"[majoˈnɛːzə]",
"Senf":"[zɛnf]","Ketchup":"[ˈkɛtʃap]","Essig":"[ˈɛsɪç]","Olivenöl":"[oˈliːvənˌøːl]",
"Pfeffer":"[ˈpfɛfɐ]","Salz":"[zalts]","Oregano":"[oˈʁeːɡano]","Minze":"[ˈmɪntsə]",
"Rosmarin":"[ˈʁoːzmaˌʁiːn]","Basilikum":"[baˈziːlikʊm]","Schnittlauch":"[ˈʃnɪtˌlaʊx]",
"Petersilie":"[peˈteːɐ̯ziːliə]","vegetarisch":"[veɡeˈtaːʁɪʃ]",
// Alltag — Nomen
"Pass":"[pas]","Apotheke":"[apoˈteːkə]",
"Pizza":"[ˈpɪtsa]","Oper":"[ˈoːpɐ]","Portemonnaie":"[pɔʁtəˈmɔnɛ]","Jacke":"[ˈjakə]",
"Bus":"[bʊs]","Supermarkt":"[ˈzuːpɐˌmaʁkt]","Radtour":"[ˈʁaːttuːɐ̯]",
"Lebensmittel":"[ˈleːbənsmɪtəl]","Sehenswürdigkeit":"[ˈzeːənsvʏʁdɪçkaɪt]",
"Straßenfest":"[ˈʃtʁaːsənˌfɛst]","Bummel":"[ˈbʊməl]","Stadtbummel":"[ˈʃtatˌbʊməl]",
"Hafen":"[ˈhaːfən]","Schiff":"[ʃɪf]","Innenstadt":"[ˈɪnənˌʃtat]","Laune":"[ˈlaʊnə]",
"Wochenende":"[ˈvɔxənˌɛndə]","Freizeit":"[ˈfʁaɪtsaɪt]","Film":"[fɪlm]","Tag":"[taːk]",
"Spaziergang":"[ʃpaˈtsiːɐ̯ˌɡaŋ]","Schifffahrt":"[ˈʃɪfˌfaːɐ̯t]","Kindheit":"[ˈkɪntˌhaɪt]",
"Zeit":"[tsaɪt]","Zeitung":"[ˈtsaɪtʊŋ]","Dom":"[doːm]","Ausflug":"[ˈaʊsˌfluːk]",
"Uhrzeit":"[ˈuːɐ̯tsaɪt]","Tanzkurs":"[ˈtantsˌkuːɐ̯s]","Konzert":"[kɔnˈtsɛʁt]",
"Radiowecker":"[ˈʁaːdioˌvɛkɐ]","Gleis":"[ɡlaɪs]","Flugzeug":"[ˈfluːkˌtsɔɪk]",
"Tanzparty":"[ˈtantsˌpaːɐ̯ti]","Krimi":"[ˈkʁiːmi]","Fußballspiel":"[ˈfuːsbalˌʃpiːl]",
"Frühstück":"[ˈfʁyːʃtʏk]","Abendessen":"[ˈaːbəntˌɛsən]","Sprachkurs":"[ˈʃpʁaxˌkuːɐ̯s]",
"Fluss":"[flʊs]","Brücke":"[ˈbʁʏkə]","Wald":"[valt]","Hobby":"[ˈhɔbi]",
"Fahrkarte":"[ˈfaːɐ̯ˌkaʁtə]","Zahnarzttermin":"[ˈtsaːnaʁtstˌtɛʁmiːn]",
"heute Abend":"[ˈhɔɪtə ˈaːbənt]","Tipp":"[tɪp]","Respekt":"[ʁɛˈʃpɛkt]",
"Sonderangebot":"[ˈzɔndɐˌanɡəboːt]","Wäsche":"[ˈvɛʃə]","Meinung":"[ˈmaɪnʊŋ]",
"Kuchen":"[ˈkuːxən]","Nachspeise":"[ˈnaːxˌʃpaɪzə]","Freund":"[fʁɔɪnt]",
"Zug":"[tsuːk]",
// Alltag — Verben
"kennen":"[ˈkɛnən]","trinken":"[ˈtʁɪŋkən]","machen":"[ˈmaxən]",
"besuchen":"[bəˈzuːxən]","besichtigen":"[bəˈzɪçtɪɡən]","studieren":"[ʃtuˈdiːʁən]",
"faulenzen":"[ˈfaʊlɛntsən]","bleiben":"[ˈblaɪbən]","schlafen":"[ˈʃlaːfən]",
"fahren":"[ˈfaːʁən]","lesen":"[ˈleːzən]","sehen":"[ˈzeːən]","nehmen":"[ˈneːmən]",
"treffen":"[ˈtʁɛfən]","essen":"[ˈɛsən]","sprechen":"[ˈʃpʁɛçən]",
"schreiben":"[ˈʃʁaɪbən]","lernen":"[ˈlɛʁnən]","grillen":"[ˈɡʁɪlən]",
"tanzen":"[ˈtantsən]","schwimmen":"[ˈʃvɪmən]","joggen":"[ˈjɔɡən]",
"lachen":"[ˈlaxən]","lächeln":"[ˈlɛçəln]","treiben":"[ˈtʁaɪbən]","reiten":"[ˈʁaɪtən]",
"kochen":"[ˈkɔxən]","klingeln":"[ˈklɪŋəln]","starten":"[ˈʃtaʁtən]","wollen":"[ˈvɔlən]",
"vermuten":"[fɛɐ̯ˈmuːtən]","reparieren":"[ʁepaˈʁiːʁən]","frühstücken":"[ˈfʁyːʃˌtʏkən]",
"chillen":"[ˈtʃɪlən]","mögen":"[ˈmøːɡən]",
// Alltag — Adverbien & Sonstiges
"zuerst":"[tsuˈeːɐ̯st]","dann":"[dan]","danach":"[daˈnaːx]",
"früher":"[ˈfʁyːɐ̯]","alle":"[ˈalə]","wo":"[voː]","wohin":"[voˈhɪn]",
"wenig":"[ˈveːnɪç]","wieso":"[viˈzoː]","oft":"[ɔft]","weg":"[vɛk]",
"natürlich":"[naˈtyːɐ̯lɪç]","vielleicht":"[fiˈlaɪçt]",
"bis":"[bɪs]","also":"[ˈalzoː]","genau":"[ɡəˈnaʊ]","immer":"[ˈɪmɐ]",
"montags":"[ˈmoːntaːks]","leider":"[ˈlaɪdɐ]","früh":"[fʁyː]","nie":"[niː]",
"selten":"[ˈzɛltən]","manchmal":"[ˈmançmaːl]","zusammen":"[tsuˈzamən]",
"gerne":"[ˈɡɛʁnə]","jetzt":"[jɛtst]","auch":"[aʊx]",
"nur":"[nuːɐ̯]","gern/gerne":"[ɡɛʁn/ˈɡɛʁnə]","spazieren gehen":"[ʃpaˈtsiːʁən ˈɡeːən]","spazieren":"[ʃpaˈtsiːʁən]",
"Grüße":"[ˈɡʁyːsə]","Leute":"[ˈlɔɪtə]","Seetang":"[ˈzeːtaŋ]","fast":"[fast]","doch":"[dɔx]","holen":"[ˈhoːlən]","fragen":"[ˈfʁaːɡən]","gehen":"[ˈɡeːən]",
};

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
      // über die Familie sprechen
      {q:"Ist Ihre Familie groß?",              a:"Ja, ich habe fünf Geschwister: vier Schwestern und einen Bruder.",        note:"Geschwister (мн.ч.) · einen Bruder (m Akk.)",               fm:"f"},
      {q:"Ist deine Familie groß?",             a:"Nein, meine Familie ist klein. Ich habe nur einen Bruder.",               note:"nur = только · klein ≠ groß",                                fm:"i"},
      {q:"Haben Sie Kinder?",                   a:"Ja, ich habe zwei Kinder. / Nein, keine Kinder.",                        note:"keine Kinder = нет детей (Akkusativ)",                       fm:"f"},
      {q:"Hast du Geschwister?",                a:"Ja, ich habe vier Tanten und fünf Onkel, zwei Cousins und zwei Cousinen.",note:"Cousin/Cousine = двоюродный брат/сестра",                   fm:"i"},
      // über Vergangenes sprechen
      {q:"Wie war Ihre Familie früher?",        a:"Früher waren die Familien groß. Meine Großeltern hatten sieben Kinder.", note:"früher = раньше · waren/hatten = Präteritum",               fm:"f"},
      {q:"Was war Ihr Großvater von Beruf?",    a:"Mein Großvater war Arzt von Beruf.",                                     note:"von Beruf = по профессии · war = Präteritum von sein",      fm:"f"},
      {q:"Hatten deine Großeltern viele Kinder?",a:"Ja, meine Großeltern hatten sieben Kinder.",                            note:"hatten = Präteritum von haben",                              fm:"i"},
      // eine Stadtbesichtigung planen
      {q:"Was machen wir zuerst?",              a:"Zuerst kaufen wir Lebensmittel, dann essen wir zu Mittag.",              note:"zuerst → dann → danach · Verb immer auf Position 2"},
      {q:"Was machen wir danach?",              a:"Danach machen wir eine Radtour und besuchen ein Straßenfest.",           note:"danach = после этого · eine Radtour machen"},
      // über Freizeitaktivitäten sprechen
      {q:"Lesen Sie gerne Bücher?",             a:"Ja, sehr gern! / Nein, nicht so gern. Ich lese gerne Internet-Blogs.",  note:"gerne = с удовольствием · nicht so gern = не очень",        fm:"f"},
      {q:"Liest du gerne Bücher?",              a:"Ja, ich lese gern! / Nein, ich lese nicht so gerne Bücher.",            note:"lesen → du liest (Vokalwechsel e→ie)",                       fm:"i"},
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
      {q:"Was macht ihr am Wochenende?",a:"Wir machen eine Radtour. / Wir besuchen ein Straßenfest.", note:"am Wochenende = в выходные · eine Radtour machen = кататься на велосипеде"},
      {q:"Kommst du bald nach Berlin?", a:"Ja, ich komme am Wochenende und bleibe zwei Tage.", note:"nach Berlin = куда (Wohin?) ≠ in Berlin = где (Wo?)"},
      {q:"Wo seid ihr jetzt?",          a:"Wir sind in Berlin. Es gibt hier viele Sehenswürdigkeiten.", note:"Wo? → in + Stadt (нахождение) · Sehenswürdigkeiten = достопримечательности"},
      {q:"Was machen wir zuerst?",      a:"Zuerst kaufen wir Lebensmittel, dann essen wir zu Mittag.", note:"zuerst = сначала · dann = потом · danach = после этого"},
      {q:"Er schläft. / Sie liest ein Buch.", a:"— (описание того, кто что делает)",          note:"Vokalwechsel: schlafen→schläft · lesen→liest · sehen→sieht · fahren→fährt"},
      {q:"Sprichst du Spanisch?",             a:"Ja, natürlich! / Ja, ein bisschen. / Nein, leider nicht.", note:"sprechen → du sprichst · ein bisschen = немного · natürlich = конечно"},
      {q:"Isst du gerne Schokolade?",         a:"Ja, ich esse sehr gern! / Nein, ich esse nicht gern.",      note:"gerne = с удовольствием · sehr gern = очень люблю · nicht gern = не люблю"},
      {q:"Liest du gerne Bücher?",            a:"Ja, ich lese gern Bücher. / Nein, nicht so gern.",          note:"nicht so gern = не очень люблю · auch: Zeitungen, Blogs, SMS"},
      {q:"Was machen wir morgen?",            a:"Wir sehen einen Film! Oder wir chillen und essen Pizza.",   note:"morgen = завтра · chillen = расслабляться (разг.)"},
      {q:"Ich habe eine Idee!",               a:"— (предлагаю план)",                                        note:"eine Idee haben = иметь идею · Wir nehmen die S-Bahn und fahren nach ..."},
      {q:"Kennt ihr den Hafen hier?",         a:"Ja, ich kenne den Hafen. / Nein, das kenne ich nicht.",     note:"kennen = знать (место/человека) · Kennt ihr? = неформ. мн.ч."},
      {q:"In Hamburg gibt es den Hafen.",     a:"— (рассказываю о городе)",                                  note:"In + Stadt + gibt es + Akk. · Man kann eine Hafenrundfahrt machen."},
      {q:"Wie alt ist Ihre Tochter?",         a:"Meine Tochter ist fünf Jahre alt.",                         note:"Wie alt ist = сколько лет · Jahre alt = лет от роду",        fm:"f"},
      {q:"Wie alt ist dein Kind?",            a:"Mein Sohn ist drei Jahre alt. / Meine Tochter ist sieben.", note:"Jahre alt = лет · mein Sohn / meine Tochter",                fm:"i"},
      {q:"Was machen Sie gern am Wochenende?",a:"Ich mache oft eine Radtour. / Ich lese gerne eine Zeitung.", note:"gern/oft = с удовольствием/часто · am Wochenende = в выходные", fm:"f"},
      {q:"Was machst du gern am Wochenende?", a:"Ich chillen oft und esse Pizza. / Ich lese gern.",          note:"oft = часто · gern = с удовольствием",                        fm:"i"},
    ]},
  ],
  L5:[
    {tag:"Основные",col:C.orange,pairs:[
      {q:"Entschuldigung, wie spät ist es?",  a:"Es ist neun Uhr. / Es ist Viertel nach neun.",              note:"wie spät ist es? = который час?"},
      {q:"Um wie viel Uhr beginnt der Kurs?", a:"Der Kurs beginnt um Viertel nach neun.",                    note:"um + Uhrzeit → точное время · beginnen = начинаться"},
      {q:"Wann endet der Kurs?",              a:"Der Kurs endet um halb eins.",                               note:"enden = заканчиваться · halb eins = 12:30"},
      {q:"Um wie viel Uhr beginnt die Pause?",a:"Die Pause beginnt um halb elf.",                             note:"die Pause = перерыв"},
      {q:"Wann gehen Sie nach Hause?",        a:"Ich gehe um zwei Uhr nach Hause.",                          note:"nach Hause gehen = идти домой"},
      {q:"Bis wann geht der Kurs?",           a:"Bis 20 Uhr. / Bis acht Uhr.",                               note:"Bis wann? = До какого времени?"},
      {q:"Von wann bis wann geht der Kurs?",  a:"Von sechs bis acht. / Von 18 bis 20 Uhr.",                  note:"von ... bis ... = с ... до ..."},
      {q:"Was ist Ihr Hobby?",                a:"Mein Hobby ist Gitarre spielen. / Ich lese gern Bücher.",   note:"Was ist Ihr Hobby? = какое ваше хобби?",              fm:"f"},
      {q:"Was machst du in der Freizeit?",    a:"Ich jogge gern im Park. / Ich höre Musik.",                 note:"in der Freizeit = в свободное время",                 fm:"i"},
      {q:"Was machen Sie gerne?",             a:"Ich treibe gern Sport. / Ich surfe gern im Internet.",      note:"gerne = с удовольствием",                            fm:"f"},
      {q:"Gehen wir zusammen schwimmen?",     a:"Sehr gerne. Wann? / Ja, gerne. / Nein, ich habe keine Lust.", note:"sich verabreden = договориться о встрече"},
      {q:"Hast du heute Abend Zeit?",         a:"Ja, das geht. / Nein, leider nicht. / Geht es auch morgen?", note:"Zeit haben = иметь время · leider = к сожалению"},
      {q:"Geht es auch später?",              a:"Ja, das geht. Um drei Uhr habe ich Zeit.",                  note:"geht es = подходит ли · auch = тоже, также"},
      {q:"Was meinst du?",                    a:"Ich finde das gut. / Das geht nicht.",                      note:"meinen = думать, считать"},
    ]},
    {tag:"Дополнительные",col:C.green,pairs:[
      {q:"Wann stehst du auf?",               a:"Ich stehe um 7 Uhr auf.",                                   note:"aufstehen = вставать · Präfix 'auf' ans Ende"},
      {q:"Wann kaufst du ein?",               a:"Ich kaufe um 10 Uhr ein.",                                  note:"einkaufen = делать покупки"},
      {q:"Wann siehst du fern?",              a:"Ich sehe am Abend fern.",                                   note:"fernsehen = смотреть ТВ · am Abend = вечером"},
      {q:"Wann fängt der Film an?",           a:"Der Film fängt um neun Uhr an.",                            note:"anfangen = начинаться · fängt...an (Vokalwechsel)"},
      {q:"Wann ruft sie an?",                 a:"Sie ruft um halb zwölf an.",                                note:"anrufen = звонить · ruft...an"},
      {q:"Wann gehst du aus?",                a:"Ich gehe am Freitagabend aus.",                             note:"ausgehen = выходить гулять · am Freitagabend"},
      {q:"Wie lange dauert der Kurs?",        a:"Der Kurs dauert zwei Stunden.",                             note:"dauern = длиться · die Stunde = час"},
      {q:"Was macht Frau Costa am Samstag?",  a:"Sie steht auf, kauft ein, räumt auf und geht aus.",        note:"trennbare Verben в цепочке"},
    ]},
  ],
  L6:[
    {tag:"Основные",col:C.green,pairs:[
      {q:"Sie wünschen? / Bitte schön?",               a:"Ich hätte gerne ein Kilo Äpfel.",                   note:"hätte gerne = хотел(а) бы · вежливая просьба"},
      {q:"Was möchten Sie?",                            a:"Ich hätte gerne drei Kilo Kartoffeln.",             note:"möchten = хотеть (вежливо)"},
      {q:"Was kosten die Tomaten / Erdbeeren?",         a:"Das Kilo kostet 2,90€. / 8,20€ das Kilo.",         note:"kosten (мн.ч.) / kostet (ед.ч.) = стоить"},
      {q:"Hmm, die sind aber teuer!",                   a:"Die Erdbeeren sind frisch und lecker.",             note:"aber = но · teuer = дорого · lecker = вкусно"},
      {q:"Noch etwas? / Haben Sie noch einen Wunsch?",  a:"Dann nehme ich ein halbes Kilo. / Das ist alles.", note:"nehmen = взять · der Wunsch = желание"},
      {q:"Das macht zusammen 9,00€.\nHaben Sie es passend?",a:"Leider nicht. Ich habe nur zehn Euro.",        note:"passend = точная сдача · zusammen = итого"},
      {q:"Dann bekommen Sie 2,30€ zurück.",              a:"Danke schön! Einen schönen Tag noch!",             note:"zurück = обратно · einen schönen Tag = хорошего дня"},
      {q:"Danke, gleichfalls! Auf Wiedersehen!",         a:"Auf Wiedersehen!",                                 note:"gleichfalls = и вам того же"},
      {q:"Bitte schön? (in der Bäckerei)",               a:"Ich möchte ein Vollkornbrot, bitte!",              note:"das Vollkornbrot = хлеб из цельного зерна"},
      {q:"Was kosten die Croissants? / Was macht das?",  a:"0,70€ das Stück.",                                 note:"das Stück = штука · Was macht das? = Сколько стоит?"},
      {q:"Das macht zusammen 6,05€.",                    a:"Hier bitte! / Und 15 Cent zurück.",                note:"15 Cent zurück = 15 центов сдачи"},
    ]},
    {tag:"Дополнительные",col:C.teal,pairs:[
      {q:"Wo kaufen Sie Kaugummis?",               a:"Kaugummis kaufe ich an der Tankstelle. / im Kiosk.",     note:"an der Tankstelle · im Supermarkt · auf dem Markt"},
      {q:"Kaufen Sie oft im Supermarkt ein?",      a:"Ja, ich kaufe jeden Tag ein. / Manchmal gehe ich auf den Markt.", note:"einkaufen = делать покупки · manchmal = иногда"},
      {q:"Was magst du?",                          a:"Ich mag Wurst, aber ich mag keinen Käse.",               note:"mögen: ich mag = er/sie mag (нет -t!)"},
      {q:"Isst du gerne Schokolade?",              a:"Ja, sehr gerne! / Nein, ich esse nicht gerne Schokolade.", note:"gerne / nicht gerne = с удовольствием / нет"},
      {q:"Was isst man in Deutschland zum Frühstück?", a:"Man isst Brot mit Käse oder Wurst und trinkt Kaffee oder Tee.", note:"man = люди вообще · isst = как er"},
      {q:"Kauf doch bitte Brot! → кто?",          a:"Du → Imperativ informell (du-Form)",                     note:"du kaufst → Kauf! (убери -st и du)"},
      {q:"Kaufen Sie Milch! → какой Imperativ?",   a:"Imperativ formell (Sie-Form): Infinitiv + Sie",          note:"Sie kaufen → Kaufen Sie!"},
    ]},
  ],
  L7:[
    {tag:"Основные",col:C.blue,pairs:[
      {q:"Was sind Sie von Beruf?",              a:"Ich bin Krankenpfleger. / Ich arbeite als Kellnerin.",         note:"von Beruf = по профессии · arbeite als = работаю как"},
      {q:"Wo arbeiten Sie?",                     a:"Ich arbeite im Büro. / auf der Baustelle. / in der Bank.",    note:"im (in dem) / auf der / in der"},
      {q:"Was müssen Sie heute machen?",         a:"Ich muss früh aufstehen. / Ich muss viel arbeiten.",          note:"müssen + Infinitiv am Ende"},
      {q:"Kannst du mir bitte helfen?",          a:"Ja, klar, kann ich das! / Tut mir leid, ich kann nicht.",     note:"können = мочь, уметь"},
      {q:"Was willst du heute Abend machen?",    a:"Ich will ins Kino gehen. / Ich will zu Hause bleiben.",       note:"wollen = хотеть (намерение)"},
      {q:"Was soll ich machen?",                 a:"Du sollst viel Wasser trinken. / Sie sollen im Bett bleiben.",note:"sollen = должен (по совету/указанию)"},
      {q:"Wie ist Ihre IBAN?",                   a:"Meine IBAN ist DE46 1003 0000 0036 2057 00.",                 note:"die IBAN = международный номер счёта"},
      {q:"Ich möchte Geld überweisen.",          a:"Füllen Sie bitte das Überweisungsformular aus.",              note:"überweisen = переводить деньги"},
    ]},
    {tag:"Дополнительные",col:C.orange,pairs:[
      {q:"Wie komme ich zum Bahnhof?",           a:"Fahren Sie mit dem Bus. / Gehen Sie zu Fuß.",                note:"zu Fuß = пешком · mit dem = Dativ"},
      {q:"Wo ist die Bank?",                     a:"Die Bank ist beim Bahnhof. / in der Nähe vom Supermarkt.",   note:"beim (bei+dem) · vom (von+dem)"},
      {q:"Wohin fährst du?",                     a:"Ich fahre zum Arzt. / zur Schule. / nach Hause.",            note:"zum (zu+dem) · zur (zu+der) · nach Hause"},
      {q:"Woher kommst du?",                     a:"Ich komme vom Arzt. / von zu Hause. / aus der Ukraine.",     note:"vom (von+dem) · aus = из"},
      {q:"Das Essen schmeckt mir sehr gut!",     a:"Das freut mich! / Ja, wirklich lecker!",                    note:"schmeckt mir = мне нравится вкус"},
      {q:"Nein, danke, ich bin satt.",           a:"Möchtest du wirklich nichts mehr?",                          note:"satt = сытый · nichts mehr = ничего больше"},
    ]},
  ],
  L8:[
    {tag:"Основные",col:C.red,pairs:[
      {q:"Praxis Dr. Arslan, guten Tag.",                     a:"Guten Tag, ich hätte gern einen Termin.",            note:"Termin = запись на приём"},
      {q:"Waren Sie schon einmal hier?",                      a:"Ja, ich war schon mal bei Ihnen.",                   note:"schon mal = уже как-то раз"},
      {q:"Geht es bei Ihnen am Montag um 10 Uhr?",           a:"Nein, da kann ich leider nicht. Ich muss arbeiten.", note:"leider = к сожалению"},
      {q:"Was fehlt Ihnen denn?",                             a:"Mir geht es schlecht. Ich bin erkältet.",            note:"Was fehlt? = Что беспокоит?"},
      {q:"Haben Sie Husten oder Schnupfen?",                  a:"Ja, beides. Und ich habe etwas Fieber.",            note:"beides = и то и другое"},
      {q:"Machen Sie bitte den Mund auf.",                    a:"Ihr Hals ist rot. Sie haben eine Erkältung.",       note:"aufmachen = открывать · rot = красный"},
      {q:"Sie sollen viel Tee trinken und schlafen.",         a:"Muss ich auch Tabletten nehmen?",                   note:"sollen = по назначению врача"},
      {q:"Am Freitag kommen Sie noch einmal zur Kontrolle.",  a:"Vielen Dank, Frau Doktor. Auf Wiedersehen!",        note:"Kontrolle = контрольный осмотр"},
      {q:"Holst du mich morgen ab?",                         a:"Ja, klar. Wann soll ich dich abholen?",             note:"mich / dich — Akkusativ Personalpronomen"},
      {q:"Rufst du deinen Chef an?",                         a:"Ja, ich rufe ihn an.",                              note:"ihn = er (Akkusativ)"},
    ]},
    {tag:"Дополнительные",col:C.purple,pairs:[
      {q:"Haben Sie viel Stress im Beruf?",                  a:"Ja, meine Arbeit ist sehr anstrengend.",            note:"anstrengend = изматывающий"},
      {q:"Rauchen Sie?",                                     a:"Nein, ich rauche nicht. / Ja, leider.",             note:"rauchen = курить"},
      {q:"Haben Sie Allergien?",                             a:"Ja, gegen Penicillin. / Nein, keine Allergien.",    note:"die Allergie + gegen = против"},
      {q:"Das war Zufall!",                                  a:"Was für ein Zufall! / So ein Zufall!",              note:"der Zufall = случайность"},
      {q:"Gute Besserung!",                                  a:"Danke schön! Das brauche ich!",                     note:"Gute Besserung! = выздоравливайте!"},
      {q:"Du solltest mehr schlafen.",                       a:"Ich weiß, aber ich habe keine Zeit.",               note:"sollte = Konjunktiv II, мягкий совет"},
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
              <span style={{width:23,height:23,borderRadius:6,background:C.ov4,
                fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
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
  const [fm,setFm]=useState("f"); // formell/informell — для L1 и L4
  const [openItems,setOpenItems]=useState(new Set());
  const togItem=(k)=>setOpenItems(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n;});

  const hasFmToggle=lId==="L1"||lId==="L4";
  // фильтр по fm: показываем пары без fm (оба) ИЛИ совпадающие с выбранным режимом
  const filterFm=(pairs)=>hasFmToggle?pairs.filter(p=>!p.fm||p.fm===fm):pairs;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <Box c={C.teal}>
        <H c={C.teal}>💬 Диалоговые фразы</H>
        <div style={{fontSize:13,color:C.muted}}>Нажми на вопрос — увидишь ответ. Список пополняется с каждым уроком.</div>
      </Box>

      {/* ── Вопросы / Фразы табы ── */}
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
        const showFmHere=hasFmToggle&&(g.tag==="Основные"||(lId==="L4"&&g.tag==="Дополнительные"));
        return(
          <div key={gi}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <Pill c={g.col}>{g.tag}</Pill>
              {showFmHere&&(
                <div style={{display:"flex",gap:4}}>
                  {[{id:"f",label:"Formell"},{id:"i",label:"Informell"}].map(t=>(
                    <button key={t.id} onClick={()=>{setFm(t.id);setOpenItems(new Set());}} style={{
                      padding:"3px 10px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,
                      border:`1.5px solid ${fm===t.id?g.col:C.border}`,
                      background:fm===t.id?g.col+"22":"transparent",
                      color:fm===t.id?g.col:C.muted
                    }}>{t.label}</button>
                  ))}
                </div>
              )}
            </div>
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
                {p.note&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>📝 {p.note}</div>}
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
      <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,padding:"0 0 4px"}}>Bewertung — Оценка</div>
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
              <div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,padding:"6px 10px",background:C.card2,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
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
                          <span style={{color:C.muted}}>→</span>
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
    {id:"Tageszeiten",label:"🕐 Tageszeiten",col:C.orange},
    {id:"Kursraum", label:"🏫 Kursraum",   col:C.blue},
    {id:"Alltag",   label:"🛒 Alltag",     col:C.red},
    {id:"Möbel",    label:"🛋️ Möbel",     col:C.purple},
    {id:"Küche",    label:"🍳 Küche",      col:C.orange},
    {id:"Bad",      label:"🚿 Bad",         col:C.purple},
    {id:"Wohnung",  label:"🏠 Wohnung",    col:C.green},
    {id:"Familie",  label:"👨‍👩‍👧 Familie",   col:C.purple},
    {id:"Adjektive",label:"🎨 Adjektive",  col:C.red},
    {id:"Phrase",   label:"💬 Фразы",      col:C.teal},
    {id:"Trennbare Verben",label:"✂️ Trennbare Verben",col:C.green},
    {id:"Lebensmittel",   label:"🍎 Lebensmittel",    col:C.green},
    {id:"Arbeit",         label:"💼 Arbeit",            col:C.blue},
    {id:"Gesundheit",     label:"🏥 Gesundheit",        col:C.red},
    {id:"Körper",         label:"🫀 Körper",             col:C.purple},
    {id:"Berufe",         label:"👔 Berufe",              col:C.orange},
    {id:"Notruf",         label:"🚨 Notruf",              col:C.red},
    {id:"Verkehrsmittel", label:"🚗 Verkehrsmittel",      col:C.blue},
    {id:"InDerStadt",     label:"🏙️ In der Stadt",        col:C.teal},
    {id:"Fuehrerschein",  label:"🚦 Führerschein",         col:C.orange},
    {id:"MeinLeben",      label:"👤 Mein Leben",            col:C.purple},
  ];
  const TYPEN=[
    {id:"all",     label:"Все",           col:C.teal},
    {id:"Nomen",   label:"📦 Nomen",      col:C.blue},
    {id:"Adjektiv",label:"🎨 Adjektiv",   col:C.red},
    {id:"Phrase",  label:"💬 Фразы",      col:C.teal},
  ];
  const [typ,setTyp]=useState("all");
  const [tema,setTema]=useState("all");
  const [art,setArt]=useState("all");
  const [selPref,setSelPref]=useState("all");
  const [search,setSearch]=useState("");
  const [sortNew,setSortNew]=useState(true);
  const [openConj,setOpenConj]=useState(null);
  const [konjTab,setKonjTab]=useState("pres");

  const changeTyp=(t)=>{setTyp(t);setTema("all");setArt("all");setSelPref("all");};
  const changeTema=(t)=>{setTema(t);setArt("all");setSelPref("all");};
  const isTrennbar=tema==="Trennbare Verben";
  const trennbarPrefs=PREF_LIST.filter(p=>WBDATA.some(w=>w.tema==="Trennbare Verben"&&getVerbPref(w.de)===p));

  const typFilter=(w)=>{
    if(typ==="all")     return true;
    if(typ==="Nomen")   return w.art!==""&&w.art!==undefined&&!["Adjektive","Phrase"].includes(w.tema);
    if(typ==="Adjektiv")return w.tema==="Adjektive";
    if(typ==="Phrase")  return w.tema==="Phrase";
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
  const availableTemenRaw=TEMEN.filter(t=>{
    if(t.id==="all") return true;
    return !["Adjektive","Phrase"].includes(t.id);
  });
  const availableTemen=[
    availableTemenRaw[0],
    ...[...availableTemenRaw.slice(1)].reverse(),
  ];

  const listRaw=WBDATA.map((w,i)=>({...w,_i:i})).filter(w=>
    typFilter(w)&&
    (tema==="all"||w.tema===tema)&&
    (art==="all"||w.art===art)&&
    (selPref==="all"||getVerbPref(w.de)===selPref)&&
    (!search||w.de.toLowerCase().includes(search.toLowerCase())||w.ru.toLowerCase().includes(search.toLowerCase()))
  );
  const list=sortNew?[...listRaw].reverse():listRaw;

  const temenOrder=[...TEMEN.slice(1)].reverse();
  const groups=tema==="all"
    ?temenOrder.map(t=>({...t,words:list.filter(w=>w.tema===t.id)})).filter(g=>g.words.length>0)
    :isTrennbar&&selPref==="all"
      ?PREF_LIST.filter(p=>trennbarPrefs.includes(p)).map(p=>({id:p,col:PREF_COLORS[p].col,bg:PREF_COLORS[p].bg,label:p+"-",words:list.filter(w=>getVerbPref(w.de)===p)})).filter(g=>g.words.length>0)
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
    const ipa=w.ipa||IPA_DATA[w.de];
    const[stem,end]=getPluralEnd(w.de,w.pl);
    const isAdj=w.art==="";
    const opposite=isAdj?oppMap[w.de]:null;
    const oppRu=opposite?oppTransMap[opposite]:null;
    const verbPref=w.tema==="Trennbare Verben"?getVerbPref(w.de):"";
    const pc=verbPref?PREF_COLORS[verbPref]:null;
    const konj=KONJ_ALL[w.de];
    const isOpen=openConj===w.de;
    const stacked=ipa&&w.de.length>10;
    const imp=konj&&!konj.noImp&&(konj.imp||(()=>{
      if(konj.pref){
        const pref=konj.pref;
        const sep=` \u2026 ${pref}`;
        const duRaw=konj.du.replace(sep,"");
        const duStem=duRaw.replace(/(?:e)?st$/,"");
        const duFixed=konj.note&&konj.note.includes("a\u2192\u00E4")
          ?duStem.replace(/\u00E4/g,"a"):duStem;
        const ihrRaw=konj.ihr.replace(sep,"");
        const stem=w.de.slice(pref.length);
        return{
          du:duFixed[0].toUpperCase()+duFixed.slice(1)+" "+pref+"!",
          ihr:ihrRaw[0].toUpperCase()+ihrRaw.slice(1)+" "+pref+"!",
          Sie:stem[0].toUpperCase()+stem.slice(1)+" Sie "+pref+"!"
        };
      }
      const infStem=w.de.replace(/en$/,"");
      const duStr=konj.du;
      const duStem0=/[sßz]$/.test(infStem)?duStr.slice(0,-1):duStr.slice(0,-2);
      const duStem=konj.type&&konj.type.includes("a→ä")?duStem0.replace(/ä/g,"a"):duStem0;
      return{
        du:duStem[0].toUpperCase()+duStem.slice(1)+"!",
        ihr:konj.ihr[0].toUpperCase()+konj.ihr.slice(1)+"!",
        Sie:w.de[0].toUpperCase()+w.de.slice(1)+" Sie!"
      };
    })());
    const hiCell=(p)=>konj?.note&&konj.note.includes("→")&&(p==="du"||p==="er/sie/es");
    if(w.tema==="Phrase")return(
      <div style={{padding:"8px 10px",borderBottom:`1px solid ${C.border}22`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <span style={{fontSize:13,color:C.teal,fontWeight:600,fontStyle:"italic"}}>{STRESS_MARKS[w.de]||w.de}</span>
        <span style={{fontSize:12,color:C.text,textAlign:"right"}}>{w.ru}</span>
      </div>
    );
    return(
      <div style={{borderBottom:`1px solid ${C.border}22`}}>
        <div style={{display:"grid",
          gridTemplateColumns:"minmax(min-content,1fr) 1fr",
          gap:8,
          padding:"7px 8px",alignItems:"center",
          cursor:konj?"pointer":"default",
          background:isOpen?konj.col+"11":"transparent"}}
          onClick={konj?()=>{setOpenConj(isOpen?null:w.de);setKonjTab("pres");}:undefined}>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:5,minWidth:0}}>
            {(pc||w.art)&&(pc
              ?<span style={{background:pc.bg,border:`1px solid ${pc.col}55`,color:pc.col,
                  borderRadius:5,padding:"1px 5px",fontWeight:800,fontSize:11}}>{verbPref}-</span>
              :<span style={{background:AB(w.art),border:`1px solid ${AC(w.art)}55`,color:AC(w.art),
                  borderRadius:5,padding:"1px 5px",fontWeight:800,fontSize:11}}>{w.art}</span>
            )}
            <div style={{display:"flex",alignItems:"center",gap:2}}>
              <span style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",
                color:konj?(isOpen?konj.col:C.text):C.text,
                textDecoration:konj?"underline dotted":"none",
                textDecorationColor:konj?konj.col+"88":"transparent",
                textUnderlineOffset:3}}>
                {STRESS_MARKS[w.de]||w.de}
                {w.pl&&w.pl!=="—"&&<span style={{fontSize:11,fontWeight:400,color:C.muted,marginLeft:4,whiteSpace:"nowrap"}}>
                  {"("}
                  {w.pl===w.de
                    ?<span style={{color:C.green,fontWeight:800}}>-</span>
                    :end
                      ?<span style={{color:C.green,fontWeight:800}}>-{end}</span>
                      :w.pl.toLowerCase().startsWith(w.de.toLowerCase())
                        ?<span style={{color:C.green,fontWeight:800}}>-{w.pl.slice(w.de.length)}</span>
                        :w.pl
                  }
                  {")"}
                </span>}
              </span>
              {konj&&<span style={{fontSize:11,color:konj.col,marginLeft:1,opacity:0.8}}>{isOpen?"▲":"▾"}</span>}
            </div>
          </div>
          <div style={{fontSize:12,lineHeight:1.3,overflowWrap:"break-word",wordBreak:"break-word"}}>
            {isAdj
              ?<><span style={{color:C.text}}>{w.ru}</span>{oppRu&&<span style={{color:C.orange}}> / {oppRu}</span>}</>
              :<RuText ru={w.ru} style={{color:C.text}}/>
            }
          </div>
        </div>
        {konj&&isOpen&&(
          <div style={{background:konj.col+"0d",padding:"8px 10px",borderTop:`1px solid ${konj.col}22`}}>
            {/* Tab bar */}
            <div style={{display:"flex",gap:3,marginBottom:8,flexWrap:"wrap"}}>
              {[
                ["Präsens","pres",true],
                ["Imperativ","imp",!konj.noImp],
                ["Präteritum","praet",!!konj.pt],
                ["Perfekt","pf",!!konj.pf],
              ].filter(([,,show])=>show).map(([label,val])=>(
                <button key={val} onClick={()=>setKonjTab(val)}
                  style={{flex:1,padding:"5px 0",borderRadius:7,cursor:"pointer",fontWeight:700,fontSize:11,
                    border:`1px solid ${konjTab===val?konj.col:C.border}`,
                    background:konjTab===val?konj.col+"22":"transparent",
                    color:konjTab===val?konj.col:C.muted}}>
                  {label}
                </button>
              ))}
            </div>
            {/* Word badge + note */}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <span style={{background:konj.col+"22",border:`1px solid ${konj.col}55`,color:konj.col,
                borderRadius:6,padding:"2px 10px",fontSize:12,fontWeight:800}}>{w.de}</span>
              {konj.pref&&<span style={{fontSize:11,color:C.muted}}>приставка: <b style={{color:konj.col}}>{konj.pref}-</b></span>}
              {konj.note&&<span style={{fontSize:11,color:C.orange}}>⚡ {konj.note}</span>}
            </div>
            {/* Präsens */}
            {konjTab==="pres"&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {[["ich",konj.ich],["wir",konj.wir],["du",konj.du],["ihr",konj.ihr],["er/sie/es",konj["er/sie/es"]],["sie/Sie",konj["sie/Sie"]]].map(([p,f])=>{
                  const hi=hiCell(p);
                  return(
                    <div key={p} style={{background:hi?konj.bg:C.card2,
                      border:`1px solid ${hi?konj.col+"55":C.border}`,borderRadius:7,padding:"5px 8px"}}>
                      <div style={{fontSize:11,color:hi?konj.col:C.muted,marginBottom:1}}>{p}</div>
                      <div style={{color:hi?konj.col:C.text,fontWeight:700,fontSize:13}}>{f}</div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Imperativ */}
            {konjTab==="imp"&&imp&&(
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {[
                  ["du","1 человек (неформ.)",C.teal],
                  ["ihr","группа (неформ.)",C.purple],
                  ["Sie","формально",C.orange],
                ].map(([key,hint,col])=>(
                  <div key={key} style={{display:"flex",alignItems:"center",gap:10,
                    background:col+"15",border:`1px solid ${col}33`,borderRadius:8,padding:"7px 10px"}}>
                    <span style={{fontSize:11,color:col,fontWeight:800,minWidth:28}}>{key}</span>
                    <span style={{fontSize:16,fontWeight:800,color:col,flex:1}}>{imp[key==="Sie"?"Sie":key]}</span>
                    <span style={{fontSize:11,color:C.muted}}>{hint}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Präteritum */}
            {konjTab==="praet"&&konj.pt&&(()=>{
              const ptStem=konj.pt.endsWith("te")?konj.pt.slice(0,-1):null;
              const forms=ptStem
                ?[["ich",konj.pt],["wir",ptStem+"en"],["du",ptStem+"est"],["ihr",ptStem+"et"],["er/sie/es",konj.pt],["sie/Sie",ptStem+"en"]]
                :[["ich",konj.pt],["wir",""],["du",""],["ihr",""],["er/sie/es",""],["sie/Sie",""]];
              return(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:6}}>
                    {forms.map(([p,f])=>(
                      <div key={p} style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 8px"}}>
                        <div style={{fontSize:11,color:C.muted,marginBottom:1}}>{p}</div>
                        <div style={{color:f?C.orange:C.muted,fontWeight:700,fontSize:13}}>{f||"—"}</div>
                      </div>
                    ))}
                  </div>
                  {!ptStem&&<div style={{fontSize:11,color:C.muted,padding:"5px 8px",background:C.card2,borderRadius:7}}>
                    ⚠️ Сильный глагол — Präteritum нужно запомнить
                  </div>}
                </div>
              );
            })()}
            {/* Perfekt */}
            {konjTab==="pf"&&konj.pf&&(()=>{
              const [hilf,...ppParts]=konj.pf.split(" ");
              const pp=ppParts.join(" ");
              return(
                <div>
                  <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
                    borderRadius:9,padding:"10px 14px",marginBottom:8,textAlign:"center"}}>
                    <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Perfekt = {hilf} + Partizip II</div>
                    <div style={{fontSize:18,fontWeight:800,color:C.text}}>
                      <span style={{color:C.orange}}>{hilf}</span>
                      <span style={{color:C.muted}}> … </span>
                      <span style={{color:C.purple}}>{pp}</span>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    {[["ich",hilf==="hat"?"habe":"bin"],["wir",hilf==="hat"?"haben":"sind"],
                      ["du",hilf==="hat"?"hast":"bist"],["ihr",hilf==="hat"?"habt":"seid"],
                      ["er/sie/es",hilf],["sie/Sie",hilf==="hat"?"haben":"sind"]
                    ].map(([p,h])=>(
                      <div key={p} style={{background:C.card2,borderRadius:7,padding:"5px 8px"}}>
                        <div style={{fontSize:11,color:C.muted,marginBottom:1}}>{p}</div>
                        <div style={{fontSize:12,color:C.text}}>
                          <span style={{color:C.orange,fontWeight:700}}>{h}</span>
                          <span style={{color:C.muted}}> … </span>
                          <span style={{color:C.purple,fontWeight:700}}>{pp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
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
              :<div style={{color:C.muted,fontSize:12}}>—</div>
            }
          </div>
        </div>
      ))}
    </div>
  );

  const showArtFilter=(typ==="all"||typ==="Nomen")&&!isTrennbar;
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
          <button key={t.id} onClick={()=>changeTema(t.id)}
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
      {isTrennbar&&typ!=="recent"&&(
        <div style={{display:"flex",gap:5,marginBottom:8,overflowX:"auto",paddingBottom:2,scrollbarWidth:"none"}}>
          {[{id:"all",label:"Все",col:C.teal,bg:C.tealBg},
            ...trennbarPrefs.map(p=>({id:p,label:p+"-",...PREF_COLORS[p]}))
          ].map(p=>(
            <button key={p.id} onClick={()=>setSelPref(p.id)}
              style={{flexShrink:0,padding:"5px 12px",borderRadius:9,fontWeight:700,fontSize:13,cursor:"pointer",
                border:`1.5px solid ${selPref===p.id?p.col:C.border}`,
                background:selPref===p.id?p.bg:C.card,
                color:selPref===p.id?p.col:C.muted}}>
              {p.label}
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
        <div style={{display:"grid",gridTemplateColumns:"minmax(min-content,1fr) 1fr",gap:8,padding:"4px 8px",marginBottom:2}}>
          {["Слово","Перевод"].map(h=>(
            <div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
          ))}
        </div>
      )}

      {/* ══ ПОСЛЕДНИЕ ══ */}
      {typ==="all"&&tema==="all"&&art==="all"&&selPref==="all"&&(
        <div style={{background:C.card,border:`1px solid ${C.teal}35`,borderRadius:12,overflow:"hidden"}}>
          <div style={{background:C.teal+"15",padding:"8px 12px",borderBottom:`1px solid ${C.teal}25`}}>
            <span style={{fontSize:12,color:C.teal,fontWeight:700}}>🆕 Все слова · новые сначала</span>
            <span style={{fontSize:11,color:C.muted,marginLeft:8}}>{WBDATA.length} слов</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"minmax(min-content,1fr) 1fr",gap:8,padding:"4px 8px"}}>
            {["Слово","Перевод"].map(h=>(
              <div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{h}</div>
            ))}
          </div>
          {dedupeAdj(recentWords,!!search).map((w,i)=><WRow key={w.de+w.tema+i} w={w}/>)}
        </div>
      )}
      {!(typ==="all"&&tema==="all"&&art==="all"&&selPref==="all")&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
        {groups.map(g=>(
          <div key={g.id} style={{background:C.card,border:`1px solid ${g.col}35`,borderRadius:12,overflow:"hidden"}}>
            {(tema==="all"||(isTrennbar&&selPref==="all"))&&(
              <div style={{background:g.col+"15",padding:"6px 10px",borderBottom:`1px solid ${g.col}25`}}>
                <span style={{fontSize:12,color:g.col,fontWeight:700}}>
                  {tema==="all"?TEMEN.find(t=>t.id===g.id)?.label:g.label}
                </span>
                <span style={{fontSize:11,color:C.muted,marginLeft:8}}>{g.words.length} слов</span>
              </div>
            )}
            {g.id==="Adjektive"&&!search
              ?<><AdjPaare/><BewertungBlock/></>
              :dedupeAdj(g.words,!!search).map((w,i)=><WRow key={w.de+w.tema+i} w={w}/>)
            }
          </div>
        ))}
      </div>}
      <div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:10}}>{list.length} слов</div>
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
        {!flip?(<><div style={{fontSize:12,color:C.muted,marginBottom:12}}>👆 нажми</div><div style={{fontSize:36,fontWeight:900,color:C.text}}>{w.de}</div><div style={{fontSize:12,color:C.muted,marginTop:6}}>die {w.pl}</div></>)
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
      {chosen.length===0?<span style={{color:C.muted,fontSize:13}}>Нажимай слова снизу...</span>
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
            <div style={{fontSize:11,color:C.muted}}>{a.n}</div>
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
    <Box c={C.purple}>
      <H c={C.purple} z={13}>📐 Zahlen 13–19: Muster</H>
      <div style={{fontSize:12,color:C.muted,marginBottom:8}}>13–19 = Zahl + <b style={{color:C.purple}}>zehn</b></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        {[["3 + zehn","dreizehn"],["4 + zehn","vierzehn"],["5 + zehn","fünfzehn"],
          ["6 + zehn","sechzehn ⚠️"],["7 + zehn","siebzehn ⚠️"],["8 + zehn","achtzehn"],
          ["9 + zehn","neunzehn"]].map(([rule,word])=>(
          <div key={word} style={{display:"flex",gap:6,background:C.card2,borderRadius:6,padding:"5px 8px",fontSize:12}}>
            <span style={{color:C.muted,flex:1}}>{rule}</span>
            <span style={{color:C.purple,fontWeight:700}}>{word}</span>
          </div>
        ))}
      </div>
      <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,borderRadius:7,
        padding:"7px 10px",marginTop:6,fontSize:11,color:C.muted}}>
        ⚠️ Исключения: <b style={{color:C.orange}}>sech</b>zehn (не sechszehn) · <b style={{color:C.orange}}>sieb</b>zehn (не siebenzehn)
      </div>
    </Box>
    <Box c={C.teal}>
      <H c={C.teal} z={13}>📐 Zahlen 21–99: Muster</H>
      <div style={{fontSize:12,color:C.muted,marginBottom:8}}>
        Единицы <b style={{color:C.orange}}>+und+</b> Десятки (сначала единицы!)
      </div>
      <div style={{background:C.card2,borderRadius:8,padding:"10px 12px",marginBottom:8,textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:800,color:C.teal,marginBottom:4}}>
          <span style={{color:C.orange}}>ein</span>
          <span style={{color:C.muted}}>und</span>
          <span style={{color:C.teal}}>zwanzig</span>
          <span style={{color:C.muted}}> = 21</span>
        </div>
        <div style={{fontSize:11,color:C.muted}}>единица + und + десяток</div>
      </div>
      {[["20","zwanzig"],["30","dreißig ⚠️"],["40","vierzig"],["50","fünfzig"],
        ["60","sechzig ⚠️"],["70","siebzig ⚠️"],["80","achtzig"],["90","neunzig"]].map(([n,w])=>(
        <div key={n} style={{display:"flex",justifyContent:"space-between",
          background:C.card2,borderRadius:6,padding:"5px 10px",marginBottom:4,fontSize:12}}>
          <span style={{color:C.muted}}>{n}</span>
          <span style={{color:C.teal,fontWeight:700}}>{w}</span>
        </div>
      ))}
      <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,borderRadius:7,
        padding:"7px 10px",marginTop:4,fontSize:11,color:C.muted}}>
        ⚠️ 30 = drei<b style={{color:C.orange}}>ßig</b> · 60 = sech<b style={{color:C.orange}}>zig</b> · 70 = sieb<b style={{color:C.orange}}>zig</b>
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
  const rows=[["ich",c.ich],["du",c.du],["er/sie/es",c["er/sie/es"]],["wir",c.wir],["ihr",c.ihr],["sie/Sie",c["sie/Sie"]]];
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
          {[["ich",c.ich],["wir",c.wir],["du",c.du],["ihr",c.ihr],["er/sie/es",c["er/sie/es"]],["sie/Sie",c["sie/Sie"]]].map(([p,f])=>(
            <div key={p} style={{background:p==="er/sie/es"?C.greenBg:C.card2,border:p==="er/sie/es"?`1px solid ${C.green}40`:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:11,color:p==="er/sie/es"?C.green:C.muted,marginBottom:2}}>{p}</div>
              <div style={{color:p==="er/sie/es"?C.green:C.text,fontWeight:700,fontSize:15}}>{f}</div>
            </div>
          ))}
        </div>
      </Box>
      <Box>
        <H c={C.text} z={14}>🌍 Nationalitäten</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:6}}>
          {["Land","m","f","Sprache"].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
        </div>
        {NATS.map(n=>(
          <div key={n.land} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:4}}>
            <div style={{background:C.card2,borderRadius:7,padding:"5px 7px",fontSize:12,color:C.blue}}>{n.land}{n.art&&<span style={{color:C.muted,fontSize:11}}> ({n.art})</span>}</div>
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
          <div key={i} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>
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
            <div style={{color:col,fontSize:11,opacity:.8}}>{term}</div>
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
          {["Wort","Verb","Rest"].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
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
const KONJ_HABEN={ich:"habe",du:"hast","er/sie/es":"hat",wir:"haben",ihr:"habt","sie/Sie":"haben"};
const KONJ_BRAUCHEN={ich:"brauche",du:"brauchst","er/sie/es":"braucht",wir:"brauchen",ihr:"braucht","sie/Sie":"brauchen"};
const KONJ_KAUFEN={ich:"kaufe",du:"kaufst","er/sie/es":"kauft",wir:"kaufen",ihr:"kauft","sie/Sie":"kaufen"};

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
          {["m (der)","n (das)","f (die)"].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
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
          {[["ich",KONJ_HABEN.ich],["wir",KONJ_HABEN.wir],["du",KONJ_HABEN.du],["ihr",KONJ_HABEN.ihr],["er/sie/es",KONJ_HABEN["er/sie/es"]],["sie/Sie",KONJ_HABEN["sie/Sie"]]].map(([p,f])=>(
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
          {["","m","n","f","Pl."].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
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
      <Box c={C.green}>
        <H c={C.green} z={13}>✅ Глаголы, всегда требующие Akkusativ</H>
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>После этих глаголов → всегда Wen? / Was? → Akkusativ:</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[["haben","иметь"],["kaufen","покупать"],["brauchen","нужен"],["suchen","искать"],
            ["essen","есть"],["trinken","пить"],["nehmen","брать"],["sehen","видеть"],
            ["mögen","любить"],["kennen","знать"],["lesen","читать"],["schreiben","писать"],
            ["hören","слышать"],["finden","находить"]].map(([v,ru])=>(
            <div key={v} style={{display:"flex",gap:6,background:C.card2,borderRadius:6,padding:"4px 8px",fontSize:12}}>
              <span style={{color:C.green,fontWeight:700,minWidth:55}}>{v}</span>
              <span style={{color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.card2,borderRadius:7,padding:"7px 10px",marginTop:8,fontSize:12}}>
          💡 <b>Тест:</b> задай вопрос к дополнению:<br/>
          "Ich kaufe _den_ Laptop." → Ich kaufe <b style={{color:C.orange}}>wen/was</b>? → <b style={{color:C.orange}}>den</b> Laptop ✓ (Akkusativ)
        </div>
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
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>👆 Нажми на слово — увидишь перевод</div>
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
              {b!=="—"&&<><span style={{color:C.muted}}>↔</span><span style={{color:C.red,fontSize:13,minWidth:80}}>{b}</span></>}
              <span style={{color:C.muted,fontSize:12,flex:1}}>{ru}</span>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.teal}>
        <H c={C.teal} z={13}>💬 Мнения (Meinungen)</H>
        <div style={{fontSize:11,color:C.muted,marginBottom:6}}>👆 Нажми на слово — увидишь перевод</div>
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
          {["Pronomen","Possessiv","Значение"].map(h=><div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center"}}>{h}</div>)}
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
      <Box c={C.blue}>
        <H c={C.blue} z={13}>📊 Полная таблица: Nom. und Akk.</H>
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>Окончания как у ein/kein (пример: mein)</div>
        <div style={{display:"grid",gridTemplateColumns:"auto 1fr 1fr 1fr 1fr",gap:"3px 6px",alignItems:"center"}}>
          {["","m","n","f","Pl."].map(h=>(
            <div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center",paddingBottom:4}}>{h}</div>
          ))}
          {[
            ["Nom.","mein","mein","meine","meine"],
            ["Akk.","meinen ⚠️","mein","meine","meine"],
            ["Dat.","meinem","meinem","meiner","meinen"],
          ].map(([kasus,...forms])=>(
            <Fragment key={kasus}>
              <div style={{fontSize:11,color:C.muted,fontWeight:700}}>{kasus}</div>
              {forms.map((f,i)=>(
                <div key={i} style={{background:f.includes("⚠️")?C.orange+"22":C.card2,
                  border:`1px solid ${f.includes("⚠️")?C.orange:C.border}33`,
                  borderRadius:5,padding:"3px 5px",textAlign:"center",
                  fontSize:11,color:f.includes("⚠️")?C.orange:C.text,fontWeight:f.includes("⚠️")?700:400}}>
                  {f.replace(" ⚠️","")}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:8}}>
          ⚠️ Меняется только <b style={{color:C.orange}}>m в Akkusativ</b>: mein → mein<b style={{color:C.orange}}>en</b>
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
            color:sel===null?C.muted:sel===q.ans?C.green:C.red,
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
              <span style={{width:23,height:23,borderRadius:6,background:C.ov4,
                fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
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
          <div style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center",marginBottom:2,textTransform:"uppercase",letterSpacing:1}}>{leftLabel}</div>
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
          <div style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center",marginBottom:2,textTransform:"uppercase",letterSpacing:1}}>{rightLabel}</div>
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
          ?<span style={{color:C.muted,fontSize:13}}>Нажимай слова снизу...</span>
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
      <div style={{fontSize:11,color:C.muted,textAlign:"center",marginBottom:12}}>
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

// ─── L4C — PRÄTERITUM HABEN/SEIN ─────────────────────────────────────────────
const Q_L4C=[
  {q:"haben (Prät.) → ich ...",           opts:["habe","hatte","hatten","hattest"],    ans:1, exp:"ich hatte",                           hint:"Präteritum"},
  {q:"sein (Prät.) → ich ...",            opts:["bin","war","wäre","ware"],             ans:1, exp:"ich war",                             hint:"Präteritum"},
  {q:"haben (Prät.) → du ...",            opts:["hast","hatte","hattest","hatten"],    ans:2, exp:"du hattest",                          hint:"Präteritum"},
  {q:"sein (Prät.) → du ...",             opts:["bist","warst","wart","waren"],         ans:1, exp:"du warst",                            hint:"Präteritum"},
  {q:"haben (Prät.) → er/sie ...",        opts:["hat","hatte","hatten","hattest"],     ans:1, exp:"er/sie hatte",                        hint:"Präteritum"},
  {q:"sein (Prät.) → wir ...",            opts:["sind","war","wart","waren"],           ans:3, exp:"wir waren",                           hint:"Präteritum"},
  {q:"sein (Prät.) → ihr ...",            opts:["seid","waren","wart","ward"],          ans:2, exp:"ihr wart — не waren!",               hint:"⚠️ Achtung"},
  {q:"haben (Prät.) → sie/Sie ...",       opts:["haben","hatte","hattet","hatten"],    ans:3, exp:"sie/Sie hatten",                      hint:"Präteritum"},
  {q:"'Früher ___ mein Vater Arzt.' (sein)",  opts:["ist","hatte","war","waren"],      ans:2, exp:"war — Präteritum von sein",           hint:"Satz"},
  {q:"'Wir ___ drei Geschwister.' (haben)",   opts:["haben","hatten","hattet","hatte"],ans:1, exp:"hatten — Präteritum von haben",       hint:"Satz"},
  {q:"'Das ___ schön.' (sein)",                opts:["ist","war","waren","wart"],       ans:1, exp:"war — das/es → war",                  hint:"Satz"},
  {q:"'Sie ___ viel Arbeit.' (haben)",         opts:["hat","hatte","hatten","hattest"],ans:1, exp:"hatte — sie (она) → hatte",           hint:"Satz"},
];

// ─── L4B — VERBEN MIT VOKALWECHSEL ───────────────────────────────────────────
const Q_L4B=[
  {q:"schlafen → er/sie/es ...",        opts:["schlaffe","schläft","schlaft","schläfft"],  ans:1, exp:"a→ä: schlafen → schläft",              hint:"Vokalwechsel"},
  {q:"essen → er/sie/es ...",           opts:["essst","esst","isst","ißt"],                ans:2, exp:"e→i: essen → isst",                    hint:"Vokalwechsel"},
  {q:"sehen → er/sie/es ...",           opts:["seht","sieht","sehst","siehst"],            ans:1, exp:"e→ie: sehen → sieht",                  hint:"Vokalwechsel"},
  {q:"lesen → er/sie/es ...",           opts:["lesst","liesst","lest","liest"],            ans:3, exp:"e→ie: lesen → liest",                  hint:"Vokalwechsel"},
  {q:"sprechen → du ...",               opts:["sprechst","spricht","sprichst","spreche"],  ans:2, exp:"e→i: sprechen → du sprichst",           hint:"Vokalwechsel"},
  {q:"fahren → er/sie/es ...",          opts:["fährt","fahrt","fahrst","fährest"],         ans:0, exp:"a→ä: fahren → fährt",                  hint:"Vokalwechsel"},
  {q:"nehmen → er/sie/es ...",          opts:["nehmt","nimmt","nehmst","nimt"],            ans:1, exp:"nehmen → nimmt (особая форма!)",        hint:"Vokalwechsel"},
  {q:"treffen → er/sie/es ...",         opts:["trefft","triffst","trifft","treffe"],       ans:2, exp:"e→i: treffen → trifft",                hint:"Vokalwechsel"},
  {q:"Katharina ___ ein Buch. (lesen)", opts:["lest","liest","lese","lesst"],              ans:1, exp:"lesen → sie liest",                    hint:"Satz"},
  {q:"Herr Fischer ___ einen Film. (sehen)", opts:["seht","sieht","sehe","sehst"],         ans:1, exp:"sehen → er sieht",                     hint:"Satz"},
  {q:"'Ich fahre nach Berlin.' → nach Berlin = ...", opts:["где я","куда я еду","когда","с кем"], ans:1, exp:"Wohin? → nach + Stadt (движение)", hint:"Wo/Wohin"},
  {q:"'Sie ist in Berlin.' → in Berlin = ...",       opts:["куда она идёт","где она находится","когда","зачем"], ans:1, exp:"Wo? → in + Stadt (нахождение)", hint:"Wo/Wohin"},
];

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
                  <th key={label} style={{padding:"3px 4px",textAlign:"center",fontSize:11,fontWeight:900,color:col,opacity:0.75}}>{label}</th>
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
      <Box c={C.green}>
        <H c={C.green}>👨‍👩‍👧 Erweiterte Familie</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 8px",marginBottom:10}}>
          {[
            ["der Onkel","дядя","die Tante","тётя"],
            ["der Cousin","двоюродный брат","die Cousine","двоюродная сестра"],
            ["der Neffe","племянник","die Nichte","племянница"],
          ].map(([m,mr,f,fr])=>(
            <>
              <div key={m} style={{background:C.blueBg,border:`1px solid ${C.blue}30`,borderRadius:8,padding:"7px 10px"}}>
                <div style={{fontSize:11,color:C.blue,fontWeight:700,marginBottom:1}}>der</div>
                <div style={{fontSize:13,color:C.text,fontWeight:700}}>{m}</div>
                <div style={{fontSize:11,color:C.muted}}>{mr}</div>
              </div>
              <div key={f} style={{background:C.purpleBg,border:`1px solid ${C.purple}30`,borderRadius:8,padding:"7px 10px"}}>
                <div style={{fontSize:11,color:C.purple,fontWeight:700,marginBottom:1}}>die</div>
                <div style={{fontSize:13,color:C.text,fontWeight:700}}>{f}</div>
                <div style={{fontSize:11,color:C.muted}}>{fr}</div>
              </div>
            </>
          ))}
        </div>
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.text,lineHeight:1.9}}>
          Schwester + Bruder = <b style={{color:C.green}}>Geschwister</b> (мн.ч.)<br/>
          Mutter + Vater = <b style={{color:C.green}}>Eltern</b> (мн.ч.)<br/>
          Großmutter + Großvater = <b style={{color:C.green}}>Großeltern</b> (мн.ч.)<br/>
          Tante + Onkel → Kinder = <b style={{color:C.green}}>Cousine / Cousin</b><br/>
          Geschwister → Kinder = <b style={{color:C.green}}>Nichte / Neffe</b>
        </div>
      </Box>
    </div>
  );
}

function T4B(){
  const [sel,setSel]=useState("sprechen");
  const c=KONJ_L4B[sel];
  const groups=[
    {type:"e → i",col:C.orange,verbs:[
      {inf:"sprechen",du:"sprichst",er:"spricht"},
      {inf:"essen",   du:"isst",    er:"isst"},
      {inf:"nehmen",  du:"nimmst",  er:"nimmt"},
      {inf:"treffen", du:"triffst", er:"trifft"},
    ]},
    {type:"e → ie",col:C.blue,verbs:[
      {inf:"lesen",   du:"liest",   er:"liest"},
      {inf:"sehen",   du:"siehst",  er:"sieht"},
    ]},
    {type:"a → ä",col:C.purple,verbs:[
      {inf:"schlafen",du:"schläfst",er:"schläft"},
      {inf:"fahren",  du:"fährst",  er:"fährt"},
    ]},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>⚡ Verben mit Vokalwechsel</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>У некоторых глаголов меняется корневой гласный в формах <b style={{color:C.yellow}}>du</b> и <b style={{color:C.yellow}}>er/sie/es</b></div>
        <div style={{background:C.card2,borderRadius:8,padding:"8px 10px",fontSize:13,color:C.text,lineHeight:1.9}}>
          ich/wir/sie — обычная форма: <b style={{color:C.muted}}>spreche / sprechen</b><br/>
          <b style={{color:C.orange}}>⚠️ Изменение только у: du / er / es / sie (3-е л.)</b>
        </div>
      </Box>
      {groups.map(g=>(
        <Box key={g.type} c={g.col}>
          <H c={g.col} z={13}>{g.type}</H>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:6}}>
            {["Infinitiv","du","er/sie/es"].map(h=>(
              <div key={h} style={{fontSize:11,color:C.muted,fontWeight:700,textAlign:"center",textTransform:"uppercase"}}>{h}</div>
            ))}
          </div>
          {g.verbs.map(v=>(
            <div key={v.inf} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:5}}>
              <div style={{background:C.card2,borderRadius:7,padding:"6px 8px",fontSize:13,color:C.muted,fontWeight:600,textAlign:"center"}}>{v.inf}</div>
              <div style={{background:g.col+"18",border:`1px solid ${g.col}40`,borderRadius:7,padding:"6px 8px",fontSize:13,color:g.col,fontWeight:800,textAlign:"center"}}>{v.du}</div>
              <div style={{background:g.col+"18",border:`1px solid ${g.col}40`,borderRadius:7,padding:"6px 8px",fontSize:13,color:g.col,fontWeight:800,textAlign:"center"}}>{v.er}</div>
            </div>
          ))}
        </Box>
      ))}
      <Box c={C.yellow}>
        <H c={C.yellow}>📝 Verben mit Vokalwechsel — Konjugation</H>
        {/* Кнопки-глаголы */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {Object.entries(KONJ_L4B).map(([v,d])=>(
            <button key={v} onClick={()=>setSel(v)}
              style={{padding:"6px 12px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:13,
                border:`1px solid ${sel===v?d.col:C.border}`,
                background:sel===v?d.bg:C.card,
                color:sel===v?d.col:C.muted}}>
              {v}
            </button>
          ))}
        </div>
        {/* Бейдж типа + пометка */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
          <span style={{background:c.col+"22",border:`1px solid ${c.col}55`,color:c.col,
            borderRadius:6,padding:"2px 10px",fontSize:12,fontWeight:800}}>{c.type}</span>
          <span style={{fontSize:13,fontWeight:800,color:C.text}}>{sel}</span>
          {c.note&&<span style={{fontSize:11,color:C.orange}}>{c.note}</span>}
        </div>
        {/* Карточки 2×3 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[["ich",c.ich],["wir",c.wir],["du",c.du],["ihr",c.ihr],["er/sie/es",c["er/sie/es"]],["sie/Sie",c["sie/Sie"]]].map(([p,f])=>{
            const hi=p==="du"||p==="er/sie/es";
            return(
              <div key={p} style={{background:hi?c.bg:C.card2,
                border:`1px solid ${hi?c.col+"55":C.border}`,borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontSize:11,color:hi?c.col:C.muted,marginBottom:2}}>{p}</div>
                <div style={{color:hi?c.col:C.text,fontWeight:700,fontSize:15}}>{f}</div>
              </div>
            );
          })}
        </div>
      </Box>
      <Box c={C.green}>
        <H c={C.green} z={13}>📍 Wo? vs Wohin?</H>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
          <div style={{background:C.blueBg,border:`1px solid ${C.blue}40`,borderRadius:9,padding:"9px 10px",textAlign:"center"}}>
            <div style={{fontSize:11,color:C.blue,fontWeight:700,marginBottom:3}}>Wo? — где?</div>
            <div style={{fontSize:14,color:C.text,fontWeight:700}}>in Berlin</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Ich bin <b>in</b> Berlin. ⊙</div>
          </div>
          <div style={{background:C.orangeBg,border:`1px solid ${C.orange}40`,borderRadius:9,padding:"9px 10px",textAlign:"center"}}>
            <div style={{fontSize:11,color:C.orange,fontWeight:700,marginBottom:3}}>Wohin? — куда?</div>
            <div style={{fontSize:14,color:C.text,fontWeight:700}}>nach Berlin</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Ich fahre <b>nach</b> Berlin. →</div>
          </div>
        </div>
      </Box>
      <Box c={C.teal}>
        <H c={C.teal} z={13}>🚴 Wochenende-Aktivitäten</H>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {[
            ["eine Radtour machen","кататься на велосипеде"],
            ["Lebensmittel kaufen","покупать продукты"],
            ["Sehenswürdigkeiten besichtigen","осматривать достопримечательности"],
            ["ein Straßenfest besuchen","посещать уличный праздник"],
            ["zu Mittag essen","обедать"],
            ["einen Kaffee trinken","пить кофе"],
          ].map(([de,ru])=>(
            <div key={de} style={{display:"flex",justifyContent:"space-between",gap:8,background:C.card2,borderRadius:8,padding:"7px 10px"}}>
              <span style={{fontSize:13,color:C.text,fontWeight:600}}>{de}</span>
              <span style={{fontSize:12,color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>
      </Box>
      <Box c={C.blue}>
        <H c={C.blue} z={13}>🕐 Reihenfolge — Порядок действий</H>
        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
          {[["zuerst","сначала",C.green],["dann","потом",C.yellow],["danach","после этого",C.orange]].map(([w,ru,c])=>(
            <div key={w} style={{background:c+"22",border:`1px solid ${c}55`,borderRadius:9,padding:"6px 12px",textAlign:"center"}}>
              <div style={{color:c,fontWeight:800,fontSize:14}}>{w}</div>
              <div style={{color:C.muted,fontSize:11}}>{ru}</div>
            </div>
          ))}
        </div>
        {/* Таблица двух вариантов порядка слов */}
        <div style={{background:C.card2,borderRadius:10,overflow:"hidden",marginBottom:8}}>
          <div style={{display:"grid",gridTemplateColumns:"auto auto auto 1fr"}}>
            {["Pos. 1","Verb","Pos. 3",""].map((h,i)=>(
              <div key={i} style={{padding:"5px 8px",fontSize:11,color:C.muted,fontWeight:700,
                textAlign:"center",textTransform:"uppercase",background:C.card}}>{h}</div>
            ))}
            {/* Вариант 1: Subjekt an Pos.1 */}
            <div style={{padding:"8px 10px",background:C.blueBg,color:C.blue,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>Sie</div>
            <div style={{padding:"8px 10px",background:C.tealBg,color:C.teal,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>kaufen</div>
            <div style={{padding:"8px 10px",background:C.greenBg,color:C.green,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>zuerst</div>
            <div style={{padding:"8px 10px",color:C.muted,fontSize:12,
              borderTop:`1px solid ${C.border}33`}}>Lebensmittel.</div>
            {/* Вариант 2: Zeitwort an Pos.1 */}
            <div style={{padding:"8px 10px",background:C.greenBg,color:C.green,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>Zuerst</div>
            <div style={{padding:"8px 10px",background:C.tealBg,color:C.teal,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>kaufen</div>
            <div style={{padding:"8px 10px",background:C.blueBg,color:C.blue,fontWeight:800,fontSize:13,
              textAlign:"center",borderTop:`1px solid ${C.border}33`}}>sie</div>
            <div style={{padding:"8px 10px",color:C.muted,fontSize:12,
              borderTop:`1px solid ${C.border}33`}}>Lebensmittel.</div>
          </div>
        </div>
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}35`,borderRadius:8,
          padding:"6px 10px",fontSize:12,color:C.yellow,marginBottom:8}}>
          💡 <b>Verb всегда на позиции 2!</b> Если временно́е слово стоит первым — субъект уходит на 3-е место.
        </div>
        <div style={{background:C.card2,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.muted,lineHeight:1.9}}>
          <b style={{color:C.green}}>Zuerst</b> kaufen sie Lebensmittel.<br/>
          <b style={{color:C.yellow}}>Dann</b> essen sie zu Mittag.<br/>
          <b style={{color:C.orange}}>Danach</b> besuchen sie ein Straßenfest.
        </div>
      </Box>
    </div>
  );
}

function T4C(){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.yellow}>
        <H c={C.yellow}>⏮️ Präteritum von haben und sein</H>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>
          <b style={{color:C.yellow}}>Präteritum</b> — прошедшее время. Используется для описания прошлых фактов и состояний.
        </div>
        <div style={{background:C.card2,borderRadius:8,padding:"9px 12px",fontSize:13,lineHeight:2}}>
          Mein Großvater <b style={{color:C.purple}}>war</b> Arzt. <span style={{color:C.muted,fontSize:12}}>— Мой дедушка был врачом.</span><br/>
          Mein Vater <b style={{color:C.blue}}>hatte</b> viel Arbeit. <span style={{color:C.muted,fontSize:12}}>— У папы было много работы.</span><br/>
          Wir <b style={{color:C.purple}}>waren</b> drei Geschwister. <span style={{color:C.muted,fontSize:12}}>— Нас было трое детей.</span>
        </div>
      </Box>
      <Box c={C.teal}>
        <H c={C.teal}>📋 Präteritum — haben & sein</H>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"2px"}}>
            <thead>
              <tr>
                <td style={{width:52}}/>
                <td colSpan={2} style={{textAlign:"center",background:C.blueBg,color:C.blue,
                  fontWeight:800,fontSize:12,padding:"6px 4px",borderRadius:"8px 8px 0 0"}}>haben</td>
                <td colSpan={2} style={{textAlign:"center",background:C.purpleBg,color:C.purple,
                  fontWeight:800,fontSize:12,padding:"6px 4px",borderRadius:"8px 8px 0 0"}}>sein</td>
              </tr>
              <tr>
                <td/>
                <td style={{textAlign:"center",background:C.blueBg,color:C.muted,
                  fontSize:11,fontWeight:600,padding:"3px 4px",borderRadius:"0 0 4px 4px"}}>Präsens</td>
                <td style={{textAlign:"center",background:C.blueBg,color:C.blue,
                  fontSize:11,fontWeight:800,padding:"3px 4px",borderRadius:"0 0 4px 4px"}}>Prät.</td>
                <td style={{textAlign:"center",background:C.purpleBg,color:C.muted,
                  fontSize:11,fontWeight:600,padding:"3px 4px",borderRadius:"0 0 4px 4px"}}>Präsens</td>
                <td style={{textAlign:"center",background:C.purpleBg,color:C.purple,
                  fontSize:11,fontWeight:800,padding:"3px 4px",borderRadius:"0 0 4px 4px"}}>Prät.</td>
              </tr>
            </thead>
            <tbody>
              {[
                ["ich",    "habe",  "hatte",   "bin",  "war"],
                ["du",     "hast",  "hattest", "bist", "warst"],
                ["er/sie", "hat",   "hatte",   "ist",  "war"],
                ["wir",    "haben", "hatten",  "sind", "waren"],
                ["ihr",    "habt",  "hattet",  "seid", "wart"],
                ["sie/Sie","haben", "hatten",  "sind", "waren"],
              ].map(([p,hp,hpt,sp,spt])=>(
                <tr key={p}>
                  <td style={{padding:"6px 6px",fontSize:12,color:C.muted,fontWeight:700}}>{p}</td>
                  <td style={{padding:"6px 4px",background:C.card2,borderRadius:6,fontSize:13,
                    color:C.muted,textAlign:"center"}}>{hp}</td>
                  <td style={{padding:"6px 4px",background:C.blueBg,border:`1px solid ${C.blue}40`,
                    borderRadius:6,fontSize:13,color:C.blue,fontWeight:800,textAlign:"center"}}>{hpt}</td>
                  <td style={{padding:"6px 4px",background:C.card2,borderRadius:6,fontSize:13,
                    color:C.muted,textAlign:"center"}}>{sp}</td>
                  <td style={{padding:"6px 4px",background:C.purpleBg,border:`1px solid ${C.purple}40`,
                    borderRadius:6,fontSize:13,textAlign:"center",fontWeight:800,
                    color:p==="ihr"?C.orange:C.purple}}>{spt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
      <Box c={C.green}>
        <H c={C.green} z={13}>📅 Zeitangaben — время</H>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginBottom:8}}>
          {[["vorgestern","позавчера",C.red],["gestern","вчера",C.orange],["heute","сегодня",C.green],["morgen","завтра",C.blue],["übermorgen","послезавтра",C.purple]].map(([w,ru,col])=>(
            <div key={w} style={{background:col+"18",border:`1px solid ${col}40`,borderRadius:9,padding:"6px 4px",textAlign:"center"}}>
              <div style={{color:col,fontWeight:800,fontSize:12}}>{w}</div>
              <div style={{color:C.muted,fontSize:11,marginTop:2}}>{ru}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.card2,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.muted,lineHeight:1.9}}>
          <b style={{color:C.red}}>Gestern</b> hatte ich keine Zeit.<br/>
          <b style={{color:C.green}}>Heute</b> bin ich zu Hause.<br/>
          <b style={{color:C.blue}}>Morgen</b> fahren wir nach Potsdam.
        </div>
      </Box>
      <Box c={C.blue}>
        <H c={C.blue} z={13}>🗣️ Früher und heute</H>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {[
            ["Früher war alles anders.","Раньше всё было иначе."],
            ["Die Familie war sehr groß.","Семья была очень большой."],
            ["Sie hatte keine langweilige Kindheit.","У неё не было скучного детства."],
            ["Wir hatten keinen Computer.","У нас не было компьютера."],
            ["Das war schön.","Это было красиво / прекрасно."],
          ].map(([de,ru])=>(
            <div key={de} style={{background:C.card2,borderRadius:8,padding:"7px 10px",display:"flex",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:13,color:C.text,fontWeight:600}}>{de}</span>
              <span style={{fontSize:12,color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}


// ─── L5 · UHRZEITEN ──────────────────────────────────────────────────────────
const Q_L5A=[
  {q:"Wie sagt man 9:30 Uhr?",             opts:["Es ist halb neun.","Es ist halb zehn.","Es ist neun dreißig.","Viertel nach neun."],                 ans:1, hint:"Uhrzeiten"},
  {q:"Wie sagt man 9:15 Uhr?",             opts:["Viertel vor neun.","Viertel nach neun.","Viertel vor zehn.","halb neun."],                           ans:1, hint:"Uhrzeiten"},
  {q:"Wie sagt man 9:45 Uhr?",             opts:["Viertel nach neun.","Viertel vor zehn.","Viertel vor neun.","halb zehn."],                           ans:1, hint:"Uhrzeiten"},
  {q:"Was bedeutet 'halb zehn'?",          opts:["10:30","10:00","9:30","9:00"],                                                                        ans:2, hint:"halb"},
  {q:"Wie fragt man nach der Uhrzeit?",    opts:["Wie ist es?","Wie viel macht das?","Wie spät ist es?","Was ist die Zeit?"],                           ans:2, hint:"Frage"},
  {q:"Wie sagt man 8:20 Uhr?",             opts:["zwanzig vor acht","Viertel nach acht","zwanzig nach acht","halb neun"],                               ans:2, hint:"Uhrzeiten"},
  {q:"Was bedeutet 'Viertel vor neun'?",   opts:["9:15","8:45","9:45","8:15"],                                                                          ans:1, hint:"vor/nach"},
  {q:"Welche Präposition benutzt man mit der Uhrzeit?",  opts:["am","im","um","an"],                                                                    ans:2, hint:"Präposition"},
  {q:"Wie sagt man 5:25 Uhr?",             opts:["fünf vor halb sechs","fünf nach halb sechs","Viertel nach fünf","zwanzig nach fünf"],                 ans:0, hint:"halb"},
  {q:"'Es ist zwanzig vor elf' — welche Uhrzeit ist das?",  opts:["11:20","10:40","10:20","11:40"],                                                     ans:1, hint:"vor"},
];

function T5A(){
  return (
    <div>
      <Box icon="🕐" title="A · Wie spät ist es?" sub="Uhrzeiten — время суток">
        <div style={{fontSize:13,color:C.muted,marginBottom:12}}>Два способа спросить время:</div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          <span style={{background:C.blue+"22",border:`1px solid ${C.blue}`,borderRadius:8,padding:"6px 12px",fontSize:13,color:C.blue,fontWeight:700}}>Wie spät ist es?</span>
          <span style={{background:C.blue+"22",border:`1px solid ${C.blue}`,borderRadius:8,padding:"6px 12px",fontSize:13,color:C.blue,fontWeight:700}}>Um wie viel Uhr ...?</span>
        </div>
        <div style={{fontSize:13,color:C.muted,marginBottom:8}}>Ответ: <b style={{color:C.text}}>Es ist ... Uhr.</b> / <b style={{color:C.text}}>Um ... Uhr.</b></div>

        <div style={{marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:13,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Таблица времён</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {[
              ["9:00","neun Uhr","девять часов"],
              ["9:05","fünf nach neun","пять минут десятого"],
              ["9:15","Viertel nach neun","четверть десятого"],
              ["9:20","zwanzig nach neun","двадцать минут десятого"],
              ["9:30","halb zehn","половина десятого ⚠️"],
              ["9:35","fünf nach halb zehn","35 минут десятого (без 25 десять)"],
              ["9:40","zwanzig vor zehn","без двадцати десять"],
              ["9:45","Viertel vor zehn","без четверти десять"],
              ["9:55","fünf vor zehn","без пяти десять"],
              ["10:00","zehn Uhr","десять часов"],
            ].map(([t,de,ru])=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,background:C.card2,borderRadius:8,padding:"7px 12px"}}>
                <span style={{fontWeight:800,color:C.teal,minWidth:36,fontSize:13}}>{t}</span>
                <span style={{flex:1,fontWeight:600,fontSize:14,color:C.text}}>{de}</span>
                <span style={{fontSize:12,color:C.muted}}>{ru}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.orange,marginBottom:6}}>⚠️ Ключевое правило: halb</div>
          <div style={{fontSize:13,color:C.text,marginBottom:4}}><b>halb zehn</b> = половина <b>десятого</b> = 9:30</div>
          <div style={{fontSize:12,color:C.muted}}>«halb» смотрит вперёд — называет следующий час!</div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px"}}>
          <div style={{fontWeight:700,fontSize:13,color:C.blue,marginBottom:6}}>📌 vor и nach</div>
          <div style={{display:"flex",gap:16}}>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>⬅️</div>
              <div style={{fontWeight:700,color:C.red,fontSize:14}}>vor</div>
              <div style={{fontSize:12,color:C.muted}}>до / без</div>
              <div style={{fontSize:12,color:C.text,marginTop:4}}>Viertel <b>vor</b> zehn<br/>= без четверти 10</div>
            </div>
            <div style={{width:1,background:C.border}}/>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>➡️</div>
              <div style={{fontWeight:700,color:C.green,fontSize:14}}>nach</div>
              <div style={{fontSize:12,color:C.muted}}>после / прошло</div>
              <div style={{fontSize:12,color:C.text,marginTop:4}}>Viertel <b>nach</b> zehn<br/>= четверть одиннадцатого</div>
            </div>
          </div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginTop:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.purple,marginBottom:8}}>🕐 Официальное время (offiziell)</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:8}}>На вокзале, в расписании, по радио — 24 часа:</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[
              ["halb neun",          "8:30",  "acht Uhr dreißig"],
              ["fünf nach drei",     "15:05", "fünfzehn Uhr fünf"],
              ["zehn vor sechs",     "17:50", "siebzehn Uhr fünfzig"],
              ["Viertel nach vier",  "16:15", "sechzehn Uhr fünfzehn"],
              ["zwanzig vor eins",   "12:40", "zwölf Uhr vierzig"],
              ["Viertel vor elf",    "10:45", "zehn Uhr fünfundvierzig"],
              ["zehn nach sechs",    "6:10",  "sechs Uhr zehn"],
            ].map(([inoff,time,off])=>(
              <div key={time} style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}>
                <span style={{color:C.teal,minWidth:38,fontWeight:700}}>{time}</span>
                <span style={{flex:1,color:C.text}}>{inoff}</span>
                <span style={{color:C.purple,fontWeight:600}}>{off}</span>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}


// ─── L5B · TRENNBARE VERBEN ───────────────────────────────────────────────────
const Q_L5B=[
  {q:"Wo steht der Präfix bei trennbaren Verben?",          opts:["am Anfang","am Ende des Satzes","nach dem Subjekt","vor dem Verb"],                  ans:1, hint:"Trennbare Verben"},
  {q:"'Sie ___ um 7 Uhr ___.' (aufstehen)",                 opts:["aufsteht ... —","steht ... auf","stehen ... auf","steht ... aufsteht"],              ans:1, hint:"Präsens"},
  {q:"Was ist der Infinitiv von 'Er ruft an'?",             opts:["rufen an","rufen","anrufen","anruft"],                                               ans:2, hint:"Infinitiv"},
  {q:"'Ich kaufe Lebensmittel ___.' (einkaufen)",           opts:["ein","aus","auf","ab"],                                                              ans:0, hint:"Präfix"},
  {q:"Welches ist KEIN trennbares Verb?",                   opts:["aufstehen","fernsehen","beginnen","einkaufen"],                                      ans:2, hint:"Trennbar?"},
  {q:"'Wann ___ der Film ___?' (anfangen — er-Form)",       opts:["fangen ... an","fängt ... an","fangt ... an","anfängt ..."],                         ans:1, hint:"a→ä"},
  {q:"'Wir ___ heute Abend ___.' (ausgehen)",               opts:["ausgehen","gehen ... aus","geht ... aus","gehen ... auf"],                           ans:1, hint:"wir-Form"},
  {q:"'Du ___ eine Zeitung ___.' (mitnehmen — du-Form)",    opts:["mitnimmst ... —","nimmst ... mit","nimmt ... mit","nimmst mit ..."],                 ans:1, hint:"e→i"},
  {q:"Wie lautet 'fernsehen' für er/sie/es?",               opts:["fernsieht","sieht ... fern","seht ... fern","sieht fern ..."],                       ans:1, hint:"e→ie"},
  {q:"'Der Kurs ___ um 12 Uhr ___.' (aufhören)",            opts:["aufhört ... —","hört ... auf","höre ... auf","hört auf ..."],                        ans:1, hint:"er-Form"},
];

function T5B(){
  const [sel,setSel]=useState("anrufen");
  const c=KONJ_L5B[sel];
  const verbs=[
    {inf:"anrufen",    pref:"an",  stem:"rufen",   ich:"rufe ... an",    er:"ruft ... an",    ru:"звонить"},
    {inf:"anfangen",   pref:"an",  stem:"fangen",  ich:"fange ... an",   er:"fängt ... an",   ru:"начинать"},
    {inf:"aufstehen",  pref:"auf", stem:"stehen",  ich:"stehe ... auf",  er:"steht ... auf",  ru:"вставать"},
    {inf:"aufräumen",  pref:"auf", stem:"räumen",  ich:"räume ... auf",  er:"räumt ... auf",  ru:"убирать"},
    {inf:"aufhören",   pref:"auf", stem:"hören",   ich:"höre ... auf",   er:"hört ... auf",   ru:"прекращать"},
    {inf:"einkaufen",  pref:"ein", stem:"kaufen",  ich:"kaufe ... ein",  er:"kauft ... ein",  ru:"покупать"},
    {inf:"mitnehmen",  pref:"mit", stem:"nehmen",  ich:"nehme ... mit",  er:"nimmt ... mit",  ru:"брать с собой"},
    {inf:"mitkommen",  pref:"mit", stem:"kommen",  ich:"komme ... mit",  er:"kommt ... mit",  ru:"идти вместе"},
    {inf:"ausgehen",   pref:"aus", stem:"gehen",   ich:"gehe ... aus",   er:"geht ... aus",   ru:"выходить"},
    {inf:"fernsehen",  pref:"fern",stem:"sehen",   ich:"sehe ... fern",  er:"sieht ... fern", ru:"смотреть ТВ"},
    {inf:"abspülen",   pref:"ab",  stem:"spülen",  ich:"spüle ... ab",   er:"spült ... ab",   ru:"мыть посуду"},
  ];
  const prefColors={an:C.blue, auf:C.orange, ein:C.green, mit:C.purple, aus:C.red, fern:C.teal, ab:C.yellow};
  return (
    <div>
      <Box icon="✂️" title="B · Trennbare Verben" sub="Глаголы с отделяемым префиксом">
        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:13,color:C.orange,marginBottom:6}}>⚠️ Главное правило</div>
          <div style={{fontSize:13,color:C.text,marginBottom:4}}>Глагол — на <b>2-е место</b>, префикс — в <b>конец</b> предложения:</div>
          <div style={{background:C.bg,borderRadius:8,padding:"8px 12px",marginTop:6}}>
            <div style={{fontSize:13,marginBottom:3}}>
              <span style={{color:C.muted}}>Она убирает кухню → </span>
              <span style={{color:C.text,fontWeight:600}}>Sie </span>
              <span style={{color:C.orange,fontWeight:800}}>räumt</span>
              <span style={{color:C.text,fontWeight:600}}> die Küche </span>
              <span style={{color:C.orange,fontWeight:800}}>auf</span>
              <span style={{color:C.muted}}>.</span>
            </div>
            <div style={{fontSize:13}}>
              <span style={{color:C.muted}}>Она звонит → </span>
              <span style={{color:C.text,fontWeight:600}}>Sie </span>
              <span style={{color:C.blue,fontWeight:800}}>ruft</span>
              <span style={{color:C.text,fontWeight:600}}> eine Freundin </span>
              <span style={{color:C.blue,fontWeight:800}}>an</span>
              <span style={{color:C.muted}}>.</span>
            </div>
          </div>
        </div>

        <div style={{fontWeight:700,fontSize:13,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Таблица глаголов</div>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
          {[
            {pref:"an-",  col:C.blue,   ru:"к, на, начало действия"},
            {pref:"auf-", col:C.orange, ru:"вверх, открытие"},
            {pref:"aus-", col:C.red,    ru:"из, выход наружу"},
            {pref:"ein-", col:C.green,  ru:"внутрь, в"},
            {pref:"mit-", col:C.purple, ru:"вместе, с собой"},
            {pref:"ab-",  col:C.yellow, ru:"от, вниз, завершение"},
            {pref:"fern-",col:C.teal,   ru:"на расстоянии"},
          ].map(({pref,col,ru})=>(
            <div key={pref} style={{display:"flex",alignItems:"center",gap:10,background:C.card2,borderRadius:8,padding:"6px 12px"}}>
              <span style={{background:col+"33",color:col,borderRadius:6,padding:"2px 8px",fontWeight:800,fontSize:12,minWidth:40,textAlign:"center"}}>{pref}</span>
              <span style={{fontSize:12,color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>

        <div style={{fontWeight:700,fontSize:13,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Глаголы</div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {verbs.map(v=>{
            const col=prefColors[v.pref]||C.teal;
            return (
              <div key={v.inf} style={{background:C.card2,borderRadius:8,padding:"7px 12px",display:"flex",alignItems:"center",gap:8}}>
                <span style={{background:col+"33",color:col,borderRadius:6,padding:"2px 7px",fontSize:11,fontWeight:800,minWidth:32,textAlign:"center"}}>{v.pref}-</span>
                <span style={{fontWeight:700,fontSize:13,color:C.text,flex:1}}>{v.inf}</span>
                <span style={{fontSize:12,color:C.muted,flex:2}}>{v.ich} / {v.er}</span>
                <span style={{fontSize:11,color:C.text,opacity:0.75}}>{v.ru}</span>
              </div>
            );
          })}
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginTop:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.blue,marginBottom:6}}>📌 В вопросе — так же</div>
          <div style={{display:"flex",flexDirection:"column",gap:5,fontSize:13}}>
            {[
              ["Wann stehst du auf?","Ich stehe um 7 Uhr auf.","aufstehen"],
              ["Wann kaufst du ein?","Ich kaufe um 10 Uhr ein.","einkaufen"],
              ["Wann siehst du fern?","Ich sehe am Abend fern.","fernsehen"],
            ].map(([q,a,v])=>(
              <div key={v} style={{borderLeft:`2px solid ${C.blue}`,paddingLeft:8}}>
                <div style={{color:C.muted}}>{q}</div>
                <div style={{color:C.text,fontWeight:600}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <Box c={c.col} s={{marginTop:12}}>
        <H c={c.col}>📋 Konjugation — Trennbare Verben</H>
        <div style={{fontSize:12,color:C.muted,marginBottom:10}}>
          … = место для объекта/дополнения. Выбери глагол:
        </div>
        {/* Кнопки-глаголы */}
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
          {Object.entries(KONJ_L5B).map(([v,d])=>(
            <button key={v} onClick={()=>setSel(v)}
              style={{padding:"5px 10px",borderRadius:10,cursor:"pointer",fontWeight:600,fontSize:12,
                border:`1px solid ${sel===v?d.col:C.border}`,
                background:sel===v?d.bg:C.card,
                color:sel===v?d.col:C.muted}}>
              {v}
            </button>
          ))}
        </div>
        {/* Бейдж префикса + пометка об умлауте */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{background:c.col+"22",border:`1px solid ${c.col}55`,color:c.col,
            borderRadius:6,padding:"2px 10px",fontSize:12,fontWeight:800}}>{c.pref}-</span>
          <span style={{fontSize:14,fontWeight:800,color:C.text}}>{sel}</span>
          {c.note&&<span style={{fontSize:11,color:C.orange}}>⚡ {c.note}: du / er</span>}
        </div>
        {/* Сетка 2×3 */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[["ich",c.ich],["wir",c.wir],["du",c.du],["ihr",c.ihr],["er/sie/es",c["er/sie/es"]],["sie/Sie",c["sie/Sie"]]].map(([p,f])=>{
            const hi=!!c.note&&(p==="du"||p==="er/sie/es");
            return (
              <div key={p} style={{background:hi?c.bg:C.card2,
                border:`1px solid ${hi?c.col+"55":C.border}`,borderRadius:8,padding:"8px 10px"}}>
                <div style={{fontSize:11,color:hi?c.col:C.muted,marginBottom:2}}>{p}</div>
                <div style={{color:hi?c.col:C.text,fontWeight:700,fontSize:14}}>{f}</div>
              </div>
            );
          })}
        </div>
      </Box>
    </div>
  );
}

// ─── L5C · TEMPORALE PRÄPOSITIONEN ───────────────────────────────────────────
const Q_L5C=[
  {q:"Welche Präposition benutzt man mit Wochentagen?",     opts:["um","in","am","an"],                                                                 ans:2, hint:"Präposition"},
  {q:"'Ich arbeite ___ Montag.'",                           opts:["um","an","am","im"],                                                                 ans:2, hint:"am"},
  {q:"'Der Kurs beginnt ___ 9 Uhr.'",                       opts:["am","im","um","an"],                                                                 ans:2, hint:"um"},
  {q:"'Er arbeitet ___ 9 ___ 17 Uhr.'",                     opts:["am...bis","von...bis","um...bis","in...am"],                                         ans:1, hint:"von...bis"},
  {q:"Wie sagt man 'ночью' с предлогом?",                   opts:["am Nacht","im Nacht","in der Nacht","an der Nacht"],                                  ans:2, hint:"in der Nacht"},
  {q:"Welche Reihenfolge ist richtig?",                     opts:["um 9 Uhr am Montag lernt er","er lernt am Montag um 9 Uhr","er lernt um Montag 9 Uhr","am um 9 Uhr Montag lernt er"], ans:1, hint:"Wortstellung"},
  {q:"Was bedeutet 'am Montagvormittag'?",                  opts:["Montagnachmittag","Montagabend","Montagmorgen","am Vormittag des Montags"],           ans:3, hint:"Zusammengesetzt"},
  {q:"'Sie sieht am Abend ___.' (fernsehen)",               opts:["fernsehen","fern","fernsiehst","sieht fern"],                                         ans:1, hint:"Trennbar"},
  {q:"'Von' benutzt man ...",                               opts:["nur mit Uhrzeiten","nur mit Wochentagen","mit Anfangspunkt einer Zeitspanne","mit Tageszeiten"], ans:2, hint:"von"},
  {q:"'Wann gehst du schlafen?' — типичный ответ:",         opts:["Am Nacht.","In der Nacht um 23 Uhr.","Um Mitternacht am Nacht.","Am Abend um 22 Uhr."], ans:3, hint:"am/um"},
];

function T5C(){
  return (
    <div>
      <Box icon="📅" title="C · Meine Woche" sub="Temporale Präpositionen: am · um · von...bis">
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {[
            {prep:"um",  col:C.blue,  rule:"точное время",       ex:["um 9 Uhr","um halb zwei","um Viertel nach drei"]},
            {prep:"am",  col:C.green, rule:"день / часть дня",   ex:["am Montag","am Abend","am Wochenende"]},
            {prep:"von ... bis",col:C.orange,rule:"промежуток времени", ex:["von 9 bis 12 Uhr","von Montag bis Freitag"]},
            {prep:"in der",col:C.purple,rule:"только: in der Nacht",ex:["in der Nacht (⚠️ не 'am Nacht')"]},
          ].map(({prep,col,rule,ex})=>(
            <div key={prep} style={{background:C.card2,borderRadius:10,padding:"10px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{background:col+"33",color:col,borderRadius:6,padding:"3px 10px",fontWeight:800,fontSize:14}}>{prep}</span>
                <span style={{fontSize:12,color:C.muted}}>{rule}</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {ex.map(e=><span key={e} style={{background:C.bg,borderRadius:6,padding:"3px 8px",fontSize:12,color:C.text}}>{e}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px"}}>
          <div style={{fontWeight:700,fontSize:13,color:C.blue,marginBottom:8}}>🕐 Части суток</div>
          {[
            {name:"der Morgen",   adv:"morgens",     prep:"am",     time:"6–9",  col:"#f59e0b", note:"утро"},
            {name:"der Vormittag",adv:"vormittags",  prep:"am",     time:"9–12", col:"#f97316", note:"до полудня"},
            {name:"der Mittag",   adv:"mittags",     prep:"am",     time:"12–14",col:"#ef4444", note:"полдень"},
            {name:"der Nachmittag",adv:"nachmittags",prep:"am",     time:"14–18",col:"#8b5cf6", note:"после полудня"},
            {name:"der Abend",    adv:"abends",      prep:"am",     time:"18–22",col:"#3b82f6", note:"вечер"},
            {name:"die Nacht",    adv:"nachts",      prep:"in der", time:"22–6", col:"#1e40af", note:"ночь ⚠️ in der"},
          ].map(({name,adv,prep,time,col,note})=>(
            <div key={name} style={{display:"grid",gridTemplateColumns:"1fr auto auto auto",
              gap:6,alignItems:"center",padding:"6px 0",
              borderBottom:`1px solid ${C.border}22`}}>
              <div>
                <span style={{fontSize:13,fontWeight:700,color:C.text}}>{name.split(" ")[1]}</span>
                <span style={{fontSize:11,color:C.muted,marginLeft:5}}>{note}</span>
              </div>
              <span style={{background:col+"22",border:`1px solid ${col}55`,color:col,
                borderRadius:5,padding:"1px 7px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{prep}</span>
              <span style={{fontSize:12,color:C.muted,whiteSpace:"nowrap"}}>{adv}</span>
              <span style={{fontSize:11,color:C.muted,whiteSpace:"nowrap"}}>{time} Uhr</span>
            </div>
          ))}
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.teal,marginBottom:8}}>🗓 Составные выражения времени</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:8}}>am + день + часть дня = одно слово:</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[
              ["am Montagvormittag","в понедельник утром"],
              ["am Dienstagmittag", "во вторник в полдень"],
              ["am Mittwochabend",  "в среду вечером"],
              ["am Donnerstagmorgen","в четверг утром"],
              ["am Freitagabend",   "в пятницу вечером"],
            ].map(([de,ru])=>(
              <div key={de} style={{display:"flex",justifyContent:"space-between",background:C.bg,borderRadius:6,padding:"5px 10px",fontSize:12}}>
                <span style={{color:C.text,fontWeight:600}}>{de}</span>
                <span style={{color:C.muted}}>{ru}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px"}}>
          <div style={{fontWeight:700,fontSize:13,color:C.orange,marginBottom:6}}>💬 Диалог-пример</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,fontSize:13}}>
            {[
              ["— Wann beginnt der Deutschkurs?","— Um 18 Uhr."],
              ["— Bis wann geht der Kurs?","— Bis 20 Uhr."],
              ["— Also von sechs bis acht?","— Ja, genau."],
            ].map(([q,a],i)=>(
              <div key={i}>
                <div style={{color:C.muted}}>{q}</div>
                <div style={{color:C.text,fontWeight:600}}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}

const Q_L5D=[
  {q:"Wie antwortet man positiv auf 'Gehen wir schwimmen?'",  opts:["Nein, leider nicht.","Ja, gerne!","Das geht nicht.","Ich habe keine Lust."],          ans:1, hint:"Согласие"},
  {q:"Wie sagt man 'Нет, не хочу'?",                         opts:["Nein, leider nicht.","Das geht nicht.","Ich habe keine Lust.","Es tut mir leid."],      ans:2, hint:"Отказ"},
  {q:"'Er ___ später essen.' (gehen + Infinitiv)",            opts:["geht später essen","essen geht später","geht essen später","später geht essen"],         ans:0, hint:"gehen + Inf."},
  {q:"Wo steht der Infinitiv bei 'gehen + Infinitiv'?",      opts:["Position 2","am Satzanfang","am Satzende","nach dem Subjekt"],                           ans:2, hint:"Wortstellung"},
  {q:"'Gehen wir heute Abend ___.' (tanzen)",                 opts:["tanzen","tanze","tanzt","zu tanzen"],                                                    ans:0, hint:"gehen + Inf."},
  {q:"Wie fragt man nach einer Alternative?",                 opts:["Ich habe keine Lust.","Sehr gerne!","Geht es auch morgen?","Es tut mir leid."],          ans:2, hint:"Альтернатива"},
  {q:"'Hast du ___ Zeit?' — was fehlt hier?",                opts:["vielleicht","heute Abend","immer","gerne"],                                               ans:1, hint:"Zeit haben"},
  {q:"Was bedeutet 'Sehr gerne!'?",                          opts:["Nein, danke.","Mit großem Vergnügen!","Vielleicht.","Ich weiß nicht."],                   ans:1, hint:"Согласие"},
  {q:"'Wir gehen am Sonntag ___.' (spazieren gehen)",        opts:["spazieren","spazieren gehen","gehen spazieren","zu spazieren"],                           ans:0, hint:"gehen + Inf."},
  {q:"'Das ___ nicht.' — Absage",                            opts:["hat","gibt","geht","macht"],                                                              ans:2, hint:"Das geht nicht"},
];

function T5D(){
  const [openTr,setOpenTr]=useState(null);
  const toggle=(k)=>setOpenTr(p=>p===k?null:k);
  const PhraseRow=({id,de,ru,col=C.text})=>(
    <div onClick={()=>toggle(id)}
      style={{padding:"7px 10px",borderBottom:`1px solid ${C.border}22`,cursor:"pointer",
        background:openTr===id?C.card2:"transparent"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:600,color:col}}>{de}</span>
        <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:6}}>{openTr===id?"▲":"▾"}</span>
      </div>
      {openTr===id&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>{ru}</div>}
    </div>
  );
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.red}>
        <H c={C.red}>📅 D · Hast du Zeit?</H>

        {/* gehen + Infinitiv */}
        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.blue,marginBottom:8}}>🔗 gehen + Infinitiv</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:10}}>
            Infinitiv идёт в <span style={{color:C.orange,fontWeight:700}}>конец предложения</span>. Глагол gehen спрягается нормально.
          </div>
          <div style={{background:C.bg,borderRadius:8,padding:"8px 10px",marginBottom:8}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"baseline"}}>
              {[["Er",C.blue],["geht",C.orange],["später",C.muted],["einkaufen.",C.green]].map(([w,c])=>(
                <span key={w} style={{background:c+"22",border:`1px solid ${c}44`,color:c,
                  borderRadius:6,padding:"3px 8px",fontWeight:700,fontSize:13}}>{w}</span>
              ))}
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:6}}>Subj. → V(P2) → … → <span style={{color:C.green,fontWeight:700}}>Infinitiv</span></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5,fontSize:12}}>
            {[
              ["schwimmen gehen","Ich gehe am Nachmittag schwimmen."],
              ["tanzen gehen","Gehen wir heute Abend tanzen?"],
              ["essen gehen","Er geht mit Freunden essen."],
              ["spazieren gehen","Wir gehen am Sonntag spazieren."],
            ].map(([inf,ex])=>(
              <div key={inf} style={{borderLeft:`2px solid ${C.blue}`,paddingLeft:8}}>
                <span style={{color:C.blue,fontWeight:700}}>{inf}</span>
                <span style={{color:C.muted}}> → </span>
                <span style={{color:C.text}}>{ex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* sich verabreden — таблица */}
        <div style={{background:C.card2,borderRadius:10,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
            background:C.red+"22",borderBottom:`1px solid ${C.border}33`}}>
            <div style={{padding:"6px 10px",fontSize:11,color:C.red,fontWeight:700,
              borderRight:`1px solid ${C.border}33`}}>📋 ВОПРОСЫ</div>
            <div style={{padding:"6px 10px",fontSize:11,color:C.red,fontWeight:700}}>💬 ОТВЕТЫ</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>

            {/* Левая — вопросы */}
            <div style={{borderRight:`1px solid ${C.border}33`}}>
              {[
                ["q1","Spielen wir zusammen Schach?",   "Сыграем в шахматы?"],
                ["q2","Gehen wir zusammen schwimmen?",  "Пойдём плавать?"],
                ["q3","Gehen wir ins Kino?",            "Пойдём в кино?"],
                ["q4","Hast du heute Abend Zeit?",      "Есть время сегодня вечером?"],
                ["q5","Hast du am Mittwoch Zeit?",      "Есть время в среду?"],
                ["q6","Was meinst du?",                 "Что думаешь?"],
              ].map(([id,de,ru])=>(
                <div key={id} onClick={()=>toggle(id)}
                  style={{padding:"6px 8px",borderBottom:`1px solid ${C.border}22`,
                    cursor:"pointer",background:openTr===id?C.bg:"transparent",
                    minHeight:36}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.text,lineHeight:1.3}}>{de}</span>
                    <span style={{fontSize:11,color:C.muted,flexShrink:0}}>{openTr===id?"▲":"▾"}</span>
                  </div>
                  {openTr===id&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{ru}</div>}
                </div>
              ))}
            </div>

            {/* Правая — ответы */}
            <div>
              <div style={{background:C.green+"22",padding:"3px 8px",fontSize:11,
                color:C.green,fontWeight:700,borderBottom:`1px solid ${C.border}22`}}>✅ Согласие</div>
              {[
                ["y1","Ja, gerne.",     "Да, с удовольствием."],
                ["y2","Sehr gerne.",    "С большим удовольствием."],
                ["y3","Ja, das geht.", "Да, подходит."],
                ["y4","Ja, natürlich!","Да, конечно!"],
              ].map(([id,de,ru])=>(
                <div key={id} onClick={()=>toggle(id)}
                  style={{padding:"5px 8px",borderBottom:`1px solid ${C.border}22`,
                    cursor:"pointer",background:openTr===id?C.bg:"transparent",minHeight:30}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.green,lineHeight:1.3}}>{de}</span>
                    <span style={{fontSize:11,color:C.muted,flexShrink:0}}>{openTr===id?"▲":"▾"}</span>
                  </div>
                  {openTr===id&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{ru}</div>}
                </div>
              ))}

              <div style={{background:C.orange+"22",padding:"3px 8px",fontSize:11,
                color:C.orange,fontWeight:700,borderBottom:`1px solid ${C.border}22`,
                borderTop:`1px solid ${C.border}22`}}>🔄 Альтернатива</div>
              {[
                ["a1","Geht es auch später?",  "Можно попозже?"],
                ["a2","Geht es auch morgen?",  "Можно завтра?"],
                ["a3","Wie ist es am Freitag?","Как насчёт пятницы?"],
                ["a4","Um wie viel Uhr?",      "В котором часу?"],
              ].map(([id,de,ru])=>(
                <div key={id} onClick={()=>toggle(id)}
                  style={{padding:"5px 8px",borderBottom:`1px solid ${C.border}22`,
                    cursor:"pointer",background:openTr===id?C.bg:"transparent",minHeight:30}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.orange,lineHeight:1.3}}>{de}</span>
                    <span style={{fontSize:11,color:C.muted,flexShrink:0}}>{openTr===id?"▲":"▾"}</span>
                  </div>
                  {openTr===id&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{ru}</div>}
                </div>
              ))}

              <div style={{background:C.red+"22",padding:"3px 8px",fontSize:11,
                color:C.red,fontWeight:700,borderBottom:`1px solid ${C.border}22`,
                borderTop:`1px solid ${C.border}22`}}>❌ Отказ</div>
              {[
                ["n1","Nein, leider nicht.",    "Нет, к сожалению."],
                ["n2","Das geht nicht.",        "Не подходит."],
                ["n3","Ich habe keine Lust.",   "Нет желания."],
                ["n4","Es tut mir leid.",       "Мне жаль."],
              ].map(([id,de,ru])=>(
                <div key={id} onClick={()=>toggle(id)}
                  style={{padding:"5px 8px",borderBottom:`1px solid ${C.border}22`,
                    cursor:"pointer",background:openTr===id?C.bg:"transparent",minHeight:30}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:4}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.red,lineHeight:1.3}}>{de}</span>
                    <span style={{fontSize:11,color:C.muted,flexShrink:0}}>{openTr===id?"▲":"▾"}</span>
                  </div>
                  {openTr===id&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{ru}</div>}
                </div>
              ))}
            </div>

          </div>
        </div>
      </Box>
    </div>
  );
}

const Q_L6B=[
  {q:"Imperativ (du) von 'kaufen'?\n(du kaufst → ...)",    opts:["Kaufst!","Kauf!","Kaufe!","Kaufen!"],           ans:1, hint:"Imperativ du"},
  {q:"Imperativ (ihr) von 'kommen'?\n(ihr kommt → ...)",   opts:["Kommen!","Komm!","Kommt!","Kommt ihr!"],        ans:2, hint:"Imperativ ihr"},
  {q:"Imperativ (Sie) von 'nehmen'?",                       opts:["Nimm Sie!","Nehmt Sie!","Nehmen Sie!","Nehm Sie!"], ans:2, hint:"Imperativ Sie"},
  {q:"Imperativ (du) von 'vergessen'?\n(du vergisst → ...)",opts:["Vergesse!","Vergesst!","Vergiss!","Vergessen!"],ans:2, hint:"Imperativ du ⚡"},
  {q:"Imperativ (ihr) von 'bringen'?\n(ihr bringt → ...)", opts:["Bring!","Bringt!","Bringen!","Bringet!"],       ans:1, hint:"Imperativ ihr"},
  {q:"Imperativ (Sie) von 'kaufen'?",                       opts:["Kaufst Sie!","Kauf Sie!","Kaufen Sie!","Sie kaufen!"],ans:2, hint:"Imperativ Sie"},
  {q:"Imperativ (du) von 'holen'?\n(du holst → ...)",      opts:["Holt!","Hole!","Hol!","Holen!"],                ans:2, hint:"Imperativ du"},
  {q:"Imperativ (ihr) von 'vergessen'?\n(ihr vergesst → ...)",opts:["Vergess!","Vergisst!","Vergesst!","Vergessen!"],ans:2, hint:"Imperativ ihr"},
  {q:"Как сделать Imperativ вежливее?",                     opts:["Kauf Milch!","Kauf doch bitte Milch!","Du kaufst Milch!","Sie kaufen Milch!"],ans:1, hint:"doch bitte"},
  {q:"Imperativ (du) von 'essen'?\n(du isst → ...)",        opts:["Esst!","Esse!","Iss!","Essen!"],                ans:2, hint:"Imperativ du ⚡"},
  {q:"Imperativ (du) von 'gehen'?\n(du gehst → ...)",       opts:["Gehe!","Geht!","Geh!","Gehen!"],                ans:2, hint:"Imperativ du"},
  {q:"Welcher Imperativ ist formell?",                       opts:["Kauf doch Brot!","Kauft Brot!","Kaufen Sie Brot!","Kaufst du Brot?"],ans:2, hint:"formell = Sie"},
];

function T6B(){
  const [selForm,setSelForm]=useState("du");
  const verbs=[
    {inf:"kaufen",   du:"Kauf!",    ihr:"Kauft!",    Sie:"Kaufen Sie!",    note:""},
    {inf:"holen",    du:"Hol!",     ihr:"Holt!",     Sie:"Holen Sie!",     note:""},
    {inf:"bringen",  du:"Bring!",   ihr:"Bringt!",   Sie:"Bringen Sie!",   note:""},
    {inf:"kommen",   du:"Komm!",    ihr:"Kommt!",    Sie:"Kommen Sie!",    note:""},
    {inf:"gehen",    du:"Geh!",     ihr:"Geht!",     Sie:"Gehen Sie!",     note:""},
    {inf:"trinken",  du:"Trink!",   ihr:"Trinkt!",   Sie:"Trinken Sie!",   note:""},
    {inf:"warten",   du:"Warte!",   ihr:"Wartet!",   Sie:"Warten Sie!",    note:"-e вставка"},
    {inf:"vergessen",du:"Vergiss!", ihr:"Vergesst!", Sie:"Vergessen Sie!",  note:"⚡ e→i"},
    {inf:"nehmen",   du:"Nimm!",    ihr:"Nehmt!",    Sie:"Nehmen Sie!",    note:"⚡ e→i"},
    {inf:"essen",    du:"Iss!",     ihr:"Esst!",     Sie:"Essen Sie!",     note:"⚡ e→i"},
    {inf:"einkaufen",du:"Kauf ein!",ihr:"Kauft ein!",Sie:"Kaufen Sie ein!",note:"✂️ trennbar"},
  ];
  const forms=[
    {key:"du",  label:"du",  col:C.teal,
     title:"Imperativ du — информальный, 1 человек",
     steps:["Берём du-форму: du kauf-ST","Убираем -ST и «du» → Kauf!"],
     special:"⚠️ Стемм оканчивается на -d/-t: добавь -e\n→ du wartest → Warte! | du redest → Rede!",
     examples:[["du kaufst","Kauf!"],["du holst","Hol!"],["du gehst","Geh!"],["du wartest","Warte!"]],
     usage:"С другом, в семье — на «ты»"},
    {key:"ihr", label:"ihr", col:C.purple,
     title:"Imperativ ihr — информальный, несколько",
     steps:["Берём ihr-форму: ihr kauf-T","Убираем только «ihr» → Kauft!"],
     special:"✅ Самая простая форма — ihr-форма уже готова, просто убери местоимение!",
     examples:[["ihr kauft","Kauft!"],["ihr kommt","Kommt!"],["ihr bringt","Bringt!"],["ihr wartet","Wartet!"]],
     usage:"С друзьями или семьёй — на «вы» (неформально)"},
    {key:"Sie", label:"Sie", col:C.orange,
     title:"Imperativ Sie — формальный",
     steps:["Берём инфинитив: kauf-EN","Ставим «Sie» сразу после глагола → Kaufen Sie!"],
     special:"📌 Порядок слов: ГЛАГОЛ + Sie (как в вопросе: «Kaufen Sie?»)\nГлагол стоит на 1-м месте!",
     examples:[["kaufen","Kaufen Sie!"],["nehmen","Nehmen Sie!"],["probieren","Probieren Sie!"],["bezahlen","Bezahlen Sie!"]],
     usage:"С незнакомцами, в магазине, с начальником — на «Вы»"},
  ];
  const fc=forms.find(f=>f.key===selForm);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.orange}>
        <H c={C.orange}>🛒 B · Der Einkaufszettel — Imperativ</H>

        {/* Intro block */}
        <div style={{background:C.card2,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:13,color:C.text,marginBottom:6}}>Что такое Imperativ?</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:10}}>
            Imperativ (повелительное наклонение) — форма глагола для{" "}
            <span style={{color:C.text,fontWeight:700}}>приказов, просьб, советов и инструкций</span>.{" "}
            Глагол стоит на <span style={{color:C.orange,fontWeight:700}}>первом месте</span> в предложении, местоимение не нужно (кроме Sie).
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {[
              [C.teal,  "du",  "Kauf Milch!",        "Купи молоко! (другу / члену семьи)"],
              [C.purple,"ihr", "Kauft Milch!",        "Купите молоко! (группе друзей)"],
              [C.orange,"Sie", "Kaufen Sie Milch!",   "Купите молоко, пожалуйста. (в магазине)"],
            ].map(([col,form,de,ru])=>(
              <div key={form} style={{display:"flex",alignItems:"center",gap:8,
                background:col+"11",borderRadius:8,padding:"6px 10px"}}>
                <span style={{background:col+"33",color:col,borderRadius:5,
                  padding:"1px 6px",fontSize:11,fontWeight:800,minWidth:24,textAlign:"center"}}>{form}</span>
                <span style={{fontSize:13,fontWeight:700,color:C.text,minWidth:130}}>{de}</span>
                <span style={{fontSize:11,color:C.muted}}>{ru}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form tab selector */}
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {forms.map(({key,label,col})=>(
            <button key={key} onClick={()=>setSelForm(key)}
              style={{flex:1,padding:"10px 4px",borderRadius:9,cursor:"pointer",fontWeight:800,fontSize:13,
                border:`2px solid ${selForm===key?col:C.border}`,
                background:selForm===key?col+"22":"transparent",
                color:selForm===key?col:C.muted}}>
              {label}
            </button>
          ))}
        </div>

        {/* Selected form deep-dive */}
        <div style={{background:fc.col+"15",border:`1px solid ${fc.col}44`,borderRadius:12,
          padding:"12px 14px",marginBottom:10}}>
          <div style={{fontWeight:800,fontSize:13,color:fc.col,marginBottom:10}}>{fc.title}</div>

          {/* Steps */}
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:10}}>
            {fc.steps.map((step,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                <span style={{background:fc.col,color:"#fff",borderRadius:"50%",
                  width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:11,fontWeight:800,flexShrink:0,marginTop:1}}>{i+1}</span>
                <span style={{fontSize:13,color:C.text,lineHeight:1.4,fontFamily:"monospace"}}>{step}</span>
              </div>
            ))}
          </div>

          {/* Special note */}
          <div style={{background:C.ov7,borderRadius:8,
            padding:"7px 10px",marginBottom:10,whiteSpace:"pre-line"}}>
            <span style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{fc.special}</span>
          </div>

          {/* Mini examples grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {fc.examples.map(([from,to])=>(
              <div key={from} style={{background:C.ov6,borderRadius:7,
                padding:"5px 8px",fontSize:11}}>
                <span style={{color:C.muted}}>{from}</span>
                <span style={{color:fc.col,fontWeight:800}}> → {to}</span>
              </div>
            ))}
          </div>

          <div style={{marginTop:8,fontSize:11,color:C.muted,fontStyle:"italic"}}>
            👥 {fc.usage}
          </div>
        </div>

        {/* Interactive verb table */}
        <div style={{fontSize:11,color:C.muted,marginBottom:5}}>
          📋 Таблица глаголов — форма переключается кнопками выше:
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:10}}>
          {verbs.map(({inf,du,ihr,Sie,note})=>{
            const val=selForm==="du"?du:selForm==="ihr"?ihr:Sie;
            return(
              <div key={inf} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,
                background:C.card2,borderRadius:8,padding:"6px 10px",alignItems:"center"}}>
                <span style={{fontSize:12,color:C.muted}}>
                  {inf}{note&&<span style={{fontSize:11,color:C.orange,marginLeft:4}}>{note}</span>}
                </span>
                <span style={{fontSize:14,fontWeight:800,color:fc.col}}>{val}</span>
              </div>
            );
          })}
        </div>

        {/* Sonderregeln */}
        <div style={{background:C.card2,borderRadius:10,padding:"12px 14px",marginBottom:8}}>
          <div style={{fontWeight:800,fontSize:12,color:C.orange,marginBottom:10}}>
            ⚡ Sonderregeln (Исключения)
          </div>
          {[
            {
              icon:"🔄",title:"e→i Wechsel bleibt erhalten",
              note:"Если у глагола чередование e→i в Präsens, оно остаётся в Imperativ (только du-форма!)",
              pairs:[["essen → du isst","Iss!"],["nehmen → du nimmst","Nimm!"],["vergessen → du vergisst","Vergiss!"],["sprechen → du sprichst","Sprich!"]],
              col:C.red,
            },
            {
              icon:"➕",title:"Stamm auf -d/-t: +e einfügen",
              note:"Чтобы было удобно произносить, добавляется -e",
              pairs:[["warten → du wartest","Warte!"],["reden → du redest","Rede!"]],
              col:C.blue,
            },
            {
              icon:"✂️",title:"Trennbare Verben: Präfix ans Ende",
              note:"Отделяемая приставка уходит в конец предложения",
              pairs:[["einkaufen","Kauf (bitte) ein!"],["aufmachen","Mach auf!"],["mitnehmen","Nimm mit!"]],
              col:C.teal,
            },
          ].map(({icon,title,note,pairs,col})=>(
            <div key={title} style={{marginBottom:10,paddingBottom:10,
              borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:3}}>
                {icon} {title}
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>{note}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {pairs.map(([from,to])=>(
                  <span key={from} style={{background:col+"15",border:`1px solid ${col}33`,
                    borderRadius:6,padding:"2px 8px",fontSize:11}}>
                    <span style={{color:C.muted}}>{from} → </span>
                    <span style={{color:col,fontWeight:700}}>{to}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* doch/bitte */}
        <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,borderRadius:10,padding:"10px 14px"}}>
          <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:6}}>
            🤝 doch / bitte — смягчение приказа
          </div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>
            <span style={{color:C.red,fontWeight:700}}>Kauf Milch!</span>
            <span style={{color:C.muted}}> — резко (приказ)</span><br/>
            <span style={{color:C.yellow,fontWeight:700}}>Kauf doch Milch!</span>
            <span style={{color:C.muted}}> — мягче</span><br/>
            <span style={{color:C.teal,fontWeight:700}}>Kauf doch bitte Milch!</span>
            <span style={{color:C.muted}}> — вежливо ✓</span><br/>
            <span style={{color:C.orange,fontWeight:700}}>Kaufen Sie bitte Milch!</span>
            <span style={{color:C.muted}}> — формально ✓</span>
          </div>
        </div>
      </Box>
    </div>
  );
}

const Q_L6C=[
  {q:"'Ich möchte Brot.' — форма глагола?",        opts:["mag","möchte","mögen","möchtest"],                                           ans:1, hint:"möchten"},
  {q:"Ich ___ gerne ein Kilo Äpfel. (вежл. просьба)",opts:["möchte","mag","will","habe"],                                              ans:0, hint:"möchten"},
  {q:"'Ich hätte gerne...' = ?",                    opts:["У меня есть...","Я хотел(а) бы...","Мне нравится...","Мне нужно..."],       ans:1, hint:"hätte gerne"},
  {q:"Wo kauft man Wurst? (мясная лавка)",          opts:["am Kiosk","im Supermarkt","in der Metzgerei","in der Bäckerei"],            ans:2, hint:"Einkaufsorte"},
  {q:"Wo kauft man Brötchen?",                      opts:["auf dem Markt","in der Bäckerei","am Kiosk","an der Tankstelle"],           ans:1, hint:"Einkaufsorte"},
  {q:"'Das macht zusammen 5€.' — что это значит?",  opts:["Это стоит 5€","Итого 5€","Скидка 5€","Сдача 5€"],                          ans:1, hint:"Einkauf"},
  {q:"'Haben Sie es passend?' — что спрашивают?",   opts:["Вам нравится?","У вас есть точная сумма?","Что желаете?","Всё?"],           ans:1, hint:"passend"},
  {q:"Предлог для: im Supermarkt, in der Bäckerei?",opts:["auf","an","im / in der","bei"],                                            ans:2, hint:"Präpositionen"},
  {q:"'auf dem Markt' — предлог + артикль?",         opts:["auf dem","in dem","an der","bei dem"],                                     ans:0, hint:"auf dem Markt"},
  {q:"Wie lautet die Sie-Form von möchten?",         opts:["möchtet","möchten","möchte","mag"],                                        ans:1, hint:"möchten"},
  {q:"'an der Tankstelle' — где это?",               opts:["рынок","заправка","булочная","супермаркет"],                               ans:1, hint:"Tankstelle"},
  {q:"'Ich nehme drei Stück, bitte.' — Stück = ?",   opts:["штука, кусок","литр","пачка","стаканчик"],                                ans:0, hint:"Mengen"},
];

function T6C(){
  const [selOrte,setSelOrte]=useState(null);
  const [openLines,setOpenLines]=useState(new Set());
  const togLine=(key)=>setOpenLines(s=>{const n=new Set(s);n.has(key)?n.delete(key):n.add(key);return n;});
  const orte=[
    {loc:"am Kiosk",          prep:"am",    art:"Kiosk",       ru:"в киоске",       buy:"Kaugummi, Zeitungen, Süßigkeiten", icon:"📰"},
    {loc:"im Supermarkt",     prep:"im",    art:"Supermarkt",  ru:"в супермаркете", buy:"alles: Lebensmittel, Getränke...", icon:"🛒"},
    {loc:"in der Metzgerei",  prep:"in der",art:"Metzgerei",   ru:"в мясной лавке", buy:"Wurst, Fleisch, Schinken",         icon:"🥩"},
    {loc:"auf dem Markt",     prep:"auf dem",art:"Markt",      ru:"на рынке",       buy:"Obst, Gemüse, frische Produkte",   icon:"🥦"},
    {loc:"in der Bäckerei",   prep:"in der",art:"Bäckerei",    ru:"в булочной",     buy:"Brot, Brötchen, Croissants",       icon:"🍞"},
    {loc:"an der Tankstelle", prep:"an der",art:"Tankstelle",  ru:"на заправке",    buy:"Kaugummi, Snacks, Getränke",       icon:"⛽"},
  ];
  const konj=[
    ["ich","möchte"],["wir","möchten"],
    ["du","möchtest"],["ihr","möchtet"],
    ["er/sie/es","möchte"],["sie/Sie","möchten"],
  ];
  const dialog=[
    {v:"Guten Tag, was möchten Sie?",          vRu:"Добрый день, что желаете?",
     k:"Ich hätte gerne ein Kilo Äpfel.",       kRu:"Я бы хотел(а) килограмм яблок.",       note:"hätte gerne = вежливая просьба"},
    {v:"Ein Kilo Äpfel. Noch etwas?",           vRu:"Килограмм яблок. Ещё что-нибудь?",
     k:"Was kosten die Erdbeeren?",             kRu:"Сколько стоит клубника?",               note:"kosten (мн.ч.)"},
    {v:"Das Kilo kostet 8,20€.",                vRu:"Килограмм стоит 8,20€.",
     k:"Hmm, die sind aber teuer.",             kRu:"Хм, но они же дорогие.",                note:"aber = но, однако · teuer = дорого"},
    {v:"Die Erdbeeren sind frisch und lecker.", vRu:"Клубника свежая и очень вкусная.",
     k:"Gut, dann nehme ich ein halbes Kilo.",  kRu:"Хорошо, тогда возьму полкило.",         note:"nehmen = взять, купить"},
    {v:"Darf es sonst noch etwas sein?",        vRu:"Можно ещё что-нибудь?",
     k:"Nein, danke. Das ist alles.",           kRu:"Нет, спасибо. Это всё.",                note:"sonst = ещё что-нибудь"},
    {v:"Das macht zusammen 9,00€.",             vRu:"Итого 9,00€.",
     k:"Hier bitte!",                           kRu:"Вот, пожалуйста!",                      note:"zusammen = итого"},
    {v:"Einen schönen Tag noch!",               vRu:"Хорошего дня!",
     k:"Danke, gleichfalls! Auf Wiedersehen!",  kRu:"Спасибо, взаимно! До свидания!",        note:"gleichfalls = и вам того же"},
  ];
  const mengen=[
    {abbr:"1 g",    full:"1 Gramm"},
    {abbr:"1 kg",   full:"1 Kilogramm"},
    {abbr:"1 Pfd.", full:"1 Pfund (= 500 g)"},
    {abbr:"1 l",    full:"1 Liter"},
    {abbr:"das Stück",   full:"штука (St.)"},
    {abbr:"die Scheibe", full:"ломтик"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.teal}>
        <H c={C.teal}>🛍️ B · Einkaufen — Где покупают?</H>

        <div style={{fontSize:12,color:C.muted,marginBottom:8}}>
          📍 Einkaufsorte — места покупки (нажми для подробностей)
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:14}}>
          {orte.map((o,i)=>(
            <div key={o.loc}
              onClick={()=>setSelOrte(selOrte===i?null:i)}
              style={{background:selOrte===i?C.teal+"22":C.card2,
                border:`1px solid ${selOrte===i?C.teal:C.border}`,
                borderRadius:10,padding:"10px 12px",cursor:"pointer",transition:"all .15s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:18}}>{o.icon}</span>
                <span style={{fontWeight:800,color:C.text,fontSize:13,flex:1}}>
                  <span style={{color:C.teal}}>{o.prep}</span>{" "}{o.art}
                </span>
                <span style={{fontSize:11,color:C.muted}}>{o.ru}</span>
              </div>
              {selOrte===i&&(
                <div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${C.border}`,
                  fontSize:12,color:C.muted}}>
                  🛍️ {o.buy}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{background:C.yellow+"18",border:`1px solid ${C.yellow}44`,
          borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:12,color:C.yellow,marginBottom:6}}>
            📌 Предлоги + Dativ (где? — Dativ!)
          </div>
          {[
            ["im","(= in dem) + m/n","im Supermarkt, im Kiosk"],
            ["in der","+ f","in der Bäckerei, in der Metzgerei"],
            ["auf dem","+ m","auf dem Markt"],
            ["an der","+ f","an der Tankstelle"],
            ["am","(= an dem) + m","am Kiosk"],
          ].map(([prep,rule,ex])=>(
            <div key={prep} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,fontSize:12}}>
              <span style={{color:C.yellow,fontWeight:800,minWidth:52}}>{prep}</span>
              <span style={{color:C.muted,minWidth:80,fontSize:11}}>{rule}</span>
              <span style={{color:C.text}}>{ex}</span>
            </div>
          ))}
        </div>

        <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
          borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:12,color:C.purple,marginBottom:8}}>
            ✨ möchten — хотеть (вежливо)
          </div>
          <div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.5}}>
            ⚠️ <b style={{color:C.purple}}>ich möchte = er möchte</b> — нет окончания -t!
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {konj.map(([pro,form])=>(
              <div key={pro} style={{display:"flex",gap:8,background:C.ov6,
                borderRadius:7,padding:"5px 8px",fontSize:13,alignItems:"center"}}>
                <span style={{color:C.muted,minWidth:60,fontSize:11}}>{pro}</span>
                <span style={{color:C.purple,fontWeight:800}}>{form}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:12,color:C.orange,marginBottom:6}}>
            🎩 möchten vs hätte gerne
          </div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>
            <span style={{color:C.orange,fontWeight:700}}>Ich möchte</span> ein Kilo Äpfel.
            <span style={{color:C.muted}}> — просто «хочу»</span><br/>
            <span style={{color:C.green,fontWeight:700}}>Ich hätte gerne</span> ein Kilo Äpfel.
            <span style={{color:C.muted}}> — вежливее: «я бы хотел(а)» ✓</span>
          </div>
        </div>

        <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:6}}>
          💬 Einkaufsgespräch — диалог auf dem Markt
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
          {dialog.map((d,i)=>(
            <div key={i} style={{background:C.card2,borderRadius:8,padding:"8px 10px",fontSize:12}}>
              <div onClick={()=>togLine(`${i}-v`)}
                style={{cursor:"pointer",marginBottom:4,borderRadius:6,padding:"4px 6px",
                  background:openLines.has(`${i}-v`)?C.green+"15":"transparent",
                  border:`1px solid ${openLines.has(`${i}-v`)?C.green+"44":"transparent"}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{color:C.green}}>🏪 <b>V:</b> {d.v}</span>
                  <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:6}}>{openLines.has(`${i}-v`)?"▲":"▾"}</span>
                </div>
                {openLines.has(`${i}-v`)&&(
                  <div style={{color:C.muted,fontSize:11,paddingLeft:20,marginTop:3}}>{d.vRu}</div>
                )}
              </div>
              <div onClick={()=>togLine(`${i}-k`)}
                style={{cursor:"pointer",borderRadius:6,padding:"4px 6px",
                  background:openLines.has(`${i}-k`)?C.teal+"15":"transparent",
                  border:`1px solid ${openLines.has(`${i}-k`)?C.teal+"44":"transparent"}`}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{color:C.teal}}>🙋 <b>K:</b> {d.k}</span>
                  <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:6}}>{openLines.has(`${i}-k`)?"▲":"▾"}</span>
                </div>
                {openLines.has(`${i}-k`)&&(
                  <div style={{color:C.muted,fontSize:11,paddingLeft:20,marginTop:3}}>{d.kRu}</div>
                )}
              </div>
              {d.note&&<div style={{color:C.muted,fontSize:11,marginTop:5}}>💡 {d.note}</div>}
            </div>
          ))}
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
          <div style={{fontWeight:700,fontSize:12,color:C.orange,marginBottom:8}}>
            ⚖️ Mengenangaben — единицы измерения
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {mengen.map(({abbr,full})=>(
              <div key={abbr} style={{display:"flex",gap:6,alignItems:"center",
                background:C.ov5,borderRadius:6,padding:"5px 8px"}}>
                <span style={{color:C.orange,fontWeight:800,fontSize:12,minWidth:60}}>{abbr}</span>
                <span style={{color:C.muted,fontSize:11}}>{full}</span>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}

const Q_L6D=[
  {q:"'Sie mag Schokolade.' — форма mögen?",          opts:["mögt","mag","mögen","magst"],                                             ans:1, hint:"mögen er/sie"},
  {q:"Ich ___ Wurst, aber ich ___ keinen Käse.",      opts:["mag / mag","mögen / mögen","mag / magst","möchte / möchte"],             ans:0, hint:"mögen ich=er"},
  {q:"kein- + ___ (что ставится после kein-)?",       opts:["Adjektiv","Nomen","Verb","Adverb"],                                      ans:1, hint:"kein + Nomen"},
  {q:"'Ich mag keinen Kaffee.' → keinen потому что:", opts:["f-форма","n-форма","m Akkusativ","pl-форма"],                            ans:2, hint:"Akkusativ m"},
  {q:"'Ich trinke nicht gern Kaffee.' → nicht + ?",   opts:["Nomen","Verb/Adverb","Artikel","Adjektiv"],                             ans:1, hint:"nicht + Verb"},
  {q:"Отрицание: 'Ich mag ___ Fisch.' (m Akk.)",      opts:["keine","kein","keinen","nicht"],                                        ans:2, hint:"kein Akkusativ m"},
  {q:"Отрицание: 'Ich mag ___ Milch.' (f)",           opts:["keinen","kein","keine","nicht"],                                        ans:2, hint:"kein f"},
  {q:"Отрицание: 'Ich mag ___ Brot.' (n)",            opts:["keine","keinen","kein","nicht"],                                        ans:2, hint:"kein n"},
  {q:"mögen vs möchten: 'Ich ___ heute Pizza.' (хочу сейчас)", opts:["mag","möchte","mögen","magst"],                               ans:1, hint:"möchten = сейчас"},
  {q:"mögen vs möchten: 'Ich ___ Pasta.' (люблю вообще)",      opts:["möchte","möchten","mag","magst"],                             ans:2, hint:"mögen = вообще"},
  {q:"Отрицание Pl.: 'Ich mag ___ Bratkartoffeln.'",  opts:["keinen","kein","keiner","keine"],                                       ans:3, hint:"kein Plural"},
  {q:"'Sie isst nicht gerne Käse.' = ?",              opts:["Sie mag keinen Käse.","Sie isst Käse.","Sie kauft keinen Käse.","Sie mag Käse."], ans:0, hint:"kein = nicht gerne"},
];

function T6D(){
  const [tab,setTab]=useState("mögen");
  const moegen=[
    ["ich","mag"],["wir","mögen"],
    ["du","magst"],["ihr","mögt"],
    ["er/sie/es","mag"],["sie/Sie","mögen"],
  ];
  const keinRows=[
    {genus:"m", bsp:"der Kaffee / Käse",       akk:"keinen Kaffee / Käse",        col:C.blue},
    {genus:"n", bsp:"das Brot / Fleisch",       akk:"kein Brot / Fleisch",         col:C.orange},
    {genus:"f", bsp:"die Milch / Wurst",        akk:"keine Milch / Wurst",         col:C.purple},
    {genus:"pl",bsp:"— Bratkartoffeln / Erbsen",akk:"keine Bratkartoffeln / Erbsen",col:C.teal},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.purple}>
        <H c={C.purple}>❤️ C · Das mag ich — Предпочтения</H>

        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["mögen","mögen"],["vs","mögen vs möchten"],["kein","kein- vs nicht"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.purple+"33":"transparent",
                color:tab===key?C.purple:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>

        {tab==="mögen"&&(
          <div>
            <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.purple,marginBottom:10}}>
                Спряжение: mögen
              </div>
              <div style={{background:C.red+"15",border:`1px solid ${C.red}33`,
                borderRadius:8,padding:"7px 10px",marginBottom:10,fontSize:12}}>
                ⚠️ <b style={{color:C.red}}>ich mag = er/sie mag</b> — нет окончания!
                <span style={{color:C.muted}}> (неправильный глагол)</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                {moegen.map(([pro,form])=>(
                  <div key={pro} style={{display:"flex",gap:8,background:C.ov6,
                    borderRadius:7,padding:"6px 10px",fontSize:13,alignItems:"center"}}>
                    <span style={{color:C.muted,minWidth:60,fontSize:11}}>{pro}</span>
                    <span style={{color:C.purple,fontWeight:800}}>{form}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:8}}>Примеры:</div>
              {[
                ["Susanna mag Wurst, aber sie mag keinen Käse.","Сюзанна любит колбасу, но не любит сыр."],
                ["Ich mag Fisch.","Я люблю рыбу."],
                ["Was magst du?","Что тебе нравится?"],
                ["Ich mag keine Bratkartoffeln.","Мне не нравится жареная картошка."],
              ].map(([de,ru])=>(
                <div key={de} style={{marginBottom:6,paddingBottom:6,
                  borderBottom:`1px solid ${C.border}`,fontSize:12}}>
                  <div style={{color:C.text,fontWeight:600}}>{de}</div>
                  <div style={{color:C.muted,fontSize:11}}>{ru}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="vs"&&(
          <div>
            <div style={{background:C.card2,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.text,marginBottom:10}}>
                mögen vs möchten — в чём разница?
              </div>
              {[
                {verb:"mögen",  conj:"ich mag",     ru:"любить (в принципе)", ex:"Ich mag Pizza.",           note:"постоянное предпочтение"},
                {verb:"möchten",conj:"ich möchte",  ru:"хотеть (прямо сейчас)",ex:"Ich möchte (jetzt) Pizza.",note:"желание в данный момент"},
              ].map(({verb,conj,ru,ex,note})=>(
                <div key={verb} style={{background:C.ov5,borderRadius:8,
                  padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span style={{background:C.purple+"33",color:C.purple,borderRadius:6,
                      padding:"2px 8px",fontSize:12,fontWeight:800}}>{verb}</span>
                    <span style={{color:C.text,fontWeight:700,fontSize:13}}>{conj}</span>
                  </div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:4}}>📌 {ru}</div>
                  <div style={{fontSize:13,color:C.text,fontWeight:600}}>{ex}</div>
                  <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{note}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.yellow+"15",border:`1px solid ${C.yellow}33`,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
                <b style={{color:C.yellow}}>Ich mag Pizza.</b> — Я люблю пиццу (всегда) ✅<br/>
                <b style={{color:C.teal}}>Ich möchte (jetzt) Pizza.</b> — Я хочу пиццу (сейчас) ✅<br/>
                <br/>
                Вопросы: <b style={{color:C.text}}>Was magst du?</b> / <b style={{color:C.text}}>Was möchtest du?</b>
              </div>
            </div>
          </div>
        )}

        {tab==="kein"&&(
          <div>
            <div style={{background:C.card2,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.red,marginBottom:10}}>
                🚫 kein- + Nomen vs nicht + Verb
              </div>
              <div style={{background:C.red+"15",border:`1px solid ${C.red}33`,
                borderRadius:8,padding:"8px 10px",marginBottom:10}}>
                <div style={{fontSize:12,lineHeight:1.9}}>
                  <b style={{color:C.red}}>kein-</b><span style={{color:C.muted}}> + Nomen: </span>
                  <b style={{color:C.text}}>Ich mag keinen Kaffee.</b>
                  <span style={{color:C.muted,fontSize:11}}> → отрицание предмета</span><br/>
                  <b style={{color:C.orange}}>nicht</b><span style={{color:C.muted}}> + gern: </span>
                  <b style={{color:C.text}}>Ich trinke nicht gern Kaffee.</b>
                  <span style={{color:C.muted,fontSize:11}}> → отрицание действия</span>
                </div>
              </div>
              <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:6}}>
                Akkusativ kein — по роду:
              </div>
              {keinRows.map(({genus,bsp,akk,col})=>(
                <div key={genus} style={{display:"flex",gap:8,alignItems:"center",
                  background:col+"10",borderRadius:7,padding:"6px 10px",marginBottom:4}}>
                  <span style={{background:col+"33",color:col,borderRadius:4,
                    padding:"1px 6px",fontSize:11,fontWeight:800,minWidth:18,
                    textAlign:"center"}}>{genus}</span>
                  <span style={{color:C.muted,fontSize:11,flex:1}}>{bsp}</span>
                  <span style={{color:col,fontWeight:800,fontSize:12}}>→ {akk}</span>
                </div>
              ))}
            </div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.orange,marginBottom:6}}>
                💡 Только m меняется в Akkusativ!
              </div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>
                m: <b style={{color:C.blue}}>keinen</b> Käse / Kaffee / Fisch<br/>
                n: <b style={{color:C.orange}}>kein</b> Brot / Fleisch / Bier<br/>
                f: <b style={{color:C.purple}}>keine</b> Milch / Wurst / Cola<br/>
                pl: <b style={{color:C.teal}}>keine</b> Bratkartoffeln / Erbsen
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L6E=[
  {q:"'Man' спрягается как:",                       opts:["ich","du","er/sie/es","wir"],                                              ans:2, hint:"man = er"},
  {q:"'Man isst' = ?",                               opts:["Я ем","Ты ешь","Едят / принято есть","Мы едим"],                         ans:2, hint:"man = viele"},
  {q:"Wann isst man in Deutschland zu Mittag?",      opts:["8–10 Uhr","12–14 Uhr","15–17 Uhr","18–20 Uhr"],                         ans:1, hint:"Mittagessen"},
  {q:"Was isst man zum Frühstück in Deutschland?",   opts:["Fleisch und Kartoffeln","Brot mit Käse/Wurst, Kaffee","Pizza","Suppe"], ans:1, hint:"Frühstück"},
  {q:"'Das Abendessen ist oft kalt.' — когда?",      opts:["morgens","mittags","abends","nachts"],                                    ans:2, hint:"Abendessen"},
  {q:"'Kaffee und Kuchen' — wann?",                  opts:["zum Frühstück","zum Mittagessen","am Sonntagnachmittag","abends"],       ans:2, hint:"Kaffee und Kuchen"},
  {q:"Wo essen viele Deutsche zu Mittag?",           opts:["zu Hause","in der Bäckerei","in der Kantine / am Imbiss","im Supermarkt"], ans:2, hint:"Kantine"},
  {q:"'Man backt den Kuchen selbst.' — Man = ?",     opts:["я","он","люди / принято","мы"],                                          ans:2, hint:"man"},
];

function T6E(){
  const [selMeal,setSelMeal]=useState(0);
  const meals=[
    {id:0,icon:"☕",name:"Frühstück",     time:"7:00 – 8:00 Uhr",        ru:"Завтрак",
     foods:["Brot mit Honig oder Marmelade","Käse oder Wurst","Müsli mit Obst","Kaffee oder Tee (Kinder: Milch / Kakao)"],
     note:"Am Wochenende auch später.",col:C.yellow},
    {id:1,icon:"🍲",name:"Mittagessen",   time:"12:00 – 14:00 Uhr",      ru:"Обед",
     foods:["Suppe, Spaghetti","Fleisch mit Kartoffeln und Salat","Zum Nachtisch: Pudding oder Eis"],
     note:"Oft in der Kantine oder am Imbiss. Das Mittagessen ist warm.",col:C.orange},
    {id:2,icon:"🧀",name:"Abendessen",    time:"18:00 – 19:00 Uhr",      ru:"Ужин",
     foods:["Brot, Käse- und Wurstplatte","Dose Fisch, Gurken","Bier oder Tee (Kinder: Apfelsaft / Orangensaft)"],
     note:"Das Abendessen ist oft kalt.",col:C.blue},
    {id:3,icon:"🍰",name:"Kaffee & Kuchen",time:"Sonntagnachmittag",     ru:"Кофе и пирог",
     foods:["Kaffee mit Kuchen und Sahne","manchmal selbst gebacken","oder aus der Bäckerei / Konditorei"],
     note:"Am Sonntagnachmittag mit Familie und Freunden.",col:C.teal},
  ];
  const meal=meals[selMeal];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.green}>
        <H c={C.green}>🇩🇪 D · Essen in Deutschland</H>

        <div style={{background:C.green+"15",border:`1px solid ${C.green}33`,
          borderRadius:10,padding:"10px 12px",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:12,color:C.green,marginBottom:8}}>
            👥 Местоимение man
          </div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7,marginBottom:8}}>
            <b style={{color:C.green}}>man</b> = «люди», «все», «принято» (= viele Leute oder alle)<br/>
            Спрягается как <b style={{color:C.text}}>er / es / sie</b>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {[
              ["Man isst Brot zum Frühstück.","На завтрак (обычно) едят хлеб."],
              ["Man trinkt Kaffee oder Tee.","Пьют кофе или чай."],
              ["Man backt den Kuchen selbst.","Торт пекут сами."],
              ["In Spanien isst man oft spät.","В Испании обычно едят поздно."],
            ].map(([de,ru])=>(
              <div key={de} style={{background:C.ov6,borderRadius:7,
                padding:"6px 10px",fontSize:12}}>
                <span style={{color:C.text}}>{de}</span>
                <span style={{color:C.muted,fontSize:11,display:"block",marginTop:2}}>{ru}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{fontSize:12,color:C.muted,marginBottom:8}}>
          🕐 Essenszeiten in Deutschland:
        </div>
        <div style={{display:"flex",gap:5,marginBottom:10}}>
          {meals.map((m,i)=>(
            <button key={m.id} onClick={()=>setSelMeal(i)}
              style={{flex:1,padding:"10px 4px",borderRadius:9,cursor:"pointer",
                fontSize:11,fontWeight:800,border:`2px solid ${selMeal===i?m.col:C.border}`,
                background:selMeal===i?m.col+"22":"transparent",
                color:selMeal===i?m.col:C.muted}}>
              {m.icon}<br/>{m.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div style={{background:meal.col+"15",border:`1px solid ${meal.col}33`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:24}}>{meal.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:14,color:meal.col}}>{meal.name}</div>
              <div style={{fontSize:11,color:C.muted}}>{meal.time} · {meal.ru}</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
            {meal.foods.map(f=>(
              <div key={f} style={{display:"flex",gap:6,alignItems:"center",fontSize:12}}>
                <span style={{color:meal.col}}>•</span>
                <span style={{color:C.text}}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.ov6,borderRadius:7,
            padding:"6px 10px",fontSize:11,color:C.muted,fontStyle:"italic"}}>
            💡 {meal.note}
          </div>
        </div>

        <div style={{background:C.card2,borderRadius:10,padding:"10px 12px",marginTop:10}}>
          <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:6}}>
            🏢 Wo isst man zu Mittag?
          </div>
          {[
            ["🏢 in der Kantine","В рабочей или школьной столовой"],
            ["🌭 am Imbiss","В закусочной (быстро и недорого)"],
            ["🏠 zu Hause","Дома (если живёшь рядом)"],
          ].map(([de,ru])=>(
            <div key={de} style={{display:"flex",gap:8,marginBottom:4,fontSize:12}}>
              <span style={{color:C.text,flex:1}}>{de}</span>
              <span style={{color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

const Q_L7A=[
  {q:"'Ich ___ früh aufstehen.' (обязан)",       opts:["will","kann","muss","soll"],                                      ans:2, hint:"müssen"},
  {q:"'Er ___ gut Klavier spielen.' (умеет)",    opts:["muss","will","soll","kann"],                                      ans:3, hint:"können"},
  {q:"'Ich ___ heute ins Kino gehen.' (хочу)",   opts:["muss","soll","will","kann"],                                      ans:2, hint:"wollen"},
  {q:"'Du ___ mehr Wasser trinken.' (совет врача)",opts:["musst","willst","kannst","sollst"],                             ans:3, hint:"sollen"},
  {q:"Где Infinitiv в предложении с Modalverb?", opts:["на 2-м месте","в конце","на 1-м месте","перед Modalverb"],        ans:1, hint:"Satzklammer"},
  {q:"Ich ___ morgen arbeiten. (ich/müssen)",     opts:["muss","musse","musst","müsse"],                                   ans:0, hint:"ich muss"},
  {q:"Er ___ gut Deutsch. (können, er)",          opts:["kannst","können","könnt","kann"],                                 ans:3, hint:"er kann"},
  {q:"Wir ___ viel reisen. (wollen)",             opts:["wollt","wollen","will","willst"],                                 ans:1, hint:"wir wollen"},
  {q:"Ich ___ als Kellner arbeiten. (Beruf)",     opts:["bin","arbeite","heiße","lerne"],                                  ans:1, hint:"arbeiten als"},
  {q:"'Ich bin Arzt von Beruf.' → артикль?",     opts:["ein Arzt","der Arzt","Arzt","einen Arzt"],                        ans:2, hint:"Berufe ohne Artikel"},
  {q:"Ich ___ morgen nicht kommen. (können, neg)",opts:["kann nicht","nicht kann","kannst nicht","muss nicht"],           ans:0, hint:"Satzklammer"},
  {q:"'Sie soll viel schlafen.' — soll от?",     opts:["wollen","können","sollen","müssen"],                              ans:2, hint:"sollen"},
];
function T7A(){
  const [tab,setTab]=useState("modal");
  const berufe=[
    {m:"Kellner",       f:"Kellnerin",       ru:"официант",           wo:"im Restaurant"},
    {m:"Koch",          f:"Köchin",          ru:"повар",              wo:"in der Küche"},
    {m:"Krankenpfleger",f:"Krankenschwester",ru:"медбрат/медсестра",  wo:"im Krankenhaus"},
    {m:"Hausmeister",   f:"Hausmeisterin",   ru:"завхоз",             wo:"im Haus"},
    {m:"Bankkaufmann",  f:"Bankkauffrau",    ru:"банковский служащий",wo:"in der Bank"},
    {m:"Programmierer", f:"Programmiererin", ru:"программист",        wo:"im Büro"},
    {m:"Briefträger",   f:"Briefträgerin",   ru:"почтальон",          wo:"draußen"},
    {m:"Taxifahrer",    f:"Taxifahrerin",    ru:"таксист",            wo:"im Auto"},
    {m:"Sekretär",      f:"Sekretärin",      ru:"секретарь",          wo:"im Büro"},
    {m:"Altenpfleger",  f:"Altenpflegerin",  ru:"сиделка (пожилых)",  wo:"zu Hause / Heim"},
  ];
  const modals=[
    {v:"können",col:C.green, ich:"kann",  du:"kannst",  er:"kann",  wir:"können", ihr:"könnt",  sie:"können",  ru:"мочь, уметь",    bsp:"Ich kann gut kochen."},
    {v:"müssen", col:C.orange,ich:"muss",  du:"musst",   er:"muss",  wir:"müssen", ihr:"müsst",  sie:"müssen",  ru:"быть обязанным", bsp:"Ich muss arbeiten."},
    {v:"wollen", col:C.red,   ich:"will",  du:"willst",  er:"will",  wir:"wollen", ihr:"wollt",  sie:"wollen",  ru:"хотеть (намерение)",bsp:"Ich will reisen."},
    {v:"sollen", col:C.teal,  ich:"soll",  du:"sollst",  er:"soll",  wir:"sollen", ihr:"sollt",  sie:"sollen",  ru:"должен (по чужой воле)",bsp:"Du sollst schlafen."},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.blue}>
        <H c={C.blue}>💼 A · Berufe & Modalverben</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["modal","Modalverben"],["berufe","Berufe"],["klammer","Satzklammer"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.blue+"33":"transparent",
                color:tab===key?C.blue:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="modal"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>
              ⚠️ Все модальные глаголы: <b style={{color:C.text}}>ich = er/sie/es</b> (нет окончания!)
            </div>
            {modals.map(m=>(
              <div key={m.v} style={{background:m.col+"15",border:`1px solid ${m.col}33`,borderRadius:10,padding:"10px 12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{color:m.col,fontWeight:800,fontSize:14}}>{m.v}</span>
                  <span style={{color:C.muted,fontSize:11}}>{m.ru}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,marginBottom:6}}>
                  {[["ich",m.ich],["wir",m.wir],["du",m.du],["ihr",m.ihr],["er/sie/es",m.er],["sie/Sie",m.sie]].map(([p,f])=>(
                    <div key={p} style={{display:"flex",gap:6,background:C.ov6,
                      borderRadius:6,padding:"4px 8px",fontSize:12}}>
                      <span style={{color:C.muted,minWidth:56,fontSize:11}}>{p}</span>
                      <span style={{color:m.col,fontWeight:800}}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>💬 {m.bsp}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="berufe"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>
              💡 <b style={{color:C.text}}>Ich bin Kellner.</b> (без артикля!)
              <span style={{color:C.muted}}> / </span>
              <b style={{color:C.text}}>Ich arbeite als Kellner.</b>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {berufe.map(b=>(
                <div key={b.m} style={{background:C.card2,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{display:"flex",gap:4,justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.text}}>{b.m} / {b.f}</span>
                    <span style={{fontSize:11,color:C.muted}}>{b.ru}</span>
                  </div>
                  <div style={{fontSize:11,color:C.blue,marginTop:3}}>📍 {b.wo}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="klammer"&&(
          <div>
            <div style={{background:C.yellow+"18",border:`1px solid ${C.yellow}44`,borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.yellow,marginBottom:8}}>🔑 Satzklammer</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.7}}>
                Модальный глагол — на <b style={{color:C.yellow}}>2-м месте</b><br/>
                Инфинитив — <b style={{color:C.orange}}>в конце предложения</b>
              </div>
              {[
                ["Ich","muss","morgen früh","aufstehen","Я должен(а) рано встать"],
                ["Er","kann","gut","schwimmen","Он умеет хорошо плавать"],
                ["Wir","wollen","heute","ins Kino gehen","Мы хотим сходить в кино сегодня"],
                ["Sie","soll","viel Tee","trinken","Ей нужно много пить чая"],
              ].map(([sub,modal,mid,inf,ru])=>(
                <div key={sub} style={{background:C.ov6,borderRadius:8,
                  padding:"8px 10px",marginBottom:6,fontSize:12}}>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center",marginBottom:4}}>
                    <span style={{color:C.text}}>{sub}</span>
                    <span style={{background:C.yellow+"33",color:C.yellow,fontWeight:800,
                      borderRadius:4,padding:"1px 6px"}}>{modal}</span>
                    <span style={{color:C.text}}>{mid}</span>
                    <span style={{background:C.orange+"33",color:C.orange,fontWeight:800,
                      borderRadius:4,padding:"1px 6px"}}>{inf}.</span>
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>{ru}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L7B=[
  {q:"Geldautomat = ?",                        opts:["банкомат","кассир","квитанция","переводной бланк"],           ans:0, hint:"Geldautomat"},
  {q:"'überweisen' = ?",                       opts:["снять деньги","оплатить наличными","перевести деньги","открыть счёт"],ans:2,hint:"überweisen"},
  {q:"IBAN — что это?",                        opts:["международный номер счёта","выписка","номер карты","PIN-код"],  ans:0, hint:"IBAN"},
  {q:"'Kontoauszug' = ?",                      opts:["бланк перевода","выписка со счёта","кредитная карта","номер счёта"],ans:1,hint:"Kontoauszug"},
  {q:"'Ich möchte Geld überweisen.' + ___",    opts:["Geldautomat","Überweisungsformular","Kontonummer","EC-Karte"],  ans:1, hint:"formular"},
  {q:"'das Konto, Konten' — что это?",         opts:["квитанция","банковская карта","банковский счёт","перевод"],    ans:2, hint:"Konto"},
];
function T7B(){
  const bank=[
    {icon:"🏧",de:"der Geldautomat",      ru:"банкомат",                       bsp:"Ich hebe Geld am Geldautomaten ab."},
    {icon:"💳",de:"die EC-Karte",         ru:"банковская карта (дебетовая)",    bsp:"Bezahlen Sie mit EC-Karte?"},
    {icon:"🔢",de:"die Kontonummer",      ru:"номер счёта",                     bsp:"Meine Kontonummer ist..."},
    {icon:"📄",de:"der Kontoauszug",      ru:"выписка со счёта",                bsp:"Ich drucke den Kontoauszug aus."},
    {icon:"🌍",de:"die IBAN",             ru:"IBAN (международный номер счёта)",bsp:"DE46 1003 0000 0036 2057 00"},
    {icon:"📋",de:"das Überweisungsformular",ru:"бланк банковского перевода",   bsp:"Füllen Sie das Formular aus."},
    {icon:"🏦",de:"das Konto",            ru:"банковский счёт",                 bsp:"Ich habe ein Konto bei der Sparkasse."},
    {icon:"💸",de:"überweisen",           ru:"переводить деньги",               bsp:"Ich überweise 200 Euro."},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.orange}>
        <H c={C.orange}>🏦 B · Rund ums Geld — Банк</H>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {bank.map(b=>(
            <div key={b.de} style={{background:C.card2,borderRadius:9,padding:"10px 12px"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:20}}>{b.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,color:C.orange,fontSize:13}}>{b.de}</div>
                  <div style={{color:C.muted,fontSize:11}}>{b.ru}</div>
                </div>
              </div>
              <div style={{fontSize:11,color:C.muted,fontStyle:"italic",paddingLeft:32}}>
                💬 {b.bsp}
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

const Q_L7C=[
  {q:"'mit + Dativ' — артикль m/n?",            opts:["der","dem","den","die"],                                       ans:1, hint:"Dativ m/n = dem"},
  {q:"'bei + Dativ' — артикль f?",              opts:["dem","den","der","die"],                                       ans:2, hint:"Dativ f = der"},
  {q:"'mit den Kindern' — Dativ Plural на?",    opts:["-en","-er","-n","-em"],                                        ans:2, hint:"Plural Dativ = den + -n"},
  {q:"zu + dem = ?",                            opts:["zum","zur","beim","vom"],                                       ans:0, hint:"Kontraktion"},
  {q:"bei + dem = ?",                           opts:["zum","zur","beim","vom"],                                       ans:2, hint:"Kontraktion"},
  {q:"von + dem = ?",                           opts:["zum","zur","beim","vom"],                                       ans:3, hint:"Kontraktion"},
  {q:"zu + der = ?",                            opts:["zum","zur","beim","vom"],                                       ans:1, hint:"Kontraktion f"},
  {q:"'Wohin fährst du?' → zur Schule. = ?",   opts:["Wo?","Woher?","Wohin?","Wann?"],                                ans:2, hint:"Wohin? → zu"},
  {q:"'Woher kommst du?' → vom Arzt. = ?",      opts:["Wo?","Woher?","Wohin?","Wann?"],                               ans:1, hint:"Woher? → von"},
  {q:"nach Hause / zu Hause / von zu Hause — 'Ich bin ___'", opts:["nach Hause","zu Hause","von zu Hause","beim Hause"],ans:1,hint:"zu Hause = дома"},
  {q:"'Seit einem Jahr wohne ich hier.' seit = ?",opts:["Akkusativ","Dativ","Nominativ","Genitiv"],                   ans:1, hint:"seit + Dativ"},
  {q:"'Wir fahren mit dem Bus.' mit = ?",        opts:["Akkusativ","Nominativ","Dativ","Genitiv"],                    ans:2, hint:"mit + Dativ"},
];
function T7C(){
  const [tab,setTab]=useState("artikel");
  const praeps=[
    {p:"aus",   ru:"из (происхождение)",        bsp:["Er kommt aus der Ukraine.","Wir trinken Tee aus der Tasse."]},
    {p:"bei",   ru:"у, при (место/работа)",     bsp:["Sara ist bei Lisa.","Mein Vater arbeitet bei Mercedes."]},
    {p:"mit",   ru:"с (вместе/на чём)",         bsp:["Ich fahre mit dem Bus.","Ich spiele mit dem Ball."]},
    {p:"nach",  ru:"в (гор/страну); после",     bsp:["Er fährt nach Deutschland.","Nach dem Unterricht gehe ich spazieren."]},
    {p:"von",   ru:"от, из (принадлежность)",   bsp:["Ich komme vom Arzt.","Ein Freund von mir."]},
    {p:"seit",  ru:"с (времени), уже…",         bsp:["Seit einem Jahr lerne ich Deutsch.","Seit Juni wohne ich hier."]},
    {p:"zu",    ru:"к (человеку/месту)",        bsp:["Ich gehe zum Arzt.","Ich fahre zur Schule."]},
    {p:"ab",    ru:"с (времени), начиная с",    bsp:["Ab Dienstag ist das Geschäft geöffnet.","Ab nächster Woche."]},
  ];
  const kontr=[
    {long:"zu + dem",  short:"zum",  ex:"zum Bahnhof, zum Arzt"},
    {long:"zu + der",  short:"zur",  ex:"zur Schule, zur Bank"},
    {long:"bei + dem", short:"beim", ex:"beim Arzt, beim Bäcker"},
    {long:"von + dem", short:"vom",  ex:"vom Arzt, vom Bahnhof"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.purple}>
        <H c={C.purple}>🗺️ C · Dativ-Präpositionen</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["artikel","Dativ-Artikel"],["praep","Präpositionen"],["wo","Wo/Wohin/Woher"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.purple+"33":"transparent",
                color:tab===key?C.purple:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="artikel"&&(
          <div>
            <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.purple,marginBottom:8}}>
                Артикль в Dativ (Wo? Womit? С кем/чем?)
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:8}}>
                {[["m","dem",C.blue],["n","dem",C.orange],["f","der",C.purple],["Pl","den",C.teal]].map(([g,art,col])=>(
                  <div key={g} style={{background:col+"15",borderRadius:8,padding:"8px",textAlign:"center"}}>
                    <div style={{fontSize:11,color:col,fontWeight:800,marginBottom:4}}>{g}</div>
                    <div style={{fontSize:16,color:col,fontWeight:800}}>{art}</div>
                  </div>
                ))}
              </div>
              <div style={{background:C.red+"15",borderRadius:7,padding:"6px 10px",fontSize:11,color:C.muted}}>
                ⚠️ <b style={{color:C.red}}>Plural Dativ</b>: Nomen bekommt immer <b style={{color:C.red}}>-n</b>!<br/>
                Kinder → mit den Kinder<b style={{color:C.red}}>n</b> / Freunden / Eltern
              </div>
            </div>
            <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:6}}>
              🔗 Kontraktionen (слияния):
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {kontr.map(k=>(
                <div key={k.long} style={{display:"flex",gap:8,background:C.card2,
                  borderRadius:7,padding:"7px 10px",alignItems:"center",fontSize:12}}>
                  <span style={{color:C.muted,minWidth:80}}>{k.long}</span>
                  <span style={{color:C.text,fontSize:18}}>→</span>
                  <span style={{color:C.purple,fontWeight:800,minWidth:36}}>{k.short}</span>
                  <span style={{color:C.muted,fontSize:11}}>{k.ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="praep"&&(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {praeps.map(p=>(
              <div key={p.p} style={{background:C.card2,borderRadius:8,padding:"9px 11px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                  <span style={{background:C.purple+"33",color:C.purple,fontWeight:800,fontSize:13,
                    borderRadius:6,padding:"2px 9px"}}>{p.p}</span>
                  <span style={{color:C.muted,fontSize:11}}>{p.ru} + Dativ</span>
                </div>
                {p.bsp.map(b=>(
                  <div key={b} style={{fontSize:12,color:C.text,paddingLeft:4,marginBottom:2}}>• {b}</div>
                ))}
              </div>
            ))}
          </div>
        )}
        {tab==="wo"&&(
          <div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
              {[
                {q:"Wo?",     emoji:"📍",ru:"Где?",     p:"bei",ex:["beim Arzt","bei der Chefin"]},
                {q:"Wohin?",  emoji:"➡️",ru:"Куда?",    p:"zu",ex:["zum Arzt","zur Schule"]},
                {q:"Woher?",  emoji:"⬅️",ru:"Откуда?",  p:"von",ex:["vom Arzt","von der Chefin"]},
              ].map(r=>(
                <div key={r.q} style={{background:C.card2,borderRadius:9,padding:"10px 12px"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:16}}>{r.emoji}</span>
                    <span style={{fontWeight:800,color:C.purple,fontSize:13}}>{r.q}</span>
                    <span style={{color:C.muted,fontSize:11}}>{r.ru}</span>
                    <span style={{marginLeft:"auto",background:C.purple+"22",color:C.purple,
                      borderRadius:5,padding:"2px 7px",fontSize:11,fontWeight:700}}>{r.p}+Dativ</span>
                  </div>
                  {r.ex.map(e=><div key={e} style={{fontSize:12,color:C.text,paddingLeft:24}}>• {e}</div>)}
                </div>
              ))}
            </div>
            <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:6}}>🏠 zu Hause / nach Hause</div>
              {[
                ["Wo bist du?",     "Ich bin zu Hause.",         "я дома"],
                ["Wohin gehst du?", "Ich gehe nach Hause.",      "я иду домой"],
                ["Woher kommst du?","Ich komme von zu Hause.",   "я из дома"],
              ].map(([q,a,ru])=>(
                <div key={q} style={{marginBottom:5,fontSize:12}}>
                  <span style={{color:C.muted}}>{q} → </span>
                  <span style={{color:C.teal,fontWeight:700}}>{a}</span>
                  <span style={{color:C.muted,fontSize:11}}> ({ru})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L8B=[
  {q:"ich → Akkusativ = ?",                       opts:["mir","mich","ich","man"],                                      ans:1, hint:"ich→mich"},
  {q:"du → Akkusativ = ?",                         opts:["dir","du","dich","sich"],                                     ans:2, hint:"du→dich"},
  {q:"er → Akkusativ = ?",                         opts:["ihm","ihn","er","es"],                                        ans:1, hint:"er→ihn"},
  {q:"wir → Akkusativ = ?",                        opts:["wir","uns","euch","sich"],                                    ans:1, hint:"wir→uns"},
  {q:"'Holst du ___ ab?' (mich/ich)",              opts:["ich","mir","mich","man"],                                     ans:2, hint:"mich"},
  {q:"'Ich rufe ___ an.' (er → Akk)",              opts:["er","ihm","ihn","es"],                                        ans:2, hint:"ihn"},
  {q:"'Sie besuchen ___.' (wir → Akk)",            opts:["wir","uns","euch","sich"],                                    ans:1, hint:"uns"},
  {q:"'Kannst du ___ helfen?' (ich → Akk)",        opts:["mich","mir","ich","man"],                                     ans:0, hint:"mich"},
  {q:"ihr → Akkusativ = ?",                        opts:["euer","ihr","euch","sich"],                                   ans:2, hint:"ihr→euch"},
  {q:"'Soll ich ___ mitbringen?' (du → Akk)",      opts:["dir","du","dich","sich"],                                     ans:2, hint:"dich"},
  {q:"'Er ruft ___ an.' (sie, Sg. → Akk)",         opts:["ihr","sie","sich","ihn"],                                     ans:1, hint:"sie→sie (Akk)"},
  {q:"sie (Pl.) → Akkusativ = ?",                  opts:["ihnen","sie","sich","deren"],                                 ans:1, hint:"sie→sie"},
];
function T8B(){
  const [openEx,setOpenEx]=useState(null);
  const pronomen=[
    {nom:"ich",    akk:"mich", col:C.blue},
    {nom:"wir",    akk:"uns",  col:C.blue},
    {nom:"du",     akk:"dich", col:C.green},
    {nom:"ihr",    akk:"euch", col:C.green},
    {nom:"er",     akk:"ihn",  col:C.orange},
    {nom:"sie/Sie",akk:"sie/Sie",col:C.purple},
    {nom:"es",     akk:"es",   col:C.teal},
    {nom:"sie (Pl.)",akk:"sie",col:C.purple},
  ];
  const examples=[
    {de:"Herr Huth braucht Hilfe. Ein Kollege bringt ihn zum Arzt.",  ru:"Herr Huth нуждается в помощи. Коллега везёт его к врачу.", pro:"ihn (er→ihn)"},
    {de:"Holst du mich morgen ab?",                                    ru:"Ты заберёшь меня завтра?",                                 pro:"mich (ich→mich)"},
    {de:"Kannst du mir bitte helfen? — Ja, klar kann ich dich unterstützen!",ru:"Можешь мне помочь? — Да, конечно могу тебя поддержать!", pro:"mich, dich"},
    {de:"Wann soll ich euch besuchen?",                                ru:"Когда мне вас навестить?",                                  pro:"euch (ihr→euch)"},
    {de:"Rufst du deinen Chef an? — Ja, ich rufe ihn an.",             ru:"Ты звонишь своему шефу? — Да, я звоню ему.",                pro:"ihn (er→ihn)"},
    {de:"Soll ich den Bademantel mitbringen? — Ja, bring ihn mit.",    ru:"Принести халат? — Да, принеси его.",                        pro:"ihn (der Bademantel)"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.orange}>
        <H c={C.orange}>🔄 B · Personalpronomen Akkusativ</H>
        <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
          borderRadius:10,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontWeight:800,fontSize:12,color:C.orange,marginBottom:10}}>
            Nominativ → Akkusativ
          </div>
          <div style={{fontSize:11,color:C.muted,marginBottom:10}}>
            ❓ Wer? (подлежащее) → Wen? Was? (дополнение)
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
            {pronomen.map(p=>(
              <div key={p.nom} style={{display:"flex",gap:8,alignItems:"center",
                background:C.ov6,borderRadius:7,padding:"6px 10px"}}>
                <span style={{color:C.muted,fontSize:11,minWidth:56}}>{p.nom}</span>
                <span style={{color:C.text,fontSize:14}}>→</span>
                <span style={{color:p.col,fontWeight:800,fontSize:13}}>{p.akk}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:C.red+"15",border:`1px solid ${C.red}33`,
          borderRadius:8,padding:"8px 10px",marginBottom:12,fontSize:11}}>
          ⚠️ Меняются только: <b style={{color:C.red}}>ich→mich, du→dich, er→ihn</b><br/>
          Остальные: wir→uns, ihr→euch; es/sie/Sie остаются.
        </div>
        <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:6}}>
          💬 Примеры из учебника:
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {examples.map((e,i)=>(
            <div key={i} onClick={()=>setOpenEx(openEx===i?null:i)}
              style={{background:C.card2,borderRadius:8,padding:"8px 10px",cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:12,color:C.text,flex:1}}>{e.de}</span>
                <span style={{fontSize:11,color:C.muted,marginLeft:6}}>{openEx===i?"▲":"▾"}</span>
              </div>
              {openEx===i&&(
                <div style={{marginTop:6,borderTop:`1px solid ${C.border}`,paddingTop:6}}>
                  <div style={{fontSize:11,color:C.muted}}>{e.ru}</div>
                  <div style={{fontSize:11,color:C.orange,marginTop:3}}>🔍 {e.pro}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

const Q_L8C=[
  {q:"'Du solltest mehr schlafen.' sollte = ?",   opts:["Imperativ","Konjunktiv II (совет)","Futur","Modalverb Präsens"],ans:1,hint:"sollte"},
  {q:"sollte vs soll: 'Du ___ Tabletten nehmen.' (врач назначил)", opts:["sollte","sollst","soll","willst"],            ans:1, hint:"sollen Präsens"},
  {q:"'Du solltest mehr trinken.' = ?",            opts:["Ты должен пить","Тебе следует пить больше","Ты хочешь пить","Тебе можно пить"], ans:1, hint:"sollte = совет"},
  {q:"Windpocken = ?",                             opts:["свинка","ветрянка","корь","скарлатина"],                       ans:1, hint:"Windpocken"},
  {q:"Masern = ?",                                 opts:["свинка","ветрянка","корь","скарлатина"],                       ans:2, hint:"Masern"},
  {q:"Scharlach = ?",                              opts:["свинка","ветрянка","корь","скарлатина"],                       ans:3, hint:"Scharlach"},
  {q:"Mumps = ?",                                  opts:["свинка","ветрянка","корь","скарлатина"],                       ans:0, hint:"Mumps"},
  {q:"'Die Krankenkasse zahlt.' = ?",              opts:["рецепт оплачивает","страховая касса платит","касса аптеки","банк платит"], ans:1, hint:"Krankenkasse"},
  {q:"'Der Arzt schreibt eine Krankschreibung.' = ?", opts:["выписку","рецепт","направление","больничный лист"],         ans:3, hint:"Krankschreibung"},
  {q:"messen (er) = ?",                            opts:["mässt","messst","misst","messt"],                              ans:2, hint:"e→i: misst"},
  {q:"anmachen = ?",                               opts:["надевать","включать","выключать","открывать"],                 ans:1, hint:"anmachen"},
  {q:"ausmachen = ?",                              opts:["надевать","включать","выключать","договориться"],              ans:2, hint:"ausmachen"},
];
function T8C(){
  const [tab,setTab]=useState("sollte");
  const gesundheit=[
    {icon:"💳",de:"die Gesundheitskarte",   ru:"карта медицинского страхования",  note:"Нужна для любого визита к врачу. Выдаёт Krankenkasse."},
    {icon:"📋",de:"die Krankschreibung",    ru:"больничный лист",                  note:"Врач выписывает при болезни 3+ дней. Оригинал — в Krankenkasse, копия — работодателю."},
    {icon:"📕",de:"das Bonusheft",          ru:"бонусная книжка (стомат.)",        note:"Стоматолог записывает ежегодные осмотры → бонус от Krankenkasse."},
    {icon:"🏥",de:"die Krankenkasse",       ru:"страховая медицинская касса",      note:"Оплачивает лечение. Многие лекарства — только с Rezept."},
    {icon:"📄",de:"die Überweisung",        ru:"направление к врачу-специалисту", note:"Hausarzt пишет Überweisung к Facharzt (специалисту)."},
    {icon:"💊",de:"das Rezept",             ru:"рецепт",                           note:"Нужен для многих медикаментов. Rezeptpflichtig / rezeptfrei."},
  ];
  const kids=[
    {de:"der Mumps",       ru:"свинка",        symptom:"Schmerzen/Schwellung an Hals und Wangen"},
    {de:"die Windpocken",  ru:"ветрянка",      symptom:"Rote Flecken + Fieber"},
    {de:"die Masern",      ru:"корь",          symptom:"Hohes Fieber + Ausschlag"},
    {de:"der Scharlach",   ru:"скарлатина",    symptom:"Halschmerzen + Fieber + Ausschlag"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.teal}>
        <H c={C.teal}>💊 C · Gesundheit & sollte</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["sollte","sollte"],["gesundheit","Gesundheit in DE"],["kinder","Kinderkrankheiten"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.teal+"33":"transparent",
                color:tab===key?C.teal:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="sollte"&&(
          <div>
            <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.teal,marginBottom:8}}>
                sollte — Konjunktiv II (мягкий совет/рекомендация)
              </div>
              <div style={{background:C.card2,borderRadius:8,padding:"8px 10px",marginBottom:10}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  {[["ich","sollte"],["wir","sollten"],["du","solltest"],["ihr","solltet"],
                    ["er/sie/es","sollte"],["sie/Sie","sollten"]].map(([p,f])=>(
                    <div key={p} style={{display:"flex",gap:6,background:C.ov6,
                      borderRadius:6,padding:"4px 8px",fontSize:12}}>
                      <span style={{color:C.muted,fontSize:11,minWidth:56}}>{p}</span>
                      <span style={{color:C.teal,fontWeight:800}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:C.yellow+"15",border:`1px solid ${C.yellow}33`,
                borderRadius:8,padding:"8px 10px",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:11,color:C.yellow,marginBottom:6}}>
                  ⚖️ sollen vs sollte:
                </div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
                  <b style={{color:C.text}}>Du sollst</b> Tabletten nehmen.
                  <span style={{color:C.muted}}> — врач НАЗНАЧИЛ (обязанность)</span><br/>
                  <b style={{color:C.teal}}>Du solltest</b> Tabletten nehmen.
                  <span style={{color:C.muted}}> — врач СОВЕТУЕТ (мягче)</span>
                </div>
              </div>
              {[
                ["Du solltest im Bett bleiben.","Тебе следует оставаться в постели."],
                ["Du solltest viel trinken.","Тебе следует много пить."],
                ["Du solltest viel schlafen.","Тебе следует много спать."],
                ["Dann geh doch zum Arzt!","Тогда сходи к врачу!"],
              ].map(([de,ru])=>(
                <div key={de} style={{marginBottom:5,fontSize:12,
                  background:C.ov4,borderRadius:6,padding:"5px 8px"}}>
                  <div style={{color:C.text,fontWeight:600}}>{de}</div>
                  <div style={{color:C.muted,fontSize:11}}>{ru}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:6}}>
                💡 Также: messen + anmachen/ausmachen
              </div>
              {[
                ["Fieber messen","измерять температуру · er misst (e→i)"],
                ["den Fernseher anmachen","включить телевизор"],
                ["das Licht ausmachen","выключить свет"],
              ].map(([de,ru])=>(
                <div key={de} style={{marginBottom:4,fontSize:12}}>
                  <span style={{color:C.teal,fontWeight:700}}>{de}</span>
                  <span style={{color:C.muted}}> — {ru}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="gesundheit"&&(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {gesundheit.map(g=>(
              <div key={g.de} style={{background:C.card2,borderRadius:9,padding:"10px 12px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                  <span style={{fontSize:20}}>{g.icon}</span>
                  <div>
                    <div style={{fontWeight:800,color:C.teal,fontSize:13}}>{g.de}</div>
                    <div style={{color:C.muted,fontSize:11}}>{g.ru}</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.muted,fontStyle:"italic",paddingLeft:28}}>
                  💡 {g.note}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="kinder"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>
              🧒 Kinderkrankheiten — детские болезни
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {kids.map(k=>(
                <div key={k.de} style={{background:C.card2,borderRadius:8,padding:"9px 11px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontWeight:800,color:C.text,fontSize:13}}>{k.de}</span>
                    <span style={{color:C.teal,fontSize:12}}>{k.ru}</span>
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>🤒 {k.symptom}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L8A=[
  {q:"'Was fehlt Ihnen?' — что спрашивают?",   opts:["Что вам нужно?","Что вас беспокоит?","Где болит?","Как вас зовут?"],ans:1,hint:"fehlen"},
  {q:"Erkältung = ?",                           opts:["грипп","аллергия","простуда","кашель"],                       ans:2, hint:"Erkältung"},
  {q:"'Ich bin erkältet.' = ?",                 opts:["У меня грипп","У меня простуда","Я устал","У меня жар"],     ans:1, hint:"erkältet"},
  {q:"sollen (ich/er) = ?",                     opts:["soll","sollst","sollen","sollt"],                              ans:0, hint:"sollen"},
  {q:"'Sie soll viel trinken.' — soll от?",     opts:["müssen","wollen","sollen","können"],                          ans:2, hint:"sollen"},
  {q:"rezeptpflichtig = ?",                     opts:["без рецепта","по рецепту","дорогое","натуральное"],            ans:1, hint:"Rezept"},
  {q:"'Mir geht es schlecht.' = ?",             opts:["Мне плохо","Мне скучно","Мне жарко","Я устал"],               ans:0, hint:"gut/schlecht"},
  {q:"Wo tut es weh? → 'Mein ___ tut weh.'",   opts:["Kopf","Kopfs","Kopfe","Köpfe"],                               ans:0, hint:"wehtun"},
  {q:"Dativ Pl. от: Kinder, Eltern, Zähne:",   opts:["Kindern/Eltern/Zähnen","Kinder/Eltern/Zähne","Kindes/Elterne","keine Änderung"],ans:0,hint:"Plural Dativ -n"},
  {q:"'nach Vereinbarung' = ?",                 opts:["после встречи","по предварительной записи","по рецепту","по расписанию"],ans:1,hint:"Vereinbarung"},
];
function T8A(){
  const [tab,setTab]=useState("koerper");
  const [openBody,setOpenBody]=useState(null);
  const [openLines8,setOpenLines8]=useState(new Set());
  const togLine8=(k)=>setOpenLines8(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n;});
  const koerper=[
    {group:"Kopf",emoji:"🧠",parts:[
      {de:"der Kopf (Köpfe)",       ru:"голова"},
      {de:"die Haare (pl.)",        ru:"волосы"},
      {de:"das Auge (-n)",          ru:"глаз"},
      {de:"das Ohr (-en)",          ru:"ухо"},
      {de:"die Nase (-n)",          ru:"нос"},
      {de:"der Mund (Münder)",      ru:"рот"},
      {de:"die Zunge (-n)",         ru:"язык"},
      {de:"der Zahn (Zähne)",       ru:"зуб"},
      {de:"die Lippe (-n)",         ru:"губа"},
      {de:"die Wange (-n)",         ru:"щека"},
      {de:"die Stirn (-en)",        ru:"лоб"},
      {de:"das Kinn (-e)",          ru:"подбородок"},
    ]},
    {group:"Körper",emoji:"🫀",parts:[
      {de:"der Hals (Hälse)",       ru:"горло, шея"},
      {de:"die Schulter (-n)",      ru:"плечо"},
      {de:"der Rücken (-)",         ru:"спина"},
      {de:"die Brust (Brüste)",     ru:"грудь"},
      {de:"der Bauch (Bäuche)",     ru:"живот"},
    ]},
    {group:"Arme & Hände",emoji:"💪",parts:[
      {de:"der Arm (-e)",           ru:"рука (от плеча)"},
      {de:"das Handgelenk (-e)",    ru:"запястье"},
      {de:"die Hand (Hände)",       ru:"кисть руки"},
      {de:"der Finger (-)",         ru:"палец руки"},
      {de:"der Ellenbogen (-)",     ru:"локоть"},
    ]},
    {group:"Beine & Füße",emoji:"🦵",parts:[
      {de:"das Bein (-e)",          ru:"нога (от бедра)"},
      {de:"das Knie (-)",           ru:"колено"},
      {de:"der Knöchel (-)",        ru:"щиколотка"},
      {de:"der Fuß (Füße)",         ru:"стопа"},
      {de:"die Ferse (-n)",         ru:"пятка"},
      {de:"die Zehe (-n)",          ru:"палец ноги"},
      {de:"der Po (-s)",            ru:"ягодица"},
    ]},
  ];
  const sollen=[
    ["ich","soll"],["wir","sollen"],
    ["du","sollst"],["ihr","sollt"],
    ["er/sie/es","soll"],["sie/Sie","sollen"],
  ];
  const dialog8=[
    {v:"Praxis Dr. Arslan, guten Tag.",                    vRu:"Кабинет доктора Арслана, добрый день.",
     k:"Ich hätte gern einen Termin.",                      kRu:"Я хотел(а) бы записаться на приём.",          note:"Termin = запись, приём"},
    {v:"Waren Sie schon einmal hier?",                      vRu:"Вы уже были у нас?",
     k:"Ja, ich war schon mal bei Ihnen.",                  kRu:"Да, я уже был(а) у вас.",                     note:"schon mal = уже как-то раз"},
    {v:"Geht es bei Ihnen am Montag um 10 Uhr?",           vRu:"Вам подходит понедельник в 10:00?",
     k:"Nein, da kann ich leider nicht. Ich muss arbeiten.",kRu:"Нет, к сожалению не могу. Я должен(а) работать.",note:"leider = к сожалению"},
    {v:"Am Dienstag um 8 Uhr haben wir einen Termin frei.",vRu:"Во вторник в 8:00 у нас есть свободное место.",
     k:"Ja, prima! Dienstag passt auch.",                   kRu:"Да, отлично! Вторник тоже подходит.",         note:"passt = подходит"},
    {v:"Was fehlt Ihnen denn?",                             vRu:"Что вас беспокоит?",
     k:"Mir geht es schlecht. Ich bin erkältet.",           kRu:"Мне плохо. Я простужен(а).",                  note:"fehlen = что болит/беспокоит"},
    {v:"Haben Sie Husten oder Schnupfen?",                  vRu:"У вас кашель или насморк?",
     k:"Ja, beides. Und ich habe Fieber.",                  kRu:"Да, и то и другое. И у меня температура.",    note:"beides = и то и другое"},
    {v:"Sie sollen viel Tee trinken und im Bett bleiben.", vRu:"Вам нужно много пить чая и оставаться в постели.",
     k:"Brauche ich ein Rezept?",                           kRu:"Мне нужен рецепт?",                           note:"sollen = должны (по совету врача)"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.red}>
        <H c={C.red}>🏥 A · Beim Arzt — Тело и здоровье</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["koerper","Körperteile"],["sollen","sollen & Symptome"],["dialog","Dialog"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.red+"33":"transparent",
                color:tab===key?C.red:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="koerper"&&(
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {koerper.map((g,gi)=>(
              <div key={g.group}>
                <div onClick={()=>setOpenBody(openBody===gi?null:gi)}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                    background:C.red+"15",borderRadius:9,padding:"9px 12px",cursor:"pointer",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:13}}>{g.emoji} {g.group}</span>
                  <span style={{color:C.muted,fontSize:11}}>{openBody===gi?"▲":"▾"}</span>
                </div>
                {openBody===gi&&(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,paddingLeft:4}}>
                    {g.parts.map(p=>(
                      <div key={p.de} style={{background:C.card2,borderRadius:6,padding:"5px 8px",fontSize:11}}>
                        <div style={{color:C.text,fontWeight:600}}>{p.de}</div>
                        <div style={{color:C.muted,fontSize:11}}>{p.ru}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tab==="sollen"&&(
          <div>
            <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.teal,marginBottom:8}}>
                sollen — должен (по чужому указанию/совету)
              </div>
              <div style={{background:C.red+"12",borderRadius:7,padding:"5px 10px",
                marginBottom:8,fontSize:11,color:C.muted}}>
                ⚠️ <b style={{color:C.red}}>ich soll = er soll</b> (как все модальные глаголы)
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,marginBottom:8}}>
                {sollen.map(([p,f])=>(
                  <div key={p} style={{display:"flex",gap:6,background:C.ov6,
                    borderRadius:6,padding:"4px 8px",fontSize:12}}>
                    <span style={{color:C.muted,minWidth:56,fontSize:11}}>{p}</span>
                    <span style={{color:C.teal,fontWeight:800}}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.7}}>
                💬 Der Arzt sagt, ich <b style={{color:C.teal}}>soll</b> viel Tee <b style={{color:C.orange}}>trinken</b>.<br/>
                💬 Sie <b style={{color:C.teal}}>sollen</b> im Bett <b style={{color:C.orange}}>bleiben</b>.
              </div>
            </div>
            <div style={{background:C.card2,borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:6}}>
                🤒 Symptome & Empfehlungen
              </div>
              {[
                ["😷","erkältet sein","простужен · Sie sollen Tee trinken."],
                ["🤧","der Schnupfen","насморк · Nasentropfen nehmen"],
                ["🔥","das Fieber","жар · Im Bett bleiben / viel trinken"],
                ["😮‍💨","der Husten","кашель · Hustensaft nehmen"],
                ["😵","die Schmerzen","боли · Tabletten nehmen / Arzt aufsuchen"],
              ].map(([emoji,de,ru])=>(
                <div key={de} style={{display:"flex",gap:8,alignItems:"center",
                  marginBottom:5,fontSize:12}}>
                  <span style={{fontSize:16,marginRight:6}}>{emoji}</span>
                  <div>
                    <span style={{color:C.text,fontWeight:600}}>{de}</span>
                    <div style={{color:C.muted,fontSize:11}}>{ru}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="dialog"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>
              🗓️ Termin beim Arzt · нажми на фразу → перевод
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {dialog8.map((d,i)=>(
                <div key={i} style={{background:C.card2,borderRadius:8,padding:"8px 10px",fontSize:12}}>
                  <div onClick={()=>togLine8(`${i}-v`)}
                    style={{cursor:"pointer",marginBottom:4,borderRadius:6,padding:"4px 6px",
                      background:openLines8.has(`${i}-v`)?C.green+"15":"transparent",
                      border:`1px solid ${openLines8.has(`${i}-v`)?C.green+"44":"transparent"}`}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{color:C.green}}>🏥 <b>A:</b> {d.v}</span>
                      <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:6}}>{openLines8.has(`${i}-v`)?"▲":"▾"}</span>
                    </div>
                    {openLines8.has(`${i}-v`)&&<div style={{color:C.muted,fontSize:11,paddingLeft:20,marginTop:3}}>{d.vRu}</div>}
                  </div>
                  <div onClick={()=>togLine8(`${i}-k`)}
                    style={{cursor:"pointer",borderRadius:6,padding:"4px 6px",
                      background:openLines8.has(`${i}-k`)?C.red+"15":"transparent",
                      border:`1px solid ${openLines8.has(`${i}-k`)?C.red+"44":"transparent"}`}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{color:C.red}}>🙋 <b>P:</b> {d.k}</span>
                      <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:6}}>{openLines8.has(`${i}-k`)?"▲":"▾"}</span>
                    </div>
                    {openLines8.has(`${i}-k`)&&<div style={{color:C.muted,fontSize:11,paddingLeft:20,marginTop:3}}>{d.kRu}</div>}
                  </div>
                  {d.note&&<div style={{color:C.muted,fontSize:11,marginTop:4}}>💡 {d.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L8D=[
  {q:"Notruf-Nummer in Deutschland?",              opts:["119","110","112","115"],                                          ans:2, hint:"112 = EU-Notruf"},
  {q:"verletzt = ?",                               opts:["раненый","мёртвый","больной","усталый"],                         ans:0, hint:"verletzt"},
  {q:"dringend = ?",                               opts:["слишком","срочно","дорого","медленно"],                          ans:1, hint:"dringend"},
  {q:"auflegen = ?",                               opts:["класть трубку","открыть дверь","ложиться","уходить"],            ans:0, hint:"auflegen"},
  {q:"vorbeifahren = ?",                           opts:["заехать","остановиться","проехать мимо","ехать быстро"],         ans:2, hint:"vorbeifahren"},
  {q:"anhalten = ?",                               opts:["позвонить","остановиться","уехать","помочь"],                    ans:1, hint:"anhalten"},
  {q:"erste Hilfe leisten = ?",                    opts:["прибыть первым","оказывать первую помощь","звонить","бежать"],   ans:1, hint:"Erste Hilfe"},
  {q:"der Notarzt = ?",                            opts:["врач скорой помощи","медсестра","участковый врач","специалист"], ans:0, hint:"Notarzt"},
  {q:"1. вопрос Notruf-Schema = ?",               opts:["Was ist passiert?","Wo ist der Notfall?","Wer ruft an?","Wann?"],ans:2, hint:"Wer ruft an?"},
  {q:"erschöpft = ?",                              opts:["скучный","изможденный","усталый (слегка)","стрессовый"],         ans:1, hint:"erschöpft"},
  {q:"sich erholen = ?",                           opts:["устать","восстанавливаться","заболеть","беспокоиться"],          ans:1, hint:"sich erholen"},
  {q:"'Es ist dringend!' — как перевести?",        opts:["Это дорого!","Это срочно!","Это опасно!","Это далеко!"],         ans:1, hint:"dringend"},
];
function T8D(){
  const [tab,setTab]=useState("notruf");
  const schema=[
    {n:1,q:"Wer ruft an?",           bsp:"Mein Name ist Petrow."},
    {n:2,q:"Was ist passiert?",       bsp:"Es gibt hier einen Unfall."},
    {n:3,q:"Wo ist der Notfall?",     bsp:"Bahnhofstraße, Ecke Schillerstraße."},
    {n:4,q:"Wie viele Personen sind verletzt?",bsp:"Ich glaube, drei Personen."},
    {n:5,q:"Wie ist die Situation?",  bsp:"Bitte kommen Sie schnell, es ist dringend."},
    {n:6,q:"Warten Sie auf Rückfragen!",bsp:"Legen Sie nicht auf!"},
  ];
  const hilfe=[
    {icon:"🛑",de:"anhalten",                 ru:"остановиться",           imp:"Halten Sie an!"},
    {icon:"🚗",de:"nicht vorbeifahren",        ru:"не проезжать мимо",       imp:"Fahren Sie nicht vorbei!"},
    {icon:"🆘",de:"erste Hilfe leisten",       ru:"оказывать первую помощь", imp:"Leisten Sie erste Hilfe!"},
    {icon:"📵",de:"nicht auflegen",            ru:"не класть трубку",        imp:"Legen Sie nicht auf!"},
  ];
  const erschoepft=[
    {de:"erschöpft",    ru:"изможденный",     note:"о человеке"},
    {de:"übermüdet",    ru:"переутомлённый",  note:"о человеке"},
    {de:"überarbeitet", ru:"перетрудившийся", note:"о человеке"},
    {de:"überfordert",  ru:"перегруженный",   note:"о человеке"},
    {de:"gestresst",    ru:"в стрессе",       note:"о человеке"},
    {de:"stressig",     ru:"стрессовый",      note:"о ситуации"},
  ];
  const tipps=[
    {icon:"😴",de:"schlafen",                     ru:"высыпаться"},
    {icon:"💊",de:"Vitamine einnehmen",            ru:"принимать витамины"},
    {icon:"🏃",de:"sich bewegen / Sport treiben",  ru:"двигаться / заниматься спортом"},
    {icon:"🥗",de:"die gesunde Ernährung",         ru:"здоровое питание"},
    {icon:"💧",de:"Wasser trinken",                ru:"пить воду"},
    {icon:"🌴",de:"Urlaub / sich erholen",         ru:"отпуск / восстанавливаться"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.red}>
        <H c={C.red}>🚨 D/E · Notruf 112 & Gesundheit</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["notruf","Notruf 112"],["hilfe","Erste Hilfe"],["erschoepft","Erschöpft?"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.red+"33":"transparent",
                color:tab===key?C.red:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="notruf"&&(
          <div>
            <div style={{background:C.red+"15",border:`1px solid ${C.red}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.red,marginBottom:6}}>
                📞 Wie macht man einen Notruf?
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:10}}>
                Sprechen Sie langsam und deutlich!
              </div>
              {schema.map(({n,q,bsp})=>(
                <div key={n} style={{display:"flex",gap:8,marginBottom:7,
                  background:C.ov4,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{minWidth:22,height:22,background:C.red,borderRadius:"50%",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:11,fontWeight:800,color:"#fff",flexShrink:0}}>{n}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:C.text}}>{q}</div>
                    <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{bsp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:C.card2,borderRadius:8,padding:"9px 11px"}}>
              <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:6}}>☎️ Wichtige Nummern</div>
              {[["112","Notruf / Rettungsdienst (EU)"],["110","Polizei"],["116 117","Ärztl. Bereitschaftsdienst"]].map(([n,t])=>(
                <div key={n} style={{display:"flex",justifyContent:"space-between",
                  padding:"5px 0",fontSize:12,borderBottom:`1px solid ${C.border}22`}}>
                  <span style={{fontWeight:800,color:C.red,fontSize:14}}>{n}</span>
                  <span style={{color:C.text}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="hilfe"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10,fontStyle:"italic"}}>
              Bei einem Unfall — Was muss man tun?
            </div>
            {hilfe.map(h=>(
              <div key={h.de} style={{background:C.card2,borderRadius:9,padding:"10px 12px",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                  <span style={{fontSize:22}}>{h.icon}</span>
                  <div>
                    <div style={{fontWeight:800,color:C.text,fontSize:13}}>{h.de}</div>
                    <div style={{color:C.muted,fontSize:11}}>{h.ru}</div>
                  </div>
                </div>
                <div style={{fontSize:12,color:C.red,fontStyle:"italic",fontWeight:600,paddingLeft:30}}>
                  → {h.imp}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="erschoepft"&&(
          <div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.orange,marginBottom:8}}>
                😓 Wie fühle ich mich? — Adjektive
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {erschoepft.map(e=>(
                  <div key={e.de} style={{background:C.ov4,borderRadius:7,padding:"7px 9px"}}>
                    <div style={{fontWeight:700,color:C.orange,fontSize:12}}>{e.de}</div>
                    <div style={{color:C.muted,fontSize:11}}>{e.ru}</div>
                    <div style={{color:C.muted,fontSize:11,fontStyle:"italic"}}>{e.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:C.green+"15",border:`1px solid ${C.green}33`,
              borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:800,fontSize:12,color:C.green,marginBottom:8}}>
                💪 Tipps für die Gesundheit
              </div>
              {tipps.map(t=>(
                <div key={t.de} style={{display:"flex",gap:8,alignItems:"center",marginBottom:5,fontSize:12}}>
                  <span style={{fontSize:16}}>{t.icon}</span>
                  <span style={{color:C.text,fontWeight:600}}>{t.de}</span>
                  <span style={{color:C.muted}}>— {t.ru}</span>
                </div>
              ))}
              <div style={{marginTop:8,background:C.card2,borderRadius:7,padding:"7px 10px",
                fontSize:11,color:C.muted,lineHeight:1.7}}>
                sich erholen = восстанавливаться<br/>
                sich entspannen = расслабляться<br/>
                sich ausruhen = отдыхать
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L9A=[
  {q:"'Ich fahre mit ___ Zug.' (m, Dativ)",        opts:["der","dem","den","das"],                                        ans:1, hint:"mit + Dativ: m/n → dem"},
  {q:"'Ich fahre mit ___ Straßenbahn.' (f, Dativ)", opts:["der","dem","den","die"],                                       ans:0, hint:"mit + Dativ: f → der"},
  {q:"Пешком = ?",                                  opts:["mit dem Fuß","zu Fuß","mit Fuß","per Fuß"],                    ans:1, hint:"zu Fuß — исключение!"},
  {q:"das Fahrrad, Plural = ?",                     opts:["Fahrrades","Fahrräder","Fahrräde","Fahrrads"],                 ans:1, hint:"Fahrrad → Fahrräder"},
  {q:"die S-Bahn = ?",                              opts:["метро","трамвай","городская электричка","автобус"],             ans:2, hint:"S-Bahn"},
  {q:"die U-Bahn = ?",                              opts:["трамвай","метро","автобус","электричка"],                      ans:1, hint:"U-Bahn"},
  {q:"benutzen = ?",                                opts:["покупать","использовать","ехать","останавливаться"],           ans:1, hint:"benutzen"},
  {q:"teuer ↔ ?",                                   opts:["schnell","bequem","billig","langsam"],                         ans:2, hint:"teuer ↔ billig"},
  {q:"bequem ↔ ?",                                  opts:["teuer","langsam","gesund","unbequem"],                         ans:3, hint:"bequem ↔ unbequem"},
  {q:"'Das Fahrrad ist ___.' (полезный для здоровья)", opts:["teuer","schnell","gesund","praktisch"],                    ans:2, hint:"gesund"},
  {q:"der Bürgersteig = ?",                         opts:["проезжая часть","автострада","тротуар","велодорожка"],         ans:2, hint:"Bürgersteig"},
  {q:"'Ich fahre mit ___ Auto.' (n, Dativ)",        opts:["dem","der","den","das"],                                       ans:0, hint:"mit + Dativ: n → dem"},
];
function T9A(){
  const [tab,setTab]=useState("mittel");
  const mittel=[
    {icon:"🚗",de:"das Auto",        pl:"-s",          mit:"mit dem Auto"},
    {icon:"🚲",de:"das Fahrrad",     pl:"Fahrräder",   mit:"mit dem Fahrrad"},
    {icon:"🏍️",de:"das Motorrad",    pl:"Motorräder",  mit:"mit dem Motorrad"},
    {icon:"🚌",de:"der Bus",         pl:"-se",         mit:"mit dem Bus"},
    {icon:"🚂",de:"der Zug",         pl:"Züge",        mit:"mit dem Zug"},
    {icon:"✈️",de:"das Flugzeug",    pl:"-e",          mit:"mit dem Flugzeug"},
    {icon:"🚢",de:"das Schiff",      pl:"-e",          mit:"mit dem Schiff"},
    {icon:"🚃",de:"die Straßenbahn", pl:"-en",         mit:"mit der Straßenbahn"},
    {icon:"🚇",de:"die U-Bahn",      pl:"-en",         mit:"mit der U-Bahn"},
    {icon:"🚆",de:"die S-Bahn",      pl:"-en",         mit:"mit der S-Bahn"},
    {icon:"🚶",de:"der Fußgänger",   pl:"-",           mit:"zu Fuß (!)"},
  ];
  const adjPairs=[
    ["teuer","billig","дорогой","дешёвый"],
    ["schnell","langsam","быстрый","медленный"],
    ["bequem","unbequem","удобный","неудобный"],
    ["praktisch","—","практичный","—"],
    ["gesund","—","полезный для здоровья","—"],
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.blue}>
        <H c={C.blue}>🚗 L9A · Wege durch die Stadt</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["mittel","Verkehrsmittel"],["dativ","mit + Dativ"],["adj","Adjektive"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.blue+"33":"transparent",
                color:tab===key?C.blue:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="mittel"&&(
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {mittel.map(m=>(
              <div key={m.de} style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",background:C.card2,borderRadius:8,padding:"8px 11px"}}>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:20}}>{m.icon}</span>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:C.text}}>{m.de}</div>
                    <div style={{fontSize:11,color:C.muted}}>pl: {m.pl}</div>
                  </div>
                </div>
                <div style={{fontWeight:600,fontSize:12,color:C.blue,textAlign:"right"}}>{m.mit}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="dativ"&&(
          <div>
            <div style={{background:C.blue+"15",border:`1px solid ${C.blue}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.blue,marginBottom:10}}>
                mit + Dativ (чем? на чём?)
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,marginBottom:12}}>
                {[["m / n","dem"],["f","der"],["Pl.","den + -n"]].map(([g,f])=>(
                  <div key={g} style={{background:C.ov6,borderRadius:7,
                    padding:"7px 8px",textAlign:"center"}}>
                    <div style={{fontSize:11,color:C.muted}}>{g}</div>
                    <div style={{fontWeight:800,color:C.blue,fontSize:14}}>{f}</div>
                  </div>
                ))}
              </div>
              {[
                ["mit dem Zug","на поезде"],
                ["mit dem Auto","на машине"],
                ["mit dem Fahrrad","на велосипеде"],
                ["mit der Straßenbahn","на трамвае"],
                ["mit der U-Bahn","на метро"],
                ["mit der S-Bahn","на электричке"],
              ].map(([de,ru])=>(
                <div key={de} style={{display:"flex",justifyContent:"space-between",
                  padding:"5px 8px",background:C.ov4,
                  borderRadius:7,marginBottom:4,fontSize:12}}>
                  <span style={{fontWeight:700,color:C.text}}>{de}</span>
                  <span style={{color:C.muted}}>{ru}</span>
                </div>
              ))}
            </div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:9,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.orange,marginBottom:5}}>
                ⚠️ Ausnahme: zu Fuß!
              </div>
              <div style={{fontSize:12,color:C.text,marginBottom:5}}>
                Пешком = <b style={{color:C.orange}}>zu Fuß</b> (не "mit dem Fuß"!)
              </div>
              <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>
                Ich gehe zu Fuß. — Ich fahre mit dem Fahrrad.
              </div>
            </div>
          </div>
        )}
        {tab==="adj"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Какой транспорт лучше?</div>
            {adjPairs.map(([a,b,rua,rub])=>(
              <div key={a} style={{display:"flex",gap:6,marginBottom:6}}>
                <div style={{flex:1,background:C.green+"15",border:`1px solid ${C.green}33`,
                  borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                  <div style={{fontWeight:800,color:C.green,fontSize:13}}>{a}</div>
                  <div style={{color:C.muted,fontSize:11}}>{rua}</div>
                </div>
                {b!=="—"&&(
                  <div style={{flex:1,background:C.red+"15",border:`1px solid ${C.red}33`,
                    borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                    <div style={{fontWeight:800,color:C.red,fontSize:13}}>{b}</div>
                    <div style={{color:C.muted,fontSize:11}}>{rub}</div>
                  </div>
                )}
              </div>
            ))}
            <div style={{background:C.card2,borderRadius:8,padding:"9px 11px",marginTop:4}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>💬 Beispiele:</div>
              {[
                ["Das Fahrrad ist gesund, aber langsam.","Велосипед полезный, но медленный."],
                ["Die U-Bahn ist schnell und praktisch.","Метро быстрое и практичное."],
                ["Das Auto ist bequem, aber teuer.","Машина удобная, но дорогая."],
              ].map(([de,ru])=>(
                <div key={de} style={{marginBottom:5,fontSize:12,
                  background:C.ov4,borderRadius:6,padding:"5px 8px"}}>
                  <div style={{color:C.text,fontWeight:600}}>{de}</div>
                  <div style={{color:C.muted,fontSize:11}}>{ru}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L9B=[
  {q:"geradeaus = ?",                                  opts:["направо","налево","прямо","назад"],                          ans:2, hint:"geradeaus"},
  {q:"'Biegen Sie rechts ___!' (abbiegen)",            opts:["ab","auf","an","aus"],                                       ans:0, hint:"abbiegen = отделяемый"},
  {q:"die Kreuzung = ?",                               opts:["светофор","остановка","кольцо","перекрёсток"],               ans:3, hint:"Kreuzung"},
  {q:"die Ampel = ?",                                  opts:["светофор","знак","кольцо","остановка"],                      ans:0, hint:"Ampel"},
  {q:"gegenüber = ?",                                  opts:["рядом","напротив","за углом","между"],
                                                                                                                            ans:1, hint:"gegenüber dem Bahnhof"},
  {q:"'Nehmen Sie die U2 ___!' (Richtung Zoo)",        opts:["Richtung","Seite","Kreuzung","Linie"],                       ans:0, hint:"Richtung = направление"},
  {q:"'Ich habe mich ___.' (заблудился пешком)",       opts:["verfahren","verlaufen","verloren","verboten"],               ans:1, hint:"sich verlaufen = пешком"},
  {q:"'Ich habe mich ___.' (заблудился на машине)",    opts:["verlaufen","verfahren","verloren","verboten"],               ans:1, hint:"sich verfahren = на транспорте"},
  {q:"im Kreisverkehr = ?",                            opts:["на кольце","на перекрёстке","у светофора","на остановке"],   ans:0, hint:"Kreisverkehr"},
  {q:"umsteigen = ?",                                  opts:["садиться","выходить","пересаживаться","ехать дальше"],       ans:2, hint:"umsteigen"},
];
function T9B(){
  const [tab,setTab]=useState("weg");
  const praep=[
    {p:"in",       ru:"в (внутри)",         bsp:"im Café / in der Schule"},
    {p:"an",       ru:"у, при, на (у края)",bsp:"an der Ampel / am Bahnhof"},
    {p:"auf",      ru:"на (на поверхности)",bsp:"auf dem Platz / auf der Straße"},
    {p:"unter",    ru:"под",                bsp:"unter dem Tisch"},
    {p:"über",     ru:"над",                bsp:"über dem Eingang"},
    {p:"vor",      ru:"перед",              bsp:"vor dem Haus"},
    {p:"hinter",   ru:"за",                 bsp:"hinter dem Café"},
    {p:"neben",    ru:"рядом с",            bsp:"neben dem Kino"},
    {p:"zwischen", ru:"между",              bsp:"zwischen dem Bett und dem Sofa"},
  ];
  const weg=[
    {icon:"⬆️", de:"geradeaus",       ru:"прямо",     ex:"Gehen Sie geradeaus!"},
    {icon:"↪️", de:"rechts abbiegen", ru:"направо",   ex:"Biegen Sie rechts ab!"},
    {icon:"↩️", de:"links abbiegen",  ru:"налево",    ex:"Biegen Sie links ab!"},
    {icon:"📍", de:"bis zur Ampel",   ru:"до светофора", ex:"Gehen Sie bis zur Ampel."},
    {icon:"🔄", de:"um die Ecke",     ru:"за угол",   ex:"Gehen Sie um die Ecke."},
    {icon:"🏠", de:"gegenüber",       ru:"напротив",  ex:"Es ist gegenüber dem Bahnhof."},
    {icon:"🛤️", de:"an ... vorbei",   ru:"мимо ...",  ex:"Gehen Sie an der Post vorbei."},
    {icon:"🗺️", de:"auf der rechten/linken Seite", ru:"с правой/левой стороны", ex:"Es ist auf der linken Seite."},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.teal}>
        <H c={C.teal}>🏙️ L9B · In der Stadt</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["weg","Wegbeschreibung"],["praep","Lokale Präp."],["kontr","in dem = im"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.teal+"33":"transparent",
                color:tab===key?C.teal:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="weg"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Wie komme ich zum/zur ...?</div>
            {weg.map(w=>(
              <div key={w.de} style={{background:C.card2,borderRadius:8,padding:"8px 11px",marginBottom:5}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:18}}>{w.icon}</span>
                  <div>
                    <span style={{fontWeight:800,color:C.teal,fontSize:12}}>{w.de}</span>
                    <span style={{color:C.muted,fontSize:11}}> — {w.ru}</span>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.text,fontStyle:"italic",paddingLeft:26}}>→ {w.ex}</div>
              </div>
            ))}
          </div>
        )}
        {tab==="praep"&&(
          <div>
            <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,borderRadius:10,
              padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.teal,marginBottom:6}}>
                Wo? — Präpositionen + Dativ
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:8,textAlign:"center"}}>
                {[["m/n","dem"],["f","der"],["Pl.","den"]].map(([g,f])=>(
                  <div key={g} style={{background:C.ov6,borderRadius:6,padding:"5px 8px"}}>
                    <div style={{fontSize:11,color:C.muted}}>{g}</div>
                    <div style={{fontWeight:800,color:C.teal,fontSize:13}}>{f}</div>
                  </div>
                ))}
              </div>
            </div>
            {praep.map(pr=>(
              <div key={pr.p} style={{display:"flex",gap:8,marginBottom:5,background:C.card2,
                borderRadius:7,padding:"7px 10px",alignItems:"baseline"}}>
                <div style={{fontWeight:900,color:C.teal,fontSize:14,minWidth:52}}>{pr.p}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:C.text}}>{pr.ru}</div>
                  <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{pr.bsp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="kontr"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Сокращения артикля с предлогом:</div>
            {[["in + dem","im","im Café, im Bus, im Supermarkt"],
              ["an + dem","am","am Bahnhof, am Montag"],
              ["zu + dem","zum","zum Bahnhof, zum Arzt"],
              ["zu + der","zur","zur Arbeit, zur Schule"],
              ["bei + dem","beim","beim Arzt"],
              ["von + dem","vom","vom Bahnhof"],
            ].map(([full,short,bsp])=>(
              <div key={full} style={{background:C.card2,borderRadius:7,padding:"7px 10px",marginBottom:5}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                  <span style={{color:C.muted,fontSize:11}}>{full}</span>
                  <span style={{color:C.muted}}>→</span>
                  <span style={{fontWeight:900,color:C.teal,fontSize:13}}>{short}</span>
                </div>
                <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>{bsp}</div>
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L9C=[
  {q:"dürfen = ?",                                     opts:["должен","хотеть","мочь","иметь право/разрешено"],           ans:3, hint:"dürfen"},
  {q:"'ich ___' (dürfen, 1. Person Sg.)",              opts:["dürfe","darf","dürft","darfst"],                            ans:1, hint:"ich darf"},
  {q:"'er/sie/man ___' (dürfen)",                      opts:["dürfen","dürft","darf","darfst"],                           ans:2, hint:"er/sie/man darf"},
  {q:"'Das Parken ist ___.' (разрешено)",              opts:["verboten","erlaubt","dringend","dürfen"],                   ans:1, hint:"erlaubt"},
  {q:"'Das Parken ist ___.' (запрещено)",              opts:["erlaubt","dürfen","verboten","erkennen"],                   ans:2, hint:"verboten"},
  {q:"erlauben = ?",                                   opts:["запрещать","разрешать","требовать","признавать"],           ans:1, hint:"erlauben"},
  {q:"verbieten = ?",                                  opts:["разрешать","запрещать","признавать","требовать"],           ans:1, hint:"verbieten"},
  {q:"der Führerschein = ?",                           opts:["паспорт","водительские права","страховка","виза"],          ans:1, hint:"Führerschein"},
  {q:"ausländisch = ?",                                opts:["немецкий","иностранный","местный","официальный"],           ans:1, hint:"ausländisch"},
  {q:"die Behörde = ?",                                opts:["школа","орган власти","страховка","ведомство"],             ans:1, hint:"Behörde"},
  {q:"'Man ___ hier nicht parken.' (dürfen, Negation)",opts:["muss","darf","soll","kann"],                                ans:1, hint:"Man darf nicht parken."},
  {q:"die Vorfahrt = ?",                               opts:["поворот","приоритет на дороге","парковка","скорость"],      ans:1, hint:"Vorfahrt"},
];
function T9C(){
  const [tab,setTab]=useState("duerfen");
  const regeln=[
    {sign:"🔴",de:"verboten",   ru:"запрещено",   ex:"Das Parken ist verboten. / Man darf hier nicht parken."},
    {sign:"🟢",de:"erlaubt",    ru:"разрешено",   ex:"Das Parken ist erlaubt. / Man darf hier parken."},
    {sign:"⚠️",de:"Vorfahrt",   ru:"приоритет",   ex:"Die Straßenbahn hat Vorfahrt."},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.orange}>
        <H c={C.orange}>🚦 L9C · Der Führerschein & dürfen</H>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          {[["duerfen","dürfen"],["regeln","erlaubt/verboten"],["schein","Führerschein"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"9px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.orange+"33":"transparent",
                color:tab===key?C.orange:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="duerfen"&&(
          <div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.orange,marginBottom:10}}>
                dürfen — иметь право, разрешено
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                {[["ich","darf"],["du","darfst"],["er/sie/es/man","darf"],
                  ["wir","dürfen"],["ihr","dürft"],["sie/Sie","dürfen"]].map(([pr,f])=>(
                  <div key={pr} style={{background:C.ov6,borderRadius:7,padding:"7px 10px",
                    display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:C.muted,fontSize:12}}>{pr}</span>
                    <span style={{fontWeight:800,color:C.orange,fontSize:13}}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:10,background:C.card2,borderRadius:7,padding:"8px 10px",
                fontSize:11,color:C.muted}}>
                💡 Как все Modalverben: dürfen + инфинитив в конце<br/>
                "Ich <b style={{color:C.orange}}>darf</b> hier parken." · "Man <b style={{color:C.orange}}>darf</b> nicht hupen."
              </div>
            </div>
            <div style={{background:C.card2,borderRadius:8,padding:"9px 11px"}}>
              <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:6}}>Сравни:</div>
              {[
                ["müssen","muss","должен (необходимость)"],
                ["sollen","soll","должен (по чьему-то указанию)"],
                ["dürfen","darf","разрешено (право)"],
                ["können","kann","может (способность)"],
                ["wollen","will","хочет (желание)"],
              ].map(([inf,er,ru])=>(
                <div key={inf} style={{display:"flex",gap:6,marginBottom:4,fontSize:12}}>
                  <span style={{fontWeight:700,color:C.orange,minWidth:55}}>{inf}</span>
                  <span style={{color:C.text,minWidth:35}}>{er}</span>
                  <span style={{color:C.muted}}>{ru}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="regeln"&&(
          <div>
            {regeln.map(r=>(
              <div key={r.de} style={{background:C.card2,borderRadius:9,padding:"10px 12px",marginBottom:6}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:24}}>{r.sign}</span>
                  <div>
                    <div style={{fontWeight:800,color:C.orange,fontSize:13}}>{r.de}</div>
                    <div style={{color:C.muted,fontSize:11}}>{r.ru}</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.text,fontStyle:"italic"}}>{r.ex}</div>
              </div>
            ))}
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:8,padding:"9px 11px",marginTop:4}}>
              <div style={{fontWeight:700,fontSize:11,color:C.orange,marginBottom:6}}>Verkehrsregeln üben:</div>
              {[
                ["🛑 STOP","Man muss anhalten.","нужно остановиться"],
                ["🅿️ P","Das Parken ist erlaubt.","парковка разрешена"],
                ["🚫 P","Das Parken ist verboten.","парковка запрещена"],
                ["↪️ →","Man muss rechts abbiegen.","нужно повернуть направо"],
                ["📯","Man darf nicht hupen.","сигналить нельзя"],
              ].map(([sign,de,ru])=>(
                <div key={de} style={{marginBottom:5,fontSize:12,background:C.card2,
                  borderRadius:6,padding:"5px 8px"}}>
                  <span style={{fontWeight:700}}>{sign} </span>
                  <span style={{color:C.text}}>{de}</span>
                  <span style={{color:C.muted}}> — {ru}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="schein"&&(
          <div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.orange,marginBottom:8}}>
                🪪 Anerkennung ausländischer Führerscheine
              </div>
              {[
                ["Tourist (bis 6 Monate)","🟢 darf mit Heimatland-Führerschein fahren"],
                ["EU-Bürger","🟢 darf EU-Führerschein weiter benutzen"],
                ["Nicht-EU (China, Indien, Brasilien …)","🟡 max. 6 Monate · dann: Führerscheinprüfung"],
              ].map(([who,rule])=>(
                <div key={who} style={{marginBottom:7,background:C.ov4,
                  borderRadius:7,padding:"7px 9px"}}>
                  <div style={{fontWeight:700,fontSize:11,color:C.text,marginBottom:3}}>{who}</div>
                  <div style={{fontSize:11,color:C.muted}}>{rule}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card2,borderRadius:8,padding:"9px 11px"}}>
              <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:6}}>Schlüsselwörter:</div>
              {[
                ["die Behörde","орган власти, ведомство"],
                ["erkennen","признавать · anerkennen = официально признать"],
                ["die Anerkennung","признание, подтверждение"],
                ["ausländisch","иностранный"],
                ["der Ausländer / die Ausländerin","иностранец / иностранка"],
              ].map(([de,ru])=>(
                <div key={de} style={{marginBottom:4,fontSize:12}}>
                  <span style={{fontWeight:700,color:C.orange}}>{de}</span>
                  <span style={{color:C.muted}}> — {ru}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L10A=[
  {q:"Perfekt bildung: haben/sein + ?",               opts:["Infinitiv","Partizip II","Partizip I","Konjunktiv"],          ans:1, hint:"haben/sein + Partizip II"},
  {q:"Partizip II von 'machen' = ?",                  opts:["gemakht","gemacht","macht","gegemacht"],                     ans:1, hint:"ge + mach + t"},
  {q:"Partizip II von 'arbeiten' = ?",                opts:["gearbeitet","gearbeit","arbeitete","gearbeite"],              ans:0, hint:"ge + arbeit + et (e-Einfügung!)"},
  {q:"Partizip II von 'aufräumen' (trennbar) = ?",    opts:["geaufräumt","aufgeräumt","aufräumt","aufräumte"],            ans:1, hint:"auf + ge + räum + t"},
  {q:"Partizip II von 'studieren' (-ieren) = ?",      opts:["gestudiert","studierte","studiert","gestudieren"],           ans:2, hint:"-ieren → kein ge-! nur -t"},
  {q:"Partizip II von 'verkaufen' (ver-) = ?",        opts:["geverkauft","verkauft","vergeкauft","verkauftet"],           ans:1, hint:"ver- untrennbar → kein ge-!"},
  {q:"Partizip II von 'fahren' (stark) = ?",          opts:["gefahrt","gefahren","gefährt","fahren"],                    ans:1, hint:"stark: fahren → gefahren"},
  {q:"'Er ist nach Wien ___.' (fahren)",              opts:["gefahrt","gefahren","gefahren ist","fahrt"],                 ans:1, hint:"sein + gefahren (Bewegung A→B)"},
  {q:"'Gestern ___ Frau Schmidt gekocht.'",           opts:["ist","hat","habe","haben"],                                  ans:1, hint:"kochen hat Akkusativ → haben"},
  {q:"'Ich ___ gestern eingeschlafen.'",              opts:["habe","ist","bin","haben"],                                  ans:2, hint:"einschlafen = Zustandswechsel → sein"},
  {q:"Perfekt mit sein: движение А→Б — пример?",     opts:["hat geschlafen","hat gegessen","ist gegangen","hat gekauft"],ans:2, hint:"gehen → ist gegangen"},
  {q:"Partizip II von 'bleiben' = ?",                 opts:["geblieben","gebliebt","gebleibt","blieben"],                 ans:0, hint:"bleiben → ist geblieben (исключение!)"},
  {q:"'Sie ___ im Hotel geblieben.'",                 opts:["hat","haben","ist","habe"],                                  ans:2, hint:"bleiben → sein (исключение)"},
  {q:"'Haben Sie gestern Musik ___?'",                opts:["gehören","gehört","hören","hörte"],                          ans:1, hint:"hören → gehört"},
];
const STARKE_VERBEN=[
  // ── A1 ────────────────────────────────────────────────────────────────────
  {inf:"beginnen",  pr:"beginnt",     pt:"begann",pp:"begonnen",    ru:"начинать",h:"hat",lv:"A1",bsp:"Der Kurs hat um 9 Uhr begonnen."},
  {inf:"bleiben",   pr:"bleibt",      pt:"blieb",pp:"geblieben",   ru:"оставаться",h:"ist",lv:"A1",bsp:"Wir sind auf Mallorca geblieben."},
  {inf:"bringen",   pr:"bringt",      pt:"brachte",pp:"gebracht",    ru:"приносить",h:"hat",lv:"A1",bsp:"Er hat das Essen gebracht."},
  {inf:"denken",    pr:"denkt",       pt:"dachte",pp:"gedacht",     ru:"думать",h:"hat",lv:"A1",bsp:"Ich habe an dich gedacht."},
  {inf:"einschlafen",pr:"schläft ein",pt:"schlief ein",pp:"eingeschlafen",ru:"засыпать",h:"ist",lv:"A1",bsp:"Hast du schnell eingeschlafen?"},
  {inf:"essen",     pr:"isst",        pt:"aß",pp:"gegessen",    ru:"есть, кушать",h:"hat",lv:"A1",bsp:"Sie hat die Suppe gegessen."},
  {inf:"fahren",    pr:"fährt",       pt:"fuhr",pp:"gefahren",    ru:"ехать",h:"ist",lv:"A1",bsp:"Wir sind zu schnell gefahren."},
  {inf:"finden",    pr:"findet",      pt:"fand",pp:"gefunden",    ru:"находить",h:"hat",lv:"A1",bsp:"Renate hat ihre Mutter schnell gefunden."},
  {inf:"fliegen",   pr:"fliegt",      pt:"flog",pp:"geflogen",    ru:"лететь",h:"ist",lv:"A1",bsp:"Er ist nach Wien geflogen."},
  {inf:"geben",     pr:"gibt",        pt:"gab",pp:"gegeben",     ru:"давать",h:"hat",lv:"A1",bsp:"Peter hat mir ein Blatt Papier gegeben."},
  {inf:"gehen",     pr:"geht",        pt:"ging",pp:"gegangen",    ru:"идти",h:"ist",lv:"A1",bsp:"Wohin seid ihr am Abend gegangen?"},
  {inf:"haben",     pr:"hat",         pt:"hatte",pp:"gehabt",      ru:"иметь",h:"hat",lv:"A1",bsp:"Auf der Party haben alle viel Spaß gehabt."},
  {inf:"heißen",    pr:"heißt",       pt:"hieß",pp:"geheißen",    ru:"называться",h:"hat",lv:"A1",bsp:"Das Buch hat 'Faust' geheißen."},
  {inf:"helfen",    pr:"hilft",       pt:"half",pp:"geholfen",    ru:"помогать",h:"hat",lv:"A1",bsp:"Die Kinder haben zu Hause geholfen."},
  {inf:"kommen",    pr:"kommt",       pt:"kam",pp:"gekommen",    ru:"приходить",h:"ist",lv:"A1",bsp:"Er ist pünktlich gekommen."},
  {inf:"laufen",    pr:"läuft",       pt:"lief",pp:"gelaufen",    ru:"бежать",h:"ist",lv:"A1",bsp:"Julio ist mit mir gelaufen."},
  {inf:"lesen",     pr:"liest",       pt:"las",pp:"gelesen",     ru:"читать",h:"hat",lv:"A1",bsp:"Hast du das Buch gelesen?"},
  {inf:"nehmen",    pr:"nimmt",       pt:"nahm",pp:"genommen",    ru:"брать",h:"hat",lv:"A1",bsp:"Sie hat die U-Bahn genommen."},
  {inf:"rufen",     pr:"ruft",        pt:"rief",pp:"gerufen",     ru:"звать, вызывать",h:"hat",lv:"A1",bsp:"Er hat die Polizei gerufen."},
  {inf:"schlafen",  pr:"schläft",     pt:"schlief",pp:"geschlafen",  ru:"спать",h:"hat",lv:"A1",bsp:"Er hat gut geschlafen."},
  {inf:"schreiben", pr:"schreibt",    pt:"schrieb",pp:"geschrieben", ru:"писать",h:"hat",lv:"A1",bsp:"Hast du schon die Postkarte geschrieben?"},
  {inf:"schwimmen", pr:"schwimmt",    pt:"schwamm",pp:"geschwommen", ru:"плавать",h:"ist",lv:"A1",bsp:"Frau Novak ist heute morgen geschwommen."},
  {inf:"sehen",     pr:"sieht",       pt:"sah",pp:"gesehen",     ru:"видеть",h:"hat",lv:"A1",bsp:"Haben Sie den Film gesehen?"},
  {inf:"sein",      pr:"ist",         pt:"war",pp:"gewesen",     ru:"быть",h:"ist",lv:"A1",bsp:"Ich bin in Barcelona noch nie gewesen."},
  {inf:"singen",    pr:"singt",       pt:"sang",pp:"gesungen",    ru:"петь",h:"hat",lv:"A1",bsp:"Sie hat ein Lied gesungen."},
  {inf:"sprechen",  pr:"spricht",     pt:"sprach",pp:"gesprochen",  ru:"говорить",h:"hat",lv:"A1",bsp:"Wir haben über das Thema gesprochen."},
  {inf:"aufstehen", pr:"steht auf",   pt:"stand auf",pp:"aufgestanden",ru:"вставать",h:"ist",lv:"A1",bsp:"Sylvia ist sehr früh aufgestanden."},
  {inf:"stehen",    pr:"steht",       pt:"stand",pp:"gestanden",   ru:"стоять",h:"hat",lv:"A1",bsp:"Das Auto hat vor dem Haus gestanden."},
  {inf:"treffen",   pr:"trifft",      pt:"traf",pp:"getroffen",   ru:"встречать",h:"hat",lv:"A1",bsp:"Ich habe einen Freund getroffen."},
  {inf:"trinken",   pr:"trinkt",      pt:"trank",pp:"getrunken",   ru:"пить",h:"hat",lv:"A1",bsp:"Er hat viel Wasser getrunken."},
  {inf:"tun",       pr:"tut",         pt:"tat",pp:"getan",       ru:"делать",h:"hat",lv:"A1",bsp:"Was hast du gestern getan?"},
  {inf:"werden",    pr:"wird",        pt:"wurde",pp:"geworden",    ru:"становиться",h:"ist",lv:"A1",bsp:"Thomas ist rot geworden."},
  {inf:"wissen",    pr:"weiß",        pt:"wusste",pp:"gewusst",     ru:"знать",h:"hat",lv:"A1",bsp:"Ich habe es nicht gewusst."},
  // ── A2 ────────────────────────────────────────────────────────────────────
  {inf:"backen",    pr:"backt",       pt:"backte",pp:"gebacken",    ru:"печь",h:"hat",lv:"A2",bsp:"Sie hat einen Kuchen gebacken."},
  {inf:"biegen",    pr:"biegt",       pt:"bog",pp:"gebogen",     ru:"гнуть",h:"hat",lv:"A2",bsp:"Er hat die Stange gebogen."},
  {inf:"bieten",    pr:"bietet",      pt:"bot",pp:"geboten",     ru:"предлагать",h:"hat",lv:"A2",bsp:"Das Hotel hat viel geboten."},
  {inf:"bitten",    pr:"bittet",      pt:"bat",pp:"gebeten",     ru:"просить",h:"hat",lv:"A2",bsp:"Er hat mich um Hilfe gebeten."},
  {inf:"braten",    pr:"brät",        pt:"briet",pp:"gebraten",    ru:"жарить",h:"hat",lv:"A2",bsp:"Sie hat Fleisch gebraten."},
  {inf:"fallen",    pr:"fällt",       pt:"fiel",pp:"gefallen",    ru:"падать",h:"ist",lv:"A2",bsp:"Das Kind ist hingefallen."},
  {inf:"gefallen",  pr:"gefällt",     pt:"gefiel",pp:"gefallen",    ru:"нравиться",h:"hat",lv:"A2",bsp:"Das Konzert hat mir sehr gut gefallen."},
  {inf:"gewinnen",  pr:"gewinnt",     pt:"gewann",pp:"gewonnen",    ru:"выигрывать",h:"hat",lv:"A2",bsp:"Unser Team hat das Spiel gewonnen."},
  {inf:"laden",     pr:"lädt",        pt:"lud",pp:"geladen",     ru:"грузить, загружать",h:"hat",lv:"A2",bsp:"Er hat das Video hochgeladen."},
  {inf:"liegen",    pr:"liegt",       pt:"lag",pp:"gelegen",     ru:"лежать",h:"hat",lv:"A2",bsp:"Das Buch hat auf dem Tisch gelegen."},
  {inf:"nennen",    pr:"nennt",       pt:"nannte",pp:"genannt",     ru:"называть",h:"hat",lv:"A2",bsp:"Sie hat ihn beim Namen genannt."},
  {inf:"rennen",    pr:"rennt",       pt:"rannte",pp:"gerannt",     ru:"бежать (быстро)",h:"ist",lv:"A2",bsp:"Er ist sehr schnell gerannt."},
  {inf:"riechen",   pr:"riecht",      pt:"roch",pp:"gerochen",    ru:"пахнуть",h:"hat",lv:"A2",bsp:"Die Blumen haben gut gerochen."},
  {inf:"schließen", pr:"schließt",    pt:"schloss",pp:"geschlossen", ru:"закрывать",h:"hat",lv:"A2",bsp:"Er hat die Tür geschlossen."},
  {inf:"sitzen",    pr:"sitzt",       pt:"saß",pp:"gesessen",    ru:"сидеть",h:"hat",lv:"A2",bsp:"Wir haben im Café gesessen."},
  {inf:"steigen",   pr:"steigt",      pt:"stieg",pp:"gestiegen",   ru:"подниматься, садиться",h:"ist",lv:"A2",bsp:"Wir sind in den Bus gestiegen."},
  {inf:"sterben",   pr:"stirbt",      pt:"starb",pp:"gestorben",   ru:"умирать",h:"ist",lv:"A2",bsp:"Die Pflanze ist gestorben."},
  {inf:"treiben",   pr:"treibt",      pt:"trieb",pp:"getrieben",   ru:"заниматься (спортом)",h:"hat",lv:"A2",bsp:"Er hat viel Sport getrieben."},
  {inf:"vergessen", pr:"vergisst",    pt:"vergaß",pp:"vergessen",   ru:"забывать",h:"hat",lv:"A2",bsp:"Ich habe mein Handy vergessen."},
  {inf:"verlieren", pr:"verliert",    pt:"verlor",pp:"verloren",    ru:"терять",h:"hat",lv:"A2",bsp:"Er hat seine Schlüssel verloren."},
  {inf:"wachsen",   pr:"wächst",      pt:"wuchs",pp:"gewachsen",   ru:"расти",h:"ist",lv:"A2",bsp:"Das Kind ist sehr gewachsen."},
];
// Общее правило haben/sein в Perfekt — используется и в T10A (вкладка "haben / sein"),
// и в T10B (вкладка "Regel"), чтобы не дублировать объяснение в двух местах.
function HabenSeinRegel(){
  const seinVerbs=[
    {inf:"fahren",   pp:"gefahren",       ru:"ехать"},
    {inf:"gehen",    pp:"gegangen",       ru:"идти"},
    {inf:"fliegen",  pp:"geflogen",       ru:"лететь"},
    {inf:"kommen",   pp:"gekommen",       ru:"приходить"},
    {inf:"laufen",   pp:"gelaufen",       ru:"бежать"},
    {inf:"reisen",   pp:"gereist",        ru:"путешествовать"},
  ];
  return (
    <div>
      <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,
        borderRadius:10,padding:"10px 12px",marginBottom:8}}>
        <div style={{fontWeight:800,fontSize:12,color:C.teal,marginBottom:6}}>
          ✅ haben — большинство глаголов
        </div>
        <div style={{fontSize:12,color:C.text,lineHeight:1.7,marginBottom:8}}>
          → есть <b style={{color:C.teal}}>Akkusativ-объект</b> (кого/что?)<br/>
          → или не подходит под правила sein
        </div>
        {[["Ich habe Musik gehört.","что? → Musik → haben"],
          ["Er hat das Auto gekauft.","что? → Auto → haben"],
          ["Wir haben gekocht.","нет движения → haben"]].map(([bsp,note])=>(
          <div key={bsp} style={{marginBottom:4,background:C.ov5,
            borderRadius:6,padding:"5px 8px",fontSize:11}}>
            <div style={{color:C.text,fontWeight:600}}>{bsp}</div>
            <div style={{color:C.muted}}>{note}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
        borderRadius:10,padding:"10px 12px",marginBottom:8}}>
        <div style={{fontWeight:800,fontSize:12,color:C.orange,marginBottom:8}}>
          🚶 sein — только 3 случая
        </div>
        {[
          ["1. Bewegungsverben (A → B)","fahren, gehen, fliegen, laufen, kommen, reisen","Ich bin nach Wien gefahren."],
          ["2. Zustandsveränderung","einschlafen, aufwachen, aufstehen, werden, sterben","Ich bin früh eingeschlafen."],
          ["3. Ausnahmen ⚠️","bleiben (оставаться) → ist geblieben · sein (быть) → ist gewesen","Ich bin nicht lange geblieben."],
        ].map(([title,verbs,bsp])=>(
          <div key={title} style={{marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:700,color:C.orange,marginBottom:3}}>{title}:</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{verbs}</div>
            <div style={{background:C.ov5,borderRadius:6,padding:"5px 8px",fontSize:11,color:C.text}}>{bsp}</div>
          </div>
        ))}
        <div style={{background:C.ov5,borderRadius:7,padding:"7px 9px",marginTop:4}}>
          <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:4}}>Примеры Partizip II:</div>
          {seinVerbs.map(({inf,pp,ru})=>(
            <div key={inf} style={{display:"flex",gap:6,fontSize:11,marginBottom:3}}>
              <span style={{color:C.muted,minWidth:65}}>{inf}</span>
              <span style={{color:C.orange,fontWeight:700,minWidth:85}}>{pp}</span>
              <span style={{color:C.muted}}>{ru}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.card2,borderRadius:8,padding:"9px 11px",fontSize:11}}>
        <div style={{fontWeight:700,color:C.muted,marginBottom:5}}>💡 Быстрый тест:</div>
        <div style={{color:C.text,lineHeight:1.8}}>
          1. Есть объект (кого/что)? → <b style={{color:C.teal}}>haben</b><br/>
          2. Движение А→Б? → <b style={{color:C.orange}}>sein</b><br/>
          3. Изменение состояния? → <b style={{color:C.orange}}>sein</b><br/>
          4. bleiben / sein? → <b style={{color:C.orange}}>sein</b> ⚠️<br/>
          5. Всё остальное? → <b style={{color:C.teal}}>haben</b>
        </div>
      </div>
    </div>
  );
}

function T10A(){
  const [tab,setTab]=useState("struktur");
  const [starkIdx,setStarkIdx]=useState(null);
  const [starkFil,setStarkFil]=useState("all");
  const regelPP=[
    {inf:"machen",   pp:"gemacht",    stamm:"mach",    exc:false},
    {inf:"kochen",   pp:"gekocht",    stamm:"koch",    exc:false},
    {inf:"lernen",   pp:"gelernt",    stamm:"lern",    exc:false},
    {inf:"hören",    pp:"gehört",     stamm:"hör",     exc:false},
    {inf:"suchen",   pp:"gesucht",    stamm:"such",    exc:false},
    {inf:"reden",    pp:"geredet",    stamm:"red",     exc:true},
    {inf:"arbeiten", pp:"gearbeitet", stamm:"arbeit",  exc:true},
    {inf:"warten",   pp:"gewartet",   stamm:"wart",    exc:true},
  ];
  const starkPP=[
    {inf:"fahren",   pp:"gefahren",   hilf:"sein"},
    {inf:"gehen",    pp:"gegangen",   hilf:"sein"},
    {inf:"kommen",   pp:"gekommen",   hilf:"sein"},
    {inf:"laufen",   pp:"gelaufen",   hilf:"sein"},
    {inf:"fliegen",  pp:"geflogen",   hilf:"sein"},
    {inf:"schreiben",pp:"geschrieben",hilf:"haben"},
    {inf:"lesen",    pp:"gelesen",    hilf:"haben"},
    {inf:"essen",    pp:"gegessen",   hilf:"haben"},
    {inf:"trinken",  pp:"getrunken",  hilf:"haben"},
    {inf:"sehen",    pp:"gesehen",    hilf:"haben"},
    {inf:"finden",   pp:"gefunden",   hilf:"haben"},
    {inf:"bleiben",  pp:"geblieben",  hilf:"sein"},
    {inf:"werden",   pp:"geworden",   hilf:"sein"},
  ];
  const trennPP=[
    {inf:"aufräumen",   pp:"aufgeräumt",   pref:"auf",  stem:"räum",  suf:"t"},
    {inf:"einkaufen",   pp:"eingekauft",   pref:"ein",  stem:"kauf",  suf:"t"},
    {inf:"abholen",     pp:"abgeholt",     pref:"ab",   stem:"hol",   suf:"t"},
    {inf:"aufmachen",   pp:"aufgemacht",   pref:"auf",  stem:"mach",  suf:"t"},
    {inf:"anrufen",     pp:"angerufen",    pref:"an",   stem:"ruf",   suf:"en ⚠️"},
    {inf:"aufstehen",   pp:"aufgestanden", pref:"auf",  stem:"stand", suf:"en ⚠️"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.purple}>
        <H c={C.purple}>📅 L10A · Perfekt</H>
        <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
          {[["struktur","Struktur"],["pp","Partizip II"],["trenn","Trennb./Untrennb."],["hssein","haben / sein"],["stark","📋 A1 & A2"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,minWidth:70,padding:"8px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.purple+"33":"transparent",
                color:tab===key?C.purple:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="struktur"&&(
          <div>
            <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.purple,marginBottom:10}}>
                Perfekt = разговорное прошедшее
              </div>
              <div style={{background:C.ov7,borderRadius:9,padding:"10px",marginBottom:10,textAlign:"center"}}>
                <span style={{color:C.orange,fontWeight:800,fontSize:13}}>haben/sein</span>
                <span style={{color:C.muted}}> — позиция 2 — </span>
                <span style={{color:C.purple,fontWeight:800,fontSize:13}}>Partizip II</span>
                <span style={{color:C.muted}}> в конце</span>
              </div>
              {[
                ["Ich","habe","gestern","gekocht."],
                ["Er","hat","im Büro","gearbeitet."],
                ["Sie","ist","nach Wien","gefahren."],
                ["Wir","haben","Musik","gehört."],
                ["Er","ist","früh","eingeschlafen."],
              ].map(([s,h,m,pp])=>(
                <div key={pp} style={{display:"flex",gap:6,marginBottom:5,fontSize:12,
                  background:C.ov4,borderRadius:7,padding:"6px 10px",alignItems:"baseline"}}>
                  <span style={{color:C.text,minWidth:40}}>{s}</span>
                  <span style={{color:C.orange,fontWeight:800,minWidth:28}}>{h}</span>
                  <span style={{color:C.muted,flex:1}}>{m}</span>
                  <span style={{color:C.purple,fontWeight:800}}>{pp}</span>
                </div>
              ))}
            </div>
            <div style={{background:C.card2,borderRadius:9,padding:"9px 11px",marginBottom:8}}>
              <div style={{fontWeight:700,fontSize:12,color:C.teal,marginBottom:6}}>❓ Вопросы в Perfekt:</div>
              {[
                ["Hast du gestern gekocht?","Ja, ich habe gekocht."],
                ["Ist er nach Wien gefahren?","Ja, er ist gefahren."],
              ].map(([f,a])=>(
                <div key={f} style={{marginBottom:5,fontSize:11}}>
                  <div style={{color:C.text,fontWeight:600}}>— {f}</div>
                  <div style={{color:C.muted,paddingLeft:8}}>— {a}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.card2,borderRadius:9,padding:"9px 11px"}}>
              <div style={{fontWeight:700,fontSize:11,color:C.muted,marginBottom:5}}>🕐 Временны́е маркеры:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {["gestern","vorgestern","letzte Woche","letzten Monat","früher","schon","noch nicht","nie"].map(m=>(
                  <span key={m} style={{background:C.purple+"22",borderRadius:5,padding:"3px 8px",
                    fontSize:11,color:C.purple,fontWeight:600}}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==="pp"&&(
          <div>
            <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:8}}>
              <div style={{fontWeight:800,fontSize:12,color:C.purple,marginBottom:8}}>
                1️⃣ Schwache (правильные): ge- + Stamm + -t
              </div>
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:"2px 8px",fontSize:11,marginBottom:8}}>
                {regelPP.map(({inf,pp,exc})=>(
                  <Fragment key={inf}>
                    <span style={{color:C.muted}}>{inf}</span>
                    <span style={{color:C.border,textAlign:"center"}}>→</span>
                    <span style={{color:C.purple,fontWeight:700}}>
                      {pp}{exc&&<span style={{color:C.orange}}> ⚠️</span>}
                    </span>
                  </Fragment>
                ))}
              </div>
              <div style={{background:C.orange+"15",borderRadius:7,padding:"6px 9px",fontSize:11,color:C.muted}}>
                ⚠️ Stamm на -t/-d: +<b style={{color:C.orange}}>et</b> → gered<b style={{color:C.orange}}>et</b>, gearbeit<b style={{color:C.orange}}>et</b>
              </div>
            </div>
            <div style={{background:C.blue+"15",border:`1px solid ${C.blue}33`,
              borderRadius:10,padding:"10px 12px",marginBottom:8}}>
              <div style={{fontWeight:800,fontSize:12,color:C.blue,marginBottom:4}}>
                2️⃣ Starke (неправильные): ge- + Stamm + -en
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Корень меняется — нужно запоминать!</div>
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",gap:"3px 8px",fontSize:11}}>
                <span style={{color:C.muted,fontSize:11,fontWeight:700}}>Inf.</span>
                <span></span>
                <span style={{color:C.blue,fontSize:11,fontWeight:700}}>P.II</span>
                <span style={{color:C.muted,fontSize:11,fontWeight:700}}>+</span>
                {starkPP.map(({inf,pp,hilf})=>(
                  <Fragment key={inf}>
                    <span style={{color:C.muted}}>{inf}</span>
                    <span style={{color:C.border,textAlign:"center"}}>→</span>
                    <span style={{color:C.blue,fontWeight:700}}>{pp}</span>
                    <span style={{fontSize:11,color:hilf==="sein"?C.orange:C.teal,fontWeight:700}}>{hilf}</span>
                  </Fragment>
                ))}
              </div>
            </div>
            <div style={{background:C.teal+"15",border:`1px solid ${C.teal}33`,
              borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontWeight:800,fontSize:12,color:C.teal,marginBottom:4}}>
                3️⃣ Verben auf -ieren: только -t, без ge-!
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>Заимствованные слова — ge- не добавляется!</div>
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:"3px 8px",fontSize:12,marginBottom:8}}>
                {[["studieren","studiert"],["telefonieren","telefoniert"],
                  ["fotografieren","fotografiert"],["trainieren","trainiert"],
                  ["passieren","passiert ⚠️ (sein)"]].map(([inf,pp])=>(
                  <Fragment key={inf}>
                    <span style={{color:C.muted}}>{inf}</span>
                    <span style={{color:C.border,textAlign:"center"}}>→</span>
                    <span style={{color:C.teal,fontWeight:700}}>{pp}</span>
                  </Fragment>
                ))}
              </div>
              <div style={{background:C.ov6,borderRadius:7,padding:"6px 9px",fontSize:11,color:C.orange}}>
                ✗ gestudiert ← неправильно!<br/>
                ✓ studiert ← правильно!
              </div>
            </div>
          </div>
        )}
        {tab==="trenn"&&(
          <div>
            <div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,
              borderRadius:9,padding:"10px 12px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:12,color:C.purple,marginBottom:8}}>
                Trennbare: Präfix + ge + Stamm + -t
              </div>
              {trennPP.map(({inf,pp,pref,stem,suf})=>(
                <div key={inf} style={{marginBottom:6,background:C.ov4,
                  borderRadius:8,padding:"7px 10px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:C.muted,fontSize:12}}>{inf}</span>
                    <span style={{color:C.purple,fontWeight:800,fontSize:13}}>{pp}</span>
                  </div>
                  <div style={{display:"flex",gap:0}}>
                    <span style={{background:C.orange+"22",padding:"2px 6px",borderRadius:"4px 0 0 4px",fontSize:11,color:C.orange,fontWeight:700}}>{pref}</span>
                    <span style={{background:C.purple+"22",padding:"2px 6px",fontSize:11,color:C.purple,fontWeight:700}}>ge</span>
                    <span style={{background:C.teal+"22",padding:"2px 6px",fontSize:11,color:C.teal,fontWeight:700}}>{stem}</span>
                    <span style={{background:C.ov8,padding:"2px 6px",borderRadius:"0 4px 4px 0",fontSize:11,color:C.muted}}>+{suf}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:9,padding:"10px 12px"}}>
              <div style={{fontWeight:700,fontSize:12,color:C.orange,marginBottom:6}}>
                ⚠️ Untrennbare (be-, er-, ver-, ent-, ge-): без ge-!
              </div>
              {[["besuchen","besucht"],["erklären","erklärt"],["vergessen","vergessen"],
                ["verkaufen","verkauft"],["bestellen","bestellt"],["verstehen","verstanden"]].map(([inf,pp])=>(
                <div key={inf} style={{display:"flex",justifyContent:"space-between",fontSize:12,
                  background:C.ov4,borderRadius:6,padding:"4px 8px",marginBottom:3}}>
                  <span style={{color:C.muted}}>{inf}</span>
                  <span style={{color:C.orange,fontWeight:700}}>{pp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab==="hssein"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8,fontStyle:"italic"}}>
              Практика этого правила — в разделе 10B · Unterwegs.
            </div>
            <HabenSeinRegel/>
          </div>
        )}
        {tab==="stark"&&(
          <div>
            <div style={{display:"flex",gap:4,marginBottom:6,flexWrap:"wrap"}}>
              {[["all",`Все ${STARKE_VERBEN.length}`,"purple"],
                ["A1",`A1 ${STARKE_VERBEN.filter(v=>v.lv==="A1").length}`,"blue"],
                ["A2",`A2 ${STARKE_VERBEN.filter(v=>v.lv==="A2").length}`,"teal"],
                ["hat",`haben ${STARKE_VERBEN.filter(v=>v.h==="hat").length}`,"teal"],
                ["ist",`sein ${STARKE_VERBEN.filter(v=>v.h==="ist").length}`,"orange"],
              ].map(([f,lbl,col])=>(
                <button key={f} onClick={()=>setStarkFil(f)}
                  style={{flex:1,minWidth:50,padding:"5px 3px",borderRadius:7,border:"none",cursor:"pointer",
                    fontSize:11,fontWeight:700,
                    background:starkFil===f?C[col]+"33":"transparent",
                    color:starkFil===f?C[col]:C.muted}}>
                  {lbl}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:4,paddingLeft:4,marginBottom:5,fontSize:11,color:C.muted,fontWeight:700}}>
              <span style={{flex:1}}>Infinitiv (Präsens)</span>
              <span style={{minWidth:56,textAlign:"left"}}>Präteritum</span>
              <span style={{minWidth:74}}>Partizip II</span>
              <span style={{minWidth:28}}>+</span>
            </div>
            {(starkFil==="all"?STARKE_VERBEN
              :starkFil==="A1"||starkFil==="A2"?STARKE_VERBEN.filter(v=>v.lv===starkFil)
              :STARKE_VERBEN.filter(v=>v.h===starkFil)
            ).map((v,i)=>(
              <div key={v.inf}>
                <div onClick={()=>setStarkIdx(starkIdx===i?null:i)}
                  style={{display:"flex",alignItems:"center",gap:4,padding:"6px 8px",
                    background:starkIdx===i?C.ov8:C.ov3,
                    borderRadius:7,marginBottom:3,cursor:"pointer",
                    borderLeft:`3px solid ${v.h==="ist"?C.orange:C.teal}`}}>
                  <div style={{flex:1,minWidth:0}}>
                    <span style={{fontWeight:700,color:C.text,fontSize:12}}>{v.inf}</span>
                    <span style={{color:C.muted,fontSize:11}}> ({v.pr})</span>
                    <span style={{marginLeft:4,background:v.lv==="A1"?C.blue+"22":C.teal+"22",
                      color:v.lv==="A1"?C.blue:C.teal,borderRadius:3,
                      padding:"0px 4px",fontSize:11,fontWeight:700}}>{v.lv}</span>
                  </div>
                  <div style={{minWidth:56,color:C.blue,fontWeight:700,fontSize:11.5}}>{v.pt}</div>
                  <div style={{minWidth:74,color:C.purple,fontWeight:700,fontSize:12}}>{v.pp}</div>
                  <div style={{minWidth:28,textAlign:"center"}}>
                    <span style={{background:v.h==="ist"?C.orange+"33":C.teal+"33",
                      color:v.h==="ist"?C.orange:C.teal,
                      borderRadius:4,padding:"1px 5px",fontSize:11,fontWeight:800}}>{v.h}</span>
                  </div>
                </div>
                {starkIdx===i&&(
                  <div style={{background:C.ov6,borderRadius:"0 0 7px 7px",
                    padding:"6px 10px",marginBottom:5,fontSize:11,
                    borderLeft:`3px solid ${v.h==="ist"?C.orange:C.teal}`}}>
                    <div style={{color:C.text,fontWeight:700,marginBottom:3}}>🔤 {v.ru}</div>
                    <div style={{color:C.muted,fontStyle:"italic"}}>💬 {v.bsp}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L10B=[
  {q:"'Ich ___ gestern ins Kino gegangen.'",            opts:["habe","bin","hat","ist"],                              ans:1, hint:"gehen = Bewegung → sein"},
  {q:"'Ich ___ heute Nacht gut geschlafen.'",           opts:["habe","bin"],                                          ans:0, hint:"schlafen = keine Bewegung → haben"},
  {q:"'Ich ___ gestern früh eingeschlafen.'",           opts:["habe","bin"],                                         ans:1, hint:"einschlafen = Zustandsveränderung → sein"},
  {q:"'Ich ___ am Sonntag einen Film gesehen.'",        opts:["habe","bin"],                                          ans:0, hint:"sehen → haben"},
  {q:"'Ich ___ gestern nicht lange geblieben.'",        opts:["habe","bin"],                                         ans:1, hint:"bleiben → immer sein (Ausnahme!)"},
  {q:"'Ich ___ am Wochenende nach Heidelberg gefahren.'",opts:["habe","bin"],                                        ans:1, hint:"fahren = Bewegung → sein"},
  {q:"Partizip II von 'mitkommen'?",                    opts:["gemitkommt","mitgekommen","mitgekommt","kommen mit"], ans:1, hint:"trennbar + unregelmäßig: mit+ge+komm+en"},
  {q:"Partizip II von 'aufstehen'?",                    opts:["aufgestanden","gestanden auf","aufgestehen","aufstanden"], ans:0, hint:"auf+ge+stand+en"},
  {q:"Partizip II von 'aufräumen'?",                    opts:["geaufräumt","aufgeräumt","aufräumt","räumt auf"],     ans:1, hint:"auf+ge+räum+t"},
  {q:"Partizip II von 'abholen'?",                      opts:["geabholt","abgeholt","abholt","holt ab"],             ans:1, hint:"ab+ge+hol+t"},
  {q:"'Markus ___ den Autoschlüssel nicht gefunden.'",  opts:["hat","ist"],                                          ans:0, hint:"finden → haben"},
  {q:"'Wir ___ in die Disko gegangen.'",                opts:["haben","sind"],                                       ans:1, hint:"gehen → sein"},
];

const Q_L10C=[
  {q:"Präteritum von 'sein' für 'ich'?",                opts:["war","hatte","bin","habe"],                            ans:0, hint:"ich war"},
  {q:"Präteritum von 'haben' für 'er'?",                opts:["war","hatte","ist","hat"],                            ans:1, hint:"er hatte"},
  {q:"Präteritum von 'sein' für 'wir'?",                opts:["waren","hatten","sind","haben"],                       ans:0, hint:"wir waren"},
  {q:"Präteritum von 'haben' für 'sie' (Pl.)?",         opts:["waren","hatten","sind","haben"],                       ans:1, hint:"sie hatten"},
  {q:"'Er ___ seit 2004 in Deutschland.'",              opts:["ist","war","hat","hatte"],                            ans:0, hint:"seit + Präsens = действие длится до сейчас"},
  {q:"'seit' требует какого падежа?",                   opts:["Nominativ","Akkusativ","Dativ","Genitiv"],            ans:2, hint:"seit + Dativ"},
  {q:"'Ich bin seit ___ Jahr in Deutschland.' (ein, Dat. n)", opts:["ein","einem","einen","eines"],                  ans:1, hint:"seit + Dativ: n → einem"},
  {q:"Wie liest man 1989?",                             opts:["eins-neun-acht-neun","neunzehnhundertneunundachtzig","neunzehn-neunundachtzig","tausend neunhundert"], ans:1, hint:"19|89 → neunzehnhundert + neunundachtzig"},
  {q:"Wie liest man 2001?",                             opts:["zweitausendeins","zwanzig-null-eins","zwei tausend und eins","zweitausend und ein"], ans:0, hint:"2001 → zweitausendeins"},
  {q:"Wie liest man 2014?",                             opts:["zwanzig-vierzehn","zweitausendvierzehn","zwei tausend vierzehn Jahre","zweitausend und vierzehn"], ans:1, hint:"2014 → zweitausendvierzehn"},
  {q:"'Früher ___ ich in der Ukraine.' (war/wohnte)",   opts:["war","wohnte","bin","habe"],                          ans:0, hint:"Präteritum von sein: war"},
];

function T10B(){
  const [tab,setTab]=useState("habenbin");
  const habenBin=[
    {de:"Ich habe heute Nacht gut geschlafen.",          hs:"habe"},
    {de:"Ich bin gestern schon früh eingeschlafen.",     hs:"bin"},
    {de:"Ich habe am Sonntag einen Film gesehen.",       hs:"habe"},
    {de:"Ich bin gestern nicht lange geblieben.",        hs:"bin"},
    {de:"Ich bin am Wochenende nach Heidelberg gefahren.",hs:"bin"},
    {de:"Ich habe noch nicht gegessen.",                 hs:"habe"},
    {de:"Ich bin nach Wien mitgekommen.",                hs:"bin"},
  ];
  const partTab=[
    {inf:"essen",     pp:"gegessen",    hilf:"hat"},
    {inf:"trinken",   pp:"getrunken",   hilf:"hat"},
    {inf:"sehen",     pp:"gesehen",     hilf:"hat"},
    {inf:"schlafen",  pp:"geschlafen",  hilf:"hat"},
    {inf:"lesen",     pp:"gelesen",     hilf:"hat"},
    {inf:"lernen",    pp:"gelernt",     hilf:"hat"},
    {inf:"bleiben",   pp:"geblieben",   hilf:"ist"},
    {inf:"fahren",    pp:"gefahren",    hilf:"ist"},
    {inf:"gehen",     pp:"gegangen",    hilf:"ist"},
    {inf:"kommen",    pp:"gekommen",    hilf:"ist"},
    {inf:"mitkommen", pp:"mitgekommen",hilf:"ist"},
    {inf:"aufstehen", pp:"aufgestanden",hilf:"ist"},
    {inf:"aufräumen", pp:"aufgeräumt", hilf:"hat"},
    {inf:"abholen",   pp:"abgeholt",   hilf:"hat"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.teal}>
        <H c={C.teal}>🚶 L10B · Unterwegs — Perfekt mit haben/sein</H>
        <div style={{fontSize:11,color:C.muted,marginBottom:10,fontStyle:"italic"}}>
          Правило haben/sein разобрано в разделе 10A · Perfekt (вкладка «haben / sein»). Здесь — практика.
        </div>
        <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
          {[["habenbin","habe/bin?"],["tabelle","Partizip-Tabelle"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,minWidth:70,padding:"8px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.teal+"33":"transparent",
                color:tab===key?C.teal:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="habenbin"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>Ich habe oder ich bin? Цветом — правильный вариант.</div>
            {habenBin.map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 8px",
                background:C.ov4,borderRadius:8,marginBottom:5}}>
                <span style={{minWidth:46,textAlign:"center",fontWeight:800,fontSize:11,
                  color:s.hs==="bin"?C.orange:C.teal,
                  background:(s.hs==="bin"?C.orange:C.teal)+"22",borderRadius:5,padding:"2px 0"}}>
                  {s.hs}
                </span>
                <span style={{fontSize:12,color:C.text}}>{s.de.replace(/^Ich (habe|bin) /,"")}</span>
              </div>
            ))}
          </div>
        )}
        {tab==="tabelle"&&(
          <div>
            <div style={{display:"flex",gap:6,paddingLeft:4,marginBottom:5,fontSize:11,color:C.muted,fontWeight:700}}>
              <span style={{flex:1}}>Infinitiv</span>
              <span style={{minWidth:96}}>Partizip II</span>
              <span style={{minWidth:30}}>+</span>
            </div>
            {partTab.map(v=>(
              <div key={v.inf} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",
                background:C.ov3,borderRadius:7,marginBottom:3,
                borderLeft:`3px solid ${v.hilf==="ist"?C.orange:C.teal}`}}>
                <span style={{flex:1,fontWeight:700,color:C.text,fontSize:12}}>{v.inf}</span>
                <span style={{minWidth:96,color:C.purple,fontWeight:700,fontSize:12}}>{v.pp}</span>
                <span style={{minWidth:30,textAlign:"center",background:(v.hilf==="ist"?C.orange:C.teal)+"33",
                  color:v.hilf==="ist"?C.orange:C.teal,borderRadius:4,padding:"1px 5px",fontSize:11,fontWeight:800}}>{v.hilf}</span>
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}

function T10C(){
  const [tab,setTab]=useState("prat");
  const seinPrat=[["ich","war"],["du","warst"],["er/sie/es","war"],["wir","waren"],["ihr","wart"],["sie/Sie","waren"]];
  const habenPrat=[["ich","hatte"],["du","hattest"],["er/sie/es","hatte"],["wir","hatten"],["ihr","hattet"],["sie/Sie","hatten"]];
  const jahre=[
    {n:1978,w:"neunzehnhundertachtundsiebzig"},
    {n:1989,w:"neunzehnhundertneunundachtzig"},
    {n:1996,w:"neunzehnhundertsechsundneunzig"},
    {n:2000,w:"zweitausend"},
    {n:2001,w:"zweitausendeins"},
    {n:2005,w:"zweitausendfünf"},
    {n:2014,w:"zweitausendvierzehn"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <Box c={C.purple}>
        <H c={C.purple}>📖 L10C · Mein Leben früher und heute</H>
        <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
          {[["prat","war/hatte"],["seit","seit+Dativ"],["jahre","Jahreszahlen"]].map(([key,lbl])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,minWidth:70,padding:"8px 4px",borderRadius:9,border:"none",cursor:"pointer",
                fontSize:11,fontWeight:700,
                background:tab===key?C.purple+"33":"transparent",
                color:tab===key?C.purple:C.muted}}>
              {lbl}
            </button>
          ))}
        </div>
        {tab==="prat"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10}}>
              <b style={{color:C.text}}>haben</b> и <b style={{color:C.text}}>sein</b> в рассказах о прошлом обычно стоят в Präteritum, а не в Perfekt — даже в устной речи.
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1,background:C.purple+"15",border:`1px solid ${C.purple}33`,borderRadius:10,padding:"10px"}}>
                <div style={{fontWeight:800,color:C.purple,fontSize:12,marginBottom:6,textAlign:"center"}}>sein → war</div>
                {seinPrat.map(([p,f])=>(
                  <div key={p} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"3px 0",
                    borderBottom:`1px solid ${C.border}`}}>
                    <span style={{color:C.muted}}>{p}</span><span style={{color:C.text,fontWeight:700}}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,background:C.blue+"15",border:`1px solid ${C.blue}33`,borderRadius:10,padding:"10px"}}>
                <div style={{fontWeight:800,color:C.blue,fontSize:12,marginBottom:6,textAlign:"center"}}>haben → hatte</div>
                {habenPrat.map(([p,f])=>(
                  <div key={p} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"3px 0",
                    borderBottom:`1px solid ${C.border}`}}>
                    <span style={{color:C.muted}}>{p}</span><span style={{color:C.text,fontWeight:700}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginTop:10,fontSize:12,color:C.text,fontStyle:"italic"}}>
              Früher <b>war</b> ich in der Ukraine. Heute <b>bin</b> ich in Deutschland.<br/>
              Früher <b>hatte</b> ich kein Auto. Heute <b>habe</b> ich ein Auto.
            </div>
          </div>
        )}
        {tab==="seit"&&(
          <div>
            <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:13,color:C.orange,marginBottom:8}}>seit + Dativ</div>
              <div style={{fontSize:12,color:C.text,marginBottom:6}}>
                «seit» отвечает на вопрос <b>Seit wann?</b> и показывает действие, которое началось в прошлом и продолжается до сих пор. После «seit» используется <b>Präsens</b>!
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:8}}>
                <div style={{background:C.ov7,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.text}}>
                  Er ist <b style={{color:C.orange}}>seit 2004</b> in Deutschland.
                </div>
                <div style={{background:C.ov7,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.text}}>
                  Ich bin <b style={{color:C.orange}}>seit einem Jahr</b> in Deutschland. <span style={{color:C.muted}}>(n, Dat.)</span>
                </div>
                <div style={{background:C.ov7,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.text}}>
                  Sie arbeitet <b style={{color:C.orange}}>seit einer Woche</b> im Supermarkt. <span style={{color:C.muted}}>(f, Dat.)</span>
                </div>
                <div style={{background:C.ov7,borderRadius:8,padding:"8px 10px",fontSize:12,color:C.text}}>
                  Wir haben <b style={{color:C.orange}}>seit zwei Jahren</b> ein eigenes Haus. <span style={{color:C.muted}}>(Pl., Dat.)</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab==="jahre"&&(
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>Год читается как два двузначных числа: 19|89, 20|01.</div>
            {jahre.map(j=>(
              <div key={j.n} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 8px",
                background:C.ov4,borderRadius:8,marginBottom:5}}>
                <span style={{minWidth:48,fontWeight:800,color:C.purple,fontSize:13}}>{j.n}</span>
                <span style={{fontSize:12,color:C.text}}>{j.w}</span>
              </div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}

const Q_L6A=[
  {q:"Welcher Artikel hat 'Apfel'?",          opts:["der","die","das"],                                                                     ans:0, hint:"Artikel"},
  {q:"Welcher Artikel hat 'Milch'?",          opts:["der","die","das"],                                                                     ans:1, hint:"Artikel"},
  {q:"Welcher Artikel hat 'Brot'?",           opts:["der","die","das"],                                                                     ans:2, hint:"Artikel"},
  {q:"Wie lautet der Plural von 'Apfel'?",    opts:["Apfels","Äpfel","Apfeln","Apfel"],                                                     ans:1, hint:"Plural"},
  {q:"Was hat keinen Plural?",                opts:["Apfel","Tomate","Milch","Kartoffel"],                                                   ans:2, hint:"kein Plural"},
  {q:"Welcher Artikel hat 'Käse'?",           opts:["der","die","das"],                                                                     ans:0, hint:"Artikel"},
  {q:"Wie lautet der Plural von 'Wurst'?",    opts:["Wursts","Würste","Wursten","Würster"],                                                  ans:1, hint:"Plural"},
  {q:"Welcher Artikel hat 'Kartoffel'?",      opts:["der","die","das"],                                                                     ans:1, hint:"Artikel"},
  {q:"Was bedeutet 'oft' bei Häufigkeit?",   opts:["никогда","иногда","редко","часто"],                                                     ans:3, hint:"Häufigkeit"},
  {q:"'Ich esse ___ Fisch.' (никогда)",       opts:["oft","manchmal","nie","selten"],                                                       ans:2, hint:"Häufigkeit"},
  {q:"Welcher Artikel hat 'Wein'?",           opts:["der","die","das"],                                                                     ans:0, hint:"Artikel"},
  {q:"Wie lautet der Plural von 'Tomate'?",   opts:["Tomaten","Tomats","Tomäte","Tomates"],                                                  ans:0, hint:"Plural"},
];

function T6A(){
  const [open,setOpen]=useState(null);
  const foods=[
    {art:"der",de:"Apfel",      pl:"Äpfel",     ru:"яблоко"},
    {art:"die",de:"Banane",     pl:"Bananen",   ru:"банан"},
    {art:"das",de:"Brot",       pl:"Brote",     ru:"хлеб"},
    {art:"die",de:"Butter",     pl:"—",         ru:"масло"},
    {art:"das",de:"Hähnchen",   pl:"Hähnchen",  ru:"курица"},
    {art:"der",de:"Joghurt",    pl:"Joghurts",  ru:"йогурт"},
    {art:"der",de:"Kaffee",     pl:"Kaffees",   ru:"кофе"},
    {art:"die",de:"Kartoffel",  pl:"Kartoffeln",ru:"картофель"},
    {art:"der",de:"Käse",       pl:"—",         ru:"сыр"},
    {art:"die",de:"Milch",      pl:"—",         ru:"молоко"},
    {art:"die",de:"Nudel",      pl:"Nudeln",    ru:"макароны"},
    {art:"der",de:"Reis",       pl:"—",         ru:"рис"},
    {art:"der",de:"Salat",      pl:"Salate",    ru:"салат"},
    {art:"die",de:"Schokolade", pl:"—",         ru:"шоколад"},
    {art:"der",de:"Tee",        pl:"Tees",      ru:"чай"},
    {art:"der",de:"Fisch",      pl:"Fische",    ru:"рыба"},
    {art:"die",de:"Tomate",     pl:"Tomaten",   ru:"помидор"},
    {art:"das",de:"Wasser",     pl:"—",         ru:"вода"},
    {art:"der",de:"Wein",       pl:"Weine",     ru:"вино"},
    {art:"die",de:"Wurst",      pl:"Würste",    ru:"колбаса"},
    {art:"die",de:"Zwiebel",    pl:"Zwiebeln",  ru:"лук"},
  ];
  const AC6=(a)=>a==="der"?C.blue:a==="die"?C.red:C.orange;
  const AB6=(a)=>a==="der"?C.blueBg:a==="die"?C.redBg:C.orangeBg;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Box c={C.green}>
        <H c={C.green}>🍎 A · Lebensmittel und Getränke</H>
        <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Нажми на слово — увидишь перевод.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
          {foods.map(({art,de,pl,ru})=>{
            const isOpen=open===de;
            const col=AC6(art);
            return (
              <div key={de} onClick={()=>setOpen(isOpen?null:de)}
                style={{background:isOpen?col+"18":C.card2,borderRadius:8,
                  padding:"8px 10px",borderLeft:`3px solid ${col}`,
                  cursor:"pointer",transition:"background 0.15s"}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{background:AB6(art),color:col,
                    borderRadius:4,padding:"1px 5px",fontSize:11,fontWeight:800,flexShrink:0}}>{art}</span>
                  <span style={{fontSize:14,fontWeight:700,color:C.text}}>{de}</span>
                </div>
                {isOpen&&(
                  <div style={{marginTop:5,paddingTop:5,borderTop:`1px solid ${col}33`}}>
                    <div style={{fontSize:12,color:col,fontWeight:600}}>{ru}</div>
                    {pl!=="—"&&<div style={{fontSize:11,color:C.muted}}>Pl: {pl}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Häufigkeit */}
        <div style={{background:C.card2,borderRadius:10,padding:"10px 14px",marginTop:12}}>
          <div style={{fontWeight:700,fontSize:13,color:C.orange,marginBottom:8}}>📊 Häufigkeit — Частота</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,textAlign:"center"}}>
            {[["nie","никогда",C.red],["selten","редко",C.orange],["manchmal","иногда",C.yellow],["oft","часто",C.green]].map(([w,ru,col])=>(
              <div key={w} style={{background:col+"18",border:`1px solid ${col}44`,borderRadius:8,padding:"6px 4px"}}>
                <div style={{fontSize:13,fontWeight:800,color:col}}>{w}</div>
                <div style={{fontSize:11,color:C.muted}}>{ru}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:12,color:C.muted,marginTop:8}}>
            Ich esse <span style={{color:C.green,fontWeight:700}}>oft</span> Brot. · Ich trinke <span style={{color:C.red,fontWeight:700}}>nie</span> Wein.
          </div>
        </div>
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
      {id:"2a",  icon:"🌍",title:"A · Nationalität und Sprachen",sub:"Страны + er/sie/es глаголы", time:"7 мин", col:C.blue,  hasT:true,  th:()=><T2A/>, ex:()=><Quiz questions={Q_2A_S}/>},
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
      {id:"4b",  icon:"🚴",title:"B · Freizeit mit der Familie",sub:"Verben mit Vokalwechsel · Wo/Wohin · Aktivitäten", time:"8 мин", col:C.green, hasT:true, th:()=><T4B/>, ex:()=><Quiz questions={Q_L4B}/>},
      {id:"4c",  icon:"📅",title:"C · Familien früher",        sub:"Präteritum von haben und sein: hatte, war",          time:"7 мин", col:C.purple,hasT:true, th:()=><T4C/>, ex:()=><Quiz questions={Q_L4C}/>},
    ]
  },
  {
    id:"L5",num:"5",title:"Der Tag und die Woche",
    sub:"A Wie spät ist es? · Uhrzeiten · Hobbys · Freizeit",
    date:"KB Seite 51–...",col:C.orange,
    sections:[
      {id:"d5",  icon:"💬",title:"Dialogfragen L5",          sub:"Фразы для диалога",                  time:"∞",     col:C.teal,  hasT:false, th:null,         ex:()=><DialogCards lId="L5"/>},
      {id:"5a",  icon:"🕐",title:"A · Wie spät ist es?",     sub:"Uhrzeiten · halb · vor/nach · Viertel", time:"7 мин", col:C.orange,hasT:true,  th:()=><T5A/>, ex:()=><Quiz questions={Q_L5A}/>},
      {id:"5b",  icon:"✂️",title:"B · Was macht Frau Costa?",sub:"Trennbare Verben: auf-, ein-, an-, aus-", time:"8 мин", col:C.blue,  hasT:true,  th:()=><T5B/>, ex:()=><Quiz questions={Q_L5B}/>},
      {id:"5c",  icon:"📅",title:"C · Meine Woche",          sub:"am · um · von...bis · Zeitangaben",      time:"6 мин", col:C.green, hasT:true,  th:()=><T5C/>, ex:()=><Quiz questions={Q_L5C}/>},
      {id:"5d",  icon:"📞",title:"D · Hast du Zeit?",         sub:"Verabredung · gehen + Infinitiv",        time:"5 мин", col:C.red,   hasT:true,  th:()=><T5D/>, ex:()=><Quiz questions={Q_L5D}/>},
    ]
  },
  {
    id:"L6",num:"6",title:"Guten Appetit!",
    sub:"A Lebensmittel · B Einkaufen · C Das mag ich · D Essen in Deutschland",
    date:"Seite 62–70",col:C.green,
    sections:[
      {id:"d6",  icon:"💬",title:"Dialogfragen L6",             sub:"Фразы для диалога",                                    time:"∞",     col:C.teal,   hasT:false, th:null,           ex:()=><DialogCards lId="L6"/>},
      {id:"6a",  icon:"🍎",title:"A · Lebensmittel",            sub:"Essen und Trinken · Häufigkeit",                       time:"5 мин", col:C.green,  hasT:true,  th:()=><T6A/>,     ex:()=><Quiz questions={Q_L6A}/>},
      {id:"6b",  icon:"🛒",title:"B · Der Einkaufszettel",      sub:"Imperativ du · ihr · Sie",                             time:"6 мин", col:C.orange, hasT:true,  th:()=><T6B/>,     ex:()=><Quiz questions={Q_L6B}/>},
      {id:"6c",  icon:"🛍️",title:"B · Einkaufen",              sub:"Einkaufsorte · möchten · hätte gerne · Mengen",        time:"6 мин", col:C.teal,   hasT:true,  th:()=><T6C/>,     ex:()=><Quiz questions={Q_L6C}/>},
      {id:"6d",  icon:"❤️",title:"C · Das mag ich",             sub:"mögen · kein- vs nicht · Akkusativ kein",              time:"6 мин", col:C.purple, hasT:true,  th:()=><T6D/>,     ex:()=><Quiz questions={Q_L6D}/>},
      {id:"6e",  icon:"🇩🇪",title:"D · Essen in Deutschland",   sub:"man · Essenszeiten · Frühstück/Mittag/Abend",          time:"5 мин", col:C.green,  hasT:true,  th:()=><T6E/>,     ex:()=><Quiz questions={Q_L6E}/>},
    ]
  },
  {
    id:"L7",num:"7",title:"Arbeit und Beruf",
    sub:"A Modalverben · B Rund ums Geld · C Dativ-Präpositionen",
    date:"Seite 71–82",col:C.blue,
    sections:[
      {id:"d7",  icon:"💬",title:"Dialogfragen L7",             sub:"Фразы для диалога",                                    time:"∞",     col:C.orange, hasT:false, th:null,           ex:()=><DialogCards lId="L7"/>},
      {id:"7a",  icon:"💼",title:"A · Berufe & Modalverben",    sub:"können · müssen · wollen · sollen · Satzklammer",      time:"7 мин", col:C.blue,   hasT:true,  th:()=><T7A/>,     ex:()=><Quiz questions={Q_L7A}/>},
      {id:"7b",  icon:"🏦",title:"B · Rund ums Geld",           sub:"Geldautomat · EC-Karte · IBAN · überweisen",           time:"4 мин", col:C.orange, hasT:true,  th:()=><T7B/>,     ex:()=><Quiz questions={Q_L7B}/>},
      {id:"7c",  icon:"🗺️",title:"C · Dativ-Präpositionen",     sub:"aus·bei·mit·nach·von·seit·zu + Wo/Wohin/Woher",        time:"7 мин", col:C.purple, hasT:true,  th:()=><T7C/>,     ex:()=><Quiz questions={Q_L7C}/>},
    ]
  },
  {
    id:"L8",num:"8",title:"Gute Besserung!",
    sub:"A Beim Arzt · B Pronomen Akk · C sollte · D/E Notruf 112",
    date:"Seite 83–99",col:C.red,
    sections:[
      {id:"d8",  icon:"💬",title:"Dialogfragen L8",             sub:"Фразы для диалога",                                    time:"∞",     col:C.purple, hasT:false, th:null,           ex:()=><DialogCards lId="L8"/>},
      {id:"8a",  icon:"🏥",title:"A · Beim Arzt",               sub:"Körperteile · sollen · Dialog Arzttermin",             time:"7 мин", col:C.red,    hasT:true,  th:()=><T8A/>,     ex:()=><Quiz questions={Q_L8A}/>},
      {id:"8b",  icon:"🔄",title:"B · Personalpronomen Akk.",   sub:"ich→mich · du→dich · er→ihn · wir→uns",               time:"5 мин", col:C.orange, hasT:true,  th:()=><T8B/>,     ex:()=><Quiz questions={Q_L8B}/>},
      {id:"8c",  icon:"💊",title:"C · sollte & Gesundheit",     sub:"Konjunktiv II · Krankenkasse · Kinderkrankheiten",     time:"5 мин", col:C.teal,   hasT:true,  th:()=><T8C/>,     ex:()=><Quiz questions={Q_L8C}/>},
      {id:"8d",  icon:"🚨",title:"D/E · Notruf 112 & Erschöpft",sub:"112-Schema · Erste Hilfe · erschöpft/gestresst · Tipps",time:"6 мин", col:C.red,    hasT:true,  th:()=><T8D/>,     ex:()=><Quiz questions={Q_L8D}/>},
    ]
  },
  {
    id:"L9",num:"9",title:"Wege durch die Stadt",
    sub:"A Verkehrsmittel · B In der Stadt · C Führerschein & dürfen",
    date:"Seite 93–99",col:C.blue,
    sections:[
      {id:"9a",  icon:"🚗",title:"A · Wege durch die Stadt",    sub:"Verkehrsmittel · mit + Dativ · teuer/billig/schnell",  time:"6 мин", col:C.blue,   hasT:true,  th:()=><T9A/>,     ex:()=><Quiz questions={Q_L9A}/>},
      {id:"9b",  icon:"🏙️",title:"B · In der Stadt",            sub:"Wegbeschreibung · Lokale Präp. mit Dativ · in/an/auf", time:"6 мин", col:C.teal,   hasT:true,  th:()=><T9B/>,     ex:()=><Quiz questions={Q_L9B}/>},
      {id:"9c",  icon:"🚦",title:"C · Führerschein & dürfen",   sub:"Modalverb dürfen · erlaubt/verboten · Führerschein",   time:"5 мин", col:C.orange, hasT:true,  th:()=><T9C/>,     ex:()=><Quiz questions={Q_L9C}/>},
    ]
  },
  {
    id:"L10",num:"10",title:"Mein Leben",
    sub:"A Gestern und heute (Perfekt) · B Unterwegs (haben/sein) · C Früher und heute (Präteritum, seit)",
    date:"Seite 103–109",col:C.purple,
    sections:[
      {id:"10a", icon:"📅",title:"A · Perfekt",                  sub:"haben + Partizip II · ge-...-t · Trennbare Verben",    time:"7 мин", col:C.purple, hasT:true,  th:()=><T10A/>,    ex:()=><Quiz questions={Q_L10A}/>},
      {id:"10b", icon:"🚶",title:"B · Unterwegs",                sub:"Perfekt mit haben/sein · Bewegungsverben",             time:"6 мин", col:C.teal,   hasT:true,  th:()=><T10B/>,    ex:()=><Quiz questions={Q_L10B}/>},
      {id:"10c", icon:"📖",title:"C · Früher und heute",         sub:"Präteritum war/hatte · seit + Dativ · Jahreszahlen",   time:"6 мин", col:C.orange, hasT:true,  th:()=><T10C/>,    ex:()=><Quiz questions={Q_L10C}/>},
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
    L5:{label:"L5 · Der Tag und die Woche", col:C.orange},
    L6:{label:"L6 · Guten Appetit!",        col:C.green},
    L7:{label:"L7 · Arbeit und Beruf",      col:C.blue},
    L8:{label:"L8 · Gute Besserung!",       col:C.red},
  };
  const filterFm=(pairs,lId)=>(lId==="L1"||lId==="L4")?pairs.filter(p=>!p.fm||p.fm===fm):pairs;

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
        const hasFmToggleHere=lId==="L1"||lId==="L4";

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
              const isHauptGruppe=hasFmToggleHere&&(g.tag==="Основные"||(lId==="L4"&&g.tag==="Дополнительные"));
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
                      {p.note&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>📝 {p.note}</div>}
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
  const [theme,setTheme]=useState(()=>{
    try{return localStorage.getItem("dk_theme")||"dark";}catch{return "dark";}
  });
  applyTheme(theme);
  const toggleTheme=()=>{
    const next=theme==="dark"?"light":"dark";
    setTheme(next);
    try{localStorage.setItem("dk_theme",next);}catch{}
  };
  const root={minHeight:"100vh",background:C.bg,display:"flex",justifyContent:"center",padding:"16px",fontFamily:"'Segoe UI',system-ui,sans-serif",color:C.text};
  const wrap={width:"100%",maxWidth:500};

  const lekt=lId?LEKTIONEN.find(l=>l.id===lId):null;
  const sec=sId&&lekt?lekt.sections.find(s=>s.id===sId):null;

  if(dialogOpen)return(
    <div style={root}>
      <ThemeToggle theme={theme} onToggle={toggleTheme}/>
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
      <ThemeToggle theme={theme} onToggle={toggleTheme}/>
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
      <ThemeToggle theme={theme} onToggle={toggleTheme}/>
      <div style={wrap}>
        <button onClick={()=>{setSId(null);setTab("th");}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"0 0 14px"}}>← {lekt.title}</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <span style={{fontSize:26}}>{sec.icon}</span>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:C.text}}>{sec.title}</div>
            <div style={{fontSize:12,color:C.muted}}>{sec.sub}</div>
          </div>
        </div>
        {/* 2C и 2D объединяют теорию и задания в одном компоненте */}
        {(sec.id==="2c"||sec.id==="2d")?(
          sec.th&&sec.th()
        ):(
          <>
            {sec.hasT&&<TabBar tabs={[{id:"th",label:"📖 Теория"},...(sec.ex?[{id:"ex",label:"✏️ Задания"}]:[] )]} active={tab} onChange={setTab}/>}
            {tab==="th"&&sec.hasT?sec.th&&sec.th():sec.ex&&sec.ex()}
          </>
        )}
      </div>
    </div>
  );

  // Lektion view
  if(lekt)return(
    <div style={root}>
      <ThemeToggle theme={theme} onToggle={toggleTheme}/>
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
              <div style={{fontSize:11,color:C.muted,width:16,textAlign:"center"}}>{i+1}</div>
              <span style={{fontSize:20}}>{s.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:14,color:s.id.startsWith("t")&&!s.id.startsWith("tip")?C.yellow:s.id==="d1"||s.id==="d2"||s.id==="d3"||s.id==="wb"?C.teal:C.text}}>{s.title}</div>
                <div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.sub}</div>
              </div>
              
              <span style={{color:C.muted}}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Home
  return(
    <div style={root}>
      <ThemeToggle theme={theme} onToggle={toggleTheme}/>
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
              <span style={{color:C.muted,fontSize:20}}>›</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}


