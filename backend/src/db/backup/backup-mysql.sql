-- !Deleting TABLES
DROP TABLE IF EXISTS property_amenities;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS room_photos;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;



-- *Creating TABLES
CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
	role ENUM('host', 'guest') NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	is_deleted BOOLEAN DEFAULT(false),
	deleted_at TIMESTAMP
);


CREATE TABLE rooms (
	id INT PRIMARY KEY AUTO_INCREMENT,
	host_id INT NOT NULL,
	title VARCHAR(150) NOT NULL,
	description TEXT,
	location VARCHAR(50) NOT NULL,
	price_per_night DECIMAL(6,2) NOT NULL,
	bathrooms INT NOT NULL,
	max_guests INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	is_deleted BOOLEAN DEFAULT(false),
	deleted_at TIMESTAMP,	
	
	FOREIGN KEY (host_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE room_photos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	room_id INT NOT NULL,
	photo_url VARCHAR(150) NOT NULL,
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW())
);

CREATE TABLE bookings (
	id INT PRIMARY KEY AUTO_INCREMENT,
	room_id INT NOT NULL,
	guest_id INT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	status ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled') NOT NULL DEFAULT('pending'),
	total_price DECIMAL(7,2) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	is_deleted BOOLEAN DEFAULT(false),
	deleted_at TIMESTAMP,	
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,
	FOREIGN KEY (guest_id) REFERENCES users(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);


CREATE TABLE reviews (
	id INT PRIMARY KEY AUTO_INCREMENT,
	room_id INT NOT NULL,
	guest_id INT NOT NULL,
	rating SMALLINT NOT NULL,
	comment TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (guest_id) REFERENCES users(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE payments (
	id INT PRIMARY KEY AUTO_INCREMENT,
	booking_id INT NOT NULL,
	amount DECIMAL(7,2) NOT NULL,
	payment_date TIMESTAMP NOT NULL,
	payment_status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT('pending'),
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	FOREIGN KEY (booking_id) REFERENCES bookings(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);

CREATE TABLE amenities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW())
);

CREATE TABLE property_amenities (
	id INT PRIMARY KEY AUTO_INCREMENT,
	room_id INT NOT NULL,
	amenity_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT(NOW()),
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (amenity_id) REFERENCES amenities(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

-- *Adding data to TABLES