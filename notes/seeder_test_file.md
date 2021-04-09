

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
        { email: "",
        name: "",
        password: bcrypt.hashSync('harmonic!', 12),
        cityId: ,
        isBand: false,
        profilePhotoUrl: "",
        influences: ["", "", ""],
        recordingCredits: null,
        spotifyEmbedUrl: ,
        soundcloudEmbedUrl: null,
        youtubeEmbedUrl: null,
        localDraw: null,
        nationalDraw: null,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
        },