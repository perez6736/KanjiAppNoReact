CREATE DATABASE kanjiSearch; 
USE kanjiSearch;

CREATE TABLE kanji(
    id INT AUTO_INCREMENT NOT NULL,
    kanji VARCHAR(10) NOT NULL CHARACTER SET utf8,
    grade VARCHAR(255),
    JLPTlevel INT
    english VARCHAR(255),
    kunReading VARCHAR(255) CHARACTER SET utf8,
    onReading VARCHAR(255) CHARACTER SET utf8,
    unicode VARCHAR(10)
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    username NOT NULL,
    userPassword NOT NULL,
    firstName,
    lastName,
    email NOT NULL

    PRIMARY KEY(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    kanjiID,
    userID

    PRIMARY KEY(id)
);