CREATE DATABASE kanjiSearch; 
USE kanjiSearch;

CREATE TABLE kanji(
    kanji_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    kanji VARCHAR(10) CHARACTER SET utf8 NOT NULL,
    grade VARCHAR(255),
    JLPTlevel INT,
    english VARCHAR(255),
    kunReading VARCHAR(255) CHARACTER SET utf8,
    onReading VARCHAR(255) CHARACTER SET utf8,
    unicodeValue VARCHAR(10)
);

CREATE TABLE users(
    user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL
);

CREATE TABLE kanji_users(
    kanji_user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    kanji_id INT,
    user_id INT
);

-- Add the alter table to add the foreign key to kanji_user
ALTER TABLE kanji_users
ADD CONSTRAINT kanji_id
FOREIGN KEY (kanji_id)
REFERENCES kanji (kanji_id);

ALTER TABLE kanji_users
ADD CONSTRAINT user_id
FOREIGN KEY (user_id)
REFERENCES users (user_id);