
-- !Deleting TABLES

DROP TABLE IF EXISTS property_amenities;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS room_photos;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS users;

-- *Creating TYPE TABLES

-- CREATE TABLE role_type (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   role TEXT UNIQUE NOT NULL
-- );


CREATE TABLE users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	role TEXT NOT NULL CHECK(role in ('host', 'guest')),
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	is_deleted INTEGER DEFAULT(0),
	deleted_at TEXT
);


CREATE TABLE rooms (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	host_id INTEGER NOT NULL,
	title TEXT NOT NULL,
	description TEXT,
	location TEXT NOT NULL,
	price_per_night NUMERIC NOT NULL,
	bathrooms INTEGER NOT NULL,
	max_guests INTEGER NOT NULL,
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	is_deleted INTEGER DEFAULT 0,
	deleted_at TEXT,
	
	FOREIGN KEY (host_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE room_photos (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	room_id INTEGER NOT NULL,
	photo_url TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE bookings (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	room_id INTEGER NOT NULL,
	guest_id INTEGER NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	status TEXT NOT NULL CHECK(status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')) DEFAULT 'pending',
	total_price NUMERIC NOT NULL,
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	is_deleted INTEGER DEFAULT 0,
	deleted_at TEXT,
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE,
	FOREIGN KEY (guest_id) REFERENCES users(id)
		ON DELETE RESTRICT
		ON UPDATE CASCADE
);


CREATE TABLE reviews (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	room_id INTEGER NOT NULL,
	guest_id INTEGER NOT NULL,
	rating INTEGER NOT NULL,
	comment TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (guest_id) REFERENCES users(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

CREATE TABLE payments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	booking_id INTEGER NOT NULL,
	amount NUMERIC NOT NULL,
	payment_date TEXT NOT NULL,
	payment_status payment_status_type NOT NULL DEFAULT('pending'),
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	
	FOREIGN KEY (booking_id) REFERENCES bookings(id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

CREATE TABLE amenities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp
);

CREATE TABLE property_amenities (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	room_id INTEGER NOT NULL,
	amenity_id INTEGER NOT NULL,
	created_at TEXT NOT NULL DEFAULT current_timestamp,
	updated_at TEXT NOT NULL DEFAULT current_timestamp,
	
	FOREIGN KEY (room_id) REFERENCES rooms(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (amenity_id) REFERENCES amenities(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

-- *Adding data to TABLES