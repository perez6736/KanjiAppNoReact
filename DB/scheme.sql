CREATE DATABASE kanjiSearch; 
USE kanjiSearch;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
INSERT INTO `users` (`user_id`, `username`, `userPassword`, `email`) VALUES (1, 'test1', 'testpw', 'test1@test.com');
INSERT INTO `users` (`user_id`, `username`, `userPassword`, `email`) VALUES (1, 'test2', 'testpw', 'test2@test.com');
INSERT INTO `users` (`user_id`, `username`, `userPassword`, `email`) VALUES (1, 'test3', 'testpw', 'test3@test.com');

CREATE TABLE kanji_users(
    kanji_user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    kanji VARCHAR(10) CHARACTER SET utf8 NOT NULL,
    user_id INT NOT NULL,
    csv_upload_flag INT DEFAULT 0
);

-- Add the alter table to add the foreign key to kanji_user
ALTER TABLE kanji_users
ADD CONSTRAINT user_id
FOREIGN KEY (user_id)
REFERENCES users (user_id);