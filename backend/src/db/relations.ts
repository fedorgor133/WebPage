import { relations } from "drizzle-orm/relations";
import { users, rooms, roomPhotos, bookings, reviews, payments, amenities, propertyAmenities } from "./schema";

export const roomsRelations = relations(rooms, ({one, many}) => ({
	user: one(users, {
		fields: [rooms.hostId],
		references: [users.id]
	}),
	roomPhotos: many(roomPhotos),
	bookings: many(bookings),
	reviews: many(reviews),
	propertyAmenities: many(propertyAmenities),
}));

export const usersRelations = relations(users, ({many}) => ({
	rooms: many(rooms),
	bookings: many(bookings),
	reviews: many(reviews),
}));

export const roomPhotosRelations = relations(roomPhotos, ({one}) => ({
	room: one(rooms, {
		fields: [roomPhotos.roomId],
		references: [rooms.id]
	}),
}));

export const bookingsRelations = relations(bookings, ({one, many}) => ({
	user: one(users, {
		fields: [bookings.guestId],
		references: [users.id]
	}),
	room: one(rooms, {
		fields: [bookings.roomId],
		references: [rooms.id]
	}),
	payments: many(payments),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	user: one(users, {
		fields: [reviews.guestId],
		references: [users.id]
	}),
	room: one(rooms, {
		fields: [reviews.roomId],
		references: [rooms.id]
	}),
}));

export const paymentsRelations = relations(payments, ({one}) => ({
	booking: one(bookings, {
		fields: [payments.bookingId],
		references: [bookings.id]
	}),
}));

export const propertyAmenitiesRelations = relations(propertyAmenities, ({one}) => ({
	amenity: one(amenities, {
		fields: [propertyAmenities.amenityId],
		references: [amenities.id]
	}),
	room: one(rooms, {
		fields: [propertyAmenities.roomId],
		references: [rooms.id]
	}),
}));

export const amenitiesRelations = relations(amenities, ({many}) => ({
	propertyAmenities: many(propertyAmenities),
}));