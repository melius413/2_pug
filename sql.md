# SQL-CRUD
## Create
~~~sql
-- INSERT INTO 테이블명 (필드명1, 필드명2...) VALUES (값1, 값2...);
INSERT INTO board (title, writer, wdate) VALUES ('제목입니다.', '관리자', '2020-01-05 14:35:00');

-- INSERT INTO 테이블 SET 필드명1='값1', 필드명2='값2', 필드명3='값3';
INSERT INTO board SET title='제목입니다.', writer='관리자', wdate='2020-01-05 14:35:00';
~~~

## Read
~~~sql
-- SELECT * FROM board;
-- SELECT id, title FROM board ORDER BY id ASC;
-- SELECT * FROM board ORDER BY id DESC;
SELECT * FROM board ORDER BY id DESC;

-- SELECT 필드명1, 필드명2 FROM board ORDER BY id DESC;
SELECT id, title FROM board ORDER BY id DESC;

-- SELECT * FROM board WHERE id = 4;
-- SELECT * FROM board WHERE title LIKE '%노드%'; 와일드 카드
SELECT * FROM board WHERE id=4;
~~~

## Update
~~~sql
-- DELETE, UPDATE에서는 WHERE절을 꼭 구현하자. 없으면 모든 Data에 영향을 준다.
-- UPDATE 테이블명 SET 필드명='값', 필드명='값' WHERE 조건;
UPDATE board SET title='제목', content='내용' WHERE id=4;
~~~

## Delete
~~~sql
-- DELETE, UPDATE에서는 WHERE절을 꼭 구현하자. 없으면 모든 Data에 영향을 준다.
-- DELETE FROM board; 보드에 있는 모든 데이터 삭제(절대 이렇게 쓰면 안됨)
-- DELETE FROM board WHERE 조건;
DELETE FROM board WHERE id=4;
~~~
