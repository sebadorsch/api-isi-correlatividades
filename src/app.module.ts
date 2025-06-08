import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './apps/users/users.module';
import { SubjectsModule } from './apps/subjects/subjects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './apps/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './apps/auth/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UsersModule,
    SubjectsModule],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
