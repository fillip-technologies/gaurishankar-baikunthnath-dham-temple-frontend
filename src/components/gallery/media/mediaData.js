import mediaImg1 from '../../../assets/home/herosection-3.png';
import mediaImg2 from '../../../assets/home/herosection-2.png';
import mediaImg3 from '../../../assets/home/upcoming-festival.png';
import mediaImg4 from '../../../assets/home/herosection.png';

export const getMediaArticles = (t, currentLang) => [
  {
    id: 1,
    slug: 'grand-renovation-sandstone-carvings-unveiled',
    category: 'print',
    image: mediaImg1,
    source: t('mediaPage.articles.0.source', 'Dainik Jagran'),
    date: t('mediaPage.articles.0.date', '14 August 2026'),
    author: currentLang === 'hi' ? 'विशेष संवाददाता, पटना ब्यूरो' : 'Special Correspondent, Patna Bureau',
    location: currentLang === 'hi' ? 'बैकतपुर (खुसरूपुर), पटना' : 'Baikathpur (Khusrupur), Patna',
    readTime: currentLang === 'hi' ? '4 मिनट पठन' : '4 min read',
    title: t('mediaPage.articles.0.title', 'Grand Renovation & Sandstone Carvings Unveiled at Baikathpur Dham'),
    description: t('mediaPage.articles.0.description', 'State dignitaries and Vedic scholars gathered at Shri Gaurishankar Baikunthnath Dham for the inauguration of renovated stone mandaps and newly paved Ganga Ghat promenade.'),
    paragraphs: currentLang === 'hi' ? [
      'श्री गौरीशंकर बैकुंठनाथ धाम, बैकतपुर में आज ऐतिहासिक जीर्णोद्धार एवं लाल बलुआ पत्थर के नक्काशीदार मंडपों का भव्य लोकार्पण वैदिक मंत्रोच्चार के बीच संपन्न हुआ। इस पावन अवसर पर राज्य के गणमान्य अतिथियों, प्रख्यात पुरातात्विक विशेषज्ञों तथा बड़ी संख्या में साधु-संतों की गरिमामयी उपस्थिति रही।',
      'मंदिर न्यास समिति के अनुसार, सदियों पुराने इस पावन तीर्थ परिसर को नागर शैली की वैदिक स्थापत्य कला के अनुरूप नया भव्य रूप प्रदान किया गया है। मुख्य मंदिर के चारों ओर राजस्थान के कारीगरों द्वारा गढ़े गए नक्काशीदार खंभे, प्रदक्षिणा पथ और गंगा घाट की सीढ़ियों को विशेष रूप से सुसज्जित किया गया है।',
      'गंगा नदी के पावन तट पर स्थित इस प्राचीन धाम में प्रतिदिन हजारों श्रद्धालु भगवान शिव (गौरीशंकर) और भगवान विष्णु (बैकुंठनाथ) के दुर्लभ संयुक्त स्वरूप के दर्शन हेतु पहुंचते हैं। नवनिर्मित गंगा घाट पर भव्य संध्या महाआरती की स्थायी व्यवस्था भी प्रारंभ की गई है, जिससे तीर्थयात्रियों को अद्वितीय आध्यात्मिक अनुभव प्राप्त होगा।'
    ] : [
      'In a grand ceremonial gathering marked by ancient Vedic chants, the extensive renovation and intricately carved red sandstone mandaps of Shri Gaurishankar Baikunthnath Dham in Baikathpur were officially unveiled today. Dignitaries, heritage conservationists, and thousands of devotees witnessed the sacred inauguration.',
      'According to the Temple Trust, the multi-phase restoration was undertaken strictly following traditional Nagara-style architectural principles. Renowned master artisans from Rajasthan spent over eighteen months carving sacred motifs of Lord Vishnu, Lord Shiva, and sacred lotus blossoms onto stone pillars and parikrama hallways.',
      'Situated on the holy banks of Mother Ganga, Baikathpur Dham holds monumental spiritual significance for housing the rare Hari-Hara composite sanctum. With the newly paved Ganga Ghat promenade and upgraded pilgrim amenities, the shrine is poised to welcome over 200,000 pilgrims during the upcoming holy festivals.'
    ],
    quote: currentLang === 'hi'
      ? '“बैकुंठनाथ धाम का यह जीर्णोद्धार हमारी समृद्ध सनातन विरासत और गंगा-तीर्थ संस्कृति के संरक्षण का एक युगांतरकारी संकल्प है।”'
      : '"This grand restoration at Baikunthnath Dham is a sacred pledge to preserve our timeless Sanatan heritage and the sanctity of holy Ganga pilgrimage shrines."',
    quoteAuthor: currentLang === 'hi' ? '— श्री गौरीशंकर बैकुंठनाथ धाम न्यास समिति' : '— Shri Gaurishankar Baikunthnath Dham Nyas Samiti',
    highlights: currentLang === 'hi' ? [
      '500+ साल प्राचीन मंदिर परिसर का पारंपरिक नागर शैली में जीर्णोद्धार',
      'गंगा तट पर विशेष नक्काशीदार पाषाण घाट व विशाल प्रदक्षिणा पथ',
      'तीर्थयात्रियों के लिए अत्याधुनिक विश्राम सदन एवं निःशुल्क अन्नक्षेत्र'
    ] : [
      'Authentic restoration of 500+ year-old temple complex in Nagara style',
      'Newly paved sandstone Ganga Ghat promenade for evening Maha Aarti',
      'Advanced pilgrim facilitation center, Vedic library, and free Annakshetra'
    ],
    tags: currentLang === 'hi'
      ? ['जीर्णोद्धार', 'नागर शैली', 'गंगा घाट', 'वैदिक धरोहर', 'दैनिक जागरण']
      : ['Renovation', 'Nagara Style', 'Ganga Ghat', 'Vedic Heritage', 'Dainik Jagran']
  },
  {
    id: 2,
    slug: 'live-broadcast-shravani-somvar-deepotsav',
    category: 'tv',
    image: mediaImg2,
    source: t('mediaPage.articles.1.source', 'DD Bihar Live'),
    date: t('mediaPage.articles.1.date', '02 August 2026'),
    author: currentLang === 'hi' ? 'दूरदर्शन न्यूज़ टीम' : 'Doordarshan Special Broadcast Unit',
    location: currentLang === 'hi' ? 'गंगा घाट, बैकतपुर' : 'Ganga Deck, Baikathpur',
    readTime: currentLang === 'hi' ? '3 मिनट पठन' : '3 min read',
    title: t('mediaPage.articles.1.title', 'Live Broadcast of Shravani Somvar Deepotsav at Baikathpur Ganga Deck'),
    description: t('mediaPage.articles.1.description', 'Over 50,000 devotees participated in the sacred evening Ganga Aarti broadcast live on national television from Baikathpur.'),
    paragraphs: currentLang === 'hi' ? [
      'पवित्र श्रावण मास के पावन सोमवार के अवसर पर श्री गौरीशंकर बैकुंठनाथ धाम के गंगा तट से भव्य दीपोत्सव एवं महाआरती का सीधा प्रसारण राष्ट्रीय टेलीविजन पर प्रसारित किया गया। 51,000 से अधिक मिट्टी के दीपों की अलौकिक ज्योति से समूचा गंगा तट जगमगा उठा।',
      'शाम 06:30 बजे मुख्य पुजारियों और वैदिक आचार्यों द्वारा शंखनाद और डमरू वादन के साथ 108 दीपों की महाआरती प्रारंभ हुई। मां गंगा की बहती जलधारा में श्रद्धालुओं द्वारा प्रवाहित किए गए दीपों ने ऐसा मनोरम दृश्य प्रस्तुत किया जिसे देख दर्शक मंत्रमुग्ध हो गए।',
      'दूरदर्शन के विशेष प्रसारण दल ने ड्रोन कैमरों और हाई-डेफिनिशन कैमरों के माध्यम से गर्भगृह में स्थित स्वयंभू लिंग और गंगा घाट के संपूर्ण उत्सव को विश्व भर के लाखों दर्शकों तक सजीव रूप से पहुंचाया।'
    ] : [
      'On the auspicious occasion of Shravani Somvar, a breathtaking Deepotsav and Grand Ganga Aarti at Shri Gaurishankar Baikunthnath Dham was broadcast live on national television, captivating millions of viewers across the nation.',
      'Over 51,000 traditional earthen lamps (diyas) were lit simultaneously along the expansive stone promenade of Baikathpur Ganga Ghat. As twilight descended, the riverbank transformed into a glowing ocean of divine golden lights.',
      'The broadcast team deployed high-definition cameras and aerial drone feeds to capture the thunderous chanting of Har Har Mahadev and Vedic Stutis led by head priests, marking one of the largest spiritual broadcasts in the region.'
    ],
    quote: currentLang === 'hi'
      ? '“श्रावण मास में बैकुंठनाथ धाम का गंगा दीपोत्सव भक्ति, दिव्यता और आत्मिक शांति का अद्वितीय संगम है।”'
      : '"The Shravani Deepotsav at Baikunthnath Ganga Ghat is an unparalleled confluence of supreme devotion, Vedic resonance, and divine peace."',
    quoteAuthor: currentLang === 'hi' ? '— मुख्य पुजारी, बैकुंठनाथ धाम' : '— Chief Acharya, Baikunthnath Dham',
    highlights: currentLang === 'hi' ? [
      '51,000 दीपों से गंगा तट का मनोहारी शृंगार',
      '108 दीपों से भव्य महाआरती एवं वैदिक स्तोत्र पाठ',
      'लाखों श्रद्धालुओं ने राष्ट्रीय टीवी पर देखा सीधा प्रसारण'
    ] : [
      '51,000 sacred earthen lamps illuminated along the holy riverbanks',
      '108-lamp Maha Aarti accompanied by traditional conch shells and Vedic hymns',
      'National live telecast reaching over 5 million households worldwide'
    ],
    tags: currentLang === 'hi'
      ? ['श्रावण दीपोत्सव', 'गंगा आरती', 'सीधा प्रसारण', 'दूरदर्शन']
      : ['Shravan Deepotsav', 'Ganga Aarti', 'Live Broadcast', 'DD National']
  },
  {
    id: 3,
    slug: 'historical-16th-century-heritage-raja-man-singh',
    category: 'print',
    image: mediaImg3,
    source: t('mediaPage.articles.2.source', 'Hindustan Samachar'),
    date: t('mediaPage.articles.2.date', '20 July 2026'),
    author: currentLang === 'hi' ? 'इतिहास व पुरातत्व डेस्क' : 'History & Heritage Desk',
    location: currentLang === 'hi' ? 'पटना, बिहार' : 'Patna, Bihar',
    readTime: currentLang === 'hi' ? '5 मिनट पठन' : '5 min read',
    title: t('mediaPage.articles.2.title', 'Historical 16th-Century Heritage of Raja Man Singh Revived'),
    description: t('mediaPage.articles.2.description', 'Historical researchers publish special feature on the ancient Hari-Hara composite deity consecrated during 16th-century royal expedition in Patna district.'),
    paragraphs: currentLang === 'hi' ? [
      'इतिहासकारों एवं शोधकर्ताओं ने एक विशेष शोध आलेख में बैकतपुर (खुसरूपुर) स्थित श्री गौरीशंकर बैकुंठनाथ धाम के 16वीं शताब्दी के ऐतिहासिक संदर्भों पर प्रकाश डाला है। आमेर के प्रतापी राजा मानसिंह के पूर्वी अभियान के दौरान इस धाम के जीर्णोद्धार और प्रतिष्ठा की गौरवशाली गाथा का उल्लेख किया गया है।',
      'अभिलेखों के अनुसार, मुगल काल में राजा मानसिंह जब पूर्वी भारत के सूबेदार नियुक्त हुए थे, तब उन्होंने गंगा तट पर स्थित इस प्राचीन शिव-विष्णु धाम में विशेष पूजा-अर्चना की थी तथा मंदिर के गर्भगृह के संवर्धन हेतु योगदान दिया था।',
      'धाम की सबसे बड़ी विशेषता इसका दुर्लभ ‘हरि-हर’ लिंग विग्रह है, जिसमें आधे भाग में भगवान विष्णु (शंख, चक्र, गदा, पद्म स्वरूप) और आधे भाग में भगवान शिव (त्रिशूल, डमरू, नाग स्वरूप) की एक साथ नित्य अर्चना की जाती है। यह संपूर्ण भारत में अत्यंत दुर्लभ समन्वय का प्रतीक है।'
    ] : [
      'In a comprehensive archaeological research paper, historians have chronicled the illustrious 16th-century royal legacy associated with Shri Gaurishankar Baikunthnath Dham in Baikathpur, Patna.',
      'Historical archives record that Raja Man Singh of Amber, during his tenure in eastern India, visited the sacred riverside pilgrimage site to offer prayers and patronized the reconstruction of the ancient sanctum.',
      'The centerpiece of the temple remains its extraordinary Hari-Hara composite deity—uniting Lord Vishnu and Lord Shiva in a single sacred form. This rare theological synthesis exemplifies ancient India’s philosophical harmony and attracts historians and spiritual seekers alike.'
    ],
    quote: currentLang === 'hi'
      ? '“बैकतपुर धाम का हरि-हर स्वरूप केवल धार्मिक आस्था नहीं, अपितु भारतीय दर्शन के अद्वैत समन्वय का सजीव प्रमाण है।”'
      : '"The Hari-Hara form at Baikathpur is not merely a religious shrine, but living testament to the sublime unity and harmony of Indian Vedic philosophy."',
    quoteAuthor: currentLang === 'hi' ? '— बिहार पुरातत्व शोध परिषद' : '— Bihar Archaeological Heritage Society',
    highlights: currentLang === 'hi' ? [
      '16वीं शताब्दी के शाही इतिहास एवं अभिलेखों का प्रमाणिक अध्ययन',
      'शिव और विष्णु के दुर्लभ एकीकृत ‘हरि-हर’ स्वरूप का विस्तृत विवरण',
      'पुरातत्वविदों द्वारा ऐतिहासिक धरोहर के संरक्षण की विशेष अनुशंसा'
    ] : [
      'Documented evidence of 16th-century royal patronage and renovations',
      'Detailed study of the composite Hari-Hara deity unifying Shaiva and Vaishnava traditions',
      'Special conservation recommendations submitted to archaeological authorities'
    ],
    tags: currentLang === 'hi'
      ? ['इतिहास', 'राजा मानसिंह', 'हरि-हर स्वरूप', 'पुरातत्व', 'हिन्दुस्तान']
      : ['History', 'Raja Man Singh', 'Hari-Hara Deity', 'Archaeology', 'Hindustan']
  },
  {
    id: 4,
    slug: '24x7-live-sanctum-streaming-launched',
    category: 'digital',
    image: mediaImg4,
    source: t('mediaPage.articles.3.source', 'Prabhat Khabar Digital'),
    date: t('mediaPage.articles.3.date', '10 June 2026'),
    author: currentLang === 'hi' ? 'डिजिटल टेक्नोलॉजी रिपोर्टर' : 'Digital Tech & Media Correspondent',
    location: currentLang === 'hi' ? 'बैकतपुर डिजिटल सेल' : 'Baikathpur Digital Center',
    readTime: currentLang === 'hi' ? '3 मिनट पठन' : '3 min read',
    title: t('mediaPage.articles.3.title', '24x7 Live Sanctum Streaming Launched for Global Pilgrims'),
    description: t('mediaPage.articles.3.description', 'Shri Baikunthnath Mandir Trust launches high-definition live streaming portal for NRI devotees across 40 countries.'),
    paragraphs: currentLang === 'hi' ? [
      'देश-विदेश में बसे लाखों श्रद्धालुओं को घर बैठे भगवान बैकुंठनाथ और गौरीशंकर के पावन दर्शन कराने के उद्देश्य से मंदिर ट्रस्ट ने 24x7 हाई-डेफिनिशन लाइव स्ट्रीमिंग सेवा का आधिकारिक शुभारंभ किया है।',
      'आधुनिक 4K अल्ट्रा-एचडी कैमरों और उच्च गति ब्रॉडबैंड तकनीक के माध्यम से गर्भगृह में होने वाली प्रातः 05:30 बजे की मंगला आरती से लेकर रात्रि 09:00 बजे की शयन आरती तक का सजीव प्रसारण वेबसाइट और मोबाइल ऐप पर उपलब्ध रहेगा।',
      'मंदिर ट्रस्ट के सचिव ने बताया कि अमेरिका, कनाडा, मॉरीशस, नेपाल और इंग्लैंड सहित 40 से अधिक देशों में रहने वाले अप्रवासी भारतीय अब न केवल दर्शन कर सकेंगे, अपितु ऑनलाइन संकल्प लेकर अपने नाम से विशेष पूजा-अर्चना एवं रुद्राभिषेक भी करा सकेंगे।'
    ] : [
      'To connect devotees worldwide with the sanctum of Shri Gaurishankar Baikunthnath Dham, the Temple Trust has officially launched a 24x7 high-definition live streaming portal and mobile platform.',
      'Equipped with state-of-the-art 4K cameras and ultra-low latency broadcasting infrastructure, the digital service streams all five daily Aartis—from the Mangala Aarti at 5:30 AM to the Shayan Aarti at 9:00 PM—directly to global viewers.',
      'Non-resident Indian (NRI) communities across the USA, UK, Canada, Mauritius, and over 40 countries can now not only participate in virtual darshan but also book personalized Vedic Poojas and Rudrabhishek in their family names.'
    ],
    quote: currentLang === 'hi'
      ? '“प्रौद्योगिकी के माध्यम से मां गंगा के पावन तट पर स्थित बैकुंठनाथ धाम के दिव्य दर्शन अब विश्व के कोने-कोने तक पहुंच रहे हैं।”'
      : '"Through modern technology, the divine grace of Lord Baikunthnath on the banks of Mother Ganga now reaches every corner of the world."',
    quoteAuthor: currentLang === 'hi' ? '— आईटी एवं डिजिटल सेल, मंदिर ट्रस्ट' : '— IT & Digital Communications Cell, Temple Trust',
    highlights: currentLang === 'hi' ? [
      'अल्ट्रा-एचडी 4K तकनीक द्वारा गर्भगृह का 24 घंटे सीधा प्रसारण',
      'पांचों प्रहर की दैनिक आरतियों एवं विशेष उत्सवों का सजीव दर्शन',
      '40+ देशों के श्रद्धालुओं हेतु ऑनलाइन पूजा व ई-संकल्प सुविधा'
    ] : [
      'Ultra-HD 4K streaming covering main sanctum 24 hours a day',
      'Live coverage of all 5 daily Nitya Aartis and seasonal festivals',
      'Direct online Pooja booking and e-Sankalp for global devotees across 40+ countries'
    ],
    tags: currentLang === 'hi'
      ? ['लाइव दर्शन', 'डिजिटल टेक्नोलॉजी', 'ऑनलाइन पूजा', 'प्रभात खबर']
      : ['Live Darshan', 'Digital Tech', 'Global Devotees', 'Prabhat Khabar']
  }
];
