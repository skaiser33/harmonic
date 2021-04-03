sequelize model:create --name nameofmodel --attributes firstAttribute:string,secondAttribute:integer,parentmodelId:integer, etc

Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
Sequelize.ARRAY(Sequelize.ENUM)       // Defines an array of ENUM. PostgreSQL only.

//PROFILE MODEL (createAt is automatically added; note that influences and recording credits are array but not sure about syntax...see above)

sequelize model:create --name profile --attributes userId:integer,cityId:integer,isBand:boolean,profilePhotoUrl:string,availableFor:string,influences:array,recordingCredits:array,canRecordRemotely:boolean,spotifyEmbedUrl:string,soundcloudEmbedUrl:string,youtubeEmbedUrl:string,localDraw:integer,nationalDraw:integer,lastActive:dateonly

//CITY MODEL
sequelize model:create --name city --attributes name:string

//INSTRUMENT MODEL
sequelize model:create --name instrument --attributes name:string

//GENRE MODEL
sequelize model:create --name genre --attributes name:string