'use strict'
const db = require('../models');
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await db.sequelize.sync({force: true});
    console.log('All models synced');

    
    //CITY SEED
    await queryInterface.bulkDelete('cities', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkCities = await queryInterface.bulkInsert('cities', [
      { name: "Atlanta",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Boston",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Chicago",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Denver",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Los Angeles",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Miami",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Montreal",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "New Orleans",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "New York",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Portland",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "San Francisco",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Seattle",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Toronto",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Washington D.C.",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkCities);


    //COLLABORATION SEED
    await queryInterface.bulkDelete('collaborations', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkCollaborations = await queryInterface.bulkInsert('collaborations', [
      { type: "One-Off Shows",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Touring",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Studio Recording",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Remote Recording",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Co-Writes",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Extended Collaborations",
      createdAt: new Date(),
      updatedAt: new Date()
      }
      ], { returning: true });

    console.log(bulkCollaborations);


    //INSTRUMENT SEED
    await queryInterface.bulkDelete('instruments', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkInstruments = await queryInterface.bulkInsert('instruments', [
      { name: "Bass (Electric)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Bass (Upright)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Cello",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Drums",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Flute",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Guitar (Acoustic)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Guitar (Electric)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Keyboards",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Percussion",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Piano",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Sax",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Trumpet",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Violin",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Voice (Singing)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Voice (Rapping/Spoken)",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkInstruments);

    //GENRE SEED
    await queryInterface.bulkDelete('genres', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkGenres = await queryInterface.bulkInsert('genres', [
      { name: "Alternative",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Blues",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Country",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Experimental",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Folk",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Funk",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Hip-Hop",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Jazz",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Latin",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Pop",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Post-Rock",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "R&B",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Rock",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Soul",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkGenres);

      //USER SEED
      await queryInterface.bulkDelete('users', null, {truncate: true, cascade: true, restartIdentity: true});    

      const bulkUsers = await queryInterface.bulkInsert('users', [
        { email: "sk@test.com",
        name: "Steven Kaiser",
        password: bcrypt.hashSync('harmonic!', 12),        
        cityId: 9,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/p0xHO7h.jpg",
        influences: ["The Smashing Pumpkins", "David Bowie", "Fiona Apple"],
        recordingCredits: ["Alibi - Children Having Children - 2018 - Vocals, Guitars, Songwriter", "Mice - Children Having Children - 2014 - Vocals, Guitar, Keyboards, Songwriter"],
        spotifyEmbedUrl: "https://open.spotify.com/embed/track/46Dh8ZM4LxlOyzKypMx9kv",
        soundcloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/400318689&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
        youtubeEmbedUrl: "https://www.youtube.com/embed/pKTOh2DZMOI",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "jc@test.com",
        name: "Jimmy Chamberlin",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 3,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/0AOLXon.jpg",
        influences: ["Tony Williams", "John Bonham"],
        recordingCredits: ["Zeitgeist - Smashing Pumpkins - 2007 - Vocals, Guitars, SongwriterDrums", "Honor - Jimmy Chamberlin Complex - 2020 - Drums, Composer"],
        spotifyEmbedUrl: "https://open.spotify.com/embed/track/27Hf6yJq9gQvx6b8m25Ddi",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://www.youtube.com/embed/Qx6Uv1BYdvw",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "gsybe@test.com",
        name: "Godspeed You! Black Emperor",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 7,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/Phuql7L.jpg",
        influences: ["Anarchy", "Slint", "King Crimson"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/embed/track/6SPWDOKDQXZ1Nkl0cbsFqg",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://www.youtube.com/watch?v=_FCwgH-pp7g",
        localDraw: 5000,
        nationalDraw: 2500,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "nin@test.com",
        name: "Nine Inch Nails",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 8,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/Phuql7L.jpg",
        influences: ["Ministry", "The Cure", "Pain"],
        recordingCredits: null,
        spotifyEmbedUrl: null,
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: null,
        localDraw: 20000,
        nationalDraw: 20000,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "st@test.com",
        name: "Shania Twain",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 8,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/FT3hhSk.jpg",
        influences: ["Smashing Pumpkins", "Judy Garland", "Children Having Children", "Garth Brooks"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/6sxptembJVty4sNtcPMAVz?si=2voxBELwQVyRH0xuWr-6mQ",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: null,
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "lm@test.com",
        name: "Laura Marling",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 2,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/poDBTIx.jpg",
        influences: ["Joni Mitchell", "Bob Dylan","Children Having Children", "Smashing Pumpkins"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/7KMd4njKt3hOh2T2IC0Zzn?si=Vr3ZkWf_TTuCF79aX2yjMA",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/7RzBrwRLX2E",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "jm@test.com",
        name: "Joni Mitchell",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 9,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/oMQD2u1.jpg",
        influences: ["Bob Dylan", "John Coltrain", "Thelonious Monk", "Peggy Seeger", "Children Having Children", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/7shVwhUdVbHpykOfbzvDc1?si=T6Iziuj7Qs6Umr2VVbcTzw",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/GFB-d-8_bvY",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "ag@test.com",
        name: "Ariana Grande",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 9,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/EU1OF9X.jpg",
        influences: ["Whitney Houston", "Imogen Heap", "Judy Garland", "India Arie"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/3e9HZxeyfWwjeyPAMmWSSQ?si=5UhX7hL7SSuMkyF30Tku8g",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/QYh6mYIJG2Y",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "jlc@test.com",
        name: "Jump, Little Children",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 6,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/oqGKYPx.jpg",
        influences: ["Bob Dylan", "Elvis Presley", "Ben Folds", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/2wd52lU3agY0P3x2hxPYhm?si=fxp1qaHKSz6WyeiwdPstIQ",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/w3Y3S1Btj8w",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "se@test.com",
        name: "Sylvan Esso",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 7,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/ZZcOwYS.jpg",
        influences: ["The Beatles", "", ""],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/71cUqXJ3h1r0Ees6YdENLU?si=xtztAynKQumeAywBXCbFBA",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/1ZJ9ynWJY78",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "ldr@test.com",
        name: "Lana Del Rey",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 9,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/dqEByMS.jpg",
        influences: ["Julee Cruise", "The Beatles", "Elvis Presley", "David Bowie", "The Eagles", "Bob Dylan", "Amy Winehouse", "Bruce Springsteen", ""],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/6OG05bPAwUuV3OMvy2Vy1P?si=caqCz5VWQ9e0lqdT1MLACw",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/yJuV8PDwvC8",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "pm@test.com",
        name: "Paul McCartney",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 9,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/8Pk2qR5.jpg",
        influences: ["The Beatles", "Elvis Presley", "Ariana Grande", "The Smashing Pumpkins"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/7DsaOo87BUgyNwMxD6nhC9?si=exskKfjaRJyulllbZWjtXA",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/g5nzLQ63c9E",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "sh@test.com",
        name: "Spacehog",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 1,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/iBnUQZs.jpg",
        influences: ["David Bowie", "Prince", "Madonna", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/5DI3iTCAx9iG8vZAOXlDHi?si=HRXl_w_tRb2_XMU-QNl20Q",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/_5IyLeWJQvw",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "rh@test.com",
        name: "Radiohead",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 4,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/RXNGWeX.jpg",
        influences: ["The Beatles", "Nirvana", "Joni Mitchell"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/63OQupATfueTdZMWTxW03A?si=2G6aTjuHS0OsHrw90T5X9Q",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/u5CVsCnxyXg",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "ss@test.com",
        name: "The Spring Standards",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 5,
        isBand: true,
        profilePhotoUrl: "https://i.imgur.com/xYXzDre.jpg",
        influences: ["Bob Dylan", "Judy Garland", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/0dOE2CIU63htfvEnfCLXL3?si=i402RVWgT9-8FUUfW7CcRQ",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/T-qoj0t_O74",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "hr@test.com",
        name: "Heather Robb",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 5,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/bXG2v3R.jpg",
        influences: ["The Spring Standards", "Joni Mitchell", "Bob Dylan", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/3vjWuYwoq7Xk7DqrRxoYW1?si=Stlw2cy5QlijnRO6xlRxBA",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/nD-k56LC0h4",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "mg@test.com",
        name: "Mark Guiliana",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 6,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/KbD4AAh.jpg",
        influences: ["Miles Davis", "Duke Ellington", "Jimmy Chamberlin"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/4b1Tu6E43TwYbkD3CWXGXX?si=DsAyX_eESCaHBYOytkbk4A",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/PcGwbTTM5rE",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "fl@test.com",
        name: "Flea",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 6,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/KkAqvlt.jpg",
        influences: ["Red Hot Chili Peppers", "Rolling Stones", "Nirvana", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/4kz5f9UdcmpRRJmSv64gXD?si=BxU4cUs_TkG6ujdX2VjGGg",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/FUFUAnHjVAQ",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "bc@test.com",
        name: "Bill Clinton",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 3,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/8ob3BDw.jpg",
        influences: ["The Smashing Pumpkins", "Elvis Presley", "Hall and Oats"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/5CXnrKdxHSpXTl4fv9kVel?si=wYhcDnOFRCm5CTQJR70WeA",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/a_WuGDYawFQ",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "ym@test.com",
        name: "Yo-Yo Ma",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 2,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/SSUvm8b.jpg",
        influences: ["Bach", "Mozart", "Rolling Stones", "Madonna", "Carol King"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/0jOnZhF75V68VsBObWx2XO?si=qQSUDhuHS6SdXyQz9Cx5_A",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/1prweT95Mo0",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "sd@test.com",
        name: "Snoop Dogg",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 5,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/zdCGFxj.jpg",
        influences: ["Carol King", "Smashing Pumpkins", "Spice Girls", "The Beatles"],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/6YbhspuOar1D9WSSnfe7ds?si=YmjPr7kFQfSvSQ3rS5Pi7Q",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/fWCZse1iwE0",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "rb@test.com",
        name: "Ron Burgundy",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 6,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/JSVPc7B.jpg",
        influences: ["Mozart", "Bach", "Bill Clinton", "Spice Girls"],
        recordingCredits: null,
        spotifyEmbedUrl: null,
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/_c_ufaxeSTs",
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        { email: "bg@test.com",
        name: "Bryan Garbe",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: 1,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/BF0Ismy.jpg",
        influences: ["Oak & Ash", "Mark guiliana", ""],
        recordingCredits: null,
        spotifyEmbedUrl: "https://open.spotify.com/track/0gMGEhCcWWo7KzfyLUlCUD?si=mNW5_CLKQhazIe04MIvslw",
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: "https://youtu.be/IqxsV2VYPJ", 
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },
        ], { returning: true });
  
      console.log(bulkUsers);
 

    //usersCollaborations SEED
    await queryInterface.bulkDelete('usersCollaborations', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkUsersCollaborations = await queryInterface.bulkInsert('usersCollaborations', [
      { userId: 1,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 1,
        collaborationId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        collaborationId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        collaborationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        collaborationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 4,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 5,
        collaborationId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 6,
        collaborationId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 7,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 8,
        collaborationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 9,
        collaborationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 10,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 11,
        collaborationId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 12,
        collaborationId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 13,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 14,
        collaborationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 15,
        collaborationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 16,
        collaborationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 17,
        collaborationId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 18,
        collaborationId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 19,
        collaborationId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 20,
        collaborationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 21,
        collaborationId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 21,
        collaborationId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkUsersCollaborations);


    //usersInstruments SEED
    await queryInterface.bulkDelete('usersInstruments', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkUsersInstruments = await queryInterface.bulkInsert('usersInstruments', [
      { userId: 1,
        instrumentId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 1,
        instrumentId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        instrumentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        instrumentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        instrumentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        instrumentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        instrumentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        instrumentId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      { userId: 3,
        instrumentId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 4,
        instrumentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 5,
        instrumentId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 6,
        instrumentId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 7,
        instrumentId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 8,
        instrumentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 9,
        instrumentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 10,
        instrumentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 11,
        instrumentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 12,
        instrumentId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 13,
        instrumentId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 14,
        instrumentId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 15,
        instrumentId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 16,
        instrumentId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 17,
        instrumentId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 18,
        instrumentId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 19,
        instrumentId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 20,
        instrumentId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 21,
        instrumentId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 22,
        instrumentId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      ], { returning: true });

    console.log(bulkUsersInstruments);

    //usersGenres SEED
    await queryInterface.bulkDelete('usersGenres', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkUsersGenres = await queryInterface.bulkInsert('usersGenres', [
      { userId: 1,
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 1,
        genreId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        genreId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 2,
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      { userId: 3,
        genreId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { userId: 3,
        genreId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkUsersGenres);

    //favorites SEED
    await queryInterface.bulkDelete('favorites', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkFavorites = await queryInterface.bulkInsert('favorites', [
      { favoriterId: 1,
        favoritedId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { favoriterId: 1,
        favoritedId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { favoriterId: 1,
        favoritedId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], { returning: true });

    console.log(bulkFavorites);


    //message SEED
    await queryInterface.bulkDelete('messages', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkMessages = await queryInterface.bulkInsert('messages', [
      { senderId: 2,
        recipientId: 1,
        content: "Hey Steven. I've been itching to record drums on one of your projects and I have some free time this summer. Let me know if you want to get something on the books. Take care. -Jimmy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { senderId: 3,
        recipientId: 1,
        content: "Bonjour Steven. We were thinking of fleshing out our lineup by adding a 5th guitarist for our upcoming shows. Would you be interested? We can pay you in poutine. Au re voir -- GS!YBE",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      ], { returning: true });

    console.log(bulkMessages);


    //SEARCH SEED
    await queryInterface.bulkDelete('searches', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkSearches = await queryInterface.bulkInsert('searches', [
      { name: "Chicago Country Drummer",
      content: "isBand=false&city=3&instrumentCheck=Drums&collaborationCheck=One-Off+Shows&collaborationCheck=Remote+Recording&genreCheck=Country&genreCheck=Experimental&genres=&influences=",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "NY Sax for Jazz Tour",
      content: "isBand=false&city=9&instrumentCheck=Sax&collaborationCheck=Extended+Collaborations&genreCheck=Country&genreCheck=Experimental&genreCheck=Jazz&genres=&influences=",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      
      ], { returning: true });

    console.log(bulkSearches);

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
