import {
  pgTable,
  unique,
  serial,
  varchar,
  timestamp,
  boolean,
  foreignKey,
  integer,
  text,
  numeric,
  date,
  smallint,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const paymentStatusType = pgEnum('payment_status_type', [
  'pending',
  'completed',
  'failed',
]);
export const roleType = pgEnum('role_type', ['host', 'guest', 'admin']);
export const statusType = pgEnum('status_type', [
  'pending',
  'accepted',
  'rejected',
  'completed',
  'canceled',
]);

export const users = pgTable(
  'users',
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 100 }).notNull(),
    password: varchar({ length: 150 }).notNull(),
    role: roleType().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    isDeleted: boolean('is_deleted').default(false),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    validationCode: varchar('validation_code', { length: 50 }),
    isValidated: boolean('is_validated').default(false),
  },
  (table) => {
    return {
      usersEmailKey: unique('users_email_key').on(table.email),
    };
  }
);

export const rooms = pgTable(
  'rooms',
  {
    id: serial().primaryKey().notNull(),
    hostId: integer('host_id').notNull(),
    title: varchar({ length: 150 }).notNull(),
    description: text(),
    location: varchar({ length: 50 }).notNull(),
    pricePerNight: numeric('price_per_night', {
      precision: 6,
      scale: 2,
    }).notNull(),
    bathrooms: integer().notNull(),
    maxGuests: integer('max_guests').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    isDeleted: boolean('is_deleted').default(false),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
  },
  (table) => {
    return {
      roomsHostIdFkey: foreignKey({
        columns: [table.hostId],
        foreignColumns: [users.id],
        name: 'rooms_host_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  }
);

export const roomPhotos = pgTable(
  'room_photos',
  {
    id: serial().primaryKey().notNull(),
    roomId: integer('room_id').notNull(),
    photoUrl: varchar('photo_url', { length: 150 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      roomPhotosRoomIdFkey: foreignKey({
        columns: [table.roomId],
        foreignColumns: [rooms.id],
        name: 'room_photos_room_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  }
);

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  user: one(users, {
    fields: [rooms.hostId],
    references: [users.id],
  }),
  roomPhotos: many(roomPhotos),
  bookings: many(bookings),
  reviews: many(reviews),
  propertyAmenities: many(propertyAmenities),
}));

export const roomPhotosRelations = relations(roomPhotos, ({ one }) => ({
  room: one(rooms, {
    fields: [roomPhotos.roomId],
    references: [rooms.id],
  }),
}));

export const bookings = pgTable(
  'bookings',
  {
    id: serial().primaryKey().notNull(),
    roomId: integer('room_id').notNull(),
    guestId: integer('guest_id').notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    status: statusType().default('pending').notNull(),
    totalPrice: numeric('total_price', { precision: 7, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    isDeleted: boolean('is_deleted').default(false),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
  },
  (table) => {
    return {
      bookingsGuestIdFkey: foreignKey({
        columns: [table.guestId],
        foreignColumns: [users.id],
        name: 'bookings_guest_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('restrict'),
      bookingsRoomIdFkey: foreignKey({
        columns: [table.roomId],
        foreignColumns: [rooms.id],
        name: 'bookings_room_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('restrict'),
    };
  }
);

export const reviews = pgTable(
  'reviews',
  {
    id: serial().primaryKey().notNull(),
    roomId: integer('room_id').notNull(),
    guestId: integer('guest_id').notNull(),
    rating: smallint().notNull(),
    comment: text().notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      reviewsGuestIdFkey: foreignKey({
        columns: [table.guestId],
        foreignColumns: [users.id],
        name: 'reviews_guest_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('set null'),
      reviewsRoomIdFkey: foreignKey({
        columns: [table.roomId],
        foreignColumns: [rooms.id],
        name: 'reviews_room_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  }
);

export const payments = pgTable(
  'payments',
  {
    id: serial().primaryKey().notNull(),
    bookingId: integer('booking_id').notNull(),
    amount: numeric({ precision: 7, scale: 2 }).notNull(),
    paymentDate: timestamp('payment_date', { mode: 'string' }).notNull(),
    paymentStatus: paymentStatusType('payment_status')
      .default('pending')
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      paymentsBookingIdFkey: foreignKey({
        columns: [table.bookingId],
        foreignColumns: [bookings.id],
        name: 'payments_booking_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('set null'),
    };
  }
);

export const propertyAmenities = pgTable(
  'property_amenities',
  {
    id: serial().primaryKey().notNull(),
    roomId: integer('room_id').notNull(),
    amenityId: integer('amenity_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      propertyAmenitiesAmenityIdFkey: foreignKey({
        columns: [table.amenityId],
        foreignColumns: [amenities.id],
        name: 'property_amenities_amenity_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      propertyAmenitiesRoomIdFkey: foreignKey({
        columns: [table.roomId],
        foreignColumns: [rooms.id],
        name: 'property_amenities_room_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  }
);

export const amenities = pgTable('amenities', {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 50 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
