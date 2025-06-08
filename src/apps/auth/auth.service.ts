import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { hashPassword } from '../../common/utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register user and sign JWT token
   *
   * @param user
   *
   * @returns Promise<SignInDto>
   */
  async signUp(user: any): Promise<TokenDto> {
    const { email } = user;

    if ((await this.usersService.findByEmail(email)))
      throw new ConflictException(`User already exists`);

    try {
      const createdUser = await this.usersService.create(user);

      const { password, ...payload } = createdUser;

      return {
        ...payload,
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
      };
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }

  /**
   * Validate user and sign JWT token
   *
   * @param email
   * @param pwd
   *
   * @returns Promise<SignInDto>
   */
  async signIn(email: string, pwd: string): Promise<TokenDto> {
    const user = (await this.usersService.findByEmail(email));

    if (!user){
      throw new UnauthorizedException('Bad credentials');
    }

    const { password, ...payload } = user;

    const isMatch = await bcrypt.compare(pwd, password)

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    try {
      return {
        ...payload,
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
      };
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }
  }

  /**
   * Refresh JWT token
   *
   * @param refreshTokenDto
   *
   * @returns Promise<SignInDto>
   */
  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenDto> {
    try {
      const { refreshToken } = refreshTokenDto;

      const decodedToken = await this.jwtService.verifyAsync(refreshToken);

      const user = (
        await this.usersService.findByEmail(decodedToken.email)
      );

      if (!user)
        throw new UnauthorizedException('Invalid or expired refresh token');

      const { password, ...payload } = user;

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
      };
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
