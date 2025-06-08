import { Module } from '@nestjs/common';
import { HealthCheckController } from './apps/health-check/health-check.controller';
import { UsersModule } from './apps/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
