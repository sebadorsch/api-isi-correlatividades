import { ConfigService } from '@nestjs/config';

export const getConfig = (configService: ConfigService) => ({
  jwtSecret: configService.get<string>('JWT_SECRET'),
  jwtExpirationTime: configService.get<string>('JWT_EXPIRATION_TIME') ?? '1d',
});
