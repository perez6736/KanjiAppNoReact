CREATE DATABASE kanjiSearch; 
USE kanjiSearch;

CREATE TABLE kanji(
    kanji_id INT AUTO_INCREMENT NOT NULL,
    kanji VARCHAR(10) NOT NULL CHARACTER SET utf8,
    grade VARCHAR(255),
    JLPTlevel INT
    english VARCHAR(255),
    kunReading VARCHAR(255) CHARACTER SET utf8,
    onReading VARCHAR(255) CHARACTER SET utf8,
    unicode VARCHAR(10)

    PK_kanji PRIMARY KEY ( kanji_id)
);

CREATE TABLE user(
    user_id INT AUTO_INCREMENT NOT NULL,
    username NOT NULL,
    userPassword NOT NULL,
    firstName,
    lastName,
    email NOT NULL


    PK_user PRIMARY KEY (user_id)
);

CREATE TABLE kanji_user(
    kanji_user_id INT AUTO_INCREMENT NOT NULL,
    kanji_id,
    user_id

    PK_kanji_user PRIMARY KEY (ikanji_user_idd)
);

-- Add the alter table to add the foreign key to kanji_user
ALTER TABLE kanji_user
ADD CONSTRAINT FK_kanji_user
FOREIGN KEY (kanji_id)
REFERENCES kanji (kanji_id)

ALTER TABLE kanji_user
ADD CONSTRAINT FK_user_kanji
FOREIGN KEY (user_id)
REFERENCES user (user_id)