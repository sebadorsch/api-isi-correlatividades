import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConfig } from '../../config/config.service';
import { PrismaService } from '../../config/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: getConfig(configService).jwtSecret,
        signOptions: {
          expiresIn: `${getConfig(configService).jwtExpirationTime}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
