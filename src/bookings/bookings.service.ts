import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from 'src/database/entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) { }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return await this.bookingRepository.save(createBookingDto);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find();
  }

  async findOne(id: number): Promise<Booking> {
    return await this.bookingRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    await this.bookingRepository.update(id, updateBookingDto);
    return await this.bookingRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async remove(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  // refund booking
  async refundBooking(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({
      where: {
        id: id
      }
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== 'COMPLETED') {
      throw new Error('Booking is not completed');
    }

    booking.status = 'REFUNDED';
    await this.bookingRepository.save(booking);
  }
}
