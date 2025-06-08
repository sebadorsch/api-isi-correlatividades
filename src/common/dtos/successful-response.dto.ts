import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({
    example: 'true',
    description: 'Status of response',
  })
  ok: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Errors',
  })
  error?: boolean;

  @ApiPropertyOptional({
    example: 'User created successfully',
    description: 'Description of a function response',
  })
  message: string;
}
