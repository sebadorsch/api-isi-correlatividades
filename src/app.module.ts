import { Module } from '@nestjs/common';
import { HealthCheckController } from './apps/health-check/health-check.controller';
import { UsersModule } from './apps/users/users.module';
import { SubjectsModule } from './apps/subjects/subjects.module';

@Module({
  imports: [UsersModule, SubjectsModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
