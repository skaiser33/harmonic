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
      { name: "New York",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Chicago",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name: "Montreal",
      createdAt: new Date(),
      updatedAt: new Date()
      }
      ], { returning: true });

    console.log(bulkCities);


    //COLLABORATION SEED
    await queryInterface.bulkDelete('collaborations', null, {truncate: true, cascade: true, restartIdentity: true});    

    const bulkCollaborations = await queryInterface.bulkInsert('collaborations', [
      { type: "Shows",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Tours",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Recording Sessions",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { type: "Co-writes",
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
      { name: "Piano",
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
        cityId: 1,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/p0xHO7h.jpg",
        influences: ["The Smashing Pumpkins", "David Bowie", "Fiona Apple"],
        recordingCredits: ["Alibi - Children Having Children - 2018 - Vocals, Guitars, Songwriter", "Mice - Children Having Children - 2014 - Vocals, Guitar, Keyboards, Songwriter"],
        canRecordRemotely: true,
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
        cityId: 2,
        isBand: false,
        profilePhotoUrl: "https://i.imgur.com/0AOLXon.jpg",
        influences: ["Tony Williams", "John Bonham"],
        recordingCredits: ["Zeitgeist - Smashing Pumpkins - 2007 - Vocals, Guitars, SongwriterDrums", "Honor - Jimmy Chamberlin Complex - 2020 - Drums, Composer"],
        canRecordRemotely: true,
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
        cityId: 3,
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
      }
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

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}