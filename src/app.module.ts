import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerModule } from './partner/partner.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { RouterModule } from '@nestjs/core';
import { RegionsModule } from './regions/regions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WithdrawsModule } from './withdraws/withdraws.module';
import { PartnerRequestModule } from './partner-request/partner-request.module';
import { MulterModule } from '@nestjs/platform-express';
import { PartnerReportModule } from './partner-report/partner-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    RegionsModule,
    PartnerModule,
    PaymentMethodModule,
    UsersModule,
    BookingsModule,
    TransactionsModule,
    // RouterModule.register([
    //   {
    //     path: '/admin',
    //     children: [
    //       {
    //         path: '/regions',
    //         module: RegionsModule
    //       },
    //       {
    //         path: '/partners',
    //         module: PartnerModule
    //       },
    //       {
    //         path: '/payment-methods',
    //         module: PaymentMethodModule
    //       },
    //       {
    //         path: '/users',
    //         module: UsersModule
    //       },
    //       {
    //         path: '/bookings',
    //         module: BookingsModule
    //       },
    //       {
    //         path: '/transactions',
    //         module: TransactionsModule,
    //       },
    //       {
    //         path: '/withdraws',
    //         module: WithdrawsModule
    //       }
    //     ],
    //   },
    //   {
    //     path: '/partner',
    //     children: [
    //       {
    //         path: '/bookings',
    //         module: BookingsModule
    //       },
    //       {
    //         path: '/withdraws',
    //         module: WithdrawsModule
    //       },
    //       {
    //         path: '/partner-request',
    //         module: PartnerRequestModule
    //       }
    //     ]
    //   }
    // ]),
    WithdrawsModule,
    PartnerRequestModule,
    PartnerReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
